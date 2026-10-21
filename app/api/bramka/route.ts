import { NextResponse } from "next/server";

import { wyslij, zapiszZgode } from "@/lib/audyt-wyslij";
import {
  NARZEDZIA_BRAMKI,
  TRESC_ZGODY_BRAMKI,
  mailWyniku,
  naglowkiWypisu,
  type NarzedzieBramki,
} from "@/lib/bramka";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DO_WLASCICIELA = process.env.AUDYT_KOPIA_DO ?? "iwanekpawel55@gmail.com";

const tekst = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe zapytanie." }, { status: 400 });
  }
  const narzedzie = tekst(body.narzedzie, 40) as NarzedzieBramki;
  if (!(narzedzie in NARZEDZIA_BRAMKI)) {
    return NextResponse.json({ error: "Nieznane narzędzie." }, { status: 400 });
  }
  const email = tekst(body.email, 320).toLowerCase();
  const pytanie = tekst(body.pytanie, 1000);
  const tytul = tekst(body.tytul, 200) || "Wynik";
  const linie = Array.isArray(body.linie)
    ? body.linie.map((l) => tekst(l, 600)).filter(Boolean).slice(0, 40)
    : [];
  const zgoda = body.zgoda === true;
  const zrodlo = tekst(request.headers.get("referer"), 300);

  if (!email && !pytanie) {
    return NextResponse.json({ error: "Wpisz e-mail albo odpowiedz na pytanie." }, { status: 400 });
  }
  if (email && !EMAIL_RX.test(email)) {
    return NextResponse.json({ error: "Podaj poprawny adres e-mail." }, { status: 400 });
  }
  // Bez zgody nie zapisujemy adresu i nic nie wysyłamy. Samo wpisanie
  // adresu w pole nie jest zgodą.
  if (email && !zgoda) {
    return NextResponse.json(
      { error: "Zaznacz zgodę, żebyśmy mogli wysłać wynik na ten adres." },
      { status: 400 },
    );
  }

  let wyslano = false;
  if (email) {
    // Najpierw dowód zgody, potem wysyłka: bez zapisanej zgody nie ma maila.
    const zapisana = await zapiszZgode(
      { email, okazja: `bramka_${narzedzie}`, szczegol: `${tytul}${pytanie ? ` | ${pytanie}` : ""}`.slice(0, 1000), zrodlo },
      TRESC_ZGODY_BRAMKI,
    );
    if (!zapisana) {
      return NextResponse.json(
        { error: "Nie udało się zapisać zgody, spróbuj za chwilę." },
        { status: 502 },
      );
    }
    const m = mailWyniku({ narzedzie, tytul, linie, email });
    wyslano = await wyslij(email, m.temat, m.html, m.tekst, naglowkiWypisu(email));
  }

  // Odpowiedź na pytanie kwalifikujące to lead, więc trafia od razu do Pawła.
  await wyslij(
    DO_WLASCICIELA,
    `[bramka] ${NARZEDZIA_BRAMKI[narzedzie].nazwa} · ${email || "anonim"}${pytanie ? " · LEAD" : ""}`,
    `<p><b>Narzędzie:</b> ${NARZEDZIA_BRAMKI[narzedzie].nazwa}<br><b>E-mail:</b> ${email || "nie podano"}${email ? " (zgoda TAK)" : ""}<br><b>Pytanie kwalifikujące:</b> ${pytanie || "bez odpowiedzi"}<br><b>Źródło:</b> ${zrodlo || "nieznane"}</p><p><b>${tytul}</b></p>${linie.map((l) => `<p>${l.replace(/</g, "&lt;")}</p>`).join("")}`,
    `Narzędzie: ${NARZEDZIA_BRAMKI[narzedzie].nazwa}\nE-mail: ${email || "nie podano"}\nPytanie: ${pytanie || "bez odpowiedzi"}\nŹródło: ${zrodlo}\n\n${tytul}\n${linie.join("\n")}`,
  ).catch(() => false);

  if (email && !wyslano) {
    return NextResponse.json(
      { error: "Zgoda zapisana, ale wysyłka się nie udała. Spróbuj za chwilę." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true, wyslano });
}
