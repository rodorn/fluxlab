import { NextResponse } from "next/server";
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
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

const UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";
const NASZ_ADRES = "https://fluxlab.pl/";

type Pomiar = { ttfb: number; calosc: number; kb: number; adres: string };

class BladPomiaru extends Error {}

function prywatnyIp(ip: string): boolean {
  if (ip.includes(":")) {
    const l = ip.toLowerCase();
    if (l.startsWith("::ffff:")) return prywatnyIp(l.slice(7));
    return (
      l === "::" ||
      l === "::1" ||
      l.startsWith("fc") ||
      l.startsWith("fd") ||
      l.startsWith("fe8") ||
      l.startsWith("fe9") ||
      l.startsWith("fea") ||
      l.startsWith("feb")
    );
  }
  const [a, b] = ip.split(".").map(Number);
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    a >= 224
  );
}

async function sprawdzHost(url: URL): Promise<void> {
  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (isIP(host)) throw new BladPomiaru("Podaj adres z nazwą domeny, nie numer IP.");
  if (
    host === "localhost" ||
    !host.includes(".") ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    host.endsWith(".localhost")
  ) {
    throw new BladPomiaru("Ten adres nie jest publiczną stroną.");
  }
  let adresy;
  try {
    adresy = await lookup(host, { all: true });
  } catch {
    throw new BladPomiaru("Nie znaleźliśmy takiej domeny. Sprawdź adres.");
  }
  if (adresy.length === 0 || adresy.some((a) => prywatnyIp(a.address))) {
    throw new BladPomiaru("Ten adres nie jest publiczną stroną.");
  }
}

function normalizuj(wejscie: unknown): URL {
  if (typeof wejscie !== "string") throw new BladPomiaru("Wpisz adres swojej strony.");
  let s = wejscie.trim();
  if (!s) throw new BladPomiaru("Wpisz adres swojej strony.");
  if (s.length > 200) throw new BladPomiaru("Adres jest za długi (maks. 200 znaków).");
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(s)) s = `https://${s}`;
  let url: URL;
  try {
    url = new URL(s);
  } catch {
    throw new BladPomiaru("Ten adres wygląda na niepoprawny.");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new BladPomiaru("Obsługujemy tylko adresy http i https.");
  }
  if (url.username || url.password) throw new BladPomiaru("Podaj sam adres strony.");
  return url;
}

async function jedenPomiar(start: URL, sprawdzaj: boolean): Promise<Pomiar> {
  const sygnal = AbortSignal.timeout(10_000);
  let url = start;
  const t0 = performance.now();
  for (let i = 0; i < 6; i++) {
    if (sprawdzaj) await sprawdzHost(url);
    let res: Response;
    try {
      res = await fetch(url, {
        redirect: "manual",
        signal: sygnal,
        cache: "no-store",
        headers: {
          "User-Agent": UA,
          Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "pl-PL,pl;q=0.9,en;q=0.8",
          "Accept-Encoding": "gzip, br",
        },
      });
    } catch (e) {
      if (e instanceof BladPomiaru) throw e;
      const timeout = sygnal.aborted;
      throw new BladPomiaru(
        timeout
          ? "Twoja strona nie odpowiedziała w 10 sekund, więc nie mamy z czym porównać."
          : "Nie udało się połączyć z tą stroną.",
      );
    }
    if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
      await res.body?.cancel().catch(() => {});
      try {
        url = new URL(res.headers.get("location")!, url);
      } catch {
        throw new BladPomiaru("Strona przekierowuje w nieprawidłowe miejsce.");
      }
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        throw new BladPomiaru("Strona przekierowuje w nieobsługiwane miejsce.");
      }
      continue;
    }
    const ttfb = performance.now() - t0;
    if (res.status >= 400) {
      await res.body?.cancel().catch(() => {});
      throw new BladPomiaru(
        res.status === 403 || res.status === 401 || res.status === 429
          ? "Twoja strona blokuje automatyczne pomiary (kod " + res.status + "), więc nie podamy wyniku."
          : `Twoja strona zwróciła błąd ${res.status}, więc nie podamy wyniku.`,
      );
    }
    let bajty = 0;
    try {
      const reader = res.body?.getReader();
      if (reader) {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          bajty += value.byteLength;
          if (bajty > 15_000_000) {
            await reader.cancel();
            break;
          }
        }
      }
    } catch {
      throw new BladPomiaru("Pobieranie strony urwało się w trakcie, spróbuj ponownie.");
    }
    const calosc = performance.now() - t0;
    return {
      ttfb: Math.round(ttfb),
      calosc: Math.round(calosc),
      kb: Math.round((bajty / 1024) * 10) / 10,
      adres: url.toString(),
    };
  }
  throw new BladPomiaru("Strona przekierowuje w kółko.");
}

function lepszy(a: Pomiar, b: Pomiar): Pomiar {
  return b.calosc < a.calosc ? b : a;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Za dużo zapytań, odczekaj minutę." },
      { status: 429 },
    );
  }

  let adres: unknown;
  try {
    adres = (await req.json())?.adres;
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe zapytanie." }, { status: 400 });
  }

  try {
    const klientUrl = normalizuj(adres);
    await sprawdzHost(klientUrl);
    const nasz = new URL(NASZ_ADRES);

    const k1 = await jedenPomiar(klientUrl, true);
    const f1 = await jedenPomiar(nasz, false).catch(() => null);
    const k2 = await jedenPomiar(klientUrl, true).catch(() => null);
    const f2 = await jedenPomiar(nasz, false).catch(() => null);

    const f = f1 && f2 ? lepszy(f1, f2) : f1 ?? f2;
    if (!f) {
      return NextResponse.json(
        { error: "Nie udało się teraz zmierzyć fluxlab.pl. Spróbuj za chwilę." },
        { status: 502 },
      );
    }
    const k = k2 ? lepszy(k1, k2) : k1;
    return NextResponse.json({ klient: k, fluxlab: f });
  } catch (e) {
    if (e instanceof BladPomiaru) {
      return NextResponse.json({ error: e.message }, { status: 422 });
    }
    return NextResponse.json({ error: "Pomiar się nie udał." }, { status: 500 });
  }
}
