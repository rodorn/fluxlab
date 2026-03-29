"use client";

import { useState, useMemo } from "react";

/* ═══════════════════════════════════════════════════
   STAŁE PODATKOWE 2025
   ═══════════════════════════════════════════════════ */

const YEAR = 2026;

// Skala podatkowa
const TAX_FREE = 30_000;
const BRACKET_LIMIT = 120_000;
const RATE_12 = 0.12;
const RATE_32 = 0.32;
const TAX_REDUCTION = 3_600; // 12% × 30 000

// Podatek liniowy
const LINEAR_RATE = 0.19;

// ZUS – podstawy wymiaru 2026
const AVG_SALARY = 9_322; // prognozowane przeciętne wynagrodzenie 2026
const MIN_WAGE = 4_826; // minimalne wynagrodzenie 2026
const FULL_ZUS_BASE = Math.round(AVG_SALARY * 0.6 * 100) / 100; // 5 593,20
const SMALL_ZUS_BASE = Math.round(MIN_WAGE * 0.3 * 100) / 100; // 1 447,80

// Stawki składek społecznych
const EMERYTALNA = 0.1952;
const RENTOWA = 0.08;
const CHOROBOWA = 0.0245;
const WYPADKOWA = 0.0167;
const ZUS_WITH = EMERYTALNA + RENTOWA + CHOROBOWA + WYPADKOWA;
const ZUS_WITHOUT = EMERYTALNA + RENTOWA + WYPADKOWA;
const FP_RATE = 0.0245;

// Składka zdrowotna
const HEALTH_RATE_SKALA = 0.09;
const HEALTH_RATE_LINEAR = 0.049;
const HEALTH_MIN_BASE = Math.round(MIN_WAGE * 0.75 * 100) / 100;

// Ryczałt – progi składki zdrowotnej (miesięczne podstawy)
const RYCZALT_HEALTH_BRACKETS: { limit: number; base: number }[] = [
  { limit: 60_000, base: Math.round(AVG_SALARY * 0.6 * 100) / 100 },
  { limit: 300_000, base: AVG_SALARY },
  { limit: Infinity, base: Math.round(AVG_SALARY * 1.8 * 100) / 100 },
];

// Limit odliczenia składki zdrowotnej – liniowy (2026)
const LINEAR_HEALTH_CAP = 12_900;

// Stawki ryczałtu
const RYCZALT_OPTIONS = [
  { rate: 2, desc: "Sprzedaż wyrobów z własnej produkcji rolnej" },
  { rate: 3, desc: "Gastronomia, handel detaliczny" },
  { rate: 5.5, desc: "Produkcja, budownictwo" },
  { rate: 8.5, desc: "Usługi, wynajem (do 100 tys.)" },
  { rate: 10, desc: "Kupno i sprzedaż nieruchomości" },
  { rate: 12, desc: "IT, programowanie, usługi techniczne" },
  { rate: 12.5, desc: "Wynajem (powyżej 100 tys.)" },
  { rate: 14, desc: "Usługi zdrowotne" },
  { rate: 15, desc: "Usługi prawne, doradcze, księgowe" },
  { rate: 17, desc: "Wolne zawody" },
];

/* ═══════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════ */

type ZusStatus = "ulga" | "maly" | "pelny";
type ViewMode = "annual" | "monthly";

interface RyczaltSource {
  id: number;
  amount: number;
  rate: number;
}

interface TaxResult {
  label: string;
  annualRevenue: number;
  annualCosts: number;
  zusSpoleczne: number;
  funduszPracy: number;
  healthInsurance: number;
  healthDeduction: number;
  taxBase: number;
  incomeTax: number;
  vatToPay: number;
  totalBurden: number;
  netIncome: number;
  effectiveRate: number;
}

/* ═══════════════════════════════════════════════════
   CALCULATION HELPERS
   ═══════════════════════════════════════════════════ */

function zusMonthly(status: ZusStatus, chorobowa: boolean): number {
  if (status === "ulga") return 0;
  const base = status === "maly" ? SMALL_ZUS_BASE : FULL_ZUS_BASE;
  return base * (chorobowa ? ZUS_WITH : ZUS_WITHOUT);
}

