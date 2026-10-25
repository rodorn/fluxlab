/** Wycena strony w konfiguratorze /strony-www i w wycenie PDF. Jedno źródło cen,
 *  żeby konfigurator i dokument liczyły tak samo. Ceny netto, orientacyjne.
 *  Podstrona ponad pakiet: 150 zł, bo kolejne powstają z szablonu w CMS. Strona
 *  jak FINREAL (35 podstron, blog, kalkulator, przeniesienie treści) wychodzi
 *  ok. 9 900 zł (decyzja Pawła 25.10.2026). Płatności jak dodatek na /landing-z-platnoscia
 *  (790 zł), każdy język 30% strony, bo to tłumaczenie i kopia każdej podstrony.
 *  Opieka jak w cenniku /strony-www: 300, 600 albo 1 280 zł miesięcznie.
 *  Chatbot: wdrożenie raz, potem opłata za model AI i aktualizację bazy wiedzy. */

export type Rodzaj = {
  id: string;
  nazwa: string;
  opis: string;
  cena: number;
  podstron: number;
  tygodnie: number;
  /** Co zwykle wchodzi w pakiet podstron. */
  przyklad: string;
};

export const RODZAJE: Rodzaj[] = [
  {
    id: "landing",
    nazwa: "Strona w tydzień, do 5 podstron",
    opis: "Formularz i kalendarz spotkań.",
    cena: 2900,
    podstron: 5,
    tygodnie: 1,
    przyklad: "strona główna, oferta, o nas, realizacje, kontakt",
  },
  {
    id: "firmowa",
    nazwa: "Strona firmowa z CMS",
    opis: "Do 15 podstron, blog, panel edycji, Profil Google.",
    cena: 5900,
    podstron: 15,
    tygodnie: 3,
    przyklad: "do tego osobna podstrona każdej usługi, cennik, pytania, zespół",
  },
  {
    id: "sklep",
    nazwa: "Sklep z integracją",
    opis: "Katalog, płatności, kurier i faktury.",
    cena: 9900,
    podstron: 15,
    tygodnie: 5,
    przyklad: "kategorie, koszyk, konto klienta, regulamin; produkty nie są liczone",
  },
];

export const ZA_PODSTRONE = 150;
export const MAX_PODSTRON = 50;

export type OpcjaStrony = {
  nazwa: string;
  /** Rodzaje strony, w których opcja jest już w cenie. */
  wCenie: string[];
  cena: number;
  /** Opłata co miesiąc, poza sumą wdrożenia. */
  miesiecznie?: number;
};

export const OPCJE_STRONY: Record<string, OpcjaStrony> = {
  crm: {
    nazwa: "Formularz podpięty do CRM",
    wCenie: ["landing", "firmowa", "sklep"],
    cena: 0,
  },
  rezerwacje: {
    nazwa: "Kalendarz spotkań i rezerwacje",
    wCenie: ["landing", "firmowa", "sklep"],
    cena: 0,
  },
  cms: {
    nazwa: "Panel do edycji treści (CMS)",
    wCenie: ["firmowa", "sklep"],
    cena: 1500,
  },
  blog: { nazwa: "Blog", wCenie: ["firmowa"], cena: 1200 },
  platnosci: { nazwa: "Płatności online", wCenie: ["sklep"], cena: 790 },
  projekt: { nazwa: "Indywidualny projekt graficzny", wCenie: [], cena: 1500 },
  migracja: {
    nazwa: "Przeniesienie treści ze starej strony z przekierowaniami",
    wCenie: [],
    cena: 290,
  },
  kalkulator: {
    nazwa: "Kalkulator lub konfigurator dla klienta",
    wCenie: [],
    cena: 690,
  },
  chatbot: {
    nazwa: "Chatbot AI na bazie wiedzy o firmie",
    wCenie: [],
    cena: 1900,
    miesiecznie: 199,
  },
};

/** Przykład dla liczby podstron na suwaku konfiguratora. */
export const przykladPodstron = (n: number) =>
  n <= 5
    ? RODZAJE[0].przyklad
    : n <= 15
      ? `strona główna, kontakt i ${n - 2} podstron z usługami, cennikiem i pytaniami`
      : `jak FINREAL: 35 podstron, w tym 21 z ofertą kredytów, zespół, kalkulator i regulaminy`;

export const TRESCI = [
  { id: "mam", nazwa: "Mam gotowe teksty", zaPodstrone: 0 },
  { id: "poprawki", nazwa: "Teksty do poprawy", zaPodstrone: 60 },
  { id: "piszemy", nazwa: "Teksty piszemy od zera", zaPodstrone: 150 },
] as const;

export const PRODUKTY = [
  { id: "do100", nazwa: "do 100", cena: 0 },
  { id: "do1000", nazwa: "do 1 000 (import z pliku)", cena: 1500 },
  { id: "hurtownia", nazwa: "ponad 1 000 albo z hurtowni", cena: 3900 },
] as const;

