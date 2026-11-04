import { NextResponse } from "next/server";
import { originDozwolony, utworzLimit } from "@/lib/limit-ip";
import { stripe } from "@/lib/stripe";
import { OFERTA } from "@/lib/sprzedaz";

const limit = utworzLimit();

export async function POST(req: Request) {
  if (!originDozwolony(req.headers.get("origin")))
    return NextResponse.json({ error: "origin" }, { status: 403 });
  if (limit(req))
    return NextResponse.json({ error: "Za dużo prób, spróbuj za minutę." }, { status: 429 });

  const dane = await req.json().catch(() => ({}));
  const koszyk = Array.isArray(dane.ids);
  const ids: string[] = koszyk ? [...new Set<string>(dane.ids)].slice(0, 20) : [dane.id];
  const oferty = ids.map((k) => OFERTA[k]);
  if (!ids.length || oferty.some((o) => !o))
    return NextResponse.json({ error: "Nieznany produkt." }, { status: 400 });
  if (koszyk && dane.regulamin !== true)
    return NextResponse.json({ error: "Zaakceptuj regulamin." }, { status: 400 });
  const id = koszyk ? "koszyk" : ids[0];
  const miesiecznie = oferty.some((o) => o.miesiecznie);

  const p = new URLSearchParams({
    mode: miesiecznie ? "subscription" : "payment",
    locale: "pl",
    billing_address_collection: "required",
    "tax_id_collection[enabled]": "true",
    "phone_number_collection[enabled]": "true",
    success_url: `https://fluxlab.pl/zakup/dziekujemy?p=${id}&sesja={CHECKOUT_SESSION_ID}`,
    cancel_url: `https://fluxlab.pl${koszyk ? "/koszyk" : oferty[0].strona}`,
  });
  oferty.forEach((o, i) => {
    const l = `line_items[${i}]`;
    p.set(`${l}[quantity]`, "1");
    p.set(`${l}[tax_rates][0]`, process.env.STRIPE_TXR_VAT!);
    p.set(`${l}[price_data][currency]`, "pln");
    p.set(`${l}[price_data][unit_amount]`, String(o.netto * 100));
    p.set(`${l}[price_data][tax_behavior]`, "exclusive");
    p.set(`${l}[price_data][product_data][name]`, o.nazwa);
    if (o.miesiecznie) p.set(`${l}[price_data][recurring][interval]`, "month");
  });
  if (!miesiecznie) p.set("customer_creation", "always");
  const pola = [...new Set(oferty.map((o) => o.pole).filter(Boolean))];
  if (pola.length) {
    p.set("custom_fields[0][key]", "dane");
    p.set("custom_fields[0][type]", "text");
    p.set("custom_fields[0][label][type]", "custom");
    p.set("custom_fields[0][label][custom]", pola.length === 1 ? pola[0]! : "Adres strony i dane do zamówionych usług");
  }
  const pole2 = oferty.find((o) => o.pole2)?.pole2;
  if (pole2) {
    const i = pola.length ? 1 : 0;
    p.set(`custom_fields[${i}][key]`, "konkurenci");
    p.set(`custom_fields[${i}][type]`, "text");
    p.set(`custom_fields[${i}][optional]`, "true");
    p.set(`custom_fields[${i}][text][maximum_length]`, "255");
    p.set(`custom_fields[${i}][label][type]`, "custom");
    p.set(`custom_fields[${i}][label][custom]`, pole2);
  }
  const meta: Record<string, string> = { produkt: ids.join(","), zrodlo: koszyk ? "koszyk" : "strona" };
  if (koszyk) meta.regulamin = new Date().toISOString();
  const cel = miesiecznie ? "subscription_data" : "payment_intent_data";
  for (const [k, v] of Object.entries(meta)) {
    p.set(`metadata[${k}]`, v);
    p.set(`${cel}[metadata][${k}]`, v);
  }

  try {
    const sesja = await stripe("checkout/sessions", p);
    return NextResponse.json({ url: sesja.url });
  } catch (e) {
    console.error("zakup", id, e);
    return NextResponse.json(
      { error: "Płatność chwilowo niedostępna. Napisz do nas, a wyślemy link do zakupu." },
      { status: 502 },
    );
  }
}
