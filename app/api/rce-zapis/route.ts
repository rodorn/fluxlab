import { NextResponse } from "next/server";

import { EMAIL_RX, linkWypisu, ustaw, wyslijMail, zapisz, znajdz } from "@/lib/fl-produkty";
import { originDozwolony, utworzLimit } from "@/lib/limit-ip";
import { dobaDoMaila, PRODUKT_RCE, zlozMail } from "@/lib/rce-mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const limit = utworzLimit();

export async function POST(request: Request) {
  if (!originDozwolony(request.headers.get("origin")) || limit(request)) {
    return NextResponse.json({ error: "Za dużo prób. Spróbuj za minutę." }, { status: 429 });
  }
  let email = "";
  try {
    const b = await request.json();
    email = String(b.email ?? "").trim().toLowerCase().slice(0, 320);
  } catch {}
  if (!EMAIL_RX.test(email)) return NextResponse.json({ error: "Wpisz poprawny adres e-mail." }, { status: 400 });

  try {
    const istnieje = await znajdz(PRODUKT_RCE, email);
    if (istnieje?.meta.fl_aktywna === "1") {
      return NextResponse.json({ ok: true, stan: "juz" });
    }
    const dane = await dobaDoMaila();
    if (!dane) {
      return NextResponse.json({ error: "Operator nie opublikował jeszcze cen. Spróbuj za kilka minut." }, { status: 503 });
    }
    const sub = istnieje ?? (await zapisz(PRODUKT_RCE, email));
    if (istnieje) await ustaw(sub.id, { fl_aktywna: "1" });
    const wypis = linkWypisu(PRODUKT_RCE, email);
    const m = zlozMail(dane.d, dane.jutro, wypis, true);
    const ok = await wyslijMail({ do: email, temat: m.temat, html: m.html, tekst: m.tekst, wypis, kopia: process.env.RCE_KOPIA });
    if (!ok) {
      await ustaw(sub.id, { fl_aktywna: "0" });
      return NextResponse.json({ error: "Nie udało się wysłać maila. Spróbuj ponownie za chwilę." }, { status: 502 });
    }
    await ustaw(sub.id, { fl_ostatnia: dane.d.data });
    return NextResponse.json({ ok: true, stan: "nowy" });
  } catch (e) {
    console.error("rce-zapis", e);
    return NextResponse.json({ error: "Zapis chwilowo niedostępny. Spróbuj ponownie za chwilę." }, { status: 502 });
  }
}
