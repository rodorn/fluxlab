"use client";

import { useState, useMemo } from "react";

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

// Limity
const VAT_EXEMPT_LIMIT = 200_000; // roczny obrót – zwolnienie podmiotowe
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

interface RyczaltSource {
  id: number;
  amount: number;
  rate: number;
  isNajem: boolean;
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
  vatMarzaCost: number;
  vatPrivateSavings: number;
  totalBurden: number;
  netAfterTax: number;
  disposable: number;
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
  vatRate: number;
  vatCostsRate: number;
  hasMarza: boolean;
  marzaSell: number;  // monthly selling price (marża transactions)
  marzaBuy: number;   // monthly purchase cost (marża transactions)
}): { skala: TaxResult; linear: TaxResult; ryczalt: TaxResult } {
  const annRev = p.monthlyRevenue * 12;
  const annBizCosts = p.businessCosts * 12;
  const annPrivCosts = p.privateCosts * 12;
  const annCarCosts = p.carCosts * 12;
  const carPitPct = p.carUsage === "business" ? CAR_PIT_BUSINESS : CAR_PIT_MIXED;
  const carVatPct = p.carUsage === "business" ? CAR_VAT_BUSINESS : CAR_VAT_MIXED;
  const annCarDeductible = Math.round(annCarCosts * carPitPct);

  // Marża: dodatkowe przychody i koszty (nie wchodzą w główne pola)
  const annMarzaSell = p.hasMarza ? p.marzaSell * 12 : 0;
  const annMarzaBuy = p.hasMarza ? p.marzaBuy * 12 : 0;
  const annMargin = Math.max(0, annMarzaSell - annMarzaBuy);

  // Łączne koszty odliczalne (skala/liniowy): firmowe + prywatne + samochód + zakup marżowy
  const totalDeductible = annBizCosts + annPrivCosts + annCarDeductible + annMarzaBuy;
  // Łączny przychód PIT (ze źródeł + sprzedaż marżowa)
  const totalPitRev = annRev + annMarzaSell;

  const zusM = zusMonthly(p.zusStatus, p.chorobowa, p.prevYearIncome);
  const fpM = fpMonthly(p.zusStatus);
  const annZus = Math.round(zusM * 12);
  const annFP = Math.round(fpM * 12);

  // VAT
  // Standard: pass-through na zwykłym przychodzie. Marża: VAT "w stu" od marży — realny koszt.
  let vatPassThrough = 0;
  let vatRealCost = 0;
  let vatPrivateSavings = 0;
  let vatMarzaCost = 0;
  if (p.vatMode === "standard") {
    // Standard VAT na zwykły przychód (marża NIE dostaje standardowego VAT na górę)
    const vatOut = annRev * (p.vatRate / 100);
    const vatInBiz = annBizCosts * (p.vatCostsRate / 100);
    const vatInPriv = annPrivCosts * (p.vatCostsRate / 100);
    const vatInCar = annCarCosts * (p.vatCostsRate / 100) * carVatPct;
    vatPassThrough = Math.max(0, Math.round(vatOut - vatInBiz - vatInPriv - vatInCar));
    vatRealCost = Math.round(annCarCosts * (p.vatCostsRate / 100) * (1 - carVatPct));
    vatPrivateSavings = Math.round(vatInPriv + vatInCar);
    // VAT marża: "w stu" od marży (sprzedaż − zakup)
    if (p.hasMarza && annMargin > 0) {
      vatMarzaCost = Math.round(annMargin * p.vatRate / (100 + p.vatRate));
    }
  }

  // Helper: tax savings from private costs
  const calcPrivateSavings = (taxWithout: number, taxWith: number) =>
    Math.max(0, Math.round(taxWithout - taxWith));

  // Monthly income for health insurance (includes marża profit = sell − buy)
  const monthlyMarzaProfit = (annMarzaSell - annMarzaBuy) / 12;

  // ── SKALA ──
  const skalaMonthlyInc = Math.max(0, p.monthlyRevenue + monthlyMarzaProfit - p.businessCosts - p.privateCosts - Math.round(p.carCosts * carPitPct) - zusM);
  const skalaHealthM = healthSkala(skalaMonthlyInc);
  const skalaHealthAnn = Math.round(skalaHealthM * 12);
  const skalaTaxBase = Math.max(0, Math.round(totalPitRev - totalDeductible - annZus));
  const skalaTax = taxSkala(skalaTaxBase);
  const skalaTaxBaseNoPriv = Math.max(0, Math.round(totalPitRev - annBizCosts - annCarDeductible - annMarzaBuy - annZus));
  const skalaTaxNoPriv = taxSkala(skalaTaxBaseNoPriv);
  const skalaPrivSav = calcPrivateSavings(skalaTaxNoPriv, skalaTax);
  const skalaBurden = annZus + annFP + skalaHealthAnn + skalaTax + vatRealCost + vatMarzaCost;

  // ── LINIOWY ──
  const linearMonthlyInc = Math.max(0, p.monthlyRevenue + monthlyMarzaProfit - p.businessCosts - p.privateCosts - Math.round(p.carCosts * carPitPct) - zusM);
  const linearHealthM = healthLinear(linearMonthlyInc);
  const linearHealthAnn = Math.round(linearHealthM * 12);
  const linearHealthDed = Math.min(linearHealthAnn, LINEAR_HEALTH_CAP);
  const linearTaxBase = Math.max(0, Math.round(totalPitRev - totalDeductible - annZus - linearHealthDed));
  const linearTax = taxLinear(linearTaxBase);
  const linearTaxBaseNoPriv = Math.max(0, Math.round(totalPitRev - annBizCosts - annCarDeductible - annMarzaBuy - annZus - linearHealthDed));
  const linearTaxNoPriv = taxLinear(linearTaxBaseNoPriv);
  const linearPrivSav = calcPrivateSavings(linearTaxNoPriv, linearTax);
  const linearBurden = annZus + annFP + linearHealthAnn + linearTax + vatRealCost + vatMarzaCost;

  // ── RYCZAŁT ──
  // Ryczałt: przychód ze źródeł (bez marży — marża powinna być dodana jako osobne źródło ryczałtowe)
  const ryczHealthM = healthRyczalt(totalPitRev);
  const ryczHealthAnn = Math.round(ryczHealthM * 12);
  const ryczHealthDed = Math.round(ryczHealthAnn * 0.5);

  const totalRyczRev = p.ryczaltSources.reduce((s, src) => s + src.amount * 12, 0);
  let ryczTax = 0;
  for (const src of p.ryczaltSources) {
    const srcAnn = src.amount * 12;
    const proportion = totalRyczRev > 0 ? srcAnn / totalRyczRev : 0;
    const srcDed = Math.round(ryczHealthDed * proportion);
    const srcTaxable = Math.max(0, srcAnn - srcDed);

    if (src.isNajem) {
      ryczTax += calcRyczaltNajem(srcTaxable);
    } else {
      ryczTax += Math.round(srcTaxable * (src.rate / 100));
    }
  }
  const ryczBurden = annZus + annFP + ryczHealthAnn + ryczTax + vatRealCost + vatMarzaCost;

  // Przychód brutto = przychód PIT + VAT standardowy na górze (marża nie dolicza VAT)
  const vatOutStandard = p.vatMode === "standard" ? Math.round(annRev * (p.vatRate / 100)) : 0;
  const annRevBrutto = totalPitRev + vatOutStandard;

  const mk = (
    label: string,
    deductible: number,
    health: number,
    healthDed: number,
    base: number,
    tax: number,
    burden: number,
    privSav: number,
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
      vatMarzaCost,
      vatPrivateSavings,
      totalBurden: totalWithVat,
      netAfterTax: annRevBrutto - totalWithVat,
      disposable: annRevBrutto - totalWithVat - annBizCosts - annMarzaBuy,
      privateSavings: privSav,
      effectiveRate: annRevBrutto > 0 ? totalWithVat / annRevBrutto : 0,
    };
  };

  return {
    skala: mk("Skala podatkowa", totalDeductible, skalaHealthAnn, 0, skalaTaxBase, skalaTax, skalaBurden, skalaPrivSav),
    linear: mk("Podatek liniowy", totalDeductible, linearHealthAnn, linearHealthDed, linearTaxBase, linearTax, linearBurden, linearPrivSav),
    ryczalt: mk("Ryczałt", 0, ryczHealthAnn, ryczHealthDed, totalRyczRev, ryczTax, ryczBurden, 0),
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
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Math.max(min, Math.min(max, Number(e.target.value) || 0)))}
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
  const revNetto = r.annualRevenue - (showVat ? r.vatPassThrough + r.vatRealCost + r.vatMarzaCost : 0);

  const burdenParts = [
    ...(r.vatPassThrough > 0 ? [`VAT do US (${v(r.vatPassThrough)})`] : []),
    ...(r.vatMarzaCost > 0 ? [`VAT marża (${v(r.vatMarzaCost)})`] : []),
    `ZUS (${v(r.zusSpoleczne)})`,
    ...(r.funduszPracy > 0 ? [`FP (${v(r.funduszPracy)})`] : []),
    `zdrowotna (${v(r.healthInsurance)})`,
    `podatek (${v(r.incomeTax)})`,
    ...(r.vatRealCost > 0 ? [`nieodlicz. VAT sam. (${v(r.vatRealCost)})`] : []),
  ].join(" + ");

  const rows: { label: string; value: number; tip?: string; bold?: boolean; accent?: boolean; dimmed?: boolean; negative?: boolean; green?: boolean }[] = [
    { label: showVat ? "Przychód brutto" : "Przychód", value: r.annualRevenue, bold: true,
      tip: showVat
        ? `Przychód brutto (netto + VAT): ${v(r.annualRevenue)}${sfx}. Netto: ${v(revNetto)}.`
        : `Łączny przychód ze wszystkich źródeł: ${v(r.annualRevenue)}${sfx}.` },
    ...(showVat && r.vatPassThrough > 0 ? [{ label: "VAT do urzędu skarbowego", value: -r.vatPassThrough, negative: true as const,
      tip: `VAT należny od sprzedaży standardowej minus VAT naliczony od kosztów. Odprowadzasz ${v(r.vatPassThrough)}${sfx} do US.` }] : []),
    ...(r.vatMarzaCost > 0 ? [{ label: "VAT od marży", value: -r.vatMarzaCost, negative: true as const,
      tip: `VAT „w stu" od marży: ${v(r.vatMarzaCost)}${sfx}. Realny koszt — obniża zysk z transakcji marżowej.` }] : []),
    ...(r.vatRealCost > 0 ? [{ label: "Nieodliczalny VAT (samochód)", value: -r.vatRealCost, negative: true as const,
      tip: `Nieodliczalny VAT od samochodu: ${v(r.vatRealCost)}${sfx}. Np. 50% VAT przy mieszanym użytku.` }] : []),
    ...(r.deductibleCosts > 0 ? [
      { label: "Koszty odliczone (PIT)", value: -r.deductibleCosts, negative: true as const,
        tip: `Firmowe + prywatne + zakup marżowy (${v(costsNoCar)}) + samochód (${v(r.carCostsDeducted)}). Obniżają podstawę opodatkowania.` },
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
    { label: "Do dyspozycji", value: r.disposable, bold: true, accent: true,
      tip: `Przychód brutto (${v(r.annualRevenue)}) − obciążenia (${v(r.totalBurden)}) − koszty firmowe (${v(bizCostsAnn)}) = ${v(r.disposable)}. Koszty prywatne i samochodu nie odejmowane (i tak ponoszone).` },
    ...(r.privateSavings > 0 ? [{ label: "↳ oszczędność PIT z kosztów prywatnych", value: r.privateSavings, green: true as const,
      tip: `Dzięki wliczeniu kosztów prywatnych płacisz ${v(r.privateSavings)}${sfx} mniej podatku dochodowego.` }] : []),
    ...(r.vatPrivateSavings > 0 ? [{ label: "↳ oszczędność VAT z kosztów prywatnych", value: r.vatPrivateSavings, green: true as const,
      tip: `Odliczony VAT od kosztów prywatnych i samochodu: ${v(r.vatPrivateSavings)}${sfx}. Pieniądze odzyskane z VAT od kosztów i tak ponoszonych.` }] : []),
  ];

  return (
    <div className={`rounded-2xl border p-6 transition relative ${
      isBest ? "border-accent bg-accent/5 dark:bg-accent/10 shadow-lg shadow-accent/10" : "border-gray-200 dark:border-gray-700"
    }`}>
      {isBest && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
          NAJKORZYSTNIEJSZY
        </div>
      )}
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{result.label}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Efektywna stawka: {pct(result.effectiveRate)}</p>
      <div className="space-y-2">
        {rows.map((r) => (
          <div
            key={r.label}
            title={r.tip}
            className={`flex justify-between items-baseline text-sm cursor-help ${r.bold ? "font-semibold" : ""} ${r.dimmed ? "text-gray-400 dark:text-gray-500 text-xs" : ""} ${
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
  // Per-field brutto flags
  const [revBrutto, setRevBrutto] = useState(false);
  const [bizBrutto, setBizBrutto] = useState(false);
  const [privBrutto, setPrivBrutto] = useState(false);
  const [carBrutto, setCarBrutto] = useState(false);

  const [businessCosts, setBusinessCosts] = useState(1_500);
  const [privateCosts, setPrivateCosts] = useState(500);
  const [carCosts, setCarCosts] = useState(1_000);
  const [carUsage, setCarUsage] = useState<CarUsage>("mixed");
  const [zusStatus, setZusStatus] = useState<ZusStatus>("pelny");
  const [prevYearIncome, setPrevYearIncome] = useState(120_000);
  const [chorobowa, setChorobowa] = useState(true);
  const [vatMode, setVatMode] = useState<VatMode>("zwolniony");
  const [vatRate, setVatRate] = useState(23);
  const [vatCostsRate, setVatCostsRate] = useState(23);
  const [hasMarza, setHasMarza] = useState(false);
  const [marzaSell, setMarzaSell] = useState(10_000);
  const [marzaBuy, setMarzaBuy] = useState(7_000);
  const [viewMode, setViewMode] = useState<ViewMode>("monthly");

  // Ryczałt sources
  const [ryczaltSources, setRyczaltSources] = useState<RyczaltSource[]>([
    { id: 1, amount: 15_000, rate: 12, isNajem: false },
  ]);
  const [nextId, setNextId] = useState(2);

  // Per-field brutto→netto conversion (only when VAT active)
  const n = (v: number, isBrutto: boolean, rate: number) =>
    isBrutto && vatMode !== "zwolniony" ? Math.round(v / (1 + rate / 100)) : v;

  // Przychód = suma źródeł (przeliczony na netto). Marża to osobne przychody/koszty.
  const monthlyRevenueRaw = ryczaltSources.reduce((s, src) => s + src.amount, 0);
  const monthlyRevenue = n(monthlyRevenueRaw, revBrutto, vatRate);
  const businessCostsNet = n(businessCosts, bizBrutto, vatCostsRate);
  const privateCostsNet = n(privateCosts, privBrutto, vatCostsRate);
  const carCostsNet = n(carCosts, carBrutto, vatCostsRate);

  const addSource = () => {
    setRyczaltSources((prev) => [...prev, { id: nextId, amount: 0, rate: 8.5, isNajem: false }]);
    setNextId((n) => n + 1);
  };
  const removeSource = (id: number) => setRyczaltSources((prev) => prev.filter((s) => s.id !== id));
  const updateSource = (id: number, patch: Partial<RyczaltSource>) =>
    setRyczaltSources((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  const results = useMemo(
    () =>
      calculate({
        monthlyRevenue, businessCosts: businessCostsNet, privateCosts: privateCostsNet, carCosts: carCostsNet, carUsage,
        zusStatus, chorobowa, prevYearIncome,
        ryczaltSources: ryczaltSources.map((s) => ({ ...s, amount: n(s.amount, revBrutto, vatRate) })),
        vatMode, vatRate, vatCostsRate,
        hasMarza, marzaSell, marzaBuy,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [monthlyRevenue, businessCostsNet, privateCostsNet, carCostsNet, carUsage, zusStatus, chorobowa, prevYearIncome, ryczaltSources, vatMode, vatRate, vatCostsRate, hasMarza, marzaSell, marzaBuy, revBrutto, bizBrutto, privBrutto, carBrutto],
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
      {/* Disclaimer */}
      <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 text-sm text-amber-800 dark:text-amber-200">
        <strong>Uwaga:</strong> Kalkulator ma charakter poglądowy (stawki {YEAR}). Skonsultuj się z księgowym przed podjęciem decyzji.
      </div>

      {/* ── INPUTS ── */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* ────── LEFT: Przychody i koszty ────── */}
        <div className="space-y-6 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Przychody i koszty</h2>
          <p className="text-xs text-gray-400 -mt-4">Przy każdym polu przełącznik N/B (netto/brutto). Brutto przeliczane na netto wg stawki VAT.</p>

          {/* Źródła przychodu */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Źródła przychodu</h3>
              <div className="flex items-center gap-3">
                <div className="flex rounded-md overflow-hidden border border-gray-300 dark:border-gray-600" title="Netto / Brutto dla przychodów">
                  <button type="button" onClick={() => setRevBrutto(false)}
                    className={`px-2 py-0.5 text-[10px] font-bold transition ${!revBrutto ? "bg-accent text-white" : "bg-white dark:bg-gray-800 text-gray-400"}`}>N</button>
                  <button type="button" onClick={() => setRevBrutto(true)}
                    className={`px-2 py-0.5 text-[10px] font-bold transition ${revBrutto ? "bg-accent text-white" : "bg-white dark:bg-gray-800 text-gray-400"}`}>B</button>
                </div>
                <button type="button" onClick={addSource} className="text-xs font-medium text-accent hover:text-accent/80 transition">+ Dodaj źródło</button>
              </div>
            </div>
            <div className="space-y-3">
              {ryczaltSources.map((src, i) => {
                const selectedOpt = RYCZALT_OPTIONS.find((o) => o.isNajem ? src.isNajem : !src.isNajem && o.rate === src.rate);
                return (
                  <div key={src.id} className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-3 space-y-2">
                    <div className="flex items-end gap-3">
                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">
                          Kwota/mies. {revBrutto ? "(brutto)" : "(netto)"} {ryczaltSources.length > 1 ? `#${i + 1}` : ""}
                        </label>
                        <input type="number" value={src.amount} min={0} step={500}
                          onChange={(e) => updateSource(src.id, { amount: Number(e.target.value) || 0 })}
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm tabular-nums focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none" />
                      </div>
                      <div className="flex-1">
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
                      {ryczaltSources.length > 1 && (
                        <button type="button" onClick={() => removeSource(src.id)} className="text-gray-400 hover:text-red-500 transition p-2" title="Usuń">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      )}
                    </div>
                    {/* Tooltip / explanation */}
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
            <div className="mt-3 px-1 space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Łączny przychód:</span>
                <span className="text-lg font-bold text-accent tabular-nums">{pln(monthlyRevenueRaw)}/mies. {revBrutto ? "(brutto)" : "(netto)"}</span>
              </div>
              {revBrutto && vatMode !== "zwolniony" && monthlyRevenue !== monthlyRevenueRaw && (
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-gray-400">Netto (do obliczeń):</span>
                  <span className="text-sm font-medium text-gray-500 tabular-nums">{pln(monthlyRevenue)}/mies.</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <NumberInput label="Koszty firmowe" value={businessCosts} onChange={setBusinessCosts} step={100}
              hint="Wydatki czysto na firmę"
              brutto={bizBrutto} onBruttoChange={setBizBrutto} vatPct={vatCostsRate} />
            <NumberInput label="Koszty prywatne w firmie" value={privateCosts} onChange={setPrivateCosts} step={100}
              hint="Telefon, internet, biuro – i tak ponoszone"
              brutto={privBrutto} onBruttoChange={setPrivBrutto} vatPct={vatCostsRate} />
          </div>

          {/* Samochód – koszt prywatny */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Koszty samochodu <span className="font-normal text-gray-400">(koszt prywatny – i tak ponoszone)</span></h3>
            <NumberInput label="Koszty samochodu miesięcznie" value={carCosts} onChange={setCarCosts} step={100}
              hint="Paliwo, leasing/rata, ubezpieczenie, serwis, myjnia..."
              brutto={carBrutto} onBruttoChange={setCarBrutto} vatPct={vatCostsRate} />
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
        <div className="space-y-6 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Składki i VAT</h2>

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
              <div className="space-y-4 pl-7">
                <div className="grid grid-cols-2 gap-4">
                  <NumberInput label="Stawka VAT sprzedaży" value={vatRate} onChange={setVatRate} min={0} max={23} step={1} unit="%" />
                  <NumberInput label="Stawka VAT kosztów" value={vatCostsRate} onChange={setVatCostsRate} min={0} max={23} step={1} unit="%" />
                </div>

                <Toggle
                  label="Sprzedaż na VAT marży"
                  checked={hasMarza}
                  onChange={setHasMarza}
                  desc="Dodatkowe przychody i koszty zakupu, np. handel używanymi towarami. VAT tylko od marży."
                />

                {hasMarza && (
                  <div className="grid grid-cols-2 gap-4 pl-7">
                    <NumberInput label="Sprzedaż marżowa (mies.)" value={marzaSell} onChange={setMarzaSell} step={500}
                      hint="Cena sprzedaży — dodatkowy przychód PIT" />
                    <NumberInput label="Koszt zakupu (mies.)" value={marzaBuy} onChange={setMarzaBuy} step={500}
                      hint="Cena zakupu towaru — dodatkowy koszt PIT (skala/liniowy)" />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ZUS summary */}
          <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 space-y-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Podsumowanie ZUS</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <span className="text-gray-500">Społeczne:</span>
              <span className="tabular-nums font-medium text-right">{pln(Math.round(zusM))}/mies.</span>
              <span className="text-gray-500">Fundusz Pracy:</span>
              <span className="tabular-nums font-medium text-right">{pln(Math.round(fpM))}/mies.</span>
              <span className="text-gray-500 font-semibold">Razem ZUS:</span>
              <span className="tabular-nums font-bold text-right">{pln(Math.round(zusM + fpM))}/mies.</span>
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
                    <span className="tabular-nums text-right">{pln(Math.round(carCosts * (vatCostsRate / 100) * (carUsage === "mixed" ? CAR_VAT_MIXED : CAR_VAT_BUSINESS)))}/mies.</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── VIEW TOGGLE ── */}
      <div className="flex items-center justify-center gap-2">
        {(["monthly", "annual"] as ViewMode[]).map((m) => (
          <button key={m} type="button" onClick={() => setViewMode(m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              viewMode === m ? "bg-accent text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}>
            {m === "monthly" ? "Miesięcznie" : "Rocznie"}
          </button>
        ))}
      </div>

      {/* ── RESULTS ── */}
      <div className="grid md:grid-cols-3 gap-6">
        {([results.skala, results.linear, results.ryczalt] as TaxResult[]).map((r) => (
          <ResultCard key={r.label} result={r} isBest={r.label === best.label} viewMode={viewMode} showVat={vatMode !== "zwolniony"} />
        ))}
      </div>

      {/* ── COMPARISON BAR ── */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
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
                <div className="h-3 rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className={`h-3 rounded-full transition-all duration-500 ${r.label === best.label ? "bg-accent" : "bg-gray-300 dark:bg-gray-600"}`}
                    style={{ width: `${Math.max(0, w)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── INFO TABLE ── */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-sm text-gray-600 dark:text-gray-400">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Stawki i założenia ({YEAR})</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 text-xs">
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
          <div><strong>Min. wynagrodzenie:</strong> {pln(MIN_WAGE)}</div>
          <div><strong>Przeciętne wynagr.:</strong> {pln(AVG_SALARY)}</div>
        </div>
      </div>
    </div>
  );
}
