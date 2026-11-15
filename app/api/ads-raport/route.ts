import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { stripe } from "@/lib/stripe";
import { bezKonwersji, mailAlert, mailTygodniowy, poprawne, tokenPoprawny } from "@/lib/adsRaport";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const FROM = process.env.RESEND_FROM_PRODUKTY ?? "Fluxlab <produkty@fluxlab.pl>";
const AKTYWNE = new Set(["active", "trialing", "past_due"]);

function automat(req: Request) {
  const s = process.env.AUTOMAT_SEKRET ?? "";
  const n = req.headers.get("x-automat") ?? "";
  return s.length > 20 && n.length === s.length && timingSafeEqual(Buffer.from(n), Buffer.from(s));
}

export async function POST(req: Request) {
  const sekret = process.env.AUTOMAT_SEKRET ?? "";
  const tresc = await req.text();
  if (tresc.length > 400_000) return NextResponse.json({ ok: false, powod: "za duży ładunek" }, { status: 413 });
  let d: any;
  try {
    d = JSON.parse(tresc);
  } catch {
    return NextResponse.json({ ok: false, powod: "to nie jest JSON" }, { status: 400 });
  }
  if (!poprawne(d)) return NextResponse.json({ ok: false, powod: "nieprawidłowe dane" }, { status: 400 });
  if (!tokenPoprawny(d.sub, d.token, sekret)) return NextResponse.json({ ok: false, powod: "zły token" }, { status: 401 });

  const podglad = new URL(req.url).searchParams.get("podglad") === "1" && automat(req);
  if (d.tryb === "dzienny" && d.nowe.length === 0) return NextResponse.json({ ok: true, wyslano: false, powod: "brak alertów" });
  if (d.tryb === "dzienny" && bezKonwersji(d)) return NextResponse.json({ ok: true, wyslano: false, powod: "konto nie zapisuje konwersji" });

  const mail = d.tryb === "tygodniowy" ? mailTygodniowy(d) : mailAlert(d);
  if (podglad) return NextResponse.json({ ok: true, wyslano: false, temat: mail.temat, html: mail.html });

  let email: string | null = null;
  try {
    const sub = await stripe(`subscriptions/${d.sub}?expand[]=customer`);
    if (!AKTYWNE.has(sub.status)) return NextResponse.json({ ok: false, powod: "subskrypcja nieaktywna" }, { status: 402 });
    email = sub.customer?.email ?? null;
  } catch {
    return NextResponse.json({ ok: false, powod: "nie znaleziono subskrypcji" }, { status: 404 });
  }
  if (!email) return NextResponse.json({ ok: false, powod: "brak adresu e-mail" }, { status: 422 });

  const dzien = new Date().toISOString().slice(0, 10);
  const r = await new Resend(process.env.RESEND_API_KEY).emails.send(
    { from: FROM, to: email, replyTo: "pawel@fluxlab.pl", subject: mail.temat.slice(0, 200), html: mail.html },
    { idempotencyKey: `ads-${d.sub}-${d.tryb}-${dzien}` },
  );
  if (r.error) return NextResponse.json({ ok: false, powod: "nie udało się wysłać maila" }, { status: 502 });
  return NextResponse.json({ ok: true, wyslano: true });
}
