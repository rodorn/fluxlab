export type ProductCategory = "www" | "automatyzacja" | "dane";

/**
 * Drugi poziom porządku. Trzy filary to za mało, żeby połapać się w
 * trzydziestu kilku pozycjach: w jednym worku lądowało wdrożenie n8n obok
 * sprawdzenia auta przed zakupem. Grupa mówi, czym dana pozycja jest:
 * wdrożeniem, naprawą czegoś istniejącego, czy jednorazowym raportem.
 */
export type ProductGroup =
  | "wdrozenia"
  | "naprawy"
  | "integracje"
  | "raporty"
  | "budowa"
  | "diagnostyka";

export interface Product {
  name: string;
  tagline: string;
  desc: string;
  price: string;
  href: string;
  cta: string;
  bullets: string[];
  category: ProductCategory;
  grupa: ProductGroup;
  featured?: boolean;
  /** Produkt ma darmowe narzedzie dzialajace wprost na swojej stronie. */
  narzedzie?: boolean;
}

export const CATEGORY_LABEL: Record<ProductCategory, string> = {
  automatyzacja: "Automatyzacja procesów",
  dane: "Integracje i dane",
  www: "Systemy i strony",
};

export const GROUP_LABEL: Record<ProductGroup, string> = {
  wdrozenia: "Wdrożenia",
  naprawy: "Naprawy i audyty",
  integracje: "Integracje systemów",
  raporty: "Raporty na zamówienie",
  budowa: "Budowa i rozwój",
  diagnostyka: "Diagnostyka strony",
};

/**
 * Stala i celowa kolejnosc grup w kazdym filarze: najpierw to, co buduje,
 * potem to, co naprawia, na koncu jednorazowe raporty. Trzymana w jednym
 * miejscu, bo ten sam porzadek obowiazuje na /produkty i na stronach filarow.
 */
export const GROUP_ORDER: ProductGroup[] = [
  "wdrozenia",
  "integracje",
  "budowa",
  "naprawy",
  "diagnostyka",
  "raporty",
];

/** Kolejnosc filarow, ta sama co w menu i na /narzedzia. */
export const CATEGORY_ORDER: ProductCategory[] = [
  "automatyzacja",
  "dane",
  "www",
];

export const GROUP_INTRO: Record<ProductGroup, string> = {
  wdrozenia: "Proces, który dziś ktoś klika ręcznie, zaczyna dziać się sam.",
  naprawy:
    "Coś już działa, ale działa źle albo przestało. Znajduję przyczynę i naprawiamy.",
  integracje:
    "Dwa systemy, które nie rozmawiają ze sobą, zaczynają wymieniać dane.",
  raporty:
    "Publiczne i Wasze własne dane zamienione w jedną decyzję, jednorazowo.",
  budowa: "Strona albo panel, który jest częścią procesu, a nie osobnym bytem.",
  diagnostyka:
    "Konkretna usterka strony, znaleziona i opisana, zwykle w jeden dzień.",
};

export const CATEGORY_INTRO: Record<ProductCategory, string> = {
  www: "Gotowe usługi wokół strony: od ratunku po włamaniu po drobne poprawki i szybkie wdrożenia.",
  automatyzacja:
    "Audyty i naprawy tego, co już masz wdrożone, oraz nowe integracje szyte pod Twój proces.",
  dane: "Raporty, które zamieniają publiczne i Twoje własne dane w jedną decyzję: kupować, sprzedawać, sprawdzić.",
};

