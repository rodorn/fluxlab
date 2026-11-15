import { NextResponse } from "next/server";
import { ocen, pobierz } from "@/lib/krs-edoreczenia";
import { utworzLimit } from "@/lib/limit-ip";

export const runtime = "nodejs";
export const maxDuration = 30;

const MF_API = "https://wykazpodatnikowvat.mf.gov.pl/api/search/nip";
const limit = utworzLimit();

type Raport = {
  rodzaj: "KRS" | "CEIDG";
  nazwa: string;
  nip: string | null;
  krs: string | null;
  forma: string;
  siedziba: string;
  obowiazekOd: string;
  obowiazekOpis: string;
  obowiazekMinal: boolean;
  dniDoTerminu: number | null;
  adres: "JEST" | "BRAK" | "NIEZNANY";
  adresWartosc: string | null;
  stanZDnia: string;
  wniosek: string;
  kroki: string[];
};

function nipOk(nip: string): boolean {
  if (nip.length !== 10) return false;
  const w = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  const suma = w.reduce((a, k, i) => a + k * Number(nip[i]), 0);
  return suma % 11 === Number(nip[9]);
}

function naIso(data: string): string {
  const [d, m, r] = data.split(".");
  return `${r}-${m}-${d}`;
}

function dniDo(iso: string): number {
  const dzis = new Date().toISOString().slice(0, 10);
  return Math.round(
    (Date.parse(iso + "T00:00:00Z") - Date.parse(dzis + "T00:00:00Z")) /
      86_400_000,
  );
}

