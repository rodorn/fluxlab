import { NextResponse } from "next/server";
import { ipZadania, wyslijWizyte, zSieciAutomatow } from "@/lib/ruch";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = ipZadania(request);
  if (zSieciAutomatow(ip)) return new NextResponse(null, { status: 204 });

  let dane: Record<string, unknown>;
  try {
    dane = await request.json();
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  const ladunek = {
    sciezka: String(dane.sciezka ?? "").slice(0, 300),
    zrodlo: String(dane.zrodlo ?? "").slice(0, 200),
    kampania: String(dane.kampania ?? "").slice(0, 120),
    sesja: String(dane.sesja ?? "").slice(0, 40),
    telefon: Boolean(dane.telefon),
    zdarzenie: String(dane.zdarzenie ?? "odslona").slice(0, 40),
    // Rodzina przeglądarki i systemu, nie cały nagłówek. Bez tego nie da się
    // odróżnić wejścia właściciela strony od wejścia obcej osoby, bo oboje
    // korzystają z tego samego systemu.
    przegladarka: String(dane.przegladarka ?? "").slice(0, 30),
    system: String(dane.system ?? "").slice(0, 30),
  };

  await wyslijWizyte(ladunek);
  return new NextResponse(null, { status: 204 });
}
