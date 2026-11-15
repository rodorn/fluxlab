/** Nr 77: orientacyjna zdolność kredytowa. Założenia są jawne i pokazywane klientowi pod wynikiem. */

export const BUFOR_PP = 2.5;
export const KOSZT_DOROSLY = 1200;
export const KOSZT_DZIECKO = 700;
export const LIMIT_DSTI = 0.5;

export type WejscieZdolnosci = {
  dochod: number;
  dorosli: number;
  dzieci: number;
  zobowiazania: number;
  oproc: number;
  lata: number;
};

export type WynikZdolnosci = { rata: number; kredyt: number; ratawBuforze: number; ograniczenie: "dochod" | "koszty" | "brak" };

export function zdolnosc(w: WejscieZdolnosci): WynikZdolnosci {
  const koszty = w.dorosli * KOSZT_DOROSLY + w.dzieci * KOSZT_DZIECKO;
  const limitRaty = w.dochod * LIMIT_DSTI - w.zobowiazania;
  const poKosztach = w.dochod - koszty - w.zobowiazania;
  const rata = Math.max(Math.min(limitRaty, poKosztach), 0);
  const ograniczenie = rata === 0 ? "brak" : limitRaty <= poKosztach ? "dochod" : "koszty";
  const r = (w.oproc + BUFOR_PP) / 100 / 12;
  const n = w.lata * 12;
  const kredyt = r === 0 ? rata * n : (rata * (1 - Math.pow(1 + r, -n))) / r;
  return { rata, kredyt, ratawBuforze: rata, ograniczenie };
}
