/**
 * Terminy podatkowe i ZUS dla kalendarza z subskrypcją (produkt nr 39).
 *
 * Zasady, na których stoi lista, i skąd je wzięto:
 * - zaliczki na PIT i CIT oraz ryczałt: do 20. dnia następnego miesiąca (kwartału);
 * - VAT i JPK_V7: do 25. dnia, kwartalnie z ewidencją co miesiąc (JPK_V7K);
 * - ZUS od 2022 r.: 15. dnia dla spółek z osobowością prawną, 20. dla pozostałych;
 * - termin przypadający na sobotę, niedzielę lub święto przechodzi na pierwszy dzień roboczy
 *   (art. 12 § 5 Ordynacji podatkowej);
 * - rok podatkowy i obrotowy zakładamy kalendarzowy.
 */

export type Forma = "skala" | "liniowy" | "ryczalt" | "cit";
export type Vat = "m" | "k" | "brak";
export type Zaliczki = "m" | "k";

export interface Ustawienia {
  forma: Forma;
  vat: Vat;
  zaliczki: Zaliczki;
  pracownicy: boolean;
  vatUe: boolean;
}

export const DOMYSLNE: Ustawienia = {
  forma: "skala",
  vat: "m",
  zaliczki: "m",
  pracownicy: false,
  vatUe: false,
};

export interface Termin {
  /** Dzień ustawowy, zanim przesunięto go przez weekend lub święto, RRRR-MM-DD. */
  ustawowy: string;
  /** Dzień, do którego faktycznie trzeba zdążyć, RRRR-MM-DD. */
  dzien: string;
  /** Klucz grupy: pit, cit, vat, zus, kadry, roczne. */
  grupa: "pit" | "cit" | "vat" | "zus" | "kadry" | "roczne";
  tytul: string;
  opis: string;
}

const MIESIACE = [
  "styczeń",
  "luty",
  "marzec",
  "kwiecień",
  "maj",
  "czerwiec",
  "lipiec",
  "sierpień",
  "wrzesień",
  "październik",
  "listopad",
  "grudzień",
];
const MIESIACE_DOP = [
  "stycznia",
  "lutego",
  "marca",
  "kwietnia",
  "maja",
  "czerwca",
  "lipca",
  "sierpnia",
  "września",
  "października",
  "listopada",
  "grudnia",
];
const DNI = [
  "niedziela",
  "poniedziałek",
  "wtorek",
  "środa",
  "czwartek",
  "piątek",
  "sobota",
];

export const nazwaMiesiaca = (m: number) => MIESIACE[m];
export const dzienPl = (iso: string) => {
  const [r, m, d] = iso.split("-").map(Number);
  return `${d} ${MIESIACE_DOP[m - 1]} ${r}`;
};
export const dzienTygodnia = (iso: string) =>
  DNI[new Date(`${iso}T12:00:00Z`).getUTCDay()];

const dwie = (n: number) => String(n).padStart(2, "0");
const iso = (r: number, m: number, d: number) =>
  `${r}-${dwie(m + 1)}-${dwie(d)}`;

/** Niedziela wielkanocna, algorytm Meeusa/Jonesa/Butchera. */
function wielkanoc(rok: number): Date {
  const a = rok % 19;
  const b = Math.floor(rok / 100);
  const c = rok % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const miesiac = Math.floor((h + l - 7 * m + 114) / 31);
  const dzien = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(rok, miesiac - 1, dzien));
}

const dodajDni = (d: Date, n: number) => new Date(d.getTime() + n * 86_400_000);
const jakoIso = (d: Date) => d.toISOString().slice(0, 10);

/** Dni ustawowo wolne od pracy w Polsce (Wigilia od 2025 r.). */
export function swieta(rok: number): Set<string> {
  const w = wielkanoc(rok);
  const s = new Set<string>([
    iso(rok, 0, 1),
    iso(rok, 0, 6),
    iso(rok, 4, 1),
    iso(rok, 4, 3),
    iso(rok, 7, 15),
    iso(rok, 10, 1),
    iso(rok, 10, 11),
    iso(rok, 11, 25),
    iso(rok, 11, 26),
    jakoIso(w),
    jakoIso(dodajDni(w, 1)),
    jakoIso(dodajDni(w, 49)),
    jakoIso(dodajDni(w, 60)),
  ]);
  if (rok >= 2025) s.add(iso(rok, 11, 24));
  return s;
}

