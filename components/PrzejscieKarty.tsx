"use client";

import { useEffect } from "react";

/** Przejście karta→podstrona: kliknięta karta oddaje swój tytuł nazwie
 *  vt-cel, którą na podstronie nosi H1. */
export default function PrzejscieKarty() {
  useEffect(() => {
    const klik = (e: MouseEvent) => {
      const karta = (e.target as Element).closest?.("[data-vt-karta]");
      const tytul = karta?.querySelector<HTMLElement>("[data-vt-tytul]");
      if (!tytul) return;
      document.querySelectorAll<HTMLElement>("[data-vt-tytul]").forEach((t) => (t.style.viewTransitionName = ""));
      tytul.style.viewTransitionName = "vt-cel";
    };
    document.addEventListener("click", klik, true);
    return () => document.removeEventListener("click", klik, true);
  }, []);
  return null;
}
