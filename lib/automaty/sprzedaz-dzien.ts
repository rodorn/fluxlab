/** Produkt: Sprzedaż ze Stripe co dzień. Odczyt z konta klienta kluczem tylko do odczytu. */

export type Okres = { od: number; do: number; etykieta: string };
export type Suma = { waluta: string; platnosci: number; brutto: number; zwroty: number; zwrotyKwota: number; nieudane: number; najwieksza: number };

const STRIPE = "https://api.stripe.com/v1/";

export class BladKlucza extends Error {}

async function get(klucz: string, sciezka: string) {
  const r = await fetch(STRIPE + sciezka, { headers: { Authorization: `Bearer ${klucz}` }, signal: AbortSignal.timeout(20000) });
  const d = await r.json();
  if (r.status === 401 || r.status === 403) throw new BladKlucza(d?.error?.message ?? "Klucz odrzucony");
  if (!r.ok) throw new Error(d?.error?.message ?? `Stripe ${r.status}`);
  return d;
}

export function kluczPoprawny(k: string) {
  return /^(rk|sk)_(live|test)_[A-Za-z0-9]{20,}$/.test(k);
}

/** Sprawdza, że klucz działa i ma odczyt płatności. */
export async function sprawdzKlucz(klucz: string) {
  await get(klucz, "charges?limit=1");
}

async function wszystkie(klucz: string, zasob: string, od: number, doo: number) {
  const wynik: Record<string, unknown>[] = [];
  let po = "";
  for (let i = 0; i < 30; i++) {
    const s = await get(klucz, `${zasob}?limit=100&created[gte]=${od}&created[lt]=${doo}${po}`);
    wynik.push(...s.data);
    if (!s.has_more) break;
    po = `&starting_after=${s.data[s.data.length - 1].id}`;
  }
  return wynik;
}

export async function sumy(klucz: string, o: Okres): Promise<Suma[]> {
  const [oplaty, zwroty] = await Promise.all([wszystkie(klucz, "charges", o.od, o.do), wszystkie(klucz, "refunds", o.od, o.do)]);
  const m = new Map<string, Suma>();
  const w = (c: string) => {
    if (!m.has(c)) m.set(c, { waluta: c, platnosci: 0, brutto: 0, zwroty: 0, zwrotyKwota: 0, nieudane: 0, najwieksza: 0 });
    return m.get(c)!;
  };
  for (const c of oplaty as { currency: string; paid: boolean; status: string; amount: number }[]) {
    const s = w(c.currency);
    if (c.status === "succeeded" && c.paid) {
      s.platnosci++;
      s.brutto += c.amount;
      s.najwieksza = Math.max(s.najwieksza, c.amount);
    } else if (c.status === "failed") s.nieudane++;
  }
  for (const z of zwroty as { currency: string; status: string; amount: number }[]) {
    if (z.status === "failed" || z.status === "canceled") continue;
    const s = w(z.currency);
    s.zwroty++;
    s.zwrotyKwota += z.amount;
  }
  return [...m.values()];
}

/** Doba w strefie Warszawy jako przedział czasu uniksowego. `przesun` dni wstecz od dziś. */
export function doba(przesun: number, teraz = new Date()): Okres {
  const dzis = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Warsaw" }).format(teraz);
  const [r, mi, d] = dzis.split("-").map(Number);
  const polnoc = (dd: number) => {
    const baza = Date.UTC(r, mi - 1, dd);
    const wp = new Date(baza);
    const czesci = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Warsaw", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(wp);
    const g = Number(czesci.find((x) => x.type === "hour")!.value);
    return baza - g * 3600_000;
  };
  const od = polnoc(d - przesun);
  const dz = new Date(od + 12 * 3600_000);
  const et = new Intl.DateTimeFormat("pl-PL", { timeZone: "Europe/Warsaw", weekday: "long", day: "numeric", month: "long" }).format(dz);
  return { od: Math.floor(od / 1000), do: Math.floor(polnoc(d - przesun + 1) / 1000), etykieta: et };
}

export const kwota = (g: number, waluta: string) =>
  new Intl.NumberFormat("pl-PL", { style: "currency", currency: waluta.toUpperCase() }).format(g / 100);

export type Raport = {
  wczoraj: Okres;
  dzis: Suma[];
  poprzedni: Suma[];
  tydzien: Suma[];
  siedem: Suma[];
};

export async function zbierz(klucz: string, teraz = new Date()): Promise<Raport> {
  const wczoraj = doba(1, teraz);
  const dzienPrzed = doba(2, teraz);
  const tydzienTemu = doba(8, teraz);
  const siedem: Okres = { od: doba(7, teraz).od, do: wczoraj.do, etykieta: "7 dni" };
  const [dzis, poprzedni, tydzien, s7] = await Promise.all([
    sumy(klucz, wczoraj),
    sumy(klucz, dzienPrzed),
    sumy(klucz, tydzienTemu),
    sumy(klucz, siedem),
  ]);
  return { wczoraj, dzis, poprzedni, tydzien, siedem: s7 };
}

const e = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

function zmiana(teraz: number, wtedy: number): string {
  if (!wtedy) return teraz ? "nowa sprzedaż" : "bez zmian";
  const p = Math.round(((teraz - wtedy) / wtedy) * 100);
  return p === 0 ? "bez zmian" : `${p > 0 ? "+" : "−"}${Math.abs(p)}%`;
}

