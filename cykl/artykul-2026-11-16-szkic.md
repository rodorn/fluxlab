Szkic na 16.11 (NIE w app/). Temat z cykl/kalendarz-wpisow.md (16.11, leady, link /czas-reakcji-na-leada). Oznaczenia [F1] do [F6] usuń przy publikacji.

Kąt: /czas-reakcji-na-leada opisuje auto-odpowiedź i leady po godzinach. Ten tekst mówi, kto pracuje w weekend (dyżur według Kodeksu pracy, odpoczynek) i które leady mają kogoś budzić. Duplikaty w app/strefa-wiedzy (lead, weekend, black, sobot, dyzur): 0 (15.11).

## Fakty (aktualne 15.11.2026)

Źródło F1-F5: Kodeks pracy, tekst jednolity Dz.U. 2026 poz. 1245, status IN_FORCE, https://api.sejm.gov.pl/eli/acts/DU/2026/1245/text.pdf (odczyt 15.11, 200, 1,18 MB). Aktów z „Kodeks pracy” w tytule ogłoszonych po 2.09.2026: 0 (ELI search).
F1 Art. 151[5] § 1: pracodawca może zobowiązać pracownika do gotowości do pracy poza normalnymi godzinami w zakładzie lub innym wyznaczonym miejscu (dyżur). Aktualne 15.11.
F2 Art. 151[5] § 2: czasu dyżuru bez pracy nie wlicza się do czasu pracy; dyżur nie może naruszać odpoczynku z art. 132 i 133. Aktualne 15.11.
F3 Art. 151[5] § 3: za dyżur, z wyjątkiem dyżuru w domu, czas wolny albo wynagrodzenie (60%, gdy stawki nie wyodrębniono). Aktualne 15.11.
F4 Art. 132 § 1 i art. 133 § 1: 11 godzin nieprzerwanego odpoczynku w każdej dobie, 35 godzin w każdym tygodniu. Aktualne 15.11.
F5 Art. 151[3]: praca w nadgodzinach w dniu wolnym z rozkładu (przeciętnie pięciodniowy tydzień) daje inny dzień wolny do końca okresu rozliczeniowego, w terminie uzgodnionym z pracownikiem. Aktualne 15.11.
F6 Black Friday 2026: piątek 27.11 (26.11 to czwarty czwartek listopada, `date` 15.11). Aktualne 15.11.

Nie piszemy (brak źródła): liczby leadów w weekend, spadku skuteczności po godzinie, wyników u klientów. Dyżur dotyczy umowy o pracę; przy B2B i zleceniu to kwestia umowy.

## Szkic

Adres: /strefa-wiedzy/lead-w-weekend-black-friday
Kategoria: lib/categories.ts, grupa „Audyt procesu, leady, zadania, statusy i pierwsze wdrożenia.”
Tytuł (52 zn.): Lead w sobotę po Black Friday: kto odpowie | Fluxlab
Opis (142 zn.): Black Friday 2026 wypada 27.11, a leady przyjdą też w sobotę. Kto ma je odebrać, ile kosztuje dyżur handlowca w domu i co może zrobić automat.
H1: Kto odpowiada na leada w sobotę po Black Friday

Black Friday wypada w piątek 27 listopada, więc zgłoszenia z kampanii spłyną też w weekend. [F6] Kto je odbiera, ustal przed sobotą.

### Dyżur w domu nie jest czasem pracy

Pracodawca może zobowiązać handlowca do gotowości do pracy poza jego godzinami, to dyżur. [F1] Dyżur w domu bez pracy nie jest czasem pracy i nie daje czasu wolnego ani wynagrodzenia, ale odebrana rozmowa z klientem już tak. [F2, F3]

### Odpoczynek zostaje

Dyżur nie może zabrać 11 godzin odpoczynku na dobę ani 35 godzin w tygodniu. [F2, F4] Za przepracowaną wolną sobotę należy się inny dzień wolny do końca okresu rozliczeniowego. [F5]

### Niech dyżurnego budzą tylko ważne leady

Automat odpowiada klientowi od razu i ustawia zadanie na poniedziałek, jak opisujemy na /czas-reakcji-na-leada. Dyżurny dostaje powiadomienie tylko o zgłoszeniu powyżej progu, na przykład wartości zamówienia. Reszta czeka w CRM z terminem.

Linki: /czas-reakcji-na-leada (na „jak opisujemy”), /koszt-recznej-obslugi-leadow (na „Reszta czeka”), /slownik#crm (na „CRM”).
Link przychodzący: z /czas-reakcji-na-leada, FAQ „Co z leadami po godzinach pracy?”, na słowie „po godzinach”.

FAQ (2):

1. Czy za dyżur pod telefonem w domu trzeba płacić?
   Nie, jeśli w tym czasie nie było pracy. Odebrane zgłoszenia to już czas pracy. [F2, F3]
2. Ile odpoczynku musi mieć handlowiec po weekendzie z dyżurem?
   Co najmniej 11 godzin w każdej dobie i 35 godzin w tygodniu. [F4]
