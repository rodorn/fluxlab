/** Katalog wirtualnego handlowca na stronie głównej: strony jednorazowo
 *  z RODZAJE i usługi miesięczne z ABONAMENTY, więc ceny mają jedno źródło. */

import { ABONAMENTY } from "./abonamenty";
import { RODZAJE } from "./opcjeStrony";
import type { WariantCrm } from "./modulyCrm";

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
    "Prawie każdej firmie: gdy wizytówki Google nie ma, trzeba ją założyć; gdy jest, a nie ma świeżych postów, zdjęć albo odpowiedzi na każdą opinię, trzeba ją prowadzić.",
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

export const STRONY = RODZAJE.map((r) => r.id);

/** Wielkość firmy z odpowiedzi „Ile osób pracuje w firmie?”: liczba kont CRM,
 *  wariant CRM i rodzaj strony domyślnie dobrane do zespołu. */
export const WIELKOSC: Record<
  string,
  { osoby: number; wariant: WariantCrm; strona: string }
> = {
  "tylko ja": { osoby: 1, wariant: "pilotaz", strona: "landing" },
  "2-5": { osoby: 4, wariant: "pilotaz", strona: "landing" },
  "6-20": { osoby: 12, wariant: "integracje", strona: "firmowa" },
  "ponad 20": { osoby: 25, wariant: "integracje", strona: "firmowa" },
};

/** Najwyżej jedna strona (sklep zostaje, landing i firmowa według wielkości),
 *  ocena handlowców tylko z CRM i tylko przy zespole. */
export function uporzadkujPakiet<T extends { id: string; powod?: string }>(
  pakiet: T[],
  wielkosc?: string,
): T[] {
  const w = wielkosc ? WIELKOSC[wielkosc] : undefined;
  let strona = false;
  const wynik: T[] = [];
  for (const p of pakiet) {
    if (wynik.some((x) => x.id === p.id)) continue;
    if (STRONY.includes(p.id)) {
      if (strona) continue;
      strona = true;
      wynik.push(w && p.id !== "sklep" ? { ...p, id: w.strona } : p);
    } else if (p.id === "ocena") {
      if (wielkosc === "tylko ja") continue;
      if (!pakiet.some((x) => x.id === "crm")) wynik.push({
          ...p,
          id: "crm",
          powod: "Ocena handlowców działa w CRM, więc dokładamy CRM.",
        });
      wynik.push(p);
    } else wynik.push(p);
  }
  return wynik;
}
