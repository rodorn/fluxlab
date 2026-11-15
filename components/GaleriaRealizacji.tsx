"use client";

import { useState } from "react";
import Image from "next/image";

type Widok = "komputer" | "telefon";

const PRACE = [
  {
    id: "ug",
    nazwa: "Ustawy Gospodarcze",
    rodzaj: "Serwis z treściami",
    adres: "ustawygospodarcze.pl",
    link: "https://ustawygospodarcze.pl/",
    opis: "Zmiany w prawie gospodarczym z datą, od której obowiązują, i odnośnikiem do Dziennika Ustaw, poradniki i terminarz dla przedsiębiorców.",
  },
  {
    id: "ugk",
    nazwa: "Kalkulatory podatków i ZUS",
    rodzaj: "Narzędzia online",
    adres: "ustawygospodarcze.pl/kalkulatory",
    link: "https://ustawygospodarcze.pl/kalkulatory",
    opis: "20 kalkulatorów: wynagrodzenie brutto netto, PIT, ZUS, VAT, ryczałt i inne. Wynik liczy się od razu, z odwołaniem do przepisów.",
  },
  {
    id: "ksefdoc",
    nazwa: "FluxKSeF",
    rodzaj: "API dla firm i biur rachunkowych",
    adres: "ksef.fluxlab.pl/docs",
    link: "https://ksef.fluxlab.pl/docs",
    opis: "Wystawianie, pobieranie i akceptacja faktur w KSeF 2.0 przez API. Dokumentacja jest publiczna, w standardzie OpenAPI.",
  },
  {
    id: "czat",
    nazwa: "Czat AI na stronę",
    rodzaj: "Produkt do kupienia online",
    adres: "fluxlab.pl/czat-ai-na-strone",
    link: "/czat-ai-na-strone",
    opis: "Czat odpowiada klientom tylko na podstawie informacji wklejonych w panelu. Można go wypróbować na stronie produktu.",
  },
];

function Przelacznik({
  widok,
  ustaw,
}: {
  widok: Widok;
  ustaw: (w: Widok) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Widok"
      className="inline-flex rounded-full border border-gray-200 bg-white p-1 text-sm font-medium dark:border-white/10 dark:bg-gray-900"
    >
      {(["komputer", "telefon"] as const).map((w) => (
        <button
          key={w}
          type="button"
          aria-pressed={widok === w}
          onClick={() => ustaw(w)}
          className={`rounded-full px-4 py-1.5 transition-colors ${
            widok === w
              ? "bg-accent-solid text-white"
              : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          }`}
        >
          {w === "komputer" ? "Komputer" : "Telefon"}
        </button>
      ))}
    </div>
  );
}

export default function GaleriaRealizacji() {
  const [aktywna, setAktywna] = useState(0);
  const [widok, setWidok] = useState<Widok>("komputer");
  const p = PRACE[aktywna];
  const zewn = p.link.startsWith("http");

  return (
    <section aria-labelledby="galeria-tytul" className="mt-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="galeria-tytul" className="h2-sekcji">
          Nasze produkty, działające na produkcji
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Zrzuty z działających stron. Każdą możesz otworzyć i sprawdzić sam.
        </p>
      </div>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
        <div
          role="tablist"
          aria-label="Realizacje"
          className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {PRACE.map((x, i) => (
            <button
              key={x.id}
              type="button"
              role="tab"
              id={`galeria-tab-${x.id}`}
              aria-selected={i === aktywna}
              aria-controls="galeria-panel"
              onClick={() => setAktywna(i)}
              className={`w-60 shrink-0 snap-start rounded-xl border p-4 text-left transition-colors lg:w-auto ${
                i === aktywna
                  ? "border-accent bg-accent/5 dark:bg-accent/10"
                  : "border-gray-200 bg-white hover:border-gray-300 dark:border-white/10 dark:bg-gray-900 dark:hover:border-white/20"
              }`}
            >
              <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                {x.rodzaj}
              </span>
              <span className="mt-1 block font-semibold text-gray-900 dark:text-white">
                {x.nazwa}
              </span>
            </button>
          ))}
        </div>

        <div
          id="galeria-panel"
          role="tabpanel"
          aria-labelledby={`galeria-tab-${p.id}`}
          className="min-w-0"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Przelacznik widok={widok} ustaw={setWidok} />
            <a
              href={p.link}
              {...(zewn ? { target: "_blank", rel: "noopener" } : {})}
              className="text-sm font-semibold text-accent hover:underline"
            >
              Zobacz na żywo →
            </a>
          </div>

          <div className="mt-5 flex min-h-[20rem] items-start justify-center rounded-2xl bg-gray-50 p-4 sm:p-8 dark:bg-white/5">
            {widok === "komputer" ? (
              <div
                key={`${p.id}-k`}
                className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl motion-safe:animate-[czat-dymek_.35s_ease-out] dark:border-white/10 dark:bg-gray-900"
              >
                <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 py-2.5 dark:border-white/10 dark:bg-white/5">
                  <span aria-hidden="true" className="flex gap-1.5">
                    <i className="h-2 w-2 rounded-full bg-gray-300 dark:bg-white/20" />
                    <i className="h-2 w-2 rounded-full bg-gray-300 dark:bg-white/20" />
                    <i className="h-2 w-2 rounded-full bg-gray-300 dark:bg-white/20" />
                  </span>
                  <span className="truncate rounded-md bg-white px-3 py-1 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    {p.adres}
                  </span>
                </div>
                <Image
                  src={`/photos/galeria-${p.id}-komputer.webp`}
                  alt={`${p.nazwa}: widok na komputerze`}
                  width={1200}
                  height={750}
                  sizes="(min-width: 1024px) 760px, 100vw"
                  className="block h-auto w-full"
                />
              </div>
            ) : (
              <div
                key={`${p.id}-t`}
                className="w-56 overflow-hidden rounded-3xl border-[7px] border-gray-900 bg-white shadow-xl motion-safe:animate-[czat-dymek_.35s_ease-out] sm:w-64 dark:border-gray-700"
              >
                <Image
                  src={`/photos/galeria-${p.id}-telefon.webp`}
                  alt={`${p.nazwa}: widok na telefonie`}
                  width={600}
                  height={1298}
                  sizes="256px"
                  className="block h-auto w-full"
                />
              </div>
            )}
          </div>

          <p className="mt-5 text-base text-gray-600 dark:text-gray-300">
            {p.opis}
          </p>
        </div>
      </div>
    </section>
  );
}
