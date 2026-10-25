import { MODULY_CRM, OSOBA_DODATKOWA, W_ABONAMENCIE, WARIANTY_CRM, abonamentCrm } from "@/lib/modulyCrm";
import { OPCJE_STRONY, wycenStrone, terminTekst, type KonfiguracjaStrony } from "@/lib/opcjeStrony";
// Konfiguracja wyceny przekazywana w linku /wycena?d=<base64url(JSON)>.
// Ceny zgodne z components/KonfiguratorStrony.tsx i components/KonfiguratorCrm.tsx.

export type KonfiguracjaWyceny =
  | ({ t: "s" } & KonfiguracjaStrony)
  | { t: "c"; n: number; w: string; m?: string[] };

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
    if (ids.length > 15 || !ids.every((x) => typeof x === "string" && x in OPCJE_STRONY)) return null;
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
    for (const a of w.abonamenty)
      pozycje.push({ nazwa: a.nazwa, opis: "płatne co miesiąc, poza sumą", info: `${a.netto} zł/mies.` });
    return {
      tytul: "Strona internetowa",
      pozycje,
      sumaEtykieta: "Razem",
      sumaOd: w.rodzaj.id === "sklep",
      suma: w.suma,
      termin: terminTekst(w.dni),
      uwaga: "Wycena orientacyjna, dokładną kwotę potwierdzimy po rozmowie.",
    };
  }

  if (c.t === "c") {
    const n = c.n;
    const w = WARIANTY_CRM.find((x) => x.id === c.w);
    if (typeof n !== "number" || !Number.isInteger(n) || n < 1 || n > 30 || !w) return null;
    const ids: string[] = Array.isArray(c.m) ? c.m : [];
    const { baza, miesiecznie } = abonamentCrm(w.id, n, ids);
    return {
      tytul: "FluxCRM",
      pozycje: [
        { nazwa: `Wdrożenie: ${w.nazwa}`, opis: "Płatność jednorazowa", netto: 1 },
        {
          nazwa: "Abonament miesięczny",
          opis:
            n <= W_ABONAMENCIE
              ? `${n} ${n === 1 ? "osoba" : "osoby"}, ${String(baza).replace(/\B(?=(\d{3})+$)/g, "\u00a0")} zł obejmuje do ${W_ABONAMENCIE} osób`
              : `${n} osób: ${String(baza).replace(/\B(?=(\d{3})+$)/g, "\u00a0")} zł za ${W_ABONAMENCIE} osoby plus ${n - W_ABONAMENCIE} × ${OSOBA_DODATKOWA} zł`,
          netto: miesiecznie,
        },
        ...MODULY_CRM.filter((m) => ids.includes(m.id)).map((m) => ({
          nazwa: m.nazwa,
          info: `${m.miesiecznie} zł/mies., doliczone wyżej`,
        })),
      ],
      sumaEtykieta: "Pierwszy rok (wdrożenie plus 12 miesięcy abonamentu, rezygnacja w dowolnym dniu)",
      sumaOd: false,
      suma: 1 + 12 * miesiecznie,
    };
  }
  return null;
}
