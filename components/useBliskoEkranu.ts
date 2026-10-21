"use client";

import { useEffect, useRef, useState } from "react";

/** Zwraca true, gdy element zbliży się do ekranu (albo od razu, gdy adres ma
 *  zakotwiczenie, bo przeglądarka skacze do sekcji). Raz true, zostaje true. */
export function useBliskoEkranu<T extends HTMLElement>(margines = "900px") {
  const ref = useRef<T>(null);
  const [blisko, ustawBlisko] = useState(false);

  useEffect(() => {
    if (window.location.hash || !("IntersectionObserver" in window)) {
      ustawBlisko(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          ustawBlisko(true);
          obs.disconnect();
        }
      },
      { rootMargin: margines },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [margines]);

  return [ref, blisko] as const;
}
