"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";

/* ───────────────────────── types ───────────────────────── */

type BodyStyle = "sportowy" | "sedan" | "van" | "crossover" | "suv" | "terenowy";
type BodyShape =
  | "hatchback" | "sedan" | "kombi" | "liftback"
  | "coupe-2" | "roadster-2" | "coupe-2plus2" | "cabriolet-2plus2"
  | "hot-hatch" | "4door-coupe" | "sport-sedan" | "sport-crossover"
  | "standard" | "coupe" | "pickup";

type KmPeriod = "dzien" | "tydzien" | "miesiac" | "rok";
const KM_MULTIPLIER: Record<KmPeriod, number> = { dzien: 365, tydzien: 52, miesiac: 12, rok: 1 };
const KM_PERIOD_LABELS: Record<KmPeriod, string> = { dzien: "dziennie", tydzien: "tygodniowo", miesiac: "miesięcznie", rok: "rocznie" };

interface Answers {
  height: number;
  passengers: number;
  segmentOverride: Segment | null;
  bodyStyle: BodyStyle | null;
  bodyShapes: BodyShape[];
  luggageFreq: number;
  foldSeats: boolean;
  maxSpeed: number;
  powerOverride: number | null;
  budget: number;
  kmCity: number;
  kmHighway: number;
  kmPeriod: KmPeriod;
  yearsOwned: number;
  additionalInfo: string;
}

const INITIAL: Answers = {
  height: 175,
  passengers: 1,
  segmentOverride: null,
  bodyStyle: null,
  bodyShapes: [],
  luggageFreq: 30,
  foldSeats: false,
  maxSpeed: 130,
  powerOverride: null,
  budget: 50000,
  kmCity: 800,
  kmHighway: 1500,
  kmPeriod: "miesiac",
  yearsOwned: 5,
  additionalInfo: "",
};

/* ──────────────── segment logic ──────────────── */

type Segment = "A" | "B" | "C" | "D" | "E" | "F";

const SHAPE_DESCRIPTIONS: Partial<Record<BodyShape, Partial<Record<Segment, string>>>> = {
  hatchback: {
    A: "A – mini hatchbacki (np. Fiat 500, Toyota Aygo)",
    B: "B – małe hatchbacki (np. VW Polo, Mazda 2)",
    C: "C – kompaktowe hatchbacki (np. VW Golf, Toyota Corolla)",
  },
  sedan: {
    B: "B – małe sedany (np. Toyota Yaris Sedan, Honda City)",
    C: "C – kompaktowe sedany (np. Toyota Corolla Sedan, VW Jetta)",
    D: "D – sedany klasy średniej (np. BMW serii 3, VW Passat)",
    E: "E – sedany klasy średniej wyższej (np. BMW serii 5, Mercedes klasy E)",
    F: "F – sedany klasy wyższej (np. BMW serii 7, Mercedes klasy S)",
  },
  kombi: {
    B: "B – małe kombi (np. Skoda Fabia Combi, Dacia Logan MCV)",
    C: "C – kompaktowe kombi (np. Toyota Corolla TS, Skoda Octavia Combi)",
    D: "D – średnie kombi (np. BMW serii 3 Touring, VW Passat Variant)",
    E: "E – duże kombi (np. BMW serii 5 Touring, Mercedes klasy E T-Modell)",
  },
  liftback: {
    C: "C – kompaktowe liftbacki (np. Skoda Octavia, Mazda 3)",
    D: "D – liftbacki klasy średniej (np. BMW serii 4, VW Arteon)",
    E: "E – liftbacki klasy średniej wyższej (np. Audi A7, Porsche Panamera)",
  },
  "coupe-2": {
    A: "A – ciasne (np. Lotus Elise, Alpine A110, Mazda MX-5 RF)",
    B: "B – wygodne (np. Porsche 911, BMW M2, Toyota GR86)",
  },
  "roadster-2": {
    A: "A – ciasne (np. Mazda MX-5, Lotus Elise, Caterham)",
    B: "B – wygodne (np. BMW Z4, Porsche Boxster, Jaguar F-Type)",
  },
  "coupe-2plus2": {
    B: "B – małe (np. Toyota GR86, Subaru BRZ)",
    C: "C – kompaktowe (np. BMW serii 2 Coupé)",
    D: "D – średnie (np. BMW M4, Audi RS5)",
    E: "E – premium (np. Porsche 911, Lexus LC)",
    F: "F – luksusowe (np. Bentley Continental GT, Ferrari Roma)",
  },
  "cabriolet-2plus2": {
    B: "B – małe (np. Mini Cabrio, Fiat 500C)",
    C: "C – kompaktowe (np. BMW serii 2 Cabrio)",
    D: "D – średnie (np. BMW serii 4 Cabrio, Mercedes C Cabrio)",
    E: "E – premium (np. Mercedes E Cabrio, BMW serii 8 Cabrio)",
    F: "F – luksusowe (np. Bentley Continental GTC, Rolls-Royce Dawn)",
  },
  "hot-hatch": {
    A: "A – mini hot hatch (np. Abarth 500)",
    B: "B – małe hot hatch (np. Ford Fiesta ST, Suzuki Swift Sport)",
    C: "C – kompaktowe hot hatch (np. VW Golf GTI, Honda Civic Type R)",
  },
  "4door-coupe": {
    C: "C – kompaktowe (np. Mercedes CLA, BMW serii 2 Gran Coupé)",
    D: "D – średnie (np. BMW serii 4 Gran Coupé, Audi A5 Sportback)",
    E: "E – premium (np. Mercedes CLS, BMW serii 8 Gran Coupé)",
  },
  "sport-sedan": {
    D: "D – średnie (np. BMW M3, Mercedes C63 AMG)",
    E: "E – premium (np. BMW M5, Mercedes E63 AMG)",
    F: "F – luksusowe (np. Mercedes S63 AMG, BMW M760i)",
  },
  "sport-crossover": {
    B: "B – małe (np. VW T-Roc R)",
    C: "C – kompaktowe (np. VW Tiguan R, Mercedes GLA AMG)",
    D: "D – średnie (np. BMW X4 M, Mercedes GLC AMG)",
    E: "E – duże (np. BMW X5 M, Porsche Cayenne Turbo)",
    F: "F – premium (np. Bentley Bentayga, Aston Martin DBX)",
  },
  coupe: {
    D: "D – średnie coupé (np. BMW X4, Mercedes GLC Coupé)",
    E: "E – duże coupé (np. BMW X6, Mercedes GLE Coupé)",
  },
  pickup: {
    D: "D – średnie pick-upy (np. Toyota Hilux, Ford Ranger)",
    E: "E – duże pick-upy (np. Dodge RAM, Ford F-150)",
  },
};

const STYLE_DESCRIPTIONS: Record<BodyStyle, Partial<Record<Segment, string>>> = {
  sportowy: {},
  sedan: {},
  van: {
    B: "B – kombivany (np. VW Caddy, Renault Kangoo)",
    C: "C – minivany (np. VW Touran, Ford S-Max)",
    D: "D – średnie vany (np. VW Sharan, Ford Galaxy)",
    E: "E – duże vany (np. Mercedes klasy V, VW Caravelle)",
  },
  crossover: {
    A: "A – mini crossover (np. Fiat 500X, Suzuki Ignis)",
    B: "B – małe crossover (np. Hyundai Kona, VW T-Cross)",
    C: "C – kompaktowe crossover (np. Mazda CX-30, VW Tiguan)",
    D: "D – średnie crossover (np. BMW X3, Audi Q5)",
    E: "E – duże crossover (np. BMW X5, Volvo XC90)",
    F: "F – premium crossover (np. Mercedes GLS, BMW X7)",
  },
  suv: {
    B: "B – małe SUV (np. Suzuki Jimny, Dacia Duster)",
    C: "C – kompaktowe SUV (np. Toyota RAV4, Hyundai Tucson)",
    D: "D – średnie SUV (np. BMW X3, VW Tiguan Allspace)",
    E: "E – duże SUV (np. BMW X5, Toyota Land Cruiser 150)",
    F: "F – premium SUV (np. BMW X7, Mercedes GLS)",
  },
  terenowy: {
    B: "B – małe terenowe (np. Suzuki Jimny, Lada Niva)",
    C: "C – kompaktowe terenowe (np. Jeep Wrangler 2d, Dacia Duster 4x4)",
    D: "D – średnie terenowe (np. Toyota Land Cruiser Prado, Jeep Wrangler 4d)",
    E: "E – duże terenowe (np. Toyota Land Cruiser 300, Nissan Patrol)",
  },
};

function getSegmentName(segment: Segment, bodyStyle: BodyStyle | null, bodyShapes: BodyShape[]): string {
  for (const shape of bodyShapes) {
    const desc = SHAPE_DESCRIPTIONS[shape]?.[segment];
    if (desc) return desc;
  }
  const styleDesc = STYLE_DESCRIPTIONS[bodyStyle ?? "sedan"]?.[segment];
  if (styleDesc) return styleDesc;
  return segment;
}

const SEGMENT_RANGE: Record<BodyStyle, { min: Segment; max: Segment }> = {
  sportowy: { min: "A", max: "F" },
  sedan: { min: "A", max: "F" },
  van: { min: "B", max: "E" },
  crossover: { min: "A", max: "F" },
  suv: { min: "B", max: "F" },
  terenowy: { min: "B", max: "E" },
};

const SEGMENTS_ORDERED: Segment[] = ["A", "B", "C", "D", "E", "F"];

