import { NextResponse } from "next/server";
import { dane } from "@/lib/fl-dane";
import { type Dostep, type Partia, nipOk, zaszyfruj } from "@/lib/ksef-dostep";
import { originDozwolony, utworzLimit } from "@/lib/limit-ip";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const limit = utworzLimit();
const blad = (error: string, status: number) =>
  NextResponse.json({ ok: false, error }, { status });
const MAX_PLIK = 700_000;

export async function POST(req: Request) {
  if (!originDozwolony(req.headers.get("origin"))) return blad("origin", 403);
  if (limit(req)) return blad("Za dużo prób, spróbuj za minutę.", 429);

  const w = await req.json().catch(() => ({}));
  const sesjaId = String(w.sesja ?? "");
  if (!/^cs_(live|test)_[A-Za-z0-9]+$/.test(sesjaId))
    return blad(
      "Brak potwierdzenia płatności. Wróć do linku z maila od Stripe.",
      400,
    );

  const plik = w.plik && typeof w.plik === "object" ? w.plik : null;
  const nazwaPliku = String(plik?.nazwa ?? "").slice(0, 120);
  const bajty = plik ? Buffer.from(String(plik.base64 ?? ""), "base64") : Buffer.alloc(0);
  const odnowa = w.odnowa === true;
  if (!odnowa) {
    if (!plik || !/\.(csv|xlsx)$/i.test(nazwaPliku) || bajty.length < 20)
      return blad("Dołącz plik .xlsx albo .csv z fakturami.", 400);
    if (bajty.length > MAX_PLIK) return blad("Plik jest za duży (limit 700 KB). Podziel faktury na dwa pliki.", 400);
    if (/\.xlsx$/i.test(nazwaPliku) && bajty.subarray(0, 2).toString() !== "PK") return blad("To nie jest prawidłowy plik .xlsx.", 400);
  }

  let sesja;
  try {
    sesja = await stripe(`checkout/sessions/${sesjaId}`);
  } catch {
    return blad("Nie znaleziono płatności.", 404);
  }
  if (
    sesja.metadata?.produkt !== "faktury-z-excela" ||
    !["paid", "no_payment_required"].includes(sesja.payment_status)
  )
    return blad(
      "Ta płatność nie jest opłacona albo nie dotyczy tego produktu.",
      402,
    );
  const email: string =
    sesja.customer_details?.email ?? sesja.customer_email ?? "";
  if (!email) return blad("Brak adresu e-mail w płatności.", 400);

  const db = dane("ksef");
  const stary = await db.pobierz<Dostep>("dostepy", sesjaId);
  const nowyDostep = w.token !== undefined && String(w.token).trim() !== "";

  if (odnowa) {
    const token = String(w.token ?? "").trim();
    if (!stary || stary.dane.status !== "blad_tokenu") return blad("Nie ma tu nic do odnowienia.", 400);
    if (token.length < 20 || token.length > 400 || /\s/.test(token))
      return blad("Token KSeF wygląda na niekompletny. Skopiuj go w całości z aplikacji KSeF.", 400);
    const srodowisko = sesja.metadata?.zrodlo === "test" && w.srodowisko === "test" ? "test" : "prod";
    await db.zmien("dostepy", sesjaId, { dane: { blob: zaszyfruj({ nip: stary.dane.nip, token }), status: "nowy", srodowisko } });
    return NextResponse.json({ ok: true });
  }

  if (nowyDostep || !stary) {
    const nip = String(w.nip ?? "").replace(/\D/g, "");
    const token = String(w.token ?? "").trim();
    const nazwa = String(w.nazwa ?? "").trim();
    const adres1 = String(w.adres1 ?? "").trim();
    const adres2 = String(w.adres2 ?? "").trim();
    const konto = String(w.konto ?? "").replace(/[\s-]/g, "");
    if (!nipOk(nip))
      return blad(
        "NIP jest nieprawidłowy, suma kontrolna się nie zgadza.",
        400,
      );
    if (token.length < 20 || token.length > 400 || /\s/.test(token))
      return blad(
        "Token KSeF wygląda na niekompletny. Skopiuj go w całości z aplikacji KSeF.",
        400,
      );
    if (nazwa.length < 2 || nazwa.length > 200)
      return blad("Podaj nazwę firmy tak, jak ma być na fakturach.", 400);
    if (
      adres1.length < 3 ||
      adres1.length > 120 ||
      adres2.length < 3 ||
      adres2.length > 120
    )
      return blad(
        "Podaj adres firmy w dwóch liniach: ulica i numer oraz kod i miejscowość.",
        400,
      );
    if (konto && !/^(PL)?\d{26}$/i.test(konto))
      return blad("Numer konta bankowego powinien mieć 26 cyfr.", 400);
    if (w.zgoda !== true)
      return blad("Zaznacz zgodę na wystawianie faktur w KSeF.", 400);
    const srodowisko =
      sesja.metadata?.zrodlo === "test" && w.srodowisko === "test"
        ? "test"
        : "prod";
    const rekord: Dostep = {
      nip,
      blob: zaszyfruj({ nip, token }),
      srodowisko,
      produkt: "faktury-z-excela",
      sprzedawca: { nazwa, adres1, adres2, konto: konto.replace(/^PL/i, "") },
      email,
      biuro: "",
      subskrypcja: String(sesja.subscription ?? ""),
      sesja: sesjaId,
      status: "nowy",
      wyslano: stary?.dane.wyslano ?? {},
    };
    await db.ustaw("dostepy", sesjaId, {
      klucz: String(sesja.customer ?? email),
      dane: rekord,
    });
  }

  const id = `${sesjaId}-${Date.now().toString(36)}`;
  const partia: Partia = {
    sesja: sesjaId,
    nazwa: nazwaPliku,
    base64: bajty.toString("base64"),
    status: "nowa",
  };
  await db.ustaw("partie", id, { klucz: sesjaId, dane: partia });
  return NextResponse.json({ ok: true });
}
