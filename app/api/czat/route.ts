import { NextResponse } from "next/server";

import { PRODUCTS } from "@/lib/products";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  if (hits.length >= RATE_LIMIT_MAX) {
    requestLog.set(ip, hits);
    return true;
  }
  hits.push(now);
  requestLog.set(ip, hits);
  return false;
}

// Cennik prosto z katalogu, żeby czat nie podawał innych kwot niż strona.
const KATALOG = PRODUCTS.map(
  (p) => `- ${p.name}: ${p.price}. ${p.tagline} (https://fluxlab.pl${p.href})`,
).join("\n");

const INSTRUKCJE = `Jesteś asystentem na stronie fluxlab.pl. Odpowiadasz odwiedzającym na pytania o firmę i ofertę.

O FIRMIE:
- FluxLab robi strony internetowe, własny CRM i automatyzacje procesów dla firm. Działalność Pawła Iwanka, NIP 7123336008.
- Kontakt: 30 minut w Google Meet z wyborem wolnego terminu (https://fluxlab.pl/kontakt?forma=meet) albo mail na pawel@fluxlab.pl z opisem, co chcesz zrobić. Na maila odpisujemy z ceną i terminem tego samego dnia.
- Cena jest ustalana z góry, bez rozliczania godzin. Płatność po odbiorze etapu. Ceny netto, doliczamy 23% VAT.
- Strony: naprawy 150, 290 albo 490 zł, strona w tydzień do 5 podstron 2 900 zł, strona firmowa z CMS 5 900 zł, sklep z integracją od 9 900 zł. Terminy: strona w tydzień 7 dni, firmowa 12 dni, sklep 21 dni. Własny CRM: wdrożenie 1 zł, płatny tylko abonament za 3 osoby, potem 99 zł/mies. za każdą kolejną: gotowy CRM 499 zł/mies., z dowolnymi integracjami i automatyzacjami 1 490 zł/mies., moduły AI do każdego wariantu: ocena handlowców 199 zł/mies., szkice maili i SMS-ów 99 zł/mies.; rezygnacja w dowolnym dniu, opłata za dni korzystania. Automatyzacja: jeden etap od 1 500 zł, cała ścieżka od 2 500 zł.
- Większe projekty: kompletna aplikacja na dowolną platformę, automatyzacja i AI w każdym procesie firmy, zaawansowana analityka. Cena i termin po rozmowie, nie podawaj kwot.
- Rozliczenie: pierwsze zlecenie proponujemy przez Useme. Kolejne na fakturę płatną przed startem prac, a usługi miesięczne na początku miesiąca. Bez zaliczek.
- Darmowy audyt strony: https://fluxlab.pl/audyt-strony (wynik w minutę, bez rejestracji).

KATALOG USŁUG:
${KATALOG}

ZASADY:
- Pisz po polsku, krótko: 1–4 zdania. Do klienta na „ty”, o firmie „my”.
- Używaj tylko faktów z tej instrukcji. Jeśli czegoś nie wiesz (termin konkretnego projektu, nietypowa integracja, rabat), powiedz, że to ustalimy przy wycenie, i zaproś na krótką rozmowę w Google Meet.
- Nie wymyślaj klientów, realizacji, opinii ani liczb. Nie podawaj nazw klientów.
- Podawaj link do właściwej podstrony, gdy pasuje.
- Nie zbierasz danych i nie wracasz do nikogo sam. Gdy ktoś opisał potrzebę albo pyta o cenę lub termin, zaproś na 30 minut w Google Meet (https://fluxlab.pl/kontakt?forma=meet), a jako drugą opcję mail na pawel@fluxlab.pl. Po rozmowie dostaje stałą cenę.
- Bez długich myślników, bez emoji, bez markdownu poza zwykłymi linkami.
- Pytania niezwiązane z ofertą FluxLab zbywaj jednym zdaniem i wracaj do tematu.
- Gdy rozmowa doszła do wyceny (klient opisał, czego potrzebuje, i chce ceny albo terminu), dopisz w ostatniej linii znacznik [[WYCENA: opis potrzeb klienta w 1–3 zdaniach, na ty, bez danych osobowych]]. Znacznika nie używaj w innych sytuacjach i nie wspominaj o nim w treści.`;

type Wiadomosc = { rola: "ja" | "bot"; tekst: string };

function opisStrony(pathname: unknown, tytul: unknown): string {
  if (typeof pathname !== "string" || !pathname.startsWith("/")) return "";
  const sciezka = pathname.slice(0, 120).replace(/[\r\n]/g, " ");
  const t =
    typeof tytul === "string" ? tytul.slice(0, 120).replace(/[\r\n]/g, " ") : "";
  return `\n\nKONTEKST: odwiedzający jest teraz na stronie ${sciezka}${t ? ` (tytuł: ${t})` : ""}. Jeśli pytanie dotyczy tej strony, odpowiadaj w jej kontekście.`;
}

export async function POST(req: Request) {
  if (!OPENAI_API_KEY) {
    return NextResponse.json({ error: "Brak klucza API" }, { status: 500 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Za dużo pytań naraz, odczekaj chwilę." },
      { status: 429 },
    );
  }

  let historia: Wiadomosc[];
  let kontekst = "";
  try {
    const body = await req.json();
    kontekst = opisStrony(body.pathname, body.tytul);
    historia = Array.isArray(body.historia) ? body.historia : [];
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe dane" }, { status: 400 });
  }

  const input = historia
    .filter((w) => typeof w?.tekst === "string" && w.tekst.trim())
    .slice(-8)
    .map((w) => ({
      role: w.rola === "bot" ? "assistant" : "user",
      content: w.tekst.slice(0, 600),
    }));
  if (!input.length || input[input.length - 1].role !== "user") {
    return NextResponse.json({ error: "Brak pytania" }, { status: 400 });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      signal: AbortSignal.timeout(30_000),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5.4-mini",
        max_output_tokens: 600,
        instructions: INSTRUKCJE + kontekst,
        input,
      }),
    });

    if (!response.ok) {
      console.error("OpenAI error:", await response.text());
      return NextResponse.json(
        { error: `OpenAI error: ${response.status}` },
        { status: 502 },
      );
    }

    const json = await response.json();
    const tekst: string = (json.output ?? [])
      .filter((o: { type: string }) => o.type === "message")
      .flatMap(
        (o: { content?: { type: string; text?: string }[] }) => o.content ?? [],
      )
      .filter((c: { type: string }) => c.type === "output_text")
      .map((c: { text?: string }) => c.text ?? "")
      .join("")
      .trim();

    if (!tekst) {
      return NextResponse.json({ error: "Pusta odpowiedź" }, { status: 502 });
    }
    const m = tekst.match(/\[\[WYCENA:\s*([\s\S]*?)\]\]/);
    const czysty = tekst.replace(/\[\[WYCENA:[\s\S]*?\]\]/g, "").trim();
    return NextResponse.json({
      tekst: czysty || tekst,
      ...(m ? { opisWyceny: m[1].trim().slice(0, 500) } : {}),
    });
  } catch {
    return NextResponse.json({ error: "Błąd przetwarzania" }, { status: 500 });
  }
}
