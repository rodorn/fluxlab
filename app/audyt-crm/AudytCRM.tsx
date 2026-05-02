"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { event as gaEvent } from "@/lib/gtag";
import TrackedCTA from "@/components/TrackedCTA";

/* ──────────────── types & data ──────────────── */

type Answer = "tak" | "nie" | "nie_wiem";

type Area =
  | "atrybucja"
  | "routing"
  | "kwalifikacja"
  | "automatyzacja_zadan"
  | "follow_up"
  | "raportowanie"
  | "przepisywanie"
  | "jakosc_danych"
  | "deduplikacja"
  | "integracje";

interface Question {
  id: number;
  text: string;
  area: Area;
  /**
   * Pytania "odwrócone": TAK = problem (czyli minus do zdrowia pipeline'u).
   * Domyślnie TAK = pozytyw.
   */
  inverted?: boolean;
  /** Krótki opis obszaru — używany w narracji wyniku. */
  areaLabel: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Czy każdy lead ma źródło? (z jakiej kampanii / kanału przyszedł)",
    area: "atrybucja",
    areaLabel: "atrybucja źródeł",
  },
  {
    id: 2,
    text: "Czy każdy lead ma właściciela? (przypisanego handlowca)",
    area: "routing",
    areaLabel: "routing leadów",
  },
  {
    id: 3,
    text: "Czy każdy etap pipeline'u ma jasne kryterium przejścia?",
    area: "kwalifikacja",
    areaLabel: "kwalifikacja i kryteria etapów",
  },
  {
    id: 4,
    text: "Czy CRM automatycznie tworzy zadania (np. po dodaniu leada)?",
    area: "automatyzacja_zadan",
    areaLabel: "automatyzacja zadań",
  },
  {
    id: 5,
    text: "Czy brak kontaktu w określonym czasie uruchamia przypomnienie?",
    area: "follow_up",
    areaLabel: "follow-up i przypomnienia",
  },
  {
    id: 6,
    text: "Czy raport pokazuje pełną ścieżkę: źródło → status → sprzedaż?",
    area: "raportowanie",
    areaLabel: "raportowanie end-to-end",
  },
  {
    id: 7,
    text: "Czy handlowcy ręcznie przepisują dane (z maili, formularzy, arkuszy)?",
    area: "przepisywanie",
    areaLabel: "ręczne przepisywanie danych",
    inverted: true,
  },
  {
    id: 8,
    text: "Czy są obowiązkowe pola, których nie da się ominąć przy zmianie etapu?",
    area: "jakosc_danych",
    areaLabel: "jakość danych w pipeline",
  },
  {
    id: 9,
    text: "Czy w CRM masz duplikaty firm lub kontaktów?",
    area: "deduplikacja",
    areaLabel: "deduplikacja kontaktów",
    inverted: true,
  },
  {
    id: 10,
    text: "Czy dane z reklam / formularzy trafiają do CRM automatycznie?",
    area: "integracje",
    areaLabel: "integracje wejściowe",
  },
];

/* ──────────────── recommendations per area ──────────────── */

