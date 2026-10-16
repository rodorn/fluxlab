/**
 * Literówki na stronach po polsku.
 *
 * Na Vercelu nie ma hunspella, więc słowa sprawdza nasz kolektor na VPS
 * (POST /pisownia, ten sam słownik pl_PL co scripts/jakosc.mjs, do tego
 * en_US). Zgłaszamy słowo dopiero wtedy, gdy wygląda na pomyłkę, a nie na
 * nazwę albo termin: małe litery, co najmniej 4 znaki, bez cyfr, nieznane po
 * polsku i po angielsku, rzadkie na stronie i oddalone o jedną literę od
 * słowa ze słownika. Gdy kolektor nie odpowie, kontrola milczy.
 */

export type Literowka = {
  adres: string;
  slowo: string;
  podpowiedz: string;
  cytat: string;
};

const MAX_SLOW = 5000;

/** Nazwy serwisów, które strony piszą małą literą w stopce. */
const MARKI = new Set([
  "facebook", "instagram", "youtube", "linkedin", "tiktok", "twitter", "pinterest",
  "whatsapp", "messenger", "google", "allegro", "inpost", "paczkomat", "blik",
  "przelewy", "payu", "tpay", "paypal", "olx", "otomoto", "booking", "spotify",
  "telegram", "signal", "threads", "snapchat", "vimeo", "wordpress", "shopify",
]);

/** Odległość Damerau-Levenshteina (wariant z jedną zamianą sąsiednich liter). */
export function odleglosc(a: string, b: string): number {
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [
    i,
    ...Array(b.length).fill(0),
  ]);
  for (let j = 0; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++) {
      const k = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + k);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1])
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  return d[a.length][b.length];
}

/** Słowa-kandydaci z tekstu: same małe litery, od 4 znaków, bez cyfr. */
export function slowaDoSprawdzenia(tekst: string): Set<string> {
  const wynik = new Set<string>();
  for (const m of tekst.matchAll(
    /(?<![\p{L}\d@./_-])(\p{Ll}{4,})(?![\p{L}\d@_-]|\.\p{L})/gu,
  ))
    wynik.add(m[1]);
  return wynik;
}

function adresKolektora(): string {
  return (process.env.RUCH_URL ?? "http://146.59.80.185:8087/wizyta").replace(
    /\/wizyta$/,
    "/pisownia",
  );
}

/** Zapytanie do kolektora. Null, gdy nie odpowiedział: wtedy nie wydajemy werdyktu. */
export async function sprawdzSlowa(
  slowa: string[],
  limitMs = 15_000,
): Promise<Map<string, { en: boolean; podpowiedzi: string[] }> | null> {
  const sekret = process.env.RUCH_SEKRET;
  if (!sekret || !slowa.length) return slowa.length ? null : new Map();
  try {
    const odp = await fetch(adresKolektora(), {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Sekret": sekret },
      body: JSON.stringify({ slowa: slowa.slice(0, MAX_SLOW) }),
      signal: AbortSignal.timeout(limitMs),
    });
    if (!odp.ok) return null;
    const j = (await odp.json()) as {
      nieznane?: Record<string, { en: boolean; podpowiedzi: string[] }>;
    };
    return new Map(Object.entries(j.nieznane ?? {}));
  } catch {
    return null;
  }
}

/** Zdanie (najwyżej ok. 150 znaków) z danym słowem. */
function zdanie(tekst: string, slowo: string): string {
  const m = new RegExp(`(?<![\\p{L}])${slowo}(?![\\p{L}])`, "u").exec(tekst);
  if (!m) return "";
  const i = m.index;
  let start = Math.max(0, i - 70);
  let koniec = Math.min(tekst.length, i + slowo.length + 70);
  const kropka = tekst.slice(start, i).search(/[.!?]\s[^.!?]*$/);
  if (kropka >= 0) start += kropka + 2;
  const dalej = tekst.slice(i, koniec).search(/[.!?](\s|$)/);
  if (dalej >= 0) koniec = i + dalej + 1;
  return tekst.slice(start, koniec).trim();
}

/**
 * Literówki na stronach po polsku. `strony` to tekst każdej podstrony. Słowo
 * występujące na 3 i więcej podstronach uznajemy za celowe (nazwa, termin).
 * Null, gdy kolektor nie odpowiedział.
 */
export async function znajdzLiterowki(
  strony: { adres: string; tekst: string }[],
  domena = "",
  limitMs = 15_000,
): Promise<Literowka[] | null> {
  const gdzie = new Map<string, string[]>();
  for (const s of strony)
    for (const w of slowaDoSprawdzenia(s.tekst)) {
      if (!gdzie.has(w)) gdzie.set(w, []);
      gdzie.get(w)!.push(s.adres);
    }
  const kandydaci = [...gdzie]
    .filter(([, a]) => a.length < 3)
    .map(([w]) => w)
    .sort();
  const wynik = await sprawdzSlowa(kandydaci.slice(0, MAX_SLOW), limitMs);
  if (!wynik) return null;
  const literowki: Literowka[] = [];
  for (const [slowo, info] of [...wynik].sort((a, b) =>
    a[0].localeCompare(b[0], "pl"),
  )) {
    if (info.en || MARKI.has(slowo) || (domena && domena.includes(slowo))) continue;
    // Podpowiedź ze spacją albo łącznikiem („face book”) to rozbicie nazwy,
    // a nie poprawka literówki.
    const podpowiedz = info.podpowiedzi.find(
      (p) => /^\p{Ll}+$/u.test(p) && odleglosc(slowo, p) === 1,
    );
    if (!podpowiedz) continue;
    for (const adres of gdzie.get(slowo) ?? []) {
      const tekst = strony.find((s) => s.adres === adres)?.tekst ?? "";
      literowki.push({ adres, slowo, podpowiedz, cytat: zdanie(tekst, slowo) });
    }
  }
  return literowki;
}
