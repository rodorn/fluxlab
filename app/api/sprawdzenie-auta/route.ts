import { NextResponse } from "next/server";

import { originDozwolony, utworzLimit } from "@/lib/limit-ip";
import { normalizujVin, sprawdzVin } from "@/lib/vin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const limit = utworzLimit();

/** Darmowy podgląd: poprawność VIN i dane z dekodera NHTSA vPIC, bez płatności i bez maila. */
export async function POST(req: Request) {
  if (!originDozwolony(req.headers.get("origin"))) return NextResponse.json({ ok: false, error: "origin" }, { status: 403 });
  if (limit(req)) return NextResponse.json({ ok: false, error: "Za dużo prób, spróbuj za minutę." }, { status: 429 });
  const body = await req.json().catch(() => null);
  const vin = normalizujVin(String(body?.vin ?? ""));
  const w = sprawdzVin(vin);
  if (!w.ok) return NextResponse.json({ ok: false, error: w.bledy[0] }, { status: 400 });
  let dane: Record<string, string> = {};
  try {
    const r = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}?format=json`, { cache: "no-store", signal: AbortSignal.timeout(15000) });
    if (r.ok) dane = (await r.json())?.Results?.[0] ?? {};
  } catch {}
  const t = (x?: string) => (x ?? "").trim();
  return NextResponse.json({
    ok: true,
    vin,
    region: w.region,
    uwagi: w.uwagi,
    marka: t(dane.Make),
    producent: t(dane.Manufacturer),
    fabryka: [t(dane.PlantCity), t(dane.PlantCountry)].filter(Boolean).join(", "),
    rok: t(dane.ModelYear),
  });
}
