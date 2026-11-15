import { NextResponse } from "next/server";
import { utworzLimit } from "@/lib/limit-ip";
import { daneFirmy } from "@/lib/leady/dane-firmy";

export const runtime = "nodejs";

const limit = utworzLimit();

/** Podgląd tego, co produkt „Dane firmy do leada z NIP” dopisuje do zgłoszenia: wykaz podatników VAT (MF) i KRS. */
export async function POST(req: Request) {
  if (limit(req)) return NextResponse.json({ error: "Za dużo prób, spróbuj za minutę." }, { status: 429 });
  const f = await daneFirmy(String((await req.json().catch(() => ({})))?.nip ?? ""));
  if (f.blad) return NextResponse.json({ error: f.blad }, { status: f.kod });
  return NextResponse.json(f);
}
