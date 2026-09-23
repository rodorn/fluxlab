import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MF_API = "https://wl-api.mf.gov.pl/api/search/nip";

function cleanNip(raw: string): string {
  return (raw || "").replace(/\D/g, "");
}

// Suma kontrolna NIP. Odsiewa literowki zanim uderzymy w API Ministerstwa.
function nipChecksumOk(nip: string): boolean {
  if (nip.length !== 10) return false;
  const w = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  const sum = w.reduce((acc, weight, i) => acc + weight * Number(nip[i]), 0);
  return sum % 11 === Number(nip[9]);
}

export async function POST(request: Request) {
  let nip = "";
  try {
    const body = await request.json();
    nip = cleanNip(body?.nip);
  } catch {
    return NextResponse.json(
      { error: "Nieprawidłowe zapytanie." },
      { status: 400 },
    );
  }

  if (nip.length !== 10) {
    return NextResponse.json(
      { error: "NIP musi mieć dziesięć cyfr." },
      { status: 400 },
    );
  }

  if (!nipChecksumOk(nip)) {
    return NextResponse.json({
      status: "bledny_nip",
      nip,
      verdict: "CZERWONY",
      headline: "To nie jest prawidłowy NIP",
      detail:
        "Suma kontrolna się nie zgadza, więc taki numer nie mógł zostać nadany. Najczęściej to literówka, ale bywa też numer wymyślony na potrzeby oszustwa.",
    });
  }

  const date = new Date().toISOString().slice(0, 10);

  let subject: Record<string, unknown> | null = null;
  try {
    const res = await fetch(`${MF_API}/${nip}?date=${date}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (res.status === 404) {
      subject = null;
    } else if (!res.ok) {
      throw new Error(`MF API ${res.status}`);
    } else {
      const data = await res.json();
      subject = data?.result?.subject ?? null;
    }
  } catch {
    return NextResponse.json(
      {
        error:
          "Rejestr Ministerstwa Finansów nie odpowiedział. Spróbuj za chwilę albo zamów pełny raport, wtedy sprawdzimy to ręcznie.",
      },
      { status: 502 },
    );
  }

  if (!subject) {
    return NextResponse.json({
      status: "brak_w_wykazie",
      nip,
      verdict: "CZERWONY",
      headline: "Tego numeru nie ma w wykazie podatników VAT",
      detail:
        "Ministerstwo Finansów nie zwraca żadnego podmiotu dla tego numeru. To najpoważniejszy sygnał ostrzegawczy. Nie wysyłaj zaliczki i zażądaj dokumentów rejestrowych.",
    });
  }

  const statusVat = String(subject.statusVat ?? "");
  const accounts = Array.isArray(subject.accountNumbers)
    ? (subject.accountNumbers as string[])
    : [];
  const registered = String(subject.registrationLegalDate ?? "");

  let ageDays: number | null = null;
  if (registered) {
    const d = new Date(registered);
    if (!Number.isNaN(d.getTime())) {
      ageDays = Math.floor((Date.now() - d.getTime()) / 86_400_000);
    }
  }

  const warnings: string[] = [];
  if (statusVat !== "Czynny") {
    warnings.push(
      `Podmiot nie jest czynnym podatnikiem VAT (status: ${statusVat || "brak"}).`,
    );
  }
  if (accounts.length === 0) {
    warnings.push(
      "Do wykazu nie zgłoszono żadnego firmowego rachunku, więc nie ma z czym porównać numeru konta do przelewu.",
    );
  }
  if (ageDays !== null && ageDays < 90) {
    warnings.push(
      `Firma działa dopiero ${ageDays} dni, co przy dużej przedpłacie podnosi ryzyko.`,
    );
  }

  const verdict =
    statusVat !== "Czynny"
      ? "CZERWONY"
      : warnings.length > 0
        ? "ZOLTY"
        : "ZIELONY";

  return NextResponse.json({
    status: "znaleziony",
    nip,
    verdict,
    headline:
      verdict === "ZIELONY"
        ? "Podstawowe dane się zgadzają"
        : verdict === "ZOLTY"
          ? "Jest kilka rzeczy do wyjaśnienia"
          : "Uważaj, coś tu nie gra",
    name: String(subject.name ?? ""),
    statusVat,
    regon: String(subject.regon ?? ""),
    krs: String(subject.krs ?? ""),
    address: String(subject.workingAddress ?? subject.residenceAddress ?? ""),
    registered,
    accountsCount: accounts.length,
    warnings,
  });
}
