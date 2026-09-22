/**
 * Warstwa opisowa audytu: dobór materiałów, rozmowa z modelem i złożenie
 * gotowego raportu.
 *
 * Podział obowiązków jest tu ostry i celowy. Liczby, ustalenia i cena
 * powstają w modułach pomiarowym i oceniającym, deterministycznie. Model
 * dostaje je jako fakty i ma z nich napisać tekst dla człowieka. Nie wolno mu
 * dołożyć ani jednej liczby od siebie, bo raport, w którym nie da się
 * wskazać źródła danych, jest wart tyle co cudza opinia o cudzej stronie.
 */

import type { Pomiar } from "./audyt-pomiar";
import type { Ustalenie, Wycena } from "./audyt-ocena";

/** Artykuł, który realnie rozwija dane ustalenie. Bez naciągania. */
const MATERIALY: Record<string, { tytul: string; href: string }> = {
  pusta_tresc: {
    tytul: "Czy asystenci AI widzą Twoją stronę",
    href: "/strefa-wiedzy/czy-ai-widzi-strony-dealerow",
  },
  blokada_ai: {
    tytul: "Czy asystenci AI widzą Twoją stronę",
    href: "/strefa-wiedzy/czy-ai-widzi-strony-dealerow",
  },
  brak_danych: {
    tytul: "Co jest nie tak ze stronami, które nie sprzedają",
    href: "/strefa-wiedzy/co-jest-nie-tak-ze-stronami-dealerow",
  },
  brak_spf: {
    tytul: "Dlaczego maile trafiają do spamu",
    href: "/strefa-wiedzy/maile-trafiaja-do-spamu",
  },
  brak_dmarc: {
    tytul: "Podszywanie się pod firmowy adres",
    href: "/strefa-wiedzy/podszywanie-sie-pod-firmowy-email",
  },
  wolny_serwer: {
    tytul: "Gdy konwersje pokazują zero",
    href: "/strefa-wiedzy/konwersje-pokazuja-zero",
  },
  wolno_na_komorce: {
    tytul: "Gdy konwersje pokazują zero",
    href: "/strefa-wiedzy/konwersje-pokazuja-zero",
  },
};

export type SekcjaAI = {
  obszar: string;
  naglowek: string;
  tekst: string;
};

export type RaportAI = {
  /** Jedno zdanie werdyktu, bez owijania. */
  werdykt: string;
  /** Streszczenie dla osoby, która przeczyta wyłącznie ten akapit. */
  streszczenie: string;
  sekcje: SekcjaAI[];
  /** Kolejność prac z uzasadnieniem, dlaczego właśnie taka. */
  kolejnosc: { krok: string; powod: string }[];
  /** Co zostało zmierzone dobrze. Raport bez tego jest niewiarygodny. */
  mocneStrony: string[];
};

export const SCHEMAT_RAPORTU = {
  type: "object",
  additionalProperties: false,
  required: ["werdykt", "streszczenie", "sekcje", "kolejnosc", "mocneStrony"],
  properties: {
    werdykt: { type: "string" },
    streszczenie: { type: "string" },
    sekcje: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["obszar", "naglowek", "tekst"],
        properties: {
          obszar: { type: "string" },
          naglowek: { type: "string" },
          tekst: { type: "string" },
        },
      },
    },
    kolejnosc: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["krok", "powod"],
        properties: { krok: { type: "string" }, powod: { type: "string" } },
      },
    },
    mocneStrony: { type: "array", items: { type: "string" } },
  },
} as const;

export function materialDo(klucz: string): { tytul: string; href: string } | null {
  return MATERIALY[klucz] ?? null;
}

const INSTRUKCJA = `Jesteś starszym konsultantem technicznym Fluxlab. Piszesz raport z audytu strony dla właściciela firmy, który nie jest programistą, ale jest człowiekiem dorosłym i zarządza budżetem. Raport ma być na poziomie płatnej pracy eksperckiej.

ZASADY BEZWZGLĘDNE:
- Nie wolno Ci podać ANI JEDNEJ liczby, której nie ma w przekazanych danych. Żadnych "typowo 40% użytkowników", "średnio o 30% więcej", "badania pokazują". Jeśli nie masz liczby w danych, pisz jakościowo.
- Nie strasz i nie sprzedawaj. Opisujesz stan i konsekwencję. Decyzję podejmuje czytelnik.
- Jeżeli ustaleń jest mało albo żadnych, powiedz wprost, że strona jest w dobrym stanie. Nie szukaj problemów na siłę, bo to podważa cały raport.
- Nie obiecuj pozycji w wyszukiwarce ani wzrostu sprzedaży. Możesz mówić o usuwaniu przeszkód.
- Pamiętaj, że nie mierzyliśmy strony w przeglądarce. Nie pisz o czasie rysowania, przesunięciach układu ani wyniku Lighthouse.

JĘZYK:
- Polski, pełne zdania, rzeczowo i spokojnie. Ton: kompetentny fachowiec, który tłumaczy bez protekcjonalności.
- ZAKAZ długich myślników. Zamiast nich przecinek albo kropka.
- Bez wykrzykników, bez wielkich liter dla podkreślenia, bez emoji, bez marketingowego żargonu ("rewolucyjny", "kompleksowy", "dedykowany").
- Nie zwracaj się per "Panie". Forma bezosobowa albo "Wasza strona".

CZĘŚCI:
- werdykt: jedno zdanie, najwyżej 25 słów, mówiące w jakim stanie jest strona.
- streszczenie: 4 do 6 zdań dla kogoś, kto przeczyta tylko to. Ma zawierać najważniejsze ustalenie, jego konsekwencję i to, od czego zacząć.
- sekcje: po jednej na obszar, w którym COKOLWIEK ustalono. Pole obszar to dokładnie jedna z wartości: dostepnosc, szybkosc, mobile, seo, ai, poczta. Naglowek to zwięzły tytuł. Tekst to 3 do 6 zdań wiążących ustalenia z tego obszaru w całość i tłumaczących, co z nich wynika razem. Nie powtarzaj suchej listy, ona jest obok w raporcie.
- kolejnosc: od 3 do 6 kroków w kolejności wykonania. Krok to czynność. Powod to wyjaśnienie, dlaczego akurat teraz, na przykład że bez tego kolejne prace nie dadzą efektu albo że to najtańsza rzecz o największym skutku.
- mocneStrony: od 1 do 5 rzeczy, które są zrobione dobrze, wyłącznie na podstawie danych. Jeżeli naprawdę nie ma czego pochwalić, zwróć pustą listę.`;

