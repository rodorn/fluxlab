"use client";

import { useState, useMemo } from "react";

/* ───────────────────────── types ───────────────────────── */

type BodyStyle = "sportowy" | "sedan" | "crossover" | "suv" | "terenowy";
type BodyShape = "hatchback" | "sedan" | "kombi" | "liftback";

interface Answers {
  height: number;
  passengers: number;
  longTrips: number; // 0 = tylko miasto, 100 = tylko trasa
  segmentOverride: Segment | null;
  bodyStyle: BodyStyle | null;
  bodyShape: BodyShape | null;
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
  bodyShape: null,
  luggageFreq: 30,
  foldSeats: false,
  maxSpeed: 130,
  powerOverride: null,
};

/* ──────────────── segment logic ──────────────── */

type Segment = "A" | "B" | "C" | "D" | "E" | "F";

const SEGMENT_NAMES: Record<Segment, string> = {
  A: "A – mini (np. Fiat 500, Toyota Aygo)",
  B: "B – małe (np. VW Polo, Mazda 2)",
  C: "C – klasa średnia niższa, kompakt (np. VW Golf, Toyota Corolla)",
  D: "D – klasa średnia (np. BMW serii 3, Mazda 6)",
  E: "E – klasa średnia wyższa (np. BMW serii 5, Mercedes klasy E)",
  F: "F – klasa wyższa (np. BMW serii 7, Mercedes klasy S)",
};

function calcSegment(a: Answers): Segment {
  let score = 0;
  // wzrost
  if (a.height >= 170) score += a.height-170;
  // pasażerowie
  score += a.passengers * 10
  // trasy
  score *= ((a.longTrips + 100) / 100);

  if (score <= 20) return "A";
  if (score <= 40) return "B";
  if (score <= 60) return "C";
  if (score <= 80) return "D";
  if (score <= 120) return "E";
  return "F";
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
}: {
  options: { id: T; title: string; icon: string; pros: string[]; cons: string[] }[];
  value: T | null;
  onChange: (v: T) => void;
}) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {options.map((opt) => {
        const selected = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`text-left p-5 rounded-2xl border-2 transition-all ${
              selected
                ? "border-accent bg-accent/5 dark:bg-accent/10 shadow-sm"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{opt.icon}</span>
              <span
                className={`font-semibold text-sm ${
                  selected
                    ? "text-accent"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                {opt.title}
              </span>
            </div>
            <div className="space-y-1.5 text-xs">
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
          </button>
        );
      })}
    </div>
  );
}

/* ──────────────── body style options ──────────────── */

const BODY_STYLES: {
  id: BodyStyle;
  title: string;
  icon: string;
  pros: string[];
  cons: string[];
}[] = [
  {
    id: "sportowy",
    title: "Sportowy / Coupé",
    icon: "🏎️",
    pros: [
      "Nisko osadzony – świetna przyczepność",
      "Doskonałe prowadzenie i reakcje",
      "Niski współczynnik oporu Cx",
    ],
    cons: [
      "Mało miejsca dla pasażerów",
      "Niska – trudniej wsiadać/wysiadać",
      "Mały bagażnik",
    ],
  },
  {
    id: "sedan",
    title: "Osobowy / Sedan",
    icon: "🚗",
    pros: [
      "Uniwersalny – sprawdzi się wszędzie",
      "Dobry komfort na trasie",
      "Rozsądna cena i spalanie",
    ],
    cons: [
      "Mniejszy bagażnik niż kombi",
      "Przeciętne na nierównej drodze",
    ],
  },
  {
    id: "crossover",
    title: "Crossover",
    icon: "🚙",
    pros: [
      "Wyższa pozycja – lepsza widoczność",
      "Wygodne wsiadanie/wysiadanie",
      "Kompromis między SUV a osobowym",
    ],
    cons: [
      "Wyższe spalanie niż sedan",
      "Gorsze prowadzenie niż niski samochód",
      "Często droższy od odpowiednika sedan",
    ],
  },
  {
    id: "suv",
    title: "SUV",
    icon: "🛻",
    pros: [
      "Dużo miejsca i wysoka pozycja",
      "Poczucie bezpieczeństwa",
      "Dobra widoczność drogi",
    ],
    cons: [
      "Wysokie spalanie i cena",
      "Gorsze prowadzenie – wysoki środek ciężkości",
      "Trudniej zaparkować w mieście",
    ],
  },
  {
    id: "terenowy",
    title: "Terenowy / Off-road",
    icon: "⛰️",
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

const BODY_SHAPES: {
  id: BodyShape;
  title: string;
  icon: string;
  pros: string[];
  cons: string[];
}[] = [
  {
    id: "hatchback",
    title: "Hatchback",
    icon: "🚗",
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
    icon: "🚘",
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
    icon: "🚃",
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
    icon: "🏁",
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

/* ──────────────── steps ──────────────── */

const STEP_TITLES = [
  "Typ samochodu",
  "Segment",
  "Forma nadwozia",
  "Moc silnika",
];

/* ──────────────── main component ──────────────── */

export default function CarConfigurator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(INITIAL);

  const suggestedSegment = useMemo(() => calcSegment(answers), [answers]);
  const segment = answers.segmentOverride ?? suggestedSegment;
  const suggestedHP = useMemo(
    () => calcSuggestedHP(answers, segment),
    [answers, segment],
  );
  const displayHP = answers.powerOverride ?? suggestedHP;

  const set = <K extends keyof Answers>(key: K, val: Answers[K]) =>
    setAnswers((prev) => ({ ...prev, [key]: val }));

  const canNext = (): boolean =>
    !(step === 0 && !answers.bodyStyle) && !(step === 2 && !answers.bodyShape);

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
          max={5}
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
            Sugerowany segment
          </p>
          <p className="text-2xl font-bold text-accent">{SEGMENT_NAMES[suggestedSegment]}</p>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Możesz wybrać inny segment, jeśli nasza sugestia nie pasuje:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {(Object.keys(SEGMENT_NAMES) as Segment[]).map((s) => {
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
                Przywróć sugerowany segment ({suggestedSegment})
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

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="rounded-2xl bg-accent/5 dark:bg-accent/10 border border-accent/20 p-6">
        <h3 className="text-sm font-semibold text-accent mb-2">
          Jaka forma nadwozia?
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Forma nadwozia wpływa na praktyczność na co dzień – wielkość
          bagażnika, łatwość załadunku i możliwość przewozu dużych rzeczy.
        </p>
      </div>

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

      <CardSelector<BodyShape>
        options={BODY_SHAPES}
        value={answers.bodyShape}
        onChange={(v) => set("bodyShape", v)}
      />
    </div>
  );

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
            Dla segmentu {segment}, {answers.bodyStyle ?? "sedan"},{" "}
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
            <SummaryRow label="Segment" value={SEGMENT_NAMES[segment]} />
            <SummaryRow
              label="Typ samochodu"
              value={
                BODY_STYLES.find((b) => b.id === answers.bodyStyle)?.title ??
                "—"
              }
            />
            <SummaryRow
              label="Forma nadwozia"
              value={
                BODY_SHAPES.find((b) => b.id === answers.bodyShape)?.title ??
                "—"
              }
            />
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

  const steps = [renderStep1, renderStep0, renderStep2, renderStep3];

  return (
    <div className="max-w-3xl mx-auto">
      {/* step indicator */}
      <div className="flex items-center gap-2 mb-10">
        {STEP_TITLES.map((title, i) => (
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
      <div className="min-h-[400px]">{steps[step]()}</div>

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
        {step < 3 ? (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(3, s + 1))}
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
