import { createHmac, timingSafeEqual } from "node:crypto";

export type Wiersz = { n: string; k: number; kl: number; w: number; ko: number; wk: number };
export type Fraza = { t: string; kampania: string; k: number; kl: number; ko: number };
export type Nowa = { t: string; kampania: string; k: number; kl: number; wczoraj: number };
export type DaneAds = {
  sub: string;
  token: string;
  tryb: "tygodniowy" | "dzienny";
  konto: { nazwa: string; id: string; waluta: string };
  prog: number;
  kampanie: { t: Wiersz[]; p: Wiersz[] };
  frazy: Fraza[];
  nowe: Nowa[];
};

export function tokenAds(sub: string, sekret: string) {
  return createHmac("sha256", sekret).update(`ads:${sub}`).digest("hex").slice(0, 32);
}

export function tokenPoprawny(sub: string, token: string, sekret: string) {
  if (sekret.length < 20 || !/^sub_\w{6,80}$/.test(sub)) return false;
  const o = Buffer.from(tokenAds(sub, sekret));
  const n = Buffer.from(String(token));
  return o.length === n.length && timingSafeEqual(o, n);
}

const e = (t: unknown) =>
  String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const liczba = (x: number, miejsca = 0) =>
  new Intl.NumberFormat("pl-PL", { minimumFractionDigits: miejsca, maximumFractionDigits: miejsca }).format(x);
const waluta = (w: string) => (w === "PLN" ? "zł" : w);
const kwota = (x: number, w: string) => `${liczba(x, 2)} ${waluta(w)}`;

function zmiana(t: number, p: number) {
  if (p === 0) return t === 0 ? "0" : "nowe";
  const d = ((t - p) / p) * 100;
  return Math.abs(d) < 1 ? "±0%" : `${d > 0 ? "+" : "−"}${Math.abs(d).toFixed(0)}%`;
}

const suma = (w: Wiersz[]) =>
  w.reduce(
    (a, x) => ({ k: a.k + x.k, kl: a.kl + x.kl, w: a.w + x.w, ko: a.ko + x.ko, wk: a.wk + x.wk }),
    { k: 0, kl: 0, w: 0, ko: 0, wk: 0 },
  );

function szablon(nadtytul: string, tytul: string, tresc: string) {
  return `<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:#F6F5FA;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#1A1A35">
<div style="max-width:600px;margin:0 auto;padding:16px">
<div style="background:#fff;border:1px solid #E3E3EC;border-radius:12px;padding:24px 20px">
<div style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#6E2CFF">${e(nadtytul)}</div>
<h1 style="font-size:22px;line-height:1.3;margin:6px 0 16px;color:#1A1A35">${e(tytul)}</h1>
<div style="font-size:15px;line-height:1.6;color:#1A1A35">${tresc}</div>
</div>
<p style="font-size:12px;line-height:1.5;color:#59596D;margin:14px 4px">Wiadomość z raportu Google Ads w fluxlab.pl. Fluxlab, Paweł Iwanek. Odpowiedz na tego maila, a odpisze człowiek.</p>
</div></body></html>`;
}

function tabela(naglowki: string[], wiersze: string[][]) {
  const th = naglowki
    .map((h, i) => `<th style="text-align:${i === 0 ? "left" : "right"};padding:6px 4px;border-bottom:1px solid #E3E3EC;font-weight:700">${e(h)}</th>`)
    .join("");
  const tr = wiersze
    .map(
      (r) =>
        "<tr>" +
        r.map((c, i) => `<td style="padding:6px 4px;border-bottom:1px solid #F0F0F6;text-align:${i === 0 ? "left" : "right"};word-break:break-word">${c}</td>`).join("") +
        "</tr>",
    )
    .join("");
  return `<table style="width:100%;border-collapse:collapse;font-size:14px;margin:6px 0 0"><tr>${th}</tr>${tr}</table>`;
}

export const bezKonwersji = (d: DaneAds) => suma(d.kampanie.t).ko === 0 && suma(d.kampanie.p).ko === 0 && d.frazy.every((f) => f.ko === 0);

export function mailAlert(d: DaneAds) {
  const w = d.konto.waluta;
  const lista = tabela(
    ["Fraza", "Koszt 30 dni", "Kliknięcia", "Wczoraj"],
    d.nowe.map((f) => [`${e(f.t)}<br><span style="font-size:12px;color:#59596D">${e(f.kampania)}</span>`, e(kwota(f.k, w)), liczba(f.kl), e(kwota(f.wczoraj, w))]),
  );
  const tresc =
    `<p>Te frazy w koncie <b>${e(d.konto.nazwa)}</b> przekroczyły wczoraj próg ${e(kwota(d.prog, w))} wydatków w ciągu 30 dni, a nie przyniosły żadnej konwersji.</p>${lista}` +
    `<p style="margin:16px 0 0">Co możesz zrobić: wykluczyć frazę, wstrzymać ją albo obniżyć stawkę. Alert o tej samej frazie przyjdzie ponownie dopiero wtedy, gdy znowu przekroczy próg po zerze konwersji.</p>` +
    `<p style="margin:12px 0 0;font-size:12px;color:#59596D">Konwersje Google zapisuje z opóźnieniem do kilku dni, więc fraza mogła dopiero co zacząć konwertować. Sprawdź ją w koncie, zanim ją wyłączysz.</p>`;
  const tytul = d.nowe.length === 1 ? "Fraza przepala budżet w Google Ads" : `${d.nowe.length} frazy przepalają budżet w Google Ads`;
  return { temat: `Alert Google Ads: ${d.konto.nazwa}`, html: szablon("Alert Google Ads", tytul, tresc) };
}

