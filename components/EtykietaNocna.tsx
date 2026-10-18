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

  if (!tekst) return null;
  return (
    <p className="mb-5 inline-flex animate-fade-up rounded-full border border-accent/40 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent">
      {tekst}
    </p>
  );
}
