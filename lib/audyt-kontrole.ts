/**
 * Wspólne kontrole audytu: jedna strona i cała strona korzystają z tych samych
 * reguł. Wszystko statycznie, bez przeglądarki: czytamy HTML, nagłówki, DNS i
 * kilka znanych adresów. Ten sam stan strony daje ten sam wynik.
 *
 * Kontrola zwraca znalezisko { klucz, szczegol }. Tytuł, skutek, waga i koszt
 * naprawy stoją w KATALOGU, w jednym miejscu, więc oba audyty opisują ten sam
 * problem tymi samymi słowami.
 *
 * Zakres w katalogu mówi, gdzie kontrola ma sens:
 *  - "strona": z samego HTML jednej podstrony (audyt całości robi ją na każdej),
 *  - "witryna": z cech zebranych ze wszystkich podstron (np. czy gdzieś jest NIP),
 *  - "domena": raz na domenę (nagłówki, pliki na serwerze, DNS).
 */

import dns from "dns/promises";

import { odmien } from "./odmiana";

export type WagaKontroli = "wazne" | "drobne";
export type ObszarKontroli =
  | "dostepnosc"
  | "szybkosc"
  | "mobile"
  | "seo"
  | "bezpieczenstwo"
  | "prawo"
  | "poczta"
  | "zapytania";

export type OpisKontroli = {
  tytul: string;
  skutek: string;
  waga: WagaKontroli;
  obszar: ObszarKontroli;
  koszt: number;
  dostep: string;
  zakres: "strona" | "witryna" | "domena";
};

export type Znalezisko = { klucz: string; szczegol: string };

const KOD = "dostęp do kodu strony";
const SERWER = "konfiguracja serwera";
const DNS = "dostęp do DNS domeny";
const PANEL = "dostęp do panelu strony";

export const KATALOG: Record<string, OpisKontroli> = {
  // --- D: bezpieczeństwo ---------------------------------------------------
  brak_hsts: {
    tytul: "Brak nagłówka HSTS",
    skutek:
      "Przeglądarka może przy pierwszym wejściu połączyć się bez szyfrowania, a ktoś w tej samej sieci Wi-Fi może to przechwycić.",
    waga: "wazne",
    obszar: "bezpieczenstwo",
    koszt: 80,
    dostep: SERWER,
    zakres: "domena",
  },
  naglowki_bezpieczenstwa: {
    tytul: "Brakuje nagłówków bezpieczeństwa",
    skutek:
      "Bez nich łatwiej osadzić Twoją stronę w cudzej ramce albo wstrzyknąć na nią obcy skrypt, a skanery bezpieczeństwa oceniają ją nisko.",
    waga: "drobne",
    obszar: "bezpieczenstwo",
    koszt: 150,
    dostep: SERWER,
    zakres: "domena",
  },
  ciasteczka_bez_flag: {
    tytul: "Ciasteczka bez flag Secure, HttpOnly albo SameSite",
    skutek:
      "Ciasteczko sesji bez tych flag łatwiej wykraść albo podsunąć w cudzym żądaniu, co przy panelu logowania oznacza przejęcie konta.",
    waga: "drobne",
    obszar: "bezpieczenstwo",
    koszt: 100,
    dostep: SERWER,
    zakres: "domena",
  },
  odsloniete_pliki: {
    tytul: "Pliki z hasłami albo kodem są publicznie dostępne",
    skutek:
      "Każdy może pobrać te pliki, a w nich zwykle są hasła do bazy danych albo cały kod strony. To prosta droga do przejęcia strony.",
    waga: "wazne",
    obszar: "bezpieczenstwo",
    koszt: 150,
    dostep: SERWER,
    zakres: "domena",
  },
  wp_uzytkownicy: {
    tytul: "WordPress pokazuje loginy użytkowników",
    skutek:
      "Atakujący zna już połowę danych logowania i zgaduje tylko hasło, więc próby włamania są dużo skuteczniejsze.",
    waga: "wazne",
    obszar: "bezpieczenstwo",
    koszt: 100,
    dostep: PANEL,
    zakres: "domena",
  },
  wp_xmlrpc: {
    tytul: "Włączony xmlrpc.php",
    skutek:
      "Przez ten plik można zgadywać hasła setkami w jednym zapytaniu i obciążać serwer, a prawie żadna strona go dziś nie potrzebuje.",
    waga: "drobne",
    obszar: "bezpieczenstwo",
    koszt: 80,
    dostep: PANEL,
    zakres: "domena",
  },
  wersja_widoczna: {
    tytul: "Strona podaje wersje oprogramowania",
    skutek:
      "Numer wersji pozwala automatom od razu dobrać znane luki do Twojej strony, zamiast zgadywać.",
    waga: "drobne",
    obszar: "bezpieczenstwo",
    koszt: 80,
    dostep: SERWER,
    zakres: "domena",
  },
  stary_wordpress: {
    tytul: "Nieaktualny WordPress",
    skutek:
      "Starsze wersje mają opisane publicznie luki, które automaty wykorzystują masowo, więc strona może zostać przejęta bez Twojej wiedzy.",
    waga: "wazne",
    obszar: "bezpieczenstwo",
    koszt: 200,
    dostep: PANEL,
    zakres: "domena",
  },
  stare_jquery: {
    tytul: "Stara biblioteka jQuery ze znanymi lukami",
    skutek:
      "Wersje jQuery sprzed 3.5 mają opisane luki pozwalające wstrzyknąć skrypt, co skanery bezpieczeństwa wskazują od razu.",
    waga: "drobne",
    obszar: "bezpieczenstwo",
    koszt: 150,
    dostep: KOD,
    zakres: "domena",
  },
  listowanie_katalogow: {
    tytul: "Serwer pokazuje listę plików w katalogu",
    skutek:
      "Każdy może przejrzeć wszystkie wgrane pliki, także te, których nigdzie nie podlinkowałeś, na przykład umowy czy kopie zapasowe.",
    waga: "wazne",
    obszar: "bezpieczenstwo",
    koszt: 80,
    dostep: SERWER,
    zakres: "domena",
  },
  blank_bez_noopener: {
    tytul: "Linki w nowej karcie bez rel=noopener",
    skutek:
      "Otwarta strona może podmienić Twoją kartę na fałszywą, a starsze przeglądarki nie chronią przed tym same.",
    waga: "drobne",
    obszar: "bezpieczenstwo",
    koszt: 50,
    dostep: KOD,
    zakres: "strona",
  },
};

export const KATALOG_E: Record<string, OpisKontroli> = {
  // --- E: prawo, zaufanie, sprzedaż ---------------------------------------
  brak_polityki: {
    tytul: "Brak linku do polityki prywatności",
    skutek:
      "Zbierasz dane z formularza albo z analityki bez widocznej informacji, co z nimi robisz, a za to RODO przewiduje kary i skargi do UODO.",
    waga: "wazne",
    obszar: "prawo",
    koszt: 200,
    dostep: PANEL,
    zakres: "witryna",
  },
  sledzenie_bez_zgody: {
    tytul: "Skrypty śledzące bez widocznej zgody na cookies",
    skutek:
      "Analityka albo piksel reklamowy startują, zanim odwiedzający się zgodzi, co narusza prawo telekomunikacyjne i RODO, a Google Ads bez zgody przestaje liczyć konwersje.",
    waga: "wazne",
    obszar: "prawo",
    koszt: 250,
    dostep: KOD,
    zakres: "witryna",
  },
  brak_telefonu: {
    tytul: "Brak klikalnego numeru telefonu",
    skutek:
      "Na telefonie klient nie zadzwoni jednym dotknięciem, tylko musi przepisać numer, a część osób w tym miejscu rezygnuje.",
    waga: "drobne",
    obszar: "zapytania",
    koszt: 50,
    dostep: PANEL,
    zakres: "witryna",
  },
  brak_emaila: {
    tytul: "Brak klikalnego adresu e-mail",
    skutek:
      "Kto woli napisać niż dzwonić, musi szukać adresu albo go przepisywać, więc część zapytań w ogóle nie powstaje.",
    waga: "drobne",
    obszar: "zapytania",
    koszt: 50,
    dostep: PANEL,
    zakres: "witryna",
  },
  brak_nip: {
    tytul: "Na stronie nie widać NIP firmy",
    skutek:
      "Klient nie sprawdzi, z kim ma do czynienia, a firma bez danych rejestrowych wygląda mniej wiarygodnie, zwłaszcza przy pierwszym zamówieniu.",
    waga: "drobne",
    obszar: "prawo",
    koszt: 50,
    dostep: PANEL,
    zakres: "witryna",
  },
  brak_formularza: {
    tytul: "Brak formularza kontaktowego",
    skutek:
      "Klient, który nie chce dzwonić ani otwierać poczty, nie ma jak zostawić zapytania, więc odchodzi do konkurencji.",
    waga: "drobne",
    obszar: "zapytania",
    koszt: 300,
    dostep: KOD,
    zakres: "witryna",
  },
  formularz_404: {
    tytul: "Formularz wysyła dane pod adres, który nie istnieje",
    skutek:
      "Klient wypełnia formularz, klika wyślij i trafia na błąd, a zapytanie przepada, zanim ktokolwiek je zobaczy.",
    waga: "wazne",
    obszar: "zapytania",
    koszt: 200,
    dostep: KOD,
    zakres: "witryna",
  },
  sklep_bez_regulaminu: {
    tytul: "Sklep bez linku do regulaminu",
    skutek:
      "Sprzedaż przez internet wymaga regulaminu dostępnego przed zakupem. Bez niego klient może odstąpić od umowy na dłużej, a UOKiK może nałożyć karę.",
    waga: "wazne",
    obszar: "prawo",
    koszt: 300,
    dostep: PANEL,
    zakres: "witryna",
  },
  brak_omnibus: {
    tytul: "Przeceny bez najniższej ceny z 30 dni",
    skutek:
      "Przy każdej obniżce prawo wymaga podania najniższej ceny z ostatnich 30 dni. Bez niej grozi kara UOKiK do 10% obrotu.",
    waga: "wazne",
    obszar: "prawo",
    koszt: 300,
    dostep: KOD,
    zakres: "witryna",
  },
};
Object.assign(KATALOG, KATALOG_E);

