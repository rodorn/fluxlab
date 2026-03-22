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
  extended?: boolean;
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
                          directInjection: {
                            type: "boolean",
                            description: "Czy silnik ma wtrysk bezpośredni (FSI, TSI, TFSI, GDI, T-GDI, Skyactiv-G direct, CDI, itp.). Port injection / MPI = false.",
                          },
                        },
                        required: ["engine", "hp", "fuelType", "priceFrom", "priceTo", "fuelCity", "fuelHighway", "engineLayout", "engineReliability", "directInjection"],
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
        model: body.extended ? "gpt-5.4" : "gpt-5.4-mini",
        temperature: 0.3,
        max_output_tokens: body.extended ? 32000 : 16000,
        instructions: `Ekspert motoryzacyjny, rynek polski. Data: ${new Date().toISOString().split("T")[0]}.

Dzisiejszy rok: ${new Date().getFullYear()}. Zaproponuj samochody w 6 kategoriach wiekowych:
- Nowe (yearFrom >= ${new Date().getFullYear() - 1})
- Do 3 lat (yearFrom >= ${new Date().getFullYear() - 3})
- 3-7 lat (yearFrom ${new Date().getFullYear() - 7}–${new Date().getFullYear() - 3})
- 7-12 lat (yearFrom ${new Date().getFullYear() - 12}–${new Date().getFullYear() - 7})
- 12-18 lat (yearFrom ${new Date().getFullYear() - 18}–${new Date().getFullYear() - 12})
- Powyżej 18 lat (yearFrom < ${new Date().getFullYear() - 18}, czyli PRZED ${new Date().getFullYear() - 18} rokiem)
WAŻNE: Auto z yearFrom=2008 w roku ${new Date().getFullYear()} ma ${new Date().getFullYear() - 2008} lat → kategoria ${new Date().getFullYear() - 2008 <= 18 ? "12-18 lat" : "Powyżej 18 lat"}. Licz poprawnie!
Podaj do ${body.extended ? 8 : 5} modeli na kategorię. Jeśli w danej kategorii nie istnieją modele spełniające kryteria (typ, segment, moc) — zwróć pustą tablicę cars: []. NIGDY nie wstawiaj modelu do kategorii, w której się nie mieści wiekiem. Lepiej zwrócić 0-1 modeli niż kłamać.

TYP SAMOCHODU: użytkownik wybrał "${bodyStyleLabel}". Rekomenduj WYŁĄCZNIE samochody tego typu.
${body.bodyStyle === "van" ? "VAN = samochody dostawczo-osobowe i vany (np. VW Transporter, Mercedes Vito, Renault Trafic, Ford Transit Custom, Toyota Proace, Opel Vivaro, VW Caddy, Citroën Berlingo). NIE zwracaj sedanów, SUV-ów ani crossoverów." : ""}${body.bodyStyle === "suv" ? "SUV = duże SUV-y (np. Toyota Land Cruiser, BMW X5, Hyundai Santa Fe, Kia Sorento). NIE zwracaj sedanów, vanów ani crossoverów." : ""}${body.bodyStyle === "crossover" ? "CROSSOVER = kompaktowe crossovery/SUV-y (np. Toyota RAV4, Mazda CX-5, VW Tiguan, Hyundai Tucson). NIE zwracaj sedanów, vanów ani dużych SUV-ów." : ""}${body.bodyStyle === "terenowy" ? "TERENOWY = samochody terenowe (np. Jeep Wrangler, Toyota Land Cruiser, Suzuki Jimny, Land Rover Defender). NIE zwracaj sedanów, crossoverów ani vanów." : ""}${body.bodyStyle === "sportowy" ? "SPORTOWY = samochody sportowe (np. Mazda MX-5, Toyota GR86, BMW M2, Porsche Cayman). NIE zwracaj sedanów, vanów ani SUV-ów." : ""}
SEGMENT: preferowany ${body.segment}. Większość modeli (3-4 z 5) powinna być z segmentu ${body.segment}. Dopuszczalny też 1-2 modele z wyższych segmentów (${allowedSegments.join(", ")}), NIGDY niższe.
MOC: KAŻDY wariant >= ${body.hp || 150} KM. Nie dodawaj słabszych wariantów.
WARIANTY: podaj benzyna i diesel jeśli oba spełniają moc. Nie dodawaj LPG. Nie wymuszaj diesla jeśli nie spełnia mocy.

CENY – NAJWAŻNIEJSZE:
- Podawaj REALNE ceny rynkowe z polskich portali (Otomoto, OLX) na dziś.
- NIE dopasowuj cen do budżetu użytkownika. Podaj prawdziwe ceny, nawet jeśli przekraczają budżet.
- Budżet użytkownika to ${body.budget.toLocaleString("pl-PL")} PLN – służy Ci TYLKO jako wskazówka, jakie modele mogą go zainteresować. Filtrowanie po cenie robimy sami.
- Przykłady realnych cen: VW Golf VIII 2020 = 75-95k, BMW 320i G20 2020 = 120-150k, Audi A4 B9 2018 = 80-110k, Mercedes C200 W205 2017 = 70-100k.

WTRYSK – directInjection dotyczy TYLKO silników benzynowych (dla diesli zawsze false, bo nie montuje się LPG):
- directInjection: true = silnik MA wtryskiwacze bezpośrednie, nawet jeśli ma też pośrednie (dual injection). Przy LPG i tak musi spalać ~10% benzyny na wtryskiwaczach bezpośrednich.
  Przykłady TRUE (kody silników): VW TSI (EA888, EA211), VW FSI, Toyota D-4/D-4S, Lexus xGR-FSE (2GR-FSE, 3GR-FSE, 4GR-FSE, 2UR-FSE), Mazda Skyactiv-G, Hyundai/Kia GDI/T-GDI, BMW N20/B48/N55/S55, Mercedes M274/M264.
  Przykłady TRUE (modele): Lexus GS300/GS350/GS430/GS450h (2005+), Lexus IS250/IS350 (2005+), Lexus LS460 (2006+), Toyota Crown/Mark X (2004+), VW Golf GTI/R, Audi A4/A6 TFSI, BMW 320i/328i/330i (E90+), Mazda 3/6/CX-5 Skyactiv-G.
- directInjection: false = TYLKO wtrysk pośredni (port injection), BEZ jakichkolwiek wtryskiwaczy bezpośrednich. Pełne LPG bez spalania benzyny.
  Przykłady FALSE (kody): Toyota 2GR-FE (port only), 1ZZ-FE, 2ZR-FE, 1MZ-FE, VW MPI (1.6 MPI), Hyundai/Kia MPI, Honda K20A/R20A.
  Przykłady FALSE (modele): Toyota Camry V6 (2GR-FE, do 2017), Toyota RAV4 2.0 VVT-i (starsze), Honda Accord 2.0/2.4 (K-series), Hyundai i30 1.6 MPI, VW Polo 1.6 MPI.
WAŻNE: Jeśli w nazwie silnika jest FSI/GDI/D-4/D-4S/TSI/TFSI → directInjection: true. W kodach Toyota/Lexus: "FE" = port injection (false), "FSE" = direct injection (true). Lexus GS300 ma 3GR-FSE = TRUE. W razie wątpliwości ustaw true (bezpieczniej zawyżyć koszt LPG).
LATA PRODUKCJI: yearFrom i yearTo to PEŁNY zakres produkcji danej generacji, NIE pojedynczy rok. Np. BMW X6 E71: yearFrom=2008, yearTo=2014. BMW X4 F26: yearFrom=2014, yearTo=2018. NIGDY nie podawaj tego samego roku w obu polach.
OPISY (pros): 3-4 zdania opisujące CHARAKTER i TOŻSAMOŚĆ modelu — co go wyróżnia, jak się prowadzi, jakie emocje budzi, z czego jest znany. NIE powtarzaj danych technicznych (spalanie, moc — to już jest w interfejsie). Przykład: "Kultowy SUV coupe, który zapoczątkował cały segment. Agresywna sylwetka przyciąga spojrzenia. Zaskakująco zwinny jak na swoje rozmiary. Prestiż marki BMW w wydaniu off-roadowym."
WADY (cons): 2-3 konkretne, praktyczne uwagi — na co uważać przy zakupie tego modelu (typowe usterki, koszty eksploatacji, znane problemy generacji).
UNIKALNE MODELE: w każdej kategorii wiekowej podaj 5 RÓŻNYCH modeli. NIE powtarzaj tego samego modelu w sąsiednich kategoriach (np. jeśli BMW X6 E71 jest w 12-18 lat, NIE dawaj go też w Powyżej 18 lat).
FORMAT: konkretne silniki ("2.0 TDI 150KM"), konkretne generacje ("F30", "B8"). Popularne w Polsce.

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