export const OPIEKA = [
  { cena: 0, nazwa: "Bez opieki" },
  {
    cena: 300,
    nazwa: "Opieka 300 zł/mies.",
    opis: "2 poprawki na kwartał, monitoring",
  },
  {
    cena: 600,
    nazwa: "Opieka 600 zł/mies.",
    opis: "5 poprawek na kwartał, opinie w Google",
  },
  {
    cena: 1280,
    nazwa: "Opieka 1 280 zł/mies.",
    opis: "10 poprawek na kwartał, post co tydzień",
  },
] as const;

export const JEZYK_PROCENT = 0.3;
export const MAX_JEZYKOW = 3;

export type KonfiguracjaStrony = {
  r: string;
  o: string[];
  /** Liczba podstron, języki dodatkowe, treści, produkty, opieka miesięczna. */
  p?: number;
  j?: number;
  tr?: string;
  pr?: string;
  op?: number;
};

export type PozycjaWyceny = { nazwa: string; opis?: string; netto: number };

export type WynikWyceny = {
  rodzaj: Rodzaj;
  pozycje: PozycjaWyceny[];
  wCenie: string[];
  suma: number;
  miesiecznie: number;
  abonamenty: PozycjaWyceny[];
  tygodnie: number;
};

const sto = (n: number) => Math.round(n / 100) * 100;

export function wycenStrone(k: KonfiguracjaStrony): WynikWyceny | null {
  const rodzaj = RODZAJE.find((r) => r.id === k.r);
  if (!rodzaj) return null;
  const p = Math.min(
    MAX_PODSTRON,
    Math.max(1, Math.round(k.p ?? rodzaj.podstron)),
  );
  const j = Math.min(MAX_JEZYKOW, Math.max(0, Math.round(k.j ?? 0)));
  const tresci = TRESCI.find((t) => t.id === k.tr) ?? TRESCI[0];
  const produkty =
    rodzaj.id === "sklep"
      ? (PRODUKTY.find((x) => x.id === k.pr) ?? PRODUKTY[0])
      : null;
  const opieka = OPIEKA.find((o) => o.cena === k.op) ?? OPIEKA[0];
  const ponad = Math.max(0, p - rodzaj.podstron);

  const pozycje: PozycjaWyceny[] = [
    {
      nazwa: rodzaj.nazwa,
      opis: `Wdrożenie do ${rodzaj.podstron} podstron, hosting w cenie`,
      netto: rodzaj.cena,
    },
  ];
  if (ponad)
    pozycje.push({
      nazwa: `Dodatkowe podstrony: ${ponad}`,
      opis: `${ponad} × ${ZA_PODSTRONE} zł`,
      netto: ponad * ZA_PODSTRONE,
    });
  const strona = rodzaj.cena + ponad * ZA_PODSTRONE;
  if (j)
    pozycje.push({
      nazwa: `Dodatkowe języki: ${j}`,
      opis: `tłumaczenie i kopia ${p} podstron, ${JEZYK_PROCENT * 100}% strony za język`,
      netto: j * sto(strona * JEZYK_PROCENT),
    });
  if (tresci.zaPodstrone)
    pozycje.push({
      nazwa: tresci.nazwa,
      opis: `${p} × ${tresci.zaPodstrone} zł`,
      netto: p * tresci.zaPodstrone,
    });
  if (produkty?.cena)
    pozycje.push({
      nazwa: `Produkty: ${produkty.nazwa}`,
      netto: produkty.cena,
    });

  const wCenie = Object.values(OPCJE_STRONY)
    .filter((o) => o.wCenie.includes(rodzaj.id))
    .map((o) => o.nazwa);
  const abonamenty: PozycjaWyceny[] = opieka.cena
    ? [{ nazwa: "Opieka nad stroną", netto: opieka.cena }]
    : [];
  for (const id of new Set(k.o)) {
    const o = OPCJE_STRONY[id];
    if (!o || o.wCenie.includes(rodzaj.id)) continue;
    pozycje.push({ nazwa: o.nazwa, netto: o.cena });
    if (o.miesiecznie) abonamenty.push({ nazwa: o.nazwa, netto: o.miesiecznie });
  }

  const tygodnie =
    rodzaj.tygodnie +
    Math.ceil(ponad / 10) +
    (tresci.id === "piszemy" ? 1 : 0) +
    (j ? 1 : 0) +
    (k.o.includes("projekt") ? 1 : 0) +
    (k.o.includes("chatbot") ? 1 : 0) +
    (produkty && produkty.cena ? 1 : 0);

  return {
    rodzaj,
    pozycje,
    wCenie,
    suma: pozycje.reduce((s, x) => s + x.netto, 0),
    miesiecznie: abonamenty.reduce((s, x) => s + x.netto, 0),
    abonamenty,
    tygodnie,
  };
}

export const terminTekst = (t: number) =>
  t === 1 ? "7 dni" : `${t} ${t < 5 ? "tygodnie" : "tygodni"}`;
