/** Nr 59: newsletter z bloga. Kanał RSS/Atom klienta, odbiorcy w fl-dane z podwójnym potwierdzeniem, wysyłka nowych wpisów. */
import { randomBytes } from "node:crypto";
import { Resend } from "resend";

import { dane } from "@/lib/fl-dane";
import { esc, podpis, podpisZgodny } from "@/lib/fl-produkty";

export const PRODUKT_NL = "newsletter";
export const db = dane("newsletter");
export type Odbiorca = {
  email: string;
  status: "oczekuje" | "potwierdzony" | "wypisany";
  wyslano?: string;
};
export type Wpis = { id: string; tytul: string; link: string; opis: string };

const tajny = () => randomBytes(12).toString("base64url");
export const nowyId = tajny;
export const podpisOdb = (id: string) => podpis(PRODUKT_NL, id);
export const podpisOdbZgodny = (id: string, t: string) =>
  podpisZgodny(PRODUKT_NL, id, t);
export const linkOdb = (akcja: "potwierdz" | "wypis", id: string) =>
  `https://fluxlab.pl/api/newsletter-${akcja}?o=${id}&t=${podpisOdb(id)}`;

const tekst = (s: string) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

const znacznik = (blok: string, nazwa: string) =>
  blok.match(
    new RegExp(`<${nazwa}(?:\\s[^>]*)?>([\\s\\S]*?)</${nazwa}>`, "i"),
  )?.[1] ?? "";

