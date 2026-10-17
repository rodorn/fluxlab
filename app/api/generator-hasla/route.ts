import { NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
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

const tools = [
  {
    type: "function",
    name: "generate_slogan",
    description: "Zwróć treść hero strony firmowej: domenę, hasło, podtytuł, CTA i 2 alternatywne hasła.",
    parameters: {
      type: "object",
      properties: {
        domena: {
          type: "string",
          description: "Wymyślona domena .pl z branży i miasta (jeśli podane), np. warsztat-lublin.pl, małe litery, bez polskich znaków",
        },
        haslo: { type: "string", description: "Główne hasło H1, po polsku, maksymalnie 7 słów" },
        podtytul: { type: "string", description: "Jedno zdanie podtytułu, konkretne" },
        cta: { type: "string", description: "Tekst przycisku, 2-3 słowa" },
        alternatywy: {
          type: "array",
          minItems: 2,
          maxItems: 2,
          items: { type: "string", description: "Alternatywne hasło, maksymalnie 7 słów" },
        },
      },
      required: ["domena", "haslo", "podtytul", "cta", "alternatywy"],
      additionalProperties: false,
    },
  },
];

export async function POST(req: Request) {
  if (!OPENAI_API_KEY) {
    return NextResponse.json({ error: "Brak klucza API" }, { status: 500 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Za dużo zapytań, odczekaj chwilę." },
      { status: 429 },
    );
  }

  let body: { opis?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe dane" }, { status: 400 });
  }

  const opis = typeof body.opis === "string" ? body.opis.trim() : "";
  if (opis.length < 10 || opis.length > 300) {
    return NextResponse.json(
      { error: "Opisz firmę w 10–300 znakach." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5.4-mini",
        max_output_tokens: 500,
        instructions: `Jesteś copywriterem w Fluxlab. Na podstawie opisu firmy tworzysz treść górnej części jej strony internetowej.

ZASADY:
- Wszystko po polsku, konkretnie, bez pustych sloganów.
- Hasło (haslo) i każda alternatywa: maksymalnie 7 słów.
- Bez obietnic liczbowych (procenty, lata, liczby klientów, ceny) i bez wymyślonych faktów o firmie. Opieraj się tylko na opisie.
- Bez długich myślników i bez emoji.
- Podtytuł: jedno zdanie, konkretne.
- CTA: 2-3 słowa.
- Domena: wymyślona, kończy się na .pl, z branży i miasta (jeśli podane), małe litery, myślniki, bez polskich znaków.
- Alternatywy mają różnić się tonem lub kątem od hasła głównego.

Wywołaj generate_slogan.`,
        input: [{ role: "user", content: opis }],
        tools,
        tool_choice: { type: "function", name: "generate_slogan" },
      }),
    });

    if (!response.ok) {
      console.error("OpenAI error:", await response.text());
      return NextResponse.json(
        { error: "Nie udało się wygenerować hasła. Spróbuj ponownie." },
        { status: 502 },
      );
    }

    const json = await response.json();
    const functionCall = json.output?.find(
      (item: { type: string }) => item.type === "function_call",
    );
    if (!functionCall?.arguments) {
      return NextResponse.json(
        { error: "Nie udało się wygenerować hasła. Spróbuj ponownie." },
        { status: 502 },
      );
    }

    try {
      return NextResponse.json(JSON.parse(functionCall.arguments));
    } catch {
      return NextResponse.json(
        { error: "Błąd parsowania odpowiedzi" },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json({ error: "Błąd przetwarzania" }, { status: 500 });
  }
}
