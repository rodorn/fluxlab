const MODEL = "gpt-5.4-mini";

/** Jedno wywołanie Responses API z wymuszonym schematem JSON. Zwraca obiekt albo rzuca. */
export async function openaiJson<T>(opts: {
  instrukcja: string;
  wejscie: unknown;
  nazwa: string;
  schemat: Record<string, unknown>;
  maxTokenow?: number;
  timeoutMs?: number;
}): Promise<T> {
  const klucz = process.env.OPENAI_API_KEY;
  if (!klucz) throw new Error("Brak klucza OpenAI");
  const r = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${klucz}` },
    signal: AbortSignal.timeout(opts.timeoutMs ?? 90_000),
    body: JSON.stringify({
      model: MODEL,
      max_output_tokens: opts.maxTokenow ?? 6000,
      instructions: opts.instrukcja,
      input: opts.wejscie,
      text: { format: { type: "json_schema", name: opts.nazwa, strict: true, schema: opts.schemat } },
    }),
  });
  if (!r.ok) throw new Error(`OpenAI ${r.status}: ${(await r.text()).slice(0, 300)}`);
  const j = await r.json();
  const tekst: string | undefined = j.output
    ?.flatMap((o: { content?: { type: string; text?: string }[] }) => o.content ?? [])
    .find((c: { type: string }) => c.type === "output_text")?.text;
  if (!tekst) throw new Error("Pusta odpowiedź modelu");
  return JSON.parse(tekst) as T;
}
