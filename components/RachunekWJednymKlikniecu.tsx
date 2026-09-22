"use client";

/**
 * Skrocony rachunek kosztu recznej obslugi zapytan, na stronie glownej.
 *
 * Powod jest w pomiarze: strona glowna to 20 z 50 odslon na dobe, a
 * uruchomien narzedzi jest zero. Kazda droga do wyniku prowadzila dotad
 * przez przejscie na inna strone i dopiero tam nacisniecie czegos. Ten blok
 * daje wynik na miejscu, po jednym kliknieciu, bez wpisywania i bez
 * rejestracji, i dopiero pod wynikiem proponuje pelny kalkulator.
 *
 * Liczby i wzor sa te same, co w pelnym kalkulatorze, bo oba biora je z
 * lib/koszt-leadow.ts. Zadna kwota nie jest tu zapisana na sztywno.
 */

import { useRef, useState } from "react";
import Link from "next/link";
import { event as gaEvent } from "@/lib/gtag";
import { zglosZdarzenie } from "@/lib/zdarzenie";
import {
  SCENARIUSZE_LEADOW,
  policzKosztLeadow,
  type DaneLeadow,
} from "@/lib/koszt-leadow";

const zl = (n: number) =>
  `${Math.round(n).toLocaleString("pl-PL")} zł`;

export default function RachunekWJednymKlikniecu() {
  const [wybrany, setWybrany] = useState<string | null>(null);
  const zgloszono = useRef(false);

  const pozycja = SCENARIUSZE_LEADOW.find((s) => s.etykieta === wybrany);
  const wynik = pozycja ? policzKosztLeadow(pozycja.dane) : null;

  const wybierz = (etykieta: string, dane: DaneLeadow) => {
    setWybrany(etykieta);
    // Zdarzenie leci raz na sesje. Przeklikiwanie trzech ukladek to nadal
    // jedno uruchomienie narzedzia, a nie trzy.
    if (zgloszono.current) return;
    zgloszono.current = true;
    gaEvent("calculator_submit", {
      calculator: "leads_cost_home",
      scenariusz: etykieta,
      leady_mies: dane.leadyMies,
    });
    zglosZdarzenie("uruchomiono_skan");
  };

  return (
    <section className="relative z-20 px-6 lg:px-10 py-12 lg:py-16 border-t border-gray-200 dark:border-white/10">
      <h2 className="text-xl lg:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white/90">
        Ile kosztuje ręczna obsługa zapytań
      </h2>
      <p className="mt-2 max-w-3xl text-sm text-gray-600 dark:text-white/60">
        Wybierz firmę najbliższą Waszej. Rachunek policzy się tutaj, od razu,
        bez wpisywania czegokolwiek i bez podawania adresu.
      </p>

      <div className="mt-6 grid max-w-3xl gap-2 sm:grid-cols-3">
        {SCENARIUSZE_LEADOW.map((s) => {
          const aktywny = wybrany === s.etykieta;
          return (
            <button
              key={s.etykieta}
              type="button"
              onClick={() => wybierz(s.etykieta, s.dane)}
              aria-pressed={aktywny}
              className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                aktywny
                  ? "border-accent bg-accent/5"
                  : "border-gray-200 hover:border-accent dark:border-white/10 dark:hover:border-accent"
              }`}
            >
              <span
                className={`block text-sm font-semibold ${
                  aktywny
                    ? "text-accent"
                    : "text-gray-900 dark:text-white/90"
                }`}
              >
                {s.etykieta}
              </span>
              <span className="mt-1 block text-xs leading-snug text-gray-600 dark:text-white/55">
                {s.opis}
              </span>
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="max-w-3xl">
        {!wynik || !pozycja ? (
          <p className="mt-5 text-xs text-gray-500 dark:text-white/55">
            Naciśnij jedną z trzech, żeby zobaczyć kwotę.
          </p>
        ) : (
          <div className="mt-5 rounded-2xl border border-accent/30 bg-accent-light dark:bg-accent-dark-light p-6">
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-gray-600 dark:text-gray-300">
                  Ręczna praca
                </p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900 dark:text-white">
                  {zl(wynik.kosztRecznejPracy)}
                </p>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                  miesięcznie, sam czas na przepisywanie
                </p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-gray-600 dark:text-gray-300">
                  Zapytania spóźnione
                </p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900 dark:text-white">
                  {zl(wynik.kosztZgubionychMies)}
                </p>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                  miesięcznie, wartość szans, które przepadają
                </p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-accent">
                  Razem w roku
                </p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-accent">
                  {zl(wynik.kosztRoczny)}
                </p>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                  suma obu pozycji razy dwanaście
                </p>
              </div>
            </div>

            {/* Kazda kwota wyzej ma tu wypisane wszystkie liczby, z ktorych
                powstala. Bez tego byloby to kolejne okragle haslo. */}
            <p className="mt-5 border-t border-accent/20 pt-4 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
              Policzone z: {pozycja.dane.leadyMies} zapytań miesięcznie,{" "}
              {pozycja.dane.czasMin} min na obsługę jednego, koszt godziny{" "}
              {pozycja.dane.kosztH} zł, {pozycja.dane.opoznione}% zapytań
              obsłużonych z opóźnieniem, konwersja {pozycja.dane.konwersja}%,
              wartość klienta {zl(pozycja.dane.wartoscKlienta)}. Zakładam, że z
              opóźnionych zapytań przepada 30%. To typowe rzędy wielkości dla
              tego rodzaju firm, a nie dane czyjejkolwiek firmy.
            </p>

            <Link
              href="/koszt-recznej-obslugi-leadow"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
            >
              Podstaw swoje liczby w pełnym kalkulatorze
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
