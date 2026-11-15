import { NextResponse } from "next/server";

import { wyslijWynik } from "@/lib/dokumenty-mail";
import { mailFaktury, odczytajFakture, xlsxFaktur, type Faktura } from "@/lib/faktury-excel";
import { originDozwolony } from "@/lib/limit-ip";
import { OFERTA } from "@/lib/sprzedaz";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const MAX_BAJTOW = 4_200_000;
const MAX_PLIKOW = 10;
const LIMIT_MIESIECZNY = 100;
const BLOKADA_MS = 5 * 60_000;

const blad = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status });

const ustaw = (sesjaId: string, m: Record<string, string>) =>
  stripe(`checkout/sessions/${sesjaId}`, new URLSearchParams(Object.fromEntries(Object.entries(m).map(([k, v]) => [`metadata[${k}]`, v]))));

export async function POST(req: Request) {
  if (!originDozwolony(req.headers.get("origin"))) return blad("origin", 403);
  const f = await req.formData().catch(() => null);
  const sesjaId = String(f?.get("sesja") ?? "");
  if (!/^cs_(live|test)_[A-Za-z0-9]+$/.test(sesjaId)) return blad("Brak potwierdzenia zamówienia. Wróć do linku z maila.", 400);

  let sesja;
  try {
    sesja = await stripe(`checkout/sessions/${sesjaId}`);
  } catch {
    return blad("Nie znaleziono zamówienia.", 404);
  }
  if (OFERTA[String(sesja.metadata?.produkt ?? "")]?.wgraj !== "faktury" || !sesja.subscription)
    return blad("To zamówienie nie dotyczy tego produktu.", 402);
  const abonament = await stripe(`subscriptions/${sesja.subscription}`).catch(() => null);
  if (!abonament || !["active", "trialing"].includes(abonament.status))
    return blad("Abonament nie jest aktywny. Wznów go, a plik odczytamy od ręki.", 402);
  const email: string = sesja.customer_details?.email ?? sesja.customer_email ?? "";
  if (!email) return blad("Brak adresu e-mail w zamówieniu.", 400);

  const meta: Record<string, string> = sesja.metadata ?? {};
  if (meta.fak_start && Date.now() - Number(meta.fak_start) < BLOKADA_MS) return blad("Poprzednia paczka jeszcze się liczy. Wynik przyjdzie mailem.", 409);
  const miesiac = new Date().toISOString().slice(0, 7);
  const [mMiesiac, mLicznik] = (meta.fak_mies ?? "").split(":");
  const zuzyte = mMiesiac === miesiac ? Number(mLicznik) || 0 : 0;

  const pliki = (f!.getAll("plik") as unknown[]).filter((x): x is File => x instanceof File && x.size > 0);
  if (!pliki.length || pliki.length > MAX_PLIKOW) return blad(`Wgraj od 1 do ${MAX_PLIKOW} plików PDF naraz.`, 400);
  if (zuzyte + pliki.length > LIMIT_MIESIECZNY) return blad(`Limit to ${LIMIT_MIESIECZNY} faktur w miesiącu, w tym miesiącu zostało ${Math.max(0, LIMIT_MIESIECZNY - zuzyte)}.`, 429);
  if (pliki.reduce((s, x) => s + x.size, 0) > MAX_BAJTOW) return blad("Pliki są za duże. Limit to 4 MB łącznie.", 413);
  const bufory = await Promise.all(pliki.map(async (x) => Buffer.from(await x.arrayBuffer())));
  if (bufory.some((b) => b.subarray(0, 5).toString() !== "%PDF-")) return blad("Wszystkie pliki muszą być w formacie PDF.", 400);

  await ustaw(sesjaId, { fak_start: String(Date.now()), dok_status: "uzywane" });
  const wyniki: (Faktura | null)[] = [];
  for (let i = 0; i < pliki.length; i += 5) {
    const grupa = await Promise.all(
      pliki.slice(i, i + 5).map((p, k) =>
        odczytajFakture(bufory[i + k], p.name || `faktura-${i + k + 1}.pdf`).catch((e) => {
          console.error("[faktury-excel]", p.name, e);
          return null;
        }),
      ),
    );
    wyniki.push(...grupa);
  }
  const faktury = wyniki.filter((w): w is Faktura => !!w);
  const bledne = pliki.filter((_, i) => !wyniki[i]).map((p) => p.name);
  await ustaw(sesjaId, { fak_start: "", fak_mies: `${miesiac}:${zuzyte + faktury.length}` });
  if (!faktury.length) return blad("Nie udało się odczytać żadnej faktury. Wgraj PDF z tekstem, nie skan; limit faktur w miesiącu nie został naruszony.", 502);

  const xlsx = xlsxFaktur(faktury);
  const link = `https://fluxlab.pl/wgraj-umowe?p=${meta.produkt}&sesja=${sesjaId}`;
  const mail = mailFaktury(faktury, bledne, link);
  const wyslano = await wyslijWynik(email, mail.temat, mail.html, mail.tekst, [{ filename: "faktury.xlsx", content: xlsx }]);
  return NextResponse.json({ ok: true, email, wyslano, html: mail.html, liczba: faktury.length, xlsx: xlsx.toString("base64") });
}
