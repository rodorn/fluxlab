"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { event as gaEvent } from "@/lib/gtag";

/* ──────────────── types & constants ──────────────── */

type FuelType = "benzyna" | "diesel" | "gaz" | "elektryczny";
type EngineLayout =
  | "elektryczny"
  | "R3"
  | "R4"
  | "R5"
  | "R6"
  | "V6"
  | "V8"
  | "V10"
  | "V12"
  | "W12"
  | "W16";
type KmPeriod = "dzien" | "tydzien" | "miesiac" | "rok";

interface Data {
  price: number;
  year: number;
  mileage: number;
  kmCity: number;
  kmHighway: number;
  fuelCity: number;
  fuelHighway: number;
  fuelType: FuelType;
  engine: EngineLayout;
  brandReliability: number;
  engineReliability: number;
  yearsOwned: number;
  complexity: number;
}

const INITIAL: Data = {
  price: 50000,
  year: 2015,
  mileage: 150000,
  kmCity: 5000,
  kmHighway: 10000,
  fuelCity: 10,
  fuelHighway: 6,
  fuelType: "benzyna",
  engine: "R4",
  brandReliability: 3,
  engineReliability: 3,
  yearsOwned: 5,
  complexity: 3,
};

const KM_MULTIPLIER: Record<KmPeriod, number> = {
  dzien: 365,
  tydzien: 52,
  miesiac: 12,
  rok: 1,
};

const KM_MAX: Record<KmPeriod, number> = {
  dzien: 1000,
  tydzien: 7000,
  miesiac: 20000,
  rok: 200000,
};

const FUEL_PRICES: Record<FuelType, number> = {
  benzyna: 6.5,
  diesel: 6.2,
  gaz: 3.2,
  elektryczny: 1.5,
};

const ENGINE_MULT: Record<EngineLayout, number> = {
  elektryczny: 1,
  R3: 1,
  R4: 1,
  R5: 1.25,
  R6: 1.5,
  V6: 1.75,
  V8: 2.25,
  V10: 2.75,
  V12: 3.25,
  W12: 3.5,
  W16: 4,
};

const FUEL_MULT: Record<FuelType, number> = {
  benzyna: 1,
  elektryczny: 1,
  gaz: 1.2,
  diesel: 1.6,
};

const YEAR_NOW = 2025;

/* ──────────────── calculation ──────────────── */

interface Result {
  totalCost: number;
  monthly: number;
  costPerKm: number;
  costPerHour: number;
  fuelCost: number;
  lostValue: number;
  repairs: number;
  ageStart: number;
  ageEnd: number;
  kmCityYear: number;
  kmHighwayYear: number;
  totalKm: number;
  finalMileage: number;
  totalHours: number;
}

function calculate(d: Data, kmPeriod: KmPeriod): Result {
  const kmCityYear = d.kmCity * KM_MULTIPLIER[kmPeriod];
  const kmHighwayYear = d.kmHighway * KM_MULTIPLIER[kmPeriod];
  const totalKm = (kmCityYear + kmHighwayYear) * d.yearsOwned;

  const fuelCost =
    ((kmCityYear * d.fuelCity + kmHighwayYear * d.fuelHighway) / 100) *
    FUEL_PRICES[d.fuelType] *
    d.yearsOwned;

  const ageStart = YEAR_NOW - d.year;
  const ageEnd = ageStart + d.yearsOwned;
  const lostValue = d.price * (1.05 - (ageStart + 6) / (ageEnd + 6));

  const averageKm = (totalKm + 2 * d.mileage) / 2;

  const brandFactor =
    (d.complexity + 1) *
    (averageKm < 200000
      ? Math.max(
          0,
          d.brandReliability -
            (d.brandReliability - 1) * ((200000 - averageKm) / 200000),
        )
      : d.brandReliability);

  const engineFactor =
    (averageKm < 300000
      ? Math.max(
          0,
          d.engineReliability -
            (d.engineReliability - 1) * ((300000 - averageKm) / 300000),
        )
      : d.engineReliability) *
    ENGINE_MULT[d.engine] *
    FUEL_MULT[d.fuelType];

  const reliabilityFactor = (brandFactor + engineFactor) / 50;

  const totalKmCity = kmCityYear * d.yearsOwned;
  const totalKmHighway = kmHighwayYear * d.yearsOwned;
  const weightedKm = totalKmCity * 2 + totalKmHighway;
  const repairs = reliabilityFactor * weightedKm;

  const totalCost = fuelCost + repairs + lostValue;
  const monthly = totalCost / (12 * d.yearsOwned);
  const costPerKm = totalKm > 0 ? totalCost / totalKm : 0;

  const hoursCity = totalKmCity / 25;
  const hoursHighway = totalKmHighway / 80;
  const totalHours = hoursCity + hoursHighway;
  const costPerHour = totalHours > 0 ? totalCost / totalHours : 0;

  return {
    totalCost,
    monthly,
    costPerKm,
    costPerHour,
    fuelCost,
    lostValue,
    repairs,
    ageStart,
    ageEnd,
    kmCityYear,
    kmHighwayYear,
    totalKm,
    finalMileage: d.mileage + totalKm,
    totalHours,
  };
}

