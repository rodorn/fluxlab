// Dźwięki interfejsu syntezowane w Web Audio: bez plików, gra tylko po
// działaniu odwiedzającego (przeglądarki i tak blokują dźwięk wcześniej).
// Głośność celowo niska; wyłącznik w stopce zapisuje wybór w localStorage.
export const KLUCZ_DZWIEKU = "fl_dzwiek";

let ctx: AudioContext | null = null;

export function dzwiekWlaczony(): boolean {
  try {
    const s = localStorage.getItem(KLUCZ_DZWIEKU);
    if (s !== null) return s === "1";
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

function ton(
  c: AudioContext,
  czestotliwosc: number,
  start: number,
  dlugosc: number,
  glosnosc: number,
  ksztalt: OscillatorType = "sine",
) {
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = ksztalt;
  osc.frequency.setValueAtTime(czestotliwosc, start);
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(glosnosc, start + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dlugosc);
  osc.connect(g).connect(c.destination);
  osc.start(start);
  osc.stop(start + dlugosc + 0.02);
}

export function zagraj(rodzaj: "tik" | "wynik", wymus = false): void {
  if (typeof window === "undefined" || (!wymus && !dzwiekWlaczony())) return;
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    const t = ctx.currentTime + 0.005;
    if (rodzaj === "tik") {
      ton(ctx, 1320, t, 0.045, 0.035, "triangle");
    } else {
      ton(ctx, 659.25, t, 0.5, 0.045);
      ton(ctx, 987.77, t + 0.09, 0.6, 0.035);
    }
  } catch {
    /* brak Web Audio: strona działa po cichu */
  }
}
