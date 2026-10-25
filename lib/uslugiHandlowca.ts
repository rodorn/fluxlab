/** Katalog wirtualnego handlowca na stronie głównej: strony jednorazowo
 *  z RODZAJE i usługi miesięczne z ABONAMENTY, więc ceny mają jedno źródło. */

import { ABONAMENTY } from "./abonamenty";
import { OPIEKA, RODZAJE } from "./opcjeStrony";
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
  poprawki:
    "Gdy audyt strony pokazał błędy, a naprawa wychodzi taniej niż nowa strona. Cenę liczy audyt.",
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
  {
    id: "poprawki",
    nazwa: "Poprawki z audytu strony",
    href: "/audyt-strony",
    cena: "według audytu",
    jednorazowo: 0,
    miesiecznie: 0,
    kiedy: KIEDY.poprawki,
  },
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
  {
    osoby: number;
    wariant: WariantCrm;
    strona: string;
    progi: Record<string, number>;
  }
> = {
  "tylko ja": {
    osoby: 1,
    wariant: "pilotaz",
    strona: "landing",
    progi: { strona: 0, konkurencja: 0 },
  },
  "2-5": {
    osoby: 4,
    wariant: "pilotaz",
    strona: "landing",
    progi: { strona: 0, konkurencja: 1 },
  },
  "6-20": {
    osoby: 12,
    wariant: "integracje",
    strona: "firmowa",
    progi: { strona: 1, konkurencja: 1 },
  },
  "ponad 20": {
    osoby: 25,
    wariant: "integracje",
    strona: "firmowa",
    progi: { strona: 2, konkurencja: 2 },
  },
};

/** Pakiety usług miesięcznych z kilkoma cenami: opieka jak w OPIEKA,
 *  benchmarking jak w cenniku /benchmarking-konkurencji. */
export const PROGI: Record<
  string,
  { etykieta: string; opis: string; cena: number }[]
> = {
  strona: OPIEKA.filter((o) => o.cena).map((o) => ({
    etykieta: `${o.cena.toLocaleString("pl-PL")} zł`,
    opis: "opis" in o ? o.opis : "",
    cena: o.cena,
  })),
  konkurencja: [
    { etykieta: "co miesiąc", opis: "raport co miesiąc", cena: 39 },
    { etykieta: "co tydzień", opis: "raport co tydzień", cena: 49 },
    { etykieta: "codziennie", opis: "raport codziennie", cena: 69 },
  ],
};

export const odm = (n: number, jeden: string, kilka: string, wiele: string) =>
  `${n} ${n === 1 ? jeden : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? kilka : wiele}`;

/** Streszczenie audytu całej strony, który handlowiec robi w trakcie analizy. */
export type AudytHandlowca = {
  host: string;
  punkty: number | null;
  sprawdzone: number;
  zBledem: number;
  problemow: number;
  zlamane: number;
  ustalenia: { tytul: string; fakt: string; waga: string; koszt: number }[];
  naprawa: number;
  pozycji: number;
  dni: number;
};

export type DecyzjaStrony = {
  decyzja: "nowa" | "poprawki" | "opieka";
  powod: string;
  strona: string;
};

/** Poprawki czy nowa strona: nowa, gdy wynik jest słaby, naprawa kosztuje
 *  co najmniej połowę nowej strony albo co trzecia podstrona zwraca błąd. */
export function decyzjaStrony(
  a: AudytHandlowca,
  wielkosc: string | undefined,
): DecyzjaStrony | null {
  if (a.punkty === null || !a.sprawdzone) return null;
  const strona = (wielkosc && WIELKOSC[wielkosc]?.strona) || "firmowa";
  const cena = USLUGI_HANDLOWCA.find((u) => u.id === strona)!.jednorazowo;
  const zl = (n: number) => `${n.toLocaleString("pl-PL")} zł`;
  const audyt = `Audyt ${odm(a.sprawdzone, "podstrony", "podstron", "podstron")}: wynik ${a.punkty}/100`;
  if (a.punkty < 40)
    return {
      decyzja: "nowa",
      strona,
      powod: `${audyt}, ${odm(a.problemow, "problem", "problemy", "problemów")}. Przy takim stanie łatanie się nie opłaca, nowa strona za ${zl(cena)} zaczyna od czystej karty.`,
    };
  if (a.zBledem / a.sprawdzone > 0.3)
    return {
      decyzja: "nowa",
      strona,
      powod: `${audyt}, ale ${a.zBledem} z ${a.sprawdzone} podstron zwraca błąd. Lepiej postawić nową stronę za ${zl(cena)} niż łatać.`,
    };
  if (a.naprawa >= cena / 2)
    return {
      decyzja: "nowa",
      strona,
      powod: `${audyt}. Naprawa kosztowałaby ${zl(a.naprawa)}, ponad połowę nowej strony za ${zl(cena)}, więc lepiej postawić nową.`,
    };
  if (!a.naprawa)
    return {
      decyzja: "opieka",
      strona,
      powod: `${audyt}, nic do płatnej naprawy. Nowa strona nie jest potrzebna.`,
    };
  return {
    decyzja: "poprawki",
    strona,
    powod: `${audyt}, ${odm(a.pozycji, "rzecz", "rzeczy", "rzeczy")} do poprawy. Naprawa za ${zl(a.naprawa)} w ${odm(a.dni, "dzień roboczy", "dni robocze", "dni roboczych")} zamiast nowej strony za ${zl(cena)}.`,
  };
}

/** Najwyżej jedna strona (sklep zostaje, landing i firmowa według wielkości),
 *  ocena handlowców tylko z CRM i tylko przy zespole. O nowej stronie albo
 *  poprawkach decyduje audyt; bez audytu poprawek nie ma z czego wycenić. */
export function uporzadkujPakiet<T extends { id: string; powod: string }>(
  pakiet: T[],
  wielkosc: string | undefined,
  d: DecyzjaStrony | null,
): T[] {
  const w = wielkosc ? WIELKOSC[wielkosc] : undefined;
  const nowa = (id: string) => id === "landing" || id === "firmowa";
  let strona = false;
  const wynik: T[] = [];
  if (d?.decyzja === "poprawki")
    wynik.push({ ...pakiet[0], id: "poprawki", powod: d.powod });
  if (d?.decyzja === "nowa" && !pakiet.some((p) => STRONY.includes(p.id))) {
    wynik.push({ ...pakiet[0], id: d.strona, powod: d.powod });
    strona = true;
  }
  for (const p of pakiet) {
    if (wynik.some((x) => x.id === p.id)) continue;
    if (p.id === "poprawki") continue;
    if (nowa(p.id) && d && d.decyzja !== "nowa") continue;
    if (STRONY.includes(p.id)) {
      if (strona) continue;
      strona = true;
      wynik.push(
        p.id === "sklep"
          ? p
          : { ...p, id: w?.strona ?? p.id, powod: d ? d.powod : p.powod },
      );
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
