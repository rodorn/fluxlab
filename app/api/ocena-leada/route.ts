import { NextResponse } from "next/server";
import { utworzLimit } from "@/lib/limit-ip";
import { ocenaLeada } from "@/lib/leady/ocena";

export const runtime = "nodejs";

const limit = utworzLimit();

/** Podgląd produktu „Ocena leada przez AI”: ocena wpisanej wiadomości, nic nie jest zapisywane. */
export async function POST(req: Request) {
  if (limit(req)) return NextResponse.json({ error: "Za dużo prób, spróbuj za minutę." }, { status: 429 });
  const wiadomosc = String((await req.json().catch(() => ({})))?.wiadomosc ?? "").trim().slice(0, 1500);
  if (wiadomosc.length < 10) return NextResponse.json({ error: "Wpisz treść zgłoszenia, co najmniej kilka słów." }, { status: 400 });
  try {
    return NextResponse.json(await ocenaLeada({ wiadomosc }, null));
  } catch (e) {
    console.error("podglad oceny", e);
    return NextResponse.json({ error: "Nie udało się ocenić zgłoszenia. Spróbuj ponownie za chwilę." }, { status: 502 });
  }
}
