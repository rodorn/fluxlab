import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";

/** Licznik pobrań materiałów: każde pobranie /pobierz/*.pdf trafia do
 *  kolektora jako zdarzenie „pobranie”, także z linków w postach, które
 *  omijają stronę /materialy. Plik wychodzi bez czekania na licznik. */
export function proxy(request: NextRequest, event: NextFetchEvent) {
  const ua = request.headers.get("user-agent") ?? "";
  if (!/bot|crawler|spider|preview|HeadlessChrome|Lighthouse|facebookexternalhit|curl|wget/i.test(ua)) {
    const adres = process.env.RUCH_URL ?? "http://146.59.80.185:8087/wizyta";
    const sekret = process.env.RUCH_SEKRET;
    event.waitUntil(
      fetch(adres, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(sekret ? { "X-Sekret": sekret } : {}) },
        body: JSON.stringify({
          sciezka: request.nextUrl.pathname,
          zdarzenie: "pobranie",
          zrodlo: request.headers.get("referer") ?? "",
          kampania: request.nextUrl.searchParams.get("utm_campaign") ?? "",
          telefon: /Mobile|Android|iPhone/i.test(ua),
        }),
        signal: AbortSignal.timeout(3000),
      }).catch(() => {}),
    );
  }
  return NextResponse.next();
}

export const config = { matcher: "/pobierz/:plik*" };
