import { NextResponse } from "next/server";

import { automatDozwolony, esc, ramkaMaila, wyslijMail, zapisz, znajdz, ustaw } from "@/lib/fl-produkty";
import { stripe } from "@/lib/stripe";

export const maxDuration = 120;

const PRODUKT = "rata-komis";
const ZNACZNIK = "przyjete_ratakomis";
const AKTYWNE = new Set(["active", "trialing", "past_due"]);

type Sesja = {
  id: string;
  subscription: string | null;
  payment_status: string;
  created: number;
  metadata: Record<string, string>;
  customer_details?: { email?: string };
  custom_fields?: { key: string; text?: { value?: string } }[];
};

const pole = (s: Sesja, k: string) => s.custom_fields?.find((f) => f.key === k)?.text?.value?.trim() ?? "";

function rozbierz(dane: string, oproc: string) {
  const mail = dane.match(/[^\s,;]+@[^\s,;]+\.[^\s,;]{2,}/)?.[0];
  const tel = dane.match(/(\+?\d[\d\s-]{7,}\d)/)?.[0];
  const kontakt = (mail ?? tel ?? "").trim();
  const nazwa = dane.replace(kontakt, "").replace(/[\s,;:\-–]*(tel\.?|telefon|e-?mail|mail|kontakt)?[\s,;:\-–]*$/i, "").replace(/^[\s,;\-–]+/, "").replace(/\s+/g, " ").trim();
  const o = Number(oproc.replace(",", ".").replace(/[^\d.]/g, ""));
  return { nazwa: nazwa.slice(0, 80), kontakt: kontakt.slice(0, 80), oproc: Number.isFinite(o) && o > 0 && o <= 40 ? String(o) : "" };
}

export async function POST(req: Request) {
  if (!automatDozwolony(req)) return NextResponse.json({ error: "brak dostępu" }, { status: 401 });
  const test = new URL(req.url).searchParams.get("test") === "1";
  const od = Math.floor(Date.now() / 1000) - 90 * 86400;
  const wynik = { nowe: 0, zsynchronizowane: 0, bledy: [] as string[] };

  const sesje: Sesja[] = [];
  let po = "";
  for (let i = 0; i < 5; i++) {
    const r = await stripe(`checkout/sessions?status=complete&limit=100&created[gte]=${od}${po ? `&starting_after=${po}` : ""}`);
    sesje.push(...r.data);
    if (!r.has_more) break;
    po = r.data.at(-1).id;
  }

  for (const s of sesje) {
    if (!(s.metadata?.produkt ?? "").split(",").map((x) => x.trim()).includes(PRODUKT)) continue;
    if ((s.metadata?.zrodlo === "test") !== test || s.payment_status === "unpaid") continue;
    const email = s.customer_details?.email;
    if (!email || !s.subscription) continue;
    try {
      const sub = await stripe(`subscriptions/${s.subscription}`);
      const aktywna = AKTYWNE.has(sub.status);
      let klient = await znajdz(PRODUKT, email);
      if (aktywna && !s.metadata[ZNACZNIK]) {
        const d = rozbierz(pole(s, "dane"), pole(s, "konkurenci"));
        const meta = { nazwa: d.nazwa, kontakt: d.kontakt, oproc: d.oproc, sesja: s.id };
        if (klient) await ustaw(klient.id, { ...meta, fl_aktywna: "1" });
        else klient = await zapisz(PRODUKT, email, meta);
        const kod = `<iframe src="https://fluxlab.pl/embed/rata?k=${klient.id}" width="100%" height="660" style="border:0;max-width:480px" loading="lazy" title="Kalkulator raty"></iframe>`;
        const html = ramkaMaila({
          naglowek: "Twój kalkulator raty jest gotowy",
          tresc: `<p style="font-size:15px;line-height:1.55">Wklej poniższy kod w miejscu na swojej stronie, w którym ma się pojawić kalkulator (w WordPressie: blok „Własny HTML”).</p>
<pre style="white-space:pre-wrap;word-break:break-all;background:#f3f4f6;border-radius:10px;padding:12px;font-size:12px">${esc(kod)}</pre>
<p style="font-size:15px;line-height:1.55">Podgląd: <a href="https://fluxlab.pl/embed/rata?k=${klient.id}">otwórz kalkulator</a>.<br>Nazwa komisu: <b>${esc(d.nazwa || "(brak)")}</b>. Przycisk „Zapytaj o ofertę”: <b>${esc(d.kontakt || "(wyłączony, brak kontaktu)")}</b>. Oprocentowanie kredytu w wyliczeniu: <b>${d.oproc ? esc(d.oproc.replace(".", ",")) : "9,9"}%</b>.</p>
<p style="font-size:15px;line-height:1.55">Chcesz zmienić nazwę, kontakt albo oprocentowanie? Odpisz na tę wiadomość, zmienimy to jeszcze dziś.</p>`,
          stopka: "Wyliczenia w kalkulatorze są orientacyjne i nie są ofertą kredytu ani leasingu. Rezygnacja w dowolnym dniu: odpisz na tę wiadomość, kalkulator wyłączy się po anulowaniu subskrypcji.",
        });
        const ok = await wyslijMail({
          do: email,
          temat: "Kalkulator raty dla Twojego komisu: kod do wklejenia",
          html,
          tekst: `Twój kalkulator raty jest gotowy. Kod do wklejenia na stronie:\n${kod}\nPodgląd: https://fluxlab.pl/embed/rata?k=${klient.id}\nZmiany nazwy, kontaktu lub oprocentowania: odpisz na tę wiadomość.`,
        });
        if (!ok) {
          await ustaw(klient.id, { fl_aktywna: "0" });
          wynik.bledy.push(`${s.id}: mail nie poszedł`);
          continue;
        }
        await stripe(`checkout/sessions/${s.id}`, new URLSearchParams({ [`metadata[${ZNACZNIK}]`]: new Date().toISOString() }));
        wynik.nowe++;
      } else if (klient && (klient.meta.fl_aktywna === "1") !== aktywna) {
        await ustaw(klient.id, { fl_aktywna: aktywna ? "1" : "0" });
        wynik.zsynchronizowane++;
      }
    } catch (e) {
      wynik.bledy.push(`${s.id}: ${(e as Error).message}`);
    }
  }
  return NextResponse.json(wynik);
}
