import { esc, ramkaMaila } from "@/lib/dokumenty-mail";
import { openaiJson } from "@/lib/openai-json";

export type Tryb = "umowa" | "porownanie" | "pytanie";

const pdf = (nazwa: string, b: Buffer) => ({
  type: "input_file",
  filename: nazwa,
  file_data: `data:application/pdf;base64,${b.toString("base64")}`,
});

const tekstow = (opis: string) => ({ type: "string", description: opis });
const lista = (opis: string) => ({ type: "array", description: opis, items: { type: "string" } });

const SCHEMAT_UMOWA = {
  type: "object",
  additionalProperties: false,
  required: ["rodzaj", "strony", "streszczenie", "kluczowe_zapisy", "terminy", "kary", "ryzyka", "do_negocjacji"],
  properties: {
    rodzaj: tekstow("Rodzaj umowy, np. umowa o świadczenie usług, najem, sprzedaż"),
    strony: lista("Strony umowy w jednym zdaniu każda"),
    streszczenie: tekstow("Streszczenie w 3 do 5 zdaniach"),
    kluczowe_zapisy: lista("Najważniejsze zapisy z numerem paragrafu, jeśli jest"),
    terminy: lista("Terminy, okresy, wypowiedzenia, płatności, z paragrafem"),
    kary: lista("Kary umowne, odsetki, odpowiedzialność i limity, z paragrafem"),
    ryzyka: lista("Zapisy niekorzystne albo niejasne dla strony, która ma ją podpisać"),
    do_negocjacji: lista("Punkty, które warto negocjować, każdy z propozycją zmiany"),
  },
};

const SCHEMAT_POROWNANIE = {
  type: "object",
  additionalProperties: false,
  required: ["podsumowanie", "zmiany", "ocena"],
  properties: {
    podsumowanie: tekstow("Co zmieniło się między wersjami w 2 do 4 zdaniach"),
    zmiany: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["miejsce", "bylo", "jest", "skutek"],
        properties: {
          miejsce: tekstow("Paragraf lub nazwa zapisu"),
          bylo: tekstow("Treść w wersji pierwszej, krótko; \"brak\", gdy zapisu nie było"),
          jest: tekstow("Treść w wersji drugiej, krótko; \"usunięto\", gdy zapis zniknął"),
          skutek: tekstow("Co to zmienia dla strony podpisującej"),
        },
      },
    },
    ocena: tekstow("Czy druga wersja jest korzystniejsza, gorsza czy mieszana i dlaczego, 2 do 3 zdań"),
  },
};

const ZASADY =
  "Odpowiadasz po polsku, rzeczowo, wyłącznie na podstawie załączonego dokumentu. Nie zgaduj i nie dopisuj zapisów, których w nim nie ma; jeśli czegoś brakuje, napisz, że umowa tego nie reguluje. Przy każdej pozycji podaj numer paragrafu, gdy występuje. Nie wydajesz porady prawnej.";

export type WynikUmowy = {
  rodzaj: string;
  strony: string[];
  streszczenie: string;
  kluczowe_zapisy: string[];
  terminy: string[];
  kary: string[];
  ryzyka: string[];
  do_negocjacji: string[];
};
export type WynikPorownania = {
  podsumowanie: string;
  zmiany: { miejsce: string; bylo: string; jest: string; skutek: string }[];
  ocena: string;
};

export async function analizujUmowe(plik: Buffer, nazwa: string): Promise<WynikUmowy> {
  return openaiJson<WynikUmowy>({
    instrukcja: `${ZASADY} Przygotuj streszczenie umowy i wskaż ryzyka dla strony, która ją podpisuje.`,
    wejscie: [{ role: "user", content: [pdf(nazwa, plik), { type: "input_text", text: "Przeanalizuj tę umowę." }] }],
    nazwa: "streszczenie_umowy",
    schemat: SCHEMAT_UMOWA,
    maxTokenow: 6000,
    timeoutMs: 200_000,
  });
}

