"use client";

/**
 * Filtrowany katalog na /produkty.
 *
 * Trzydziesci trzy pozycje w trzech siatkach to sciana, przez ktora trzeba
 * przewinac cala strone, zeby sprawdzic, czy jest w niej cokolwiek dla
 * mnie. Podzial na filary i grupy juz byl, ale dzialal wylacznie jako
 * naglowek, nie dalo sie nim niczego odsiac.
 *
 * Tutaj jedno nacisniecie zawezza liste i od razu pokazuje, ile pozycji
 * zostalo. Bez wpisywania i bez rejestracji. Stan poczatkowy pokazuje
 * komplet, wiec caly katalog jest w zrodle strony tak samo jak wczesniej.
 */

import { useRef, useState } from "react";
import ProductCard from "@/components/ProductCard";
import {
  CATEGORY_INTRO,
  CATEGORY_LABEL,
  CATEGORY_ORDER,
  GROUP_INTRO,
  GROUP_LABEL,
  GROUP_ORDER,
  PRODUCTS,
  type ProductCategory,
  type ProductGroup,
} from "@/lib/products";
import { zglosZdarzenie } from "@/lib/zdarzenie";

// Na telefonie kazdy przycisk lapal wlasny wiersz i pasek rosl na siedem
// linii, czyli caly katalog uciekal pod krawedz ekranu. Mniejszy odstep i
// czcionka mieszcza po dwa w wierszu.
const PRZYCISK =
  "rounded-full border px-2.5 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-semibold transition-colors";
const NIEAKTYWNY =
  "border-gray-200/80 dark:border-gray-800/80 bg-white/60 dark:bg-gray-900/40 text-gray-700 dark:text-gray-300 hover:border-accent/50";
const AKTYWNY = "border-accent bg-accent text-white";

export default function KatalogProduktow() {
  const [filar, setFilar] = useState<ProductCategory | null>(null);
  const [grupa, setGrupa] = useState<ProductGroup | null>(null);
  const [tylkoDarmowe, setTylkoDarmowe] = useState(false);
  // Zdarzenie liczymy raz na sesje: interesuje nas, ilu odwiedzajacych w
  // ogole uzylo filtra, a nie ile razy przelaczyli.
  const zgloszone = useRef(false);

  function zglos() {
    if (zgloszone.current) return;
    zgloszone.current = true;
    zglosZdarzenie("zawezono_katalog");
  }

  function wybierzFilar(f: ProductCategory | null) {
    zglos();
    setFilar(f);
    // Grupa nalezy do jednego filaru i jej przyciski znikaja razem z nim,
    // wiec zostawiona w pamieci filtrowalaby liste bez widocznej przyczyny.
    if (!f || (grupa && !PRODUCTS.some((p) => p.category === f && p.grupa === grupa))) {
      setGrupa(null);
    }
  }

  function wybierzGrupe(g: ProductGroup | null) {
    zglos();
    setGrupa((obecna) => (obecna === g ? null : g));
  }

  function przelaczDarmowe() {
    zglos();
    setTylkoDarmowe((wlaczone) => {
      // Sa grupy bez ani jednego darmowego sprawdzenia, na przyklad budowa
      // stron. Bez tego zdjecia grupy filtr pokazalby pustke.
      if (!wlaczone && grupa && !PRODUCTS.some((p) => p.grupa === grupa && p.narzedzie)) {
        setGrupa(null);
      }
      return !wlaczone;
    });
  }

  const ile = (warunek: (p: (typeof PRODUCTS)[number]) => boolean) =>
    PRODUCTS.filter((p) => warunek(p) && (!tylkoDarmowe || p.narzedzie)).length;

  const pasuje = PRODUCTS.filter(
    (p) =>
      (!filar || p.category === filar) &&
      (!grupa || p.grupa === grupa) &&
      (!tylkoDarmowe || p.narzedzie),
  );

  const grupyWFilarze = GROUP_ORDER.filter((g) =>
    PRODUCTS.some(
      (p) =>
        p.grupa === g &&
        (!filar || p.category === filar) &&
        (!tylkoDarmowe || p.narzedzie),
    ),
  );

  const opis = grupa
    ? GROUP_INTRO[grupa]
    : filar
      ? CATEGORY_INTRO[filar]
      : "Cały katalog, podzielony na trzy obszary pracy. Zawęź go jednym naciśnięciem.";

  const czysto = !filar && !grupa && !tylkoDarmowe;

  return (
    <div>
      <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-gray-50/60 dark:bg-gray-900/40 p-6">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          Czego szukasz?
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => wybierzFilar(null)}
            aria-pressed={filar === null}
            className={`${PRZYCISK} ${filar === null ? AKTYWNY : NIEAKTYWNY}`}
          >
            Wszystko ({ile(() => true)})
          </button>
          {CATEGORY_ORDER.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => wybierzFilar(f)}
              aria-pressed={filar === f}
              className={`${PRZYCISK} ${filar === f ? AKTYWNY : NIEAKTYWNY}`}
            >
              {CATEGORY_LABEL[f]} ({ile((p) => p.category === f)})
            </button>
          ))}
        </div>

        {/* Drugi poziom pokazujemy dopiero po wybraniu obszaru. Kazda grupa
            nalezy do jednego filaru, wiec przed wyborem obszaru byl to ten
            sam podzial powiedziany dwa razy, a na telefonie jedenascie
            przyciskow spychalo katalog pod krawedz ekranu. */}
        <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
          {filar && grupyWFilarze.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => wybierzGrupe(g)}
              aria-pressed={grupa === g}
              className={`${PRZYCISK} ${grupa === g ? AKTYWNY : NIEAKTYWNY}`}
            >
              {GROUP_LABEL[g]} (
              {ile((p) => p.grupa === g && (!filar || p.category === filar))})
            </button>
          ))}
          <button
            type="button"
            onClick={przelaczDarmowe}
            aria-pressed={tylkoDarmowe}
            className={`${PRZYCISK} ${tylkoDarmowe ? AKTYWNY : NIEAKTYWNY}`}
          >
            Z darmowym sprawdzeniem
          </button>
        </div>

        <p aria-live="polite" className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          <span className="font-semibold text-gray-900 dark:text-white">
            {pasuje.length} z {PRODUCTS.length} pozycji
          </span>
          . {opis}
        </p>

        {!czysto && (
          <button
            type="button"
            onClick={() => {
              setFilar(null);
              setGrupa(null);
              setTylkoDarmowe(false);
            }}
            className="mt-3 text-sm font-semibold text-accent underline underline-offset-4"
          >
            Pokaż wszystko
          </button>
        )}
      </div>

      <div className="mt-12 space-y-16">
        {CATEGORY_ORDER.filter((f) => pasuje.some((p) => p.category === f)).map(
          (f) => (
            <div key={f}>
              <div className="max-w-3xl">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {CATEGORY_LABEL[f]}
                </h2>
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                  {CATEGORY_INTRO[f]}
                </p>
              </div>
              {GROUP_ORDER.filter((g) =>
                pasuje.some((p) => p.category === f && p.grupa === g),
              ).map((g) => (
                <section key={g} className="mt-10">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {GROUP_LABEL[g]}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {GROUP_INTRO[g]}
                  </p>
                  <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {pasuje
                      .filter((p) => p.category === f && p.grupa === g)
                      .map((p) => (
                        <ProductCard key={p.name} p={p} />
                      ))}
                  </div>
                </section>
              ))}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
