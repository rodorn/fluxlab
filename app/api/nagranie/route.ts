import { NextResponse } from "next/server";

import { wyslij } from "@/lib/audyt-wyslij";
import { MAX_KOLEJKA, PRODUKTY_NAGRAN, kolejkaZ, linkPoprawny } from "@/lib/automaty/nagranie-automat";
import { oznacz, subskrypcja, zamowieniaProduktu } from "@/lib/automaty/zamowienia";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ODP = "Jeśli ten adres ma aktywną usługę, nagranie jest w kolejce, a wynik przyjdzie mailem w ciągu kilku minut.";

export async function POST(req: Request) {
  let b: { email?: string; link?: string; produkt?: string };
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "Zły format." }, { status: 400 });
  }
  const email = String(b.email ?? "").trim().toLowerCase();
  const link = String(b.link ?? "").trim();
  const produkt = PRODUKTY_NAGRAN.find((p) => p === b.produkt);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !produkt)
    return NextResponse.json({ error: "Podaj adres e-mail i wybierz usługę." }, { status: 400 });
  if (!(await linkPoprawny(link)))
    return NextResponse.json({ error: "Link musi zaczynać się od https://, nie może mieć spacji ani być dłuższy niż 220 znaków." }, { status: 400 });

  for (const z of await zamowieniaProduktu(produkt)) {
    if (z.email.toLowerCase() !== email) continue;
    const sub = await subskrypcja(z.subskrypcja);
    if (sub.status !== "active" && sub.status !== "trialing") continue;
    const kolejka = kolejkaZ(sub.metadata?.kolejka);
    if (kolejka.length >= MAX_KOLEJKA) continue;
    await oznacz(z.subskrypcja, { kolejka: [...kolejka, link].join(" ") });
    const t = `Dzień dobry,\n\nprzyjęliśmy nagranie do przetworzenia. Wynik przyjdzie na ten adres w ciągu kilku minut.\n\nFluxlab`;
    await wyslij(z.email, "Przyjęliśmy nagranie", `<p>${t.replace(/\n/g, "<br>")}</p>`, t);
    break;
  }
  return NextResponse.json({ ok: true, komunikat: ODP });
}
