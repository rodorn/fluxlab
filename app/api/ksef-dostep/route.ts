import { NextResponse } from "next/server";
import { dane } from "@/lib/fl-dane";
import { type Dostep, PRODUKTY_KSEF, nipOk, zaszyfruj } from "@/lib/ksef-dostep";
import { originDozwolony, utworzLimit } from "@/lib/limit-ip";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const limit = utworzLimit();
const blad = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
  if (!originDozwolony(req.headers.get("origin"))) return blad("origin", 403);
  if (limit(req)) return blad("Za dużo prób, spróbuj za minutę.", 429);

  const w = await req.json().catch(() => ({}));
  const sesjaId = String(w.sesja ?? "");
  const nip = String(w.nip ?? "").replace(/\D/g, "");
  const token = String(w.token ?? "").trim();
  const biuro = String(w.biuro ?? "").trim().toLowerCase();
  const zgoda = w.zgoda === true;

  if (!/^cs_(live|test)_[A-Za-z0-9]+$/.test(sesjaId))
    return blad("Brak potwierdzenia płatności. Wróć do linku z maila od Stripe.", 400);
  if (!nipOk(nip)) return blad("NIP jest nieprawidłowy, suma kontrolna się nie zgadza.", 400);
  if (token.length < 20 || token.length > 400 || /\s/.test(token))
    return blad("Token KSeF wygląda na niekompletny. Skopiuj go w całości z aplikacji KSeF.", 400);
  if (biuro && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(biuro)) return blad("Adres biura wygląda na błędny.", 400);
  if (!zgoda) return blad("Zaznacz zgodę na pobieranie faktur z KSeF.", 400);

  let sesja;
  try {
    sesja = await stripe(`checkout/sessions/${sesjaId}`);
  } catch {
    return blad("Nie znaleziono płatności.", 404);
  }
  const produkt = String(sesja.metadata?.produkt ?? "");
  if (!PRODUKTY_KSEF.includes(produkt) || !["paid", "no_payment_required"].includes(sesja.payment_status))
    return blad("Ta płatność nie jest opłacona albo nie dotyczy tego produktu.", 402);
  const email: string = sesja.customer_details?.email ?? sesja.customer_email ?? "";
  if (!email) return blad("Brak adresu e-mail w płatności.", 400);

  const srodowisko = sesja.metadata?.zrodlo === "test" && w.srodowisko === "test" ? "test" : "prod";
  const db = dane("ksef");
  const stary = await db.pobierz<Dostep>("dostepy", sesjaId);
  const rekord: Dostep = {
    nip,
    blob: zaszyfruj({ nip, token }),
    srodowisko,
    produkt,
    email,
    biuro,
    subskrypcja: String(sesja.subscription ?? ""),
    sesja: sesjaId,
    status: "nowy",
    wyslano: stary?.dane.wyslano ?? {},
  };
  await db.ustaw("dostepy", sesjaId, { klucz: String(sesja.customer ?? email), dane: rekord });
  return NextResponse.json({ ok: true });
}
