import { stripe } from "@/lib/stripe";

export const PRODUKT_WZMIANKI = "wzmianki";
export const MAX_FRAZ = 3;
export const MAX_WYKLUCZEN = 3;

export type Filtr = {
  sesja: string;
  email: string;
  subskrypcja: string;
  frazy: string[];
  wyklucz: string[];
  ostatni_mail?: string;
};

export type Wzmianka = {
  url: string;
  tytul: string;
  zrodlo: string;
  kanal: string;
  data: string;
  fraza: string;
};

export async function oplaconaSesja(sesjaId: string) {
  if (!/^cs_(live|test)_[A-Za-z0-9]+$/.test(sesjaId)) return null;
  try {
    const s = await stripe(`checkout/sessions/${sesjaId}`);
    if (s.metadata?.produkt !== PRODUKT_WZMIANKI) return null;
    if (!["paid", "no_payment_required"].includes(s.payment_status))
      return null;
    return s;
  } catch {
    return null;
  }
}

function czysteListe(wejscie: unknown, max: number, min: number): string[] | null {
  if (!Array.isArray(wejscie)) return null;
  const wynik: string[] = [];
  for (const x of wejscie) {
    const t = String(x).replace(/\s+/g, " ").trim();
    if (!t) continue;
    if (t.length < 3 || t.length > 60 || /["<>]/.test(t)) return null;
    if (!wynik.some((w) => w.toLowerCase() === t.toLowerCase())) wynik.push(t);
  }
  return wynik.length >= min && wynik.length <= max ? wynik : null;
}

export const czysteFrazy = (w: unknown) => czysteListe(w, MAX_FRAZ, 1);
export const czysteWyklucz = (w: unknown) => czysteListe(w, MAX_WYKLUCZEN, 0);