const nettoOd = (s?: Suma) => (s ? s.brutto - s.zwrotyKwota : 0);

export function zlozMail(r: Raport, pierwszy: boolean) {
  const waluty = [...new Set([...r.dzis, ...r.poprzedni, ...r.tydzien, ...r.siedem].map((s) => s.waluta))];
  if (!waluty.length) waluty.push("pln");
  const tytul = `Sprzedaż: ${r.wczoraj.etykieta}`;
  const bloki: string[] = [];
  const tekst: string[] = [tytul, ""];
  let temat = "";
  for (const w of waluty) {
    const d = r.dzis.find((s) => s.waluta === w);
    const p = r.poprzedni.find((s) => s.waluta === w);
    const t = r.tydzien.find((s) => s.waluta === w);
    const s7 = r.siedem.find((s) => s.waluta === w);
    const brutto = d?.brutto ?? 0;
    const netto = nettoOd(d);
    if (!temat) temat = `Sprzedaż wczoraj: ${kwota(brutto, w)}, ${d?.platnosci ?? 0} ${d?.platnosci === 1 ? "płatność" : "płatności"}`;
    const wiersz = (a: string, b: string) =>
      `<tr><td style="padding:8px 0;border-top:1px solid #e3e3ec;color:#59596d">${a}</td><td style="padding:8px 0;border-top:1px solid #e3e3ec;text-align:right;font-weight:600">${b}</td></tr>`;
    bloki.push(
      `<p style="margin:20px 0 4px;font-size:13px;color:#6e2cff;font-weight:700;letter-spacing:.04em">${w.toUpperCase()}</p>` +
        `<p style="margin:0;font-size:32px;font-weight:700;line-height:1.1">${kwota(brutto, w)}</p>` +
        `<p style="margin:4px 0 12px;color:#59596d">${d?.platnosci ?? 0} ${d?.platnosci === 1 ? "płatność" : "płatności"}${d?.platnosci ? `, średnio ${kwota(Math.round(brutto / d.platnosci), w)}` : ""}</p>` +
        `<table style="width:100%;border-collapse:collapse;font-size:15px">` +
        wiersz("Zwroty", d?.zwroty ? `${d.zwroty}, ${kwota(d.zwrotyKwota, w)}` : "brak") +
        wiersz("Po zwrotach", kwota(netto, w)) +
        wiersz("Nieudane płatności", String(d?.nieudane ?? 0)) +
        (d?.najwieksza ? wiersz("Największa płatność", kwota(d.najwieksza, w)) : "") +
        wiersz("Poprzedni dzień", `${kwota(p?.brutto ?? 0, w)} (${zmiana(brutto, p?.brutto ?? 0)})`) +
        wiersz("Ten dzień tydzień temu", `${kwota(t?.brutto ?? 0, w)} (${zmiana(brutto, t?.brutto ?? 0)})`) +
        wiersz("Ostatnie 7 dni", `${kwota(s7?.brutto ?? 0, w)}, ${s7?.platnosci ?? 0} płatności`) +
        `</table>`,
    );
    tekst.push(
      `${w.toUpperCase()}: ${kwota(brutto, w)}, ${d?.platnosci ?? 0} płatności`,
      `Zwroty: ${d?.zwroty ? `${d.zwroty}, ${kwota(d.zwrotyKwota, w)}` : "brak"}; po zwrotach ${kwota(netto, w)}`,
      `Nieudane płatności: ${d?.nieudane ?? 0}`,
      `Poprzedni dzień: ${kwota(p?.brutto ?? 0, w)} (${zmiana(brutto, p?.brutto ?? 0)})`,
      `Ten dzień tydzień temu: ${kwota(t?.brutto ?? 0, w)} (${zmiana(brutto, t?.brutto ?? 0)})`,
      `Ostatnie 7 dni: ${kwota(s7?.brutto ?? 0, w)}`,
      "",
    );
  }
  const wstep = pierwszy
    ? "To pierwszy raport. Kolejne przychodzą codziennie około 7:00, razem z porównaniem do poprzedniego dnia i do tego samego dnia tydzień wcześniej."
    : "";
  const html =
    `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#111;max-width:560px;margin:0 auto;padding:16px">` +
    `<p style="margin:0 0 4px;color:#59596d">Sprzedaż ze Stripe, ${e(r.wczoraj.etykieta)}</p>` +
    (wstep ? `<p style="margin:8px 0 0;color:#59596d">${wstep}</p>` : "") +
    bloki.join("") +
    `<p style="margin:24px 0 0;color:#59596d;font-size:13px">Kwoty brutto z płatności kartą i innymi metodami na Twoim koncie Stripe, doba czasu polskiego. Zrezygnujesz w dowolnym dniu, odpisując na tę wiadomość albo w panelu płatności.</p>` +
    `<p style="margin:12px 0 0;color:#59596d;font-size:13px">Fluxlab, fluxlab.pl</p></div>`;
  if (wstep) tekst.push(wstep, "");
  tekst.push("Fluxlab, fluxlab.pl");
  return { temat, html, tekst: tekst.join("\n") };
}
