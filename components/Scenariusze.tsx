"use client";

/**
 * Rzad gotowych ukladow danych nad kalkulatorem.
 *
 * Odpowiednik komponentu Przyklady, tyle ze kalkulator nie ma jednego pola
 * do podstawienia, tylko caly komplet. Powod jest ten sam: pomiar pokazal,
 * ze ludzie otwieraja strony narzedzi i nie naciskaja przyciskow. Kalkulator
 * startuje z wartosciami domyslnymi, wiec wyglada, jakby juz byl wypelniony,
 * i nie widac, ze cokolwiek da sie tu zmienic ani co zmiana da.
 *
 * Jedno klikniecie podstawia komplet danych i pokazuje gotowy wynik. Dopiero
 * wtedy jest z czym porownac wlasna sytuacje.
 *
 * Opisy sa suche i mowia, co jest w srodku, a nie co z tego wyjdzie. Wynik
 * liczy sie na zywo z podstawionych liczb, nie jest tu zapisany.
 */

export type Scenariusz<T> = {
  /** Napis na przycisku. */
  etykieta: string;
  /** Jedno zdanie o tym, co przycisk podstawia. */
  opis: string;
  /** Komplet danych wstawianych do kalkulatora. */
  dane: T;
};

export default function Scenariusze<T>({
  pozycje,
  onWybor,
  wybrany,
  wstep = "Nie chcesz wypełniać pól? Zacznij od gotowego układu:",
}: {
  pozycje: Scenariusz<T>[];
  onWybor: (dane: T, etykieta: string) => void;
  /** Etykieta scenariusza, ktory jest teraz podstawiony. */
  wybrany?: string | null;
  wstep?: string;
}) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-600 dark:text-gray-400">{wstep}</p>
      <div className="grid gap-2 sm:grid-cols-3">
        {pozycje.map((p) => {
          const aktywny = wybrany === p.etykieta;
          return (
            <button
              key={p.etykieta}
              type="button"
              onClick={() => onWybor(p.dane, p.etykieta)}
              aria-pressed={aktywny}
              className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                aktywny
                  ? "border-accent bg-accent/5"
                  : "border-gray-200 hover:border-accent dark:border-gray-700"
              }`}
            >
              <span
                className={`block text-sm font-semibold ${
                  aktywny ? "text-accent" : "text-gray-900 dark:text-white"
                }`}
              >
                {p.etykieta}
              </span>
              <span className="mt-1 block text-xs text-gray-600 dark:text-gray-400">
                {p.opis}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
