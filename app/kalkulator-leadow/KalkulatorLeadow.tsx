"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { event as gaEvent } from "@/lib/gtag";
import TrackedCTA from "@/components/TrackedCTA";

/* ──────────────── types & defaults ──────────────── */

interface Inputs {
  leadyMies: number;
  czasMin: number;
  kosztH: number;
  opoznione: number;
  wartoscKlienta: number;
  konwersja: number;
}

const DEFAULTS: Inputs = {
  leadyMies: 100,
  czasMin: 5,
  kosztH: 60,
  opoznione: 30,
  wartoscKlienta: 5000,
  konwersja: 5,
};

/* Procent opóźnionych leadów efektywnie traconych (zakładamy 30%) */
const LOST_RATIO = 0.3;

/* ──────────────── helpers ──────────────── */

const fmtPLN = (n: number) =>
  Math.round(n).toLocaleString("pl-PL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

const fmtNum = (n: number, frac = 1) =>
  n.toLocaleString("pl-PL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: frac,
  });

/* ──────────────── reusable inputs ──────────────── */

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
          className="w-full px-4 py-2.5 pr-16 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent tabular-nums"
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

function PercentSlider({
  label,
  value,
  hint,
  onChange,
}: {
  label: string;
  value: number;
  hint?: string;
  onChange: (v: number) => void;
}) {
  const pct = value;
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
        <span className="text-sm font-semibold text-accent tabular-nums">
          {value}%
        </span>
      </div>
      <div className="relative">
        <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-2 rounded-full bg-accent transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-accent shadow-md pointer-events-none transition-all"
          style={{ left: `calc(${pct}% - 10px)` }}
        />
      </div>
      {hint && (
        <p className="text-xs text-gray-400 dark:text-gray-500">{hint}</p>
      )}
    </div>
  );
}

/* ──────────────── result card ──────────────── */

