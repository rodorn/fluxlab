"use client";

/**
 * Widelki wyceny do wyklikania, na /integracje-api i /automatyzacja-raportowania.
 *
 * Obie strony sprzedawaly prace bez podania jakiejkolwiek kwoty, z jedynym
 * wyjsciem w postaci formularza. Kupujacy, ktory chce tylko wiedziec, czy
 * rozmawiamy o tysiacu czy o dziesieciu, musial o to napisac i poczekac.
 *
 * Tutaj zaznacza, co u niego wystepuje, i od razu widzi rzad wielkosci.
 * Bez wpisywania i bez rejestracji. Zadna suma nie jest wpisana z reki:
 * kazda powstaje z pozycji wypisanych obok, z widelkami przy kazdej.
 */

import { useRef, useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";
import { odmien, zl, type PozycjaWyceny, type Wycena } from "@/lib/wycena";

const PRZYCISK =
  "rounded-full border px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-semibold transition-colors";
const NIEAKTYWNY =
  "border-gray-200/80 dark:border-gray-800/80 bg-white/60 dark:bg-gray-900/40 text-gray-700 dark:text-gray-300 hover:border-accent/50";
const AKTYWNY = "border-accent bg-accent-solid text-white";

function widelki(p: PozycjaWyceny): string {
  return p.min === p.max ? zl(p.min) : `${zl(p.min)} do ${zl(p.max)}`;
}

export default function ZakresWyceny({ wycena }: { wycena: Wycena }) {
  const [ile, setIle] = useState(wycena.warianty[0]);
  const [zaznaczone, setZaznaczone] = useState<Record<string, boolean>>({});
  const [opieka, setOpieka] = useState(false);
  const zgloszone = useRef(false);

  function policz() {
    if (zgloszone.current) return;
    zgloszone.current = true;
    zglosZdarzenie("policzono_zakres");
  }

  function wybierzIle(n: number) {
    setIle(n);
    policz();
  }

  function przelacz(p: PozycjaWyceny) {
    setZaznaczone((z) => ({ ...z, [p.id]: !z[p.id] }));
    policz();
  }

  const ponad = Math.max(0, ile - wycena.wliczone);
  const wybrane = wycena.dodatki.filter((d) => zaznaczone[d.id]);

  const min =
    wycena.baza.min +
    ponad * wycena.zaKazdy.min +
    wybrane.reduce((s, d) => s + d.min, 0);
  const max =
    wycena.baza.max +
    ponad * wycena.zaKazdy.max +
    wybrane.reduce((s, d) => s + d.max, 0);

  return (
    <div className="max-w-3xl">
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 w-full sm:w-auto sm:mr-1">
          {wycena.pytanie}
        </span>
        {wycena.warianty.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => wybierzIle(n)}
            aria-pressed={n === ile}
            className={`${PRZYCISK} ${n === ile ? AKTYWNY : NIEAKTYWNY}`}
          >
            {n} {odmien(n, wycena.jednostka)}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60 p-5 sm:p-6">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Zaznacz to, co u Ciebie występuje. Kwota przelicza się od razu.
        </p>

        <ul className="space-y-2">
          {/* Pozycja podstawowa jest zawsze wliczona, wiec nie udaje
              przycisku. Zostaje na liscie, bo bez niej suma bralaby sie
              znikad. */}
          <li className="rounded-lg border border-accent/30 bg-accent/5 dark:bg-accent/10 px-3 py-3">
            <div className="flex items-start gap-3">
              <span className="text-sm font-medium leading-snug grow text-gray-900 dark:text-white">
                {wycena.baza.co}
              </span>
              <span className="text-sm font-semibold tabular-nums whitespace-nowrap text-gray-900 dark:text-white">
                {widelki(wycena.baza)}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {wycena.baza.opis}
            </p>
          </li>

          {ponad > 0 && (
            <li className="rounded-lg border border-accent/30 bg-accent/5 dark:bg-accent/10 px-3 py-3">
              <div className="flex items-start gap-3">
                <span className="text-sm font-medium leading-snug grow text-gray-900 dark:text-white">
                  {wycena.zaKazdy.co}, razy {ponad}
                </span>
                <span className="text-sm font-semibold tabular-nums whitespace-nowrap text-gray-900 dark:text-white">
                  {ponad * wycena.zaKazdy.min === ponad * wycena.zaKazdy.max
                    ? zl(ponad * wycena.zaKazdy.min)
                    : `${zl(ponad * wycena.zaKazdy.min)} do ${zl(ponad * wycena.zaKazdy.max)}`}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {wycena.zaKazdy.opis} Stawka za sztukę:{" "}
                {widelki(wycena.zaKazdy)}.
              </p>
            </li>
          )}

          {wycena.dodatki.map((d) => {
            const wl = !!zaznaczone[d.id];
            return (
              <li key={d.id}>
                <button
                  type="button"
                  onClick={() => przelacz(d)}
                  aria-pressed={wl}
                  className={`w-full text-left rounded-lg border px-3 py-3 transition-colors ${
                    wl
                      ? "border-accent/30 bg-accent/5 dark:bg-accent/10"
                      : "border-dashed border-gray-200 dark:border-gray-700 bg-transparent hover:border-accent/50"
                  }`}
                >
                  <span className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center text-[10px] font-bold ${
                        wl
                          ? "border-accent bg-accent-solid text-white"
                          : "border-gray-300 dark:border-gray-600 text-transparent"
                      }`}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span
                      className={`text-sm font-medium leading-snug grow ${
                        wl
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {d.co}
                    </span>
                    <span
                      className={`text-sm font-semibold tabular-nums whitespace-nowrap ${
                        wl
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {widelki(d)}
                    </span>
                  </span>
                  <span className="mt-1 block pl-7 text-sm text-gray-600 dark:text-gray-400">
                    {d.opis}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <p
          aria-live="polite"
          className="mt-5 pt-5 border-t border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
        >
          Zakres dla tego, co zaznaczone:{" "}
          <strong className="text-lg text-gray-900 dark:text-white tabular-nums">
            {zl(min)} do {zl(max)}
          </strong>
          <span className="block text-sm text-gray-500 dark:text-gray-400">
            Płatne raz, po odbiorze. Nie ma tu abonamentu ani opłaty za dostęp
            do czegokolwiek.
          </span>
        </p>

        {/* Opieka stoi osobno, bo to koszt cykliczny. Doliczona do sumy
            jednorazowej mowilaby, ze wdrozenie kosztuje wiecej, niz kosztuje. */}
        <button
          type="button"
          onClick={() => {
            setOpieka((o) => !o);
            policz();
          }}
          aria-pressed={opieka}
          className="mt-4 text-sm font-semibold text-accent underline underline-offset-4"
        >
          {opieka ? "Ukryj opiekę po wdrożeniu" : "A co z opieką po wdrożeniu?"}
        </button>
        {opieka && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong className="text-gray-900 dark:text-white">
              {widelki(wycena.opieka)} miesięcznie
            </strong>
            , osobno od kwoty wyżej. {wycena.opieka.opis}
          </p>
        )}
      </div>

      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        {wycena.skad}
      </p>
    </div>
  );
}
