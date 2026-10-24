"use client";

import { useEffect, useRef } from "react";

/** Tło każdej podstrony: pod kursorem jaśnieją punkty siatki. Siatka przesuwa się
 *  razem ze stroną, więc w hero pokrywa się z punktami TloHero. */
export default function TloKursora() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spokojny = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dotyk = window.matchMedia("(hover: none), (pointer: coarse)");
    if (spokojny.matches || dotyk.matches) return;

    let ramka = 0;
    const przesun = () => {
      ramka = 0;
      el.style.backgroundPosition = `0 ${-(window.scrollY % 28)}px`;
    };
    const onScroll = () => {
      if (!ramka) ramka = requestAnimationFrame(przesun);
    };
    const onMove = (e: PointerEvent) => {
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
      el.style.opacity = "1";
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };
    przesun();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (ramka) cancelAnimationFrame(ramka);
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className="tlo-kursora" />;
}
