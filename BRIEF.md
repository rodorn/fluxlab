# Fluxlab — Brief wdrożeniowy (źródło prawdy)

> Pełny briefing i gotowe teksty dostarczone przez Pawła.
> Punkt odniesienia dla wszystkich zmian wykonanych w ramach P0–P8.
> NIE EDYTUJ — to dokument referencyjny, nie roadmapa.

---

## Cel końcowy

Fluxlab automatyzuje obsługę leadów, CRM i raportowanie dla firm B2B,
które tracą sprzedaż przez ręczne procesy, wolny follow-up i bałagan w danych.

**Najlepsza nisza:**
firmy leasingowe, finansowe, dealerzy, brokerzy, firmy B2B z dużą liczbą zapytań,
zespoły handlowe pracujące na CRM.

---

## P0 — Natychmiast

### 1. Hero — nowe teksty

**Wersja domyślna:**

H1: `Automatyzacja leadów, CRM i raportowania dla firm B2B`

Podtytuł:

> Leady z formularzy, reklam, maili i landing page'y automatycznie trafiają
> do CRM, dostają właściciela, zadanie, follow-up i raport. Bez ręcznego
> przepisywania, bez zgubionych zapytań, bez Excela robionego w piątek wieczorem.

CTA główne: `Zamów bezpłatną diagnozę procesu`
CTA drugie: `Zobacz przykładowy workflow`
Mikrotekst: `Odpowiedź w 24h · mapa automatyzacji · szacowany ROI · bez zobowiązań`

**Wersja ostrzejsza (leasing/finanse):**

H1: `Automatyzacja leadów i CRM dla leasingu, finansowania i sprzedaży B2B`

Podtytuł:

> Pomagam firmom, które obsługują dużo zapytań sprzedażowych: lead wpada
> z formularza, reklamy lub maila, trafia do CRM, dostaje handlowca,
> follow-up i raport. Szybciej reagujesz, mniej leadów ginie, a pipeline
> przestaje być śmietnikiem.

CTA: `Sprawdź, gdzie tracisz leady`

---

### 2. Pilotaż — nowy tekst

**Sekcja na homepage:**

Nagłówek: `3 miejsca na publiczne case study — 50% ceny wdrożenia`

Treść:

> Szukam 3 firm B2B, które mają realny proces do automatyzacji i zgodzą się
> pokazać efekt wdrożenia w formie case study. W zamian dostajesz pełny
> zakres prac za 50% standardowej ceny, rozszerzone wsparcie po wdrożeniu
> i priorytetową obsługę.

Dopisek:

> To nie jest oferta dla "pierwszych klientów". To oferta dla pierwszych
> 3 projektów, które mogą zostać publicznie opisane jako case study.
> Dane wrażliwe, liczby i nazwa firmy są publikowane tylko po Twojej
> akceptacji.

CTA: `Aplikuj do programu case study`

**Strona /pilotaz — nowy tekst:**

Główny opis:

> 3 firmy B2B otrzymają wdrożenie automatyzacji za 50% standardowej ceny
> w zamian za zgodę na przygotowanie case study i krótkiej referencji po
> zakończeniu projektu. Publikujemy tylko to, co wcześniej zaakceptujesz —
> bez danych wrażliwych, bez tajemnic handlowych, bez wrzucania Twojej
> firmy pod autobus.

**Dla kogo:**

> Program jest dla firm, które mają konkretny, powtarzalny proces:
> obsługę leadów, CRM, raportowanie, integracje API, n8n lub automatyzacje
> z AI. Najlepiej sprawdzi się, jeśli masz zespół sprzedaży, kilka źródeł
> leadów, CRM i problem z ręczną obsługą danych.

**Dla kogo NIE:**

> To nie jest program dla firm, które "może kiedyś coś zautomatyzują",
> nie mają decydenta po swojej stronie albo oczekują, że AI magicznie
> naprawi źle zaprojektowany proces. Najpierw proces, potem automatyzacja.
> Nie odwrotnie, bo wtedy powstaje szybki chaos zamiast wolnego chaosu.

