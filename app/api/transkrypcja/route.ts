import { NextResponse } from "next/server";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const MAX_BYTES = 4 * 1024 * 1024;
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

function originDozwolony(origin: string): boolean {
  return (
    origin === "https://fluxlab.pl" ||
    origin === "https://www.fluxlab.pl" ||
    /^http:\/\/localhost(:\d+)?$/.test(origin)
  );
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  if (origin && !originDozwolony(origin)) {
    return NextResponse.json(
      { error: "Niedozwolone źródło żądania." },
      { status: 403 },
    );
  }
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
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

  let plik: File;
  try {
    const form = await req.formData();
    const f = form.get("audio");
    if (!(f instanceof File) || f.size === 0) throw new Error("brak");
    plik = f;
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe dane" }, { status: 400 });
  }
  if (plik.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Nagranie jest za duże (limit 4 MB)." },
      { status: 413 },
    );
  }

  try {
    const out = new FormData();
    out.append("file", plik, plik.name || "brief.webm");
    out.append("model", "gpt-4o-mini-transcribe");
    out.append("language", "pl");
    const r = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      signal: AbortSignal.timeout(30_000),
      headers: { Authorization: `Bearer ${apiKey}` },
      body: out,
    });
    if (!r.ok) {
      console.error("OpenAI transcription error:", await r.text());
      return NextResponse.json(
        { error: "Nie udało się przepisać nagrania, spróbuj ponownie." },
        { status: 502 },
      );
    }
    const json = (await r.json()) as { text?: string };
    return NextResponse.json({ tekst: (json.text ?? "").trim() });
  } catch {
    return NextResponse.json({ error: "Błąd przetwarzania" }, { status: 500 });
  }
}