export const PRODUCTS: Product[] = [
  // ---------- STRONY WWW ----------
  {
    category: "www",
    name: "Ratunek po włamaniu na stronę",
    tagline: "Zhakowany WordPress albo WooCommerce",
    desc: "Porównujemy pliki Twojej strony z oryginałami prosto z repozytorium WordPressa, więc listę obcych i podmienionych plików mamy w minuty, a nie po godzinach ręcznego szukania. Do tego skan bazy pod wstrzyknięcia i podstawionych administratorów.",
    price: "diagnoza 49 zł",
    href: "/strona-po-wlamaniu",
    grupa: "budowa",
    cta: "Zgłoś włamanie",
    bullets: [
      "raport, którędy weszli, a nie samo posprzątanie",
      "usuwanie spamu SEO i przekierowań na obce strony",
      "zabezpieczenie, żeby backup nie przywrócił backdoora",
    ],
    featured: true,
  },
  {
    category: "www",
    name: "Poprawki i nowe podstrony",
    tagline: "WordPress, Elementor, Greenshift",
    desc: "Drobne zmiany na działającej stronie robione tak, żeby przeżyły aktualizację motywu: style globalne zamiast lokalnych nadpisań i punkty graniczne motywu zamiast sztywnych pikseli.",
    price: "od 99 zł",
    href: "/strony-www",
    grupa: "budowa",
    cta: "Zamów poprawki",
    bullets: [
      "nowa podstrona w obecnym stylu strony",
      "naprawa wyrównań na komórce i desktopie",
      "sekcje zapisane jako wzorce do samodzielnego użycia",
    ],
  },
  {
    category: "www",
    name: "Darmowy audyt techniczny",
    tagline: "Pełny raport od ręki, bez rejestracji",
    desc: "Wpisujesz adres, a automat mierzy szybkość na komputerze i osobno na telefonie, waży każdy plik, sprawdza certyfikat, widoczność w wyszukiwarce, dostęp dla asystentów AI i zabezpieczenia poczty. Wynik to kolejność poprawek z uzasadnieniem i cena naprawy przy każdej pozycji.",
    price: "0 zł",
    href: "/audyt-strony",
    grupa: "diagnostyka",
    cta: "Zrób darmowy audyt",
    narzedzie: true,
    bullets: [
      "osobny pomiar wersji na telefon",
      "kolejność poprawek, nie lista 200 uwag",
      "cena naprawy od razu w raporcie",
    ],
  },
  {
    category: "www",
    name: "Landing z formularzem i płatnością",
    tagline: "Szybkie wdrożenie pod jedną kampanię",
    desc: "Jedna strona sprzedażowa z formularzem i bramką płatniczą, gotowa pod BLIK i przelewy. Zgłoszenie zapisuje się zanim klient przejdzie do płatności, więc nie tracisz danych osób, które zrezygnują w trakcie.",
    price: "od 299 zł",
    href: "/landing-z-platnoscia",
    grupa: "budowa",
    cta: "Zamów landing",
    bullets: [
      "jeden szablon podpięty pod wiele domen",
      "potwierdzenie płatności webhookiem, nie powrotem na stronę",
      "powiadomienie mailem o każdym zgłoszeniu",
    ],
  },

  // ---------- AUTOMATYZACJA ----------
  {
    category: "automatyzacja",
    name: "Panel zwrotów i reklamacji",
    tagline: "Każdy zwrot przechodzi dziś przez czyjeś ręce",
    desc: "Kupujący wpisuje numer zamówienia, wybiera pozycje i powód, dostaje etykietę zwrotną i widzi status, a Ty raz w miesiącu dostajesz zestawienie, które produkty wracają najczęściej i ile Cię to kosztuje. Zamiast kolejki maili z pytaniem, co i gdzie odesłać.",
    price: "od 490 zł",
    href: "/panel-zwrotow",
    grupa: "wdrozenia",
    cta: "Sprawdź swoje zasady zwrotów",
    narzedzie: true,
    bullets: [
      "sprawdzenie zasad zwrotów od ręki, za darmo",
      "audyt przyczyn zwrotów od 490 zł",
      "panel samoobsługowy od 3500 zł",
    ],
  },
  {
    category: "automatyzacja",
    name: "Tańsze automatyzacje",
    tagline: "Rachunek rośnie, a scenariusze te same",
    desc: "Popularne narzędzia liczą nie uruchomienia, tylko pojedyncze kroki, więc rachunek rośnie szybciej niż praca, którą wykonują. Przenosimy te same scenariusze na serwer, który należy do Ciebie, i pilnujemy, żeby działał. Efekt ten sam, koszt stały.",
    price: "od 790 zł",
    href: "/tansze-automatyzacje",
    grupa: "wdrozenia",
    narzedzie: true,
    cta: "Policz swoją oszczędność",
    bullets: [
      "kalkulator oszczędności od ręki na stronie",
      "te same scenariusze, Twój serwer",
      "utrzymanie od 200 zł/mc",
    ],
  },
  {
    category: "www",
    name: "Widoczność w AI",
    tagline: "Czy asystent w ogóle widzi Twoją stronę",
    desc: "Klient coraz częściej pyta asystenta o firmę do konkretnego zadania zamiast wpisywać frazę w wyszukiwarkę. Sprawdzamy siedem warunków, od których zależy, czy Twoja strona może w takiej odpowiedzi wystąpić: dostęp dla robotów, treść bez skryptów, dane uporządkowane, metadane, mapa strony i llms.txt.",
    price: "sprawdzenie za darmo",
    href: "/widocznosc-w-ai",
    grupa: "diagnostyka",
    narzedzie: true,
    cta: "Sprawdź swoją stronę",
    bullets: [
      "wynik od ręki, bez rejestracji",
      "naprawa warunków wstępnych 890 zł",
      "bez obietnic miejsca w odpowiedzi asystenta",
    ],
  },
  {
    category: "dane",
    name: "Integracja z e-Doręczeniami",
    tagline: "Pisma w systemie, który już macie",
    desc: "Skrzynka do doręczeń elektronicznych jest obowiązkowa, ale nikt nie każe obsługiwać jej ręcznie w osobnym panelu. Spinamy ją z Waszym systemem, razem z pobieraniem dowodów doręczenia, bez których cała rzecz nie ma wartości dowodowej.",
    price: "od 3 900 zł",
    href: "/e-doreczenia-integracja",
    grupa: "integracje",
    narzedzie: true,
    cta: "Opisz, czego używacie",
    bullets: [
      "otwarty klient tego API napisany przez nas, do obejrzenia przed decyzją",
      "odbiór pism 3 900 zł, z wysyłką 7 900 zł",
      "kod i dostępy zostają u Was",
    ],
  },
  {
    category: "dane",
    name: "Integracja z KSeF",
    tagline: "Faktury wychodzą tam, gdzie powstają",
    desc: "Krajowy System e-Faktur jest obowiązkowy, ale nikt nie każe przeklejać do niego faktur ręcznie z osobnej aplikacji. Spinamy z nim Wasz system: wysyłka w schemacie FA(3), zapis numeru KSeF i UPO przy dokumencie, pobieranie faktur kosztowych.",
    price: "od 4 900 zł",
    href: "/ksef-integracja",
    grupa: "integracje",
    narzedzie: true,
    cta: "Opisz, w czym fakturujecie",
    bullets: [
      "otwarty klient tego API z trybem demo, do uruchomienia przed decyzją",
      "odbiór faktur kosztowych 4 900 zł, z wystawianiem 9 900 zł",
      "kod i dostępy zostają u Was",
    ],
  },
  {
    category: "dane",
    name: "Integracja CRM z ERP",
    tagline: "Koniec z przepisywaniem w obie strony",
    desc: "Handlowcy pracują w CRM, księgowość i magazyn w ERP, a między nimi stoi człowiek przepisujący dane. Spinamy oba systemy: kontrahenci, dokumenty sprzedaży, stany i ceny, z kolejką ponowień i powiadomieniem, gdy coś nie przejdzie.",
    price: "od 2 900 zł",
    href: "/integracja-crm-z-erp",
    grupa: "integracje",
    cta: "Opisz swoje dwa systemy",
    bullets: [
      "rozpoznanie i lista niedopasowanych kontrahentów za darmo",
      "jeden kierunek 2 900 zł, w obie strony 5 900 zł",
      "kod i dostępy zostają u Ciebie, bez abonamentu za dostęp",
    ],
  },
  {
    category: "automatyzacja",
    name: "Wdrożenie n8n",
    tagline: "Ile to kosztuje, rozbite na pozycje",
    desc: "Licencja, serwer, praca i opieka jako cztery osobne liczby zamiast jednej ceny z zapytania ofertowego. Stawiamy n8n na Twoim serwerze, budujemy przepływy i przekazujemy wszystko razem z dostępami, więc nic nie zostaje zamknięte u nas.",
    price: "od 790 zł",
    href: "/wdrozenie-n8n-cena",
    grupa: "wdrozenia",
    narzedzie: true,
    cta: "Zobacz rozbicie kosztu",
    bullets: [
      "licencja n8n na własnym serwerze: 0 zł",
      "komplet startowy z trzema przepływami: 2 400 zł",
      "opieka 190 zł/mc, rezygnacja z miesiąca na miesiąc",
    ],
  },
  {
    category: "automatyzacja",
    name: "Pogotowie automatyzacji",
    tagline: "Stanęła integracja albo scenariusz",
    desc: "Naprawa cudzych, już wdrożonych automatyzacji: n8n, Make, Zapier, BaseLinker, WooCommerce, Allegro, webhooki i skrypty po poprzednim wykonawcy. Czytamy logi wykonań, znajduję wygasłe poświadczenia i ciche awarie, czyli scenariusze zielone, ale puste.",
    price: "diagnoza 49 zł",
    href: "/pogotowie-automatyzacji",
    grupa: "naprawy",
    cta: "Zgłoś awarię",
    bullets: [
      "odpowiedź do 2 godzin w godzinach pracy",
      "diagnoza płatna z góry, naprawa wyceniana po niej",
      "przejęcie opieki po wykonawcy, który zniknął",
    ],
    featured: true,
  },
  {
    category: "automatyzacja",
    name: "Audyt zmarnowanego budżetu Google Ads",
    tagline: "Odzyskaj pieniądze przepalane na frazy bez konwersji",
    desc: "Analiza raportu wyszukiwanych haseł: ile budżetu idzie na kliknięcia bez efektu, gotowa lista wykluczeń i plan naprawy konta.",
    price: "69 zł",
    href: "/audyt-google-ads",
    grupa: "naprawy",
    cta: "Zamów mini-audyt",
    bullets: [
      "zwrot, jeśli znajdziemy mniej niż 500 zł/mc do odzyskania",
      "gotowa lista wykluczających słów kluczowych",
      "plan naprawy konta krok po kroku",
    ],
  },
  {
    category: "automatyzacja",
    name: "Audyt poczty firmowej",
    tagline: "SPF, DKIM i DMARC w jednym raporcie",
    desc: "Automat sprawdza, czy Twoja domena jest poprawnie zabezpieczona i czy ktoś może podszyć się pod Twój adres. To najczęstszy powód, dla którego firmowe maile lądują w spamie.",
    price: "od 19 zł",
    href: "/audyt-poczty",
    grupa: "naprawy",
    narzedzie: true,
    cta: "Sprawdź swoją pocztę",
    bullets: [
      "czy ktoś może wysyłać maile jako Ty",
      "dlaczego Twoje wiadomości trafiają do spamu",
      "gotowe rekordy do wklejenia w panelu DNS",
      "raport 19 zł, ekspresowa naprawa 299 zł",
    ],
  },
  {
    category: "automatyzacja",
    name: "Audyt chatbota",
    tagline: "Sprawdź, co Twój asystent AI mówi klientom",
    desc: "Zadaję Twojemu botowi 150 realnych pytań klienta i zderzam każdą odpowiedź z prawdą sklepu: cennikiem, regulaminem i zasadami zwrotów. Wyłapuję halucynacje i obietnice, którymi firma jest związana.",
    price: "69 zł",
    href: "/audyt-chatbota",
    grupa: "naprawy",
    cta: "Zamów audyt bota",
    bullets: [
      "lista odpowiedzi sprzecznych z regulaminem",
      "kosztowne obietnice wypowiedziane przez bota",
      "zestaw testów do powtórzenia po zmianie modelu",
    ],
  },
  {
    category: "automatyzacja",
    name: "Integracje API",
    tagline: "Spięcie systemów, które nie chcą rozmawiać",
    desc: "Łączymy sklep, CRM, ERP i hurtownie tak, żeby dane przechodziły same: synchronizacja przyrostowa, obsługa limitów API i logi, które pokazują cichy błąd zanim zepsuje dane.",
    price: "od 1 500 zł",
    href: "/integracje-api",
    grupa: "wdrozenia",
    cta: "Opisz integrację",
    bullets: [
      "synchronizacja różnicowa zamiast pełnych przebiegów",
      "odporność na limity i chwilowe awarie API",
      "zakres wyceny do wyklikania na stronie, bez zapytania ofertowego",
    ],
  },
  {
    category: "automatyzacja",
    name: "Automatyzacja raportowania",
    tagline: "Koniec z ręcznym sklejaniem Excela",
    desc: "Raport, który składa się sam i ląduje na mailu o ustalonej godzinie, zamiast zjadać komuś pół dnia w miesiącu.",
    price: "od 790 zł",
    href: "/automatyzacja-raportowania",
    grupa: "wdrozenia",
    cta: "Zamów automatyzację",
    bullets: [
      "dane z wielu źródeł w jednym zestawieniu",
      "wysyłka cykliczna bez udziału człowieka",
      "alert, gdy liczby wyglądają podejrzanie",
      "zakres wyceny do wyklikania na stronie, bez zapytania ofertowego",
    ],
  },

  // ---------- DANE ----------
  {
    category: "dane",
    name: "Sprawdź auto przed zakupem",
    tagline: "Raport due-diligence dla kupującego",
    desc: "Wklejasz link do oferty z Otomoto lub OLX, a dostajesz benchmark ceny wobec podobnych aut, listę typowych usterek modelu, wykryte red-flagi i gotowy skrypt negocjacji.",
    price: "od 5 zł",
    href: "/sprawdz-auto",
    grupa: "raporty",
    cta: "Zamów sprawdzenie auta",
    bullets: [
      "price-check 5 zł, pełny raport 15 zł",
      "benchmark ceny i wykrywanie cofniętego licznika",
      "argumenty do negocjacji ceny",
    ],
    featured: true,
  },
  {
    category: "www",
    name: "Kontrola wersji językowej",
    tagline: "Angielska strona, na której zostały polskie napisy",
    desc: "Wersja obcojęzyczna prawie zawsze zostaje niedokończona: przyciski i całe akapity zostają po polsku, a wyszukiwarka nie dostaje znaczników, po których rozpoznaje wersje językowe. Sprawdzamy to fragment po fragmencie i oddajemy listę miejsc do podmiany.",
    price: "od 99 zł",
    href: "/kontrola-jezykow",
    grupa: "diagnostyka",
    narzedzie: true,
    cta: "Sprawdź swoją wersję obcojęzyczną",
    bullets: [
      "lista polskich fragmentów z cytatem i adresem",
      "brakujące znaczniki wersji językowych",
      "monitoring nowych podstron od 99 zł/mc",
    ],
  },
  {
    category: "www",
    name: "Klient nie wie, komu płaci",
    tagline: "Księgowość kupującego sprawdza to przed przelewem",
    desc: "Zanim firma zapłaci, ustala sprzedawcę w wykazie podatników VAT, a przy większych kwotach także to, czy numer konta należy do tego samego podmiotu. Strona bez NIP-u sprawia, że ten test nie ma z czego wyjść. Zdarza się też, że w stopce stoi NIP zupełnie innej spółki.",
    price: "od 290 zł",
    href: "/dane-sprzedawcy",
    grupa: "diagnostyka",
    cta: "Sprawdź swoją stronę",
    narzedzie: true,
    bullets: [
      "sprawdzenie w wykazie podatników za darmo",
      "gotowa stopka i znacznik do wklejenia",
      "pilnowanie wykazu od 120 zł/mc",
    ],
  },
  {
    category: "www",
    name: "Podstrony niewidoczne dla wyszukiwarki",
    tagline: "Robot dostaje listę albo zgaduje",
    desc: "Mapa strony to lista adresów, którą wyszukiwarka pobiera jednym zapytaniem. Bez niej podstrony podlinkowane głęboko bywają odkrywane miesiącami. Z nią, ale wypełnioną adresami usuniętych ofert, robot zużywa limit odwiedzin na błędy. Sprawdzamy jedno i drugie.",
    price: "od 240 zł",
    href: "/mapa-strony",
    grupa: "diagnostyka",
    cta: "Sprawdź swoją mapę strony",
    narzedzie: true,
    bullets: [
      "sprawdzenie mapy i robots.txt za darmo",
      "przegląd wszystkich adresów, nie próbki",
      "pilnowanie od 99 zł/mc",
    ],
  },
  {
    category: "www",
    name: "Strona pod dwoma adresami naraz",
    tagline: "Wyszukiwarka liczy to jako dwie różne strony",
    desc: "Adres z www i bez www zwracają tę samą treść, żaden nie przekierowuje na drugi. Siła linków prowadzących do firmy dzieli się wtedy na dwa adresy zamiast sumować na jednym, a wyszukiwarka sama wybiera, którą wersję pokazać, często nie tę z wizytówki i faktur. W przeglądarce nie widać tego wcale.",
    price: "od 190 zł",
    href: "/podwojny-adres",
    grupa: "diagnostyka",
    cta: "Sprawdź swój adres",
    narzedzie: true,
    bullets: [
      "sprawdzenie czterech wersji adresu za darmo",
      "reguła przekierowania pod Twój serwer",
      "kontrolne sprawdzenie po wdrożeniu",
    ],
  },
  {
    category: "www",
    name: "Domena zapisana na obcą firmę",
    tagline: "Właścicielem adresu bywa ten, kto robił stronę",
    desc: "W rejestrze wpisany jest jeden podmiot i to on decyduje o domenie, a więc o stronie i całej poczcie firmowej. Jeśli jest nim dawny wykonawca, przy konflikcie firma traci wszystko naraz. Sprawdzamy, kto figuruje w rejestrze, i prowadzimy przeniesienie na właściwą spółkę.",
    price: "od 490 zł",
    href: "/wlasnosc-domeny",
    grupa: "diagnostyka",
    cta: "Sprawdź swoją domenę",
    narzedzie: true,
    bullets: [
      "sprawdzenie abonenta i terminu za darmo",
      "przeniesienie domeny na Twoją firmę",
      "pilnowanie terminu od 49 zł/mc",
    ],
  },
  {
    category: "www",
    name: "Strona niewidoczna w wyszukiwarce",
    tagline: "Kod strony każe Google jej nie pokazywać",
    desc: "Jedno polecenie zostawione po wersji roboczej potrafi wyłączyć całą witrynę z wyników wyszukiwania. Właściciel tego nie widzi, bo wchodzi z zakładki, a firma znika z internetu dla każdego, kto jej szuka. Sprawdzamy trzy miejsca, w których taka blokada siedzi, i zdejmuję ją.",
    price: "od 190 zł",
    href: "/widocznosc-w-google",
    grupa: "diagnostyka",
    cta: "Sprawdź swoją widoczność",
    narzedzie: true,
    bullets: [
      "sprawdzenie od ręki, za darmo",
      "wskazanie dokładnego miejsca blokady",
      "monitoring, żeby nie wróciła, od 39 zł/mc",
    ],
  },
  {
    category: "www",
    name: "Naprawa ostrzeżenia o stronie",
    tagline: "Przeglądarka straszy Twoich klientów",
    desc: "Gdy certyfikat wygasł albo należy do hostingu, a nie do Twojej domeny, przeglądarka pokazuje pełnoekranowe ostrzeżenie i większość odwiedzających zawraca. Sprawdzamy, co dokładnie jest nie tak, i naprawiamy warstwę szyfrowania razem z przekierowaniami.",
    price: "od 190 zł",
    href: "/naprawa-https",
    grupa: "diagnostyka",
    narzedzie: true,
    cta: "Sprawdź swoją stronę",
    bullets: [
      "diagnoza przyczyny, nie ogólnik o certyfikacie",
      "naprawa zwykle w jeden dzień roboczy",
      "pilnowanie ważności certyfikatu od 39 zł/mc",
    ],
  },
  {
    category: "www",
    name: "Rejestr cen w sklepie",
    tagline: "Obniżka bez wymaganej informacji to ryzyko kary",
    desc: "Sprawdzamy każdą przecenioną pozycję w sklepie i wskazuję te, przy których brakuje obowiązkowej informacji o najniższej cenie z 30 dni przed obniżką. Skan robimy z zewnątrz, bez dostępu do panelu. Osobno prowadzimy codzienny zapis cen, czyli dowód, którego dziś nikt nie zbiera.",
    price: "od 49 zł",
    href: "/rejestr-cen",
    grupa: "diagnostyka",
    narzedzie: true,
    cta: "Sprawdź swój sklep",
    bullets: [
      "lista przecen bez wymaganej informacji, z linkami",
      "raport PDF do przekazania obsłudze sklepu",
      "codzienny zapis cen jako materiał dowodowy",
    ],
  },
  {
    category: "dane",
    name: "Audyt faktur kurierskich",
    tagline: "Dopłata paliwowa to prawie połowa ceny bazowej",
    desc: "Stawka dopłaty paliwowej zmienia się co dwa tygodnie i zależy od progu wagowego, a korekty wagowe przewoźnik dolicza po swojemu. Przechodzę przez wszystkie linie faktur, wyłapuję pozycje policzone niezgodnie z umową i oddajemy gotową treść reklamacji.",
    price: "od 290 zł",
    href: "/audyt-kurierski",
    grupa: "raporty",
    narzedzie: true,
    cta: "Sprawdź pozycję z faktury",
    bullets: [
      "sprawdzenie jednej pozycji od ręki na stronie",
      "pełny audyt albo prowizja od odzyskanej kwoty",
      "gotowa treść reklamacji do przewoźnika",
    ],
  },
  {
    category: "dane",
    name: "Analiza lokalizacji pod punkt",
    tagline: "Zanim podpiszesz najem na pięć lat",
    desc: "Ilu naprawdę masz konkurentów w zasięgu dojazdu, ilu mieszkańców przypada na jeden taki punkt i jak to wypada na tle sąsiednich gmin. Mapy pokazują pinezki, ale nie mówią, czy rynek jest już obsadzony. Wniosek jest jednoznaczny: otwierać, negocjować czynsz albo odpuścić.",
    price: "od 190 zł",
    href: "/analiza-lokalizacji",
    grupa: "raporty",
    narzedzie: true,
    cta: "Sprawdź okolicę",
    bullets: [
      "konkurenci w promieniu 1, 3 i 5 km",
      "nasycenie na 10 tysięcy mieszkańców",
      "porównanie z sąsiednimi gminami",
    ],
  },
  {
    category: "dane",
    name: "Dłużnik znika z rejestru",
    tagline: "Trzy miesiące od obwieszczenia i po spółce",
    desc: "Sąd wszczyna z urzędu postępowanie o rozwiązanie spółki bez likwidacji, publikuje obwieszczenie w Monitorze Sądowym i daje trzy miesiące na sprzeciw. Potem podmiot znika z rejestru razem z Twoją należnością. Zawiadomienia nikt nie wysyła, więc pilnujemy tego za Ciebie.",
    price: "od 99 zł/mc",
    href: "/czujka-rejestrowa",
    grupa: "raporty",
    cta: "Sprawdź kontrahenta",
    narzedzie: true,
    bullets: [
      "sprawdzenie jednego podmiotu za darmo",
      "skan wsteczny całego portfela od 290 zł",
      "alert w dniu obwieszczenia",
    ],
  },
  {
    category: "dane",
    name: "Sprawdzony kontrahent",
    tagline: "Zanim wyślesz zaliczkę",
    desc: "Werdykt o konkretnej firmie złożony automatem z publicznych źródeł: Biała Lista VAT, KRS, rejestr zadłużonych, wiek domeny i listy ostrzeżeń. Pojedynczy check zajmuje 30 sekund, ale dopiero złożenie tego razem mówi, czy to firma widmo.",
    price: "od 9 zł",
    href: "/sprawdz-kontrahenta",
    grupa: "raporty",
    narzedzie: true,
    cta: "Sprawdź firmę",
    bullets: [
      "werdykt zielony, żółty albo czerwony z uzasadnieniem",
      "ostrzeżenie, gdy konto jest spoza wykazu VAT",
      "szybki check 9 zł, pełny raport 29 zł",
    ],
  },
  {
    category: "dane",
    name: "ImportRadar DE→PL",
    tagline: "Które auta z Niemiec realnie się opłaca",
    desc: "Skanujemy żywe oferty z DE i NL i wskazujemy konkretne egzemplarze, które zarabiają po odjęciu wszystkich kosztów sprowadzenia, oraz modele z kosztownymi wadami, których lepiej unikać.",
    price: "od 10 zł",
    href: "/import-radar",
    grupa: "raporty",
    cta: "Znajdź opłacalne auto",
    bullets: [
      "ranking marży netto na realnych ofertach",
      "akcyza wyliczona dla konkretnego pojazdu",
      "ostrzeżenia przed modelami z drogimi usterkami",
    ],
  },
  {
    category: "dane",
    name: "Audyt marż sklepu",
    tagline: "Które bestsellery realnie tracą pieniądze",
    desc: "Przysyłasz eksport sprzedaży i ceny zakupu, a dostajesz prawdziwy zysk na sztuce po prowizjach, zwrotach i dopłatach do wysyłki. Panel sprzedażowy pokazuje obrót, a nie to, co zostaje na czysto.",
    price: "49 zł",
    href: "/audyt-marz",
    grupa: "raporty",
    cta: "Zamów audyt marż",
    bullets: [
      "lista produktów sprzedawanych pod kreską",
      "martwy stok i zamrożony w nim kapitał",
      "priorytety, co dokupić, a co odstawić",
    ],
  },
  {
    category: "dane",
    name: "Kontrola paliwa we flocie",
    tagline: "Tankowania zestawione z trasą",
    desc: "Eksport z kart paliwowych zestawiony z przebiegami i trasą. Sam portal karty pokazuje listę transakcji, ale dopiero zestawienie z trasą wyłapuje tankowanie do kanistra, obce auto albo klon karty.",
    price: "od 99 zł",
    href: "/kontrola-paliwa",
    grupa: "raporty",
    cta: "Zamów kontrolę floty",
    bullets: [
      "lista transakcji do wyjaśnienia z kwotą straty",
      "darmowy skan trzech pojazdów za jeden miesiąc",
      "gotowe reguły blokad na przyszłość",
    ],
  },
  {
    category: "dane",
    name: "Scraping danych na zamówienie",
    tagline: "Dane, których nie da się wyeksportować",
    desc: "Zbieramy dane z serwisów, które nie mają eksportu ani API: oferty, ceny, katalogi, listy firm. Dostajesz gotowy arkusz albo zasilaną cyklicznie bazę, bez duplikatów.",
    price: "od 49 zł",
    href: "/scraping-danych",
    grupa: "integracje",
    cta: "Opisz, czego szukasz",
    bullets: [
      "deduplikacja i walidacja zamiast surowego zrzutu",
      "jednorazowo albo cyklicznie",
      "darmowa próbka kilkunastu rekordów na start",
    ],
  },
];

