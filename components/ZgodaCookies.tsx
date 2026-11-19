"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CLARITY_ID } from "@/lib/clarity";

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
  const sciezka = usePathname();
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

  // Pasek „Bezpłatna wycena” w telefonie staje nad oknem zgody, więc okno nie zasłania CTA.
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(".cookie-consent");
    if (!el || !widoczne) {
      document.body.style.removeProperty("--zgoda-h");
      return;
    }
    const mierz = () => document.body.style.setProperty("--zgoda-h", `${el.offsetHeight + 8}px`);
    mierz();
    const obs = new ResizeObserver(mierz);
    obs.observe(el);
    return () => {
      obs.disconnect();
      document.body.style.removeProperty("--zgoda-h");
    };
  }, [widoczne]);

  const zapisz = (tak: boolean) => {
    try {
      localStorage.setItem("fluxlab_zgoda", tak ? "tak" : "nie");
      localStorage.setItem("fluxlab_zgoda_rem", tak ? "tak" : "nie");
      localStorage.setItem("fluxlab_zgoda_meta", tak ? "tak" : "nie");
      if (CLARITY_ID) localStorage.setItem("fluxlab_zgoda_clarity", tak ? "tak" : "nie");
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

  if (sciezka?.startsWith("/embed/")) return null;

  return (
    <div
      role="dialog"
      aria-label="Zgoda na cookies"
      hidden={!widoczne}
      className="cookie-consent print:hidden fixed bottom-2 left-2 right-2 z-[45] rounded-xl border border-gray-200 bg-white p-3 text-xs shadow-2xl dark:border-white/10 dark:bg-gray-900 md:bottom-4 md:left-4 md:right-auto md:max-w-sm md:rounded-2xl md:p-4 md:text-sm"
    >
      <p className="text-gray-700 dark:text-gray-300">
        <span className="zgoda-krotko hidden">Ciasteczka tylko po zgodzie.</span>
        <span className="zgoda-dlugo md:hidden">
          Ciasteczka Google Analytics{CLARITY_ID ? ", Microsoft Clarity" : ""} oraz reklam Google i Meta (w tym remarketing) zapisujemy tylko po „Akceptuj”.
        </span>
        <span className="hidden md:inline">
          Liczymy odwiedziny w Google Analytics i skuteczność reklam Google i Meta. „Akceptuj” oznacza zgodę na ciasteczka analityczne i reklamowe, w tym na reklamy Google i Meta (Facebook, Instagram) dopasowane do tej wizyty (remarketing){CLARITY_ID ? " oraz na zapis przebiegu wizyty w Microsoft Clarity" : ""}. Bez zgody nic nie zapisujemy.
        </span>{" "}
        <Link href="/polityka-prywatnosci" className="text-accent underline underline-offset-2">
          Szczegóły
        </Link>
      </p>
      <div className="zgoda-przyciski mt-2 flex gap-2 md:mt-3">
        <button type="button" onClick={() => zapisz(true)} className="btn-primary flex-1 px-3 py-2 text-xs md:px-4 md:py-2 md:text-sm">
          Akceptuj
        </button>
        <button type="button" onClick={() => zapisz(false)} className="btn-secondary flex-1 px-3 py-2 text-xs md:px-4 md:py-2 md:text-sm">
          Odrzuć
        </button>
      </div>
    </div>
  );
}
