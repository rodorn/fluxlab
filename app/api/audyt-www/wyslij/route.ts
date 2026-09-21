import { NextResponse } from "next/server";

import { odczytaj } from "@/lib/audyt-cache";
import { wyslijDoKlienta, wyslijKopie, zapiszZgode } from "@/lib/audyt-wyslij";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let id = "";
  let email = "";
  let zgoda = false;
  try {
    const body = await request.json();
    id = typeof body?.id === "string" ? body.id : "";
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

  const dane = odczytaj(id);
  if (!dane) {
    return NextResponse.json(
      {
        error:
          "Ten raport wygasł po stronie serwera. Uruchom sprawdzenie jeszcze raz, potrwa chwilę.",
      },
      { status: 410 },
    );
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
