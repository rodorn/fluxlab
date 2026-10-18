"use client";

import { useEffect, useState } from "react";
import Znak from "@/components/Znak";

const KLUCZ = "fluxlab_intro_znaku";

/** Jednorazowe intro znaku przy pierwszej wizycie. Nakładka nie łapie kliknięć. */
export default function IntroZnaku() {
  const [pokaz, setPokaz] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(KLUCZ)) return;
      localStorage.setItem(KLUCZ, "1");
    } catch {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPokaz(true);
    const t = setTimeout(() => setPokaz(false), 700);
    return () => clearTimeout(t);
  }, []);

  if (!pokaz) return null;
  return (
    <div
      aria-hidden="true"
      className="intro-znaku pointer-events-none fixed inset-0 z-[60] flex items-center justify-center bg-white dark:bg-gray-950"
    >
      <Znak className="intro-znaku__znak h-24 w-24" />
    </div>
  );
}