/** Pierwszy dzień roboczy nie wcześniejszy niż podany. */
export function przesun(dzien: string): string {
  let d = new Date(`${dzien}T00:00:00Z`);
  for (;;) {
    const w = d.getUTCDay();
    const rok = d.getUTCFullYear();
    if (w !== 0 && w !== 6 && !swieta(rok).has(jakoIso(d))) return jakoIso(d);
    d = dodajDni(d, 1);
  }
}

function termin(
  rok: number,
  m: number,
  d: number,
  grupa: Termin["grupa"],
  tytul: string,
  opis: string,
): Termin {
  const ustawowy = iso(rok, m, d);
  return { ustawowy, dzien: przesun(ustawowy), grupa, tytul, opis };
}

const koniecLutego = (rok: number) => new Date(Date.UTC(rok, 2, 0)).getUTCDate();
const okres = (rok: number, m: number) => `${MIESIACE[m]} ${rok}`;
const kwartal = (rok: number, q: number) => `${q + 1} kwartał ${rok}`;

/** Wszystkie terminy przypadające w latach od `odRoku` do `doRoku`, od najwcześniejszego. */
export function terminy(
  u: Ustawienia,
  odRoku: number,
  doRoku: number,
): Termin[] {
  const w: Termin[] = [];
  const cit = u.forma === "cit";
  const zusDzien = cit ? 15 : 20;

  for (let rok = odRoku; rok <= doRoku; rok++) {
    // Zaliczki
    if (u.zaliczki === "m") {
      for (let m = 0; m < 12; m++) {
        // Zaliczka za miesiąc m płatna w m+1; za grudzień na PIT/ryczałt w styczniu, na CIT razem z zeznaniem.
        const rokPlat = m === 11 ? rok + 1 : rok;
        const mPlat = (m + 1) % 12;
        if (cit && m === 11) continue;
        w.push(zaliczka(u, rokPlat, mPlat, okres(rok, m)));
      }
    } else {
      for (let q = 0; q < 4; q++) {
        const rokPlat = q === 3 ? rok + 1 : rok;
        const mPlat = q === 3 ? 0 : (q + 1) * 3;
        if (cit && q === 3) continue;
        w.push(zaliczka(u, rokPlat, mPlat, kwartal(rok, q)));
      }
    }

    // Zeznania roczne za rok `rok`, składane w roku następnym
    const nast = rok + 1;
    if (u.forma === "ryczalt") {
      w.push(
        termin(
          nast,
          1,
          28,
          "pit",
          `PIT-28 za ${rok}`,
          `Złóż roczne zeznanie PIT-28 za ${rok} i dopłać ewentualną różnicę podatku.`,
        ),
      );
    } else if (u.forma === "skala" || u.forma === "liniowy") {
      const druk = u.forma === "skala" ? "PIT-36" : "PIT-36L";
      w.push(
        termin(
          nast,
          3,
          30,
          "pit",
          `${druk} za ${rok}`,
          `Złóż roczne zeznanie ${druk} za ${rok} i dopłać ewentualną różnicę podatku.`,
        ),
      );
    } else {
      w.push(
        termin(
          nast,
          2,
          31,
          "cit",
          `CIT-8 za ${rok} i wpłata podatku`,
          `Złóż CIT-8 za ${rok} i zapłać podatek za ostatni miesiąc (kwartał) roku. Rok obrotowy = kalendarzowy.`,
        ),
      );
      w.push(
        termin(
          nast,
          5,
          30,
          "roczne",
          `Zatwierdzenie sprawozdania finansowego za ${rok}`,
          `Zgromadzenie wspólników zatwierdza sprawozdanie za ${rok} (najpóźniej 6 miesięcy po końcu roku). ` +
            `Potem 15 dni na złożenie go w KRS.`,
        ),
      );
    }

    // VAT
    if (u.vat !== "brak") {
      for (let m = 0; m < 12; m++) {
        const rokPlat = m === 11 ? rok + 1 : rok;
        const mPlat = (m + 1) % 12;
        if (u.vat === "m") {
          w.push(
            termin(
              rokPlat,
              mPlat,
              25,
              "vat",
              `JPK_V7M i VAT za ${okres(rok, m)}`,
              `Wyślij JPK_V7M za ${okres(rok, m)} i zapłać VAT.`,
            ),
          );
        } else if (m % 3 === 2) {
          const q = (m - 2) / 3;
          w.push(
            termin(
              rokPlat,
              mPlat,
              25,
              "vat",
              `JPK_V7K i VAT za ${kwartal(rok, q)}`,
              `Wyślij JPK_V7K z deklaracją za ${kwartal(rok, q)} i zapłać VAT.`,
            ),
          );
        } else {
          w.push(
            termin(
              rokPlat,
              mPlat,
              25,
              "vat",
              `JPK_V7K, ewidencja za ${okres(rok, m)}`,
              `Wyślij samą ewidencję JPK_V7K za ${okres(rok, m)}. Deklaracja i VAT dopiero po kwartale.`,
            ),
          );
        }
      }
    }
    if (u.vatUe && u.vat !== "brak") {
      for (let m = 0; m < 12; m++) {
        const rokPlat = m === 11 ? rok + 1 : rok;
        w.push(
          termin(
            rokPlat,
            (m + 1) % 12,
            25,
            "vat",
            `VAT-UE za ${okres(rok, m)}`,
            `Złóż informację podsumowującą VAT-UE za ${okres(rok, m)}, jeśli miały miejsce transakcje wewnątrzunijne.`,
          ),
        );
      }
    }

    // ZUS: JDG płaci zawsze za siebie, spółka tylko gdy ma kogo zgłaszać
    if (!cit || u.pracownicy) {
      for (let m = 0; m < 12; m++) {
        const rokPlat = m === 11 ? rok + 1 : rok;
        w.push(
          termin(
            rokPlat,
            (m + 1) % 12,
            zusDzien,
            "zus",
            `Składki za ${okres(rok, m)}`,
            `Opłać składki za ${okres(rok, m)}` +
              (u.pracownicy || !cit
                ? " i złóż deklarację rozliczeniową DRA z dokumentami zgłoszeniowymi."
                : "."),
          ),
        );
      }
    }

    // Pracownicy: PIT-4R i PIT-11
    if (u.pracownicy) {
      for (let m = 0; m < 12; m++) {
        const rokPlat = m === 11 ? rok + 1 : rok;
        w.push(
          termin(
            rokPlat,
            (m + 1) % 12,
            20,
            "kadry",
            `Podatek od wynagrodzeń za ${okres(rok, m)}`,
            `Wpłać do urzędu skarbowego zaliczki na PIT pobrane pracownikom za ${okres(rok, m)}.`,
          ),
        );
      }
      w.push(
        termin(
          nast,
          0,
          31,
          "kadry",
          `PIT-4R za ${rok}`,
          `Złóż roczną deklarację PIT-4R za ${rok}.`,
        ),
      );
      w.push(
        termin(
          nast,
          1,
          28,
          "kadry",
          `PIT-11 za ${rok}`,
          `Wyślij PIT-11 za ${rok} pracownikom i do urzędu skarbowego.`,
        ),
      );
    }
  }

  const unikalne = new Map<string, Termin>();
  for (const t of w) unikalne.set(`${t.dzien}|${t.tytul}`, t);
  return [...unikalne.values()]
    .filter(
      (t) =>
        Number(t.dzien.slice(0, 4)) >= odRoku &&
        Number(t.dzien.slice(0, 4)) <= doRoku + 1,
    )
    .sort(
      (a, b) =>
        a.dzien.localeCompare(b.dzien) || a.tytul.localeCompare(b.tytul, "pl"),
    );
}

