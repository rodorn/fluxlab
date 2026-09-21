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
  PRICE_BAND_INTRO,
  PRICE_BAND_LABEL,
  PRICE_BAND_ORDER,
  PRODUCTS,
  pasmoCeny,
  type PriceBand,
  type ProductCategory,
  type ProductGroup,
} from "@/lib/products";
import { zglosZdarzenie } from "@/lib/zdarzenie";

// Na telefonie etykiety sa za dlugie, zeby zmiescic dwa przyciski w
// wierszu, wiec pasek rosnie w dol. Mniejsza czcionka i odstep skracaja go
// o okolo jedna trzecia, reszte zalatwia drugi poziom chowany do czasu
// wybrania obszaru.
const PRZYCISK =
  "rounded-full border px-2.5 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-semibold transition-colors";
const NIEAKTYWNY =
  "border-gray-200/80 dark:border-gray-800/80 bg-white/60 dark:bg-gray-900/40 text-gray-700 dark:text-gray-300 hover:border-accent/50";
const AKTYWNY = "border-accent bg-accent text-white";

type Wybor = {
  filar: ProductCategory | null;
  grupa: ProductGroup | null;
  pasmo: PriceBand | null;
  tylkoDarmowe: boolean;
};

const PUSTY: Wybor = { filar: null, grupa: null, pasmo: null, tylkoDarmowe: false };

const pasujace = (w: Wybor) =>
  PRODUCTS.filter(
    (p) =>
      (!w.filar || p.category === w.filar) &&
      (!w.grupa || p.grupa === w.grupa) &&
      (!w.pasmo || pasmoCeny(p.price) === w.pasmo) &&
      (!w.tylkoDarmowe || p.narzedzie),
  );

/**
 * Filtry przecinaja sie i nie kazde ich polaczenie ma pokrycie w katalogu:
 * w filarze automatyzacji nie ma nic powyzej tysiaca zlotych, w budowie
 * stron nie ma darmowego sprawdzenia. Zamiast pokazywac zero pozycji, co
 * wyglada jak zepsuta strona, zdejmujemy wczesniej wybrane zawezenia,
 * zaczynajac od najwezszego.
 *
 * `swieze` to pola wlasnie nacisniete. Ich sie nie zdejmuje, bo odwiedzajacy
 * zobaczylby, ze przycisk, ktory wcisnal, nic nie robi.
 */
function pogodz(w: Wybor, swieze: (keyof Wybor)[] = []): Wybor {
  for (const pole of ["grupa", "pasmo"] as const) {
    if (pasujace(w).length > 0) return w;
    if (!swieze.includes(pole)) w = { ...w, [pole]: null };
  }
  return w;
}

export default function KatalogProduktow() {
  const [wybor, setWybor] = useState<Wybor>(PUSTY);
  const { filar, grupa, pasmo, tylkoDarmowe } = wybor;
  // Zdarzenie liczymy raz na sesje: interesuje nas, ilu odwiedzajacych w
  // ogole uzylo filtra, a nie ile razy przelaczyli. Przedzial ceny ma wlasne
  // zdarzenie, bo to osobne pytanie: czy ludzie wybieraja po rodzaju pracy,
  // czy po tym, ile moga wydac.
  const zgloszone = useRef(false);
  const zgloszonaCena = useRef(false);

  function zmien(zmiana: Partial<Wybor>) {
    if (!zgloszone.current) {
      zgloszone.current = true;
      zglosZdarzenie("zawezono_katalog");
    }
    setWybor((obecny) => pogodz({ ...obecny, ...zmiana }, Object.keys(zmiana) as (keyof Wybor)[]));
  }

  // Grupa nalezy do jednego filaru i jej przyciski znikaja razem z nim, wiec
  // zostawiona w pamieci filtrowalaby liste bez widocznej przyczyny.
  const poFilarze = (f: ProductCategory | null): Partial<Wybor> => ({
    filar: f,
    grupa:
      f && grupa && PRODUCTS.some((p) => p.category === f && p.grupa === grupa)
        ? grupa
        : null,
  });

  function wybierzFilar(f: ProductCategory | null) {
    zmien(poFilarze(f));
  }

  function wybierzGrupe(g: ProductGroup) {
    zmien({ grupa: grupa === g ? null : g });
  }

  function wybierzPasmo(b: PriceBand) {
    if (!zgloszonaCena.current) {
      zgloszonaCena.current = true;
      zglosZdarzenie("zawezono_cene");
    }
    zmien({ pasmo: pasmo === b ? null : b });
  }

  function przelaczDarmowe() {
    zmien({ tylkoDarmowe: !tylkoDarmowe });
  }

  // Liczba na przycisku mowi, ile pozycji zostanie po jego nacisnieciu, wiec
  // liczy sie ja przy pozostalych wlaczonych filtrach. Bez uzgadniania: gdyby
  // liczyc po zdjeciu przedzialu ceny, obszar bez pozycji w tym przedziale
  // pokazywalby pelny stan i przeczyl wcisnietemu obok przyciskowi.
  const ilePo = (zmiana: Partial<Wybor>) => pasujace({ ...wybor, ...zmiana }).length;

  const pasuje = pasujace(wybor);

  const grupyWFilarze = GROUP_ORDER.filter(
    (g) => pasujace({ ...wybor, grupa: g }).length > 0,
  );

  const opis = grupa
    ? GROUP_INTRO[grupa]
    : filar
      ? CATEGORY_INTRO[filar]
      : pasmo
        ? PRICE_BAND_INTRO[pasmo]
        : "Cały katalog, podzielony na trzy obszary pracy. Zawęź go jednym naciśnięciem.";

  const czysto = !filar && !grupa && !tylkoDarmowe && !pasmo;

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
            Wszystko ({ilePo(poFilarze(null))})
          </button>
          {CATEGORY_ORDER.map((f) => {
            const ile = ilePo(poFilarze(f));
            return (
              <button
                key={f}
                type="button"
                onClick={() => wybierzFilar(f)}
                // Obszar, w ktorym przy obecnym przedziale ceny nie ma ani
                // jednej pozycji, zostaje widoczny, ale nie do nacisniecia.
                // Zniknieciem obszaru z paska katalog traci swoj podzial.
                disabled={ile === 0}
                aria-pressed={filar === f}
                className={`${PRZYCISK} ${filar === f ? AKTYWNY : NIEAKTYWNY} ${
                  ile === 0 ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                {CATEGORY_LABEL[f]} ({ile})
              </button>
            );
          })}
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
              {GROUP_LABEL[g]} ({ilePo({ grupa: g })})
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

        {/* Trzeci sposob zawezenia: ile to kosztuje na wejsciu. Przedzial
            bierze sie z tej samej ceny, ktora widnieje na kafelku, wiec nie
            da sie go rozjechac z katalogiem. Przedzialy bez ani jednej
            pozycji przy obecnych filtrach chowamy, zeby nie zostawiac
            przyciskow prowadzacych do pustki. */}
        <p className="mt-5 text-sm font-semibold text-gray-900 dark:text-white">
          Ile kosztuje wejście?
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
          {PRICE_BAND_ORDER.filter((b) => ilePo({ pasmo: b }) > 0 || pasmo === b).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => wybierzPasmo(b)}
              aria-pressed={pasmo === b}
              className={`${PRZYCISK} ${pasmo === b ? AKTYWNY : NIEAKTYWNY}`}
            >
              {PRICE_BAND_LABEL[b]} ({ilePo({ pasmo: b })})
            </button>
          ))}
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
            onClick={() => setWybor(PUSTY)}
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