const RECOMMENDATIONS: Record<Area, string[]> = {
  atrybucja: [
    "Dodaj pole „źródło leada” jako obowiązkowe na każdym deal'u.",
    "Skonfiguruj UTM-y w formularzach, żeby źródło wpadało automatycznie.",
    "W raporcie konwersji rozbij wynik per kanał — zobaczysz, co skaluje się tanio.",
  ],
  routing: [
    "Ustaw regułę przypisania właściciela natychmiast po utworzeniu leada (round-robin albo per region/produkt).",
    "Dodaj fallback — jeśli reguła nie zadziała, lead trafia do menedżera, nie wisi w próżni.",
    "Powiadomienie handlowca o nowym leadzie w 60 sekund od pojawienia się w CRM.",
  ],
  kwalifikacja: [
    "Spisz kryteria wejścia/wyjścia z każdego etapu w 1 zdaniu — bez tego pipeline jest fikcją.",
    "Wprowadź checklisty kwalifikacji (BANT, MEDDIC albo własną) widoczne na karcie deal'a.",
    "Etap „kwalifikowany” powinien wymagać konkretnych pól, nie deklaracji handlowca.",
  ],
  automatyzacja_zadan: [
    "Zautomatyzuj zadanie „pierwszy kontakt 15 min po dodaniu leada”.",
    "Po przejściu na etap kolejny — automatyczne zadanie z domyślnym terminem.",
    "Dla deali bez aktywności 7+ dni — auto-przypomnienie do właściciela.",
  ],
  follow_up: [
    "Skonfiguruj drabinkę przypomnień: 1, 3, 7, 14 dni po ostatnim kontakcie.",
    "Dla deali w „rozmowach” bez aktywności 14 dni — eskalacja do menedżera.",
    "Sekwencje mailowe dla zimnych leadów — minimum 3 punkty styku, automatycznie.",
  ],
  raportowanie: [
    "Zbuduj raport źródło → konwersja → MRR/wartość kontraktu — to podstawa decyzji marketingowych.",
    "Dashboard z czasem reakcji per handlowiec — to jeden z najsilniejszych predyktorów konwersji.",
    "Raport pipeline velocity — ile dni lead spędza w każdym etapie.",
  ],
  przepisywanie: [
    "Zacznij od formularza www — to zwykle największe źródło ręcznego przepisywania.",
    "Make/Zapier/n8n: webhook formularza → tworzenie kontaktu/firmy/deala w CRM jednym kliknięciem.",
    "Dla maili z zapytaniami — parser (regex albo LLM) wyciągający dane do CRM.",
  ],
  jakosc_danych: [
    "Zdefiniuj minimalne wymagane pola dla każdego etapu i włącz walidację w CRM.",
    "Co tydzień raport „braki danych” — które deale mają puste pola krytyczne.",
    "Onboarding handlowca: konkretny standard wypełniania CRM, nie „rób jak chcesz”.",
  ],
  deduplikacja: [
    "Włącz wbudowaną deduplikację po e-mailu i numerze NIP/VAT (jeśli dostępna).",
    "Zrób jednorazowe sprzątanie — eksport, dedup w arkuszu, import z merge.",
    "Reguła: nowy lead ze znanego maila/NIP-u łączy się z istniejącym kontaktem, nie tworzy duplikatu.",
  ],
  integracje: [
    "Połącz Meta Lead Ads / Google Lead Form bezpośrednio z CRM (natywne integracje albo Make/Zapier).",
    "Formularz na stronie www → webhook → CRM, bez przepisywania.",
    "Dla LinkedIn/maili: parser, który raz dziennie zgarnia nowe zapytania do CRM.",
  ],
};

/* ──────────────── scoring ──────────────── */

interface ScoreResult {
  score: number;
  category: "zdrowy" | "solidny" | "blokuje";
  categoryHeadline: string;
  categoryNarrative: string;
  weakestArea: Area | null;
  weakestAreaLabel: string;
  weakestAreaRecommendations: string[];
  problemAreas: { area: Area; label: string }[];
}

