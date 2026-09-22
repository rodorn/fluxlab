import { NextResponse } from "next/server";

import type { DaneRaportu } from "@/lib/audyt-mail";
import { podpisZgodny } from "@/lib/audyt-podpis";
import { wyslijDoKlienta, wyslijKopie, zapiszZgode } from "@/lib/audyt-wyslij";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let dokument = "";
  let podpis = "";
  let email = "";
  let zgoda = false;
  try {
    const body = await request.json();
    dokument = typeof body?.dokument === "string" ? body.dokument : "";
    podpis = typeof body?.podpis === "string" ? body.podpis : "";
    email = typeof body?.email === "string" ? body.email.trim().toLowerCase().slice(0, 320) : "";
    zgoda = body?.zgoda === true;
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe zapytanie." }, { status: 400 });
  }

  if (!EMAIL_RX.test(email)) {
    return NextResponse.json({ error: "Podaj poprawny adres e-mail." }, { status: 400 });
  }
  // Bez zgody nie wysyłamy nic i nie zapisujemy adresu. Sam fakt wpisania
  // adresu w pole nie jest zgodą na cokolwiek.
  if (!zgoda) {
    return NextResponse.json(
      { error: "Bez zaznaczenia zgody nie mogę wysłać raportu ani zapisać adresu." },
      { status: 400 },
    );
  }

  // Bez ważnego podpisu nie wysyłamy nic. Treść przyszła z przeglądarki,
  // więc dopóki nie zgadza się z tym, co sami policzyliśmy, jest cudzym
  // tekstem, a nie naszym raportem.
  if (!dokument || !podpis || !podpisZgodny(dokument, podpis)) {
    return NextResponse.json(
      { error: "Nie mogę potwierdzić tego raportu. Uruchom sprawdzenie jeszcze raz." },
      { status: 400 },
    );
  }

  let dane: DaneRaportu;
  try {
    dane = JSON.parse(dokument) as DaneRaportu;
  } catch {
    return NextResponse.json({ error: "Uszkodzony raport." }, { status: 400 });
  }

  // Kolejność jest istotna: najpierw dowód zgody, potem wiadomość.
  const zapisano = await zapiszZgode({
    email,
    okazja: "audyt_strony",
    szczegol: dane.domena,
    zrodlo: request.headers.get("referer") ?? "",
  });

  const wyslano = await wyslijDoKlienta(email, dane);
  if (!wyslano) {
    return NextResponse.json(
      { error: "Nie udało się wysłać wiadomości. Spróbuj jeszcze raz za chwilę." },
      { status: 502 },
    );
  }

  // Druga kopia do mnie, tym razem z podpiętym kontaktem. Pierwsza poszła
  // anonimowo zaraz po samym badaniu, więc tu liczy się informacja, że ten
  // sam raport ma teraz twarz i adres.
  await wyslijKopie(dane, {
    email,
    zgoda: true,
    zrodlo: request.headers.get("referer") ?? undefined,
  });

  return NextResponse.json({ ok: true, zapisanoZgode: zapisano });
}
