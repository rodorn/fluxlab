"use client";

import { useEffect, useRef, useState } from "react";

type Props = { kroki: readonly (readonly string[])[] };

const OBWOD = 2 * Math.PI * 44;

/**
 * Kroki: na desktopie lewa kolumna jest przyklejona i pokazuje bieżący krok,
 * prawa przewija się obok. Na telefonie zwykła lista.
 */
export default function KrokiSticky({ kroki }: Props) {
  const [aktywny, setAktywny] = useState(0);
  const refy = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const wezly = refy.current.filter(Boolean) as HTMLLIElement[];
    if (!("IntersectionObserver" in window)) return;
    const obs = new IntersectionObserver(
      (wpisy) => {
        for (const w of wpisy) {
          if (w.isIntersecting) {
            const i = wezly.indexOf(w.target as HTMLLIElement);
            if (i >= 0) setAktywny(i);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    wezly.forEach((w) => obs.observe(w));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="mx-auto mt-20 grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
      <div
        aria-hidden="true"
        className="hidden lg:sticky lg:top-32 lg:block lg:self-start"
      >
        <div className="relative flex h-28 w-28 items-center justify-center">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="44" fill="none" strokeWidth="3" className="stroke-gray-200 dark:stroke-white/10" />
            <circle
              key={aktywny}
              cx="50"
              cy="50"
              r="44"
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
              className="kroki-pierscien stroke-accent"
              strokeDasharray={OBWOD}
              strokeDashoffset={OBWOD}
            />
          </svg>
          <span key={aktywny} className="kroki-zmiana text-5xl font-bold tracking-tighter">
            {aktywny + 1}
          </span>
        </div>
        <p key={`t${aktywny}`} className="kroki-zmiana mt-6 text-balance text-3xl font-bold tracking-tighter">
          {kroki[aktywny][0]}
        </p>
      </div>

      <ol className="space-y-4 lg:space-y-0">
        {kroki.map(([tytul, opis], i) => (
          <li
            key={tytul}
            ref={(el) => {
              refy.current[i] = el;
            }}
            className={`flex gap-4 rounded-2xl border border-gray-200 p-5 transition-opacity duration-500 dark:border-white/10 lg:min-h-[45vh] lg:items-center lg:border-0 lg:p-0 ${
              i === aktywny ? "lg:opacity-100" : "lg:opacity-35"
            }`}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-solid text-sm font-bold text-white">
              {i + 1}
            </span>
            <div>
              <p className="font-semibold lg:text-2xl">{tytul}</p>
              <p className="text-sm text-gray-600 dark:text-white/60 lg:mt-2 lg:text-lg">
                {opis}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
