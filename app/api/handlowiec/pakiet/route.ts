import { NextResponse } from "next/server";
import { originDozwolony, utworzLimit } from "@/lib/limit-ip";
import { USLUGI_HANDLOWCA } from "@/lib/uslugiHandlowca";

/** Wirtualny handlowiec, etap 2: z profilu firmy i odpowiedzi klienta
 *  dobiera usługi z katalogu i uzasadnia każdą jednym zdaniem. */

export const maxDuration = 60;

const limit = utworzLimit();

const SCHEMAT = {
  type: "object",
  additionalProperties: false,
  required: ["wstep", "pakiet"],
  properties: {
    wstep: {
      type: "string",
      description:
        "Jedno zdanie do klienta: co najbardziej mu pomoże i dlaczego",
    },
    pakiet: {
      type: "array",
      description: "2-4 usługi z katalogu, od najważniejszej",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "powod"],
        properties: {
          id: { type: "string", enum: USLUGI_HANDLOWCA.map((u) => u.id) },
          powod: {
            type: "string",
            description:
              "Jedno zdanie oparte na konkretnym fakcie z profilu albo odpowiedzi",
          },
        },
      },
    },
  },
};

const INSTRUKCJE = `Jesteś handlowcem FluxLab. Na podstawie profilu firmy i odpowiedzi klienta dobierz 2-4 usługi z katalogu, od najważniejszej.
Najwyżej jedna strona jednorazowa (landing, firmowa albo sklep), i tylko gdy strona jest słaba albo jej brak. Nie proponuj usług, których fakty nie uzasadniają.
Każdy powód oprzyj na fakcie. Pisz po polsku do jednej osoby na "ty" w liczbie pojedynczej (masz, Twoja, Ci), nigdy "wy", "wam", "macie". O FluxLab "my". Krótko, bez długich myślników i emoji.
Katalog:
${USLUGI_HANDLOWCA.map((u) => `- ${u.id}: ${u.nazwa} (${u.cena}). ${u.kiedy}`).join("\n")}`;

export async function POST(req: Request) {
  if (!originDozwolony(req.headers.get("origin"))) {
    return NextResponse.json(
      { error: "Niedozwolone źródło żądania." },
      { status: 403 },
    );
  }
  const klucz = process.env.OPENAI_API_KEY;
  if (!klucz)
    return NextResponse.json({ error: "Brak klucza API" }, { status: 500 });
  if (limit(req)) {
    return NextResponse.json(
      { error: "Za dużo prób naraz, odczekaj chwilę." },
      { status: 429 },
    );
  }

  let material = "";
  try {
    const body = await req.json();
    material = JSON.stringify({
      profil: body.profil ?? null,
      strona: body.strona ?? null,
      odpowiedzi: body.odpowiedzi ?? {},
    }).slice(0, 8000);
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe dane" }, { status: 400 });
  }

  try {
    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      signal: AbortSignal.timeout(45_000),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${klucz}`,
      },
      body: JSON.stringify({
        model: "gpt-5.4-mini",
        instructions: INSTRUKCJE,
        input: material,
        max_output_tokens: 1500,
        text: {
          format: {
            type: "json_schema",
            name: "pakiet",
            strict: true,
            schema: SCHEMAT,
          },
        },
      }),
    });
    if (!r.ok) {
      console.error(
        "handlowiec pakiet",
        r.status,
        (await r.text()).slice(0, 500),
      );
      throw new Error("openai");
    }
    const json = await r.json();
    const tekst: string = (json.output ?? [])
      .filter((o: { type: string }) => o.type === "message")
      .flatMap(
        (o: { content?: { type: string; text?: string }[] }) => o.content ?? [],
      )
      .filter((c: { type: string }) => c.type === "output_text")
      .map((c: { text?: string }) => c.text ?? "")
      .join("");
    return NextResponse.json(JSON.parse(tekst));
  } catch {
    return NextResponse.json(
      { error: "Nie udało się dobrać pakietu. Spróbuj jeszcze raz." },
      { status: 502 },
    );
  }
}
