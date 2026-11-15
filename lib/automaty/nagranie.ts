import { sprawdzAdres, BladAdresu } from "@/lib/bezpieczny-fetch";

export const MAX_BAJTOW = 25 * 1024 * 1024;
export const LIMIT_MINUT = 600;
const ROZSZERZENIA = [
  "flac",
  "m4a",
  "mp3",
  "mp4",
  "mpeg",
  "mpga",
  "oga",
  "ogg",
  "wav",
  "webm",
];
const TYPY: Record<string, string> = {
  "audio/mpeg": "mp3",
  "audio/mp3": "mp3",
  "audio/mp4": "m4a",
  "audio/x-m4a": "m4a",
  "audio/m4a": "m4a",
  "audio/wav": "wav",
  "audio/x-wav": "wav",
  "audio/ogg": "ogg",
  "audio/webm": "webm",
  "audio/flac": "flac",
  "video/mp4": "mp4",
  "video/webm": "webm",
};

/** Linki do udostępnionych plików z Dropboxa i Dysku Google zamieniamy na bezpośrednie pobranie. */
export function bezposredniLink(surowy: string): string {
  const s = surowy.trim();
  try {
    const u = new URL(s);
    if (/(^|\.)dropbox\.com$/.test(u.hostname)) {
      u.searchParams.delete("dl");
      u.searchParams.set("dl", "1");
      return u.toString();
    }
    if (u.hostname === "drive.google.com") {
      const m = u.pathname.match(/\/file\/d\/([\w-]+)/) ?? null;
      const id = m?.[1] ?? u.searchParams.get("id");
      if (id) return `https://drive.google.com/uc?export=download&id=${id}`;
    }
  } catch {}
  return s;
}

export async function pobierzNagranie(
  surowy: string,
): Promise<{ bajty: Buffer; nazwa: string }> {
  let url = await sprawdzAdres(bezposredniLink(surowy));
  for (let i = 0; i <= 3; i++) {
    let res: Response;
    try {
      res = await fetch(url, {
        redirect: "manual",
        signal: AbortSignal.timeout(120_000),
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; FluxlabNagrania/1.0; +https://fluxlab.pl)",
        },
      });
    } catch {
      throw new BladAdresu("Nie udało się pobrać nagrania z tego linku.");
    }
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location");
      await res.body?.cancel();
      if (!loc)
        throw new BladAdresu("Nie udało się pobrać nagrania z tego linku.");
      url = await sprawdzAdres(new URL(loc, url).toString());
      continue;
    }
    if (!res.ok) {
      await res.body?.cancel();
      throw new BladAdresu(
        `Link zwrócił błąd ${res.status}. Sprawdź, czy plik jest udostępniony każdemu, kto ma link.`,
      );
    }
    const typ = (res.headers.get("content-type") ?? "")
      .split(";")[0]
      .trim()
      .toLowerCase();
    if (/html|json|xml|text/.test(typ)) {
      await res.body?.cancel();
      throw new BladAdresu(
        "Pod tym linkiem jest strona, a nie plik z nagraniem. Potrzebny jest link do samego pliku.",
      );
    }
    const dlugosc = Number(res.headers.get("content-length") ?? 0);
    if (dlugosc > MAX_BAJTOW) {
      await res.body?.cancel();
      throw new BladAdresu("Plik jest większy niż 25 MB.");
    }
    const reader = res.body?.getReader();
    if (!reader) throw new BladAdresu("Pusta odpowiedź.");
    const kawalki: Uint8Array[] = [];
    let razem = 0;
    try {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        razem += value.length;
        if (razem > MAX_BAJTOW)
          throw new BladAdresu("Plik jest większy niż 25 MB.");
        kawalki.push(value);
      }
    } catch (e) {
      reader.cancel().catch(() => {});
      if (e instanceof BladAdresu) throw e;
      throw new BladAdresu("Pobieranie nagrania zostało przerwane.");
    }
    const z = url.pathname.split(".").pop()?.toLowerCase() ?? "";
    const rozszerzenie = ROZSZERZENIA.includes(z) ? z : (TYPY[typ] ?? "");
    if (!rozszerzenie)
      throw new BladAdresu(
        "Nieobsługiwany format. Wyślij plik mp3, m4a, wav, ogg, flac, webm lub mp4.",
      );
    return { bajty: Buffer.concat(kawalki), nazwa: `nagranie.${rozszerzenie}` };
  }
  throw new BladAdresu("Za dużo przekierowań.");
}

function klucz() {
  const k = process.env.OPENAI_API_KEY;
  if (!k) throw new Error("brak klucza OpenAI");
  return k;
}

