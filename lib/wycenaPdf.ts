import { OPCJE_STRONY, wycenStrone, terminTekst, type KonfiguracjaStrony } from "@/lib/opcjeStrony";
// Konfiguracja wyceny przekazywana w linku /wycena?d=<base64url(JSON)>.
// Ceny zgodne z components/KonfiguratorStrony.tsx i components/KonfiguratorCrm.tsx.

export type KonfiguracjaWyceny =
  | ({ t: "s" } & KonfiguracjaStrony)
  | { t: "c"; n: number; w: string };

export type Pozycja = {
  nazwa: string;
  opis?: string;
  netto?: number;
  info?: string;
};

export type Wycena = {
  tytul: string;
  pozycje: Pozycja[];
  sumaEtykieta: string;
  sumaOd: boolean;
  suma: number;
  termin?: string;
  uwaga?: string;
};

const WARIANTY: Record<string, { nazwa: string; cena: number }> = {
  pilotaz: { nazwa: "Pilotaż", cena: 1 },
  integracje: { nazwa: "Dowolne integracje", cena: 12900 },
  ai: { nazwa: "Z narzędziami AI", cena: 24900 },
};

const ABONAMENT = 499;
const ABONAMENT_AI = 999;
const W_ABONAMENCIE = 3;
const OSOBA_DODATKOWA = 99;
const MAX_PILOTAZ = 3;

export function kodujWycene(k: KonfiguracjaWyceny): string {
  const bajty = new TextEncoder().encode(JSON.stringify(k));
  let bin = "";
  bajty.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function dekodujWycene(d: string | undefined): Wycena | null {
  if (!d || d.length > 2000 || !/^[A-Za-z0-9_-]+$/.test(d)) return null;
  let k: unknown;
  try {
    k = JSON.parse(Buffer.from(d, "base64url").toString("utf8"));
  } catch {
    return null;
  }
  if (!k || typeof k !== "object") return null;
  const c = k as Record<string, unknown>;

  if (c.t === "s") {
    if (!Array.isArray(c.o)) return null;
    const ids = c.o as unknown[];
    if (ids.length > 10 || !ids.every((x) => typeof x === "string" && x in OPCJE_STRONY)) return null;
    const liczba = (x: unknown) => (typeof x === "number" ? x : undefined);
    const w = wycenStrone({
      r: String(c.r),
      o: ids as string[],
      p: liczba(c.p),
      j: liczba(c.j),
      tr: typeof c.tr === "string" ? c.tr : undefined,
      pr: typeof c.pr === "string" ? c.pr : undefined,
      op: liczba(c.op),
    });
    if (!w) return null;
    const pozycje: Pozycja[] = [
      ...w.pozycje,
      ...w.wCenie.map((nazwa) => ({ nazwa, info: "w cenie" })),
    ];
    if (w.miesiecznie)
      pozycje.push({ nazwa: "Opieka nad stroną", opis: "płatna co miesiąc, poza sumą", info: `${w.miesiecznie} zł/mies.` });
    return {
      tytul: "Strona internetowa",
      pozycje,
      sumaEtykieta: "Razem",
      sumaOd: w.rodzaj.id === "sklep",
      suma: w.suma,
      termin: terminTekst(w.tygodnie),
      uwaga: "Wycena orientacyjna, dokładną kwotę potwierdzimy po rozmowie.",
    };
  }

  if (c.t === "c") {
    const n = c.n;
    const w = typeof c.w === "string" ? WARIANTY[c.w] : undefined;
    if (typeof n !== "number" || !Number.isInteger(n) || n < 1 || n > 30 || !w) return null;
    if (c.w === "pilotaz" && n > MAX_PILOTAZ) return null;
    const baza = c.w === "ai" ? ABONAMENT_AI : ABONAMENT;
    const mies = baza + Math.max(0, n - W_ABONAMENCIE) * OSOBA_DODATKOWA;
    return {
      tytul: "FluxCRM",
      pozycje: [
        { nazwa: `Wdrożenie: ${w.nazwa}`, opis: "Płatność jednorazowa", netto: w.cena },
        {
          nazwa: "Abonament miesięczny",
          opis:
            n <= W_ABONAMENCIE
              ? `${n} ${n === 1 ? "osoba" : "osoby"}, ${baza} zł obejmuje do ${W_ABONAMENCIE} osób`
              : `${n} osób: ${baza} zł za ${W_ABONAMENCIE} osoby plus ${n - W_ABONAMENCIE} × ${OSOBA_DODATKOWA} zł`,
          netto: mies,
        },
      ],
      sumaEtykieta: "Koszt pierwszego roku (wdrożenie plus 12 miesięcy abonamentu)",
      sumaOd: false,
      suma: w.cena + 12 * mies,
    };
  }
  return null;
}
