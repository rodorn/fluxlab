"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * InteractiveWorkflow — animowany diagram przepływu leada.
 *   Lead → Walidacja → CRM → Handlowiec → Raport
 *
 * Kropka leci CIĄGŁĄ ścieżką po obrysie kart (górny półobwód każdej karty
 * + łączniki, zaokrąglone rogi) — żadnych skoków. Aktywna karta świeci.
 */

type NodeDef = {
  id: string;
  title: string;
  caption: string;
  color: string;
  icon: ReactNode;
};

// Geometria — 5 kart w rzędzie
const VB_W = 720;
const VB_H = 230;
const CARD_W = 118;
const CARD_H = 104;
const CARD_Y = 64;
const RX = 16;
const CARD_X = [20, 160, 301, 441, 582];
const MID_Y = CARD_Y + CARD_H / 2; // 116
const STEP_MS = 1500;

const ICON_LEAD = (
  <path
    d="M3 6h18v12H3z M3 6l9 7 9-7"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinejoin="round"
    strokeLinecap="round"
  />
);
const ICON_CHECK = (
  <>
    <circle
      cx="12"
      cy="12"
      r="9"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    />
    <path
      d="M8 12.3l2.7 2.7L16.3 9.4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </>
);
const ICON_DB = (
  <>
    <ellipse
      cx="12"
      cy="6"
      rx="7"
      ry="2.6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    />
    <path
      d="M5 6v6c0 1.5 3.1 2.6 7 2.6s7-1.1 7-2.6V6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    />
    <path
      d="M5 12v6c0 1.5 3.1 2.6 7 2.6s7-1.1 7-2.6v-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    />
  </>
);
const ICON_PERSON = (
  <>
    <circle
      cx="12"
      cy="8"
      r="3.4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    />
    <path
      d="M5 20c0-3.9 3.1-6.6 7-6.6s7 2.7 7 6.6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
    />
  </>
);
const ICON_CHART = (
  <>
    <path
      d="M4 20h16"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
    />
    <rect
      x="6"
      y="11"
      width="3.4"
      height="7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      rx="0.6"
    />
    <rect
      x="11.3"
      y="7"
      width="3.4"
      height="11"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      rx="0.6"
    />
    <rect
      x="16.6"
      y="4"
      width="3.4"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      rx="0.6"
    />
  </>
);

const NODES: NodeDef[] = [
  {
    id: "lead",
    title: "Lead",
    caption: "Lead wpada z formularza, reklamy albo maila.",
    color: "#f59e0b",
    icon: ICON_LEAD,
  },
  {
    id: "valid",
    title: "Walidacja",
    caption: "AI sprawdza kompletność i klasyfikuje zapytanie.",
    color: "#06b6d4",
    icon: ICON_CHECK,
  },
  {
    id: "crm",
    title: "CRM",
    caption: "Powstaje osoba, firma i deal — bez przepisywania.",
    color: "#6366f1",
    icon: ICON_DB,
  },
  {
    id: "sales",
    title: "Handlowiec",
    caption: "Przypisanie właściciela i zadanie kontaktu w 5 minut.",
    color: "#8b5cf6",
    icon: ICON_PERSON,
  },
  {
    id: "report",
    title: "Raport",
    caption: "Źródło, czas reakcji i wynik trafiają do raportu.",
    color: "#10b981",
    icon: ICON_CHART,
  },
];

/** Ciągła ścieżka: górny półobwód każdej karty + łączniki. Zero skoków. */
function buildFlowPath(): string {
  let d = `M ${CARD_X[0]} ${MID_Y}`;
  CARD_X.forEach((x, i) => {
    const r = x + CARD_W;
    // w górę po lewej krawędzi
    d += ` L ${x} ${CARD_Y + RX}`;
    // lewy górny róg
    d += ` Q ${x} ${CARD_Y} ${x + RX} ${CARD_Y}`;
    // wzdłuż górnej krawędzi
    d += ` L ${r - RX} ${CARD_Y}`;
    // prawy górny róg
    d += ` Q ${r} ${CARD_Y} ${r} ${CARD_Y + RX}`;
    // w dół po prawej krawędzi do środka
    d += ` L ${r} ${MID_Y}`;
    // łącznik do następnej karty
    if (i < CARD_X.length - 1) {
      d += ` L ${CARD_X[i + 1]} ${MID_Y}`;
    }
  });
  return d;
}

const FLOW_PATH = buildFlowPath();

