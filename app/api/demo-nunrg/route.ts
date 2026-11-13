import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

function originDozwolony(origin: string): boolean {
  return (
    origin === "https://fluxlab.pl" ||
    origin === "https://www.fluxlab.pl" ||
    /^http:\/\/localhost(:\d+)?$/.test(origin)
  );
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  if (origin && !originDozwolony(origin)) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }
  const url = process.env.NUNRG_CRM_WEBHOOK;
  if (!url) return NextResponse.json({ ok: false }, { status: 503 });

  const body = (await req.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;
  if (!body) return NextResponse.json({ ok: false }, { status: 400 });
  if (str(body.www, 200)) return NextResponse.json({ ok: true });

  const email = str(body.email, 320);
  const imie = str(body.imie, 120);
  const telefon = str(body.telefon, 40);
  const wiadomosc = str(body.wiadomosc, 4900);
  const zgody = body.zgody as { przetwarzanie?: boolean } | undefined;
  if (!EMAIL_RX.test(email) || !zgody?.przetwarzanie) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: randomUUID(),
      nazwa: imie || email,
      email,
      telefon: telefon || undefined,
      wiadomosc: wiadomosc + "\n\nZgoda na przetwarzanie: tak",
      tytul: "Demo nu-nrg",
    }),
  }).catch(() => null);
  if (!res || !res.ok) {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  const wynik = (await res.json().catch(() => ({}))) as { lead_id?: number };
  return NextResponse.json({ ok: true, lead_id: wynik.lead_id ?? null });
}
