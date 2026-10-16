"use client";

/**
 * Rzad przyciskow z gotowymi przykladami nad formularzem narzedzia.
 *
 * Powstal z pomiaru: ludzie otwieraja strony narzedzi i nie naciskaja
 * przyciskow. Pusty formularz wymaga, zeby odwiedzajacy sam wymyslil, co
 * wpisac, i zaufal, ze cos z tego wyjdzie, zanim cokolwiek zobaczy. Jedno
 * klikniecie w gotowy przyklad odwraca ta kolejnosc: najpierw wynik, potem
 * decyzja, czy sprawdzic wlasna firme.
 *
 * Etykiety sa celowo suche, sama nazwa domeny albo numeru. Wynik jest tym,
 * co zwroci sprawdzenie na zywo, a nie tym, co obiecalismy na przycisku.
 */

export type Przyklad = {
  /** Wartosc podstawiana do formularza i wysylana do sprawdzenia. */
  wartosc: string;
  /** Napis na przycisku. Domyslnie to samo, co wartosc. */
  etykieta?: string;
};

export default function Przyklady({
  pozycje,
  onWybor,
  zablokowane = false,
  wstep = "Nie masz pod ręką swoich danych? Zobacz na gotowym przykładzie:",
}: {
  pozycje: Przyklad[];
  onWybor: (wartosc: string) => void;
  zablokowane?: boolean;
  wstep?: string;
}) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <span className="text-xs text-gray-600 dark:text-gray-400">{wstep}</span>
      {pozycje.map((p) => (
        <button
          key={p.wartosc}
          type="button"
          onClick={() => onWybor(p.wartosc)}
          disabled={zablokowane}
          className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 transition-colors hover:border-accent hover:text-accent disabled:opacity-50 dark:border-gray-700 dark:text-gray-300"
        >
          {p.etykieta ?? p.wartosc}
        </button>
      ))}
    </div>
  );
}