const SHAPE_SEGMENT_OVERRIDE: Partial<Record<BodyShape, { min: Segment; max: Segment }>> = {
  hatchback: { min: "A", max: "C" },
  sedan: { min: "B", max: "F" },
  kombi: { min: "B", max: "E" },
  liftback: { min: "C", max: "E" },
  coupe: { min: "D", max: "E" },
  pickup: { min: "D", max: "E" },
  "hot-hatch": { min: "A", max: "C" },
  "4door-coupe": { min: "C", max: "E" },
  "sport-sedan": { min: "D", max: "F" },
  "sport-crossover": { min: "B", max: "F" },
  "coupe-2plus2": { min: "B", max: "F" },
  "cabriolet-2plus2": { min: "B", max: "F" },
  "coupe-2": { min: "A", max: "B" },
  "roadster-2": { min: "A", max: "B" },
};

function getSegmentRange(bodyStyle: BodyStyle | null, bodyShapes: BodyShape[]): { min: Segment; max: Segment } {
  if (bodyShapes.length === 0) return SEGMENT_RANGE[bodyStyle ?? "sedan"];
  let minIdx = 5;
  let maxIdx = 0;
  for (const shape of bodyShapes) {
    const range = SHAPE_SEGMENT_OVERRIDE[shape] ?? SEGMENT_RANGE[bodyStyle ?? "sedan"];
    const lo = SEGMENTS_ORDERED.indexOf(range.min);
    const hi = SEGMENTS_ORDERED.indexOf(range.max);
    if (lo < minIdx) minIdx = lo;
    if (hi > maxIdx) maxIdx = hi;
  }
  return { min: SEGMENTS_ORDERED[minIdx], max: SEGMENTS_ORDERED[maxIdx] };
}

function clampSegment(seg: Segment, bodyStyle: BodyStyle | null, bodyShapes: BodyShape[]): Segment {
  const range = getSegmentRange(bodyStyle, bodyShapes);
  const idx = SEGMENTS_ORDERED.indexOf(seg);
  const minIdx = SEGMENTS_ORDERED.indexOf(range.min);
  const maxIdx = SEGMENTS_ORDERED.indexOf(range.max);
  return SEGMENTS_ORDERED[Math.max(minIdx, Math.min(maxIdx, idx))];
}

function calcSegment(a: Answers, longTrips: number): Segment {
  let score = 0;
  if (a.height >= 170) score += a.height - 170;
  score += a.passengers * 10;
  score *= (longTrips + 100) / 100;
  if (a.bodyStyle === "van") score -= 20;

  let seg: Segment;
  if (score <= 20) seg = "A";
  else if (score <= 40) seg = "B";
  else if (score <= 60) seg = "C";
  else if (score <= 80) seg = "D";
  else if (score <= 120) seg = "E";
  else seg = "F";

  return clampSegment(seg, a.bodyStyle, a.bodyShapes);
}

/* ──────────────── power logic ──────────────── */

function calcSuggestedHP(a: Answers, segment: Segment): number {
  const speedFactor = Math.pow(a.maxSpeed / 200, 3) * 2;
  const segmentWeights: Record<Segment, number> = { A: 120, B: 125, C: 135, D: 145, E: 155, F: 165 };
  const bodyMult: Record<BodyStyle, number> = { sportowy: 0.9, sedan: 1, van: 1.25, crossover: 1.2, suv: 1.3, terenowy: 1.5 };
  const weight = segmentWeights[segment] * bodyMult[a.bodyStyle ?? "sedan"];
  let hp = Math.round(weight * speedFactor);
  hp = Math.max(50, Math.min(hp, 1000));
  return hp;
}

/* ───────────────────────── car recommendation types ───────────────────────── */

type FuelType = "benzyna" | "diesel" | "gaz" | "elektryczny";
type EngineLayout = "elektryczny" | "R3" | "R4" | "R5" | "R6" | "V6" | "V8" | "V10" | "V12" | "W12" | "W16";

interface CarVariant {
  engine: string;
  hp: number;
  fuelType: FuelType;
  priceFrom: number;
  priceTo: number;
  fuelCity: number;
  fuelHighway: number;
  engineLayout: EngineLayout;
  engineReliability: number;
  directInjection: boolean;
}

interface CarRecommendation {
  make: string;
  model: string;
  generation: string;
  yearFrom: number;
  yearTo: number;
  pros: string[];
  cons: string[];
  brandReliability: number;
  complexity: number;
  variants: CarVariant[];
}

/* ──────────────── cost calculation (shared with kalkulator) ──────────────── */

const FUEL_PRICES: Record<FuelType, number> = { benzyna: 6.5, diesel: 6.2, gaz: 3.2, elektryczny: 1.5 };
const ENGINE_MULT: Record<EngineLayout, number> = {
  elektryczny: 1, R3: 1, R4: 1, R5: 1.25, R6: 1.5, V6: 1.75,
  V8: 2.25, V10: 2.75, V12: 3.25, W12: 3.5, W16: 4,
};
const FUEL_MULT: Record<FuelType, number> = { benzyna: 1, elektryczny: 1, gaz: 1.2, diesel: 1.6 };
const YEAR_NOW = 2025;
const LAYOUT_CYLINDERS: Record<EngineLayout, number> = {
  elektryczny: 0, R3: 3, R4: 4, R5: 5, R6: 6, V6: 6, V8: 8, V10: 10, V12: 12, W12: 12, W16: 16,
};

function getLpgInstallCost(v: CarVariant): number {
  return LAYOUT_CYLINDERS[v.engineLayout] * 1000 + (v.directInjection ? 4000 : 0);
}

interface CostResult {
  totalCost: number;
  monthly: number;
  costPerKm: number;
  fuelCost: number;
  lostValue: number;
  repairs: number;
  lpgInstallCost: number;
}

function calcVariantCost(car: CarRecommendation, v: CarVariant, kmCity: number, kmHighway: number, yearsOwned: number): CostResult {
  const lpgInstallCost = v.fuelType === "gaz" ? getLpgInstallCost(v) : 0;
  const price = (v.priceFrom + v.priceTo) / 2 - lpgInstallCost;
  const year = Math.round((car.yearFrom + car.yearTo) / 2);
  const mileage = Math.max(1000, (YEAR_NOW - year) * 15000);

  const totalKm = (kmCity + kmHighway) * yearsOwned;

  // Fuel cost: for direct injection LPG, 10% of fuel is benzyna
  let fuelCost: number;
  if (v.fuelType === "gaz" && v.directInjection) {
    const gasConsumption = ((kmCity * v.fuelCity + kmHighway * v.fuelHighway) / 100) * 0.9;
    const benzynaConsumption = ((kmCity * v.fuelCity + kmHighway * v.fuelHighway) / 100) * 0.1;
    fuelCost = (gasConsumption * FUEL_PRICES.gaz + benzynaConsumption * FUEL_PRICES.benzyna) * yearsOwned;
  } else {
    fuelCost = ((kmCity * v.fuelCity + kmHighway * v.fuelHighway) / 100) * FUEL_PRICES[v.fuelType] * yearsOwned;
  }

  const ageStart = YEAR_NOW - year;
  const ageEnd = ageStart + yearsOwned;
  const lostValue = price * (1.05 - (ageStart + 6) / (ageEnd + 6));

  const averageKm = (totalKm + 2 * mileage) / 2;
  const brandFactor =
    (car.complexity + 1) *
    (averageKm < 200000
      ? Math.max(0, car.brandReliability - (car.brandReliability - 1) * ((200000 - averageKm) / 200000))
      : car.brandReliability);
  const engineFactor =
    (averageKm < 300000
      ? Math.max(0, v.engineReliability - (v.engineReliability - 1) * ((300000 - averageKm) / 300000))
      : v.engineReliability) *
    ENGINE_MULT[v.engineLayout] * FUEL_MULT[v.fuelType];
  const reliabilityFactor = (brandFactor + engineFactor) / 50;
  const totalKmCity = kmCity * yearsOwned;
  const totalKmHighway = kmHighway * yearsOwned;
  const weightedKm = totalKmCity * 2 + totalKmHighway;
  const repairs = reliabilityFactor * weightedKm;

  const totalCost = fuelCost + repairs + lostValue + lpgInstallCost;
  const monthly = totalCost / (12 * yearsOwned);
  const costPerKm = totalKm > 0 ? totalCost / totalKm : 0;

  return { totalCost, monthly, costPerKm, fuelCost, lostValue, repairs, lpgInstallCost };
}

interface AgeCategory {
  ageLabel: string;
  ageFrom: number;
  ageTo: number;
  cars: CarRecommendation[];
}

interface RecommendResult {
  categories: AgeCategory[];
}

/* ──────────────── auto-selection ──────────────── */

const SHAPE_RELEVANT_KEYS: (keyof Answers)[] = ["luggageFreq", "foldSeats"];

function getRecommendedShapes(style: BodyStyle | null, a: Answers): BodyShape[] {
  switch (style) {
    case "sedan": {
      if (a.luggageFreq > 60 || a.foldSeats) return ["kombi"];
      if (a.luggageFreq > 30) return ["liftback", "kombi"];
      return ["hatchback", "sedan"];
    }
    case "sportowy": {
      if (a.luggageFreq <= 25) return ["coupe-2", "roadster-2"];
      if (a.luggageFreq <= 55) return ["coupe-2plus2", "cabriolet-2plus2"];
      if (a.luggageFreq <= 75) return ["4door-coupe", "sport-sedan"];
      return ["hot-hatch", "sport-crossover"];
    }
    case "crossover":
    case "suv":
      return ["standard"];
    case "terenowy":
      return ["standard"];
    default:
      return [];
  }
}

