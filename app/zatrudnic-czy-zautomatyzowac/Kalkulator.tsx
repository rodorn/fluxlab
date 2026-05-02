"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { event as gaEvent } from "@/lib/gtag";
import TrackedCTA from "@/components/TrackedCTA";

/* ──────────────── types & defaults ──────────────── */

type Frequency =
  | "codziennie"
  | "kilka_w_tyg"
  | "raz_w_tyg"
  | "kilka_w_mies"
  | "okazjonalnie";

type TeamSize = "1" | "2-3" | "zespol";

interface Inputs {
  czasH: number;
  kosztH: number;
  frequency: Frequency;
  repetitive: boolean;
  team: TeamSize;
}

const DEFAULTS: Inputs = {
  czasH: 40,
  kosztH: 60,
  frequency: "kilka_w_tyg",
  repetitive: true,
  team: "1",
};

const FREQUENCY_LABELS: Record<Frequency, string> = {
  codziennie: "codziennie",
  kilka_w_tyg: "kilka razy w tygodniu",
  raz_w_tyg: "raz w tygodniu",
  kilka_w_mies: "kilka razy w miesiącu",
  okazjonalnie: "okazjonalnie",
};

/* Etat orientacyjny: 168h/mies (zgodnie z briefem). */
const FULL_TIME_HOURS = 168;

/* Zakresy kosztu automatyzacji z briefu. */
const AUTOMATION_ONE_OFF_MIN = 1500;
const AUTOMATION_ONE_OFF_MAX = 8000;
const AUTOMATION_MAINTENANCE_MIN = 0;
const AUTOMATION_MAINTENANCE_MAX = 200;

/* ──────────────── helpers ──────────────── */

const fmtPLN = (n: number) =>
  Math.round(n).toLocaleString("pl-PL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

const fmtRange = (min: number, max: number) =>
  `${fmtPLN(min)}–${fmtPLN(max)} zł`;

/* ──────────────── recommendation logic ──────────────── */

type RecommendationKind = "automate" | "manual" | "review" | "consider";

interface Recommendation {
  kind: RecommendationKind;
  headline: string;
  detail: string;
}

function recommend(d: Inputs): Recommendation {
  const isHighFrequency =
    d.frequency === "codziennie" || d.frequency === "kilka_w_tyg";

  if (d.repetitive && isHighFrequency) {
    return {
      kind: "automate",
      headline: "Mocna rekomendacja: zautomatyzuj.",
      detail:
        "Powtarzalny proces o wysokiej częstotliwości to klasyczny case dla automatyzacji. Wdrożenie zwykle zwraca się w 1–4 miesiące, a oszczędność czasu jest stała każdego miesiąca, nie tylko raz. Co więcej, automat nie zapomina, nie idzie na urlop i nie myli się przy 50. powtórzeniu z rzędu.",
    };
  }

  if (!d.repetitive) {
    return {
      kind: "manual",
      headline: "Automatyzacja ma niski sens — proces jest niestabilny.",
      detail:
        "Jeśli wymagania ciągle się zmieniają, automatyzacja będzie wymagała ciągłego dopisywania wyjątków. To koszt nie tylko wdrożeniowy, ale też operacyjny — częściej niż częściowo zautomatyzowany proces lepiej trzymać jako ludzki, ale dobrze opisany (checklisty, szablony, SOP-y). Zautomatyzuj dopiero, gdy proces sam się ustabilizuje.",
    };
  }

  if (d.czasH < 5 && d.frequency === "okazjonalnie") {
    return {
      kind: "manual",
      headline: "Ręczna obsługa OK — skala nie uzasadnia wdrożenia.",
      detail:
        "Mniej niż 5 godzin miesięcznie i okazjonalna częstotliwość to za mała baza, żeby ROI z automatyzacji wyszło sensownie. Lepiej skupić się na procesach o większej skali. Wróć do tego, jeśli wolumen wzrośnie 3–4 razy.",
    };
  }

  return {
    kind: "review",
    headline: "Warto policzyć dokładniej.",
    detail:
      "Twoje parametry są w środku przedziału — automatyzacja może mieć sens, ale wynik zależy od konkretu: jak skomplikowany jest proces, jakie systemy są w grze, ile osób się nim zajmuje. To dobry moment na bezpłatną diagnozę: 30 minut wystarczy, żeby ustalić, czy ten konkretny proces zwróci się w 3 miesiące, czy w 12.",
  };
}

/* ──────────────── ui components ──────────────── */

function NumberField({
  label,
  value,
  min,
  unit,
  hint,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  unit?: string;
  hint?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          inputMode="numeric"
          min={min}
          value={value}
          onChange={(e) => {
            const raw = Number(e.target.value);
            if (Number.isNaN(raw)) return;
            onChange(Math.max(min, raw));
          }}
          className="w-full px-4 py-2.5 pr-20 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent tabular-nums"
        />
        {unit && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            {unit}
          </span>
        )}
      </div>
      {hint && (
        <p className="text-xs text-gray-400 dark:text-gray-500">{hint}</p>
      )}
    </div>
  );
}

