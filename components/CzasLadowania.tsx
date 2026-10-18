"use client";

import { useEffect, useState } from "react";

/** Czas ładowania tej strony zmierzony w przeglądarce odwiedzającego. */
export default function CzasLadowania() {
  const [s, setS] = useState<number | null>(null);

  useEffect(() => {
    let lcp = 0;
    let po: PerformanceObserver | undefined;
    try {
      po = new PerformanceObserver((l) => {
        const w = l.getEntries();
        lcp = w[w.length - 1]?.startTime ?? lcp;
      });
      po.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {}
    const pokaz = () => {
      const nav = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;
      const ms = lcp || (nav && nav.loadEventEnd > 0 ? nav.loadEventEnd : 0);
      if (ms > 0) setS(ms / 1000);
    };
    const t = setTimeout(pokaz, 300);
    const gotowe = () => setTimeout(pokaz, 300);
    if (document.readyState === "complete") gotowe();
    else window.addEventListener("load", gotowe, { once: true });
    return () => {
      clearTimeout(t);
      po?.disconnect();
    };
  }, []);

  return (
    <span className="tabular-nums">
      {s === null ? "Mierzymy czas ładowania…" : `Ta strona załadowała się w ${s.toFixed(1).replace(".", ",")} s`}
    </span>
  );
}
