import { NextResponse } from "next/server";

import { mailZmiany, naListach, PRODUKT_CL, sprawdzNaVps, stanZ, wpisy, type Stan } from "@/lib/czarne-listy";
import { aktywni, automatDozwolony, linkWypisu, ustaw, wyslijMail } from "@/lib/fl-produkty";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const dzien = () => new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Warsaw" }).format(new Date());

/** Cron z VPS co 10 min rano. Idempotentne: fl_ostatnia = doba, którą subskrybent ma już sprawdzoną.
 *  Mail idzie tylko, gdy zmienił się zbiór list. Błąd mailu albo pomiaru nie oznacza doby jako zrobionej. */
export async function POST(request: Request) {
  if (!automatDozwolony(request)) return new NextResponse(null, { status: 401 });
  const dzis = dzien();
  const start = Date.now();
  const lista = (await aktywni(PRODUKT_CL)).filter((x) => x.meta.fl_ostatnia !== dzis);
  let sprawdzone = 0;
  let maile = 0;
  let bledy = 0;
  for (const sub of lista) {
    if (Date.now() - start > 230_000) break;
    try {
      const stary = stanZ(sub.meta);
      const nowy: Stan = {};
      let ok = true;
      for (const x of wpisy(sub.meta)) {
        const w = await sprawdzNaVps(x.d, x.s ?? "", "automat");
        const teraz = naListach(w);
        const bylo = stary[x.d] ?? [];
        // lista bez odpowiedzi nie zmienia znanego stanu
        const nieznane = w.wyniki.filter((p) => p.status === "brak").map((p) => p.lista);
        nowy[x.d] = [...new Set([...teraz, ...bylo.filter((id) => nieznane.includes(id))])].sort();
        const nowe = teraz.filter((id) => !bylo.includes(id));
        const zeszly = bylo.filter((id) => !nowy[x.d].includes(id));
        if (nowe.length || zeszly.length) {
          const wypis = linkWypisu(PRODUKT_CL, sub.email);
          const m = mailZmiany(w, nowe, zeszly, wypis);
          if (await wyslijMail({ do: sub.email, temat: m.temat, html: m.html, tekst: m.tekst, wypis })) maile++;
          else {
            ok = false;
            nowy[x.d] = bylo;
          }
        }
      }
      await ustaw(sub.id, { fl_stan: JSON.stringify(nowy), ...(ok ? { fl_ostatnia: dzis } : {}) });
      if (ok) sprawdzone++;
      else bledy++;
    } catch (e) {
      console.error("czarne-listy dobowa", sub.id, e);
      bledy++;
    }
  }
  return NextResponse.json({ doba: dzis, do_sprawdzenia: lista.length, sprawdzone, maile, bledy });
}
