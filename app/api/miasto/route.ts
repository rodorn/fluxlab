import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Miasto z nagłówków Vercela. Osobna trasa, żeby strona główna została statyczna.
export async function GET(request: Request) {
  const h = request.headers;
  let miasto = "";
  if (h.get("x-vercel-ip-country") === "PL") {
    try {
      miasto = decodeURIComponent(h.get("x-vercel-ip-city") ?? "").trim();
    } catch {}
  }
  if (miasto.length > 60 || /[<>]/.test(miasto)) miasto = "";
  return NextResponse.json(
    { miasto },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
