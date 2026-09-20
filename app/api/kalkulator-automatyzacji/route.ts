import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

// Cennik pobrany ze strony producenta 20.09.2026. Trzymamy trzy punkty, ktore
// realnie odczytalismy, i mowimy wprost, ze miedzy nimi szacujemy.
const PROGI_ZAPIER: Array<{ zadania: number; usd: number }> = [
  { zadania: 2000, usd: 103.5 },
  { zadania: 50000, usd: 433.5 },
  { zadania: 200000, usd: 1149 },
];

// Serwer pod n8n. Dolna granica to najtanszy sensowny VPS, gorna to maszyna,
// ktora uciagnie ciezkie scenariusze z przegladarka w srodku.
const N8N_USD_MIN = 10;
const N8N_USD_MAX = 38;

// O oplacalnosci decyduje czas zwrotu, a nie sama liczba uruchomien. Piec
// krokow przy malym wolumenie potrafi kosztowac wiecej niz jeden krok przy
// duzym, wiec prog na uruchomieniach klamal: narzedzie mowilo "nie oplaca sie"
// i w tej samej ramce pokazywalo zwrot w siedem miesiecy.
const MAKS_MIESIECY_ZWROTU = 18;

function kosztZapier(zadania: number): { usd: number; szacowany: boolean } {
  if (zadania <= PROGI_ZAPIER[0].zadania) {
    return { usd: PROGI_ZAPIER[0].usd, szacowany: false };
  }
  for (let i = 0; i < PROGI_ZAPIER.length - 1; i++) {
    const a = PROGI_ZAPIER[i];
    const b = PROGI_ZAPIER[i + 1];
    if (zadania <= b.zadania) {
      const udzial = (zadania - a.zadania) / (b.zadania - a.zadania);
      return { usd: a.usd + udzial * (b.usd - a.usd), szacowany: true };
    }
  }
  const ostatni = PROGI_ZAPIER[PROGI_ZAPIER.length - 1];
  return {
    usd: (ostatni.usd / ostatni.zadania) * zadania,
    szacowany: true,
  };
}

async function kursUsd(): Promise<{ kurs: number; data: string } | null> {
  try {
    const r = await fetch("https://api.nbp.pl/api/exchangerates/rates/a/usd/?format=json", {
      signal: AbortSignal.timeout(10000),
    });
    if (!r.ok) return null;
    const j = await r.json();
    const rate = j?.rates?.[0];
    if (!rate?.mid) return null;
    return { kurs: Number(rate.mid), data: String(rate.effectiveDate) };
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  let uruchomienia = 0;
  let kroki = 0;
  try {
    const body = await request.json();
    uruchomienia = Math.floor(Number(body?.uruchomienia));
    kroki = Math.floor(Number(body?.kroki));
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe zapytanie." }, { status: 400 });
  }

  if (!Number.isFinite(uruchomienia) || uruchomienia < 1 || uruchomienia > 5_000_000) {
    return NextResponse.json(
      { error: "Podaj, ile razy miesięcznie uruchamiają się Twoje automatyzacje." },
      { status: 400 },
    );
  }
  if (!Number.isFinite(kroki) || kroki < 1 || kroki > 100) {
    return NextResponse.json(
      { error: "Podaj liczbę kroków w typowym scenariuszu, od 1 do 100." },
      { status: 400 },
    );
  }

  const zadania = uruchomienia * kroki;
  const zapier = kosztZapier(zadania);
  const kurs = (await kursUsd()) ?? { kurs: 4.0, data: "kurs przybliżony" };

  const zapierPln = Math.round(zapier.usd * kurs.kurs);
  const n8nMinPln = Math.round(N8N_USD_MIN * kurs.kurs);
  const n8nMaxPln = Math.round(N8N_USD_MAX * kurs.kurs);
  const oszczednoscMies = Math.max(zapierPln - n8nMaxPln, 0);
  const oszczednoscRok = oszczednoscMies * 12;

  // Koszt migracji rosnie ze zlozonoscia, wiec wiazemy go z liczba krokow.
  const migracjaOd = kroki <= 5 ? 1500 : kroki <= 15 ? 3500 : 5000;
  const zwrotMiesiecy =
    oszczednoscMies > 0 ? Math.ceil(migracjaOd / oszczednoscMies) : null;

  const oplacalne =
    oszczednoscMies > 0 &&
    zwrotMiesiecy !== null &&
    zwrotMiesiecy <= MAKS_MIESIECY_ZWROTU;

  const werdykt = !oplacalne ? "ZOLTY" : oszczednoscRok >= 10000 ? "ZIELONY" : "ZOLTY";

  const naglowek = !oplacalne
    ? "Przy tej skali migracja Ci się nie opłaca"
    : `Około ${oszczednoscRok.toLocaleString("pl-PL")} zł rocznie mniej za to samo`;

  const opis = !oplacalne
    ? `Przy takiej skali rachunek jest jeszcze na tyle niski, że przeniesienie zwróciłoby się dopiero po ${
        zwrotMiesiecy ?? "wielu"
      } miesiącach. Wróć do tego, gdy wolumen urośnie. Wolę to powiedzieć teraz, niż wziąć pieniądze za coś, co Ci się nie zwróci.`
    : `Twoje automatyzacje zużywają około ${zadania.toLocaleString("pl-PL")} zadań miesięcznie, bo każdy krok liczy się osobno. To jest ta różnica, której najczęściej się nie zauważa: pięciokrokowy scenariusz uruchomiony tysiąc razy to pięć tysięcy zadań, a nie tysiąc.`;

  // Najnizszy punkt, ktory realnie odczytalismy z cennika, to plan zespolowy.
  // Kto miesci sie w planie darmowym albo najtanszym, zaplaci mniej niz tu
  // wychodzi, wiec mowimy to zamiast zawyzac oszczednosc.
  const zastrzezenie =
    zadania < PROGI_ZAPIER[0].zadania
      ? "Liczę od najniższego planu zespołowego z publicznego cennika. Jeśli mieścisz się w planie darmowym albo najtańszym, Twój rachunek jest niższy, a oszczędność odpowiednio mniejsza niż tu widać."
      : zapier.szacowany
        ? "Kwota po stronie obecnego dostawcy to szacunek między progami z publicznego cennika, bo producent podaje ceny tylko dla wybranych pułapów."
        : null;

  return NextResponse.json({
    status: "OK",
    werdykt,
    naglowek,
    opis,
    zastrzezenie,
    uruchomienia,
    kroki,
    zadania,
    zapierPln,
    zapierSzacowany: zapier.szacowany,
    n8nMinPln,
    n8nMaxPln,
    oszczednoscMies,
    oszczednoscRok,
    migracjaOd,
    zwrotMiesiecy,
    oplacalne,
    kurs: kurs.kurs,
    kursData: kurs.data,
    maksMiesiecyZwrotu: MAKS_MIESIECY_ZWROTU,
  });
}
