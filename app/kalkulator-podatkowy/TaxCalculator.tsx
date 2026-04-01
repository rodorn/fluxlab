"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import Image from "next/image";

/* ═══════════════════════════════════════════════════
   STAŁE PODATKOWE 2026
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
const AVG_SALARY = 9_322;
const MIN_WAGE = 4_826;
const FULL_ZUS_BASE = Math.round(AVG_SALARY * 0.6 * 100) / 100;
const SMALL_ZUS_BASE = Math.round(MIN_WAGE * 0.3 * 100) / 100;

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

// Ryczałt – progi składki zdrowotnej
const RYCZALT_HEALTH_BRACKETS: { limit: number; base: number }[] = [
  { limit: 60_000, base: Math.round(AVG_SALARY * 0.6 * 100) / 100 },
  { limit: 300_000, base: AVG_SALARY },
  { limit: Infinity, base: Math.round(AVG_SALARY * 1.8 * 100) / 100 },
];

// Limit odliczenia składki zdrowotnej – liniowy
const LINEAR_HEALTH_CAP = 12_900;

// Najem ryczałt – próg 100 000 zł rocznie
const NAJEM_THRESHOLD = 100_000;
const NAJEM_RATE_LOW = 8.5;
const NAJEM_RATE_HIGH = 12.5;

// Samochód – odliczenia
const CAR_PIT_MIXED = 0.75;
const CAR_PIT_BUSINESS = 1.0;
const CAR_VAT_MIXED = 0.5;
const CAR_VAT_BUSINESS = 1.0;

// IKZE (Indywidualne Konto Zabezpieczenia Emerytalnego)
const IKZE_LIMIT_JDG = 16_956; // roczny limit wpłat JDG 2026 (M.P. 2025 poz. 1156)

// Limity
const VAT_EXEMPT_LIMIT = 240_000; // roczny obrót – zwolnienie podmiotowe (od 2025)
const MALY_PLUS_REVENUE_LIMIT = 120_000; // max przychód z poprzedniego roku
const MALY_PLUS_MAX_MONTHS = 36; // max miesięcy w 60-miesięcznym oknie

// Stawki ryczałtu
const RYCZALT_OPTIONS: { rate: number; desc: string; tooltip: string; isNajem?: boolean }[] = [
  { rate: 2, desc: "Sprzedaż produktów rolnych",
    tooltip: "Przychody ze sprzedaży wyrobów z własnej działalności rolniczej (przetwory, miód, warzywa itp.)" },
  { rate: 3, desc: "Gastronomia, handel detaliczny",
    tooltip: "Działalność gastronomiczna (z wyjątkiem sprzedaży napojów o zawartości alkoholu >1,5%), handel detaliczny, usługi związane z produkcją zwierzęcą" },
  { rate: 5.5, desc: "Produkcja, budownictwo",
    tooltip: "Działalność wytwórcza, roboty budowlane, przewóz ładunków pojazdami o ładowności >2 tony, prowizje z handlu" },
  { rate: 8.5, desc: "Usługi inne",
    tooltip: "Większość usług nie sklasyfikowanych w wyższych stawkach, np. usługi transportowe, pośrednictwo, wynajem ruchomości, usługi gastronomiczne ze sprzedażą alkoholu" },
  { rate: -1, desc: "Najem (8,5% / 12,5%)", isNajem: true,
    tooltip: `Najem prywatny lub w ramach działalności: 8,5% od przychodu do ${(NAJEM_THRESHOLD).toLocaleString("pl-PL")} zł/rok, 12,5% od nadwyżki powyżej tego progu. Przeliczane automatycznie.` },
  { rate: 10, desc: "Obrót nieruchomościami",
    tooltip: "Kupno i sprzedaż nieruchomości na własny rachunek, przychody z odpłatnego zbycia praw majątkowych lub nieruchomości" },
  { rate: 12, desc: "IT, programowanie",
    tooltip: "Usługi związane z oprogramowaniem, doradztwem w zakresie informatyki, przetwarzaniem danych, zarządzaniem stronami internetowymi (hosting)" },
  { rate: 14, desc: "Usługi zdrowotne",
    tooltip: "Świadczenie usług w zakresie opieki zdrowotnej (lekarze, dentyści, fizjoterapeuci, pielęgniarki prowadzące prywatną praktykę)" },
  { rate: 15, desc: "Usługi prawne, doradcze, księgowe",
    tooltip: "Usługi prawnicze, rachunkowo-księgowe, doradztwo podatkowe, usługi architektoniczne i inżynierskie, reklama, badanie rynku, fotografia" },
  { rate: 17, desc: "Wolne zawody",
    tooltip: "Przychody z wolnych zawodów: tłumacze, biegli rewidenci, rzecznicy patentowi, doradcy podatkowi, maklerzy, agenci ubezpieczeniowi (jeśli osobista praca bez zatrudniania)" },
];

/* ═══════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════ */

type ZusStatus = "ulga" | "maly" | "malyPlus" | "pelny";
type VatMode = "zwolniony" | "standard";
type CarUsage = "mixed" | "business";
type ViewMode = "annual" | "monthly";

const VAT_RATES = [0, 5, 8, 23] as const;

interface RyczaltSource {
  id: number;
  name: string;
  amount: number;
  rate: number;
  isNajem: boolean;
  brutto: boolean;
  vatRate: number;
}

type CostType = "business" | "private";

interface CostItem {
  id: number;
  name: string;
  amount: number;
  type: CostType;
  brutto: boolean;
  vatRate: number;
}

interface TaxResult {
  label: string;
  annualRevenue: number;
  deductibleCosts: number;
  carCostsDeducted: number;
  zusSpoleczne: number;
  funduszPracy: number;
  healthInsurance: number;
  healthDeduction: number;
  taxBase: number;
  incomeTax: number;
  vatPassThrough: number;
  vatRealCost: number;
  vatPrivateSavings: number;
  totalBurden: number;
  netAfterTax: number;
  disposable: number;
  ikzeContribution: number;
  ikzeTaxSavings: number;
  privateSavings: number;
  effectiveRate: number;
}

/* ═══════════════════════════════════════════════════
   CALCULATION HELPERS
   ═══════════════════════════════════════════════════ */

function zusBase(status: ZusStatus, prevYearIncome?: number): number {
  switch (status) {
    case "ulga": return 0;
    case "maly": return SMALL_ZUS_BASE;
    case "malyPlus": {
      const raw = ((prevYearIncome ?? 0) / 12) * 0.5;
      const min = MIN_WAGE * 0.3;
      return Math.max(min, Math.min(FULL_ZUS_BASE, raw));
    }
    case "pelny": return FULL_ZUS_BASE;
  }
}

