/** Trzy usługi w abonamencie na górze cennika i w menu, z dodatkami płatnymi
 *  co miesiąc. Kwoty jak na stronach usług; zmiana tutaj nie zmienia tamtych. */

export type Dodatek = { nazwa: string; href: string; cena: string };

export type Abonament = {
  nazwa: string;
  href: string;
  miesiecznie: string;
  wdrozenie: string;
  wCenie: string[];
  dodatki: Dodatek[];
};

export const ABONAMENTY: Abonament[] = [
  {
    nazwa: "Strona z opieką",
    href: "/strony-www",
    miesiecznie: "od 300 zł/mies.",
    wdrozenie: "wdrożenie od 2 900 zł",
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
        nazwa: "Prowadzenie wizytówki Google",
        href: "/profil-firmy-google",
        cena: "349 zł/mies.",
      },
      {
        nazwa: "Raport o konkurencji",
        href: "/benchmarking-konkurencji",
        cena: "od 39 zł/mies.",
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
      {
        nazwa: "Pilnowanie danych sprzedawcy",
        href: "/dane-sprzedawcy",
        cena: "od 120 zł/mies.",
      },
    ],
  },
  {
    nazwa: "Własny CRM",
    href: "/wlasny-crm",
    miesiecznie: "od 499 zł/mies.",
    wdrozenie: "wdrożenie od 1 zł w pilotażu",
    wCenie: [
      "3 konta, każde kolejne 99 zł/mies.",
      "serwer w UE, kopie i aktualizacje",
      "aplikacja na komputer i telefon",
    ],
    dodatki: [
      {
        nazwa: "Ocena handlowców przez AI",
        href: "/wlasny-crm#konf-crm-h",
        cena: "199 zł/mies.",
      },
      {
        nazwa: "Szkice maili i SMS-ów przez AI",
        href: "/wlasny-crm#konf-crm-h",
        cena: "99 zł/mies.",
      },
    ],
  },
  {
    nazwa: "Automatyzacje z opieką",
    href: "/wdrozenie-n8n-cena",
    miesiecznie: "od 190 zł/mies.",
    wdrozenie: "wdrożenie od 790 zł",
    wCenie: [
      "aktualizacje n8n i serwera",
      "powiadomienie, gdy przepływ się zatrzyma",
      "poprawki po zmianach w podpiętych systemach",
    ],
    dodatki: [
      {
        nazwa: "Pilnowanie kontrahentów w rejestrach",
        href: "/czujka-rejestrowa",
        cena: "od 99 zł/mies.",
      },
      {
        nazwa: "Panel zwrotów i reklamacji",
        href: "/panel-zwrotow",
        cena: "od 200 zł/mies.",
      },
    ],
  },
];
