/** Wolne terminy Meet z kalendarza Pawła. Zajęte przedziały wysyła co 5 minut
 *  skrypt na jego komputerze (~/Projekty/fluxlab-kalendarz/sync.py) do Global
 *  Config Vercela; tu liczymy z nich wolne starty co 15 minut, 11:00–23:30. */

export const GODZ_OD = 11;
export const GODZ_DO = 23;
/** Krok osi czasu w minutach; ostatnie spotkanie zaczyna się 23:30. */
export const KROK_MIN = 15;
const OSTATNI_START_MIN = 23 * 60 + 30;
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

function hhmm(min: number): string {
  return `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;
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
    for (let m = GODZ_OD * 60; m <= OSTATNI_START_MIN; m += KROK_MIN) {
      // Od pełnej godziny, nie od północy: w dniu zmiany czasu przesunięcie zmienia się o 3:00.
      const start = warszawa(data, Math.floor(m / 60)) + (m % 60) * 60_000;
      if (!kolizja(start, zajete)) godziny.push(hhmm(m));
    }
    dni.push({ data, godziny });
  }
  return { dni, aktualizacja: cfg?.aktualizacja ?? null };
}

/** Czy termin „RRRR-MM-DD GG:MM” jest nadal wolny (sprawdzenie przy wysyłce). */
export async function terminWolny(termin: string): Promise<boolean> {
  const m = /^(\d{4}-\d{2}-\d{2}) (\d{2}):(\d{2})$/.exec(termin);
  if (!m) return false;
  const min = Number(m[2]) * 60 + Number(m[3]);
  if (min % KROK_MIN || min < GODZ_OD * 60 || min > OSTATNI_START_MIN) return false;
  const start = warszawa(m[1], Math.floor(min / 60)) + (min % 60) * 60_000;
  if (start < Date.now()) return false;
  const cfg = await pobierzConfig();
  return !kolizja(start, cfg?.zajete ?? []);
}
