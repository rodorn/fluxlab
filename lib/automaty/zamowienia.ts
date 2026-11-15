import { stripe } from "@/lib/stripe";

export type Zamowienie = {
  sesja: string;
  email: string;
  dane: string;
  subskrypcja: string;
  produkt: string;
};

/** Opłacone zamówienia subskrypcyjne danego produktu. `metadata.produkt` to lista po przecinku. */
export async function zamowieniaProduktu(produkt: string): Promise<Zamowienie[]> {
  const wynik: Zamowienie[] = [];
  let po = "";
  for (let i = 0; i < 10; i++) {
    const s = await stripe(`checkout/sessions?status=complete&limit=100${po}`);
    for (const x of s.data) {
      const ids = String(x.metadata?.produkt ?? "").split(",").map((v: string) => v.trim());
      if (!ids.includes(produkt) || x.mode !== "subscription" || !x.subscription) continue;
      const pole = (x.custom_fields ?? []).find((f: { key: string }) => f.key === "dane");
      wynik.push({
        sesja: x.id,
        email: x.customer_details?.email ?? "",
        dane: String(pole?.text?.value ?? "").trim(),
        subskrypcja: x.subscription,
        produkt,
      });
    }
    if (!s.has_more) break;
    po = `&starting_after=${s.data[s.data.length - 1].id}`;
  }
  return wynik;
}

export async function subskrypcja(id: string) {
  return stripe(`subscriptions/${id}?expand[]=latest_invoice`);
}

export async function oznacz(id: string, meta: Record<string, string>) {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(meta)) p.set(`metadata[${k}]`, v);
  await stripe(`subscriptions/${id}`, p);
}

/** Anuluje subskrypcję i zwraca ostatnią opłatę. Dla produktu, którego nie da się uruchomić. */
export async function anulujIZwroc(id: string) {
  const sub = await subskrypcja(id);
  const pi = sub.latest_invoice?.payment_intent;
  await fetch(`https://api.stripe.com/v1/subscriptions/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` },
  });
  if (pi) await stripe("refunds", new URLSearchParams({ payment_intent: String(pi) }));
}

export function dzienWarszawa(d = new Date()): string {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Warsaw" }).format(d);
}

export function godzinaWarszawa(d = new Date()): number {
  return Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Warsaw", hour: "2-digit", hour12: false }).format(d));
}
