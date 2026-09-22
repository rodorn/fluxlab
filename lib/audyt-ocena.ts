/**
 * Zamiana pomiaru na listę ustaleń, priorytety i wycenę naprawy.
 *
 * Wycena stoi tutaj, a nie w modelu, i to jest decyzja, nie przeoczenie.
 * Model potrafi napisać dobry akapit, ale cena podana klientowi musi wychodzić
 * z tej samej tabeli za każdym razem, bo inaczej dwie osoby z tym samym
 * problemem dostają dwie różne kwoty i nie ma jak tego obronić. Model dostaje
 * gotowe liczby i ma je opisać, nie wymyślić.
 */

import type { Pomiar } from "./audyt-pomiar";

export type Waga = "krytyczne" | "wazne" | "drobne";

export type Ustalenie = {
  klucz: string;
  obszar: "dostepnosc" | "szybkosc" | "mobile" | "seo" | "ai" | "poczta";
  waga: Waga;
  tytul: string;
  /** Co dokładnie zmierzono. Zawsze z liczbą albo cytatem, nigdy ogólnik. */
  fakt: string;
  /** Dlaczego to kosztuje. Bez straszenia, bez procentów wziętych z sufitu. */
  skutek: string;
  /** Ile kosztuje naprawa tej jednej rzeczy, w złotych. */
  koszt: number;
  /** Czy właściciel zrobi to sam bez programisty. */
  samodzielnie: boolean;
  /** Czego potrzebuję, żeby to naprawić. */
  dostep?: string;
};

/** Progi, na które umiem wskazać źródło albo powód. */
const TTFB_WOLNY = 800;
const TTFB_BARDZO_WOLNY = 1800;
const HTML_CIEZKI = 250_000;
const TYTUL_MAX = 60;
const OPIS_MIN = 70;
const OPIS_MAX = 160;
const TRESC_MIN = 500;

function mb(b: number): string {
  return b >= 1_048_576 ? `${(b / 1_048_576).toFixed(1)} MB` : `${Math.round(b / 1024)} kB`;
}

