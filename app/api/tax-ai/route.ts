import { NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const RYCZALT_RATES = [
  { rate: 2, desc: "Sprzedaż produktów rolnych" },
  { rate: 3, desc: "Gastronomia, handel detaliczny" },
  { rate: 5.5, desc: "Produkcja, budownictwo" },
  { rate: 8.5, desc: "Usługi inne" },
  { rate: 10, desc: "Obrót nieruchomościami" },
  { rate: 12, desc: "IT, programowanie" },
  { rate: 14, desc: "Usługi zdrowotne" },
  { rate: 15, desc: "Usługi prawne, doradcze, księgowe" },
  { rate: 17, desc: "Wolne zawody" },
];

const detectRateTool = {
  type: "function",
  name: "set_ryczalt_rate",
  description: "Ustaw stawkę ryczałtu dla podanego źródła przychodu",
  parameters: {
    type: "object",
    properties: {
      rate: {
        type: "number",
        enum: [2, 3, 5.5, 8.5, 10, 12, 14, 15, 17],
        description: "Stawka ryczałtu w %",
      },
      isNajem: {
        type: "boolean",
        description: "Czy to najem/dzierżawa (stawka 8.5/12.5%)",
      },
      reasoning: {
        type: "string",
        description: "Krótkie uzasadnienie wyboru stawki (1 zdanie, po polsku)",
      },
    },
    required: ["rate", "isNajem", "reasoning"],
  },
};

const suggestCostsTool = {
  type: "function",
  name: "suggest_costs",
  description: "Zasugeruj koszty firmowe lub prywatne dla JDG",
  parameters: {
    type: "object",
    properties: {
      costs: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string", description: "Nazwa kosztu" },
            amount: { type: "number", description: "Szacunkowa kwota netto miesięcznie w PLN" },
            type: { type: "string", enum: ["business", "private"], description: "Typ kosztu" },
          },
          required: ["name", "amount", "type"],
        },
        description: "Lista 3-5 sugerowanych kosztów",
      },
    },
    required: ["costs"],
  },
};

export async function POST(req: Request) {
  if (!OPENAI_API_KEY) {
    return NextResponse.json({ error: "Brak klucza API" }, { status: 500 });
  }

  const body = await req.json();
  const { action } = body;

  if (action === "detect_rate") {
    const { sourceName } = body;
    if (!sourceName || sourceName.trim().length < 2) {
      return NextResponse.json({ error: "Nazwa za krótka" }, { status: 400 });
    }

    const ratesDesc = RYCZALT_RATES.map((r) => `${r.rate}% – ${r.desc}`).join("\n");

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5.4-mini",
        temperature: 0,
        max_output_tokens: 200,
        instructions: `Jesteś ekspertem od polskiego prawa podatkowego, specjalizujesz się w ryczałcie ewidencjonowanym.
Na podstawie nazwy źródła przychodu dobierz odpowiednią stawkę ryczałtu.

Dostępne stawki:
${ratesDesc}
Najem/dzierżawa: 8.5% do 100k/rok, 12.5% powyżej (isNajem=true)

Wybierz JEDNĄ najlepiej pasującą stawkę. Jeśli niepewny, wybierz 8.5% (usługi inne).`,
        input: `Źródło przychodu: "${sourceName}"`,
        tools: [detectRateTool],
        tool_choice: { type: "function", name: "set_ryczalt_rate" },
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Błąd API" }, { status: 502 });
    }

    const data = await response.json();
    const toolCall = data.output?.find((o: { type: string }) => o.type === "function_call");
    if (!toolCall) {
      return NextResponse.json({ error: "Brak odpowiedzi" }, { status: 502 });
    }

    const result = JSON.parse(toolCall.arguments);
    return NextResponse.json(result);
  }

  if (action === "suggest_costs") {
    const { costType, existingRevenues, existingCosts } = body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5.4-mini",
        temperature: 0.5,
        max_output_tokens: 500,
        instructions: `Jesteś doradcą podatkowym dla polskich JDG. Na podstawie profilu działalności (przychody i istniejące koszty) zasugeruj ${costType === "business" ? "koszty firmowe" : "koszty prywatne wliczane w firmę"}.

${costType === "business"
  ? "Koszty firmowe: bezpośrednio związane z działalnością (narzędzia, licencje, materiały, wynajem biura, marketing, szkolenia, itp.)"
  : "Koszty prywatne w firmie: wydatki i tak ponoszone, które można częściowo odliczyć (telefon, internet, czynsz proporcjonalnie, energia, itp.)"}

Zasugeruj 3-5 kosztów, których użytkownik jeszcze NIE ma. Kwoty realistyczne, miesięczne, netto.
NIE powtarzaj kosztów które już istnieją.`,
        input: `Przychody: ${existingRevenues}\nIstniejące koszty: ${existingCosts}`,
        tools: [suggestCostsTool],
        tool_choice: { type: "function", name: "suggest_costs" },
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Błąd API" }, { status: 502 });
    }

    const data = await response.json();
    const toolCall = data.output?.find((o: { type: string }) => o.type === "function_call");
    if (!toolCall) {
      return NextResponse.json({ error: "Brak odpowiedzi" }, { status: 502 });
    }

    const result = JSON.parse(toolCall.arguments);
    return NextResponse.json(result);
  }

  return NextResponse.json({ error: "Nieznana akcja" }, { status: 400 });
}