---

### 3. Formularz — nowa specyfikacja

Nagłówek: `Sprawdźmy, czy automatyzacja ma u Ciebie sens`

Opis:

> Wyślij krótki opis problemu. W odpowiedzi dostaniesz informację, czy widzę
> potencjał na automatyzację, co można poprawić jako pierwsze i jaki byłby
> sensowny kolejny krok.

**Pola:**

| Pole                       | Wymagane | Typ      | Placeholder / opcje                                                                                                                         |
| -------------------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| E-mail służbowy            | TAK      | email    | `np. pawel@firma.pl`                                                                                                                        |
| Firma                      | NIE      | text     | `Nazwa firmy`                                                                                                                               |
| Co chcesz usprawnić?       | TAK      | select   | Obsługa leadów / CRM (Pipedrive/HubSpot/Salesforce) / Raportowanie / Integracje API / Ręczne przepisywanie danych / Nie wiem, chcę diagnozy |
| Skala problemu             | TAK      | select   | Do 30 leadów/mies / 30–100 / 100+ / Nie chodzi o leady, tylko o ręczną pracę / Nie wiem                                                     |
| Opisz problem (2–3 zdania) | NIE      | textarea | `Np. leady wpadają z formularza i maila, handlowcy ręcznie przepisują dane do CRM, a raport robimy w Google Sheets.`                        |
| Preferowany kontakt        | NIE      | select   | E-mail / Telefon / Google Meet                                                                                                              |

Przycisk: `Chcę diagnozę procesu`
Mikrotekst: `Odpowiedź w 24h. Bez spamu, bez newslettera, bez "szybkiej rozmowy" wciskanej na siłę.`

**Ukryte pola:** `utm_source`, `utm_medium`, `utm_campaign`, `landing_page`, `referrer`.

Po sukcesie: redirect na `/dziekuje`.

---

### 4. Sekcja bólu (homepage)

Nagłówek: `Gdzie najczęściej uciekają leady i czas?`

**1. Lead wpada, ale nikt nie reaguje od razu**

> Formularz wysyła maila, ktoś ma go zauważyć, przepisać dane i założyć
> temat w CRM. Czyli proces sprzedaży opiera się na nadziei. Odważna
> strategia, tylko trochę kosztowna.

**2. CRM jest bazą kontaktów, nie systemem pracy**

> Handlowcy tworzą zadania ręcznie, zapominają o follow-upach, zmieniają
> statusy po czasie i wpisują dane różnie. Potem raport mówi cokolwiek,
> bo dane są cokolwiek.

**3. Raporty powstają ręcznie**

> Dane są w CRM, arkuszach, reklamach, mailach i kilku systemach naraz.
> Raz w tygodniu ktoś to skleja, poprawia i udaje, że to proces.

**4. Nie wiadomo, które źródła leadów dowożą sprzedaż**

> Masz liczbę zapytań, ale nie masz jasnego widoku: źródło → handlowiec
> → status → sprzedaż → przychód. Bez tego optymalizacja marketingu jest
> zgadywaniem w ładnym dashboardzie.

---

### 5. Przykładowy workflow

Nagłówek: `Przykład: automatyczna obsługa leada od formularza do raportu`

Kroki:

1. Lead wpada z formularza, reklamy, maila albo landing page'a.
2. System sprawdza kompletność danych i źródło zapytania.
3. Lead trafia do CRM jako osoba, firma i deal.
4. System przypisuje handlowca według reguł: region, produkt, źródło, obciążenie pipeline'u.
5. CRM tworzy zadanie "kontakt w 5 minut".
6. Handlowiec dostaje powiadomienie.
7. Brak reakcji uruchamia przypomnienie lub eskalację.
8. Dane trafiają do raportu: źródło, czas reakcji, status, wynik.