export function parsujKanal(xml: string): Wpis[] {
  const bloki =
    xml.match(/<item[\s>][\s\S]*?<\/item>|<entry[\s>][\s\S]*?<\/entry>/gi) ??
    [];
  const wpisy: Wpis[] = [];
  for (const b of bloki) {
    const tytul = tekst(znacznik(b, "title"));
    const link = (
      b.match(/<link[^>]*href=["']([^"']+)["']/i)?.[1] ??
      tekst(znacznik(b, "link"))
    ).trim();
    const id = tekst(znacznik(b, "guid") || znacznik(b, "id")) || link;
    const opis = tekst(
      znacznik(b, "description") ||
        znacznik(b, "summary") ||
        znacznik(b, "content:encoded") ||
        znacznik(b, "content"),
    ).slice(0, 320);
    if (tytul && /^https?:\/\//.test(link) && id)
      wpisy.push({
        id: id.slice(0, 300),
        tytul: tytul.slice(0, 200),
        link: link.slice(0, 500),
        opis,
      });
  }
  return wpisy;
}

/** Adres kanału musi być publicznym http(s); adresów lokalnych i IP nie pobieramy. */
export function adresKanalu(s: string): string | null {
  const w =
    s.match(/https?:\/\/[^\s,;]+/i)?.[0] ??
    (s.match(/[a-z0-9.-]+\.[a-z]{2,}[^\s,;]*/i)?.[0]
      ? `https://${s.match(/[a-z0-9.-]+\.[a-z]{2,}[^\s,;]*/i)![0]}`
      : "");
  try {
    const u = new URL(w);
    const h = u.hostname.toLowerCase();
    if (
      !/^https?:$/.test(u.protocol) ||
      h === "localhost" ||
      /^[\d.]+$/.test(h) ||
      h.includes(":") ||
      h.endsWith(".local") ||
      h.endsWith(".internal") ||
      !h.includes(".")
    )
      return null;
    return u.toString();
  } catch {
    return null;
  }
}

export async function pobierzKanal(url: string): Promise<Wpis[]> {
  const r = await fetch(url, {
    headers: {
      "user-agent": "FluxlabNewsletter/1.0",
      accept:
        "application/rss+xml, application/atom+xml, application/xml, text/xml",
    },
    signal: AbortSignal.timeout(10000),
    redirect: "follow",
  });
  if (!r.ok) throw new Error(`kanał ${r.status}`);
  const xml = (await r.text()).slice(0, 2_000_000);
  return parsujKanal(xml);
}

const FROM_ADRES = "formularz@fluxlab.pl";
const nazwaNadawcy = (n: string) =>
  `${n.replace(/[<>"\r\n]/g, "").slice(0, 60) || "Newsletter"} przez Fluxlab`;

export async function wyslijNl(o: {
  nazwa: string;
  do: string;
  temat: string;
  html: string;
  tekst: string;
  wypis?: string;
  replyTo?: string;
}): Promise<boolean> {
  const klucz = process.env.RESEND_API_KEY;
  if (!klucz) return false;
  try {
    const w = await new Resend(klucz).emails.send({
      from: `${nazwaNadawcy(o.nazwa)} <${FROM_ADRES}>`,
      to: o.do,
      replyTo: o.replyTo ?? process.env.AUDYT_REPLY_TO ?? "pawel@fluxlab.pl",
      subject: o.temat,
      html: o.html,
      text: o.tekst,
      ...(o.wypis
        ? {
            headers: {
              "List-Unsubscribe": `<${o.wypis}>`,
              "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
            },
          }
        : {}),
    });
    return !w.error;
  } catch {
    return false;
  }
}

const RAMKA = (
  nazwa: string,
  tresc: string,
  stopka: string,
) => `<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:#f3f4f6;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#111827">
<div style="max-width:560px;margin:0 auto;padding:16px"><div style="background:#fff;border-radius:16px;padding:24px 20px">
<p style="margin:0 0 12px;font-size:13px;color:#6b7280">${esc(nazwa)}</p>${tresc}</div>
<p style="margin:16px 8px;font-size:12px;line-height:1.5;color:#6b7280">${stopka}</p></div></body></html>`;

export function mailPotwierdzenie(nazwa: string, id: string) {
  const l = linkOdb("potwierdz", id);
  return {
    temat: `Potwierdź zapis na newsletter: ${nazwa}`,
    html: RAMKA(
      nazwa,
      `<h1 style="margin:0 0 12px;font-size:20px">Potwierdź zapis</h1><p style="font-size:15px;line-height:1.55">Ktoś (mamy nadzieję, że Ty) zapisał ten adres na newsletter „${esc(nazwa)}”. Dostaniesz maila, gdy pojawi się nowy wpis.</p><p><a href="${l}" style="display:inline-block;background:#0b57d0;color:#fff;text-decoration:none;padding:12px 18px;border-radius:10px;font-weight:600">Potwierdź zapis</a></p>`,
      "Jeśli to nie Ty, zignoruj tę wiadomość: bez kliknięcia nic nie wyślemy. Wysyłkę obsługuje Fluxlab.",
    ),
    tekst: `Potwierdź zapis na newsletter „${nazwa}”: ${l}\nJeśli to nie Ty, zignoruj tę wiadomość.`,
  };
}

export function mailWpis(nazwa: string, w: Wpis, idOdb: string) {
  const wyp = linkOdb("wypis", idOdb);
  return {
    temat: w.tytul,
    wypis: wyp,
    html: RAMKA(
      nazwa,
      `<h1 style="margin:0 0 12px;font-size:20px;line-height:1.3">${esc(w.tytul)}</h1>${w.opis ? `<p style="font-size:15px;line-height:1.55">${esc(w.opis)}${w.opis.length >= 320 ? "…" : ""}</p>` : ""}<p><a href="${esc(w.link)}" style="display:inline-block;background:#0b57d0;color:#fff;text-decoration:none;padding:12px 18px;border-radius:10px;font-weight:600">Czytaj cały wpis</a></p>`,
      `Dostajesz tę wiadomość, bo zapisałeś(-aś) się na newsletter „${esc(nazwa)}”. <a href="${wyp}">Wypisz się</a>. Wysyłkę obsługuje Fluxlab.`,
    ),
    tekst: `${w.tytul}\n\n${w.opis}\n\nCzytaj: ${w.link}\n\nWypisz się: ${wyp}`,
  };
}
