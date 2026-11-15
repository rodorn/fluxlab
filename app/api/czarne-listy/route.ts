import { NextResponse } from "next/server";

import { LIMIT_DOMEN, mailZapisu, naListach, PRODUKT_CL, sprawdzNaVps, stanZ, wpisy, type Wpis } from "@/lib/czarne-listy";
import { EMAIL_RX, linkWypisu, ustaw, wyslijMail, zapisz, znajdz } from "@/lib/fl-produkty";
import { originDozwolony, utworzLimit } from "@/lib/limit-ip";
import { ipZadania } from "@/lib/ruch";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const limit = utworzLimit();
const dzien = () => new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Warsaw" }).format(new Date());

export async function POST(request: Request) {
  if (!originDozwolony(request.headers.get("origin")) || limit(request)) {
    return NextResponse.json({ error: "Za dużo prób. Spróbuj za minutę." }, { status: 429 });
  }
  const b = await request.json().catch(() => ({}));
  const email = String(b.email ?? "").trim().toLowerCase().slice(0, 320);
  const serwer = String(b.serwer ?? "").trim().toLowerCase().slice(0, 60);
  if (!EMAIL_RX.test(email)) return NextResponse.json({ error: "Wpisz poprawny adres e-mail." }, { status: 400 });

  try {
    const istnieje = await znajdz(PRODUKT_CL, email);
    const aktywny = istnieje?.meta.fl_aktywna === "1";
    const stare: Wpis[] = aktywny ? wpisy(istnieje!.meta) : [];
    const w = await sprawdzNaVps(String(b.domena ?? ""), serwer, ipZadania(request));
    if (w.domena.length > 60) return NextResponse.json({ error: "Domena jest za długa." }, { status: 400 });
    if (stare.some((x) => x.d === w.domena)) return NextResponse.json({ ok: true, stan: "juz", domena: w.domena });
    if (stare.length >= LIMIT_DOMEN) {
      return NextResponse.json(
        { error: `Na jeden adres e-mail pilnujemy do ${LIMIT_DOMEN} domen. Wypisz się linkiem z maila i zapisz ponownie z właściwymi.` },
        { status: 400 },
      );
    }
    const stan = aktywny ? stanZ(istnieje!.meta) : {};
    const meta = {
      fl_domeny: JSON.stringify([...stare, serwer ? { d: w.domena, s: serwer } : { d: w.domena }]),
      fl_stan: JSON.stringify({ ...stan, [w.domena]: naListach(w) }),
      fl_ostatnia: dzien(),
    };
    const sub = istnieje ?? (await zapisz(PRODUKT_CL, email));
    await ustaw(sub.id, { ...meta, fl_aktywna: "1" });
    const wypis = linkWypisu(PRODUKT_CL, email);
    const m = mailZapisu(w, wypis);
    const ok = await wyslijMail({ do: email, temat: m.temat, html: m.html, tekst: m.tekst, wypis });
    if (!ok) {
      await ustaw(sub.id, aktywny ? { fl_domeny: istnieje!.meta.fl_domeny ?? "[]", fl_stan: istnieje!.meta.fl_stan ?? "{}" } : { fl_aktywna: "0" });
      return NextResponse.json({ error: "Nie udało się wysłać maila. Spróbuj ponownie za chwilę." }, { status: 502 });
    }
    return NextResponse.json({ ok: true, stan: "nowy", domena: w.domena });
  } catch (e) {
    const kod = (e as { kod?: number }).kod;
    if (kod && kod < 500) return NextResponse.json({ error: (e as Error).message }, { status: kod });
    console.error("czarne-listy zapis", e);
    return NextResponse.json({ error: "Zapis chwilowo niedostępny. Spróbuj ponownie za chwilę." }, { status: 502 });
  }
}
