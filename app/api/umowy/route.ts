import { NextResponse } from "next/server";

import { esc, ramkaMaila, wyslijWynik } from "@/lib/dokumenty-mail";
import { originDozwolony } from "@/lib/limit-ip";
import { OFERTA } from "@/lib/sprzedaz";
import { stripe } from "@/lib/stripe";
import { analizujUmowe, mailPorownanie, mailPytanie, mailUmowa, odpowiedzPodatkowa, porownajUmowy } from "@/lib/umowy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const MAX_ZALACZNIKOW = 4_200_000;
const PROB_DO_ZWROTU = 2;
const BLOKADA_MS = 5 * 60_000;

const blad = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status });

async function zwrot(sesjaId: string, email: string) {
  try {
    const r = await fetch("https://fluxlab.pl/api/automat/zamowienia", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-automat": process.env.AUTOMAT_SEKRET ?? "" },
      body: JSON.stringify({ akcja: "zwrot", id: sesjaId, powod: "automat dokumentow" }),
    });
    if (!r.ok) throw new Error(`zwrot ${r.status}`);
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
    console.error("[umowy] zwrot", sesjaId, e);
  }
}

const ustaw = (sesjaId: string, m: Record<string, string>) =>
  stripe(`checkout/sessions/${sesjaId}`, new URLSearchParams(Object.fromEntries(Object.entries(m).map(([k, v]) => [`metadata[${k}]`, v]))));

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
  const id = String(sesja.metadata?.produkt ?? "");
  const tryb = OFERTA[id]?.wgraj;
  if (!["paid", "no_payment_required"].includes(sesja.payment_status) || !tryb || tryb === "faktury") return blad("Ta płatność nie jest opłacona albo nie dotyczy tego produktu.", 402);
  const email: string = sesja.customer_details?.email ?? sesja.customer_email ?? "";
  if (!email) return blad("Brak adresu e-mail w płatności.", 400);

  const meta: Record<string, string> = sesja.metadata ?? {};
  if (meta.dok_status === "gotowe") return blad("Dokument z tej płatności został już przeanalizowany. Wynik jest w mailu.", 409);
  if (meta.dok_status === "zwrot") return blad("Ta płatność została zwrócona.", 409);
  if (meta.dok_start && Date.now() - Number(meta.dok_start) < BLOKADA_MS)
    return blad("Analiza trwa. Wynik przyjdzie mailem.", 409);

  const pytanie = tryb === "pytanie" ? String(f!.get("tekst") ?? "").trim() : "";
  if (tryb === "pytanie" && (pytanie.length < 30 || pytanie.length > 4000))
    return blad("Opisz sprawę w 30 do 4000 znakach: kto jesteś podatkowo, co się stało i o co pytasz.", 400);
  const pliki = tryb === "pytanie" ? [] : f!.getAll("plik").filter((x): x is File => x instanceof File && x.size > 0);
  let bufory: Buffer[] = [];
  if (tryb !== "pytanie") {
    const potrzeba = tryb === "porownanie" ? 2 : 1;
    if (pliki.length !== potrzeba) return blad(potrzeba === 2 ? "Wgraj dwa pliki PDF." : "Wgraj jeden plik PDF.", 400);
    if (pliki.some((x) => x.size > MAX_ZALACZNIKOW)) return blad("Plik jest za duży. Limit to 4 MB na całość.", 413);
    if (pliki.reduce((s, x) => s + x.size, 0) > MAX_ZALACZNIKOW) return blad("Pliki są za duże. Limit to 4 MB łącznie.", 413);
    bufory = await Promise.all(pliki.map(async (x) => Buffer.from(await x.arrayBuffer())));
    if (bufory.some((b) => b.subarray(0, 5).toString() !== "%PDF-")) return blad("To nie jest plik PDF.", 400);
  }

  const proby = Number(meta.dok_proby ?? 0) + 1;
  await ustaw(sesjaId, { dok_start: String(Date.now()), dok_proby: String(proby) });

  try {
    const mail =
      tryb === "pytanie"
        ? mailPytanie(await odpowiedzPodatkowa(pytanie), pytanie)
        : tryb === "umowa"
        ? mailUmowa(await analizujUmowe(bufory[0], pliki[0].name), pliki[0].name)
        : mailPorownanie(await porownajUmowy(bufory[0], pliki[0].name, bufory[1], pliki[1].name));
    const wyslano = await wyslijWynik(email, mail.temat, mail.html, mail.tekst);
    await ustaw(sesjaId, { dok_status: "gotowe", dok_start: "" });
    return NextResponse.json({ ok: true, wyslano, email, html: mail.html });
  } catch (e) {
    console.error("[umowy]", id, proby, e);
    await ustaw(sesjaId, { dok_start: "" }).catch(() => {});
    if (proby >= PROB_DO_ZWROTU) {
      await ustaw(sesjaId, { dok_status: "zwrot" }).catch(() => {});
      await zwrot(sesjaId, email);
      return blad("Nie udało się przeczytać dokumentu, więc zwróciliśmy płatność. Potwierdzenie jest w mailu.", 502);
    }
    return blad("Nie udało się przeczytać dokumentu. Spróbuj jeszcze raz, a przy drugiej porażce zwrócimy płatność.", 502);
  }
}

/** Przypomnienie dla opłaconych bez wgranego pliku; woła je cron na VPS co 10 minut. */
export async function GET(req: Request) {
  const sekret = process.env.AUTOMAT_SEKRET ?? "";
  if (!sekret || req.headers.get("x-automat") !== sekret) return blad("brak dostępu", 401);
  const test = new URL(req.url).searchParams.get("test") === "1";
  const teraz = Math.floor(Date.now() / 1000);
  const lista = await stripe(`checkout/sessions?limit=100&status=complete&created[gte]=${teraz - 5 * 86400}&created[lte]=${teraz - 30 * 60}`);
  const wyslane: string[] = [];
  for (const s of lista.data as { id: string; metadata: Record<string, string>; payment_status: string; customer_details?: { email?: string } }[]) {
    const m = s.metadata ?? {};
    const oferta = OFERTA[m.produkt ?? ""];
    if (!oferta?.wgraj || (m.zrodlo === "test") !== test) continue;
    if (!["paid", "no_payment_required"].includes(s.payment_status)) continue;
    if (m.dok_status || m.dok_przyp || m.zwrot) continue;
    const email = s.customer_details?.email;
    if (!email) continue;
    const link = `https://fluxlab.pl/wgraj-umowe?p=${m.produkt}&sesja=${s.id}`;
    const ok = await wyslijWynik(
      email,
      "Wgraj dokument do analizy",
      ramkaMaila(
        "Wgraj dokument, a zrobimy analizę",
        `<p style="margin:0 0 12px">Płatność za „${esc(oferta.nazwa)}” jest przyjęta, ale nie dostaliśmy jeszcze pliku.</p><p style="margin:0"><a href="${link}">Wgraj PDF tutaj</a>. Wynik pojawi się na ekranie i przyjdzie mailem.</p>`,
      ),
      `Płatność za ${oferta.nazwa} jest przyjęta, ale nie dostaliśmy jeszcze pliku. Wgraj PDF: ${link}`,
    );
    if (ok) {
      await ustaw(s.id, { dok_przyp: new Date().toISOString() });
      wyslane.push(s.id);
    }
  }
  return NextResponse.json({ ok: true, wyslane });
}
