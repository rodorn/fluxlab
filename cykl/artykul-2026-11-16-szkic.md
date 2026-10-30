Szkic na 16.11 (NIE w app/). Temat z cykl/kalendarz-wpisow.md (16.11, leady, link /czas-reakcji-na-leada). Oznaczenia [F1] do [F6] do usunięcia przy publikacji. Przed publikacją odczytaj źródła ponownie i potwierdź F1-F5 (tekst jednolity KP mógł się zmienić).

Duplikaty sprawdzone 28.10: `ls app/strefa-wiedzy | grep -iE "lead|weekend|black|sobot"` daje 0. /czas-reakcji-na-leada (curl 28.10) mówi o drodze leada w 30 sekund, auto-odpowiedzi, eskalacji po 5 minutach i w FAQ „Co z leadami po godzinach pracy?” (auto-odpowiedź z czasem oddzwonienia i zadanie na rano). Nowy tekst NIE powtarza tego: jego kąt to kto pracuje w weekend (dyżur według Kodeksu pracy, odpoczynek) i które leady w ogóle mają kogoś budzić. Auto-odpowiedź tylko jednym zdaniem z linkiem.

## Fakty (odczyt 28.10.2026)

Źródło F1-F5: Kodeks pracy, tekst jednolity Dz.U. 2026 poz. 1245 (obwieszczenie z 1.09.2026, ogłoszone 24.09.2026), https://api.sejm.gov.pl/eli/acts/DU/2026/1245/text.pdf (28.10.2026)
F1 Art. 151[5] § 1: pracodawca może zobowiązać pracownika do pozostawania poza normalnymi godzinami pracy w gotowości do wykonywania pracy w zakładzie lub w innym miejscu wyznaczonym przez pracodawcę (dyżur).
F2 Art. 151[5] § 2: czasu dyżuru nie wlicza się do czasu pracy, jeżeli podczas dyżuru pracownik nie wykonywał pracy; dyżur nie może naruszać odpoczynku z art. 132 i 133.
F3 Art. 151[5] § 3: za czas dyżuru, z wyjątkiem dyżuru pełnionego w domu, przysługuje czas wolny w wymiarze długości dyżuru, a gdy go nie można udzielić, wynagrodzenie (60%, jeśli stawki nie wyodrębniono).
F4 Art. 132 § 1 i art. 133 § 1: co najmniej 11 godzin nieprzerwanego odpoczynku w każdej dobie i co najmniej 35 godzin w każdym tygodniu.
F5 Art. 151[3]: za pracę w nadgodzinach w dniu wolnym z rozkładu w przeciętnie pięciodniowym tygodniu pracy przysługuje inny dzień wolny do końca okresu rozliczeniowego, w terminie uzgodnionym z pracownikiem.
F6 Black Friday 2026: piątek 27.11.2026 (dzień po Święcie Dziękczynienia w USA, czwartym czwartku listopada, 26.11.2026). Fakt kalendarzowy, sprawdzony `date` 28.10.2026.

Czego NIE piszemy (brak źródła): ile leadów przychodzi w weekend, o ile spada skuteczność po godzinie (badanie HBR z 2011 nie dało się odczytać 28.10, strona bez treści), jakiekolwiek liczby u klientów. Dyżur dotyczy pracowników na umowie o pracę; przy B2B i zleceniu to kwestia umowy, bez dalszych twierdzeń.

## Szkic (Z10, 28.10.2026)

Adres: /strefa-wiedzy/lead-w-weekend-black-friday
Kategoria: lib/categories.ts, grupa z opisem „Audyt procesu, leady, zadania, statusy i pierwsze wdrożenia.”
Tytuł (52 zn. z sufiksem): Lead w sobotę po Black Friday: kto odpowie | Fluxlab
Opis (142 zn.): Black Friday 2026 wypada 27.11, a leady przyjdą też w sobotę. Kto ma je odebrać, ile kosztuje dyżur handlowca w domu i co może zrobić automat.
H1: Kto odpowiada na leada w sobotę po Black Friday

