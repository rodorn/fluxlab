"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { WDROZENIA } from "@/lib/wdrozenia";

const W = WDROZENIA[0];

const EKRANY = [
  {
    etykieta: "Problem",
    tytul: "Strona, która ważyła 6,2 MB",
    tekst: W.problem,
    obraz: { src: "/photos/realizacja-finreal-przed.webp", alt: "Stara strona finreal.pl", szer: 2880, wys: 1620 },
  },
  {
    etykieta: "Decyzja",
    tytul: "Projekt z Figmy na Next.js z CMS",
    tekst:
      "Nie poprawiamy starej strony. Przenosimy projekt z Figmy na Next.js z CMS, a stare adresy przekierowujemy, żeby nic nie zniknęło z Google.",
    obraz: { src: "/photos/finreal-makieta.webp", alt: "Makieta strony głównej FINREAL z Figmy", szer: 720, wys: 620 },
  },
  {
    etykieta: "Wynik",
    tytul: "12 dni zamiast 5 tygodni",
    tekst: "Strona na produkcji 12 dni od startu prac, przy terminie 5 tygodni.",
    obraz: null,
  },
] as const;

/** Trzy ekrany realizacji FINREAL w poziomo przewijanym pasku (problem, decyzja, wynik). */
export default function RealizacjaFinreal() {
  const tor = useRef<HTMLDivElement>(null);
  const wideo = useRef<HTMLVideoElement>(null);
  const [numer, ustawNumer] = useState(0);

  useEffect(() => {
    const v = wideo.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    obs.observe(v);
    return () => obs.disconnect();
  }, []);

  function przy() {
    const t = tor.current;
    if (!t) return;
    const srodek = t.scrollLeft + t.clientWidth / 2;
    let best = 0;
    let dyst = Infinity;
    Array.from(t.children).forEach((c, i) => {
      const el = c as HTMLElement;
      const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - srodek);
      if (d < dyst) {
        dyst = d;
        best = i;
      }
    });
    ustawNumer(best);
  }

  function idz(i: number) {
    const t = tor.current;
    const el = t?.children[i] as HTMLElement | undefined;
    if (!t || !el) return;
    const spokojny = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    t.scrollTo({
      left: el.offsetLeft - (t.clientWidth - el.offsetWidth) / 2,
      behavior: spokojny ? "auto" : "smooth",
    });
  }

  return (
    <section aria-labelledby="finreal-ekrany" className="mt-14">
      <div className="mx-auto max-w-3xl text-center">
        <p className="section-label mb-3">FINREAL w trzech ekranach</p>
        <h2 id="finreal-ekrany" className="h2-sekcji">
          Od problemu do wyniku
        </h2>
      </div>

      <div
        ref={tor}
        onScroll={przy}
        tabIndex={0}
        role="region"
        aria-label="Realizacja FINREAL, przewijany pasek ekranów"
        className="finreal-tor mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto rounded-2xl pb-4"
      >
        {EKRANY.map((e, i) => (
          <article
            key={e.etykieta}
            aria-label={`${i + 1} z ${EKRANY.length}: ${e.etykieta}`}
            className="flex w-[88%] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white/60 dark:border-gray-800/80 dark:bg-gray-900/40 md:w-[46rem]"
          >
            <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-800">
              {e.obraz ? (
                <Image
                  src={e.obraz.src}
                  alt={e.obraz.alt}
                  width={e.obraz.szer}
                  height={e.obraz.wys}
                  sizes="(min-width: 768px) 736px, 88vw"
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="relative aspect-[390/844] h-[92%] overflow-hidden rounded-[1.6rem] border-[5px] border-gray-900 bg-gray-900 shadow-xl">
                  <video
                    ref={wideo}
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="/photos/finreal-przewijanie-plakat.webp"
                    aria-label="Przewijanie nowej strony finreal.pl na telefonie"
                  >
                    <source src="/photos/finreal-przewijanie.webm" type="video/webm" />
                    <source src="/photos/finreal-przewijanie.mp4" type="video/mp4" />
                  </video>
                </div>
              )}
              <span className="absolute left-3 top-3 rounded-full bg-gray-900/75 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                {`0${i + 1}`} {e.etykieta}
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{e.tytul}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{e.tekst}</p>
              {i === 2 && (
                <p className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-800">
                  <span className="text-2xl font-bold tabular-nums text-accent">{W.liczba}</span>{" "}
                  <span className="text-sm text-gray-600 dark:text-gray-400">{W.liczbaOpis}</span>
                </p>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => idz(Math.max(numer - 1, 0))}
          disabled={numer === 0}
          aria-label="Poprzedni ekran"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition-colors hover:border-accent hover:text-accent disabled:opacity-30 dark:border-gray-700 dark:text-gray-200"
        >
          <span aria-hidden="true">←</span>
        </button>
        <div className="flex gap-2" aria-hidden="true">
          {EKRANY.map((e, i) => (
            <span
              key={e.etykieta}
              className={`h-2 rounded-full transition-all ${i === numer ? "w-6 bg-accent" : "w-2 bg-gray-300 dark:bg-gray-700"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => idz(Math.min(numer + 1, EKRANY.length - 1))}
          disabled={numer === EKRANY.length - 1}
          aria-label="Następny ekran"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition-colors hover:border-accent hover:text-accent disabled:opacity-30 dark:border-gray-700 dark:text-gray-200"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