export function ocenStrone(p: Pomiar): Ustalenie[] {
  const u: Ustalenie[] = [];
  const dodaj = (x: Ustalenie) => u.push(x);

  if (p.zablokowany) {
    dodaj({
      klucz: "zablokowany",
      obszar: "dostepnosc",
      waga: "drobne",
      tytul: "Serwer nie wpuścił mojego pomiaru",
      fakt: `Zamiast strony dostałem ${p.powodBlokady}.`,
      skutek:
        "To zwykle znaczy, że stronę osłania system chroniący przed robotami, i sam w sobie nie jest wadą. Nie mogę jednak na tej podstawie powiedzieć nic o szybkości, treści ani o widoczności, bo nie zobaczyłem Waszej strony, tylko ekran ochrony. Żeby zbadać ją porządnie, potrzebowałbym zgody na przepuszczenie pomiaru albo dostępu od środka. Poniżej zostaje tylko to, co dało się ustalić z DNS i z certyfikatu.",
      koszt: 0,
      samodzielnie: false,
    });
    // Certyfikat i poczta pochodzą spoza HTTP, więc te ustalenia są nadal
    // prawdziwe i warto je zostawić. Reszta odpada razem z brakiem treści.
    if (p.cert && p.cert.dniDoKonca < 0) {
      dodaj({
        klucz: "cert_wygasl",
        obszar: "dostepnosc",
        waga: "krytyczne",
        tytul: "Certyfikat wygasł",
        fakt: `Ważność skończyła się ${p.cert.waznyDo}, czyli ${Math.abs(p.cert.dniDoKonca)} dni temu.`,
        skutek:
          "Przeglądarka pokazuje pełnoekranowe ostrzeżenie przed wejściem na stronę. Większość odwiedzających zawraca w tym miejscu.",
        koszt: 150,
        samodzielnie: false,
        dostep: "panel hostingu albo dostęp do serwera",
      });
    }
    if (p.poczta.mx && !p.poczta.spf) {
      dodaj({
        klucz: "brak_spf",
        obszar: "poczta",
        waga: "wazne",
        tytul: "Poczta z tej domeny nie ma wpisu SPF",
        fakt: "W DNS nie ma rekordu zaczynającego się od v=spf1.",
        skutek:
          "Wiadomości z Waszego adresu łatwiej lądują w spamie, a ktoś obcy może podszyć się pod tę domenę.",
        koszt: 120,
        samodzielnie: false,
        dostep: "dostęp do DNS domeny",
      });
    }
    return u;
  }

  if (!p.osiagalna) {
    dodaj({
      klucz: "brak_strony",
      obszar: "dostepnosc",
      waga: "krytyczne",
      tytul: "Strona nie odpowiedziała",
      fakt: `Ani ${p.domena}, ani www.${p.domena} nie oddały dokumentu w czasie, w którym czeka przeglądarka.`,
      skutek:
        "Jeżeli to nie jest chwilowa awaria, to znaczy, że każdy, kto trafia na ten adres, widzi błąd połączenia. Reszta ustaleń nie ma wtedy znaczenia.",
      koszt: 0,
      samodzielnie: false,
    });
    return u;
  }

  // --- dostępność i zaufanie ---------------------------------------------
  if (p.cert && p.cert.dniDoKonca < 0) {
    dodaj({
      klucz: "cert_wygasl",
      obszar: "dostepnosc",
      waga: "krytyczne",
      tytul: "Certyfikat wygasł",
      fakt: `Ważność skończyła się ${p.cert.waznyDo}, czyli ${Math.abs(p.cert.dniDoKonca)} dni temu.`,
      skutek:
        "Przeglądarka pokazuje pełnoekranowe ostrzeżenie przed wejściem na stronę. Większość odwiedzających zawraca w tym miejscu i nie widzi już niczego więcej.",
      koszt: 150,
      samodzielnie: false,
      dostep: "panel hostingu albo dostęp do serwera",
    });
  } else if (p.cert && p.cert.dniDoKonca < 21) {
    dodaj({
      klucz: "cert_konczy",
      obszar: "dostepnosc",
      waga: "wazne",
      tytul: `Certyfikat kończy się za ${p.cert.dniDoKonca} dni`,
      fakt: `Wystawca: ${p.cert.wystawca}, ważny do ${p.cert.waznyDo}.`,
      skutek:
        "Jeżeli odnowienie nie jest automatyczne, w dniu wygaśnięcia strona przestaje być dostępna bez ostrzeżenia. To awaria, którą widać dopiero od strony klienta.",
      koszt: 150,
      samodzielnie: false,
      dostep: "panel hostingu",
    });
  }
  if (p.cert && !p.cert.pasujeDoDomeny) {
    dodaj({
      klucz: "cert_nie_pasuje",
      obszar: "dostepnosc",
      waga: "krytyczne",
      tytul: "Certyfikat jest wystawiony na inną nazwę",
      fakt: `Certyfikat nie obejmuje ${p.domena}. Wystawca: ${p.cert.wystawca}.`,
      skutek:
        "Tak wygląda certyfikat firmy hostingowej podstawiony pod cudzą domenę. Skutek dla odwiedzającego jest ten sam co przy wygasłym: ostrzeżenie na pełny ekran.",
      koszt: 150,
      samodzielnie: false,
      dostep: "panel hostingu",
    });
  }
  if (p.httpPrzekierowuje === false) {
    dodaj({
      klucz: "brak_przekierowania",
      obszar: "dostepnosc",
      waga: "wazne",
      tytul: "Wejście bez szyfrowania nie przechodzi na wersję szyfrowaną",
      fakt: `http://${p.domena} nie kończy na adresie https.`,
      skutek:
        "Część ruchu zostaje na połączeniu nieszyfrowanym, a wyszukiwarka widzi dwa osobne adresy tej samej strony i dzieli między nie ocenę.",
      koszt: 120,
      samodzielnie: false,
      dostep: "konfiguracja serwera lub panel hostingu",
    });
  }
  if (p.obieWersjeDzialaja) {
    dodaj({
      klucz: "dwie_wersje",
      obszar: "seo",
      waga: "wazne",
      tytul: "Strona działa pod dwoma adresami naraz",
      fakt: `Zarówno ${p.domena}, jak i www.${p.domena} oddają treść i żaden nie przekierowuje na drugi.`,
      skutek:
        "Dla wyszukiwarki to dwie strony z tą samą treścią. Odnośniki z innych witryn rozkładają się na dwa adresy zamiast wzmacniać jeden.",
      koszt: 120,
      samodzielnie: false,
      dostep: "konfiguracja serwera lub panel hostingu",
    });
  }

  // --- szybkość -----------------------------------------------------------
  if (p.ttfbMs !== null && p.ttfbMs > TTFB_WOLNY) {
    const bardzo = p.ttfbMs > TTFB_BARDZO_WOLNY;
    dodaj({
      klucz: "wolny_serwer",
      obszar: "szybkosc",
      waga: bardzo ? "krytyczne" : "wazne",
      tytul: "Serwer długo zwleka z pierwszą odpowiedzią",
      fakt: `Pierwszy bajt dokumentu przyszedł po ${p.ttfbMs} ms${p.serwer ? ` (serwer: ${p.serwer})` : ""}.`,
      skutek:
        "To czas, zanim przeglądarka w ogóle zacznie cokolwiek rysować. Dokłada się do każdego kolejnego kroku, więc żadna optymalizacja obrazków tego nie nadrobi.",
      koszt: bardzo ? 400 : 250,
      samodzielnie: false,
      dostep: "dostęp do serwera lub panelu hostingu, w razie potrzeby do kodu",
    });
  }
  if (!p.kompresjaHtml) {
    dodaj({
      klucz: "brak_kompresji",
      obszar: "szybkosc",
      waga: "wazne",
      tytul: "Dokument leci bez kompresji",
      fakt: `Odpowiedź nie ma nagłówka content-encoding, a sam dokument waży ${mb(p.htmlBajty ?? 0)}.`,
      skutek:
        "Włączenie kompresji to zwykle jedna linia w konfiguracji serwera i zwykle tnie ten transfer kilkukrotnie. Rzadko która zmiana daje tyle za tak mało.",
      koszt: 100,
      samodzielnie: false,
      dostep: "konfiguracja serwera",
    });
  }
  if ((p.htmlBajty ?? 0) > HTML_CIEZKI) {
    dodaj({
      klucz: "ciezki_dokument",
      obszar: "szybkosc",
      waga: "drobne",
      tytul: "Sam dokument jest ciężki",
      fakt: `${mb(p.htmlBajty ?? 0)} bez wliczania obrazów, skryptów i stylów.`,
      skutek:
        "Zwykle znaczy to, że w dokumencie siedzi wklejona treść, która powinna być w osobnym pliku i mogłaby się zapisać w pamięci przeglądarki na kolejne wejścia.",
      koszt: 200,
      samodzielnie: false,
      dostep: "dostęp do kodu strony",
    });
  }
  const zmierzone = p.zasoby.filter((z) => z.bajty !== null);
  const sumaZasobow = zmierzone.reduce((s, z) => s + (z.bajty ?? 0), 0);
  const ciezkie = zmierzone.filter((z) => (z.bajty ?? 0) > 500_000);
  if (ciezkie.length) {
    dodaj({
      klucz: "ciezkie_pliki",
      obszar: "szybkosc",
      waga: "wazne",
      tytul: `${ciezkie.length === 1 ? "Jeden plik waży" : `${ciezkie.length} plików waży`} ponad pół megabajta`,
      fakt: ciezkie
        .slice(0, 4)
        .map((z) => `${z.adres.split("/").pop()?.slice(0, 40)} (${mb(z.bajty ?? 0)})`)
        .join(", "),
      skutek:
        "Na telefonie w zasięgu komórkowym każdy taki plik to osobne kilka sekund czekania. Obrazy zwykle da się zmniejszyć kilkukrotnie bez widocznej różnicy.",
      koszt: 250,
      samodzielnie: false,
      dostep: "dostęp do kodu strony albo do panelu treści",
    });
  }
  const bezCache = zmierzone.filter((z) => !z.cache || /no-store|no-cache/.test(z.cache));
  if (bezCache.length >= 3) {
    dodaj({
      klucz: "brak_cache",
      obszar: "szybkosc",
      waga: "drobne",
      tytul: `${bezCache.length} plików pobiera się od nowa przy każdym wejściu`,
      fakt: "Brak nagłówka cache-control albo ustawiony tak, że przeglądarka nie ma prawa nic zapamiętać.",
      skutek:
        "Odwiedzający, który wraca na stronę, czeka drugi raz na to samo. Przy plikach, które i tak się nie zmieniają, to czekanie bez powodu.",
      koszt: 150,
      samodzielnie: false,
      dostep: "konfiguracja serwera",
    });
  }

  // --- telefon ------------------------------------------------------------
  // Ruch z telefonów jest dziś zwykle większy niż z komputerów, a wyszukiwarka
  // ocenia stronę po wersji mobilnej. Dlatego to osobny obszar, nie przypis.
  const m = p.mobile;
  if (!m.viewport) {
    dodaj({
      klucz: "brak_viewport",
      obszar: "mobile",
      waga: "krytyczne",
      tytul: "Strona nie jest przygotowana na telefon",
      fakt: "W dokumencie nie ma znacznika viewport.",
      skutek:
        "Bez niego telefon udaje ekran szerokości 980 pikseli i pomniejsza całość, żeby się zmieściła. Tekst robi się nieczytelny, a w przyciski trzeba celować. Wyszukiwarka ocenia stronę po wersji mobilnej, więc to uderza także w pozycje.",
      koszt: 350,
      samodzielnie: false,
      dostep: "dostęp do kodu strony",
    });
  }
  if (m.blokujePowiekszanie) {
    dodaj({
      klucz: "blokada_powiekszania",
      obszar: "mobile",
      waga: "wazne",
      tytul: "Strona blokuje powiększanie dwoma palcami",
      fakt: `W znaczniku viewport stoi: „${m.viewport}”.`,
      skutek:
        "Osoba, która słabiej widzi, nie ma jak powiększyć tekstu. To jedna z częściej zgłaszanych barier dostępności, a usunięcie jej to skasowanie fragmentu jednej linii.",
      koszt: 50,
      samodzielnie: true,
      dostep: "dostęp do kodu strony",
    });
  }
  // Orzekamy tylko wtedy, gdy naprawdę przeczytaliśmy style. Arkusz za
  // logowaniem, na innej domenie albo wstrzykiwany skryptem daje zero reguł
  // i wyglądałby identycznie jak strona bez responsywności.
  if (m.viewport && m.regulMedia === 0 && m.cssZnakow > 500) {
    dodaj({
      klucz: "brak_media",
      obszar: "mobile",
      waga: "krytyczne",
      tytul: "Układ nie przestawia się na wąskim ekranie",
      fakt: "W arkuszach stylów nie znalazłem ani jednej reguły zależnej od szerokości ekranu.",
      skutek:
        "Strona deklaruje, że jest mobilna, ale nie ma czym się przestawić. Zwykle kończy się to przewijaniem w bok i treścią uciekającą poza ekran.",
      koszt: 500,
      samodzielnie: false,
      dostep: "dostęp do kodu strony",
    });
  } else if (m.stalychSzerokosci >= 3 && m.cssZnakow > 500) {
    dodaj({
      klucz: "sztywne_szerokosci",
      obszar: "mobile",
      waga: "wazne",
      tytul: "W stylach siedzą sztywne szerokości",
      fakt: `${m.stalychSzerokosci} reguł ustawia szerokość na stałą liczbę pikseli, 600 lub więcej.`,
      skutek:
        "Element szerszy niż ekran telefonu wypycha całą stronę i pojawia się przewijanie w bok. To najczęstsza przyczyna wrażenia, że strona na telefonie jest zepsuta.",
      koszt: 300,
      samodzielnie: false,
      dostep: "dostęp do kodu strony",
    });
  }
  if (p.obrazy.wszystkie >= 3 && m.obrazowBezSrcset / Math.max(1, p.obrazy.wszystkie) > 0.7) {
    dodaj({
      klucz: "brak_srcset",
      obszar: "mobile",
      waga: "wazne",
      tytul: `${m.obrazowBezSrcset} obrazów nie ma wersji na mniejszy ekran`,
      fakt: "Brak atrybutu srcset, więc telefon pobiera ten sam plik co komputer.",
      skutek:
        "Na ekranie szerokości kilkuset pikseli ładuje się grafika przygotowana na monitor. To transfer, za który płaci klient ze swojego pakietu, i czekanie, którego nie widać w testach na biurku.",
      koszt: 250,
      samodzielnie: false,
      dostep: "dostęp do kodu strony albo do panelu treści",
    });
  }
  if (p.obrazy.wszystkie >= 5 && p.obrazy.bezLazy / p.obrazy.wszystkie > 0.8) {
    dodaj({
      klucz: "brak_lazy",
      obszar: "mobile",
      waga: "drobne",
      tytul: "Wszystkie obrazy ładują się od razu",
      fakt: `${p.obrazy.bezLazy} z ${p.obrazy.wszystkie} obrazów nie ma atrybutu loading="lazy".`,
      skutek:
        "Telefon pobiera także grafiki z samego dołu strony, zanim ktokolwiek tam dojedzie. Jedno słowo w znaczniku odkłada je na później.",
      koszt: 100,
      samodzielnie: true,
      dostep: "dostęp do kodu strony",
    });
  }
  if (m.sekundNa4G !== null && m.sekundNa4G > 5) {
    dodaj({
      klucz: "wolno_na_komorce",
      obszar: "mobile",
      waga: m.sekundNa4G > 10 ? "krytyczne" : "wazne",
      tytul: `Na łączu komórkowym strona pobiera się około ${m.sekundNa4G} s`,
      fakt: `${mb(m.wagaCalosci)} do pobrania, licząc dokument i ${p.zasoby.filter((z) => z.bajty !== null).length} zmierzonych plików, przy ostrożnie przyjętych 1,6 Mb/s.`,
      skutek:
        "To czas samego transferu, bez rysowania i bez skryptów, więc w praktyce będzie dłuższy. Przy kilku sekundach czekania część odwiedzających wraca do wyników wyszukiwania.",
      koszt: 400,
      samodzielnie: false,
      dostep: "dostęp do kodu strony i do serwera",
    });
  }
  if (m.ttfbMs !== null && p.ttfbMs !== null && m.ttfbMs > p.ttfbMs * 2 && m.ttfbMs > 1200) {
    dodaj({
      klucz: "mobile_wolniej",
      obszar: "mobile",
      waga: "wazne",
      tytul: "Telefon czeka na odpowiedź wyraźnie dłużej niż komputer",
      fakt: `${m.ttfbMs} ms dla telefonu wobec ${p.ttfbMs} ms dla komputera, przy tym samym adresie.`,
      skutek:
        "Tak zachowuje się serwer, który dla telefonu składa osobną wersję i nie trzyma jej w pamięci podręcznej. Nadrabia się to zwykle konfiguracją, nie przepisywaniem strony.",
      koszt: 300,
      samodzielnie: false,
      dostep: "dostęp do serwera",
    });
  }
  if (m.osobnaWersja) {
    dodaj({
      klucz: "osobna_wersja_mobilna",
      obszar: "mobile",
      waga: "drobne",
      tytul: "Telefon dostaje inny dokument niż komputer",
      fakt: `Wersja mobilna waży ${mb(m.htmlBajty ?? 0)}, a komputerowa ${mb(p.htmlBajty ?? 0)}.`,
      skutek:
        "Dwie wersje trzeba utrzymywać równolegle i łatwo o rozjazd treści. Warto sprawdzić, czy obie mówią to samo, bo wyszukiwarka ocenia tę mobilną.",
      koszt: 150,
      samodzielnie: false,
      dostep: "dostęp do kodu strony",
    });
  }

  // --- widoczność w wyszukiwarce -----------------------------------------
  if (p.noindex) {
    dodaj({
      klucz: "noindex",
      obszar: "seo",
      waga: "krytyczne",
      tytul: "Strona prosi wyszukiwarkę, żeby jej nie pokazywała",
      fakt: "W dokumencie stoi znacznik robots z wartością noindex.",
      skutek:
        "To najczęściej zostaje po wersji roboczej i nikt tego nie zdejmuje po uruchomieniu. Dopóki tam stoi, strona nie ma prawa pojawić się w wynikach, niezależnie od reszty.",
      koszt: 80,
      samodzielnie: true,
      dostep: "dostęp do kodu strony albo do panelu treści",
    });
  }
  if (p.robots.blokujeWszystko) {
    dodaj({
      klucz: "robots_blokuje",
      obszar: "seo",
      waga: "krytyczne",
      tytul: "Plik robots.txt zamyka całą stronę",
      fakt: "W robots.txt stoi reguła zabraniająca wszystkim robotom wejścia na cokolwiek.",
      skutek:
        "Wyszukiwarka nie ma prawa przeczytać ani jednej podstrony. To druga po noindex najczęstsza pozostałość po wersji testowej.",
      koszt: 80,
      samodzielnie: true,
      dostep: "dostęp do plików na serwerze",
    });
  }
  if (!p.tytul) {
    dodaj({
      klucz: "brak_tytulu",
      obszar: "seo",
      waga: "krytyczne",
      tytul: "Strona nie ma tytułu",
      fakt: "W dokumencie nie ma znacznika title.",
      skutek:
        "Tytuł to ten niebieski napis w wynikach wyszukiwania i nazwa zakładki. Bez niego wyszukiwarka wpisuje tam, co uzna za stosowne.",
      koszt: 80,
      samodzielnie: true,
      dostep: "panel treści",
    });
  } else if (p.tytul.length > TYTUL_MAX) {
    dodaj({
      klucz: "dlugi_tytul",
      obszar: "seo",
      waga: "drobne",
      tytul: "Tytuł nie zmieści się w wynikach",
      fakt: `${p.tytul.length} znaków, a widać około ${TYTUL_MAX}: „${p.tytul.slice(0, 80)}…”`,
      skutek: "Końcówka zostanie ucięta wielokropkiem. Jeżeli to tam jest najważniejsze słowo, nikt go nie zobaczy.",
      koszt: 60,
      samodzielnie: true,
      dostep: "panel treści",
    });
  }
  if (!p.opisMeta) {
    dodaj({
      klucz: "brak_opisu",
      obszar: "seo",
      waga: "wazne",
      tytul: "Brakuje opisu dla wyników wyszukiwania",
      fakt: "Nie ma znacznika meta description.",
      skutek:
        "Wyszukiwarka skleja wtedy opis z przypadkowego fragmentu strony. To jedyne dwa zdania, którymi przekonuje się kogoś do kliknięcia, i warto je napisać samemu.",
      koszt: 80,
      samodzielnie: true,
      dostep: "panel treści",
    });
  } else if (p.opisMeta.length > OPIS_MAX || p.opisMeta.length < OPIS_MIN) {
    dodaj({
      klucz: "zly_opis",
      obszar: "seo",
      waga: "drobne",
      tytul: p.opisMeta.length > OPIS_MAX ? "Opis jest za długi" : "Opis jest bardzo krótki",
      fakt: `${p.opisMeta.length} znaków, a sensowny zakres to mniej więcej ${OPIS_MIN} do ${OPIS_MAX}.`,
      skutek:
        p.opisMeta.length > OPIS_MAX
          ? "Nadmiar zostanie ucięty w wynikach."
          : "Zostaje niewykorzystane miejsce, w którym można było podać powód kliknięcia.",
      koszt: 60,
      samodzielnie: true,
      dostep: "panel treści",
    });
  }
  if (p.h1.length === 0) {
    dodaj({
      klucz: "brak_h1",
      obszar: "seo",
      waga: "wazne",
      tytul: "Strona nie ma głównego nagłówka",
      fakt: "W dokumencie nie ma ani jednego znacznika h1.",
      skutek:
        "Nagłówek pierwszego poziomu mówi wyszukiwarce i czytnikowi ekranu, o czym jest ta strona. Bez niego trzeba to zgadywać z treści.",
      koszt: 80,
      samodzielnie: true,
      dostep: "panel treści albo dostęp do kodu",
    });
  } else if (p.h1.length > 1) {
    dodaj({
      klucz: "wiele_h1",
      obszar: "seo",
      waga: "drobne",
      tytul: `Na stronie jest ${p.h1.length} głównych nagłówków`,
      fakt: p.h1.slice(0, 3).map((h) => `„${h.slice(0, 50)}”`).join(", "),
      skutek:
        "Kilka nagłówków pierwszego poziomu rozmywa informację o tym, co na tej stronie jest najważniejsze.",
      koszt: 60,
      samodzielnie: true,
      dostep: "panel treści",
    });
  }
  if (!p.canonical) {
    dodaj({
      klucz: "brak_canonical",
      obszar: "seo",
      waga: "drobne",
      tytul: "Brak wskazania adresu podstawowego",
      fakt: "Nie ma znacznika canonical.",
      skutek:
        "Przy adresach z parametrami, na przykład z kampanii reklamowych, wyszukiwarka może potraktować je jako osobne strony z tą samą treścią.",
      koszt: 100,
      samodzielnie: false,
      dostep: "dostęp do kodu strony",
    });
  }
  if (!p.sitemap.jest) {
    dodaj({
      klucz: "brak_mapy",
      obszar: "seo",
      waga: "wazne",
      tytul: "Nie ma mapy strony",
      fakt: "Pod adresem /sitemap.xml nic nie ma.",
      skutek:
        "Mapa to lista adresów podana wyszukiwarce wprost. Bez niej podstrony, do których nie prowadzi żaden odnośnik, mogą nie zostać znalezione nigdy.",
      koszt: 150,
      samodzielnie: false,
      dostep: "dostęp do kodu strony",
    });
  } else if (!p.robots.mapaWskazana) {
    dodaj({
      klucz: "mapa_niewskazana",
      obszar: "seo",
      waga: "drobne",
      tytul: "Mapa strony istnieje, ale nie jest wskazana w robots.txt",
      fakt: `Mapa odpowiada${p.sitemap.adresow ? ` i zawiera ${p.sitemap.adresow} adresów` : ""}, natomiast robots.txt jej nie wymienia.`,
      skutek: "Jedna linia w robots.txt sprawia, że robot znajduje mapę od razu, bez zgadywania adresu.",
      koszt: 50,
      samodzielnie: true,
      dostep: "dostęp do plików na serwerze",
    });
  }
  if (!p.og) {
    dodaj({
      klucz: "brak_og",
      obszar: "seo",
      waga: "drobne",
      tytul: "Odnośnik do strony wygląda ubogo po wklejeniu",
      fakt: "Brak znaczników Open Graph.",
      skutek:
        "Po wklejeniu adresu na komunikator albo do mediów społecznościowych nie pojawi się obrazek ani tytuł, tylko goły adres.",
      koszt: 100,
      samodzielnie: false,
      dostep: "dostęp do kodu strony",
    });
  }
  if (p.obrazy.wszystkie > 0 && p.obrazy.bezAlt / p.obrazy.wszystkie > 0.3) {
    dodaj({
      klucz: "obrazy_bez_alt",
      obszar: "seo",
      waga: "drobne",
      tytul: `${p.obrazy.bezAlt} z ${p.obrazy.wszystkie} obrazów nie ma opisu`,
      fakt: "Brakuje atrybutu alt.",
      skutek:
        "Opis czyta czytnik ekranu osobie niewidomej i czyta go wyszukiwarka grafiki. Przy okazji pokazuje się, gdy obraz się nie wczyta.",
      koszt: 120,
      samodzielnie: true,
      dostep: "panel treści",
    });
  }

  // --- czy widzą to asystenci AI -----------------------------------------
  if (p.trescZnakow < TRESC_MIN) {
    dodaj({
      klucz: "pusta_tresc",
      obszar: "ai",
      waga: "krytyczne",
      tytul: "W dokumencie prawie nie ma treści",
      fakt: `Po odjęciu skryptów i stylów zostaje ${p.trescZnakow} znaków.`,
      skutek:
        "Strona buduje się dopiero w przeglądarce. Człowiek tego nie zauważy, ale robot, który nie uruchamia skryptów, dostaje pustą kartkę. Dotyczy to części robotów zbierających treść dla asystentów AI.",
      koszt: 600,
      samodzielnie: false,
      dostep: "dostęp do kodu strony",
    });
  }
  if (p.robots.blokujeAi.length) {
    dodaj({
      klucz: "blokada_ai",
      obszar: "ai",
      waga: "wazne",
      tytul: "Roboty asystentów AI mają wstęp wzbroniony",
      fakt: `Zablokowane w robots.txt: ${p.robots.blokujeAi.join(", ")}.`,
      skutek:
        "Jeżeli blokada jest świadoma, nie ma tematu. Jeżeli została wklejona z cudzego pliku, odcina kanał, w którym ktoś właśnie pyta asystenta o wykonawcę w Waszej branży.",
      koszt: 50,
      samodzielnie: true,
      dostep: "dostęp do plików na serwerze",
    });
  }
  if (!p.daneStrukturalne.length) {
    dodaj({
      klucz: "brak_danych",
      obszar: "ai",
      waga: "drobne",
      tytul: "Brak danych uporządkowanych",
      fakt: "W dokumencie nie ma opisu firmy w formacie, który maszyna czyta wprost.",
      skutek:
        "Nazwa, adres, godziny i zakres usług podane w tym formacie trafiają do wizytówki w wynikach i do odpowiedzi asystenta bez zgadywania z treści.",
      koszt: 200,
      samodzielnie: false,
      dostep: "dostęp do kodu strony",
    });
  }

  // --- poczta, bo idzie tym samym kanałem co formularz --------------------
  if (p.poczta.mx && !p.poczta.spf) {
    dodaj({
      klucz: "brak_spf",
      obszar: "poczta",
      waga: "wazne",
      tytul: "Poczta z tej domeny nie ma wpisu SPF",
      fakt: "W DNS nie ma rekordu zaczynającego się od v=spf1.",
      skutek:
        "Wiadomości z Waszego adresu łatwiej lądują w spamie, a ktoś obcy może podszyć się pod tę domenę bez żadnej przeszkody.",
      koszt: 120,
      samodzielnie: false,
      dostep: "dostęp do DNS domeny",
    });
  }
  if (p.poczta.mx && !p.poczta.dmarc) {
    dodaj({
      klucz: "brak_dmarc",
      obszar: "poczta",
      waga: "drobne",
      tytul: "Brak polityki DMARC",
      fakt: "Nie ma rekordu _dmarc dla tej domeny.",
      skutek:
        "DMARC mówi serwerom odbiorców, co zrobić z wiadomością, która podszywa się pod Waszą domenę. Bez niego decyzja należy do nich.",
      koszt: 120,
      samodzielnie: false,
      dostep: "dostęp do DNS domeny",
    });
  }

  const kolejnosc: Record<Waga, number> = { krytyczne: 0, wazne: 1, drobne: 2 };
  return u.sort((a, b) => kolejnosc[a.waga] - kolejnosc[b.waga] || b.koszt - a.koszt);
}

