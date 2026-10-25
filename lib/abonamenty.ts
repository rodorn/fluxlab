/** Usługi w abonamencie na górze cennika i w menu (lista Pawła 25.10.2026).
 *  Przy usłudze miesięcznej nie pokazujemy kosztu wdrożenia (decyzja Pawła
 *  25.10.2026). Kwoty jak na stronach usług; zmiana tutaj nie zmienia tamtych.
 *  `kwota` to najniższy pakiet netto, który można opłacić kartą przez Stripe. */

export type Dodatek = { nazwa: string; href: string; cena: string };

export type Abonament = {
  id: string;
  nazwa: string;
  href: string;
  miesiecznie: string;
  kwota: number;
  wCenie: string[];
  dodatki: Dodatek[];
};

export const ABONAMENTY: Abonament[] = [
  {
    id: "strona",
    nazwa: "Opieka nad stroną",
    href: "/strony-www",
    miesiecznie: "od 300 zł/mies.",
    kwota: 300,
    wCenie: [
      "monitoring działania strony",
      "2, 5 albo 10 poprawek na kwartał",
      "odpowiedzi na opinie i post co tydzień w wyższych pakietach",
    ],
    dodatki: [
      {
        nazwa: "Chatbot AI na bazie wiedzy o firmie",
        href: "/strony-www#konfigurator",
        cena: "199 zł/mies.",
      },
      {
        nazwa: "Pilnowanie mapy strony",
        href: "/mapa-strony",
        cena: "99 zł/mies.",
      },
      {
        nazwa: "Pilnowanie domeny",
        href: "/wlasnosc-domeny",
        cena: "49 zł/mies.",
      },
    ],
  },
  {
    id: "wizytowka",
    nazwa: "Opieka nad wizytówką Google",
    href: "/profil-firmy-google",
    miesiecznie: "349 zł/mies.",
    kwota: 349,
    wCenie: [
      "uporządkowanie wpisu na start",
      "post co tydzień i odpowiedzi na opinie",
      "pomiar telefonów i wejść z Map co miesiąc",
    ],
    dodatki: [],
  },
  {
    id: "konkurencja",
    nazwa: "Benchmarking konkurencji",
    href: "/benchmarking-konkurencji",
    miesiecznie: "od 39 zł/mies.",
    kwota: 39,
    wCenie: [
      "ceny, usługi, social media, strony i opinie",
      "raport co miesiąc, co tydzień albo codziennie",
      "wnioski dla Twojej firmy",
    ],
    dodatki: [
      {
        nazwa: "Dostosowanie Twoich cen do konkurencji",
        href: "/kontakt?utm_source=abonament-ceny",
        cena: "wycena po rozmowie",
      },
    ],
  },
  {
    id: "crm",
    nazwa: "Własny CRM",
    href: "/wlasny-crm",
    miesiecznie: "od 499 zł/mies.",
    kwota: 499,
    wCenie: [
      "3 konta, każde kolejne 99 zł/mies.",
      "serwer w UE, kopie i aktualizacje",
      "aplikacja na komputer i telefon",
    ],
    dodatki: [
      {
        nazwa: "Szkice maili i SMS-ów przez AI",
        href: "/wlasny-crm#konf-crm-h",
        cena: "99 zł/mies.",
      },
    ],
  },
  {
    id: "ocena",
    nazwa: "Ocena handlowców przez AI",
    href: "/wlasny-crm#konf-crm-h",
    miesiecznie: "199 zł/mies.",
    kwota: 199,
    wCenie: [
      "notatki, SMS-y, maile i transkrypcje rozmów",
      "zestawienie z wiedzą firmy",
      "ocena pracy każdej osoby w zespole",
    ],
    dodatki: [],
  },
  {
    id: "sklep",
    nazwa: "Sprzedaż w sklepie z AI",
    href: "/strony-www#konfigurator",
    miesiecznie: "od 149 zł/mies.",
    kwota: 149,
    wCenie: [
      "każdy dodatek osobno, rezygnacja w dowolnym dniu",
      "raport wyszukiwań bez wyników co miesiąc",
      "pomiar sprzedaży przed i po",
    ],
    dodatki: [
      {
        nazwa: "Wyszukiwarka AI: literówki, synonimy, podpowiedzi",
        href: "/strony-www#konfigurator",
        cena: "149 zł/mies.",
      },
      {
        nazwa: "Polecane produkty i kolejność w kategoriach",
        href: "/strony-www#konfigurator",
        cena: "149 zł/mies.",
      },
      {
        nazwa: "Asystent zakupowy AI na bazie katalogu",
        href: "/strony-www#konfigurator",
        cena: "199 zł/mies.",
      },
    ],
  },
];
