import { NextResponse } from "next/server";

import { esc, ramkaMaila, wyslijWynik } from "@/lib/dokumenty-mail";
import { originDozwolony } from "@/lib/limit-ip";
import { OFERTA } from "@/lib/sprzedaz";
import { stripe } from "@/lib/stripe";
import { analizujUmowe, mailPorownanie, mailUmowa, porownajUmowy } from "@/lib/umowy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const MAX_ZALACZNIKOW = 4_200_000;
const PROB_DO_ZWROTU = 2;
const BLOKADA_MS = 5 * 60_000;

type PI = { id: string; metadata: Record<string, string> };

const blad = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status });

async function zwrot(pi: PI, email: string) {
  try {
    await stripe("refunds", new URLSearchParams({ payment_intent: pi.id, "metadata[powod]": "automat dokumentow" }));
    await wyslijWynik(
      email,
      "Zwrot płatności za analizę dokumentu",
      ramkaMaila(
        "Przepraszamy, zwracamy pieniądze",
        `<p style="margin:0">Nie udało nam się przeczytać wgranego dokumentu, więc zwróciliśmy całą płatność. Pieniądze wrócą na kartę w ciągu kilku dni roboczych. Jeśli plik był skanem albo był chroniony hasłem, wyślij wersję z tekstem do zaznaczenia i napisz do nas, a zrobimy analizę ręcznie.</p>`,
      ),
      "Nie udało nam się przeczytać wgranego dokumentu, więc zwróciliśmy całą płatność. Pieniądze wrócą na kartę w ciągu kilku dni roboczych.",
    );
  } catch (e) {
    console.error("[umowy] zwrot", pi.id, e);
  }
}

export async function POST(req: Request) {
  if (!originDozwolony(req.headers.get("origin"))) return blad("origin", 403);
  const f = await req.formData().catch(() => null);
  const sesjaId = String(f?.get("sesja") ?? "");
  if (!/^cs_(live|test)_[A-Za-z0-9]+$/.test(sesjaId)) return blad("Brak potwierdzenia płatności. Wróć do linku z maila od Stripe.", 400);

  let sesja;
  try {
    sesja = await stripe(`checkout/sessions/${sesjaId}?expand[]=payment_intent`);
  } catch {
    return blad("Nie znaleziono płatności.", 404);
  }
  const pi: PI | undefined = sesja.payment_intent;
  const id = String(sesja.metadata?.produkt ?? "");
  const tryb = OFERTA[id]?.wgraj;
  if (sesja.payment_status !== "paid" || !pi || !tryb) return blad("Ta płatność nie jest opłacona albo nie dotyczy tego produktu.", 402);
  const email: string = sesja.customer_details?.email ?? sesja.customer_email ?? "";
  if (!email) return blad("Brak adresu e-mail w płatności.", 400);

  const meta = pi.metadata ?? {};
  if (meta.dok_status === "gotowe") return blad("Dokument z tej płatności został już przeanalizowany. Wynik jest w mailu.", 409);
  if (meta.dok_status === "zwrot") return blad("Ta płatność została zwrócona.", 409);
  if (meta.dok_start && Date.now() - Number(meta.dok_start) < BLOKADA_MS)
    return blad("Analiza trwa. Wynik przyjdzie mailem.", 409);

  const pliki = f!.getAll("plik").filter((x): x is File => x instanceof File && x.size > 0);
  const potrzeba = tryb === "porownanie" ? 2 : 1;
  if (pliki.length !== potrzeba) return blad(potrzeba === 2 ? "Wgraj dwa pliki PDF." : "Wgraj jeden plik PDF.", 400);
  if (pliki.some((x) => x.size > MAX_ZALACZNIKOW)) return blad("Plik jest za duży. Limit to 4 MB na całość.", 413);
  if (pliki.reduce((s, x) => s + x.size, 0) > MAX_ZALACZNIKOW) return blad("Pliki są za duże. Limit to 4 MB łącznie.", 413);
  const bufory = await Promise.all(pliki.map(async (x) => Buffer.from(await x.arrayBuffer())));
  if (bufory.some((b) => b.subarray(0, 5).toString() !== "%PDF-")) return blad("To nie jest plik PDF.", 400);

  const proby = Number(meta.dok_proby ?? 0) + 1;
  await stripe(`payment_intents/${pi.id}`, new URLSearchParams({ "metadata[dok_start]": String(Date.now()), "metadata[dok_proby]": String(proby) }));

  try {
    const mail =
      tryb === "umowa"
        ? mailUmowa(await analizujUmowe(bufory[0], pliki[0].name), pliki[0].name)
        : mailPorownanie(await porownajUmowy(bufory[0], pliki[0].name, bufory[1], pliki[1].name));
    const wyslano = await wyslijWynik(email, mail.temat, mail.html, mail.tekst);
    await stripe(`payment_intents/${pi.id}`, new URLSearchParams({ "metadata[dok_status]": "gotowe", "metadata[dok_start]": "" }));
    return NextResponse.json({ ok: true, wyslano, email, html: mail.html });
  } catch (e) {
    console.error("[umowy]", id, proby, e);
    await stripe(`payment_intents/${pi.id}`, new URLSearchParams({ "metadata[dok_start]": "" })).catch(() => {});
    if (proby >= PROB_DO_ZWROTU) {
      await stripe(`payment_intents/${pi.id}`, new URLSearchParams({ "metadata[dok_status]": "zwrot" })).catch(() => {});
      await zwrot(pi, email);
      return blad("Nie udało się przeczytać dokumentu, więc zwróciliśmy płatność. Potwierdzenie jest w mailu.", 502);
    }
    return blad("Nie udało się przeczytać dokumentu. Spróbuj jeszcze raz, a przy drugiej porażce zwrócimy płatność.", 502);
  }
}