export type Wycena = {
  /** Suma kosztów pojedynczych napraw, bez rabatu. */
  osobno: number;
  /** Cena za komplet. To jest liczba, którą pokazujemy. */
  pakiet: number;
  /** Ile klient oszczędza, biorąc wszystko naraz. */
  rabat: number;
  /** Sam zestaw krytycznych, dla kogoś, kto chce zacząć od najtańszego kroku. */
  pilne: number;
  dniRobocze: number;
};

/**
 * Rabat pakietowy rośnie z liczbą pozycji, bo druga i trzecia poprawka w tym
 * samym projekcie kosztuje mnie realnie mniej niż pierwsza: wdrożenie,
 * dostępy i testy robi się raz. To nie jest chwyt, tylko przeniesienie na
 * klienta tego, co faktycznie oszczędzam.
 */
export function wycenNaprawe(ustalenia: Ustalenie[]): Wycena {
  const platne = ustalenia.filter((x) => x.koszt > 0);
  const osobno = platne.reduce((s, x) => s + x.koszt, 0);
  if (!osobno) return { osobno: 0, pakiet: 0, rabat: 0, pilne: 0, dniRobocze: 0 };

  const mnoznik = platne.length >= 8 ? 0.65 : platne.length >= 5 ? 0.75 : platne.length >= 3 ? 0.85 : 1;
  const pakiet = Math.max(150, Math.round((osobno * mnoznik) / 10) * 10);
  const pilne = platne
    .filter((x) => x.waga === "krytyczne")
    .reduce((s, x) => s + x.koszt, 0);

  return {
    osobno,
    pakiet,
    rabat: osobno - pakiet,
    pilne: pilne ? Math.max(150, Math.round((pilne * 0.9) / 10) * 10) : 0,
    dniRobocze: Math.max(1, Math.ceil(platne.length / 3)),
  };
}