export function productsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

/**
 * Trzeci poziom porzadku w katalogu: ile to kosztuje na wejsciu.
 *
 * Ceny w katalogu sa pisane po ludzku ("od 99 zl", "diagnoza 49 zl",
 * "od 3 900 zl", "wycena po diagnozie"), bo tak czyta je odwiedzajacy.
 * Do filtrowania i do znacznikow schema.org potrzebna jest ta sama kwota
 * jako liczba, wiec wyciagamy ja w jednym miejscu, zamiast trzymac obok
 * napisu drugie pole, ktore z czasem rozjedzie sie z pierwszym.
 */
export type PriceBand = "do50" | "do300" | "do1000" | "od1000" | "wycena";

export const PRICE_BAND_LABEL: Record<PriceBand, string> = {
  do50: "Do 50 zł",
  do300: "51 do 300 zł",
  do1000: "301 do 1000 zł",
  od1000: "Powyżej 1000 zł",
  wycena: "Wycena po diagnozie",
};

export const PRICE_BAND_ORDER: PriceBand[] = [
  "do50",
  "do300",
  "do1000",
  "od1000",
  "wycena",
];

export const PRICE_BAND_INTRO: Record<PriceBand, string> = {
  do50: "Jednorazowe sprawdzenia i raporty, które kupuje się bez zastanowienia.",
  do300:
    "Pojedyncza usterka strony albo jeden audyt, zamknięty zwykle w kilka dni.",
  do1000:
    "Wdrożenie jednego procesu albo panelu, liczone od podanej kwoty w górę.",
  od1000: "Integracje dwóch systemów, gdzie zakres ustala się przed startem.",
  wycena:
    "Praca, której zakresu nie da się podać z góry. Kwota pada po diagnozie.",
};

/**
 * Kwota wejscia z ceny zapisanej slownie. Zwraca null, gdy cena zalezy od
 * diagnozy i zadnej liczby po prostu nie ma. "za darmo" to zero, a nie brak
 * ceny: darmowe sprawdzenie ma kwote, tylko rowna zeru.
 *
 * Rozpoznawane zapisy pilnuje `scripts/spojnosc.mjs`, zeby nowa cena w
 * nieznanym formacie nie wpadla po cichu do zlego przedzialu.
 */
export function cenaWejscia(price: string): number | null {
  if (/darmo|bezpłatn/i.test(price)) return 0;
  // Tysiace sa pisane ze spacja ("3 900 zl"), wiec najpierw ja usuwamy,
  // inaczej z ceny wyszlaby trojka.
  const liczba = price.replace(/(\d)[\s  ](?=\d)/g, "$1").match(/\d+/);
  return liczba ? Number(liczba[0]) : null;
}

export function pasmoCeny(price: string): PriceBand {
  const kwota = cenaWejscia(price);
  if (kwota === null) return "wycena";
  if (kwota <= 50) return "do50";
  if (kwota <= 300) return "do300";
  if (kwota <= 1000) return "do1000";
  return "od1000";
}