function zusMonthly(status: ZusStatus, chorobowa: boolean, prevYearIncome?: number): number {
  const base = zusBase(status, prevYearIncome);
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

function calcRyczaltNajem(annualAmount: number): number {
  if (annualAmount <= NAJEM_THRESHOLD) {
    return Math.round(annualAmount * (NAJEM_RATE_LOW / 100));
  }
  return Math.round(
    NAJEM_THRESHOLD * (NAJEM_RATE_LOW / 100) +
    (annualAmount - NAJEM_THRESHOLD) * (NAJEM_RATE_HIGH / 100),
  );
}

/* ═══════════════════════════════════════════════════
   FULL CALCULATION
   ═══════════════════════════════════════════════════ */

function calculate(p: {
  monthlyRevenue: number;
  businessCosts: number;
  privateCosts: number;
  carCosts: number;
  carUsage: CarUsage;
  zusStatus: ZusStatus;
  chorobowa: boolean;
  prevYearIncome: number;
  ryczaltSources: RyczaltSource[];
  vatMode: VatMode;
  vatOutAnn: number;
  vatInBizAnn: number;
  vatInPrivAnn: number;
  vatInCarAnn: number;
  ikzeAnnual: number;
}): { skala: TaxResult; linear: TaxResult; ryczalt: TaxResult } {
  const annRev = p.monthlyRevenue * 12;
  const annBizCosts = p.businessCosts * 12;
  const annPrivCosts = p.privateCosts * 12;
  const annCarCosts = p.carCosts * 12;
  const carPitPct = p.carUsage === "business" ? CAR_PIT_BUSINESS : CAR_PIT_MIXED;
  const carVatPct = p.carUsage === "business" ? CAR_VAT_BUSINESS : CAR_VAT_MIXED;
  const annCarDeductible = Math.round(annCarCosts * carPitPct);
  const totalDeductible = annBizCosts + annPrivCosts + annCarDeductible;

  const zusM = zusMonthly(p.zusStatus, p.chorobowa, p.prevYearIncome);
  const fpM = fpMonthly(p.zusStatus);
  const annZus = Math.round(zusM * 12);
  const annFP = Math.round(fpM * 12);

  // VAT (kwoty roczne, pre-computed z per-item stawek)
  let vatPassThrough = 0;
  let vatRealCost = 0;
  let vatPrivateSavings = 0;
  if (p.vatMode === "standard") {
    const vatInCar = p.vatInCarAnn * carVatPct;
    vatPassThrough = Math.max(0, Math.round(p.vatOutAnn - p.vatInBizAnn - p.vatInPrivAnn - vatInCar));
    vatRealCost = Math.round(p.vatInCarAnn * (1 - carVatPct));
    vatPrivateSavings = Math.round(p.vatInPrivAnn + vatInCar);
  }

  const calcPrivateSavings = (taxWithout: number, taxWith: number) =>
    Math.max(0, Math.round(taxWithout - taxWith));

  // IKZE – odliczenie od dochodu/przychodu
  const ikze = p.ikzeAnnual;

  // ── SKALA ──
  const skalaMonthlyInc = Math.max(0, p.monthlyRevenue - p.businessCosts - p.privateCosts - Math.round(p.carCosts * carPitPct) - zusM);
  const skalaHealthM = healthSkala(skalaMonthlyInc);
  const skalaHealthAnn = Math.round(skalaHealthM * 12);
  const skalaTaxBaseNoIkze = Math.max(0, Math.round(annRev - totalDeductible - annZus));
  const skalaTaxBase = Math.max(0, Math.round(skalaTaxBaseNoIkze - ikze));
  const skalaTaxNoIkze = taxSkala(skalaTaxBaseNoIkze);
  const skalaTax = taxSkala(skalaTaxBase);
  const skalaIkzeSav = Math.max(0, skalaTaxNoIkze - skalaTax);
  const skalaTaxBaseNoPriv = Math.max(0, Math.round(annRev - annBizCosts - annCarDeductible - annZus - ikze));
  const skalaTaxNoPriv = taxSkala(skalaTaxBaseNoPriv);
  const skalaPrivSav = calcPrivateSavings(skalaTaxNoPriv, skalaTax);
  const skalaBurden = annZus + annFP + skalaHealthAnn + skalaTax;

  // ── LINIOWY ──
  const linearMonthlyInc = Math.max(0, p.monthlyRevenue - p.businessCosts - p.privateCosts - Math.round(p.carCosts * carPitPct) - zusM);
  const linearHealthM = healthLinear(linearMonthlyInc);
  const linearHealthAnn = Math.round(linearHealthM * 12);
  const linearHealthDed = Math.min(linearHealthAnn, LINEAR_HEALTH_CAP);
  const linearTaxBaseNoIkze = Math.max(0, Math.round(annRev - totalDeductible - annZus - linearHealthDed));
  const linearTaxBase = Math.max(0, Math.round(linearTaxBaseNoIkze - ikze));
  const linearTaxNoIkze = taxLinear(linearTaxBaseNoIkze);
  const linearTax = taxLinear(linearTaxBase);
  const linearIkzeSav = Math.max(0, linearTaxNoIkze - linearTax);
  const linearTaxBaseNoPriv = Math.max(0, Math.round(annRev - annBizCosts - annCarDeductible - annZus - linearHealthDed - ikze));
  const linearTaxNoPriv = taxLinear(linearTaxBaseNoPriv);
  const linearPrivSav = calcPrivateSavings(linearTaxNoPriv, linearTax);
  const linearBurden = annZus + annFP + linearHealthAnn + linearTax;

  // ── RYCZAŁT ──
  const ryczHealthM = healthRyczalt(annRev);
  const ryczHealthAnn = Math.round(ryczHealthM * 12);
  const ryczHealthDed = Math.round(ryczHealthAnn * 0.5);

  const totalRyczRev = p.ryczaltSources.reduce((s, src) => s + src.amount * 12, 0);
  // Ryczałt: IKZE odliczane od przychodu proporcjonalnie do źródeł
  let ryczTax = 0;
  let ryczTaxNoIkze = 0;
  for (const src of p.ryczaltSources) {
    const srcAnn = src.amount * 12;
    const proportion = totalRyczRev > 0 ? srcAnn / totalRyczRev : 0;
    const srcHealthDed = Math.round(ryczHealthDed * proportion);
    const srcIkzeDed = Math.round(ikze * proportion);
    const srcTaxableNoIkze = Math.max(0, srcAnn - srcHealthDed);
    const srcTaxable = Math.max(0, srcAnn - srcHealthDed - srcIkzeDed);

    if (src.isNajem) {
      ryczTaxNoIkze += calcRyczaltNajem(srcTaxableNoIkze);
      ryczTax += calcRyczaltNajem(srcTaxable);
    } else {
      ryczTaxNoIkze += Math.round(srcTaxableNoIkze * (src.rate / 100));
      ryczTax += Math.round(srcTaxable * (src.rate / 100));
    }
  }
  const ryczIkzeSav = Math.max(0, ryczTaxNoIkze - ryczTax);
  const ryczBurden = annZus + annFP + ryczHealthAnn + ryczTax;

  // Przychód brutto = netto + VAT należny
  const annRevBrutto = annRev + (p.vatMode === "standard" ? p.vatOutAnn : 0);

  const mk = (
    label: string,
    deductible: number,
    health: number,
    healthDed: number,
    base: number,
    tax: number,
    burden: number,
    privSav: number,
    ikzeSav: number,
  ): TaxResult => {
    const totalWithVat = burden + vatPassThrough;
    return {
      label,
      annualRevenue: annRevBrutto,
      deductibleCosts: deductible,
      carCostsDeducted: annCarDeductible,
      zusSpoleczne: annZus,
      funduszPracy: annFP,
      healthInsurance: health,
      healthDeduction: healthDed,
      taxBase: base,
      incomeTax: tax,
      vatPassThrough,
      vatRealCost,
      vatPrivateSavings,
      totalBurden: totalWithVat,
      netAfterTax: annRevBrutto - totalWithVat,
      disposable: annRevBrutto - totalWithVat - annBizCosts - ikze,
      ikzeContribution: ikze,
      ikzeTaxSavings: ikzeSav,
      privateSavings: privSav,
      effectiveRate: (annRevBrutto - annBizCosts) > 0 ? totalWithVat / (annRevBrutto - annBizCosts) : 0,
    };
  };

  return {
    skala: mk("Skala podatkowa", totalDeductible, skalaHealthAnn, 0, skalaTaxBase, skalaTax, skalaBurden, skalaPrivSav, skalaIkzeSav),
    linear: mk("Podatek liniowy", totalDeductible, linearHealthAnn, linearHealthDed, linearTaxBase, linearTax, linearBurden, linearPrivSav, linearIkzeSav),
    ryczalt: mk("Ryczałt", 0, ryczHealthAnn, ryczHealthDed, totalRyczRev, ryczTax, ryczBurden, 0, ryczIkzeSav),
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
  label, value, onChange, min = 0, max = 10_000_000, step = 100, unit = "zł", hint,
  brutto, onBruttoChange, vatPct,
}: {
  label: string; value: number; onChange: (v: number) => void;
  min?: number; max?: number; step?: number; unit?: string; hint?: string;
  brutto?: boolean; onBruttoChange?: (v: boolean) => void; vatPct?: number;
}) {
  const showBrutto = brutto !== undefined && onBruttoChange !== undefined;
  const nettoVal = showBrutto && brutto && vatPct ? Math.round(value / (1 + vatPct / 100)) : value;
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        {showBrutto && (
          <div className="flex rounded-md overflow-hidden border border-gray-300 dark:border-gray-600">
            <button type="button" onClick={() => onBruttoChange!(false)}
              className={`px-2 py-0.5 text-[10px] font-bold transition ${!brutto ? "bg-accent text-white" : "bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-600"}`}>
              N
            </button>
            <button type="button" onClick={() => onBruttoChange!(true)}
              className={`px-2 py-0.5 text-[10px] font-bold transition ${brutto ? "bg-accent text-white" : "bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-600"}`}>
              B
            </button>
          </div>
        )}
      </div>
      <div className="relative">
        <input
          type="number"
          value={value || ""}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Math.max(min, Math.min(max, Number(e.target.value) || 0)))}
          onBlur={() => { if (!value) onChange(0); }}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 pr-12 text-sm text-gray-900 dark:text-white focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition tabular-nums"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">{unit}</span>
      </div>
      {showBrutto && brutto && vatPct && vatPct > 0 && value > 0 && (
        <p className="mt-1 text-xs text-gray-400">Netto: {pln(nettoVal)}</p>
      )}
      {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

function RadioGroup<T extends string>({
  label, value, options, onChange,
}: {
  label: string; value: T;
  options: { value: T; label: string; desc?: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</span>
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
            <input type="radio" name={label} checked={value === o.value} onChange={() => onChange(o.value)} className="mt-0.5 accent-accent" />
            <div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{o.label}</span>
              {o.desc && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{o.desc}</p>}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

function Toggle({ label, checked, onChange, desc }: {
  label: string; checked: boolean; onChange: (v: boolean) => void; desc?: string;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <div
        className={`relative w-10 h-6 rounded-full transition-colors flex-shrink-0 mt-0.5 ${checked ? "bg-accent" : "bg-gray-300 dark:bg-gray-600"}`}
        onClick={() => onChange(!checked)}
      >
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : "translate-x-1"}`} />
      </div>
      <div>
        <span className="text-sm font-medium text-gray-900 dark:text-white">{label}</span>
        {desc && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>}
      </div>
    </label>
  );
}

/* ═══════════════════════════════════════════════════
   DONUT CHART
   ═══════════════════════════════════════════════════ */

const CHART_COLORS = [
  "#6366f1", // accent – do dyspozycji
  "#ef4444", // red – podatek
  "#f59e0b", // amber – ZUS
  "#10b981", // emerald – zdrowotna
  "#3b82f6", // blue – VAT
  "#8b5cf6", // violet – FP
  "#94a3b8", // slate – koszty firmowe
  "#14b8a6", // teal – IKZE
];

function DonutChart({ slices, viewMode }: { slices: { label: string; value: number; color: string }[]; viewMode: ViewMode }) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const total = slices.reduce((s, sl) => s + sl.value, 0);
  if (total <= 0) return null;

  const d = viewMode === "monthly" ? 12 : 1;
  const sfx = viewMode === "monthly" ? "/mies." : "/rok";
  const size = 120;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = 52;
  const innerR = 34;

  let startAngle = -90;
  const paths: { d: string; color: string; label: string; pct: number; value: number }[] = [];

  for (const sl of slices) {
    if (sl.value <= 0) continue;
    const pctVal = sl.value / total;
    const sweep = pctVal * 360;
    const endAngle = startAngle + sweep;
    const largeArc = sweep > 180 ? 1 : 0;

    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const x1o = cx + outerR * Math.cos(toRad(startAngle));
    const y1o = cy + outerR * Math.sin(toRad(startAngle));
    const x2o = cx + outerR * Math.cos(toRad(endAngle));
    const y2o = cy + outerR * Math.sin(toRad(endAngle));
    const x1i = cx + innerR * Math.cos(toRad(endAngle));
    const y1i = cy + innerR * Math.sin(toRad(endAngle));
    const x2i = cx + innerR * Math.cos(toRad(startAngle));
    const y2i = cy + innerR * Math.sin(toRad(startAngle));

    const pathD = [
      `M ${x1o} ${y1o}`,
      `A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2o} ${y2o}`,
      `L ${x1i} ${y1i}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 0 ${x2i} ${y2i}`,
      "Z",
    ].join(" ");

    paths.push({ d: pathD, color: sl.color, label: sl.label, pct: pctVal * 100, value: sl.value });
    startAngle = endAngle;
  }

  const active = activeIdx !== null ? paths[activeIdx] : null;

  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-shrink-0">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {paths.map((p, i) => (
            <path
              key={i}
              d={p.d}
              fill={p.color}
              opacity={activeIdx === null || activeIdx === i ? 1 : 0.3}
              className="transition-all duration-200 cursor-pointer"
              style={{ transform: activeIdx === i ? `scale(1.06)` : "scale(1)", transformOrigin: `${cx}px ${cy}px` }}
              onClick={() => setActiveIdx(activeIdx === i ? null : i)}
            />
          ))}
        </svg>
        {active && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] font-bold text-gray-900 dark:text-white tabular-nums">{pln(Math.round(active.value / d))}</span>
            <span className="text-[8px] text-gray-400">{sfx}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 min-w-0">
        {paths.map((p, i) => (
          <div
            key={i}
            className={`flex items-center gap-1.5 text-[11px] leading-tight cursor-pointer rounded px-1 -mx-1 transition-all duration-200 ${
              activeIdx === i ? "bg-gray-100 dark:bg-gray-800" : activeIdx !== null ? "opacity-40" : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
            }`}
            onClick={() => setActiveIdx(activeIdx === i ? null : i)}
          >
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
            <span className="text-gray-600 dark:text-gray-400 truncate">{p.label}</span>
            <span className="text-gray-400 dark:text-gray-500 tabular-nums ml-auto flex-shrink-0">
              {activeIdx === i ? pln(Math.round(p.value / d)) : `${p.pct.toFixed(1)}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   RESULT CARD
   ═══════════════════════════════════════════════════ */

function ResultCard({ result, isBest, viewMode, showVat }: {
  result: TaxResult; isBest: boolean; viewMode: ViewMode; showVat: boolean;
}) {
  const d = viewMode === "monthly" ? 12 : 1;
  const sfx = viewMode === "monthly" ? "/mies." : "/rok";

  const r = result;
  const costsNoCar = r.deductibleCosts - r.carCostsDeducted;
  const bizCostsAnn = r.annualRevenue - r.totalBurden - r.disposable;

  // Helper: kwota w aktualnym viewMode
  const v = (ann: number) => pln(Math.round(ann / d));

  // Przychód netto (do tooltipów — obliczenia PIT bazują na netto)
  const revNetto = r.annualRevenue - (showVat ? r.vatPassThrough : 0);

  const burdenParts = [
    ...(r.vatPassThrough > 0 ? [`VAT do US (${v(r.vatPassThrough)})`] : []),
    `ZUS (${v(r.zusSpoleczne)})`,
    ...(r.funduszPracy > 0 ? [`FP (${v(r.funduszPracy)})`] : []),
    `zdrowotna (${v(r.healthInsurance)})`,
    `podatek (${v(r.incomeTax)})`,
  ].join(" + ");

  // Pie chart slices
  const chartSlices = [
    { label: "Do dyspozycji", value: Math.max(0, r.disposable), color: CHART_COLORS[0] },
    { label: "Podatek", value: r.incomeTax, color: CHART_COLORS[1] },
    { label: "ZUS społeczne", value: r.zusSpoleczne, color: CHART_COLORS[2] },
    { label: "Zdrowotna", value: r.healthInsurance, color: CHART_COLORS[3] },
    ...(r.vatPassThrough > 0 ? [{ label: "VAT", value: r.vatPassThrough, color: CHART_COLORS[4] }] : []),
    ...(r.funduszPracy > 0 ? [{ label: "Fund. Pracy", value: r.funduszPracy, color: CHART_COLORS[5] }] : []),
    ...(bizCostsAnn > 0 ? [{ label: "Koszty firmowe", value: bizCostsAnn, color: CHART_COLORS[6] }] : []),
    ...(r.ikzeContribution > 0 ? [{ label: "IKZE", value: r.ikzeContribution, color: CHART_COLORS[7] }] : []),
  ];

  const rows: { label: string; value: number; tip?: string; bold?: boolean; accent?: boolean; dimmed?: boolean; negative?: boolean; green?: boolean }[] = [
    { label: showVat ? "Przychód brutto" : "Przychód", value: r.annualRevenue, bold: true,
      tip: showVat
        ? `Przychód brutto (netto + VAT): ${v(r.annualRevenue)}${sfx}. Netto: ${v(revNetto)}.`
        : `Łączny przychód ze wszystkich źródeł: ${v(r.annualRevenue)}${sfx}.` },
    ...(showVat && r.vatPassThrough > 0 ? [{ label: "VAT do urzędu skarbowego", value: -r.vatPassThrough, negative: true as const,
      tip: `VAT należny od sprzedaży standardowej minus VAT naliczony od kosztów. Odprowadzasz ${v(r.vatPassThrough)}${sfx} do US.` }] : []),
    ...(r.deductibleCosts > 0 ? [
      { label: "Koszty odliczone (PIT)", value: -r.deductibleCosts, negative: true as const,
        tip: `Firmowe + prywatne (${v(costsNoCar)}) + samochód (${v(r.carCostsDeducted)}). Obniżają podstawę opodatkowania.` },
      ...(r.carCostsDeducted > 0 ? [{ label: "↳ w tym samochód", value: -r.carCostsDeducted, dimmed: true as const,
        tip: `Odliczana część kosztów samochodu: 75% przy mieszanym / 100% przy firmowym. Tu: ${v(r.carCostsDeducted)}${sfx}.` }] : []),
    ] : []),
    { label: "ZUS społeczne", value: -r.zusSpoleczne, negative: true,
      tip: `Emerytalna 19,52% (${v(r.zusSpoleczne * EMERYTALNA / ZUS_WITH)}) + rentowa 8% (${v(r.zusSpoleczne * RENTOWA / ZUS_WITH)}) + wypadkowa 1,67% (${v(r.zusSpoleczne * WYPADKOWA / ZUS_WITH)}) + chorobowa 2,45% (${v(r.zusSpoleczne * CHOROBOWA / ZUS_WITH)}). Razem: ${v(r.zusSpoleczne)}${sfx}.` },
    ...(r.funduszPracy > 0 ? [{ label: "Fundusz Pracy", value: -r.funduszPracy, negative: true as const,
      tip: `2,45% × podstawa ${pln(FULL_ZUS_BASE)} = ${v(r.funduszPracy)}${sfx}. Tylko przy pełnym ZUS.` }] : []),
    { label: "Składka zdrowotna", value: -r.healthInsurance, negative: true,
      tip: r.label === "Skala podatkowa"
        ? `9% dochodu. ${v(r.healthInsurance)}${sfx}. Nie podlega odliczeniu od podatku.`
        : r.label === "Podatek liniowy"
          ? `4,9% dochodu. ${v(r.healthInsurance)}${sfx}. Odliczalna od dochodu do ${pln(LINEAR_HEALTH_CAP)}/rok.`
          : `Stała kwota wg progu przychodu (60k/300k). ${v(r.healthInsurance)}${sfx}. 50% odliczalne od przychodu.` },
    ...(r.healthDeduction > 0 ? [{ label: "↳ odliczenie zdrowotnej", value: r.healthDeduction, dimmed: true as const,
      tip: r.label === "Podatek liniowy"
        ? `Odliczone od dochodu: ${v(r.healthDeduction)} (max ${pln(LINEAR_HEALTH_CAP)}/rok)`
        : `50% składki zdrowotnej: ${v(r.healthDeduction)} odliczone od przychodu przed naliczeniem ryczałtu` }] : []),
    { label: "Podstawa opodatkowania", value: r.taxBase, dimmed: true,
      tip: r.label === "Ryczałt"
        ? `Przychód netto (${v(revNetto)}) − 50% zdrowotnej (${v(r.healthDeduction)}) = ${v(r.taxBase)}`
        : `Przychód netto (${v(revNetto)}) − koszty (${v(r.deductibleCosts)}) − ZUS (${v(r.zusSpoleczne)})${r.healthDeduction > 0 ? ` − odlicz. zdrow. (${v(r.healthDeduction)})` : ""} = ${v(r.taxBase)}` },
    { label: "Podatek dochodowy", value: -r.incomeTax, negative: true,
      tip: r.label === "Skala podatkowa"
        ? r.taxBase <= BRACKET_LIMIT
          ? `12% × ${v(r.taxBase)} − kwota wolna ${pln(TAX_REDUCTION)} = ${v(r.incomeTax)}`
          : `12% × ${pln(BRACKET_LIMIT)} − ${pln(TAX_REDUCTION)} + 32% × ${v(r.taxBase - BRACKET_LIMIT)} = ${v(r.incomeTax)}`
        : r.label === "Podatek liniowy"
          ? `19% × ${v(r.taxBase)} = ${v(r.incomeTax)} (bez kwoty wolnej)`
          : `Ryczałt wg stawek od przychodu po odliczeniu zdrowotnej. Podatek: ${v(r.incomeTax)}${sfx}.` },
    { label: "Obciążenia łącznie", value: r.totalBurden, bold: true,
      tip: `${burdenParts} = ${v(r.totalBurden)}${sfx}.` },
    { label: "Netto (przed kosztami)", value: r.netAfterTax, bold: true,
      tip: `Przychód brutto (${v(r.annualRevenue)}) − obciążenia (${v(r.totalBurden)}) = ${v(r.netAfterTax)}.` },
    ...(r.ikzeContribution > 0 ? [{ label: "Wpłata IKZE", value: -r.ikzeContribution, negative: true as const,
      tip: `Wpłata na IKZE: ${v(r.ikzeContribution)}${sfx}. Odliczona od dochodu — zmniejsza podatek, ale środki trafiają na konto emerytalne.` }] : []),
    { label: "Do dyspozycji", value: r.disposable, bold: true, accent: true,
      tip: `Przychód brutto (${v(r.annualRevenue)}) − obciążenia (${v(r.totalBurden)}) − koszty firmowe (${v(bizCostsAnn)})${r.ikzeContribution > 0 ? ` − IKZE (${v(r.ikzeContribution)})` : ""} = ${v(r.disposable)}. Koszty prywatne i samochodu nie odejmowane (i tak ponoszone).` },
    ...(r.ikzeContribution > 0 ? [{ label: "↳ dodatkowo na konto IKZE", value: r.ikzeContribution, green: true as const,
      tip: `Oprócz kwoty do dyspozycji, ${v(r.ikzeContribution)}${sfx} trafia na Twoje konto IKZE. Dzięki odliczeniu od dochodu oszczędzasz ${v(r.ikzeTaxSavings)}${sfx} na podatku.` }] : []),
  ];

  return (
    <div className={`rounded-2xl border overflow-hidden transition relative ${
      isBest ? "border-accent shadow-lg shadow-accent/10" : "border-gray-200 dark:border-gray-700"
    }`}>
      {isBest && (
        <div className="absolute top-4 right-4 bg-accent text-white text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap z-10">
          NAJKORZYSTNIEJSZY
        </div>
      )}

      {/* Header */}
      <div className={`px-6 pt-6 pb-4 ${isBest ? "bg-accent/5 dark:bg-accent/10" : "bg-gray-50 dark:bg-gray-800/50"}`}>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-0.5">{result.label}</h3>
        <div className="flex items-baseline gap-2">
          <span className={`text-2xl font-bold tabular-nums ${isBest ? "text-accent" : "text-gray-900 dark:text-white"}`}>
            {pln(Math.round(r.disposable / d))}
          </span>
          <span className="text-sm text-gray-400">{sfx}</span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Efektywna stawka: {pct(result.effectiveRate)}</p>
      </div>

      {/* Donut chart */}
      <div className="px-6 py-4 border-t border-b border-gray-100 dark:border-gray-800">
        <DonutChart slices={chartSlices} viewMode={viewMode} />
      </div>

      {/* Rows */}
      <div className="px-6 py-4 space-y-2">
        {rows.map((r) => (
          <div
            key={r.label}
            className={`relative group/row flex justify-between items-baseline text-sm ${r.tip ? "cursor-help" : ""} ${r.bold ? "font-semibold" : ""} ${r.dimmed ? "text-gray-400 dark:text-gray-500 text-xs" : ""} ${
              r.accent ? "text-accent text-base" : r.green ? "text-emerald-600 dark:text-emerald-400 text-xs" : "text-gray-700 dark:text-gray-300"
            }`}
          >
            <span className="flex items-center gap-1">
              {r.label}
              {r.tip && (
                <svg className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
                </svg>
              )}
            </span>
            <span className={`tabular-nums ${r.negative ? "text-red-500 dark:text-red-400" : ""}`}>
              {r.negative ? "−\u00A0" : ""}{pln(Math.abs(Math.round(r.value / d)))}
              <span className="text-gray-400 text-xs ml-1">{sfx}</span>
            </span>
            {r.tip && (
              <div className="absolute left-0 right-0 bottom-full mb-2 hidden group-hover/row:block z-20 pointer-events-none">
                <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg px-3 py-2 leading-relaxed shadow-lg max-w-sm">
                  {r.tip}
                </div>
              </div>
            )}
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
  const [carCosts, setCarCosts] = useState(1_000);
  const [carBrutto, setCarBrutto] = useState(false);
  const [carUsage, setCarUsage] = useState<CarUsage>("mixed");
  const [zusStatus, setZusStatus] = useState<ZusStatus>("pelny");
  const [prevYearIncome, setPrevYearIncome] = useState(120_000);
  const [chorobowa, setChorobowa] = useState(false);
  const [ikzeMonthly, setIkzeMonthly] = useState(0);
  const [vatMode, setVatMode] = useState<VatMode>("standard");
  const [carVatRate, setCarVatRate] = useState(23);
  const [viewMode, setViewMode] = useState<ViewMode>("monthly");

  // Źródła przychodu
  const [ryczaltSources, setRyczaltSources] = useState<RyczaltSource[]>([
    { id: 1, name: "Stermedia – programowanie", amount: 14_000, rate: 12, isNajem: false, brutto: false, vatRate: 23 },
    { id: 2, name: "Provoke – sprzedaż ubrań", amount: 5_000, rate: 3, isNajem: false, brutto: true, vatRate: 23 },
    { id: 3, name: "Sprzedaż elektroniki", amount: 30_000, rate: 3, isNajem: false, brutto: true, vatRate: 23 },
  ]);

  // Koszty (firmowe + prywatne w jednej liście)
  const [costItems, setCostItems] = useState<CostItem[]>([
    { id: 101, name: "Provoke – szycie", amount: 2_500, type: "business", brutto: true, vatRate: 23 },
    { id: 102, name: "Elektronika – zakupy", amount: 20_000, type: "business", brutto: true, vatRate: 23 },
    { id: 103, name: "Sprzęt", amount: 450, type: "private", brutto: true, vatRate: 23 },
    { id: 104, name: "Szkolenia", amount: 300, type: "private", brutto: true, vatRate: 23 },
  ]);

  const [nextId, setNextId] = useState(300);

  // AI state
  const [aiLoadingRate, setAiLoadingRate] = useState<number | null>(null); // source id being detected
  const [aiRateHint, setAiRateHint] = useState<{ id: number; text: string } | null>(null);
  const [aiCostLoading, setAiCostLoading] = useState<CostType | null>(null);
  const rateDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  const detectRate = useCallback((sourceId: number, name: string) => {
    if (rateDebounce.current) clearTimeout(rateDebounce.current);
    if (name.trim().length < 3) { setAiRateHint(null); return; }
    setAiLoadingRate(sourceId);
    rateDebounce.current = setTimeout(async () => {
      try {
        const res = await fetch("/api/tax-ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "detect_rate", sourceName: name }),
        });
        if (!res.ok) return;
        const data = await res.json();
        setRyczaltSources((prev) =>
          prev.map((s) => s.id === sourceId ? { ...s, rate: data.rate, isNajem: data.isNajem, ...(data.vatRate != null ? { vatRate: data.vatRate } : {}) } : s),
        );
        setAiRateHint({ id: sourceId, text: data.reasoning });
      } catch { /* ignore */ }
      finally { setAiLoadingRate(null); }
    }, 800);
  }, []);

  const suggestCosts = useCallback(async (costType: CostType) => {
    setAiCostLoading(costType);
    try {
      const revDesc = ryczaltSources.map((s) => `${s.name || "bez nazwy"}: ${s.amount} zł`).join(", ");
      const costDesc = costItems.map((c) => `${c.name || "bez nazwy"} (${c.type}): ${c.amount} zł`).join(", ");
      const res = await fetch("/api/tax-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "suggest_costs",
          costType,
          existingRevenues: revDesc || "brak",
          existingCosts: costDesc || "brak",
        }),
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.costs?.length) {
        let idCounter = nextId;
        for (const c of data.costs as { name: string; amount: number; vatRate?: number }[]) {
          const newItem: CostItem = { id: idCounter++, name: c.name, amount: c.amount, type: costType, brutto: false, vatRate: c.vatRate ?? 23 };
          setCostItems((prev) => [...prev, newItem]);
        }
        setNextId(idCounter);
      }
    } catch { /* ignore */ }
    finally { setAiCostLoading(null); }
  }, [ryczaltSources, costItems, nextId]);

  // Per-field brutto→netto conversion (only when VAT active)
  const n = (v: number, isBrutto: boolean, rate: number) =>
    isBrutto && vatMode !== "zwolniony" ? Math.round(v / (1 + rate / 100)) : v;

  // Przychód = suma źródeł (każde przeliczone wg własnej stawki VAT)
  const monthlyRevenue = ryczaltSources.reduce((s, src) => s + n(src.amount, src.brutto, src.vatRate), 0);

  // Koszty netto: firmowe i prywatne osobno
  const businessCostsNet = costItems
    .filter((c) => c.type === "business")
    .reduce((s, c) => s + n(c.amount, c.brutto, c.vatRate), 0);
  const privateCostsNet = costItems
    .filter((c) => c.type === "private")
    .reduce((s, c) => s + n(c.amount, c.brutto, c.vatRate), 0);
  const carCostsNet = n(carCosts, carBrutto, carVatRate);

  // VAT: roczne kwoty per-item
  const vatOutAnn = vatMode === "standard"
    ? Math.round(ryczaltSources.reduce((s, src) => s + n(src.amount, src.brutto, src.vatRate) * (src.vatRate / 100), 0) * 12)
    : 0;
  const vatInBizAnn = vatMode === "standard"
    ? Math.round(costItems.filter((c) => c.type === "business").reduce((s, c) => s + n(c.amount, c.brutto, c.vatRate) * (c.vatRate / 100), 0) * 12)
    : 0;
  const vatInPrivAnn = vatMode === "standard"
    ? Math.round(costItems.filter((c) => c.type === "private").reduce((s, c) => s + n(c.amount, c.brutto, c.vatRate) * (c.vatRate / 100), 0) * 12)
    : 0;
  const vatInCarAnn = vatMode === "standard"
    ? Math.round(carCostsNet * (carVatRate / 100) * 12)
    : 0;

  // Sources helpers
  const addSource = () => {
    setRyczaltSources((prev) => [...prev, { id: nextId, name: "", amount: 0, rate: 8.5, isNajem: false, brutto: false, vatRate: 23 }]);
    setNextId((i) => i + 1);
  };
  const removeSource = (id: number) => setRyczaltSources((prev) => prev.filter((s) => s.id !== id));
  const updateSource = (id: number, patch: Partial<RyczaltSource>) =>
    setRyczaltSources((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  // Cost helpers
  const addCost = (type: CostType) => {
    setCostItems((prev) => [...prev, { id: nextId, name: "", amount: 0, type, brutto: false, vatRate: 23 }]);
    setNextId((i) => i + 1);
  };
  const removeCost = (id: number) => setCostItems((prev) => prev.filter((c) => c.id !== id));
  const updateCost = (id: number, patch: Partial<CostItem>) =>
    setCostItems((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));

  const results = useMemo(
    () =>
      calculate({
        monthlyRevenue, businessCosts: businessCostsNet, privateCosts: privateCostsNet, carCosts: carCostsNet, carUsage,
        zusStatus, chorobowa, prevYearIncome,
        ryczaltSources: ryczaltSources.map((s) => ({ ...s, amount: n(s.amount, s.brutto, s.vatRate) })),
        vatMode, vatOutAnn, vatInBizAnn, vatInPrivAnn, vatInCarAnn,
        ikzeAnnual: ikzeMonthly * 12,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [monthlyRevenue, businessCostsNet, privateCostsNet, carCostsNet, carUsage, zusStatus, chorobowa, prevYearIncome, ryczaltSources, costItems, vatMode, vatOutAnn, vatInBizAnn, vatInPrivAnn, vatInCarAnn, carBrutto, ikzeMonthly],
  );

  // Limity
  const annualRevenue = monthlyRevenue * 12;
  const vatExemptExceeded = vatMode === "zwolniony" && annualRevenue > VAT_EXEMPT_LIMIT;
  const malyPlusRevExceeded = zusStatus === "malyPlus" && annualRevenue > MALY_PLUS_REVENUE_LIMIT;

  const best = [results.skala, results.linear, results.ryczalt].reduce((a, b) => (a.disposable >= b.disposable ? a : b));
  const zusM = zusMonthly(zusStatus, chorobowa, prevYearIncome);
  const fpM = fpMonthly(zusStatus);

  const malyPlusBase = zusBase("malyPlus", prevYearIncome);

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* ── INPUTS ── */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* ────── LEFT: Przychody i koszty ────── */}
        <div className="space-y-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/50 p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Przychody i koszty
          </h2>
          {vatMode !== "zwolniony" && (
            <p className="text-xs text-gray-400 -mt-4">Przy każdym polu przełącznik N/B (netto/brutto). Brutto przeliczane na netto wg stawki VAT.</p>
          )}

          {/* Źródła przychodu */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Źródła przychodu</h3>
              <button type="button" onClick={addSource} className="text-xs font-medium text-accent hover:text-accent/80 transition">+ Dodaj źródło</button>
            </div>
            <div className="space-y-3">
              {ryczaltSources.map((src) => {
                const selectedOpt = RYCZALT_OPTIONS.find((o) => o.isNajem ? src.isNajem : !src.isNajem && o.rate === src.rate);
                const srcNetto = n(src.amount, src.brutto, src.vatRate);
                return (
                  <div key={src.id} className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="text" value={src.name} placeholder="Nazwa źródła..."
                        onChange={(e) => {
                          updateSource(src.id, { name: e.target.value });
                          detectRate(src.id, e.target.value);
                        }}
                        className="flex-1 rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-2 py-1 text-xs text-gray-600 dark:text-gray-400 focus:border-accent focus:ring-1 focus:ring-accent/30 outline-none" />
                      {aiLoadingRate === src.id && (
                        <span className="text-accent animate-spin flex-shrink-0">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" /></svg>
                        </span>
                      )}
                      {vatMode !== "zwolniony" && (
                        <div className="flex rounded-md overflow-hidden border border-gray-300 dark:border-gray-600 flex-shrink-0">
                          <button type="button" onClick={() => updateSource(src.id, { brutto: false })}
                            className={`px-2 py-0.5 text-[10px] font-bold transition ${!src.brutto ? "bg-accent text-white" : "bg-white dark:bg-gray-800 text-gray-400"}`}>N</button>
                          <button type="button" onClick={() => updateSource(src.id, { brutto: true })}
                            className={`px-2 py-0.5 text-[10px] font-bold transition ${src.brutto ? "bg-accent text-white" : "bg-white dark:bg-gray-800 text-gray-400"}`}>B</button>
                        </div>
                      )}
                      {ryczaltSources.length > 1 && (
                        <button type="button" onClick={() => removeSource(src.id)} className="text-gray-400 hover:text-red-500 transition flex-shrink-0" title="Usuń">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      )}
                    </div>
                    {aiRateHint?.id === src.id && (
                      <p className="text-[11px] text-accent/80 leading-snug px-0.5">AI: {aiRateHint.text}</p>
                    )}
                    <div className={`grid gap-3 ${vatMode !== "zwolniony" ? "grid-cols-[1fr_auto_1fr]" : "grid-cols-2"}`}>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Kwota/mies.</label>
                        <input type="number" value={src.amount || ""} min={0} step={500}
                          onChange={(e) => updateSource(src.id, { amount: Number(e.target.value) || 0 })}
                          onBlur={(e) => { if (!e.target.value) updateSource(src.id, { amount: 0 }); }}
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm tabular-nums focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none" />
                        {src.brutto && vatMode !== "zwolniony" && srcNetto !== src.amount && (
                          <p className="mt-1 text-xs text-gray-400">Netto: {pln(srcNetto)}</p>
                        )}
                      </div>
                      {vatMode !== "zwolniony" && (
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">VAT</label>
                          <select
                            value={String(src.vatRate)}
                            onChange={(e) => updateSource(src.id, { vatRate: Number(e.target.value) })}
                            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-2 text-sm focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none"
                          >
                            {VAT_RATES.map((r) => (
                              <option key={r} value={String(r)}>{r}%</option>
                            ))}
                          </select>
                        </div>
                      )}
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Stawka ryczałtu</label>
                        <select
                          value={src.isNajem ? "najem" : String(src.rate)}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === "najem") {
                              updateSource(src.id, { isNajem: true, rate: NAJEM_RATE_LOW });
                            } else {
                              updateSource(src.id, { isNajem: false, rate: Number(val) });
                            }
                          }}
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none"
                        >
                          {RYCZALT_OPTIONS.map((o) => (
                            <option key={o.isNajem ? "najem" : o.rate} value={o.isNajem ? "najem" : o.rate}>
                              {o.isNajem ? `${NAJEM_RATE_LOW}/${NAJEM_RATE_HIGH}%` : `${o.rate}%`} – {o.desc}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {selectedOpt && (
                      <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                        {selectedOpt.tooltip}
                        {src.isNajem && src.amount > 0 && (
                          <span className="block mt-1 text-gray-500 dark:text-gray-400 font-medium">
                            {src.amount * 12 <= NAJEM_THRESHOLD
                              ? `Cały przychód ({pln(src.amount * 12)}/rok) objęty stawką ${NAJEM_RATE_LOW}%.`
                              : `${pln(NAJEM_THRESHOLD)} × ${NAJEM_RATE_LOW}% + ${pln(src.amount * 12 - NAJEM_THRESHOLD)} × ${NAJEM_RATE_HIGH}%`}
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-3 px-1">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Łączny przychód netto:</span>
                <span className="text-lg font-bold text-accent tabular-nums">{pln(monthlyRevenue)}/mies.</span>
              </div>
            </div>
          </div>

          {/* Koszty (firmowe + prywatne) */}
          {(["business", "private"] as CostType[]).map((type) => {
            const items = costItems.filter((c) => c.type === type);
            const label = type === "business" ? "Koszty firmowe" : "Koszty prywatne w firmie";
            const hint = type === "business" ? "Wydatki czysto na firmę" : "Telefon, internet, biuro – i tak ponoszone";
            const total = items.reduce((s, c) => s + n(c.amount, c.brutto, c.vatRate), 0);
            return (
              <div key={type}>
                <div className="flex items-center justify-between mb-1 gap-2">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</h3>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => suggestCosts(type)}
                      disabled={aiCostLoading === type}
                      className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition disabled:opacity-50"
                    >
                      {aiCostLoading === type ? (
                        <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" /></svg>
                      ) : (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                      )}
                      Dodaj z AI
                    </button>
                    <button type="button" onClick={() => addCost(type)} className="text-xs font-medium text-accent hover:text-accent/80 transition">+ Dodaj</button>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-2">{hint}</p>
                <div className="space-y-2">
                  {items.map((c) => {
                    const cNetto = n(c.amount, c.brutto, c.vatRate);
                    return (
                      <div key={c.id} className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-3 space-y-2">
                        <div className="flex items-center gap-2">
                          <input type="text" value={c.name} placeholder="Nazwa kosztu..."
                            onChange={(e) => updateCost(c.id, { name: e.target.value })}
                            className="flex-1 rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-2 py-1 text-xs text-gray-600 dark:text-gray-400 focus:border-accent focus:ring-1 focus:ring-accent/30 outline-none" />
                          {items.length > 1 && (
                            <button type="button" onClick={() => removeCost(c.id)} className="text-gray-400 hover:text-red-500 transition" title="Usuń">
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          )}
                        </div>
                        <div className={`grid gap-3 ${vatMode !== "zwolniony" ? "grid-cols-[1fr_auto]" : ""}`}>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="text-xs text-gray-500">Kwota/mies.</label>
                              {vatMode !== "zwolniony" && (
                                <div className="flex rounded-md overflow-hidden border border-gray-300 dark:border-gray-600">
                                  <button type="button" onClick={() => updateCost(c.id, { brutto: false })}
                                    className={`px-2 py-0.5 text-[10px] font-bold transition ${!c.brutto ? "bg-accent text-white" : "bg-white dark:bg-gray-800 text-gray-400"}`}>N</button>
                                  <button type="button" onClick={() => updateCost(c.id, { brutto: true })}
                                    className={`px-2 py-0.5 text-[10px] font-bold transition ${c.brutto ? "bg-accent text-white" : "bg-white dark:bg-gray-800 text-gray-400"}`}>B</button>
                                </div>
                              )}
                            </div>
                            <input type="number" value={c.amount || ""} min={0} step={100}
                              onChange={(e) => updateCost(c.id, { amount: Number(e.target.value) || 0 })}
                              onBlur={(e) => { if (!e.target.value) updateCost(c.id, { amount: 0 }); }}
                              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm tabular-nums focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none" />
                            {c.brutto && vatMode !== "zwolniony" && cNetto !== c.amount && (
                              <p className="mt-1 text-xs text-gray-400">Netto: {pln(cNetto)}</p>
                            )}
                          </div>
                          {vatMode !== "zwolniony" && (
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">VAT</label>
                              <select
                                value={String(c.vatRate)}
                                onChange={(e) => updateCost(c.id, { vatRate: Number(e.target.value) })}
                                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-2 text-sm focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none"
                              >
                                {VAT_RATES.map((r) => (
                                  <option key={r} value={String(r)}>{r}%</option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {items.length > 1 && (
                  <div className="mt-2 px-1 flex justify-between items-baseline">
                    <span className="text-xs text-gray-500">Razem netto:</span>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 tabular-nums">{pln(total)}/mies.</span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Samochód – koszt prywatny */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Koszty samochodu <span className="font-normal text-gray-400">(koszt prywatny – i tak ponoszone)</span></h3>
            <NumberInput label="Koszty samochodu miesięcznie" value={carCosts} onChange={setCarCosts} step={100}
              hint="Paliwo, leasing/rata, ubezpieczenie, serwis, myjnia..."
              brutto={vatMode !== "zwolniony" ? carBrutto : undefined} onBruttoChange={vatMode !== "zwolniony" ? setCarBrutto : undefined} vatPct={carVatRate} />
            {vatMode !== "zwolniony" && (
              <div>
                <label className="block text-xs text-gray-500 mb-1">Stawka VAT samochodu</label>
                <select value={String(carVatRate)} onChange={(e) => setCarVatRate(Number(e.target.value))}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none">
                  {VAT_RATES.map((r) => (
                    <option key={r} value={String(r)}>{r}%</option>
                  ))}
                </select>
              </div>
            )}
            <RadioGroup
              label="Użytkowanie samochodu"
              value={carUsage}
              onChange={setCarUsage}
              options={[
                { value: "mixed", label: "Mieszane (firma + prywatnie)", desc: `Odliczenie: ${CAR_PIT_MIXED * 100}% PIT, ${CAR_VAT_MIXED * 100}% VAT` },
                { value: "business", label: "Wyłącznie firmowe", desc: `Odliczenie: ${CAR_PIT_BUSINESS * 100}% PIT, ${CAR_VAT_BUSINESS * 100}% VAT (wymaga ewidencji km)` },
              ]}
            />
          </div>

        </div>

        {/* ────── RIGHT: ZUS, VAT ────── */}
        <div className="space-y-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/50 p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            Składki i VAT
          </h2>

          <RadioGroup
            label="Status ZUS"
            value={zusStatus}
            onChange={setZusStatus}
            options={[
              { value: "ulga", label: "Ulga na start", desc: "Pierwsze 6 mies. – brak składek społecznych, tylko zdrowotna" },
              { value: "maly", label: "Mały ZUS (preferencyjny)", desc: `Mies. 7–30 – podstawa ${pln(SMALL_ZUS_BASE)} → ${pln(Math.round(zusMonthly("maly", true)))}/mies.` },
              { value: "malyPlus", label: "Mały ZUS Plus", desc: `Przychód z poprz. roku ≤ ${pln(MALY_PLUS_REVENUE_LIMIT)}. Max ${MALY_PLUS_MAX_MONTHS} mies. w 60. Podstawa od dochodu.` },
              { value: "pelny", label: "Pełny ZUS", desc: `Podstawa ${pln(FULL_ZUS_BASE)} → ${pln(Math.round(zusMonthly("pelny", true) + fpMonthly("pelny")))}/mies. (z FP)` },
            ]}
          />

          {zusStatus === "malyPlus" && (
            <div className="pl-7 space-y-2">
              <NumberInput label="Roczny dochód z poprzedniego roku" value={prevYearIncome} onChange={setPrevYearIncome} step={1000}
                hint={`Podstawa: ${pln(Math.round(malyPlusBase))} → składki: ${pln(Math.round(zusMonthly("malyPlus", chorobowa, prevYearIncome)))}/mies.`} />
              {malyPlusRevExceeded && (
                <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2 text-xs text-red-700 dark:text-red-300">
                  Twój roczny przychód ({pln(annualRevenue)}) przekracza limit Małego ZUS Plus ({pln(MALY_PLUS_REVENUE_LIMIT)}).
                  Nie kwalifikujesz się – przejdź na pełny ZUS.
                </div>
              )}
              <p className="text-xs text-gray-400">
                Mały ZUS Plus można stosować max {MALY_PLUS_MAX_MONTHS} miesięcy w ciągu 60 miesięcy.
                Nie przysługuje w pierwszym roku działalności.
              </p>
            </div>
          )}

          <Toggle label="Składka chorobowa (dobrowolna)" checked={chorobowa} onChange={setChorobowa}
            desc={`+${pln(Math.round(zusBase(zusStatus, prevYearIncome) * CHOROBOWA))}/mies. – prawo do zasiłku chorobowego`} />

          {/* IKZE */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Wpłata IKZE</span>
              <span className="text-sm font-semibold tabular-nums text-gray-900 dark:text-white">{pln(ikzeMonthly)}/mies.</span>
            </div>
            <input
              type="range"
              min={0}
              max={Math.ceil(IKZE_LIMIT_JDG / 12)}
              step={1}
              value={ikzeMonthly}
              onChange={(e) => setIkzeMonthly(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 dark:bg-gray-700 accent-accent"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>0 zł</span>
              <span>Limit: {pln(Math.round(IKZE_LIMIT_JDG))}/rok</span>
            </div>
            <p className="text-xs text-gray-400">
              Wpłaty na IKZE odliczasz od dochodu — obniżają podatek dochodowy.
              Rocznie: {pln(ikzeMonthly * 12)}.
            </p>
          </div>

          {/* VAT */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-5 space-y-4">
            <RadioGroup
              label="VAT"
              value={vatMode}
              onChange={setVatMode}
              options={[
                { value: "zwolniony", label: "Zwolniony z VAT", desc: `Limit obrotu ${pln(VAT_EXEMPT_LIMIT)}/rok. Brak naliczania i odliczania.` },
                { value: "standard", label: "VAT czynny", desc: "VAT naliczony na sprzedaży minus VAT od kosztów" },
              ]}
            />

            {vatExemptExceeded && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2 text-xs text-red-700 dark:text-red-300">
                Twój roczny przychód ({pln(annualRevenue)}) przekracza limit zwolnienia z VAT ({pln(VAT_EXEMPT_LIMIT)}).
                Musisz zarejestrować się jako czynny podatnik VAT.
              </div>
            )}

            {vatMode === "standard" && (
              <p className="text-xs text-gray-400 pl-7">Stawki VAT ustawiane osobno przy każdym przychodzie i koszcie.</p>
            )}
          </div>

          {/* ZUS summary */}
          <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 px-4 pt-4 pb-2">
              <Image src="/photos/tax-calculation/zus_logo.png" alt="ZUS" width={32} height={32} className="flex-shrink-0" />
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Podsumowanie składek</h3>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <span className="text-gray-500">Społeczne:</span>
              <span className="tabular-nums font-medium text-right">{pln(Math.round(zusM))}/mies.</span>
              <span className="text-gray-500">Fundusz Pracy:</span>
              <span className="tabular-nums font-medium text-right">{pln(Math.round(fpM))}/mies.</span>
              <span className="text-gray-500">Zdrowotna (skala):</span>
              <span className="tabular-nums font-medium text-right">{pln(Math.round(results.skala.healthInsurance / 12))}/mies.</span>
              <span className="text-gray-500">Zdrowotna (liniowy):</span>
              <span className="tabular-nums font-medium text-right">{pln(Math.round(results.linear.healthInsurance / 12))}/mies.</span>
              <span className="text-gray-500">Zdrowotna (ryczałt):</span>
              <span className="tabular-nums font-medium text-right">{pln(Math.round(results.ryczalt.healthInsurance / 12))}/mies.</span>
              <span className="text-gray-500 font-semibold border-t border-gray-200 dark:border-gray-700 pt-1">Razem ({best.label.toLowerCase()}):</span>
              <span className="tabular-nums font-bold text-right border-t border-gray-200 dark:border-gray-700 pt-1">{pln(Math.round(zusM + fpM + best.healthInsurance / 12))}/mies.</span>
            </div>
          </div>

          {/* Car deduction info */}
          {carCosts > 0 && (
            <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 space-y-1 text-sm">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Samochód – odliczenia</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <span className="text-gray-500">Koszt faktyczny:</span>
                <span className="tabular-nums text-right">{pln(carCosts)}/mies.</span>
                <span className="text-gray-500">Odliczenie PIT ({(carUsage === "mixed" ? CAR_PIT_MIXED : CAR_PIT_BUSINESS) * 100}%):</span>
                <span className="tabular-nums text-right">{pln(Math.round(carCosts * (carUsage === "mixed" ? CAR_PIT_MIXED : CAR_PIT_BUSINESS)))}/mies.</span>
                {vatMode !== "zwolniony" && (
                  <>
                    <span className="text-gray-500">Odliczenie VAT ({(carUsage === "mixed" ? CAR_VAT_MIXED : CAR_VAT_BUSINESS) * 100}%):</span>
                    <span className="tabular-nums text-right">{pln(Math.round(carCostsNet * (carVatRate / 100) * (carUsage === "mixed" ? CAR_VAT_MIXED : CAR_VAT_BUSINESS)))}/mies.</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── VIEW TOGGLE + RESULTS HEADER ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Porównanie form opodatkowania</h2>
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {(["monthly", "annual"] as ViewMode[]).map((m) => (
            <button key={m} type="button" onClick={() => setViewMode(m)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                viewMode === m ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}>
              {m === "monthly" ? "Miesięcznie" : "Rocznie"}
            </button>
          ))}
        </div>
      </div>

      {/* ── COMPARISON BAR ── */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-900/50">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Do dyspozycji {viewMode === "monthly" ? "miesięcznie" : "rocznie"}
        </h3>
        <div className="space-y-3">
          {([results.skala, results.linear, results.ryczalt] as TaxResult[]).map((r) => {
            const maxDisp = Math.max(results.skala.disposable, results.linear.disposable, results.ryczalt.disposable);
            const d = viewMode === "monthly" ? 12 : 1;
            const w = maxDisp > 0 ? (Math.max(0, r.disposable) / maxDisp) * 100 : 0;
            return (
              <div key={r.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">{r.label}</span>
                  <span className={`font-semibold tabular-nums ${r.label === best.label ? "text-accent" : "text-gray-900 dark:text-white"}`}>
                    {pln(Math.round(r.disposable / d))}
                  </span>
                </div>
                <div className="h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <div className={`h-3 rounded-full transition-all duration-500 ${r.label === best.label ? "bg-gradient-to-r from-accent to-indigo-400" : "bg-gray-300 dark:bg-gray-600"}`}
                    style={{ width: `${Math.max(0, w)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── RESULTS ── */}
      <div className="grid md:grid-cols-3 gap-6">
        {([results.skala, results.linear, results.ryczalt] as TaxResult[]).map((r) => (
          <ResultCard key={r.label} result={r} isBest={r.label === best.label} viewMode={viewMode} showVat={vatMode !== "zwolniony"} />
        ))}
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 text-sm text-amber-800 dark:text-amber-200">
        <strong>Uwaga:</strong> Kalkulator ma charakter poglądowy (stawki {YEAR}). Skonsultuj się z księgowym przed podjęciem decyzji.
      </div>

      {/* ── INFO TABLE ── */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/50 overflow-hidden text-sm text-gray-600 dark:text-gray-400">
        <div className="relative h-32 sm:h-40">
          <Image src="/photos/tax-calculation/urzad-skarbowy-plate.jpg" alt="Urząd Skarbowy" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 flex items-end p-6">
            <h3 className="flex items-center gap-2 font-semibold text-white text-lg">
              Stawki i założenia ({YEAR})
            </h3>
          </div>
        </div>
        <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 text-xs">
          <div><strong>Kwota wolna:</strong> {pln(TAX_FREE)}</div>
          <div><strong>Próg skali:</strong> {pln(BRACKET_LIMIT)}</div>
          <div><strong>Stawki skali:</strong> {RATE_12 * 100}% / {RATE_32 * 100}%</div>
          <div><strong>Stawka liniowa:</strong> {LINEAR_RATE * 100}%</div>
          <div><strong>Zdrowotna (skala):</strong> {HEALTH_RATE_SKALA * 100}% dochodu</div>
          <div><strong>Zdrowotna (liniowy):</strong> {HEALTH_RATE_LINEAR * 100}% dochodu</div>
          <div><strong>Pełny ZUS – podstawa:</strong> {pln(FULL_ZUS_BASE)}</div>
          <div><strong>Mały ZUS – podstawa:</strong> {pln(SMALL_ZUS_BASE)}</div>
          <div><strong>Samochód mieszany:</strong> {CAR_PIT_MIXED * 100}% PIT / {CAR_VAT_MIXED * 100}% VAT</div>
          <div><strong>Najem ryczałt:</strong> {NAJEM_RATE_LOW}% do {pln(NAJEM_THRESHOLD)}, {NAJEM_RATE_HIGH}% powyżej</div>
          <div><strong>Zwolnienie VAT:</strong> do {pln(VAT_EXEMPT_LIMIT)} obrotu/rok</div>
          <div><strong>Mały ZUS Plus:</strong> przychód ≤ {pln(MALY_PLUS_REVENUE_LIMIT)}, max {MALY_PLUS_MAX_MONTHS} mies.</div>
          <div><strong>IKZE (limit JDG):</strong> {pln(Math.round(IKZE_LIMIT_JDG))}/rok</div>
          <div><strong>Min. wynagrodzenie:</strong> {pln(MIN_WAGE)}</div>
          <div><strong>Przeciętne wynagr.:</strong> {pln(AVG_SALARY)}</div>
        </div>
      </div>
    </div>
  );
}