/** Punktacja 0-100. Służy do jednego zdania werdyktu, nie do chwalenia się. */
/**
 * Punktacja 0-100. Służy do jednego zdania werdyktu, nie do chwalenia się.
 *
 * Zwraca null, gdy nie zobaczyliśmy strony. Ocena wystawiona ekranowi
 * ochrony albo martwemu adresowi byłaby oceną czegoś innego niż strona
 * klienta, a liczba na ekranie wygląda wiarygodnie niezależnie od tego, czy
 * ma pokrycie.
 */
export function punktacja(ustalenia: Ustalenie[]): number | null {
  if (ustalenia.some((x) => x.klucz === "zablokowany" || x.klucz === "brak_strony")) {
    return null;
  }
  const kara = ustalenia.reduce(
    (s, x) => s + (x.waga === "krytyczne" ? 22 : x.waga === "wazne" ? 9 : 3),
    0,
  );
  return Math.max(0, Math.min(100, 100 - kara));
}

/** Zbiór dostępów bez powtórzeń, w kolejności od najczęściej potrzebnego. */
export function potrzebneDostepy(ustalenia: Ustalenie[]): string[] {
  const licznik = new Map<string, number>();
  for (const x of ustalenia) {
    if (!x.dostep) continue;
    licznik.set(x.dostep, (licznik.get(x.dostep) ?? 0) + 1);
  }
  return [...licznik.entries()].sort((a, b) => b[1] - a[1]).map(([d]) => d);
}
