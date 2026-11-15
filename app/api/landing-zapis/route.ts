import { NextResponse } from "next/server";

import { ramkaMaila, esc, wyslijMail } from "@/lib/fl-produkty";
import { db, KOLORY, poprawnySlug, zamowienie, type Strona } from "@/lib/landing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const t = (v: unknown, n: number) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, n);

export async function POST(req: Request) {
  const b = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!b) return NextResponse.json({ error: "Brak danych." }, { status: 400 });
  const z = await zamowienie(String(b.sesja ?? ""));
  if (!z || !z.aktywna) return NextResponse.json({ error: "Ta strona działa tylko z linku po opłaceniu zamówienia." }, { status: 403 });

  const slug = t(b.slug, 40).toLowerCase();
  if (!poprawnySlug(slug)) return NextResponse.json({ error: "Adres: 3 do 40 znaków, małe litery bez polskich znaków, cyfry i myślniki." }, { status: 400 });
  const email = t(b.email, 120);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return NextResponse.json({ error: "Podaj poprawny e-mail, na który mamy wysyłać zgłoszenia." }, { status: 400 });
  const nazwa = t(b.nazwa, 80);
  const naglowek = t(b.naglowek, 120);
  const opis = String(b.opis ?? "").trim().slice(0, 800);
  if (!nazwa || !naglowek || !opis) return NextResponse.json({ error: "Wypełnij nazwę, nagłówek i opis." }, { status: 400 });
  const punkty = (Array.isArray(b.punkty) ? b.punkty : []).map((p) => t(p, 100)).filter(Boolean).slice(0, 3);
  const telefon = t(b.telefon, 30).replace(/[^\d+ ()-]/g, "");
  const strona: Strona = {
    slug,
    sesja: z.sesja,
    subskrypcja: z.subskrypcja,
    email,
    nazwa,
    naglowek,
    opis,
    punkty,
    przycisk: t(b.przycisk, 30) || "Wyślij zapytanie",
    telefon,
    kolor: KOLORY[String(b.kolor)] ? String(b.kolor) : "niebieski",
    zmieniono: new Date().toISOString(),
  };

  const indeks = await db.pobierz<{ slug: string }>("sesje", z.sesja);
  const istnieje = await db.pobierz<Strona>("strony", slug);
  if (istnieje && istnieje.dane.sesja !== z.sesja) return NextResponse.json({ error: "Ten adres jest zajęty. Wybierz inny." }, { status: 409 });
  if (indeks && indeks.dane.slug !== slug) await db.usun("strony", indeks.dane.slug);
  if (istnieje) await db.ustaw("strony", slug, { dane: strona });
  else await db.dodaj("strony", { id: slug, dane: strona });
  if (indeks) await db.ustaw("sesje", z.sesja, { dane: { slug } });
  else await db.dodaj("sesje", { id: z.sesja, dane: { slug } });

  const adres = `https://fluxlab.pl/l/${slug}`;
  if (!indeks && z.email) {
    await wyslijMail({
      do: z.email,
      temat: "Twój landing jest na żywo",
      html: ramkaMaila({
        naglowek: "Twój landing jest na żywo",
        tresc: `<p style="font-size:15px;line-height:1.55">Strona: <a href="${esc(adres)}">${esc(adres)}</a>. Zgłoszenia z formularza przychodzą na <b>${esc(email)}</b> (od nadawcy Fluxlab, odpowiedz klientowi z własnej skrzynki). Dane zgłoszeń przechowujemy 30 dni, więc mail jest Twoją kopią.</p><p style="font-size:15px;line-height:1.55">Chcesz coś zmienić? Otwórz ankietę jeszcze raz: <a href="https://fluxlab.pl/landing-ankieta?sesja=${esc(z.sesja)}">edytuj stronę</a>. Zmiany są widoczne od razu.</p>`,
        stopka: "Po anulowaniu subskrypcji strona się wyłącza. Rezygnacja w dowolnym dniu: odpisz na tę wiadomość.",
      }),
      tekst: `Twój landing jest na żywo: ${adres}\nZgłoszenia przychodzą na ${email}.\nEdycja: https://fluxlab.pl/landing-ankieta?sesja=${z.sesja}`,
    });
  }
  return NextResponse.json({ ok: true, adres });
}
