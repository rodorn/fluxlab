"use client";

import { useEffect } from "react";

/** Na czas przewijania kółkiem wyłącza efekty najechania (magnes przycisków,
 *  poświata kart, przejścia cieni): kursor stoi, a elementy przesuwają się pod
 *  nim, co przy każdym elemencie odpalało hover i przemalowanie.
 *
 *  Wyłączenie trwa tylko, dopóki kursor się nie rusza. Każdy ruch myszy,
 *  wciśnięcie przycisku albo klawisza od razu je zdejmuje, żeby kliknięcie
 *  nigdy nie przepadło (wcześniejsza wersja gubiła kliknięcia w trakcie
 *  wygaszania płynnego przewijania). Na ekranach dotykowych nie działa wcale. */
export default function CiszaPrzyPrzewijaniu() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const html = document.documentElement;
    let stop: ReturnType<typeof setTimeout> | undefined;
    const zdejmij = () => {
      clearTimeout(stop);
      if (html.classList.contains("przewijanie")) html.classList.remove("przewijanie");
    };
    const naPrzewijanie = () => {
      if (!html.classList.contains("przewijanie")) html.classList.add("przewijanie");
      clearTimeout(stop);
      stop = setTimeout(zdejmij, 150);
    };
    // Firefox po przewinięciu wysyła sztuczny pointermove w tym samym miejscu
    // ekranu, więc liczy się tylko ruch, który zmienia położenie kursora.
    let x = -1;
    let y = -1;
    const ruch = (e: PointerEvent) => {
      if (e.screenX === x && e.screenY === y) return;
      x = e.screenX;
      y = e.screenY;
      zdejmij();
    };
    window.addEventListener("wheel", naPrzewijanie, { passive: true });
    window.addEventListener("pointermove", ruch, { passive: true, capture: true });
    for (const z of ["pointerdown", "keydown"] as const)
      window.addEventListener(z, zdejmij, { passive: true, capture: true });
    return () => {
      window.removeEventListener("wheel", naPrzewijanie);
      window.removeEventListener("pointermove", ruch, { capture: true });
      for (const z of ["pointerdown", "keydown"] as const)
        window.removeEventListener(z, zdejmij, { capture: true });
      clearTimeout(stop);
    };
  }, []);
  return null;
}
