export type Rez = { dni: number[]; od: number; do: number; krok: number };

const hm = (s: string) => {
  const m = s.match(/^(\d{1,2}):(\d{2})$/);
  return m && Number(m[1]) < 24 && Number(m[2]) < 60 ? Number(m[1]) * 60 + Number(m[2]) : null;
};
export const minNaHm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

/** null = nieskonfigurowane, string = błąd, inaczej ustawienia. Dni: cyfry 1-7 (1 = poniedziałek). */
export function parsujRez(u: Record<string, string>): Rez | string | null {
  const dniTxt = (u.rez_dni ?? "").trim();
  if (!dniTxt && !u.rez_od && !u.rez_do && !u.rez_min) return null;
  if (!/^[1-7]{1,7}$/.test(dniTxt)) return "Dni rezerwacji: podaj cyfry 1-7, na przykład 12345 dla poniedziałku-piątku.";
  const od = hm(u.rez_od ?? ""), do_ = hm(u.rez_do ?? "");
  if (od === null || do_ === null || od >= do_) return "Godziny rezerwacji: podaj zakres w formacie GG:MM, na przykład 09:00 i 17:00.";
  const krok = Number(u.rez_min);
  if (!Number.isInteger(krok) || krok < 10 || krok > 240) return "Długość wizyty: od 10 do 240 minut.";
  return { dni: [...new Set(dniTxt.split("").map(Number))], od, do: do_, krok };
}

export function terazWarszawa(): { data: string; min: number } {
  const p = Object.fromEntries(new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Warsaw", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date()).map((x) => [x.type, x.value]));
  return { data: `${p.year}-${p.month}-${p.day}`, min: Number(p.hour) * 60 + Number(p.minute) };
}

export const HORYZONT_DNI = 21;
const WYPRZEDZENIE_MIN = 60;

export function dniZeSlotami(c: Rez, teraz = terazWarszawa()): { data: string; godziny: string[] }[] {
  const wyn: { data: string; godziny: string[] }[] = [];
  const start = Date.parse(`${teraz.data}T00:00:00Z`);
  for (let i = 0; i <= HORYZONT_DNI; i++) {
    const d = new Date(start + i * 86400000);
    const dow = d.getUTCDay() === 0 ? 7 : d.getUTCDay();
    if (!c.dni.includes(dow)) continue;
    const godziny: string[] = [];
    for (let m = c.od; m + c.krok <= c.do; m += c.krok) if (i > 0 || m >= teraz.min + WYPRZEDZENIE_MIN) godziny.push(minNaHm(m));
    if (godziny.length) wyn.push({ data: d.toISOString().slice(0, 10), godziny });
  }
  return wyn;
}

export function dzienKrotko(data: string) {
  const [, m, d] = data.split("-");
  return `${["niedz.", "pon.", "wt.", "śr.", "czw.", "pt.", "sob."][new Date(`${data}T00:00:00Z`).getUTCDay()]} ${d}.${m}`;
}

const DNI = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
export function etykieta(data: string, godz: string) {
  const [r, m, d] = data.split("-");
  return `${DNI[new Date(`${data}T00:00:00Z`).getUTCDay()]} ${d}.${m}.${r}, ${godz}`;
}
