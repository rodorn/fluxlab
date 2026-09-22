"use client";

/**
 * Wybor narzedzia po sytuacji, nad lista narzedzi.
 *
 * Lista dziewietnastu kafelkow wymaga, zeby odwiedzajacy sam przetlumaczyl
 * swoj problem na nazwe sprawdzenia. Tutaj kolejnosc jest odwrocona:
 * naciska to, co u niego zgrzyta, i dostaje jedno albo trzy narzedzia z
 * jednym zdaniem, dlaczego akurat te. Bez wpisywania i bez rejestracji.
 *
 * Kazde narzedzie z `businessTools` musi wystapic w co najmniej jednej
 * sytuacji. Pilnuje tego `scripts/spojnosc.mjs`.
 */

import Link from "next/link";
import { useState } from "react";
import { businessTools } from "@/lib/narzedzia";
import { zglosZdarzenie } from "@/lib/zdarzenie";

type Wskazanie = {
  href: string;
  powod: string;
};

type Sytuacja = {
  klucz: string;
  etykieta: string;
  odpowiedz: string;
  wskazania: Wskazanie[];
};

const SYTUACJE: Sytuacja[] = [
  {
    klucz: "nie_wiem",
    etykieta: "Nie wiem, co jest nie tak",
    odpowiedz:
      "Najczęstsza sytuacja i najlepszy moment na jedno pełne badanie zamiast zgadywania, które sprawdzenie odpalić. Wychodzi z niego lista tego, co faktycznie wymaga uwagi, w kolejności.",
    wskazania: [
      {
        href: "/audyt-strony",
        powod:
          "Jedno wpisanie adresu obejmuje szybkość na komputerze i na telefonie, certyfikat, widoczność w wyszukiwarce, dostęp dla asystentów AI i zabezpieczenia poczty naraz.",
      },
    ],
  },
  {
    klucz: "wyszukiwarka",
    etykieta: "Nie znajdują nas w wyszukiwarce",
    odpowiedz:
      "Zanim ktokolwiek zacznie pozycjonować, warto wykluczyć trzy rzeczy, które po prostu wyłączają stronę z wyników.",
    wskazania: [
      {
        href: "/widocznosc-w-google",
        powod:
          "Blokada indeksowania zostawiona po wersji roboczej wyłącza całą witrynę i nie widać jej z przeglądarki.",
      },
      {
        href: "/mapa-strony",
        powod:
          "Bez działającej mapy strony robot sam musi znaleźć podstrony, a martwe adresy na liście zjadają jego limit.",
      },
      {
        href: "/podwojny-adres",
        powod:
          "Dwie działające wersje adresu z tą samą treścią to dla wyszukiwarki dwie strony, które odbierają sobie pozycje.",
      },
    ],
  },
  {
    klucz: "poczta",
    etykieta: "Maile do klientów nie docierają",
    odpowiedz:
      "Za to odpowiadają trzy wpisy w DNS. Sprawdzenie czyta je wprost z publicznego rejestru.",
    wskazania: [
      {
        href: "/audyt-poczty",
        powod:
          "SPF, DKIM i DMARC decydują, czy list trafi do skrzynki, do spamu, oraz czy ktoś obcy może wysyłać z Waszego adresu.",
      },
    ],
  },
  {
    klucz: "przelew",
    etykieta: "Mamy komuś zapłacić albo odzyskać pieniądze",
    odpowiedz:
      "Trzy sprawdzenia w publicznych rejestrach, wszystkie przed przelewem, nie po nim.",
    wskazania: [
      {
        href: "/sprawdzenie-nip",
        powod:
          "Wykaz podatników VAT mówi, czy firma istnieje, czy jest czynnym podatnikiem i ile rachunków zgłosiła.",
      },
      {
        href: "/czujka-rejestrowa",
        powod:
          "Sąd może rozwiązać spółkę bez likwidacji. Od obwieszczenia biegną trzy miesiące na sprzeciw, potem należność znika razem z dłużnikiem.",
      },
      {
        href: "/dane-sprzedawcy",
        powod:
          "To samo z drugiej strony: czy klient ustali ze strony, komu płaci, zanim zrezygnuje z zakupu.",
      },
    ],
  },
  {
    klucz: "sklep",
    etykieta: "Prowadzę sklep internetowy",
    odpowiedz:
      "Trzy miejsca, w których sklep traci pieniądze po cichu: przecena, zwrot i faktura od kuriera.",
    wskazania: [
      {
        href: "/rejestr-cen",
        powod:
          "Przy każdej obniżce trzeba podać najniższą cenę z trzydziestu dni. Sprawdzenie pokazuje pozycje, przy których jej nie ma.",
      },
      {
        href: "/panel-zwrotow",
        powod:
          "Kupujący, który nie znajdzie zasad zwrotu, pisze maila albo nie kupuje wcale.",
      },
      {
        href: "/audyt-kurierski",
        powod:
          "Dopłata paliwowa liczona ze złego progu wagowego kosztuje tyle samo co pomyłka razy liczba paczek.",
      },
    ],
  },
  {
    klucz: "rachunek",
    etykieta: "Rachunek za automatyzacje rośnie",
    odpowiedz:
      "Dwie liczby do porównania, zanim podpiszecie kolejny abonament albo umowę o pracę.",
    wskazania: [
      {
        href: "/tansze-automatyzacje",
        powod:
          "Zapier i Make liczą każdy krok osobno. Kalkulator pokazuje, po ilu miesiącach własny serwer wychodzi taniej.",
      },
      {
        href: "/zatrudnic-czy-zautomatyzowac",
        powod:
          "Cztery pola i jedna odpowiedź, łącznie z tą, że przy Waszej skali automatyzacja się nie opłaca.",
      },
    ],
  },
  {
    klucz: "reczna-praca",
    etykieta: "Zespół przepisuje dane z ręki",
    odpowiedz:
      "Najpierw policzmy, ile to kosztuje, a potem sprawdźmy, gdzie w procesie jest największa dziura.",
    wskazania: [
      {
        href: "/kalkulator-leadow",
        powod:
          "Przepisywanie leadów, zakładanie tematów w CRM i ręczne raporty, przeliczone na koszt miesięczny w złotych.",
      },
      {
        href: "/audyt-crm",
        powod:
          "Dziesięć pytań tak lub nie i wskazanie obszaru, w którym automatyzacja da najwięcej.",
      },
    ],
  },
  {
    klucz: "kontrola-strony",
    etykieta: "Nie wiem, kto panuje nad naszą stroną",
    odpowiedz:
      "Dwie rzeczy, które zwykle zostają u wykonawcy, a powinny należeć do firmy.",
    wskazania: [
      {
        href: "/wlasnosc-domeny",
        powod:
          "Publiczny rejestr pokazuje, kto figuruje jako abonent domeny i kiedy wygasa rejestracja.",
      },
      {
        href: "/naprawa-https",
        powod:
          "Wygasły certyfikat albo certyfikat wystawiony na firmę hostingową oznacza pełnoekranowe ostrzeżenie przy wejściu.",
      },
    ],
  },
  {
    klucz: "nowy-rynek",
    etykieta: "Planujemy nowy punkt albo nowy rynek",
    odpowiedz:
      "Trzy sprawdzenia przed decyzją: ilu konkurentów, w jakim języku i czy asystenci AI w ogóle Was przeczytają.",
    wskazania: [
      {
        href: "/analiza-lokalizacji",
        powod:
          "Liczba punktów w promieniu jednego, trzech i pięciu kilometrów oraz liczba mieszkańców na jeden punkt.",
      },
      {
        href: "/kontrola-jezykow",
        powod:
          "Wersja obcojęzyczna z połową tekstów po polsku kosztuje zaufanie dokładnie tam, gdzie go najmniej macie.",
      },
      {
        href: "/widocznosc-w-ai",
        powod:
          "Siedem warunków, od których zależy, czy roboty zbierające treść dla asystentów AI mogą stronę przeczytać.",
      },
    ],
  },
  {
    klucz: "termin-z-przepisow",
    etykieta: "Goni nas termin z przepisów",
    odpowiedz:
      "Dwa obowiązki, które mają twardą datę i sankcję, a sprawdza się je w kilkanaście sekund, bez wpisywania czegokolwiek.",
    wskazania: [
      {
        href: "/e-doreczenia-integracja",
        powod:
          "Terminy na adres do doręczeń elektronicznych wchodzą etapami i zależą od tego, gdzie i kiedy podmiot został zarejestrowany.",
      },
      {
        href: "/rejestr-cen",
        powod:
          "Przecena bez informacji o najniższej cenie z trzydziestu dni jest naruszeniem, a sprawdzenie pokazuje konkretne karty produktów.",
      },
    ],
  },
];

