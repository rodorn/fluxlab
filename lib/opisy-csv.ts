import { openaiJson } from "@/lib/openai-json";

export const MAKS_PRODUKTOW = 25;
export const MAKS_BAJTOW = 400_000;

export type Tabela = { naglowki: string[]; wiersze: string[][]; separator: string };

/** Dekoduje UTF-8, a gdy plik z Excela ma polskie znaki w Windows-1250, to tę stronę kodową. */
export function dekoduj(bufor: Uint8Array): string {
  const utf = new TextDecoder("utf-8", { fatal: false }).decode(bufor);
  if (!utf.includes("�")) return utf.replace(/^﻿/, "");
  return new TextDecoder("windows-1250").decode(bufor);
}

export function wczytajCsv(tekst: string): Tabela {
  const pierwsza = tekst.split(/\r?\n/, 1)[0] ?? "";
  const licz = (c: string) => pierwsza.split(c).length - 1;
  const separator = [";", "\t", ","].sort((a, b) => licz(b) - licz(a))[0];
  const wiersze: string[][] = [];
  let w: string[] = [];
  let p = "";
  let wCudzyslowie = false;
  for (let i = 0; i < tekst.length; i++) {
    const c = tekst[i];
    if (wCudzyslowie) {
      if (c === '"' && tekst[i + 1] === '"') { p += '"'; i++; }
      else if (c === '"') wCudzyslowie = false;
      else p += c;
    } else if (c === '"') wCudzyslowie = true;
    else if (c === separator) { w.push(p); p = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && tekst[i + 1] === "\n") i++;
      w.push(p); p = "";
      if (w.some((x) => x.trim())) wiersze.push(w);
      w = [];
    } else p += c;
  }
  w.push(p);
  if (w.some((x) => x.trim())) wiersze.push(w);
  const [naglowki = [], ...reszta] = wiersze;
  return { naglowki: naglowki.map((n) => n.trim()), wiersze: reszta, separator };
}

function zapiszKomorke(v: string, sep: string): string {
  return /["\r\n]/.test(v) || v.includes(sep) ? `"${v.replace(/"/g, '""')}"` : v;
}

export function zapiszCsv(naglowki: string[], wiersze: string[][], sep: string): string {
  const linie = [naglowki, ...wiersze].map((r) => r.map((v) => zapiszKomorke(v, sep)).join(sep));
  return "﻿" + linie.join("\r\n") + "\r\n";
}

const NAZWA_RX = /^(nazwa|name|produkt|product|tytu[lł]|title)/i;

export function kolumnaNazwy(naglowki: string[]): number {
  const i = naglowki.findIndex((n) => NAZWA_RX.test(n));
  return i >= 0 ? i : 0;
}

export type Produkt = { nazwa: string; cechy: string };

export function produktyZTabeli(t: Tabela): Produkt[] {
  const k = kolumnaNazwy(t.naglowki);
  return t.wiersze.map((w) => ({
    nazwa: (w[k] ?? "").trim().slice(0, 200),
    cechy: t.naglowki
      .map((n, i) => (i === k || !(w[i] ?? "").trim() ? "" : `${n}: ${(w[i] ?? "").trim()}`))
      .filter(Boolean)
      .join("; ")
      .slice(0, 800),
  }));
}

export type Opis = { opis_krotki: string; opis_dlugi: string; meta_title: string; meta_description: string };

const SCHEMAT = {
  type: "object",
  additionalProperties: false,
  required: ["opisy"],
  properties: {
    opisy: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["lp", "opis_krotki", "opis_dlugi", "meta_title", "meta_description"],
        properties: {
          lp: { type: "integer" },
          opis_krotki: { type: "string" },
          opis_dlugi: { type: "string" },
          meta_title: { type: "string" },
          meta_description: { type: "string" },
        },
      },
    },
  },
};

const INSTRUKCJA = `Piszesz opisy produktów do polskiego sklepu internetowego na podstawie nazwy i cech podanych przez sprzedawcę.
Zasady:
- Używaj wyłącznie cech z danych. Nie wymyślaj parametrów, materiałów, certyfikatów, gwarancji, wymiarów, nagród ani zastosowań, których dane nie podają. Gdy cech jest mało, opis jest krótszy, a nie dopisany.
- opis_krotki: 1 do 2 zdań, do 200 znaków, do karty produktu na liście.
- opis_dlugi: 2 do 4 krótkie akapity zwykłym tekstem (akapity rozdziel pustą linią), pierwszy o tym, czym produkt jest i dla kogo, kolejne o cechach. Bez nagłówków, bez list, bez HTML, bez emoji.
- meta_title: do 60 znaków, z nazwą produktu i najważniejszą cechą, bez nazwy sklepu.
- meta_description: od 120 do 155 znaków, konkretna, bez wykrzykników i bez pustych haseł typu "najlepsza jakość".
- Zakaz pustych fraz i ocen bez pokrycia w danych: "praktyczny wybór", "sprawdzi się na co dzień", "idealny", "doskonały", "funkcjonalny". Każde zdanie niesie fakt z danych albo wynika z niego wprost.
- Pisz po polsku, naturalnie, bez długich myślników, bez tłumaczenia dosłownego. Zachowaj dokładnie liczby, jednostki i nazwy własne z danych.
- Zwróć po jednym wpisie na każdy produkt, z tym samym numerem lp.`;

function przytnij(s: string, max: number): string {
  s = s.replace(/\s+/g, " ").trim();
  if (s.length <= max) return s;
  const c = s.slice(0, max + 1);
  const sp = c.lastIndexOf(" ");
  return (sp > max * 0.6 ? c.slice(0, sp) : s.slice(0, max)).replace(/[,;:\- ]+$/, "");
}

async function partia(p: { lp: number; nazwa: string; cechy: string }[]): Promise<Map<number, Opis>> {
  const w = await openaiJson<{ opisy: (Opis & { lp: number })[] }>({
    instrukcja: INSTRUKCJA,
    wejscie: JSON.stringify(p),
    nazwa: "opisy_produktow",
    schemat: SCHEMAT,
    maxTokenow: 700 * p.length + 500,
  });
  const m = new Map<number, Opis>();
  for (const o of w.opisy) {
    if (!p.some((x) => x.lp === o.lp) || !o.opis_krotki?.trim() || !o.opis_dlugi?.trim()) continue;
    m.set(o.lp, {
      opis_krotki: przytnij(o.opis_krotki, 220),
      opis_dlugi: o.opis_dlugi.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim(),
      meta_title: przytnij(o.meta_title, 60),
      meta_description: przytnij(o.meta_description, 155),
    });
  }
  return m;
}

/** Opisy dla wszystkich produktów; brakujące po pierwszej próbie są ponawiane raz. */
export async function opiszProdukty(produkty: Produkt[]): Promise<Opis[]> {
  const z = produkty.map((p, i) => ({ lp: i + 1, ...p }));
  const wynik = new Map<number, Opis>();
  for (let proba = 0; proba < 2; proba++) {
    const brak = z.filter((p) => !wynik.has(p.lp));
    if (!brak.length) break;
    const partie: (typeof z)[] = [];
    for (let i = 0; i < brak.length; i += 5) partie.push(brak.slice(i, i + 5));
    const odp = await Promise.allSettled(partie.map(partia));
    for (const o of odp) if (o.status === "fulfilled") o.value.forEach((v, k) => wynik.set(k, v));
  }
  const kompletne = z.map((p) => wynik.get(p.lp));
  if (kompletne.some((o) => !o)) throw new Error("niekompletne");
  return kompletne as Opis[];
}
