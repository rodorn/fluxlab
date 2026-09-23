import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 45;

const BAZA = "https://wyszukiwarka-msig.ms.gov.pl/api/Monitor/";
const NAGLOWKI = {
  "User-Agent":
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
  Accept: "application/json, text/plain, */*",
  Referer: "https://wyszukiwarka-msig.ms.gov.pl/",
};

// Sad publikuje obwieszczenie o rozwiazaniu spolki bez likwidacji w dwoch
// wariantach odmiany, wiec pytamy o oba i scalamy wynik.
const FRAZY = [
  "bez przeprowadzania postępowania likwidacyjnego",
  "bez przeprowadzenia postępowania likwidacyjnego",
];

type Pozycja = {
  id: number;
  entityName: string;
  dateOfPublication: string;
  monitorNumber: string;
};

function parametry(dodatkowe: Record<string, string>) {
  const dzis = new Date();
  const p = new URLSearchParams({
    entityName: "",
    krs: "",
    nip: "",
    textInPosition: "",
    textInBody: "",
    signatureType: "A",
    signatureOfCase: "",
    signatureKRS: "",
    court: "",
    from: "2013-1-1",
    // Interfejs oczekuje daty bez zer wiodacych, inaczej odpowiada bledem.
    to: `${dzis.getFullYear()}-${dzis.getMonth() + 1}-${dzis.getDate()}`,
    page: "1",
    ...dodatkowe,
  });
  return p.toString();
}

async function szukaj(dodatkowe: Record<string, string>): Promise<Pozycja[]> {
  try {
    const r = await fetch(BAZA + "Search?" + parametry(dodatkowe), {
      headers: NAGLOWKI,
      signal: AbortSignal.timeout(20000),
    });
    if (!r.ok) return [];
    const d = await r.json();
    return (d?.list as Pozycja[]) || [];
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  let zapytanie = "";
  try {
    const body = await request.json();
    zapytanie = String(body?.zapytanie ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe zapytanie." }, { status: 400 });
  }
  if (zapytanie.length < 3) {
    return NextResponse.json(
      { error: "Podaj numer KRS albo nazwę spółki, co najmniej trzy znaki." },
      { status: 400 },
    );
  }

  const cyfry = zapytanie.replace(/\D/g, "");
  const poKrs = /^\d{1,10}$/.test(cyfry) && cyfry.length >= 6;
  const klucz: Record<string, string> = poKrs
    ? { krs: cyfry.padStart(10, "0") }
    : { entityName: zapytanie };

  const wszystkie = await szukaj(klucz);

  // Drugie pytanie: ktore z ogloszen tego podmiotu dotycza rozwiazania bez
  // likwidacji. Tresci obwieszczen interfejs nie oddaje, ale potrafi po nich
  // filtrowac, wiec porownujemy identyfikatory.
  const rozwiazania: Pozycja[] = [];
  for (const fraza of FRAZY) {
    const trafienia = await szukaj({ ...klucz, textInBody: fraza });
    for (const t of trafienia) {
      if (!rozwiazania.some((x) => x.id === t.id)) rozwiazania.push(t);
    }
  }

  if (!wszystkie.length) {
    return NextResponse.json({
      status: "BRAK",
      zapytanie,
      naglowek: "Nie znaleźliśmy ogłoszeń dla tego podmiotu",
      komentarz:
        "Monitor obejmuje ogłoszenia od 2013 roku. Brak wpisów nie znaczy, że spółka nie istnieje: znaczy tylko, że nie było o niej obwieszczenia. Przy szukaniu po nazwie warto wpisać samą nazwę, bez formy prawnej.",
    });
  }

  const posortowane = [...wszystkie].sort((a, b) =>
    b.dateOfPublication.localeCompare(a.dateOfPublication),
  );

  const najnowszeRozwiazanie = rozwiazania.sort((a, b) =>
    b.dateOfPublication.localeCompare(a.dateOfPublication),
  )[0];

  let terminDo: string | null = null;
  let dniDoKonca: number | null = null;
  if (najnowszeRozwiazanie) {
    const d = new Date(najnowszeRozwiazanie.dateOfPublication);
    d.setMonth(d.getMonth() + 3);
    terminDo = d.toISOString().slice(0, 10);
    dniDoKonca = Math.ceil((d.getTime() - Date.now()) / 86_400_000);
  }

  const werdykt = !najnowszeRozwiazanie
    ? "ZIELONY"
    : dniDoKonca !== null && dniDoKonca > 0
      ? "CZERWONY"
      : "ZOLTY";

  return NextResponse.json({
    status: "OK",
    zapytanie,
    werdykt,
    naglowek: najnowszeRozwiazanie
      ? dniDoKonca !== null && dniDoKonca > 0
        ? `Trwa postępowanie o rozwiązanie, zostało ${dniDoKonca} dni`
        : "Było postępowanie o rozwiązanie, termin już minął"
      : `Znaleźliśmy ${wszystkie.length} ogłoszeń, żadne nie dotyczy rozwiązania`,
    komentarz: najnowszeRozwiazanie
      ? "Sąd wszczął z urzędu postępowanie o rozwiązanie podmiotu bez przeprowadzania likwidacji. Od dnia obwieszczenia biegnie trzymiesięczny termin na zgłoszenie okoliczności przemawiających przeciwko wykreśleniu. Po tym terminie podmiot znika z rejestru, a jego majątek przechodzi na Skarb Państwa. Jeśli ta spółka jest Ci winna pieniądze, to jest moment na reakcję, a nie po fakcie."
      : "W Monitorze nie ma obwieszczenia o rozwiązaniu tego podmiotu bez likwidacji. To jedno konkretne ryzyko, które właśnie wykluczyliśmy, a nie ocena kondycji firmy.",
    liczbaOgloszen: wszystkie.length,
    ogloszenia: posortowane.slice(0, 12).map((x) => ({
      data: x.dateOfPublication.slice(0, 10),
      nazwa: x.entityName,
      monitor: x.monitorNumber,
      rozwiazanie: rozwiazania.some((r) => r.id === x.id),
    })),
    terminDo,
    dniDoKonca,
  });
}
