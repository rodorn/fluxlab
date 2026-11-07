import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

import { zapiszZgode } from "@/lib/audyt-wyslij";
import { TRESC_ZGODY_POBRANIA } from "@/lib/pobranie";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe zapytanie." }, { status: 400 });
  }
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 320) : "";
  const plik = typeof body.plik === "string" ? path.basename(body.plik) : "";
  if (!EMAIL_RX.test(email)) {
    return NextResponse.json({ error: "Podaj poprawny adres e-mail." }, { status: 400 });
  }
  if (body.zgoda !== true) {
    return NextResponse.json({ error: "Zaznacz zgodę, żebyśmy mogli pisać na ten adres." }, { status: 400 });
  }
  if (!plik.endsWith(".pdf") || !fs.existsSync(path.join(process.cwd(), "public", "pobierz", plik))) {
    return NextResponse.json({ error: "Nieznany materiał." }, { status: 400 });
  }
  const zrodlo = (request.headers.get("referer") ?? "").slice(0, 300);
  const zapisana = await zapiszZgode(
    { email, okazja: "pobranie", szczegol: plik, zrodlo },
    TRESC_ZGODY_POBRANIA,
  );
  if (!zapisana) {
    return NextResponse.json({ error: "Nie udało się zapisać, spróbuj za chwilę." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
