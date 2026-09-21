/**
 * Krótkotrwała pamięć gotowych raportów.
 *
 * Powód istnienia: gdy klient poprosi o przesłanie raportu na maila, nie
 * chcemy mierzyć strony drugi raz. To trwa kilkadziesiąt sekund i, co gorsza,
 * dałoby w mailu inne liczby niż te, które klient przed chwilą widział na
 * ekranie. Raport ma być tym samym dokumentem, nie nowym badaniem.
 *
 * Nie przyjmujemy treści raportu od przeglądarki, choć byłoby prościej.
 * Wtedy każdy mógłby podstawić dowolne ustalenia i dowolną cenę, a my
 * wysłalibyśmy to z własnej domeny jako swoją opinię.
 */

import type { DaneRaportu } from "./audyt-mail";

const ZYJE_MS = 30 * 60_000;
const MAX_WPISOW = 200;

type Wpis = { dane: DaneRaportu; od: number };

const pamiec = new Map<string, Wpis>();

function sprzataj(): void {
  const teraz = Date.now();
  for (const [k, w] of pamiec) {
    if (teraz - w.od > ZYJE_MS) pamiec.delete(k);
  }
  // Gdyby ruch był duży, a instancja długo żyła, kasujemy najstarsze wpisy.
  while (pamiec.size > MAX_WPISOW) {
    const najstarszy = [...pamiec.entries()].sort((a, b) => a[1].od - b[1].od)[0];
    if (!najstarszy) break;
    pamiec.delete(najstarszy[0]);
  }
}

export function zapamietaj(dane: DaneRaportu): string {
  sprzataj();
  const id = crypto.randomUUID();
  pamiec.set(id, { dane, od: Date.now() });
  return id;
}

export function odczytaj(id: string): DaneRaportu | null {
  sprzataj();
  return pamiec.get(id)?.dane ?? null;
}
