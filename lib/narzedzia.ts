/** Lista darmowych narzędzi. Jedno źródło dla strony z narzędziami i dla
 *  licznika na stronie głównej, bo liczba wpisana ręcznie rozjechała się
 *  z rzeczywistością już trzy razy. */
export type Narzedzie = {
  /** Wyróżnik na kafelku, na przykład Nowość. */
  badge?: string;
  /** Jedno zdanie o tym, co narzędzie sprawdza. */
  description: string;
  /** Adres strony narzędzia. */
  href: string;
  /** Klucz ikony z mapy IKONY. */
  ikona?: string;
  /** Obrazek na kafelku, jeśli narzędzie go ma. */
  image?: string;
  /** Nazwa widoczna na kafelku. */
  title: string;
};

export const businessTools: Narzedzie[] = [
  {
    title: "Czy przeglądarka straszy Twoją stroną",
    description:
      "Wpisz adres strony, a pokażę, co widzi ktoś, kto trafia do Ciebie z wyszukiwarki. Wygasły certyfikat albo certyfikat firmy hostingowej oznacza pełnoekranowe ostrzeżenie, po którym większość odwiedzających zawraca.",
    href: "/naprawa-https",
    ikona: "tarcza",
  },
  {
    title: "Przeceny bez wymaganej informacji o cenie",
    description:
      "Podaj adres sklepu, a sprawdzę Twoje aktualne przeceny i pokażę te, przy których brakuje obowiązkowej informacji o najniższej cenie z trzydziestu dni. Każda pozycja z linkiem do sprawdzenia.",
    href: "/rejestr-cen",
    ikona: "metka",
  },
  {
    title: "Polskie teksty w wersji angielskiej",
    description:
      "Wpisz adres firmy, a znajdę Waszą wersję obcojęzyczną i policzę fragmenty, które zostały po polsku, oraz sprawdzę, czy wyszukiwarka w ogóle wie, że macie wersje językowe.",
    href: "/kontrola-jezykow",
    ikona: "jezyk",
  },
  {
    title: "Ilu masz konkurentów w okolicy",
    description:
      "Podaj miejscowość i wybierz branżę, a policzę punkty w promieniu jednego, trzech i pięciu kilometrów oraz to, ilu mieszkańców przypada na jeden taki punkt. Przydaje się przed podpisaniem najmu.",
    href: "/analiza-lokalizacji",
    ikona: "pinezka",
  },
  {
    title: "Czy asystent AI widzi Twoją stronę",
    description:
      "Wpisz domenę, a sprawdzę siedem rzeczy, od których zależy, czy roboty zbierające treść dla ChatuGPT, Claude'a i Perplexity mogą ją w ogóle przeczytać: dostęp w robots.txt, treść widoczną bez uruchamiania skryptów, dane uporządkowane, metadane, mapę strony i plik llms.txt.",
    href: "/widocznosc-w-ai",
    ikona: "lupa",
  },
  {
    title: "Ile przepłacasz za automatyzacje",
    description:
      "Podaj liczbę uruchomień i kroków w scenariuszu, a pokażę, ile zadań jest naprawdę rozliczanych, ile to kosztuje i po ilu miesiącach zwróciłoby się przeniesienie na własny serwer.",
    href: "/tansze-automatyzacje",
    ikona: "moneta",
  },
  {
    title: "Sprawdzenie pozycji z faktury kurierskiej",
    description:
      "Przepisz trzy liczby z faktury, a policzę, czy dopłata paliwowa zgadza się ze stawką dla Twojego progu wagowego i ile ta sama pomyłka kosztuje przy kilkuset paczkach miesięcznie.",
    href: "/audyt-kurierski",
    ikona: "paczka",
  },
  {
    title: "Czy Twój dłużnik znika z rejestru",
    description:
      "Wpisz nazwę spółki albo numer KRS, a sprawdzę w Monitorze Sądowym, czy sąd nie wszczął postępowania o jej rozwiązanie bez likwidacji. Od obwieszczenia biegną trzy miesiące na sprzeciw, potem podmiot znika razem z Twoją należnością.",
    href: "/czujka-rejestrowa",
    ikona: "mlotek",
    badge: "Nowość",
  },
  {
    title: "Czy klient ustali, komu płaci",
    description:
      "Wpisz adres firmy, a wyciągnę ze strony, kontaktu i regulaminu numer NIP oraz numer konta i sprawdzę je w wykazie podatników VAT, dokładnie tak jak zrobi to księgowość Twojego klienta przed przelewem.",
    href: "/dane-sprzedawcy",
    ikona: "pieczec",
  },
  {
    title: "Czy Google ma listę Twoich podstron",
    description:
      "Wpisz adres firmy, a sprawdzę, czy macie mapę strony, czy jest wskazana w robots.txt i czy adresy z niej faktycznie działają. Martwy adres na tej liście zużywa limit odwiedzin robota.",
    href: "/mapa-strony",
    ikona: "mapa",
  },
  {
    title: "Czy Google widzi Twoją stronę podwójnie",
    description:
      "Wpisz adres firmy, a sprawdzę cztery wersje tego adresu, z www i bez, i pokażę, czy któraś przekierowuje na drugą. Dwie działające wersje z tą samą treścią to dla wyszukiwarki dwie osobne strony.",
    href: "/podwojny-adres",
    ikona: "rozwidlenie",
  },
  {
    title: "Kto jest właścicielem Twojej domeny",
    description:
      "Wpisz domenę, a odczytam z publicznego rejestru, kto figuruje jako abonent i kiedy wygasa rejestracja. Bywa, że właścicielem adresu firmy jest ten, kto kiedyś robił stronę.",
    href: "/wlasnosc-domeny",
    ikona: "klucz",
  },
  {
    title: "Sprawdzenie NIP i kontrahenta",
    description:
      "Wpisz NIP i sprawdź w wykazie Ministerstwa Finansów, czy firma istnieje, czy jest czynnym podatnikiem VAT, od kiedy działa i ile rachunków zgłosiła. Bez rejestracji i bez limitu prób.",
    href: "/sprawdzenie-nip",
    ikona: "lupa",
  },
  {
    title: "Audyt bezpieczeństwa poczty",
    description:
      "Wpisz domenę firmy i sprawdź w kilka sekund, czy ktoś może podszyć się pod Wasz adres i czy Wasze maile trafiają do klientów. Analiza SPF, DKIM i DMARC z publicznego DNS, bez rejestracji.",
    href: "/audyt-poczty",
    ikona: "koperta",
  },
  {
    title: "Kalkulator kosztu obsługi leadów",
    description:
      "Sprawdź, ile miesięcznie kosztuje ręczne przepisywanie leadów, zakładanie tematów w CRM i ręczne raporty. Realny koszt w zł, nie ogólniki.",
    href: "/kalkulator-leadow",
    ikona: "kalkulator",
    badge: "Najpopularniejsze",
  },
  {
    title: "Audyt CRM, checklist online",
    description:
      "10 pytań tak/nie. Wynik X/10 + obszar z największym potencjałem automatyzacji. Bez rejestracji, w 3 minuty.",
    href: "/audyt-crm",
    ikona: "lista",
  },
  {
    title: "Zatrudnić czy zautomatyzować?",
    description:
      "Porównaj koszt miesięcznej ręcznej pracy z kosztem wdrożenia automatyzacji. 4 inputy, 1 jasna decyzja.",
    href: "/zatrudnic-czy-zautomatyzowac",
    ikona: "kalkulator",
  },
  {
    title: "Fluxdesk, panel do sesji AI",
    description:
      "Kilkanaście rozmów z asystentem AI w jednym oknie: stan każdej sesji, koszty, limity i zadania. Narzędzie z otwartym kodem, do uruchomienia u siebie.",
    href: "/strefa-wiedzy/panel-do-sesji-ai",
    badge: "Open source",
  },
];

export const otherTools: Narzedzie[] = [
  {
    title: "Dobór samochodu",
    description:
      "Znajdź idealny segment, nadwozie i moc dla siebie. Odpowiedz na kilka pytań, a algorytm dopasuje najlepsze propozycje.",
    href: "/dobor-samochodu",
    image: "/photos/car-chooser/type-sport.webp",
  },
  {
    title: "Kalkulator kosztów auta",
    description:
      "Oblicz pełny koszt posiadania samochodu: paliwo, ubezpieczenie, serwis, amortyzacja i więcej.",
    href: "/kalkulator-kosztow",
    image: "/photos/car-chooser/type-osobowy.jpg",
  },
  {
    title: "Kalkulator podatkowy JDG",
    description:
      "Porównaj skalę podatkową, podatek liniowy i ryczałt. Uwzględnia składki ZUS, VAT, ulgi i daje jasną odpowiedź, co się bardziej opłaca.",
    href: "/kalkulator-podatkowy",
    image: "/photos/tax-calculation/calculator.jpg",
  },
];

/** Ile narzędzi obiecujemy na stronie głównej. */
export const LICZBA_NARZEDZI = businessTools.length;