/* ──────────────── slider component ──────────────── */

function Slider({
  label, value, min, max, step, unit, hint, onChange, labels,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  hint?: string;
  onChange: (v: number) => void;
  labels?: { left: string; right: string };
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className="text-sm font-semibold text-accent tabular-nums">
          {value}{unit && <span className="text-gray-400 font-normal"> {unit}</span>}
        </span>
      </div>
      <div className="relative group">
        <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
          <div className="h-2 rounded-full bg-accent transition-all" style={{ width: `${pct}%` }} />
        </div>
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-accent shadow-md pointer-events-none transition-all"
          style={{ left: `calc(${pct}% - 10px)` }}
        />
      </div>
      {labels && (
        <div className="flex justify-between text-[11px] text-gray-400 dark:text-gray-500">
          <span>{labels.left}</span>
          <span>{labels.right}</span>
        </div>
      )}
      {hint && <p className="text-xs text-gray-400 dark:text-gray-500">{hint}</p>}
    </div>
  );
}

/* ──────────────── log slider ──────────────── */

function LogSlider({
  label, value, min, max, unit, onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  const logMin = Math.log(min);
  const logMax = Math.log(max);
  const pct = ((Math.log(value) - logMin) / (logMax - logMin)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = Number(e.target.value) / 1000;
    const val = Math.round(Math.exp(logMin + raw * (logMax - logMin)));
    onChange(Math.max(min, Math.min(max, val)));
  };

  const sliderVal = ((Math.log(value) - logMin) / (logMax - logMin)) * 1000;

  const fmt = (n: number) => n.toLocaleString("pl-PL");

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className="text-sm font-semibold text-accent tabular-nums">
          {fmt(value)}{unit && <span className="text-gray-400 font-normal"> {unit}</span>}
        </span>
      </div>
      <div className="relative group">
        <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
          <div className="h-2 rounded-full bg-accent transition-all" style={{ width: `${pct}%` }} />
        </div>
        <input
          type="range" min={0} max={1000} step={1} value={sliderVal}
          onChange={handleChange}
          className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-accent shadow-md pointer-events-none transition-all"
          style={{ left: `calc(${pct}% - 10px)` }}
        />
      </div>
    </div>
  );
}

/* ──────────────── card selector ──────────────── */

