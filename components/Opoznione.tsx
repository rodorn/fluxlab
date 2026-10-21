"use client";

import { useEffect, useState, type ComponentType } from "react";

/** Nakładki, bez których pierwszy ekran działa: ładują się przy pierwszym
 *  geście użytkownika (ruch, klawisz, dotyk) albo po 6 s, nie razem z pierwszym malowaniem. */
export default function Opoznione() {
  const [gotowe, ustawGotowe] = useState(false);
  const [Nakladki, ustawNakladki] = useState<ComponentType | null>(null);

  useEffect(() => {
    if (!gotowe) return;
    import("@/components/NakladkiOpoznione").then((m) => ustawNakladki(() => m.default));
  }, [gotowe]);

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

  return Nakladki ? <Nakladki /> : null;
}

/** Pomiary i drobne dodatki: ładowane, gdy przeglądarka skończy pierwsze
 *  malowanie i ma wolną chwilę, żeby nie wydłużały blokowania głównego wątku. */
export function PoPierwszymMalowaniu() {
  const [gotowe, ustawGotowe] = useState(false);
  const [Pomiary, ustawPomiary] = useState<ComponentType | null>(null);

  useEffect(() => {
    if (!gotowe) return;
    import("@/components/NakladkiPomiary").then((m) => ustawPomiary(() => m.default));
  }, [gotowe]);

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

  return Pomiary ? <Pomiary /> : null;
}