Black Friday wypada w tym roku w piątek 27 listopada, więc zgłoszenia z kampanii spłyną też w sobotę i niedzielę. [F6] Kto je odbiera, trzeba ustalić przed weekendem, a nie w poniedziałek rano.

### Dyżur w domu nie jest czasem pracy

Pracodawca może zobowiązać handlowca do gotowości do pracy poza jego godzinami, to dyżur. [F1] Czas dyżuru, w którym nie było pracy, nie wlicza się do czasu pracy, a za dyżur pełniony w domu nie należy się czas wolny ani wynagrodzenie. [F2, F3] Odebrany telefon i rozmowa z klientem to już praca.

### Odpoczynek zostaje

Dyżur nie może zabrać 11 godzin odpoczynku na dobę ani 35 godzin w tygodniu. [F2, F4] Jeśli handlowiec przepracował wolną sobotę w nadgodzinach, dostaje w zamian inny dzień wolny do końca okresu rozliczeniowego. [F5]

### Niech dyżurnego budzą tylko ważne leady

Automat odpowiada klientowi od razu i ustawia zadanie na poniedziałek, jak opisujemy na /czas-reakcji-na-leada. Dyżurny dostaje powiadomienie tylko o zgłoszeniu, które przekracza ustalony próg, na przykład wartość zamówienia albo pilną usługę. Reszta czeka w CRM z terminem i nikt nie siedzi przy telefonie bez potrzeby.

Linki: /czas-reakcji-na-leada (na „jak opisujemy”), /koszt-recznej-obslugi-leadow (kalkulator, na „Reszta czeka”), /slownik#crm (slug istnieje w lib/slownik.ts, na „CRM”).
Link przychodzący: z /czas-reakcji-na-leada, FAQ „Co z leadami po godzinach pracy?”, na istniejącym słowie „po godzinach”, 0 nowych słów.

FAQ (3):

1. Czy za dyżur pod telefonem w domu trzeba płacić?
   Nie, jeśli w tym czasie nie było pracy. Odebrane zgłoszenia to już czas pracy. [F2, F3]
2. Ile odpoczynku musi mieć handlowiec po weekendzie z dyżurem?
   Co najmniej 11 godzin w każdej dobie i 35 godzin w tygodniu. [F4]
3. Kiedy jest Black Friday w 2026 roku?
   W piątek 27 listopada. [F6]

Kontrola Z20 (30.10.2026 02:00, curl lokalnie, api.sejm.gov.pl/eli/acts/DU/2026/1245/text.pdf 200, 1,18 MB): F1-F5 zgodne z brzmieniem, 5 z 5. F1 art. 151[5] § 1 „w gotowości do wykonywania pracy wynikającej z umowy o pracę w zakładzie pracy lub w innym miejscu wyznaczonym przez pracodawcę (dyżur)”; F2 § 2 „Czasu dyżuru nie wlicza się do czasu pracy, jeżeli podczas dyżuru pracownik nie wykonywał pracy” i zakaz naruszania art. 132 i 133; F3 § 3 „z wyjątkiem dyżuru pełnionego w domu”, 60%; F4 art. 132 § 1 (11 h w każdej dobie), art. 133 § 1 (35 h w każdym tygodniu); F5 art. 151[3] „inny dzień wolny od pracy … do końca okresu rozliczeniowego, w terminie z nim uzgodnionym”. F6: czwarty czwartek listopada 2026 to 26.11 (`date`), 27.11 to piątek. Linki 3 z 3 (curl -sI, 200): /czas-reakcji-na-leada, /koszt-recznej-obslugi-leadow, /slownik (kotwica id="crm" jest). Link przychodzący: fraza „po godzinach pracy?” na /czas-reakcji-na-leada jest. Duplikaty w app/strefa-wiedzy: 0. Title 52, description 142, FAQ 3, akapity 2-3 zdania. Poprawek brak.