function CardSelector<T extends string>({
  options, value, onChange, multiple,
}: {
  options: { id: T; title: string; image: string; pros: string[]; cons: string[]; note?: React.ReactNode }[];
  value: T | T[] | null;
  onChange: (v: T) => void;
  multiple?: boolean;
}) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {options.map((opt) => {
        const selected = multiple
          ? Array.isArray(value) && value.includes(opt.id)
          : value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`flex flex-col text-left rounded-2xl border-2 transition-all overflow-hidden ${
              selected
                ? "border-accent shadow-md ring-1 ring-accent/30"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            <div className="relative w-full h-44 sm:h-36 shrink-0 bg-gray-100 dark:bg-gray-800">
              <Image
                src={opt.image}
                alt={opt.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                unoptimized
              />
              {selected && <div className="absolute inset-0 bg-accent/10" />}
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <span className={`font-semibold text-sm ${selected ? "text-accent" : "text-gray-900 dark:text-white"}`}>
                {opt.title}
              </span>
              <div className="mt-2 space-y-1 text-xs flex-1">
                {opt.pros.map((p) => (
                  <div key={p} className="flex gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <span className="shrink-0">+</span><span>{p}</span>
                  </div>
                ))}
                {opt.cons.map((c) => (
                  <div key={c} className="flex gap-1.5 text-red-500 dark:text-red-400">
                    <span className="shrink-0">−</span><span>{c}</span>
                  </div>
                ))}
              </div>
              {opt.note && (
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 text-xs text-amber-600 dark:text-amber-400">
                  {opt.note}
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ──────────────── body style options ──────────────── */

const IMG = "/photos/car-chooser";

const BG_IMAGES: Record<BodyStyle, { light: string; dark: string }> = {
  sportowy:  { light: `${IMG}/bg-sport-light.jpg`,      dark: `${IMG}/bg-sport-dark.webp` },
  sedan:     { light: `${IMG}/bg-osobowy-light.webp`,    dark: `${IMG}/bg-osobowy-dark.jpg` },
  van:       { light: `${IMG}/bg-van-light.webp`,        dark: `${IMG}/bg-van-dark.jpg` },
  crossover: { light: `${IMG}/bg-crossover-light.webp`,  dark: `${IMG}/bg-crossover-dark.jpg` },
  suv:       { light: `${IMG}/bg-suv-light.webp`,        dark: `${IMG}/bg-suv-dark.jpeg` },
  terenowy:  { light: `${IMG}/bg-terenowy-light.webp`,   dark: `${IMG}/bg-terenowy-dark.avif` },
};

const BODY_STYLES: {
  id: BodyStyle; title: string; image: string; pros: string[]; cons: string[]; note?: React.ReactNode;
}[] = [
  {
    id: "sportowy",
    title: "Sportowy / Coupé",
    image: `${IMG}/type-sport.webp`,
    pros: ["Niski środek ciężkości", "Doskonałe prowadzenie i reakcje", "Atrakcyjny wygląd"],
    cons: ["Mało miejsca dla pasażerów", "Niska – trudniej wsiadać/wysiadać", "Mały bagażnik"],
  },
  {
    id: "sedan",
    title: "Osobowy",
    image: `${IMG}/type-osobowy.jpg`,
    pros: ["Uniwersalny – sprawdzi się wszędzie", "Dobry komfort na trasie", "Rozsądna cena i spalanie"],
    cons: ["Niska pozycja za kierownicą"],
  },
  {
    id: "van",
    title: "Van",
    image: `${IMG}/type-van.jpeg`,
    pros: ["Doskonała funkcjonalność", "Optymalne wykorzystanie przestrzeni"],
    cons: ["Wyższe spalanie niż osobowy", "Gorsze prowadzenie – wysoki środek ciężkości"],
  },
  {
    id: "crossover",
    title: "Crossover",
    image: `${IMG}/type-crossover.webp`,
    pros: ["Wyższa pozycja – lepsza widoczność", "Wygodne wsiadanie/wysiadanie", "Wyższe zawieszenie niż w osobowym"],
    cons: ["Wyższa cena i spalanie niż osobowy", "Gorsze prowadzenie niż niski samochód", "Gorsze osiągi"],
  },
  {
    id: "suv",
    title: "SUV",
    image: `${IMG}/type-suv.jpg`,
    pros: ["Wyższa pozycja – lepsza widoczność", "Wygodne wsiadanie/wysiadanie", "Podstawowe zdolności terenowe"],
    cons: ["Wysokie spalanie i cena", "Gorsze prowadzenie – wysoki środek ciężkości", "Gorsze osiągi"],
    note: (<>SUV-y i crossovery mają w większości pokrywający się wybór modeli. <strong>Sugerujemy wybór SUV-a wyłącznie jeśli planujesz zjeżdżać z asfaltu</strong> – w przeciwnym razie crossover będzie lepszym wyborem.</>),
  },
  {
    id: "terenowy",
    title: "Terenowy / Off-road",
    image: `${IMG}/type-terenowy.webp`,
    pros: ["Prawdziwy napęd 4x4 z reduktorem", "Duży prześwit i możliwości terenowe", "Wytrzymała konstrukcja"],
    cons: ["Bardzo wysokie spalanie", "Słabe prowadzenie na asfalcie", "Drogi w zakupie i utrzymaniu", "Parkowanie to wyzwanie"],
  },
];

/* ──────────────── body shape options ──────────────── */

type ShapeOption = { id: BodyShape; title: string; image: string; pros: string[]; cons: string[] };

const SHAPES_STANDARD: ShapeOption[] = [
  {
    id: "hatchback", title: "Hatchback", image: `${IMG}/shape-hatchback.jpg`,
    pros: ["Kompaktowy – idealny do miasta", "Uchylna klapa – łatwy załadunek", "Niższa cena od sedana/kombi"],
    cons: ["Mniej miejsca na bagaże niż kombi", "Hałas z bagażnika dochodzi do kabiny"],
  },
  {
    id: "sedan", title: "Sedan", image: `${IMG}/shape-sedan.webp`,
    pros: ["Cichsza kabina – bagażnik oddzielony", "Elegancki wygląd", "Dobra aerodynamika"],
    cons: ["Mały otwór załadunkowy", "Nie przewieziesz dużych przedmiotów", "Nie złożysz siedzeń tak łatwo"],
  },
  {
    id: "kombi", title: "Kombi", image: `${IMG}/shape-kombi.webp`,
    pros: ["Ogromny bagażnik – idealny na rodzinę", "Łatwo składane tylne siedzenia", "Niska krawędź załadunku"],
    cons: ["Dłuższy – trudniej parkować", "Zwykle trochę droższy", "Hałas z bagażnika"],
  },
  {
    id: "liftback", title: "Liftback", image: `${IMG}/shape-liftback.webp`,
    pros: ["Wygląd sedana + praktyczność hatchbacka", "Duży otwór bagażnika", "Świetna aerodynamika"],
    cons: ["Mniej popularny – mniejszy wybór", "Cena bliżej sedana niż hatchbacka"],
  },
];

const SHAPES_SPORT: ShapeOption[] = [
  {
    id: "coupe-2", title: "Coupé 2-osobowe", image: `${IMG}/shape-coupe-2.avif`,
    pros: ["Najlepsza dynamika i prowadzenie", "Niska masa – świetne osiągi", "Najniższy środek ciężkości"],
    cons: ["Tylko 2 miejsca", "Minimalny bagażnik", "Niska praktyczność na co dzień"],
  },
  {
    id: "roadster-2", title: "Roadster 2-osobowy", image: `${IMG}/shape-roadster-2.webp`,
    pros: ["Otwarte nadwozie – jazda z wiatrem", "Lekki – świetne prowadzenie", "Wyjątkowe doznania z jazdy"],
    cons: ["Mniej sztywna konstrukcja niż coupé", "Brak praktyczności", "Wrażliwy na pogodę"],
  },
  {
    id: "coupe-2plus2", title: "Coupé 2+2", image: `${IMG}/shape-coupe-2plus2.jpg`,
    pros: ["Sportowy charakter + awaryjne tylne miejsca", "Kompromis między stylem a użytecznością", "Dobra aerodynamika"],
    cons: ["Tylne miejsca ciasne – raczej dla dzieci", "Mały bagażnik", "Droższe od standardowego coupé"],
  },
  {
    id: "cabriolet-2plus2", title: "Cabriolet 2+2", image: `${IMG}/shape-cabriolet-2plus2.avif`,
    pros: ["Otwarte nadwozie + 4 miejsca", "Elegancki wygląd", "Większa praktyczność niż roadster"],
    cons: ["Cięższy od roadsterów – gorsza dynamika", "Drogi w zakupie i utrzymaniu", "Tylne miejsca nadal ciasne"],
  },
  {
    id: "hot-hatch", title: "Hot Hatch", image: `${IMG}/shape-hot-hatch.jpg`,
    pros: ["Praktyczność hatchbacka + sportowe osiągi", "5 miejsc i użyteczny bagażnik", "Świetny do codziennej jazdy"],
    cons: ["Wyższy środek ciężkości niż coupé", "Twarde zawieszenie – mniej komfortu", "Wyższe ubezpieczenie"],
  },
  {
    id: "4door-coupe", title: "4-door Coupé", image: `${IMG}/shape-4door-coupe.webp`,
    pros: ["Sportowa sylwetka + 4 drzwi", "Wygodne wsiadanie do tyłu", "Elegancki kompromis"],
    cons: ["Mniej miejsca nad głową z tyłu", "Mniejszy bagażnik niż sedan", "Wyższa cena od sedana"],
  },
  {
    id: "sport-sedan", title: "Sedan sportowy", image: `${IMG}/shape-sport-sedan.webp`,
    pros: ["4 drzwi i pełne 5 miejsc", "Duży bagażnik", "Sportowy charakter w praktycznym nadwoziu"],
    cons: ["Cięższy od coupé – gorsze prowadzenie", "Mniej wyrazisty wygląd", "Wyższe spalanie niż zwykły sedan"],
  },
  {
    id: "sport-crossover", title: "Crossover sportowy", image: `${IMG}/shape-sport-crossover.webp`,
    pros: ["Wyższa pozycja + sportowe osiągi", "Dobra widoczność i przestronność", "Modny segment – duży wybór"],
    cons: ["Najgorsze prowadzenie z opcji sportowych", "Wysokie spalanie", "Wysoki środek ciężkości"],
  },
];

const SHAPES_CROSSOVER_SUV: ShapeOption[] = [
  {
    id: "standard", title: "Zwykły", image: `${IMG}/shape-standard.webp`,
    pros: ["Więcej miejsca w bagażniku", "Lepsza widoczność do tyłu", "Większy wybór modeli"],
    cons: ["Mniej dynamiczny wygląd"],
  },
  {
    id: "coupe", title: "Coupé (ścięty tył)", image: `${IMG}/shape-coupe.avif`,
    pros: ["Sportowa sylwetka", "Lepsza aerodynamika", "Wyróżnia się na drodze"],
    cons: ["Mniejszy bagażnik", "Gorsza widoczność do tyłu", "Wyższa cena"],
  },
];

const SHAPES_TERENOWY: ShapeOption[] = [
  {
    id: "standard", title: "Zwykły", image: `${IMG}/shape-terenowy-standard.avif`,
    pros: ["Zamknięte nadwozie – ochrona bagażu", "Komfort pasażerów z tyłu", "Lepsze wyciszenie kabiny"],
    cons: ["Mniejsza ładowność niż pick-up"],
  },
  {
    id: "pickup", title: "Pick-up", image: `${IMG}/shape-pickup.webp`,
    pros: ["Otwarta skrzynia ładunkowa", "Ogromna ładowność", "Idealny do ciężkiej pracy"],
    cons: ["Bagaż narażony na pogodę", "Bardzo duże gabaryty", "Wysokie spalanie"],
  },
];

function getBodyShapes(bodyStyle: BodyStyle | null): ShapeOption[] {
  switch (bodyStyle) {
    case "sportowy": return SHAPES_SPORT;
    case "crossover":
    case "suv": return SHAPES_CROSSOVER_SUV;
    case "terenowy": return SHAPES_TERENOWY;
    default: return SHAPES_STANDARD;
  }
}

/* ──────────────── donut chart ──────────────── */

function DonutChart({ segments }: { segments: { value: number; color: string; label: string }[] }) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  if (total === 0) return null;
  const r = 36;
  const cx = 50;
  const cy = 50;
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  return (
    <svg viewBox="0 0 100 100" className="w-28 h-28 shrink-0">
      {segments.filter((s) => s.value > 0).map((seg, i) => {
        const pct = seg.value / total;
        const dashArray = `${circumference * pct} ${circumference * (1 - pct)}`;
        const currentOffset = -circumference * offset;
        offset += pct;
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth="14"
            strokeDasharray={dashArray}
            strokeDashoffset={currentOffset}
            transform={`rotate(-90 ${cx} ${cy})`}
            className="transition-all duration-500"
          />
        );
      })}
    </svg>
  );
}

/* ──────────────── variant description ──────────────── */

function getVariantDesc(car: CarRecommendation, v: CarVariant, long: boolean): string {
  // Model-specific characteristics from LLM (emotional, unique to this car)
  const desc = car.pros.join(". ");

  // Brief fuel-specific note
  const fuelNote: Record<FuelType, string> = {
    benzyna: "",
    diesel: "Wersja diesel — idealny kompan na długie trasy",
    gaz: `Na gazie — paliwo za ${FUEL_PRICES.gaz} PLN/L, realna oszczędność przy każdym tankowaniu`,
    elektryczny: "Napęd elektryczny — cicha, dynamiczna jazda bez wizyt na stacji",
  };

  const parts = [desc, fuelNote[v.fuelType]].filter(Boolean);

  if (long && car.cons.length > 0) {
    parts.push("Na co uważać: " + car.cons.join("; "));
  }

  return parts.join(". ") + ".";
}

const COST_COLORS = {
  fuel: "#f59e0b",
  depreciation: "#6366f1",
  repairs: "#ef4444",
  lpg: "#10b981",
};

/* ──────────────── steps config ──────────────── */

function getStepConfig(bodyStyle: BodyStyle | null) {
  const hasShapeStep = bodyStyle !== "van";
  const titles = hasShapeStep
    ? ["Typ samochodu", "Forma nadwozia", "Segment i moc", "Budżet i przebiegi", "Wyniki"]
    : ["Typ samochodu", "Segment i moc", "Budżet i przebiegi", "Wyniki"];
  return { titles, hasShapeStep };
}

/* ──────────────── main component ──────────────── */

export default function CarConfigurator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [loadingElapsed, setLoadingElapsed] = useState(0);
  const loadingTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const [error, setError] = useState("");
  const [results, setResults] = useState<RecommendResult | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<number>(0);
  const [costsMap, setCostsMap] = useState<Map<string, CostResult>>(new Map());
  const [selectedVariants, setSelectedVariants] = useState<Map<string, number>>(new Map());
  const [extendedSearch, setExtendedSearch] = useState(false);

  useEffect(() => {
    if (loading) {
      setLoadingElapsed(0);
      loadingTimer.current = setInterval(() => setLoadingElapsed((s) => s + 1), 1000);
    } else {
      if (loadingTimer.current) clearInterval(loadingTimer.current);
    }
    return () => { if (loadingTimer.current) clearInterval(loadingTimer.current); };
  }, [loading]);

  const { titles: stepTitles, hasShapeStep } = getStepConfig(answers.bodyStyle);
  const lastStep = stepTitles.length - 1;

  const set = <K extends keyof Answers>(key: K, val: Answers[K]) =>
    setAnswers((prev) => {
      const next = { ...prev, [key]: val };
      if (key === "bodyStyle" && val !== prev.bodyStyle) {
        if (val !== "van" && next.passengers > 5) next.passengers = 5;
        next.bodyShapes = [];
        next.luggageFreq = 30;
        next.foldSeats = false;
      }
      if (SHAPE_RELEVANT_KEYS.includes(key as keyof Answers) || (key === "bodyStyle" && val !== prev.bodyStyle)) {
        next.bodyShapes = getRecommendedShapes(next.bodyStyle, next);
      }
      return next;
    });

  const longTrips = useMemo(() => {
    const total = answers.kmCity + answers.kmHighway;
    return total > 0 ? Math.round((answers.kmHighway / total) * 100) : 30;
  }, [answers.kmCity, answers.kmHighway]);

  const suggestedSegment = useMemo(() => calcSegment(answers, longTrips), [answers, longTrips]);
  const segment = answers.segmentOverride
    ? clampSegment(answers.segmentOverride, answers.bodyStyle, answers.bodyShapes)
    : suggestedSegment;
  const suggestedHP = useMemo(() => calcSuggestedHP(answers, segment), [answers, segment]);
  const displayHP = answers.powerOverride ?? suggestedHP;

  const canNext = (): boolean => {
    if (step === 0 && !answers.bodyStyle) return false;
    if (hasShapeStep && step === 1 && answers.bodyShapes.length === 0) return false;
    return true;
  };

  const fetchRecommendations = async () => {
    setLoading(true);
    setError("");
    setResults(null);
    setCostsMap(new Map());
    try {
      const res = await fetch("/api/car-recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          budget: answers.budget,
          bodyStyle: answers.bodyStyle,
          bodyShapes: answers.bodyShapes,
          passengers: answers.passengers,
          longTrips,
          height: answers.height,
          segment,
          hp: displayHP,
          additionalInfo: answers.additionalInfo,
          extended: extendedSearch,
        }),
      });
      if (!res.ok) {
        setError("Nie udało się pobrać rekomendacji");
        return;
      }
      const data: RecommendResult = await res.json();
      const budget = answers.budget;
      const minHP = displayHP;
      const currentYear = new Date().getFullYear();

      // 1. Collect all cars from all LLM categories into a flat pool
      const allCars: CarRecommendation[] = [];
      for (const cat of data.categories) {
        console.log(`[DEBUG] LLM category "${cat.ageLabel}": ${cat.cars.length} cars`);
        for (const car of cat.cars) {
          console.log(`  ${car.make} ${car.model} ${car.generation} yearFrom=${car.yearFrom} yearTo=${car.yearTo} variants=${car.variants.length}`);
          allCars.push(car);
        }
      }

      // 1b. Fix directInjection based on engine name — LLM often gets this wrong
      const DI_TRUE_PATTERN = /FSI|FSE|TSI|TFSI|GDI|T-GDI|D-4|Skyactiv-G/i;
      const DI_FALSE_PATTERN = /MPI/i;
      for (const car of allCars) {
        for (const v of car.variants) {
          if (v.fuelType !== "benzyna") continue;
          if (DI_TRUE_PATTERN.test(v.engine) && !v.directInjection) {
            console.log(`[FIX] directInjection: false→true for ${car.make} ${car.model} ${v.engine}`);
            v.directInjection = true;
          } else if (DI_FALSE_PATTERN.test(v.engine) && v.directInjection) {
            console.log(`[FIX] directInjection: true→false for ${car.make} ${car.model} ${v.engine}`);
            v.directInjection = false;
          }
        }
      }

      // 2. Process each car: filter variants, generate LPG, deduplicate
      const rearEngineModels = ["911", "cayman", "boxster", "a110", "elise", "exige", "emira"];
      const noLpg = answers.bodyShapes.some((s) => s === "coupe-2" || s === "roadster-2");
      for (const car of allCars) {
        const beforeFilter = car.variants.length;
        car.variants = car.variants.filter((v) => v.hp >= minHP && v.priceFrom <= budget);
        if (car.variants.length === 0 && beforeFilter > 0) {
          console.log(`[DEBUG] ALL variants filtered for ${car.make} ${car.model} (had ${beforeFilter}, minHP=${minHP}, budget=${budget})`);
        }
        const isRearEngine = rearEngineModels.some((m) => car.model.toLowerCase().includes(m));
        if (!noLpg && !isRearEngine) {
          const lpgVariants: CarVariant[] = [];
          for (const v of car.variants) {
            const cylinders = LAYOUT_CYLINDERS[v.engineLayout];
            if (v.fuelType === "benzyna" && cylinders > 0 && v.hp / cylinders <= 75) {
              const lpgCost = getLpgInstallCost(v);
              lpgVariants.push({
                ...v,
                engine: v.engine + " + LPG",
                fuelType: "gaz",
                priceFrom: v.priceFrom + lpgCost,
                priceTo: v.priceTo + lpgCost,
                fuelCity: Math.round(v.fuelCity * 1.12 * 10) / 10,
                fuelHighway: Math.round(v.fuelHighway * 1.12 * 10) / 10,
              });
            }
          }
          for (const lv of lpgVariants) {
            if (lv.priceFrom <= budget) car.variants.push(lv);
          }
        }
        const bestByFuel = new Map<FuelType, CarVariant>();
        for (const v of car.variants) {
          const existing = bestByFuel.get(v.fuelType);
          if (!existing || v.priceFrom < existing.priceFrom) bestByFuel.set(v.fuelType, v);
        }
        car.variants = [...bestByFuel.values()];
      }

      // 3. Define age categories on frontend — ignore LLM assignment
      const AGE_BUCKETS: { label: string; from: number; to: number }[] = [
        { label: "Nowe", from: 0, to: 1 },
        { label: "Do 3 lat", from: 0, to: 3 },
        { label: "3-7 lat", from: 3, to: 7 },
        { label: "7-12 lat", from: 7, to: 12 },
        { label: "12-18 lat", from: 12, to: 18 },
        { label: "Powyżej 18 lat", from: 18, to: 0 },
      ];

      // 4. Assign each car to the correct bucket based on yearTo (newest examples)
      console.log(`[DEBUG] Cars with variants after filtering: ${allCars.filter(c => c.variants.length > 0).length}/${allCars.length}`);
      for (const car of allCars.filter(c => c.variants.length > 0)) {
        const age = currentYear - car.yearTo;
        console.log(`[DEBUG] ${car.make} ${car.model} yearTo=${car.yearTo} age=${age}`);
      }
      const newCategories: AgeCategory[] = [];
      for (const bucket of AGE_BUCKETS) {
        const seen = new Set<string>();
        const cars: CarRecommendation[] = [];
        for (const car of allCars) {
          if (car.variants.length === 0) continue;
          const age = currentYear - car.yearTo;
          const fits = age >= bucket.from && (bucket.to === 0 || age < bucket.to);
          if (!fits) continue;
          const key = `${car.make} ${car.model}`.toLowerCase();
          if (seen.has(key)) continue;
          seen.add(key);
          cars.push(car);
        }
        if (cars.length > 0) {
          newCategories.push({ ageLabel: bucket.label, ageFrom: bucket.from, ageTo: bucket.to, cars });
        }
      }
      data.categories = newCategories;
      // Auto-calculate costs
      const mult = KM_MULTIPLIER[answers.kmPeriod];
      const annualCity = answers.kmCity * mult;
      const annualHighway = answers.kmHighway * mult;
      const map = new Map<string, CostResult>();
      for (let ci = 0; ci < data.categories.length; ci++) {
        for (let carI = 0; carI < data.categories[ci].cars.length; carI++) {
          const car = data.categories[ci].cars[carI];
          for (let vi = 0; vi < car.variants.length; vi++) {
            map.set(`${ci}-${carI}-${vi}`, calcVariantCost(car, car.variants[vi], annualCity, annualHighway, answers.yearsOwned));
          }
        }
      }
      setCostsMap(map);
      setResults(data);
      setExpandedCategory(0);
      setSelectedVariants(new Map());
    } catch {
      setError("Nie udało się połączyć z serwerem");
    } finally {
      setLoading(false);
    }
  };

  const fmt = (n: number) => n.toLocaleString("pl-PL");

  /* ──── render: step 0 = body style ──── */

  const renderStep0 = () => (
    <div className="space-y-8">
      <div className="rounded-2xl bg-accent/5 dark:bg-accent/10 border border-accent/20 p-6">
        <h3 className="text-sm font-semibold text-accent mb-2">
          Jaki typ samochodu do Ciebie pasuje?
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Każdy typ ma swoje zalety i wady. Kliknij kartę, która najlepiej
          odpowiada Twoim potrzebom.
        </p>
      </div>
      <CardSelector<BodyStyle>
        options={BODY_STYLES}
        value={answers.bodyStyle}
        onChange={(v) => set("bodyStyle", v)}
      />
    </div>
  );

  /* ──── render: step 1 = body shape ──── */

  const renderStep1 = () => {
    const style = answers.bodyStyle;
    return (
      <div className="space-y-8">
        {style === "sedan" && (
          <>
            <div className="rounded-2xl bg-accent/5 dark:bg-accent/10 border border-accent/20 p-6">
              <h3 className="text-sm font-semibold text-accent mb-2">Jaka forma nadwozia?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Odpowiedz na pytania poniżej, a automatycznie podpowiemy najlepsze nadwozia.
              </p>
            </div>
            <Slider
              label="Jak często przewozisz dużo bagaży?"
              value={answers.luggageFreq} min={0} max={100} step={5}
              onChange={(v) => set("luggageFreq", v)}
              labels={{ left: "📱 Prawie nigdy", right: "📦 Bardzo często" }}
            />
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => set("foldSeats", !answers.foldSeats)}
                className={`relative w-12 h-7 rounded-full transition-colors ${answers.foldSeats ? "bg-accent" : "bg-gray-300 dark:bg-gray-600"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${answers.foldSeats ? "translate-x-5" : ""}`} />
              </button>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Potrzebuję składanych tylnych siedzeń
              </span>
            </div>
          </>
        )}

        {style === "sportowy" && (
          <>
            <div className="rounded-2xl bg-accent/5 dark:bg-accent/10 border border-accent/20 p-6">
              <h3 className="text-sm font-semibold text-accent mb-2">Jaki rodzaj nadwozia sportowego?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Przesuń suwak, żeby określić ile funkcjonalności potrzebujesz.
              </p>
            </div>
            <Slider
              label="Ile funkcjonalności potrzebujesz?"
              value={answers.luggageFreq} min={0} max={100} step={5}
              onChange={(v) => set("luggageFreq", v)}
              labels={{ left: "🏎️ Minimum – czysta jazda", right: "🧳 Maximum – codzienny samochód" }}
            />
          </>
        )}

        {(style === "crossover" || style === "suv" || style === "terenowy") && (
          <div className="rounded-2xl bg-accent/5 dark:bg-accent/10 border border-accent/20 p-6">
            <h3 className="text-sm font-semibold text-accent mb-2">
              {style === "terenowy" ? "Zamknięte nadwozie czy pick-up?" : "Zwykły czy coupé?"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Domyślnie zaznaczono zwykłe nadwozie. Możesz zaznaczyć lub odznaczyć dowolne opcje.
            </p>
          </div>
        )}

        <CardSelector<BodyShape>
          options={getBodyShapes(answers.bodyStyle)}
          value={answers.bodyShapes}
          multiple
          onChange={(v) =>
            set("bodyShapes",
              answers.bodyShapes.includes(v)
                ? answers.bodyShapes.filter((s) => s !== v)
                : [...answers.bodyShapes, v],
            )
          }
        />
      </div>
    );
  };

  /* ──── render: segment & power (combined) ──── */

  const renderSegmentAndPower = () => (
    <div className="space-y-10">
      {/* Segment info */}
      <div className="rounded-2xl bg-accent/5 dark:bg-accent/10 border border-accent/20 p-6">
        <h3 className="text-sm font-semibold text-accent mb-2">Segment i moc</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Odpowiedz na pytania, a dobierzemy optymalny segment i moc. Możesz je potem skorygować ręcznie.
        </p>
      </div>

      {/* Sliders for segment */}
      <div className="space-y-8">
        <Slider label="Twój wzrost" value={answers.height} min={150} max={210} step={1} unit="cm"
          hint="Wyższe osoby mogą potrzebować większego segmentu dla komfortu."
          onChange={(v) => set("height", v)} />
        <Slider label="Typowa liczba pasażerów (z kierowcą)" value={answers.passengers}
          min={1} max={answers.bodyStyle === "van" ? 8 : 5} step={1} unit="os."
          hint="Ile osób jednocześnie przewozisz najczęściej?"
          onChange={(v) => set("passengers", v)} />
      </div>

      {/* Km przebiegi – wpływają na segment */}
      <div className="space-y-8">
        <div className="space-y-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Przebiegi podaję</span>
          <div className="flex gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-800 w-fit">
            {(["dzien", "tydzien", "miesiac", "rok"] as KmPeriod[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  if (p === answers.kmPeriod) return;
                  const from = KM_MULTIPLIER[answers.kmPeriod];
                  const to = KM_MULTIPLIER[p];
                  const ratio = from / to;
                  set("kmPeriod", p);
                  set("kmCity", Math.max(1, Math.round(answers.kmCity * ratio)));
                  set("kmHighway", Math.max(1, Math.round(answers.kmHighway * ratio)));
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  answers.kmPeriod === p
                    ? "bg-white dark:bg-gray-700 text-accent shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {KM_PERIOD_LABELS[p]}
              </button>
            ))}
          </div>
        </div>

        <LogSlider label={`Km w mieście (${KM_PERIOD_LABELS[answers.kmPeriod]})`} value={answers.kmCity} min={1} max={Math.round(100000 / KM_MULTIPLIER[answers.kmPeriod])} unit="km"
          onChange={(v) => set("kmCity", v)} />
        <LogSlider label={`Km w trasie (${KM_PERIOD_LABELS[answers.kmPeriod]})`} value={answers.kmHighway} min={1} max={Math.round(100000 / KM_MULTIPLIER[answers.kmPeriod])} unit="km"
          onChange={(v) => set("kmHighway", v)} />
      </div>

      {/* Segment result */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
            {(answers.bodyShapes.includes("coupe-2") || answers.bodyShapes.includes("roadster-2")) ? "Sugerowana ilość miejsca" : "Sugerowany segment"}
          </p>
          <p className="text-2xl font-bold text-accent">{getSegmentName(suggestedSegment, answers.bodyStyle, answers.bodyShapes)}</p>
        </div>
        <div className="space-y-2">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Możesz wybrać inny segment:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {SEGMENTS_ORDERED.filter((s) => {
              const range = getSegmentRange(answers.bodyStyle, answers.bodyShapes);
              const idx = SEGMENTS_ORDERED.indexOf(s);
              return idx >= SEGMENTS_ORDERED.indexOf(range.min) && idx <= SEGMENTS_ORDERED.indexOf(range.max);
            }).map((s) => {
              const isActive = segment === s;
              const isSuggested = suggestedSegment === s && !answers.segmentOverride;
              return (
                <button key={s} type="button"
                  onClick={() => set("segmentOverride", s === suggestedSegment ? null : s)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                    isActive ? "border-accent bg-accent/10 text-accent" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
                  } ${isSuggested ? "ring-2 ring-accent/30" : ""}`}
                >{s}</button>
              );
            })}
          </div>
          {answers.segmentOverride && (
            <p className="text-center">
              <button type="button" onClick={() => set("segmentOverride", null)} className="text-xs text-accent hover:underline">
                Przywróć sugerowany ({suggestedSegment})
              </button>
            </p>
          )}
        </div>
      </div>

      {/* Power */}
      <div className="space-y-8">
        <Slider label="Maksymalna prędkość, z jaką jeździsz regularnie"
          value={answers.maxSpeed} min={100} max={250} step={10} unit="km/h"
          onChange={(v) => { set("maxSpeed", v); set("powerOverride", null); }}
          labels={{ left: "🏙️ 80 km/h – miasto", right: "🏁 240 km/h – autostrada DE" }} />

        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center space-y-1">
          <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">Sugerowana moc</p>
          <p className="text-3xl font-bold text-accent tabular-nums">{suggestedHP} KM</p>
          <p className="text-xs text-gray-500">
            Dla segmentu {segment}, {BODY_STYLES.find((b) => b.id === answers.bodyStyle)?.title ?? "—"}, {answers.maxSpeed} km/h
          </p>
        </div>

        <Slider label="Twoja korekta mocy" value={displayHP} min={50} max={700} step={5} unit="KM"
          onChange={(v) => set("powerOverride", v)}
          hint="Przesuń, jeśli chcesz więcej lub mniej mocy niż sugerujemy." />
      </div>
    </div>
  );

  /* ──── render: budget & usage ──── */

  const renderPreferences = () => (
    <div className="space-y-10">
      <div className="rounded-2xl bg-accent/5 dark:bg-accent/10 border border-accent/20 p-6">
        <h3 className="text-sm font-semibold text-accent mb-2">Budżet i użytkowanie</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          AI dobierze modele do Twojego budżetu. Podaj planowany okres użytkowania, żeby wyliczyć koszty posiadania.
        </p>
      </div>

      <LogSlider label="Budżet" value={answers.budget} min={5000} max={500000} unit="PLN"
        onChange={(v) => set("budget", v)} />

      <div className="space-y-8">
        <Slider label="Planowany okres użytkowania" value={answers.yearsOwned} min={1} max={20} step={1} unit="lat"
          onChange={(v) => set("yearsOwned", v)} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Dodatkowe wymagania <span className="text-gray-400 font-normal">(opcjonalnie)</span>
        </label>
        <textarea
          value={answers.additionalInfo}
          onChange={(e) => set("additionalInfo", e.target.value)}
          placeholder="np. automat, napęd 4x4, niskie spalanie, hybryda, niezawodny silnik..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent resize-none"
        />
      </div>

      <label className="flex items-center gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={extendedSearch}
          onChange={(e) => setExtendedSearch(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-accent focus:ring-accent/50"
        />
        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
          Rozszerzone wyszukiwanie <span className="text-gray-400 font-normal">(więcej modeli, dłuższe oczekiwanie)</span>
        </span>
      </label>

      {/* Summary */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-3">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Podsumowanie</h3>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <SummaryRow label="Budżet" value={`${fmt(answers.budget)} PLN`} />
          <SummaryRow label="Typ" value={BODY_STYLES.find((b) => b.id === answers.bodyStyle)?.title ?? "—"} />
          <SummaryRow label="Segment" value={getSegmentName(segment, answers.bodyStyle, answers.bodyShapes)} />
          <SummaryRow label="Moc" value={`${displayHP} KM`} />
          <SummaryRow label="Km/rok" value={`${fmt((answers.kmCity + answers.kmHighway) * KM_MULTIPLIER[answers.kmPeriod])} km`} />
          <SummaryRow label="Okres" value={`${answers.yearsOwned} ${answers.yearsOwned === 1 ? "rok" : answers.yearsOwned < 5 ? "lata" : "lat"}`} />
        </div>
      </div>
    </div>
  );

  /* ──── render: step 3 = results ──── */

  const renderResults = () => (
    <div className="space-y-8">
      {loading && (() => {
        const steps = [
          { t: 0,  text: "Wysyłam zapytanie do AI..." },
          { t: 3,  text: "AI analizuje rynek wtórny..." },
          { t: 8,  text: `Szukam modeli w segmencie ${segment} i wyższych...` },
          { t: 15, text: `Dobieram warianty paliwowe (benzyna, diesel, LPG)...` },
          { t: 22, text: "Weryfikuję ceny na polskim rynku..." },
          { t: 30, text: "Prawie gotowe — finalizuję rekomendacje..." },
          { t: 45, text: "To trwa dłużej niż zwykle — proszę o cierpliwość..." },
        ];
        const current = [...steps].reverse().find((s) => loadingElapsed >= s.t) ?? steps[0];
        const pct = Math.min(95, Math.round((loadingElapsed / 40) * 100));
        return (
          <div className="flex flex-col items-center justify-center py-20 gap-5">
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-gray-200 dark:text-gray-700" />
                <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-accent transition-all duration-1000"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - pct / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-accent tabular-nums">{pct}%</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center transition-opacity">{current.text}</p>
            <p className="text-xs text-gray-400 dark:text-gray-600 tabular-nums">{loadingElapsed}s</p>
          </div>
        );
      })()}

      {error && (
        <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-6 text-center">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          <button type="button" onClick={fetchRecommendations} className="mt-3 btn-primary text-sm">
            Spróbuj ponownie
          </button>
        </div>
      )}

      {results && results.categories.length === 0 && (
        <div className="rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-6 text-center space-y-3">
          <p className="text-sm text-amber-700 dark:text-amber-400">
            Nie znaleziono modeli spełniających kryteria w budżecie {fmt(answers.budget)} PLN.
          </p>
          <p className="text-xs text-amber-600 dark:text-amber-500">
            Spróbuj zwiększyć budżet, obniżyć wymaganą moc lub wybrać niższy segment.
          </p>
          <button type="button" onClick={() => setStep(Math.max(0, lastStep - 2))} className="btn-secondary text-sm mt-2">
            Zmień kryteria
          </button>
        </div>
      )}

      {results && results.categories.length > 0 && (
        <>
          <div className="rounded-2xl bg-accent/5 dark:bg-accent/10 border border-accent/20 p-6 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-accent mb-1">
                  Rekomendacje dla budżetu {fmt(answers.budget)} PLN
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {BODY_STYLES.find((b) => b.id === answers.bodyStyle)?.title ?? "Samochód"} — kliknij kategorię wiekową, żeby zobaczyć propozycje.
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400 pt-1">
              Szacunkowe koszty przy {fmt((answers.kmCity + answers.kmHighway) * KM_MULTIPLIER[answers.kmPeriod])} km/rok przez {answers.yearsOwned} lat
            </p>
          </div>

          {/* Age category tabs */}
          <div className="flex flex-wrap gap-2">
            {results.categories.map((cat, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setExpandedCategory(i)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                  expandedCategory === i
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                {cat.ageLabel}
              </button>
            ))}
            {costsMap.size > 0 && (
              <button
                type="button"
                onClick={() => setExpandedCategory(-1)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                  expandedCategory === -1
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-700"
                }`}
              >
                Podsumowanie
              </button>
            )}
          </div>

          {/* Summary tab */}
          {expandedCategory === -1 && costsMap.size > 0 && (() => {
            const bestPerCategory: { cat: AgeCategory; catIdx: number; car: CarRecommendation; carIdx: number; variant: CarVariant; variantIdx: number; cost: CostResult }[] = [];
            for (let ci = 0; ci < results.categories.length; ci++) {
              const cat = results.categories[ci];
              let best: { car: CarRecommendation; carIdx: number; variant: CarVariant; variantIdx: number; cost: CostResult } | null = null;
              for (let carI = 0; carI < cat.cars.length; carI++) {
                for (let vi = 0; vi < cat.cars[carI].variants.length; vi++) {
                  const c = costsMap.get(`${ci}-${carI}-${vi}`);
                  if (c && (!best || c.costPerKm < best.cost.costPerKm)) {
                    best = { car: cat.cars[carI], carIdx: carI, variant: cat.cars[carI].variants[vi], variantIdx: vi, cost: c };
                  }
                }
              }
              if (best) bestPerCategory.push({ cat, catIdx: ci, ...best });
            }

            // Deduplicate: if same make+model appears in multiple categories, keep only the best one
            const seen = new Map<string, number>();
            const deduped = bestPerCategory.filter((entry, idx) => {
              const key = `${entry.car.make} ${entry.car.model}`.toLowerCase();
              const existing = seen.get(key);
              if (existing !== undefined) {
                // Keep the one with lower costPerKm
                if (entry.cost.costPerKm < bestPerCategory[existing].cost.costPerKm) {
                  seen.set(key, idx);
                  return true;
                }
                return false;
              }
              seen.set(key, idx);
              return true;
            });

            const reliability = (e: typeof deduped[0]) => e.car.brandReliability + e.variant.engineReliability;
            const globalBest = deduped.reduce((a, b) => reliability(a) < reliability(b) ? a : reliability(a) === reliability(b) ? (a.cost.costPerKm < b.cost.costPerKm ? a : b) : b, deduped[0]);

            const fuelBadge: Record<FuelType, { bg: string; label: string }> = {
              benzyna: { bg: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400", label: "Benzyna" },
              diesel: { bg: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300", label: "Diesel" },
              gaz: { bg: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400", label: "LPG" },
              elektryczny: { bg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400", label: "Elektryk" },
            };

            return (
              <div className="space-y-6">
                <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-5">
                  <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
                    Najtańszy model z każdej kategorii wiekowej
                  </h3>
                  <p className="text-xs text-emerald-600 dark:text-emerald-500">
                    Porównanie najtańszych wariantów (wg kosztu/km) przy {fmt((answers.kmCity + answers.kmHighway) * KM_MULTIPLIER[answers.kmPeriod])} km/rok przez {answers.yearsOwned} lat.
                  </p>
                </div>

                {deduped.map((entry) => {
                  const { cat, cost, car, variant } = entry;
                  const isGlobalBest = entry === globalBest;
                  const totalAnnualKm = (answers.kmCity + answers.kmHighway) * KM_MULTIPLIER[answers.kmPeriod];
                  const cityRatio = totalAnnualKm > 0 ? (answers.kmCity * KM_MULTIPLIER[answers.kmPeriod]) / totalAnnualKm : 0.5;
                  const avgConsumption = variant.fuelCity * cityRatio + variant.fuelHighway * (1 - cityRatio);
                  const costSegments = [
                    { value: cost.fuelCost, color: COST_COLORS.fuel, label: `Paliwo (~${avgConsumption.toFixed(1)} L/100km)` },
                    { value: cost.lostValue, color: COST_COLORS.depreciation, label: "Utrata wartości" },
                    { value: cost.repairs, color: COST_COLORS.repairs, label: "Serwis i naprawy" },
                    ...(cost.lpgInstallCost > 0 ? [{ value: cost.lpgInstallCost, color: COST_COLORS.lpg, label: "Instalacja LPG" }] : []),
                  ];

                  return (
                    <div
                      key={cat.ageLabel}
                      className={`rounded-2xl border-2 p-5 transition-all ${
                        isGlobalBest
                          ? "border-emerald-400 dark:border-emerald-600 bg-emerald-50/50 dark:bg-emerald-900/10 ring-1 ring-emerald-300/50 dark:ring-emerald-700/50"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                              {cat.ageLabel}
                            </span>
                            {isGlobalBest && (
                              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 px-2 py-0.5 rounded-full">
                                Najlepszy wybór
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-gray-900 dark:text-white mt-1">
                            {car.make} {car.model}{" "}
                            <span className="text-gray-400 font-normal text-sm">{car.generation}</span>
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {car.yearFrom}–{car.yearTo} · {variant.engine}
                          </p>
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${fuelBadge[variant.fuelType].bg}`}>
                          {fuelBadge[variant.fuelType].label}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-1">
                        {getVariantDesc(car, variant, true)}
                      </p>

                      <div className="flex gap-6 items-center">
                        <DonutChart segments={costSegments} />
                        <div className="flex-1 space-y-3">
                          {/* Key metrics */}
                          <div className="grid grid-cols-2 gap-2">
                            <div className="p-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                              <span className="text-[10px] uppercase tracking-wider text-gray-400 block">Koszt/km</span>
                              <span className={`text-lg font-bold tabular-nums ${isGlobalBest ? "text-emerald-600 dark:text-emerald-400" : "text-accent"}`}>
                                {cost.costPerKm.toFixed(2)} <span className="text-xs font-normal text-gray-400">PLN</span>
                              </span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                              <span className="text-[10px] uppercase tracking-wider text-gray-400 block">Miesięcznie</span>
                              <span className="text-lg font-bold tabular-nums text-gray-900 dark:text-white">
                                {fmt(Math.round(cost.monthly))} <span className="text-xs font-normal text-gray-400">PLN</span>
                              </span>
                            </div>
                          </div>
                          {/* Cost breakdown legend */}
                          <div className="space-y-1">
                            {costSegments.map((seg) => (
                              <div key={seg.label} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-1.5">
                                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                                  <span className="text-gray-600 dark:text-gray-400">{seg.label}</span>
                                </div>
                                <span className="text-gray-900 dark:text-white font-medium tabular-nums">
                                  {fmt(Math.round(seg.value))} PLN
                                  <span className="text-gray-400 ml-1">({Math.round(seg.value / cost.totalCost * 100)}%)</span>
                                </span>
                              </div>
                            ))}
                          </div>
                          {/* Total + price */}
                          <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800 text-xs">
                            <span className="text-gray-500">Łącznie ({answers.yearsOwned} lat)</span>
                            <span className="font-bold text-gray-900 dark:text-white">{fmt(Math.round(cost.totalCost))} PLN</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Cena zakupu</span>
                            <span className="font-medium text-gray-700 dark:text-gray-300">{fmt(variant.priceFrom)} – {fmt(variant.priceTo)} PLN</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}

          {/* Cars in selected category */}
          {expandedCategory >= 0 && results.categories[expandedCategory] && (
            <div className="space-y-6">
              {results.categories[expandedCategory].cars.map((car, i) => {
                const carKey = `${expandedCategory}-${i}`;
                const selIdx = selectedVariants.get(carKey) ?? 0;
                const v = car.variants[selIdx] ?? car.variants[0];
                const vi = car.variants.indexOf(v);
                const cost = costsMap.get(`${expandedCategory}-${i}-${vi}`) ?? null;
                const fuelBadge: Record<FuelType, { bg: string; label: string }> = {
                  benzyna: { bg: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400", label: "Benzyna" },
                  diesel: { bg: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300", label: "Diesel" },
                  gaz: { bg: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400", label: "LPG" },
                  elektryczny: { bg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400", label: "Elektryk" },
                };

                return (
                  <div
                    key={i}
                    className="rounded-2xl border border-gray-200 dark:border-gray-700 p-5 space-y-3 hover:border-accent/30 transition-colors"
                  >
                    {/* Header: name + price */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">
                          {car.make} {car.model}{" "}
                          <span className="text-gray-400 font-normal text-sm">{car.generation}</span>
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                          {car.yearFrom}–{car.yearTo} · {v.engine}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-semibold text-accent">
                          {fmt(v.priceFrom)} – {fmt(v.priceTo)} PLN
                        </p>
                      </div>
                    </div>

                    {/* Fuel variant switcher */}
                    {car.variants.length > 1 && (
                      <div className="flex gap-1.5 flex-wrap">
                        {car.variants.map((vt, vtIdx) => {
                          const badge = fuelBadge[vt.fuelType];
                          const isActive = vtIdx === vi;
                          return (
                            <button
                              key={vtIdx}
                              type="button"
                              onClick={() => setSelectedVariants((prev) => new Map(prev).set(carKey, vtIdx))}
                              className={`text-xs font-medium px-2.5 py-1 rounded-lg border-2 transition-all ${
                                isActive
                                  ? `border-accent ${badge.bg}`
                                  : "border-transparent bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
                              }`}
                            >
                              {badge.label}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Single variant badge if only one */}
                    {car.variants.length === 1 && (
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full inline-block ${fuelBadge[v.fuelType].bg}`}>
                        {fuelBadge[v.fuelType].label}
                      </span>
                    )}

                    {/* Cost row */}
                    {cost && (
                      <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs border-t border-gray-100 dark:border-gray-800 pt-2">
                        <span className="text-gray-500 dark:text-gray-400 relative group cursor-help">
                          Koszt/mies.: <span className="font-semibold text-gray-900 dark:text-white">{fmt(Math.round(cost.monthly))} PLN</span>
                          <span className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-64 p-2.5 rounded-xl bg-gray-900 dark:bg-gray-700 text-white text-[11px] leading-relaxed shadow-lg z-20 pointer-events-none">
                            <span className="block font-semibold mb-1">Składowe kosztu miesięcznego:</span>
                            <span className="block">Paliwo: {fmt(Math.round(cost.fuelCost / (12 * answers.yearsOwned)))} PLN/mies.</span>
                            <span className="block">Utrata wartości: {fmt(Math.round(cost.lostValue / (12 * answers.yearsOwned)))} PLN/mies.</span>
                            <span className="block">Serwis i naprawy: {fmt(Math.round(cost.repairs / (12 * answers.yearsOwned)))} PLN/mies.</span>
                            {cost.lpgInstallCost > 0 && <span className="block">Instalacja LPG: {fmt(Math.round(cost.lpgInstallCost / (12 * answers.yearsOwned)))} PLN/mies.</span>}
                          </span>
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 relative group cursor-help">
                          Koszt/km: <span className="font-semibold text-gray-900 dark:text-white">{cost.costPerKm.toFixed(2)} PLN</span>
                          <span className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-64 p-2.5 rounded-xl bg-gray-900 dark:bg-gray-700 text-white text-[11px] leading-relaxed shadow-lg z-20 pointer-events-none">
                            <span className="block font-semibold mb-1">Składowe kosztu na km:</span>
                            {(() => { const totalKm = (answers.kmCity + answers.kmHighway) * KM_MULTIPLIER[answers.kmPeriod] * answers.yearsOwned; return totalKm > 0 ? (<>
                              <span className="block">Paliwo: {(cost.fuelCost / totalKm).toFixed(2)} PLN/km</span>
                              <span className="block">Utrata wartości: {(cost.lostValue / totalKm).toFixed(2)} PLN/km</span>
                              <span className="block">Serwis i naprawy: {(cost.repairs / totalKm).toFixed(2)} PLN/km</span>
                              {cost.lpgInstallCost > 0 && <span className="block">Instalacja LPG: {(cost.lpgInstallCost / totalKm).toFixed(2)} PLN/km</span>}
                            </>) : null; })()}
                          </span>
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 relative group cursor-help">
                          Łącznie ({answers.yearsOwned} lat): <span className="font-semibold text-gray-900 dark:text-white">{fmt(Math.round(cost.totalCost))} PLN</span>
                          <span className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-64 p-2.5 rounded-xl bg-gray-900 dark:bg-gray-700 text-white text-[11px] leading-relaxed shadow-lg z-20 pointer-events-none">
                            <span className="block font-semibold mb-1">Rozbicie kosztów łącznych:</span>
                            <span className="block">Paliwo: {fmt(Math.round(cost.fuelCost))} PLN ({Math.round(cost.fuelCost / cost.totalCost * 100)}%)</span>
                            <span className="block">Utrata wartości: {fmt(Math.round(cost.lostValue))} PLN ({Math.round(cost.lostValue / cost.totalCost * 100)}%)</span>
                            <span className="block">Serwis i naprawy: {fmt(Math.round(cost.repairs))} PLN ({Math.round(cost.repairs / cost.totalCost * 100)}%)</span>
                            {cost.lpgInstallCost > 0 && <span className="block">Instalacja LPG: {fmt(Math.round(cost.lpgInstallCost))} PLN ({Math.round(cost.lpgInstallCost / cost.totalCost * 100)}%)</span>}
                          </span>
                        </span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      {getVariantDesc(car, v, false)}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {!loading && !error && !results && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Kliknij &quot;Szukaj modeli&quot;, żeby zobaczyć rekomendacje</p>
        </div>
      )}
    </div>
  );

  /* ──── step array & navigation ──── */

  const steps = hasShapeStep
    ? [renderStep0, renderStep1, renderSegmentAndPower, renderPreferences, renderResults]
    : [renderStep0, renderSegmentAndPower, renderPreferences, renderResults];

  const bg = answers.bodyStyle ? BG_IMAGES[answers.bodyStyle] : null;

  const goToResults = () => {
    setStep(lastStep);
    fetchRecommendations();
  };

  return (
    <div className="relative max-w-3xl mx-auto">
      {bg && (
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <Image src={bg.light} alt="" fill className="object-cover opacity-[0.07] dark:hidden" sizes="100vw" unoptimized />
          <Image src={bg.dark} alt="" fill className="object-cover opacity-0 dark:opacity-[0.12]" sizes="100vw" unoptimized />
        </div>
      )}

      {/* step indicator */}
      <div className="flex items-center gap-2 mb-10">
        {stepTitles.map((title: string, i: number) => (
          <button
            key={title}
            type="button"
            onClick={() => {
              if (i <= step || canNext()) {
                if (i === lastStep && step !== lastStep) {
                  goToResults();
                } else {
                  setStep(i);
                }
              }
            }}
            className="flex-1 group"
          >
            <div className={`h-1.5 rounded-full mb-2 transition-colors ${i <= step ? "bg-accent" : "bg-gray-200 dark:bg-gray-700"}`} />
            <p className={`text-xs font-medium transition-colors ${
              i === step ? "text-accent" : i < step ? "text-gray-600 dark:text-gray-400" : "text-gray-400 dark:text-gray-600"
            }`}>
              {title}
            </p>
          </button>
        ))}
      </div>

      {/* step content */}
      <div className="min-h-[400px]">{steps[Math.min(step, lastStep)]()}</div>

      {/* navigation */}
      <div className="flex justify-between mt-10">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="btn-secondary disabled:opacity-30 disabled:pointer-events-none"
        >
          ← Wstecz
        </button>
        {step < lastStep - 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(lastStep, s + 1))}
            disabled={!canNext()}
            className="btn-primary disabled:opacity-30 disabled:pointer-events-none"
          >
            Dalej →
          </button>
        ) : step === lastStep - 1 ? (
          <button
            type="button"
            onClick={goToResults}
            disabled={!canNext()}
            className="btn-primary disabled:opacity-30 disabled:pointer-events-none"
          >
            Szukaj modeli →
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setStep(0);
              setAnswers(INITIAL);
              setResults(null);
            }}
            className="btn-secondary"
          >
            Zacznij od nowa
          </button>
        )}
      </div>
    </div>
  );
}

/* ──────────────── summary row ──────────────── */

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
      <span className="text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-500">{label}</span>
      <span className="font-medium text-gray-900 dark:text-white">{value}</span>
    </div>
  );
}