async function wykazVat(nip: string) {
  const data = new Date().toISOString().slice(0, 10);
  const r = await fetch(`${MF_API}/${nip}?date=${data}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`MF ${r.status}`);
  const j = await r.json();
  return j?.result?.subject ?? null;
}

const KROKI_BRAK = [
  "Zaloguj się w Biznes.gov.pl i złóż wniosek o adres do doręczeń elektronicznych.",
  "Wskaż w nim osobę, która będzie administratorem skrzynki, najlepiej kogoś, kto codziennie czyta pocztę firmową.",
  "Po aktywacji ustaw powiadomienia o nowych pismach na maila tej osoby, bo pismo uznaje się za doręczone po 14 dniach, także gdy nikt go nie otworzył.",
];

const KROKI_JEST = [
  "Sprawdź, kto jest administratorem skrzynki i czy ma dostęp do niej także podczas urlopu.",
  "Ustaw powiadomienia o nowych pismach na maila osoby, która je odbiera, bo po 14 dniach pismo uznaje się za doręczone.",
  "Jeśli pism będzie przybywać, rozważ przekazywanie ich do systemu, w którym firma pracuje, zamiast sprawdzania panelu.",
];

export async function POST(request: Request) {
  if (limit(request)) {
    return NextResponse.json(
      { error: "Za dużo zapytań. Spróbuj za minutę." },
      { status: 429 },
    );
  }

  let cyfry = "";
  try {
    const body = await request.json();
    cyfry = String(body?.id ?? "").replace(/\D/g, "");
  } catch {
    return NextResponse.json(
      { error: "Nieprawidłowe zapytanie." },
      { status: 400 },
    );
  }
  if (!cyfry || cyfry.length > 10 || /^0+$/.test(cyfry)) {
    return NextResponse.json(
      {
        error:
          "Podaj NIP, dziesięć cyfr, albo numer KRS, na przykład 0000028860.",
      },
      { status: 400 },
    );
  }

  const jestKrs = cyfry.length < 10 || cyfry.startsWith("00");
  let nip: string | null = null;
  let krs: string | null = jestKrs ? cyfry.padStart(10, "0") : null;
  let podmiot: any = null;

  try {
    if (!jestKrs) {
      if (!nipOk(cyfry)) {
        return NextResponse.json(
          {
            error:
              "To nie jest prawidłowy NIP, suma kontrolna się nie zgadza. Sprawdź numer na fakturze.",
          },
          { status: 400 },
        );
      }
      nip = cyfry;
      podmiot = await wykazVat(nip);
      if (!podmiot) {
        return NextResponse.json(
          {
            error:
              "Tego NIP nie ma w wykazie podatników VAT, więc nie ustalimy po nim rodzaju firmy. Jeśli to spółka, wpisz jej numer KRS.",
          },
          { status: 404 },
        );
      }
      krs = podmiot.krs ? String(podmiot.krs).padStart(10, "0") : null;
    }
  } catch {
    return NextResponse.json(
      {
        error:
          "Wykaz podatników Ministerstwa Finansów nie odpowiedział. Spróbuj za kilka minut.",
      },
      { status: 502 },
    );
  }

  if (krs) {
    try {
      const odpis = (await pobierz(krs, "P")) ?? (await pobierz(krs, "S"));
      if (!odpis) {
        return NextResponse.json(
          { error: `Nie ma w KRS podmiotu o numerze ${krs}.` },
          { status: 404 },
        );
      }
      const w = ocen(krs, odpis);
      const przed2025 = !w.dataWpisu || naIso(w.dataWpisu) < "2025-01-01";
      const od = przed2025 ? "2025-04-01" : naIso(w.dataWpisu);
      const siedziba = odpis?.odpis?.dane?.dzial1?.siedzibaIAdres?.adres
        ? [
            odpis.odpis.dane.dzial1.siedzibaIAdres.adres.ulica,
            odpis.odpis.dane.dzial1.siedzibaIAdres.adres.nrDomu,
            odpis.odpis.dane.dzial1.siedzibaIAdres.adres.kodPocztowy,
            odpis.odpis.dane.dzial1.siedzibaIAdres.adres.miejscowosc,
          ]
            .filter(Boolean)
            .join(" ")
        : "";
      const dni = dniDo(od);
      const raport: Raport = {
        rodzaj: "KRS",
        nazwa: w.nazwa || podmiot?.name || "",
        nip,
        krs,
        forma: w.forma,
        siedziba,
        obowiazekOd: od,
        obowiazekOpis: przed2025
          ? "Spółka była w KRS przed 2025 rokiem, więc obowiązek ma od 1 kwietnia 2025."
          : `Spółka weszła do KRS ${w.dataWpisu}, po 1 stycznia 2025, więc adres musi mieć od dnia wpisu.`,
        obowiazekMinal: dni <= 0,
        dniDoTerminu: dni > 0 ? dni : null,
        adres: w.adres ? "JEST" : "BRAK",
        adresWartosc: w.adres,
        stanZDnia: w.stanZDnia,
        wniosek: w.adres
          ? "Obowiązek jest spełniony: adres do e-Doręczeń jest wpisany w odpisie KRS."
          : "W odpisie KRS nie ma adresu do e-Doręczeń. Kary pieniężnej za to nie ma, ale urzędy doręczają wtedy pisma papierowo albo usługą hybrydową, a termin odpowiedzi biegnie od doręczenia.",
        kroki: w.adres ? KROKI_JEST : KROKI_BRAK,
      };
      return NextResponse.json(raport);
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

  const rejestracja: string = String(podmiot?.registrationLegalDate ?? "");
  const przed2025 = !rejestracja || rejestracja < "2025-01-01";
  const od = przed2025 ? "2026-10-01" : rejestracja;
  const dni = dniDo(od);
  const raport: Raport = {
    rodzaj: "CEIDG",
    nazwa: String(podmiot?.name ?? ""),
    nip,
    krs: null,
    forma: "Przedsiębiorca bez wpisu do KRS, najczęściej firma z CEIDG",
    siedziba: String(
      podmiot?.workingAddress ?? podmiot?.residenceAddress ?? "",
    ),
    obowiazekOd: od,
    obowiazekOpis: przed2025
      ? "Firma jest w rejestrach od przed 2025 rokiem, więc obowiązek ma od 1 października 2026."
      : `Firma zarejestrowana ${rejestracja}, po 1 stycznia 2025, ma obowiązek od dnia wpisu.`,
    obowiazekMinal: dni <= 0,
    dniDoTerminu: dni > 0 ? dni : null,
    adres: "NIEZNANY",
    adresWartosc: null,
    stanZDnia: new Date().toISOString().slice(0, 10),
    wniosek:
      "Dla firm z CEIDG nie ma publicznego rejestru, który pokazałby adres do e-Doręczeń po samym numerze NIP. Sprawdź go w swoim wpisie w CEIDG albo w koncie na Biznes.gov.pl.",
    kroki: [
      "Wejdź na Biznes.gov.pl i sprawdź w Koncie Przedsiębiorcy, czy adres do doręczeń elektronicznych jest aktywny.",
      "Jeśli go nie ma, złóż wniosek tamże. Kary pieniężnej za brak adresu nie ma, ale urzędy doręczają wtedy pisma papierowo.",
      "Po aktywacji ustaw powiadomienia o nowych pismach na swojego maila, bo po 14 dniach pismo uznaje się za doręczone.",
    ],
  };
  return NextResponse.json(raport);
}

