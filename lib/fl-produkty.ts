/**
 * Wspólne klocki produktów samoobsługowych: zapis darmowego subskrybenta jako
 * Customer w Stripe (metadata fl_produkt, fl_aktywna), wypis jednym kliknięciem
 * i wysyłka maila przez Resend. Stripe jest bazą, więc nic nie ginie przy
 * restarcie funkcji i worker na VPS widzi to samo co strona.
 */
import { createHmac, timingSafeEqual } from "crypto";
import { Resend } from "resend";

import { stripe } from "@/lib/stripe";

export type Subskrybent = { id: string; email: string; meta: Record<string, string> };

const FROM = process.env.RESEND_FROM_FORMULARZ ?? "Fluxlab <formularz@fluxlab.pl>";
const REPLY = process.env.AUDYT_REPLY_TO ?? "pawel@fluxlab.pl";

export const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const mapuj = (c: { id: string; email: string; metadata: Record<string, string> }): Subskrybent => ({
  id: c.id,
  email: c.email,
  meta: c.metadata ?? {},
});

export async function znajdz(produkt: string, email: string): Promise<Subskrybent | null> {
  const lista = await stripe(`customers?email=${encodeURIComponent(email)}&limit=100`);
  const c = (lista.data as { id: string; email: string; metadata: Record<string, string> }[]).find(
    (x) => x.metadata?.fl_produkt === produkt,
  );
  return c ? mapuj(c) : null;
}

export async function zapisz(produkt: string, email: string, meta: Record<string, string> = {}) {
  const p = new URLSearchParams({ email });
  p.set("metadata[fl_produkt]", produkt);
  p.set("metadata[fl_aktywna]", "1");
  p.set("metadata[fl_od]", new Date().toISOString());
  for (const [k, v] of Object.entries(meta)) p.set(`metadata[${k}]`, v);
  return mapuj(await stripe("customers", p));
}

export async function ustaw(id: string, meta: Record<string, string>) {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(meta)) p.set(`metadata[${k}]`, v);
  await stripe(`customers/${id}`, p);
}

export async function aktywni(produkt: string): Promise<Subskrybent[]> {
  const wynik: Subskrybent[] = [];
  let strona = "";
  for (let i = 0; i < 50; i++) {
    const q = encodeURIComponent(`metadata['fl_produkt']:'${produkt}' AND metadata['fl_aktywna']:'1'`);
    const r = await stripe(`customers/search?query=${q}&limit=100${strona ? `&page=${strona}` : ""}`);
    for (const c of r.data) wynik.push(mapuj(c));
    if (!r.has_more) break;
    strona = r.next_page;
  }
  return wynik;
}

const sekret = () => process.env.AUTOMAT_SEKRET ?? "";

/** Trasy wołane cronem z VPS: nagłówek x-automat musi równać się AUTOMAT_SEKRET. */
export function automatDozwolony(req: Request): boolean {
  const s = sekret();
  const n = req.headers.get("x-automat") ?? "";
  return s.length > 20 && n.length === s.length && timingSafeEqual(Buffer.from(n), Buffer.from(s));
}

export function podpis(produkt: string, email: string): string {
  return createHmac("sha256", sekret()).update(`fl:${produkt}:${email.toLowerCase()}`).digest("base64url").slice(0, 22);
}

export function podpisZgodny(produkt: string, email: string, t: string): boolean {
  if (!sekret() || !t) return false;
  const a = Buffer.from(podpis(produkt, email));
  const b = Buffer.from(t);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function linkWypisu(produkt: string, email: string): string {
  const e = Buffer.from(email.toLowerCase()).toString("base64url");
  return `https://fluxlab.pl/api/produkt-wypis?p=${produkt}&e=${e}&t=${podpis(produkt, email)}`;
}

export const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function wyslijMail(o: {
  do: string;
  temat: string;
  html: string;
  tekst: string;
  wypis?: string;
  kopia?: string;
}): Promise<boolean> {
  const klucz = process.env.RESEND_API_KEY;
  if (!klucz) return false;
  try {
    const w = await new Resend(klucz).emails.send({
      from: FROM,
      to: o.do,
      replyTo: REPLY,
      subject: o.temat,
      html: o.html,
      text: o.tekst,
      ...(o.kopia ? { bcc: o.kopia } : {}),
      ...(o.wypis
        ? { headers: { "List-Unsubscribe": `<${o.wypis}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" } }
        : {}),
    });
    return !w.error;
  } catch {
    return false;
  }
}

/** Ramka maila: jedna kolumna 560 px, czytelna na telefonie. */
export function ramkaMaila(o: { naglowek: string; tresc: string; stopka: string }): string {
  return `<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:#f3f4f6;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#111827">
<div style="max-width:560px;margin:0 auto;padding:16px">
<div style="background:#fff;border-radius:16px;padding:24px 20px">
<p style="margin:0 0 4px;font-size:13px;color:#6b7280">Fluxlab</p>
<h1 style="margin:0 0 16px;font-size:22px;line-height:1.25">${o.naglowek}</h1>
${o.tresc}
</div>
<p style="margin:16px 8px;font-size:12px;line-height:1.5;color:#6b7280">${o.stopka}</p>
</div></body></html>`;
}