function PillSelector<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="space-y-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
              value === opt.id
                ? "border-accent bg-accent/10 text-accent"
                : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function YesNoSelector({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="space-y-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
        {label}
      </span>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
            value
              ? "border-accent bg-accent/10 text-accent"
              : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
          }`}
        >
          Tak
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
            !value
              ? "border-accent bg-accent/10 text-accent"
              : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
          }`}
        >
          Nie
        </button>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  highlight,
  hint,
  variant,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  hint?: string;
  variant?: "automate" | "manual" | "review";
}) {
  const variantStyles: Record<string, string> = {
    automate:
      "border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    manual:
      "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/40 text-gray-700 dark:text-gray-300",
    review:
      "border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300",
  };

  if (variant) {
    return (
      <div className={`rounded-2xl p-6 border-2 ${variantStyles[variant]}`}>
        <p className="text-[11px] uppercase tracking-wider opacity-70 mb-2">
          {label}
        </p>
        <p className="font-bold text-xl">{value}</p>
        {hint && <p className="mt-2 text-xs opacity-70">{hint}</p>}
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl p-6 border ${
        highlight
          ? "border-accent/30 bg-accent-light dark:bg-accent-dark-light"
          : "border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60"
      }`}
    >
      <p className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
        {label}
      </p>
      <p
        className={`font-bold tabular-nums ${
          highlight
            ? "text-accent text-3xl"
            : "text-gray-900 dark:text-white text-2xl"
        }`}
      >
        {value}
      </p>
      {hint && (
        <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">{hint}</p>
      )}
    </div>
  );
}

/* ──────────────── main component ──────────────── */

export default function Kalkulator() {
  const [data, setData] = useState<Inputs>(DEFAULTS);
  const submittedRef = useRef(false);
  const userTouchedRef = useRef(false);

  useEffect(() => {
    gaEvent("calculator_viewed", { calculator: "hire_vs_automate" });
  }, []);

  // calculator_submit raz po pierwszej zmianie inputu
  useEffect(() => {
    if (!userTouchedRef.current || submittedRef.current) return;
    const t = setTimeout(() => {
      if (submittedRef.current) return;
      submittedRef.current = true;
      gaEvent("calculator_submit", {
        calculator: "hire_vs_automate",
        czas_h: data.czasH,
        koszt_h: data.kosztH,
        frequency: data.frequency,
        repetitive: data.repetitive,
        team: data.team,
      });
    }, 800);
    return () => clearTimeout(t);
  }, [data]);

  const set = <K extends keyof Inputs>(key: K, val: Inputs[K]) => {
    userTouchedRef.current = true;
    setData((prev) => ({ ...prev, [key]: val }));
  };

  const result = useMemo(() => {
    const monthlyManual = data.czasH * data.kosztH;
    const yearlyManual = monthlyManual * 12;
    const fullTimeMonthly = data.kosztH * FULL_TIME_HOURS;
    const recommendation = recommend(data);
    return {
      monthlyManual,
      yearlyManual,
      fullTimeMonthly,
      recommendation,
    };
  }, [data]);

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {/* ── Inputs ── */}
      <div className="space-y-8">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Twój proces
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Wynik liczy się na bieżąco. Domyślne wartości to typowy proces
            obsługi 100 leadów miesięcznie — podmień na własne.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <NumberField
            label="Ile godzin miesięcznie zajmuje Ci ten proces?"
            value={data.czasH}
            min={1}
            unit="h/mies."
            hint="Sumaryczny czas wszystkich osób obsługujących ten proces."
            onChange={(v) => set("czasH", v)}
          />
          <NumberField
            label="Koszt godziny pracy"
            value={data.kosztH}
            min={1}
            unit="zł/h"
            hint="Stawka brutto osoby wykonującej proces. Standardowo 50–120 zł/h."
            onChange={(v) => set("kosztH", v)}
          />
        </div>

        <PillSelector<Frequency>
          label="Jak często proces występuje?"
          options={[
            { id: "codziennie", label: "Codziennie" },
            { id: "kilka_w_tyg", label: "Kilka razy w tyg." },
            { id: "raz_w_tyg", label: "Raz w tygodniu" },
            { id: "kilka_w_mies", label: "Kilka razy w mies." },
            { id: "okazjonalnie", label: "Okazjonalnie" },
          ]}
          value={data.frequency}
          onChange={(v) => set("frequency", v)}
        />

        <div className="grid sm:grid-cols-2 gap-6">
          <YesNoSelector
            label="Czy proces jest powtarzalny i stabilny?"
            value={data.repetitive}
            onChange={(v) => set("repetitive", v)}
          />
          <PillSelector<TeamSize>
            label="Ile osób obsługuje ten proces?"
            options={[
              { id: "1", label: "1 osoba" },
              { id: "2-3", label: "2–3 osoby" },
              { id: "zespol", label: "Zespół" },
            ]}
            value={data.team}
            onChange={(v) => set("team", v)}
          />
        </div>
      </div>

      {/* ── Wynik ── */}
      <div className="space-y-6">
        <div className="rounded-2xl border-2 border-accent/30 bg-accent/5 dark:bg-accent/10 p-6 sm:p-8">
          <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
            Twój proces zajmuje{" "}
            <strong className="text-accent">
              {data.czasH} godzin miesięcznie
            </strong>{" "}
            przy koszcie{" "}
            <strong className="text-accent">{data.kosztH} zł/h</strong> ={" "}
            <strong className="text-accent">
              {fmtPLN(result.monthlyManual)} zł miesięcznie
            </strong>{" "}
            (={" "}
            <strong className="text-accent">
              {fmtPLN(result.yearlyManual)} zł rocznie
            </strong>
            ) ręcznej pracy.
          </p>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            <strong className="text-gray-900 dark:text-white">
              {result.recommendation.headline}
            </strong>{" "}
            {result.recommendation.detail}
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <MetricCard
            label="Koszt ręcznej pracy / mies."
            value={`${fmtPLN(result.monthlyManual)} zł`}
            hint={`${data.czasH} h × ${data.kosztH} zł/h`}
          />
          <MetricCard
            label="Koszt ręcznej pracy / rok"
            value={`${fmtPLN(result.yearlyManual)} zł`}
            highlight
            hint={`${fmtPLN(result.monthlyManual)} zł × 12 mies.`}
          />
          <MetricCard
            label="Sygnał decyzyjny"
            value={
              result.recommendation.kind === "automate"
                ? "Automatyzuj"
                : result.recommendation.kind === "manual"
                  ? "Zostań przy ręcznej"
                  : "Policz dokładniej"
            }
            variant={
              result.recommendation.kind === "automate"
                ? "automate"
                : result.recommendation.kind === "manual"
                  ? "manual"
                  : "review"
            }
            hint={`Częstotliwość: ${FREQUENCY_LABELS[data.frequency]}`}
          />
        </div>

        {/* Reference points */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/60 p-6 space-y-4">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">
            Punkty odniesienia
          </h3>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            <div className="flex items-start gap-3">
              <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
              <p>
                <strong className="text-gray-900 dark:text-white">
                  Etat orientacyjny:
                </strong>{" "}
                ~{fmtPLN(result.fullTimeMonthly)} zł/mies. ({data.kosztH} zł/h ×{" "}
                {FULL_TIME_HOURS} h). To <em>tylko</em> stawka brutto razy
                godziny — pełen koszt zatrudnienia (ZUS, urlopy, sprzęt,
                rekrutacja, onboarding) jest wyższy o 30–50%.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
              <p>
                <strong className="text-gray-900 dark:text-white">
                  Automatyzacja orientacyjnie:
                </strong>{" "}
                {fmtRange(AUTOMATION_ONE_OFF_MIN, AUTOMATION_ONE_OFF_MAX)}{" "}
                jednorazowo (wdrożenie) +{" "}
                {fmtRange(
                  AUTOMATION_MAINTENANCE_MIN,
                  AUTOMATION_MAINTENANCE_MAX,
                )}
                /mies. (utrzymanie i licencje narzędzi). Konkretna kwota zależy
                od liczby integracji i logiki.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
              <p>
                <strong className="text-gray-900 dark:text-white">
                  Punkt zwrotu:
                </strong>{" "}
                przy ręcznym koszcie {fmtPLN(result.monthlyManual)} zł/mies.
                wdrożenie automatyzacji o średniej cenie ({fmtPLN(4750)} zł){" "}
                zwraca się w{" "}
                <strong className="text-accent">
                  ~
                  {result.monthlyManual > 0
                    ? Math.max(
                        1,
                        Math.round(4750 / Math.max(1, result.monthlyManual)),
                      )
                    : "—"}{" "}
                  miesięcy
                </strong>
                . To bardzo zgrubny szacunek — w diagnozie liczę konkretnie pod
                Twój proces.
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
          Uproszczenie: kalkulator nie liczy pełnego kosztu zatrudnienia (ZUS,
          urlopy, narzędzia, czas rekrutacji) ani pełnego TCO automatyzacji
          (utrzymanie, modyfikacje, koszt błędu). Wynik to szacunek skali
          decyzji, nie wycena.
        </p>
      </div>

      {/* ── CTA — primary ── */}
      <div className="rounded-2xl border border-accent/20 bg-accent/5 dark:bg-accent/10 p-8 text-center">
        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Chcesz konkretnie sprawdzić, ile zaoszczędzisz?
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
          W diagnozie 30-minutowej liczę pełny koszt obecnego procesu, koszt
          wdrożenia automatyzacji i punkt zwrotu — pod Twoje konkretne narzędzia
          i wolumen.
        </p>
        <TrackedCTA
          href="/#kontakt"
          location="calc_choice_result"
          eventName="cta_click_calc_choice"
          className="btn-primary px-8 py-3 text-base"
        >
          Sprawdź, ile zaoszczędzisz konkretnie
        </TrackedCTA>
      </div>

      {/* ── CTA — secondary ── */}
      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Jeśli problemem są leady, użyj precyzyjniejszego kalkulatora →{" "}
          <a
            href="/kalkulator-leadow"
            className="text-accent hover:underline font-medium"
          >
            Kalkulator kosztu obsługi leadów
          </a>
        </p>
      </div>
    </div>
  );
}