export const KATALOG_A: Record<string, OpisKontroli> = {
  // --- A: SEO i treść ------------------------------------------------------
  brak_lang: {
    tytul: "Strona nie podaje języka",
    skutek:
      "Wyszukiwarka i czytnik ekranu muszą zgadywać język, więc tekst bywa czytany z obcym akcentem, a strona rzadziej trafia do wyników w tym języku.",
    waga: "drobne",
    obszar: "seo",
    koszt: 50,
    dostep: KOD,
    zakres: "strona",
  },
  viewport: {
    tytul: "Podstrona bez znacznika viewport",
    skutek:
      "Na telefonie podstrona wyświetla się jak pomniejszona wersja komputerowa, więc trzeba ją powiększać palcami, a Google obniża jej ocenę.",
    waga: "wazne",
    obszar: "mobile",
    koszt: 50,
    dostep: KOD,
    zakres: "strona",
  },
  naglowki_przeskok: {
    tytul: "Nagłówki przeskakują poziom",
    skutek:
      "Wyszukiwarka i czytnik ekranu czytają strukturę strony z poziomów nagłówków, a przeskok sprawia, że trudniej zrozumieć, co jest częścią czego.",
    waga: "drobne",
    obszar: "seo",
    koszt: 50,
    dostep: KOD,
    zakres: "strona",
  },
  malo_tresci: {
    tytul: "Mniej niż 150 słów treści",
    skutek:
      "Tak krótka podstrona rzadko odpowiada na pytanie klienta, więc Google pokazuje ją nisko albo wcale, a odwiedzający nie znajduje powodu, żeby zostać.",
    waga: "drobne",
    obszar: "seo",
    koszt: 150,
    dostep: PANEL,
    zakres: "strona",
  },
  h1_duplikat: {
    tytul: "Ten sam nagłówek H1 na kilku podstronach",
    skutek:
      "Podstrony wyglądają dla wyszukiwarki na powielone i konkurują ze sobą, zamiast każda zbierać ruch na swój temat.",
    waga: "drobne",
    obszar: "seo",
    koszt: 100,
    dostep: PANEL,
    zakres: "strona",
  },
  og_niepelne: {
    tytul: "Niepełny podgląd przy udostępnianiu (Open Graph)",
    skutek:
      "Link wklejony na Facebooka, LinkedIna albo do komunikatora pokazuje się bez obrazka albo opisu, więc rzadziej ktoś w niego kliknie.",
    waga: "drobne",
    obszar: "seo",
    koszt: 80,
    dostep: KOD,
    zakres: "strona",
  },
  og_obraz: {
    tytul: "Obrazek podglądu (og:image) nie działa albo jest za mały",
    skutek:
      "Przy udostępnieniu linku obrazek się nie pokaże albo będzie rozmyty, a to on najczęściej decyduje o kliknięciu.",
    waga: "drobne",
    obszar: "seo",
    koszt: 80,
    dostep: PANEL,
    zakres: "domena",
  },
  brak_favicony: {
    tytul: "Brak ikony strony (favicon)",
    skutek:
      "W karcie przeglądarki, w zakładkach i w wynikach Google przy adresie stoi pusta ikona, przez co strona wygląda na niedokończoną.",
    waga: "drobne",
    obszar: "seo",
    koszt: 50,
    dostep: KOD,
    zakres: "domena",
  },
  hreflang_bledy: {
    tytul: "Błędy w oznaczeniach wersji językowych (hreflang)",
    skutek:
      "Google może pokazać klientowi z Polski wersję w innym języku albo zignorować oznaczenia, a wersje językowe zaczną ze sobą konkurować.",
    waga: "drobne",
    obszar: "seo",
    koszt: 150,
    dostep: KOD,
    zakres: "strona",
  },
  jsonld_blad: {
    tytul: "Błąd w danych uporządkowanych (JSON-LD)",
    skutek:
      "Google odrzuca cały blok z błędem, więc gwiazdki, ceny czy dane firmy z tego bloku nie pojawią się w wynikach.",
    waga: "wazne",
    obszar: "seo",
    koszt: 100,
    dostep: KOD,
    zakres: "strona",
  },
  adres_format: {
    tytul: "Adres podstrony z wielkimi literami, podkreśleniem albo za długi",
    skutek:
      "Takie adresy łatwo przepisać z błędem, a wielkie i małe litery dają dla wyszukiwarki dwa różne adresy tej samej treści.",
    waga: "drobne",
    obszar: "seo",
    koszt: 100,
    dostep: PANEL,
    zakres: "strona",
  },
  tekst_szablonu: {
    tytul: "Tekst z szablonu albo lorem ipsum",
    skutek:
      "Klient widzi, że strona jest niedokończona, i traci zaufanie, a wyszukiwarka uznaje taką treść za bezwartościową.",
    waga: "wazne",
    obszar: "seo",
    koszt: 100,
    dostep: PANEL,
    zakres: "strona",
  },
  stary_rok: {
    tytul: "Nieaktualny rok w stopce",
    skutek:
      "Stary rok przy © sugeruje, że nikt strony nie prowadzi, a klient zaczyna się zastanawiać, czy firma jeszcze działa.",
    waga: "drobne",
    obszar: "prawo",
    koszt: 30,
    dostep: PANEL,
    zakres: "strona",
  },
  obrazy_404: {
    tytul: "Obrazy, których nie ma na serwerze",
    skutek:
      "W miejscu zdjęcia klient widzi pustą ramkę albo ikonę błędu, co wygląda na zaniedbaną stronę.",
    waga: "wazne",
    obszar: "seo",
    koszt: 100,
    dostep: PANEL,
    zakres: "strona",
  },
  linki_do_przekierowan: {
    tytul: "Linki wewnętrzne prowadzą przez przekierowanie",
    skutek:
      "Każde kliknięcie to dodatkowe oczekiwanie, a wyszukiwarka traci czas na adresy pośrednie zamiast na właściwe podstrony.",
    waga: "drobne",
    obszar: "seo",
    koszt: 100,
    dostep: PANEL,
    zakres: "strona",
  },
  poza_mapa: {
    tytul: "Podstrony, których nie ma w mapie witryny",
    skutek:
      "Wyszukiwarka dowiaduje się o nich tylko z linków, więc trafiają do wyników później albo wcale.",
    waga: "drobne",
    obszar: "seo",
    koszt: 100,
    dostep: PANEL,
    zakres: "strona",
  },
  robots_blokuje_mape: {
    tytul: "robots.txt blokuje adresy z mapy witryny",
    skutek:
      "Mapa mówi wyszukiwarce, żeby te podstrony odwiedziła, a robots.txt jej tego zabrania, więc nie trafią do wyników.",
    waga: "wazne",
    obszar: "seo",
    koszt: 100,
    dostep: SERWER,
    zakres: "strona",
  },
};
Object.assign(KATALOG, KATALOG_A);

export const KATALOG_B: Record<string, OpisKontroli> = {
  // --- B: wydajność --------------------------------------------------------
  obrazy_ciezkie: {
    tytul: "Obrazy cięższe niż 300 kB",
    skutek:
      "Każdy taki obraz to na telefonie osobna sekunda albo kilka czekania, a te same zdjęcia da się zwykle zmniejszyć kilkukrotnie bez widocznej różnicy.",
    waga: "wazne",
    obszar: "szybkosc",
    koszt: 150,
    dostep: PANEL,
    zakres: "domena",
  },
  obrazy_stary_format: {
    tytul: "Obrazy JPG i PNG bez wersji WebP albo AVIF",
    skutek:
      "Nowsze formaty ważą zwykle o jedną trzecią mniej przy tej samej jakości, więc strona ładuje się dłużej, niż musi.",
    waga: "drobne",
    obszar: "szybkosc",
    koszt: 200,
    dostep: KOD,
    zakres: "strona",
  },
  obrazy_bez_wymiarow: {
    tytul: "Obrazy bez podanej szerokości i wysokości",
    skutek:
      "Treść przeskakuje w dół, gdy obraz się doczyta, więc klient traci miejsce, w którym czytał, albo klika nie w to, co chciał.",
    waga: "drobne",
    obszar: "szybkosc",
    koszt: 100,
    dostep: KOD,
    zakres: "strona",
  },
  brak_lazy_dalszych: {
    tytul: "Obrazy z dołu strony ładują się od razu",
    skutek:
      "Przeglądarka pobiera zdjęcia, do których klient może nigdy nie przewinąć, i przez to później pokazuje to, co widać na początku.",
    waga: "drobne",
    obszar: "szybkosc",
    koszt: 80,
    dostep: KOD,
    zakres: "strona",
  },
  skrypty_blokujace: {
    tytul: "Skrypty w nagłówku wstrzymują wyświetlanie",
    skutek:
      "Przeglądarka nie pokaże niczego, dopóki nie pobierze i nie uruchomi tych skryptów, więc klient dłużej patrzy na pusty ekran.",
    waga: "drobne",
    obszar: "szybkosc",
    koszt: 150,
    dostep: KOD,
    zakres: "strona",
  },
  waga_js: {
    tytul: "Strona pobiera dużo JavaScriptu",
    skutek:
      "Na słabszym telefonie samo uruchomienie skryptów trwa kilka sekund, w tym czasie strona nie reaguje na dotyk.",
    waga: "wazne",
    obszar: "szybkosc",
    koszt: 300,
    dostep: KOD,
    zakres: "domena",
  },
  zewnetrzne_skrypty: {
    tytul: "Skrypty z wielu obcych domen",
    skutek:
      "Każda domena to osobne połączenie i osobne ryzyko: gdy któraś zwolni albo padnie, Twoja strona czeka razem z nią.",
    waga: "drobne",
    obszar: "szybkosc",
    koszt: 150,
    dostep: KOD,
    zakres: "domena",
  },
  kompresja_zasobow: {
    tytul: "Skrypty i style bez kompresji",
    skutek:
      "Pliki tekstowe skompresowane ważą kilka razy mniej, więc bez kompresji klient pobiera kilka razy więcej niż trzeba.",
    waga: "wazne",
    obszar: "szybkosc",
    koszt: 100,
    dostep: SERWER,
    zakres: "domena",
  },
  fonty_bez_display: {
    tytul: "Fonty bez font-display",
    skutek:
      "Dopóki font się nie pobierze, tekst jest niewidoczny, więc na wolnym łączu klient widzi pustą stronę z samymi obrazkami.",
    waga: "drobne",
    obszar: "szybkosc",
    koszt: 80,
    dostep: KOD,
    zakres: "domena",
  },
};
Object.assign(KATALOG, KATALOG_B);

