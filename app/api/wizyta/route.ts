import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Wlasny licznik wejsc, niezalezny od Google. Przegladarka rozmawia wylacznie
// z fluxlab.pl, a stad lecimy do kolektora. Bez tego przegladarka zablokowalaby
// polaczenie, bo kolektor nie stoi na HTTPS.
const KOLEKTOR = process.env.RUCH_URL ?? "http://146.59.80.185:8087/wizyta";
const SEKRET = process.env.RUCH_SEKRET ?? "";

export async function POST(request: Request) {
  // Bez sekretu nie wysylamy nic. Repozytorium jest publiczne, wiec wartosc
  // moze pochodzic wylacznie ze zmiennej srodowiskowej.
  if (!SEKRET) return new NextResponse(null, { status: 204 });

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

  try {
    await fetch(KOLEKTOR, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Sekret": SEKRET },
      body: JSON.stringify(ladunek),
      signal: AbortSignal.timeout(3000),
    });
  } catch {
    // Licznik nigdy nie moze popsuc strony odwiedzajacemu.
  }
  return new NextResponse(null, { status: 204 });
}
