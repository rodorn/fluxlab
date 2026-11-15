import { NextResponse } from "next/server";

import { ramkaMaila, wyslijWynik } from "@/lib/dokumenty-mail";
import { originDozwolony } from "@/lib/limit-ip";
import { OFERTA } from "@/lib/sprzedaz";
import { stripe } from "@/lib/stripe";
import { mailDokumenty, plikHtml, przygotujDokumenty, sprawdzOdpowiedzi } from "@/lib/regulamin-ankieta";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const PROB_DO_ZWROTU = 2;
const BLOKADA_MS = 6 * 60_000;

const blad = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status });

const ustaw = (sesjaId: string, m: Record<string, string>) =>
  stripe(`checkout/sessions/${sesjaId}`, new URLSearchParams(Object.fromEntries(Object.entries(m).map(([k, v]) => [`metadata[${k}]`, v]))));

async function zwrot(sesjaId: string, email: string) {
  try {
    const r = await fetch("https://fluxlab.pl/api/automat/zamowienia", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-automat": process.env.AUTOMAT_SEKRET ?? "" },
      body: JSON.stringify({ akcja: "zwrot", id: sesjaId, powod: "automat regulaminu" }),
    });
    if (!r.ok) throw new Error(`zwrot ${r.status}`);
    await wyslijWynik(
      email,
      "Zwrot płatności za regulamin i politykę prywatności",
      ramkaMaila(
        "Przepraszamy, zwracamy pieniądze",
        `<p style="margin:0">Nie udało nam się przygotować dokumentów, więc zwróciliśmy całą płatność. Pieniądze wrócą na kartę w ciągu kilku dni roboczych.</p>`,
      ),
      "Nie udało nam się przygotować dokumentów, więc zwróciliśmy całą płatność. Pieniądze wrócą na kartę w ciągu kilku dni roboczych.",
    );
  } catch (e) {
    console.error("[regulamin-ankieta] zwrot", sesjaId, e);
  }
}

export async function POST(req: Request) {
  if (!originDozwolony(req.headers.get("origin"))) return blad("origin", 403);
  const f = await req.formData().catch(() => null);
  const sesjaId = String(f?.get("sesja") ?? "");
  if (!/^cs_(live|test)_[A-Za-z0-9]+$/.test(sesjaId)) return blad("Brak potwierdzenia płatności. Wróć do linku z maila od Stripe.", 400);

  let sesja;
  try {
    sesja = await stripe(`checkout/sessions/${sesjaId}`);
  } catch {
    return blad("Nie znaleziono płatności.", 404);
  }
  if (OFERTA[String(sesja.metadata?.produkt ?? "")]?.wgraj !== "ankieta" || !["paid", "no_payment_required"].includes(sesja.payment_status))
    return blad("Ta płatność nie jest opłacona albo nie dotyczy tego produktu.", 402);
  const email: string = sesja.customer_details?.email ?? sesja.customer_email ?? "";
  if (!email) return blad("Brak adresu e-mail w płatności.", 400);

  const meta: Record<string, string> = sesja.metadata ?? {};
  if (meta.dok_status === "gotowe") return blad("Dokumenty zostały już wysłane. Są w mailu.", 409);
  if (meta.dok_status === "zwrot") return blad("Ta płatność została zwrócona.", 409);
  if (meta.dok_start && Date.now() - Number(meta.dok_start) < BLOKADA_MS) return blad("Przygotowanie trwa. Dokumenty przyjdą mailem.", 409);

  const w = sprawdzOdpowiedzi(f!);
  if ("blad" in w) return blad(w.blad, 400);

  await ustaw(sesjaId, { dok_start: String(Date.now()) });
  const proby = Number(meta.dok_proby ?? 0) + 1;
  await ustaw(sesjaId, { dok_proby: String(proby) });
  try {
    const dok = await przygotujDokumenty(w.odp);
    const mail = mailDokumenty(dok);
    const wyslano = await wyslijWynik(email, mail.temat, mail.html, mail.tekst, [
      { filename: "regulamin.html", content: plikHtml(dok.regulamin) },
      { filename: "polityka-prywatnosci.html", content: plikHtml(dok.polityka) },
    ]);
    await ustaw(sesjaId, { dok_status: "gotowe", dok_start: "" });
    return NextResponse.json({ ok: true, wyslano, email, html: mail.html });
  } catch (e) {
    console.error("[regulamin-ankieta]", proby, e);
    await ustaw(sesjaId, { dok_start: "" }).catch(() => {});
    if (proby >= PROB_DO_ZWROTU) {
      await ustaw(sesjaId, { dok_status: "zwrot" }).catch(() => {});
      await zwrot(sesjaId, email);
      return blad("Nie udało się przygotować dokumentów, więc zwróciliśmy płatność. Potwierdzenie jest w mailu.", 502);
    }
    return blad("Nie udało się przygotować dokumentów. Spróbuj jeszcze raz, a przy drugiej porażce zwrócimy płatność.", 502);
  }
}
