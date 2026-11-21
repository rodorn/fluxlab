"use client";

import { useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";

const ODPOWIEDZI = [
  { k: "cena", t: "Ile to kosztuje" },
  { k: "system", t: "Czy mój system da się podłączyć" },
  { k: "termin", t: "Od kiedy mnie to obowiązuje" },
];

/** Ankieta jednego pytania na dole strony z reklamy: trzy odpowiedzi do
 *  kliknięcia, wynik jako zdarzenie ankieta_<odpowiedź> w liczniku. */
export default function AnkietaWyjscia() {
  const [wybrana, setWybrana] = useState<string | null>(null);
  return (
    <section className="container-wide py-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        {wybrana ? (
          <p className="font-semibold text-gray-900 dark:text-white">
            Dziękujemy. Jeśli chcesz odpowiedzi na to pytanie, zostaw numer w
            formularzu u góry.
          </p>
        ) : (
          <>
            <p className="font-semibold text-gray-900 dark:text-white">
              Czego szukałeś na tej stronie?
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {ODPOWIEDZI.map((o) => (
                <button
                  key={o.k}
                  type="button"
                  className="btn-secondary w-full"
                  onClick={() => {
                    setWybrana(o.k);
                    zglosZdarzenie(`ankieta_${o.k}`);
                  }}
                >
                  {o.t}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
