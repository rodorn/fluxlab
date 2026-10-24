"use client";

import { useEffect, useRef } from "react";

/** Dekoracyjne tło hero: siatka punktów z lekką paralaksą; pod kursorem punkty jaśnieją. */
export default function TloHero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const swiatlo = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spokojny = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dotyk = window.matchMedia("(hover: none), (pointer: coarse)");
    if (spokojny.matches || dotyk.matches) return;

    let ramka = 0;
    const aktualizuj = () => {
      ramka = 0;
      const y = Math.min(window.scrollY, 1200);
      el.style.transform = `translate3d(0, ${(y * 0.3).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!ramka) ramka = requestAnimationFrame(aktualizuj);
    };
    const onMove = (e: PointerEvent) => {
      const s = swiatlo.current;
      if (!s) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      s.style.setProperty("--mx", `${x}px`);
      s.style.setProperty("--my", `${y}px`);
      s.style.opacity = y < el.parentElement!.clientHeight ? "1" : "0";
    };
    const onLeave = () => {
      if (swiatlo.current) swiatlo.current.style.opacity = "0";
    };
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

  return (
    <div
      aria-hidden="true"
      className="tlo-hero pointer-events-none absolute inset-x-0 top-0 z-0 h-[90vh] overflow-hidden"
    >
      <div ref={ref} className="tlo-hero__warstwa will-change-transform">
        <div className="tlo-hero__siatka" />
        <div ref={swiatlo} className="tlo-hero__swiatlo" />
      </div>
    </div>
  );
}
