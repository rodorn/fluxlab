import { NextResponse } from "next/server";
import { utworzLimit } from "@/lib/limit-ip";
import { dopasuj, kryteria, pobierz, type Ogloszenie } from "@/lib/leady/bzp";

export const runtime = "nodejs";
export const maxDuration = 60;

const limit = utworzLimit();
let cache: { czas: number; lista: Ogloszenie[] } | null = null;

export async function GET(req: Request) {
  if (limit(req)) return NextResponse.json({ error: "Za dużo zapytań, spróbuj za minutę." }, { status: 429 });
  const q = (new URL(req.url).searchParams.get("q") ?? "").trim().slice(0, 100);
  const k = kryteria({ bzp_slowa: q });
  if (!k) return NextResponse.json({ error: "Wpisz słowo kluczowe." }, { status: 400 });
  try {
    if (!cache || Date.now() - cache.czas > 10 * 60000) cache = { czas: Date.now(), lista: await pobierz(new Date(Date.now() - 2 * 86400000).toISOString()) };
    const trafione = dopasuj(cache.lista, k).reverse();
    return NextResponse.json({ razem: trafione.length, ogloszenia: trafione.slice(0, 8) });
  } catch (e) {
    console.error("bzp-demo", e);
    return NextResponse.json({ error: "Rejestr BZP nie odpowiada. Spróbuj za chwilę." }, { status: 502 });
  }
}