export async function transkrybuj(
  bajty: Buffer,
  nazwa: string,
): Promise<{ tekst: string; minuty: number }> {
  const f = new FormData();
  f.set("file", new Blob([new Uint8Array(bajty)]), nazwa);
  f.set("model", "whisper-1");
  f.set("response_format", "verbose_json");
  const r = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${klucz()}` },
    body: f,
    signal: AbortSignal.timeout(200_000),
  });
  if (r.status === 400)
    throw new BladAdresu("Nie udało się odczytać pliku jako nagrania.");
  if (!r.ok) throw new Error(`OpenAI ${r.status}`);
  const j = await r.json();
  const tekst = String(j.text ?? "").trim();
  if (!tekst) throw new BladAdresu("W nagraniu nie rozpoznano mowy.");
  return { tekst, minuty: Math.ceil(Number(j.duration ?? 0) / 60) };
}

async function odpowiedz(
  instrukcja: string,
  wejscie: string,
  narzedzie?: unknown,
) {
  const r = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${klucz()}`,
    },
    body: JSON.stringify({
      model: "gpt-5.4-mini",
      max_output_tokens: 3000,
      instructions: instrukcja,
      input: [{ role: "user", content: wejscie.slice(0, 120_000) }],
      ...(narzedzie
        ? {
            tools: [narzedzie],
            tool_choice: {
              type: "function",
              name: (narzedzie as { name: string }).name,
            },
          }
        : {}),
    }),
    signal: AbortSignal.timeout(90_000),
  });
  if (!r.ok) throw new Error(`OpenAI ${r.status}`);
  return r.json();
}

const ZASADY = `Piszesz po polsku, prostym językiem, bez ozdobników. Opierasz się wyłącznie na transkrypcji. Niczego nie dopowiadasz: gdy czegoś nie ma w nagraniu, pomijasz to albo piszesz „nie podano”.`;

export async function streszczenie(tekst: string): Promise<string> {
  const j = await odpowiedz(
    `${ZASADY}\nNapisz streszczenie nagrania: jedno zdanie o czym jest, potem 5 do 8 punktów z najważniejszymi informacjami (każdy w osobnej linii, zaczęty od „- ”). Bez nagłówków i bez formatowania markdown.`,
    tekst,
  );
  const t = j.output
    ?.flatMap((o: { content?: { text?: string }[] }) => o.content ?? [])
    .map((c: { text?: string }) => c.text ?? "")
    .join("")
    .trim();
  if (!t) throw new Error("puste streszczenie");
  return t;
}

export type Protokol = {
  podsumowanie: string;
  decyzje: string[];
  zadania: { osoba: string; zadanie: string; termin: string }[];
  mail: string;
};

const NARZEDZIE_PROTOKOL = {
  type: "function",
  name: "zapisz_protokol",
  description: "Zapisuje protokół ze spotkania.",
  parameters: {
    type: "object",
    additionalProperties: false,
    required: ["podsumowanie", "decyzje", "zadania", "mail"],
    properties: {
      podsumowanie: {
        type: "string",
        description: "2 do 4 zdań o tym, czego dotyczyło spotkanie.",
      },
      decyzje: {
        type: "array",
        items: { type: "string" },
        description: "Podjęte decyzje, jedna na pozycję.",
      },
      zadania: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["osoba", "zadanie", "termin"],
          properties: {
            osoba: {
              type: "string",
              description: "Kto ma to zrobić, albo „nie podano”.",
            },
            zadanie: { type: "string" },
            termin: {
              type: "string",
              description: "Termin z nagrania, albo „nie podano”.",
            },
          },
        },
      },
      mail: {
        type: "string",
        description:
          "Gotowa wiadomość do uczestników: podziękowanie, krótkie podsumowanie, decyzje i lista zadań. Zwykły tekst, bez markdown.",
      },
    },
  },
  strict: true,
};

export async function protokol(tekst: string): Promise<Protokol> {
  const j = await odpowiedz(
    `${ZASADY}\nZrób protokół ze spotkania: podsumowanie, decyzje, zadania z osobą i terminem oraz gotowy mail do uczestników. Wywołaj zapisz_protokol.`,
    tekst,
    NARZEDZIE_PROTOKOL,
  );
  const call = j.output?.find(
    (x: { type: string }) => x.type === "function_call",
  );
  const p = JSON.parse(call?.arguments ?? "{}");
  if (
    typeof p.podsumowanie !== "string" ||
    !Array.isArray(p.zadania) ||
    !Array.isArray(p.decyzje) ||
    typeof p.mail !== "string"
  )
    throw new Error("zły format protokołu");
  return p as Protokol;
}
