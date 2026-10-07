"use client";

/**
 * Rachunek czasu, ktory zespol sprzedazy spedza na obsludze CRM zamiast na
 * sprzedazy, na stronie /crm-jako-system-pracy.
 *
 * Wczesniej w tym miejscu staly liczby podane jak fakt ("75 godzin
 * miesiecznie", "4-6 godzin tygodniowo") i obietnica zwrotu w 2-3 miesiace,
 * bez zadnego pokrycia. Teraz czytelnik wybiera uklad najblizszy swojemu
 * zespolowi i widzi rachunek z wypisanymi wszystkimi zalozeniami.
 */

import { useRef, useState } from "react";
import { event as gaEvent } from "@/lib/gtag";
import { zglosZdarzenie } from "@/lib/zdarzenie";

const DNI_ROBOCZE = 20;
const TYGODNIE = 4.33;

const UKLADY = [
  {
    etykieta: "3 handlowców",
    opis: "po 20 min dziennie w CRM, manager 2 h w tygodniu na raport",
    handlowcy: 3,
    minutDziennie: 20,
    godzinManagera: 2,
    stawka: 70,
  },
  {
    etykieta: "5 handlowców",
    opis: "po 45 min dziennie w CRM, manager 5 h w tygodniu na raport",
    handlowcy: 5,
    minutDziennie: 45,
    godzinManagera: 5,
    stawka: 80,
  },
  {
    etykieta: "10 handlowców",
    opis: "po 30 min dziennie w CRM, manager 8 h w tygodniu na raport",
    handlowcy: 10,
    minutDziennie: 30,
    godzinManagera: 8,
    stawka: 90,
  },
];

const zl = (n: number) => `${Math.round(n).toLocaleString("pl-PL")} zł`;
const h = (n: number) => `${Math.round(n).toLocaleString("pl-PL")} h`;

export default function KosztAdministracjiCrm() {
  const [wybrany, setWybrany] = useState<string | null>(null);
  const zgloszono = useRef(false);

  const u = UKLADY.find((x) => x.etykieta === wybrany);
  const godzinZespolu = u
    ? (u.handlowcy * u.minutDziennie * DNI_ROBOCZE) / 60
    : 0;
  const godzinManagera = u ? u.godzinManagera * TYGODNIE : 0;
  const koszt = u ? (godzinZespolu + godzinManagera) * u.stawka : 0;

  const wybierz = (etykieta: string) => {
    setWybrany(etykieta);
    if (zgloszono.current) return;
    zgloszono.current = true;
    gaEvent("calculator_submit", {
      calculator: "crm_admin_cost",
      uklad: etykieta,
    });
    zglosZdarzenie("uruchomiono_kalkulator");
  };

  return (
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Wybierz zespół najbliższy Waszemu. Rachunek policzy się od razu, bez
        wpisywania czegokolwiek.
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
                  Handlowcy w CRM
                </p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900 dark:text-white">
                  {h(godzinZespolu)}
                </p>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                  miesięcznie, cały zespół
                </p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-gray-600 dark:text-gray-300">
                  Manager na raporcie
                </p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900 dark:text-white">
                  {h(godzinManagera)}
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
              Policzone z: {u.handlowcy} handlowców × {u.minutDziennie} min ×{" "}
              {DNI_ROBOCZE} dni roboczych, plus {u.godzinManagera} h managera ×{" "}
              {TYGODNIE.toLocaleString("pl-PL")} tygodnia, razy koszt godziny pracodawcy {u.stawka} zł.
              To przykładowe założenia, nie pomiar w żadnej firmie. Nie cały ten
              czas da się odzyskać, część obsługi CRM jest potrzebna. Rachunek
              pokazuje skalę, od której warto zacząć rozmowę.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