export const KATALOG_C: Record<string, OpisKontroli> = {
  // --- C: dostępność -------------------------------------------------------
  pola_bez_etykiety: {
    tytul: "Pola formularza bez etykiety",
    skutek:
      "Czytnik ekranu nie powie, co wpisać, a po kliknięciu w pole podpowiedź znika, więc część osób nie wypełni formularza poprawnie.",
    waga: "wazne",
    obszar: "dostepnosc",
    koszt: 100,
    dostep: KOD,
    zakres: "strona",
  },
  bez_nazwy: {
    tytul: "Przyciski i linki bez nazwy (same ikony)",
    skutek:
      "Czytnik ekranu odczyta tylko „przycisk” albo „link”, bez informacji, dokąd prowadzi, a Google nie wie, o czym jest odnośnik.",
    waga: "wazne",
    obszar: "dostepnosc",
    koszt: 100,
    dostep: KOD,
    zakres: "strona",
  },
  linki_ogolne: {
    tytul: "Linki „kliknij tutaj” albo „więcej” bez kontekstu",
    skutek:
      "Z samego napisu nie wiadomo, dokąd prowadzi link, więc klient klika mniej chętnie, a wyszukiwarka nie wie, o czym jest strona docelowa.",
    waga: "drobne",
    obszar: "dostepnosc",
    koszt: 80,
    dostep: PANEL,
    zakres: "strona",
  },
  iframe_bez_title: {
    tytul: "Osadzone ramki bez tytułu",
    skutek:
      "Osoba korzystająca z czytnika ekranu nie wie, co jest w ramce (mapa, film, formularz), i musi wejść do środka, żeby się dowiedzieć.",
    waga: "drobne",
    obszar: "dostepnosc",
    koszt: 50,
    dostep: KOD,
    zakres: "strona",
  },
  duplikaty_id: {
    tytul: "Ten sam identyfikator (id) użyty kilka razy",
    skutek:
      "Etykiety, kotwice i skrypty trafiają w niewłaściwy element, więc kliknięcie w etykietę albo link do sekcji może prowadzić w złe miejsce.",
    waga: "drobne",
    obszar: "dostepnosc",
    koszt: 80,
    dostep: KOD,
    zakres: "strona",
  },
  niski_kontrast: {
    tytul: "Za słaby kontrast tekstu",
    skutek:
      "Jasny tekst na jasnym tle albo ciemny na ciemnym trudno przeczytać, zwłaszcza na telefonie w słońcu i osobom słabiej widzącym. Norma WCAG 2.2 AA wymaga 4,5:1 dla zwykłego tekstu i 3:1 dla dużego.",
    waga: "wazne",
    obszar: "dostepnosc",
    koszt: 100,
    dostep: KOD,
    zakres: "strona",
  },
  tabindex_dodatni: {
    tytul: "Wymuszona kolejność przechodzenia klawiszem Tab",
    skutek:
      "Osoba poruszająca się klawiaturą skacze po stronie w nieoczekiwanej kolejności i łatwo gubi miejsce, w którym była.",
    waga: "drobne",
    obszar: "dostepnosc",
    koszt: 50,
    dostep: KOD,
    zakres: "strona",
  },
};
Object.assign(KATALOG, KATALOG_C);

const DNS_DOMENY = "dostęp do DNS domeny";
export const KATALOG_F: Record<string, OpisKontroli> = {
  // --- F: domena i poczta --------------------------------------------------
  brak_mx: {
    tytul: "Domena nie ma rekordu MX",
    skutek:
      "Wiadomość wysłana na adres w tej domenie nie dojdzie, więc jeśli klienci piszą na taki adres, ich maile przepadają.",
    waga: "drobne",
    obszar: "poczta",
    koszt: 80,
    dostep: DNS_DOMENY,
    zakres: "domena",
  },
  brak_dkim: {
    tytul: "Nie znaleźliśmy podpisu DKIM",
    skutek:
      "Bez podpisu Gmail i Outlook częściej wrzucają Twoje wiadomości do spamu, a Gmail odrzuca masowe wysyłki bez DKIM.",
    waga: "drobne",
    obszar: "poczta",
    koszt: 120,
    dostep: DNS_DOMENY,
    zakres: "domena",
  },
  brak_mta_sts: {
    tytul: "Brak MTA-STS",
    skutek:
      "Poczta przychodząca może zostać przesłana bez szyfrowania, jeśli ktoś po drodze podsunie serwerom gorsze połączenie.",
    waga: "drobne",
    obszar: "poczta",
    koszt: 150,
    dostep: DNS_DOMENY,
    zakres: "domena",
  },
  brak_caa: {
    tytul: "Brak rekordu CAA",
    skutek:
      "Każdy urząd certyfikacji może wystawić certyfikat dla Twojej domeny, więc łatwiej o fałszywy certyfikat do podszywania się pod stronę.",
    waga: "drobne",
    obszar: "bezpieczenstwo",
    koszt: 50,
    dostep: DNS_DOMENY,
    zakres: "domena",
  },
  brak_dnssec: {
    tytul: "Domena bez DNSSEC",
    skutek:
      "Odpowiedzi DNS nie są podpisane, więc ktoś w sieci może podsunąć fałszywy adres serwera i przekierować klientów albo pocztę.",
    waga: "drobne",
    obszar: "bezpieczenstwo",
    koszt: 100,
    dostep: "panel rejestratora domeny",
    zakres: "domena",
  },
  domena_wygasa: {
    tytul: "Domena wkrótce wygasa",
    skutek:
      "Po wygaśnięciu przestaje działać i strona, i poczta, a wolną domenę może przejąć ktoś inny.",
    waga: "wazne",
    obszar: "dostepnosc",
    koszt: 0,
    dostep: "panel rejestratora domeny",
    zakres: "domena",
  },
};
Object.assign(KATALOG, KATALOG_F);

export const KATALOG_J: Record<string, OpisKontroli> = {
  // --- języki i pisownia ---------------------------------------------------
  jezyk_obce_bloki: {
    tytul: "Fragmenty w innym języku niż strona",
    skutek:
      "Klient z zagranicy trafia na tekst, którego nie rozumie, i uznaje wersję za niedokończoną, a wyszukiwarka nie wie, w jakim języku pokazać stronę.",
    waga: "wazne",
    obszar: "seo",
    koszt: 200,
    dostep: PANEL,
    zakres: "strona",
  },
  brak_tlumaczenia: {
    tytul: "Wersja językowa bez tłumaczenia",
    skutek:
      "Pod adresem obcojęzycznym jest prawie ten sam tekst co w wersji polskiej, więc klient z zagranicy nic nie zrozumie, a Google uzna obie strony za duplikat.",
    waga: "wazne",
    obszar: "seo",
    koszt: 400,
    dostep: PANEL,
    zakres: "strona",
  },
  jezyk_lang_niezgodny: {
    tytul: "Atrybut lang nie zgadza się z językiem treści",
    skutek:
      "Przeglądarka proponuje tłumaczenie nie tej strony, czytnik ekranu czyta tekst z obcym akcentem, a Google może pokazać ją nie tym klientom.",
    waga: "drobne",
    obszar: "seo",
    koszt: 50,
    dostep: KOD,
    zakres: "strona",
  },
  jezyk_meta: {
    tytul: "Tytuł, opis, alt albo przyciski w złym języku",
    skutek:
      "W wynikach Google i na przyciskach klient widzi tekst w innym języku niż reszta strony, co wygląda na niedokończone tłumaczenie.",
    waga: "drobne",
    obszar: "seo",
    koszt: 100,
    dostep: PANEL,
    zakres: "strona",
  },
  literowki: {
    tytul: "Literówki w tekście",
    skutek:
      "Błąd w tekście od razu rzuca się w oczy i obniża zaufanie do firmy, zwłaszcza gdy klient porównuje kilka ofert.",
    waga: "drobne",
    obszar: "prawo",
    koszt: 50,
    dostep: PANEL,
    zakres: "strona",
  },
};
Object.assign(KATALOG, KATALOG_J);

/* ------------------------------------------------------------------ */
/* Pomocnicze                                                           */
/* ------------------------------------------------------------------ */

const UA =
  "Mozilla/5.0 (compatible; FluxlabAudyt/1.0; +https://fluxlab.pl/audyt)";
const CZAS_MS = 6_000;
const UA_PRZEGLADARKA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36 (compatible; FluxlabAudyt/1.0; +https://fluxlab.pl/audyt)";

type Odp = { status: number; url: string; naglowki: Headers; tekst: string };

/** Pobranie z limitem czasu i wielkości. Null przy błędzie sieci. */
export async function zapytaj(
  adres: string,
  opcje: {
    metoda?: string;
    przekierowania?: boolean;
    maxZnakow?: number;
    cialo?: string;
    ua?: string;
  } = {},
): Promise<Odp | null> {
  try {
    const odp = await fetch(adres, {
      method: opcje.metoda ?? "GET",
      redirect: opcje.przekierowania === false ? "manual" : "follow",
      signal: AbortSignal.timeout(CZAS_MS),
      headers: {
        "user-agent": opcje.ua ?? UA,
        "accept-encoding": "gzip, deflate, br",
      },
      body: opcje.cialo,
    });
    let tekst = "";
    if (opcje.metoda !== "HEAD") {
      tekst = await odp.text();
      if (opcje.maxZnakow) tekst = tekst.slice(0, opcje.maxZnakow);
    }
    return {
      status: odp.status,
      url: odp.url || adres,
      naglowki: odp.headers,
      tekst,
    };
  } catch {
    return null;
  }
}

const ENCJE: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  copy: "©",
};
export function dekoduj(s: string): string {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) =>
      String.fromCodePoint(parseInt(h, 16)),
    )
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&(\w+);/g, (m, n) => ENCJE[n] ?? m);
}

