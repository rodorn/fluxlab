import { NextResponse } from "next/server";
import { ocen, pobierz, type Wynik } from "@/lib/krs-edoreczenia";

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

const DOBA_MS = 24 * 3_600_000;
const LIMIT_NA_MINUTE = 10;

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

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "nieznany";
  if (przekroczonyLimit(ip)) {
    return NextResponse.json(
      { error: "Za dużo sprawdzeń w ciągu minuty. Spróbuj za chwilę." },
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
      { error: "Podaj numer KRS, do 10 cyfr, na przykład 0000422082." },
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
          error: `Nie ma w KRS podmiotu o numerze ${krs}. Sprawdź numer, na przykład w stopce strony albo na fakturze.`,
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
          "Wyszukiwarka KRS Ministerstwa Sprawiedliwości nie odpowiedziała. Spróbuj za kilka minut.",
      },
      { status: 502 },
    );
  }
}