/** Dane dla modelu w formie, która nie pozwala mu niczego dopowiedzieć. */
export function materialDlaModelu(
  p: Pomiar,
  ustalenia: Ustalenie[],
  wycena: Wycena,
  punkty: number | null,
): string {
  const zmierzone = p.zasoby.filter((z) => z.bajty !== null);
  return JSON.stringify(
    {
      domena: p.domena,
      punktacja: punkty ?? "nie wystawiono, strona nie zostala zbadana",
      pomiar_komputer: {
        czas_pierwszego_bajtu_ms: p.ttfbMs,
        pelny_czas_dokumentu_ms: p.pelnyMs,
        status: p.statusHtml,
        dokument_bajty: p.htmlBajty,
        kompresja: p.kompresjaHtml,
        serwer: p.serwer,
        tresc_po_odjeciu_skryptow_znakow: p.trescZnakow,
      },
      pomiar_telefon: {
        viewport: p.mobile.viewport,
        blokuje_powiekszanie: p.mobile.blokujePowiekszanie,
        osobny_dokument: p.mobile.osobnaWersja,
        czas_pierwszego_bajtu_ms: p.mobile.ttfbMs,
        regul_media_w_stylach: p.mobile.regulMedia,
        stalych_szerokosci_w_stylach: p.mobile.stalychSzerokosci,
        obrazow_bez_srcset: p.mobile.obrazowBezSrcset,
        waga_calosci_bajty: p.mobile.wagaCalosci,
        szacowane_sekundy_na_lacze_komorkowe: p.mobile.sekundNa4G,
      },
      zasoby: {
        znalezione: p.zasoby.length,
        zwazone: zmierzone.length,
        najciezsze: zmierzone
          .sort((a, b) => (b.bajty ?? 0) - (a.bajty ?? 0))
          .slice(0, 5)
          .map((z) => ({ plik: z.adres.split("/").pop(), rodzaj: z.rodzaj, bajty: z.bajty })),
      },
      seo: {
        tytul: p.tytul,
        dlugosc_tytulu: p.tytul?.length ?? null,
        opis: p.opisMeta,
        dlugosc_opisu: p.opisMeta?.length ?? null,
        naglowkow_h1: p.h1.length,
        canonical: p.canonical,
        jezyk: p.jezyk,
        noindex: p.noindex,
        open_graph: p.og,
        dane_strukturalne: p.daneStrukturalne,
        hreflang: p.hreflang,
        mapa_strony: p.sitemap,
        robots: p.robots,
        obrazy: p.obrazy,
      },
      certyfikat: p.cert,
      poczta: p.poczta,
      ustalenia: ustalenia.map((u) => ({
        waga: u.waga,
        obszar: u.obszar,
        tytul: u.tytul,
        fakt: u.fakt,
        koszt_naprawy_zl: u.koszt,
      })),
      wycena_zl: wycena,
    },
    null,
    1,
  );
}

export async function napiszRaport(
  p: Pomiar,
  ustalenia: Ustalenie[],
  wycena: Wycena,
  punkty: number | null,
  klucz: string,
): Promise<RaportAI | null> {
  try {
    const odp = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${klucz}` },
      body: JSON.stringify({
        model: "gpt-5.5",
        // gpt-5.5 odrzuca temperature w /v1/responses, co kładzie całe
        // wywołanie błędem 400. Sprawdzone na narzędziu diagnozy.
        max_output_tokens: 5000,
        instructions: INSTRUKCJA,
        input: `Dane z pomiaru strony ${p.domena}. Napisz raport.\n\n${materialDlaModelu(p, ustalenia, wycena, punkty)}`,
        text: {
          format: {
            type: "json_schema",
            name: "raport",
            strict: true,
            schema: SCHEMAT_RAPORTU,
          },
        },
      }),
    });
    if (!odp.ok) return null;
    const dane = await odp.json();
    const tekst =
      dane.output_text ??
      dane.output?.find((o: { type: string }) => o.type === "message")?.content?.[0]?.text;
    if (typeof tekst !== "string") return null;
    return JSON.parse(tekst) as RaportAI;
  } catch {
    return null;
  }
}
