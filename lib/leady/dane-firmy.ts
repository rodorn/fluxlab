function nipOk(n: string) {
  if (!/^\d{10}$/.test(n)) return false;
  const w = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  return w.reduce((s, x, i) => s + x * Number(n[i]), 0) % 11 === Number(n[9]);
}

export type Firma = {
  nip?: string; nazwa?: string | null; adres?: string | null; krs?: string | null; regon?: string | null; vat?: string | null;
  branza?: string; pkd?: string; branza_uwaga?: string; blad?: string; kod?: number;
};

/** Nazwa, adres, KRS, REGON, status VAT z wykazu podatników VAT (MF) i branża (PKD przeważające) z KRS. */
export async function daneFirmy(nipWej: string): Promise<Firma> {
  const nip = String(nipWej ?? "").replace(/\D/g, "");
  if (!nipOk(nip)) return { blad: "To nie jest prawidłowy NIP.", kod: 400 };
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
    return { blad: "Rejestr Ministerstwa Finansów nie odpowiedział. Spróbuj za chwilę.", kod: 502 };
  }
  if (!s) return { blad: "Tego numeru nie ma w wykazie podatników VAT.", kod: 404 };
  const w: Firma = { nip, nazwa: s.name, adres: s.workingAddress || s.residenceAddress, krs: s.krs, regon: s.regon, vat: s.statusVat };
  if (s.krs) {
    try {
      const o = await (await fetch(`https://api-krs.ms.gov.pl/api/krs/OdpisAktualny/${s.krs}?rejestr=P&format=json`, { signal: AbortSignal.timeout(15000) })).json();
      const p = o.odpis.dane.dzial3.przedmiotDzialalnosci.przedmiotPrzewazajacejDzialalnosci[0];
      const opis = String(p.opis).toLocaleLowerCase("pl");
      w.branza = opis[0].toLocaleUpperCase("pl") + opis.slice(1);
      w.pkd = `${p.kodDzial}.${p.kodKlasa}.${p.kodPodklasa}`;
    } catch {
      /* brak branży z KRS nie blokuje karty */
    }
  } else {
    w.branza_uwaga = "Firma bez wpisu w KRS (np. działalność jednoosobowa), branży z rejestru KRS nie podajemy.";
  }
  return w;
}
