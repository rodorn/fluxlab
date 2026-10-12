export interface Wdrozenie {
  tytul: string;
  problem: string;
  efekt: string;
  liczba: string;
  liczbaOpis: string;
}

/* Wdrozenia Pawla w Carmore (leasing i sprzedaz samochodow). Same fakty z
   produkcji, liczby z wlasnych pomiarow. Klientow Fluxlab dopisujemy dopiero
   za ich zgoda. */
export const WDROZENIA: Wdrozenie[] = [
  {
    tytul: "Wybór aut do zakupu z tysięcy ogłoszeń",
    problem:
      "Handlowcy sami przeglądali portale z ogłoszeniami, żeby znaleźć auta warte kupienia.",
    efekt:
      "System co dzień zbiera oferty, ocenia ich atrakcyjność i zakłada zespołowi zadania tylko przy tych, które warto sprawdzić.",
    liczba: "kilkanaście tys.",
    liczbaOpis: "ofert przeglądanych dziennie bez udziału człowieka",
  },
  {
    tytul: "Wniosek leasingowy wypełniany z CRM",
    problem:
      "Dane klienta i auta przepisywano ręcznie z Pipedrive do systemu leasingodawcy, krok po kroku.",
    efekt:
      "Automat przenosi dane przez 8 kroków wniosku i zatrzymuje się przed wysłaniem. Handlowiec tylko sprawdza i składa.",
    liczba: "8 kroków",
    liczbaOpis: "formularza wypełnianych automatycznie",
  },
  {
    tytul: "Zdjęcia do ogłoszeń bez danych dealera",
    problem:
      "Zdjęcia aut od partnerów miały znaki wodne, tablice i dane salonu, których nie wolno publikować.",
    efekt:
      "Model AI usuwa tablice, znaki wodne i napisy dealera. Gotowy komplet sprawdziliśmy OCR: zero czytelnych rejestracji.",
    liczba: "509",
    liczbaOpis: "zdjęć i banerów gotowych do ogłoszeń",
  },
  {
    tytul: "Oferty firmy na stronie partnera, leady z etykietą źródła",
    problem:
      "Partner medialny chciał pokazywać oferty u siebie, a firma musiała wiedzieć, które leady przyszły od niego.",
    efekt:
      "Widżet osadzany na stronie partnera. Każdy lead z niego trafia do Pipedrive z etykietą źródła, a klient widzi osobny numer telefonu.",
    liczba: "100%",
    liczbaOpis: "leadów z widżetu oznaczonych w CRM",
  },
  {
    tytul: "Baza wersji modeli samochodów",
    problem:
      "Oferta potrzebowała pełnej bazy wersji i wyposażenia aut, a gotowej bazy nie dało się kupić w rozsądnej cenie.",
    efekt:
      "Dane zebrane z publicznych źródeł, oczyszczone i uzupełnione przez model językowy, z walidacją każdego rekordu.",
    liczba: "30 000+",
    liczbaOpis: "rekordów w zbudowanej bazie",
  },
];
