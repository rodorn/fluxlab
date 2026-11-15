import { NextResponse } from "next/server";

import { wyslijWynik } from "@/lib/dokumenty-mail";
import { dane } from "@/lib/fl-dane";
import { originDozwolony, utworzLimit } from "@/lib/limit-ip";
import { MAX_NIPOW, PRODUKT_DANE, mailPierwszy, zrobMigawke, type Migawka } from "@/lib/monitoring-kontrahentow";
import { nipPoprawny, wyciagnijNipy } from "@/lib/rejestry-publiczne";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const AKTYWNE = new Set(["active", "trialing", "past_due"]);
const limit = utworzLimit();
const blad = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status });

type Lista = { email: string; sub: string | null; nipy: string[]; stan: Migawka | null };

async function sesjaAktywna(sesjaId: string): Promise<{ email: string; sub: string | null } | NextResponse> {
  if (!/^cs_(live|test)_[A-Za-z0-9]+$/.test(sesjaId)) return blad("Brak potwierdzenia płatności. Użyj linku z maila od Fluxlab.", 400);
  let sesja;
  try {
    sesja = await stripe(`checkout/sessions/${sesjaId}`);
  } catch {
    return blad("Nie znaleziono płatności.", 404);
  }
  if (String(sesja.metadata?.produkt ?? "").split(",").map((x: string) => x.trim()).indexOf("monitoring-kontrahentow") < 0 || sesja.payment_status !== "paid")
    return blad("Ta płatność nie jest opłacona albo nie dotyczy tego produktu.", 402);
  if (sesja.subscription) {
    const sub = await stripe(`subscriptions/${sesja.subscription}`);
    if (!AKTYWNE.has(sub.status)) return blad("Subskrypcja jest wyłączona. Zamów ją ponownie na stronie produktu.", 402);
  }
  const email: string = sesja.customer_details?.email ?? sesja.customer_email ?? "";
  if (!email) return blad("Brak adresu e-mail w płatności.", 400);
  return { email, sub: sesja.subscription ? String(sesja.subscription) : null };
}

/** Bieżąca lista firm dla panelu. */
export async function GET(req: Request) {
  if (limit(req)) return blad("Za dużo prób, spróbuj za minutę.", 429);
  const sesjaId = new URL(req.url).searchParams.get("sesja") ?? "";
  const s = await sesjaAktywna(sesjaId);
  if (s instanceof NextResponse) return s;
  const dok = await dane(PRODUKT_DANE).pobierz<Lista>("listy", sesjaId);
  return NextResponse.json({ ok: true, nipy: dok?.dane.nipy ?? [], email: s.email });
}

export async function POST(req: Request) {
  if (!originDozwolony(req.headers.get("origin"))) return blad("origin", 403);
  if (limit(req)) return blad("Za dużo prób, spróbuj za minutę.", 429);
  const f = await req.formData().catch(() => null);
  if (!f) return blad("Nieprawidłowe zapytanie.", 400);
  const tekst = String(f.get("tekst") ?? "");
  if (tekst.length > 20000) return blad("Tekst jest za długi.", 413);

  const { nipy, odrzucone } = wyciagnijNipy(tekst);
  if (!nipy.length) return blad("Nie znaleźliśmy żadnego NIP-u. NIP ma 10 cyfr, można go wpisać z myślnikami albo z prefiksem PL.", 400);
  if (nipy.length > MAX_NIPOW) return blad(`Na liście jest ${nipy.length} firm, a w subskrypcji mieścimy do ${MAX_NIPOW}.`, 400);
  const zle = nipy.filter((n) => !nipPoprawny(n));
  if (zle.length) return blad(`Błędny numer NIP (nie zgadza się suma kontrolna): ${zle.slice(0, 5).join(", ")}. Popraw go i spróbuj ponownie.`, 400);

  if (new URL(req.url).searchParams.has("podglad")) {
    let m: Migawka;
    try {
      m = await zrobMigawke(nipy.slice(0, 3));
    } catch {
      return blad("Wykaz podatników VAT nie odpowiada. Spróbuj za chwilę.", 502);
    }
    return NextResponse.json({
      ok: true,
      ograniczone: nipy.length > 3,
      firmy: Object.entries(m).map(([nip, p]) => ({ nip, nazwa: p.n, status: p.s, rachunki: p.r.length })),
    });
  }

  const sesjaId = String(f.get("sesja") ?? "");
  const s = await sesjaAktywna(sesjaId);
  if (s instanceof NextResponse) return s;

  let migawka: Migawka;
  try {
    migawka = await zrobMigawke(nipy);
  } catch {
    return blad("Wykaz podatników VAT nie odpowiada. Lista nie została zapisana, spróbuj za kilka minut.", 502);
  }
  const baza = dane(PRODUKT_DANE);
  const poprzednia = await baza.pobierz<Lista>("listy", sesjaId);
  await baza.ustaw("listy", sesjaId, { klucz: "aktywna", dane: { email: s.email, sub: s.sub, nipy, stan: migawka } satisfies Lista });
  const m = mailPierwszy(migawka);
  const wyslano = await wyslijWynik(s.email, m.temat, m.html, m.tekst);
  return NextResponse.json({
    ok: true,
    email: s.email,
    wyslano,
    zmieniona: !!poprzednia,
    odrzucone,
    firmy: nipy.map((nip) => ({ nip, nazwa: migawka[nip].n, status: migawka[nip].s, rachunki: migawka[nip].r.length })),
  });
}