function fpMonthly(status: ZusStatus): number {
  return status === "pelny" ? FULL_ZUS_BASE * FP_RATE : 0;
}

function healthSkala(monthlyIncome: number): number {
  return Math.max(monthlyIncome, HEALTH_MIN_BASE) * HEALTH_RATE_SKALA;
}

function healthLinear(monthlyIncome: number): number {
  return Math.max(monthlyIncome, HEALTH_MIN_BASE) * HEALTH_RATE_LINEAR;
}

function healthRyczalt(annualRevenue: number): number {
  for (const b of RYCZALT_HEALTH_BRACKETS) {
    if (annualRevenue <= b.limit) return b.base * HEALTH_RATE_SKALA;
  }
  return RYCZALT_HEALTH_BRACKETS.at(-1)!.base * HEALTH_RATE_SKALA;
}

function taxSkala(taxBase: number): number {
  if (taxBase <= 0) return 0;
  const t =
    taxBase <= BRACKET_LIMIT
      ? taxBase * RATE_12 - TAX_REDUCTION
      : BRACKET_LIMIT * RATE_12 - TAX_REDUCTION + (taxBase - BRACKET_LIMIT) * RATE_32;
  return Math.max(0, Math.round(t));
}

function taxLinear(taxBase: number): number {
  return taxBase <= 0 ? 0 : Math.round(taxBase * LINEAR_RATE);
}

/* ═══════════════════════════════════════════════════
   FULL CALCULATION
   ═══════════════════════════════════════════════════ */

function calculate(
  monthlyRevenue: number,
  monthlyCosts: number,
  zusStatus: ZusStatus,
  chorobowa: boolean,
  ryczaltSources: RyczaltSource[],
  isVat: boolean,
  vatRate: number,
  vatCostsRate: number,
): { skala: TaxResult; linear: TaxResult; ryczalt: TaxResult } {
  const annRev = monthlyRevenue * 12;
  const annCosts = monthlyCosts * 12;
  const zusM = zusMonthly(zusStatus, chorobowa);
  const fpM = fpMonthly(zusStatus);
  const annZus = Math.round(zusM * 12);
  const annFP = Math.round(fpM * 12);

  // VAT
  const vatRevenue = isVat ? annRev * (vatRate / 100) : 0;
  const vatCosts = isVat ? annCosts * (vatCostsRate / 100) : 0;
  const vatToPay = Math.max(0, Math.round(vatRevenue - vatCosts));

  // ── SKALA ──
  const skalaMonthlyInc = Math.max(0, monthlyRevenue - monthlyCosts - zusM);
  const skalaHealthM = healthSkala(skalaMonthlyInc);
  const skalaHealthAnn = Math.round(skalaHealthM * 12);
  const skalaTaxBase = Math.max(0, Math.round(annRev - annCosts - annZus));
  const skalaTax = taxSkala(skalaTaxBase);
  const skalaBurden = annZus + annFP + skalaHealthAnn + skalaTax + vatToPay;

  // ── LINIOWY ──
  const linearMonthlyInc = Math.max(0, monthlyRevenue - monthlyCosts - zusM);
  const linearHealthM = healthLinear(linearMonthlyInc);
  const linearHealthAnn = Math.round(linearHealthM * 12);
  const linearHealthDed = Math.min(linearHealthAnn, LINEAR_HEALTH_CAP);
  const linearTaxBase = Math.max(0, Math.round(annRev - annCosts - annZus - linearHealthDed));
  const linearTax = taxLinear(linearTaxBase);
  const linearBurden = annZus + annFP + linearHealthAnn + linearTax + vatToPay;

  // ── RYCZAŁT ──
  const ryczHealthM = healthRyczalt(annRev);
  const ryczHealthAnn = Math.round(ryczHealthM * 12);
  const ryczHealthDed = Math.round(ryczHealthAnn * 0.5);

  const totalRyczRev = ryczaltSources.reduce((s, src) => s + src.amount * 12, 0);
  let ryczTax = 0;
  for (const src of ryczaltSources) {
    const srcAnn = src.amount * 12;
    const proportion = totalRyczRev > 0 ? srcAnn / totalRyczRev : 0;
    const srcDed = Math.round(ryczHealthDed * proportion);
    ryczTax += Math.round(Math.max(0, srcAnn - srcDed) * (src.rate / 100));
  }
  const ryczBurden = annZus + annFP + ryczHealthAnn + ryczTax + vatToPay;

  const mk = (
    label: string,
    costs: number,
    health: number,
    healthDed: number,
    base: number,
    tax: number,
    burden: number,
  ): TaxResult => ({
    label,
    annualRevenue: annRev,
    annualCosts: costs,
    zusSpoleczne: annZus,
    funduszPracy: annFP,
    healthInsurance: health,
    healthDeduction: healthDed,
    taxBase: base,
    incomeTax: tax,
    vatToPay,
    totalBurden: burden,
    netIncome: annRev - burden,
    effectiveRate: annRev > 0 ? burden / annRev : 0,
  });

  return {
    skala: mk("Skala podatkowa", annCosts, skalaHealthAnn, 0, skalaTaxBase, skalaTax, skalaBurden),
    linear: mk("Podatek liniowy", annCosts, linearHealthAnn, linearHealthDed, linearTaxBase, linearTax, linearBurden),
    ryczalt: mk("Ryczałt", 0, ryczHealthAnn, ryczHealthDed, totalRyczRev, ryczTax, ryczBurden),
  };
}

