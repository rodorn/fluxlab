"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * InteractiveWorkflow
 * Animowany diagram przepływu leada przez automatyzację:
 *   Lead → Walidacja → CRM → Handlowiec → Raport
 *
 * - sekwencyjne podświetlanie node'ów (state-driven)
 * - "lead-dot" pulsujący, leci po SVG <path> przez <animateMotion>
 * - linie rysowane stroke-dasharray animation, kolor gradient per segment
 * - pause on hover
 * - respect prefers-reduced-motion (statyczny render)
 */

type NodeDef = {
  id: string;
  title: string;
  sub: string;
  x: number;
  y: number;
  color: string; // tailwind hex
  iconBg: string;
  icon: ReactNode;
};

const NODE_W = 132;
const NODE_H = 76;
const STEP_MS = 1200;
const TOTAL_STEPS = 5;

const ICON_LEAD = (
  <path
    d="M4 6h16v12H4z M4 6l8 6 8-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
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
      strokeWidth="1.8"
    />
    <path
      d="M8 12.5l2.8 2.8L16.5 9.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
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
      ry="2.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M5 6v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M5 12v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </>
);

const ICON_PERSON = (
  <>
    <circle
      cx="12"
      cy="8"
      r="3.2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M5 20c0-3.8 3.1-6.5 7-6.5s7 2.7 7 6.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </>
);

const ICON_CHART = (
  <>
    <path
      d="M4 20h16"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <rect
      x="6"
      y="12"
      width="3"
      height="6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      rx="0.5"
    />
    <rect
      x="11"
      y="8"
      width="3"
      height="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      rx="0.5"
    />
    <rect
      x="16"
      y="5"
      width="3"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      rx="0.5"
    />
  </>
);

const NODES: NodeDef[] = [
  {
    id: "lead",
    title: "Lead",
    sub: "formularz / e-mail",
    x: 30,
    y: 70,
    color: "#f59e0b", // amber-500
    iconBg: "#fffbeb",
    icon: ICON_LEAD,
  },
  {
    id: "valid",
    title: "Walidacja",
    sub: "AI klasyfikacja",
    x: 200,
    y: 70,
    color: "#06b6d4", // cyan-500
    iconBg: "#ecfeff",
    icon: ICON_CHECK,
  },
  {
    id: "crm",
    title: "CRM",
    sub: "osoba + deal",
    x: 370,
    y: 70,
    color: "#6366f1", // indigo-500 (accent)
    iconBg: "#eef2ff",
    icon: ICON_DB,
  },
  {
    id: "sales",
    title: "Handlowiec",
    sub: "powiadomienie",
    x: 540,
    y: 70,
    color: "#8b5cf6", // violet-500
    iconBg: "#f5f3ff",
    icon: ICON_PERSON,
  },
  {
    id: "report",
    title: "Raport",
    sub: "tygodniowy",
    x: 370,
    y: 260,
    color: "#10b981", // emerald-500
    iconBg: "#ecfdf5",
    icon: ICON_CHART,
  },
];

// Środki node'ów — używane do rysowania ścieżek
function nodeCenter(n: NodeDef): { cx: number; cy: number } {
  return { cx: n.x + NODE_W / 2, cy: n.y + NODE_H / 2 };
}

// Path z node A do node B — prosty H/V z lekkim zaokrągleniem
function buildSegment(a: NodeDef, b: NodeDef): string {
  const ac = nodeCenter(a);
  const bc = nodeCenter(b);
  // Poziomy segment: start z prawej krawędzi A, wejście w lewą krawędź B
  if (Math.abs(ac.cy - bc.cy) < 4) {
    const x1 = a.x + NODE_W;
    const x2 = b.x;
    const y = ac.cy;
    return `M ${x1} ${y} L ${x2} ${y}`;
  }
  // Pionowo-w-dół: z dolnej krawędzi A do górnej krawędzi B (lub L-kształt)
  const x1 = a.x + NODE_W / 2;
  const y1 = a.y + NODE_H;
  const x2 = b.x + NODE_W / 2;
  const y2 = b.y;
  // L-shape z zaokrągleniem w narożniku
  if (x1 === x2) {
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }
  const midY = (y1 + y2) / 2;
  return `M ${x1} ${y1} L ${x1} ${midY} Q ${x1} ${midY + 8} ${x1 + (x2 > x1 ? 8 : -8)} ${midY + 8} L ${x2} ${midY + 8} L ${x2} ${y2}`;
}

// Kolejność segmentów = przepływ
const SEGMENTS: Array<{ from: number; to: number }> = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
];

