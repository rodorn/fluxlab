"use client";

import { useEffect, useState } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** Tag (540 kB po rozpakowaniu) ładuje się przy pierwszym ruchu odwiedzającego
 *  albo po 8 s, a nie zaraz po zdarzeniu load: na słabym telefonie jego
 *  wykonanie blokowało stronę na pół sekundy w chwili, gdy ktoś zaczynał czytać.
 *  Odsłona jest liczona tak samo, tylko później. */
export default function GoogleAnalytics() {
  const [gotowe, ustawGotowe] = useState(false);

  useEffect(() => {
    const zdarzenia = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
    const start = () => {
      ustawGotowe(true);
      sprzatnij();
    };
    const zegar = setTimeout(start, 8000);
    const sprzatnij = () => {
      clearTimeout(zegar);
      zdarzenia.forEach((z) => window.removeEventListener(z, start));
    };
    zdarzenia.forEach((z) =>
      window.addEventListener(z, start, { once: true, passive: true }),
    );
    return sprzatnij;
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