export default function InteractiveWorkflow() {
  const [activeStep, setActiveStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setActiveStep((p) => (p + 1) % NODES.length);
    }, STEP_MS);
    return () => clearInterval(t);
  }, [paused]);

  const active = NODES[activeStep];

  return (
    <div
      className="relative w-full max-w-[680px] mx-auto select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Animowany diagram automatyzacji leada"
    >
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        width="100%"
        height="auto"
        role="img"
        className="relative z-10 overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>
          Diagram automatyzacji leada: formularz → walidacja → CRM → handlowiec
          → raport
        </title>

        <defs>
          <linearGradient id="iw-flow-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="28%" stopColor="#06b6d4" />
            <stop offset="55%" stopColor="#6366f1" />
            <stop offset="80%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <filter id="iw-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ścieżka bazowa — dim trace po obrysie kart */}
        <path
          d={FLOW_PATH}
          fill="none"
          stroke="currentColor"
          className="text-gray-200 dark:text-gray-700"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Ścieżka aktywna — gradient, biegnący dash */}
        <path
          d={FLOW_PATH}
          fill="none"
          stroke="url(#iw-flow-grad)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="10 14"
          style={{
            opacity: 0.85,
            animation: paused ? "none" : "iw-trace 1.4s linear infinite",
          }}
        />

        {/* Karty */}
        {NODES.map((n, i) => {
          const x = CARD_X[i];
          const isActive = activeStep === i;
          const isDone =
            activeStep > i || (activeStep === 0 && i === NODES.length - 1);
          return (
            <g key={n.id}>
              {/* Glow ring na aktywnej */}
              <rect
                x={x - 5}
                y={CARD_Y - 5}
                width={CARD_W + 10}
                height={CARD_H + 10}
                rx={RX + 5}
                fill="none"
                stroke={n.color}
                strokeWidth="2"
                style={{
                  opacity: isActive ? 0.6 : 0,
                  transition: "opacity 0.35s ease",
                }}
              />
              {/* Tło karty */}
              <rect
                x={x}
                y={CARD_Y}
                width={CARD_W}
                height={CARD_H}
                rx={RX}
                className="fill-white dark:fill-gray-900"
                style={{
                  filter: isActive
                    ? `drop-shadow(0 10px 22px ${n.color}45)`
                    : "drop-shadow(0 3px 8px rgba(15,23,42,0.07))",
                  transition: "filter 0.35s ease",
                }}
              />
              {/* Tint */}
              <rect
                x={x}
                y={CARD_Y}
                width={CARD_W}
                height={CARD_H}
                rx={RX}
                fill={n.color}
                style={{
                  opacity: isActive ? 0.13 : 0.05,
                  transition: "opacity 0.35s ease",
                }}
              />
              {/* Border */}
              <rect
                x={x}
                y={CARD_Y}
                width={CARD_W}
                height={CARD_H}
                rx={RX}
                fill="none"
                stroke={isActive ? n.color : "currentColor"}
                strokeWidth={isActive ? 1.6 : 1}
                className={isActive ? "" : "text-gray-200 dark:text-gray-700"}
                style={{ transition: "stroke 0.35s ease" }}
              />

              {/* Ikona w kółku — wycentrowana */}
              <g
                transform={`translate(${x + CARD_W / 2 - 17}, ${CARD_Y + 18})`}
              >
                <circle
                  cx={17}
                  cy={17}
                  r={20}
                  fill={n.color}
                  style={{
                    opacity: isActive ? 0.2 : 0.1,
                    transition: "opacity 0.35s ease",
                  }}
                />
                <g transform="translate(5, 5)" style={{ color: n.color }}>
                  {n.icon}
                </g>
              </g>

              {/* Tytuł */}
              <text
                x={x + CARD_W / 2}
                y={CARD_Y + CARD_H - 22}
                textAnchor="middle"
                className="fill-gray-900 dark:fill-gray-50"
                style={{
                  fontSize: "13.5px",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                {n.title}
              </text>

              {/* Numer kroku */}
              <text
                x={x + CARD_W / 2}
                y={CARD_Y + CARD_H - 8}
                textAnchor="middle"
                className="fill-gray-400 dark:fill-gray-500"
                style={{ fontSize: "9px", letterSpacing: "0.08em" }}
              >
                KROK {i + 1}
              </text>

              {/* Checkmark gdy ukończony */}
              {isDone && !isActive && (
                <g transform={`translate(${x + CARD_W - 20}, ${CARD_Y + 8})`}>
                  <circle cx={6} cy={6} r={6.5} fill={n.color} />
                  <path
                    d="M3.3 6.3l1.9 1.9 3.4-3.6"
                    stroke="white"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              )}
            </g>
          );
        })}

        {/* Lead-dot — leci po ciągłej ścieżce obrysu */}
        {!paused && (
          <circle r="6.5" fill="#ffffff" filter="url(#iw-glow)">
            <animateMotion
              dur={`${(STEP_MS * NODES.length) / 1000}s`}
              repeatCount="indefinite"
              path={FLOW_PATH}
              rotate="auto"
            />
            <animate
              attributeName="fill"
              dur={`${(STEP_MS * NODES.length) / 1000}s`}
              repeatCount="indefinite"
              values="#f59e0b;#06b6d4;#6366f1;#8b5cf6;#10b981;#f59e0b"
              keyTimes="0;0.2;0.45;0.7;0.92;1"
            />
          </circle>
        )}
      </svg>

      {/* Dynamiczny opis aktywnego kroku */}
      <div className="mt-3 flex items-center justify-center gap-2.5 min-h-[24px] text-center">
        <span
          className="inline-block w-2 h-2 rounded-full shrink-0"
          style={{ background: active.color }}
          aria-hidden
        />
        <p
          key={active.id}
          className="text-sm text-gray-600 dark:text-gray-300 animate-fade-up"
        >
          <span className="font-semibold" style={{ color: active.color }}>
            {active.title}:
          </span>{" "}
          {active.caption}
        </p>
      </div>

      <style jsx>{`
        @keyframes iw-trace {
          to {
            stroke-dashoffset: -24;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          :global(svg path),
          :global(svg circle) {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