Diagram do narysowania:

```
Formularz / Meta Ads / Mail
       ↓
   Walidacja danych
       ↓
CRM: osoba + firma + deal
       ↓
  Routing do handlowca
       ↓
 Zadanie + powiadomienie
       ↓
  Follow-up / eskalacja
       ↓
    Raport sprzedaży
```

CTA pod workflow: `Chcę taki proces u siebie`

---

## P1 — w 7 dni

### 6. Landing page `/automatyzacja-leadow-crm`

**SEO title:** `Automatyzacja leadów i CRM dla firm B2B | Fluxlab`
**Meta:** `Automatyzuję obsługę leadów, CRM, follow-upy i raportowanie dla firm B2B. Leady trafiają do CRM, dostają handlowca, zadanie i raport bez ręcznej pracy.`

**Hero H1:** `Nie trać leadów przez ręczne przepisywanie i spóźnione follow-upy`
Podtytuł:

> Wdrożę proces, w którym leady z formularzy, reklam, maili i landing
> page'y automatycznie trafiają do CRM, dostają właściciela, zadanie,
> follow-up i raport. Twój zespół sprzedaje, zamiast pilnować, czy ktoś
> zauważył maila.
> CTA: `Zamów bezpłatną diagnozę`
> Mikrotekst: `Odpowiedź w 24h · mapa procesu · szacowany ROI · bez zobowiązań`

**Sekcja problemu:**
H2: `Ten problem zwykle nie wygląda jak katastrofa. I właśnie dlatego kosztuje pieniądze.`

Tekst:

> Lead wpada do firmy. Ktoś dostaje maila. Ktoś ma przepisać dane.
> Ktoś ma założyć deal w CRM. Ktoś ma pamiętać o follow-upie.
> Ktoś ma potem zrobić raport.
>
> Brzmi znajomo? To nie jest proces. To jest łańcuch nadziei z CRM-em w tle.

Punkty:

- Leady z różnych źródeł trafiają w różne miejsca.
- Handlowcy ręcznie tworzą kontakty, firmy i deale.
- Follow-up zależy od pamięci człowieka.
- Dane w CRM są niespójne.
- Raporty są robione ręcznie.
- Nie widać prawdziwego kosztu opóźnienia i zgubionych leadów.

**Sekcja rozwiązania:**
H2: `Co można zautomatyzować jako pierwszy etap?`

1. **Zbieranie leadów** — Formularze, reklamy, maile i landing page'e trafiają do jednego procesu. Koniec z szukaniem zapytań po skrzynkach i arkuszach.
2. **Tworzenie rekordów w CRM** — System automatycznie tworzy osobę, firmę, deal, źródło, etap i pola potrzebne do raportowania.
3. **Routing do handlowca** — Lead trafia do właściwej osoby według reguł: region, produkt, źródło, wartość, dostępność albo obciążenie pipeline'u.
4. **Zadania i follow-upy** — CRM sam tworzy zadania, przypomnienia i kolejne kroki. Handlowiec nie musi pamiętać o procesie — proces pilnuje handlowca.
5. **Raportowanie** — Widzisz źródło leada, czas reakcji, status, wynik i miejsce, w którym proces się zacina.

**Dla kogo:**
H2: `Dla kogo to ma sens?`

> Największy efekt pojawia się tam, gdzie jest powtarzalność, wolumen i realna wartość jednego leada.

- firmy B2B z min. 30 leadami miesięcznie,
- zespoły sprzedaży pracujące na Pipedrive, HubSpot, Salesforce albo arkuszach,
- firmy, które mają leady z kilku źródeł,
- firmy, które ręcznie przepisują dane do CRM,
- firmy, które nie ufają raportom sprzedaży,
- firmy leasingowe, finansowe, brokerskie, dealerskie i usługowe.

**Dla kogo NIE:**
H2: `Dla kogo to nie ma sensu?`

