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

  const { id } = await req.json().catch(() => ({}));
  const o = OFERTA[id as string];
  if (!o) return NextResponse.json({ error: "Nieznany produkt." }, { status: 400 });

  const p = new URLSearchParams({
    mode: o.miesiecznie ? "subscription" : "payment",
    locale: "pl",
    billing_address_collection: "required",
    "tax_id_collection[enabled]": "true",
    "phone_number_collection[enabled]": "true",
    "line_items[0][quantity]": "1",
    "line_items[0][tax_rates][0]": process.env.STRIPE_TXR_VAT!,
    "line_items[0][price_data][currency]": "pln",
    "line_items[0][price_data][unit_amount]": String(o.netto * 100),
    "line_items[0][price_data][tax_behavior]": "exclusive",
    "line_items[0][price_data][product_data][name]": o.nazwa,
    success_url: `https://fluxlab.pl/zakup/dziekujemy?p=${id}&sesja={CHECKOUT_SESSION_ID}`,
    cancel_url: `https://fluxlab.pl${o.strona}`,
  });
  if (o.miesiecznie) p.set("line_items[0][price_data][recurring][interval]", "month");
  else p.set("customer_creation", "always");
  if (o.pole) {
    p.set("custom_fields[0][key]", "dane");
    p.set("custom_fields[0][type]", "text");
    p.set("custom_fields[0][label][type]", "custom");
    p.set("custom_fields[0][label][custom]", o.pole);
  }
  const meta = { produkt: id, zrodlo: "strona" };
  const cel = o.miesiecznie ? "subscription_data" : "payment_intent_data";
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
