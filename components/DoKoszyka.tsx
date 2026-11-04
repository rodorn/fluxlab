"use client";

import { useEffect, useRef, useState } from "react";
import { dodaj, przelacz, useKoszyk, wKoszyku, type PozycjaKoszyka } from "@/lib/koszyk";
import { OFERTA, warianty, type Wariant } from "@/lib/sprzedaz";
import { zglosZdarzenie } from "@/lib/zdarzenie";

const PLUS = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const PTASZEK = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="M3 8.5l3.2 3L13 4.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function DoKoszyka({
  pozycja,
  maly = false,
  className = "",
}: {
  pozycja: PozycjaKoszyka;
  maly?: boolean;
  className?: string;
}) {
  const jest = wKoszyku(useKoszyk(), pozycja);
  const [wybor, setWybor] = useState<ReturnType<typeof warianty> | null>(null);
  const ramka = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wybor) return;
    ramka.current?.querySelector<HTMLButtonElement>("[data-wariant]")?.focus();
    const poza = (e: PointerEvent) => {
      if (!ramka.current?.contains(e.target as Node)) setWybor(null);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setWybor(null);
    document.addEventListener("pointerdown", poza);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", poza);
      document.removeEventListener("keydown", esc);
    };
  }, [wybor]);

  function wybierz(w: Wariant) {
    const o = w.oferta ? OFERTA[w.oferta] : null;
    zglosZdarzenie("koszyk_dodaj");
    dodaj({
      ...pozycja,
      id: o ? `oferta:${w.oferta}` : pozycja.id,
      nazwa: o ? o.nazwa : pozycja.nazwa,
      cena: w.cena,
      oferta: w.oferta,
      grupa: pozycja.id,
    });
    setWybor(null);
  }

  function klik() {
    if (jest) return przelacz(pozycja);
    if (wybor) return setWybor(null);
    const w = warianty(pozycja);
    if (w.lista.length > 1) return setWybor(w);
    if (w.lista.length === 1) return wybierz(w.lista[0]);
    zglosZdarzenie("koszyk_dodaj");
    przelacz(pozycja);
  }

  const przycisk = maly ? (
    <button
      type="button"
      onClick={klik}
      aria-pressed={jest}
      aria-expanded={wybor ? true : undefined}
      aria-label={jest ? `Usuń z koszyka: ${pozycja.nazwa}` : `Dodaj do koszyka: ${pozycja.nazwa}`}
      title={jest ? "W koszyku" : "Dodaj do koszyka"}
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        jest
          ? "border-accent bg-accent text-white"
          : "border-gray-200 text-gray-500 hover:border-accent hover:text-accent dark:border-white/10 dark:text-gray-400"
      }`}
    >
      {jest ? PTASZEK : PLUS}
    </button>
  ) : (
    <button
      type="button"
      onClick={klik}
      aria-pressed={jest}
      aria-expanded={wybor ? true : undefined}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        jest
          ? "border-accent bg-accent/10 text-accent"
          : "border-gray-200 text-gray-700 hover:border-accent hover:text-accent dark:border-white/10 dark:text-gray-200"
      }`}
    >
      {jest ? PTASZEK : PLUS}
      {jest ? "W koszyku" : "Dodaj do koszyka"}
    </button>
  );

  return (
    <div ref={ramka} className={`relative ${maly ? "shrink-0" : ""} ${className}`}>
      {przycisk}
      {wybor && (
        <div
          role="dialog"
          aria-label={wybor.pytanie}
          className={`absolute z-30 mt-2 rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg dark:border-white/10 dark:bg-gray-900 ${
            maly ? "right-0 w-72 max-w-[calc(100vw-2rem)]" : "inset-x-0"
          }`}
        >
          <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {wybor.pytanie}
          </p>
          {wybor.lista.map((w) => (
            <button
              key={w.oferta ?? "wycena"}
              type="button"
              data-wariant
              onClick={() => wybierz(w)}
              className="flex w-full items-baseline justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm hover:bg-accent/10 focus:bg-accent/10 focus:outline-none"
            >
              <span className="text-gray-900 dark:text-white">
                {w.etykieta}
                <span className="block text-xs text-gray-500 dark:text-gray-400">
                  {w.oferta ? "płatność online" : "cena po wycenie"}
                </span>
              </span>
              <span className="shrink-0 font-semibold text-gray-700 dark:text-gray-200">{w.cena}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