function zaliczka(
  u: Ustawienia,
  rokPlat: number,
  mPlat: number,
  za: string,
): Termin {
  if (u.forma === "cit") {
    return termin(
      rokPlat,
      mPlat,
      20,
      "cit",
      `Zaliczka na CIT za ${za}`,
      `Wpłać zaliczkę na CIT za ${za}.`,
    );
  }
  if (u.forma === "ryczalt") {
    return termin(
      rokPlat,
      mPlat,
      20,
      "pit",
      `Ryczałt za ${za}`,
      `Wpłać zaliczkę na ryczałt za ${za}.`,
    );
  }
  return termin(
    rokPlat,
    mPlat,
    20,
    "pit",
    `Zaliczka na PIT za ${za}`,
    `Wpłać zaliczkę na PIT za ${za}.`,
  );
}

export const GRUPY: Record<Termin["grupa"], string> = {
  pit: "PIT",
  cit: "CIT",
  vat: "VAT",
  zus: "ZUS",
  kadry: "Kadry",
  roczne: "Roczne",
};

/** Zapis ustawień w adresie: forma-vat-zaliczki-pracownicy-vatUe, np. skala-m-m-0-0. */
export function kodUstawien(u: Ustawienia): string {
  return [
    u.forma,
    u.vat,
    u.zaliczki,
    u.pracownicy ? 1 : 0,
    u.vatUe ? 1 : 0,
  ].join("-");
}

