import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ramkaMaila } from "@/lib/dokumenty-mail";
import { dane } from "@/lib/fl-dane";
import { automatDozwolony } from "@/lib/fl-produkty";
import { type Filtr, type Firma, PRODUKT_NOWE_FIRMY } from "@/lib/nowe-firmy";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

const FROM =
  process.env.RESEND_FROM_FORMULARZ ?? "Fluxlab <formularz@fluxlab.pl>";
const AKTYWNE = ["active", "trialing", "past_due"];
const db = () => dane("nowefirmy");
const TRZYMAJ_DNI = 60;

async function zadania() {
  const lista = await db().lista<Filtr>("filtry", { limit: 500 });
  const wynik: Filtr[] = [];
  for (const d of lista) {
    let aktywna = false;
    try {
      const sub = d.dane.subskrypcja
        ? await stripe(`subscriptions/${d.dane.subskrypcja}`)
        : null;
      aktywna = !!sub && AKTYWNE.includes(sub.status);
    } catch {
      continue;
    }
    if (!aktywna) {
      await db().usunKlucz(d.id);
      continue;
    }
    wynik.push({ ...d.dane, sesja: d.id });
  }
  return wynik;
}

async function przypomnienia() {
  const od = Math.floor(Date.now() / 1000) - 3 * 86400;
  const sesje = await stripe(`checkout/sessions?limit=100&created[gte]=${od}`);
  const wyslane: string[] = [];
  for (const s of sesje.data as any[]) {
    if (
      s.status !== "complete" ||
      s.metadata?.produkt !== PRODUKT_NOWE_FIRMY ||
      s.metadata?.nf_przyp ||
      Date.now() / 1000 - s.created < 3600
    )
      continue;
    if (await db().pobierz("filtry", s.id)) continue;
    const email = s.customer_details?.email;
    if (!email) continue;
    const w = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: FROM,
      to: email,
      replyTo: "pawel@fluxlab.pl",
      subject: "Wybierz branżę i region, żeby ruszyła lista nowych spółek",
      html: ramkaMaila(
        "Został jeden krok",
        `<p style="margin:0 0 12px">Płatność przyszła, ale nie wybrałeś jeszcze branży (PKD) ani województwa, więc nie wiemy, które nowe spółki wysyłać.</p><p style="margin:0"><a href="https://fluxlab.pl/nowe-firmy-dostep?sesja=${s.id}">Wybierz branżę i region</a>. Pierwszą listę wyślemy na maila w ciągu godziny.</p>`,
      ),
    });
    if (w.error) continue;
    await stripe(
      `checkout/sessions/${s.id}`,
      new URLSearchParams({ "metadata[nf_przyp]": new Date().toISOString() }),
    );
    wyslane.push(s.id);
  }
  return wyslane;
}

export async function GET(req: Request) {
  if (!automatDozwolony(req))
    return NextResponse.json({ error: "x-automat" }, { status: 401 });
  const u = new URL(req.url);
  const akcja = u.searchParams.get("akcja");
  if (akcja === "zadania")
    return NextResponse.json({ zadania: await zadania() });
  if (akcja === "przypomnienia")
    return NextResponse.json({ wyslano: await przypomnienia() });
  if (akcja === "stan") {
    const s = await db().pobierz("stan", "skan");
    return NextResponse.json({ stan: s?.dane ?? null });
  }
  if (akcja === "firmy") {
    let od = u.searchParams.get("od") ?? "1970-01-01T00:00:00Z";
    const wszystkie = new Map<string, Firma & { dodano: string }>();
    for (let i = 0; i < 8; i++) {
      const lista = await db().lista<Firma>("firmy", {
        od,
        limit: 1000,
        kolejnosc: "asc",
      });
      for (const f of lista)
        wszystkie.set(f.id, { ...f.dane, dodano: f.utworzono });
      if (lista.length < 1000) break;
      od = lista[lista.length - 1].utworzono;
    }
    return NextResponse.json({ firmy: [...wszystkie.values()] });
  }
  return NextResponse.json(
    { error: "akcja: zadania | przypomnienia | stan | firmy" },
    { status: 400 },
  );
}

export async function POST(req: Request) {
  if (!automatDozwolony(req))
    return NextResponse.json({ error: "x-automat" }, { status: 401 });
  const d = await req.json().catch(() => ({}));

  if (d.akcja === "stan") {
    await db().ustaw("stan", "skan", { dane: d.stan ?? {} });
    return NextResponse.json({ ok: true });
  }

  if (d.akcja === "firmy") {
    const lista: Firma[] = Array.isArray(d.firmy) ? d.firmy.slice(0, 500) : [];
    for (const f of lista) {
      if (!/^\d{10}$/.test(String(f.krs))) continue;
      await db().ustaw("firmy", f.krs, { klucz: "wspolne", dane: f });
    }
    const przed = new Date(Date.now() - TRZYMAJ_DNI * 86400_000).toISOString();
    await db().usunPrzed("firmy", przed);
    return NextResponse.json({ ok: true, zapisano: lista.length });
  }

  const id = String(d.id ?? "");
  const rekord = await db().pobierz<Filtr>("filtry", id);
  if (!rekord)
    return NextResponse.json({ error: "brak zamówienia" }, { status: 404 });

  if (d.akcja === "wyslano") {
    await db().zmien("filtry", id, {
      dane: { ostatni_mail: String(d.kiedy ?? new Date().toISOString()) },
    });
    return NextResponse.json({ ok: true });
  }

  if (d.akcja === "mail") {
    if (
      typeof d.temat !== "string" ||
      typeof d.tytul !== "string" ||
      typeof d.tresc !== "string"
    )
      return NextResponse.json(
        { error: "temat, tytul, tresc" },
        { status: 400 },
      );
    const zalaczniki = Array.isArray(d.zalaczniki)
      ? d.zalaczniki.slice(0, 2).map((z: any) => ({
          filename: String(z.nazwa),
          content: Buffer.from(String(z.base64), "base64"),
        }))
      : [];
    const w = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: FROM,
      to: rekord.dane.email,
      replyTo: "pawel@fluxlab.pl",
      subject: d.temat.slice(0, 200),
      html: ramkaMaila(d.tytul, d.tresc),
      ...(zalaczniki.length ? { attachments: zalaczniki } : {}),
    });
    if (w.error)
      return NextResponse.json({ error: w.error.message }, { status: 502 });
    return NextResponse.json({ ok: true, resend: w.data?.id });
  }

  return NextResponse.json(
    { error: "akcja: stan | firmy | wyslano | mail" },
    { status: 400 },
  );
}
