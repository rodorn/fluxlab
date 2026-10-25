import { NextResponse } from "next/server";
import { originDozwolony, utworzLimit } from "@/lib/limit-ip";
import { MODULY_CRM, W_ABONAMENCIE, type WariantCrm } from "@/lib/modulyCrm";

const limit = utworzLimit();

const PLAN: Record<WariantCrm, { klucz: string; nazwa: string }> = {
  pilotaz: { klucz: "crm_pilotaz_mies", nazwa: "gotowy" },
  integracje: { klucz: "crm_integracje_mies", nazwa: "integracje" },
};

const MODUL_KLUCZ: Record<string, string> = {
  ocena: "crm_ocena_mies",
  drafty: "crm_drafty_mies",
};

async function stripe(sciezka: string, body?: URLSearchParams) {
  const r = await fetch(`https://api.stripe.com/v1/${sciezka}`, {
    method: body ? "POST" : "GET",
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      ...(body && { "Content-Type": "application/x-www-form-urlencoded" }),
    },
    body,
  });
  const dane = await r.json();
  if (!r.ok) throw new Error(dane?.error?.message ?? `Stripe ${r.status}`);
  return dane;
}

export async function POST(req: Request) {
  if (!originDozwolony(req.headers.get("origin")))
    return NextResponse.json({ error: "origin" }, { status: 403 });
  if (limit(req))
    return NextResponse.json({ error: "Za dużo prób, spróbuj za minutę." }, { status: 429 });

  const { wariant, osoby, moduly } = await req.json().catch(() => ({}));
  const plan = PLAN[wariant as WariantCrm];
  const konta = Math.round(Number(osoby));
  const dodatki = MODULY_CRM.map((m) => m.id).filter(
    (id) => Array.isArray(moduly) && moduly.includes(id),
  );
  if (!plan || !(konta >= 1 && konta <= 500))
    return NextResponse.json({ error: "Nieprawidłowa konfiguracja." }, { status: 400 });

  const pozycje: [string, number][] = [
    [plan.klucz, 1],
    ["crm_osoba_mies", Math.max(0, konta - W_ABONAMENCIE)],
    ...dodatki.map((id): [string, number] => [MODUL_KLUCZ[id], 1]),
    ["crm_wdrozenie", 1],
  ].filter(([, q]) => (q as number) > 0) as [string, number][];

  try {
    const q = new URLSearchParams({ active: "true", limit: "10" });
    pozycje.forEach(([k]) => q.append("lookup_keys[]", k));
    const ceny: { id: string; lookup_key: string }[] = (await stripe(`prices?${q}`)).data;

    const p = new URLSearchParams({
      mode: "subscription",
      locale: "pl",
      billing_address_collection: "required",
      "tax_id_collection[enabled]": "true",
      "phone_number_collection[enabled]": "true",
      success_url: "https://fluxlab.pl/crm/dziekujemy?sesja={CHECKOUT_SESSION_ID}",
      cancel_url: "https://fluxlab.pl/wlasny-crm",
    });
    const meta = {
      plan: plan.nazwa,
      uzytkownicy: String(konta),
      dodatki: dodatki.join(","),
      zrodlo: "strona",
    };
    for (const [k, v] of Object.entries(meta)) {
      p.set(`metadata[${k}]`, v);
      p.set(`subscription_data[metadata][${k}]`, v);
    }
    pozycje.forEach(([klucz, ilosc], i) => {
      const cena = ceny.find((c) => c.lookup_key === klucz);
      if (!cena) throw new Error(`Brak ceny ${klucz}`);
      p.set(`line_items[${i}][price]`, cena.id);
      p.set(`line_items[${i}][quantity]`, String(ilosc));
      p.set(`line_items[${i}][tax_rates][0]`, process.env.STRIPE_TXR_VAT!);
    });

    const sesja = await stripe("checkout/sessions", p);
    return NextResponse.json({ url: sesja.url });
  } catch (e) {
    console.error("crm-zakup", e);
    return NextResponse.json(
      { error: "Płatność chwilowo niedostępna. Napisz do nas, a wyślemy link do zakupu." },
      { status: 502 },
    );
  }
}
