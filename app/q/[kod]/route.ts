import { NextResponse } from "next/server";
import { qr } from "@/lib/kody-qr";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Skan kodu QR: zapis skanu na VPS i przekierowanie na adres docelowy. */
export async function GET(request: Request, ctx: { params: Promise<{ kod: string }> }) {
  const { kod } = await ctx.params;
  const wroc = (stan: string) =>
    NextResponse.redirect(new URL(`/kody-qr?stan=${stan}`, request.url), {
      status: 302,
      headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
    });
  if (!/^[a-z0-9]{7}$/.test(kod)) return wroc("brak");
  try {
    const { status, dane } = await qr(`/go/${kod}`, {
      ua: request.headers.get("user-agent") ?? "",
      limit: 4000,
    });
    if (status === 200 && typeof dane.url === "string") {
      return NextResponse.redirect(dane.url, {
        status: 302,
        headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
      });
    }
    if (status === 409) return wroc("niepotwierdzony");
    if (status === 410) return wroc("wylaczony-kod");
    if (status === 404) return wroc("brak");
  } catch {
    // poniżej: komunikat zamiast pustej strony
  }
  return wroc("chwilowo");
}
