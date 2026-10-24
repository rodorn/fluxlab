"use client";

import { useEffect, useRef, useState } from "react";

/** Zdanie, którego słowa zapalają się kolejno w miarę przewijania. */
export default function Manifest({
  tekst,
  className,
  klasaPoPrzecinku = "",
}: {
  tekst: string;
  className?: string;
  /** Klasa słów po pierwszym przecinku, np. kursywa drugiej części zdania. */
  klasaPoPrzecinku?: string;
}) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const slowa = tekst.split(" ");
  const przecinek = slowa.findIndex((s) => s.endsWith(","));
  const [p, setP] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ramka = 0;
    const licz = () => {
      ramka = 0;
      const r = el.getBoundingClientRect();
      const h = window.innerHeight;
      // 0, gdy dolna krawędź wchodzi w ekran; 1, gdy środek zdania jest w 40% wysokości
      const start = h * 0.95;
      const koniec = h * 0.4;
      const srodek = r.top + r.height / 2;
      setP(Math.min(1, Math.max(0, (start - srodek) / (start - koniec))));
    };
    const onScroll = () => {
      if (!ramka) ramka = requestAnimationFrame(licz);
    };
    licz();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (ramka) cancelAnimationFrame(ramka);
    };
  }, []);

  return (
    <p ref={ref} className={className}>
      {slowa.map((s, i) => {
        const zapalone = p === null || p * slowa.length > i;
        return (
          <span
            key={i}
            className={`transition-opacity duration-300 ${zapalone ? "opacity-100" : "opacity-60"} ${przecinek >= 0 && i > przecinek ? klasaPoPrzecinku : ""}`}
          >
            {przecinek >= 0 && i === przecinek + 1 && klasaPoPrzecinku ? <br /> : null}
            {s}
            {i < slowa.length - 1 && i !== przecinek ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}
