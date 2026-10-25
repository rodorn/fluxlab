"use client";

import { useEffect, useState } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** Tag (540 kB po rozpakowaniu) ładuje się przy pierwszym ruchu odwiedzającego
 *  albo po 8 s, a nie zaraz po zdarzeniu load: na słabym telefonie jego
 *  wykonanie blokowało stronę na pół sekundy w chwili, gdy ktoś zaczynał czytać.
 *  Samo wykonanie trwa ok. 100 ms, więc czeka, aż strona przestanie się
 *  przewijać, żeby nie przycinać ruchu. Odsłona jest liczona tak samo, tylko później. */
export default function GoogleAnalytics() {
  const [gotowe, ustawGotowe] = useState(false);

  useEffect(() => {
    const zdarzenia = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
    let cisza = 0;
    const wczytaj = () =>
      "requestIdleCallback" in window
        ? requestIdleCallback(() => ustawGotowe(true), { timeout: 2000 })
        : ustawGotowe(true);
    const poCiszy = () => {
      clearTimeout(cisza);
      cisza = window.setTimeout(() => {
        window.removeEventListener("scroll", poCiszy);
        wczytaj();
      }, 1500);
    };
    const start = () => {
      clearTimeout(zegar);
      zdarzenia.forEach((z) => window.removeEventListener(z, start));
      window.addEventListener("scroll", poCiszy, { passive: true });
      poCiszy();
    };
    const zegar = setTimeout(start, 8000);
    zdarzenia.forEach((z) =>
      window.addEventListener(z, start, { once: true, passive: true }),
    );
    return () => {
      clearTimeout(zegar);
      clearTimeout(cisza);
      zdarzenia.forEach((z) => window.removeEventListener(z, start));
      window.removeEventListener("scroll", poCiszy);
    };
  }, []);

  useEffect(() => {
    if (!gotowe || process.env.NODE_ENV !== "production" || !GA_MEASUREMENT_ID) return;
    const ustawienia = document.createElement("script");
    ustawienia.id = "google-analytics";
    ustawienia.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      var zgoda = null;
      try { zgoda = localStorage.getItem('fluxlab_zgoda'); } catch (e) {}
      gtag('consent', 'default', {
        'analytics_storage': zgoda === 'tak' ? 'granted' : 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
      });
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_path: window.location.pathname,
      });
    `;
    const tag = document.createElement("script");
    tag.async = true;
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.append(ustawienia, tag);
  }, [gotowe]);

  return null;
}
