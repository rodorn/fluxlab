"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * InteractiveWorkflow — żywy diagram automatyzacji.
 *
 * Kulki (leady) wpadają z lewej i płyną po obrysie kart:
 *   Lead → Walidacja → CRM → Handlowiec → wpadają do kafelka Raport.
 * Kafelek świeci, gdy kulka W NIM jest (wchodzi → świeci, wychodzi → gaśnie).
 * Raport gromadzi kulki — gdy się zapełni, "wysyła się" jako mail i resetuje.
 */

type CardDef = {
  id: string;
  title: string;
  color: string;
  icon: ReactNode;
};

const VB_W = 720;
const VB_H = 240;
const CARD_W = 118;
const CARD_H = 104;
const CARD_Y = 70;
const RX = 16;
const CARD_X = [20, 160, 301, 441, 582];
const MID_Y = CARD_Y + CARD_H / 2;
const REPORT_IDX = 4;
const MAX_FILL = 5;
const SPAWN_MS = 1050;
const TRAVEL_MS = 5200; // czas przejścia kulki przez całą ścieżkę
const SEND_MS = 1300;

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

const CARDS: CardDef[] = [
  { id: "lead", title: "Lead", color: "#f59e0b", icon: ICON_LEAD },
  { id: "valid", title: "Walidacja", color: "#06b6d4", icon: ICON_CHECK },
  { id: "crm", title: "CRM", color: "#6366f1", icon: ICON_DB },
  { id: "sales", title: "Handlowiec", color: "#8b5cf6", icon: ICON_PERSON },
  { id: "report", title: "Raport", color: "#10b981", icon: ICON_CHART },
];

/** Ścieżka kulki: górny półobwód kart 0–3, potem zejście do środka Raportu. */
function buildFlowPath(): string {
  let d = `M ${CARD_X[0]} ${MID_Y}`;
  for (let i = 0; i < REPORT_IDX; i++) {
    const x = CARD_X[i];
    const r = x + CARD_W;
    d += ` L ${x} ${CARD_Y + RX}`;
    d += ` Q ${x} ${CARD_Y} ${x + RX} ${CARD_Y}`;
    d += ` L ${r - RX} ${CARD_Y}`;
    d += ` Q ${r} ${CARD_Y} ${r} ${CARD_Y + RX}`;
    d += ` L ${r} ${MID_Y}`;
    d += ` L ${CARD_X[i + 1]} ${MID_Y}`;
  }
  // wejście do środka kafelka Raport
  d += ` L ${CARD_X[REPORT_IDX] + CARD_W / 2} ${MID_Y}`;
  return d;
}

const FLOW_PATH = buildFlowPath();

type Ball = { id: number; dist: number };
type RenderBall = { id: number; x: number; y: number };

type Scene = {
  balls: RenderBall[];
  fill: number;
  sending: boolean;
  active: boolean[];
};

