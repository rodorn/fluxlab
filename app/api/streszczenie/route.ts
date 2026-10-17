import { NextResponse } from "next/server";
import { createHash } from "node:crypto";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, number[]>();
const cache = new Map<string, string[]>();
const CACHE_MAX = 200;

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
    name: "zapisz_streszczenie",
    description: "Zwróć streszczenie artykułu w dokładnie 3 punktach.",
    parameters: {
      type: "object",
      properties: {
        punkty: {
          type: "array",
          description: "Trzy punkty, każdy maksymalnie 25 słów",
          minItems: 3,
          maxItems: 3,
          items: { type: "string" },
        },
      },
      required: ["punkty"],
      additionalProperties: false,
    },
  },
];

const INSTRUKCJA = `Streszczasz artykuł ze strefy wiedzy w dokładnie 3 punktach.
- Używaj wyłącznie faktów z podanego tekstu, niczego nie dopowiadaj.
- Pisz konkretnie: liczby, terminy i kroki, jeśli występują w tekście.
- Każdy punkt to jedno zdanie, maksymalnie 25 słów.
- Pisz po polsku, bez długich myślników i bez emoji, bez reklamy i zachęt do kontaktu.
Wywołaj zapisz_streszczenie.`;

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

  let body: { tytul?: unknown; tekst?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe dane" }, { status: 400 });
  }

  const tekst = typeof body.tekst === "string" ? body.tekst.trim() : "";
  const tytul =
    typeof body.tytul === "string" ? body.tytul.trim().slice(0, 200) : "";
  if (tekst.length < 300 || tekst.length > 12000) {
    return NextResponse.json(
      { error: "Tekst musi mieć 300–12 000 znaków." },
      { status: 400 },
    );
  }

  const hash = createHash("sha256").update(tytul + "\n" + tekst).digest("hex");
  const zapisane = cache.get(hash);
  if (zapisane) return NextResponse.json({ punkty: zapisane });

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5.4-mini",
        max_output_tokens: 400,
        instructions: INSTRUKCJA,
        input: [
          {
            role: "user",
            content: `Tytuł: ${tytul}\n\nTekst artykułu:\n${tekst}`,
          },
        ],
        tools,
        tool_choice: { type: "function", name: "zapisz_streszczenie" },
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
    const call = json.output?.find(
      (item: { type: string }) => item.type === "function_call",
    );
    if (!call?.arguments) {
      return NextResponse.json(
        { error: "LLM nie zwrócił danych" },
        { status: 502 },
      );
    }

    let punkty: unknown;
    try {
      punkty = JSON.parse(call.arguments).punkty;
    } catch {
      return NextResponse.json(
        { error: "Błąd parsowania odpowiedzi" },
        { status: 502 },
      );
    }
    if (
      !Array.isArray(punkty) ||
      punkty.length !== 3 ||
      !punkty.every((p) => typeof p === "string" && p.trim())
    ) {
      return NextResponse.json(
        { error: "Nieprawidłowa odpowiedź LLM" },
        { status: 502 },
      );
    }

    const czyste = (punkty as string[]).map((p) =>
      p.trim().replace(/\s*[—–]\s*/g, ", "),
    );
    if (cache.size >= CACHE_MAX) {
      const pierwszy = cache.keys().next().value;
      if (pierwszy) cache.delete(pierwszy);
    }
    cache.set(hash, czyste);
    return NextResponse.json({ punkty: czyste });
  } catch {
    return NextResponse.json({ error: "Błąd przetwarzania" }, { status: 500 });
  }
}
