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
    etykieta: "Nie wiemy, co jest nie tak",
    odpowiedz:
      "Najczęstsza sytuacja i najlepszy moment na jedno pełne badanie zamiast zgadywania, które sprawdzenie uruchomić. Wychodzi z niego lista tego, co faktycznie wymaga uwagi, w kolejności.",
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
          "Bez działającej mapy strony robot sam musi znaleźć podstrony, a martwe adresy na liście zużywają jego limit.",
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
          "SPF, DKIM i DMARC decydują, czy list trafi do skrzynki, do spamu, oraz czy ktoś obcy może wysyłać z Twojego adresu.",
      },
      {
        href: "/spf-dkim-dmarc",
        powod:
          "Gdy audyt pokazuje błędy, ta usługa dostarcza gotowe rekordy do wklejenia w DNS i instrukcję krok po kroku dla Twojego dostawcy poczty.",
      },
      {
        href: "/czarne-listy",
        powod:
          "Serwer poczty na liście spamowej to maile odrzucane albo wrzucane do spamu u odbiorców. Sprawdzenie obejmuje 11 list, a alert przychodzi mailem.",
      },
    ],
  },
  {
    klucz: "przelew",
    etykieta: "Mamy komuś zapłacić albo odzyskać pieniądze",
    odpowiedz: "Pięć sprawdzeń, wszystkie przed przelewem, nie po nim.",
    wskazania: [
      {
        href: "/sprawdzenie-nip",
        powod:
          "Wykaz podatników VAT mówi, czy firma istnieje, czy jest czynnym podatnikiem i ile rachunków zgłosiła.",
      },
      {
        href: "/weryfikacja-rachunkow",
        powod:
          "Paczka przelewów z banku w pliku CSV i lista rachunków, których nie ma na białej liście VAT albo które należą do innej firmy.",
      },
      {
        href: "/numer-ksef",
        powod:
          "Od 1 stycznia 2027 przelew za fakturę z KSeF zawiera jej numer. Suma kontrolna wyłapie literówkę, zanim wpłata utknie u kontrahenta.",
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
    etykieta: "Prowadzimy sklep internetowy",
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
      "Dwie liczby do porównania, zanim podpiszesz kolejny abonament albo umowę o pracę.",
    wskazania: [
      {
        href: "/tansze-automatyzacje",
        powod:
          "Zapier i Make liczą każdy krok osobno. Kalkulator pokazuje, po ilu miesiącach własny serwer wychodzi taniej.",
      },
      {
        href: "/strefa-wiedzy/automatyzacja-vs-zatrudnienie#kalkulator",
        powod:
          "Cztery pola i jedna odpowiedź, łącznie z tą, że przy Twojej skali automatyzacja się nie opłaca.",
      },
    ],
  },
  {
    klucz: "reczna-praca",
    etykieta: "Zespół przepisuje dane ręcznie",
    odpowiedz:
      "Najpierw policzmy, ile to kosztuje, a potem sprawdźmy, gdzie w procesie jest największa luka.",
    wskazania: [
      {
        href: "/sygnaly-automatyzacji",
        powod:
          "Dziewięć zdań do zaznaczenia i ocena, czy automatyzacja się zwróci, zanim zaczniesz cokolwiek liczyć.",
      },
      {
        href: "/koszt-recznej-obslugi-leadow",
        powod:
          "Przepisywanie leadów, zakładanie tematów w CRM i ręczne raporty, przeliczone na koszt miesięczny w złotych.",
      },
      {
        href: "/audyt-crm",
        powod:
          "Dziesięć pytań tak lub nie i wskazanie obszaru, w którym automatyzacja da najwięcej.",
      },
      {
        href: "/odpowiedz-na-leada",
        powod:
          "Klient, który zostawił zgłoszenie, w minutę dostaje ofertę i link do kalendarza, zanim zdąży zapytać kogoś innego.",
      },
      {
        href: "/ankieta-nps",
        powod:
          "Klienci oceniają firmę jednym kliknięciem, a Ty widzisz wynik NPS i komentarze krytyków, zanim ktoś odejdzie.",
      },
      {
        href: "/prosba-o-opinie-google",
        powod:
          "Zadowolony klient dostaje mail z jednym przyciskiem do opinii w Google, więc Twoja wizytówka zbiera oceny bez przypominania się.",
      },
      {
        href: "/kalkulator-wyceny",
        powod:
          "Klient widzi orientacyjną cenę od razu, a Ty dostajesz kontakt z wybranymi usługami zamiast pytania „ile to kosztuje”.",
      },
      {
        href: "/czat-ai-na-strone",
        powod:
          "Klienci pytają o ceny, terminy i zakres usług także wieczorem, a czat odpowiada od razu na podstawie informacji, które mu dasz.",
      },
      {
        href: "/rezerwacje-online",
        powod:
          "Klient sam wybiera wolny termin na Twojej stronie, a Ty nie odbierasz telefonów tylko po to, żeby ustalić godzinę.",
      },
      {
        href: "/formularz-leadow",
        powod:
          "Zgłoszenia z Twojej strony trafiają od razu na mail i na listę w jednym miejscu, zamiast ginąć w skrzynce.",
      },
      {
        href: "/ocena-leada-ai",
        powod:
          "Każde zgłoszenie z formularza dostaje ocenę gorący, ciepły albo zimny i podpowiedź na rozmowę, więc kolejność telefonów nie zależy od przypadku.",
      },
      {
        href: "/dane-firmy-z-nip",
        powod:
          "Zgłoszenie z numerem NIP dostaje nazwę firmy, adres, status VAT i dane z KRS, bez przepisywania z rejestrów.",
      },
    ],
  },
  {
    klucz: "kontrola-strony",
    etykieta: "Nie wiemy, kto panuje nad naszą stroną",
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
      {
        href: "/monitoring-dostepnosci",
        powod:
          "Strona, która pada w nocy albo w weekend, kosztuje zamówienia. Sprawdzenie co 5 minut i mail, zanim zadzwoni klient.",
      },
      {
        href: "/straznik-formularza",
        powod:
          "Formularz kontaktowy, który po cichu przestał wysyłać, kosztuje zapytania. Zgłoszenie testowe raz na dobę i mail, gdy coś się zepsuje.",
      },
      {
        href: "/pilnowanie-certyfikatu",
        powod:
          "Mail 30, 14 i 3 dni przed końcem certyfikatu i domeny, żeby ostrzeżenie w przeglądarce nigdy się nie pojawiło.",
      },
      {
        href: "/czytelnosc-tekstow",
        powod:
          "Literówka na stronie głównej kosztuje zaufanie. Raport pokazuje literówki, zdania do skrócenia i frazy, które klient musi tłumaczyć.",
      },
    ],
  },
  {
    klucz: "reklama-w-realu",
    etykieta: "Drukujemy ulotki, naklejki albo oklejamy auta",
    odpowiedz:
      "Papier i folia nie mówią, ile osób coś z nich wyniosło. Jeden kod ze zliczaniem skanów to zmienia.",
    wskazania: [
      {
        href: "/kody-qr",
        powod:
          "Kod prowadzi na Twoją stronę, a pierwszego dnia miesiąca przychodzi mail z liczbą skanów każdego kodu.",
      },
    ],
  },
  {
    klucz: "opisy-do-sklepu",
    etykieta: "Mamy sklep i setki produktów bez opisów",
    odpowiedz:
      "Pisanie opisów jeden po drugim zajmuje tygodnie. Z pliku z cechami robi się to w minutę.",
    wskazania: [
      {
        href: "/opisy-produktow-z-csv",
        powod:
          "Plik z nazwami i cechami wraca z opisem krótkim, długim i metatagami, a każdy opis opiera się tylko na Twoich danych.",
      },
    ],
  },
  {
    klucz: "nowy-rynek",
    etykieta: "Planujemy nowy punkt albo nowy rynek",
    odpowiedz:
      "Trzy sprawdzenia przed decyzją: ilu konkurentów, w jakim języku i czy asystenci AI w ogóle cię przeczytają.",
    wskazania: [
      {
        href: "/analiza-lokalizacji",
        powod:
          "Liczba punktów w promieniu jednego, trzech i pięciu kilometrów oraz liczba mieszkańców na jeden punkt.",
      },
      {
        href: "/kontrola-jezykow",
        powod:
          "Wersja obcojęzyczna z połową tekstów po polsku kosztuje zaufanie dokładnie tam, gdzie go najmniej masz.",
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
      "Trzy obowiązki, które mają twardą datę i sankcję, a sprawdza się je w kilkanaście sekund, bez wpisywania czegokolwiek.",
    wskazania: [
      {
        href: "/ksef-integracja",
        powod:
          "Wystawianie faktur w KSeF obowiązuje etapami od lutego 2026. Sprawdzenie pokazuje, od kiedy dotyczy to Twojej grupy podatników.",
      },
      {
        href: "/ksef-2027",
        powod:
          "1 stycznia 2027 kończą się naraz wszystkie przepisy przejściowe KSeF. Siedem pytań pokazuje, co jeszcze trzeba domknąć.",
      },
      {
        href: "/e-doreczenia-integracja",
        powod:
          "Terminy na adres do doręczeń elektronicznych wchodzą etapami i zależą od tego, gdzie i kiedy podmiot został zarejestrowany.",
      },
      {
        href: "/kursy-nbp",
        powod:
          "Faktura walutowa wymaga kursu NBP z dnia poprzedzającego, a narzędzie podaje go z numerem tabeli i dopisuje do arkusza.",
      },
      {
        href: "/raport-edoreczen",
        powod:
          "Raport po NIP albo KRS pokazuje, czy firma musi mieć adres do doręczeń elektronicznych, od kiedy i czy spółka już go ma.",
      },
      {
        href: "/kalendarz-terminow",
        powod:
          "Terminy PIT, CIT, VAT i ZUS dla Twojej formy firmy w jednym kalendarzu, z przypomnieniami i przesunięciami przez weekendy i święta.",
      },
      {
        href: "/adresy-do-edoreczen",
        powod:
          "Chcesz pisać do kontrahentów przez e-Doręczenia? Z listy NIP dostaniesz adresy wpisane w KRS i listę firm, które ich jeszcze nie mają.",
      },
      {
        href: "/rejestr-cen",
        powod:
          "Przecena bez informacji o najniższej cenie z trzydziestu dni jest naruszeniem, a sprawdzenie pokazuje konkretne karty produktów.",
      },
    ],
  },
  {
    klucz: "skladki",
    etykieta: "Chcemy wiedzieć, ile zapłacimy ZUS i podatku",
    odpowiedz:
      "Składki zależą od etapu działalności i formy opodatkowania, a zdrowotna od dochodu.",
    wskazania: [
      {
        href: "/narzedzia/kalkulator-zus",
        powod:
          "Duży ZUS, preferencyjny, Mały ZUS Plus i ulga na start na 2026 i 2027, ze składką zdrowotną dla skali, liniowego i ryczałtu.",
      },
      {
        href: "/narzedzia/kalkulator-pit",
        powod:
          "Podatek i kwota na rękę z działalności albo etatu, z zaliczkami miesiąc po miesiącu.",
      },
      {
        href: "/narzedzia/porownanie-form-opodatkowania",
        powod:
          "Skala, liniowy i ryczałt obok siebie dla Twoich przychodów i kosztów, w tym i przyszłym roku.",
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
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Od czego zacząć
      </h2>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Wybierz to, co sprawia ci kłopot, a wskażemy narzędzia, od których to
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
