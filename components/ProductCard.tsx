import Link from "next/link";
import type { Product } from "@/lib/products";

/**
 * Kafelek pojedynczej pozycji katalogu. Wyjety z `ProductGrid`, bo ten sam
 * kafelek pokazuje teraz takze filtrowany katalog na `/produkty`, a dwie
 * kopie tego samego znacznika rozjezdzaja sie po pierwszej poprawce.
 */
export default function ProductCard({ p }: { p: Product }) {
  return (
    <div
      className={`flex flex-col rounded-2xl border p-6 transition-colors ${
        p.featured
          ? "border-accent/60 bg-white/80 dark:bg-gray-900/60"
          : "border-gray-200/80 dark:border-gray-800/80 bg-white/60 dark:bg-gray-900/40 hover:border-accent/50"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-accent">
        {p.tagline}
      </p>
      <h3 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
        {p.name}
      </h3>
      {p.narzedzie && (
        <p className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M2 6.2l2.6 2.6L10 3.4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Sprawdzisz sam za darmo, bez rejestracji
        </p>
      )}
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{p.desc}</p>
      <ul className="mt-4 space-y-2">
        {p.bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
          >
            <svg
              className="mt-0.5 flex-shrink-0 text-accent"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2.5 7l3 3 6-6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="leading-snug">{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-baseline justify-between gap-3 border-t border-gray-100 dark:border-gray-800 pt-4">
        <span className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {p.price}
        </span>
        {p.narzedzie && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            sprawdzenie 0 zł
          </span>
        )}
      </div>
      <Link
        href={p.href}
        className="btn-primary mt-4 w-full justify-center text-center text-sm"
      >
        {p.cta}
      </Link>
    </div>
  );
}
