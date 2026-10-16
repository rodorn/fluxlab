import { after, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

import { czystaDomena } from "@/lib/audyt-pomiar";
import {
  daneliczbowe,
  raportHtml,
  raportTekst,
  zbadajCalosc,
} from "@/lib/audyt-calosc";
import { wyslij } from "@/lib/audyt-wyslij";
import { adresZgloszen, ladunekZgloszenia } from "@/lib/zgloszenie-kolektor";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Badanie biegnie po odpowiedzi, w tej samej funkcji. Podstrony mają termin
// 170 s, linki 215 s, a reszta zostaje na pomiar domeny i wysyłkę.
export const maxDuration = 300;

const DO_WLASCICIELA = process.env.AUDYT_KOPIA_DO ?? "iwanekpawel55@gmail.com";
const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GODZINA = 3_600_000;

/**
 * Limit w pamięci instancji: ten sam e-mail albo domena raz na godzinę, a z
 * jednego adresu IP pięć zamówień na godzinę. Pamięć instancji nie jest
 * wspólna, dlatego właściwy limit e-maila i domeny trzyma kolektor na VPS
 * (odmawia zapisu drugiego zamówienia w ciągu godziny). Ten tutaj działa,
 * gdy kolektor nie odpowiada.
 */
const ostatnie = new Map<string, number>();
const zIp = new Map<string, { ile: number; od: number }>();

function swieze(klucz: string): boolean {
  const t = ostatnie.get(klucz);
  return t !== undefined && Date.now() - t < GODZINA;
}

function nipPoprawny(nip: string): boolean {
  if (!/^\d{10}$/.test(nip)) return false;
  const wagi = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  const suma = wagi.reduce((s, w, i) => s + w * Number(nip[i]), 0);
  return suma % 11 === Number(nip[9]);
}

/** Zapis zamówienia w kolektorze. 429 znaczy: to samo zamówienie w ciągu godziny. */
async function zapiszZamowienie(pola: {
  email: string;
  domena: string;
  nip: string;
  zrodlo: string;
}): Promise<number | null> {
  const sekret = process.env.RUCH_SEKRET;
  if (!sekret) return null;
  try {
    const odp = await fetch(adresZgloszen(), {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Sekret": sekret },
      body: JSON.stringify({
        ...ladunekZgloszenia({
          email: pola.email,
          firma: pola.domena,
          rodzaj_problemu: "audyt_calosci",
          skala: "10 zł netto",
          opis: `Zamówienie audytu całej strony ${pola.domena}.${pola.nip ? ` NIP do faktury: ${pola.nip}.` : ""}`,
          landing_page: pola.zrodlo,
        }),
        raz_na_godzine: true,
      }),
      signal: AbortSignal.timeout(4000),
    });
    return odp.status;
  } catch (e) {
    console.error("[audyt-calosc] kolektor nie odpowiedział", e);
    return null;
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Nieprawidłowe zapytanie." },
      { status: 400 },
    );
  }

  // Pole-pułapka: człowiek go nie widzi, bot wypełnia. Udajemy sukces.
  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const domena = czystaDomena(body.adres);
  const email =
    typeof body.email === "string"
      ? body.email.trim().toLowerCase().slice(0, 320)
      : "";
  const nip =
    typeof body.nip === "string" ? body.nip.replace(/[^\d]/g, "") : "";

  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domena)) {
    return NextResponse.json(
      { error: "Podaj adres strony, na przykład twojafirma.pl" },
      { status: 400 },
    );
  }
  if (!EMAIL_RX.test(email)) {
    return NextResponse.json(
      { error: "Podaj poprawny adres e-mail." },
      { status: 400 },
    );
  }
  if (nip && !nipPoprawny(nip)) {
    return NextResponse.json(
      { error: "Ten NIP się nie zgadza. Sprawdź go albo zostaw pole puste." },
      { status: 400 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "nieznany";
  const teraz = Date.now();
  const wpisIp = zIp.get(ip);
  if (!wpisIp || teraz - wpisIp.od > GODZINA)
    zIp.set(ip, { ile: 1, od: teraz });
  else if (++wpisIp.ile > 5) {
    return NextResponse.json(
      { error: "Za dużo zamówień z tego adresu. Spróbuj za godzinę." },
      { status: 429 },
    );
  }

  const zaCzesto = NextResponse.json(
    {
      error:
        "Audyt dla tego adresu e-mail albo tej strony zamówiono w ciągu ostatniej godziny. Kolejny możesz zamówić za godzinę.",
    },
    { status: 429 },
  );
  if (swieze(`e:${email}`) || swieze(`d:${domena}`)) return zaCzesto;

  const zrodlo = request.headers.get("referer") ?? "";
  const zapis = await zapiszZamowienie({ email, domena, nip, zrodlo });
  if (zapis === 429) return zaCzesto;
  ostatnie.set(`e:${email}`, teraz);
  ostatnie.set(`d:${domena}`, teraz);

  after(async () => {
    const wynik = await zbadajCalosc(domena);
    const d = daneliczbowe(wynik);
    const html = raportHtml(wynik, { nip: nip || undefined });
    const tekst = raportTekst(wynik, { nip: nip || undefined });
    const temat =
      d.sprawdzone > 0
        ? `Audyt całej strony ${domena}: ${d.sprawdzone} podstron, ${d.problemow} do poprawy`
        : `Audyt całej strony ${domena}: strona nie odpowiedziała`;

    const naglowek = `<div style="background:#111827;color:#f9fafb;padding:12px 16px;font-family:monospace;font-size:13px;margin-bottom:18px">
      ZAMÓWIENIE 10 zł netto · klient: ${email}<br>NIP: ${nip || "brak"} · zapis w kolektorze: ${zapis ?? "brak"}<br>
      podstron: ${d.sprawdzone} · czas: ${wynik.czasS} s · źródło: ${zrodlo || "nieznane"}
    </div>`;
    const htmlKopia = raportHtml(wynik, { nip: nip || undefined, naglowek });

    const katalog = process.env.AUDYT_CALOSC_KATALOG;
    if (katalog) {
      await mkdir(katalog, { recursive: true });
      await writeFile(path.join(katalog, `${domena}.html`), html);
      await writeFile(path.join(katalog, `${domena}-kopia.html`), htmlKopia);
      await writeFile(
        path.join(katalog, `${domena}.json`),
        JSON.stringify(wynik, null, 1),
      );
    }

    const doKlienta = await wyslij(email, temat, html, tekst);
    await wyslij(
      DO_WLASCICIELA,
      `[audyt całości] ${domena} · ${d.sprawdzone} podstron · ${email}${doKlienta ? "" : " · KLIENT NIE DOSTAŁ"}`,
      htmlKopia,
      `Klient: ${email}\nNIP: ${nip || "brak"}\n\n${tekst}`,
    );
    console.log(
      `[audyt-calosc] ${domena}: ${d.sprawdzone} podstron, ${d.problemow} problemów, ${wynik.czasS} s, mail do klienta: ${doKlienta}`,
    );
  });

  return NextResponse.json({ ok: true });
}
