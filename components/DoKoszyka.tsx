"use client";

import { przelacz, useKoszyk, type PozycjaKoszyka } from "@/lib/koszyk";
import { zglosZdarzenie } from "@/lib/zdarzenie";

const PLUS = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const PTASZEK = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M3 8.5l3.2 3L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
  const jest = useKoszyk().some((x) => x.id === pozycja.id);
  function klik() {
    if (!jest) zglosZdarzenie("koszyk_dodaj");
    przelacz(pozycja);
  }
  if (maly)
    return (
      <button
        type="button"
        onClick={klik}
        aria-pressed={jest}
        aria-label={jest ? `Usuń z koszyka: ${pozycja.nazwa}` : `Dodaj do koszyka: ${pozycja.nazwa}`}
        title={jest ? "W koszyku" : "Dodaj do koszyka"}
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
          jest
            ? "border-accent bg-accent text-white"
            : "border-gray-200 text-gray-500 hover:border-accent hover:text-accent dark:border-white/10 dark:text-gray-400"
        } ${className}`}
      >
        {jest ? PTASZEK : PLUS}
      </button>
    );
  return (
    <button
      type="button"
      onClick={klik}
      aria-pressed={jest}
      className={`inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        jest
          ? "border-accent bg-accent/10 text-accent"
          : "border-gray-200 text-gray-700 hover:border-accent hover:text-accent dark:border-white/10 dark:text-gray-200"
      } ${className}`}
    >
      {jest ? PTASZEK : PLUS}
      {jest ? "W koszyku" : "Dodaj do koszyka"}
    </button>
  );
}
