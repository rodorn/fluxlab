"use client";

import { useEffect, useState } from "react";

/** Mała etykieta nad H1: w nocy (22–6) „po godzinach”, w sobotę i niedzielę
 *  w dzień „w weekend”. Czas warszawski. */
export default function EtykietaNocna() {
  const [tekst, setTekst] = useState("");

  // Sprawdzamy co minutę, bo karta otwarta wcześniej też ma pokazać etykietę.
  useEffect(() => {
    const sprawdz = () => {
      const czesci = new Intl.DateTimeFormat("en-GB", {
        hour: "numeric",
        hour12: false,
        weekday: "short",
        timeZone: "Europe/Warsaw",
      }).formatToParts(new Date());
      const h = Number(czesci.find((c) => c.type === "hour")?.value);
      const dzien = czesci.find((c) => c.type === "weekday")?.value;
      if (h >= 22 || h < 6) setTekst("Pracujesz po godzinach? My też.");
      else if (dzien === "Sat" || dzien === "Sun")
        setTekst("Pracujesz w weekend? My też.");
      else setTekst("");
    };
    sprawdz();
    const t = window.setInterval(sprawdz, 60_000);
    return () => window.clearInterval(t);
  }, []);

  // Etykieta leży w górnym marginesie sekcji, poza przepływem: pojawia się
  // dopiero po hydracji i w przepływie spychała całe hero (CLS 0,05).
  if (!tekst) return null;
  return (
    <div className="pointer-events-none absolute inset-x-0 top-3 flex justify-center lg:top-5">
      <p className="hero-pigulka pointer-events-auto inline-flex animate-fade-up rounded-full border border-accent/40 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent">
        {tekst}
      </p>
    </div>
  );
}
