import { NextResponse } from "next/server";
import { utworzLimit } from "@/lib/limit-ip";

const LEADY_URL = process.env.LEADY_URL ?? "http://146.59.80.185:8092";
const SEKRET = process.env.LEADY_SEKRET ?? "";
const limit = utworzLimit();

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function POST(req: Request, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params;
  if (!/^[A-Za-z0-9_-]{16,64}$/.test(token) || !SEKRET)
    return NextResponse.json({ error: "Nieznany formularz." }, { status: 404, headers: CORS });
  if (limit(req))
    return NextResponse.json({ error: "Za dużo zgłoszeń, spróbuj za minutę." }, { status: 429, headers: CORS });
  const dane = await req.json().catch(() => null);
  if (!dane || typeof dane !== "object" || Array.isArray(dane))
    return NextResponse.json({ error: "Nieprawidłowe dane." }, { status: 400, headers: CORS });
  try {
    const r = await fetch(`${LEADY_URL}/lead/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Sekret": SEKRET },
      body: JSON.stringify(dane),
      signal: AbortSignal.timeout(8000),
    });
    const odp = await r.json().catch(() => ({}));
    return NextResponse.json(odp, { status: r.status, headers: CORS });
  } catch {
    return NextResponse.json({ error: "Zgłoszenie chwilowo nie przeszło. Spróbuj za chwilę." }, { status: 502, headers: CORS });
  }
}