export function mailTygodniowy(d: DaneAds) {
  const w = d.konto.waluta;
  const t = suma(d.kampanie.t);
  const p = suma(d.kampanie.p);
  const brak = bezKonwersji(d);
  const wnioski: string[] = [];
  if (t.kl === 0) {
    wnioski.push("W ostatnich 7 dniach konto nie miało kliknięć. Sprawdź, czy kampanie są włączone i mają budżet.");
  } else {
    wnioski.push(`Wydano ${kwota(t.k, w)} (${p.k ? `${zmiana(t.k, p.k)} wobec tygodnia wcześniej` : "tydzień wcześniej bez wydatków"}) na ${liczba(t.kl)} kliknięć, średnio ${kwota(t.k / t.kl, w)} za kliknięcie.`);
    if (!brak) {
      if (t.ko > 0) wnioski.push(`Konwersji było ${liczba(t.ko, 1)}, a jedna kosztowała średnio ${kwota(t.k / t.ko, w)}${p.ko > 0 ? ` (tydzień wcześniej ${kwota(p.k / p.ko, w)})` : ""}.`);
      else wnioski.push("W tym tygodniu konto nie zapisało żadnej konwersji mimo wydatków.");
    } else {
      wnioski.push("Konto nie zapisuje konwersji, więc nie da się ocenić, które frazy się opłacają. Skonfiguruj konwersje w Google Ads, a raport pokaże koszt konwersji.");
    }
  }
  const kampanie = [...d.kampanie.t].sort((a, b) => b.k - a.k).slice(0, 10);
  const poprzednie = new Map(d.kampanie.p.map((x) => [x.n, x]));
  let s = `<p>Konto <b>${e(d.konto.nazwa)}</b>, ostatnie 7 dni wobec 7 dni wcześniej.</p><ul style="margin:0;padding-left:20px">${wnioski
    .map((x) => `<li style="margin:0 0 6px">${e(x)}</li>`)
    .join("")}</ul>`;
  if (kampanie.length)
    s +=
      `<h3 style="margin:20px 0 0;font-size:16px">Kampanie</h3>` +
      tabela(
        ["Kampania", "Koszt", "Zmiana", "Konwersje"],
        kampanie.map((x) => [e(x.n), e(kwota(x.k, w)), zmiana(x.k, poprzednie.get(x.n)?.k ?? 0), brak ? "brak danych" : liczba(x.ko, 1)]),
      );
  const palace = d.frazy.filter((f) => f.ko === 0 && f.k > 0).sort((a, b) => b.k - a.k).slice(0, 15);
  if (!brak) {
    s += `<h3 style="margin:20px 0 0;font-size:16px">Frazy bez konwersji (ostatnie 30 dni)</h3>`;
    if (palace.length) {
      const razem = palace.reduce((a, f) => a + f.k, 0);
      s +=
        `<p style="margin:4px 0 0">Razem ${e(kwota(razem, w))} na liście poniżej. Do wykluczenia albo wstrzymania.</p>` +
        tabela(["Fraza", "Koszt", "Kliknięcia"], palace.map((f) => [`${e(f.t)}<br><span style="font-size:12px;color:#59596D">${e(f.kampania)}</span>`, e(kwota(f.k, w)), liczba(f.kl)]));
    } else s += `<p style="margin:4px 0 0">Żadna fraza z kosztem nie jest bez konwersji. Bez uwag.</p>`;
  }
  s += `<p style="margin:20px 0 0;font-size:12px;color:#59596D">Raport powstaje z liczb wysłanych przez skrypt w Twoim koncie. Konwersje Google zapisuje z opóźnieniem do kilku dni, więc ostatnie dni mogą się jeszcze zmienić. Alert przepalania przychodzi osobno, gdy fraza przekroczy ${e(kwota(d.prog, w))} wydatków w 30 dni bez konwersji.</p>`;
  return { temat: `Google Ads: tygodniowy raport, ${d.konto.nazwa}`, html: szablon("Raport Google Ads", "Tygodniowy raport z Google Ads", s) };
}

export function poprawne(d: any): d is DaneAds {
  const lw = (x: any) => Array.isArray(x) && x.length <= 500;
  const w = (x: any) => x && ["n"].every((k) => typeof x[k] === "string") && ["k", "kl", "w", "ko", "wk"].every((k) => Number.isFinite(x[k]));
  return (
    d &&
    typeof d.sub === "string" &&
    typeof d.token === "string" &&
    (d.tryb === "tygodniowy" || d.tryb === "dzienny") &&
    d.konto && typeof d.konto.nazwa === "string" && typeof d.konto.waluta === "string" &&
    Number.isFinite(d.prog) &&
    d.kampanie && lw(d.kampanie.t) && lw(d.kampanie.p) && d.kampanie.t.every(w) && d.kampanie.p.every(w) &&
    lw(d.frazy) && d.frazy.every((f: any) => typeof f.t === "string" && Number.isFinite(f.k) && Number.isFinite(f.kl) && Number.isFinite(f.ko)) &&
    lw(d.nowe) && d.nowe.every((f: any) => typeof f.t === "string" && Number.isFinite(f.k) && Number.isFinite(f.kl) && Number.isFinite(f.wczoraj))
  );
}
