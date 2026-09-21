"use client";

import { useEffect, useState } from "react";

const KLUCZ = "fl_nie_licz";

/**
 * Przełącznik wyłączający licznik odwiedzin dla tej przeglądarki.
 *
 * Powód: właściciel strony i osoba, która ją rozwija, odwiedzają ją
 * najczęściej ze wszystkich, a ich wejścia wyglądają w statystykach tak samo
 * jak cudze. Przy kilkudziesięciu odsłonach na dobę to nie jest szum, tylko
 * większość wyniku. Ustawienie zostaje w tej przeglądarce i nie wychodzi
 * poza nią.
 */
export default function WylaczLicznik() {
  const [wylaczony, setWylaczony] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      setWylaczony(localStorage.getItem(KLUCZ) === "1");
    } catch {
      setWylaczony(false);
    }
  }, []);

  function przelacz() {
    try {
      const nowy = !wylaczony;
      if (nowy) localStorage.setItem(KLUCZ, "1");
      else localStorage.removeItem(KLUCZ);
      setWylaczony(nowy);
    } catch {
      /* zablokowana pamięć przeglądarki: nie ma czego ustawić */
    }
  }

  if (wylaczony === null) {
    return (
      <div className="h-32 rounded-2xl border border-gray-200 dark:border-gray-800" />
    );
  }

  return (
    <div
      className={`rounded-2xl border p-6 md:p-8 transition-colors ${
        wylaczony
          ? "border-emerald-500/60 bg-emerald-50 dark:bg-emerald-950/30"
          : "border-gray-200/80 bg-white/70 dark:border-gray-800/80 dark:bg-gray-900/50"
      }`}
    >
      <p className="text-lg font-bold text-gray-900 dark:text-white">
        {wylaczony
          ? "Twoje wizyty nie są liczone"
          : "Twoje wizyty są liczone jak wszystkie inne"}
      </p>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {wylaczony
          ? "Ta przeglądarka nie wysyła już nic do licznika. Ustawienie siedzi wyłącznie tutaj, więc na innym urządzeniu albo w trybie prywatnym trzeba je włączyć osobno."
          : "Jeżeli to Twoja strona albo pracujesz nad nią, wyłącz liczenie. Inaczej własne wejścia zawyżą statystyki i będą wyglądać jak ruch z zewnątrz."}
      </p>
      <button
        type="button"
        onClick={przelacz}
        className={
          wylaczony
            ? "mt-5 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:border-accent dark:border-gray-700 dark:text-white"
            : "btn-primary mt-5 px-5 py-2.5 text-sm"
        }
      >
        {wylaczony ? "Włącz liczenie z powrotem" : "Nie licz moich wizyt"}
      </button>
      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        Licznik i tak nie zapisuje adresu IP ani niczego, co pozwala wskazać
        osobę. Zapisuje adres podstrony, rodzinę przeglądarki i systemu oraz
        losowy numer sesji, który ginie po zamknięciu karty.
      </p>
    </div>
  );
}
