import { NextResponse } from "next/server";

import { esc, ramkaMaila, wyslijWynik } from "@/lib/dokumenty-mail";
import { originDozwolony, utworzLimit } from "@/lib/limit-ip";
import {
  MAKS_BAJTOW,
  MAKS_PRODUKTOW,
  dekoduj,
  kolumnaNazwy,
  opiszProdukty,
  produktyZTabeli,
  wczytajCsv,
  zapiszCsv,
} from "@/lib/opisy-csv";
import { stripe } from "@/lib/stripe";
import { adresZgloszen, ladunekZgloszenia } from "@/lib/zgloszenie-kolektor";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

const limit = utworzLimit();
const EMAIL_RX = /^[^\s@'"\\]+@[^\s@'"\\]+\.[^\s@'"\\]+$/;
const DNI_LIMITU = 30;

type Klient = { id: string; ostatni: number };

/** Klient w Stripe służy tylko jako rejestr: jeden plik na adres w ciągu 30 dni. */
async function klientRejestru(email: string): Promise<Klient> {
  const szukaj = await stripe(`customers?email=${encodeURIComponent(email)}&limit=1`);
  const k = szukaj.data?.[0];
  if (k) return { id: k.id, ostatni: Number(k.metadata?.opisy_csv_ts) || 0 };
  const nowy = await stripe(
    "customers",
    new URLSearchParams({ email, "metadata[zrodlo]": "opisy-csv-darmowe" }),
  );
  return { id: nowy.id, ostatni: 0 };
}

function ustawZnacznik(id: string, ts: number) {
  return stripe(`customers/${id}`, new URLSearchParams({ "metadata[opisy_csv_ts]": String(ts || "") }));
}

async function zapiszLead(email: string, ile: number) {
  const sekret = process.env.RUCH_SEKRET;
  if (!sekret) return;
  try {
    await fetch(adresZgloszen(), {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Sekret": sekret },
      body: JSON.stringify(
        ladunekZgloszenia({
          email,
          rodzaj_problemu: "opisy_produktow_csv",
          skala: "darmowe, 0 zł",
          opis: `Darmowe opisy produktów z CSV: ${ile} produktów.`,
          landing_page: "/opisy-produktow-z-csv",
        }),
      ),
      signal: AbortSignal.timeout(4000),
    });
  } catch (e) {
    console.error("[opisy-csv] kolektor", e);
  }
}

function blad(komunikat: string, status = 400) {
  return NextResponse.json({ error: komunikat }, { status });
}

