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
    name: "karta_leada",
    description:
      "Karta leada w CRM z zapytania klienta oraz szkic pierwszej odpowiedzi handlowca.",
    parameters: {
      type: "object",
      properties: {
        temat: { type: "string", description: "Czego klient chce, max 6 słów" },
        branza: {
          type: "string",
          description: "Branża firmowego klienta albo rodzaj usługi, o którą pyta klient prywatny",
        },
        miasto: { type: "string", description: "Miasto albo „nie podano”" },
        budzet: {
          type: "string",
          description: "Budżet z tekstu albo „nie podano”",
        },
        termin: {
          type: "string",
          description: "Oczekiwany termin albo „nie podano”",
        },
        pilnosc: { type: "string", enum: ["niska", "średnia", "wysoka"] },
        ocena: {
          type: "integer",
          description:
            "Szansa na sprzedaż 1–100 na podstawie konkretów w zapytaniu",
        },
        nastepny_krok: {
          type: "string",
          description: "Jedno zadanie dla handlowca, max 8 słów",
        },
        odpowiedz: {
          type: "string",
          description:
            "Szkic pierwszej odpowiedzi do klienta, 2–3 zdania, na „Pan/Pani” albo bezosobowo, konkretnie do jego sprawy, kończy się pytaniem albo propozycją terminu rozmowy",
        },
      },
      required: [
        "temat",
        "branza",
        "miasto",
        "budzet",
        "termin",
        "pilnosc",
        "ocena",
        "nastepny_krok",
        "odpowiedz",
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
      { error: "Za dużo prób naraz, odczekaj chwilę." },
      { status: 429 },
    );
  }

  let tekst = "";
  let firma = "";
  try {
    const body = await req.json();
    tekst = typeof body.tekst === "string" ? body.tekst.trim() : "";
    firma = typeof body.firma === "string" ? body.firma.trim().slice(0, 120) : "";
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe dane" }, { status: 400 });
  }
  if (tekst.length < 10 || tekst.length > 500) {
    return NextResponse.json(
      { error: "Napisz zapytanie w 10–500 znakach." },
      { status: 400 },
    );
  }

  try {
    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      signal: AbortSignal.timeout(25_000),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5.4-mini",
        max_output_tokens: 700,
        instructions: `Jesteś systemem CRM firmy: ${firma || "firma usługowa"}. Dostajesz zapytanie, które klient wpisał w formularz na stronie tej firmy. Zakładasz kartę leada i piszesz szkic pierwszej odpowiedzi handlowca.
Zasady: wyciągaj tylko to, co jest w tekście, niczego nie zmyślaj (brak danych = „nie podano”). Ocena wyżej, gdy jest budżet, termin i konkret. Odpowiedź po polsku, uprzejma, rzeczowa, odnosi się do szczegółów zapytania, bez obiecywania cen ani terminów, bez długich myślników i emoji. Jeśli tekst nie jest zapytaniem klienta, potraktuj go jako ogólne zapytanie i ustaw niską ocenę.
Wywołaj karta_leada.`,
        input: [{ role: "user", content: tekst }],
        tools,
        tool_choice: { type: "function", name: "karta_leada" },
      }),
    });
    if (!r.ok) {
      console.error("OpenAI error:", await r.text());
      return NextResponse.json(
        { error: "AI chwilowo nie odpowiada, spróbuj za moment." },
        { status: 502 },
      );
    }
    const json = await r.json();
    const call = json.output?.find(
      (o: { type: string }) => o.type === "function_call",
    );
    if (!call?.arguments) {
      return NextResponse.json({ error: "Pusta odpowiedź" }, { status: 502 });
    }
    return NextResponse.json(JSON.parse(call.arguments));
  } catch {
    return NextResponse.json({ error: "Błąd przetwarzania" }, { status: 500 });
  }
}
