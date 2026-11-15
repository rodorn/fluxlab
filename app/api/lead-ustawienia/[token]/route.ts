import { NextResponse } from "next/server";
import { utworzLimit } from "@/lib/limit-ip";

const LEADY_URL = process.env.LEADY_URL ?? "http://146.59.80.185:8092";
const SEKRET = process.env.LEADY_SEKRET ?? "";
const limit = utworzLimit();

export async function POST(req: Request, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params;
  if (!/^[A-Za-z0-9_-]{16,64}$/.test(token) || !SEKRET) return NextResponse.json({ error: "Nieznany panel." }, { status: 404 });
  if (limit(req)) return NextResponse.json({ error: "Za dużo prób, spróbuj za minutę." }, { status: 429 });
  const dane = await req.json().catch(() => null);
  if (!dane || typeof dane !== "object") return NextResponse.json({ error: "Nieprawidłowe dane." }, { status: 400 });
  try {
    const r = await fetch(`${LEADY_URL}/ustawienia/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Sekret": SEKRET },
      body: JSON.stringify(dane),
      signal: AbortSignal.timeout(8000),
    });
    return NextResponse.json(await r.json().catch(() => ({})), { status: r.status });
  } catch {
    return NextResponse.json({ error: "Zapis chwilowo nie przeszedł. Spróbuj za chwilę." }, { status: 502 });
  }
}
