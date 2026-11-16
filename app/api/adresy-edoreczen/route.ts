import { NextResponse } from "next/server";
import { Resend } from "resend";

import { zapiszZgode } from "@/lib/audyt-wyslij";
import { linkWypisu, naglowkiWypisu } from "@/lib/bramka";
import { originDozwolony, utworzLimit } from "@/lib/limit-ip";
import {
  adresEDoreczenKrs,
  esc,
  mapaRownolegla,
  nipPoprawny,
  podatnikPoNip,
  wyciagnijNipy,
} from "@/lib/rejestry-publiczne";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

const MAX_NIP = 50;
const MAX_LIST_NA_DOBE = 3;
const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FROM =
  process.env.RESEND_FROM_FORMULARZ ?? "Fluxlab <formularz@fluxlab.pl>";
const ODPOWIEDZ_NA = process.env.AUDYT_REPLY_TO ?? "pawel@fluxlab.pl";
const limitIp = utworzLimit();

const TRESC_ZGODY_ADRESY =
  "Zgadzam się na przesłanie wyniku na podany adres oraz na jedną wiadomość z poradami o e-Doręczeniach od FluxLab. Zgodę można wycofać jednym kliknięciem w link „Wypisz mnie” w wiadomości.";

type Status = "jest" | "brak" | "bez_krs" | "bledny_nip" | "nie_ma" | "blad";
type Wiersz = {
  nip: string;
  nazwa: string;
  krs: string;
  adres: string;
  status: Status;
  opis: string;
};

const OPIS: Record<Status, string> = {
  jest: "Adres jest w KRS",
  brak: "Brak adresu w KRS",
  bez_krs: "Brak numeru KRS (np. jednoosobowa działalność)",
  bledny_nip: "Błędny NIP",
  nie_ma: "Nie ma w wykazie podatników VAT",
  blad: "Rejestr nie odpowiedział",
};

async function sprawdz(nip: string): Promise<Wiersz> {
  const pusty = { nip, nazwa: "", krs: "", adres: "" };
  if (!nipPoprawny(nip))
    return { ...pusty, status: "bledny_nip", opis: OPIS.bledny_nip };
  for (let proba = 0; proba < 2; proba++) {
    try {
      const p = await podatnikPoNip(nip);
      if (!p) return { ...pusty, status: "nie_ma", opis: OPIS.nie_ma };
      if (!p.krs)
        return {
          ...pusty,
          nazwa: p.nazwa,
          status: "bez_krs",
          opis: OPIS.bez_krs,
        };
      const a = await adresEDoreczenKrs(p.krs);
      if (!a)
        return {
          ...pusty,
          nazwa: p.nazwa,
          krs: p.krs,
          status: "brak",
          opis: "Nie znaleziono odpisu w KRS",
        };
      return {
        nip,
        nazwa: p.nazwa,
        krs: p.krs,
        adres: a.adres ?? "",
        status: a.adres ? "jest" : "brak",
        opis: a.adres ? OPIS.jest : OPIS.brak,
      };
    } catch {
      await new Promise((r) => setTimeout(r, 800));
    }
  }
  return { ...pusty, status: "blad", opis: OPIS.blad };
}

/** Limit na adres e-mail trzymany w kliencie Stripe (jedyne trwałe miejsce dostępne ze strony). */
async function zajmijLimit(email: string): Promise<boolean> {
  const dzis = new Date().toISOString().slice(0, 10);
  const zapytanie = new URLSearchParams({
    query: `email:'${email.replace(/'/g, "")}' AND metadata['zrodlo']:'darmowy-adresy-edoreczen'`,
  });
  const znaleziono = await stripe(`customers/search?${zapytanie}`);
  const klient = znaleziono.data?.[0];
  if (!klient) {
    const p = new URLSearchParams({
      email,
      "metadata[zrodlo]": "darmowy-adresy-edoreczen",
      "metadata[dzien]": dzis,
      "metadata[ile]": "1",
    });
    await stripe("customers", p);
    return true;
  }
  const ile =
    klient.metadata?.dzien === dzis ? Number(klient.metadata?.ile ?? 0) : 0;
  if (ile >= MAX_LIST_NA_DOBE) return false;
  const p = new URLSearchParams({
    "metadata[dzien]": dzis,
    "metadata[ile]": String(ile + 1),
  });
  await stripe(`customers/${klient.id}`, p);
  return true;
}

function csv(wiersze: Wiersz[]): string {
  const k = (s: string) => `"${s.replace(/"/g, '""')}"`;
  const linie = [
    ["NIP", "Nazwa", "KRS", "Adres do e-Doręczeń", "Status"].map(k).join(";"),
  ];
  for (const w of wiersze)
    linie.push([w.nip, w.nazwa, w.krs, w.adres, w.opis].map(k).join(";"));
  return "﻿" + linie.join("\r\n") + "\r\n";
}

