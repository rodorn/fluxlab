import { NextResponse } from "next/server";

import { EMAIL_RX } from "@/lib/fl-produkty";
import { db, mailPotwierdzenie, podpisOdb, PRODUKT_NL, wyslijNl, type Odbiorca } from "@/lib/newsletter";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LIMIT_DOBA = 300;

export async function POST(req: Request) {
  const b = (await req.json().catch(() => null)) as { k?: string; email?: string; firma?: string } | null;
  const k = String(b?.k ?? "");
  const email = String(b?.email ?? "").trim().toLowerCase();
  if (b?.firma) return NextResponse.json({ ok: true });
  if (!/^cus_[A-Za-z0-9]+$/.test(k)) return NextResponse.json({ error: "Formularz jest wyłączony." }, { status: 404 });
  if (!EMAIL_RX.test(email) || email.length > 120) return NextResponse.json({ error: "Adres e-mail wygląda na błędny." }, { status: 400 });
  const c = await stripe(`customers/${k}`).catch(() => null);
  const m = c?.metadata as Record<string, string> | undefined;
  if (!m || m.fl_produkt !== PRODUKT_NL || m.fl_aktywna !== "1") return NextResponse.json({ error: "Formularz jest wyłączony." }, { status: 404 });

  const id = podpisOdb(`${k}:${email}`);
  const istnieje = await db.pobierz<Odbiorca>("odbiorcy", id);
  if (istnieje?.dane.status === "potwierdzony") return NextResponse.json({ ok: true });
  if (istnieje?.dane.wyslano && Date.now() - Date.parse(istnieje.dane.wyslano) < 3600_000) return NextResponse.json({ ok: true });
  if (!istnieje && (await db.licz("odbiorcy", { klucz: k, od: new Date().toISOString().slice(0, 10) })) >= LIMIT_DOBA)
    return NextResponse.json({ error: "Dzienny limit zapisów wyczerpany. Spróbuj jutro." }, { status: 429 });

  const mail = mailPotwierdzenie(m.nazwa || "Newsletter", id);
  const ok = await wyslijNl({ nazwa: m.nazwa || "Newsletter", do: email, ...mail });
  if (!ok) return NextResponse.json({ error: "Nie udało się wysłać maila. Spróbuj ponownie." }, { status: 502 });
  const dane: Odbiorca = { email, status: "oczekuje", wyslano: new Date().toISOString() };
  if (istnieje) await db.ustaw("odbiorcy", id, { klucz: k, dane });
  else await db.dodaj("odbiorcy", { id, klucz: k, dane });
  return NextResponse.json({ ok: true });
}
