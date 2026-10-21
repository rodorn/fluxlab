import { NextResponse } from "next/server";

import { emailZLinku, podpisWypisuZgodny } from "@/lib/bramka";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Wycofanie zgody w kolektorze (pole wycofana). */
async function wycofaj(email: string): Promise<boolean> {
  const adres = process.env.RUCH_URL ?? "http://146.59.80.185:8087/wizyta";
  const sekret = process.env.RUCH_SEKRET;
  try {
    const odp = await fetch(adres.replace(/\/wizyta$/, "/zgoda"), {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(sekret ? { "X-Sekret": sekret } : {}) },
      body: JSON.stringify({ email, wycofaj: true }),
      signal: AbortSignal.timeout(6000),
    });
    return odp.ok;
  } catch {
    return false;
  }
}

async function obsluz(request: Request, przekieruj: boolean) {
  const u = new URL(request.url);
  const email = emailZLinku(u.searchParams.get("e") ?? "");
  const podpis = u.searchParams.get("t") ?? "";
  const ok = !!email && podpisWypisuZgodny(email, podpis) && (await wycofaj(email));
  if (!przekieruj) return new NextResponse(null, { status: ok ? 200 : 400 });
  return NextResponse.redirect(new URL(`/wypis?${ok ? "ok=1" : "blad=1"}`, u.origin), 303);
}

// Link „Wypisz mnie” w mailu: jedno kliknięcie wypisuje i pokazuje potwierdzenie.
export async function GET(request: Request) {
  return obsluz(request, true);
}

// One-click z nagłówka List-Unsubscribe-Post (Gmail, Outlook).
export async function POST(request: Request) {
  return obsluz(request, false);
}
