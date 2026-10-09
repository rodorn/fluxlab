"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type TabItem = {
  /** Krótka etykieta zakładki. */
  label: string;
  /** Pełna treść zakładki, przekazywana z server componentu. */
  content: ReactNode;
  /** Kotwica, po której da się otworzyć zakładkę linkiem `#kotwica`. */
  kotwica?: string;
};

type Props = {
  tabs: TabItem[];
  /** Etykieta dla czytników ekranu, np. "Sekcje oferty". */
  ariaLabel?: string;
};

/**
 * Tabs, dzieli długą stronę na zakładki. Treść NIE jest usuwana,
 * cała jest w DOM, widoczna jest jedna zakładka naraz (≤2000px).
 * Jeden URL, pełne SEO. Dostępny: role tab/tablist/tabpanel + klawiatura.
 */
export default function Tabs({ tabs, ariaLabel = "Sekcje strony" }: Props) {
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Linki `#kotwica` z tej samej strony mają otwierać zakładkę, a nie
  // przewijać do ukrytego panelu. Hash czytamy przy wejściu i przy każdej
  // jego zmianie, bo kliknięcie w kotwicę nie przeładowuje strony.
  const kotwice = tabs.map((t) => t.kotwica ?? "").join("|");
  useEffect(() => {
    const lista = kotwice.split("|");
    function zHasha() {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const i = lista.indexOf(hash);
      if (i === -1) return;
      setActive(i);
      if (wrapRef.current) {
        const top =
          wrapRef.current.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "auto" });
      }
    }
    zHasha();
    window.addEventListener("hashchange", zHasha);
    return () => window.removeEventListener("hashchange", zHasha);
  }, [kotwice]);

  function select(i: number) {
    setActive(i);
    const kotwica = tabs[i].kotwica;
    if (kotwica) {
      window.history.replaceState(null, "", `#${kotwica}`);
    }
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
      {/* Pasek zakładek, sticky pod headerem */}
      <div className="sticky top-16 z-30 -mx-6 lg:-mx-8 px-6 lg:px-8 bg-white/85 dark:bg-gray-950/85 backdrop-blur-md">
        <div
          role="tablist"
          aria-label={ariaLabel}
          className="container-wide flex flex-wrap gap-x-6 gap-y-0 border-b border-gray-200 dark:border-gray-800"
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
              className={`-mb-px border-b-2 px-1 py-3 text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-t ${
                active === i
                  ? "border-accent text-accent"
                  : "border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Panele, wszystkie w DOM, ukryte poza aktywnym (treść zachowana) */}
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
