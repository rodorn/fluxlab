"use client";

import React, { useState } from "react";
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
  longTrips: number;
  bodyStyle: BodyStyle | null;
  bodyShapes: BodyShape[];
  luggageFreq: number;
  foldSeats: boolean;
  budget: number;
  additionalInfo: string;
}

const INITIAL: Answers = {
  height: 175,
  passengers: 1,
  longTrips: 30,
  bodyStyle: null,
  bodyShapes: [],
  luggageFreq: 30,
  foldSeats: false,
  budget: 50000,
  additionalInfo: "",
};

/* ───────────────────────── car recommendation types ───────────────────────── */

interface CarRecommendation {
  make: string;
  model: string;
  generation: string;
  yearFrom: number;
  yearTo: number;
  engine: string;
  priceFrom: number;
  priceTo: number;
  pros: string[];
  cons: string[];
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

/* ──────────────── steps config ──────────────── */

function getStepConfig(bodyStyle: BodyStyle | null) {
  const hasShapeStep = bodyStyle !== "van";
  const titles = hasShapeStep
    ? ["Typ samochodu", "Forma nadwozia", "Budżet i preferencje", "Wyniki"]
    : ["Typ samochodu", "Budżet i preferencje", "Wyniki"];
  return { titles, hasShapeStep };
}

/* ──────────────── main component ──────────────── */

export default function CarConfigurator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<RecommendResult | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<number>(0);

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

  const canNext = (): boolean => {
    if (step === 0 && !answers.bodyStyle) return false;
    if (hasShapeStep && step === 1 && answers.bodyShapes.length === 0) return false;
    return true;
  };

  const fetchRecommendations = async () => {
    setLoading(true);
    setError("");
    setResults(null);
    try {
      const res = await fetch("/api/car-recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          budget: answers.budget,
          bodyStyle: answers.bodyStyle,
          bodyShapes: answers.bodyShapes,
          passengers: answers.passengers,
          longTrips: answers.longTrips,
          height: answers.height,
          additionalInfo: answers.additionalInfo,
        }),
      });
      if (!res.ok) {
        setError("Nie udało się pobrać rekomendacji");
        return;
      }
      const data: RecommendResult = await res.json();
      setResults(data);
      setExpandedCategory(0);
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

  /* ──── render: step 2 = budget & preferences ──── */

  const renderPreferences = () => (
    <div className="space-y-10">
      <div className="rounded-2xl bg-accent/5 dark:bg-accent/10 border border-accent/20 p-6">
        <h3 className="text-sm font-semibold text-accent mb-2">
          Budżet i preferencje
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Na tej podstawie AI dobierze konkretne modele samochodów
          w różnych kategoriach wiekowych — od prawie nowych po starsze, sprawdzone egzemplarze.
        </p>
      </div>

      <LogSlider
        label="Budżet"
        value={answers.budget}
        min={5000}
        max={500000}
        unit="PLN"
        onChange={(v) => set("budget", v)}
      />

      <div className="space-y-8">
        <Slider
          label="Twój wzrost"
          value={answers.height} min={150} max={210} step={1} unit="cm"
          hint="Wyższe osoby mogą potrzebować większego samochodu dla komfortu."
          onChange={(v) => set("height", v)}
        />

        <Slider
          label="Typowa liczba pasażerów (z kierowcą)"
          value={answers.passengers}
          min={1} max={answers.bodyStyle === "van" ? 8 : 5} step={1} unit="os."
          hint="Ile osób jednocześnie przewozisz najczęściej?"
          onChange={(v) => set("passengers", v)}
        />

        <Slider
          label="Rodzaj tras"
          value={answers.longTrips} min={0} max={100} step={5}
          onChange={(v) => set("longTrips", v)}
          labels={{ left: "🏙️ Głównie miasto", right: "🛣️ Głównie trasa" }}
          hint="Na trasie liczy się komfort i stabilność."
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Dodatkowe wymagania <span className="text-gray-400 font-normal">(opcjonalnie)</span>
        </label>
        <textarea
          value={answers.additionalInfo}
          onChange={(e) => set("additionalInfo", e.target.value)}
          placeholder="np. automat, napęd 4x4, niskie spalanie, hybryda, dużo mocy, niezawodny silnik..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent resize-none"
        />
      </div>

      {/* Summary before search */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-3">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Twoje preferencje</h3>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <SummaryRow label="Budżet" value={`${fmt(answers.budget)} PLN`} />
          <SummaryRow label="Typ" value={BODY_STYLES.find((b) => b.id === answers.bodyStyle)?.title ?? "—"} />
          {answers.bodyShapes.length > 0 && (
            <SummaryRow
              label="Nadwozie"
              value={getBodyShapes(answers.bodyStyle)
                .filter((b) => answers.bodyShapes.includes(b.id))
                .map((b) => b.title).join(", ")}
            />
          )}
          <SummaryRow label="Pasażerowie" value={`${answers.passengers} os.`} />
        </div>
      </div>
    </div>
  );

  /* ──── render: step 3 = results ──── */

  const renderResults = () => (
    <div className="space-y-8">
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <svg className="animate-spin h-8 w-8 text-accent" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm text-gray-500 dark:text-gray-400">AI analizuje rynek i dobiera modele...</p>
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-6 text-center">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          <button
            type="button"
            onClick={fetchRecommendations}
            className="mt-3 btn-primary text-sm"
          >
            Spróbuj ponownie
          </button>
        </div>
      )}

      {results && (
        <>
          <div className="rounded-2xl bg-accent/5 dark:bg-accent/10 border border-accent/20 p-6">
            <h3 className="text-sm font-semibold text-accent mb-1">
              Rekomendacje dla budżetu {fmt(answers.budget)} PLN
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {BODY_STYLES.find((b) => b.id === answers.bodyStyle)?.title ?? "Samochód"} — kliknij kategorię wiekową, żeby zobaczyć propozycje.
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
          </div>

          {/* Cars in selected category */}
          {results.categories[expandedCategory] && (
            <div className="space-y-4">
              {results.categories[expandedCategory].cars.map((car, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-gray-200 dark:border-gray-700 p-5 space-y-3 hover:border-accent/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        {car.make} {car.model}{" "}
                        <span className="text-gray-400 font-normal text-sm">{car.generation}</span>
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        {car.yearFrom}–{car.yearTo} · {car.engine}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-accent">
                        {fmt(car.priceFrom)} – {fmt(car.priceTo)} PLN
                      </p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs">
                    <div className="space-y-1">
                      {car.pros.map((p) => (
                        <div key={p} className="flex gap-1.5 text-emerald-600 dark:text-emerald-400">
                          <span className="shrink-0">+</span><span>{p}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-1">
                      {car.cons.map((c) => (
                        <div key={c} className="flex gap-1.5 text-red-500 dark:text-red-400">
                          <span className="shrink-0">−</span><span>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
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
    ? [renderStep0, renderStep1, renderPreferences, renderResults]
    : [renderStep0, renderPreferences, renderResults];

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
