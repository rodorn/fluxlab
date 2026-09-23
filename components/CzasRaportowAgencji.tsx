"use client";

/**
 * Rachunek czasu, ktory agencja spedza na recznym skladaniu raportow dla
 * klientow, na stronie /automatyzacja-dla-agencji-marketingowych.
 *
 * Wczesniej strona podawala jak fakt, ze agencja "traci kilkanascie godzin
 * tygodniowo" i ze reczne mikroprocesy daja "etat lub dwa rocznie", bez
 * zadnego pokrycia. Teraz czytelnik wybiera uklad najblizszy swojej agencji
 * i widzi rachunek z wypisanymi wszystkimi zalozeniami.
 */

import { useRef, useState } from "react";
import { event as gaEvent } from "@/lib/gtag";
import { zglosZdarzenie } from "@/lib/zdarzenie";

const TYGODNIE = 4.33;

const UKLADY = [
  {
    etykieta: "8 klientów",
    opis: "raport raz w miesiącu, 90 min na jeden",
    klienci: 8,
    raportowMiesiecznie: 1,
    minutNaRaport: 90,
    stawka: 70,
  },
  {
    etykieta: "15 klientów",
    opis: "raport co tydzień, 45 min na jeden",
    klienci: 15,
    raportowMiesiecznie: TYGODNIE,
    minutNaRaport: 45,
    stawka: 80,
  },
  {
    etykieta: "30 klientów",
    opis: "raport co tydzień, 30 min na jeden",
    klienci: 30,
    raportowMiesiecznie: TYGODNIE,
    minutNaRaport: 30,
    stawka: 80,
  },
];

const zl = (n: number) => `${Math.round(n).toLocaleString("pl-PL")} zł`;
const h = (n: number) => `${Math.round(n).toLocaleString("pl-PL")} h`;

export default function CzasRaportowAgencji() {
  const [wybrany, setWybrany] = useState<string | null>(null);
  const zgloszono = useRef(false);

  const u = UKLADY.find((x) => x.etykieta === wybrany);
  const raportow = u ? u.klienci * u.raportowMiesiecznie : 0;
  const godzin = u ? (raportow * u.minutNaRaport) / 60 : 0;
  const koszt = u ? godzin * u.stawka : 0;

  const wybierz = (etykieta: string) => {
    setWybrany(etykieta);
    if (zgloszono.current) return;
    zgloszono.current = true;
    gaEvent("calculator_submit", {
      calculator: "agency_report_time",
      uklad: etykieta,
    });
    zglosZdarzenie("uruchomiono_kalkulator");
  };

  return (
    <div className="mb-10">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Ile czasu idzie na same raporty? Wybierz agencję najbliższą Waszej.
        Rachunek policzy się od razu, bez wpisywania czegokolwiek.
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {UKLADY.map((x) => {
          const aktywny = wybrany === x.etykieta;
          return (
            <button
              key={x.etykieta}
              type="button"
              onClick={() => wybierz(x.etykieta)}
              aria-pressed={aktywny}
              className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                aktywny
                  ? "border-accent bg-accent/5"
                  : "border-gray-200 hover:border-accent dark:border-white/10 dark:hover:border-accent"
              }`}
            >
              <span
                className={`block text-sm font-semibold ${
                  aktywny ? "text-accent" : "text-gray-900 dark:text-white/90"
                }`}
              >
                {x.etykieta}
              </span>
              <span className="mt-1 block text-xs leading-snug text-gray-600 dark:text-white/55">
                {x.opis}
              </span>
            </button>
          );
        })}
      </div>

      <div aria-live="polite">
        {!u ? (
          <p className="mt-4 text-xs text-gray-600 dark:text-gray-400">
            Naciśnij jeden z trzech, żeby zobaczyć rachunek.
          </p>
        ) : (
          <div className="mt-4 rounded-2xl border border-accent/30 bg-accent-light dark:bg-accent-dark-light p-6">
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-gray-600 dark:text-gray-300">
                  Raportów w miesiącu
                </p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900 dark:text-white">
                  {Math.round(raportow).toLocaleString("pl-PL")}
                </p>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                  dla wszystkich klientów
                </p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-gray-600 dark:text-gray-300">
                  Czas na składanie
                </p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900 dark:text-white">
                  {h(godzin)}
                </p>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                  miesięcznie
                </p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-accent">
                  Koszt czasu
                </p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-accent">
                  {zl(koszt)}
                </p>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                  miesięcznie, przy {u.stawka} zł za godzinę
                </p>
              </div>
            </div>
            <p className="mt-5 border-t border-accent/20 pt-4 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
              Policzone z: {u.klienci} klientów ×{" "}
              {u.raportowMiesiecznie === 1
                ? "1 raport"
                : `${TYGODNIE.toLocaleString("pl-PL")} raportu`}{" "}
              w miesiącu × {u.minutNaRaport} min, razy koszt godziny
              pracodawcy {u.stawka} zł. To przykładowe założenia, nie pomiar w
              żadnej agencji. Nawet przy automatycznym raporcie ktoś go czyta i
              dopisuje komentarz, więc nie cały ten czas znika. Rachunek
              pokazuje skalę, od której warto zacząć rozmowę.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
