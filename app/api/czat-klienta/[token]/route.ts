import { NextResponse } from "next/server";
import { utworzLimit } from "@/lib/limit-ip";
import { czatOdpowiedz } from "@/lib/leady/rdzen";
import { czystaHistoria } from "@/lib/leady/czat";

export const runtime = "nodejs";
export const maxDuration = 60;

const limit = utworzLimit();

export async function POST(req: Request, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params;
  if (!/^[A-Za-z0-9_-]{16,64}$/.test(token)) return NextResponse.json({ error: "Nieznany czat." }, { status: 404 });
  if (limit(req)) return NextResponse.json({ error: "Za dużo pytań, spróbuj za minutę." }, { status: 429 });
  const wej = await req.json().catch(() => null);
  const h = czystaHistoria(wej?.historia);
  if (!h) return NextResponse.json({ error: "Nieprawidłowe dane." }, { status: 400 });
  const w = await czatOdpowiedz(token, h);
  return w.blad ? NextResponse.json({ error: w.blad }, { status: w.kod }) : NextResponse.json({ odpowiedz: w.odpowiedz });
}
