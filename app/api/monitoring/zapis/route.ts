import { NextResponse } from "next/server";
import { originDozwolony, utworzLimit } from "@/lib/limit-ip";
import { wywolajMonitoring } from "@/lib/monitoring";

export const runtime = "nodejs";
export const maxDuration = 60;

const limit = utworzLimit();

export async function POST(req: Request) {
  if (!originDozwolony(req.headers.get("origin"))) return NextResponse.json({ error: "origin" }, { status: 403 });
  if (limit(req)) return NextResponse.json({ error: "Za dużo prób, spróbuj za minutę." }, { status: 429 });
  const d = await req.json().catch(() => ({}));
  if (d.produkt !== "certyfikat") return NextResponse.json({ error: "Nieznany produkt." }, { status: 400 });
  const { status, dane } = await wywolajMonitoring("/zapis", {
    body: { produkt: d.produkt, email: String(d.email ?? "").slice(0, 120), cel: String(d.cel ?? "").slice(0, 200) },
  });
  return NextResponse.json(dane, { status });
}
