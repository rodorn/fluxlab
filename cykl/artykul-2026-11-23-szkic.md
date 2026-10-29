Szkic na 23.11 (NIE w app/). Temat z cykl/kalendarz-wpisow.md (23.11, CRM, link /automatyzacja-raportowania). Oznaczenia [F1] do [F5] do usunięcia przy publikacji. Przed publikacją odczytaj źródła ponownie i potwierdź F1-F3 (teksty jednolite mogły się zmienić).

Duplikaty sprawdzone 29.10: `ls app/strefa-wiedzy | grep zamkniecie` daje 0. Pokrewne: /strefa-wiedzy/jak-uporzadkowac-proces-sprzedazy-w-crm (etapy z kryteriami przejścia, jakość danych), /strefa-wiedzy/najczestsze-bledy-w-raportowaniu-sprzedazy (definicje, ręczne arkusze), /strefa-wiedzy/jak-zautomatyzowac-raportowanie-w-firmie. /automatyzacja-raportowania (curl 29.10) to widełki cen raportu (790 do 1 500 zł za źródło), co automatyzujemy i FAQ o koszcie. Nowy tekst NIE powtarza tego: jego kąt to termin, czyli jeden dzień porządku przed końcem roku (martwe szanse, faktury przedawniające się 31.12, zamrożenie liczb roku). Automat raportu tylko jednym zdaniem z linkiem.

## Fakty (odczyt 29.10.2026)

Źródło F1-F2: Kodeks cywilny, tekst jednolity Dz.U. 2026 poz. 795 (obwieszczenie z 27.05.2026), https://api.sejm.gov.pl/eli/acts/DU/2026/795/text.pdf (29.10.2026)
F1 Art. 118: termin przedawnienia wynosi sześć lat, a dla roszczeń związanych z prowadzeniem działalności gospodarczej trzy lata; koniec terminu przypada na ostatni dzień roku kalendarzowego, chyba że termin jest krótszy niż dwa lata.
F2 Art. 554: roszczenia z tytułu sprzedaży dokonanej w zakresie działalności przedsiębiorstwa sprzedawcy przedawniają się z upływem lat dwóch. Wyliczenie z F1 i F2 (art. 120 § 1: bieg od wymagalności): faktura za sprzedaż z terminem zapłaty w 2024 przedawnia się 31.12.2026; inne roszczenie firmowe (usługa) wymagalne w 2023 też 31.12.2026.
Źródło F3: ustawa o dniach wolnych od pracy, tekst jednolity Dz.U. 2025 poz. 296, https://api.sejm.gov.pl/eli/acts/DU/2025/296/text.pdf (29.10.2026)
F3 Art. 1 pkt 1 lit. ka: 24 grudnia, Wigilia Bożego Narodzenia, jest dniem wolnym od pracy (dodane ustawą z 6.12.2024, Dz.U. 2024 poz. 1965, w mocy od 1.02.2025).
F4 Kalendarz 2026: 24.12 czwartek, 31.12 czwartek, 1.01.2027 piątek. Sprawdzone `date` 29.10.2026.
F5 /automatyzacja-raportowania: raport z jednego źródła 790 do 1 500 zł (curl https://fluxlab.pl/automatyzacja-raportowania, 29.10.2026). Tylko jeśli link dostanie kwotę; domyślnie bez kwoty.

Czego NIE piszemy (brak źródła): RODO i okres przechowywania danych leadów (EUR-Lex 29.10 zwrócił pustą stronę z kodem 202, UODO bez tekstu artykułu), ile szans w typowym lejku jest martwych, jakiekolwiek liczby u klientów. Przedawnienie tylko w zdaniu z F1/F2, bez porad o przerwaniu biegu (art. 123 nie był czytany).

## Szkic (Z13, 29.10.2026)

Adres: /strefa-wiedzy/zamkniecie-roku-w-crm
Kategoria: lib/categories.ts, „Raportowanie” (slug raportowanie).
Tytuł (59 zn. z sufiksem): Zamknięcie roku w CRM: lejek i dane w jeden dzień | Fluxlab
Opis (126 zn.): Zamknij rok w CRM w jeden dzień: martwe szanse, faktury, które przedawniają się 31.12, i liczby zamrożone do raportu rocznego.
H1: Zamknięcie roku w CRM w jeden dzień

Wigilia jest od 2025 roku dniem wolnym, a w tym roku wypada w czwartek, tak jak 31 grudnia. [F3, F4] Porządek w CRM zaplanuj więc na jeden dzień w połowie grudnia, nie na ostatnie godziny roku.

### Zamknij szanse, które nie żyją

Szansa bez żadnego ruchu od kwartału zawyża lejek i prognozę na 2027. Zamknij ją jako przegraną z jednym powodem z krótkiej listy, wtedy raport roczny pokaże, dlaczego tracisz sprzedaż, a nie tylko ile.

### Przejrzyj nieopłacone faktury przed 31 grudnia

Roszczenie ze sprzedaży w ramach firmy przedawnia się po dwóch latach, inne roszczenie z działalności po trzech, a koniec terminu wypada na ostatni dzień roku. [F1, F2] Dla faktury za sprzedaż z terminem zapłaty w 2024 roku to właśnie 31 grudnia 2026.

### Zamroź liczby roku jednym eksportem

Raport roczny licz z kopii stanu na 31 grudnia, a nie z żywego CRM, w którym ktoś w styczniu jeszcze coś poprawi. Eksport i zestawienie może co roku robić automat, jak opisujemy na /automatyzacja-raportowania.

Linki: /automatyzacja-raportowania (na „jak opisujemy”), /slownik#lejek (slug istnieje w lib/slownik.ts:113, na „lejek”), /strefa-wiedzy/jak-uporzadkowac-proces-sprzedazy-w-crm (na „z krótkiej listy”).
Link przychodzący: z /strefa-wiedzy/jak-uporzadkowac-proces-sprzedazy-w-crm, sekcja „Jakość danych, potem automatyzacja”, na istniejących słowach „Pola obowiązkowe” (bez linku; „raportowanie” obok już prowadzi do /automatyzacja-raportowania), 0 nowych słów.

FAQ (3):

1. Kiedy przedawnia się nieopłacona faktura za sprzedaż z 2024 roku?
   Jeśli termin zapłaty minął w 2024 roku, roszczenie przedawnia się 31 grudnia 2026. [F1, F2]
2. Czy 24 grudnia jest dniem wolnym od pracy?
   Tak, od 2025 roku Wigilia jest ustawowo wolna. [F3]
3. Czy przegrane szanse usunąć z CRM?
   Nie. Zamknij je z powodem, inaczej raport roczny nie pokaże, gdzie lejek traci najwięcej.
