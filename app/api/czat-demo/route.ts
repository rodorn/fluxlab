import { NextResponse } from "next/server";
import { utworzLimit } from "@/lib/limit-ip";
import { czystaHistoria, odpowiedzCzatu } from "@/lib/leady/czat";

export const runtime = "nodejs";
export const maxDuration = 60;

const limit = utworzLimit();

const WIEDZA_DEMO = `Studio Dachy Kowalski, Warszawa. Układamy i naprawiamy dachy na domach jednorodzinnych: dachówka ceramiczna, blachodachówka, papa termozgrzewalna.
Wycena: bezpłatna, po oględzinach dachu, odpowiadamy w ciągu 2 dni roboczych.
Czas realizacji: dach domu 120 m2 to zwykle 5-7 dni roboczych, w zależności od pogody.
Gwarancja: 10 lat na wykonanie, gwarancja producenta na materiały.
Godziny pracy biura: pon-pt 8-16. Telefon: 22 000 00 00. E-mail: biuro@dachy-kowalski.example.
Obszar działania: Warszawa i do 50 km od niej. Nie wykonujemy dachów płaskich na budynkach wielorodzinnych.`;

export async function POST(req: Request) {
  if (limit(req)) return NextResponse.json({ error: "Za dużo pytań, spróbuj za minutę." }, { status: 429 });
  const wej = await req.json().catch(() => null);
  const h = czystaHistoria(wej?.historia);
  if (!h) return NextResponse.json({ error: "Nieprawidłowe dane." }, { status: 400 });
  try {
    return NextResponse.json({ odpowiedz: await odpowiedzCzatu("Studio Dachy Kowalski", WIEDZA_DEMO, h) });
  } catch (e) {
    console.error("czat-demo", e);
    return NextResponse.json({ error: "Nie mogę teraz odpowiedzieć. Spróbuj za chwilę." }, { status: 502 });
  }
}
