import { NextResponse } from "next/server";
import { originDozwolony, utworzLimit } from "@/lib/limit-ip";
import { wywolajMonitoring } from "@/lib/monitoring";

export const runtime = "nodejs";
export const maxDuration = 60;

const limit = utworzLimit();

/** Sprawdza bez wysyłki, czy obsłużymy formularz pod podanym adresem. */
export async function GET(req: Request) {
  if (!originDozwolony(req.headers.get("origin"))) return NextResponse.json({ error: "origin" }, { status: 403 });
  if (limit(req)) return NextResponse.json({ error: "Za dużo prób, spróbuj za minutę." }, { status: 429 });
  const adres = new URL(req.url).searchParams.get("adres") ?? "";
  const { status, dane } = await wywolajMonitoring(`/formularz?adres=${encodeURIComponent(adres.trim().slice(0, 300))}`);
  return NextResponse.json(dane, { status });
}
