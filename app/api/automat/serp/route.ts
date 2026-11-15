import { NextResponse } from "next/server";
import { automatDozwolony } from "@/lib/fl-produkty";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

type Wynik = { pozycja: number; url: string; tytul: string };

export async function POST(req: Request) {
  if (!automatDozwolony(req))
    return NextResponse.json({ error: "brak dostępu" }, { status: 401 });
  const klucz = process.env.ZYTE_API_KEY;
  if (!klucz) return NextResponse.json({ error: "brak klucza" }, { status: 500 });
  const dane = (await req.json().catch(() => null)) as { fraza?: string; debug?: boolean } | null;
  const fraza = String(dane?.fraza ?? "").trim().slice(0, 100);
  if (fraza.length < 2) return NextResponse.json({ error: "fraza" }, { status: 400 });
  const url = `https://www.google.pl/search?q=${encodeURIComponent(fraza)}&hl=pl&gl=pl&num=20&pws=0`;
  try {
    const odp = await fetch("https://api.zyte.com/v1/extract", {
      method: "POST",
      signal: AbortSignal.timeout(50_000),
      headers: {
        authorization: `Basic ${Buffer.from(`${klucz}:`).toString("base64")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ url, serp: true, geolocation: "PL" }),
    });
    const tekst = await odp.text();
    if (!odp.ok) return NextResponse.json({ error: `zyte ${odp.status}`, szczegol: tekst.slice(0, 400) }, { status: 502 });
    const d = JSON.parse(tekst) as { serp?: { organicResults?: { url?: string; name?: string; rank?: number }[] } };
    if (dane?.debug) return NextResponse.json({ surowe: tekst.slice(0, 3000) });
    const wyniki: Wynik[] = (d.serp?.organicResults ?? [])
      .filter((x) => x.url)
      .map((x, i) => ({ pozycja: x.rank ?? i + 1, url: x.url as string, tytul: x.name ?? "" }));
    return NextResponse.json({ fraza, wyniki });
  } catch {
    return NextResponse.json({ error: "czas" }, { status: 504 });
  }
}
