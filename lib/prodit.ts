import { NextResponse } from "next/server";
import { ipZadania } from "@/lib/ruch";
import { originDozwolony } from "@/lib/limit-ip";

const ADRES = process.env.PRODIT_URL ?? "http://146.59.80.185:8097";

export async function wolajVps(sciezka: string, dane: Record<string, unknown>, czas = 25000) {
  const r = await fetch(`${ADRES}${sciezka}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Sekret": process.env.RUCH_SEKRET ?? "" },
    body: JSON.stringify(dane),
    signal: AbortSignal.timeout(czas),
  });
  return { status: r.status, dane: (await r.json().catch(() => ({}))) as Record<string, unknown> };
}

/** Przekazuje żądanie z formularza do serwera produktów IT na VPS i oddaje jego odpowiedź. */
export async function doVps(req: Request, sciezka: string, czas = 25000): Promise<Response> {
  if (!originDozwolony(req.headers.get("origin"))) return NextResponse.json({ error: "origin" }, { status: 403 });
  const dane = await req.json().catch(() => ({}));
  try {
    const r = await wolajVps(sciezka, { ...dane, ip: ipZadania(req) }, czas);
    return NextResponse.json(r.dane, { status: r.status });
  } catch {
    return NextResponse.json({ error: "Chwilowa awaria. Spróbuj za kilka minut." }, { status: 502 });
  }
}