export async function porownajUmowy(a: Buffer, nazwaA: string, b: Buffer, nazwaB: string): Promise<WynikPorownania> {
  return openaiJson<WynikPorownania>({
    instrukcja: `${ZASADY} Porównaj dwie wersje tej samej umowy: pierwszy plik to wersja pierwsza, drugi to wersja druga. Wypisz tylko zmiany merytoryczne (kwoty, terminy, kary, zakres, prawa i obowiązki); pomiń różnice w układzie i interpunkcji.`,
    wejscie: [
      {
        role: "user",
        content: [pdf(nazwaA, a), pdf(nazwaB, b), { type: "input_text", text: "Porównaj wersję pierwszą z drugą." }],
      },
    ],
    nazwa: "porownanie_umow",
    schemat: SCHEMAT_POROWNANIE,
    maxTokenow: 7000,
    timeoutMs: 200_000,
  });
}

const NAGLOWEK = 'style="font-size:16px;margin:20px 0 6px"';
const ul = (l: string[]) =>
  l.length ? `<ul style="margin:0;padding-left:20px">${l.map((x) => `<li style="margin:4px 0">${esc(x)}</li>`).join("")}</ul>` : '<p style="margin:0;color:#6b7280">Brak.</p>';
const STOPKA =
  '<p style="font-size:12px;color:#6b7280;margin-top:20px">To automatyczna analiza dokumentu, a nie porada prawna. Przed podpisaniem istotnej umowy pokaż ją prawnikowi.</p>';

export function mailUmowa(w: WynikUmowy, plik: string): { temat: string; html: string; tekst: string } {
  const sekcje: [string, string[]][] = [
    ["Kluczowe zapisy", w.kluczowe_zapisy],
    ["Terminy i płatności", w.terminy],
    ["Kary i odpowiedzialność", w.kary],
    ["Ryzyka", w.ryzyka],
    ["Do negocjacji", w.do_negocjacji],
  ];
  const html = ramkaMaila(
    `Streszczenie umowy: ${plik}`,
    `<p style="margin:0 0 8px"><b>${esc(w.rodzaj)}</b></p>${ul(w.strony)}<h2 ${NAGLOWEK}>Streszczenie</h2><p style="margin:0">${esc(w.streszczenie)}</p>${sekcje
      .map(([t, l]) => `<h2 ${NAGLOWEK}>${t}</h2>${ul(l)}`)
      .join("")}${STOPKA}`,
  );
  const tekst = [
    `${w.rodzaj}`,
    ...w.strony,
    "",
    "Streszczenie",
    w.streszczenie,
    ...sekcje.flatMap(([t, l]) => ["", t, ...l.map((x) => `- ${x}`)]),
    "",
    "To automatyczna analiza dokumentu, a nie porada prawna.",
  ].join("\n");
  return { temat: `Streszczenie umowy: ${plik}`, html, tekst };
}

export function mailPorownanie(w: WynikPorownania): { temat: string; html: string; tekst: string } {
  const tab = w.zmiany.length
    ? `<table style="border-collapse:collapse;width:100%;font-size:13px"><tr>${["Miejsce", "Było", "Jest", "Skutek"]
        .map((h) => `<th style="text-align:left;border-bottom:1px solid #e5e7eb;padding:6px 8px 6px 0">${h}</th>`)
        .join("")}</tr>${w.zmiany
        .map(
          (z) =>
            `<tr>${[z.miejsce, z.bylo, z.jest, z.skutek]
              .map((c) => `<td style="vertical-align:top;border-bottom:1px solid #f3f4f6;padding:6px 8px 6px 0">${esc(c)}</td>`)
              .join("")}</tr>`,
        )
        .join("")}</table>`
    : '<p style="margin:0">Nie znaleziono zmian merytorycznych.</p>';
  const html = ramkaMaila(
    "Porównanie dwóch wersji umowy",
    `<p style="margin:0">${esc(w.podsumowanie)}</p><h2 ${NAGLOWEK}>Zmiany</h2>${tab}<h2 ${NAGLOWEK}>Ocena</h2><p style="margin:0">${esc(w.ocena)}</p>${STOPKA}`,
  );
  const tekst = [
    w.podsumowanie,
    "",
    ...w.zmiany.map((z) => `${z.miejsce}: było: ${z.bylo}; jest: ${z.jest}; skutek: ${z.skutek}`),
    "",
    w.ocena,
    "",
    "To automatyczna analiza dokumentu, a nie porada prawna.",
  ].join("\n");
  return { temat: "Porównanie dwóch wersji umowy", html, tekst };
}

