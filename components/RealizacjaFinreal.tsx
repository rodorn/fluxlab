"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { WDROZENIA } from "@/lib/wdrozenia";

const W = WDROZENIA[0];

const RAMKA =
  "overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-white/10 dark:bg-gray-900";

function PasekAdresu({ adres }: { adres: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 py-2.5 dark:border-white/10 dark:bg-white/5">
      <span aria-hidden="true" className="flex gap-1.5">
        <i className="h-2 w-2 rounded-full bg-gray-300 dark:bg-white/20" />
        <i className="h-2 w-2 rounded-full bg-gray-300 dark:bg-white/20" />
        <i className="h-2 w-2 rounded-full bg-gray-300 dark:bg-white/20" />
      </span>
      <span className="mx-auto min-w-0 truncate rounded-md bg-white px-4 py-1 text-xs tracking-wide text-gray-500 dark:bg-white/5 dark:text-gray-400">
        {adres}
      </span>
      <span aria-hidden="true" className="w-9" />
    </div>
  );
}

function Akt({
  numer,
  etykieta,
  tytul,
  children,
}: {
  numer: string;
  etykieta: string;
  tytul: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-medium uppercase tracking-widest text-accent">
        <span className="tabular-nums">{numer}</span>
        <span aria-hidden="true" className="mx-3 inline-block h-px w-8 bg-gray-300 align-middle dark:bg-gray-700" />
        {etykieta}
      </p>
      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-3xl">
        {tytul}
      </h3>
      {children}
    </div>
  );
}

function Linia() {
  return (
    <div aria-hidden="true" className="mx-auto my-16 h-16 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-gray-700 md:my-20" />
  );
}

/** Reportaż o realizacji FINREAL w trzech aktach: problem klienta, co zrobiliśmy, efekt. */
export default function RealizacjaFinreal() {
  const wideo = useRef<HTMLVideoElement>(null);

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

  return (
    <section aria-labelledby="finreal-reportaz" className="mt-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="section-label mb-3">Reportaż: finreal.pl</p>
        <h2 id="finreal-reportaz" className="h2-sekcji">
          Strona pośrednika kredytowego, w trzech aktach
        </h2>
      </div>

      <div className="mt-16">
        <Akt numer="I" etykieta="Problem klienta" tytul="Strona, która ważyła 6,2 megabajta">
          <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
            Blog na telefonie pokazywał treść po 11 sekundach. Audyt techniczny dawał 45 punktów na 100.
          </p>
        </Akt>
        <figure className="mx-auto mt-10 max-w-3xl">
          <div className={RAMKA}>
            <PasekAdresu adres="finreal.pl" />
            <Image
              src="/photos/realizacja-finreal-przed.webp"
              alt="Stara strona finreal.pl"
              width={2880}
              height={1620}
              sizes="(min-width: 768px) 768px, 100vw"
              className="block h-auto w-full"
            />
          </div>
          <figcaption className="mt-3 text-center text-xs tracking-wide text-gray-500 dark:text-gray-400">
            Przed: stara strona
          </figcaption>
        </figure>

        <Linia />

        <Akt numer="II" etykieta="Co zrobiliśmy" tytul="Projekt z Figmy na Next.js">
          <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
            Nie poprawialiśmy starej strony. Przenieśliśmy projekt z Figmy na Next.js z systemem zarządzania treścią,
            a stare adresy przekierowaliśmy, żeby nic nie zniknęło z Google.
          </p>
        </Akt>
        <figure className="mx-auto mt-10 max-w-xl">
          <div className={RAMKA}>
            <Image
              src="/photos/finreal-makieta.webp"
              alt="Makieta strony głównej FINREAL z Figmy"
              width={720}
              height={620}
              sizes="(min-width: 640px) 576px, 100vw"
              className="block h-auto w-full"
            />
          </div>
          <figcaption className="mt-3 text-center text-xs tracking-wide text-gray-500 dark:text-gray-400">
            Makieta z Figmy
          </figcaption>
        </figure>

        <Linia />

        <Akt numer="III" etykieta="Efekt" tytul="12 dni zamiast 5 tygodni">
          <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
            Strona na produkcji 12 dni od startu prac, przy terminie 5 tygodni.
          </p>
        </Akt>
        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-10 md:flex-row md:justify-center md:gap-14">
          <figure className="w-44 shrink-0 sm:w-52">
            <div className="aspect-[390/844] overflow-hidden rounded-3xl border-4 border-gray-900 bg-gray-900 shadow-xl dark:border-gray-700">
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
            <figcaption className="mt-3 text-center text-xs tracking-wide text-gray-500 dark:text-gray-400">
              Po: nowa strona na telefonie
            </figcaption>
          </figure>
          <p className="text-center">
            <span className="block text-5xl font-bold tabular-nums tracking-tight text-accent md:text-6xl">
              {W.liczba}
            </span>
            <span className="mx-auto mt-3 block max-w-xs text-sm text-gray-600 dark:text-gray-400">
              {W.liczbaOpis}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
