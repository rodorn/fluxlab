/** Wolne terminy Meet z kalendarza Pawła. Zajęte przedziały wysyła co 5 minut
 *  skrypt na jego komputerze (~/Projekty/fluxlab-kalendarz/sync.py) do Global
 *  Config Vercela; tu liczymy z nich wolne pełne godziny 11:00–23:00. */

export const GODZ_OD = 11;
export const GODZ_DO = 23;
const DLUGOSC_MIN = 30;
const ZAPAS_MIN = 15;
const DNI = 8;

type Config = { zajete?: [number, number][]; aktualizacja?: number };

export type DzienTerminow = { data: string; godziny: string[] };

async function pobierzConfig(): Promise<Config | null> {
  const adres = process.env.KALENDARZ_CONFIG;
  if (!adres) return null;
  const [baza, zapytanie] = adres.split("?");
  try {
    const r = await fetch(`${baza}/items?${zapytanie}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    return r.ok ? ((await r.json()) as Config) : null;
  } catch {
    return null;
  }
}

/** Północ dnia `data` (RRRR-MM-DD) plus `godz` w czasie warszawskim, jako epoch ms. */
export function warszawa(data: string, godz: number): number {
  const [r, m, d] = data.split("-").map(Number);
  const utc = Date.UTC(r, m - 1, d, godz);
  const tam = new Date(
    new Date(utc).toLocaleString("en-US", { timeZone: "Europe/Warsaw" }),
  );
  const tu = new Date(
    new Date(utc).toLocaleString("en-US", { timeZone: "UTC" }),
  );
  return utc - (tam.getTime() - tu.getTime());
}

function dataWarszawska(ms: number): string {
  return new Date(ms).toLocaleDateString("sv-SE", {
    timeZone: "Europe/Warsaw",
  });
}

function kolizja(start: number, zajete: [number, number][]) {
  const od = start - ZAPAS_MIN * 60_000;
  const doo = start + (DLUGOSC_MIN + ZAPAS_MIN) * 60_000;
  return zajete.some(([s, k]) => s < doo && k > od);
}

export async function wolneTerminy(): Promise<{
  dni: DzienTerminow[];
  aktualizacja: number | null;
}> {
  const cfg = await pobierzConfig();
  const zajete = cfg?.zajete ?? [];
  const teraz = Date.now();
  const dni: DzienTerminow[] = [];
  // Dni po dacie kalendarzowej, nie po 24 h: przy zmianie czasu doba ma 23 albo 25 h.
  const [r, m, d] = dataWarszawska(teraz).split("-").map(Number);
  for (let i = 1; i <= DNI; i++) {
    const data = new Date(Date.UTC(r, m - 1, d + i)).toISOString().slice(0, 10);
    const godziny: string[] = [];
    for (let g = GODZ_OD; g <= GODZ_DO; g++) {
      if (!kolizja(warszawa(data, g), zajete)) godziny.push(`${g}:00`);
    }
    dni.push({ data, godziny });
  }
  return { dni, aktualizacja: cfg?.aktualizacja ?? null };
}

/** Czy termin „RRRR-MM-DD GG:MM” jest nadal wolny (sprawdzenie przy wysyłce). */
export async function terminWolny(termin: string): Promise<boolean> {
  const m = /^(\d{4}-\d{2}-\d{2}) (\d{2}):00$/.exec(termin);
  if (!m) return false;
  const g = Number(m[2]);
  if (g < GODZ_OD || g > GODZ_DO) return false;
  const start = warszawa(m[1], g);
  if (start < Date.now()) return false;
  const cfg = await pobierzConfig();
  return !kolizja(start, cfg?.zajete ?? []);
}
