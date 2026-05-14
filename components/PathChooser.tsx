"use client";

import Link from "next/link";
import { useCallback, useState, type ReactElement } from "react";
import { event as gaEvent } from "@/lib/gtag";
import useTilt from "@/lib/use-tilt";

export type PathKey = "web" | "crm" | "scraping";
export type PathOrDefault = PathKey | "default";

export type PathStat = {
  value: string;
  label: string;
};

export const PATH_STATS: Record<PathOrDefault, PathStat[]> = {
  web: [
    { value: "2-3 tyg", label: "czas wdrożenia nowej strony" },
    { value: "AI w treści", label: "generowanie tekstów, obrazów, kodu" },
    { value: "90+ Web Vitals", label: "performance jako standard" },
    { value: "Mobile-first", label: "100% projektów" },
  ],
  crm: [
    { value: "60-90%", label: "mniej ręcznej pracy" },
    { value: "< 5 min", label: "czas reakcji na leada" },
    { value: "2-4 dni", label: "czas pierwszego wdrożenia" },
    { value: "1-3 mies.", label: "ROI przy dużym wolumenie" },
  ],
  scraping: [
    { value: "4 typy źródeł", label: "web, PDF, maile, dokumenty" },
    { value: "AI rozpoznaje", label: "pola, struktury, kategorie" },
    { value: "Tysiące/h", label: "rekordów w pipeline" },
    { value: "Walidacja live", label: "błędne dane wyłapane od razu" },
  ],
  default: [
    { value: "30+", label: "wdrożeń w różnych branżach B2B" },
    { value: "24h", label: "odpowiedź na zgłoszenie" },
    { value: "2-4 dni", label: "czas pierwszego efektu" },
    { value: "Stała cena", label: "uzgodniona przed startem projektu" },
  ],
};

type PillarDef = {
  key: PathKey;
  name: string;
  caption: string;
  href: string;
  gradient: string;
  animation: "animate-fade-up-2" | "animate-fade-up-3" | "animate-fade-up-4";
  icon: ReactElement;
};

const PILLARS: PillarDef[] = [
  {
    key: "web",
    name: "Strony WWW",
    caption: "Nowa strona albo poprawki w obecnej. Szybko, mobilnie, z AI.",
    href: "/strony-www",
    gradient:
      "from-cyan-500/5 to-violet-500/5 group-hover:from-cyan-500/15 group-hover:to-violet-500/15 group-focus-visible:from-cyan-500/15 group-focus-visible:to-violet-500/15",
    animation: "animate-fade-up-2",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="m7 8 -3 3 3 3" />
        <path d="m13 8 3 3 -3 3" />
      </svg>
    ),
  },
  {
    key: "crm",
    name: "Automatyzacja CRM",
    caption: "Lead → CRM → handlowiec → raport. Bez ręcznej pracy.",
    href: "/automatyzacja-leadow-crm",
    gradient:
      "from-accent/5 to-violet-500/5 group-hover:from-accent/15 group-hover:to-violet-500/15 group-focus-visible:from-accent/15 group-focus-visible:to-violet-500/15",
    animation: "animate-fade-up-3",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
      </svg>
    ),
  },
  {
    key: "scraping",
    name: "Scraping danych",
    caption: "Wyciągam dane z web, PDF, maili. AI rozpoznaje pola.",
    href: "/scraping-danych",
    gradient:
      "from-violet-500/5 to-accent/5 group-hover:from-violet-500/15 group-hover:to-accent/15 group-focus-visible:from-violet-500/15 group-focus-visible:to-accent/15",
    animation: "animate-fade-up-4",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" />
      </svg>
    ),
  },
];

export type UsePathHoverResult = {
  activePath: PathKey | null;
  setActivePath: (path: PathKey | null) => void;
  activeStats: PathStat[];
};

export function usePathHover(): UsePathHoverResult {
  const [activePath, setActivePath] = useState<PathKey | null>(null);
  const activeStats = PATH_STATS[activePath ?? "default"];
  return { activePath, setActivePath, activeStats };
}

type PathChooserProps = {
  onPathChange?: (path: PathKey | null) => void;
};

export default function PathChooser({ onPathChange }: PathChooserProps) {
  const [, setLocalActive] = useState<PathKey | null>(null);

  const setActive = useCallback(
    (path: PathKey | null) => {
      setLocalActive(path);
      onPathChange?.(path);
    },
    [onPathChange],
  );

  const handleClick = useCallback((path: PathKey) => {
    gaEvent("path_chooser_click", { path });
  }, []);

  return (
    <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
      {PILLARS.map((pillar) => (
        <PillarCard
          key={pillar.key}
          pillar={pillar}
          onActivate={() => setActive(pillar.key)}
          onDeactivate={() => setActive(null)}
          onClick={() => handleClick(pillar.key)}
        />
      ))}
    </div>
  );
}

type PillarCardProps = {
  pillar: PillarDef;
  onActivate: () => void;
  onDeactivate: () => void;
  onClick: () => void;
};

function PillarCard({
  pillar,
  onActivate,
  onDeactivate,
  onClick,
}: PillarCardProps) {
  const tiltRef = useTilt<HTMLAnchorElement>({ maxDeg: 6 });

  return (
    <Link
      ref={tiltRef}
      href={pillar.href}
      aria-label={`Filar: ${pillar.name}`}
      tabIndex={0}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      onClick={onClick}
      className={`group relative card-tilt card-lift cursor-pointer rounded-2xl p-6 ring-1 ring-gray-200/60 dark:ring-white/10 hover:ring-accent/40 dark:hover:ring-accent/50 focus-visible:ring-accent/60 hover:scale-[1.02] focus-visible:scale-[1.02] bg-white/70 dark:bg-white/5 backdrop-blur-sm ${pillar.animation}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br transition-all duration-300 ${pillar.gradient}`}
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="w-11 h-11 flex items-center justify-center text-accent bg-accent-light dark:bg-accent-dark-light rounded-xl">
            {pillar.icon}
          </div>
          <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-widest text-accent bg-accent-light dark:bg-accent-dark-light px-2 py-1 rounded-full">
            AI
          </span>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1.5 group-hover:text-accent transition-colors">
            {pillar.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {pillar.caption}
          </p>
        </div>

        <span className="text-sm font-medium text-accent group-hover:text-accent-hover group-hover:translate-x-0.5 transition-all duration-200 inline-flex items-center gap-1">
          Zobacz
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
