"use client";

import { zglosZdarzenie } from "@/lib/zdarzenie";

/** Jedno CTA ofertowe nad narzędziem: osoba z mediów społecznościowych
 *  zwykle tylko sprawdza narzędzie i wychodzi, więc oferta stoi przed nim. */
export default function CtaNadNarzedziem({ miejsce }: { miejsce: string }) {
  return (
    <div className="mx-auto mb-8 flex max-w-4xl flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white/70 p-4 text-center sm:flex-row sm:justify-between sm:text-left dark:border-white/10 dark:bg-white/5">
      <p className="font-semibold text-gray-900 dark:text-white">
        Chcesz, żebyśmy zrobili to za Ciebie?{" "}
        <span className="font-normal text-gray-600 dark:text-gray-300">
          Wycena w godzinę, 0 zł
        </span>
      </p>
      <a
        href="#kontakt"
        onClick={() => zglosZdarzenie(`cta_nad_narzedziem_${miejsce}`)}
        className="btn-primary shrink-0 max-sm:w-full"
      >
        Poproś o wycenę
      </a>
    </div>
  );
}
