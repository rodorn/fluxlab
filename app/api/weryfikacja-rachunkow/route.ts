import { NextResponse } from "next/server";

import { wyslijWynik } from "@/lib/dokumenty-mail";
import { originDozwolony, utworzLimit } from "@/lib/limit-ip";
import {
  MAX_WIERSZY,
  csvWyniku,
  mailWyniku,
  podsumowanie,
  weryfikuj,
  wczytajPaczke,
} from "@/lib/rachunki";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

const MAX_BAJTOW = 1_000_000;
const AKTYWNE = new Set(["active", "trialing", "past_due"]);
const limitPodgladu = utworzLimit();
const limitPaczek = utworzLimit();
const blad = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
  if (!originDozwolony(req.headers.get("origin"))) return blad("origin", 403);
  const podglad = new URL(req.url).searchParams.has("podglad");
  if ((podglad ? limitPodgladu : limitPaczek)(req)) return blad("Za dużo prób, spróbuj za minutę.", 429);

  const f = await req.formData().catch(() => null);
  if (!f) return blad("Nieprawidłowe zapytanie.", 400);
  const plik = f.get("plik");
  let tekst = String(f.get("tekst") ?? "");
  let nazwaPliku = "wklejone-przelewy.csv";
  if (plik instanceof File && plik.size) {
    if (plik.size > MAX_BAJTOW) return blad("Plik jest za duży, maksimum to 1 MB.", 413);
    tekst = new TextDecoder("utf-8").decode(await plik.arrayBuffer());
    if (tekst.includes("�")) tekst = new TextDecoder("windows-1250").decode(await plik.arrayBuffer());
    nazwaPliku = plik.name.slice(0, 80);
  }
  if (tekst.length > MAX_BAJTOW) return blad("Tekst jest za długi, maksimum to 1 MB.", 413);

  const { pozycje, pominiete } = wczytajPaczke(tekst);
  if (!pozycje.length)
    return blad("Nie znaleźliśmy w tym pliku żadnego numeru rachunku. Rachunek ma 26 cyfr, z prefiksem PL lub bez.", 400);

  if (podglad) {
    const probka = pozycje.slice(0, 5);
    const wiersze = await weryfikuj(probka);
    return NextResponse.json({ ok: true, wiersze, ograniczone: pozycje.length > 5, podsumowanie: podsumowanie(wiersze) });
  }

  if (pozycje.length > MAX_WIERSZY)
    return blad(`W paczce jest ${pozycje.length} przelewów, a jednorazowo sprawdzamy do ${MAX_WIERSZY}. Podziel plik na części.`, 400);

  const sesjaId = String(f.get("sesja") ?? "");
  if (!/^cs_(live|test)_[A-Za-z0-9]+$/.test(sesjaId)) return blad("Brak potwierdzenia płatności. Użyj linku z maila od Fluxlab.", 400);
  let sesja;
  try {
    sesja = await stripe(`checkout/sessions/${sesjaId}`);
  } catch {
    return blad("Nie znaleziono płatności.", 404);
  }
  if (String(sesja.metadata?.produkt ?? "").split(",").map((x: string) => x.trim()).indexOf("weryfikacja-rachunkow") < 0 || sesja.payment_status !== "paid")
    return blad("Ta płatność nie jest opłacona albo nie dotyczy tego produktu.", 402);
  if (sesja.subscription) {
    const sub = await stripe(`subscriptions/${sesja.subscription}`);
    if (!AKTYWNE.has(sub.status)) return blad("Subskrypcja jest wyłączona. Zamów ją ponownie na stronie produktu.", 402);
  }
  const email: string = sesja.customer_details?.email ?? sesja.customer_email ?? "";
  if (!email) return blad("Brak adresu e-mail w płatności.", 400);

  const wiersze = await weryfikuj(pozycje);
  if (wiersze.every((w) => w.status === "blad" || w.status === "bledny") && wiersze.some((w) => w.status === "blad"))
    return blad("Wykaz podatników VAT nie odpowiada. Nic nie zostało zużyte, wgraj plik ponownie za kilka minut.", 502);

  const m = mailWyniku(wiersze, nazwaPliku);
  const wyslano = await wyslijWynik(email, m.temat, m.html, m.tekst, [
    { filename: "weryfikacja-rachunkow.csv", content: Buffer.from(csvWyniku(wiersze), "utf8") },
  ]);
  return NextResponse.json({ ok: true, wiersze, pominiete, wyslano, email, podsumowanie: podsumowanie(wiersze) });
}
