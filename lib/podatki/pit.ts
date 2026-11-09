import {
  progiSkali,
  stawkaDaniny,
  stawki,
  type Rok,
  type WariantSkali,
} from "./stawki";
import {
  liczZus,
  zdrowotna,
  type DaneZus,
  type Forma,
  type Wariant,
} from "./zus";

const gr = (v: number) => Math.round(v * 100) / 100;
const zl = (v: number) => Math.round(v);

export function podatekSkala(
  rok: Rok,
  podstawa: number,
  wariant: WariantSkali = "obowiazujace",
): number {
  const p = Math.max(0, zl(podstawa));
  let podatek = -stawki(rok).kwotaZmniejszajaca.v;
  let od = 0;
  for (const prog of progiSkali(rok, wariant)) {
    const gora = prog.do ?? Infinity;
    if (p > od) podatek += (Math.min(p, gora) - od) * prog.stawka;
    od = gora;
  }
  return Math.max(0, zl(podatek));
}

function danina(rok: Rok, dochod: number, wariant: WariantSkali): number {
  const s = stawki(rok);
  return Math.max(0, zl((dochod - s.daninaProg.v) * stawkaDaniny(rok, wariant)));
}

export type DaneJdg = {
  rok: Rok;
  forma: Forma;
  przychodRoczny: number;
  kosztyRoczne: number;
  stawkaRyczaltu: number;
  wariant: Wariant;
  chorobowa: boolean;
  dochodPoprzedni: number;
  dniPoprzedni: number;
  wspolneZMalzonkiem: boolean;
  dochodMalzonka: number;
  skala?: WariantSkali;
};

export type WynikJdg = {
  forma: Forma;
  spoleczne: number;
  zdrowotna: number;
  odliczonaZdrowotna: number;
  podstawa: number;
  podatek: number;
  danina: number;
  zaliczki: number[];
  doplataZwrot: number;
  naReke: number;
  naRekeMies: number;
  obciazenie: number;
  zdrowotnaSzacunek: boolean;
};

export function liczJdg(d: DaneJdg): WynikJdg {
  const s = stawki(d.rok);
  const w = d.skala ?? "obowiazujace";
  const dochod =
    d.forma === "ryczalt"
      ? d.przychodRoczny
      : d.przychodRoczny - d.kosztyRoczne;
  const daneZus: DaneZus = {
    rok: d.rok,
    wariant: d.wariant,
    chorobowa: d.chorobowa,
    forma: d.forma,
    dochodMies: dochod / 12,
    przychodRoczny: d.przychodRoczny,
    dochodPoprzedni: d.dochodPoprzedni,
    dniPoprzedni: d.dniPoprzedni,
  };
  const zus = liczZus(daneZus);
  const spoleczne = zus.spoleczneRok;
  let zdrowotnaRok = zus.zdrowotnaRok;
  if (d.forma !== "ryczalt") {
    const roczna = zdrowotna(
      d.rok,
      d.forma,
      (dochod - spoleczne) / 12,
      d.przychodRoczny,
    );
    zdrowotnaRok = gr(roczna.kwota * 12);
  }

  let odliczona = 0;
  let podstawa = 0;
  let podatek = 0;
  let dan = 0;
  if (d.forma === "skala") {
    podstawa = Math.max(0, dochod - spoleczne);
    podatek = d.wspolneZMalzonkiem
      ? Math.max(
          0,
          2 *
            podatekSkala(
              d.rok,
              (podstawa + Math.max(0, d.dochodMalzonka)) / 2,
              w,
            ) -
            podatekSkala(d.rok, d.dochodMalzonka, w),
        )
      : podatekSkala(d.rok, podstawa, w);
    dan = danina(d.rok, podstawa, w);
  } else if (d.forma === "liniowy") {
    odliczona = Math.min(zdrowotnaRok, s.limitOdliczeniaZdrowotnejLiniowy.v);
    podstawa = Math.max(0, dochod - spoleczne - odliczona);
    podatek = Math.max(0, zl(zl(podstawa) * s.liniowy.v));
    dan = danina(d.rok, dochod - spoleczne, w);
  } else {
    odliczona = gr(zdrowotnaRok * s.odliczenieZdrowotnejRyczalt.v);
    podstawa = Math.max(0, d.przychodRoczny - spoleczne - odliczona);
    podatek = Math.max(0, zl(zl(podstawa) * (d.stawkaRyczaltu / 100)));
  }

  const zaliczki = zaliczkiMiesieczne(d, podstawa);
  const naReke = gr(
    d.przychodRoczny -
      d.kosztyRoczne -
      spoleczne -
      zdrowotnaRok -
      podatek -
      dan,
  );
  return {
    forma: d.forma,
    spoleczne,
    zdrowotna: zdrowotnaRok,
    odliczonaZdrowotna: odliczona,
    podstawa: gr(podstawa),
    podatek,
    danina: dan,
    zaliczki,
    doplataZwrot: podatek - zaliczki.reduce((a, b) => a + b, 0),
    naReke,
    naRekeMies: gr(naReke / 12),
    obciazenie: gr(spoleczne + zdrowotnaRok + podatek + dan),
    zdrowotnaSzacunek: zus.zdrowotnaSzacunek,
  };
}

