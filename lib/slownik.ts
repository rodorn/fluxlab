export interface Haslo {
  haslo: string;
  slug: string;
  opis: string;
  link?: { href: string; tekst: string };
}

/* Krotko: dwa zdania na haslo i jeden link tam, gdzie mamy narzedzie albo
   usluge. Kolejnosc alfabetyczna liczy strona, nie ta tablica. */
export const SLOWNIK: Haslo[] = [
  {
    haslo: "KSeF",
    slug: "ksef",
    opis: "Krajowy System e-Faktur, rządowy system, przez który wystawia się i odbiera faktury. Obowiązuje firmy od 1 lutego albo 1 kwietnia 2026, a najmniejsze od 1 stycznia 2027.",
    link: { href: "/ksef-2027", tekst: "Lista kontrolna KSeF na 2027" },
  },
  {
    haslo: "Numer KSeF",
    slug: "numer-ksef",
    opis: "Identyfikator, który KSeF nadaje fakturze po jej przyjęciu. Zawiera NIP sprzedawcy, datę przyjęcia i sumę kontrolną, więc da się go sprawdzić bez logowania.",
    link: { href: "/numer-ksef", tekst: "Sprawdźcie numer KSeF" },
  },
  {
    haslo: "FA(3)",
    slug: "fa3",
    opis: "Obecna struktura logiczna e-faktury, czyli wzór pliku XML, który przyjmuje KSeF. Program do faktur musi ją obsługiwać, inaczej faktura zostanie odrzucona.",
    link: { href: "/ksef-integracja", tekst: "Integracja z KSeF" },
  },
  {
    haslo: "Faktura ustrukturyzowana",
    slug: "faktura-ustrukturyzowana",
    opis: "Faktura wystawiona w KSeF w formacie XML i opatrzona numerem KSeF. Dopiero ona jest fakturą w rozumieniu przepisów, PDF to tylko jej wizualizacja.",
  },
  {
    haslo: "Tryb offline24",
    slug: "offline24",
    opis: "Wystawienie faktury bez połączenia z KSeF. Fakturę w strukturze FA(3) trzeba wysłać do systemu najpóźniej następnego dnia roboczego.",
    link: {
      href: "/strefa-wiedzy/faktura-gdy-ksef-nie-dziala",
      tekst: "Faktura, gdy KSeF nie działa",
    },
  },
  {
    haslo: "Samofakturowanie",
    slug: "samofakturowanie",
    opis: "Fakturę w imieniu sprzedawcy wystawia nabywca, na podstawie umowy między nimi. W KSeF wymaga nadania nabywcy uprawnienia przez sprzedawcę.",
    link: {
      href: "/strefa-wiedzy/samofakturowanie-ksef",
      tekst: "Samofakturowanie w KSeF",
    },
  },
  {
    haslo: "Oznaczenia OFF, BFK, DI w JPK",
    slug: "oznaczenia-jpk",
    opis: "Znaczniki w pliku JPK_VAT dla faktur spoza KSeF. OFF to faktura z trybu offline, BFK faktura poza KSeF, DI dowód inny niż faktura, na przykład paragon.",
    link: {
      href: "/strefa-wiedzy/oznaczenia-jpk-ksef",
      tekst: "Oznaczenia JPK a KSeF",
    },
  },
  {
    haslo: "Biała lista VAT",
    slug: "biala-lista",
    opis: "Wykaz podatników VAT prowadzony przez Ministerstwo Finansów, z ich statusem i rachunkami bankowymi. Zapłata za transakcję powyżej 15 tys. zł na rachunek spoza wykazu odbiera prawo do kosztu.",
    link: { href: "/sprawdzenie-nip", tekst: "Sprawdźcie NIP w wykazie" },
  },
  {
    haslo: "e-Doręczenia",
    slug: "e-doreczenia",
    opis: "Elektroniczny odpowiednik listu poleconego za potwierdzeniem odbioru. Urzędy wysyłają pisma na adres do e-Doręczeń, a pismo nieodebrane przez 14 dni uznaje się za doręczone.",
    link: { href: "/e-doreczenia-integracja", tekst: "Sprawdźcie swój termin" },
  },
  {
    haslo: "Adres do e-Doręczeń",
    slug: "adres-do-e-doreczen",
    opis: "Adres skrzynki do doręczeń elektronicznych w formacie AE:PL-… z cyframi. Zakłada się go bezpłatnie przez Biznes.gov.pl.",
    link: {
      href: "/strefa-wiedzy/e-doreczenia-adres-prywatny-i-firmowy",
      tekst: "Adres prywatny a firmowy",
    },
  },
  {
    haslo: "BAE",
    slug: "bae",
    opis: "Baza Adresów Elektronicznych, publiczny spis adresów do e-Doręczeń. To w niej sprawdza się, czy firma lub urząd ma adres.",
  },
  {
    haslo: "CRM",
    slug: "crm",
    opis: "System do prowadzenia klientów i sprzedaży: kontakty, szanse, zadania i historia rozmów w jednym miejscu. Przykłady to Pipedrive, HubSpot i Salesforce.",
    link: {
      href: "/strefa-wiedzy/crm-dla-jednoosobowej-firmy",
      tekst: "CRM dla jednoosobowej firmy",
    },
  },
  {
    haslo: "Lead",
    slug: "lead",
    opis: "Osoba lub firma, która zostawiła kontakt i może zostać klientem, na przykład przez formularz. Wartość leada szybko spada, gdy nikt nie odpowiada.",
    link: { href: "/automatyzacja-leadow-crm", tekst: "Automatyzacja leadów" },
  },
  {
    haslo: "Czas reakcji na leada",
    slug: "czas-reakcji",
    opis: "Czas od zgłoszenia do pierwszej odpowiedzi handlowca. Automat skraca go z godzin do minut, bo przydziela leada i powiadamia od razu.",
    link: {
      href: "/czas-reakcji-na-leada",
      tekst: "Jak skrócić czas reakcji",
    },
  },
  {
    haslo: "Lejek sprzedaży",
    slug: "lejek",
    opis: "Etapy, przez które przechodzi klient od pierwszego kontaktu do zakupu. Liczby na każdym etapie pokazują, gdzie sprzedaż ucieka.",
    link: {
      href: "/strefa-wiedzy/jak-uporzadkowac-proces-sprzedazy-w-crm",
      tekst: "Porządek w procesie sprzedaży",
    },
  },
  {
    haslo: "Pipedrive",
    slug: "pipedrive",
    opis: "Popularny CRM dla małych i średnich zespołów sprzedaży, zbudowany wokół lejka. Ma otwarte API, więc łatwo go spiąć z formularzami i innymi systemami.",
    link: { href: "/automatyzacja-pipedrive", tekst: "Automatyzacja Pipedrive" },
  },
  {
    haslo: "ERP",
    slug: "erp",
    opis: "System do prowadzenia firmy od strony zamówień, magazynu, faktur i księgowości, na przykład enova czy Comarch. Połączony z CRM oszczędza przepisywania danych.",
    link: { href: "/integracja-crm-z-erp", tekst: "Integracja CRM z ERP" },
  },
  {
    haslo: "API",
    slug: "api",
    opis: "Sposób, w jaki programy wymieniają dane bez udziału człowieka. Jeśli system ma API, da się go połączyć z innymi.",
    link: { href: "/integracje-api", tekst: "Integracje API" },
  },
  {
    haslo: "Webhook",
    slug: "webhook",
    opis: "Powiadomienie, które jeden system wysyła do drugiego w chwili zdarzenia, na przykład nowego zamówienia. Dzięki niemu automat działa od razu, a nie co godzinę.",
  },
  {
    haslo: "Integracja systemów",
    slug: "integracja",
    opis: "Połączenie dwóch programów tak, żeby dane przechodziły między nimi same. Koniec z przepisywaniem i z rozjazdami między systemami.",
    link: {
      href: "/strefa-wiedzy/jak-polaczyc-crm-z-innymi-systemami",
      tekst: "Jak połączyć CRM z innymi systemami",
    },
  },
  {
    haslo: "n8n",
    slug: "n8n",
    opis: "Narzędzie do budowania automatyzacji z klocków, które można postawić na własnym serwerze. Przy dużej liczbie operacji wychodzi taniej niż Zapier i Make.",
    link: { href: "/n8n", tekst: "Wdrożenie n8n" },
  },
  {
    haslo: "Make i Zapier",
    slug: "make-zapier",
    opis: "Usługi w chmurze do łączenia aplikacji bez programowania. Płaci się za liczbę operacji, więc koszt rośnie razem z ruchem.",
    link: { href: "/zapier-make", tekst: "Zapier czy Make" },
  },
  {
    haslo: "Automatyzacja procesów",
    slug: "automatyzacja-procesow",
    opis: "Przekazanie powtarzalnej pracy programowi: przepisywania, raportów, przypomnień. Ma sens, gdy ta sama czynność wraca co tydzień.",
    link: {
      href: "/strefa-wiedzy/co-to-jest-automatyzacja-procesow-biznesowych",
      tekst: "Co to jest automatyzacja procesów",
    },
  },
  {
    haslo: "ROI z automatyzacji",
    slug: "roi",
    opis: "Stosunek zaoszczędzonych pieniędzy do kosztu wdrożenia. Liczy się go z godzin pracy, które automat przejmuje, i z kosztu jego utrzymania.",
    link: { href: "/kalkulator-kosztow", tekst: "Kalkulator kosztów" },
  },
  {
    haslo: "Scraping",
    slug: "scraping",
    opis: "Automatyczne pobieranie danych ze stron internetowych, na przykład cen, ofert czy kontaktów. Zamienia godziny ręcznego kopiowania w gotowy arkusz.",
    link: { href: "/scraping-danych", tekst: "Pozyskiwanie danych" },
  },
  {
    haslo: "LLM",
    slug: "llm",
    opis: "Duży model językowy, czyli silnik asystentów takich jak ChatGPT. W firmie przydaje się do czytania dokumentów, klasyfikacji zgłoszeń i pierwszych odpowiedzi.",
    link: {
      href: "/strefa-wiedzy/kiedy-ai-ma-sens-a-kiedy-nie",
      tekst: "Kiedy AI ma sens",
    },
  },
  {
    haslo: "Widoczność w AI",
    slug: "widocznosc-w-ai",
    opis: "To, czy asystenci AI znają firmę i polecają ją w odpowiedziach. Zależy od tego, czy roboty mogą przeczytać stronę i czy jasno mówi, czym firma się zajmuje.",
    link: { href: "/widocznosc-w-ai", tekst: "Sprawdźcie widoczność w AI" },
  },
  {
    haslo: "SPF",
    slug: "spf",
    opis: "Wpis w DNS domeny z listą serwerów, które mogą wysyłać pocztę w jej imieniu. Bez niego maile częściej trafiają do spamu.",
    link: { href: "/audyt-poczty", tekst: "Audyt poczty" },
  },
  {
    haslo: "DKIM",
    slug: "dkim",
    opis: "Cyfrowy podpis wiadomości, który potwierdza, że mail naprawdę wyszedł z Waszej domeny i nikt go nie zmienił po drodze.",
    link: { href: "/audyt-poczty", tekst: "Audyt poczty" },
  },
  {
    haslo: "DMARC",
    slug: "dmarc",
    opis: "Reguła w DNS, która mówi skrzynkom odbiorców, co zrobić z mailem podszywającym się pod domenę. Bez niej każdy może wysłać wiadomość wyglądającą na Waszą.",
    link: {
      href: "/strefa-wiedzy/podszywanie-sie-pod-firmowy-email",
      tekst: "Podszywanie się pod firmowy mail",
    },
  },
  {
    haslo: "Certyfikat SSL",
    slug: "ssl",
    opis: "Plik, który pozwala stronie działać po HTTPS i szyfrować połączenie. Gdy wygaśnie, przeglądarka pokazuje odwiedzającym pełnoekranowe ostrzeżenie.",
    link: { href: "/naprawa-https", tekst: "Naprawa HTTPS" },
  },
  {
    haslo: "Mały ZUS plus",
    slug: "maly-zus-plus",
    opis: "Ulga, w której składki społeczne liczy się od dochodu, a nie od pełnej podstawy. Przysługuje przy przychodzie do 120 tys. zł w poprzednim roku.",
    link: {
      href: "/strefa-wiedzy/maly-zus-plus-kiedy-sie-oplaca",
      tekst: "Kiedy mały ZUS plus się opłaca",
    },
  },
  {
    haslo: "Ryczałt",
    slug: "ryczalt",
    opis: "Podatek od przychodu bez odliczania kosztów, ze stawką zależną od rodzaju działalności. Opłaca się przy niskich kosztach.",
    link: {
      href: "/strefa-wiedzy/ryczalt-czy-liniowy",
      tekst: "Ryczałt czy liniowy",
    },
  },
];
