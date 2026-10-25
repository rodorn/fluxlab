/** Katalog wirtualnego handlowca na stronie głównej: strony jednorazowo
 *  z RODZAJE i usługi miesięczne z ABONAMENTY, więc ceny mają jedno źródło. */

import { ABONAMENTY } from "./abonamenty";
import { RODZAJE } from "./opcjeStrony";

export type UslugaHandlowca = {
  id: string;
  nazwa: string;
  href: string;
  cena: string;
  jednorazowo: number;
  miesiecznie: number;
  kiedy: string;
};

const KIEDY: Record<string, string> = {
  landing: "Gdy firma nie ma strony albo ma jedną starą stronę wizytówkę.",
  firmowa:
    "Gdy strona jest przestarzała, wolna albo nie ma podstron usług i bloga.",
  sklep: "Gdy firma sprzedaje produkty, a nie ma sklepu albo sklep jest słaby.",
  strona:
    "Gdy firma ma albo dostanie stronę i potrzebuje opieki, poprawek i pomiaru.",
  wizytowka:
    "Gdy wizytówka Google jest pusta, bez postów albo z opiniami bez odpowiedzi.",
  konkurencja:
    "Gdy branża jest konkurencyjna cenowo albo firma nie wie, co robi konkurencja.",
  crm: "Gdy leady przychodzą z kilku kanałów, a firma prowadzi je w mailu lub arkuszu.",
  ocena: "Gdy firma ma zespół handlowców lub obsługi klienta.",
  sklep_ai: "Gdy firma ma sklep z większym katalogiem produktów.",
};

export const USLUGI_HANDLOWCA: UslugaHandlowca[] = [
  ...RODZAJE.map((r) => ({
    id: r.id,
    nazwa: r.nazwa,
    href: "/strony-www#konfigurator",
    cena: `${r.cena.toLocaleString("pl-PL")} zł jednorazowo`,
    jednorazowo: r.cena,
    miesiecznie: 0,
    kiedy: KIEDY[r.id],
  })),
  ...ABONAMENTY.map((a) => {
    const id = a.id === "sklep" ? "sklep_ai" : a.id;
    return {
      id,
      nazwa: a.nazwa,
      href: a.href,
      cena: a.miesiecznie,
      jednorazowo: 0,
      miesiecznie: a.kwota,
      kiedy: KIEDY[id] ?? "",
    };
  }),
];
