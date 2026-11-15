import { esc, ramkaMaila } from "@/lib/dokumenty-mail";
import { mapaRownolegla, nipPoprawny } from "@/lib/rejestry-publiczne";

const MF = "https://wl-api.mf.gov.pl/api/search/bank-accounts";
const PACZKA_MF = 30;
export const MAX_WIERSZY = 500;
export const PROG_ZL = 15000;

export type Status =
  | "ok"
  | "inny_podmiot"
  | "nieczynny"
  | "brak"
  | "bledny"
  | "blad";

export type Wiersz = {
  nr: number;
  rachunek: string;
  nip: string;
  nazwa: string;
  kwota: number | null;
  status: Status;
  podmiot: string;
  podmiotNip: string;
  uwaga: string;
};

type Pozycja = {
  nr: number;
  rachunek: string;
  nip: string;
  nazwa: string;
  kwota: number | null;
};

export function rachunekPoprawny(d: string): boolean {
  if (!/^\d{26}$/.test(d) || d.startsWith("00")) return false;
  let reszta = 0;
  for (const c of d.slice(2) + "2521" + d.slice(0, 2))
    reszta = (reszta * 10 + Number(c)) % 97;
  return reszta === 1;
}

function pola(linia: string, sep: string): string[] {
  const wynik: string[] = [];
  let b = "";
  let cudzyslow = false;
  for (let i = 0; i < linia.length; i++) {
    const c = linia[i];
    if (c === '"') {
      if (cudzyslow && linia[i + 1] === '"') {
        b += '"';
        i++;
      } else cudzyslow = !cudzyslow;
    } else if (c === sep && !cudzyslow) {
      wynik.push(b.trim());
      b = "";
    } else b += c;
  }
  wynik.push(b.trim());
  return wynik;
}

function separator(linie: string[]): string {
  const probka = linie.slice(0, 5).join("\n");
  let najlepszy = ",";
  let ile = -1;
  for (const s of [";", ",", "\t", "|"]) {
    const n = probka.split(s).length;
    if (n > ile) {
      ile = n;
      najlepszy = s;
    }
  }
  return najlepszy;
}

const cyfry = (t: string) => t.replace(/^PL/i, "").replace(/[\s-]/g, "");
const wygladaNaRachunek = (t: string) =>
  /^(PL)?[\s\d-]{26,40}$/i.test(t.trim()) && /^\d{26}$/.test(cyfry(t));

function kwota(t: string): number | null {
  const s = t
    .replace(/\s|zł|pln/gi, "")
    .replace(/\.(?=\d{3}\b)/g, "")
    .replace(",", ".");
  if (!/^-?\d+(\.\d{1,2})?$/.test(s)) return null;
  return Math.abs(Number(s));
}

/**
 * Wyciąga z paczki przelewów rachunki odbiorców. Działa na CSV z dowolnego banku
 * (nagłówek z "rachunek" i "kwota" albo bez nagłówka) i na formacie Elixir-0.
 * W wierszu z dwoma rachunkami za odbiorcę uznajemy ostatni.
 */
