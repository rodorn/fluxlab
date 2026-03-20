"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";

/* ───────────────────────── types ───────────────────────── */

type BodyStyle = "sportowy" | "sedan" | "van" | "crossover" | "suv" | "terenowy";
type BodyShape =
  | "hatchback" | "sedan" | "kombi" | "liftback"
  | "coupe-2" | "roadster-2" | "coupe-2plus2" | "cabriolet-2plus2"
  | "hot-hatch" | "4door-coupe" | "sport-sedan" | "sport-crossover"
  | "standard" | "coupe" | "pickup";

interface Answers {
  height: number;
  passengers: number;
  longTrips: number; // 0 = tylko miasto, 100 = tylko trasa
  segmentOverride: Segment | null;
  bodyStyle: BodyStyle | null;
  bodyShapes: BodyShape[];
  luggageFreq: number; // 0‑100
  foldSeats: boolean;
  maxSpeed: number;
  powerOverride: number | null;
}

const INITIAL: Answers = {
  height: 175,
  passengers: 1,
  longTrips: 30,
  segmentOverride: null,
  bodyStyle: null,
  bodyShapes: [],
  luggageFreq: 30,
  foldSeats: false,
  maxSpeed: 130,
  powerOverride: null,
};

/* ──────────────── segment logic ──────────────── */

type Segment = "A" | "B" | "C" | "D" | "E" | "F";

/* Opisy segmentów per forma nadwozia (bodyShape).
   Fallback: per typ samochodu (bodyStyle), potem generyczny. */

const SHAPE_DESCRIPTIONS: Partial<Record<BodyShape, Partial<Record<Segment, string>>>> = {
  /* ── osobowe ── */
  hatchback: {
    A: "A – mini hatchback (np. Fiat 500, Toyota Aygo)",
    B: "B – małe hatchback (np. VW Polo, Mazda 2)",
    C: "C – kompaktowe hatchback (np. VW Golf, Toyota Corolla HB)",
  },
  sedan: {
    B: "B – małe sedany (np. Toyota Yaris Sedan, Honda City)",
    C: "C – kompaktowe sedany (np. Toyota Corolla Sedan, VW Jetta)",
    D: "D – średnie sedany (np. BMW serii 3, VW Passat)",
    E: "E – duże sedany (np. BMW serii 5, Mercedes klasy E)",
    F: "F – luksusowe sedany (np. BMW serii 7, Mercedes klasy S)",
  },
  kombi: {
    B: "B – małe kombi (np. Skoda Fabia Combi, Dacia Logan MCV)",
    C: "C – kompaktowe kombi (np. Toyota Corolla TS, Skoda Octavia Combi)",
    D: "D – średnie kombi (np. BMW serii 3 Touring, VW Passat Variant)",
    E: "E – duże kombi (np. BMW serii 5 Touring, Mercedes klasy E T-Modell)",
  },
  liftback: {
    C: "C – kompaktowe liftbacki (np. Skoda Octavia, Mazda 3)",
    D: "D – średnie liftbacki (np. BMW serii 4, VW Arteon)",
    E: "E – premium liftbacki (np. Audi A7, Porsche Panamera)",
  },
  /* ── sportowe ── */
  "coupe-2": {
    B: "B – budżetowe (np. Mazda MX-5 RF, Toyota GR86)",
    C: "C – średnie (np. Alpine A110, Lotus Emira)",
    D: "D – premium (np. Porsche Cayman, BMW M2)",
    E: "E – super (np. Porsche 911, Audi R8)",
  },
  "roadster-2": {
    B: "B – budżetowe (np. Mazda MX-5, Fiat 124 Spider)",
    C: "C – średnie (np. BMW Z4, Porsche Boxster)",
    D: "D – premium (np. Jaguar F-Type, Mercedes AMG GT Roadster)",
    E: "E – super (np. Audi R8 Spyder, McLaren Spider)",
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
  /* ── crossover/SUV coupé ── */
  coupe: {
    D: "D – średnie coupé (np. BMW X4, Mercedes GLC Coupé)",
    E: "E – duże coupé (np. BMW X6, Mercedes GLE Coupé)",
  },
  /* ── terenowy pickup ── */
  pickup: {
    D: "D – średnie pick-upy (np. Toyota Hilux, Ford Ranger)",
    E: "E – duże pick-upy (np. Dodge RAM, Ford F-150)",
  },
};

/* Fallback per bodyStyle (dla standard crossover/SUV/terenowy bez nadpisania kształtem) */
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
  // 1. bodyShape-specific description (first match)
  for (const shape of bodyShapes) {
    const desc = SHAPE_DESCRIPTIONS[shape]?.[segment];
    if (desc) return desc;
  }
  // 2. bodyStyle fallback
  const styleDesc = STYLE_DESCRIPTIONS[bodyStyle ?? "sedan"]?.[segment];
  if (styleDesc) return styleDesc;
  // 3. generic
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
  // osobowe
  hatchback: { min: "A", max: "C" },
  sedan: { min: "B", max: "F" },
  kombi: { min: "B", max: "E" },
  liftback: { min: "C", max: "E" },
  // crossover/SUV coupé, terenowy pickup
  coupe: { min: "D", max: "E" },
  pickup: { min: "D", max: "E" },
  // sportowe
  "hot-hatch": { min: "A", max: "C" },
  "4door-coupe": { min: "C", max: "E" },
  "sport-sedan": { min: "D", max: "F" },
  "sport-crossover": { min: "B", max: "F" },
  "coupe-2plus2": { min: "B", max: "F" },
  "cabriolet-2plus2": { min: "B", max: "F" },
  "coupe-2": { min: "B", max: "E" },
  "roadster-2": { min: "B", max: "E" },
};

