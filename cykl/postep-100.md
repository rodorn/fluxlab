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

## Niezrobione (do kolejnych cykli)
Reszta listy: wymaga większych zmian lub budżetu tygodnia. 74, 80, 86 celowo bez zgody.
