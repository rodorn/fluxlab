# Kalendarz wpisów strefy wiedzy, 19.10.2026 do 11.01.2027

Decyzja Pawła z 14.10.2026: jeden artykuł tygodniowo, w stałym rytmie, tematy pod sezon klientów (KSeF, e-Doręczenia, koniec roku).
Publikacja w poniedziałek danego tygodnia (jeśli poniedziałek nie wyjdzie, to najpóźniej w środę). Po publikacji wpisz datę i adres po „ => ".

Zasady dla każdego wpisu:
- Krótko (zasada z 7.10): akapity 2 do 3 zdań, FAQ najwyżej 4 pytania, bez powtórzeń.
- Każdy fakt prawny lub data z oficjalnego źródła (gov.pl, ksef.podatki.gov.pl, Dziennik Ustaw, biznes.gov.pl), sprawdzony w dniu pisania. Terminy KSeF bierz z `lib/terminy-ksef.ts`, e-Doręczeń z `lib/terminy-e-doreczen.ts`. Projekt ustawy to projekt, nie prawo.
- Przed pisaniem sprawdź `ls app/strefa-wiedzy`: jeśli temat już jest, zmień kąt albo weź następny temat, nie duplikuj.
- Wpis dodaj do `lib/categories.ts` (właściwa kategoria), link do niego z co najmniej jednej istniejącej strony, link z niego do naszego narzędzia albo usługi i do pojęcia w `/slownik`, jeśli pasuje.
- Po wdrożeniu: 200 z VPS, żądanie indeksowania (w limicie 10 na dobę), wpis w dzienniku.

## Tematy
- [x] 19.10 | KSeF | Limit 10 tys. zł poza KSeF w 2026: co się dzieje po pierwszym przekroczeniu. Link: /ksef-2027, /slownik#ksef. => 19.10 https://fluxlab.pl/strefa-wiedzy/limit-10-tys-poza-ksef
- [x] 26.10 | KSeF | Certyfikat KSeF: do czego jest potrzebny, gdzie go wyrobić i dlaczego przed pierwszą awarią. Link: /strefa-wiedzy/faktura-gdy-ksef-nie-dziala. => 26.10 https://fluxlab.pl/strefa-wiedzy/certyfikat-ksef
- [x] 02.11 | KSeF | Faktury kosztowe z KSeF prosto do programu księgowego: jak to zautomatyzować i ile pracy zdejmuje. Link: /ksef-integracja. => 2.11 https://fluxlab.pl/strefa-wiedzy/faktury-kosztowe-z-ksef
- [x] 09.11 | e-Doręczenia | Jak sprawdzić, czy kontrahent albo urząd ma adres do e-Doręczeń (BAE) i co, gdy go nie ma. Link: /e-doreczenia-integracja, /slownik#bae. => 9.11 https://fluxlab.pl/strefa-wiedzy/czy-firma-ma-adres-do-e-doreczen
- [x] 16.11 | leady | Black Friday i weekendowe zgłoszenia: kto odpowiada na leada w sobotę i jak to ustawić automatem. Link: /czas-reakcji-na-leada. => 16.11 https://fluxlab.pl/strefa-wiedzy/lead-w-weekend-black-friday
- [x] 23.11 | automatyzacja | Przerwa świąteczna bez zgubionych zapytań: autoodpowiedź, dyżur, przypomnienie po powrocie. Link: /automatyzacja-follow-up. => 23.11 https://fluxlab.pl/strefa-wiedzy/przerwa-swiateczna-w-firmie
  (zamiana z 21.12, strateg 22.11: bramka CRM 11.11 blokuje temat CRM; temat świąteczny opublikowany 4 tygodnie wcześniej zdąży do indeksu przed świętami)
- [ ] 30.11 | KSeF | Kasa fiskalna i KSeF od 1 stycznia 2027: faktura do paragonu po końcu przepisów przejściowych. Link: /ksef-2027.
- [ ] 07.12 | KSeF | Numer KSeF w przelewie od 2027: kiedy trzeba go podać i jak program bankowy ma go wziąć sam. Link: /numer-ksef.
- [ ] 14.12 | podatki | Zmiana formy opodatkowania na 2027: do kiedy i jak policzyć, czy się opłaca (nie dubluj ryczalt-czy-liniowy, tylko termin i decyzja). Link: /kalkulator-podatkowy.
- [ ] 21.12 | CRM | Zamknięcie roku w CRM: porządek w lejku i dane do raportu rocznego w jeden dzień. Link: /automatyzacja-raportowania.
  (bramka CRM 11.11: jeśli 21.12 nadal obowiązuje, pomiń i weź następny temat)
- [ ] 28.12 | KSeF | Pięć rzeczy do sprawdzenia w programie do faktur przed 1 stycznia 2027 (skrót z listy kontrolnej, nie kopia). Link: /ksef-2027, /strefa-wiedzy/numeracja-faktur-ksef-2027.
- [ ] 04.01 | KSeF | Sankcje KSeF: co obowiązuje od 2027, a co przesunięto (stan projektu ustawy z dnia pisania). Link: /ksef-2027.
- [ ] 11.01 | raporty | Raport sprzedaży za 2026 z CRM: pięć liczb, które warto policzyć na start roku. Link: /raportowanie-z-pipedrive.
- [ ] 18.01 | KSeF | OCR faktur po KSeF: co jeszcze trzeba skanować, a co przychodzi gotowe w XML (zapytania „ocr dla biur rachunkowych” 34 wyśw., poz. 44,8 i „ksef ocr” 20 wyśw., poz. 69,9; GSC 21.11). Link: /ksef-integracja, /strefa-wiedzy/faktury-kosztowe-z-ksef.
- [ ] 25.01 | e-commerce | System ticketowy w sklepie internetowym: kiedy jest potrzebny, a kiedy zwroty i reklamacje obsłuży formularz z automatem (zapytanie „system ticketowy dla e-commerce” 31 wyśw., poz. 68,7; GSC 21.11). Link: /automatyzacja-dla-ecommerce.
