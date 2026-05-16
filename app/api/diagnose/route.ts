import { NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

interface DiagnoseRequest {
  input: string;
}

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 6;
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
    name: "generate_diagnosis",
    description:
      "Zwróć diagnozę automatyzacji opisanego procesu B2B: czy ma sens, do którego filaru pasuje, konkretne kroki, ostrożny szacunek oszczędności i rekomendowany pierwszy krok.",
    parameters: {
      type: "object",
      properties: {
        viable: {
          type: "boolean",
          description: "Czy automatyzacja opisanego procesu ma sens",
        },
        pillar: {
          type: "string",
          enum: ["web", "crm", "scraping", "mixed"],
          description:
            "Filar Fluxlab: web = strony WWW, crm = automatyzacja CRM i obsługa leadów, scraping = pozyskiwanie danych, mixed = kilka obszarów",
        },
        processName: {
          type: "string",
          description: "Krótka, konkretna nazwa procesu, maksymalnie 60 znaków",
        },
        diagnosis: {
          type: "string",
          description: "Diagnoza procesu w 1-2 zdaniach",
        },
        automationSteps: {
          type: "array",
          description: "3-5 konkretnych kroków automatyzacji",
          minItems: 3,
          maxItems: 5,
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                description: "Krótki tytuł kroku",
              },
              detail: {
                type: "string",
                description:
                  "Konkret: co się dzieje i jakim narzędziem (n8n, Make, Zapier, Pipedrive, API, OpenAI itp.)",
              },
            },
            required: ["title", "detail"],
            additionalProperties: false,
          },
        },
        timeSavedHours: {
          type: "number",
          description:
            "OSTROŻNY szacunek oszczędności w godzinach na miesiąc. 0 jeśli nie da się rzetelnie ocenić.",
        },
        timeSavedNote: {
          type: "string",
          description: "Krótka uwaga skąd ten szacunek i od czego zależy",
        },
        firstStep: {
          type: "string",
          description: "Rekomendowany pierwszy krok do wdrożenia",
        },
        honestNote: {
          type: "string",
          description:
            "Pusty string jeśli wszystko ok. Szczera uwaga, jeśli proces jest zbyt mały, nieopłacalny do automatyzacji albo źle zaprojektowany.",
        },
      },
      required: [
        "viable",
        "pillar",
        "processName",
        "diagnosis",
        "automationSteps",
        "timeSavedHours",
        "timeSavedNote",
        "firstStep",
        "honestNote",
      ],
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
      { error: "Za dużo zapytań — odczekaj chwilę." },
      { status: 429 },
    );
  }

  let body: DiagnoseRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe dane" }, { status: 400 });
  }

  const input = typeof body.input === "string" ? body.input.trim() : "";
  if (input.length < 10 || input.length > 600) {
    return NextResponse.json(
      { error: "Opisz proces w 10–600 znakach." },
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
        temperature: 0.4,
        max_output_tokens: 4000,
        instructions: `Jesteś ekspertem automatyzacji procesów B2B w Fluxlab. Analizujesz opisany przez klienta proces i proponujesz konkretną, realistyczną automatyzację.

FILARY FLUXLAB (zmapuj proces do jednego):
- web — strony WWW, formularze, landing page, integracje na stronie
- crm — automatyzacja CRM, obsługa i przepływ leadów, follow-up, raportowanie sprzedaży
- scraping — pozyskiwanie i porządkowanie danych z zewnętrznych źródeł
- mixed — proces łączy kilka obszarów

ZASADY:
- Proponuj KONKRETNE kroki z nazwami narzędzi: n8n, Make, Zapier, Pipedrive, API, OpenAI, Google Sheets itp. Bez ogólników.
- Szacunki oszczędności OSTROŻNE — nie zawyżaj, lepiej zaniżyć. Jeśli nie da się rzetelnie ocenić, ustaw timeSavedHours na 0.
- Jeśli proces jest zbyt mały, nieopłacalny do automatyzacji albo źle zaprojektowany — powiedz to wprost w honestNote. Nie naciągaj.
- honestNote zostaw pusty ("") gdy proces nadaje się do automatyzacji bez zastrzeżeń.
- processName maksymalnie 60 znaków. automationSteps: 3-5 kroków.
- Pisz po polsku, rzeczowo, bez marketingowego żargonu.

Wywołaj generate_diagnosis.`,
        input: [{ role: "user", content: input }],
        tools,
        tool_choice: { type: "function", name: "generate_diagnosis" },
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("OpenAI error:", err);
      return NextResponse.json(
        { error: `OpenAI error: ${response.status}` },
        { status: 502 },
      );
    }

    const json = await response.json();
    const functionCall = json.output?.find(
      (item: { type: string }) => item.type === "function_call",
    );

    if (!functionCall?.arguments) {
      return NextResponse.json(
        { error: "LLM nie zwrócił danych" },
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