/* ──────────────── editable value ──────────────── */

function EditableValue({
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  const commit = () => {
    setEditing(false);
    const raw = parseFloat(draft.replace(/\s/g, "").replace(",", "."));
    if (isNaN(raw)) return;
    const clamped = Math.min(max, Math.max(min, raw));
    const snapped =
      step >= 1
        ? Math.round(clamped / step) * step
        : Math.round(clamped * (1 / step)) / (1 / step);
    onChange(snapped);
  };

  if (editing) {
    return (
      <span className="inline-flex items-baseline gap-1">
        <input
          ref={inputRef}
          type="text"
          inputMode="decimal"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
            if (e.key === "Escape") setEditing(false);
          }}
          className="w-20 text-right text-sm font-semibold text-accent tabular-nums bg-accent/10 border border-accent/30 rounded-md px-1.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
        {unit && (
          <span className="text-gray-400 text-sm font-normal">{unit}</span>
        )}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        setDraft(String(value));
        setEditing(true);
      }}
      className="text-sm font-semibold text-accent tabular-nums hover:bg-accent/10 rounded-md px-1.5 py-0.5 -mr-1.5 transition-colors cursor-text"
      title="Kliknij, aby wpisać wartość"
    >
      {value.toLocaleString("pl-PL")}
      {unit && <span className="text-gray-400 font-normal"> {unit}</span>}
    </button>
  );
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
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  hint?: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
        <EditableValue
          value={value}
          min={min}
          max={max}
          step={step}
          unit={unit}
          onChange={onChange}
        />
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

/* ──────────────── log slider ──────────────── */

