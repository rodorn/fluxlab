import { stawki, type Rok } from "./stawki";

export type Wariant =
  | "ulga-na-start"
  | "preferencyjny"
  | "maly-zus-plus"
  | "duzy";
export type Forma = "skala" | "liniowy" | "ryczalt";

export type DaneZus = {
  rok: Rok;
  wariant: Wariant;
  chorobowa: boolean;
  forma: Forma;
  dochodMies: number;
  przychodRoczny: number;
  dochodPoprzedni: number;
  dniPoprzedni: number;
};

export type WynikZus = {
  podstawa: number;
  emerytalna: number;
  rentowa: number;
  chorobowa: number;
  wypadkowa: number;
  fp: number;
  spoleczne: number;
  zdrowotna: number;
  podstawaZdrowotnej: number;
  zdrowotnaSzacunek: boolean;
  razemMies: number;
  razemRok: number;
  spoleczneRok: number;
  zdrowotnaRok: number;
};

const gr = (v: number) => Math.round(v * 100) / 100;

export function podstawaSpoleczna(d: DaneZus): number {
  const s = stawki(d.rok);
  const min = s.minimalne.v;
  const duza = gr(s.przecietne.v * 0.6);
  if (d.wariant === "ulga-na-start") return 0;
  if (d.wariant === "preferencyjny") return gr(min * 0.3);
  if (d.wariant === "duzy") return duza;
  const dni = Math.max(1, d.dniPoprzedni);
  const sredni = (Math.max(0, d.dochodPoprzedni) / dni) * 30;
  return gr(Math.min(duza, Math.max(gr(min * 0.3), sredni * 0.5)));
}

export function zdrowotna(
  rok: Rok,
  forma: Forma,
  dochodMies: number,
  przychodRoczny: number,
): { kwota: number; podstawa: number; szacunek: boolean } {
  const s = stawki(rok);
  if (forma === "ryczalt") {
    const prog =
      przychodRoczny <= 60_000 ? 0.6 : przychodRoczny <= 300_000 ? 1 : 1.8;
    const podstawa = gr(s.przecietneQ4.v * prog);
    return {
      kwota: gr(podstawa * s.zdrowotnaRyczalt.v),
      podstawa,
      szacunek: !!s.przecietneQ4.szacunek,
    };
  }
  const stopa = forma === "skala" ? s.zdrowotnaSkala.v : s.zdrowotnaLiniowy.v;
  const minPodstawa = gr(s.minimalne.v * s.minPodstawaZdrowotnej.v);
  const podstawa = Math.max(minPodstawa, Math.max(0, dochodMies));
  const kwota = Math.max(
    gr(minPodstawa * s.zdrowotnaSkala.v),
    gr(podstawa * stopa),
  );
  return { kwota, podstawa: gr(podstawa), szacunek: false };
}

export function liczZus(d: DaneZus): WynikZus {
  const s = stawki(d.rok);
  const podstawa = podstawaSpoleczna(d);
  const emerytalna = gr(podstawa * s.emerytalna.v);
  const rentowa = gr(podstawa * s.rentowa.v);
  const chorobowa = d.chorobowa ? gr(podstawa * s.chorobowa.v) : 0;
  const wypadkowa = gr(podstawa * s.wypadkowa.v);
  const fp =
    d.wariant !== "ulga-na-start" &&
    d.wariant !== "preferencyjny" &&
    podstawa >= s.minimalne.v
      ? gr(podstawa * s.funduszPracy.v)
      : 0;
  const spoleczne = gr(emerytalna + rentowa + chorobowa + wypadkowa + fp);
  const z = zdrowotna(
    d.rok,
    d.forma,
    d.dochodMies - (d.forma === "ryczalt" ? 0 : spoleczne),
    d.przychodRoczny,
  );
  const razemMies = gr(spoleczne + z.kwota);
  return {
    podstawa,
    emerytalna,
    rentowa,
    chorobowa,
    wypadkowa,
    fp,
    spoleczne,
    zdrowotna: z.kwota,
    podstawaZdrowotnej: z.podstawa,
    zdrowotnaSzacunek: z.szacunek,
    razemMies,
    razemRok: gr(razemMies * 12),
    spoleczneRok: gr(spoleczne * 12),
    zdrowotnaRok: gr(z.kwota * 12),
  };
}
