"use client";

import { useRef, useState, type ReactNode } from "react";

export type TabItem = {
  /** Krótka etykieta zakładki. */
  label: string;
  /** Pełna treść zakładki — przekazywana z server componentu. */
  content: ReactNode;
};

type Props = {
  tabs: TabItem[];
  /** Etykieta dla czytników ekranu, np. "Sekcje oferty". */
  ariaLabel?: string;
};

/**
 * Tabs — dzieli długą stronę na zakładki. Treść NIE jest usuwana —
 * cała jest w DOM, widoczna jest jedna zakładka naraz (≤2000px).
 * Jeden URL, pełne SEO. Dostępny: role tab/tablist/tabpanel + klawiatura.
 */
export default function Tabs({ tabs, ariaLabel = "Sekcje strony" }: Props) {
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(i: number) {
    setActive(i);
    // Przewiń na górę bloku zakładek przy zmianie
    if (wrapRef.current) {
      const top =
        wrapRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    }
  }

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    btnRefs.current[next]?.focus();
  }

  return (
    <div ref={wrapRef}>
      {/* Pasek zakładek — sticky pod headerem */}
      <div className="sticky top-16 z-30 -mx-6 lg:-mx-8 px-6 lg:px-8 py-3 bg-white/85 dark:bg-gray-950/85 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div
          role="tablist"
          aria-label={ariaLabel}
          className="container-wide flex flex-wrap gap-2"
        >
          {tabs.map((t, i) => (
            <button
              key={t.label}
              ref={(el) => {
                btnRefs.current[i] = el;
              }}
              role="tab"
              id={`tab-${i}`}
              aria-selected={active === i}
              aria-controls={`tabpanel-${i}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                active === i
                  ? "bg-accent text-white shadow-sm shadow-accent/30"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Panele — wszystkie w DOM, ukryte poza aktywnym (treść zachowana) */}
      {tabs.map((t, i) => (
        <div
          key={t.label}
          role="tabpanel"
          id={`tabpanel-${i}`}
          aria-labelledby={`tab-${i}`}
          hidden={active !== i}
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
