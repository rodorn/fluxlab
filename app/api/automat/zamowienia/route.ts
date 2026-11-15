import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { stripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const FROM = process.env.RESEND_FROM_FORMULARZ ?? "Fluxlab <formularz@fluxlab.pl>";
const ODPOWIEDZ_NA = "pawel@fluxlab.pl";

function dozwolone(req: Request) {
  const s = process.env.AUTOMAT_SEKRET ?? "";
  const n = req.headers.get("x-automat") ?? "";
  return s.length > 20 && n.length === s.length && timingSafeEqual(Buffer.from(n), Buffer.from(s));
}

const znacznik = (prefiks: string) => `przyjete_${prefiks.replace(/[^a-z0-9]/gi, "").slice(0, 30)}`;
const produkty = (md: Record<string, string> | null) =>
  (md?.produkt ?? "").split(",").map((x) => x.trim()).filter(Boolean);
const pole = (s: any, klucz: string) =>
  (s.custom_fields ?? []).find((f: any) => f.key === klucz)?.text?.value ?? "";

const AKTYWNE = new Set(["active", "trialing", "past_due"]);

async function zamowienie(s: any, zSubskrypcja: boolean) {
  const cd = s.customer_details ?? {};
  let subskrypcja_aktywna: boolean | null = null;
  if (zSubskrypcja && s.subscription) {
    const sub = await stripe(`subscriptions/${s.subscription}`);
    subskrypcja_aktywna = AKTYWNE.has(sub.status);
  }
  return {
    id: s.id,
    produkt: produkty(s.metadata),
    tryb: s.mode,
    email: cd.email ?? null,
    nazwa: cd.name ?? null,
    nip: (cd.tax_ids ?? []).map((t: any) => t.value),
    dane: pole(s, "dane"),
    konkurenci: pole(s, "konkurenci"),
    kwota: s.amount_total,
    subskrypcja: s.subscription ?? null,
    subskrypcja_aktywna,
    test: s.metadata?.zrodlo === "test",
    utworzono: new Date(s.created * 1000).toISOString(),
  };
}

export async function GET(req: Request) {
  if (!dozwolone(req)) return NextResponse.json({ error: "brak dostępu" }, { status: 401 });
  const u = new URL(req.url);

  const subs = u.searchParams.get("subskrypcje");
  if (subs) {
    const wynik: Record<string, { status: string; aktywna: boolean }> = {};
    for (const id of subs.split(",").map((x) => x.trim()).filter(Boolean).slice(0, 50)) {
      const sub = await stripe(`subscriptions/${encodeURIComponent(id)}`);
      wynik[id] = { status: sub.status, aktywna: AKTYWNE.has(sub.status) };
    }
    return NextResponse.json({ subskrypcje: wynik });
  }

  const prefiks = u.searchParams.get("prefiks") ?? "";
  if (prefiks.length < 3) return NextResponse.json({ error: "podaj prefiks, np. domeny-" }, { status: 400 });
  const wszystkie = u.searchParams.get("wszystkie") === "1";
  const test = u.searchParams.get("test") === "1";
  const dni = Math.min(Number(u.searchParams.get("dni") ?? 30) || 30, 90);
  const od = Math.floor(Date.now() / 1000) - dni * 86400;
  const klucz = znacznik(prefiks);

  const wynik = [];
  let po: string | undefined;
  for (let strona = 0; strona < 5; strona++) {
    const q = new URLSearchParams({ status: "complete", limit: "100", "created[gte]": String(od) });
    if (po) q.set("starting_after", po);
    const lista = await stripe(`checkout/sessions?${q}`);
    for (const s of lista.data) {
      if (!produkty(s.metadata).some((p) => p.startsWith(prefiks))) continue;
      if (s.payment_status === "unpaid") continue;
      if ((s.metadata?.zrodlo === "test") !== test) continue;
      if (!wszystkie && s.metadata?.[klucz]) continue;
      wynik.push(await zamowienie(s, true));
    }
    if (!lista.has_more) break;
    po = lista.data.at(-1)?.id;
  }
  return NextResponse.json({ prefiks, znacznik: klucz, zamowienia: wynik });
}

export async function POST(req: Request) {
  if (!dozwolone(req)) return NextResponse.json({ error: "brak dostępu" }, { status: 401 });
  const d = await req.json().catch(() => ({}));
  if (typeof d.id !== "string" || !d.id.startsWith("cs_"))
    return NextResponse.json({ error: "id sesji Checkout (cs_...)" }, { status: 400 });
  const s = await stripe(`checkout/sessions/${d.id}`);

  if (d.akcja === "przyjete") {
    if (typeof d.prefiks !== "string" || d.prefiks.length < 3)
      return NextResponse.json({ error: "prefiks" }, { status: 400 });
    const klucz = znacznik(d.prefiks);
    await stripe(`checkout/sessions/${d.id}`, new URLSearchParams({ [`metadata[${klucz}]`]: new Date().toISOString() }));
    return NextResponse.json({ ok: true, znacznik: klucz });
  }

  if (d.akcja === "mail") {
    const do_ = s.customer_details?.email;
    if (!do_) return NextResponse.json({ error: "sesja bez adresu e-mail" }, { status: 409 });
    if (typeof d.temat !== "string" || typeof d.html !== "string")
      return NextResponse.json({ error: "temat i html" }, { status: 400 });
    const zalaczniki = Array.isArray(d.zalaczniki)
      ? d.zalaczniki.slice(0, 5).map((z: any) => ({ filename: String(z.nazwa), content: String(z.base64) }))
      : undefined;
    const r = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: FROM,
      to: do_,
      replyTo: ODPOWIEDZ_NA,
      subject: d.temat.slice(0, 200),
      html: d.html,
      ...(typeof d.tekst === "string" ? { text: d.tekst } : {}),
      ...(zalaczniki?.length ? { attachments: zalaczniki } : {}),
    });
    if (r.error) return NextResponse.json({ error: r.error.message }, { status: 502 });
    return NextResponse.json({ ok: true, do: do_, resend: r.data?.id });
  }

  return NextResponse.json({ error: "akcja: przyjete | mail" }, { status: 400 });
}
