"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Czat = dynamic(() => import("@/components/Czat"), { ssr: false });
const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"), { ssr: false });
const MagnesPrzyciskow = dynamic(() => import("@/components/MagnesPrzyciskow"), { ssr: false });
const KomunikatKonsoli = dynamic(() => import("@/components/KomunikatKonsoli"), { ssr: false });
const LicznikWizyt = dynamic(() => import("@/components/LicznikWizyt"), { ssr: false });
const ContactClickTracker = dynamic(() => import("@/components/ContactClickTracker"), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"), { ssr: false });
const PlynnePrzewijanie = dynamic(() => import("@/components/PlynnePrzewijanie"), { ssr: false });
const SpeedInsights = dynamic(() => import("@vercel/speed-insights/next").then((m) => m.SpeedInsights), { ssr: false });
const Analytics = dynamic(() => import("@vercel/analytics/next").then((m) => m.Analytics), { ssr: false });
const NowaWersja = dynamic(() => import("@/components/NowaWersja"), { ssr: false });

/** Nakładki, bez których pierwszy ekran działa: ładują się przy pierwszym
 *  geście użytkownika (ruch, klawisz, dotyk) albo po 6 s, nie razem z pierwszym malowaniem. */
export default function Opoznione() {
  const [gotowe, ustawGotowe] = useState(false);

  useEffect(() => {
    const start = () => ustawGotowe(true);
    // Wyszukiwarka może poprosić o czat, zanim ten się załaduje: ładujemy od razu
    // i powtarzamy prośbę raz, gdy czat już nasłuchuje.
    const wczesne = (e: Event) => {
      if (document.documentElement.dataset.czatGotowy) return;
      const detail = (e as CustomEvent).detail;
      start();
      let proby = 0;
      const t = setInterval(() => {
        if (document.documentElement.dataset.czatGotowy || ++proby > 50) {
          clearInterval(t);
          if (proby <= 50) window.dispatchEvent(new CustomEvent("fluxlab:czat", { detail }));
        }
      }, 100);
    };
    window.addEventListener("fluxlab:czat", wczesne);
    const zdarzenia = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
    const posprzataj = () => {
      for (const z of zdarzenia) window.removeEventListener(z, start);
      clearTimeout(t);
      window.removeEventListener("fluxlab:czat", wczesne);
    };
    const t = setTimeout(start, 6000);
    for (const z of zdarzenia) window.addEventListener(z, start, { once: true, passive: true });
    return posprzataj;
  }, []);

  if (!gotowe) return null;
  return (
    <>
      <ScrollToTop />
      <MagnesPrzyciskow />
      <KomunikatKonsoli />
      <Czat />
      <NowaWersja />
    </>
  );
}

/** Pomiary i drobne dodatki: ładowane, gdy przeglądarka skończy pierwsze
 *  malowanie i ma wolną chwilę, żeby nie wydłużały blokowania głównego wątku. */
export function PoPierwszymMalowaniu() {
  const [gotowe, ustawGotowe] = useState(false);

  useEffect(() => {
    const start = () => ustawGotowe(true);
    const odpal = () => {
      if ("requestIdleCallback" in window) window.requestIdleCallback(start, { timeout: 3000 });
      else setTimeout(start, 1500);
    };
    if (document.readyState === "complete") odpal();
    else window.addEventListener("load", odpal, { once: true });
    return () => window.removeEventListener("load", odpal);
  }, []);

  if (!gotowe) return null;
  return (
    <>
      <LicznikWizyt />
      <ContactClickTracker />
      <ScrollProgress />
      <PlynnePrzewijanie />
      <SpeedInsights />
      <Analytics />
    </>
  );
}
