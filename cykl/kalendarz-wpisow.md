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
- [ ] 26.10 | KSeF | Certyfikat KSeF: do czego jest potrzebny, gdzie go wyrobić i dlaczego przed pierwszą awarią. Link: /strefa-wiedzy/faktura-gdy-ksef-nie-dziala.
- [ ] 02.11 | KSeF | Faktury kosztowe z KSeF prosto do programu księgowego: jak to zautomatyzować i ile pracy zdejmuje. Link: /ksef-integracja.
- [ ] 09.11 | e-Doręczenia | Jak sprawdzić, czy kontrahent albo urząd ma adres do e-Doręczeń (BAE) i co, gdy go nie ma. Link: /e-doreczenia-integracja, /slownik#bae.
- [ ] 16.11 | leady | Black Friday i weekendowe zgłoszenia: kto odpowiada na leada w sobotę i jak to ustawić automatem. Link: /czas-reakcji-na-leada.
- [ ] 23.11 | CRM | Zamknięcie roku w CRM: porządek w lejku i dane do raportu rocznego w jeden dzień. Link: /automatyzacja-raportowania.
- [ ] 30.11 | KSeF | Kasa fiskalna i KSeF od 1 stycznia 2027: faktura do paragonu po końcu przepisów przejściowych. Link: /ksef-2027.
- [ ] 07.12 | KSeF | Numer KSeF w przelewie od 2027: kiedy trzeba go podać i jak program bankowy ma go wziąć sam. Link: /numer-ksef.
- [ ] 14.12 | podatki | Zmiana formy opodatkowania na 2027: do kiedy i jak policzyć, czy się opłaca (nie dubluj ryczalt-czy-liniowy, tylko termin i decyzja). Link: /kalkulator-podatkowy.
- [ ] 21.12 | automatyzacja | Przerwa świąteczna bez zgubionych zapytań: autoodpowiedź, dyżur, przypomnienie po powrocie. Link: /automatyzacja-follow-up.
- [ ] 28.12 | KSeF | Pięć rzeczy do sprawdzenia w programie do faktur przed 1 stycznia 2027 (skrót z listy kontrolnej, nie kopia). Link: /ksef-2027, /strefa-wiedzy/numeracja-faktur-ksef-2027.
- [ ] 04.01 | KSeF | Sankcje KSeF: co obowiązuje od 2027, a co przesunięto (stan projektu ustawy z dnia pisania). Link: /ksef-2027.
- [ ] 11.01 | raporty | Raport sprzedaży za 2026 z CRM: pięć liczb, które warto policzyć na start roku. Link: /raportowanie-z-pipedrive.
