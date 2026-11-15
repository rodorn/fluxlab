/** Nr 48: landing z formularza. Ankieta po płatności, strona pod fluxlab.pl/l/<adres>, zgłoszenia mailem do klienta. */
import { dane } from "@/lib/fl-dane";
import { stripe } from "@/lib/stripe";

export const PRODUKT_LP = "landing-formularz";
export const db = dane("landing");

export { KOLORY } from "@/lib/landing-kolory";
import { KOLORY } from "@/lib/landing-kolory";
export const ZAREZERWOWANE = new Set(["admin", "api", "www", "fluxlab", "panel", "test", "demo"]);

export type Strona = {
  slug: string;
  sesja: string;
  subskrypcja: string;
  email: string;
  nazwa: string;
  naglowek: string;
  opis: string;
  punkty: string[];
  przycisk: string;
  telefon: string;
  kolor: string;
  zmieniono: string;
};

export const poprawnySlug = (s: string) => /^[a-z0-9](?:[a-z0-9-]{1,38})[a-z0-9]$/.test(s) && !ZAREZERWOWANE.has(s);

export type Zamowienie = { sesja: string; email: string; subskrypcja: string; aktywna: boolean };

/** Sesja Checkout z naszym produktem, zakończona (także kuponem 100%). Zwraca null, gdy to nie jest zamówienie landingu. */
export async function zamowienie(id: string): Promise<Zamowienie | null> {
  if (!/^cs_(live|test)_[A-Za-z0-9]+$/.test(id)) return null;
  const s = await stripe(`checkout/sessions/${id}`).catch(() => null);
  if (!s || s.status !== "complete" || !["paid", "no_payment_required"].includes(s.payment_status)) return null;
  if (!(s.metadata?.produkt ?? "").split(",").map((x: string) => x.trim()).includes(PRODUKT_LP) || !s.subscription) return null;
  const sub = await stripe(`subscriptions/${s.subscription}`).catch(() => null);
  if (!sub) return null;
  return {
    sesja: id,
    email: s.customer_details?.email ?? "",
    subskrypcja: s.subscription,
    aktywna: ["active", "trialing", "past_due"].includes(sub.status),
  };
}

export async function aktywnaStrona(slug: string): Promise<Strona | null> {
  const d = await db.pobierz<Strona>("strony", slug);
  if (!d?.dane.subskrypcja) return null;
  const sub = await stripe(`subscriptions/${d.dane.subskrypcja}`).catch(() => null);
  return sub && ["active", "trialing", "past_due"].includes(sub.status) ? d.dane : null;
}
