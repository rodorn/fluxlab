import { OPCJE_STRONY, cenaOpcji } from "@/lib/opcjeStrony";
// Konfiguracja wyceny przekazywana w linku /wycena?d=<base64url(JSON)>.
// Ceny zgodne z components/KonfiguratorStrony.tsx i components/KonfiguratorCrm.tsx.

export type KonfiguracjaWyceny =
  | { t: "s"; r: string; o: string[] }
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

const RODZAJE: Record<string, { nazwa: string; cena: number; termin: string }> = {
  landing: { nazwa: "Landing do 5 podstron", cena: 4500, termin: "3-5 dni roboczych" },
  firmowa: { nazwa: "Strona firmowa z CMS", cena: 9000, termin: "2-3 tygodnie" },
  sklep: { nazwa: "Sklep z integracją", cena: 15000, termin: "ustalimy przy wycenie" },
};

const OPCJE = OPCJE_STRONY;

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
    const r = typeof c.r === "string" ? RODZAJE[c.r] : undefined;
    if (!r || !Array.isArray(c.o)) return null;
    const ids = c.o as unknown[];
    if (ids.length > 10 || !ids.every((x) => typeof x === "string" && x in OPCJE)) return null;
    const unikalne = Array.from(new Set(ids as string[]));
    const pozycje: Pozycja[] = [
      { nazwa: r.nazwa, opis: "Wdrożenie, hosting w cenie wdrożenia", netto: r.cena },
      ...unikalne.map((id) => {
        const o = OPCJE[id];
        const kwota = cenaOpcji(id, c.r as string, r.cena);
        return kwota ? { nazwa: o.nazwa, netto: kwota } : { nazwa: o.nazwa, info: "w cenie" };
      }),
    ];
    const suma = r.cena + unikalne.reduce((s, id) => s + cenaOpcji(id, c.r as string, r.cena), 0);
    return {
      tytul: "Strona internetowa",
      pozycje,
      sumaEtykieta: "Razem",
      sumaOd: true,
      suma,
      termin: r.termin,
      uwaga: "Ceny dodatków orientacyjne, dokładną kwotę potwierdzimy po rozmowie.",
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
