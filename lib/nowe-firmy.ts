import { stripe } from "@/lib/stripe";

export const PRODUKT_NOWE_FIRMY = "nowe-firmy";
export const WOJEWODZTWA = [
  "DOLNOŚLĄSKIE",
  "KUJAWSKO-POMORSKIE",
  "LUBELSKIE",
  "LUBUSKIE",
  "ŁÓDZKIE",
  "MAŁOPOLSKIE",
  "MAZOWIECKIE",
  "OPOLSKIE",
  "PODKARPACKIE",
  "PODLASKIE",
  "POMORSKIE",
  "ŚLĄSKIE",
  "ŚWIĘTOKRZYSKIE",
  "WARMIŃSKO-MAZURSKIE",
  "WIELKOPOLSKIE",
  "ZACHODNIOPOMORSKIE",
] as const;
export const MAX_PKD = 5;

export type Filtr = {
  sesja: string;
  email: string;
  subskrypcja: string;
  pkd: string[];
  woj: string[];
  tylkoGlowne: boolean;
  ostatni_mail?: string;
  przypomnienie?: string;
};

export type Firma = {
  krs: string;
  nazwa: string;
  forma: string;
  nip: string;
  regon: string;
  data: string;
  woj: string;
  powiat: string;
  miejscowosc: string;
  adres: string;
  email: string;
  kapital: string;
  pkd: string[];
  pkd_opis: string;
};

export async function oplaconaSesja(sesjaId: string) {
  if (!/^cs_(live|test)_[A-Za-z0-9]+$/.test(sesjaId)) return null;
  try {
    const s = await stripe(`checkout/sessions/${sesjaId}`);
    if (s.metadata?.produkt !== PRODUKT_NOWE_FIRMY) return null;
    if (!["paid", "no_payment_required"].includes(s.payment_status))
      return null;
    return s;
  } catch {
    return null;
  }
}

export function czystePkd(wejscie: unknown): string[] | null {
  if (!Array.isArray(wejscie)) return null;
  const wynik: string[] = [];
  for (const x of wejscie) {
    const t = String(x).trim().toUpperCase().replace(/\s+/g, "");
    if (!t) continue;
    if (!/^\d{2}(\.\d{1,2}(\.[A-Z])?)?$/.test(t)) return null;
    if (!wynik.includes(t)) wynik.push(t);
  }
  return wynik.length <= MAX_PKD ? wynik : null;
}

export function czysteWoj(wejscie: unknown): string[] | null {
  if (!Array.isArray(wejscie)) return null;
  const wynik = wejscie.map((x) => String(x));
  return wynik.every((w) => (WOJEWODZTWA as readonly string[]).includes(w))
    ? [...new Set(wynik)]
    : null;
}
