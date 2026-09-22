# Dziennik rozwoju strony

Każdy cykl godzinny dopisuje tu jeden wpis. Raport zbiorczy czyta wpisy od
ostatniego znacznika wysyłki i wysyła z nich jeden mail co cztery godziny.

<!-- WYSLANO 2026-09-22 00:00 -->

## 2026-09-22 00:58
**Co zrobione:** Sześć własnych tekstów badawczych przestało kończyć się ślepo: każdy dostał na końcu blok, w którym jedno kliknięcie w gotowy przykład uruchamia to samo sprawdzenie, którym zrobiono pomiar, pokazuje surowy werdykt wprost w artykule i dopiero potem proponuje pełne narzędzie oraz kontakt. Powód z audytu treści 5.4: żaden z tych tekstów nie prowadził do kontaktu, a ścieżka artykuł, narzędzie, wynik kończyła się pustym formularzem.
**Pliki:** `components/SprawdzPoBadaniu.tsx` (nowy), `app/strefa-wiedzy/maile-trafiaja-do-spamu/page.tsx`, `app/strefa-wiedzy/podszywanie-pod-salony-samochodowe/page.tsx`, `app/strefa-wiedzy/co-jest-nie-tak-ze-stronami-dealerow/page.tsx`, `app/strefa-wiedzy/czy-ai-widzi-strony-dealerow/page.tsx`, `app/strefa-wiedzy/bledy-w-rejestrze-obiektow-hotelarskich/page.tsx`, `app/strefa-wiedzy/konwersje-pokazuja-zero/page.tsx`, `AUDYT_TRESCI.md`.
**Dowód:** przed: 0 z 6 tekstów miało w treści odnośnik do `/kontakt` i 0 dawało wynik bez przechodzenia na inną stronę. Po: 6 z 6 ma odnośnik do `/kontakt` w treści, 5 z 6 uruchamia sprawdzenie na miejscu. Przeklikane w przeglądarce na lokalnym buildzie produkcyjnym: audyt poczty `fluxlab.pl` zwrócił „100 na 100 punktów" (zielony), monitor sądowy `CD PROJEKT` „6 ogłoszeń, żadne nie dotyczy rozwiązania" (zielony), dane sprzedawcy `fluxlab.pl` „NIP jest, numeru konta brak" (żółty, 1,7 s, widoczny stan ładowania), widoczność w AI „strona jest dostępna dla robotów AI". Przy 390 px dokument ma 390 px, bez przewijania w bok. Build i `scripts/spojnosc.mjs` czyste przed commitem. Produkcja sprawdzona dwoma zapytaniami: blok i odnośnik do kontaktu są w źródle. IndexNow: Yandex i Naver przyjęły 6 adresów, wspólny punkt nadal 403.
**Commit:** `ffb4ab5`.
**Zostało otwarte:** `konwersje-pokazuja-zero` jako jedyny nie ma sprawdzenia dającego wynik jednym kliknięciem, bo dla błędów pomiaru konwersji takiego nie mam, blok mówi to wprost. Nie zmierzyłem jeszcze, ilu czytelników klika w te przykłady: zdarzenie `uruchomiono_skan` idzie do licznika, ale bez rozróżnienia artykuł kontra strona narzędzia, warto dodać osobną nazwę. Z audytów nadal czekają: 2.3 martwe komponenty (16 nieimportowanych, dwa z wymyślonymi liczbami), 2.4 liczba mnoga na czterech stronach branżowych, 2.5 adres GitHuba jako tekst, kontrast w stopce, brak H1 na `/kontakt`, za długie `title` i `description`, kanibalizacja ośmiu stron o Zapier, Make i n8n.

