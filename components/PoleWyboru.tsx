"use client";

import { useEffect, useId, useRef, useState } from "react";

export type OpcjaWyboru = { value: string; label: string };

/** Pole wyboru w stylu strony zamiast natywnego <select>. Ukryte pole input
 *  niesie nazwę i wymaganie do formularza, więc odczyt przez form.elements
 *  i walidacja przeglądarki działają jak wcześniej. */
export default function PoleWyboru({
  id,
  name,
  wartosc,
  opcje,
  placeholder,
  disabled = false,
  required = false,
  onZmiana,
}: {
  id: string;
  name: string;
  wartosc: string;
  opcje: OpcjaWyboru[];
  placeholder: string;
  disabled?: boolean;
  required?: boolean;
  onZmiana: (v: string) => void;
}) {
  const [otwarte, setOtwarte] = useState(false);
  const [aktywna, setAktywna] = useState(0);
  const kontener = useRef<HTMLDivElement | null>(null);
  const lista = useRef<HTMLUListElement | null>(null);
  const listaId = useId();
  const wybieralne = opcje.filter((o) => o.value !== "");
  const wybrana = wybieralne.find((o) => o.value === wartosc);

  useEffect(() => {
    if (!otwarte) return;
    const klik = (e: MouseEvent) => {
      if (!kontener.current?.contains(e.target as Node)) setOtwarte(false);
    };
    document.addEventListener("mousedown", klik);
    return () => document.removeEventListener("mousedown", klik);
  }, [otwarte]);

  useEffect(() => {
    if (otwarte)
      lista.current?.children[aktywna]?.scrollIntoView({ block: "nearest" });
  }, [aktywna, otwarte]);

  const otworz = () => {
    if (disabled) return;
    setAktywna(
      Math.max(
        0,
        wybieralne.findIndex((o) => o.value === wartosc),
      ),
    );
    setOtwarte(true);
  };
  const wybierz = (v: string) => {
    onZmiana(v);
    setOtwarte(false);
  };

  const klawisz = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (!otwarte && ["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      otworz();
      return;
    }
    if (!otwarte) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setAktywna((a) => Math.min(wybieralne.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setAktywna((a) => Math.max(0, a - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setAktywna(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setAktywna(wybieralne.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      wybierz(wybieralne[aktywna].value);
    } else if (e.key === "Escape" || e.key === "Tab") {
      setOtwarte(false);
    }
  };

  return (
    <div ref={kontener} className="relative">
      <input
        tabIndex={-1}
        aria-hidden="true"
        name={name}
        required={required}
        value={wartosc}
        onChange={() => {}}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-0"
      />
      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={otwarte}
        aria-controls={listaId}
        aria-activedescendant={otwarte ? `${listaId}-${aktywna}` : undefined}
        disabled={disabled}
        onClick={() => (otwarte ? setOtwarte(false) : otworz())}
        onKeyDown={klawisz}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border bg-white px-4 py-2.5 text-left text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-900 ${
          otwarte
            ? "border-accent ring-2 ring-accent/20"
            : "border-gray-200 hover:border-accent/50 dark:border-gray-700"
        }`}
      >
        <span
          className={
            wybrana
              ? "text-gray-900 dark:text-gray-100"
              : "text-gray-400 dark:text-gray-500"
          }
        >
          {wybrana?.label ?? placeholder}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          aria-hidden="true"
          className={`shrink-0 text-gray-500 transition-transform duration-200 ${otwarte ? "rotate-180" : ""}`}
        >
          <path
            d="M2.5 4.5l3.5 3.5 3.5-3.5"
            stroke="currentColor"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {otwarte && (
        <ul
          ref={lista}
          id={listaId}
          role="listbox"
          className="menu-panel absolute left-0 right-0 top-full z-30 mt-2 max-h-72 overflow-auto rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl dark:border-white/10 dark:bg-gray-900"
        >
          {wybieralne.map((o, i) => {
            const zaznaczona = o.value === wartosc;
            return (
              <li
                key={o.value}
                id={`${listaId}-${i}`}
                role="option"
                aria-selected={zaznaczona}
                onMouseEnter={() => setAktywna(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => wybierz(o.value)}
                className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm ${
                  i === aktywna
                    ? "bg-accent/[0.08] text-accent"
                    : "text-gray-700 dark:text-gray-200"
                } ${zaznaczona ? "font-semibold" : ""}`}
              >
                {o.label}
                {zaznaczona && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    aria-hidden="true"
                    className="shrink-0 text-accent"
                  >
                    <path
                      d="M3 7.5l2.5 2.5L11 4.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
