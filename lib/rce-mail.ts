import { doba, type Doba } from "@/lib/ceny-energii";
import { esc, ramkaMaila } from "@/lib/fl-produkty";

export const PRODUKT_RCE = "rce";

export type Godzina = { h: number; cena: number };

const nf = new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 });
const mwh = (c: number) => nf.format(Math.round(c));
const gr = (c: number) => new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(c / 10);
const hh = (h: number) => `${String(h).padStart(2, "0")}:00`;

export function godziny(d: Doba): Godzina[] {
  const m = new Map<number, number[]>();
  for (const k of d.kwadranse) {
    const h = Number(k.czas.slice(0, 2));
    m.set(h, [...(m.get(h) ?? []), k.cena]);
  }
  return [...m.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([h, c]) => ({ h, cena: c.reduce((a, b) => a + b, 0) / c.length }));
}

function najtanszeOkno(g: Godzina[], n: number, tanie: boolean) {
  let best = -1;
  let s0 = tanie ? Infinity : -Infinity;
  for (let i = 0; i + n <= g.length; i++) {
    const s = g.slice(i, i + n).reduce((a, x) => a + x.cena, 0);
    if (tanie ? s < s0 : s > s0) {
      s0 = s;
      best = i;
    }
  }
  return best < 0 ? null : { od: g[best].h, do: g[best + n - 1].h + 1, srednia: s0 / n, i: best, n };
}

const DNI = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
function opisDnia(data: string) {
  const [r, m, d] = data.split("-").map(Number);
  const dt = new Date(Date.UTC(r, m - 1, d, 12));
  return `${DNI[dt.getUTCDay()]} ${d}.${String(m).padStart(2, "0")}.${r}`;
}

/** Jutro, jeśli PSE już opublikowało; inaczej dziś (zapis w godzinach przed 14:00). */
export async function dobaDoMaila(): Promise<{ d: Doba; jutro: boolean } | null> {
  const jutro = await doba(1);
  if (jutro.kwadranse.length >= 92) return { d: jutro, jutro: true };
  const dzis = await doba(0);
  if (dzis.kwadranse.length >= 92) return { d: dzis, jutro: false };
  return null;
}

