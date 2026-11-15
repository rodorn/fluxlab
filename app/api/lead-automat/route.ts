import { NextResponse } from "next/server";
import { automatDozwolony } from "@/lib/fl-produkty";
import { nowe, sprzatanie } from "@/lib/leady/rdzen";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/** Wołane z crona na VPS co 5 minut (x-automat): realizuje opłacone zamówienia lead-*, wyłącza anulowane, czyści stare dane. */
export async function GET(req: Request) {
  if (!automatDozwolony(req)) return NextResponse.json({ error: "brak dostępu" }, { status: 401 });
  return NextResponse.json({ nowe: await nowe(), sprzatanie: await sprzatanie() });
}
