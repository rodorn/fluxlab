"use client";

import { useEffect } from "react";

/** Na czas przewijania wyłącza efekty najechania (magnes przycisków, poświata
 *  kart, przejścia cieni). Kursor stoi, a elementy przesuwają się pod nim, więc
 *  bez tego każdy element pod kursorem odpalał hover i przemalowanie w trakcie
 *  przewijania, co na słabszych komputerach dawało szarpnięcia. */
export default function CiszaPrzyPrzewijaniu() {
  useEffect(() => {
    const html = document.documentElement;
    let stop: ReturnType<typeof setTimeout> | undefined;
    const naPrzewijanie = () => {
      if (!html.classList.contains("przewijanie")) html.classList.add("przewijanie");
      clearTimeout(stop);
      stop = setTimeout(() => html.classList.remove("przewijanie"), 150);
    };
    window.addEventListener("scroll", naPrzewijanie, { passive: true });
    return () => {
      window.removeEventListener("scroll", naPrzewijanie);
      clearTimeout(stop);
    };
  }, []);
  return null;
}
