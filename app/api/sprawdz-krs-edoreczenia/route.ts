import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * Czy spolka ma w odpisie KRS adres do doreczen elektronicznych.
 *
 * Odpis aktualny z api-krs.ms.gov.pl ma pole
 * dzial1.siedzibaIAdres.adresDoDoreczenElektronicznychWpisanyDoBAE dopiero
 * wtedy, gdy adres jest w bazie adresow elektronicznych. Brak pola to
 * dokladnie ten stan, o ktorym piszemy w mailach, wiec narzedzie pokazuje
 * to samo zrodlo, z ktorego bierzemy zarzut.
 */

const ODPIS = "https://api-krs.ms.gov.pl/api/krs/OdpisAktualny/";
const DOBA_MS = 24 * 3_600_000;
const LIMIT_NA_MINUTE = 10;

type Wynik = {
  status: "JEST_ADRES" | "BRAK_ADRESU";
  krs: string;
  nazwa: string;
  forma: string;
  dataWpisu: string;
  stanZDnia: string;
  adres: string | null;
  termin: string;
  naglowek: string;
  komentarz: string;
};

const pamiec = new Map<string, { kiedy: number; wynik: Wynik }>();
const licznik = new Map<string, { ile: number; od: number }>();

function przekroczonyLimit(ip: string): boolean {
  const teraz = Date.now();
  const wpis = licznik.get(ip);
  if (!wpis || teraz - wpis.od > 60_000) {
    licznik.set(ip, { ile: 1, od: teraz });
    return false;
  }
  wpis.ile += 1;
  return wpis.ile > LIMIT_NA_MINUTE;
}

/** Odpis bywa z surowymi znakami sterujacymi w tekstach, a JSON.parse ich
 *  nie przyjmuje. Zamiana na spacje niczego nie psuje, bo poza napisami to
 *  zwykle biale znaki. */
async function pobierz(krs: string, rejestr: "P" | "S") {
  const r = await fetch(`${ODPIS}${krs}?rejestr=${rejestr}&format=json`, {
    headers: { "User-Agent": "curl/8.5.0", Accept: "application/json" },
    signal: AbortSignal.timeout(15000),
  });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`KRS ${r.status}`);
  const tekst = (await r.text()).replace(/[\u0000-\u001f]/g, " ");
  return JSON.parse(tekst);
}

function naIso(data: string): string {
  const [d, m, r] = data.split(".");
  return `${r}-${m}-${d}`;
}

function ocen(krs: string, odpis: any): Wynik {
  const naglowekA = odpis?.odpis?.naglowekA ?? {};
  const dzial1 = odpis?.odpis?.dane?.dzial1 ?? {};
  const nazwa: string = dzial1?.danePodmiotu?.nazwa ?? "";
  const forma: string = dzial1?.danePodmiotu?.formaPrawna ?? "";
  const dataWpisu: string = naglowekA?.dataRejestracjiWKRS ?? "";
  const stanZDnia: string = naglowekA?.stanZDnia ?? "";
  const adres: string | null =
    dzial1?.siedzibaIAdres?.adresDoDoreczenElektronicznychWpisanyDoBAE ?? null;

  const przed2025 = !dataWpisu || naIso(dataWpisu) < "2025-01-01";
  const termin = przed2025
    ? "od 1 kwietnia 2025, bo spółka była w KRS przed 2025 rokiem"
    : `od dnia wpisu do KRS (${dataWpisu}), bo spółka powstała po 1 stycznia 2025`;

  if (adres) {
    return {
      status: "JEST_ADRES",
      krs,
      nazwa,
      forma,
      dataWpisu,
      stanZDnia,
      adres,
      termin,
      naglowek: "Adres do e-Doręczeń jest w odpisie KRS",
      komentarz:
        "Obowiązek jest spełniony. Warto jeszcze sprawdzić, kto w spółce jest administratorem skrzynki i czy powiadomienia o nowych pismach trafiają do osoby, która je odbiera, bo po 14 dniach pismo uznaje się za doręczone.",
    };
  }
  return {
    status: "BRAK_ADRESU",
    krs,
    nazwa,
    forma,
    dataWpisu,
    stanZDnia,
    adres: null,
    termin,
    naglowek: "W odpisie KRS nie ma adresu do e-Doręczeń",
    komentarz:
      "Wniosek o adres składa się przez Biznes.gov.pl, spółka wskazuje w nim administratora skrzynki. Kary pieniężnej za brak adresu nie ma, ale urzędy doręczają wtedy pisma papierowo albo usługą hybrydową. Jeśli wniosek już złożyliście i czeka na aktywację, adres pojawi się w odpisie po aktywacji.",
  };
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "nieznany";
  if (przekroczonyLimit(ip)) {
    return NextResponse.json(
      { error: "Za dużo sprawdzeń w ciągu minuty. Spróbujcie za chwilę." },
      { status: 429 },
    );
  }

  let cyfry = "";
  try {
    const body = await request.json();
    cyfry = String(body?.krs ?? "").replace(/\D/g, "");
  } catch {
    return NextResponse.json(
      { error: "Nieprawidłowe zapytanie." },
      { status: 400 },
    );
  }
  if (!cyfry || cyfry.length > 10 || /^0+$/.test(cyfry)) {
    return NextResponse.json(
      { error: "Podajcie numer KRS, do 10 cyfr, na przykład 0000422082." },
      { status: 400 },
    );
  }
  const krs = cyfry.padStart(10, "0");

  const zapis = pamiec.get(krs);
  if (zapis && Date.now() - zapis.kiedy < DOBA_MS) {
    return NextResponse.json(zapis.wynik);
  }

  try {
    const odpis = (await pobierz(krs, "P")) ?? (await pobierz(krs, "S"));
    if (!odpis) {
      return NextResponse.json(
        {
          error: `Nie ma w KRS podmiotu o numerze ${krs}. Sprawdźcie numer, na przykład w stopce strony albo na fakturze.`,
        },
        { status: 404 },
      );
    }
    const wynik = ocen(krs, odpis);
    pamiec.set(krs, { kiedy: Date.now(), wynik });
    return NextResponse.json(wynik);
  } catch {
    return NextResponse.json(
      {
        error:
          "Wyszukiwarka KRS Ministerstwa Sprawiedliwości nie odpowiedziała. Spróbujcie za kilka minut.",
      },
      { status: 502 },
    );
  }
}
