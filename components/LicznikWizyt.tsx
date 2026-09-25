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

/** Rodzina przeglądarki, na potrzeby rozdzielenia ruchu. Nie zapisujemy
 *  pełnego nagłówka, bo do tego celu nie jest potrzebny. */
function rodzinaPrzegladarki(): string {
  const u = navigator.userAgent;
  if (/Firefox\//.test(u)) return "Firefox";
  if (/Edg\//.test(u)) return "Edge";
  if (/OPR\//.test(u)) return "Opera";
  if (/Chrome\//.test(u)) return "Chrome";
  if (/Safari\//.test(u)) return "Safari";
  return "inna";
}

function rodzinaSystemu(): string {
  const u = navigator.userAgent;
  if (/Android/.test(u)) return "Android";
  if (/iPhone|iPad|iPod/.test(u)) return "iOS";
  if (/Windows/.test(u)) return "Windows";
  if (/Mac OS X/.test(u)) return "macOS";
  if (/Linux/.test(u)) return "Linux";
  return "inny";
}

function Zliczanie() {
  const sciezka = usePathname();
  const parametry = useSearchParams();

  useEffect(() => {
    if (sterowanaSkryptem()) return;
    // Wyłączenie ustawione na /nie-licz-mnie, dla osób pracujących nad stroną.
    try {
      if (localStorage.getItem("fl_nie_licz") === "1") return;
    } catch {
      /* zablokowana pamięć: liczymy normalnie */
    }
    let zrodlo = "";
    try {
      zrodlo = document.referrer ? new URL(document.referrer).hostname : "";
      if (zrodlo === location.hostname) zrodlo = "";
    } catch {
      zrodlo = "";
    }
    // Wejscie z platnej reklamy Google przychodzi z tym samym odsylaczem co
    // wejscie z wynikow zwyklych, wiec bez tego nie dalo sie ich rozroznic, a
    // to jedyna rzecz, ktorej ma dowiesc proba kampanii. Google dokleja gclid
    // do kazdego klikniecia w reklame, wiec jego obecnosc rozstrzyga sprawe
    // nawet wtedy, gdy ktos zapomni otagowac adresu przez utm.
    const zReklamy =
      parametry.has("gclid") || parametry.get("utm_medium") === "cpc";
    const dane = {
      sciezka,
      zrodlo: zReklamy
        ? "google-ads"
        : zrodlo || (parametry.get("utm_source") ?? ""),
      kampania: parametry.get("utm_campaign") ?? (zReklamy ? "ads" : ""),
      sesja: idSesji(),
      telefon: window.matchMedia("(max-width: 640px)").matches,
      zdarzenie: "odslona",
      przegladarka: rodzinaPrzegladarki(),
      system: rodzinaSystemu(),
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