export function wczytajPaczke(tekst: string): {
  pozycje: Pozycja[];
  pominiete: number;
} {
  const linie = tekst
    .replace(/^﻿/, "")
    .split(/\r?\n/)
    .filter((l) => l.trim());
  if (!linie.length) return { pozycje: [], pominiete: 0 };
  const sep = separator(linie);
  const pierwsza = pola(linie[0], sep);
  const maNaglowek =
    !pierwsza.some(wygladaNaRachunek) &&
    pierwsza.some((p) => /[a-ząćęłńóśźż]/i.test(p));
  const nag = maNaglowek ? pierwsza.map((p) => p.toLowerCase()) : [];
  const idx = (re: RegExp) => nag.findIndex((n) => re.test(n));
  const iRach = idx(/rachun|konto|iban|account/);
  const iKwota = idx(/kwota|wartość|wartosc|amount/);
  const iNazwa = idx(/nazwa|odbiorca|kontrahent|beneficjent|name/);
  const iNip = idx(/nip|vat/);

  const pozycje: Pozycja[] = [];
  let pominiete = 0;
  linie.slice(maNaglowek ? 1 : 0).forEach((l, i) => {
    const p = pola(l, sep);
    let rachunek = "";
    if (iRach >= 0 && wygladaNaRachunek(p[iRach] ?? ""))
      rachunek = cyfry(p[iRach]);
    else {
      const wszystkie = p.filter(wygladaNaRachunek).map(cyfry);
      rachunek = wszystkie[wszystkie.length - 1] ?? "";
    }
    if (!rachunek) {
      const kandydat = p.map(cyfry).find((c) => /^\d{20,32}$/.test(c));
      if (!kandydat) {
        pominiete++;
        return;
      }
      rachunek = kandydat;
    }
    let nip = "";
    const zPola = iNip >= 0 ? cyfry(p[iNip] ?? "") : "";
    if (/^\d{10}$/.test(zPola)) nip = zPola;
    else {
      for (const f of p) {
        const m = f.match(/NIP[\s:.]*([\dA-Z -]{10,16})/i);
        const c = m
          ? cyfry(m[1]).slice(0, 10)
          : /^(PL)?\d{3}-?\d{3}-?\d{2}-?\d{2}$/i.test(f)
            ? cyfry(f)
            : "";
        if (c && nipPoprawny(c)) {
          nip = c;
          break;
        }
      }
    }
    const elixir = !maNaglowek && p[0] === "110" && /^\d+$/.test(p[2] ?? "");
    let k: number | null = iKwota >= 0 ? kwota(p[iKwota] ?? "") : null;
    if (elixir) k = Number(p[2]) / 100;
    let nazwa = iNazwa >= 0 ? (p[iNazwa] ?? "") : "";
    if (!nazwa && elixir) nazwa = (p[6] ?? "").split("|")[0].trim();
    pozycje.push({
      nr: i + 1,
      rachunek,
      nip,
      nazwa: nazwa.slice(0, 120),
      kwota: k,
    });
  });
  return { pozycje, pominiete };
}

type Podmiot = { name: string; nip: string | null; statusVat: string };

async function zapytajMF(
  rachunki: string[],
  data: string,
): Promise<Map<string, Podmiot[] | "bledny" | "blad">> {
  const wynik = new Map<string, Podmiot[] | "bledny" | "blad">();
  for (let proba = 0; proba < 3; proba++) {
    try {
      const r = await fetch(`${MF}/${rachunki.join(",")}?date=${data}`, {
        headers: { Accept: "application/json" },
        cache: "no-store",
        signal: AbortSignal.timeout(20_000),
      });
      if (r.status === 429 || r.status >= 500)
        throw new Error(String(r.status));
      const j = await r.json();
      for (const e of j?.result?.entries ?? []) {
        if (e.error)
          wynik.set(
            e.identifier,
            e.error.code === "WL-111" ? "bledny" : "blad",
          );
        else wynik.set(e.identifier, e.subjects ?? []);
      }
      return wynik;
    } catch {
      await new Promise((s) => setTimeout(s, 1500 * (proba + 1)));
    }
  }
  for (const r of rachunki) wynik.set(r, "blad");
  return wynik;
}

