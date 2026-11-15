import { NextResponse } from "next/server";

import { aktywni, automatDozwolony, linkWypisu, ustaw, wyslijMail } from "@/lib/fl-produkty";
import { dobaDoMaila, PRODUKT_RCE, zlozMail } from "@/lib/rce-mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

/** Wywoływane z crona na VPS co 10 minut po 14:15. Idempotentne: każdy subskrybent
 *  ma fl_ostatnia (data doby, którą dostał), więc druga wysyłka tej samej doby nie idzie. */
export async function POST(request: Request) {
  if (!automatDozwolony(request)) return new NextResponse(null, { status: 401 });
  const dane = await dobaDoMaila();
  if (!dane || !dane.jutro) return NextResponse.json({ czeka: true });
  const lista = (await aktywni(PRODUKT_RCE)).filter(
    (x) => x.meta.fl_ostatnia !== dane.d.data,
  );
  let wyslane = 0;
  let bledy = 0;
  for (const sub of lista) {
    const wypis = linkWypisu(PRODUKT_RCE, sub.email);
    const m = zlozMail(dane.d, true, wypis, false);
    if (
      await wyslijMail({
        do: sub.email,
        temat: m.temat,
        html: m.html,
        tekst: m.tekst,
        wypis,
      })
    ) {
      await ustaw(sub.id, { fl_ostatnia: dane.d.data });
      wyslane++;
    } else bledy++;
  }
  return NextResponse.json({
    doba: dane.d.data,
    do_wyslania: lista.length,
    wyslane,
    bledy,
  });
}
