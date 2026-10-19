Szkic na 02.11 (NIE w app/). Źródło faktów: MF, „Pytania i odpowiedzi KSeF 2.0”, https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/ (opublikowano 17.09.2025, zmodyfikowano 08.10.2026), odczyt z VPS (curl) 19.10.2026 14:50. Oznaczenia [F1] do [F4] do usunięcia przy publikacji. Przed publikacją odczytaj stronę ponownie i potwierdź F1 do F4.

Adres: /strefa-wiedzy/faktury-kosztowe-z-ksef
Tytuł (55 zn.): Faktury kosztowe z KSeF: jak je pobierać same | Fluxlab
Opis (154 zn.): KSeF nie powiadamia o nowej fakturze zakupowej. Program musi sam ją pobrać, a data w KSeF to data jej otrzymania. Jak to zautomatyzować bez przepisywania.
H1: Faktury kosztowe z KSeF: jak pobierać je automatycznie

Akapit 1 (wstęp, przykład):
Dostawca wystawił fakturę w piątek o 16:00. KSeF nikomu o tym nie powie: nie wyśle maila ani powiadomienia, a sprzedawca nie zobaczy, czy ją pobrałeś. Jeśli nikt nie zajrzy do KSeF, faktura czeka tam do końca miesiąca. [F1, F2]

H2: Data w KSeF liczy się jak data otrzymania
Fakturę uznaje się za otrzymaną w dniu nadania jej numeru KSeF, nie w dniu, w którym ją otworzysz. Od tej daty liczysz moment odliczenia VAT, więc pobieranie raz w miesiącu oznacza pracę pod presją terminu. [F3]

H2: Jak to zautomatyzować
Program księgowy albo osobny skrypt co kilka godzin pyta KSeF przez API o nowe faktury i pobiera je jako XML. Dalej trafiają do księgowości, obiegu dokumentów albo arkusza, z numerem KSeF przy każdej. [F4]

FAQ (4):

1. Czy KSeF wyśle mi powiadomienie o nowej fakturze?
   Nie. Nowe faktury sprawdzasz sam w Aplikacji Podatnika KSeF, w aplikacji mobilnej albo programem, który robi to regularnie. [F1]
2. Czy sprzedawca widzi, że pobrałem fakturę?
   Nie, KSeF nie daje takiej informacji. Dla sprzedawcy liczy się nadanie numeru, nie twoje pobranie. [F2]
3. W jakim formacie pobiorę faktury hurtem?
   Przez API tylko jako XML. PDF z kodem QR program robi sam z tego pliku. [F4]
4. Czy mogę wymagać od sprzedawcy faktury mailem?
   Nie. Przy krajowym nabywcy z NIP mail jest tylko kanałem pomocniczym, a przepisy nie każą wysyłać faktury poza KSeF. [strona F, pytanie o XML lub wizualizację przez e-mail]

Fakty ze źródła (dosłowny sens):
F1 KSeF nie wysyła powiadomień; oprogramowanie musi regularnie sprawdzać nowe faktury; do sprawdzenia ręcznego Aplikacja Podatnika KSeF i Aplikacja Mobilna KSeF.
F2 Nie da się sprawdzić, czy nabywca pobrał fakturę z KSeF.
F3 Data nadania numeru KSeF (UPO, „Data przyjęcia dokumentu do systemu teleinformatycznego MF”) decyduje o momencie otrzymania faktury przez nabywcę.
F4 Automatyczne pobieranie przez integrację jest możliwe; masowe pobieranie przez API wyłącznie w XML.

Linki w tekście: /ksef-integracja (na „Jak to zautomatyzować” w H2 albo „osobny skrypt”), /strefa-wiedzy/kiedy-odliczyc-vat-z-faktury-ksef (na „moment odliczenia VAT”), /slownik#ksef (pierwsze „KSeF” we wstępie).
Link przychodzący: z /ksef-integracja na istniejącej frazie „Faktury zakupowe pobierane z KSeF automatycznie” (pakiet „Odbiór faktur kosztowych”, linia 87) albo z FAQ kiedy-odliczyc-vat-z-faktury-ksef, 0 nowych słów.
Sprawdzone 19.10: `ls app/strefa-wiedzy | grep -iE "kosztow|zakup"` puste; /ksef-integracja, kiedy-odliczyc-vat-z-faktury-ksef i slug „ksef” w słowniku istnieją. Bez numerów artykułów ustawy.
