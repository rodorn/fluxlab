"use client";

/**
 * Porownanie procesu przed automatyzacja i po niej, na /case-study.
 *
 * Strona pokazywala wczesniej trzy gotowe liczby na przepływ ("+18%",
 * "z 12 min do 0") i opisywala je jako syntezy wdrozen u klientow. Klientow
 * nie ma, wiec liczba brala sie znikad. Tutaj nie ma ani jednej liczby
 * wpisanej z reki: kazda suma powstaje z czynnosci wypisanych nizej, z
 * minutami przy kazdej z nich, i przelicza sie na oczach odwiedzajacego.
 *
 * Do kliknięcia: proces, skala miesieczna i to, ktore czynnosci ktos u
 * siebie w ogole wykonuje. Bez wpisywania i bez rejestracji.
 */

import { useMemo, useRef, useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";

type Krok = {
  /** Czynnosc, jedno zdanie w bezokoliczniku albo rzeczowniku. */
  co: string;
  /** Minuty pracy czlowieka na jedno przejscie procesu. */
  minuty: number;
};

type Proces = {
  id: string;
  nazwa: string;
  /** Rzecz, ktora proces obsluguje, w czterech potrzebnych formach. */
  jednostka: {
    /** "lead", po "na jeden ...". */
    poj: string;
    /** "leady", przy 2, 3, 4. */
    mn: string;
    /** "leadow", przy pozostalych liczbach. */
    dop: string;
    /** "leadach", po "przy ...". */
    msc: string;
  };
  /** Warianty skali, czyli ile razy w miesiacu proces sie wykonuje. */
  skale: number[];
  recznie: Krok[];
  /** Czynnosci, ktore przejmuje maszyna. Nie licza sie do czasu czlowieka. */
  system: string[];
  po: Krok[];
  /** Skad wziete minuty. Widoczne pod wynikiem, nie w przypisie. */
  skad: string;
};

const PROCESY: Proces[] = [
  {
    id: "lead",
    nazwa: "Lead z formularza do CRM",
    jednostka: { poj: "lead", mn: "leady", dop: "leadów", msc: "leadach" },
    skale: [20, 50, 100, 200],
    recznie: [
      { co: "Otworzyć zgłoszenie na wspólnej skrzynce i przeczytać", minuty: 1 },
      { co: "Sprawdzić, czy ten kontakt już jest w CRM", minuty: 2 },
      { co: "Przepisać dane do kontaktu, firmy i szansy sprzedaży", minuty: 4 },
      { co: "Wybrać handlowca i przypisać szansę", minuty: 2 },
      { co: "Założyć zadanie kontaktu z terminem", minuty: 2 },
      { co: "Dopisać lead do arkusza na potrzeby raportu", minuty: 1 },
    ],
    system: [
      "Zgłoszenie z formularza i z Meta Ads trafia prosto do CRM",
      "Dopasowanie do istniejącego kontaktu po adresie i numerze NIP",
      "Utworzenie kontaktu, firmy i szansy sprzedaży z kompletem pól",
      "Przypisanie handlowca według reguły, na przykład po regionie",
      "Zadanie z terminem, a po trzydziestu minutach bez reakcji przypomnienie",
      "Zapis do zestawienia, z którego liczy się raport",
    ],
    po: [
      { co: "Przejrzeć zgłoszenia odrzucone przez walidację", minuty: 1 },
    ],
    skad: "Minuty to czas czynności zmierzony z zegarkiem na własnym procesie, w Pipedrive, przy zgłoszeniu z formularza i z Meta Ads. Nie jest to pomiar u żadnej firmy.",
  },
  {
    id: "raport",
    nazwa: "Tygodniowy raport sprzedaży",
    jednostka: { poj: "raport", mn: "raporty", dop: "raportów", msc: "raportach" },
    skale: [4, 8, 12],
    recznie: [
      { co: "Wyeksportować szanse sprzedaży z CRM do pliku", minuty: 10 },
      { co: "Pobrać koszty z Google Ads i Meta Ads", minuty: 15 },
      { co: "Skleić eksport z arkuszem prowizji", minuty: 45 },
      { co: "Uzgodnić rozjazdy między źródłami", minuty: 60 },
      { co: "Sprawdzić, czy sumy zgadzają się z poprzednim tygodniem", minuty: 40 },
      { co: "Przełożyć liczby do prezentacji", minuty: 45 },
      { co: "Rozesłać i odpowiedzieć na pytania o liczby", minuty: 25 },
    ],
    system: [
      "Pobranie szans sprzedaży z CRM oraz kosztów z Google Ads i Meta Ads",
      "Sprowadzenie wszystkich źródeł do jednego zestawu pól",
      "Doliczenie prowizji z arkusza",
      "Porównanie sum z poprzednim tygodniem i oznaczenie odchyleń",
      "Złożenie raportu i wysyłka o stałej porze w poniedziałek",
      "Alert na e-mail, gdy któreś źródło nie oddało danych",
    ],
    po: [
      { co: "Przejrzeć gotowy raport przed wysyłką", minuty: 10 },
      { co: "Zareagować na alert o brakujących danych ze źródła", minuty: 5 },
    ],
    skad: "Minuty to czas czynności wykonanych po kolei na własnych danych z Pipedrive, Google Ads i arkusza prowizji. Nie jest to pomiar u żadnej firmy ani średnia z rynku.",
  },
];

const PRZYCISK =
  "rounded-full border px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-semibold transition-colors";
const NIEAKTYWNY =
  "border-gray-200/80 dark:border-gray-800/80 bg-white/60 dark:bg-gray-900/40 text-gray-700 dark:text-gray-300 hover:border-accent/50";
const AKTYWNY = "border-accent bg-accent text-white";

/** 95 minut to "1 h 35 min", 60 to "1 h". Godziny czyta sie latwiej niz minuty. */
function czas(minuty: number): string {
  if (minuty < 60) return `${minuty} min`;
  const h = Math.floor(minuty / 60);
  const m = minuty % 60;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

/** "4 raporty", ale "12 raportow". Bez tego przyciski czytaja sie jak tlumaczenie maszynowe. */
function odmien(n: number, j: Proces["jednostka"]): string {
  const ost = n % 10;
  const dwie = n % 100;
  if (n === 1) return j.poj;
  if (ost >= 2 && ost <= 4 && (dwie < 12 || dwie > 14)) return j.mn;
  return j.dop;
}

export default function PorownanieProcesu() {
  const [wybrany, setWybrany] = useState(0);
  const proces = PROCESY[wybrany];
  const [skala, setSkala] = useState(proces.skale[1]);
  // Odklikane czynnosci, osobno dla kazdego procesu, trzymane po tresci
  // kroku. Domyslnie wliczaja sie wszystkie.
  const [pominiete, setPominiete] = useState<Record<string, boolean>>({});
  const zgloszone = useRef(false);

  const klucz = (k: Krok) => `${proces.id}:${k.co}`;
  const wliczony = (k: Krok) => !pominiete[klucz(k)];

  const { recznieNaRaz, poNaRaz } = useMemo(() => {
    const suma = (kroki: Krok[]) =>
      kroki.reduce((s, k) => s + (pominiete[`${proces.id}:${k.co}`] ? 0 : k.minuty), 0);
    return { recznieNaRaz: suma(proces.recznie), poNaRaz: suma(proces.po) };
  }, [proces, pominiete]);

  const recznieMies = recznieNaRaz * skala;
  const poMies = poNaRaz * skala;
  const roznica = recznieMies - poMies;
  // Po odklikaniu prawie wszystkiego reszta po stronie czlowieka bywa
  // wieksza niz sam proces. Ujemna "oszczednosc" wygladalaby na blad, a
  // uczciwa odpowiedz jest tu inna: przy takim procesie nie ma czego zdejmowac.
  const bezSensu = roznica <= 0;

  function policz() {
    if (zgloszone.current) return;
    zgloszone.current = true;
    zglosZdarzenie("porownano_proces");
  }

  function wybierzProces(i: number) {
    setWybrany(i);
    setSkala(PROCESY[i].skale[1]);
    policz();
  }

  function przelaczKrok(k: Krok) {
    const id = klucz(k);
    setPominiete((p) => ({ ...p, [id]: !p[id] }));
    policz();
  }

  return (
    <div className="max-w-4xl">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 w-full sm:w-auto sm:mr-1">
          Który proces
        </span>
        {PROCESY.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => wybierzProces(i)}
            aria-pressed={i === wybrany}
            className={`${PRZYCISK} ${i === wybrany ? AKTYWNY : NIEAKTYWNY}`}
          >
            {p.nazwa}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 w-full sm:w-auto sm:mr-1">
          Ile razy w miesiącu
        </span>
        {proces.skale.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setSkala(s);
              policz();
            }}
            aria-pressed={s === skala}
            className={`${PRZYCISK} ${s === skala ? AKTYWNY : NIEAKTYWNY}`}
          >
            {s} {odmien(s, proces.jednostka)}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
            Dziś, ręcznie
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Odklikaj czynności, których u siebie nie robicie, a wynik przeliczy się
            od razu.
          </p>
          <ul className="space-y-2">
            {proces.recznie.map((k) => (
              <li key={k.co}>
                <button
                  type="button"
                  onClick={() => przelaczKrok(k)}
                  aria-pressed={wliczony(k)}
                  className={`w-full text-left flex items-start gap-3 rounded-lg border px-3 py-2 transition-colors ${
                    wliczony(k)
                      ? "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                      : "border-dashed border-gray-200 dark:border-gray-700 bg-transparent"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center text-[10px] font-bold ${
                      wliczony(k)
                        ? "border-accent bg-accent text-white"
                        : "border-gray-300 dark:border-gray-600 text-transparent"
                    }`}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span
                    className={`text-sm leading-snug grow ${
                      wliczony(k)
                        ? "text-gray-700 dark:text-gray-300"
                        : "text-gray-400 dark:text-gray-600 line-through"
                    }`}
                  >
                    {k.co}
                  </span>
                  <span
                    className={`text-sm font-semibold tabular-nums whitespace-nowrap ${
                      wliczony(k)
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-400 dark:text-gray-600"
                    }`}
                  >
                    {k.minuty} min
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
            Na jeden {proces.jednostka.poj}:{" "}
            <strong className="text-gray-900 dark:text-white">
              {czas(recznieNaRaz)}
            </strong>
          </p>
        </div>

        <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-xl p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-1">
            Po automatyzacji
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Te czynności robi system, bez udziału człowieka:
          </p>
          <ul className="space-y-1.5 mb-5">
            {proces.system.map((c) => (
              <li
                key={c}
                className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 leading-snug"
              >
                <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Po stronie człowieka zostaje to, czego nie powinno się oddawać
            maszynie:
          </p>
          <ul className="space-y-2">
            {proces.po.map((k) => (
              <li
                key={k.co}
                className="flex items-start gap-3 rounded-lg border border-accent/20 bg-white/70 dark:bg-gray-800/60 px-3 py-2"
              >
                <span className="text-sm text-gray-700 dark:text-gray-300 leading-snug grow">
                  {k.co}
                </span>
                <span className="text-sm font-semibold tabular-nums whitespace-nowrap text-gray-900 dark:text-white">
                  {k.minuty} min
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 pt-4 border-t border-accent/20 text-sm text-gray-600 dark:text-gray-400">
            Na jeden {proces.jednostka.poj}:{" "}
            <strong className="text-gray-900 dark:text-white">
              {czas(poNaRaz)}
            </strong>
          </p>
        </div>
      </div>

      <div
        aria-live="polite"
        className="mt-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5"
      >
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white leading-tight tabular-nums">
              {czas(recznieMies)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-snug">
              ręcznej pracy miesięcznie przy {skala} {proces.jednostka.msc}
            </p>
          </div>
          <div>
            <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white leading-tight tabular-nums">
              {czas(poMies)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-snug">
              zostaje po stronie człowieka
            </p>
          </div>
          <div>
            <p
              className={`font-bold text-accent leading-tight tabular-nums ${
                bezSensu ? "text-base lg:text-lg" : "text-lg lg:text-2xl"
              }`}
            >
              {bezSensu ? "nic" : czas(roznica)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-snug">
              {bezSensu
                ? "nie ma czego zdejmować, tak wąski proces taniej zostawić ręcznie"
                : "różnica, czyli ile jest do zdjęcia"}
            </p>
          </div>
        </div>
        <p className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-500 leading-relaxed">
          Skąd te minuty: {proces.skad} To model przepływu, nie opis wdrożenia u
          firmy, bo takich wdrożeń jeszcze nie mam. Wynik mówi, ile czasu zajmują
          wypisane wyżej czynności, a nie ile zarobi na tym Wasza firma.
        </p>
      </div>
    </div>
  );
}
