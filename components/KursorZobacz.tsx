"use client";

import { useEffect, useRef } from "react";

/** Etykieta „Zobacz” przy kursorze nad elementami z data-kursor-zobacz.
 *  Tylko dla myszy; zwykły kursor (rączka) zostaje. */
export default function KursorZobacz() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    const spokojny = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.style.transition = spokojny ? "none" : "opacity 0.15s, scale 0.15s";
    const nad = (t: EventTarget | null) =>
      t instanceof Element && !!t.closest("[data-kursor-zobacz]");
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const widoczny = nad(e.target);
      el.style.opacity = widoczny ? "1" : "0";
      el.style.scale = widoczny ? "1" : "0.8";
      el.style.translate = `${e.clientX + 18}px ${e.clientY + 18}px`;
    };
    const wyjdz = () => {
      el.style.opacity = "0";
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", wyjdz);
    return () => {
      document.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", wyjdz);
    };
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50 rounded-full bg-accent-solid px-3 py-1 text-xs font-semibold text-white opacity-0 shadow-lg"
    >
      Zobacz
    </span>
  );
}
