"use client";

import { useEffect, useState } from "react";

/** Subtelna linia pod przyciskami; miejsce jest zarezerwowane, więc nic nie skacze. */
export default function MiastoHero() {
  const [miasto, setMiasto] = useState("");

  useEffect(() => {
    const ac = new AbortController();
    fetch("/api/miasto", { signal: ac.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && typeof d.miasto === "string") setMiasto(d.miasto);
      })
      .catch(() => {});
    return () => ac.abort();
  }, []);

  return (
    <p
      className={`mt-6 h-5 text-sm text-gray-500 transition-opacity duration-700 dark:text-white/50 ${
        miasto ? "opacity-100" : "opacity-0"
      }`}
    >
      {miasto ? `Pracujemy też z firmami ${miasto}` : ""}
    </p>
  );
}