const TYTULY = new Map(businessTools.map((n) => [n.href, n.title]));

export default function WyborNarzedzia() {
  const [wybrana, setWybrana] = useState<string | null>(null);

  function wybierz(klucz: string) {
    const nowa = wybrana === klucz ? null : klucz;
    setWybrana(nowa);
    if (nowa) zglosZdarzenie("wybor_narzedzia");
  }

  const sytuacja = SYTUACJE.find((s) => s.klucz === wybrana) ?? null;

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/60 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Od czego zacząć
      </h3>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Naciśnij to, co u Ciebie zgrzyta, a wskażę narzędzia, od których to
        widać. Bez wpisywania czegokolwiek.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {SYTUACJE.map((s) => {
          const aktywna = s.klucz === wybrana;
          return (
            <button
              key={s.klucz}
              type="button"
              aria-pressed={aktywna}
              onClick={() => wybierz(s.klucz)}
              className={
                aktywna
                  ? "rounded-full border border-accent bg-accent-solid px-3.5 py-1.5 text-xs font-medium text-white transition-colors"
                  : "rounded-full border border-gray-300 px-3.5 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-accent hover:text-accent dark:border-gray-600 dark:text-gray-300"
              }
            >
              {s.etykieta}
            </button>
          );
        })}
      </div>

      {sytuacja && (
        <div className="mt-5 border-t border-gray-200 dark:border-gray-700 pt-5">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {sytuacja.odpowiedz}
          </p>
          <ul className="mt-4 grid gap-3 md:grid-cols-3">
            {sytuacja.wskazania.map((w) => (
              <li
                key={w.href}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-4"
              >
                <Link
                  href={w.href}
                  className="text-sm font-semibold text-gray-900 dark:text-white hover:text-accent dark:hover:text-accent transition-colors"
                >
                  {TYTULY.get(w.href) ?? w.href}
                </Link>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                  {w.powod}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export const SYTUACJE_NARZEDZI = SYTUACJE;