const SCHEMAT_PODATKI = {
  type: "object",
  additionalProperties: false,
  required: ["odpowiedz", "podstawa", "kroki", "ryzyka", "braki"],
  properties: {
    odpowiedz: tekstow("Wstępna odpowiedź na pytanie w 3 do 6 zdaniach, na wprost"),
    podstawa: lista("Przepisy i interpretacje, na których opiera się odpowiedź (ustawa, artykuł); tylko te, których jesteś pewien"),
    kroki: lista("Co praktycznie zrobić, w kolejności"),
    ryzyka: lista("Wyjątki, ryzyka i sytuacje, w których odpowiedź będzie inna"),
    braki: lista("Czego zabrakło w opisie, a co zmienia odpowiedź; pusta lista, gdy niczego"),
  },
};

export type WynikPodatkowy = { odpowiedz: string; podstawa: string[]; kroki: string[]; ryzyka: string[]; braki: string[] };

export async function odpowiedzPodatkowa(pytanie: string): Promise<WynikPodatkowy> {
  return openaiJson<WynikPodatkowy>({
    instrukcja:
      "Jesteś ekspertem od polskiego prawa podatkowego (PIT, CIT, VAT, ZUS, JDG, spółki). Odpowiadasz po polsku, rzeczowo i wyłącznie na podstawie opisu klienta; nie dopisuj faktów. Powołuj tylko przepisy, których jesteś pewien; gdy nie jesteś pewien, napisz to wprost zamiast zgadywać. Jeśli opis nie wystarcza do odpowiedzi, odpowiedz warunkowo i wypisz braki. Stan prawny z czasu Twojej wiedzy mógł się zmienić. To wstępna odpowiedź, nie interpretacja indywidualna i nie doradztwo podatkowe.",
    wejscie: [{ role: "user", content: [{ type: "input_text", text: pytanie }] }],
    nazwa: "odpowiedz_podatkowa",
    schemat: SCHEMAT_PODATKI,
    maxTokenow: 3500,
    timeoutMs: 120_000,
  });
}

export function mailPytanie(w: WynikPodatkowy, pytanie: string): { temat: string; html: string; tekst: string } {
  const stopka =
    '<p style="font-size:12px;color:#6b7280;margin-top:20px">To wstępna odpowiedź przygotowana automatycznie, a nie doradztwo podatkowe ani interpretacja indywidualna. Stan prawny mógł się zmienić; przed decyzją o większych skutkach sprawdź ją u doradcy podatkowego.</p>';
  const html = ramkaMaila(
    "Wstępna odpowiedź podatkowa",
    `<p style="margin:0;color:#6b7280;font-size:13px">Twoje pytanie: ${esc(pytanie.slice(0, 400))}${pytanie.length > 400 ? "…" : ""}</p>
<p style="margin:16px 0 0">${esc(w.odpowiedz)}</p>
<h3 ${NAGLOWEK}>Podstawa</h3>${ul(w.podstawa)}
<h3 ${NAGLOWEK}>Co zrobić</h3>${ul(w.kroki)}
<h3 ${NAGLOWEK}>Ryzyka i wyjątki</h3>${ul(w.ryzyka)}
${w.braki.length ? `<h3 ${NAGLOWEK}>Czego zabrakło w opisie</h3>${ul(w.braki)}` : ""}${stopka}`,
  );
  const tekst = [w.odpowiedz, "Podstawa: " + w.podstawa.join("; "), "Co zrobić: " + w.kroki.join("; "), "Ryzyka: " + w.ryzyka.join("; ")].join("\n\n");
  return { temat: "Wstępna odpowiedź podatkowa", html, tekst };
}
