"use client";

import { useEffect, useRef } from "react";

/** Tło każdej podstrony: pod kursorem jaśnieją punkty siatki. */
export default function TloKursora() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spokojny = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dotyk = window.matchMedia("(hover: none), (pointer: coarse)");
    if (spokojny.matches || dotyk.matches) return;

    const onMove = (e: PointerEvent) => {
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
      el.style.opacity = "1";
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className="tlo-kursora" />;
}
