import { NextResponse } from "next/server";
import { utworzLimit } from "@/lib/limit-ip";
import { zarezerwuj } from "@/lib/leady/rdzen";

export const runtime = "nodejs";
export const maxDuration = 60;

const limit = utworzLimit();

export async function POST(req: Request, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params;
  if (!/^[A-Za-z0-9_-]{16,64}$/.test(token)) return NextResponse.json({ error: "Nieznany kalendarz." }, { status: 404 });
  if (limit(req)) return NextResponse.json({ error: "Za dużo prób, spróbuj za minutę." }, { status: 429 });
  const wej = await req.json().catch(() => null);
  if (!wej || typeof wej !== "object") return NextResponse.json({ error: "Nieprawidłowe dane." }, { status: 400 });
  const w: { kod: number; blad?: string; termin?: string } = await zarezerwuj(token, wej as Record<string, unknown>).catch(() => ({ kod: 502, blad: "Rezerwacja chwilowo nie przeszła. Spróbuj za chwilę." }));
  return w.blad ? NextResponse.json({ error: w.blad }, { status: w.kod }) : NextResponse.json({ ok: true, termin: w.termin }, { status: 202 });
}
