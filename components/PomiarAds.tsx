"use client";

import { useEffect } from "react";
import { event as gaEvent, konwersjaAds } from "@/lib/gtag";
import { readUtm } from "@/lib/zrodlo";

const KLIK = ["gclid", "gbraid", "wbraid"] as const;

const OFERTY: [string, string[]][] = [
  ["n8n", ["n8n", "make-vs-n8n", "tansze-automatyzacje"]],
  ["e-doreczenia", ["e-doreczenia"]],
  ["ksef", ["ksef"]],
  ["naprawa", ["naprawa-", "strona-po-wlamaniu", "pogotowie-automatyzacji"]],
  ["strona-www", ["strony-www", "audyt-strony", "landing-z-platnoscia"]],
  [
    "automatyzacja",
    [
      "automatyzac",
      "crm",
      "pipedrive",
      "salesforce",
      "integrac",
      "raportowanie",
      "lead",
      "follow",
    ],
  ],
];

function oferta(sciezka: string): string {
  for (const [nazwa, wzorce] of OFERTY) {
    if (wzorce.some((w) => sciezka.includes(w))) return nazwa;
  }
  return "inne";
}

function zgoda(): boolean {
  try {
    return localStorage.getItem("fluxlab_zgoda") === "tak";
  } catch {
    return false;
  }
}

/** gclid/gbraid/wbraid: z adresu wejścia (window.__flKlik z app/layout.tsx),
 *  z bieżącego adresu, a po zgodzie także z ciasteczek Google (GCL.czas.id). */
function identyfikatoryKlikniecia(): Record<string, string> {
  const wynik: Record<string, string> = {};
  const wejscie =
    (window as { __flKlik?: Record<string, string> }).__flKlik ?? {};
  const adres = new URLSearchParams(location.search);
  for (const n of KLIK) {
    const v = wejscie[n] || adres.get(n);
    if (v) wynik[n] = v;
  }
  if (!wynik.gclid && !wynik.gbraid && zgoda()) {
    const ciastko = (nazwa: string) =>
      new RegExp(`(?:^|;\\s*)${nazwa}=GCL\\.\\d+\\.([^;]+)`).exec(
        document.cookie,
      )?.[1];
    const aw = ciastko("_gcl_aw");
    const gb = ciastko("_gcl_gb");
    if (aw) wynik.gclid = decodeURIComponent(aw);
    if (gb) wynik.gbraid = decodeURIComponent(gb);
  }
  return wynik;
}

function telefonE164(tel: unknown): string | undefined {
  if (typeof tel !== "string") return undefined;
  const cyfry = tel.replace(/[^\d+]/g, "");
  if (/^\d{9}$/.test(cyfry)) return `+48${cyfry}`;
  if (/^48\d{9}$/.test(cyfry)) return `+${cyfry}`;
  if (/^00\d{8,15}$/.test(cyfry)) return `+${cyfry.slice(2)}`;
  if (/^\+\d{8,15}$/.test(cyfry)) return cyfry;
  return undefined;
}

/** Każde zgłoszenie do /api/contact dostaje identyfikator kliknięcia reklamy
 *  i źródło wejścia (gdy formularz sam ich nie wysłał). Po odpowiedzi ok idą
 *  konwersja Google Ads i generate_lead z ofertą według strony formularza;
 *  przy zgodzie z banera także e-mail i telefon do konwersji rozszerzonych.
 *  Zgłoszenia, w których bot wypełnił ukryte pole "website", nie liczą się. */
export default function PomiarAds() {
  useEffect(() => {
    const oryginal = window.fetch;
    window.fetch = async (...args: Parameters<typeof fetch>) => {
      let body: Record<string, unknown> | null = null;
      try {
        const [we, init] = args;
        const url =
          typeof we === "string" ? we : we instanceof URL ? we.href : we.url;
        if (
          init?.method === "POST" &&
          typeof init.body === "string" &&
          new URL(url, location.href).pathname === "/api/contact"
        ) {
          body = JSON.parse(init.body) as Record<string, unknown>;
          const dodatek: Record<string, string> = {
            ...identyfikatoryKlikniecia(),
          };
          if (!body.utm_source) Object.assign(dodatek, readUtm());
          for (const [k, v] of Object.entries(dodatek))
            if (v && !body[k]) body[k] = v;
          args[1] = { ...init, body: JSON.stringify(body) };
        }
      } catch {
        body = null;
      }
      const res = await oryginal.apply(window, args);
      try {
        if (body && res.ok) {
          const bot =
            typeof body.website === "string" && body.website.trim().length > 0;
          if (!bot) {
            const email =
              typeof body.email === "string"
                ? body.email.trim().toLowerCase()
                : "";
            const tel = telefonE164(body.phone);
            if (zgoda() && window.gtag && (email || tel)) {
              window.gtag("set", "user_data", {
                ...(email && { email }),
                ...(tel && { phone_number: tel }),
              });
            }
            gaEvent("generate_lead", {
              oferta: oferta(location.pathname),
              location: location.pathname,
              ...(typeof body.problemType === "string" &&
                body.problemType && { lead_type: body.problemType }),
            });
            konwersjaAds("formularz");
          }
        }
      } catch {}
      return res;
    };
    return () => {
      window.fetch = oryginal;
    };
  }, []);
  return null;
}