function getSegmentRange(bodyStyle: BodyStyle | null, bodyShapes: BodyShape[]): { min: Segment; max: Segment } {
  if (bodyShapes.length === 0) return SEGMENT_RANGE[bodyStyle ?? "sedan"];
  // union of all selected shapes' ranges
  let minIdx = 5; // start at F
  let maxIdx = 0; // start at A
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

function calcSegment(a: Answers): Segment {
  let score = 0;
  // wzrost
  if (a.height >= 170) score += a.height-170;
  // pasażerowie
  score += a.passengers * 10;
  // trasy
  score *= ((a.longTrips + 100) / 100);
  // van – mniejszy score (więcej osób nie wymusza większego segmentu tak mocno)
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
  // bazowa moc wg prędkości (przybliżenie oporu powietrza ~ v^3), optymalne zużycie połowy mocy
  const speedFactor = Math.pow(a.maxSpeed / 200, 3) * 2;
  const segmentWeights: Record<Segment, number> = {
    A: 120,
    B: 125,
    C: 135,
    D: 145,
    E: 155,
    F: 165,
  };
  const bodyMult: Record<BodyStyle, number> = {
    sportowy: 0.9,
    sedan: 1,
    van: 1.15,
    crossover: 1.2,
    suv: 1.3,
    terenowy: 1.5,
  };
  const weight = segmentWeights[segment] * (bodyMult[a.bodyStyle ?? "sedan"]);
  let hp = Math.round(weight * speedFactor);
  hp = Math.max(65, Math.min(hp, 500));
  return hp;
}

/* ──────────────── slider component ──────────────── */

function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  hint,
  onChange,
  labels,
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
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
        <span className="text-sm font-semibold text-accent tabular-nums">
          {value}
          {unit && <span className="text-gray-400 font-normal"> {unit}</span>}
        </span>
      </div>
      <div className="relative group">
        <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-2 rounded-full bg-accent transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
        />
        {/* thumb indicator */}
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
      {hint && (
        <p className="text-xs text-gray-400 dark:text-gray-500">{hint}</p>
      )}
    </div>
  );
}

/* ──────────────── card selector ──────────────── */

