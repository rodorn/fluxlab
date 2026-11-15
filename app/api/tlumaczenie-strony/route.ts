import { NextResponse } from "next/server";

import { BladAdresu } from "@/lib/bezpieczny-fetch";
import { ramkaMaila, wyslijWynik } from "@/lib/dokumenty-mail";
import { originDozwolony } from "@/lib/limit-ip";
import { OFERTA } from "@/lib/sprzedaz";
import { stripe } from "@/lib/stripe";
import { htmlJezyka, mailTlumaczenie, pobierzPodstrony, przetlumacz, xlsxTlumaczen } from "@/lib/tlumaczenie-strony";

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
      body: JSON.stringify({ akcja: "zwrot", id: sesjaId, powod: "automat tlumaczenia strony" }),
    });
    if (!r.ok) throw new Error(`zwrot ${r.status}`);
    await wyslijWynik(
      email,
      "Zwrot płatności za tłumaczenie strony",
      ramkaMaila(
        "Przepraszamy, zwracamy pieniądze",
        `<p style="margin:0">Nie udało nam się przetłumaczyć podanej strony, więc zwróciliśmy całą płatność. Pieniądze wrócą na kartę w ciągu kilku dni roboczych.</p>`,
      ),
      "Nie udało nam się przetłumaczyć podanej strony, więc zwróciliśmy całą płatność. Pieniądze wrócą na kartę w ciągu kilku dni roboczych.",
    );
  } catch (e) {
    console.error("[tlumaczenie-strony] zwrot", sesjaId, e);
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
  if (OFERTA[String(sesja.metadata?.produkt ?? "")]?.wgraj !== "adres" || !["paid", "no_payment_required"].includes(sesja.payment_status))
    return blad("Ta płatność nie jest opłacona albo nie dotyczy tego produktu.", 402);
  const email: string = sesja.customer_details?.email ?? sesja.customer_email ?? "";
  if (!email) return blad("Brak adresu e-mail w płatności.", 400);

  const meta: Record<string, string> = sesja.metadata ?? {};
  if (meta.dok_status === "gotowe") return blad("Ta strona została już przetłumaczona. Wynik jest w mailu.", 409);
  if (meta.dok_status === "zwrot") return blad("Ta płatność została zwrócona.", 409);
  if (meta.dok_start && Date.now() - Number(meta.dok_start) < BLOKADA_MS) return blad("Tłumaczenie trwa. Wynik przyjdzie mailem.", 409);

  const adres = String(f!.get("adres") ?? "").trim();
  if (adres.length < 4 || adres.length > 300) return blad("Podaj adres strony, na przykład twojafirma.pl.", 400);

  await ustaw(sesjaId, { dok_start: String(Date.now()) });
  let podstrony;
  try {
    podstrony = await pobierzPodstrony(/^https?:\/\//i.test(adres) ? adres : `https://${adres}`);
  } catch (e) {
    await ustaw(sesjaId, { dok_start: "" }).catch(() => {});
    if (e instanceof BladAdresu) return blad(`${e.message} Płatność nie została wykorzystana, spróbuj z innym adresem.`, 400);
    console.error("[tlumaczenie-strony] pobranie", adres, e);
    return blad("Nie udało się pobrać strony. Spróbuj za chwilę, płatność nie została wykorzystana.", 502);
  }

  const proby = Number(meta.dok_proby ?? 0) + 1;
  await ustaw(sesjaId, { dok_proby: String(proby) });
  try {
    const wyniki = [];
    for (let i = 0; i < podstrony.length; i += 3) wyniki.push(...(await Promise.all(podstrony.slice(i, i + 3).map(przetlumacz))));
    const mail = mailTlumaczenie(wyniki);
    const wyslano = await wyslijWynik(email, mail.temat, mail.html, mail.tekst, [
      { filename: "tlumaczenie.xlsx", content: xlsxTlumaczen(wyniki) },
      { filename: "en.html", content: htmlJezyka(wyniki, "en") },
      { filename: "de.html", content: htmlJezyka(wyniki, "de") },
    ]);
    await ustaw(sesjaId, { dok_status: "gotowe", dok_start: "" });
    return NextResponse.json({ ok: true, wyslano, email, html: mail.html });
  } catch (e) {
    console.error("[tlumaczenie-strony]", adres, proby, e);
    await ustaw(sesjaId, { dok_start: "" }).catch(() => {});
    if (proby >= PROB_DO_ZWROTU) {
      await ustaw(sesjaId, { dok_status: "zwrot" }).catch(() => {});
      await zwrot(sesjaId, email);
      return blad("Nie udało się przetłumaczyć strony, więc zwróciliśmy płatność. Potwierdzenie jest w mailu.", 502);
    }
    return blad("Nie udało się przetłumaczyć strony. Spróbuj jeszcze raz, a przy drugiej porażce zwrócimy płatność.", 502);
  }
}
