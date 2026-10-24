"use client";

import { useEffect, useState } from "react";

const kb = (b: number) => `${Math.round(b / 1024).toLocaleString("pl-PL")} kB`;
const sek = (ms: number) =>
  `${(ms / 1000).toLocaleString("pl-PL", { maximumFractionDigits: 1, minimumFractionDigits: 1 })} s`;

export default function Kolofon() {
  const [pomiar, setPomiar] = useState("");

  useEffect(() => {
    const zmierz = () => {
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      if (!nav) return;
      const pliki = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
      const bajty = [nav, ...pliki].reduce((s, e) => s + (e.transferSize || e.encodedBodySize || 0), 0);
      setPomiar(`Ta odsłona: ${kb(bajty)}, wczytana w ${sek(nav.loadEventEnd || nav.domContentLoadedEventEnd)}.`);
    };
    if (document.readyState === "complete") zmierz();
    else window.addEventListener("load", () => setTimeout(zmierz), { once: true });
  }, []);

  return (
    <p className="mt-2 min-h-6">
      Złożono krojem Instrument Sans i Instrument Serif. {pomiar}
    </p>
  );
}
