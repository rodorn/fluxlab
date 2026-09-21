import { after, NextResponse } from "next/server";

import { czystaDomena, zmierz } from "@/lib/audyt-pomiar";
import { ocenStrone, potrzebneDostepy, punktacja, wycenNaprawe } from "@/lib/audyt-ocena";
import { materialDo, napiszRaport } from "@/lib/audyt-raport";
import { zapamietaj } from "@/lib/audyt-cache";
import type { DaneRaportu } from "@/lib/audyt-mail";
import { wyslijKopie } from "@/lib/audyt-wyslij";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Pomiar dobiera wagę plików, których serwer nie zadeklarował, więc bywa
// dłuższy niż zwykłe sprawdzenie. Sześćdziesiąt sekund to górna granica
// planu i jednocześnie granica cierpliwości człowieka patrzącego na pasek.
export const maxDuration = 60;

/**
 * Prosty licznik zapytań na adres. Trzymany w pamięci funkcji, więc po
 * uśpieniu instancji zeruje się sam. To świadomie nie jest szczelna ochrona,
 * tylko hamulec na przypadkowe zapętlenie i na kogoś, kto wkleiłby ten adres
 * do pętli. Pełny limit wymagałby wspólnej pamięci, a ta jeszcze tu nie stoi.
 */
const LIMIT_NA_GODZINE = 12;
const licznik = new Map<string, { ile: number; od: number }>();

function przekroczonyLimit(ip: string): boolean {
  const teraz = Date.now();
  const wpis = licznik.get(ip);
  if (!wpis || teraz - wpis.od > 3_600_000) {
    licznik.set(ip, { ile: 1, od: teraz });
    return false;
  }
  wpis.ile += 1;
  return wpis.ile > LIMIT_NA_GODZINE;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "nieznany";
  if (przekroczonyLimit(ip)) {
    return NextResponse.json(
      { error: "Za dużo sprawdzeń z tego adresu. Spróbuj za godzinę." },
      { status: 429 },
    );
  }

  let domena = "";
  try {
    const body = await request.json();
    domena = czystaDomena(body?.domena);
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe zapytanie." }, { status: 400 });
  }
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domena)) {
    return NextResponse.json(
      { error: "Podaj sam adres strony, na przykład twojafirma.pl" },
      { status: 400 },
    );
  }

  const pomiar = await zmierz(domena);
  const ustalenia = ocenStrone(pomiar);
  const wycena = wycenNaprawe(ustalenia);
  const punkty = punktacja(ustalenia);
  const dostepy = potrzebneDostepy(ustalenia);

  const klucz = process.env.OPENAI_API_KEY;
  // Raport opisowy jest dodatkiem do pomiaru, nie warunkiem. Gdy model nie
  // odpowie, klient i tak dostaje wszystkie ustalenia, kolejność i cenę,
  // bo te nie pochodzą od modelu. Lepszy raport bez eseju niż błąd.
  const opis = klucz
    ? await napiszRaport(pomiar, ustalenia, wycena, punkty, klucz)
    : null;

  const zbadano = new Date().toISOString();
  const pelne: DaneRaportu = {
    domena,
    punkty,
    zbadano,
    pomiar,
    ustalenia: ustalenia.map((u) => ({ ...u, material: materialDo(u.klucz) })),
    wycena,
    dostepy,
    opis,
  };
  // Raport zostaje po stronie serwera pod losowym identyfikatorem. Gdy
  // klient poprosi o wysyłkę, wyjmiemy dokładnie ten dokument, a nie ten,
  // który przeglądarka odeśle jako swój.
  const id = zapamietaj(pelne);

  // Kopia leci po KAŻDYM audycie, także anonimowym, i leci po odpowiedzi,
  // żeby nie kazać człowiekowi czekać na serwer pocztowy.
  after(async () => {
    await wyslijKopie(pelne, {
      zrodlo: request.headers.get("referer") ?? undefined,
    });
  });

  return NextResponse.json({
    id,
    domena,
    osiagalna: pomiar.osiagalna,
    punkty,
    pomiar: {
      ttfbMs: pomiar.ttfbMs,
      pelnyMs: pomiar.pelnyMs,
      statusHtml: pomiar.statusHtml,
      htmlBajty: pomiar.htmlBajty,
      kompresjaHtml: pomiar.kompresjaHtml,
      serwer: pomiar.serwer,
      trescZnakow: pomiar.trescZnakow,
      tytul: pomiar.tytul,
      opisMeta: pomiar.opisMeta,
      h1: pomiar.h1,
      canonical: pomiar.canonical,
      jezyk: pomiar.jezyk,
      noindex: pomiar.noindex,
      og: pomiar.og,
      daneStrukturalne: pomiar.daneStrukturalne,
      sitemap: pomiar.sitemap,
      robots: pomiar.robots,
      obrazy: pomiar.obrazy,
      cert: pomiar.cert,
      poczta: pomiar.poczta,
      mobile: pomiar.mobile,
      zasoby: {
        znalezione: pomiar.zasoby.length,
        zwazone: pomiar.zasoby.filter((z) => z.bajty !== null).length,
        najciezsze: pomiar.zasoby
          .filter((z) => z.bajty !== null)
          .sort((a, b) => (b.bajty ?? 0) - (a.bajty ?? 0))
          .slice(0, 5)
          .map((z) => ({
            nazwa: z.adres.split("/").pop()?.slice(0, 60) ?? z.adres,
            rodzaj: z.rodzaj,
            bajty: z.bajty,
          })),
      },
    },
    ustalenia: ustalenia.map((u) => ({ ...u, material: materialDo(u.klucz) })),
    wycena,
    dostepy,
    opis,
  });
}
