# Szkic artykułu 02.11.2026: faktury kosztowe z KSeF prosto do programu księgowego

Temat z cykl/kalendarz-wpisow.md (02.11, KSeF, link /ksef-integracja). Duplikaty sprawdzone 26.10:
`grep -ril kosztow app/strefa-wiedzy` daje 4 strony, w żadnej faktury kosztowe nie są tematem
(wzmianki przy okazji). Najbliższa: /strefa-wiedzy/faktury-z-ksef-po-zmianie-biura (uprawnienie dla
biura, dostęp do faktur z 2026), więc nowy tekst ma mówić o automatycznym pobieraniu do programu,
nie o zmianie biura; link do niej zamiast powtarzania. /ksef-integracja już mówi: „faktury zakupowe
pobierane z KSeF automatycznie”, „integracja ma sens, gdy faktury kosztowe trzeba pobierać ręcznie”.

## Fakty (odczyt 26.10.2026)

F1 Faktura jest uznana za otrzymaną w momencie, gdy system nada jej numer KSeF; nabywca nie musi jej
   akceptować ani potwierdzać. Datę widać w UPO w polu „Data przyjęcia dokumentu do systemu
   teleinformatycznego MF”. Źródło: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/ (26.10.2026)
F2 „KSeF nie wysyła powiadomień”: program musi sam sprawdzać, czy są nowe faktury. Ten sam adres.
F3 „System pozwala na integrację, dzięki której faktury będą automatycznie pobierane.” Ten sam adres.
F4 Sprzedawca nie sprawdzi, czy nabywca pobrał fakturę („Nie, system nie daje takiej informacji”), i nie
   musi wysyłać mu numeru KSeF. Ten sam adres.
F5 Otrzymywanie faktur przez KSeF obowiązuje od 1.02.2026, także podatników z limitem 10 tys. zł
   (ich wyjątek dotyczy wystawiania do 31.12.2026). Ten sam adres; terminy wystawiania: lib/terminy-ksef.ts
   (1.02.2026 powyżej 200 mln zł, 1.04.2026 pozostali, 1.01.2027 limit 10 tys. zł i kasy).
F6 Bezpłatne narzędzia MF: Aplikacja Podatnika KSeF i Aplikacja Mobilna KSeF (od 1.02.2026), w której
   można się zalogować i sprawdzić faktury wystawione dla firmy. Ten sam adres.
F7 Masowe pobieranie faktur jest możliwe wyłącznie w postaci XML. Ten sam adres (część techniczna).
F8 Faktury są archiwizowane w KSeF przez 10 lat. Ten sam adres („Co to jest e-Faktura?”).
F9 Uprawnienie do przeglądania faktur (InvoiceRead) można nadać osobie albo całemu biuru rachunkowemu,
   z możliwością delegowania pracownikom; nadaje się je w Aplikacji Podatnika albo w programie przez API.
   Źródła: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/ oraz
   https://github.com/CIRFMF/ksef-docs/blob/main/uprawnienia.md (26.10.2026)
F10 Token do programu komercyjnego działa, jeśli wygenerowała go osoba z odpowiednimi uprawnieniami;
   token jest ważny do unieważnienia przez użytkownika (MF 26.10: tokeny zostają bezterminowo, patrz
   /strefa-wiedzy/certyfikat-ksef). Źródło: https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/
F11 Przyrostowe pobieranie w API KSeF 2.0: eksport paczek po dacie trwałego zapisu (PermanentStorage),
   okna przylegające; najwyżej 20 eksportów na godzinę łącznie, przy ciągłej synchronizacji 4 na godzinę
   na typ podmiotu, interwał nie krótszy niż 15 minut. Źródło:
   https://github.com/CIRFMF/ksef-docs/blob/main/pobieranie-faktur/przyrostowe-pobieranie-faktur.md (26.10.2026)
F12 Domyślne limity API (wersja 1.1, 9.06.2026): eksport paczki faktur 8/s, 16/min, 20/h; lista metadanych
   8/16/20; pobranie faktury po numerze KSeF 8/16/64; limity można podnieść wnioskiem z uzasadnieniem.
   Źródło: https://ksef.podatki.gov.pl/media/uq4pq4mo/zalacznik-do-wniosku-o-zwiekszenie-limitow-wer-1_1-09062026.pdf (26.10.2026)

Czego NIE piszemy (brak źródła): ile minut pracy zdejmuje automat na fakturze; konkretne programy
księgowe i ich funkcje; maksymalna liczba faktur w jednej paczce.

## Szkic (Z22, 26.10.2026)

Adres: /strefa-wiedzy/faktury-kosztowe-z-ksef
Tytuł: Faktury kosztowe z KSeF prosto do programu księgowego
Opis: KSeF nie powiadamia o nowych fakturach zakupowych. Sprawdź, jak program ma je pobierać sam, jakie uprawnienie nadać i jakie limity ma API.

### Faktura kosztowa jest Twoja w chwili nadania numeru
Nie musisz jej akceptować ani odbierać. Fakturę uznaje się za otrzymaną, gdy KSeF nada jej numer, a datę widać w UPO. [F1] Od 1 lutego 2026 tak dostaje faktury każda firma, także ta, która sama wystawia jeszcze poza systemem. [F5]

### KSeF nic Ci nie powie
System nie wysyła powiadomień, a sprzedawca nie musi przesyłać numeru faktury. [F2, F4] Jeśli nikt nie zajrzy do KSeF, koszt czeka tam niezauważony, choć faktury leżą w systemie przez 10 lat. [F8]

### Ręcznie czy automatem
Przy kilku fakturach wystarczy Aplikacja Podatnika albo Aplikacja Mobilna KSeF. [F6] Przy większej liczbie program może pobierać faktury sam, przez integrację z API. [F3] Masowo pobierzesz je wyłącznie jako XML, więc program musi umieć je odczytać. [F7]

### Jedno uprawnienie i token
Program albo biuro potrzebuje uprawnienia do przeglądania faktur. Nadasz je w Aplikacji Podatnika, a biuro może przekazać je swoim pracownikom. [F9] Token do programu generuje osoba z uprawnieniami i działa on do unieważnienia. [F10] Szczegóły przy zmianie biura: /strefa-wiedzy/faktury-z-ksef-po-zmianie-biura.

### Jak często program może pytać
API pozwala na najwyżej 20 eksportów faktur na godzinę, a przy stałej synchronizacji zalecane jest sprawdzanie nie częściej niż co 15 minut. [F11, F12] Firma, której to nie wystarcza, może wnioskować o wyższe limity z uzasadnieniem. [F12]

Link wychodzący do narzędzia: numer z faktury sprawdzisz w /numer-ksef. Linki: /ksef-integracja, /slownik#ksef.

FAQ (3):
1. Czy muszę potwierdzić odbiór faktury w KSeF?
   Nie. Faktura jest otrzymana w chwili nadania numeru KSeF. [F1]
2. Czy KSeF wyśle mi maila o nowej fakturze?
   Nie, system nie wysyła powiadomień. Sprawdza program albo Ty. [F2]
3. Czy biuro rachunkowe może pobierać moje faktury kosztowe?
   Tak, po nadaniu mu uprawnienia do przeglądania faktur. [F9]
