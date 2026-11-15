import { NextResponse, after } from "next/server";
import { utworzLimit } from "@/lib/limit-ip";
import { przetworz, przyjmij } from "@/lib/leady/rdzen";

export const runtime = "nodejs";
export const maxDuration = 60;

const limit = utworzLimit();
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function POST(req: Request, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params;
  if (!/^[A-Za-z0-9_-]{16,64}$/.test(token)) return NextResponse.json({ error: "Nieznany formularz." }, { status: 404, headers: CORS });
  if (limit(req)) return NextResponse.json({ error: "Za dużo zgłoszeń, spróbuj za minutę." }, { status: 429, headers: CORS });
  const ct = req.headers.get("content-type") ?? "";
  const wej = ct.includes("json") ? await req.json().catch(() => null) : Object.fromEntries(await req.formData().catch(() => new FormData()));
  if (!wej || typeof wej !== "object") return NextResponse.json({ error: "Nieprawidłowe dane." }, { status: 400, headers: CORS });
  const w = await przyjmij(token, wej as Record<string, unknown>);
  if (w.blad) return NextResponse.json({ error: w.blad }, { status: w.kod, headers: CORS });
  after(() => przetworz(token, w.id!));
  return NextResponse.json({ ok: true }, { status: 202, headers: CORS });
}
