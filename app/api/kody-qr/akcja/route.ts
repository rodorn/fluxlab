import { NextResponse } from "next/server";
import { qr } from "@/lib/kody-qr";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Linki z maila: potwierdzenie adresu i wyłączenie kodu. */
export async function GET(request: Request) {
  const u = new URL(request.url);
  const co = u.searchParams.get("co");
  const t = u.searchParams.get("t") ?? "";
  const cel = (stan: string) => NextResponse.redirect(new URL(`/kody-qr?${stan}`, request.url), 303);
  if ((co !== "potwierdz" && co !== "wylacz") || !/^[\w-]{10,60}$/.test(t)) return cel("stan=blad");
  try {
    const { status, dane } = await qr(`/${co}/${t}`);
    if (status === 200) return cel(`stan=${co === "potwierdz" ? "wlaczony" : "wylaczony"}&kod=${encodeURIComponent(String(dane.nazwa ?? ""))}`);
    return cel("stan=blad");
  } catch {
    return cel("stan=chwilowo");
  }
}
