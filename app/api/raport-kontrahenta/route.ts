import { NextResponse } from "next/server";

import { originDozwolony, utworzLimit } from "@/lib/limit-ip";
import { nipPoprawny, podatnikPoNip } from "@/lib/rejestry-publiczne";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const limit = utworzLimit();

/** Darmowy podgląd: podstawowe dane z wykazu VAT, bez płatności i bez maila. */
export async function POST(req: Request) {
  if (!originDozwolony(req.headers.get("origin"))) return NextResponse.json({ ok: false, error: "origin" }, { status: 403 });
  if (limit(req)) return NextResponse.json({ ok: false, error: "Za dużo prób, spróbuj za minutę." }, { status: 429 });
  const body = await req.json().catch(() => null);
  const nip = String(body?.nip ?? "").replace(/^PL/i, "").replace(/[-\s]/g, "");
  if (!nipPoprawny(nip)) return NextResponse.json({ ok: false, error: "To nie jest poprawny NIP. Ma 10 cyfr." }, { status: 400 });
  try {
    const p = await podatnikPoNip(nip);
    if (!p) return NextResponse.json({ ok: false, error: "Tej firmy nie ma w wykazie podatników VAT." }, { status: 404 });
    return NextResponse.json({ ok: true, nazwa: p.nazwa, statusVat: p.statusVat, krs: p.krs, adres: p.adres, rachunki: p.rachunki.length });
  } catch {
    return NextResponse.json({ ok: false, error: "Wykaz podatników VAT nie odpowiada. Spróbuj za chwilę." }, { status: 502 });
  }
}
