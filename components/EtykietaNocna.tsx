"use client";

import { useEffect, useState } from "react";

/** Mała etykieta nad H1 dla wejść między 22 a 6 czasu warszawskiego. */
export default function EtykietaNocna() {
  const [pokaz, setPokaz] = useState(false);

  // Sprawdzamy co minutę, bo karta otwarta przed 22 też ma pokazać etykietę.
  useEffect(() => {
    const sprawdz = () => {
      const h = Number(
        new Intl.DateTimeFormat("pl-PL", {
          hour: "numeric",
          hour12: false,
          timeZone: "Europe/Warsaw",
        }).format(new Date()),
      );
      setPokaz(h >= 22 || h < 6);
    };
    sprawdz();
    const t = window.setInterval(sprawdz, 60_000);
    return () => window.clearInterval(t);
  }, []);

  if (!pokaz) return null;
  return (
    <p className="mb-5 inline-flex animate-fade-up rounded-full border border-accent/40 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent">
      Pracujesz po godzinach? My też.
    </p>
  );
}