export default function InteractiveWorkflow() {
  const pathRef = useRef<SVGPathElement | null>(null);
  const ballsRef = useRef<Ball[]>([]);
  const fillRef = useRef(0);
  const sendingRef = useRef(false);
  const nextId = useRef(0);
  const lastSpawn = useRef(0);
  const pausedRef = useRef(false);

  const [paused, setPaused] = useState(false);
  const [scene, setScene] = useState<Scene>({
    balls: [],
    fill: 0,
    sending: false,
    active: [false, false, false, false, false],
  });

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    if (typeof window === "undefined") return;

    const total = path.getTotalLength();
    const speed = total / TRAVEL_MS; // px / ms

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      // Statyczny render — kulki rozłożone, raport częściowo pełny
      const staticBalls: RenderBall[] = [0.15, 0.4, 0.62, 0.85].map((f, i) => {
        const p = path.getPointAtLength(total * f);
        return { id: i, x: p.x, y: p.y };
      });
      setScene({
        balls: staticBalls,
        fill: 2,
        sending: false,
        active: [true, true, true, true, true],
      });
      return;
    }

    let raf = 0;
    let prev = performance.now();

    function frame(now: number) {
      const dt = Math.min(48, now - prev);
      prev = now;

      if (!pausedRef.current) {
        // spawn nowej kulki
        if (
          now - lastSpawn.current > SPAWN_MS &&
          !sendingRef.current &&
          ballsRef.current.length < 8
        ) {
          ballsRef.current.push({ id: nextId.current++, dist: 0 });
          lastSpawn.current = now;
        }
        // advance kulek
        const remaining: Ball[] = [];
        for (const b of ballsRef.current) {
          b.dist += speed * dt;
          if (b.dist >= total) {
            // kulka wpadła do Raportu
            if (!sendingRef.current && fillRef.current < MAX_FILL) {
              fillRef.current += 1;
            }
          } else {
            remaining.push(b);
          }
        }
        ballsRef.current = remaining;
        // raport pełny → wyślij
        if (fillRef.current >= MAX_FILL && !sendingRef.current) {
          sendingRef.current = true;
          window.setTimeout(() => {
            fillRef.current = 0;
            sendingRef.current = false;
          }, SEND_MS);
        }
      }

      // pozycje kulek + które karty aktywne
      const pts: RenderBall[] = ballsRef.current.map((b) => {
        const p = path!.getPointAtLength(b.dist);
        return { id: b.id, x: p.x, y: p.y };
      });
      const active = CARD_X.map((cx, i) => {
        if (i === REPORT_IDX) {
          return fillRef.current > 0 || sendingRef.current;
        }
        return pts.some(
          (pt) =>
            pt.x >= cx - 8 &&
            pt.x <= cx + CARD_W + 8 &&
            pt.y >= CARD_Y - 28 &&
            pt.y <= CARD_Y + CARD_H + 12,
        );
      });

      setScene({
        balls: pts,
        fill: fillRef.current,
        sending: sendingRef.current,
        active,
      });

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  function onEnter() {
    pausedRef.current = true;
    setPaused(true);
  }
  function onLeave() {
    pausedRef.current = false;
    setPaused(false);
  }

  const reportCard = CARDS[REPORT_IDX];
  const reportCx = CARD_X[REPORT_IDX] + CARD_W / 2;

  return (
    <div
      className="relative w-full max-w-[680px] mx-auto select-none"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      aria-label="Animowany diagram automatyzacji leadów"
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
          Diagram automatyzacji: leady płyną przez walidację, CRM i handlowca,
          gromadzą się w raporcie, który wysyła się automatycznie.
        </title>

        <defs>
          <linearGradient id="iw-flow-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="33%" stopColor="#06b6d4" />
            <stop offset="62%" stopColor="#6366f1" />
            <stop offset="88%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <filter id="iw-glow" x="-90%" y="-90%" width="280%" height="280%">
            <feGaussianBlur stdDeviation="3.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ścieżka — referencyjna (ukryta geometria) */}
        <path ref={pathRef} d={FLOW_PATH} fill="none" stroke="none" />

        {/* Ścieżka — widoczny dim trace */}
        <path
          d={FLOW_PATH}
          fill="none"
          stroke="currentColor"
          className="text-gray-200 dark:text-gray-700"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Ścieżka — gradient overlay */}
        <path
          d={FLOW_PATH}
          fill="none"
          stroke="url(#iw-flow-grad)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        />

        {/* Karty */}
        {CARDS.map((c, i) => {
          const x = CARD_X[i];
          const isActive = scene.active[i];
          const isReport = i === REPORT_IDX;
          return (
            <g key={c.id}>
              {/* Glow ring gdy aktywna */}
              <rect
                x={x - 5}
                y={CARD_Y - 5}
                width={CARD_W + 10}
                height={CARD_H + 10}
                rx={RX + 5}
                fill="none"
                stroke={c.color}
                strokeWidth="2"
                style={{
                  opacity: isActive ? 0.65 : 0,
                  transition: "opacity 0.25s ease",
                }}
              />
              {/* Tło */}
              <rect
                x={x}
                y={CARD_Y}
                width={CARD_W}
                height={CARD_H}
                rx={RX}
                className="fill-white dark:fill-gray-900"
                style={{
                  filter: isActive
                    ? `drop-shadow(0 10px 22px ${c.color}50)`
                    : "drop-shadow(0 3px 8px rgba(15,23,42,0.07))",
                  transition: "filter 0.25s ease",
                }}
              />
              {/* Tint */}
              <rect
                x={x}
                y={CARD_Y}
                width={CARD_W}
                height={CARD_H}
                rx={RX}
                fill={c.color}
                style={{
                  opacity: isActive ? 0.14 : 0.05,
                  transition: "opacity 0.25s ease",
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
                stroke={isActive ? c.color : "currentColor"}
                strokeWidth={isActive ? 1.7 : 1}
                className={isActive ? "" : "text-gray-200 dark:text-gray-700"}
                style={{ transition: "stroke 0.25s ease" }}
              />

              {/* Ikona */}
              <g
                transform={`translate(${x + CARD_W / 2 - 17}, ${CARD_Y + 16})`}
              >
                <circle
                  cx={17}
                  cy={17}
                  r={20}
                  fill={c.color}
                  style={{
                    opacity: isActive ? 0.22 : 0.1,
                    transition: "opacity 0.25s ease",
                  }}
                />
                <g transform="translate(5, 5)" style={{ color: c.color }}>
                  {c.icon}
                </g>
              </g>

              {/* Tytuł */}
              <text
                x={x + CARD_W / 2}
                y={CARD_Y + CARD_H - 26}
                textAnchor="middle"
                className="fill-gray-900 dark:fill-gray-50"
                style={{
                  fontSize: "13.5px",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                {c.title}
              </text>

              {/* Raport: licznik wypełnienia kropkami */}
              {isReport ? (
                <g>
                  {Array.from({ length: MAX_FILL }).map((_, k) => (
                    <circle
                      key={k}
                      cx={x + CARD_W / 2 - ((MAX_FILL - 1) * 11) / 2 + k * 11}
                      cy={CARD_Y + CARD_H - 13}
                      r={3.6}
                      fill={c.color}
                      style={{
                        opacity: k < scene.fill ? 1 : 0.18,
                        transition: "opacity 0.2s ease",
                      }}
                    />
                  ))}
                </g>
              ) : (
                <text
                  x={x + CARD_W / 2}
                  y={CARD_Y + CARD_H - 11}
                  textAnchor="middle"
                  className="fill-gray-400 dark:fill-gray-500"
                  style={{ fontSize: "9px", letterSpacing: "0.08em" }}
                >
                  KROK {i + 1}
                </text>
              )}
            </g>
          );
        })}

        {/* Kulki w locie */}
        {scene.balls.map((b) => (
          <circle
            key={b.id}
            cx={b.x}
            cy={b.y}
            r="6"
            fill="#ffffff"
            stroke="#6366f1"
            strokeWidth="2"
            filter="url(#iw-glow)"
          />
        ))}

        {/* Wysyłka raportu — koperta wylatuje w górę */}
        {scene.sending && (
          <g style={{ animation: `iw-send ${SEND_MS}ms ease-out forwards` }}>
            <g transform={`translate(${reportCx - 16}, ${CARD_Y - 6})`}>
              <rect x="0" y="0" width="32" height="22" rx="4" fill="#10b981" />
              <path
                d="M2 3l14 10L30 3"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>
        )}
      </svg>

      {/* Caption */}
      <p
        className="mt-3 text-center text-sm text-gray-600 dark:text-gray-300"
        aria-live="polite"
      >
        {scene.sending ? (
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            Raport gotowy — wysłany na maila ✓
          </span>
        ) : (
          <>
            Leady płyną przez proces i gromadzą się w raporcie.{" "}
            <span className="text-gray-400 dark:text-gray-500">
              {paused ? "Wstrzymane." : `Zebrano ${scene.fill}/${MAX_FILL}.`}
            </span>
          </>
        )}
      </p>

      <style jsx>{`
        @keyframes iw-send {
          0% {
            transform: translateY(0) scale(0.6);
            opacity: 0;
          }
          25% {
            transform: translateY(-4px) scale(1);
            opacity: 1;
          }
          70% {
            transform: translateY(-46px) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-86px) scale(0.85);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
