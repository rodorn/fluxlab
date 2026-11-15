import { NextResponse } from "next/server";

import { originDozwolony, utworzLimit } from "@/lib/limit-ip";
import { esc, ramkaMaila, wyslijMail } from "@/lib/fl-produkty";
import { aktywnaStrona, db } from "@/lib/landing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const limit = utworzLimit();
const LIMIT_DOBA = 100;
const t = (v: unknown, n: number) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, n);

export async function POST(req: Request) {
  if (!originDozwolony(req.headers.get("origin"))) return NextResponse.json({ error: "origin" }, { status: 403 });
  if (limit(req)) return NextResponse.json({ error: "Za dużo prób, spróbuj za minutę." }, { status: 429 });
  const b = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!b) return NextResponse.json({ error: "Brak danych." }, { status: 400 });
  if (b.firma) return NextResponse.json({ ok: true });
  const slug = t(b.slug, 40);
  const s = await aktywnaStrona(slug);
  if (!s) return NextResponse.json({ error: "Strona jest wyłączona." }, { status: 404 });
  const imie = t(b.imie, 80);
  const kontakt = t(b.kontakt, 120);
  const wiadomosc = String(b.wiadomosc ?? "").trim().slice(0, 1500);
  if (!imie || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$|^\+?[\d\s()-]{7,}$/.test(kontakt)) return NextResponse.json({ error: "Podaj imię i poprawny telefon albo e-mail." }, { status: 400 });
  if (b.zgoda !== true) return NextResponse.json({ error: "Zaznacz zgodę na kontakt." }, { status: 400 });
  if ((await db.licz("zgloszenia", { klucz: slug, od: new Date().toISOString().slice(0, 10) })) >= LIMIT_DOBA)
    return NextResponse.json({ error: "Dzienny limit zgłoszeń wyczerpany." }, { status: 429 });

  await db.usunPrzed("zgloszenia", new Date(Date.now() - 30 * 86400_000).toISOString()).catch(() => null);
  await db.dodaj("zgloszenia", { klucz: slug, dane: { imie, kontakt, wiadomosc } });
  const ok = await wyslijMail({
    do: s.email,
    temat: `Nowe zgłoszenie ze strony ${s.nazwa}`,
    html: ramkaMaila({
      naglowek: "Nowe zgłoszenie z Twojego landingu",
      tresc: `<p style="font-size:15px;line-height:1.55"><b>Imię:</b> ${esc(imie)}<br><b>Kontakt:</b> ${esc(kontakt)}<br><b>Wiadomość:</b> ${esc(wiadomosc || "(brak)")}</p>`,
      stopka: `Zgoda na kontakt została zaznaczona w formularzu na https://fluxlab.pl/l/${esc(slug)}. Fluxlab przechowuje zgłoszenie 30 dni, administratorem danych jest ${esc(s.nazwa)}.`,
    }),
    tekst: `Nowe zgłoszenie z landingu ${s.nazwa}\nImię: ${imie}\nKontakt: ${kontakt}\nWiadomość: ${wiadomosc || "(brak)"}`,
  });
  if (!ok) return NextResponse.json({ error: "Zgłoszenia nie udało się wysłać. Spróbuj ponownie." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
