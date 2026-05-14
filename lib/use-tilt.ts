"use client";

import { useEffect, useRef } from "react";

type Options = {
  /** Maksymalny kąt rotacji w stopniach. Domyślnie 6. */
  maxDeg?: number;
};

/**
 * 3D tilt per mouse position. Wymaga `.card-tilt` klasy + CSS var `--tilt-x/y`.
 */
export default function useTilt<T extends HTMLElement>({
  maxDeg = 6,
}: Options = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // mobile = no tilt

    let raf = 0;

    function onMove(e: PointerEvent) {
      const rect = el!.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const tiltY = Math.max(-1, Math.min(1, dx)) * maxDeg;
      const tiltX = Math.max(-1, Math.min(1, -dy)) * maxDeg;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el!.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
        el!.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
      });
    }

    function reset() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el!.style.setProperty("--tilt-x", `0deg`);
        el!.style.setProperty("--tilt-y", `0deg`);
      });
    }

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
      cancelAnimationFrame(raf);
    };
  }, [maxDeg]);

  return ref;
}