## 2026-09-22 01:58
**Co zrobione:** Cztery strony branżowe (biura rachunkowe, e-commerce, agencje marketingowe, leasing) mówiły w liczbie mnogiej, jakby stała za nimi agencja, a reszta serwisu mówi w pierwszej osobie liczby pojedynczej; przestawiłem je na ten sam głos i przy okazji wyciąłem z nich liczby i zdania bez pokrycia. Element interaktywny cyklu: audyt kurierski dostał dwie gotowe pozycje faktury do policzenia jednym kliknięciem, bo był ostatnim z czternastu sprawdzeń bez takiego przycisku.
**Pliki:** `app/automatyzacja-dla-biur-rachunkowych/page.tsx`, `app/automatyzacja-dla-ecommerce/page.tsx`, `app/automatyzacja-dla-agencji-marketingowych/page.tsx`, `app/automatyzacja-crm-leasing/page.tsx`, `app/wdrozenie-n8n-cena/page.tsx`, `components/DoplataCheck.tsx`, `components/Footer.tsx`, `components/Pricing.tsx`, `AUDYT_TRESCI.md`.
**Dowód:** przed: 103 formy „my" w treści czterech stron (36 + 33 + 29 + 5). Po: zero poza pytaniami FAQ, gdzie mówi czytelnik o swojej firmie („Pracujemy w Comarch Optima", „Mamy 30 klientów", „Czy musimy integrować się ze wszystkimi?"), tam liczba mnoga została celowo. Wypadły trzy liczby bez źródła: „Onboarding skraca się z 2 dni do 30 minut", „9 na 10 firm leasingowych pracuje na mieszance", „oszczędza 80% ręcznej pracy". Wypadły trzy zdania sugerujące klientów, których nie ma: „sytuacje, które słyszę od właścicieli i kierowników biur", „narzędzia, w których robię najwięcej wdrożeń", „każdy z tych bólów spotykam w niemal każdej rozmowie". Zdanie o czterech systemach księgowych („Pracuję na wszystkich") zamienione na opis tego, co robi warstwa pośrednia, bo doświadczenia na Optimie, Symfonii, Enovie i InsERT nie ma. Poza czterema stronami: `components/Pricing.tsx` („Sprawdzamy" w opisie darmowego filtra), `components/Footer.tsx` („Nasza wizytówka w Zleca.pl", dodana wczoraj) i jedno zdanie na `/wdrozenie-n8n-cena`. Audyt kurierski: obie gotowe pozycje sprawdzone przez API na lokalnym buildzie produkcyjnym, 25 kg za 30 zł z dopłatą 12,75 zł daje zielone „Dopłata policzona prawidłowo", 18 kg za 24 zł z dopłatą 10,20 zł daje czerwone „Naliczono o 1.39 zł za dużo" z wyjaśnieniem, że to stawka z przedziału powyżej 20 kg. Build i `scripts/spojnosc.mjs` czyste przed commitem. Produkcja sprawdzona dwoma zapytaniami: przyciski z przykładami i nowy głos są w źródle. IndexNow: Yandex i Naver przyjęły 112 adresów, wspólny punkt nadal 403.
**Commit:** `bbe1a3c`.
**Zostało otwarte:** Nie ma kontroli, która pilnowałaby głosu na przyszłość. Reguła w `scripts/spojnosc.mjs` wymaga odsiania miejsc, gdzie „my" znaczy „ja i klient razem" („jakie systemy łączymy", „dobieramy w diagnozie", „pracujemy na twoim wzorze"), a takich jest kilkanaście, więc to osobny cykl. `app/strefa-wiedzy/podszywanie-pod-salony-samochodowe/page.tsx` opisuje metodę badania w liczbie mnogiej („sprawdziliśmy", „odgadliśmy"), wewnętrznie spójnie, ale niezgodnie z resztą serwisu. Z audytów nadal czekają: 2.3 martwe komponenty (16 nieimportowanych, dwa z wymyślonymi liczbami), 2.5 adres GitHuba jako tekst, kontrast w stopce, brak H1 na `/kontakt`, za długie `title` i `description`, kanibalizacja ośmiu stron o Zapier, Make i n8n.

## 2026-09-22, darmowy audyt techniczny z pomiarem wersji mobilnej

Zbudowane: `/audyt-strony` jako darmowe narzędzie zbiorcze zamiast płatnego
produktu za 19 zł. Pomiar komputer + osobno telefon, wycena naprawy
deterministyczna, raport pisany przez gpt-5.5 wyłącznie z podanych liczb.
Zgody marketingowe do kolektora na VPS, kopia każdego raportu na skrzynkę.

Kalibracja na siedmiu prawdziwych serwisach wyłapała trzy fałszywe alarmy:
strony ochrony 403 brane za treść klienta, regex robots.txt przeskakujący
między blokami agentów, TTFB usypianych instancji. Wszystkie naprawione przed
udostępnieniem.

<!-- WYSLANO -->