> Automatyzacja nie naprawia braku procesu. Ona tylko szybciej wykonuje to, co zostało dobrze zaprojektowane.

- masz 3 leady miesięcznie i każdy jest obsługiwany ręcznie bez problemu,
- nie masz powtarzalnego procesu,
- nie masz osoby decyzyjnej po stronie firmy,
- nikt nie wie, jak powinien wyglądać idealny pipeline,
- chcesz "AI", ale nie umiesz powiedzieć, jaki problem biznesowy ma rozwiązać.

**Jak wygląda współpraca:**
H2: `Od chaosu do działającej automatyzacji`

1. **Diagnoza** — Opisujesz obecny proces: skąd wpada lead, kto go obsługuje, gdzie trafiają dane i gdzie pojawia się ręczna praca.
2. **Mapa procesu** — Dostajesz prosty schemat: obecny przepływ, wąskie gardła, propozycję automatyzacji i szacowany ROI.
3. **Wdrożenie** — Buduję automatyzację, testuję ją na realnych danych i dopracowuję przypadki brzegowe.
4. **Dokumentacja i monitoring** — Dostajesz opis działania, instrukcję obsługi i możliwość dalszego rozwoju procesu.

**Cennik (na landing):**
H2: `Ile kosztuje automatyzacja leadów i CRM?`

> Każdy proces wyceniam po diagnozie, bo koszt zależy od liczby źródeł
> leadów, CRM, reguł routingu, jakości danych i integracji. Poniżej
> orientacyjne zakresy dla typowych wdrożeń.

| Pakiet                             | Cena                | Zakres                                                                                   |
| ---------------------------------- | ------------------- | ---------------------------------------------------------------------------------------- |
| Diagnoza procesu                   | 0 zł                | Krótka analiza problemu, potencjału automatyzacji i sensownego pierwszego kroku.         |
| Automatyzacja leadów               | od 1 500 zł         | Lead z formularza, reklamy lub maila trafia do CRM, dostaje handlowca, zadanie i źródło. |
| CRM + raportowanie                 | od 2 500 zł         | Porządkowanie pól, statusów, follow-upów, raportów i przepływu danych między systemami.  |
| Integracje API / dedykowana logika | wycena indywidualna | Dla procesów z API, webhookami, walidacją, scoringiem, AI lub niestandardową logiką.     |

CTA: `Sprawdź koszt mojego procesu`

**FAQ na landing page:**

- **Czy muszę mieć już CRM?** Nie. Możemy zacząć od obecnego procesu w arkuszach, mailach albo formularzach. Jeśli CRM jest potrzebny, dobierzemy najprostsze rozwiązanie do skali firmy.
- **Czy automatyzacja zastąpi handlowca?** Nie. Ma usunąć przepisywanie danych, ręczne zadania i pilnowanie follow-upów. Handlowiec ma sprzedawać, nie robić za półautomatyczny formularz.
- **Czy można zautomatyzować Pipedrive?** Tak. Pipedrive dobrze nadaje się do automatyzacji leadów, dealów, aktywności, follow-upów i raportów. Przy bardziej złożonej logice używam API, webhooków, n8n, Make albo kodu.
- **Czy da się połączyć formularz ze stroną z CRM?** Tak. To jeden z najczęstszych pierwszych etapów: formularz → walidacja → CRM → przypisanie handlowca → zadanie → raport.
- **Czy wdrożenie będzie trudne dla zespołu?** Nie powinno być. Dobra automatyzacja usuwa kroki, a nie dokłada nowy rytuał klikania. Zespół dostaje prostszy proces i jasną instrukcję.
- **Co jeśli obecne dane są bałaganem?** Wtedy najpierw porządkujemy minimum potrzebne do działania: pola, statusy, źródła leadów i reguły przejścia między etapami. Automatyzowanie bałaganu to tylko szybsze produkowanie bałaganu.

