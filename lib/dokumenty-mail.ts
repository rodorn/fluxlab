import nodemailer from "nodemailer";
import { Resend } from "resend";

const FROM = process.env.RESEND_FROM_FORMULARZ ?? "Fluxlab <formularz@fluxlab.pl>";
const ODPOWIEDZ_NA = process.env.AUDYT_REPLY_TO ?? "pawel@fluxlab.pl";

export type Zalacznik = { filename: string; content: Buffer };

export function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Mail z wynikiem produktu dla klienta, opcjonalnie z załącznikami. */
export async function wyslijWynik(
  to: string,
  temat: string,
  html: string,
  tekst: string,
  zalaczniki: Zalacznik[] = [],
): Promise<boolean> {
  const klucz = process.env.RESEND_API_KEY;
  if (klucz && !klucz.startsWith("re_placeholder")) {
    try {
      const w = await new Resend(klucz).emails.send({
        from: FROM,
        to,
        replyTo: ODPOWIEDZ_NA,
        subject: temat,
        html,
        text: tekst,
        attachments: zalaczniki,
      });
      if (!w.error) return true;
      console.error("[dokumenty-mail] resend", w.error);
    } catch (e) {
      console.error("[dokumenty-mail] resend", e);
    }
  }
  const host = process.env.SMTP_HOST;
  if (!host) return false;
  try {
    const t = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: Number(process.env.SMTP_PORT ?? 465) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await t.sendMail({ from: FROM, to, replyTo: ODPOWIEDZ_NA, subject: temat, html, text: tekst, attachments: zalaczniki });
    return true;
  } catch (e) {
    console.error("[dokumenty-mail] smtp", e);
    return false;
  }
}

/** Obudowa maila w stylu raportów Fluxlab: wąska kolumna, czytelna na telefonie. */
export function ramkaMaila(tytul: string, tresc: string): string {
  return `<!doctype html><html lang="pl"><body style="margin:0;background:#f4f4f5;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#111827">
<div style="max-width:640px;margin:0 auto;padding:24px 16px">
<div style="background:#fff;border-radius:12px;padding:24px;line-height:1.55;font-size:15px">
<h1 style="font-size:20px;line-height:1.3;margin:0 0 16px">${esc(tytul)}</h1>
${tresc}
</div>
<p style="font-size:12px;color:#6b7280;margin:16px 4px 0">Fluxlab, fluxlab.pl. Odpowiedz na tę wiadomość, jeśli coś jest nie tak.</p>
</div></body></html>`;
}
