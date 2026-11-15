import frazy from "@/lib/czytelnosc-frazy.json";

export const MAX_ZDANIE = 28;

const SLOWO = /[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]+(?:[-'’][A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]+)*/g;
const SKROTY = new Set(["tys", "mln", "mld", "itd", "itp", "tzn", "tzw", "godz", "ul", "art", "ust", "pkt", "zob", "por", "ok", "dr", "inż", "mgr", "prof", "wg", "ang", "tel", "zł", "nr", "woj", "os", "poz", "sp", "ds", "mies", "rocz", "tyg", "szt"]);

export type Uwaga = { rodzaj: "dlugie" | "fraza" | "zapis"; tytul: string; tekst: string; podzial?: string };

const liczSlowa = (z: string) => (z.match(SLOWO) ?? []).length;

export function zdania(tekst: string): string[] {
  return tekst
    .split(/\n+/)
    .flatMap((b) => b.replace(/\s+/g, " ").trim().split(/(?<=[.!?…])\s+(?=[A-ZĄĆĘŁŃÓŚŹŻ„"(])/))
    .map((z) => z.trim())
    .filter(Boolean);
}

export function podzial(zd: string): string | null {
  const srodek = Math.floor(zd.length / 2);
  let kand = [...zd.matchAll(/,\s+(?=(?:który|która|które|którzy|że|ale|a|oraz|bo|więc|gdy|jeśli|ponieważ)(?![\wąćęłńóśźż]))|;\s+/g)].map((m) => m.index! + m[0].length);
  if (!kand.length) kand = [...zd.matchAll(/,\s+/g)].map((m) => m.index! + m[0].length);
  if (!kand.length) return null;
  const k = kand.reduce((a, b) => (Math.abs(b - srodek) < Math.abs(a - srodek) ? b : a));
  return `${zd.slice(0, k).replace(/[\s,;]+$/, "")} ‖ ${zd.slice(k)}`;
}

const wokol = (z: string, i: number, d: number) => {
  let a = Math.max(0, i - 30);
  let b = Math.min(z.length, i + d + 30);
  if (a > 0) {
    const sp = z.indexOf(" ", a);
    a = sp === -1 || sp > i ? a : sp + 1;
  }
  if (b < z.length) {
    const sp = z.lastIndexOf(" ", b);
    b = sp < i + d ? b : sp;
  }
  return `${a ? "…" : ""}${z.slice(a, b)}${b < z.length ? "…" : ""}`;
};

const KRAWEDZIE = "(?<![\\wąćęłńóśźż])";
const KONIEC = "(?![\\wąćęłńóśźż])";

export function analizaTekstu(tekst: string) {
  const zd = zdania(tekst);
  const uwagi: Uwaga[] = [];
  for (const z of zd) {
    const n = liczSlowa(z);
    if (n > MAX_ZDANIE) {
      uwagi.push({ rodzaj: "dlugie", tytul: `Zdanie ma ${n} słów`, tekst: z, podzial: podzial(z) ?? undefined });
    }
  }
  const wszystkie = zd.join(" ");
  for (const f of frazy as { fraza: string; zamiennik: string }[]) {
    const rx = new RegExp(KRAWEDZIE + f.fraza.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + KONIEC, "i");
    const m = rx.exec(wszystkie);
    if (m) {
      uwagi.push({ rodzaj: "fraza", tytul: `„${f.fraza}” → ${f.zamiennik}`, tekst: wokol(wszystkie, m.index, m[0].length) });
    }
  }
  for (const z of zd) {
    for (const m of z.matchAll(/(?<![\wąćęłńóśźż])([A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]{2,})\s+\1(?![\wąćęłńóśźż])/gi)) {
      uwagi.push({ rodzaj: "zapis", tytul: "Podwójne słowo", tekst: wokol(z, m.index!, m[0].length) });
    }
    for (const m of z.matchAll(/[a-ząćęłńóśźż]{2,}[,;:][A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż]/g)) {
      uwagi.push({ rodzaj: "zapis", tytul: "Brak spacji po przecinku", tekst: wokol(z, m.index!, m[0].length) });
    }
    for (const m of z.matchAll(/\.\.(?!\.)|,,|\s[,.;:!?](?=\s|$)/g)) {
      uwagi.push({ rodzaj: "zapis", tytul: "Błędna interpunkcja", tekst: wokol(z, m.index!, m[0].length) });
    }
    for (const m of z.matchAll(/(?<![\w.])([a-ząćęłńóśźż]{3,})\.\s+([a-ząćęłńóśźż]{2,})/g)) {
      if (!SKROTY.has(m[1])) {
        uwagi.push({ rodzaj: "zapis", tytul: "Zdanie po kropce zaczyna się małą literą", tekst: wokol(z, m.index!, m[0].length) });
      }
    }
  }
  const dl = zd.map(liczSlowa).filter((n) => n >= 4);
  return {
    slow: liczSlowa(tekst),
    zdan: zd.length,
    srednia: dl.length ? dl.reduce((a, b) => a + b, 0) / dl.length : 0,
    uwagi,
  };
}