---

## P2 — w 14 dni

### 9. Narzędzia generujące leady

**Kalkulator 1: Kalkulator kosztu ręcznej obsługi leadów**

Pola:

- liczba leadów miesięcznie,
- średni czas ręcznej obsługi jednego leada,
- koszt godziny pracy osoby obsługującej proces,
- procent leadów z opóźnioną reakcją,
- szacowana wartość jednego klienta,
- konwersja lead → klient.

Wynik:

> Ręczna obsługa leadów kosztuje Cię około [X zł miesięcznie] w samym
> czasie pracy. Jeśli przez opóźnienia tracisz nawet [Y%] potencjalnych
> klientów, realny koszt może być znacznie wyższy.

CTA: `Chcesz sprawdzić, które kroki da się usunąć? Wyślij wynik i zamów bezpłatną diagnozę.`

**Kalkulator 2: Audyt CRM — checklist online**

10 pytań tak/nie:

1. Czy każdy lead ma źródło?
2. Czy każdy lead ma właściciela?
3. Czy każdy etap pipeline'u ma jasne kryterium przejścia?
4. Czy CRM automatycznie tworzy zadania?
5. Czy brak kontaktu uruchamia przypomnienie?
6. Czy raport pokazuje źródło → status → sprzedaż?
7. Czy handlowcy ręcznie przepisują dane?
8. Czy są obowiązkowe pola przed zmianą etapu?
9. Czy masz duplikaty firm/kontaktów?
10. Czy dane z reklam/formularzy trafiają do CRM automatycznie?

Wynik: `Twój CRM ma wynik [X/10]. Największy potencjał automatyzacji: [obszar].`
CTA: `Chcę mapę automatyzacji CRM`

**Kalkulator 3: "Zatrudnić osobę czy zautomatyzować?"**

Wynik:

> Jeśli proces zajmuje [X godzin miesięcznie], a koszt godziny wynosi
> [Y zł], ręczna obsługa kosztuje około [Z zł miesięcznie]. Automatyzacja
> ma sens, jeśli proces jest powtarzalny, stabilny i występuje co najmniej
> kilka razy w tygodniu.

---

### 10. Eventy GA do wdrożenia

| Event                  | Kiedy                              |
| ---------------------- | ---------------------------------- |
| `cta_click_hero_audit` | kliknięcie głównego CTA            |
| `cta_click_header`     | kliknięcie CTA w menu              |
| `cta_click_pricing`    | kliknięcie CTA przy cenniku        |
| `cta_click_pilot`      | kliknięcie programu case study     |
| `form_start`           | pierwsze wejście w pole formularza |
| `generate_lead`        | wysłanie formularza                |
| `calendar_click`       | kliknięcie kalendarza              |
| `email_click`          | kliknięcie maila                   |
| `phone_click`          | kliknięcie telefonu                |
| `pricing_view`         | scroll do cennika                  |
| `case_study_view`      | wejście w case study               |
| `calculator_submit`    | użycie kalkulatora                 |

---

### 11. Schema Organization

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Fluxlab",
    "url": "https://www.fluxlab.pl",
    "logo": "https://www.fluxlab.pl/logo.png",
    "sameAs": ["https://www.linkedin.com/company/fluxlab"],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
      "email": "kontakt@fluxlab.pl",
      "areaServed": "PL",
      "availableLanguage": ["pl", "en"]
    }
  }
