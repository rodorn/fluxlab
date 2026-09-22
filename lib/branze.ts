import type { ProductCategory } from "@/lib/products";

/**
 * Jedno zrodlo prawdy o branzach, dla ktorych mam osobna strone.
 *
 * Powstalo, bo ten sam wybor branzy potrzebny jest w dwoch miejscach naraz,
 * na stronie glownej i na filarze "Automatyzacja procesow biznesowych", a
 * dwa komplety tych samych tresci rozjechalyby sie przy pierwszej zmianie.
 * Kazda pozycja wskazuje takze filar, do ktorego branza nalezy, i bierze jego
 * nazwe z CATEGORY_LABEL, czyli te sama, ktora stoi w menu i na filtrze
 * katalogu.
 */
export type Branza = {
  klucz: string;
  nazwa: string;
  href: string;
  hrefLabel: string;
  filar: ProductCategory;
  /** Co w tej branzy zjada czas, krotkie zdania na strone glowna. */
  problemy: string[];
  /** Systemy, ktore w tej branzy spinam. */
  systemy: string;
  /** Ten sam mechanizm opisany jednym akapitem, na strone filarowa. */
  czas: string;
  /** Rachunek, ktory czytelnik moze zrobic sam, dzis, bez mojego udzialu. */
  policz: string;
  /** Co tu robie, kiedy wchodze w proces. */
  robie: string;
  /** Darmowe sprawdzenie, ktore dotyka tej branzy wprost. */
  narzedzie: { href: string; label: string };
};

export const BRANZE: Branza[] = [
  {
    klucz: "ecommerce",
    nazwa: "Sklep internetowy",
    href: "/automatyzacja-dla-ecommerce",
    hrefLabel: "Automatyzacja sklepu internetowego",
    filar: "dane",
    problemy: [
      "Stany magazynowe rozjeżdżają się między sklepem a Allegro i ktoś sprzedaje towar, którego nie ma",
      "Zamówienia z kilku kanałów trzeba przeklejać do jednego miejsca",
      "Opisy i zdjęcia produktów wprowadza się ręcznie, po jednym",
    ],
    systemy: "Shopify, WooCommerce, BaseLinker, Allegro",
    czas: "Ten sam towar ma osobny stan magazynowy w sklepie, na Allegro i w programie magazynowym. Każda z tych liczb zmienia się w swoim tempie, więc ktoś je codziennie ręcznie zgrywa, a między jednym zgraniem a drugim sprzedaje się rzeczy, których nie ma.",
    policz:
      "Weź zamówienia z ostatniego miesiąca i policz, ile z nich trzeba było anulować albo dopłacić do wysyłki, bo towaru nie było. Osobno policz, ile minut dziennie zajmuje samo zgrywanie stanów.",
    robie:
      "Stan magazynowy ma jedno źródło prawdy, a pozostałe miejsca z niego czytają. Zamówienie, faktura i etykieta kurierska powstają z tego samego rekordu, więc znika miejsce, w którym dane się rozjeżdżają.",
    narzedzie: {
      href: "/rejestr-cen",
      label: "Sprawdź, czy Wasze przeceny spełniają Omnibusa",
    },
  },
  {
    klucz: "ksiegowosc",
    nazwa: "Biuro rachunkowe",
    href: "/automatyzacja-dla-biur-rachunkowych",
    hrefLabel: "Automatyzacja biura rachunkowego",
    filar: "automatyzacja",
    problemy: [
      "Faktury od klientów przepisuje się z PDF-a do programu księgowego",
      "Każdy klient przysyła dokumenty inaczej i w innym momencie miesiąca",
      "Przy obowiązkowym e-fakturowaniu ilość dokumentów rośnie, a etatów nie przybywa",
    ],
    systemy: "Comarch Optima, Symfonia, enova, KSeF",
    czas: "Dokumenty przychodzą kilkoma kanałami naraz: mailem, przez panel, komunikatorem, w reklamówce. Zanim cokolwiek trafi do programu księgowego, ktoś musi je zebrać, nazwać, przepisać i dopilnować, czego brakuje, a ta praca powtarza się co miesiąc od zera.",
    policz:
      "Policz, ile razy w zeszłym miesiącu ktoś wysłał do klienta przypomnienie o brakującym dokumencie. Pomnóż przez czas potrzebny na ustalenie, czego dokładnie brakuje.",
    robie:
      "Dokumenty wpadają jednym kanałem i same trafiają do programu z rozpoznanymi danymi. Brakujące pozycje wylicza system i to on wysyła przypomnienie, zamiast księgowej.",
    narzedzie: {
      href: "/ksef-integracja",
      label: "Sprawdź za darmo gotowość na KSeF",
    },
  },
  {
    klucz: "agencja",
    nazwa: "Agencja marketingowa",
    href: "/automatyzacja-dla-agencji-marketingowych",
    hrefLabel: "Automatyzacja agencji marketingowej",
    filar: "dane",
    problemy: [
      "Raport dla klienta składa się ręcznie z kilku paneli reklamowych",
      "Wdrożenie nowego klienta to za każdym razem ta sama lista czynności od zera",
      "Nikt nie wie, ile godzin naprawdę zjada obsługa konkretnego abonamentu",
    ],
    systemy: "Google Ads, Meta Ads, GA4, Looker Studio",
    czas: "Raport dla każdego klienta składa się ręcznie z kilku paneli reklamowych i analityki. Przy piętnastu klientach to piętnaście razy ta sama czynność co miesiąc, w terminie, którego nie da się przesunąć, bo wynika z umowy.",
    policz:
      "Policz, ile godzin w zeszłym miesiącu zespół spędził na składaniu raportów, i porównaj to ze stawką, po której te godziny sprzedajecie klientom.",
    robie:
      "Dane z paneli schodzą się same do jednego miejsca, a raport składa się w ustalonym dniu i idzie do klienta bez proszenia. Ta sama definicja liczb obowiązuje każdego klienta.",
    narzedzie: {
      href: "/widocznosc-w-ai",
      label: "Sprawdź, czy modele AI widzą Waszą stronę",
    },
  },
  {
    klucz: "leasing",
    nazwa: "Leasing i finanse",
    href: "/automatyzacja-crm-leasing",
    hrefLabel: "Automatyzacja CRM w leasingu i finansach",
    filar: "automatyzacja",
    problemy: [
      "Wniosek klienta wędruje mailem, a jego status zna tylko osoba, która go prowadzi",
      "Te same dane wpisuje się osobno do CRM i osobno do systemu finansującego",
      "Handlowiec dowiaduje się o decyzji później niż klient",
    ],
    systemy: "Pipedrive, HubSpot, systemy finansujące",
    czas: "Każde zapytanie wymaga sprawdzenia podmiotu w kilku rejestrach, zanim ktokolwiek zacznie liczyć ofertę. Sprawdzenie robi się ręcznie, w kilku zakładkach, a wynik ląduje w notatce, której nie widać ani w raporcie, ani w historii sprawy.",
    policz:
      "Weź dziesięć ostatnich spraw i policz, ile minut minęło od zapytania do pierwszej wyliczonej oferty. Osobno sprawdź, w ilu z nich wynik weryfikacji jest zapisany w CRM, a w ilu tylko w czyjejś głowie.",
    robie:
      "Weryfikacja w rejestrach uruchamia się z rekordu, a jej wynik zapisuje się jako pole, nie jako notatka. Przypisanie sprawy idzie po regionie i produkcie, więc żadna nie czeka na to, aż ktoś ją zauważy.",
    narzedzie: {
      href: "/sprawdz-kontrahenta",
      label: "Sprawdź kontrahenta w rejestrach",
    },
  },
];