export default function InteractiveWorkflow() {
  const [activeStep, setActiveStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setActiveStep((p) => (p + 1) % TOTAL_STEPS);
    }, STEP_MS);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div
      className="relative w-full max-w-[640px] mx-auto select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Animowany diagram automatyzacji leada"
    >
      {/* Dekoracyjne bloby tła */}
      <div
        className="blob blob-accent animate-drift-slow"
        style={{
          width: 280,
          height: 280,
          top: -40,
          left: -60,
          opacity: 0.35,
        }}
        aria-hidden
      />
      <div
        className="blob blob-violet animate-drift"
        style={{
          width: 260,
          height: 260,
          bottom: -40,
          right: -50,
          opacity: 0.3,
        }}
        aria-hidden
      />

      <svg
        viewBox="0 0 700 380"
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
          {/* Gradient na linie — per segment */}
          {SEGMENTS.map((seg, i) => {
            const a = NODES[seg.from];
            const b = NODES[seg.to];
            return (
              <linearGradient
                key={`grad-${i}`}
                id={`seg-grad-${i}`}
                gradientUnits="userSpaceOnUse"
                x1={a.x + NODE_W / 2}
                y1={a.y + NODE_H / 2}
                x2={b.x + NODE_W / 2}
                y2={b.y + NODE_H / 2}
              >
                <stop offset="0%" stopColor={a.color} stopOpacity="0.9" />
                <stop offset="100%" stopColor={b.color} stopOpacity="0.9" />
              </linearGradient>
            );
          })}

          {/* Glow filter dla lead-dot */}
          <filter id="dot-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Ścieżka łączna dla animateMotion lead-dot — łańcuch wszystkich segmentów */}
          <path
            id="iw-flow-path"
            d={SEGMENTS.map((s) => buildSegment(NODES[s.from], NODES[s.to]))
              .join(" ")
              .replace(/M /g, (m, offset) => (offset === 0 ? "M " : "L "))}
            fill="none"
          />
        </defs>

        {/* Linie połączeń — dim bazowo, aktywny segment jaśnieje + dash anim */}
        {SEGMENTS.map((seg, i) => {
          const a = NODES[seg.from];
          const b = NODES[seg.to];
          const d = buildSegment(a, b);
          const isActive = activeStep === seg.from;
          const isPassed = activeStep > seg.from;
          return (
            <g key={`seg-${i}`}>
              {/* Tło-linia (dimmed) */}
              <path
                d={d}
                stroke="currentColor"
                className="text-gray-200 dark:text-gray-700"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              {/* Aktywna linia z gradientem */}
              <path
                d={d}
                stroke={`url(#seg-grad-${i})`}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="6 6"
                style={{
                  opacity: isActive || isPassed ? 1 : 0.25,
                  transition: "opacity 0.4s ease",
                  animation:
                    isActive && !paused
                      ? "iw-dash 1.2s linear infinite"
                      : "none",
                }}
              />
              {/* Strzałka na końcu segmentu */}
              <polygon
                points={`${b.x - 4},${b.y + NODE_H / 2 - 4} ${b.x + 2},${b.y + NODE_H / 2} ${b.x - 4},${b.y + NODE_H / 2 + 4}`}
                fill={b.color}
                style={{
                  opacity:
                    Math.abs(a.y - b.y) < 4 && (isActive || isPassed) ? 1 : 0.3,
                  transition: "opacity 0.4s ease",
                  display: Math.abs(a.y - b.y) < 4 ? "block" : "none",
                }}
              />
              {/* Strzałka pionowa (segment 3→4 idzie w dół) */}
              <polygon
                points={`${b.x + NODE_W / 2 - 4},${b.y - 4} ${b.x + NODE_W / 2 + 4},${b.y - 4} ${b.x + NODE_W / 2},${b.y + 2}`}
                fill={b.color}
                style={{
                  opacity:
                    Math.abs(a.y - b.y) > 4 && (isActive || isPassed) ? 1 : 0.3,
                  transition: "opacity 0.4s ease",
                  display: Math.abs(a.y - b.y) > 4 ? "block" : "none",
                }}
              />
            </g>
          );
        })}

        {/* Nodes */}
        {NODES.map((n, i) => {
          const isActive = activeStep === i;
          const isDone = activeStep > i;
          return (
            <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
              {/* Highlight ring */}
              <rect
                x={-6}
                y={-6}
                width={NODE_W + 12}
                height={NODE_H + 12}
                rx={18}
                fill="none"
                stroke={n.color}
                strokeWidth="2"
                style={{
                  opacity: isActive ? 0.55 : 0,
                  transition: "opacity 0.35s ease",
                }}
              />
              {/* Kafelek */}
              <rect
                x={0}
                y={0}
                width={NODE_W}
                height={NODE_H}
                rx={14}
                className="fill-white dark:fill-gray-900"
                style={{
                  filter: isActive
                    ? `drop-shadow(0 8px 16px ${n.color}40)`
                    : "drop-shadow(0 2px 6px rgba(15,23,42,0.08))",
                  transition: "filter 0.35s ease",
                }}
              />
              {/* Subtle gradient overlay */}
              <rect
                x={0}
                y={0}
                width={NODE_W}
                height={NODE_H}
                rx={14}
                fill={n.color}
                style={{
                  opacity: isActive ? 0.12 : isDone ? 0.06 : 0.04,
                  transition: "opacity 0.35s ease",
                }}
              />
              {/* Border */}
              <rect
                x={0}
                y={0}
                width={NODE_W}
                height={NODE_H}
                rx={14}
                fill="none"
                stroke={isActive ? n.color : "currentColor"}
                strokeWidth={isActive ? 1.5 : 1}
                className={isActive ? "" : "text-gray-200 dark:text-gray-700"}
                style={{ transition: "stroke 0.35s ease" }}
              />

              {/* Ikona w kółku */}
              <g transform="translate(12, 14)">
                <circle
                  cx={14}
                  cy={14}
                  r={16}
                  fill={n.color}
                  style={{ opacity: isActive ? 0.18 : 0.12 }}
                />
                <g
                  transform="translate(2, 2)"
                  style={{ color: n.color }}
                  className="transition-colors"
                >
                  {n.icon}
                </g>
              </g>

              {/* Tytuł */}
              <text
                x={52}
                y={32}
                className="fill-gray-900 dark:fill-gray-50"
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                {n.title}
              </text>
              {/* Sub */}
              <text
                x={52}
                y={50}
                className="fill-gray-500 dark:fill-gray-400"
                style={{ fontSize: "10.5px" }}
              >
                {n.sub}
              </text>

              {/* Checkmark przy ukończonym */}
              {isDone && (
                <g transform={`translate(${NODE_W - 22}, 8)`}>
                  <circle cx={7} cy={7} r={7} fill={n.color} />
                  <path
                    d="M4 7.5l2 2 4-4"
                    stroke="white"
                    strokeWidth="1.6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              )}

              {/* Pulsujący puls na aktywnym */}
              {isActive && !paused && (
                <circle
                  cx={NODE_W / 2}
                  cy={NODE_H / 2}
                  r={NODE_H / 2 + 4}
                  fill="none"
                  stroke={n.color}
                  strokeWidth="2"
                  style={{
                    transformOrigin: `${NODE_W / 2}px ${NODE_H / 2}px`,
                    animation: "iw-pulse 1.6s ease-out infinite",
                  }}
                />
              )}
            </g>
          );
        })}

        {/* Lead-dot — leci po łańcuchu segmentów. Używamy <animateMotion> z dynamic key, żeby restart na każdym cyklu */}
        {!paused && (
          <g key={`dot-${activeStep === 0 ? "a" : "b"}`}>
            <circle
              r="6"
              fill={NODES[activeStep]?.color ?? "#6366f1"}
              filter="url(#dot-glow)"
              style={{ transition: "fill 0.4s ease" }}
            >
              <animateMotion
                dur={`${(STEP_MS * TOTAL_STEPS) / 1000}s`}
                repeatCount="indefinite"
                rotate="auto"
                path={SEGMENTS.map((s) =>
                  buildSegment(NODES[s.from], NODES[s.to]),
                ).join(" ")}
              />
            </circle>
          </g>
        )}
      </svg>

      {/* Caption pod diagramem */}
      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
        {NODES.map((n, i) => (
          <span
            key={`cap-${n.id}`}
            className="inline-flex items-center gap-1.5"
            style={{
              opacity: activeStep === i ? 1 : 0.55,
              transition: "opacity 0.35s ease",
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: n.color }}
              aria-hidden
            />
            {n.title}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes iw-dash {
          to {
            stroke-dashoffset: -24;
          }
        }
        @keyframes iw-pulse {
          0% {
            transform: scale(0.96);
            opacity: 0.55;
          }
          70% {
            transform: scale(1.08);
            opacity: 0;
          }
          100% {
            transform: scale(1.08);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          :global(svg circle),
          :global(svg path),
          :global(svg rect) {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
