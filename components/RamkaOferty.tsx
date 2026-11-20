"use client";

import Link from "next/link";
import { zglosZdarzenie } from "@/lib/zdarzenie";

/** Ramka z ofertą w połowie artykułu (makieta 3 ze zlecenia z 19.11).
 *  Kliknięcie zapisuje zdarzenie klik_ramka w liczniku, a artykuł wynika
 *  ze ścieżki zdarzenia. */
export default function RamkaOferty({
  tytul,
  tekst,
  przycisk = "Zapytaj o cenę",
  href,
}: {
  tytul: string;
  tekst: string;
  przycisk?: string;
  href: string;
}) {
  return (
    <aside
      aria-label="Oferta"
      className="not-prose my-10 rounded-2xl border border-accent/30 bg-accent/5 p-5 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6 dark:bg-accent/10"
    >
      <div>
        <p className="text-lg font-bold text-gray-900 dark:text-white">
          {tytul}
        </p>
        <p className="mt-1 text-gray-700 dark:text-gray-300">{tekst}</p>
      </div>
      <Link
        href={href}
        onClick={() => zglosZdarzenie("klik_ramka")}
        className="btn-primary mt-4 w-full shrink-0 text-center sm:mt-0 sm:w-auto"
      >
        {przycisk}
      </Link>
    </aside>
  );
}