export async function POST(req: Request) {
  if (!originDozwolony(req.headers.get("origin"))) return blad("origin", 403);
  if (limit(req)) return blad("Za dużo prób, spróbuj za minutę.", 429);

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return blad("Nie udało się odczytać formularza.");
  }
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const plik = form.get("plik");
  if (!EMAIL_RX.test(email) || email.length > 120) return blad("Podaj poprawny adres e-mail.");
  if (!(plik instanceof File) || plik.size === 0) return blad("Wybierz plik CSV.");
  if (plik.size > MAKS_BAJTOW) return blad("Plik jest za duży. Limit to 400 KB.");

  const tabela = wczytajCsv(dekoduj(new Uint8Array(await plik.arrayBuffer())));
  if (tabela.naglowki.length < 2 || !tabela.wiersze.length)
    return blad("W pliku potrzebna jest linia nagłówków i co najmniej kolumny: nazwa oraz cechy.");
  if (tabela.wiersze.length > MAKS_PRODUKTOW)
    return blad(`W pliku jest ${tabela.wiersze.length} produktów, a limit to ${MAKS_PRODUKTOW}. Podziel plik na części.`);
  const produkty = produktyZTabeli(tabela);
  if (produkty.some((p) => !p.nazwa)) return blad("Każdy wiersz musi mieć wypełnioną nazwę produktu.");
  if (produkty.some((p) => !p.cechy)) return blad("Każdy produkt musi mieć co najmniej jedną cechę, inaczej opis byłby zmyślony.");

  let klient: Klient;
  try {
    klient = await klientRejestru(email);
  } catch (e) {
    console.error("[opisy-csv] rejestr", e);
    return blad("Usługa chwilowo niedostępna. Spróbuj za kilka minut.", 502);
  }
  const wolneOd = klient.ostatni + DNI_LIMITU * 86_400;
  const teraz = Math.floor(Date.now() / 1000);
  if (klient.ostatni && teraz < wolneOd)
    return blad(
      `Z jednego adresu przetwarzamy jeden plik na ${DNI_LIMITU} dni. Kolejny możesz wysłać po ${new Date(wolneOd * 1000).toLocaleDateString("pl-PL")}.`,
      429,
    );
  await ustawZnacznik(klient.id, teraz).catch(() => null);

  let opisy;
  try {
    opisy = await opiszProdukty(produkty);
  } catch (e) {
    console.error("[opisy-csv] model", e);
    await ustawZnacznik(klient.id, 0).catch(() => null);
    return blad("Nie udało się napisać opisów. Limit na adres nie został zużyty, spróbuj za kilka minut.", 502);
  }

  const naglowki = [...tabela.naglowki, "opis_krotki", "opis_dlugi", "meta_title", "meta_description"];
  const wiersze = tabela.wiersze.map((w, i) => [
    ...tabela.naglowki.map((_, k) => w[k] ?? ""),
    opisy[i].opis_krotki,
    opisy[i].opis_dlugi,
    opisy[i].meta_title,
    opisy[i].meta_description,
  ]);
  const csv = zapiszCsv(naglowki, wiersze, tabela.separator);
  const kn = kolumnaNazwy(tabela.naglowki);

  const przyklady = opisy.slice(0, 2).map((o, i) => ({ nazwa: produkty[i].nazwa, ...o }));
  const blokPrzykladu = przyklady
    .map(
      (p) => `<h2 style="font-size:16px;margin:20px 0 6px">${esc(p.nazwa)}</h2>
<p style="margin:0 0 8px">${esc(p.opis_krotki)}</p>
<p style="margin:0 0 4px;font-size:13px;color:#6b7280">Meta title: ${esc(p.meta_title)}<br>Meta description: ${esc(p.meta_description)}</p>`,
    )
    .join("");
  const html = ramkaMaila(
    `Opisy ${produkty.length} ${produkty.length === 1 ? "produktu" : "produktów"} gotowe`,
    `<p style="margin:0 0 12px">W załączniku jest Twój plik z czterema nowymi kolumnami: <b>opis_krotki</b>, <b>opis_dlugi</b>, <b>meta_title</b> i <b>meta_description</b>. Pozostałe kolumny zostały bez zmian, więc plik możesz zaimportować do sklepu tak jak własny.</p>
<p style="margin:0 0 4px">Tak wyglądają pierwsze pozycje:</p>${blokPrzykladu}
<p style="margin:20px 0 0;font-size:14px">Opisy opierają się wyłącznie na cechach z Twojego pliku. Przed publikacją przeczytaj je raz i popraw to, czego brakuje w danych. Plik otworzysz w Excelu, a polskie znaki są zapisane w UTF-8.</p>`,
  );
  const tekst = `Opisy ${produkty.length} produktów są w załączniku (nowe kolumny: opis_krotki, opis_dlugi, meta_title, meta_description). Opisy opierają się tylko na cechach z Twojego pliku, przed publikacją je sprawdź.`;
  const wyslano = await wyslijWynik(
    email,
    `Opisy ${produkty.length} produktów z Twojego pliku CSV`,
    html,
    tekst,
    [{ filename: "opisy-produktow.csv", content: Buffer.from(csv, "utf8") }],
  );
  void zapiszLead(email, produkty.length);

  return NextResponse.json({
    ok: true,
    wyslano,
    email,
    liczba: produkty.length,
    kolumnaNazwy: tabela.naglowki[kn],
    przyklady,
    csv: Buffer.from(csv, "utf8").toString("base64"),
  });
}
