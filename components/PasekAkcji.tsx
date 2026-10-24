"use client";

import { useEffect, useState } from "react";

/* Pasek „Zamów wycenę” w telefonie: pokazuje się po zjechaniu z pierwszego
   ekranu, gdy przycisk z hero zniknął z widoku, chowa przy formularzu,
   żeby nie zasłaniał pól. */
export default function PasekAkcji() {
  const [widoczny, setWidoczny] = useState(false);

  useEffect(() => {
    const formularz = document.getElementById("kontakt");
    const ctaHero = document.getElementById("cta-hero");
    let przyFormularzu = false;
    let ctaWidoczne = !!ctaHero;
    const obsCta = ctaHero
      ? new IntersectionObserver(([w]) => {
          ctaWidoczne = w.isIntersecting;
          sprawdz();
        })
      : null;
    if (ctaHero) obsCta?.observe(ctaHero);
    const obs = formularz
      ? new IntersectionObserver(([w]) => {
          przyFormularzu = w.isIntersecting;
          sprawdz();
        })
      : null;
    if (formularz) obs?.observe(formularz);

    function sprawdz() {
      const w = window.scrollY > window.innerHeight * 0.6 && !przyFormularzu && !ctaWidoczne;
      setWidoczny(w);
      document.body.toggleAttribute("data-pasek-akcji", w);
    }
    sprawdz();
    window.addEventListener("scroll", sprawdz, { passive: true });
    return () => {
      window.removeEventListener("scroll", sprawdz);
      obs?.disconnect();
      obsCta?.disconnect();
      document.body.removeAttribute("data-pasek-akcji");
    };
  }, []);

  return (
    <div
      className={`pasek-akcji fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden dark:border-white/10 dark:bg-gray-950 ${
        widoczny ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!widoczny}
    >
      <a
        href="#kontakt"
        tabIndex={widoczny ? 0 : -1}
        className="btn-primary btn-lg w-full"
      >
        Zamów wycenę
      </a>
    </div>
  );
}