export async function weryfikuj(pozycje: Pozycja[]): Promise<Wiersz[]> {
  const data = new Date().toLocaleDateString("sv-SE", {
    timeZone: "Europe/Warsaw",
  });
  const unikalne = [
    ...new Set(
      pozycje
        .filter((p) => rachunekPoprawny(p.rachunek))
        .map((p) => p.rachunek),
    ),
  ];
  const paczki: string[][] = [];
  for (let i = 0; i < unikalne.length; i += PACZKA_MF)
    paczki.push(unikalne.slice(i, i + PACZKA_MF));
  const odp = new Map<string, Podmiot[] | "bledny" | "blad">();
  for (const m of await mapaRownolegla(paczki, 3, (p) => zapytajMF(p, data)))
    m.forEach((v, k) => odp.set(k, v));

  return pozycje.map((p) => {
    const baza = { ...p, podmiot: "", podmiotNip: "", uwaga: "" };
    if (!rachunekPoprawny(p.rachunek))
      return {
        ...baza,
        status: "bledny",
        uwaga:
          "Numer rachunku jest błędny, nie zgadza się suma kontrolna. Najczęściej to literówka.",
      };
    const o = odp.get(p.rachunek);
    if (o === "bledny")
      return {
        ...baza,
        status: "bledny",
        uwaga: "Wykaz MF uznał numer za nieprawidłowy.",
      };
    if (!o || o === "blad")
      return {
        ...baza,
        status: "blad",
        uwaga:
          "Wykaz MF nie odpowiedział, sprawdź ten rachunek ponownie za chwilę.",
      };
    if (!o.length)
      return {
        ...baza,
        status: "brak",
        uwaga:
          "Rachunku nie ma na białej liście VAT. Przelew powyżej 15 000 zł na taki rachunek nie jest kosztem podatkowym, a za VAT odpowiadasz solidarnie.",
      };
    const ten = p.nip ? o.find((s) => s.nip === p.nip) : undefined;
    const pierwszy = ten ?? o[0];
    const wspolne = {
      ...baza,
      podmiot: pierwszy.name,
      podmiotNip: pierwszy.nip ?? "",
    };
    if (p.nip && !ten)
      return {
        ...wspolne,
        status: "inny_podmiot",
        uwaga: `Rachunek należy do podmiotu o NIP ${pierwszy.nip ?? "brak"}, a nie do NIP ${p.nip} z paczki. Zatrzymaj przelew i potwierdź numer u kontrahenta.`,
      };
    if (pierwszy.statusVat !== "Czynny")
      return {
        ...wspolne,
        status: "nieczynny",
        uwaga: `Status VAT podmiotu: ${pierwszy.statusVat || "nieznany"}. Sprawdź kontrahenta przed zapłatą.`,
      };
    return {
      ...wspolne,
      status: "ok",
      uwaga: p.nip
        ? "Rachunek jest na białej liście i należy do wskazanego NIP."
        : "Rachunek jest na białej liście VAT.",
    };
  });
}

export const ETYKIETA: Record<Status, string> = {
  ok: "Na białej liście",
  inny_podmiot: "Rachunek innej firmy",
  nieczynny: "Podmiot bez czynnego VAT",
  brak: "Spoza białej listy",
  bledny: "Błędny numer",
  blad: "Nie sprawdzono",
};

export const wymagaUwagi = (w: Wiersz) => w.status !== "ok";

export function formatRachunku(r: string): string {
  return r.length === 26
    ? `${r.slice(0, 2)} ${r.slice(2).replace(/(\d{4})(?=\d)/g, "$1 ")}`
    : r;
}