function LogSlider({
  label,
  value,
  min,
  max,
  unit,
  hint,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit?: string;
  hint?: string;
  onChange: (v: number) => void;
}) {
  const logMin = Math.log10(Math.max(1, min));
  const logMax = Math.log10(max);
  const logVal = Math.log10(Math.max(1, value));
  const pct = ((logVal - logMin) / (logMax - logMin)) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
        <EditableValue
          value={value}
          min={min}
          max={max}
          step={1}
          unit={unit}
          onChange={onChange}
        />
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
          min={logMin}
          max={logMax}
          step={0.01}
          value={logVal}
          onChange={(e) => onChange(Math.round(10 ** Number(e.target.value)))}
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

/* ──────────────── pill selector ──────────────── */

function PillSelector<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: T; label: string; tooltip?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`relative group px-3 py-1.5 rounded-lg text-sm font-medium border-2 transition-all ${
              value === opt.id
                ? "border-accent bg-accent/10 text-accent"
                : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            {opt.label}
            {opt.tooltip && (
              <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-60 rounded-lg bg-gray-900 dark:bg-gray-700 text-xs text-white px-3 py-2 opacity-0 group-hover:opacity-100 transition pointer-events-none z-20 text-left leading-relaxed">
                {opt.tooltip}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ──────────────── rating selector ──────────────── */

function RatingSelector({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: number; icon: string; tooltip: string }[];
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
        {label}
      </span>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`relative group w-10 h-10 flex items-center justify-center rounded-xl border-2 text-lg transition-all ${
              value === opt.value
                ? "border-accent bg-accent/10"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            {opt.icon}
            <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 rounded-lg bg-gray-900 dark:bg-gray-700 text-xs text-white px-3 py-2 opacity-0 group-hover:opacity-100 transition pointer-events-none z-20 text-left leading-relaxed">
              {opt.tooltip}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ──────────────── result row ──────────────── */

function ResultRow({
  label,
  value,
  accent,
  tooltip,
}: {
  label: string;
  value: string;
  accent?: boolean;
  tooltip?: string;
}) {
  return (
    <div className="relative group flex flex-col gap-0.5 p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
      <span className="text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-500 flex items-center gap-1">
        {label}
        {tooltip && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="shrink-0 opacity-40 group-hover:opacity-70 transition-opacity"
          >
            <circle cx="6" cy="6" r="5.5" stroke="currentColor" />
            <path
              d="M6 5.5V8.5M6 3.5V4"
              stroke="currentColor"
              strokeLinecap="round"
            />
          </svg>
        )}
      </span>
      <span
        className={`font-medium ${accent ? "text-accent text-lg" : "text-gray-900 dark:text-white"}`}
      >
        {value}
      </span>
      {tooltip && (
        <span className="absolute left-0 right-0 bottom-full mb-2 rounded-lg bg-gray-900 dark:bg-gray-700 text-xs text-white px-3 py-2 opacity-0 group-hover:opacity-100 transition pointer-events-none z-20 leading-relaxed whitespace-pre-line">
          {tooltip}
        </span>
      )}
    </div>
  );
}

/* ──────────────── saved car for comparison ──────────────── */

interface SavedCar {
  id: number;
  name: string;
  data: Data;
}

const COMPARE_COLORS = [
  "bg-accent",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-500",
];

/* ──────────────── main component ──────────────── */

export default function CarCostCalculator() {
  const [data, setData] = useState<Data>(INITIAL);
  const [kmPeriod, setKmPeriodRaw] = useState<KmPeriod>("rok");

  useEffect(() => {
    gaEvent("calculator_viewed", { calculator: "car_cost" });
  }, []);

  const setKmPeriod = (newPeriod: KmPeriod) => {
    const oldMult = KM_MULTIPLIER[kmPeriod];
    const newMult = KM_MULTIPLIER[newPeriod];
    setData((prev) => ({
      ...prev,
      kmCity: Math.round((prev.kmCity * oldMult) / newMult),
      kmHighway: Math.round((prev.kmHighway * oldMult) / newMult),
    }));
    setKmPeriodRaw(newPeriod);
  };
  const [showResults, setShowResults] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [query, setQuery] = useState("");
  const [parsing, setParsing] = useState(false);
  const [parseError, setParseError] = useState("");
  const [parsedLabel, setParsedLabel] = useState("");
  const [savedCars, setSavedCars] = useState<SavedCar[]>([]);
  const [nextId, setNextId] = useState(1);
  const [activeCarId, setActiveCarId] = useState<number | null>(null);
  const formTopRef = useRef<HTMLDivElement>(null);
  const compareRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof Data>(key: K, val: Data[K]) => {
    setData((prev) => ({ ...prev, [key]: val }));
    // Live-sync form edits to the active saved car
    if (activeCarId != null) {
      setSavedCars((prev) =>
        prev.map((c) =>
          c.id === activeCarId ? { ...c, data: { ...c.data, [key]: val } } : c,
        ),
      );
    }
  };

  const result = useMemo(() => calculate(data, kmPeriod), [data, kmPeriod]);

  const displayLabel =
    activeCarId != null
      ? (savedCars.find((c) => c.id === activeCarId)?.name ?? null)
      : null;

  const fmt = (n: number) =>
    n.toLocaleString("pl-PL", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  const fmt2 = (n: number) =>
    n.toLocaleString("pl-PL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const periodLabels: Record<KmPeriod, string> = {
    dzien: "dziennie",
    tydzien: "tygodniowo",
    miesiac: "miesięcznie",
    rok: "rocznie",
  };

  const addToCompare = () => {
    const newId = nextId;
    const defaultName = query.trim() || `Pojazd ${newId}`;
    setSavedCars((prev) => [
      ...prev,
      { id: newId, name: defaultName, data: { ...data } },
    ]);
    setActiveCarId(newId);
    setNextId((n) => n + 1);
    setShowResults(true);
    setTimeout(() => scrollToRef(compareRef), 100);
  };

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const removeSavedCar = (id: number) => {
    setSavedCars((prev) => prev.filter((c) => c.id !== id));
    if (activeCarId === id) setActiveCarId(null);
  };

  const loadSavedCar = (car: SavedCar) => {
    setData((prev) => ({
      ...car.data,
      kmCity: prev.kmCity,
      kmHighway: prev.kmHighway,
      yearsOwned: prev.yearsOwned,
    }));
    setActiveCarId(car.id);
    setQuery(car.name);
    setShowResults(true);
  };

  // Recalculate results for all saved cars using current shared km/years values
  const compareResults = useMemo(
    () =>
      savedCars.map((car) => ({
        ...car,
        result: calculate(
          {
            ...car.data,
            kmCity: data.kmCity,
            kmHighway: data.kmHighway,
            yearsOwned: data.yearsOwned,
          },
          kmPeriod,
        ),
      })),
    [savedCars, data.kmCity, data.kmHighway, data.yearsOwned, kmPeriod],
  );

  const parsedToData = (parsed: Record<string, unknown>): Partial<Data> => {
    const out: Partial<Data> = {};
    if (parsed.price != null) out.price = parsed.price as number;
    if (parsed.year != null) out.year = parsed.year as number;
    if (parsed.mileage != null) out.mileage = parsed.mileage as number;
    if (parsed.fuelType) out.fuelType = parsed.fuelType as FuelType;
    if (parsed.engine) out.engine = parsed.engine as EngineLayout;
    if (parsed.fuelCity != null) out.fuelCity = parsed.fuelCity as number;
    if (parsed.fuelHighway != null)
      out.fuelHighway = parsed.fuelHighway as number;
    if (parsed.brandReliability != null)
      out.brandReliability = parsed.brandReliability as number;
    if (parsed.engineReliability != null)
      out.engineReliability = parsed.engineReliability as number;
    if (parsed.complexity != null) out.complexity = parsed.complexity as number;
    return out;
  };

  const fetchOneCar = async (
    q: string,
  ): Promise<{ name: string; parsed: Record<string, unknown> } | null> => {
    const res = await fetch("/api/car-parse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: q }),
    });
    if (!res.ok) return null;
    return { name: q, parsed: await res.json() };
  };

  const handleParse = async () => {
    if (!query.trim()) return;
    setParsing(true);
    setParseError("");
    setParsedLabel("");

    const parts = query
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean);
    const isMulti = parts.length > 1;

    try {
      if (isMulti) {
        // Fetch all in parallel
        const results = await Promise.all(parts.map(fetchOneCar));
        const errors: string[] = [];
        const newCars: SavedCar[] = [];
        let currentId = nextId;

        results.forEach((r, i) => {
          if (!r) {
            errors.push(parts[i]);
            return;
          }
          const carData: Data = {
            ...INITIAL,
            ...data,
            ...parsedToData(r.parsed),
            kmCity: data.kmCity,
            kmHighway: data.kmHighway,
            yearsOwned: data.yearsOwned,
          };
          newCars.push({ id: currentId, name: r.name, data: carData });
          currentId++;
        });

        setSavedCars((prev) => [...prev, ...newCars]);
        setNextId(currentId);
        setShowResults(true);

        // Select the first new car
        if (newCars.length > 0) {
          setActiveCarId(newCars[0].id);
          setData((prev) => ({
            ...newCars[0].data,
            kmCity: prev.kmCity,
            kmHighway: prev.kmHighway,
            yearsOwned: prev.yearsOwned,
          }));
        }

        if (errors.length > 0) {
          setParseError(`Nie udało się: ${errors.join(", ")}`);
        }
        const addedCount = newCars.length;
        setParsedLabel(
          addedCount > 0
            ? `Dodano ${addedCount} ${addedCount === 1 ? "pojazd" : addedCount < 5 ? "pojazdy" : "pojazdów"} do porównania`
            : "",
        );

        setTimeout(() => scrollToRef(compareRef), 100);
      } else {
        // Single car — fill form as new (unsaved) car
        const r = await fetchOneCar(parts[0]);
        if (!r) {
          setParseError("Wystąpił błąd");
          return;
        }
        setActiveCarId(null);
        const carData: Data = { ...data, ...parsedToData(r.parsed) };
        setData(carData);
        setParsedLabel("Dane uzupełnione");
      }
    } catch {
      setParseError("Nie udało się połączyć z serwerem");
    } finally {
      setParsing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {/* ── AI input ── */}
      <div
        ref={formTopRef}
        className="rounded-2xl bg-accent/5 dark:bg-accent/10 border border-accent/20 p-6 space-y-3"
      >
        <h2 className="text-sm font-semibold text-accent">
          Szybkie wypełnianie
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Wklej link do ogłoszenia lub opisz samochód. Rozdziel średnikiem, żeby
          porównać kilka naraz.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleParse()}
            placeholder="np. BMW 320d 2018; Mazda 6 2.0 2019; link otomoto..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
          />
          <button
            type="button"
            onClick={handleParse}
            disabled={parsing || !query.trim()}
            className="btn-primary shrink-0 disabled:opacity-40 disabled:pointer-events-none"
          >
            {parsing ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Analizuję...
              </span>
            ) : (
              "Uzupełnij"
            )}
          </button>
        </div>
        {parseError && <p className="text-sm text-red-500">{parseError}</p>}
        {parsedLabel && (
          <p className="text-sm text-emerald-600 dark:text-emerald-400">
            {parsedLabel}
          </p>
        )}
      </div>

      {/* ── Dane pojazdu ── */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Dane pojazdu
          </h2>
          {displayLabel && (
            <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
              {displayLabel}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {activeCarId != null
            ? "Edytujesz zapisany pojazd — zmiany aktualizują się na żywo"
            : "Podstawowe informacje o samochodzie"}
        </p>
      </div>

      <div className="space-y-6">
        <LogSlider
          label="Cena zakupu"
          value={data.price}
          min={5000}
          max={500000}
          unit="PLN"
          onChange={(v) => set("price", v)}
        />

        <Slider
          label="Rok produkcji"
          value={data.year}
          min={2000}
          max={YEAR_NOW}
          step={1}
          onChange={(v) => set("year", v)}
        />

        <LogSlider
          label="Aktualny przebieg"
          value={data.mileage}
          min={1000}
          max={500000}
          unit="km"
          onChange={(v) => set("mileage", v)}
        />
      </div>

      {/* ── Silnik i paliwo ── */}
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Silnik i paliwo
        </h2>
      </div>

      <div className="space-y-6">
        <PillSelector<FuelType>
          label="Typ paliwa"
          options={[
            { id: "benzyna", label: "Benzyna" },
            { id: "diesel", label: "Diesel" },
            { id: "gaz", label: "LPG" },
            { id: "elektryczny", label: "Elektryczny" },
          ]}
          value={data.fuelType}
          onChange={(v) => set("fuelType", v)}
        />

        <Slider
          label="Spalanie w mieście"
          value={data.fuelCity}
          min={4}
          max={25}
          step={0.5}
          unit="L/100km"
          onChange={(v) => set("fuelCity", v)}
        />

        <Slider
          label="Spalanie w trasie"
          value={data.fuelHighway}
          min={4}
          max={20}
          step={0.5}
          unit="L/100km"
          onChange={(v) => set("fuelHighway", v)}
        />
      </div>

      {/* ── Zaawansowane (akordeon) ── */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Zaawansowane
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Awaryjność i segment pojazdu
            </p>
          </div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className={`shrink-0 text-gray-400 transition-transform duration-200 ${showAdvanced ? "rotate-180" : ""}`}
          >
            <path
              d="M5 7.5l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {showAdvanced && (
          <div className="px-6 pb-6 space-y-6 border-t border-gray-100 dark:border-gray-800 pt-4">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Najedź na ikonę, żeby zobaczyć opis. Te wartości są ustawiane
              automatycznie przez AI.
            </p>

            <PillSelector<EngineLayout>
              label="Układ silnika"
              options={(
                [
                  "elektryczny",
                  "R3",
                  "R4",
                  "R5",
                  "R6",
                  "V6",
                  "V8",
                  "V10",
                  "V12",
                  "W12",
                  "W16",
                ] as EngineLayout[]
              ).map((e) => ({ id: e, label: e }))}
              value={data.engine}
              onChange={(v) => set("engine", v)}
            />

            <RatingSelector
              label="Awaryjność marki"
              value={data.brandReliability}
              onChange={(v) => set("brandReliability", v)}
              options={[
                {
                  value: 1,
                  icon: "\u{1F7E2}",
                  tooltip: "Niezawodne: Toyota, Porsche, Lexus, Honda",
                },
                {
                  value: 2,
                  icon: "\u{1F7E0}",
                  tooltip: "Przeciętne: większość marek (VW, Ford, Hyundai...)",
                },
                {
                  value: 3,
                  icon: "\u{1F534}",
                  tooltip:
                    "Znane z awaryjności (np. starsze Audi, Land Rover, Alfa Romeo)",
                },
              ]}
            />

            <RatingSelector
              label="Awaryjność silnika"
              value={data.engineReliability}
              onChange={(v) => set("engineReliability", v)}
              options={[
                {
                  value: 1,
                  icon: "\u{1F512}",
                  tooltip:
                    "Wyjątkowo trwały, klasyczna konstrukcja, minimum elektroniki (np. wolnossący japoński R4, Mercedes OM617)",
                },
                {
                  value: 2,
                  icon: "\u{2699}\u{FE0F}",
                  tooltip:
                    "Prosty, sprawdzony silnik (np. TDI PD, benzynowe VAG, Toyota R4, Ford Zetec)",
                },
                {
                  value: 3,
                  icon: "\u{1F9F0}",
                  tooltip:
                    "Średnio zaawansowany - turbo, więcej elektroniki (np. 1.4 TSI, Ford EcoBoost, PSA THP)",
                },
                {
                  value: 4,
                  icon: "\u{1F6D1}",
                  tooltip:
                    "Złożony technicznie, kosztowne usterki (np. BMW N47, Audi V6/V8 TFSI, nowsze diesle)",
                },
                {
                  value: 5,
                  icon: "\u{1F4B8}",
                  tooltip:
                    "Egzotyka, bardzo drogie części i naprawy (np. V10, V12, W12, W16, stare FSI Audi)",
                },
              ]}
            />

            <PillSelector
              label="Segment pojazdu"
              options={[
                {
                  id: "1",
                  label: "A/B",
                  tooltip: "Mikrosamochody, miejskie, hatchbacki segmentu B",
                },
                {
                  id: "2",
                  label: "C",
                  tooltip: "Kompaktowe: Golf, Astra, Focus, Corolla",
                },
                {
                  id: "3",
                  label: "D",
                  tooltip: "Klasa średnia: Passat, Mondeo, Mazda 6, Superb",
                },
                {
                  id: "4",
                  label: "E",
                  tooltip: "Wyższa średnia: BMW 5, E-klasa, A6, Lexus GS",
                },
                {
                  id: "5",
                  label: "F",
                  tooltip: "Limuzyny, luksusowe: BMW 7, S-klasa, A8",
                },
              ]}
              value={String(data.complexity)}
              onChange={(v) => set("complexity", Number(v))}
            />
          </div>
        )}
      </div>

      {/* ── Przyciski ── */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => {
            setShowResults(true);
            if (savedCars.length > 0)
              setTimeout(() => scrollToRef(compareRef), 100);
          }}
          className="btn-primary flex-1 text-center text-lg"
        >
          Oblicz koszty
        </button>
        {activeCarId == null && (
          <button
            type="button"
            onClick={addToCompare}
            className="px-5 py-3 rounded-xl text-sm font-medium border-2 border-accent text-accent hover:bg-accent/10 transition-colors shrink-0"
          >
            + Porównaj
          </button>
        )}
      </div>

      {/* ── Porównanie ── */}
      {savedCars.length > 0 && (
        <div ref={compareRef} className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Porównanie pojazdów
            </h2>
            <button
              type="button"
              onClick={() => {
                setSavedCars([]);
                setActiveCarId(null);
              }}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors"
            >
              Wyczyść wszystkie
            </button>
          </div>

          {/* Saved car chips */}
          <div className="flex flex-wrap gap-2">
            {savedCars.map((car, i) => {
              const isActive = activeCarId === car.id;
              return (
                <div
                  key={car.id}
                  className={`flex items-center gap-2 pl-3 pr-1.5 py-1.5 rounded-lg border-2 text-sm transition-all ${
                    isActive
                      ? "border-accent bg-accent/5 dark:bg-accent/10"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                  }`}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${COMPARE_COLORS[i % COMPARE_COLORS.length]}`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      loadSavedCar(car);
                      scrollToRef(formTopRef);
                    }}
                    className={`transition-colors truncate max-w-[200px] ${
                      isActive
                        ? "text-accent font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:text-accent"
                    }`}
                    title="Edytuj ten pojazd w formularzu"
                  >
                    {car.name}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSavedCar(car.id)}
                    className="p-1 text-gray-300 dark:text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M3 3l8 8M11 3l-8 8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Comparison table */}
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 pr-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider w-40">
                    Parametr
                  </th>
                  {compareResults.map((car, i) => (
                    <th
                      key={car.id}
                      className="text-right py-3 px-3 min-w-[120px]"
                    >
                      <div className="flex items-center justify-end gap-2">
                        <div
                          className={`w-2 h-2 rounded-full shrink-0 ${COMPARE_COLORS[i % COMPARE_COLORS.length]}`}
                        />
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 truncate max-w-[100px]">
                          {car.name}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {(
                  [
                    {
                      label: "Cena zakupu",
                      key: "price",
                      format: (r: Result, d: Data) => `${fmt(d.price)} PLN`,
                    },
                    {
                      label: "Rok / przebieg",
                      key: "yearMileage",
                      format: (r: Result, d: Data) =>
                        `${d.year} / ${fmt(d.mileage)} km`,
                    },
                    {
                      label: "Paliwo",
                      key: "fuel",
                      format: (_r: Result, d: Data) =>
                        `${d.fuelType} ${d.engine}`,
                    },
                    {
                      label: "Koszt całkowity",
                      key: "total",
                      format: (r: Result) => `${fmt(r.totalCost)} PLN`,
                      bold: true,
                    },
                    {
                      label: "Koszt miesięczny",
                      key: "monthly",
                      format: (r: Result) => `${fmt(r.monthly)} PLN`,
                      bold: true,
                    },
                    {
                      label: "Koszt / km",
                      key: "perKm",
                      format: (r: Result) => `${fmt2(r.costPerKm)} PLN`,
                    },
                    {
                      label: "Koszt / godz.",
                      key: "perHour",
                      format: (r: Result) => `${fmt2(r.costPerHour)} PLN`,
                    },
                    {
                      label: "Paliwo",
                      key: "fuelCost",
                      format: (r: Result) => `${fmt(r.fuelCost)} PLN`,
                    },
                    {
                      label: "Spadek wartości",
                      key: "depreciation",
                      format: (r: Result) => `${fmt(r.lostValue)} PLN`,
                    },
                    {
                      label: "Serwis i naprawy",
                      key: "repairs",
                      format: (r: Result) => `${fmt(r.repairs)} PLN`,
                    },
                  ] as {
                    label: string;
                    key: string;
                    format: (r: Result, d: Data) => string;
                    bold?: boolean;
                  }[]
                ).map((row) => {
                  const isMoneyRow = !["price", "yearMileage", "fuel"].includes(
                    row.key,
                  );
                  const values = isMoneyRow
                    ? compareResults.map((car) => {
                        const r = car.result;
                        if (row.key === "total") return r.totalCost;
                        if (row.key === "monthly") return r.monthly;
                        if (row.key === "perKm") return r.costPerKm;
                        if (row.key === "perHour") return r.costPerHour;
                        if (row.key === "fuelCost") return r.fuelCost;
                        if (row.key === "depreciation") return r.lostValue;
                        if (row.key === "repairs") return r.repairs;
                        return 0;
                      })
                    : [];
                  const minVal = values.length > 1 ? Math.min(...values) : -1;

                  return (
                    <tr key={row.key}>
                      <td className="py-2.5 pr-4 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {row.label}
                      </td>
                      {compareResults.map((car, i) => {
                        const val = isMoneyRow ? values[i] : -1;
                        const isBest =
                          isMoneyRow &&
                          compareResults.length > 1 &&
                          val === minVal;
                        return (
                          <td
                            key={car.id}
                            className={`py-2.5 px-3 text-right whitespace-nowrap ${
                              row.bold
                                ? "font-semibold text-accent"
                                : isBest
                                  ? "font-medium text-emerald-600 dark:text-emerald-400"
                                  : "text-gray-900 dark:text-white"
                            }`}
                          >
                            {row.format(car.result, car.data)}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            onClick={() => {
              setActiveCarId(null);
              setData((prev) => ({
                ...INITIAL,
                kmCity: prev.kmCity,
                kmHighway: prev.kmHighway,
                yearsOwned: prev.yearsOwned,
              }));
              setQuery("");
              scrollToRef(formTopRef);
            }}
            className="w-full py-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-accent hover:text-accent transition-colors"
          >
            + Dodaj nowy samochód
          </button>
        </div>
      )}

      {/* ── Przebiegi & okres (wspólne) ── */}
      {showResults && (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Przebiegi i użytkowanie
              </h2>
              {savedCars.length > 0 && (
                <span className="text-[10px] font-semibold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                  Wspólne dla porównania
                </span>
              )}
            </div>
          </div>

          <PillSelector<KmPeriod>
            label="Podaj przebiegi za okres"
            options={[
              { id: "dzien", label: "Dzień" },
              { id: "tydzien", label: "Tydzień" },
              { id: "miesiac", label: "Miesiąc" },
              { id: "rok", label: "Rok" },
            ]}
            value={kmPeriod}
            onChange={setKmPeriod}
          />

          <LogSlider
            label={`Km w mieście (${periodLabels[kmPeriod]})`}
            value={data.kmCity}
            min={1}
            max={KM_MAX[kmPeriod]}
            unit="km"
            onChange={(v) => set("kmCity", v)}
          />

          <LogSlider
            label={`Km w trasie (${periodLabels[kmPeriod]})`}
            value={data.kmHighway}
            min={1}
            max={KM_MAX[kmPeriod]}
            unit="km"
            onChange={(v) => set("kmHighway", v)}
          />

          <Slider
            label="Planowany okres użytkowania"
            value={data.yearsOwned}
            min={1}
            max={20}
            step={1}
            unit="lat"
            onChange={(v) => set("yearsOwned", v)}
          />
        </div>
      )}

      {/* ── Wyniki ── */}
      {showResults && (
        <div className="space-y-6">
          {(() => {
            const d = data;
            const r = result;
            const fuelPrice = FUEL_PRICES[d.fuelType];
            const kmTotal = r.totalKm;
            return (
              <>
                <div className="rounded-2xl border-2 border-accent/30 bg-accent/5 dark:bg-accent/10 p-8 space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center">
                    {displayLabel && (
                      <span className="text-accent">{displayLabel}</span>
                    )}
                    {displayLabel ? " — " : ""}Podsumowanie kosztów (
                    {data.yearsOwned}{" "}
                    {data.yearsOwned === 1
                      ? "rok"
                      : data.yearsOwned < 5
                        ? "lata"
                        : "lat"}
                    )
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <ResultRow
                      label="Całkowity koszt"
                      value={`${fmt(r.totalCost)} PLN`}
                      accent
                      tooltip={`Paliwo ${fmt(r.fuelCost)} + spadek wartości ${fmt(r.lostValue)} + serwis ${fmt(r.repairs)} PLN`}
                    />
                    <ResultRow
                      label="Koszt miesięczny"
                      value={`${fmt(r.monthly)} PLN`}
                      accent
                      tooltip={`${fmt(r.totalCost)} PLN / ${data.yearsOwned * 12} mies. = ${fmt(r.monthly)} PLN/mies.`}
                    />
                    <ResultRow
                      label="Koszt na km"
                      value={`${fmt2(r.costPerKm)} PLN`}
                      tooltip={`${fmt(r.totalCost)} PLN / ${fmt(kmTotal)} km = ${fmt2(r.costPerKm)} PLN/km`}
                    />
                    <ResultRow
                      label="Koszt na godzinę jazdy"
                      value={`${fmt2(r.costPerHour)} PLN`}
                      tooltip={`${fmt(r.totalCost)} PLN / ${fmt(Math.round(r.totalHours))} godz.\nMiasto ~25 km/h, trasa ~80 km/h`}
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-3">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    Szczegóły kalkulacji
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <ResultRow
                      label="Wiek na starcie"
                      value={`${r.ageStart} lat`}
                      tooltip={`${YEAR_NOW} - ${d.year} = ${r.ageStart} lat`}
                    />
                    <ResultRow
                      label="Wiek na koniec"
                      value={`${r.ageEnd} lat`}
                      tooltip={`${r.ageStart} + ${data.yearsOwned} lat użytkowania = ${r.ageEnd} lat`}
                    />
                    <ResultRow
                      label="Km rocznie (miasto)"
                      value={`${fmt(r.kmCityYear)} km`}
                      tooltip={`${fmt(d.kmCity)} km × ${KM_MULTIPLIER[kmPeriod]} = ${fmt(r.kmCityYear)} km/rok`}
                    />
                    <ResultRow
                      label="Km rocznie (trasa)"
                      value={`${fmt(r.kmHighwayYear)} km`}
                      tooltip={`${fmt(d.kmHighway)} km × ${KM_MULTIPLIER[kmPeriod]} = ${fmt(r.kmHighwayYear)} km/rok`}
                    />
                    <ResultRow
                      label="Łączny przebieg"
                      value={`${fmt(r.totalKm)} km`}
                      tooltip={`(${fmt(r.kmCityYear)} + ${fmt(r.kmHighwayYear)}) × ${data.yearsOwned} lat = ${fmt(r.totalKm)} km`}
                    />
                    <ResultRow
                      label="Końcowy przebieg"
                      value={`${fmt(r.finalMileage)} km`}
                      tooltip={`${fmt(d.mileage)} km aktualny + ${fmt(r.totalKm)} km = ${fmt(r.finalMileage)} km`}
                    />
                  </div>

                  <div className="border-t border-gray-100 dark:border-gray-800 pt-3 mt-3">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Podział kosztów
                    </h4>
                    <div className="space-y-2">
                      {[
                        {
                          label: "Paliwo",
                          value: r.fuelCost,
                          color: "bg-blue-500",
                          tip: `Miasto: ${fmt(r.kmCityYear)} km × ${d.fuelCity} L/100km\nTrasa: ${fmt(r.kmHighwayYear)} km × ${d.fuelHighway} L/100km\nCena ${d.fuelType}: ${fuelPrice.toFixed(2)} PLN/L × ${data.yearsOwned} lat`,
                        },
                        {
                          label: "Spadek wartości",
                          value: r.lostValue,
                          color: "bg-amber-500",
                          tip: `Cena ${fmt(d.price)} PLN\nWiek ${r.ageStart} → ${r.ageEnd} lat\nSzybsza utrata wartości w pierwszych latach, wolniejsza potem`,
                        },
                        {
                          label: "Serwis i naprawy",
                          value: r.repairs,
                          color: "bg-red-500",
                          tip: `Awaryjność marki: ${d.brandReliability}/3, silnika: ${d.engineReliability}/5\nSilnik ${d.engine}, segment ${d.complexity}/5\nKm w mieście ×2 (większe zużycie)`,
                        },
                      ].map((item) => {
                        const pct =
                          r.totalCost > 0
                            ? (item.value / r.totalCost) * 100
                            : 0;
                        return (
                          <div key={item.label} className="relative group">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                {item.label}
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  className="shrink-0 opacity-40 group-hover:opacity-70 transition-opacity"
                                >
                                  <circle
                                    cx="6"
                                    cy="6"
                                    r="5.5"
                                    stroke="currentColor"
                                  />
                                  <path
                                    d="M6 5.5V8.5M6 3.5V4"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {fmt(item.value)} PLN ({pct.toFixed(0)}%)
                              </span>
                            </div>
                            <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                              <div
                                className={`h-2 rounded-full ${item.color} transition-all`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="absolute left-0 right-0 bottom-full mb-2 rounded-lg bg-gray-900 dark:bg-gray-700 text-xs text-white px-3 py-2 opacity-0 group-hover:opacity-100 transition pointer-events-none z-20 leading-relaxed whitespace-pre-line">
                              {item.tip}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
