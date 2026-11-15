import { NextResponse } from "next/server";
import { qr } from "@/lib/kody-qr";
import { ipZadania } from "@/lib/ruch";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe zapytanie." }, { status: 400 });
  }
  try {
    const { status, dane } = await qr("/utworz", {
      metoda: "POST",
      body: {
        email: body.email,
        url: body.url,
        nazwa: body.nazwa,
        ip: ipZadania(request),
      },
      limit: 25000,
    });
    if (status >= 500 || !status) throw new Error(`qr ${status}`);
    return NextResponse.json(dane, { status });
  } catch (e) {
    console.error("kody-qr", e);
    return NextResponse.json(
      { error: "Kody QR chwilowo nie działają. Spróbuj za kilka minut." },
      { status: 502 },
    );
  }
}
