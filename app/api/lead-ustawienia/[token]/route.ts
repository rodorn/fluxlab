import { NextResponse } from "next/server";
import { utworzLimit } from "@/lib/limit-ip";
import { zapiszUstawienia } from "@/lib/leady/rdzen";

export const runtime = "nodejs";
const limit = utworzLimit();

export async function POST(req: Request, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params;
  if (!/^[A-Za-z0-9_-]{16,64}$/.test(token)) return NextResponse.json({ error: "Nieznany panel." }, { status: 404 });
  if (limit(req)) return NextResponse.json({ error: "Za dużo prób, spróbuj za minutę." }, { status: 429 });
  const d = await req.json().catch(() => null);
  if (!d || typeof d !== "object") return NextResponse.json({ error: "Nieprawidłowe dane." }, { status: 400 });
  const w = await zapiszUstawienia(token, d).catch(() => ({ kod: 502, blad: "Zapis chwilowo nie przeszedł. Spróbuj za chwilę." }));
  return w.blad ? NextResponse.json({ error: w.blad }, { status: w.kod }) : NextResponse.json({ ok: true });
}