function scoreAnswers(answers: Record<number, Answer>): ScoreResult {
  let score = 0;
  const problemAreas: { area: Area; label: string }[] = [];

  QUESTIONS.forEach((q) => {
    const a = answers[q.id];
    if (a == null) return;
    const isPositive = q.inverted ? a === "nie" : a === "tak";
    if (isPositive) {
      score += 1;
    } else {
      // "nie" lub "nie_wiem" przy zwykłym pytaniu, "tak" lub "nie_wiem" przy odwróconym
      problemAreas.push({ area: q.area, label: q.areaLabel });
    }
  });

  // Najsłabszy obszar = pierwszy problemowy (każdy obszar ma jedno pytanie, więc kolejność = ważność)
  // Priorytet: najpierw obszary, gdzie odpowiedź była jednoznacznie negatywna
  const definitivelyNegative = QUESTIONS.filter((q) => {
    const a = answers[q.id];
    return q.inverted ? a === "tak" : a === "nie";
  });
  const unknown = QUESTIONS.filter((q) => answers[q.id] === "nie_wiem");

  const weakestQuestion = definitivelyNegative[0] ?? unknown[0] ?? null;
  const weakestArea = weakestQuestion?.area ?? null;
  const weakestAreaLabel = weakestQuestion?.areaLabel ?? "";
  const weakestAreaRecommendations = weakestArea
    ? RECOMMENDATIONS[weakestArea]
    : [];

  let category: "zdrowy" | "solidny" | "blokuje";
  let categoryHeadline: string;
  let categoryNarrative: string;
  if (score >= 8) {
    category = "zdrowy";
    categoryHeadline = "Zdrowy pipeline, gotowy do skalowania";
    categoryNarrative =
      "Twój CRM ma większość kluczowych filarów na miejscu. Automatyzacja na tym etapie to dokładanie sił do działającej maszyny — szybka reakcja, mniej ręcznej pracy, lepsze raporty. Dobry moment, żeby zająć się obszarami granicznymi i wycisnąć z procesu jeszcze 20–30%.";
  } else if (score >= 5) {
    category = "solidny";
    categoryHeadline = "Solidny fundament, kilka brakujących filarów";
    categoryNarrative =
      "Pipeline działa, ale ma luki, które blokują skalowanie. Najpierw warto załatać najważniejszy obszar (poniżej), potem wracać do automatyzacji ogólnej. Próba zautomatyzowania bałaganu daje zautomatyzowany bałagan — i to jeszcze szybszy.";
  } else {
    category = "blokuje";
    categoryHeadline = "Pipeline blokuje sprzedaż";
    categoryNarrative =
      "To nie jest problem CRM-a — to problem procesu. Zanim zautomatyzujesz cokolwiek, trzeba ustalić podstawy: kto jest właścicielem leada, jakie są kryteria etapów, skąd lead przychodzi. Automatyzacja bez tego daje tylko więcej zamieszania, nie więcej sprzedaży. Dobra wiadomość: jak już to ułożysz, kolejne etapy idą dużo szybciej.";
  }

  return {
    score,
    category,
    categoryHeadline,
    categoryNarrative,
    weakestArea,
    weakestAreaLabel,
    weakestAreaRecommendations,
    problemAreas,
  };
}

/* ──────────────── ui helpers ──────────────── */

function ProgressBar({ done, total }: { done: number; total: number }) {
  const pct = total > 0 ? (done / total) * 100 : 0;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Postęp audytu
        </span>
        <span className="text-sm font-semibold text-accent tabular-nums">
          {done}/{total}
        </span>
      </div>
      <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div
          className="h-2 rounded-full bg-accent transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function AnswerButton({
  active,
  onClick,
  variant,
  children,
}: {
  active: boolean;
  onClick: () => void;
  variant: "tak" | "nie" | "nie_wiem";
  children: React.ReactNode;
}) {
  const base =
    "flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all";
  const activeStyles: Record<typeof variant, string> = {
    tak: "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    nie: "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300",
    nie_wiem:
      "border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  };
  const idle =
    "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${active ? activeStyles[variant] : idle}`}
    >
      {children}
    </button>
  );
}

/* ──────────────── main component ──────────────── */

