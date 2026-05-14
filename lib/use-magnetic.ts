"use client";

import { useEffect, useRef } from "react";

type Options = {
  /** Maksymalne przesunięcie w px. Domyślnie 4. */
  strength?: number;
  /** Próg aktywacji (jak blisko trzeba być żeby zacząć przyciągać). Domyślnie 0.6 */
  threshold?: number;
};

/**
 * Magnetic pointer effect — element delikatnie podąża za kursorem
 * przy hover. Wymaga `.magnetic` klasy + CSS var `--magnet-x/y` w globals.
 */
export default function useMagnetic<T extends HTMLElement>({
  strength = 4,
  threshold = 0.6,
}: Options = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // mobile = no magnetic

    let raf = 0;
    let lastX = 0;
    let lastY = 0;

    function update(x: number, y: number) {
      el!.style.setProperty("--magnet-x", `${x.toFixed(2)}px`);
      el!.style.setProperty("--magnet-y", `${y.toFixed(2)}px`);
    }

    function onMove(e: PointerEvent) {
      const rect = el!.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const maxDist = Math.max(rect.width, rect.height) * threshold;
      if (dist > maxDist) {
        lastX = 0;
        lastY = 0;
      } else {
        const factor = (1 - dist / maxDist) * strength;
        lastX = (dx / dist) * factor * (dist > 0 ? 1 : 0);
        lastY = (dy / dist) * factor * (dist > 0 ? 1 : 0);
      }
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => update(lastX, lastY));
    }

    function reset() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => update(0, 0));
    }

    window.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);

    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
      cancelAnimationFrame(raf);
      update(0, 0);
    };
  }, [strength, threshold]);

  return ref;
}
