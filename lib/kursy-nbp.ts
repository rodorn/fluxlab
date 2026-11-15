export const WALUTY = [
  "EUR", "USD", "GBP", "CHF", "CZK", "NOK", "SEK", "DKK", "HUF", "JPY",
  "AUD", "CAD", "NZD", "SGD", "HKD", "RON", "BGN", "TRY", "UAH", "ILS",
  "ISK", "CLP", "PHP", "MXN", "ZAR", "BRL", "MYR", "IDR", "INR", "KRW",
  "CNY", "THB", "XDR",
] as const;

export type Kurs = { dzien: string; mid: number; tabela: string };

export const MAX_DNI = 350;

export function dataOk(s: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s + "T00:00:00Z"));
}

export function przesun(iso: string, dni: number): string {
  const t = Date.parse(iso + "T00:00:00Z") + dni * 86_400_000;
  return new Date(t).toISOString().slice(0, 10);
}

export function dzis(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function pobierzKursy(
  waluta: string,
  od: string,
  doDnia: string,
): Promise<Kurs[]> {
  const r = await fetch(
    `https://api.nbp.pl/api/exchangerates/rates/a/${waluta.toLowerCase()}/${od}/${doDnia}/?format=json`,
    { next: { revalidate: 3600 }, signal: AbortSignal.timeout(15000) },
  );
  if (r.status === 404) return [];
  if (!r.ok) throw new Error(`NBP ${r.status}`);
  const j = await r.json();
  return (j.rates as { no: string; effectiveDate: string; mid: number }[]).map(
    (x) => ({ dzien: x.effectiveDate, mid: x.mid, tabela: x.no }),
  );
}

/** Kurs z ostatniego dnia roboczego poprzedzającego dzień operacji: tabela
 *  z datą ściśle wcześniejszą niż dzień faktury (art. 31a ustawy o VAT i
 *  art. 11a ustawy o PIT, 15 ustawy o CIT). Okno 14 dni pokrywa najdłuższe
 *  serie świąt. */
export function poprzedzajacy(kursy: Kurs[], dzienOperacji: string): Kurs | null {
  let wynik: Kurs | null = null;
  for (const k of kursy) {
    if (k.dzien < dzienOperacji && (!wynik || k.dzien > wynik.dzien)) wynik = k;
  }
  return wynik;
}