export function zlozMail(d: Doba, jutro: boolean, wypis: string, pierwszy: boolean) {
  const g = godziny(d);
  const tanie4 = najtanszeOkno(g, 4, true)!;
  const tanie2 = najtanszeOkno(g, 2, true)!;
  const drogie4 = najtanszeOkno(g, 4, false)!;
  const dzien = opisDnia(d.data);
  const max = Math.max(...g.map((x) => Math.abs(x.cena)), 1);
  const temat = `Ceny energii ${jutro ? "na" : "dziś,"} ${dzien}: najtaniej ${hh(tanie4.od)}–${hh(tanie4.do % 24 === 0 ? 24 : tanie4.do)}`.replace("24:00", "24:00");

  const wiersze = g
    .map((x, i) => {
      const t = i >= tanie4.i && i < tanie4.i + 4;
      const dr = i >= drogie4.i && i < drogie4.i + 4;
      const szer = Math.max(2, Math.round((Math.abs(x.cena) / max) * 100));
      const kol = x.cena < 0 ? "#0ea5e9" : t ? "#16a34a" : dr ? "#dc2626" : "#9ca3af";
      return `<tr><td style="padding:3px 8px 3px 0;font-size:13px;color:#374151;white-space:nowrap">${hh(x.h)}</td>
<td style="padding:3px 0;width:100%"><div style="height:10px;border-radius:5px;background:${kol};width:${szer}%"></div></td>
<td style="padding:3px 0 3px 8px;font-size:13px;text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums;color:#111827">${mwh(x.cena)}</td></tr>`;
    })
    .join("");

  const ujemne = d.oknaUjemne.length
    ? `<p style="margin:12px 0 0;font-size:14px;line-height:1.5">Ceny ujemne: ${d.oknaUjemne.map((o) => `${o.od}–${o.do}`).join(", ")}. Wtedy energia jest na rynku warta mniej niż zero, więc to dobry czas na każde większe zużycie.</p>`
    : "";

  const blok = (t: string, w: string, p: string, kol: string) =>
    `<div style="border-left:4px solid ${kol};padding:4px 0 4px 12px;margin:0 0 12px"><div style="font-size:13px;color:#6b7280">${t}</div><div style="font-size:20px;font-weight:700">${w}</div><div style="font-size:13px;color:#374151">${p}</div></div>`;

  const tresc = `
<p style="margin:0 0 16px;font-size:15px;line-height:1.5">${pierwszy ? "To pierwszy mail. Kolejne przyjdą codziennie po 15:00, kiedy operator opublikuje ceny na następną dobę. " : ""}Średnia doby: <b>${mwh(d.srednia ?? 0)} zł/MWh</b> (${gr(d.srednia ?? 0)} gr/kWh). Najtaniej ${mwh(d.min ?? 0)}, najdrożej ${mwh(d.max ?? 0)} zł/MWh.</p>
${blok("Najlepsze 4 godziny na zużycie", `${hh(tanie4.od)}–${hh(tanie4.do)}`, `średnio ${mwh(tanie4.srednia)} zł/MWh`, "#16a34a")}
${blok("Najlepsze 2 godziny", `${hh(tanie2.od)}–${hh(tanie2.do)}`, `średnio ${mwh(tanie2.srednia)} zł/MWh`, "#16a34a")}
${blok("Unikaj: najdroższe 4 godziny", `${hh(drogie4.od)}–${hh(drogie4.do)}`, `średnio ${mwh(drogie4.srednia)} zł/MWh`, "#dc2626")}
<p style="margin:16px 0 6px;font-size:14px;font-weight:700">Cena godzina po godzinie (zł/MWh)</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">${wiersze}</table>
${ujemne}
<p style="margin:16px 0 0;font-size:13px;line-height:1.5;color:#4b5563">Zielone słupki to najtańsze cztery godziny, czerwone najdroższe. Do ładowania auta, pompy ciepła, bojlera albo magazynu energii wybieraj zielone.</p>`;

  const stopka = `Źródło: Polskie Sieci Elektroenergetyczne, rynkowa cena energii (RCE), średnia z kwadransów w każdej godzinie. To cena hurtowa, bez opłat dystrybucyjnych, podatków i marży sprzedawcy, więc służy do porównywania godzin, a nie do wyliczenia rachunku. Rozliczenie prosumenta zależy od Twojej umowy.<br><br>
Dostajesz tę wiadomość, bo zapisałeś(-aś) się na stronie fluxlab.pl/ceny-energii-jutro. <a href="${wypis}" style="color:#6b7280">Wypisz mnie jednym kliknięciem</a>. Fluxlab, Paweł Iwanek.`;

  const html = ramkaMaila({ naglowek: esc(`Ceny energii: ${dzien}`), tresc, stopka });
  const tekst = [
    `Ceny energii: ${dzien}`,
    `Średnia ${mwh(d.srednia ?? 0)} zł/MWh. Najtaniej ${mwh(d.min ?? 0)}, najdrożej ${mwh(d.max ?? 0)}.`,
    `Najlepsze 4 godziny: ${hh(tanie4.od)}-${hh(tanie4.do)} (średnio ${mwh(tanie4.srednia)} zł/MWh)`,
    `Najlepsze 2 godziny: ${hh(tanie2.od)}-${hh(tanie2.do)} (średnio ${mwh(tanie2.srednia)} zł/MWh)`,
    `Unikaj: ${hh(drogie4.od)}-${hh(drogie4.do)} (średnio ${mwh(drogie4.srednia)} zł/MWh)`,
    "", ...g.map((x) => `${hh(x.h)}  ${mwh(x.cena)}`), "",
    "Źródło: PSE, rynkowa cena energii (RCE), bez opłat dystrybucyjnych i podatków.",
    `Wypis: ${wypis}`,
  ].join("\n");
  return { temat, html, tekst };
}
