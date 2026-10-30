"use client";

import { useEffect, useState } from "react";
import { KLUCZ_DZWIEKU, dzwiekWlaczony, zagraj } from "@/lib/dzwiek";

export default function PrzelacznikDzwieku() {
  const [wl, setWl] = useState<boolean | null>(null);

  useEffect(() => setWl(dzwiekWlaczony()), []);

  const przelacz = () => {
    const nowy = !wl;
    try {
      localStorage.setItem(KLUCZ_DZWIEKU, nowy ? "1" : "0");
    } catch {
      /* zablokowana pamięć: wybór działa do końca wizyty */
    }
    setWl(nowy);
    if (nowy) zagraj("wynik", true);
  };

  return (
    <button
      type="button"
      data-bez-dzwieku
      role="switch"
      aria-checked={wl ?? false}
      onClick={przelacz}
      className="inline-flex min-h-6 items-center hover:text-accent transition-colors"
    >
      Dźwięki interfejsu: {wl === null ? "" : wl ? "włączone" : "wyłączone"}
    </button>
  );
}
