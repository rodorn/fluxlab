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
      "Zwróć rekomendacje samochodów w kategoriach wiekowych. Każda kategoria zawiera modele z wariantami paliwowymi dopasowanymi do budżetu i preferencji użytkownika.",
    parameters: {
      type: "object",
      properties: {
        categories: {
          type: "array",
          description: "Kategorie wiekowe (tylko te, w których budżet pozwala na jakikolwiek model)",
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
                description: "3-5 rekomendowanych modeli",
                items: {
                  type: "object",
                  properties: {
                    make: { type: "string", description: "Marka" },
                    model: { type: "string", description: "Model" },
                    generation: { type: "string", description: "Generacja/oznaczenie, np. 'G20', 'B9', 'MK8'" },
                    yearFrom: { type: "number", description: "Rok produkcji od" },
                    yearTo: { type: "number", description: "Rok produkcji do" },
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
                    brandReliability: {
                      type: "number",
                      description: "Awaryjność marki: 1=niezawodna, 2=przeciętna, 3=awaryjna",
                    },
                    complexity: {
                      type: "number",
                      description: "Segment: 1=A/B, 2=C, 3=D, 4=E, 5=F",
                    },
                    variants: {
                      type: "array",
                      description: "Warianty paliwowe tego modelu (benzyna, diesel, LPG, elektryczny). Minimum 1, maksimum 4.",
                      items: {
                        type: "object",
                        properties: {
                          engine: { type: "string", description: "Silnik, np. '2.0 TDI 150KM', '1.8T 180KM + LPG'" },
                          hp: { type: "number", description: "Moc silnika w KM" },
                          fuelType: {
                            type: "string",
                            enum: ["benzyna", "diesel", "elektryczny"],
                            description: "Typ paliwa",
                          },
                          priceFrom: { type: "number", description: "Szacowana cena od (PLN)" },
                          priceTo: { type: "number", description: "Szacowana cena do (PLN)" },
                          fuelCity: { type: "number", description: "Spalanie w mieście L/100km" },
                          fuelHighway: { type: "number", description: "Spalanie w trasie L/100km" },
                          engineLayout: {
                            type: "string",
                            enum: ["elektryczny", "R3", "R4", "R5", "R6", "V6", "V8", "V10", "V12", "W12", "W16"],
                            description: "Układ silnika",
                          },
                          engineReliability: {
                            type: "number",
                            description: "Awaryjność silnika: 1=trwały, 2=sprawdzony, 3=średni, 4=złożony, 5=egzotyczny",
                          },
                        },
                        required: ["engine", "hp", "fuelType", "priceFrom", "priceTo", "fuelCity", "fuelHighway", "engineLayout", "engineReliability"],
                        additionalProperties: false,
                      },
                    },
                  },
                  required: ["make", "model", "generation", "yearFrom", "yearTo", "pros", "cons", "brandReliability", "complexity", "variants"],
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

  const segmentExamples: Record<string, string> = {
    A: "A/B – miejskie (Fiat 500, VW Up, Toyota Aygo, VW Polo, Hyundai i20)",
    B: "B – małe (VW Polo, Skoda Fabia, Opel Corsa, Mazda 2)",
    C: "C – kompaktowe (VW Golf, Toyota Corolla, Honda Civic, Skoda Octavia)",
    D: "D – średnia klasa (BMW 3, Audi A4, Mercedes C, VW Passat, Volvo S60)",
    E: "E – wyższa średnia (BMW 5, Audi A6, Mercedes E, Volvo S90)",
    F: "F – luksusowe (BMW 7, Audi A8, Mercedes S, Porsche Panamera, Lexus LS, Maserati Quattroporte)",
  };

  const segmentLabel = segmentExamples[body.segment] || body.segment || "dowolny";

  const segmentOrder = ["A", "B", "C", "D", "E", "F"];
  const segIdx = segmentOrder.indexOf(body.segment);
  const allowedSegments = segIdx >= 0 ? segmentOrder.slice(segIdx) : segmentOrder;
  const allowedSegmentsStr = allowedSegments.map((s) => segmentExamples[s] || s).join("\n  ");

  const userMessage = [
    `Orientacyjny budżet: ${body.budget.toLocaleString("pl-PL")} PLN (podaj REALNE ceny, nie dopasowuj do budżetu!)`,
    `Typ samochodu: ${bodyStyleLabel}`,
    `Forma nadwozia: ${shapesLabel}`,
    `Minimalny segment: ${segmentLabel}`,
    `Dopuszczalne segmenty: ${allowedSegments.join(", ")}`,
    `Minimalna moc silnika: ${body.hp || 150} KM`,
    `Pasażerowie: ${body.passengers} os.`,
    `Trasy: ${tripsLabel}`,
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
        instructions: `Ekspert motoryzacyjny, rynek polski. Data: ${new Date().toISOString().split("T")[0]}.

Zaproponuj samochody w 6 kategoriach wiekowych: Nowe, Do 3 lat, 3-7 lat, 7-12 lat, 12-18 lat, Powyżej 18 lat.
Podaj 5 modeli na kategorię. Zawsze zwracaj WSZYSTKIE 6 kategorii.

TYP SAMOCHODU: użytkownik wybrał "${bodyStyleLabel}". Rekomenduj WYŁĄCZNIE samochody tego typu.
${body.bodyStyle === "van" ? "VAN = samochody dostawczo-osobowe i vany (np. VW Transporter, Mercedes Vito, Renault Trafic, Ford Transit Custom, Toyota Proace, Opel Vivaro, VW Caddy, Citroën Berlingo). NIE zwracaj sedanów, SUV-ów ani crossoverów." : ""}${body.bodyStyle === "suv" ? "SUV = duże SUV-y (np. Toyota Land Cruiser, BMW X5, Hyundai Santa Fe, Kia Sorento). NIE zwracaj sedanów, vanów ani crossoverów." : ""}${body.bodyStyle === "crossover" ? "CROSSOVER = kompaktowe crossovery/SUV-y (np. Toyota RAV4, Mazda CX-5, VW Tiguan, Hyundai Tucson). NIE zwracaj sedanów, vanów ani dużych SUV-ów." : ""}${body.bodyStyle === "terenowy" ? "TERENOWY = samochody terenowe (np. Jeep Wrangler, Toyota Land Cruiser, Suzuki Jimny, Land Rover Defender). NIE zwracaj sedanów, crossoverów ani vanów." : ""}${body.bodyStyle === "sportowy" ? "SPORTOWY = samochody sportowe (np. Mazda MX-5, Toyota GR86, BMW M2, Porsche Cayman). NIE zwracaj sedanów, vanów ani SUV-ów." : ""}
SEGMENT: minimum ${body.segment}, dopuszczalne też wyższe (${allowedSegments.join(", ")}), NIGDY niższe.
MOC: KAŻDY wariant >= ${body.hp || 150} KM. Nie dodawaj słabszych wariantów.
WARIANTY: podaj benzyna i diesel jeśli oba spełniają moc. Nie dodawaj LPG. Nie wymuszaj diesla jeśli nie spełnia mocy.

CENY – NAJWAŻNIEJSZE:
- Podawaj REALNE ceny rynkowe z polskich portali (Otomoto, OLX) na dziś.
- NIE dopasowuj cen do budżetu użytkownika. Podaj prawdziwe ceny, nawet jeśli przekraczają budżet.
- Budżet użytkownika to ${body.budget.toLocaleString("pl-PL")} PLN – służy Ci TYLKO jako wskazówka, jakie modele mogą go zainteresować. Filtrowanie po cenie robimy sami.
- Przykłady realnych cen: VW Golf VIII 2020 = 75-95k, BMW 320i G20 2020 = 120-150k, Audi A4 B9 2018 = 80-110k, Mercedes C200 W205 2017 = 70-100k.

FORMAT: konkretne silniki ("2.0 TDI 150KM"), konkretne generacje ("F30", "B8"). Zalety/wady konkretne dla modelu. Popularne w Polsce.

Wywołaj recommend_cars.`,
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
