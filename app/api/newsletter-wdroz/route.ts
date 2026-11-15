import { NextResponse } from "next/server";

import { automatDozwolony, esc, ramkaMaila, wyslijMail, zapisz, znajdz, ustaw } from "@/lib/fl-produkty";
import { adresKanalu, db, pobierzKanal, PRODUKT_NL } from "@/lib/newsletter";
import { stripe } from "@/lib/stripe";

export const maxDuration = 120;

const ZNACZNIK = "przyjete_newsletter";
const AKTYWNE = new Set(["active", "trialing", "past_due"]);

type Sesja = {
  id: string;
  subscription: string | null;
  payment_status: string;
  metadata: Record<string, string>;
  customer_details?: { email?: string };
  custom_fields?: { key: string; text?: { value?: string } }[];
};

const pole = (s: Sesja, k: string) => s.custom_fields?.find((f) => f.key === k)?.text?.value?.trim() ?? "";

function rozbierz(dane: string) {
  const feed = adresKanalu(dane);
  const nazwa = dane.replace(/https?:\/\/[^\s,;]+/i, "").replace(/^[\s,;:\-–]+|[\s,;:\-–]+$/g, "").replace(/\s+/g, " ").slice(0, 60);
  return { feed, nazwa };
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
    if (!(s.metadata?.produkt ?? "").split(",").map((x) => x.trim()).includes(PRODUKT_NL)) continue;
    if ((s.metadata?.zrodlo === "test") !== test || s.payment_status === "unpaid") continue;
    const email = s.customer_details?.email;
    if (!email || !s.subscription) continue;
    try {
      const sub = await stripe(`subscriptions/${s.subscription}`);
      const aktywna = AKTYWNE.has(sub.status);
      let klient = await znajdz(PRODUKT_NL, email);
      if (aktywna && !s.metadata[ZNACZNIK]) {
        const d = rozbierz(pole(s, "dane"));
        let wpisy = null as Awaited<ReturnType<typeof pobierzKanal>> | null;
        if (d.feed) wpisy = await pobierzKanal(d.feed).catch(() => null);
        if (!d.feed || !wpisy || wpisy.length === 0) {
          await wyslijMail({
            do: email,
            temat: "Newsletter z bloga: potrzebujemy poprawnego adresu kanału RSS",
            html: ramkaMaila({
              naglowek: "Nie możemy odczytać kanału RSS",
              tresc: `<p style="font-size:15px;line-height:1.55">Z podanego adresu („${esc(pole(s, "dane") || "brak")}”) nie udało się odczytać wpisów. Odpisz na tę wiadomość adresem kanału RSS lub Atom swojego bloga (zwykle kończy się na /feed albo /rss.xml), uruchomimy newsletter jeszcze dziś. Jeśli wolisz zrezygnować, odpisz „rezygnuję”, wystarczy jedno słowo.</p>`,
              stopka: "Subskrypcja nie ruszy, dopóki nie dostaniemy działającego adresu.",
            }),
            tekst: "Nie udało się odczytać kanału RSS z podanego adresu. Odpisz na tę wiadomość poprawnym adresem kanału RSS lub Atom swojego bloga albo napisz „rezygnuję”.",
          });
          await stripe(`checkout/sessions/${s.id}`, new URLSearchParams({ [`metadata[${ZNACZNIK}]`]: `blad:${new Date().toISOString()}` }));
          wynik.bledy.push(`${s.id}: kanał nieczytelny`);
          continue;
        }
        const meta = { nazwa: d.nazwa || "Newsletter", feed: d.feed, sesja: s.id };
        if (klient) await ustaw(klient.id, { ...meta, fl_aktywna: "1" });
        else klient = await zapisz(PRODUKT_NL, email, meta);
        const stan = { widziane: wpisy.map((w) => w.id).slice(0, 300), start: new Date().toISOString() };
        if (await db.pobierz("stan", klient.id)) await db.ustaw("stan", klient.id, { dane: stan });
        else await db.dodaj("stan", { id: klient.id, dane: stan });
        const kod = `<iframe src="https://fluxlab.pl/embed/newsletter?k=${klient.id}" width="100%" height="220" style="border:0;max-width:480px" loading="lazy" title="Zapis na newsletter"></iframe>`;
        const html = ramkaMaila({
          naglowek: "Twój newsletter jest gotowy",
          tresc: `<p style="font-size:15px;line-height:1.55">Wklej poniższy kod na swojej stronie lub blogu, tam gdzie ma być formularz zapisu (w WordPressie: blok „Własny HTML”). Czytelnik wpisuje adres e-mail i potwierdza go linkiem z maila.</p>
<pre style="white-space:pre-wrap;word-break:break-all;background:#f3f4f6;border-radius:10px;padding:12px;font-size:12px">${esc(kod)}</pre>
<p style="font-size:15px;line-height:1.55">Podgląd formularza: <a href="https://fluxlab.pl/embed/newsletter?k=${klient.id}">otwórz</a>.<br>Nadawca: <b>${esc(meta.nazwa)} przez Fluxlab</b>. Kanał: <b>${esc(d.feed)}</b>.</p>
<p style="font-size:15px;line-height:1.55">Co dalej: nowe wpisy z kanału (do 3 na raz, sprawdzamy co 30 minut) trafiają do potwierdzonych odbiorców. Wpisy, które już są na blogu, nie zostaną rozesłane. Chcesz zmienić nazwę nadawcy albo kanał? Odpisz na tę wiadomość.</p>`,
          stopka: "Każda wiadomość ma link do wypisu. Po anulowaniu subskrypcji formularz się wyłącza, a lista odbiorców jest usuwana. Rezygnacja w dowolnym dniu: odpisz na tę wiadomość.",
        });
        const ok = await wyslijMail({
          do: email,
          temat: "Newsletter z bloga: kod formularza do wklejenia",
          html,
          tekst: `Twój newsletter jest gotowy. Kod formularza do wklejenia:\n${kod}\nPodgląd: https://fluxlab.pl/embed/newsletter?k=${klient.id}\nNowe wpisy z kanału ${d.feed} trafiają do potwierdzonych odbiorców.`,
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
        if (!aktywna) {
          await db.usunKlucz(klient.id, "odbiorcy");
          await db.usun("stan", klient.id);
        }
        wynik.zsynchronizowane++;
      }
    } catch (e) {
      wynik.bledy.push(`${s.id}: ${(e as Error).message}`);
    }
  }
  return NextResponse.json(wynik);
}
