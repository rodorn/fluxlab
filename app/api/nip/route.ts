import { NextResponse } from "next/server";

// Nazwa firmy po NIP z białej listy VAT Ministerstwa Finansów (bez GUS).
export async function GET(req: Request) {
  const nip = (new URL(req.url).searchParams.get("nip") ?? "").replace(
    /\D/g,
    "",
  );
  if (nip.length !== 10) return NextResponse.json({ nazwa: null });
  const data = new Date().toISOString().slice(0, 10);
  try {
    const r = await fetch(
      `https://wykazpodatnikowvat.mf.gov.pl/api/search/nip/${nip}?date=${data}`,
      { signal: AbortSignal.timeout(4000), cache: "no-store" },
    );
    if (!r.ok) return NextResponse.json({ nazwa: null });
    const j = (await r.json()) as {
      result?: { subject?: { name?: string } | null };
    };
    const nazwa = j.result?.subject?.name?.trim().slice(0, 120) || null;
    return NextResponse.json({ nazwa });
  } catch {
    return NextResponse.json({ nazwa: null });
  }
}
