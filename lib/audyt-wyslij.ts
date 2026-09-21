/**
 * Wysyłka raportu i zapis zgody.
 *
 * Trzy rzeczy dzieją się tu zawsze w tej samej kolejności i to nie jest
 * przypadek: najpierw zapisujemy zgodę, potem wysyłamy. Gdyby było odwrotnie,
 * przy awarii zapisu zostałby wysłany mail, na który nie mamy dowodu zgody.
 */

import nodemailer from "nodemailer";
import { Resend } from "resend";

import { zlozRaportHtml, zlozRaportTekst, type DaneRaportu } from "./audyt-mail";

const DO_WLASCICIELA = process.env.AUDYT_KOPIA_DO ?? "iwanekpawel55@gmail.com";
const FROM =
  process.env.RESEND_FROM_FORMULARZ ?? "Fluxlab <formularz@fluxlab.pl>";

/** Treść zgody zapisywana razem z adresem. Zmiana tego tekstu to nowa wersja. */
export const TRESC_ZGODY =
  "Zgadzam się na przesłanie raportu z audytu na podany adres i na kontakt " +
  "w sprawie jego wyników. Zgodę mogę wycofać w każdej chwili, odpisując na " +
  "wiadomość.";

async function przezResend(
  to: string,
  temat: string,
  html: string,
  tekst: string,
): Promise<boolean> {
  const klucz = process.env.RESEND_API_KEY;
  if (!klucz || klucz.startsWith("re_placeholder")) return false;
  try {
    const wynik = await new Resend(klucz).emails.send({
      from: FROM,
      to,
      subject: temat,
      html,
      text: tekst,
    });
    return !wynik.error;
  } catch {
    return false;
  }
}

async function przezSmtp(
  to: string,
  temat: string,
  html: string,
  tekst: string,
): Promise<boolean> {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return false;
  try {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: true,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transport.sendMail({
      from: process.env.SMTP_FROM ?? SMTP_USER,
      to,
      subject: temat,
      html,
      text: tekst,
    });
    return true;
  } catch {
    return false;
  }
}

/** Najpierw Resend, a gdy odmówi, zwykłe SMTP. Jedna droga to jedna awaria. */
async function wyslij(
  to: string,
  temat: string,
  html: string,
  tekst: string,
): Promise<boolean> {
  return (await przezResend(to, temat, html, tekst)) || przezSmtp(to, temat, html, tekst);
}

export type WpisZgody = {
  email: string;
  okazja: string;
  szczegol: string;
  zrodlo?: string;
};

/**
 * Zgoda ląduje w zbiorze na serwerze, nie w skrzynce pocztowej. Mail można
 * skasować albo przeoczyć, a przy pytaniu, na co dokładnie ktoś się zgodził,
 * potrzebny jest zapis z datą i treścią.
 */
export async function zapiszZgode(w: WpisZgody): Promise<boolean> {
  // Ta sama zmienna, z której korzysta licznik wizyt. Druga nazwa na ten
  // sam kolektor skończyłaby się tym, że jedna z nich kiedyś nie zostanie
  // ustawiona i zgody po cichu przestaną się zapisywać.
  const adres = process.env.RUCH_URL ?? "http://146.59.80.185:8087/wizyta";
  const sekret = process.env.RUCH_SEKRET;
  try {
    const odp = await fetch(adres.replace(/\/wizyta$/, "/zgoda"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(sekret ? { "X-Sekret": sekret } : {}),
      },
      body: JSON.stringify({ ...w, tresc_zgody: TRESC_ZGODY }),
      signal: AbortSignal.timeout(6000),
    });
    return odp.ok;
  } catch {
    return false;
  }
}

export async function wyslijDoKlienta(
  email: string,
  dane: DaneRaportu,
): Promise<boolean> {
  return wyslij(
    email,
    `Audyt ${dane.domena}: ocena ${dane.punkty}/100, ${dane.ustalenia.length} spraw do poprawy`,
    zlozRaportHtml(dane, false),
    zlozRaportTekst(dane),
  );
}

/**
 * Kopia właściciela idzie po każdym audycie, także wtedy, gdy nikt nie
 * poprosił o maila i nie zostawił adresu. Powód jest prosty: to jedyny
 * sposób, żeby wiedzieć, czyje strony ludzie tu sprawdzają i czy narzędzie
 * w ogóle jest używane.
 */
export async function wyslijKopie(
  dane: DaneRaportu,
  kontekst: { email?: string; zgoda?: boolean; zrodlo?: string },
): Promise<boolean> {
  const kto = kontekst.email
    ? `${kontekst.email}${kontekst.zgoda ? " (zgoda marketingowa TAK)" : " (bez zgody)"}`
    : "nie zostawił adresu";
  const naglowek = `<div style="background:#111827;color:#f9fafb;padding:12px 16px;font-family:monospace;font-size:13px">
    kontakt: ${kto}<br>źródło: ${kontekst.zrodlo ?? "nieznane"}
  </div>`;
  return wyslij(
    DO_WLASCICIELA,
    `[audyt] ${dane.domena} · ${dane.punkty}/100 · ${kontekst.email ? "LEAD" : "anonim"}`,
    naglowek + zlozRaportHtml(dane, true),
    `Kontakt: ${kto}\nŹródło: ${kontekst.zrodlo ?? "nieznane"}\n\n` + zlozRaportTekst(dane),
  );
}
