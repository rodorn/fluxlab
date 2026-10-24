"use client";

import { useEffect } from "react";

/** Miękka poświata za kursorem i przejście karta→podstrona.
 *  Poświata tylko przy myszy i bez ograniczenia ruchu. Kliknięta karta
 *  oddaje swój tytuł nazwie vt-cel, którą na podstronie nosi H1. */
export default function PoswiataKursora() {
  useEffect(() => {
    const klik = (e: MouseEvent) => {
      const karta = (e.target as Element).closest?.("[data-vt-karta]");
      const tytul = karta?.querySelector<HTMLElement>("[data-vt-tytul]");
      if (!tytul) return;
      document.querySelectorAll<HTMLElement>("[data-vt-tytul]").forEach((t) => (t.style.viewTransitionName = ""));
      tytul.style.viewTransitionName = "vt-cel";
    };
    document.addEventListener("click", klik, true);

    const mysz = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const ruch = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!mysz || !ruch) return () => document.removeEventListener("click", klik, true);

    const warstwa = document.createElement("div");
    warstwa.className = "poswiata-kursora";
    warstwa.setAttribute("aria-hidden", "true");
    document.body.appendChild(warstwa);
    let klatka = 0;
    const ruchMyszy = (e: PointerEvent) => {
      cancelAnimationFrame(klatka);
      klatka = requestAnimationFrame(() => {
        warstwa.style.setProperty("--px", `${e.clientX}px`);
        warstwa.style.setProperty("--py", `${e.clientY}px`);
        warstwa.style.opacity = "1";
      });
    };
    const wyjscie = () => (warstwa.style.opacity = "0");
    window.addEventListener("pointermove", ruchMyszy, { passive: true });
    document.documentElement.addEventListener("pointerleave", wyjscie);
    return () => {
      document.removeEventListener("click", klik, true);
      window.removeEventListener("pointermove", ruchMyszy);
      document.documentElement.removeEventListener("pointerleave", wyjscie);
      cancelAnimationFrame(klatka);
      warstwa.remove();
    };
  }, []);
  return null;
}
