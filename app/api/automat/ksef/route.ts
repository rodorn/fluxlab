import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ramkaMaila } from "@/lib/dokumenty-mail";
import { dane } from "@/lib/fl-dane";
import { automatDozwolony } from "@/lib/fl-produkty";
import { type Dostep, PRODUKTY_KSEF } from "@/lib/ksef-dostep";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

const FROM = process.env.RESEND_FROM_FORMULARZ ?? "Fluxlab <formularz@fluxlab.pl>";
const AKTYWNE = ["active", "trialing", "past_due"];
const db = () => dane("ksef");

async function zadania() {
  const lista = await db().lista<Dostep>("dostepy", { limit: 500 });
  const wynik: Record<string, unknown>[] = [];
  for (const d of lista) {
    const r = d.dane;
    let aktywna = false;
    try {
      const sub = r.subskrypcja ? await stripe(`subscriptions/${r.subskrypcja}`) : null;
      aktywna = !!sub && AKTYWNE.includes(sub.status);
    } catch {
      continue;
    }
    if (!aktywna) {
      await db().usun("dostepy", d.id);
      continue;
    }
    wynik.push({
      id: d.id,
      utworzono: d.utworzono,
      nip: r.nip,
      blob: r.blob,
      srodowisko: r.srodowisko,
      email: r.email,
      biuro: r.biuro,
      produkt: r.produkt ?? "paczka-biuro",
      status: r.status,
      wyslano: r.wyslano ?? {},
      blad_mail: r.blad_mail ?? "",
    });
  }
  return wynik;
}

async function przypomnienia() {
  const od = Math.floor(Date.now() / 1000) - 3 * 86400;
  const sesje = await stripe(`checkout/sessions?limit=100&created[gte]=${od}`);
  const wyslane: string[] = [];
  for (const s of sesje.data as any[]) {
    const prod = String(s.metadata?.produkt ?? "");
    if (s.status !== "complete" || !PRODUKTY_KSEF.includes(prod)) continue;
    if (s.metadata?.ksef_przyp || Date.now() / 1000 - s.created < 3600) continue;
    if (await db().pobierz("dostepy", s.id)) continue;
    const email = s.customer_details?.email;
    if (!email) continue;
    const link = `https://fluxlab.pl/ksef-dostep?sesja=${s.id}`;
    const codziennie = prod === "faktury-kosztowe";
    const kontrola = prod === "kontrola-faktur";
    const w = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: FROM,
      to: email,
      replyTo: "pawel@fluxlab.pl",
      subject: kontrola ? "Dokończ uruchomienie kontroli faktur kosztowych" : codziennie ? "Dokończ uruchomienie faktur kosztowych z KSeF" : "Dokończ uruchomienie paczki miesięcznej z KSeF",
      html: ramkaMaila(
        "Został jeden krok",
        `<p style="margin:0 0 12px">Płatność przyszła, ale nie podałeś jeszcze NIP-u i tokenu KSeF, więc nie mamy skąd pobrać faktur.</p><p style="margin:0"><a href="${link}">Podaj dane firmy</a>. Zajmuje to minutę, a pierwsze faktury przyjdą na maila w ciągu godziny.</p>`,
      ),
    });
    if (w.error) continue;
    await stripe(`checkout/sessions/${s.id}`, new URLSearchParams({ "metadata[ksef_przyp]": new Date().toISOString() }));
    wyslane.push(s.id);
  }
  return wyslane;
}

export async function GET(req: Request) {
  if (!automatDozwolony(req)) return NextResponse.json({ error: "x-automat" }, { status: 401 });
  const akcja = new URL(req.url).searchParams.get("akcja");
  if (akcja === "zadania") return NextResponse.json({ zadania: await zadania() });
  if (akcja === "przypomnienia") return NextResponse.json({ wyslano: await przypomnienia() });
  return NextResponse.json({ error: "akcja: zadania | przypomnienia" }, { status: 400 });
}

export async function POST(req: Request) {
  if (!automatDozwolony(req)) return NextResponse.json({ error: "x-automat" }, { status: 401 });
  const d = await req.json().catch(() => ({}));
  const id = String(d.id ?? "");
  const rekord = await db().pobierz<Dostep>("dostepy", id);
  if (!rekord) return NextResponse.json({ error: "brak zamówienia" }, { status: 404 });
  const r = rekord.dane;

  if (d.akcja === "stan") {
    const zmiana: Record<string, unknown> = {};
    if (["nowy", "aktywny", "blad_tokenu"].includes(d.status)) zmiana.status = d.status;
    if (typeof d.blad_mail === "string") zmiana.blad_mail = d.blad_mail.slice(0, 40);
    if (d.wyslano && typeof d.wyslano === "object") zmiana.wyslano = { ...(r.wyslano ?? {}), ...d.wyslano };
    await db().zmien("dostepy", id, { dane: zmiana });
    return NextResponse.json({ ok: true });
  }

  if (d.akcja === "mail") {
    if (typeof d.temat !== "string" || typeof d.tytul !== "string" || typeof d.tresc !== "string")
      return NextResponse.json({ error: "temat, tytul, tresc" }, { status: 400 });
    const zalaczniki = Array.isArray(d.zalaczniki)
      ? d.zalaczniki.slice(0, 5).map((z: any) => ({ filename: String(z.nazwa), content: Buffer.from(String(z.base64), "base64") }))
      : [];
    const biuro = d.bez_biura ? "" : r.biuro;
    const w = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: FROM,
      to: biuro || r.email,
      ...(biuro ? { cc: r.email } : {}),
      replyTo: "pawel@fluxlab.pl",
      subject: d.temat.slice(0, 200),
      html: ramkaMaila(d.tytul, d.tresc),
      ...(zalaczniki.length ? { attachments: zalaczniki } : {}),
    });
    if (w.error) return NextResponse.json({ error: w.error.message }, { status: 502 });
    return NextResponse.json({ ok: true, do: biuro || r.email, resend: w.data?.id });
  }

  return NextResponse.json({ error: "akcja: stan | mail" }, { status: 400 });
}
