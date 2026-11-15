import { createHash } from "node:crypto";

import { BladAdresu, pobierzStrone } from "@/lib/bezpieczny-fetch";

export type Wpis = { tytul: string; url: string; tresc: string };

const KANDYDACI = ["/feed", "/rss", "/feed.xml", "/rss.xml", "/atom.xml", "/index.xml", "/blog/feed"];

export const skrot = (url: string) =>
  createHash("sha1").update(url).digest("hex").slice(0, 8);

const dekoduj = (s: string) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");

export const bezZnacznikow = (html: string) =>
  dekoduj(
    html
      .replace(/<(script|style|nav|header|footer|aside|form)[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();

function pole(blok: string, nazwa: string) {
  const m = blok.match(new RegExp(`<${nazwa}(?:\\s[^>]*)?>([\\s\\S]*?)</${nazwa}>`, "i"));
  return m ? dekoduj(m[1]).trim() : "";
}

/** Wpisy z kanału RSS lub Atom, najnowsze pierwsze. */
export function wpisyZKanalu(xml: string, baza: URL): Wpis[] {
  const bloki = xml.match(/<(item|entry)[\s>][\s\S]*?<\/\1>/gi) ?? [];
  const wynik: Wpis[] = [];
  for (const b of bloki) {
    const tytul = bezZnacznikow(pole(b, "title"));
    let url = pole(b, "link");
    if (!url || /^\s*</.test(url)) {
      url =
        b.match(/<link[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)/i)?.[1] ??
        b.match(/<link[^>]*href=["']([^"']+)/i)?.[1] ??
        "";
    }
    if (!tytul || !url) continue;
    try {
      url = new URL(dekoduj(url), baza).toString();
    } catch {
      continue;
    }
    const tresc = bezZnacznikow(
      pole(b, "content:encoded") || pole(b, "content") || pole(b, "description") || pole(b, "summary"),
    );
    wynik.push({ tytul, url, tresc });
  }
  return wynik;
}

const jestKanalem = (t: string) => /<(rss|feed|rdf:RDF)[\s>]/i.test(t);

/** Znajduje adres kanału dla strony bloga i zwraca go z wpisami. */
export async function znajdzKanal(surowy: string): Promise<{ feed: string; wpisy: Wpis[] }> {
  const proba = async (adres: string) => {
    const { url, html } = await pobierzStrone(adres);
    return jestKanalem(html) ? { url, html } : { url, html, brak: true as const };
  };
  const start = await proba(surowy);
  if (!("brak" in start)) {
    return { feed: start.url.toString(), wpisy: wpisyZKanalu(start.html, start.url) };
  }
  const kandydaci: string[] = [];
  for (const m of start.html.matchAll(/<link[^>]+>/gi)) {
    const t = m[0];
    if (/rel=["']alternate["']/i.test(t) && /(rss|atom)\+xml/i.test(t)) {
      const h = t.match(/href=["']([^"']+)/i)?.[1];
      if (h) kandydaci.push(new URL(dekoduj(h), start.url).toString());
    }
  }
  for (const k of KANDYDACI) kandydaci.push(new URL(k, start.url.origin).toString());
  for (const k of kandydaci) {
    try {
      const p = await proba(k);
      if ("brak" in p) continue;
      const wpisy = wpisyZKanalu(p.html, p.url);
      if (wpisy.length) return { feed: p.url.toString(), wpisy };
    } catch (e) {
      if (!(e instanceof BladAdresu)) throw e;
    }
  }
  throw new BladAdresu("Nie znaleźliśmy kanału RSS ani Atom tej strony.");
}

/** Tekst artykułu: treść z kanału, a gdy krótka, ze strony wpisu. */
export async function trescWpisu(w: Wpis): Promise<string> {
  if (w.tresc.length >= 800) return w.tresc.slice(0, 9000);
  try {
    const { html } = await pobierzStrone(w.url);
    const art =
      html.match(/<article[\s\S]*?<\/article>/i)?.[0] ??
      html.match(/<main[\s\S]*?<\/main>/i)?.[0] ??
      html;
    const t = bezZnacznikow(art);
    return (t.length > w.tresc.length ? t : w.tresc).slice(0, 9000);
  } catch {
    return w.tresc;
  }
}

const NARZEDZIE = [
  {
    type: "function",
    name: "zapisz_posty",
    description: "Zwróć trzy szkice postów do mediów społecznościowych.",
    parameters: {
      type: "object",
      properties: {
        posty: {
          type: "array",
          minItems: 3,
          maxItems: 3,
          items: {
            type: "object",
            properties: { siec: { type: "string", enum: ["LinkedIn", "Facebook"] }, tekst: { type: "string" } },
            required: ["siec", "tekst"],
            additionalProperties: false,
          },
        },
      },
      required: ["posty"],
      additionalProperties: false,
    },
  },
];

const INSTRUKCJA = `Piszesz szkice postów promujących artykuł z bloga firmy. Zwróć dokładnie 3 szkice: dwa na LinkedIn (każdy z innym punktem wyjścia, do 900 znaków) i jeden na Facebook (krótszy, do 500 znaków, luźniejszy ton).
- Używaj wyłącznie faktów z podanego tekstu, niczego nie dopowiadaj i nie zmyślaj liczb.
- Zacznij od zdania, które zatrzymuje czytelnika, bez clickbaitu.
- Pisz po polsku, bez długich myślników, bez emoji, bez hasztagów w treści; na końcu dopisz maksymalnie 3 hasztagi.
- Nie wstawiaj linku do artykułu, dopiszemy go sami.
Wywołaj zapisz_posty.`;

export type Post = { siec: string; tekst: string };

export async function szkicePostow(tytul: string, tresc: string): Promise<Post[]> {
  const klucz = process.env.OPENAI_API_KEY;
  if (!klucz) throw new Error("brak klucza OpenAI");
  const r = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${klucz}` },
    body: JSON.stringify({
      model: "gpt-5.4-mini",
      max_output_tokens: 1500,
      instructions: INSTRUKCJA,
      input: [{ role: "user", content: `Tytuł: ${tytul}\n\nTekst artykułu:\n${tresc}` }],
      tools: NARZEDZIE,
      tool_choice: { type: "function", name: "zapisz_posty" },
    }),
    signal: AbortSignal.timeout(60_000),
  });
  if (!r.ok) throw new Error(`OpenAI ${r.status}`);
  const j = await r.json();
  const call = j.output?.find((x: { type: string }) => x.type === "function_call");
  const posty = JSON.parse(call?.arguments ?? "{}").posty;
  if (!Array.isArray(posty) || posty.length !== 3) throw new Error("zły format szkiców");
  return posty.map((p: { [k: string]: string }) => ({ siec: p["siec"], tekst: String(p.tekst).trim() }));
}
