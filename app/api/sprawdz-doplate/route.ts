import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 20;

// Stawki odczytane ze strony przewoznika dla okresu 16-30 wrzesnia 2026,
// przy cenie oleju napedowego 7 964 zl za metr szescienny. Zmieniaja sie co
// dwa tygodnie, wiec data obowiazywania jest czescia odpowiedzi, a nie
// szczegolem technicznym: bez niej wynik nie znaczy nic.
const OKRES = {
  od: "2026-09-16",
  do: "2026-09-30",
  zrodlo: "publiczna tabela przewoźnika DPD",
};

const PROGI: Array<{ doKg: number; stawka: number; opis: string }> = [
  { doKg: 20, stawka: 36.7, opis: "do 20 kg" },
  { doKg: 31.5, stawka: 42.5, opis: "powyżej 20 do 31,5 kg" },
  { doKg: Infinity, stawka: 45.7, opis: "powyżej 31,5 kg" },
];

function stawkaDlaWagi(waga: number) {
  return PROGI.find((p) => waga <= p.doKg) ?? PROGI[PROGI.length - 1];
}

export async function POST(request: Request) {
  let waga = 0;
  let baza = 0;
  let naliczona = 0;
  try {
    const body = await request.json();
    waga = Number(body?.waga);
    baza = Number(body?.baza);
    naliczona = Number(body?.naliczona);
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe zapytanie." }, { status: 400 });
  }

  if (!Number.isFinite(waga) || waga <= 0 || waga > 1000) {
    return NextResponse.json(
      { error: "Podaj wagę paczki w kilogramach." },
      { status: 400 },
    );
  }
  if (!Number.isFinite(baza) || baza <= 0 || baza > 100000) {
    return NextResponse.json(
      { error: "Podaj kwotę bazową za przesyłkę, bez dopłat." },
      { status: 400 },
    );
  }
  if (!Number.isFinite(naliczona) || naliczona < 0 || naliczona > 100000) {
    return NextResponse.json(
      { error: "Podaj dopłatę paliwową z faktury." },
      { status: 400 },
    );
  }

  const prog = stawkaDlaWagi(waga);
  const powinnaBycKwota = Math.round(baza * (prog.stawka / 100) * 100) / 100;
  const roznica = Math.round((naliczona - powinnaBycKwota) * 100) / 100;
  const naliczonyProcent = Math.round((naliczona / baza) * 1000) / 10;

  // Grosz w te czy we w te to zaokraglenie, nie blad. Dopiero wieksza
  // rozbieznosc jest sygnalem, ze cos nie gra.
  const tolerancja = Math.max(0.02, powinnaBycKwota * 0.005);
  const zgodne = Math.abs(roznica) <= tolerancja;

  const zlyProg = PROGI.find(
    (p) => Math.abs(naliczonyProcent - p.stawka) < 0.6 && p.opis !== prog.opis,
  );

  let werdykt: "ZIELONY" | "ZOLTY" | "CZERWONY" = "ZIELONY";
  let naglowek = "Dopłata policzona prawidłowo";
  let opis = `Przy wadze ${waga} kg obowiązuje stawka ${prog.stawka} procent, czyli ${powinnaBycKwota.toFixed(2)} zł od kwoty bazowej. Tyle właśnie widnieje na Twojej fakturze.`;

  if (!zgodne && roznica > 0) {
    werdykt = "CZERWONY";
    naglowek = `Naliczono o ${roznica.toFixed(2)} zł za dużo na tej jednej pozycji`;
    opis = zlyProg
      ? `Naliczono ${naliczonyProcent} procent, czyli stawkę dla przedziału ${zlyProg.opis}, podczas gdy paczka o wadze ${waga} kg mieści się w przedziale ${prog.opis}, dla którego stawka wynosi ${prog.stawka} procent. To najczęstszy błąd na fakturach kurierskich, bo progi wagowe łatwo pomylić.`
      : `Naliczono ${naliczonyProcent} procent kwoty bazowej, a dla wagi ${waga} kg obowiązuje ${prog.stawka} procent, czyli ${powinnaBycKwota.toFixed(2)} zł.`;
  } else if (!zgodne && roznica < 0) {
    werdykt = "ZOLTY";
    naglowek = `Naliczono o ${Math.abs(roznica).toFixed(2)} zł mniej, niż wynika ze stawki`;
    opis = `Naliczono ${naliczonyProcent} procent zamiast ${prog.stawka} procent. Na Twoją korzyść, ale warto wiedzieć, bo bywa, że różnica wraca w korekcie.`;
  }

  return NextResponse.json({
    status: "OK",
    werdykt,
    naglowek,
    opis,
    waga,
    baza,
    naliczona,
    naliczonyProcent,
    stawkaWlasciwa: prog.stawka,
    progOpis: prog.opis,
    powinnaBycKwota,
    roznica,
    okres: OKRES,
    progi: PROGI.filter((p) => Number.isFinite(p.doKg) || true).map((p) => ({
      opis: p.opis,
      stawka: p.stawka,
    })),
    // Jedna pozycja to jedna pozycja. Wartosc jest w przemnozeniu przez
    // wolumen, wiec podajemy to wprost zamiast kazac zgadywac.
    skalaMiesieczna:
      roznica > 0
        ? {
            przy100: Math.round(roznica * 100 * 100) / 100,
            przy500: Math.round(roznica * 500 * 100) / 100,
            przy2000: Math.round(roznica * 2000 * 100) / 100,
          }
        : null,
  });
}
