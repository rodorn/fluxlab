export type FormOption = { value: string; label: string };

export const PROBLEM_TYPES: FormOption[] = [
  { value: "", label: "Wybierz obszar..." },
  { value: "strony-www", label: "Strony WWW (nowa lub poprawki)" },
  { value: "leady", label: "Obsługa leadów" },
  { value: "crm", label: "CRM (Pipedrive / HubSpot / Salesforce)" },
  { value: "raportowanie", label: "Raportowanie" },
  { value: "scraping", label: "Scraping / ekstrakcja danych" },
  { value: "integracje", label: "Integracje API" },
  { value: "przepisywanie", label: "Ręczne przepisywanie danych" },
  { value: "diagnoza", label: "Nie wiemy, chcemy diagnozy" },
];

const FALLBACK_SCALE: FormOption[] = [
  { value: "", label: "Wybierz skalę..." },
  { value: "nie-wiemy", label: "Nie wiemy" },
];

export const PROBLEM_SCALES_BY_TYPE: Record<string, FormOption[]> = {
  "strony-www": [
    { value: "", label: "Wybierz typ projektu..." },
    { value: "landing", label: "Landing page (1 strona)" },
    { value: "firmowa", label: "Strona firmowa (kilka podstron)" },
    { value: "poprawki", label: "Poprawki w obecnej stronie" },
    { value: "audyt", label: "Audyt / doradztwo" },
    { value: "nie-wiemy", label: "Nie wiemy" },
  ],
  leady: [
    { value: "", label: "Wybierz skalę..." },
    { value: "do-30", label: "Do 30 leadów miesięcznie" },
    { value: "30-100", label: "30–100 leadów miesięcznie" },
    { value: "100-plus", label: "100+ leadów miesięcznie" },
    { value: "nie-wiemy", label: "Nie wiemy" },
  ],
  crm: [
    { value: "", label: "Wybierz skalę bazy..." },
    { value: "mala-baza", label: "Mała baza (do 100 kontaktów)" },
    { value: "srednia-baza", label: "Średnia (100–1000)" },
    { value: "duza-baza", label: "Duża (1000+)" },
    { value: "nie-wiemy", label: "Nie wiemy" },
  ],
  raportowanie: [
    { value: "", label: "Wybierz skalę raportów..." },
    { value: "jeden-raport", label: "Jeden cykliczny raport" },
    { value: "kilka-raportow", label: "Kilka raportów (2–5)" },
    { value: "dashboard", label: "Pełny dashboard / wiele raportów" },
    { value: "nie-wiemy", label: "Nie wiemy" },
  ],
  scraping: [
    { value: "", label: "Wybierz typ scrapingu..." },
    { value: "jedno-zrodlo", label: "Jedno źródło (np. monitoring 1 strony)" },
    { value: "kilka-zrodel", label: "Kilka źródeł (2–5)" },
    {
      value: "multi-source",
      label: "Multi-source pipeline (web + PDF + maile)",
    },
    { value: "ocr-faktury", label: "OCR faktur / dokumentów" },
    { value: "nie-wiemy", label: "Nie wiemy" },
  ],
  integracje: [
    { value: "", label: "Wybierz skalę integracji..." },
    { value: "1-2-systemy", label: "Łączymy 1–2 systemy" },
    { value: "3-5-systemow", label: "3–5 systemów" },
    { value: "wieksza-architektura", label: "Większa architektura (5+)" },
    { value: "nie-wiemy", label: "Nie wiemy" },
  ],
  przepisywanie: [
    { value: "", label: "Wybierz skalę pracy..." },
    { value: "do-godziny", label: "Do godziny dziennie" },
    { value: "kilka-godzin", label: "Kilka godzin dziennie" },
    { value: "caly-etat", label: "Cały etat na przepisywanie" },
    { value: "nie-wiemy", label: "Nie wiemy" },
  ],
  diagnoza: [
    { value: "", label: "Wybierz typ pytania..." },
    {
      value: "co-mamy-automatyzowac",
      label: "Nie wiemy, co u nas automatyzować",
    },
    { value: "czy-warto", label: "Mamy pomysł, ale nie wiemy czy warto" },
    {
      value: "od-czego-zaczac",
      label: "Wiemy co, ale nie wiemy od czego zacząć",
    },
    { value: "nie-wiemy", label: "Nie wiemy" },
  ],
};

export function getScalesForType(problemType: string): FormOption[] {
  return PROBLEM_SCALES_BY_TYPE[problemType] ?? FALLBACK_SCALE;
}

export const PROBLEM_TYPE_LABELS: Record<string, string> = Object.fromEntries(
  PROBLEM_TYPES.filter((opt) => opt.value).map((opt) => [opt.value, opt.label]),
);

export const PROBLEM_SCALE_LABELS: Record<string, string> = Object.fromEntries(
  Object.values(PROBLEM_SCALES_BY_TYPE)
    .flat()
    .filter((opt) => opt.value)
    .map((opt) => [opt.value, opt.label]),
);
