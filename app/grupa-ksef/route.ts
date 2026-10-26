import { NextResponse } from "next/server";
import { ipZadania, wyslijWizyte, zSieciAutomatow } from "@/lib/ruch";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Instagram, Threads i LinkedIn pozwalaja linkowac tylko do fluxlab.pl, wiec
// stad odsylamy do grupy na Facebooku i liczymy, skad przyszlo wejscie.
const GRUPA = "https://www.facebook.com/groups/1520408590114723/";

// Podglady linkow w serwisach spolecznosciowych i narzedzia z konsoli nie sa
// wejsciem czlowieka.
const AUTOMAT = /bot|crawl|spider|preview|facebookexternalhit|meta-external|embedly|curl|wget|python|node-fetch|undici|headless/i;

export async function GET(request: Request) {
  const ua = request.headers.get("user-agent") ?? "";
  if (!AUTOMAT.test(ua) && !zSieciAutomatow(ipZadania(request))) {
    const parametry = new URL(request.url).searchParams;
    let odsylacz = "";
    try {
      odsylacz = new URL(request.headers.get("referer") ?? "").hostname;
    } catch {
      odsylacz = "";
    }
    await wyslijWizyte({
      sciezka: "/grupa-ksef",
      zrodlo: (parametry.get("utm_source") || odsylacz).slice(0, 200),
      kampania: (parametry.get("utm_campaign") ?? "").slice(0, 120),
      sesja: crypto.randomUUID().slice(0, 40),
      telefon: /Mobile|Android|iPhone/.test(ua),
      zdarzenie: "odslona",
      przegladarka: /Firefox\//.test(ua) ? "Firefox" : /Edg\//.test(ua) ? "Edge" : /Chrome\//.test(ua) ? "Chrome" : /Safari\//.test(ua) ? "Safari" : "inna",
      system: /Android/.test(ua) ? "Android" : /iPhone|iPad/.test(ua) ? "iOS" : /Windows/.test(ua) ? "Windows" : /Mac OS X/.test(ua) ? "macOS" : /Linux/.test(ua) ? "Linux" : "inny",
    });
  }
  return NextResponse.redirect(GRUPA, { status: 302, headers: { "Cache-Control": "no-store" } });
}
