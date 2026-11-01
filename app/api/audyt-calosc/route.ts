import { after, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

import { czystaDomena } from "@/lib/audyt-pomiar";
import {
  daneliczbowe,
  raportHtml,
  raportTekst,
  zbadajCalosc,
} from "@/lib/audyt-calosc";
import { wyslij } from "@/lib/audyt-wyslij";
import { originDozwolony } from "@/lib/limit-ip";
import { stripe } from "@/lib/stripe";
import { adresZgloszen, ladunekZgloszenia } from "@/lib/zgloszenie-kolektor";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Badanie biegnie po odpowiedzi, w tej samej funkcji. Podstrony mają termin
// 170 s, linki 215 s, a reszta zostaje na pomiar domeny i wysyłkę.
export const maxDuration = 300;

// Kopie wysyłek do klientów idą do Wojtka (handlowiec), nie do Pawła (zasada 21.10).
const DO_WLASCICIELA = process.env.AUDYT_KOPIA_DO ?? "skiwojtner@gmail.com";
const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GODZINA = 3_600_000;
const PRODUKT = "audyt-calosc";

/** Z jednego adresu IP pięć prób zamówienia na godzinę (pamięć instancji). */
const zIp = new Map<string, { ile: number; od: number }>();

function nipPoprawny(nip: string): boolean {
  if (!/^\d{10}$/.test(nip)) return false;
  const wagi = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  const suma = wagi.reduce((s, w, i) => s + w * Number(nip[i]), 0);
  return suma % 11 === Number(nip[9]);
}

/** Zapis opłaconego zamówienia w kolektorze (trafia do CRM jako lead). */
async function zapiszZamowienie(pola: {
  email: string;
  domena: string;
  nip: string;
  zrodlo: string;
}): Promise<number | null> {
  const sekret = process.env.RUCH_SEKRET;
  if (!sekret) return null;
  try {
    const odp = await fetch(adresZgloszen(), {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Sekret": sekret },
      body: JSON.stringify(
        ladunekZgloszenia({
          email: pola.email,
          firma: pola.domena,
          rodzaj_problemu: "audyt_calosci",
          skala: "10 zł netto, opłacone kartą",
          opis: `Opłacony audyt całej strony ${pola.domena}.${pola.nip ? ` NIP do faktury: ${pola.nip}.` : ""}`,
          landing_page: pola.zrodlo,
        }),
      ),
      signal: AbortSignal.timeout(4000),
    });
    return odp.status;
  } catch (e) {
    console.error("[audyt-calosc] kolektor nie odpowiedział", e);
    return null;
  }
}

/**
 * Po powrocie z płatności: sprawdza w Stripe, że sesja jest opłacona, oznacza
 * płatność (żeby odświeżenie strony nie wysłało raportu drugi raz) i bada
 * stronę. Gdy strona nie odpowiada, zwraca pieniądze.
 */
async function poPlatnosci(sesjaId: string) {
  const sesja = await stripe(
    `checkout/sessions/${encodeURIComponent(sesjaId)}?expand[]=payment_intent`,
  );
  const m = sesja.metadata ?? {};
  const pi = sesja.payment_intent;
  if (m.produkt !== PRODUKT || sesja.payment_status !== "paid" || !pi?.id)
    return NextResponse.json(
      { error: "Nie widzimy opłaconego zamówienia." },
      { status: 400 },
    );
  const email: string = m.email || sesja.customer_details?.email || "";
  if (pi.metadata?.raport)
    return NextResponse.json({ ok: true, email, juz: true });
  await stripe(
    `payment_intents/${pi.id}`,
    new URLSearchParams({ "metadata[raport]": "w_toku" }),
  );

  const domena: string = m.domena;
  const nip: string = m.nip ?? "";
  const test = m.zrodlo === "test";
  after(async () => {
    const zapis = test
      ? null
      : await zapiszZamowienie({ email, domena, nip, zrodlo: m.strona ?? "" });
    const wynik = await zbadajCalosc(domena);
    const d = daneliczbowe(wynik);
    const zwrot = !wynik.osiagalna || d.sprawdzone === 0;
    if (zwrot)
      await stripe(
        "refunds",
        new URLSearchParams({ payment_intent: pi.id }),
      ).catch((e) => console.error("[audyt-calosc] zwrot", pi.id, e));
    await stripe(
      `payment_intents/${pi.id}`,
      new URLSearchParams({ "metadata[raport]": zwrot ? "zwrot" : "wyslany" }),
    ).catch(() => null);
    const opcje = { nip: nip || undefined };
    const html = raportHtml(wynik, opcje);
    const tekst = raportTekst(wynik, opcje);
    const temat =
      d.sprawdzone > 0
        ? `Audyt całej strony ${domena}: ${d.sprawdzone} podstron, ${d.problemow} do poprawy`
        : `Audyt całej strony ${domena}: strona nie odpowiedziała`;

    const naglowek = `<div style="background:#111827;color:#f9fafb;padding:12px 16px;font-family:monospace;font-size:13px;margin-bottom:18px">
      ${test ? "TEST · " : ""}OPŁACONE 12,30 zł brutto${zwrot ? " · ZWROT (strona nie odpowiedziała)" : ""} · klient: ${email}<br>NIP: ${nip || "brak"} · zapis w kolektorze: ${zapis ?? "brak"} · płatność: ${pi.id}<br>
      podstron: ${d.sprawdzone} · czas: ${wynik.czasS} s · źródło: ${m.strona || "nieznane"}
    </div>`;
    const htmlKopia = raportHtml(wynik, { ...opcje, naglowek });

    const katalog = process.env.AUDYT_CALOSC_KATALOG;
    if (katalog) {
      await mkdir(katalog, { recursive: true });
      await writeFile(path.join(katalog, `${domena}.html`), html);
      await writeFile(path.join(katalog, `${domena}-kopia.html`), htmlKopia);
      await writeFile(
        path.join(katalog, `${domena}.json`),
        JSON.stringify(wynik, null, 1),
      );
    }

    const doKlienta = await wyslij(email, temat, html, tekst);
    await wyslij(
      DO_WLASCICIELA,
      `[audyt całości${test ? ", test" : ""}] ${domena} · ${d.sprawdzone} podstron · ${email}${zwrot ? " · ZWROT" : ""}${doKlienta ? "" : " · KLIENT NIE DOSTAŁ"}`,
      htmlKopia,
      `Klient: ${email}\nNIP: ${nip || "brak"}\nPłatność: ${pi.id}\n\n${tekst}`,
    );
    console.log(
      `[audyt-calosc] ${domena}: ${d.sprawdzone} podstron, ${d.problemow} problemów, ${wynik.czasS} s, zwrot: ${zwrot}, mail do klienta: ${doKlienta}`,
    );
  });

  return NextResponse.json({ ok: true, email });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Nieprawidłowe zapytanie." },
      { status: 400 },
    );
  }

  if (!originDozwolony(request.headers.get("origin")))
    return NextResponse.json({ error: "origin" }, { status: 403 });

  if (typeof body.sesja === "string" && body.sesja.startsWith("cs_")) {
    try {
      return await poPlatnosci(body.sesja);
    } catch (e) {
      console.error("[audyt-calosc] po płatności", e);
      return NextResponse.json(
        {
          error:
            "Nie udało się potwierdzić płatności. Napisz na pawel@fluxlab.pl, a wyślemy raport ręcznie.",
        },
        { status: 502 },
      );
    }
  }

  // Pole-pułapka: człowiek go nie widzi, bot wypełnia. Udajemy sukces.
  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const domena = czystaDomena(body.adres);
  const email =
    typeof body.email === "string"
      ? body.email.trim().toLowerCase().slice(0, 320)
      : "";
  const nip =
    typeof body.nip === "string" ? body.nip.replace(/[^\d]/g, "") : "";

  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domena)) {
    return NextResponse.json(
      { error: "Podaj adres strony, na przykład twojafirma.pl" },
      { status: 400 },
    );
  }
  if (!EMAIL_RX.test(email)) {
    return NextResponse.json(
      { error: "Podaj poprawny adres e-mail." },
      { status: 400 },
    );
  }
  if (nip && !nipPoprawny(nip)) {
    return NextResponse.json(
      { error: "Ten NIP się nie zgadza. Sprawdź go albo zostaw pole puste." },
      { status: 400 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "nieznany";
  const teraz = Date.now();
  const wpisIp = zIp.get(ip);
  if (!wpisIp || teraz - wpisIp.od > GODZINA)
    zIp.set(ip, { ile: 1, od: teraz });
  else if (++wpisIp.ile > 5) {
    return NextResponse.json(
      { error: "Za dużo zamówień z tego adresu. Spróbuj za godzinę." },
      { status: 429 },
    );
  }

  const p = new URLSearchParams({
    mode: "payment",
    locale: "pl",
    customer_email: email,
    "line_items[0][quantity]": "1",
    "line_items[0][tax_rates][0]": process.env.STRIPE_TXR_VAT!,
    "line_items[0][price_data][currency]": "pln",
    "line_items[0][price_data][unit_amount]": "1000",
    "line_items[0][price_data][tax_behavior]": "exclusive",
    "line_items[0][price_data][product_data][name]": `Audyt całej strony ${domena}`,
    success_url:
      "https://fluxlab.pl/audyt-strony/oplacone?sesja={CHECKOUT_SESSION_ID}",
    cancel_url: "https://fluxlab.pl/audyt-strony#audyt-calosci",
  });
  const meta = {
    produkt: PRODUKT,
    zrodlo: body.zrodlo === "test" ? "test" : "strona",
    domena,
    email,
    nip,
    strona: (request.headers.get("referer") ?? "").slice(0, 400),
  };
  for (const [k, v] of Object.entries(meta)) {
    p.set(`metadata[${k}]`, v);
    p.set(`payment_intent_data[metadata][${k}]`, v);
  }
  try {
    const sesja = await stripe("checkout/sessions", p);
    return NextResponse.json({ url: sesja.url });
  } catch (e) {
    console.error("[audyt-calosc] checkout", domena, e);
    return NextResponse.json(
      {
        error:
          "Płatność chwilowo niedostępna. Spróbuj za chwilę albo napisz na pawel@fluxlab.pl.",
      },
      { status: 502 },
    );
  }
}
