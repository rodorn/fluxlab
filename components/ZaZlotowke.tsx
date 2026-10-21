"use client";

import Link from "next/link";
import { useState } from "react";

export type PozycjaCennika = { nazwa: string; href: string; cena: number };

const zl = (n: number) =>
  String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " zł";

/** Suwak budżetu pokazuje, które usługi z cennika są w jego zasięgu (cena wejścia),
 *  jaką część budżetu zajmuje każda i co odblokuje się następne. Ceny z lib/products.ts. */
export default function ZaZlotowke({ pozycje }: { pozycje: PozycjaCennika[] }) {
  const posortowane = [...pozycje].sort((a, b) => a.cena - b.cena);
  const max = Math.ceil(((posortowane.at(-1)?.cena ?? 1000) * 1.25) / 100) * 100;
  const [budzet, setBudzet] = useState(500);
  const wZasiegu = posortowane.filter((p) => p.cena <= budzet);
  const nastepna = posortowane.find((p) => p.cena > budzet);
  const pokazane = [...wZasiegu].reverse().slice(0, 6);

  return (
    <section
      aria-labelledby="za-zlotowke"
      className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/60 lg:p-8"
    >
      <h2 id="za-zlotowke" className="h2-sekcji text-center">
        Co dostajesz za swój budżet
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Przesuń suwak. Pokazujemy usługi, których cena wejścia mieści się w
        budżecie, netto.
      </p>

      <p
        className="mt-6 text-center text-4xl font-bold tabular-nums text-accent"
        aria-live="polite"
      >
        {zl(budzet)}
      </p>
      <input
        type="range"
        min={50}
        max={max}
        step={50}
        value={budzet}
        onChange={(e) => setBudzet(+e.target.value)}
        aria-label="Budżet w złotych"
        className="mt-3 w-full accent-[rgb(var(--accent))]"
      />
      <div className="flex justify-between text-xs tabular-nums text-gray-500 dark:text-gray-400">
        <span>{zl(50)}</span>
        <span>{zl(max)}</span>
      </div>

      <p className="mt-6 text-center text-sm font-semibold text-gray-900 dark:text-white">
        {wZasiegu.length === 0
          ? "Przy tym budżecie nie ma jeszcze pozycji w cenniku."
          : `W zasięgu: ${wZasiegu.length} z ${posortowane.length} usług`}
      </p>

      <ul className="mt-3 space-y-2">
        {pokazane.map((p) => (
          <li key={p.href}>
            <Link
              href={p.href}
              className="block rounded-xl border border-gray-200 px-4 py-2.5 transition-colors hover:border-accent/60 dark:border-gray-700"
            >
              <span className="flex items-baseline justify-between gap-3 text-sm">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {p.nazwa}
                </span>
                <span className="shrink-0 tabular-nums text-gray-600 dark:text-gray-400">
                  od {zl(p.cena)}
                </span>
              </span>
              <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
                <span
                  className="block h-full rounded-full bg-accent-solid transition-[width] duration-300"
                  style={{
                    width: `${Math.max(2, Math.round((p.cena / budzet) * 100))}%`,
                  }}
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {wZasiegu.length > pokazane.length && (
        <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
          i {wZasiegu.length - pokazane.length} tańszych pozycji w cenniku niżej
        </p>
      )}
      {nastepna && (
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Jeszcze {zl(nastepna.cena - budzet)} i dojdzie:{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {nastepna.nazwa}
          </span>
        </p>
      )}
    </section>
  );
}
