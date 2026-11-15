import { NextResponse } from "next/server";
import { Resend } from "resend";

import { aktywni, automatDozwolony } from "@/lib/fl-produkty";
import { db, mailWpis, pobierzKanal, PRODUKT_NL, type Odbiorca } from "@/lib/newsletter";

export const maxDuration = 120;

const NA_RAZ = 3;
const LIMIT_ODBIORCOW = 500;

export async function POST(req: Request) {
  if (!automatDozwolony(req)) return NextResponse.json({ error: "brak dostępu" }, { status: 401 });
  const klucz = process.env.RESEND_API_KEY;
  if (!klucz) return NextResponse.json({ error: "brak klucza Resend" }, { status: 500 });
  const resend = new Resend(klucz);
  const wynik = { klienci: 0, wpisy: 0, maile: 0, bledy: [] as string[] };

  for (const k of await aktywni(PRODUKT_NL)) {
    try {
      const stan = await db.pobierz<{ widziane: string[] }>("stan", k.id);
      if (!stan || !k.meta.feed) continue;
      wynik.klienci++;
      const wpisy = await pobierzKanal(k.meta.feed);
      const widziane = new Set(stan.dane.widziane);
      const nowe = wpisy.filter((w) => !widziane.has(w.id)).slice(0, NA_RAZ).reverse();
      if (nowe.length === 0) continue;
      const odb = (await db.lista<Odbiorca & { ostatni?: string }>("odbiorcy", { klucz: k.id, limit: LIMIT_ODBIORCOW })).filter((d) => d.dane.status === "potwierdzony");
      for (const w of nowe) {
        const kolej = odb.filter((d) => d.dane.ostatni !== w.id);
        let calosc = true;
        for (let i = 0; i < kolej.length; i += 100) {
          const paczka = kolej.slice(i, i + 100);
          const r = await resend.batch.send(
            paczka.map((d) => {
              const m = mailWpis(k.meta.nazwa || "Newsletter", w, d.id);
              return {
                from: `${(k.meta.nazwa || "Newsletter").replace(/[<>"\r\n]/g, "").slice(0, 60)} przez Fluxlab <formularz@fluxlab.pl>`,
                to: d.dane.email,
                replyTo: process.env.AUDYT_REPLY_TO ?? "pawel@fluxlab.pl",
                subject: m.temat,
                html: m.html,
                text: m.tekst,
                headers: { "List-Unsubscribe": `<${m.wypis}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
              };
            }),
          );
          if (r.error) {
            calosc = false;
            wynik.bledy.push(`${k.id}: ${r.error.message}`);
            break;
          }
          for (const d of paczka) await db.zmien("odbiorcy", d.id, { dane: { ostatni: w.id } });
          wynik.maile += paczka.length;
        }
        if (!calosc) break;
        widziane.add(w.id);
        wynik.wpisy++;
        await db.ustaw("stan", k.id, { dane: { widziane: [...widziane].slice(-300) } });
      }
    } catch (e) {
      wynik.bledy.push(`${k.id}: ${(e as Error).message}`);
    }
  }
  return NextResponse.json(wynik);
}
