# Postęp wdrożenia 100 pomysłów

Budżet tygodnia przycięty (rytm zwolnij, alarm), więc wdrożono najważniejszą część i zatrzymano się.

## Paczka 1, commit 506b8fe
33 bento oferty (wyróżniona karta na całą szerokość, dwie pod nią), 37 sekcja zasady na pełnym kolorze marki, 21 oś kroków rysowana przy przewijaniu, 65 wynik audytu jako tarcza, 19 liczby wyników odliczane raz, 68 dynamiczne OG (/og?t=) dla 8 podstron z własnym openGraph.
82 pominięte: 404 ma już wyszukiwarkę podstron.

## Paczka 2, commit f360a8d
9 wielki napis fluxlab w stopce, 73 kopiowanie maila, 56 theme-color, 54 pasek przewijania w kolorze marki, 6 cyfry tabelaryczne, 12 kerning nagłówków.
Zrobione już wcześniej: 3, 92.
Pominięte: 55 (ikona gradientowa czytelna na obu tłach).

## Paczka 3, commit 9565c1d
1 waga H1 przy przewijaniu (CSS scroll timeline), 4 liczby wyników z obrysem, 5 wisząca interpunkcja, 8 gradient w słowie H1, 10 węższa kolumna artykułów, 11 inicjał, 43 linie 0,5 px na 2x, 45 cienie warstwowe (tailwind). 44: skala już spójna, bez zmian.

## Paczka 4
7 nagłówki sekcji pisane raz na sesję, 15 ramka FINREAL prostuje się przy przewijaniu, 16 paralaksa kół, 23 menu mobilne na sprężynie, 26 maska clip-path sekcji Zasada, 29 drżenie pola po błędzie.
Pominięte: 18 (ramka to suwak z kursorem ew-resize, karty mają własne CTA), 24 (animacja wysyłki z ptaszkiem już jest), 22 (brak sensownego miejsca na ikony), 30 (jest jedna realizacja).

## Paczka 5
34 więcej oddechu (sekcje strony głównej), 35 numeracja sekcji 01-04, 38 stopka z ekranem wezwania (poza /, /kontakt, /dziekuje, /panel, /cv), 47 szkło tylko w nagłówku i menu (przycisk wtórny bez blur), 49 kolor P3 na przycisku i pełnym kolorze marki, 50 oddychająca poświata pod głównym przyciskiem, 52 gradientowa ramka karty przy najechaniu.
Pominięte: 32 (asymetria łamie oś symetrii), 36 (pionowy napis koliduje z układem na telefonie), 40 (pasek akcji już jest), 41 (jedna ramka realizacji już jest), 48 (trzy odcienie już są: 950, 900, 800), 51 (siatka i plamy w hero już są), 57 i 58 (brak ilustratora i zdjęć do tonowania).

## Paczka 6
63 tryb blueprint po kodzie Konami (przełącza się ponownie tym samym kodem), 72 podgląd linków wewnętrznych w artykułach (karta z tytułem i opisem, lazy), 79 taśma szkic, makieta, gotowa strona na /strony-www, 84 podpis autora i data aktualizacji z gita pod artykułami, 98 skrypt spójności pilnuje wartości spoza skali (rounded, shadow, odstępy), 99 tytuł karty przy nowej odpowiedzi czatu w tle (kropka w ikonie już była), 100 komentarz w źródle HTML.
Pominięte: 85 (podświetlanie pojęć wymagałoby zmiany DOM zarządzanego przez React, ryzyko błędów hydracji), 76 i 81 (Manifest i /zmiany już są), 83 (oś kroków już interaktywna na /jak-pracuje).

## Paczka 7
83 kroki na /jak-pracuje zapalają się przy przewijaniu, 22 ptaszki w krokach same się rysują, 88 rozmyty podgląd przed zdjęciem realizacji (AVIF i WebP były już w next.config), 93 druk z adresami linków i translate="no" na nazwie marki, 95 przyciski formularzy z efektem („Wyślij i poproś o cenę”), 87 zmierzone lokalnie: LCP strony głównej 164 ms (element H1, tekst bez obrazka), Lighthouse niedostępny w środowisku.
Pominięte: 77 i 78 (są tylko dwa zrzuty FINREAL, brak wideo), 94 (literówki sprawdza już scripts/jakosc.mjs hunspellem pl_PL, w każdej paczce), 96 (komunikaty błędów są już po ludzku: „Nie udało się sprawdzić tego adresu”), 97 (app/loading.tsx opakowuje całą stronę w Suspense i psuł statyczny HTML, cofnięte; stany puste i „Wysyłanie...” już są).

## Domknięcie listy
Pominięte z powodem: 31 (siatka 12 kolumn to narzędzie projektanta, klient jej nie potrzebuje; tryb blueprint z 63 daje ten sam podgląd), 39 (hero jest już proste), 67 (styl druku już był), 59, 60, 61, 66, 70, 71, 75 (drugi agent), 86 (koordynator), 74, 80 (brak zgody).

## Agent narzędzi, commity 5173a63 i 45a81c8 (READY na Vercelu)
59 przycisk „Odbierz” na telefonie handlowca w demo leada (ekran rozmowy z licznikiem i kartą leada, „Rozłącz” wraca). 60 podgląd makiety strony w konfiguratorze /strony-www, składany na żywo z rodzaju i opcji. 61 skan adresu w audycie (okno przeglądarki z linią skanu i kropkami etapów, wersja reduced-motion bez ruchu). 66 oś terminów Meet: suwak po minucie za palcem, rezerwacja skacze na najbliższy wolny start, ramka dojeżdża płynnie, strzałki przeskakują po wolnych terminach. 70 kalkulator „co dostajesz za budżet” na /produkty (ceny wejścia z lib/products.ts, bez pozycji „/mc”). 71 formularz w 3 krokach (treść, e-mail i firma, sposób kontaktu); wszystkie pola zostają w DOM, więc wysyłka, szkic, brief głosowy i konfigurator działają jak dotąd; test wysyłką z podmienionym fetch (payload ten sam, brak prawdziwej wysyłki). 75 po audycie przycisk „Porównaj z fluxlab.pl” uruchamia ten sam audyt na fluxlab.pl na żywo (wynik w sessionStorage), liczby nie są wpisane na stałe.
Uwaga: commit 5173a63 zawiera znaczniki konfliktu w globals.css (rebase z paczką 7), naprawione w 45a81c8; pierwszy deploy mógł się nie zbudować.

## Runda 3 (drugi agent, bez pomijania z wygody)
Etykiety przycisków i obrazek OG na /ksef-integracja i /e-doreczenia-integracja (95, 68): zacommitowane, cała różnica to rzeczy z listy.
Paczka A: 39 w hero tylko jedna pigułka naraz (powitanie po audycie wygrywa z „po godzinach”), telefon handlowca (sekcja 04) i oba przyciski bez zmian. 55 favicon w ciemnym motywie (osobne kolory w @media prefers-color-scheme wewnątrz icon.svg, ciemniejszy kafel z jasną obwódką). 57 jedno tonowanie zdjęć (klasa foto-ton: wyciszone nasycenie i chłodny odcień marki; okładki artykułów ze zdjęciem, portret, zdjęcia kreatora aut; zrzuty FINREAL bez tonowania, bo to dokument). 58 ikony liniowe w jednym stylu (components/Ilustracje.tsx: strony, CRM, automatyzacje, audyt) na kartach oferty i w sekcji audytu. 82 nowa 404 z ilustracją (rozdarta kartka i lupa, lekki ruch za kursorem, reduced-motion bez), wyszukiwarka bez zmian.