function mail(wiersze: Wiersz[], email: string) {
  const ile = (s: Status) => wiersze.filter((w) => w.status === s).length;
  const jest = ile("jest");
  const razem = wiersze.length;
  const podsumowanie = `Adres do e-Doręczeń ma ${jest} z ${razem} firm. Bez adresu w KRS: ${ile("brak")}. Bez numeru KRS: ${ile("bez_krs")}. Do sprawdzenia: ${ile("bledny_nip") + ile("nie_ma") + ile("blad")}.`;
  const komorka =
    "padding:8px 10px;border-top:1px solid #e5e7eb;font-size:13px;vertical-align:top";
  const rzedy = wiersze
    .map(
      (w) =>
        `<tr><td style="${komorka}"><b>${esc(w.nazwa || w.nip)}</b><br><span style="color:#6b7280">NIP ${w.nip}${w.krs ? ` · KRS ${w.krs}` : ""}</span></td><td style="${komorka};word-break:break-all">${w.adres ? `<b style="color:#047857">${esc(w.adres)}</b>` : `<span style="color:#b45309">${esc(w.opis)}</span>`}</td></tr>`,
    )
    .join("");
  const html = `<!doctype html><html lang="pl"><body style="margin:0;background:#f5f5fb;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#111827">
<div style="max-width:640px;margin:0 auto;padding:24px">
<p style="margin:0 0 4px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#4f46e5;font-weight:700">Adresy do e-Doręczeń</p>
<h1 style="margin:0 0 12px;font-size:22px;line-height:1.3">${esc(podsumowanie)}</h1>
<p style="margin:0 0 16px;font-size:14px;color:#374151">Pełna lista jest w załączonym pliku CSV, do otwarcia w Excelu. Dane pochodzą z odpisów aktualnych KRS i wykazu podatników VAT, stan na dziś.</p>
<table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #e5e7eb;border-radius:12px"><tbody>${rzedy}</tbody></table>
<p style="margin:16px 0 0;font-size:13px;color:#374151">Brak adresu w KRS nie oznacza kary dla firmy, ale urzędy doręczają wtedy pisma papierowo. Jednoosobowe działalności nie mają numeru KRS, a ich adresy do e-Doręczeń nie są w tym rejestrze.</p>
<p style="margin:20px 0 0;font-size:12px;color:#6b7280">FluxLab · <a href="${linkWypisu(email)}" style="color:#6b7280">Wypisz mnie</a></p>
</div></body></html>`;
  const tekst = `${podsumowanie}\n\n${wiersze.map((w) => `${w.nazwa || w.nip} (NIP ${w.nip}): ${w.adres || w.opis}`).join("\n")}\n\nWypisz mnie: ${linkWypisu(email)}`;
  return {
    temat: `Adresy do e-Doręczeń: ${jest} z ${razem} firm ma adres`,
    html,
    tekst,
  };
}

async function wyslijMail(email: string, wiersze: Wiersz[]): Promise<boolean> {
  const klucz = process.env.RESEND_API_KEY;
  if (!klucz || klucz.startsWith("re_placeholder")) return false;
  const m = mail(wiersze, email);
  try {
    const w = await new Resend(klucz).emails.send({
      from: FROM,
      to: email,
      replyTo: ODPOWIEDZ_NA,
      subject: m.temat,
      html: m.html,
      text: m.tekst,
      headers: naglowkiWypisu(email),
      attachments: [
        {
          filename: "adresy-do-edoreczen.csv",
          content: Buffer.from(csv(wiersze), "utf8"),
        },
      ],
    });
    return !w.error;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!originDozwolony(request.headers.get("origin"))) {
    return NextResponse.json(
      { error: "Niedozwolone źródło zapytania." },
      { status: 403 },
    );
  }
  if (limitIp(request)) {
    return NextResponse.json(
      { error: "Za dużo zapytań w ciągu minuty. Spróbuj za chwilę." },
      { status: 429 },
    );
  }
  let body: { email?: unknown; lista?: unknown; zgoda?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Nieprawidłowe zapytanie." },
      { status: 400 },
    );
  }
  const email = String(body.email ?? "")
    .trim()
    .toLowerCase()
    .slice(0, 120);
  if (!EMAIL_RX.test(email))
    return NextResponse.json(
      { error: "Podaj poprawny adres e-mail." },
      { status: 400 },
    );
  if (body.zgoda !== true)
    return NextResponse.json(
      { error: "Zaznacz zgodę na wysłanie wyniku." },
      { status: 400 },
    );
  const { nipy, odrzucone } = wyciagnijNipy(
    String(body.lista ?? "").slice(0, 20000),
  );
  if (!nipy.length) {
    return NextResponse.json(
      { error: "Nie znaleźliśmy w liście żadnego numeru NIP (10 cyfr)." },
      { status: 400 },
    );
  }
  if (nipy.length > MAX_NIP) {
    return NextResponse.json(
      {
        error: `Na raz sprawdzamy do ${MAX_NIP} numerów NIP, a w liście jest ${nipy.length}. Podziel ją na części.`,
      },
      { status: 400 },
    );
  }

  try {
    if (!(await zajmijLimit(email))) {
      return NextResponse.json(
        {
          error: `Z jednego adresu e-mail przyjmujemy ${MAX_LIST_NA_DOBE} listy na dobę. Spróbuj jutro.`,
        },
        { status: 429 },
      );
    }
  } catch (e) {
    console.error("adresy-edoreczen limit pominięty, Stripe niedostępny", e);
  }

  const zgoda = await zapiszZgode(
    {
      email,
      okazja: "adresy-do-edoreczen",
      szczegol: `${nipy.length} NIP`,
      zrodlo: "darmowe-narzedzie",
    },
    TRESC_ZGODY_ADRESY,
  );
  if (!zgoda) {
    return NextResponse.json(
      { error: "Nie udało się zapisać zgody, spróbuj za chwilę." },
      { status: 502 },
    );
  }

  const wiersze = await mapaRownolegla(nipy, 4, sprawdz);
  const wyslano = await wyslijMail(email, wiersze);
  return NextResponse.json({ wiersze, odrzucone, wyslano });
}
