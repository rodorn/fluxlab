import { NextResponse } from "next/server";

import { ZAKRESY, adresZgody } from "@/lib/google";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const sesja = new URL(req.url).searchParams.get("sesja") ?? "";
  if (!/^cs_(live|test)_[A-Za-z0-9]{20,}$/.test(sesja))
    return NextResponse.redirect("https://fluxlab.pl/polacz-google?blad=1");
  try {
    const s = await stripe(`checkout/sessions/${sesja}`);
    const produkt = String(s.metadata?.produkt ?? "").split(",").find((p) => ZAKRESY[p]);
    if (s.status !== "complete" || !produkt)
      return NextResponse.redirect("https://fluxlab.pl/polacz-google?blad=1");
    return NextResponse.redirect(adresZgody(sesja, produkt));
  } catch {
    return NextResponse.redirect("https://fluxlab.pl/polacz-google?blad=1");
  }
}
