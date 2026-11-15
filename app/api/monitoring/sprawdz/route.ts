import { NextResponse } from "next/server";
import { BladAdresu, sprawdzAdres } from "@/lib/bezpieczny-fetch";
import { originDozwolony, utworzLimit } from "@/lib/limit-ip";

export const runtime = "nodejs";
export const maxDuration = 30;

const limit = utworzLimit();

/** Jednorazowe sprawdzenie dostępności strony: kod odpowiedzi i czas, jak w płatnym monitoringu. */
export async function GET(req: Request) {
  if (!originDozwolony(req.headers.get("origin"))) return NextResponse.json({ error: "origin" }, { status: 403 });
  if (limit(req)) return NextResponse.json({ error: "Za dużo prób, spróbuj za minutę." }, { status: 429 });
  const adres = new URL(req.url).searchParams.get("adres") ?? "";
  let url: URL;
  try {
    url = await sprawdzAdres(adres.trim().slice(0, 300));
  } catch (e) {
    return NextResponse.json({ error: e instanceof BladAdresu ? e.message : "Nie udało się sprawdzić adresu." }, { status: 400 });
  }
  const t = Date.now();
  try {
    const r = await fetch(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(15_000),
      headers: { "User-Agent": "FluxLab-Monitor/1.0 (+https://fluxlab.pl)" },
    });
    await r.body?.cancel();
    return NextResponse.json({ adres: url.host + (url.pathname === "/" ? "" : url.pathname), ok: r.status < 400, kod: r.status, ms: Date.now() - t });
  } catch {
    return NextResponse.json({ adres: url.host, ok: false, kod: 0, ms: Date.now() - t });
  }
}
