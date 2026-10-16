import { NextResponse } from "next/server";

import { czystaDomenaJezyk, kontrolaJezykow } from "@/lib/audyt-jezyki";

export const runtime = "nodejs";
export const maxDuration = 60;

// Cała logika stoi w lib/audyt-jezyki.ts, bo z tego samego kodu korzysta
// darmowy audyt i audyt całej strony.
export async function POST(request: Request) {
  let domena = "";
  try {
    const body = await request.json();
    domena = czystaDomenaJezyk(body?.domena);
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe zapytanie." }, { status: 400 });
  }
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domena)) {
    return NextResponse.json(
      { error: "Podaj sam adres strony, na przykład twojafirma.pl" },
      { status: 400 },
    );
  }
  return NextResponse.json(await kontrolaJezykow(domena));
}
