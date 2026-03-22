import { NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

interface RecommendRequest {
  budget: number;
  bodyStyle: string | null;
  bodyShapes: string[];
  passengers: number;
  longTrips: number; // 0 = miasto, 100 = trasa
  height: number;
  segment: string;
  hp: number;
  additionalInfo: string;
}

const tools = [
  {
    type: "function",
    name: "recommend_cars",
    description:
      "Zwróć rekomendacje samochodów w 6 kategoriach wiekowych. Każda kategoria powinna zawierać dokładnie 5 modeli dopasowanych do budżetu i preferencji użytkownika.",
    parameters: {
      type: "object",
      properties: {
        categories: {
          type: "array",
          description: "5 kategorii wiekowych",
          items: {
            type: "object",
            properties: {
              ageLabel: {
                type: "string",
                description: "Nazwa kategorii wiekowej, np. 'Do 3 lat'",
              },
              ageFrom: { type: "number", description: "Minimalny wiek w latach" },
              ageTo: { type: "number", description: "Maksymalny wiek w latach (0 = brak limitu)" },
              cars: {
                type: "array",
                description: "5 rekomendowanych modeli",
                items: {
                  type: "object",
                  properties: {
                    make: { type: "string", description: "Marka" },
                    model: { type: "string", description: "Model" },
                    generation: { type: "string", description: "Generacja/oznaczenie, np. 'G20', 'B9', 'MK8'" },
                    yearFrom: { type: "number", description: "Rok produkcji od" },
                    yearTo: { type: "number", description: "Rok produkcji do" },
                    engine: { type: "string", description: "Silnik, np. '2.0 TDI 150KM', '1.8 Hybrid 140KM'" },
                    priceFrom: { type: "number", description: "Szacowana cena od (PLN)" },
                    priceTo: { type: "number", description: "Szacowana cena do (PLN)" },
                    pros: {
                      type: "array",
                      items: { type: "string" },
                      description: "2-3 konkretne zalety tego modelu",
                    },
                    cons: {
                      type: "array",
                      items: { type: "string" },
                      description: "1-2 konkretne wady tego modelu",
                    },
                  },
                  required: ["make", "model", "generation", "yearFrom", "yearTo", "engine", "priceFrom", "priceTo", "pros", "cons"],
                  additionalProperties: false,
                },
              },
            },
            required: ["ageLabel", "ageFrom", "ageTo", "cars"],
            additionalProperties: false,
          },
        },
      },
      required: ["categories"],
      additionalProperties: false,
    },
  },
];

export async function POST(req: Request) {
  if (!OPENAI_API_KEY) {
    return NextResponse.json({ error: "Brak klucza API" }, { status: 500 });
  }

  const body: RecommendRequest = await req.json();
  if (!body.budget || body.budget < 5000) {
    return NextResponse.json({ error: "Podaj budżet" }, { status: 400 });
  }

  const bodyStyleLabel = body.bodyStyle ?? "dowolny";
  const shapesLabel = body.bodyShapes.length > 0 ? body.bodyShapes.join(", ") : "dowolne";
  const tripsLabel =
    body.longTrips <= 20 ? "głównie miasto" :
    body.longTrips <= 40 ? "więcej miasta niż trasy" :
    body.longTrips <= 60 ? "pół na pół" :
    body.longTrips <= 80 ? "więcej trasy niż miasta" :
    "głównie trasa";

  const userMessage = [
    `Budżet: ${body.budget.toLocaleString("pl-PL")} PLN`,
    `Typ samochodu: ${bodyStyleLabel}`,
    `Forma nadwozia: ${shapesLabel}`,
    `Segment: ${body.segment || "dowolny"}`,
    `Moc silnika: ~${body.hp || 150} KM`,
    `Pasażerowie: ${body.passengers} os.`,
    `Trasy: ${tripsLabel} (${body.longTrips}/100)`,
    `Wzrost kierowcy: ${body.height} cm`,
    body.additionalInfo ? `Dodatkowe wymagania: ${body.additionalInfo}` : "",
  ].filter(Boolean).join("\n");

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5.4-mini",
        temperature: 0.3,
        instructions: `Jesteś ekspertem motoryzacyjnym specjalizującym się w polskim rynku wtórnym. Dzisiejsza data: ${new Date().toISOString().split("T")[0]}.

Użytkownik szuka samochodu. Na podstawie jego preferencji, segmentu, mocy i budżetu zaproponuj samochody w 6 kategoriach wiekowych:
1. Nowe (z salonu / do 1 roku)
2. Do 3 lat (prawie nowe)
3. 3-7 lat
4. 7-12 lat
5. 12-18 lat
6. Powyżej 18 lat

Zasady:
- W każdej kategorii podaj DOKŁADNIE 5 modeli
- Ceny muszą realistycznie mieścić się w budżecie użytkownika na polskim rynku (nowe = ceny katalogowe, używane = rynek wtórny)
- Jeśli budżet jest za mały na daną kategorię wiekową, podaj najtańsze dostępne opcje i zaznacz w wadach, że przekraczają budżet
- Dobieraj modele spójne z typem nadwozia, segmentem i mocą
- Podawaj konkretne silniki i moce (np. "2.0 TDI 150KM", nie "diesel")
- Generacja powinna być konkretna (np. "F30", "B8", "MK7")
- Zalety i wady powinny być konkretne dla danego modelu, nie ogólne
- Uwzględnij wzrost kierowcy przy doborze (wysoki kierowca = potrzeba więcej miejsca nad głową)
- Preferuj modele popularne w Polsce (łatwiej o części i serwis)

Zawsze wywołaj funkcję recommend_cars.`,
        input: [{ role: "user", content: userMessage }],
        tools,
        tool_choice: { type: "function", name: "recommend_cars" },
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("OpenAI error:", err);
      return NextResponse.json({ error: `OpenAI error: ${response.status}` }, { status: 502 });
    }

    const json = await response.json();
    const functionCall = json.output?.find(
      (item: { type: string }) => item.type === "function_call",
    );

    if (!functionCall?.arguments) {
      return NextResponse.json({ error: "LLM nie zwrócił danych" }, { status: 502 });
    }

    return NextResponse.json(JSON.parse(functionCall.arguments));
  } catch {
    return NextResponse.json({ error: "Błąd przetwarzania" }, { status: 500 });
  }
}