const zl = (k: number | null) =>
  k == null
    ? ""
    : k.toLocaleString("pl-PL", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

export function csvWyniku(w: Wiersz[]): string {
  const k = (s: string | number) => `"${String(s).replace(/"/g, '""')}"`;
  const linie = [
    [
      "Wiersz",
      "Rachunek",
      "NIP z paczki",
      "Nazwa z paczki",
      "Kwota",
      "Status",
      "Podmiot z wykazu",
      "NIP z wykazu",
      "Uwaga",
    ]
      .map(k)
      .join(";"),
  ];
  for (const x of w)
    linie.push(
      [
        x.nr,
        formatRachunku(x.rachunek),
        x.nip,
        x.nazwa,
        zl(x.kwota),
        ETYKIETA[x.status],
        x.podmiot,
        x.podmiotNip,
        x.uwaga,
      ]
        .map(k)
        .join(";"),
    );
  return "﻿" + linie.join("\r\n") + "\r\n";
}

export function podsumowanie(w: Wiersz[]) {
  const ile = (s: Status) => w.filter((x) => x.status === s).length;
  const problemy = w.filter(wymagaUwagi);
  const naRyzyku = problemy.filter(
    (x) => x.status !== "blad" && x.kwota != null && x.kwota > PROG_ZL,
  );
  return {
    razem: w.length,
    ok: ile("ok"),
    problemy: problemy.length,
    nieSprawdzone: ile("blad"),
    powyzejProgu: naRyzyku.length,
  };
}

export function mailWyniku(
  w: Wiersz[],
  plik: string,
): { temat: string; html: string; tekst: string } {
  const s = podsumowanie(w);
  const problemy = w.filter(wymagaUwagi);
  const temat =
    s.problemy === 0
      ? `Paczka przelewów: wszystkie ${s.razem} rachunków na białej liście`
      : `Paczka przelewów: ${s.problemy} z ${s.razem} rachunków do sprawdzenia przed wysyłką`;
  const komorka =
    "padding:10px 0;border-top:1px solid #e5e7eb;font-size:14px;vertical-align:top";
  const wiersze = problemy
    .slice(0, 40)
    .map(
      (x) =>
        `<tr><td style="${komorka}"><b>${esc(formatRachunku(x.rachunek))}</b><br><span style="color:#6b7280">${esc(x.nazwa || x.podmiot || "bez nazwy")}${x.kwota != null ? ` · ${zl(x.kwota)} zł` : ""} · wiersz ${x.nr}</span><br><span style="color:#b45309"><b>${ETYKIETA[x.status]}.</b> ${esc(x.uwaga)}</span></td></tr>`,
    )
    .join("");
  const reszta =
    problemy.length > 40
      ? `<p style="margin:12px 0 0;color:#6b7280;font-size:13px">I jeszcze ${problemy.length - 40} pozycji, wszystkie w załączonym pliku CSV.</p>`
      : "";
  const naglowek =
    s.problemy === 0
      ? `<p style="margin:0 0 12px;font-size:16px">Sprawdziliśmy plik <b>${esc(plik)}</b>: wszystkie ${s.razem} rachunków są na białej liście VAT. Przelewy możesz wysłać.</p>`
      : `<p style="margin:0 0 12px;font-size:16px">Sprawdziliśmy plik <b>${esc(plik)}</b>: <b>${s.ok} z ${s.razem}</b> rachunków jest na białej liście VAT, <b>${s.problemy}</b> wymaga Twojej uwagi.${s.powyzejProgu ? ` W ${s.powyzejProgu} z nich kwota przekracza 15 000 zł, więc dotyczy ich ograniczenie kosztów podatkowych i odpowiedzialność solidarna za VAT.` : ""}</p>`;
  const html = ramkaMaila(
    s.problemy === 0
      ? "Paczka przelewów jest czysta"
      : "Rachunki do sprawdzenia przed wysyłką",
    `${naglowek}${s.problemy ? `<table style="width:100%;border-collapse:collapse">${wiersze}</table>${reszta}` : ""}<p style="margin:16px 0 0;color:#6b7280;font-size:13px">Dane z wykazu podatników VAT Ministerstwa Finansów z dnia ${new Date().toLocaleDateString("pl-PL", { timeZone: "Europe/Warsaw" })}. Pełny wynik w załączniku. Kolejną paczkę wgrasz pod tym samym linkiem co poprzednio, w dowolnym momencie.</p>`,
  );
  const tekst = `${temat}\n\n${problemy.map((x) => `${formatRachunku(x.rachunek)} (${x.nazwa || x.podmiot}): ${ETYKIETA[x.status]}. ${x.uwaga}`).join("\n")}\n\nPełny wynik w załączniku.`;
  return { temat, html, tekst };
}