function MetricCard({
  label,
  value,
  highlight,
  hint,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  hint?: string;
}) {
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

export default function KalkulatorLeadow() {
  const [data, setData] = useState<Inputs>(DEFAULTS);
  const submittedRef = useRef(false);
  const userTouchedRef = useRef(false);

  // calculator_viewed na entry — spójne z innymi kalkulatorami
  useEffect(() => {
    gaEvent("calculator_viewed", { calculator: "leads_cost" });
  }, []);

  // calculator_submit raz na sesję — po pierwszej zmianie inputu (debounce 800ms)
  useEffect(() => {
    if (!userTouchedRef.current || submittedRef.current) return;
    const t = setTimeout(() => {
      if (submittedRef.current) return;
      submittedRef.current = true;
      gaEvent("calculator_submit", {
        calculator: "leads_cost",
        leady_mies: data.leadyMies,
        czas_min: data.czasMin,
        koszt_h: data.kosztH,
        opoznione_pct: data.opoznione,
        wartosc_klienta: data.wartoscKlienta,
        konwersja_pct: data.konwersja,
      });
    }, 800);
    return () => clearTimeout(t);
  }, [data]);

  const set = <K extends keyof Inputs>(key: K, val: Inputs[K]) => {
    userTouchedRef.current = true;
    setData((prev) => ({ ...prev, [key]: val }));
  };

  const result = useMemo(() => {
    const kosztRecznejPracy =
      data.leadyMies * (data.czasMin / 60) * data.kosztH;
    const liczbaPlacacych = data.leadyMies * (data.konwersja / 100);
    const wartoscKlientowMies = liczbaPlacacych * data.wartoscKlienta;
    const liczbaZgubionych =
      data.leadyMies *
      (data.opoznione / 100) *
      (data.konwersja / 100) *
      LOST_RATIO;
    const kosztZgubionychMies = liczbaZgubionych * data.wartoscKlienta;
    const kosztCalkowity = kosztRecznejPracy + kosztZgubionychMies;
    const kosztRoczny = kosztCalkowity * 12;

    return {
      kosztRecznejPracy,
      liczbaPlacacych,
      wartoscKlientowMies,
      liczbaZgubionych,
      kosztZgubionychMies,
      kosztCalkowity,
      kosztRoczny,
    };
  }, [data]);

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {/* ── Inputs ── */}
      <div className="space-y-8">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Twoje dane
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Wynik liczy się na bieżąco. Domyślne wartości to typowy mały zespół
            B2B — podmień na własne, żeby zobaczyć realny koszt u siebie.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <NumberField
            label="Leady miesięcznie"
            value={data.leadyMies}
            min={1}
            unit="szt."
            hint="Liczba zapytań / formularzy / maili z całego miesiąca."
            onChange={(v) => set("leadyMies", v)}
          />
          <NumberField
            label="Czas ręcznej obsługi 1 leada"
            value={data.czasMin}
            min={1}
            unit="min"
            hint="Przepisanie danych, założenie tematu w CRM, pierwsza odpowiedź."
            onChange={(v) => set("czasMin", v)}
          />
          <NumberField
            label="Koszt godziny pracy osoby obsługującej"
            value={data.kosztH}
            min={1}
            unit="zł/h"
            hint="Stawka brutto handlowca / asystenta. Standardowo 50–100 zł/h."
            onChange={(v) => set("kosztH", v)}
          />
          <NumberField
            label="Szacowana wartość 1 klienta"
            value={data.wartoscKlienta}
            min={1}
            unit="zł"
            hint="Średni przychód z jednego klienta (LTV albo wartość kontraktu)."
            onChange={(v) => set("wartoscKlienta", v)}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <PercentSlider
            label="Leady z opóźnioną reakcją"
            value={data.opoznione}
            hint="Szacunkowy procent leadów, które nie dostają odpowiedzi w sensownym czasie."
            onChange={(v) => set("opoznione", v)}
          />
          <PercentSlider
            label="Konwersja lead → klient"
            value={data.konwersja}
            hint="Ile procent wszystkich leadów zostaje płacącymi klientami."
            onChange={(v) => set("konwersja", v)}
          />
        </div>
      </div>

      {/* ── Wynik ── */}
      <div className="space-y-6">
        <div className="rounded-2xl border-2 border-accent/30 bg-accent/5 dark:bg-accent/10 p-6 sm:p-8">
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            Ręczna obsługa leadów kosztuje Cię około{" "}
            <strong className="text-accent">
              {fmtPLN(result.kosztRecznejPracy)} zł miesięcznie
            </strong>{" "}
            w samym czasie pracy. Jeśli przez opóźnienia tracisz nawet{" "}
            <strong className="text-accent">{data.opoznione}%</strong>{" "}
            potencjalnych klientów, realny koszt może być znacznie wyższy —
            szacunkowo{" "}
            <strong className="text-accent">
              {fmtPLN(result.kosztRoczny)} zł rocznie
            </strong>
            .
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <MetricCard
            label="Koszt ręcznej pracy / mies."
            value={`${fmtPLN(result.kosztRecznejPracy)} zł`}
            hint={`${data.leadyMies} leadów × ${data.czasMin} min × ${data.kosztH} zł/h`}
          />
          <MetricCard
            label="Koszt zgubionych leadów / mies."
            value={`${fmtPLN(result.kosztZgubionychMies)} zł`}
            hint={`~${fmtNum(result.liczbaZgubionych, 1)} klientów × ${fmtPLN(
              data.wartoscKlienta,
            )} zł`}
          />
          <MetricCard
            label="Łączny koszt rocznie"
            value={`${fmtPLN(result.kosztRoczny)} zł`}
            highlight
            hint="Czas pracy + utracona sprzedaż × 12 mies."
          />
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
          Uproszczenie modelu: zakładamy, że 30% leadów z opóźnioną reakcją
          efektywnie konwertuje gorzej i są to leady realnie utracone. Wynik to
          szacunek, nie audyt księgowy — ale w praktyce wystarczy, żeby zobaczyć
          skalę problemu.
        </p>
      </div>

      {/* ── CTA ── */}
      <div className="rounded-2xl border border-accent/20 bg-accent/5 dark:bg-accent/10 p-8 text-center">
        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Chcesz sprawdzić, które kroki da się usunąć?
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
          W diagnozie pokazuję, gdzie w Twoim procesie tracisz czas i leady oraz
          który pierwszy etap warto zautomatyzować, żeby ten koszt spadł.
        </p>
        <TrackedCTA
          href="/#kontakt"
          location="calc_leads_result"
          eventName="cta_click_calc_leads"
          className="btn-primary px-8 py-3 text-base"
        >
          Zamów bezpłatną diagnozę
        </TrackedCTA>
      </div>
    </div>
  );
}
