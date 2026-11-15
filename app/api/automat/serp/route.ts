import { NextResponse } from "next/server";
import { automatDozwolony } from "@/lib/fl-produkty";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

type Wynik = { pozycja: number; url: string; tytul: string };

const tekst = (h: string) =>
  h
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

/** Wyniki organiczne ze strony wyników Google: odnośnik z nagłówkiem h3, kolejność = pozycja. */
export function wyniki(html: string): Wynik[] {
  const out: Wynik[] = [];
  const widziane = new Set<string>();
  for (const m of html.matchAll(/<a\b[^>]*?href="([^"]+)"[^>]*>((?:(?!<\/a>)[\s\S]){0,1500}?)<\/a>/g)) {
    if (!/<h3\b/.test(m[2])) continue;
    let url = m[1].replace(/&amp;/g, "&");
    if (url.startsWith("/url?")) url = new URLSearchParams(url.slice(5)).get("q") ?? "";
    if (!/^https?:\/\//.test(url)) continue;
    let host = "";
    try {
      host = new URL(url).hostname;
    } catch {
      continue;
    }
    if (/(^|\.)google\.[a-z.]+$/.test(host) || widziane.has(url)) continue;
    widziane.add(url);
    out.push({ pozycja: out.length + 1, url, tytul: tekst(m[2]).slice(0, 160) });
  }
  return out;
}

async function pobierz(url: string, klucz: string) {
  const odp = await fetch("https://api.zyte.com/v1/extract", {
    method: "POST",
    signal: AbortSignal.timeout(50_000),
    headers: {
      authorization: `Basic ${Buffer.from(`${klucz}:`).toString("base64")}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ url, httpResponseBody: true, geolocation: "PL" }),
  });
  if (!odp.ok) throw new Error(`zyte ${odp.status}`);
  const d = (await odp.json()) as { httpResponseBody?: string };
  return Buffer.from(d.httpResponseBody ?? "", "base64").toString("utf8");
}

export async function POST(req: Request) {
  if (!automatDozwolony(req))
    return NextResponse.json({ error: "brak dostępu" }, { status: 401 });
  const klucz = process.env.ZYTE_API_KEY;
  if (!klucz) return NextResponse.json({ error: "brak klucza" }, { status: 500 });
  const dane = (await req.json().catch(() => null)) as { fraza?: string } | null;
  const fraza = String(dane?.fraza ?? "").trim().slice(0, 100);
  if (fraza.length < 2) return NextResponse.json({ error: "fraza" }, { status: 400 });
  const q = encodeURIComponent(fraza);
  const adresy = [
    `https://www.google.pl/search?q=${q}&hl=pl&gl=pl&num=20&pws=0`,
    `https://www.google.pl/search?q=${q}&hl=pl&gl=pl`,
  ];
  let ostatni = "";
  for (const url of adresy) {
    try {
      const w = wyniki(await pobierz(url, klucz));
      if (w.length >= 3) return NextResponse.json({ fraza, wyniki: w.slice(0, 20) });
      ostatni = `za mało wyników (${w.length})`;
    } catch (e) {
      ostatni = e instanceof Error ? e.message : "błąd";
    }
  }
  return NextResponse.json({ error: ostatni }, { status: 502 });
}