/* ═══════════════════════════════════════════════════
   FORMAT HELPERS
   ═══════════════════════════════════════════════════ */

function pln(v: number): string {
  return v.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " zł";
}

function pct(v: number): string {
  return (v * 100).toFixed(1) + "%";
}

/* ═══════════════════════════════════════════════════
   SUBCOMPONENTS
   ═══════════════════════════════════════════════════ */

function NumberInput({
  label,
  value,
  onChange,
  min = 0,
  max = 10_000_000,
  step = 100,
  unit = "zł",
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Math.max(min, Math.min(max, Number(e.target.value) || 0)))}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 pr-12 text-sm text-gray-900 dark:text-white focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition tabular-nums"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
          {unit}
        </span>
      </div>
      {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

function RadioGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string; desc?: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </span>
      <div className="grid gap-2">
        {options.map((o) => (
          <label
            key={o.value}
            className={`flex items-start gap-3 rounded-lg border px-4 py-3 cursor-pointer transition ${
              value === o.value
                ? "border-accent bg-accent/5 dark:bg-accent/10"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            <input
              type="radio"
              name={label}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="mt-0.5 accent-accent"
            />
            <div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{o.label}</span>
              {o.desc && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{o.desc}</p>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
  desc,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  desc?: string;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <div
        className={`relative w-10 h-6 rounded-full transition-colors flex-shrink-0 mt-0.5 ${
          checked ? "bg-accent" : "bg-gray-300 dark:bg-gray-600"
        }`}
        onClick={() => onChange(!checked)}
      >
        <div
          className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </div>
      <div>
        <span className="text-sm font-medium text-gray-900 dark:text-white">{label}</span>
        {desc && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>}
      </div>
    </label>
  );
}

/* ═══════════════════════════════════════════════════
   RESULT CARD
   ═══════════════════════════════════════════════════ */

function ResultCard({
  result,
  isBest,
  viewMode,
  showVat,
}: {
  result: TaxResult;
  isBest: boolean;
  viewMode: ViewMode;
  showVat: boolean;
}) {
  const div = viewMode === "monthly" ? 12 : 1;
  const suffix = viewMode === "monthly" ? "/mies." : "/rok";

  const rows: { label: string; value: number; bold?: boolean; accent?: boolean; dimmed?: boolean; negative?: boolean }[] = [
    { label: "Przychód", value: result.annualRevenue, bold: true },
    ...(result.annualCosts > 0 ? [{ label: "Koszty uzyskania", value: -result.annualCosts, negative: true as const }] : []),
    { label: "ZUS społeczne", value: -result.zusSpoleczne, negative: true },
    ...(result.funduszPracy > 0 ? [{ label: "Fundusz Pracy", value: -result.funduszPracy, negative: true as const }] : []),
    { label: "Składka zdrowotna", value: -result.healthInsurance, negative: true },
    ...(result.healthDeduction > 0
      ? [{ label: "↳ odliczenie zdrowotnej", value: result.healthDeduction, dimmed: true as const }]
      : []),
    { label: "Podstawa opodatkowania", value: result.taxBase, dimmed: true },
    { label: "Podatek dochodowy", value: -result.incomeTax, negative: true },
    ...(showVat ? [{ label: "VAT do zapłaty", value: -result.vatToPay, negative: true as const }] : []),
    { label: "Łączne obciążenia", value: result.totalBurden, bold: true },
    { label: "Netto (na rękę)", value: result.netIncome, bold: true, accent: true },
  ];

  return (
    <div
      className={`rounded-2xl border p-6 transition relative ${
        isBest
          ? "border-accent bg-accent/5 dark:bg-accent/10 shadow-lg shadow-accent/10"
          : "border-gray-200 dark:border-gray-700"
      }`}
    >
      {isBest && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
          NAJKORZYSTNIEJSZY
        </div>
      )}

      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{result.label}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        Efektywna stawka: {pct(result.effectiveRate)}
      </p>

      <div className="space-y-2">
        {rows.map((r) => (
          <div
            key={r.label}
            className={`flex justify-between items-baseline text-sm ${
              r.bold ? "font-semibold" : ""
            } ${r.dimmed ? "text-gray-400 dark:text-gray-500 text-xs" : ""} ${
              r.accent ? "text-accent text-base" : "text-gray-700 dark:text-gray-300"
            }`}
          >
            <span>{r.label}</span>
            <span className={`tabular-nums ${r.negative ? "text-red-500 dark:text-red-400" : ""}`}>
              {r.negative ? "−\u00A0" : ""}
              {pln(Math.abs(Math.round(r.value / div)))}
              <span className="text-gray-400 text-xs ml-1">{suffix}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */

export default function TaxCalculator() {
  // ── Inputs ──
  const [monthlyRevenue, setMonthlyRevenue] = useState(15_000);
  const [monthlyCosts, setMonthlyCosts] = useState(2_000);
  const [zusStatus, setZusStatus] = useState<ZusStatus>("pelny");
  const [chorobowa, setChorobowa] = useState(true);
  const [isVat, setIsVat] = useState(false);
  const [vatRate, setVatRate] = useState(23);
  const [vatCostsRate, setVatCostsRate] = useState(23);
  const [viewMode, setViewMode] = useState<ViewMode>("monthly");

  // Ryczałt sources
  const [ryczaltSources, setRyczaltSources] = useState<RyczaltSource[]>([
    { id: 1, amount: 15_000, rate: 12 },
  ]);
  const [nextId, setNextId] = useState(2);

  const addSource = () => {
    setRyczaltSources((prev) => [...prev, { id: nextId, amount: 0, rate: 8.5 }]);
    setNextId((n) => n + 1);
  };

  const removeSource = (id: number) => {
    setRyczaltSources((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSource = (id: number, field: "amount" | "rate", value: number) => {
    setRyczaltSources((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    );
  };

  // Sync first source with main revenue (if only one source)
  const syncRyczalt = (newRevenue: number) => {
    setMonthlyRevenue(newRevenue);
    if (ryczaltSources.length === 1) {
      setRyczaltSources((prev) => [{ ...prev[0], amount: newRevenue }]);
    }
  };

  // ── Calculations ──
  const results = useMemo(
    () => calculate(monthlyRevenue, monthlyCosts, zusStatus, chorobowa, ryczaltSources, isVat, vatRate, vatCostsRate),
    [monthlyRevenue, monthlyCosts, zusStatus, chorobowa, ryczaltSources, isVat, vatRate, vatCostsRate],
  );

  const ryczaltTotal = ryczaltSources.reduce((s, src) => s + src.amount, 0);
  const ryczaltMismatch = ryczaltSources.length > 1 && ryczaltTotal !== monthlyRevenue;

  const best = [results.skala, results.linear, results.ryczalt].reduce((a, b) =>
    a.netIncome >= b.netIncome ? a : b,
  );

  // ZUS info
  const zusM = zusMonthly(zusStatus, chorobowa);
  const fpM = fpMonthly(zusStatus);

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* ── DISCLAIMER ── */}
      <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 text-sm text-amber-800 dark:text-amber-200">
        <strong>Uwaga:</strong> Kalkulator ma charakter poglądowy i korzysta ze stawek na rok {YEAR}.
        Rzeczywiste kwoty mogą się różnić w zależności od indywidualnej sytuacji.
        Przed podjęciem decyzji skonsultuj się z księgowym.
      </div>

      {/* ── INPUTS ── */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left column – revenue & costs */}
        <div className="space-y-6 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Dane o przychodach</h2>

          <NumberInput
            label="Przychód miesięczny (netto)"
            value={monthlyRevenue}
            onChange={syncRyczalt}
            step={500}
            hint="Łączny przychód ze wszystkich źródeł"
          />

          <NumberInput
            label="Koszty miesięczne"
            value={monthlyCosts}
            onChange={setMonthlyCosts}
            step={100}
            hint="Koszty uzyskania przychodu (nie dotyczy ryczałtu)"
          />

          {/* Ryczałt sources */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Stawki ryczałtu wg źródeł przychodu
              </h3>
              <button
                type="button"
                onClick={addSource}
                className="text-xs font-medium text-accent hover:text-accent/80 transition"
              >
                + Dodaj źródło
              </button>
            </div>

            <div className="space-y-3">
              {ryczaltSources.map((src, i) => (
                <div
                  key={src.id}
                  className="flex items-end gap-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 p-3"
                >
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">
                      Kwota {ryczaltSources.length > 1 ? `#${i + 1}` : ""}
                    </label>
                    <input
                      type="number"
                      value={src.amount}
                      min={0}
                      step={100}
                      onChange={(e) => updateSource(src.id, "amount", Number(e.target.value) || 0)}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm tabular-nums focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Stawka</label>
                    <select
                      value={src.rate}
                      onChange={(e) => updateSource(src.id, "rate", Number(e.target.value))}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none"
                    >
                      {RYCZALT_OPTIONS.map((o) => (
                        <option key={o.rate} value={o.rate}>
                          {o.rate}% – {o.desc}
                        </option>
                      ))}
                    </select>
                  </div>
                  {ryczaltSources.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSource(src.id)}
                      className="text-gray-400 hover:text-red-500 transition p-2"
                      title="Usuń źródło"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {ryczaltMismatch && (
              <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
                Suma źródeł ryczałtu ({pln(ryczaltTotal)}) ≠ przychód ({pln(monthlyRevenue)}).
                Wynik ryczałtu bazuje na sumie źródeł.
              </p>
            )}
          </div>
        </div>

        {/* Right column – ZUS, VAT, options */}
        <div className="space-y-6 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Składki i opcje</h2>

          <RadioGroup
            label="Status ZUS"
            value={zusStatus}
            onChange={setZusStatus}
            options={[
              {
                value: "ulga",
                label: "Ulga na start",
                desc: "Pierwsze 6 miesięcy – brak składek społecznych, tylko zdrowotna",
              },
              {
                value: "maly",
                label: "Mały ZUS (preferencyjny)",
                desc: `Miesiące 7–30 – podstawa ${SMALL_ZUS_BASE.toLocaleString("pl-PL")} zł → ${pln(Math.round(zusMonthly("maly", true)))}/mies.`,
              },
              {
                value: "pelny",
                label: "Pełny ZUS",
                desc: `Po 30 miesiącach – podstawa ${FULL_ZUS_BASE.toLocaleString("pl-PL")} zł → ${pln(Math.round(zusMonthly("pelny", true) + fpMonthly("pelny")))}/mies. (z FP)`,
              },
            ]}
          />

          <Toggle
            label="Składka chorobowa (dobrowolna)"
            checked={chorobowa}
            onChange={setChorobowa}
            desc={`+${pln(Math.round((zusStatus === "pelny" ? FULL_ZUS_BASE : SMALL_ZUS_BASE) * CHOROBOWA))}/mies. – daje prawo do zasiłku chorobowego`}
          />

          <div className="border-t border-gray-200 dark:border-gray-700 pt-5 space-y-4">
            <Toggle
              label="Czynny podatnik VAT"
              checked={isVat}
              onChange={setIsVat}
              desc="Zwolniony z VAT = brak naliczania i odliczania"
            />

            {isVat && (
              <div className="grid grid-cols-2 gap-4 pl-13">
                <NumberInput
                  label="Stawka VAT sprzedaży"
                  value={vatRate}
                  onChange={setVatRate}
                  min={0}
                  max={23}
                  step={1}
                  unit="%"
                />
                <NumberInput
                  label="Stawka VAT kosztów"
                  value={vatCostsRate}
                  onChange={setVatCostsRate}
                  min={0}
                  max={23}
                  step={1}
                  unit="%"
                />
              </div>
            )}
          </div>

          {/* ZUS summary */}
          <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 space-y-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Podsumowanie składek ZUS
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <span className="text-gray-500">Społeczne:</span>
              <span className="tabular-nums font-medium text-right">{pln(Math.round(zusM))}/mies.</span>
              <span className="text-gray-500">Fundusz Pracy:</span>
              <span className="tabular-nums font-medium text-right">{pln(Math.round(fpM))}/mies.</span>
              <span className="text-gray-500 font-semibold">Razem ZUS:</span>
              <span className="tabular-nums font-bold text-right">{pln(Math.round(zusM + fpM))}/mies.</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── VIEW TOGGLE ── */}
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setViewMode("monthly")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            viewMode === "monthly"
              ? "bg-accent text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          Miesięcznie
        </button>
        <button
          type="button"
          onClick={() => setViewMode("annual")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            viewMode === "annual"
              ? "bg-accent text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          Rocznie
        </button>
      </div>

      {/* ── RESULTS ── */}
      <div className="grid md:grid-cols-3 gap-6">
        {([results.skala, results.linear, results.ryczalt] as TaxResult[]).map((r) => (
          <ResultCard
            key={r.label}
            result={r}
            isBest={r.label === best.label}
            viewMode={viewMode}
            showVat={isVat}
          />
        ))}
      </div>

      {/* ── COMPARISON BAR ── */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Porównanie netto {viewMode === "monthly" ? "miesięcznie" : "rocznie"}
        </h3>
        <div className="space-y-3">
          {([results.skala, results.linear, results.ryczalt] as TaxResult[]).map((r) => {
            const maxNet = Math.max(results.skala.netIncome, results.linear.netIncome, results.ryczalt.netIncome);
            const d = viewMode === "monthly" ? 12 : 1;
            const w = maxNet > 0 ? (r.netIncome / maxNet) * 100 : 0;
            return (
              <div key={r.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">{r.label}</span>
                  <span className={`font-semibold tabular-nums ${r.label === best.label ? "text-accent" : "text-gray-900 dark:text-white"}`}>
                    {pln(Math.round(r.netIncome / d))}
                  </span>
                </div>
                <div className="h-3 rounded-full bg-gray-100 dark:bg-gray-800">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      r.label === best.label ? "bg-accent" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                    style={{ width: `${Math.max(0, w)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── INFO TABLE ── */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-sm text-gray-600 dark:text-gray-400">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          Stawki i założenia ({YEAR})
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 text-xs">
          <div><strong>Kwota wolna:</strong> {pln(TAX_FREE)}</div>
          <div><strong>Próg skali:</strong> {pln(BRACKET_LIMIT)}</div>
          <div><strong>Stawki skali:</strong> {RATE_12 * 100}% / {RATE_32 * 100}%</div>
          <div><strong>Stawka liniowa:</strong> {LINEAR_RATE * 100}%</div>
          <div><strong>Zdrowotna (skala):</strong> {HEALTH_RATE_SKALA * 100}% dochodu</div>
          <div><strong>Zdrowotna (liniowy):</strong> {HEALTH_RATE_LINEAR * 100}% dochodu</div>
          <div><strong>Pełny ZUS – podstawa:</strong> {pln(FULL_ZUS_BASE)}</div>
          <div><strong>Mały ZUS – podstawa:</strong> {pln(SMALL_ZUS_BASE)}</div>
          <div><strong>Minimalne wynagrodzenie:</strong> {pln(MIN_WAGE)}</div>
        </div>
      </div>
    </div>
  );
}
