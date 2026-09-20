// Ceny energii z API PSE. Dane na kolejna dobe pojawiaja sie po poludniu dnia
// poprzedniego, wiec strona ma sens dopiero od okolo 14:00.
const BAZA = "https://api.raporty.pse.pl/api/rce-pln";

export type Kwadrans = { czas: string; okres: string; cena: number };
export type Okno = { od: string; do: string; srednia: number };

export type Doba = {
  data: string;
  kwadranse: Kwadrans[];
  min: number | null;
  max: number | null;
  srednia: number | null;
  ujemnych: number;
  oknaUjemne: { od: string; do: string }[];
  najtansze4h: Okno | null;
  najdrozsze4h: Okno | null;
};

function nastr(d: Date) {
  return d.toISOString().slice(0, 10);
}

async function pobierz(dzien: string): Promise<Kwadrans[]> {
  // Filtr musi byc zakodowany w calosci, inaczej klient HTTP odrzuca adres
  // jako nieprawidlowy przez spacje i apostrofy.
  const filtr = encodeURIComponent(`business_date eq '${dzien}'`);
  const url = `${BAZA}?%24filter=${filtr}&%24first=500`;
  try {
    const r = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(15000),
      next: { revalidate: 1800 },
    });
    if (!r.ok) return [];
    const j = await r.json();
    return ((j?.value as Record<string, string>[]) || [])
      .filter((x) => x.rce_pln !== null && x.rce_pln !== undefined)
      .map((x) => ({
        czas: String(x.dtime).slice(11, 16),
        okres: String(x.period),
        cena: Number(x.rce_pln),
      }));
  } catch {
    return [];
  }
}

// Najtansze i najdrozsze okno czterogodzinne liczymy po kolejnych kwadransach,
// czyli szesnastu z rzedu, bo tyle trwa cztery godziny.
function okno(k: Kwadrans[], najtansze: boolean): Okno | null {
  const N = 16;
  if (k.length < N) return null;
  let best = -1;
  let bestSuma = najtansze ? Infinity : -Infinity;
  for (let i = 0; i + N <= k.length; i++) {
    const s = k.slice(i, i + N).reduce((a, x) => a + x.cena, 0);
    if (najtansze ? s < bestSuma : s > bestSuma) {
      bestSuma = s;
      best = i;
    }
  }
  if (best < 0) return null;
  return {
    od: k[best].czas,
    do: k[best + N - 1].czas,
    srednia: Math.round(bestSuma / N),
  };
}

function scalUjemne(k: Kwadrans[]) {
  const okna: { od: string; do: string }[] = [];
  let start: string | null = null;
  let poprzedni: string | null = null;
  for (const x of k) {
    if (x.cena < 0) {
      if (start === null) start = x.czas;
      poprzedni = x.czas;
    } else if (start !== null) {
      okna.push({ od: start, do: poprzedni as string });
      start = null;
    }
  }
  if (start !== null) okna.push({ od: start, do: poprzedni as string });
  return okna;
}

export async function doba(przesuniecie = 1): Promise<Doba> {
  const d = new Date();
  d.setDate(d.getDate() + przesuniecie);
  const dzien = nastr(d);
  const k = await pobierz(dzien);
  const ceny = k.map((x) => x.cena);
  return {
    data: dzien,
    kwadranse: k,
    min: ceny.length ? Math.min(...ceny) : null,
    max: ceny.length ? Math.max(...ceny) : null,
    srednia: ceny.length
      ? Math.round(ceny.reduce((a, b) => a + b, 0) / ceny.length)
      : null,
    ujemnych: ceny.filter((c) => c < 0).length,
    oknaUjemne: scalUjemne(k),
    najtansze4h: okno(k, true),
    najdrozsze4h: okno(k, false),
  };
}