export default function AudytCRM() {
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const submittedRef = useRef(false);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gaEvent("calculator_viewed", { calculator: "audyt_crm" });
  }, []);

  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === QUESTIONS.length;

  const result = useMemo(() => scoreAnswers(answers), [answers]);

  // calculator_submit raz, po pierwszym uzyskaniu kompletu
  useEffect(() => {
    if (!isComplete || submittedRef.current) return;
    submittedRef.current = true;
    gaEvent("calculator_submit", {
      calculator: "audyt_crm",
      score: result.score,
      weakest_area: result.weakestArea ?? "brak",
    });
    // Auto-scroll do wyniku
    setTimeout(() => {
      const el = resultRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }, 100);
  }, [isComplete, result.score, result.weakestArea]);

  const setAnswer = (id: number, value: Answer) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const reset = () => {
    setAnswers({});
    submittedRef.current = false;
  };

  const categoryStyles: Record<
    ScoreResult["category"],
    { ring: string; bg: string; text: string; chip: string }
  > = {
    zdrowy: {
      ring: "border-emerald-500/40",
      bg: "bg-emerald-500/5 dark:bg-emerald-500/10",
      text: "text-emerald-600 dark:text-emerald-400",
      chip: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    },
    solidny: {
      ring: "border-amber-500/40",
      bg: "bg-amber-500/5 dark:bg-amber-500/10",
      text: "text-amber-600 dark:text-amber-400",
      chip: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    },
    blokuje: {
      ring: "border-rose-500/40",
      bg: "bg-rose-500/5 dark:bg-rose-500/10",
      text: "text-rose-600 dark:text-rose-400",
      chip: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
    },
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {/* Intro */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          10 pytań o Twój pipeline
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Każde pytanie ma trzy odpowiedzi: <strong>tak</strong>,{" "}
          <strong>nie</strong> albo <strong>nie wiem</strong>. „Nie wiem" liczy
          się jak „nie" — bo jeśli nie masz pewności, że coś działa, to znaczy,
          że nie działa świadomie.
        </p>
      </div>

      <ProgressBar done={answeredCount} total={QUESTIONS.length} />

      {/* Questions */}
      <div className="space-y-4">
        {QUESTIONS.map((q, idx) => {
          const a = answers[q.id];
          return (
            <div
              key={q.id}
              className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60 p-5 sm:p-6 space-y-4"
            >
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-7 h-7 rounded-full bg-accent/10 text-accent text-sm font-bold flex items-center justify-center tabular-nums">
                  {idx + 1}
                </span>
                <p className="text-base font-medium text-gray-900 dark:text-white leading-snug">
                  {q.text}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <AnswerButton
                  active={a === "tak"}
                  onClick={() => setAnswer(q.id, "tak")}
                  variant="tak"
                >
                  Tak
                </AnswerButton>
                <AnswerButton
                  active={a === "nie"}
                  onClick={() => setAnswer(q.id, "nie")}
                  variant="nie"
                >
                  Nie
                </AnswerButton>
                <AnswerButton
                  active={a === "nie_wiem"}
                  onClick={() => setAnswer(q.id, "nie_wiem")}
                  variant="nie_wiem"
                >
                  Nie wiem
                </AnswerButton>
              </div>
            </div>
          );
        })}
      </div>

      {/* Result */}
      {isComplete && (
        <div ref={resultRef} className="space-y-6 scroll-mt-24">
          <div
            className={`rounded-2xl border-2 p-6 sm:p-8 ${categoryStyles[result.category].ring} ${categoryStyles[result.category].bg}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <p
                  className={`text-xs font-semibold uppercase tracking-wider mb-1 ${categoryStyles[result.category].text}`}
                >
                  Wynik audytu
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {result.categoryHeadline}
                </h3>
              </div>
              <div
                className={`shrink-0 px-5 py-3 rounded-2xl text-center ${categoryStyles[result.category].chip}`}
              >
                <p className="text-[11px] uppercase tracking-wider opacity-80">
                  Zdrowie pipeline
                </p>
                <p className="text-3xl font-bold tabular-nums">
                  {result.score}
                  <span className="text-base opacity-70">/10</span>
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {result.categoryNarrative}
            </p>
          </div>

          {/* Weakest area */}
          {result.weakestArea && (
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/60 p-6 sm:p-8 space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">
                  Obszar z największym potencjałem automatyzacji
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {result.weakestAreaLabel}
                </h3>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  Pierwsze 2–3 kroki:
                </p>
                <ul className="space-y-2">
                  {result.weakestAreaRecommendations.slice(0, 3).map((rec) => (
                    <li
                      key={rec}
                      className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
                    >
                      <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-accent" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* All problem areas */}
          {result.problemAreas.length > 1 && (
            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                Pozostałe obszary do zaopiekowania
              </p>
              <div className="flex flex-wrap gap-2">
                {result.problemAreas.slice(1).map((p) => (
                  <span
                    key={p.area}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    {p.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="rounded-2xl border border-accent/20 bg-accent/5 dark:bg-accent/10 p-8 text-center">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Chcesz konkretną mapę automatyzacji dla tego pipeline'u?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
              W diagnozie pokażę, które z {result.problemAreas.length || "tych"}{" "}
              obszarów warto załatać w 1. etapie, jak to zautomatyzować i ile to
              realnie kosztuje.
            </p>
            <TrackedCTA
              href="/#kontakt"
              location="audit_crm_result"
              eventName="cta_click_audit_crm"
              className="btn-primary px-8 py-3 text-base"
            >
              Chcę mapę automatyzacji CRM
            </TrackedCTA>
          </div>

          <button
            type="button"
            onClick={reset}
            className="w-full py-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-accent hover:text-accent transition-colors"
          >
            Zacznij audyt od nowa
          </button>
        </div>
      )}

      {!isComplete && answeredCount > 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Odpowiedz na pozostałe {QUESTIONS.length - answeredCount}{" "}
          {QUESTIONS.length - answeredCount === 1 ? "pytanie" : "pytań"}, żeby
          zobaczyć wynik.
        </p>
      )}
    </div>
  );
}
