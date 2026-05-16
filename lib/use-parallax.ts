"use client";

import { useEffect, useRef } from "react";

type Options = {
  /** Współczynnik prędkości. 0.2 = element przesuwa się 20% prędkości scrolla. */
  speed?: number;
};

/**
 * Parallax — element przesuwa się wolniej niż scroll, daje wrażenie głębi.
 * Ustawia transform translateY na podstawie pozycji scrolla.
 */
export default function useParallax<T extends HTMLElement>({
  speed = 0.2,
}: Options = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let ticking = false;

    function apply() {
      ticking = false;
      const rect = el!.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // Pozycja środka elementu względem środka viewportu
      const offset = rect.top + rect.height / 2 - viewportH / 2;
      el!.style.transform = `translate3d(0, ${(offset * speed).toFixed(1)}px, 0)`;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(apply);
    }

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return ref;
}