export function zKodu(kod: string | null): Ustawienia | null {
  if (!kod) return null;
  const [forma, vat, zaliczki, p, ue] = kod.split("-");
  if (!["skala", "liniowy", "ryczalt", "cit"].includes(forma)) return null;
  if (!["m", "k", "brak"].includes(vat)) return null;
  if (!["m", "k"].includes(zaliczki)) return null;
  if (!["0", "1"].includes(p) || !["0", "1"].includes(ue)) return null;
  return {
    forma: forma as Forma,
    vat: vat as Vat,
    zaliczki: zaliczki as Zaliczki,
    pracownicy: p === "1",
    vatUe: ue === "1",
  };
}

const ucieknij = (s: string) =>
  s
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");

/** Zawija linie iCalendar po 75 bajtów, jak wymaga RFC 5545. */
function zawin(linia: string): string {
  const enc = new TextEncoder();
  if (enc.encode(linia).length <= 75) return linia;
  const wyjscie: string[] = [];
  let bufor = "";
  let dlugosc = 0;
  let limit = 75;
  for (const znak of linia) {
    const b = enc.encode(znak).length;
    if (dlugosc + b > limit) {
      wyjscie.push(bufor);
      bufor = "";
      dlugosc = 0;
      limit = 74;
    }
    bufor += znak;
    dlugosc += b;
  }
  wyjscie.push(bufor);
  return wyjscie.join("\r\n ");
}

function hash(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h.toString(16);
}

export function ics(u: Ustawienia, teraz: Date = new Date()): string {
  const rok = teraz.getUTCFullYear();
  const od = jakoIso(new Date(Date.UTC(rok, teraz.getUTCMonth() - 1, 1)));
  const lista = terminy(u, rok - 1, rok + 1).filter(
    (t) => t.dzien >= od && t.dzien <= `${rok + 1}-12-31`,
  );
  const stempel = teraz.toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
  const kod = kodUstawien(u);
  const wiersze = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Fluxlab//Terminy podatkowe i ZUS//PL",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Terminy podatkowe i ZUS",
    "X-WR-TIMEZONE:Europe/Warsaw",
    "REFRESH-INTERVAL;VALUE=DURATION:P1D",
    "X-PUBLISHED-TTL:P1D",
  ];
  for (const t of lista) {
    const nastepny = jakoIso(
      dodajDni(new Date(`${t.dzien}T00:00:00Z`), 1),
    ).replace(/-/g, "");
    const przesuniety =
      t.dzien !== t.ustawowy
        ? ` Termin ustawowy: ${dzienPl(t.ustawowy)} (${dzienTygodnia(t.ustawowy)}), przesunięty na pierwszy dzień roboczy.`
        : "";
    wiersze.push(
      "BEGIN:VEVENT",
      `UID:${hash(`${kod}|${t.dzien}|${t.tytul}`)}-${t.dzien.replace(/-/g, "")}@fluxlab.pl`,
      `DTSTAMP:${stempel}`,
      `DTSTART;VALUE=DATE:${t.dzien.replace(/-/g, "")}`,
      `DTEND;VALUE=DATE:${nastepny}`,
      `SUMMARY:${ucieknij(`${GRUPY[t.grupa]}: ${t.tytul}`)}`,
      `DESCRIPTION:${ucieknij(`${t.opis}${przesuniety} Terminy ogólne, w razie wątpliwości sprawdź w swoim biurze rachunkowym. fluxlab.pl/kalendarz-terminow`)}`,
      "TRANSP:TRANSPARENT",
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      `DESCRIPTION:${ucieknij(`Za dwa dni: ${t.tytul}`)}`,
      "TRIGGER:-P2DT15H",
      "END:VALARM",
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      `DESCRIPTION:${ucieknij(`Dziś termin: ${t.tytul}`)}`,
      "TRIGGER:PT8H",
      "END:VALARM",
      "END:VEVENT",
    );
  }
  wiersze.push("END:VCALENDAR");
  return wiersze.map(zawin).join("\r\n") + "\r\n";
}
