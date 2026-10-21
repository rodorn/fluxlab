"use client";

import { useEffect, useState } from "react";

const KLUCZ = "fluxlab_siatka_pokazana";

/** Siatka 12 kolumn pokazana na chwilę raz na sesję. Bez ruchu, gdy użytkownik
 *  wyłączył animacje; nie łapie kliknięć. */
export default function SiatkaNaStart() {
  const [pokaz, ustawPokaz] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      if (sessionStorage.getItem(KLUCZ)) return;
      sessionStorage.setItem(KLUCZ, "1");
    } catch {
      return;
    }
    const start = setTimeout(() => ustawPokaz(true), 1200);
    const koniec = setTimeout(() => ustawPokaz(false), 1200 + 1600);
    return () => {
      clearTimeout(start);
      clearTimeout(koniec);
    };
  }, []);

  if (!pokaz) return null;
  return (
    <div aria-hidden="true" className="siatka-start pointer-events-none fixed inset-0 z-[5]">
      <div className="container-wide grid h-full grid-cols-12 gap-3 sm:gap-5">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className="bg-accent/[0.07] ring-1 ring-inset ring-accent/15" />
        ))}
      </div>
    </div>
  );
}
