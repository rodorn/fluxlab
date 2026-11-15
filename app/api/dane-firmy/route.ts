import { NextResponse } from "next/server";
import { utworzLimit } from "@/lib/limit-ip";

export const runtime = "nodejs";

const limit = utworzLimit();

function nipOk(n: string) {
  if (!/^\d{10}$/.test(n)) return false;
  const w = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  return w.reduce((s, x, i) => s + x * Number(n[i]), 0) % 11 === Number(n[9]);
}

/** Podgląd tego, co produkt „Dane firmy do leada z NIP” dopisuje do zgłoszenia: wykaz podatników VAT (MF) i KRS. */
export async function POST(req: Request) {
  if (limit(req)) return NextResponse.json({ error: "Za dużo prób, spróbuj za minutę." }, { status: 429 });
  const nip = String((await req.json().catch(() => ({})))?.nip ?? "").replace(/\D/g, "");
  if (!nipOk(nip)) return NextResponse.json({ error: "To nie jest prawidłowy NIP." }, { status: 400 });
  let s: Record<string, string | null> | null;
  try {
    const r = await fetch(`https://wykazpodatnikowvat.mf.gov.pl/api/search/nip/${nip}?date=${new Date().toISOString().slice(0, 10)}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    if (r.status === 404) s = null;
    else if (!r.ok) throw new Error(String(r.status));
    else s = (await r.json())?.result?.subject ?? null;
  } catch {
    return NextResponse.json({ error: "Rejestr Ministerstwa Finansów nie odpowiedział. Spróbuj za chwilę." }, { status: 502 });
  }
  if (!s) return NextResponse.json({ error: "Tego numeru nie ma w wykazie podatników VAT." }, { status: 404 });
  const wynik: Record<string, string | null | undefined> = {
    nip,
    nazwa: s.name,
    adres: s.workingAddress || s.residenceAddress,
    krs: s.krs,
    regon: s.regon,
    vat: s.statusVat,
  };
  if (s.krs) {
    try {
      const o = await (await fetch(`https://api-krs.ms.gov.pl/api/krs/OdpisAktualny/${s.krs}?rejestr=P&format=json`, {
        signal: AbortSignal.timeout(15000),
      })).json();
      const p = o.odpis.dane.dzial3.przedmiotDzialalnosci.przedmiotPrzewazajacejDzialalnosci[0];
      const opis = String(p.opis).toLocaleLowerCase("pl");
      wynik.branza = opis[0].toLocaleUpperCase("pl") + opis.slice(1);
      wynik.pkd = `${p.kodDzial}.${p.kodKlasa}.${p.kodPodklasa}`;
    } catch {
      /* branża tylko z KRS, brak nie blokuje karty */
    }
  }
  return NextResponse.json(wynik);
}
