import { NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
];

function isOtomotoUrl(q: string): boolean {
  return /otomoto\.pl\/.+/i.test(q.trim());
}

interface OtomotoData {
  price: number;
  year: number;
  mileage: number;
  title: string;
  fuelType?: string;
  engineCapacity?: number;
  enginePower?: number;
}

async function scrapeOtomoto(url: string): Promise<OtomotoData | null> {
  const cleanUrl = url.trim().split(/\s/)[0];

  const res = await fetch(cleanUrl, {
    headers: {
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "pl-PL,pl;q=0.9",
      "User-Agent": USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)],
    },
  });

  if (!res.ok) return null;
  const html = await res.text();

  const findVal = (regex: RegExp): string | null => {
    const m = html.match(regex);
    return m ? m[1] : null;
  };

  // Otomoto has two JSON formats: {"value":"X"} and {"values":[{"value":"X"}]}
  const omScrap = (field: string): string | null =>
    findVal(new RegExp(`"${field}":\\{[^}]*?"value":"(.*?)"`)) ||
    findVal(new RegExp(`"${field}":\\{"label":"${field}","values":\\[\\{"value":"(.*?)"`));

  const price =
    parseInt(findVal(/"price":\{"value":"(\d+)"/) || "") ||
    parseInt(findVal(/"rawPrice":"(\d+)"/) || "") ||
    0;

  const year = parseInt(omScrap("year") || "") || 0;
  const mileage = parseInt((omScrap("mileage") || "").replace(/\s/g, "")) || 0;

  const make = omScrap("make") || "";
  const model = (omScrap("model") || "").replace(/-/g, " ");
  const generation = (omScrap("generation") || "").replace(/gen-/i, "").replace(/-/g, " ");
  const version = omScrap("version") || "";
  const fuelType = omScrap("fuel_type") || undefined;
  const engineCapacity = parseInt(omScrap("engine_capacity") || "") || undefined;
  const enginePower = parseInt(omScrap("engine_power") || "") || undefined;

  const title = [make, model, generation, version].filter(Boolean).join(" ");

  if (!price && !year && !title) return null;

  return { price, year, mileage, title, fuelType, engineCapacity, enginePower };
}

const tools = [
  {
    type: "function",
    name: "fill_car_data",
    description:
      "Wypełnij dane samochodu na podstawie opisu. Oszacuj aktualne ceny rynkowe w Polsce.",
    parameters: {
      type: "object",
      properties: {
        fuelType: {
          type: "string",
          enum: ["benzyna", "diesel", "gaz", "elektryczny"],
          description: "Typ paliwa",
        },
        engine: {
          type: "string",
          enum: [
            "elektryczny", "R3", "R4", "R5", "R6", "V6", "V8", "V10", "V12", "W12", "W16",
          ],
          description: "Układ silnika (R3=3-cyl rzędowy, R4=4-cyl rzędowy, V6=6-cyl widlasty, itd.)",
        },
        fuelCity: {
          type: "number",
          description: "Szacunkowe spalanie w mieście L/100km",
        },
        fuelHighway: {
          type: "number",
          description: "Szacunkowe spalanie w trasie L/100km",
        },
        brandReliability: {
          type: "number",
          description:
            "Awaryjność marki: 1=niezawodna (Toyota, Lexus, Honda), 2=przeciętna (VW, Ford, Hyundai), 3=awaryjna (Land Rover, Alfa Romeo)",
        },
        engineReliability: {
          type: "number",
          description:
            "Awaryjność silnika: 1=wyjątkowo trwały, 2=sprawdzony, 3=średni (turbo, elektronika), 4=złożony (kosztowne usterki), 5=egzotyka (V10+, drogie części)",
        },
        complexity: {
          type: "number",
          description:
            "Segment pojazdu wg klasyfikacji europejskiej: 1=A/B (miejskie, np. Fiat 500, VW Polo), 2=C (kompaktowe, np. Golf, Civic, Focus), 3=D (średnia klasa, np. BMW 3, Audi A4, Passat), 4=E (wyższa średnia, np. BMW 5, Audi A6, Mercedes E), 5=F (luksusowe, np. BMW 7, Audi A8, Mercedes S, Porsche Panamera)",
        },
        price: {
          type: "number",
          description: "Szacunkowa cena zakupu w PLN na polskim rynku wtórnym",
        },
        year: {
          type: "number",
          description: "Rok produkcji samochodu",
        },
        mileage: {
          type: "number",
          description: "Przebieg w km (oszacuj typowy jeśli nie podano)",
        },
      },
      required: ["fuelType", "engine", "fuelCity", "fuelHighway", "brandReliability", "engineReliability", "complexity", "price", "year", "mileage"],
      additionalProperties: false,
    },
  },
];

