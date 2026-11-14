"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/** Okno zgody na Google Analytics, Google Ads i piksel Meta (z reklamami dopasowanymi;
 *  fluxlab_zgoda_rem odróżnia ją od zgód sprzed 14.11.2026, które remarketingu nie obejmowały). Bez zgody oba działają w trybie
 *  bez ciasteczek (Consent Mode v2, tryb zaawansowany, app/layout.tsx). Okno jest w HTML od początku
 *  i widoczne, żeby malowało się razem ze stroną (inaczej Lighthouse bierze
 *  je za największy element, który pojawia się późno). Gdy wybór jest już
 *  zapisany, skrypt w <head> (app/layout.tsx) chowa je przed pierwszym
 *  malowaniem. */

declare global {
  interface Window {
    gtag?: (...a: unknown[]) => void;
  }
}

export default function ZgodaCookies() {
  const [widoczne, setWidoczne] = useState(true);

  useEffect(() => {
    let wybor: string | null = null;
    try {
      wybor = localStorage.getItem("fluxlab_zgoda");
    } catch {}
    if (wybor) setWidoczne(false);
  }, []);

  // Na telefonie pływające przyciski chowają się, dopóki okno jest otwarte.
  useEffect(() => {
    if (widoczne) document.body.dataset.zgoda = "";
    else delete document.body.dataset.zgoda;
  }, [widoczne]);

  const zapisz = (tak: boolean) => {
    try {
      localStorage.setItem("fluxlab_zgoda", tak ? "tak" : "nie");
      localStorage.setItem("fluxlab_zgoda_rem", tak ? "tak" : "nie");
      localStorage.setItem("fluxlab_zgoda_meta", tak ? "tak" : "nie");
    } catch {}
    window.gtag?.("consent", "update", {
      analytics_storage: tak ? "granted" : "denied",
      ad_storage: tak ? "granted" : "denied",
      ad_user_data: tak ? "granted" : "denied",
      ad_personalization: tak ? "granted" : "denied",
    });
    window.dispatchEvent(new Event("fluxlab-zgoda"));
    setWidoczne(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Zgoda na cookies"
      hidden={!widoczne}
      className="cookie-consent print:hidden fixed bottom-4 left-4 right-4 z-[45] rounded-2xl border border-gray-200 bg-white p-4 text-sm shadow-2xl dark:border-white/10 dark:bg-gray-900 md:right-auto md:max-w-sm"
    >
      <p className="text-gray-700 dark:text-gray-300">
        Liczymy odwiedziny w Google Analytics i skuteczność reklam Google i Meta. „Akceptuj” oznacza zgodę na ciasteczka analityczne i reklamowe, w tym na reklamy Google i Meta (Facebook, Instagram) dopasowane do tej wizyty (remarketing). Bez zgody nic nie zapisujemy.{" "}
        <Link href="/polityka-prywatnosci" className="text-accent underline underline-offset-2">
          Szczegóły
        </Link>
      </p>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={() => zapisz(true)} className="btn-primary flex-1 px-4 py-2">
          Akceptuj
        </button>
        <button type="button" onClick={() => zapisz(false)} className="btn-secondary flex-1 px-4 py-2">
          Odrzuć
        </button>
      </div>
    </div>
  );
}
