"use client";

import { useEffect, useRef, useState } from "react";

type Props = { kroki: readonly (readonly string[])[] };

/**
 * Trzy kroki w jednym rzędzie. Po wejściu w widok linia między nimi się
 * wypełnia, a kroki zapalają się po kolei. Na telefonie pionowo.
 */
export default function KrokiSticky({ kroki }: Props) {
  const [aktywny, setAktywny] = useState(-1);
  const ref = useRef<HTMLOListElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || !("IntersectionObserver" in window)) {
      setAktywny(kroki.length - 1);
      return;
    }
    const czasy: number[] = [];
    const obs = new IntersectionObserver(
      ([w]) => {
        if (!w.isIntersecting) return;
        obs.disconnect();
        kroki.forEach((_, i) =>
          czasy.push(window.setTimeout(() => setAktywny(i), 150 + i * 550)),
        );
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      czasy.forEach((t) => window.clearTimeout(t));
    };
  }, [kroki]);

  const postep = aktywny < 0 ? 0 : (aktywny / (kroki.length - 1)) * 100;

  return (
    <ol
      ref={ref}
      className="relative mx-auto mt-20 grid max-w-5xl gap-8 md:grid-cols-3 md:gap-6"
    >
      <span
        aria-hidden="true"
        className="absolute bottom-4 left-4 top-4 w-0.5 bg-gray-200 dark:bg-white/10 md:hidden"
      >
        <span
          className="absolute inset-0 origin-top bg-accent-solid transition-transform duration-[1100ms] ease-out"
          style={{ transform: `scaleY(${postep / 100})` }}
        />
      </span>
      <span
        aria-hidden="true"
        className="absolute left-[16.66%] right-[16.66%] top-[17px] hidden h-0.5 bg-gray-200 dark:bg-white/10 md:block"
      >
        <span
          className="absolute inset-0 origin-left bg-accent-solid transition-transform duration-[1100ms] ease-out"
          style={{ transform: `scaleX(${postep / 100})` }}
        />
      </span>
      {kroki.map(([tytul, opis], i) => {
        const wlaczony = i <= aktywny;
        return (
          <li
            key={tytul}
            className="relative flex gap-4 pl-0 md:flex-col md:items-center md:text-center"
          >
            <span
              className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-500 ${
                wlaczony
                  ? "scale-110 bg-accent-solid text-white shadow-lg shadow-accent/30"
                  : "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-white/70"
              }`}
            >
              {i + 1}
            </span>
            <div
              className={`transition-all duration-500 ${
                wlaczony
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-40"
              }`}
            >
              <p className="text-lg font-semibold md:mt-4">{tytul}</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-white/60">
                {opis}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
