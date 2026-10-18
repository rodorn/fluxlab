"use client";

import { useEffect, useRef } from "react";

/** Dekoracyjne tło hero: siatka punktów i dwie rozmyte plamy w kolorze akcentu, z lekką paralaksą. */
export default function TloHero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const plamyRef = useRef<HTMLDivElement | null>(null);

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
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (ramka) cancelAnimationFrame(ramka);
    };
  }, []);

  useEffect(() => {
    const el = plamyRef.current;
    if (!el) return;
    const spokojny = window.matchMedia("(prefers-reduced-motion: reduce)");
    const myszka = window.matchMedia("(pointer: fine)");
    if (spokojny.matches || !myszka.matches) return;

    let ramka = 0;
    let x = 0;
    let y = 0;
    const onMove = (e: PointerEvent) => {
      x = (e.clientX / window.innerWidth - 0.5) * 40;
      y = (e.clientY / window.innerHeight - 0.5) * 40;
      if (!ramka)
        ramka = requestAnimationFrame(() => {
          ramka = 0;
          el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
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
        <div
          ref={plamyRef}
          className="absolute inset-0 transition-transform duration-700 ease-out will-change-transform"
        >
          <div className="tlo-hero__plama tlo-hero__plama--a" />
          <div className="tlo-hero__plama tlo-hero__plama--b" />
        </div>
      </div>
    </div>
  );
}