export type Tag = {
  tag: string;
  atr: Map<string, string>;
  poz: number;
  koniec: number;
};

/** Znaczniki otwierające z atrybutami, bez treści skryptów i komentarzy. */
export function znaczniki(html: string, nazwy?: string[]): Tag[] {
  const czysty = bezSkryptow(html, true);
  const wynik: Tag[] = [];
  const re =
    /<([a-zA-Z][\w:-]*)((?:\s+[^\s"'>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]+))?)*)\s*\/?>/g;
  for (const m of czysty.matchAll(re)) {
    const tag = m[1].toLowerCase();
    if (nazwy && !nazwy.includes(tag)) continue;
    const atr = new Map<string, string>();
    for (const a of m[2].matchAll(
      /([^\s"'>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g,
    )) {
      const n = a[1].toLowerCase();
      if (!atr.has(n)) atr.set(n, dekoduj(a[2] ?? a[3] ?? a[4] ?? ""));
    }
    const poz = m.index ?? 0;
    wynik.push({ tag, atr, poz, koniec: poz + m[0].length });
  }
  return wynik;
}

/** HTML bez komentarzy i treści skryptów (tagi skryptów zostają, puste). */
export function bezSkryptow(html: string, zostawTagi = false): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(
      /<(script|style|template|noscript)\b([^>]*)>[\s\S]*?<\/\1\s*>/gi,
      (_, t, a) => (zostawTagi ? `<${t}${a}></${t}>` : " "),
    );
}

export function tekstWidoczny(html: string): string {
  return dekoduj(
    bezSkryptow(html)
      .replace(/<(svg)\b[\s\S]*?<\/svg>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function krotko(s: string, ile = 70): string {
  return s.length > ile ? s.slice(0, ile) + "..." : s;
}

function lista(x: string[], ile = 5): string {
  return (
    x.slice(0, ile).join(", ") +
    (x.length > ile ? ` i ${x.length - ile} innych` : "")
  );
}

function porownajWersje(a: string, b: string): number {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d) return d;
  }
  return 0;
}

/* ------------------------------------------------------------------ */
/* Kontrole jednej podstrony (z HTML, bez sieci)                         */
/* ------------------------------------------------------------------ */

export function kontroleStrony(html: string, adres: string): Znalezisko[] {
  const z: Znalezisko[] = [];
  const tagi = znaczniki(html);
  let host = "";
  try {
    host = new URL(adres).hostname.replace(/^www\./, "");
  } catch {
    /* adres bez hosta */
  }


  // --- A: SEO i treść ---
  if (!/<html\b[^>]*\blang\s*=\s*["']?[a-z]/i.test(html))
    z.push({ klucz: "brak_lang", szczegol: "Znacznik <html> nie ma atrybutu lang." });
  if (!tagi.some((t) => t.tag === "meta" && (t.atr.get("name") ?? "").toLowerCase() === "viewport"))
    z.push({ klucz: "viewport", szczegol: "Brak <meta name=\"viewport\">." });

  const naglowki = [...bezSkryptow(html).matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({
    poziom: Number(m[1]),
    tekst: dekoduj(m[2].replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim(),
  }));
  for (let i = 1; i < naglowki.length; i++) {
    if (naglowki[i].poziom > naglowki[i - 1].poziom + 1) {
      z.push({
        klucz: "naglowki_przeskok",
        szczegol: `H${naglowki[i - 1].poziom} → H${naglowki[i].poziom} przy „${krotko(naglowki[i].tekst, 50)}”`,
      });
      break;
    }
  }

  const tekst = tekstWidoczny(html);
  const slow = tekst.split(" ").filter((w) => /\p{L}{2,}/u.test(w)).length;
  if (slow < 150) z.push({ klucz: "malo_tresci", szczegol: `${slow} ${odmien(slow, "słowo", "słowa", "słów")}` });

  const meta = (nazwa: string) =>
    tagi.find((t) => t.tag === "meta" && ((t.atr.get("property") ?? t.atr.get("name") ?? "").toLowerCase() === nazwa))?.atr.get("content");
  const brakOg = ["og:title", "og:description", "og:image"].filter((n) => !meta(n));
  if (brakOg.length) z.push({ klucz: "og_niepelne", szczegol: `Brakuje: ${brakOg.join(", ")}` });

  const hreflang = tagi.filter((t) => t.tag === "link" && t.atr.has("hreflang"));
  if (hreflang.length) {
    const bledy: string[] = [];
    const kody = hreflang.map((t) => t.atr.get("hreflang") ?? "");
    const zle = kody.filter((k) => !/^(x-default|[a-z]{2,3}(-[a-z]{4})?(-([a-z]{2}|\d{3}))?)$/i.test(k));
    if (zle.length) bledy.push(`niepoprawne kody: ${lista(zle, 3)}`);
    if (!kody.some((k) => k.toLowerCase() === "x-default")) bledy.push("brak x-default");
    const bez = (u: string) => u.replace(/[?#].*$/, "").replace(/\/$/, "");
    const wlasny = hreflang.some((t) => {
      try {
        return bez(new URL(t.atr.get("href") ?? "", adres).toString()) === bez(adres);
      } catch {
        return false;
      }
    });
    if (!wlasny) bledy.push("brak wskazania samej siebie");
    if (bledy.length) z.push({ klucz: "hreflang_bledy", szczegol: bledy.join(", ") });
  }

  const zleLd: string[] = [];
  for (const m of html.matchAll(/<script\b[^>]*type\s*=\s*["']?application\/ld\+json["']?[^>]*>([\s\S]*?)<\/script>/gi)) {
    const tresc = m[1].replace(/^\s*(<!--|\/\*\s*<!\[CDATA\[\s*\*\/)/, "").replace(/(-->|\/\*\s*\]\]>\s*\*\/)\s*$/, "").trim();
    if (!tresc) continue;
    try {
      JSON.parse(tresc);
    } catch (e) {
      zleLd.push(krotko(String((e as Error).message), 80));
    }
  }
  if (zleLd.length)
    z.push({ klucz: "jsonld_blad", szczegol: `${zleLd.length} ${odmien(zleLd.length, "blok nie daje", "bloki nie dają", "bloków nie daje")} się odczytać: ${zleLd[0]}` });

  try {
    const u = new URL(adres);
    const sciezka = decodeURIComponent(u.pathname);
    const uwagi: string[] = [];
    if (/[A-ZĄĆĘŁŃÓŚŹŻ]/.test(sciezka)) uwagi.push("wielkie litery");
    if (sciezka.includes("_")) uwagi.push("podkreślenie");
    if (adres.length > 100)
      uwagi.push(`${adres.length} ${odmien(adres.length, "znak", "znaki", "znaków")}`);
    if (uwagi.length) z.push({ klucz: "adres_format", szczegol: uwagi.join(", ") });
  } catch {
    /* zły adres */
  }

  const szablon = tekst.match(/lorem ipsum|hello world!?|witaj,? świecie!?|przykładowa strona|sample page|just another wordpress site|kolejna witryna oparta na wordpressie|to jest przykładowa strona/i);
  if (szablon) z.push({ klucz: "tekst_szablonu", szczegol: `„${szablon[0]}”` });

  const lata = [...tekst.matchAll(/(?:©|\(c\)|copyright)\s*(?:by\s+)?(\d{4})(?:\s*[-–]\s*(\d{4}))?/gi)].flatMap((m) =>
    [m[1], m[2]].filter(Boolean).map(Number),
  ).filter((r) => r > 1990 && r < 2100);
  if (lata.length) {
    const teraz = new Date();
    const rok = teraz.getFullYear() - (teraz.getMonth() === 0 ? 1 : 0);
    const max = Math.max(...lata);
    if (max < rok) z.push({ klucz: "stary_rok", szczegol: `W stopce © ${max}` });
  }

  // --- B: wydajność ---
  const obrazy = tagi.filter((t) => t.tag === "img" && t.atr.has("src") && !/^data:/i.test(t.atr.get("src") ?? ""));
  // Obraz rozciągnięty w ramce (position: absolute) nie przesuwa układu.
  const bezWymiarow = obrazy.filter(
    (t) =>
      (!t.atr.has("width") || !t.atr.has("height")) &&
      t.atr.get("data-nimg") !== "fill" &&
      !/position\s*:\s*(absolute|fixed)/i.test(t.atr.get("style") ?? ""),
  );
  if (bezWymiarow.length)
    z.push({
      klucz: "obrazy_bez_wymiarow",
      szczegol: `${bezWymiarow.length} z ${obrazy.length} ${odmien(obrazy.length, "obrazu", "obrazów", "obrazów")}, np. ${krotko(bezWymiarow[0].atr.get("src") ?? "", 60)}`,
    });
  const dalsze = obrazy.slice(2).filter((t) => (t.atr.get("loading") ?? "").toLowerCase() !== "lazy");
  if (dalsze.length >= 3)
    z.push({ klucz: "brak_lazy_dalszych", szczegol: `${dalsze.length} ${odmien(dalsze.length, "obraz", "obrazy", "obrazów")} poza pierwszymi dwoma bez loading="lazy"` });
  // Pozycje znaczników liczone są w HTML bez treści skryptów, tak jak tutaj.
  const czysty = bezSkryptow(html, true);
  const nowoczesne: [number, number][] = [];
  for (const m of czysty.matchAll(/<picture\b[\s\S]*?<\/picture>/gi))
    if (/type=["']image\/(webp|avif)/i.test(m[0]))
      nowoczesne.push([m.index ?? 0, (m.index ?? 0) + m[0].length]);
  const wPicture = (poz: number) => nowoczesne.some(([a, b]) => poz > a && poz < b);
  const stare = obrazy.filter((t) => {
    const src = t.atr.get("src") ?? "";
    if (!/\.(jpe?g|png)(\?|#|$)/i.test(src)) return false;
    if (/\/_next\/image|\/cdn-cgi\/image|[?&](format|fm|auto)=|\.webp|\.avif/i.test(src + " " + (t.atr.get("srcset") ?? ""))) return false;
    return !wPicture(t.poz);
  });
  if (stare.length)
    z.push({
      klucz: "obrazy_stary_format",
      szczegol: `${stare.length} ${odmien(stare.length, "obraz", "obrazy", "obrazów")}, np. ${krotko((stare[0].atr.get("src") ?? "").split("/").pop() ?? "", 60)}`,
    });
  const glowa = czysty.split(/<\/head>/i)[0];
  const blokujace = znaczniki(glowa, ["script"]).filter(
    (t) =>
      t.atr.has("src") &&
      !t.atr.has("async") &&
      !t.atr.has("defer") &&
      !t.atr.has("nomodule") &&
      (t.atr.get("type") ?? "").toLowerCase() !== "module",
  );
  if (blokujace.length)
    z.push({
      klucz: "skrypty_blokujace",
      szczegol: `${blokujace.length} ${odmien(blokujace.length, "skrypt", "skrypty", "skryptów")} bez async ani defer, np. ${krotko((blokujace[0].atr.get("src") ?? "").split("/").pop() ?? "", 60)}`,
    });

  // --- C: dostępność ---
  {
    const bezSvg = czysty.replace(/<svg\b[\s\S]*?<\/svg>/gi, (m) => " ".repeat(m.length));
    const etykietyDla = new Set(tagi.filter((t) => t.tag === "label" && t.atr.get("for")).map((t) => t.atr.get("for")!));
    const wLabelu = (poz: number) => {
      const p = czysty.lastIndexOf("<label", poz);
      if (p < 0) return false;
      const k = czysty.indexOf("</label", p);
      return k < 0 || k > poz;
    };
    const opisane = (t: Tag) =>
      !!(t.atr.get("aria-label")?.trim() || t.atr.get("aria-labelledby")?.trim() || t.atr.get("title")?.trim());
    const ukryte = (t: Tag) =>
      t.atr.has("hidden") || t.atr.get("aria-hidden") === "true" || /display\s*:\s*none/i.test(t.atr.get("style") ?? "");
    const pola = tagi.filter(
      (t) =>
        (t.tag === "select" || t.tag === "textarea" ||
          (t.tag === "input" && !/^(hidden|submit|button|reset|image)$/i.test(t.atr.get("type") ?? "text"))) &&
        !ukryte(t),
    );
    const bezEtykiety = pola.filter(
      (t) => !opisane(t) && !(t.atr.get("id") && etykietyDla.has(t.atr.get("id")!)) && !wLabelu(t.poz),
    );
    if (bezEtykiety.length)
      z.push({
        klucz: "pola_bez_etykiety",
        szczegol: `${bezEtykiety.length} ${odmien(bezEtykiety.length, "pole", "pola", "pól")}, np. ${bezEtykiety
          .slice(0, 3)
          .map((t) => `${t.tag}${t.atr.get("name") ? ` name=${t.atr.get("name")}` : ""}${t.atr.get("placeholder") ? ` „${krotko(t.atr.get("placeholder")!, 30)}”` : ""}`)
          .join(", ")}`,
      });

    const tresc = (t: Tag) => {
      const k = czysty.indexOf(`</${t.tag}`, t.koniec);
      return k < 0 ? "" : czysty.slice(t.koniec, k);
    };
    const maNazwe = (t: Tag) => {
      if (opisane(t)) return true;
      const w = tresc(t);
      if (dekoduj(w.replace(/<svg\b[\s\S]*?<\/svg>/gi, " ").replace(/<[^>]+>/g, " ")).trim()) return true;
      if (/<img\b[^>]*\balt\s*=\s*["'][^"']+["']/i.test(w)) return true;
      if (/<svg\b[\s\S]*?<title>[^<]+</i.test(w)) return true;
      if (/aria-label\s*=\s*["'][^"']+["']/i.test(w)) return true;
      return false;
    };
    const bezNazwy = tagi.filter(
      (t) => ((t.tag === "a" && t.atr.has("href")) || t.tag === "button") && !ukryte(t) && !maNazwe(t),
    );
    if (bezNazwy.length)
      z.push({
        klucz: "bez_nazwy",
        szczegol: `${bezNazwy.length} ${odmien(bezNazwy.length, "element", "elementy", "elementów")}, np. ${bezNazwy
          .slice(0, 3)
          .map((t) => (t.tag === "a" ? `link do ${krotko(t.atr.get("href") ?? "", 50)}` : `button${t.atr.get("class") ? ` .${t.atr.get("class")!.split(/\s+/)[0]}` : ""}`))
          .join(", ")}`,
      });

    const ogolne = new Set<string>();
    for (const t of tagi) {
      if (t.tag !== "a" || !t.atr.has("href") || opisane(t)) continue;
      const napis = dekoduj(tresc(t).replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim().replace(/[.»›→!…:]+$/u, "").trim();
      if (/^(kliknij( tutaj| tu)?|tutaj|tu|więcej|czytaj (dalej|więcej)|zobacz( więcej)?|dowiedz się więcej|sprawdź|link|here|click here|read more|more|learn more)$/i.test(napis))
        ogolne.add(napis.toLowerCase());
    }
    if (ogolne.size) z.push({ klucz: "linki_ogolne", szczegol: [...ogolne].map((x) => `„${x}”`).join(", ") });

    const ramki = tagi.filter((t) => t.tag === "iframe" && !t.atr.get("title")?.trim() && !ukryte(t));
    if (ramki.length)
      z.push({
        klucz: "iframe_bez_title",
        szczegol: `${ramki.length} ${odmien(ramki.length, "ramka", "ramki", "ramek")}, np. ${krotko(ramki[0].atr.get("src") ?? "bez adresu", 60)}`,
      });

    const licznik = new Map<string, number>();
    for (const t of znaczniki(bezSvg)) {
      const id = t.atr.get("id");
      if (id) licznik.set(id, (licznik.get(id) ?? 0) + 1);
    }
    const powtorzone = [...licznik].filter(([, n]) => n > 1).map(([id, n]) => `${id} (${n}x)`);
    if (powtorzone.length)
      z.push({ klucz: "duplikaty_id", szczegol: `${powtorzone.length} ${odmien(powtorzone.length, "identyfikator", "identyfikatory", "identyfikatorów")}, np. ${lista(powtorzone, 3)}` });

    const dodatnie = tagi.filter((t) => Number(t.atr.get("tabindex") ?? 0) > 0);
    if (dodatnie.length)
      z.push({ klucz: "tabindex_dodatni", szczegol: `${dodatnie.length} ${odmien(dodatnie.length, "element", "elementy", "elementów")} z tabindex większym od 0` });
  }

  // D: target=_blank bez noopener (do obcych domen)
  const blank = tagi.filter((t) => {
    if (t.tag !== "a" || (t.atr.get("target") ?? "").toLowerCase() !== "_blank")
      return false;
    if (/\bnoopener\b|\bnoreferrer\b/i.test(t.atr.get("rel") ?? ""))
      return false;
    try {
      const u = new URL(t.atr.get("href") ?? "", adres);
      return (
        /^https?:$/.test(u.protocol) &&
        u.hostname.replace(/^www\./, "") !== host
      );
    } catch {
      return false;
    }
  });
  if (blank.length)
    z.push({
      klucz: "blank_bez_noopener",
      szczegol: `${blank.length} ${odmien(blank.length, "link", "linki", "linków")} do innych stron, np. ${lista(
        blank.map((t) => krotko(t.atr.get("href") ?? "")),
        2,
      )}`,
    });

  return z;
}

/* ------------------------------------------------------------------ */
/* Cechy witryny (E): zbierane z każdej podstrony, oceniane razem       */
/* ------------------------------------------------------------------ */

export type Cechy = {
  polityka: boolean;
  telefon: boolean;
  email: boolean;
  nip: boolean;
  formularz: boolean;
  sklep: boolean;
  regulamin: boolean;
  przecena: boolean;
  omnibus: boolean;
  sledzenie: string[];
  zgoda: boolean;
  /** Adresy, pod które wysyłają formularze (tylko w obrębie domeny). */
  akcje: string[];
};

const SLEDZENIE: [string, RegExp][] = [
  ["Google Tag Manager", /googletagmanager\.com\/gtm\.js|GTM-[A-Z0-9]{4,}/],
  ["Google Analytics", /googletagmanager\.com\/gtag\/js|google-analytics\.com\/(analytics|ga)\.js/],
  ["piksel Meta", /connect\.facebook\.net\/[^"']*fbevents|fbq\(\s*['"]init/],
  ["Hotjar", /static\.hotjar\.com|hotjar\.com\/c\/hotjar/],
  ["Microsoft Clarity", /clarity\.ms\/tag/],
  ["piksel TikTok", /analytics\.tiktok\.com/],
  ["LinkedIn Insight", /snap\.licdn\.com/],
];
const ZGODA =
  /cookiebot|cookieyes|cookie-law-info|complianz|cmplz|onetrust|usercentrics|iubenda|termly|klaro|osano|consentmanager|borlabs|cookie-notice|moove_gdpr|gdpr-cookie|cookiefirst|didomi|quantcast|axeptio|tarteaucitron|cookieconsent|cookie-consent|cookie_consent|cookiebanner|cookie-banner|cc-window|silktide|cookiehub|cookie-script|termsfeed/i;

export function cechyStrony(html: string, adres: string): Cechy {
  const tagi = znaczniki(html, ["a", "form", "link"]);
  const tekst = tekstWidoczny(html);
  const linki = tagi.filter((t) => t.tag === "a");
  const zLinkow = (re: RegExp) =>
    linki.some((t) => {
      const h = t.atr.get("href") ?? "";
      const napis = html.slice(t.koniec, html.indexOf("</a", t.koniec)).replace(/<[^>]+>/g, " ");
      return re.test(h) || re.test(dekoduj(napis)) || re.test(t.atr.get("title") ?? "");
    });
  let host = "";
  try {
    host = new URL(adres).hostname.replace(/^www\./, "");
  } catch {
    /* bez hosta */
  }
  // Formularz kontaktowy: ma pole na wiadomość, e-mail albo telefon.
  // Wyszukiwarka i newsletter z jednym polem się nie liczą.
  const formularze = [...bezSkryptow(html).matchAll(/<form\b([^>]*)>([\s\S]*?)<\/form>/gi)];
  // Pole kontaktu rozpoznajemy po typie, ale też po nazwie, autocomplete albo
  // podpowiedzi, bo wiele stron (np. carmore.pl) ma e-mail i telefon jako
  // type="text" z name="email" / name="phone".
  const POLE_KONTAKTU =
    /<input\b[^>]*(?:type=["']?(?:email|tel)\b|(?:name|id|autocomplete|placeholder)=["'][^"']*(?:e-?mail|phone|tel|telefon)[^"']*["'])/i;
  const widocznePola = (f: string) =>
    (f.match(/<(input|textarea|select)\b[^>]*>/gi) ?? []).filter(
      (t) => !/type=["']?(hidden|checkbox|radio|submit|button)\b|display:\s*none|class=["'][^"']*\bhidden\b/i.test(t),
    ).length;
  const kontaktowe = formularze.filter(
    (m) => /<textarea\b/i.test(m[2]) || (POLE_KONTAKTU.test(m[2]) && widocznePola(m[2]) >= 2),
  );
  const akcje: string[] = [];
  for (const m of formularze) {
    const a = m[1].match(/\baction\s*=\s*["']([^"']*)["']/i)?.[1];
    if (!a || a.startsWith("#") || /^(javascript|mailto):/i.test(a)) continue;
    try {
      const u = new URL(dekoduj(a), adres);
      if (u.hostname.replace(/^www\./, "") === host && /^https?:$/.test(u.protocol)) {
        u.hash = "";
        if (!akcje.includes(u.toString())) akcje.push(u.toString());
      }
    } catch {
      /* zły adres */
    }
  }
  return {
    polityka: zLinkow(/polityk\w*[\s-]+prywatno|privacy|rodo|ochron\w*[\s-]+danych|polityk\w*[\s-]+cookie/i),
    telefon: linki.some((t) => /^tel:/i.test(t.atr.get("href") ?? "")),
    email: linki.some((t) => /^mailto:/i.test(t.atr.get("href") ?? "")),
    nip: /\bNIP\b[\s:.-]*(PL)?\s*\d{3}[-\s]?\d{2,3}[-\s]?\d{2}[-\s]?\d{2,3}/i.test(tekst),
    formularz: kontaktowe.length > 0,
    // Sam napis „woocommerce” to za mało: zostawiają go też wtyczki na
    // stronach bez sprzedaży. Liczy się przycisk albo cena produktu.
    sklep:
      /add[-_]to[-_]cart|woocommerce-Price-amount|cdn\.shopify\.com\/s\/files|Shopify\.theme|var prestashop|shoper\.pl\/|idosell|iai-shop/i.test(html) ||
      /dodaj do koszyka/i.test(tekst),
    regulamin: zLinkow(/regulamin|terms|warunki[\s-]+sprzeda/i),
    przecena:
      /<del\b[^>]*>[\s\S]{0,300}?(zł|pln)/i.test(html) ||
      /class=["'][^"']*\b(old-price|price-old|was-price|price--compare|compare-at-price|price__compare|product-price-old)\b/i.test(html),
    omnibus: /najni(ż|z)sz\w* cen|30 dni/i.test(tekst),
    sledzenie: SLEDZENIE.filter(([, re]) => re.test(html)).map(([n]) => n),
    zgoda: ZGODA.test(html) || (/cookie|ciasteczk/i.test(tekst) && /akceptuj|zgadzam|zgod[aęy]|odrzu[cć]/i.test(tekst)),
    akcje,
  };
}

export function polaczCechy(lista: Cechy[]): Cechy {
  const lub = (k: keyof Cechy) => lista.some((c) => c[k] === true);
  return {
    polityka: lub("polityka"),
    telefon: lub("telefon"),
    email: lub("email"),
    nip: lub("nip"),
    formularz: lub("formularz"),
    sklep: lub("sklep"),
    regulamin: lub("regulamin"),
    przecena: lub("przecena"),
    omnibus: lub("omnibus"),
    sledzenie: [...new Set(lista.flatMap((c) => c.sledzenie))],
    // zgoda musi być tam, gdzie jest śledzenie: wystarczy, że jest na stronach ze skryptami
    zgoda: lista.filter((c) => c.sledzenie.length).every((c) => c.zgoda),
    akcje: [...new Set(lista.flatMap((c) => c.akcje))].sort(),
  };
}

/** Ocena cech. `gdzie` trafia do opisu: „na stronie głównej” albo „na żadnej z N podstron”. */
export function kontroleWitryny(c: Cechy, gdzie: string): Znalezisko[] {
  const z: Znalezisko[] = [];
  if (!c.polityka) z.push({ klucz: "brak_polityki", szczegol: `Nie znaleźliśmy linku do polityki prywatności ${gdzie}.` });
  if (c.sledzenie.length && !c.zgoda)
    z.push({
      klucz: "sledzenie_bez_zgody",
      szczegol: `Ładuje się ${c.sledzenie.join(", ")}, a w kodzie strony nie widać okna zgody na cookies.`,
    });
  if (!c.telefon) z.push({ klucz: "brak_telefonu", szczegol: `Brak linku tel: ${gdzie}.` });
  if (!c.email) z.push({ klucz: "brak_emaila", szczegol: `Brak linku mailto: ${gdzie}.` });
  if (!c.nip) z.push({ klucz: "brak_nip", szczegol: `Nie znaleźliśmy numeru NIP ${gdzie}.` });
  if (!c.formularz) z.push({ klucz: "brak_formularza", szczegol: `Nie znaleźliśmy formularza kontaktowego ${gdzie}.` });
  if (c.sklep && !c.regulamin) z.push({ klucz: "sklep_bez_regulaminu", szczegol: `Strona wygląda na sklep, a nie znaleźliśmy linku do regulaminu ${gdzie}.` });
  if (c.przecena && !c.omnibus)
    z.push({ klucz: "brak_omnibus", szczegol: `Są przekreślone ceny, a nie ma informacji o najniższej cenie z 30 dni ${gdzie}.` });
  return z;
}

/** Formularze wysyłające pod adres 404 albo 410. */
export async function sprawdzAkcje(akcje: string[]): Promise<Znalezisko[]> {
  const wyniki = await Promise.all(
    akcje.slice(0, 20).map(async (a) => {
      const o = await zapytaj(a, { maxZnakow: 1_000 });
      return o && (o.status === 404 || o.status === 410) ? `${a} (kod ${o.status})` : null;
    }),
  );
  const zle = wyniki.filter(Boolean) as string[];
  return zle.length ? [{ klucz: "formularz_404", szczegol: `Formularz wysyła na: ${lista(zle, 3)}.` }] : [];
}

/* ------------------------------------------------------------------ */
/* Kontrole domeny (sieć, raz na badanie)                               */
/* ------------------------------------------------------------------ */

export type KontekstDomeny = {
  domena: string;
  /** Adres bazowy, np. https://www.firma.pl */
  baza: string;
  /** HTML strony głównej. */
  html: string;
  /** Nagłówki odpowiedzi strony głównej. */
  naglowki: Headers;
};

async function bezpieczenstwo(k: KontekstDomeny): Promise<Znalezisko[]> {
  const z: Znalezisko[] = [];
  const h = k.naglowki;
  if (k.baza.startsWith("https://") && !h.get("strict-transport-security"))
    z.push({
      klucz: "brak_hsts",
      szczegol:
        "Odpowiedź strony głównej nie ma nagłówka Strict-Transport-Security.",
    });

  const csp = h.get("content-security-policy") ?? "";
  const brak: string[] = [];
  if (!csp) brak.push("Content-Security-Policy");
  if (!/nosniff/i.test(h.get("x-content-type-options") ?? ""))
    brak.push("X-Content-Type-Options");
  if (!h.get("x-frame-options") && !/frame-ancestors/i.test(csp))
    brak.push("X-Frame-Options (lub frame-ancestors)");
  if (!h.get("referrer-policy")) brak.push("Referrer-Policy");
  if (!h.get("permissions-policy")) brak.push("Permissions-Policy");
  if (brak.length >= 2)
    z.push({
      klucz: "naglowki_bezpieczenstwa",
      szczegol: `Brakuje: ${brak.join(", ")}.`,
    });

  const ciastka = (
    typeof h.getSetCookie === "function" ? h.getSetCookie() : []
  ).map((c) => {
    const nazwa = c.split("=")[0].trim();
    const braki = [
      !/;\s*secure/i.test(c) && "Secure",
      !/;\s*httponly/i.test(c) && "HttpOnly",
      !/;\s*samesite=/i.test(c) && "SameSite",
    ].filter(Boolean) as string[];
    return { nazwa, braki };
  });
  const zle = ciastka.filter((c) => c.braki.length);
  if (zle.length)
    z.push({
      klucz: "ciasteczka_bez_flag",
      szczegol: lista(
        zle.map((c) => `${c.nazwa} (brak ${c.braki.join(", ")})`),
        4,
      ),
    });

  // Wersje w nagłówkach
  const wersje: string[] = [];
  for (const n of ["server", "x-powered-by", "x-aspnet-version"]) {
    const v = h.get(n);
    if (v && /\d+\.\d+/.test(v)) wersje.push(`${n}: ${v.slice(0, 60)}`);
  }
  // Tylko generatory systemów stron. Wtyczki też się wpisują, ale ich wersja
  // nie mówi o luce w samej stronie.
  const generatory = [...k.html.matchAll(/<meta\b[^>]*>/gi)]
    .map((m) => m[0])
    .filter((t) => /name=["']generator["']/i.test(t))
    .map((t) => t.match(/content=["']([^"']+)["']/i)?.[1] ?? "");
  const generator = generatory.find((g) =>
    /wordpress|joomla|drupal|typo3|prestashop|magento|shopware|wix|squarespace|webflow/i.test(g),
  );
  if (generator && /\d+\.\d+/.test(generator))
    wersje.push(`meta generator: ${generator.slice(0, 60)}`);
  if (wersje.length)
    z.push({ klucz: "wersja_widoczna", szczegol: wersje.join("; ") });

  const wp = /wp-content|wp-includes/i.test(k.html);
  // Odsłonięte pliki. Bez przekierowań i z kontrolą treści, bo wiele serwerów
  // na każdy adres oddaje stronę główną z kodem 200.
  const pliki: [string, (t: string) => boolean][] = [
    ["/.git/HEAD", (t) => /^ref:\s*refs\//.test(t.trim())],
    [
      "/.env",
      (t) => /^\s*[A-Z][A-Z0-9_]*\s*=/m.test(t) && !/<html|<!doctype/i.test(t),
    ],
    // Kopie wp-config tylko na WordPressie: każde zbędne zapytanie o taki
    // adres zapora może uznać za atak i zablokować resztę audytu.
    ...(wp ? [
      "wp-config.php.bak",
      "wp-config.php~",
      "wp-config.bak",
      "wp-config.php.save",
      "wp-config.old",
      "wp-config.php.old",
      "wp-config.txt",
    ] : []).map(
      (p) =>
        [`/${p}`, (t: string) => /DB_PASSWORD|DB_NAME/.test(t)] as [
          string,
          (t: string) => boolean,
        ],
    ),
  ];
  const [odsloniete, uzytkownicy, xmlrpc, katalog, wersjaWp] =
    await Promise.all([
      Promise.all(
        pliki.map(async ([p, test]) => {
          const o = await zapytaj(k.baza + p, {
            przekierowania: false,
            maxZnakow: 20_000,
          });
          return o && o.status === 200 && test(o.tekst) ? p : null;
        }),
      ),
      wp
        ? zapytaj(`${k.baza}/wp-json/wp/v2/users`, { maxZnakow: 200_000 })
        : null,
      wp
        ? zapytaj(`${k.baza}/xmlrpc.php`, {
            przekierowania: false,
            maxZnakow: 2_000,
          })
        : null,
      wp
        ? zapytaj(`${k.baza}/wp-content/uploads/`, {
            przekierowania: false,
            maxZnakow: 20_000,
          })
        : null,
      wp && generator && /wordpress/i.test(generator)
        ? zapytaj("https://api.wordpress.org/core/version-check/1.7/", {
            maxZnakow: 200_000,
          })
        : null,
    ]);
  const zle2 = odsloniete.filter(Boolean) as string[];
  if (zle2.length)
    z.push({
      klucz: "odsloniete_pliki",
      szczegol: `Dostępne bez logowania: ${zle2.join(", ")}.`,
    });

  if (uzytkownicy && uzytkownicy.status === 200) {
    try {
      const j = JSON.parse(uzytkownicy.tekst);
      if (Array.isArray(j) && j.length) {
        const loginy = j.map((u) => String(u?.slug ?? "")).filter(Boolean);
        if (loginy.length)
          z.push({
            klucz: "wp_uzytkownicy",
            szczegol: `Adres /wp-json/wp/v2/users zwraca ${loginy.length} ${odmien(loginy.length, "login", "loginy", "loginów")}, np. ${lista(loginy, 3)}.`,
          });
      }
    } catch {
      /* nie JSON, nic nie ujawnia */
    }
  }
  if (
    xmlrpc &&
    (xmlrpc.status === 405 || xmlrpc.status === 200) &&
    /XML-RPC/i.test(xmlrpc.tekst)
  )
    z.push({
      klucz: "wp_xmlrpc",
      szczegol: "Adres /xmlrpc.php odpowiada i przyjmuje zapytania.",
    });
  if (
    katalog &&
    katalog.status === 200 &&
    /<title>\s*Index of \//i.test(katalog.tekst)
  )
    z.push({
      klucz: "listowanie_katalogow",
      szczegol: "Pod /wp-content/uploads/ widać listę wgranych plików.",
    });

  const wpWersja = generator?.match(/wordpress\s+(\d+(?:\.\d+)+)/i)?.[1];
  if (wpWersja && wersjaWp && wersjaWp.status === 200) {
    try {
      const najnowsza = String(
        JSON.parse(wersjaWp.tekst)?.offers?.[0]?.current ?? "",
      );
      const [a1, a2] = najnowsza.split(".").map(Number);
      const [b1, b2] = wpWersja.split(".").map(Number);
      // Za nieaktualną uznajemy wersję starszą o więcej niż jedno wydanie główne.
      if (najnowsza && (a1 - b1) * 10 + (a2 - b2) > 1)
        z.push({
          klucz: "stary_wordpress",
          szczegol: `Strona ma WordPress ${wpWersja}, aktualny to ${najnowsza}.`,
        });
    } catch {
      /* brak danych o wersji */
    }
  }

  const jq = k.html.match(
    /jquery(?:[.-]min)?[.-]?(\d+\.\d+(?:\.\d+)?)?(?:\.min)?\.js(?:\?ver=(\d+\.\d+(?:\.\d+)?))?/i,
  );
  const jqWersja = jq?.[1] ?? jq?.[2];
  if (jqWersja && porownajWersje(jqWersja, "3.5.0") < 0)
    z.push({
      klucz: "stare_jquery",
      szczegol: `Ładowana jest jQuery ${jqWersja}.`,
    });

  return z;
}

/** Wszystko, co audyt jednej strony sprawdza na samej stronie głównej. */
export async function kontroleGlownej(html: string, adres: string): Promise<Znalezisko[]> {
  const cechy = cechyStrony(html, adres);
  return [
    ...kontroleStrony(html, adres),
    ...kontroleWitryny(cechy, "na stronie głównej"),
    ...(await sprawdzAkcje(cechy.akcje)),
  ];
}


/** Wymiary obrazu z nagłówka pliku (PNG, JPEG, WebP, GIF). */
export function wymiaryObrazu(b: Uint8Array): [number, number] | null {
  const dv = new DataView(b.buffer, b.byteOffset, b.byteLength);
  const txt = (o: number, n: number) => String.fromCharCode(...b.subarray(o, o + n));
  try {
    if (txt(1, 3) === "PNG") return [dv.getUint32(16), dv.getUint32(20)];
    if (txt(0, 3) === "GIF") return [dv.getUint16(6, true), dv.getUint16(8, true)];
    if (txt(0, 4) === "RIFF" && txt(8, 4) === "WEBP") {
      const t = txt(12, 4);
      if (t === "VP8X") return [1 + (dv.getUint32(24, true) & 0xffffff), 1 + (dv.getUint32(27, true) & 0xffffff)];
      if (t === "VP8L") {
        const v = dv.getUint32(21, true);
        return [1 + (v & 0x3fff), 1 + ((v >> 14) & 0x3fff)];
      }
      return [dv.getUint16(26, true) & 0x3fff, dv.getUint16(28, true) & 0x3fff];
    }
    if (b[0] === 0xff && b[1] === 0xd8) {
      let i = 2;
      while (i + 9 < b.length) {
        const m = b[i + 1];
        if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return [dv.getUint16(i + 7), dv.getUint16(i + 5)];
        i += 2 + dv.getUint16(i + 2);
      }
    }
  } catch {
    /* uszkodzony nagłówek */
  }
  return null;
}

async function seoDomeny(k: KontekstDomeny): Promise<Znalezisko[]> {
  const z: Znalezisko[] = [];
  const tagi = znaczniki(k.html, ["meta", "link"]);
  const og = tagi.find((t) => t.tag === "meta" && (t.atr.get("property") ?? "").toLowerCase() === "og:image")?.atr.get("content");
  const ikona = tagi.some((t) => t.tag === "link" && /\bicon\b/i.test(t.atr.get("rel") ?? ""));
  const [obraz, favicon] = await Promise.all([
    og
      ? (async () => {
          try {
            // Drugie podejście, bo pojedynczy zerwany transfer to jeszcze nie
            // dowód, że obrazka nie ma.
            const pobierzObraz = () =>
              fetch(new URL(og, k.baza), {
                headers: { "user-agent": UA },
                signal: AbortSignal.timeout(10_000),
              });
            const o = await pobierzObraz().catch(() => pobierzObraz());
            if (!o.ok) return `${krotko(og)} zwraca kod ${o.status}`;
            const w = wymiaryObrazu(new Uint8Array(await o.arrayBuffer()));
            if (w && (w[0] < 1200 || w[1] < 630)) return `${krotko(og)} ma ${w[0]}x${w[1]} px, a zalecane minimum to 1200x630`;
            return null;
          } catch {
            return `${krotko(og)} nie odpowiada`;
          }
        })()
      : null,
    ikona ? null : zapytaj(`${k.baza}/favicon.ico`, { maxZnakow: 100 }),
  ]);
  if (obraz) z.push({ klucz: "og_obraz", szczegol: obraz });
  if (!ikona && (!favicon || favicon.status !== 200 || /text\/html/i.test(favicon.naglowki.get("content-type") ?? "")))
    z.push({ klucz: "brak_favicony", szczegol: "Nie ma <link rel=\"icon\"> ani pliku /favicon.ico." });
  return z;
}


/** Kontrole z pomiaru zasobów strony głównej (wagi, kompresja) i jej stylów. */
export async function kontroleZasobow(
  zasoby: { adres: string; rodzaj: string; bajty: number | null; kompresja: string | null }[],
  html: string,
  baza: string,
  css: string[],
): Promise<Znalezisko[]> {
  const z: Znalezisko[] = [];
  const nazwa = (a: string) => {
    const ostatni = a.split("/").pop() || a;
    return krotko(ostatni.split("?")[0].length >= 6 ? ostatni.split("?")[0] : ostatni, 50);
  };
  const ciezkie = zasoby.filter((x) => x.rodzaj === "obraz" && (x.bajty ?? 0) > 300_000);
  if (ciezkie.length)
    z.push({
      klucz: "obrazy_ciezkie",
      szczegol: lista(ciezkie.map((x) => `${nazwa(x.adres)} (${Math.round((x.bajty ?? 0) / 1024)} kB)`), 3),
    });
  const js = zasoby.filter((x) => x.rodzaj === "skrypt" && x.bajty !== null);
  const sumaJs = js.reduce((s, x) => s + (x.bajty ?? 0), 0);
  // Bajty po rozpakowaniu, bo tyle przeglądarka musi przeczytać i uruchomić.
  if (sumaJs > 1_000_000)
    z.push({
      klucz: "waga_js",
      szczegol: `${Math.round(sumaJs / 1024)} kB w ${js.length} ${odmien(js.length, "pliku", "plikach", "plikach")} po rozpakowaniu (mierzone z pierwszych plików strony głównej)`,
    });
  const tekstowe = zasoby.filter(
    (x) => (x.rodzaj === "skrypt" || x.rodzaj === "styl") && (x.bajty ?? 0) > 10_000 && !x.kompresja,
  );
  // Odpowiedź na HEAD często nie podaje kompresji, choć GET ją ma, więc
  // każdy podejrzany plik sprawdzamy zwykłym pobraniem.
  const bezKompresji = (
    await Promise.all(
      tekstowe.slice(0, 6).map(async (x) => {
        // Część serwerów (także Google) nie kompresuje odpowiedzi dla robotów,
        // więc tu przedstawiamy się jak przeglądarka z dopiskiem, kim jesteśmy.
        const o = await zapytaj(x.adres, { maxZnakow: 1, ua: UA_PRZEGLADARKA });
        return o && o.status === 200 && !o.naglowki.get("content-encoding") ? x : null;
      }),
    )
  ).filter(Boolean) as typeof tekstowe;
  if (bezKompresji.length)
    z.push({ klucz: "kompresja_zasobow", szczegol: lista(bezKompresji.map((x) => nazwa(x.adres)), 3) });
  let host = "";
  try {
    host = new URL(baza).hostname.replace(/^www\./, "");
  } catch {
    /* bez hosta */
  }
  const domeny = new Set<string>();
  for (const t of znaczniki(html, ["script"])) {
    const src = t.atr.get("src");
    if (!src) continue;
    try {
      const h = new URL(src, baza).hostname.replace(/^www\./, "");
      if (h !== host && !h.endsWith("." + host)) domeny.add(h);
    } catch {
      /* zły adres */
    }
  }
  if (domeny.size > 5)
    z.push({ klucz: "zewnetrzne_skrypty", szczegol: `${domeny.size} domen: ${lista([...domeny].sort(), 6)}` });
  const fonty = new Set<string>();
  for (const c of css)
    for (const m of c.matchAll(/@font-face\s*\{([^}]*)\}/gi))
      // Zastępczy font z samym local() (np. „Inter Fallback” w Next.js)
      // niczego nie pobiera, więc font-display nie ma tu znaczenia.
      if (!/font-display\s*:/i.test(m[1]) && /url\(/i.test(m[1]))
        fonty.add((m[1].match(/font-family\s*:\s*["']?([^;"']+)/i)?.[1] ?? "?").trim());
  if (fonty.size) z.push({ klucz: "fonty_bez_display", szczegol: lista([...fonty], 4) });
  return z;
}

/** Obrazy z dokumentu, które zwróciły 404 albo 410 (z pomiaru zasobów). */
export function obrazy404(zasoby: { adres: string; rodzaj: string; status: number | null }[]): Znalezisko[] {
  const zle = zasoby.filter((x) => x.rodzaj === "obraz" && (x.status === 404 || x.status === 410)).map((x) => krotko(x.adres));
  return zle.length ? [{ klucz: "obrazy_404", szczegol: `${zle.length} ${odmien(zle.length, "obraz", "obrazy", "obrazów")}: ${lista(zle, 3)}` }] : [];
}

/** Ścieżka zablokowana regułami robots.txt dla wszystkich robotów albo Googlebota. */
export function regulyRobots(tekst: string): { allow: string[]; disallow: string[] } {
  const wynik = { allow: [] as string[], disallow: [] as string[] };
  let agenci: string[] = [];
  let wRegulach = false;
  for (const surowa of tekst.split(/\r?\n/)) {
    const linia = surowa.replace(/#.*/, "").trim();
    const m = linia.match(/^([a-z-]+)\s*:\s*(.*)$/i);
    if (!m) continue;
    const pole = m[1].toLowerCase();
    const wartosc = m[2].trim();
    if (pole === "user-agent") {
      if (wRegulach) agenci = [];
      wRegulach = false;
      agenci.push(wartosc.toLowerCase());
    } else if (pole === "allow" || pole === "disallow") {
      wRegulach = true;
      if (!agenci.some((a) => a === "*" || a === "googlebot") || !wartosc) continue;
      wynik[pole].push(wartosc);
    }
  }
  return wynik;
}

export function zablokowanyPrzezRobots(sciezka: string, r: { allow: string[]; disallow: string[] }): boolean {
  const pasuje = (wzor: string) => {
    const re = new RegExp("^" + wzor.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\\\$$/, "$"));
    return re.test(sciezka);
  };
  const najdluzszy = (l: string[]) => Math.max(-1, ...l.filter(pasuje).map((w) => w.length));
  const d = najdluzszy(r.disallow);
  return d >= 0 && d > najdluzszy(r.allow);
}

// Selektor DKIM może mieć dowolną nazwę, więc sprawdzamy te, których używają
// popularne usługi (Google, Microsoft, Zoho, Resend, Mailchimp, Mailjet...).
// Brak trafienia nie jest dowodem, dlatego to ustalenie ma wagę drobną.
const SELEKTORY_DKIM = [
  "google", "default", "selector1", "selector2", "k1", "k2", "mail", "dkim",
  "s1", "s2", "zmail", "zoho", "resend", "mailjet", "mte1", "smtp", "protonmail",
];

function zLimitem<T>(p: Promise<T>, ms = CZAS_MS): Promise<T | null> {
  return Promise.race([p, new Promise<null>((r) => setTimeout(() => r(null), ms))]).catch(() => null);
}

async function pocztaDomeny(k: KontekstDomeny): Promise<Znalezisko[]> {
  const z: Znalezisko[] = [];
  const d = k.domena;
  // Brak rekordu to wynik, błąd zapytania to brak wiedzy. Tylko ten pierwszy
  // wolno zamienić w ustalenie.
  const brak = (e: unknown) => {
    const kod = (e as { code?: string })?.code;
    return kod === "ENODATA" || kod === "ENOTFOUND" ? "brak" : "blad";
  };
  const mx = await zLimitem(dns.resolveMx(d).then((r) => (r.length ? "jest" : "brak")).catch(brak));
  if (mx === "brak") z.push({ klucz: "brak_mx", szczegol: `Dla ${d} nie ma rekordu MX.` });
  const [dkim, mtaSts, caa, ds, rdap] = await Promise.all([
    mx === "jest"
      ? Promise.all(
          SELEKTORY_DKIM.map((sel) =>
            zLimitem(
              dns
                .resolveTxt(`${sel}._domainkey.${d}`)
                .then((r) => r.some((t) => /v=DKIM1|k=rsa|p=/i.test(t.join(""))))
                .catch(() => false),
              4_000,
            ),
          ),
        ).then((l) => (l.some((x) => x === true) ? true : l.some((x) => x === null) ? null : false))
      : null,
    mx === "jest"
      ? zLimitem(
          dns
            .resolveTxt(`_mta-sts.${d}`)
            .then((r) => r.some((t) => /v=STSv1/i.test(t.join(""))))
            .catch((e) => (brak(e) === "brak" ? false : null)),
        )
      : null,
    zLimitem(dns.resolveCaa(d).then((r) => r.length > 0).catch((e) => (brak(e) === "brak" ? false : null))),
    zapytaj(`https://dns.google/resolve?name=${encodeURIComponent(d)}&type=DS`, { maxZnakow: 20_000 }),
    zapytaj(`https://rdap.org/domain/${encodeURIComponent(d)}`, { maxZnakow: 200_000 }),
  ]);
  if (dkim === false)
    z.push({ klucz: "brak_dkim", szczegol: `Brak klucza DKIM pod popularnymi selektorami: ${SELEKTORY_DKIM.join(", ")}.` });
  if (mtaSts === false) z.push({ klucz: "brak_mta_sts", szczegol: `Brak rekordu _mta-sts.${d}.` });
  if (caa === false) z.push({ klucz: "brak_caa", szczegol: `Dla ${d} nie ma rekordu CAA.` });
  if (ds && ds.status === 200) {
    try {
      const j = JSON.parse(ds.tekst);
      if (j.Status === 0 && !(j.Answer ?? []).some((a: { type: number }) => a.type === 43))
        z.push({ klucz: "brak_dnssec", szczegol: `Domena ${d} nie ma rekordu DS w strefie nadrzędnej.` });
    } catch {
      /* brak odpowiedzi */
    }
  }
  if (rdap && rdap.status === 200) {
    try {
      const j = JSON.parse(rdap.tekst);
      const wygasa = (j.events ?? []).find((e: { eventAction?: string }) => e.eventAction === "expiration")?.eventDate;
      if (wygasa) {
        const dni = Math.floor((Date.parse(wygasa) - Date.now()) / 86_400_000);
        if (dni < 30)
          z.push({
            klucz: "domena_wygasa",
            szczegol: `Według rejestru domena wygasa ${String(wygasa).slice(0, 10)}, za ${dni} ${odmien(dni, "dzień", "dni", "dni")}.`,
          });
      }
    } catch {
      /* brak danych */
    }
  }
  return z;
}

export async function kontroleDomeny(k: KontekstDomeny): Promise<Znalezisko[]> {
  const czesci = await Promise.all([
    bezpieczenstwo(k).catch(() => []),
    seoDomeny(k).catch(() => []),
    pocztaDomeny(k).catch(() => []),
  ]);
  return czesci.flat();
}
