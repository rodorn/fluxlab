import { NextResponse } from "next/server";

import { ZAKRESY, odczytajStan, wymienKod, zaszyfruj } from "@/lib/google";
import { oznacz } from "@/lib/automaty/zamowienia";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const wroc = (k: string) => NextResponse.redirect(`https://fluxlab.pl/polacz-google?blad=${k}`);

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const st = odczytajStan(q.get("state") ?? "");
  if (q.get("error") || !q.get("code") || !st) return wroc(q.get("error") === "access_denied" ? "odmowa" : "1");
  try {
    const t = await wymienKod(q.get("code")!);
    const potrzebne = ZAKRESY[st.produkt].map((z) => `https://www.googleapis.com/auth/${z}`);
    if (!t.refresh || !potrzebne.every((z) => t.zakresy.includes(z))) return wroc("zakresy");
    const s = await stripe(`checkout/sessions/${st.sesja}`);
    if (s.status !== "complete" || !s.subscription) return wroc("1");
    await oznacz(String(s.subscription), {
      gtoken: zaszyfruj(t.refresh),
      gkonto: t.email,
      start: String(Math.floor(Date.now() / 1000)),
      gblad: "",
    });
    return NextResponse.redirect("https://fluxlab.pl/polacz-google/gotowe");
  } catch (e) {
    console.error("[google-callback]", e instanceof Error ? e.message : e);
    return wroc("1");
  }
}
