"use client";

import { useEffect, useState } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** Tag ładuje się po zdarzeniu load i w wolnej chwili przeglądarki, żeby jego
 *  177 kB nie konkurowało z pierwszym malowaniem. Pierwsza odsłona jest liczona
 *  tak samo, tylko kilkaset milisekund później. */
export default function GoogleAnalytics() {
  const [gotowe, ustawGotowe] = useState(false);

  useEffect(() => {
    const start = () => ustawGotowe(true);
    const odpal = () => {
      if ("requestIdleCallback" in window) window.requestIdleCallback(start, { timeout: 2000 });
      else setTimeout(start, 1000);
    };
    if (document.readyState === "complete") odpal();
    else window.addEventListener("load", odpal, { once: true });
    return () => window.removeEventListener("load", odpal);
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