// Reduced tool for Otomoto — LLM only fills fields not scraped from the listing
const toolsOtomoto = [
  {
    type: "function",
    name: "fill_car_data",
    description:
      "Wypełnij brakujące dane samochodu na podstawie opisu. Cena, rok i przebieg są już znane — NIE podawaj ich.",
    parameters: {
      type: "object",
      properties: {
        fuelType: {
          type: "string",
          enum: ["benzyna", "diesel", "gaz", "elektryczny"],
          description: "Typ paliwa",
        },
        engine: {
          type: "string",
          enum: [
            "elektryczny", "R3", "R4", "R5", "R6", "V6", "V8", "V10", "V12", "W12", "W16",
          ],
          description: "Układ silnika (R3=3-cyl rzędowy, R4=4-cyl rzędowy, V6=6-cyl widlasty, itd.)",
        },
        fuelCity: {
          type: "number",
          description: "Szacunkowe spalanie w mieście L/100km",
        },
        fuelHighway: {
          type: "number",
          description: "Szacunkowe spalanie w trasie L/100km",
        },
        brandReliability: {
          type: "number",
          description:
            "Awaryjność marki: 1=niezawodna (Toyota, Lexus, Honda), 2=przeciętna (VW, Ford, Hyundai), 3=awaryjna (Land Rover, Alfa Romeo)",
        },
        engineReliability: {
          type: "number",
          description:
            "Awaryjność silnika: 1=wyjątkowo trwały, 2=sprawdzony, 3=średni (turbo, elektronika), 4=złożony (kosztowne usterki), 5=egzotyka (V10+, drogie części)",
        },
        complexity: {
          type: "number",
          description:
            "Segment pojazdu wg klasyfikacji europejskiej: 1=A/B (miejskie, np. Fiat 500, VW Polo), 2=C (kompaktowe, np. Golf, Civic, Focus), 3=D (średnia klasa, np. BMW 3, Audi A4, Passat), 4=E (wyższa średnia, np. BMW 5, Audi A6, Mercedes E), 5=F (luksusowe, np. BMW 7, Audi A8, Mercedes S, Porsche Panamera)",
        },
      },
      required: ["fuelType", "engine", "fuelCity", "fuelHighway", "brandReliability", "engineReliability", "complexity"],
      additionalProperties: false,
    },
  },
];

export async function POST(req: Request) {
  if (!OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Brak klucza API" },
      { status: 500 },
    );
  }

  const { query } = await req.json();
  if (!query || typeof query !== "string") {
    return NextResponse.json(
      { error: "Brak zapytania" },
      { status: 400 },
    );
  }

  try {
    let scrapedData: OtomotoData | null = null;
    let llmQuery: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let llmTools: any[];

    if (isOtomotoUrl(query)) {
      scrapedData = await scrapeOtomoto(query);
      if (!scrapedData || !scrapedData.title) {
        return NextResponse.json(
          { error: "Nie udało się pobrać danych z ogłoszenia" },
          { status: 502 },
        );
      }

      // Build context string for LLM — title + extras from listing
      const parts = [scrapedData.title];
      if (scrapedData.year) parts.push(`${scrapedData.year} rok`);
      if (scrapedData.fuelType) parts.push(scrapedData.fuelType);
      if (scrapedData.engineCapacity) parts.push(`${scrapedData.engineCapacity} cm³`);
      if (scrapedData.enginePower) parts.push(`${scrapedData.enginePower} KM`);
      llmQuery = parts.join(", ");
      llmTools = toolsOtomoto;
    } else {
      llmQuery = query;
      llmTools = tools;
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5.4-mini",
        temperature: 0,
        instructions: `Jesteś ekspertem motoryzacyjnym. Dzisiejsza data: ${new Date().toISOString().split("T")[0]}.
Użytkownik poda opis samochodu lub nazwę modelu.
Na tej podstawie wypełnij dane samochodu używając funkcji fill_car_data.
Oszacuj aktualną cenę rynkową w Polsce. Podaj realistyczny przebieg jeśli nie został podany.
Zawsze wywołaj funkcję fill_car_data z najlepszymi szacunkami.

Segment (complexity) przypisuj ściśle wg europejskiej klasyfikacji:
1=A/B: Fiat 500, Up, Aygo, i10, Polo, Ibiza, Fabia
2=C: Golf, Focus, Civic, Corolla, Leon, Octavia, Astra
3=D: BMW 3, Audi A4, Mercedes C, Passat, Mondeo, Camry
4=E: BMW 5, Audi A6, Mercedes E, Volvo S90
5=F: BMW 7, Audi A8, Mercedes S, Porsche Panamera, Lexus LS`,
        input: [
          {
            role: "user",
            content: llmQuery,
          },
        ],
        tools: llmTools,
        tool_choice: { type: "function", name: "fill_car_data" },
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

    const llmData = JSON.parse(functionCall.arguments);

    // If we scraped Otomoto, merge scraped values (they override LLM estimates)
    if (scrapedData) {
      return NextResponse.json({
        ...llmData,
        price: scrapedData.price,
        year: scrapedData.year,
        mileage: scrapedData.mileage,
      });
    }

    return NextResponse.json(llmData);
  } catch {
    return NextResponse.json(
      { error: "Błąd przetwarzania" },
      { status: 500 },
    );
  }
}