</script>
```

---

## P3 — w 30 dni: artykuły long-tail

Zamiast watowych "co to jest automatyzacja", napisać:

1. `/automatyzacja-formularza-do-pipedrive` — `Integracja formularza z Pipedrive | Automatyczne leady w CRM`
2. `/automatyczne-przypisywanie-leadow` — `Automatyczne przypisywanie leadów do handlowców`
3. `/czas-reakcji-na-leada` — `Jak skrócić czas reakcji na leada do kilku minut`
4. `/automatyzacja-follow-up` — `Automatyzacja follow-upów w CRM`
5. `/raportowanie-z-pipedrive` — `Automatyczne raportowanie z Pipedrive`
6. `/n8n-dla-crm` — `n8n dla CRM | Automatyzacja leadów, zadań i raportów`
7. `/make-vs-n8n-crm` — `Make czy n8n do automatyzacji CRM?`
8. `/automatyzacja-crm-leasing` — `Automatyzacja CRM dla firm leasingowych i finansowych`
9. `/koszt-recznej-obslugi-leadow` — `Koszt ręcznej obsługi leadów — kalkulator i przykład`
10. `/crm-jako-system-pracy` — `CRM jako system pracy, nie baza kontaktów`

**Szablon każdego artykułu:**

1. Problem biznesowy
2. Objawy
3. Koszt problemu
4. Przykładowy proces przed
5. Przykładowy proces po
6. Diagram
7. Co można wdrożyć w 1. etapie
8. Typowe błędy
9. Koszt / widełki
10. CTA do diagnozy

CTA w środku artykułu:

> Masz podobny proces u siebie?
> Wyślij krótki opis: skąd wpadają dane, gdzie trafiają i co dziś robicie ręcznie. W odpowiedzi dostaniesz informację, czy automatyzacja ma sens i od którego kroku warto zacząć.
>
> Przycisk: `Chcę diagnozę procesu`

---

## P4 — Outbound

### ICP

**Segment 1:** firmy leasingowe / finansowe / brokerzy
**Segment 2:** dealerzy / sprzedaż aut / finansowanie
**Segment 3:** firmy B2B z Pipedrive (software house, agencje, konsulting, B2B SaaS)

### E-mail outbound

**Wiadomość 1:**
Temat: `Leady z formularza → CRM bez ręcznego przepisywania`

> Cześć,
>
> widzę, że pozyskujecie zapytania przez stronę. W takich procesach często
> pojawia się ten sam problem: lead wpada do formularza lub maila, ktoś
> musi go zauważyć, przepisać do CRM, przypisać handlowca i pamiętać
> o follow-upie.
>
> Automatyzuję takie przepływy: formularz / reklama / mail → walidacja
> → CRM → handlowiec → zadanie → follow-up → raport.
>
> Mogę przygotować krótką diagnozę: gdzie w takim procesie zwykle uciekają
> leady, czas i dane. Bez prezentacji sprzedażowej, po prostu konkretna
> mapa pierwszej automatyzacji.
>
> Chcesz, żebym zerknął na Wasz proces?
>
> Paweł, Fluxlab
> Automatyzacja leadów, CRM i raportowania dla firm B2B
> fluxlab.pl

**Follow-up 1:**
Temat: `Re: Leady z formularza → CRM bez ręcznego przepisywania`

> Cześć,
>
> doprecyzuję: nie chodzi mi o "wdrożenie CRM od zera". Chodzi o usunięcie
> ręcznej pracy między momentem, gdy lead wpada do firmy, a momentem,
> gdy handlowiec ma konkretne zadanie w CRM.
>
> Typowy pierwszy etap to:
>
> - lead z formularza trafia do CRM,
> - system przypisuje źródło i właściciela,
> - tworzy zadanie kontaktu,
> - pilnuje follow-upu,
> - zapisuje dane do raportu.
>
> Jeśli macie taki problem, mogę rozpisać pierwszy workflow na przykładzie
> Waszego procesu.

**Follow-up 2:**
Temat: `Zamykam temat?`

> Cześć,
>
> zamykam temat z mojej strony.
>
> Jeśli leady są już u Was automatycznie obsługiwane od źródła do CRM,
> follow-upów i raportów, to super — nie ma czego poprawiać.
>
> Jeśli jednak część procesu nadal dzieje się ręcznie, tu jest prosty
> punkt startowy: policzyć, ile minut kosztuje obsługa jednego leada
> i ile takich leadów macie miesięcznie. Zwykle już ten wynik pokazuje,
> czy automatyzacja ma sens.
>
> Gdybyś chciał, mogę przygotować krótką diagnozę.

### LinkedIn — posty

**Post 1 — problem:**

> Większość firm nie traci leadów dlatego, że ma zły CRM.
>
> Traci je dlatego, że między formularzem a CRM-em jest człowiek robiący
> za integrację API.
>
> Typowy proces:
>
> - lead wpada z formularza,
> - ktoś dostaje maila,
> - ktoś ma przepisać dane,
> - ktoś ma przypisać handlowca,
> - ktoś ma pamiętać o follow-upie,
> - ktoś ma zrobić raport.
>
> Czyli sprzedaż opiera się na pamięci, mailach i dobrych intencjach.
>
> Lepszy proces:
> formularz → walidacja → CRM → handlowiec → zadanie → follow-up → raport.
>
> To nie wymaga wielkiego systemu. Często pierwszy etap da się zrobić
> szybko: automatyczne utworzenie leada/deala, przypisanie właściciela
> i zadania kontaktu.
>
> Jeśli handlowiec przepisuje dane, to nie sprzedaje. Tyle filozofii.

**Post 2 — Pipedrive:**

> Pipedrive często jest używany jak notatnik do leadów.
>
> A może być systemem, który pilnuje procesu sprzedaży.
>
> Co warto zautomatyzować jako pierwsze:
>
> - tworzenie deala po pojawieniu się leada,
> - przypisanie handlowca według regionu / źródła / produktu,
> - zadanie "kontakt w 5 minut",
> - follow-up po braku odpowiedzi,
> - blokadę zmiany etapu bez wymaganych danych,
> - raport źródło → status → sprzedaż.
>
> CRM nie powinien być miejscem, gdzie handlowiec dokumentuje chaos.
>
> Powinien być systemem, który ten chaos ogranicza.

**Post 3 — ROI:**

> Automatyzacja nie musi zaczynać się od AI.
>
> Często największy zwrot daje najbardziej nudny proces:
> ręczne przepisywanie danych.
>
> Prosty model:
> liczba operacji miesięcznie × czas jednej operacji × koszt godziny pracy.
>
> Przykład:
> 300 leadów miesięcznie × 5 minut × 60 zł/h = 1 500 zł miesięcznie samego
> przepisywania.
>
> A to nie liczy:
>
> - błędów,
> - opóźnień,
> - zgubionych leadów,
> - braku follow-upów,
> - raportów robionych ręcznie.
>
> Dlatego pierwsze pytanie nie brzmi: "jakiego narzędzia użyć?".
>
> Pierwsze pytanie brzmi: "który proces powtarza się często i kosztuje
> nas czas albo sprzedaż?".

### Zaproszenie LinkedIn

> Cześć, widzę, że działacie w sprzedaży B2B. Zajmuję się automatyzacją
> leadów, CRM i raportowania — głównie usuwaniem ręcznej pracy między
> formularzem, CRM-em i handlowcem. Chętnie dodam do sieci.

### Wiadomość po akceptacji

> Dzięki za przyjęcie.
>
> Krótko: pomagam firmom B2B automatyzować proces od leada do CRM —
> zapis danych, przypisanie handlowca, zadania, follow-upy i raporty.
>
> Jeśli macie leady z kilku źródeł albo handlowcy nadal coś przepisują
> ręcznie, mogę przygotować krótką diagnozę pierwszego procesu do
> automatyzacji. Bez prezentacji i bez wciskania systemu.

---

## P5 — Oferta

### Produkt wejściowy

Nazwa: `Bezpłatna diagnoza procesu leadów i CRM`

Klient dostaje:

- mapę obecnego procesu,
- listę ręcznych kroków,
- 3 automatyzacje o największym wpływie,
- szacowany koszt ręcznej pracy,
- rekomendowany pierwszy etap,
- orientacyjną wycenę.

NIE dostaje:

- pełnej dokumentacji technicznej,
- gotowej architektury do przekazania innemu wykonawcy,
- wielogodzinnego warsztatu za darmo.

Tekst sekcji oferty:

> Najpierw sprawdzam, czy automatyzacja ma sens. Nie każdy proces warto
> automatyzować i nie każde narzędzie trzeba integrować. W diagnozie
> ustalamy, gdzie dziś uciekają leady, czas albo dane, a potem wybieramy
> pierwszy etap, który da mierzalny efekt.

CTA: `Zamów diagnozę procesu`

### Cennik — 3 ścieżki

H2: `Wybierz punkt startowy`

| Pakiet                          | Cena                | Opis                                                                                                                    |
| ------------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Diagnoza procesu                | 0 zł                | Dla firm, które chcą sprawdzić, czy automatyzacja ma sens. Analizujemy jeden proces i wskazujemy pierwszy krok.         |
| Pierwsza automatyzacja          | od 1 500 zł         | Dla firm, które mają konkretny problem: leady, CRM, zadania, follow-upy, raporty albo ręczne przepisywanie danych.      |
| Automatyzacja procesu sprzedaży | wycena indywidualna | Dla firm z większym wolumenem leadów, kilkoma źródłami danych, integracjami API, raportowaniem i niestandardową logiką. |

CTA per karta: `Chcę diagnozę` / `Wdróżmy pierwszy proces` / `Zaplanujmy wdrożenie`

Dopisek:

> Nie rozliczam godzin, tylko zakres. Przed startem dostajesz konkretną
> wycenę, opis efektu i warunki odbioru.

---

## P6 — Operacyjny system obsługi leadów

### Auto-potwierdzenie do klienta

Temat: `Dostałem zgłoszenie — Fluxlab`

> Cześć,
>
> dzięki za opis procesu. Przejrzę zgłoszenie i wrócę z odpowiedzią
> w ciągu 24h.
>
> Jeśli od razu widzę potencjał na automatyzację, zaproponuję termin
> krótkiej rozmowy. Jeśli nie, napiszę wprost, dlaczego moim zdaniem
> nie warto tego automatyzować na tym etapie.
>
> Paweł
> Fluxlab

---

## P8 — Czego nie robić

- Nie pisz kolejnych ogólnych tekstów, zanim nie poprawisz CTA i formularza.
- Nie prowadź ruchu z outboundu na stronę główną.
- Nie używaj "pierwsi klienci", jeśli jednocześnie pokazujesz 30+ wdrożeń.
- Nie obiecuj "0 błędów", jeśli nie masz definicji, okresu pomiaru i kontekstu.
- Nie chowaj kontaktu za długim formularzem.
- Nie promuj narzędzi niezwiązanych z automatyzacją jako głównego lead magnetu.
- Nie zaczynaj od reklam płatnych, dopóki nie masz działającego lejka i mierzenia.
- Nie sprzedawaj "AI", jeśli problemem jest formularz, CRM i brak follow-upu.

---

## TOP 10 zadań w kolejności

1. Przepisać hero na leady/CRM/raportowanie.
2. Zmienić CTA z "bezpłatna konsultacja" na "bezpłatna diagnoza procesu".
3. Naprawić pilotaż: "3 miejsca na case study", nie "pierwsi klienci".
4. Uprościć formularz i dodać pola kwalifikujące.
5. Dodać tracking eventów i stronę /dziekuje.
6. Zrobić landing page /automatyzacja-leadow-crm.
7. Dodać workflow diagram pokazujący realną automatyzację.
8. Dodać case study/demo/metodę ROI.
9. Zbudować kalkulator kosztu ręcznej obsługi leadów.
10. Wysłać 200 wiadomości outbound w 4 tygodnie i mierzyć odpowiedzi.