function CardSelector<T extends string>({
  options,
  value,
  onChange,
  multiple,
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
            <div className="relative w-full h-36 shrink-0 bg-gray-100 dark:bg-gray-800">
              <Image
                src={opt.image}
                alt={opt.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                unoptimized
              />
              {selected && (
                <div className="absolute inset-0 bg-accent/10" />
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <span
                className={`font-semibold text-sm ${
                  selected
                    ? "text-accent"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                {opt.title}
              </span>
              <div className="mt-2 space-y-1 text-xs flex-1">
                {opt.pros.map((p) => (
                  <div key={p} className="flex gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <span className="shrink-0">+</span>
                    <span>{p}</span>
                  </div>
                ))}
                {opt.cons.map((c) => (
                  <div key={c} className="flex gap-1.5 text-red-500 dark:text-red-400">
                    <span className="shrink-0">−</span>
                    <span>{c}</span>
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
  sportowy:  { light: `${IMG}/bg-sport-light.jpg`,      dark: `${IMG}/bg-sport-dark.png` },
  sedan:     { light: `${IMG}/bg-osobowy-light.jpg`,     dark: `${IMG}/bg-osobowy-dark.jpg` },
  van:       { light: `${IMG}/bg-van-light.avif`,        dark: `${IMG}/bg-van-dark.jpg` },
  crossover: { light: `${IMG}/bg-crossover-light.webp`,  dark: `${IMG}/bg-crossover-dark.jpg` },
  suv:       { light: `${IMG}/bg-suv-light.jpg`,         dark: `${IMG}/bg-suv-dark.jpeg` },
  terenowy:  { light: `${IMG}/bg-terenowy-light.jpg`,    dark: `${IMG}/bg-terenowy-dark.avif` },
};

const BODY_STYLES: {
  id: BodyStyle;
  title: string;
  image: string;
  pros: string[];
  cons: string[];
  note?: React.ReactNode;
}[] = [
  {
    id: "sportowy",
    title: "Sportowy / Coupé",
    image: `${IMG}/type-sport.webp`,
    pros: [
      "Niski środek ciężkości",
      "Doskonałe prowadzenie i reakcje",
      "Atrakcyjny wygląd",
    ],
    cons: [
      "Mało miejsca dla pasażerów",
      "Niska – trudniej wsiadać/wysiadać",
      "Mały bagażnik",
    ],
  },
  {
    id: "sedan",
    title: "Osobowy",
    image: `${IMG}/type-osobowy.jpg`,
    pros: [
      "Uniwersalny – sprawdzi się wszędzie",
      "Dobry komfort na trasie",
      "Rozsądna cena i spalanie",
    ],
    cons: [
      "Niska pozycja za kierownicą",
    ],
  },
  {
    id: "van",
    title: "Van",
    image: `${IMG}/type-van.jpeg`,
    pros: [
      "Doskonała funkcjonalność",
      "Optymalne wykorzystanie przestrzeni"
    ],
    cons: [
      "Wyższe spalanie niż osobowy",
      "Gorsze prowadzenie – wysoki środek ciężkości",
    ],
  },
  {
    id: "crossover",
    title: "Crossover",
    image: `${IMG}/type-crossover.jpg`,
    pros: [
      "Wyższa pozycja – lepsza widoczność",
      "Wygodne wsiadanie/wysiadanie",
      "Wyższe zawieszenie niż w osobowym",
    ],
    cons: [
      "Wyższa cena i spalanie niż osobowy",
      "Gorsze prowadzenie niż niski samochód",
      "Gorsze osiągi",
    ],
  },
  {
    id: "suv",
    title: "SUV",
    image: `${IMG}/type-suv.jpg`,
    pros: [
        "Wyższa pozycja – lepsza widoczność",
        "Wygodne wsiadanie/wysiadanie",
        "Podstawowe zdolności terenowe",
    ],
    cons: [
      "Wysokie spalanie i cena",
      "Gorsze prowadzenie – wysoki środek ciężkości",
      "Gorsze osiągi",
    ],
    note: (<>SUV-y i crossovery mają w większości pokrywający się wybór modeli. <strong>Sugerujemy wybór SUV-a wyłącznie jeśli planujesz zjeżdżać z asfaltu</strong> – w przeciwnym razie crossover będzie lepszym wyborem.</>),
  },
  {
    id: "terenowy",
    title: "Terenowy / Off-road",
    image: `${IMG}/type-terenowy.webp`,
    pros: [
      "Prawdziwy napęd 4x4 z reduktorem",
      "Duży prześwit i możliwości terenowe",
      "Wytrzymała konstrukcja",
    ],
    cons: [
      "Bardzo wysokie spalanie",
      "Słabe prowadzenie na asfalcie",
      "Drogi w zakupie i utrzymaniu",
      "Parkowanie to wyzwanie",
    ],
  },
];

/* ──────────────── body shape options ──────────────── */

type ShapeOption = { id: BodyShape; title: string; image: string; pros: string[]; cons: string[] };

const SHAPES_STANDARD: ShapeOption[] = [
  {
    id: "hatchback",
    title: "Hatchback",
    image: `${IMG}/shape-hatchback.jpg`,
    pros: [
      "Kompaktowy – idealny do miasta",
      "Uchylna klapa – łatwy załadunek",
      "Niższa cena od sedana/kombi",
    ],
    cons: [
      "Mniej miejsca na bagaże niż kombi",
      "Hałas z bagażnika dochodzi do kabiny",
    ],
  },
  {
    id: "sedan",
    title: "Sedan",
    image: `${IMG}/shape-sedan.jpg`,
    pros: [
      "Cichsza kabina – bagażnik oddzielony",
      "Elegancki wygląd",
      "Dobra aerodynamika",
    ],
    cons: [
      "Mały otwór załadunkowy",
      "Nie przewieziesz dużych przedmiotów",
      "Nie złożysz siedzeń tak łatwo",
    ],
  },
  {
    id: "kombi",
    title: "Kombi",
    image: `${IMG}/shape-kombi.jpg`,
    pros: [
      "Ogromny bagażnik – idealny na rodzinę",
      "Łatwo składane tylne siedzenia",
      "Niska krawędź załadunku",
    ],
    cons: [
      "Dłuższy – trudniej parkować",
      "Zwykle trochę droższy",
      "Hałas z bagażnika",
    ],
  },
  {
    id: "liftback",
    title: "Liftback",
    image: `${IMG}/shape-liftback.jpg`,
    pros: [
      "Wygląd sedana + praktyczność hatchbacka",
      "Duży otwór bagażnika",
      "Świetna aerodynamika",
    ],
    cons: [
      "Mniej popularny – mniejszy wybór",
      "Cena bliżej sedana niż hatchbacka",
    ],
  },
];

const SHAPES_SPORT: ShapeOption[] = [
  {
    id: "coupe-2",
    title: "Coupé 2-osobowe",
    image: `${IMG}/shape-coupe-2.avif`,
    pros: [
      "Najlepsza dynamika i prowadzenie",
      "Niska masa – świetne osiągi",
      "Najniższy środek ciężkości",
    ],
    cons: [
      "Tylko 2 miejsca",
      "Minimalny bagażnik",
      "Niska praktyczność na co dzień",
    ],
  },
  {
    id: "roadster-2",
    title: "Roadster 2-osobowy",
    image: `${IMG}/shape-roadster-2.webp`,
    pros: [
      "Otwarte nadwozie – jazda z wiatrem",
      "Lekki – świetne prowadzenie",
      "Wyjątkowe doznania z jazdy",
    ],
    cons: [
      "Mniej sztywna konstrukcja niż coupé",
      "Brak praktyczności",
      "Wrażliwy na pogodę",
    ],
  },
  {
    id: "coupe-2plus2",
    title: "Coupé 2+2",
    image: `${IMG}/shape-coupe-2plus2.jpg`,
    pros: [
      "Sportowy charakter + awaryjne tylne miejsca",
      "Kompromis między stylem a użytecznością",
      "Dobra aerodynamika",
    ],
    cons: [
      "Tylne miejsca ciasne – raczej dla dzieci",
      "Mały bagażnik",
      "Droższe od standardowego coupé",
    ],
  },
  {
    id: "cabriolet-2plus2",
    title: "Cabriolet 2+2",
    image: `${IMG}/shape-cabriolet-2plus2.avif`,
    pros: [
      "Otwarte nadwozie + 4 miejsca",
      "Elegancki wygląd",
      "Większa praktyczność niż roadster",
    ],
    cons: [
      "Cięższy od roadsterów – gorsza dynamika",
      "Drogi w zakupie i utrzymaniu",
      "Tylne miejsca nadal ciasne",
    ],
  },
  {
    id: "hot-hatch",
    title: "Hot Hatch",
    image: `${IMG}/shape-hot-hatch.jpg`,
    pros: [
      "Praktyczność hatchbacka + sportowe osiągi",
      "5 miejsc i użyteczny bagażnik",
      "Świetny do codziennej jazdy",
    ],
    cons: [
      "Wyższy środek ciężkości niż coupé",
      "Twarde zawieszenie – mniej komfortu",
      "Wyższe ubezpieczenie",
    ],
  },
  {
    id: "4door-coupe",
    title: "4-door Coupé",
    image: `${IMG}/shape-4door-coupe.jpg`,
    pros: [
      "Sportowa sylwetka + 4 drzwi",
      "Wygodne wsiadanie do tyłu",
      "Elegancki kompromis",
    ],
    cons: [
      "Mniej miejsca nad głową z tyłu",
      "Mniejszy bagażnik niż sedan",
      "Wyższa cena od sedana",
    ],
  },
  {
    id: "sport-sedan",
    title: "Sedan sportowy",
    image: `${IMG}/shape-sport-sedan.avif`,
    pros: [
      "4 drzwi i pełne 5 miejsc",
      "Duży bagażnik",
      "Sportowy charakter w praktycznym nadwoziu",
    ],
    cons: [
      "Cięższy od coupé – gorsze prowadzenie",
      "Mniej wyrazisty wygląd",
      "Wyższe spalanie niż zwykły sedan",
    ],
  },
  {
    id: "sport-crossover",
    title: "Crossover sportowy",
    image: `${IMG}/shape-sport-crossover.avif`,
    pros: [
      "Wyższa pozycja + sportowe osiągi",
      "Dobra widoczność i przestronność",
      "Modny segment – duży wybór",
    ],
    cons: [
      "Najgorsze prowadzenie z opcji sportowych",
      "Wysokie spalanie",
      "Wysoki środek ciężkości",
    ],
  },
];

const SHAPES_CROSSOVER_SUV: ShapeOption[] = [
  {
    id: "standard",
    title: "Zwykły",
    image: `${IMG}/shape-standard.webp`,
    pros: [
      "Więcej miejsca w bagażniku",
      "Lepsza widoczność do tyłu",
      "Większy wybór modeli",
    ],
    cons: [
      "Mniej dynamiczny wygląd",
    ],
  },
  {
    id: "coupe",
    title: "Coupé (ścięty tył)",
    image: `${IMG}/shape-coupe.avif`,
    pros: [
      "Sportowa sylwetka",
      "Lepsza aerodynamika",
      "Wyróżnia się na drodze",
    ],
    cons: [
      "Mniejszy bagażnik",
      "Gorsza widoczność do tyłu",
      "Wyższa cena",
    ],
  },
];

const SHAPES_TERENOWY: ShapeOption[] = [
  {
    id: "standard",
    title: "Zwykły",
    image: `${IMG}/shape-terenowy-standard.avif`,
    pros: [
      "Zamknięte nadwozie – ochrona bagażu",
      "Komfort pasażerów z tyłu",
      "Lepsze wyciszenie kabiny",
    ],
    cons: [
      "Mniejsza ładowność niż pick-up",
    ],
  },
  {
    id: "pickup",
    title: "Pick-up",
    image: `${IMG}/shape-pickup.jpg`,
    pros: [
      "Otwarta skrzynia ładunkowa",
      "Ogromna ładowność",
      "Idealny do ciężkiej pracy",
    ],
    cons: [
      "Bagaż narażony na pogodę",
      "Bardzo duże gabaryty",
      "Wysokie spalanie",
    ],
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

/* ──────────────── steps ──────────────── */

function getStepConfig(bodyStyle: BodyStyle | null) {
  const hasShapeStep = bodyStyle !== "van";
  const titles = hasShapeStep
    ? ["Typ samochodu", "Forma nadwozia", "Segment", "Moc silnika"]
    : ["Typ samochodu", "Segment", "Moc silnika"];
  return { titles, hasShapeStep };
}

/* ──────────────── main component ──────────────── */

export default function CarConfigurator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(INITIAL);

  const { titles: stepTitles, hasShapeStep } = getStepConfig(answers.bodyStyle);
  const lastStep = stepTitles.length - 1;

  const suggestedSegment = useMemo(() => calcSegment(answers), [answers]);
  const segment = answers.segmentOverride
    ? clampSegment(answers.segmentOverride, answers.bodyStyle, answers.bodyShapes)
    : suggestedSegment;
  const suggestedHP = useMemo(
    () => calcSuggestedHP(answers, segment),
    [answers, segment],
  );
  const displayHP = answers.powerOverride ?? suggestedHP;

  const set = <K extends keyof Answers>(key: K, val: Answers[K]) =>
    setAnswers((prev) => {
      const next = { ...prev, [key]: val };
      if (key === "bodyStyle" && val !== prev.bodyStyle) {
        // clamp passengers when switching away from van
        if (val !== "van" && next.passengers > 5) {
          next.passengers = 5;
        }
        // reset body shape when type changes (options differ)
        next.bodyShapes = [];
      }
      return next;
    });

  const canNext = (): boolean => {
    if (step === 0 && !answers.bodyStyle) return false;
    if (hasShapeStep && step === 1 && answers.bodyShapes.length === 0) return false;
    return true;
  };

  /* ──── render helpers ──── */

  const renderStep0 = () => (
    <div className="space-y-10">
      {/* info box */}
      <div className="rounded-2xl bg-accent/5 dark:bg-accent/10 border border-accent/20 p-6">
        <h3 className="text-sm font-semibold text-accent mb-2">
          Dlaczego mniejszy samochód to zwykle lepszy wybór?
        </h3>
        <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
          <li>
            <span className="font-medium text-gray-800 dark:text-gray-200">Niższa cena</span>{" "}
            – zarówno zakupu jak i ubezpieczenia
          </li>
          <li>
            <span className="font-medium text-gray-800 dark:text-gray-200">Mniejsze spalanie</span>{" "}
            – lżejszy samochód = mniej paliwa
          </li>
          <li>
            <span className="font-medium text-gray-800 dark:text-gray-200">Lepsze prowadzenie</span>{" "}
            – mniejsza masa = szybsze reakcje, krótsze hamowanie
          </li>
          <li>
            <span className="font-medium text-gray-800 dark:text-gray-200">Łatwiejsze parkowanie</span>{" "}
            – w mieście to bezcenne
          </li>
          <li>
            <span className="font-medium text-gray-800 dark:text-gray-200">Szybszy</span>{" "}
            – przy tej samej mocy lżejszy samochód przyspiesza lepiej
          </li>
        </ul>
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-500 italic">
          Zasada ceteris paribus – przy porównywalnym wyposażeniu i mocy,
          mniejszy samochód wygrywa w niemal każdej kategorii. Wybieraj
          większy tylko wtedy, gdy naprawdę go potrzebujesz.
        </p>
      </div>

      {/* sliders */}
      <div className="space-y-8">
        <Slider
          label="Twój wzrost"
          value={answers.height}
          min={150}
          max={210}
          step={1}
          unit="cm"
          hint="Wyższe osoby mogą potrzebować większego segmentu dla komfortu."
          onChange={(v) => set("height", v)}
        />

        <Slider
          label="Typowa liczba pasażerów (z kierowcą)"
          value={answers.passengers}
          min={1}
          max={answers.bodyStyle === "van" ? 8 : 5}
          step={1}
          unit="os."
          hint="Ile osób jednocześnie przewozisz najczęściej?"
          onChange={(v) => set("passengers", v)}
        />

        <Slider
          label="Rodzaj tras"
          value={answers.longTrips}
          min={0}
          max={100}
          step={5}
          onChange={(v) => set("longTrips", v)}
          labels={{ left: "🏙️ Głównie miasto", right: "🛣️ Głównie trasa" }}
          hint="Na trasie liczy się komfort i stabilność – to wymaga większego auta."
        />
      </div>

      {/* segment result + override */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
            {(answers.bodyShapes.includes("coupe-2") || answers.bodyShapes.includes("roadster-2")) ? "Sugerowana klasa" : "Sugerowany segment"}
          </p>
          <p className="text-2xl font-bold text-accent">{getSegmentName(suggestedSegment, answers.bodyStyle, answers.bodyShapes)}</p>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            {(answers.bodyShapes.includes("coupe-2") || answers.bodyShapes.includes("roadster-2"))
              ? "Możesz wybrać inną klasę, jeśli nasza sugestia nie pasuje:"
              : "Możesz wybrać inny segment, jeśli nasza sugestia nie pasuje:"}
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
                <button
                  key={s}
                  type="button"
                  onClick={() =>
                    set("segmentOverride", s === suggestedSegment ? null : s)
                  }
                  className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                    isActive
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
                  } ${isSuggested ? "ring-2 ring-accent/30" : ""}`}
                >
                  {s}
                </button>
              );
            })}
          </div>
          {answers.segmentOverride && (
            <p className="text-center">
              <button
                type="button"
                onClick={() => set("segmentOverride", null)}
                className="text-xs text-accent hover:underline"
              >
                {(answers.bodyShapes.includes("coupe-2") || answers.bodyShapes.includes("roadster-2"))
                  ? `Przywróć sugerowaną klasę (${suggestedSegment})`
                  : `Przywróć sugerowany segment (${suggestedSegment})`}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="rounded-2xl bg-accent/5 dark:bg-accent/10 border border-accent/20 p-6">
        <h3 className="text-sm font-semibold text-accent mb-2">
          Jaki typ samochodu do Ciebie pasuje?
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Każdy typ ma swoje zalety i wady. Kliknij kartę, która najlepiej
          odpowiada Twoim potrzebom. Pamiętaj – im niżej osadzony samochód,
          tym lepiej się prowadzi na asfalcie.
        </p>
      </div>
      <CardSelector<BodyStyle>
        options={BODY_STYLES}
        value={answers.bodyStyle}
        onChange={(v) => set("bodyStyle", v)}
      />
    </div>
  );

  const renderStep2 = () => {
    const isSport = answers.bodyStyle === "sportowy";
    return (
      <div className="space-y-8">
        <div className="rounded-2xl bg-accent/5 dark:bg-accent/10 border border-accent/20 p-6">
          <h3 className="text-sm font-semibold text-accent mb-2">
            {isSport ? "Jaki rodzaj nadwozia sportowego?" : "Jaka forma nadwozia?"}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isSport
              ? "Wybierz formę, która odpowiada Twojemu stylowi jazdy – od czystego coupé po praktycznego hot hatcha."
              : "Forma nadwozia wpływa na praktyczność na co dzień – wielkość bagażnika, łatwość załadunku i możliwość przewozu dużych rzeczy."}
          </p>
        </div>

        {!isSport && (
          <>
            <div className="space-y-8">
              <Slider
                label="Jak często przewozisz dużo bagaży?"
                value={answers.luggageFreq}
                min={0}
                max={100}
                step={5}
                onChange={(v) => set("luggageFreq", v)}
                labels={{
                  left: "📱 Prawie nigdy",
                  right: "📦 Bardzo często",
                }}
              />

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => set("foldSeats", !answers.foldSeats)}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    answers.foldSeats
                      ? "bg-accent"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                      answers.foldSeats ? "translate-x-5" : ""
                    }`}
                  />
                </button>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Potrzebuję składanych tylnych siedzeń
                </span>
              </div>
            </div>

            {/* recommendation */}
            <div className="rounded-2xl bg-accent/5 dark:bg-accent/10 border border-accent/20 p-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Na podstawie Twoich odpowiedzi sugerujemy:</p>
              <p className="text-sm font-medium text-accent">
                {answers.luggageFreq > 60 || answers.foldSeats
                  ? "Kombi – duży bagażnik i łatwo składane siedzenia"
                  : answers.luggageFreq > 30
                    ? "Liftback – kompromis między stylem a praktycznością"
                    : "Hatchback lub sedan – wystarczą do codziennego użytku"}
              </p>
            </div>
          </>
        )}

        <CardSelector<BodyShape>
          options={getBodyShapes(answers.bodyStyle)}
          value={answers.bodyShapes}
          multiple
          onChange={(v) =>
            set(
              "bodyShapes",
              answers.bodyShapes.includes(v)
                ? answers.bodyShapes.filter((s) => s !== v)
                : [...answers.bodyShapes, v],
            )
          }
        />
      </div>
    );
  };

  const renderStep3 = () => {
    return (
      <div className="space-y-8">
        <div className="rounded-2xl bg-accent/5 dark:bg-accent/10 border border-accent/20 p-6">
          <h3 className="text-sm font-semibold text-accent mb-2">
            Ile mocy naprawdę potrzebujesz?
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Moc silnika powinna wynikać z Twoich realnych potrzeb – nie
            marketingowych haseł. Ustaw maksymalną prędkość, z jaką
            regularnie jeździsz, a przeliczymy sugerowaną moc. Możesz ją
            potem skorygować ręcznie.
          </p>
        </div>

        <Slider
          label="Maksymalna prędkość, z jaką jeździsz regularnie"
          value={answers.maxSpeed}
          min={80}
          max={240}
          step={5}
          unit="km/h"
          onChange={(v) => {
            set("maxSpeed", v);
            set("powerOverride", null);
          }}
          labels={{
            left: "🏙️ 80 km/h – miasto",
            right: "🏁 240 km/h – autostrada DE",
          }}
        />

        {/* suggested HP */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center space-y-1">
          <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">
            Sugerowana moc
          </p>
          <p className="text-3xl font-bold text-accent tabular-nums">
            {suggestedHP} KM
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Dla segmentu {segment}, {BODY_STYLES.find((b) => b.id === answers.bodyStyle)?.title ?? "—"},{" "}
            {answers.maxSpeed} km/h
          </p>
        </div>

        <Slider
          label="Twoja korekta mocy"
          value={displayHP}
          min={50}
          max={500}
          step={5}
          unit="KM"
          onChange={(v) => set("powerOverride", v)}
          hint="Przesuń, jeśli chcesz więcej lub mniej mocy niż sugerujemy."
        />

        {/* final summary */}
        <div className="rounded-2xl border-2 border-accent/30 bg-accent/5 dark:bg-accent/10 p-8 space-y-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center">
            Twój idealny samochód
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <SummaryRow label="Segment" value={getSegmentName(segment, answers.bodyStyle, answers.bodyShapes)} />
            <SummaryRow
              label="Typ samochodu"
              value={
                BODY_STYLES.find((b) => b.id === answers.bodyStyle)?.title ??
                "—"
              }
            />
            {hasShapeStep && (
              <SummaryRow
                label="Forma nadwozia"
                value={
                  answers.bodyShapes.length > 0
                    ? getBodyShapes(answers.bodyStyle)
                        .filter((b) => answers.bodyShapes.includes(b.id))
                        .map((b) => b.title)
                        .join(", ")
                    : "—"
                }
              />
            )}
            <SummaryRow label="Moc silnika" value={`${displayHP} KM`} />
            <SummaryRow
              label="Maks. prędkość"
              value={`${answers.maxSpeed} km/h`}
            />
            <SummaryRow
              label="Pasażerowie"
              value={`${answers.passengers} os.`}
            />
          </div>
        </div>
      </div>
    );
  };

  const steps = hasShapeStep
    ? [renderStep1, renderStep2, renderStep0, renderStep3]
    : [renderStep1, renderStep0, renderStep3];

  const bg = answers.bodyStyle ? BG_IMAGES[answers.bodyStyle] : null;

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* dynamic background – fixed to viewport, clipped to container */}
      {bg && (
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <Image
            src={bg.light}
            alt=""
            fill
            className="object-cover opacity-[0.07] dark:hidden"
            sizes="100vw"
            unoptimized
          />
          <Image
            src={bg.dark}
            alt=""
            fill
            className="object-cover opacity-0 dark:opacity-[0.12]"
            sizes="100vw"
            unoptimized
          />
        </div>
      )}

      {/* step indicator */}
      <div className="flex items-center gap-2 mb-10">
        {stepTitles.map((title: string, i: number) => (
          <button
            key={title}
            type="button"
            onClick={() => {
              // allow going back freely, forward only if current step valid
              if (i <= step || canNext()) setStep(i);
            }}
            className="flex-1 group"
          >
            <div
              className={`h-1.5 rounded-full mb-2 transition-colors ${
                i <= step
                  ? "bg-accent"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            />
            <p
              className={`text-xs font-medium transition-colors ${
                i === step
                  ? "text-accent"
                  : i < step
                    ? "text-gray-600 dark:text-gray-400"
                    : "text-gray-400 dark:text-gray-600"
              }`}
            >
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
        {step < lastStep ? (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(lastStep, s + 1))}
            disabled={!canNext()}
            className="btn-primary disabled:opacity-30 disabled:pointer-events-none"
          >
            Dalej →
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setStep(0);
              setAnswers(INITIAL);
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
      <span className="text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-500">
        {label}
      </span>
      <span className="font-medium text-gray-900 dark:text-white">{value}</span>
    </div>
  );
}
