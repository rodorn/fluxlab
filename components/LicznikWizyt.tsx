"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

// Identyfikator sesji jest losowy i ginie razem z karta. Nie pozwala rozpoznac
// osoby ani powiazac jej wizyt miedzy dniami, a wystarcza, zeby odroznic jedna
// osobe klikajaca po pieciu podstronach od pieciu roznych osob.
function idSesji(): string {
  try {
    const k = "fl_sesja";
    let v = sessionStorage.getItem(k);
    if (!v) {
      v = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem(k, v);
    }
    return v;
  } catch {
    return "";
  }
}

/**
 * Czy to przeglądarka sterowana skryptem, a nie człowiek.
 *
 * Zrzuty ekranu i sprawdzenia wdrożeń robię przeglądarką bez okna, która
 * wykonuje JavaScript tak samo jak zwykła, więc jej wejścia lądowały w
 * liczniku i podbijały statystyki. W raporcie wyszło z tego 61 odsłon i 38
 * osób, choć realnych odwiedzin była garstka. Licznik, który liczy tego, kto
 * go sprawdza, jest gorszy niż brak licznika, bo na jego podstawie
 * podejmuje się decyzje.
 */
function sterowanaSkryptem(): boolean {
  try {
    if (navigator.webdriver) return true;
    return /HeadlessChrome|Puppeteer|Playwright|bot|crawler|spider/i.test(
      navigator.userAgent,
    );
  } catch {
    return false;
  }
}

function Zliczanie() {
  const sciezka = usePathname();
  const parametry = useSearchParams();

  useEffect(() => {
    if (sterowanaSkryptem()) return;
    let zrodlo = "";
    try {
      zrodlo = document.referrer ? new URL(document.referrer).hostname : "";
      if (zrodlo === location.hostname) zrodlo = "";
    } catch {
      zrodlo = "";
    }
    const dane = {
      sciezka,
      zrodlo: zrodlo || (parametry.get("utm_source") ?? ""),
      kampania: parametry.get("utm_campaign") ?? "",
      sesja: idSesji(),
      telefon: window.matchMedia("(max-width: 640px)").matches,
      zdarzenie: "odslona",
    };
    fetch("/api/wizyta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dane),
      keepalive: true,
    }).catch(() => {});
  }, [sciezka, parametry]);

  return null;
}

export default function LicznikWizyt() {
  return (
    <Suspense fallback={null}>
      <Zliczanie />
    </Suspense>
  );
}
