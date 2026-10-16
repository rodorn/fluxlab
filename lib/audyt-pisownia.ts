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
  // zwroty łacińskie z tekstów prawnych i finansowych
  "minimis", "facto", "iure", "jure", "lege", "artis", "vacatio", "legis", "bona", "fide",
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
  rdzenie: string[] = [],
): Promise<{
  nieznane: Map<string, { en: boolean; podpowiedzi: string[] }>;
  rdzenieEn: Set<string>;
} | null> {
  const sekret = process.env.RUCH_SEKRET;
  if (!slowa.length) return { nieznane: new Map(), rdzenieEn: new Set() };
  if (!sekret) return null;
  try {
    const odp = await fetch(adresKolektora(), {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Sekret": sekret },
      body: JSON.stringify({ slowa: slowa.slice(0, MAX_SLOW), rdzenie: rdzenie.slice(0, MAX_SLOW) }),
      signal: AbortSignal.timeout(limitMs),
    });
    if (!odp.ok) return null;
    const j = (await odp.json()) as {
      nieznane?: Record<string, { en: boolean; podpowiedzi: string[] }>;
      rdzenieEn?: string[];
    };
    return {
      nieznane: new Map(Object.entries(j.nieznane ?? {})),
      rdzenieEn: new Set(j.rdzenieEn ?? []),
    };
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

const KONCOWKI = [
  "owania", "owanie", "owaniu", "owaniem", "ować", "owy", "owe", "owych", "owej", "owego",
  "owi", "ach", "ami", "ów", "em", "om", "ie", "u", "a", "y", "i", "e",
];

/** Rdzenie słowa po odcięciu polskiej końcówki, co najmniej 4 litery. */
function rdzenieSlowa(w: string): string[] {
  return KONCOWKI.filter((k) => w.endsWith(k) && w.length - k.length >= 4).map((k) =>
    w.slice(0, -k.length),
  );
}

const SKROTY = new Set(["późn", "zm", "ust", "pkt", "art", "poz", "tj", "tzw", "np", "m.in", "nast", "wg", "ok", "godz", "tel", "ul", "zob", "por", "dz", "dot"]);

/**
 * Jedno przejście po tekście całej witryny: słowa zapisane gdzieś z wielką
 * literą (KSeF, Enova, czyli nazwy) i krótkie słowa, po których stoi kropka
 * i mała litera albo cyfra (skróty: „późn. zm.”, „ust. 2”).
 */
function indeksWitryny(tekst: string): { wielkie: Set<string>; skroty: Set<string> } {
  const wielkie = new Set<string>();
  const skroty = new Set<string>();
  for (const m of tekst.matchAll(/(?<![\p{L}])(\p{L}+)(\.\s*[\p{Ll}\d])?/gu)) {
    const w = m[1];
    const maly = w.toLowerCase();
    if (w !== maly) wielkie.add(maly);
    if (m[2] && w.length <= 5) skroty.add(maly);
  }
  return { wielkie, skroty };
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
  const indeks = indeksWitryny(strony.map((s) => s.tekst).join("\n"));
  const kandydaci = [...gdzie]
    .filter(
      ([w, a]) =>
        a.length < 3 && !SKROTY.has(w) && !indeks.skroty.has(w) && !indeks.wielkie.has(w),
    )
    .map(([w]) => w)
    .sort()
    .slice(0, MAX_SLOW);
  // Rdzenie bez polskiej końcówki idą w tym samym zapytaniu: „dashboardów”
  // to „dashboard” z polską odmianą, a nie literówka.
  const rdzenie = new Map(kandydaci.map((w) => [w, rdzenieSlowa(w)]));
  const odpowiedz = await sprawdzSlowa(kandydaci, limitMs, [
    ...new Set([...rdzenie.values()].flat()),
  ]);
  if (!odpowiedz) return null;
  const wynik = odpowiedz.nieznane;
  const literowki: Literowka[] = [];
  for (const slowo of kandydaci.sort((a, b) => a.localeCompare(b, "pl"))) {
    const info = wynik.get(slowo);
    if (!info) continue;
    if (info.en || MARKI.has(slowo) || (domena && domena.includes(slowo))) continue;
    if ((rdzenie.get(slowo) ?? []).some((r) => odpowiedz.rdzenieEn.has(r))) continue;
    // Podpowiedź ze spacją albo łącznikiem („face book”) to rozbicie nazwy,
    // a nie poprawka literówki.
    const podpowiedz = info.podpowiedzi.find(
      (p) => /^\p{Ll}+$/u.test(p) && odleglosc(slowo, p) === 1,
    );
    if (!podpowiedz) continue;
    for (const adres of gdzie.get(slowo) ?? []) {
      const tekst = strony.find((s) => s.adres === adres)?.tekst ?? "";
      const cytat = zdanie(tekst, slowo);
      // Kod HTML, który przedostał się do tekstu (np. „<a href=”), to nie
      // literówka w treści.
      if (/[<>=&]/.test(cytat)) continue;
      literowki.push({ adres, slowo, podpowiedz, cytat });
    }
  }
  return literowki;
}