function zaliczkiMiesieczne(d: DaneJdg, podstawaRok: number): number[] {
  const wynik: number[] = [];
  let zaplacone = 0;
  for (let m = 1; m <= 12; m++) {
    const narastajaco = (podstawaRok * m) / 12;
    let nalezny: number;
    if (d.forma === "skala")
      nalezny = podatekSkala(d.rok, narastajaco, d.skala);
    else if (d.forma === "liniowy")
      nalezny = zl(zl(narastajaco) * stawki(d.rok).liniowy.v);
    else nalezny = zl(zl(narastajaco) * (d.stawkaRyczaltu / 100));
    const z = Math.max(0, nalezny - zaplacone);
    wynik.push(z);
    zaplacone += z;
  }
  return wynik;
}

export type DaneEtat = {
  rok: Rok;
  bruttoMies: number;
  dojazd: boolean;
  pit2: boolean;
  wspolneZMalzonkiem: boolean;
  dochodMalzonka: number;
  skala?: WariantSkali;
};

export type WynikEtat = {
  spoleczne: number;
  zdrowotna: number;
  koszty: number;
  podstawa: number;
  zaliczki: number[];
  podatekRoczny: number;
  doplataZwrot: number;
  nettoRok: number;
  nettoMies: number[];
};

export function liczEtat(d: DaneEtat): WynikEtat {
  const s = stawki(d.rok);
  const w = d.skala ?? "obowiazujace";
  const progi = progiSkali(d.rok, w);
  const spoleczneMies = gr(
    d.bruttoMies *
      (s.pracownikEmerytalna.v + s.pracownikRentowa.v + s.pracownikChorobowa.v),
  );
  const zdrowotnaMies = gr((d.bruttoMies - spoleczneMies) * s.zdrowotnaSkala.v);
  const kupMies = d.dojazd
    ? s.kosztyUzyskaniaPracownikZamiejscowy.v
    : s.kosztyUzyskaniaPracownik.v;
  const podstawaMies = zl(Math.max(0, d.bruttoMies - spoleczneMies - kupMies));
  const zmn = d.pit2 ? s.kwotaZmniejszajaca.v / 12 : 0;
  const zaliczki: number[] = [];
  let narastajaco = 0;
  for (let m = 1; m <= 12; m++) {
    const przed = narastajaco;
    narastajaco += podstawaMies;
    let podatek = 0;
    let od = 0;
    for (const prog of progi) {
      const gora = prog.do ?? Infinity;
      const czesc = Math.max(0, Math.min(narastajaco, gora) - Math.max(przed, od));
      podatek += czesc * prog.stawka;
      od = gora;
    }
    zaliczki.push(Math.max(0, zl(podatek - zmn)));
  }
  const podstawaRok = Math.max(
    0,
    zl(12 * (d.bruttoMies - spoleczneMies - kupMies)),
  );
  const podatekRoczny = d.wspolneZMalzonkiem
    ? Math.max(
        0,
        2 *
          podatekSkala(
            d.rok,
            (podstawaRok + Math.max(0, d.dochodMalzonka)) / 2,
            w,
          ) -
          podatekSkala(d.rok, d.dochodMalzonka, w),
      )
    : podatekSkala(d.rok, podstawaRok, w);
  const sumaZaliczek = zaliczki.reduce((a, b) => a + b, 0);
  const nettoMies = zaliczki.map((z) =>
    gr(d.bruttoMies - spoleczneMies - zdrowotnaMies - z),
  );
  return {
    spoleczne: gr(spoleczneMies * 12),
    zdrowotna: gr(zdrowotnaMies * 12),
    koszty: kupMies * 12,
    podstawa: podstawaRok,
    zaliczki,
    podatekRoczny,
    doplataZwrot: podatekRoczny - sumaZaliczek,
    nettoRok: gr(
      12 * d.bruttoMies -
        12 * spoleczneMies -
        12 * zdrowotnaMies -
        podatekRoczny,
    ),
    nettoMies,
  };
}