/**
 * Drugie klikniecie na stronie filarowej. Branza mowi, co zjada czas, a to
 * mowi, czy jest z czego cokolwiek zbudowac. Pierwsza pozycja celowo konczy
 * sie odpowiedzia odmowna: bez ustalonego ksztaltu danych nie ma czego podac
 * automatowi na wejsciu i uczciwiej jest to powiedziec niz sprzedac wdrozenie.
 */
export type Dane = {
  klucz: string;
  nazwa: string;
  warto: boolean;
  werdykt: string;
  koszt: string;
};

export const DANE: Dane[] = [
  {
    klucz: "arkusz",
    nazwa: "W arkuszu i w mailach",
    warto: false,
    werdykt:
      "Zanim cokolwiek tu automatyzować, dane muszą mieć stały kształt. Arkusz, w którym każdy wpisuje po swojemu, a reszta ustaleń żyje w mailach, nie ma czego podać automatowi na wejściu. Pierwszy krok jest bez mojego udziału: jedna tabela, ustalone kolumny, jedno miejsce na całą firmę. Dopiero na tym da się cokolwiek zbudować.",
    koszt:
      "Koszt: zero, to porządek w danych, nie wdrożenie. Wrócić warto wtedy, kiedy tabela stoi.",
  },
  {
    klucz: "bez-api",
    nazwa: "W programie, który nie ma API",
    warto: true,
    werdykt:
      "Da się, ale drogą okrężną, przez to, co program potrafi wypuścić i przyjąć: eksport do pliku, import, czasem baza pod spodem. Działa i bywa stabilne, tyle że każda aktualizacja programu jest momentem, w którym trzeba to sprawdzić. Mówię o tym przed wyceną, nie po.",
    koszt:
      "Orientacyjnie od 1 500 zł, zależnie od tego, co program wypuszcza. Diagnoza przed wyceną: 0 zł.",
  },
  {
    klucz: "api",
    nazwa: "W systemie, który ma API",
    warto: true,
    werdykt:
      "To najprostszy przypadek. Dane da się czytać i zapisywać wprost, bez plików pośrednich, więc proces działa na bieżąco, a nie raz na dobę. Wąskim gardłem jest tu zwykle decyzja, co ma się dziać, a nie technika.",
    koszt: "Orientacyjnie od 1 500 zł za proces. Diagnoza przed wyceną: 0 zł.",
  },
  {
    klucz: "kilka",
    nazwa: "W kilku systemach, które się nie widzą",
    warto: true,
    werdykt:
      "Tu pracą nie jest automatyzacja pojedynczej czynności, tylko ustalenie, który system ma rację, kiedy dwa podają inną wartość. Bez tej decyzji automat tylko szybciej rozniesie niezgodność. Zaczynam od jednego kierunku przepływu, nie od spinania wszystkiego ze wszystkim naraz.",
    koszt:
      "Orientacyjnie od 2 500 zł za spięcie dwóch systemów. Kolejne kierunki wyceniam osobno.",
  },
];
