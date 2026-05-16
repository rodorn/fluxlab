"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * InteractiveWorkflow — żywy diagram automatyzacji.
 *
 * Jedna kulka (lead) płynie po obrysie kart: Lead → Walidacja → CRM →
 * Handlowiec → wpada do kafelka Raport. Kafelek świeci, gdy kulka W NIM
 * jest. Kulka zmienia kolor wraz z kartą. Pod diagramem — opis kroku.
 * Raport gromadzi kulki — po 5 "wysyła się" jako mail i resetuje.
 */

type CardDef = {
  id: string;
  title: string;
  caption: string;
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
const TRAVEL_MS = 6200; // przejście jednej kulki przez całą ścieżkę
const LANDING_MS = 460; // czas "wpadania" kulki na slot w Raporcie
const GAP_MS = 380; // pauza między kulkami
const SEND_MS = 1400;
const BALL_R = 6.5;
const SLOT_R = 3.6;
const SLOT_Y = CARD_Y + CARD_H - 13;
function slotX(k: number): number {
  return CARD_X[REPORT_IDX] + CARD_W / 2 - ((MAX_FILL - 1) * 11) / 2 + k * 11;
}

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
    caption: "AI sprawdza kompletność danych i klasyfikuje zapytanie.",
    color: "#06b6d4",
    icon: ICON_CHECK,
  },
  {
    id: "crm",
    title: "CRM",
    caption: "Powstaje osoba, firma i deal — bez ręcznego przepisywania.",
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
    caption: "Dane trafiają do raportu: źródło, czas reakcji, wynik.",
    color: "#10b981",
    icon: ICON_CHART,
  },
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
  d += ` L ${CARD_X[REPORT_IDX] + CARD_W / 2} ${MID_Y}`;
  return d;
}

const FLOW_PATH = buildFlowPath();

type Phase = "fly" | "land" | "wait";

type Scene = {
  ballX: number;
  ballY: number;
  ballR: number;
  ballVisible: boolean;
  activeIdx: number; // która karta aktywna (kulka w niej)
  fill: number;
  sending: boolean;
};

export default function InteractiveWorkflow() {
  const pathRef = useRef<SVGPathElement | null>(null);
  const phaseRef = useRef<Phase>("fly");
  const distRef = useRef(0);
  const landTRef = useRef(0);
  const landFromRef = useRef({ x: 0, y: 0 });
  const waitUntilRef = useRef(0);
  const fillRef = useRef(0);
  const sendingRef = useRef(false);
  const lastIdxRef = useRef(0);
  const pausedRef = useRef(false);

  const [paused, setPaused] = useState(false);
  const [scene, setScene] = useState<Scene>({
    ballX: CARD_X[0],
    ballY: MID_Y,
    ballR: BALL_R,
    ballVisible: true,
    activeIdx: 0,
    fill: 0,
    sending: false,
  });

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    if (typeof window === "undefined") return;

    const total = path.getTotalLength();
    const speed = total / TRAVEL_MS;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      const p = path.getPointAtLength(total * 0.4);
      setScene({
        ballX: p.x,
        ballY: p.y,
        ballR: BALL_R,
        ballVisible: true,
        activeIdx: 1,
        fill: 2,
        sending: false,
      });
      return;
    }

    let raf = 0;
    let prev = performance.now();

    // Która karta zawiera dany punkt (bbox), albo -1
    function cardAt(x: number, y: number): number {
      for (let i = 0; i < CARD_X.length; i++) {
        const cx = CARD_X[i];
        if (
          x >= cx - 8 &&
          x <= cx + CARD_W + 8 &&
          y >= CARD_Y - 28 &&
          y <= CARD_Y + CARD_H + 12
        ) {
          return i;
        }
      }
      return -1;
    }

    function frame(now: number) {
      const dt = Math.min(48, now - prev);
      prev = now;

      if (!pausedRef.current) {
        if (phaseRef.current === "fly") {
          distRef.current += speed * dt;
          if (distRef.current >= total) {
            // kulka dotarła do Raportu — przejście w fazę "land"
            distRef.current = total;
            const p = path!.getPointAtLength(total);
            landFromRef.current = { x: p.x, y: p.y };
            landTRef.current = 0;
            phaseRef.current = "land";
          }
        } else if (phaseRef.current === "land") {
          landTRef.current += dt / LANDING_MS;
          if (landTRef.current >= 1) {
            landTRef.current = 1;
            // kulka wpadła na swój slot — licznik rośnie
            if (!sendingRef.current && fillRef.current < MAX_FILL) {
              fillRef.current += 1;
            }
            phaseRef.current = "wait";
            waitUntilRef.current = now + GAP_MS;
            if (fillRef.current >= MAX_FILL && !sendingRef.current) {
              sendingRef.current = true;
              waitUntilRef.current = now + SEND_MS;
              window.setTimeout(() => {
                fillRef.current = 0;
                sendingRef.current = false;
              }, SEND_MS);
            }
          }
        } else if (now >= waitUntilRef.current) {
          phaseRef.current = "fly";
          distRef.current = 0;
          lastIdxRef.current = 0;
        }
      }

      let ballX: number;
      let ballY: number;
      let ballR = BALL_R;
      let activeIdx: number;
      const visible = phaseRef.current !== "wait";

      if (phaseRef.current === "land") {
        // interpolacja od punktu wejścia do slotu licznika (ease-out)
        const t = landTRef.current;
        const eased = 1 - (1 - t) * (1 - t);
        const target = { x: slotX(fillRef.current), y: SLOT_Y };
        ballX =
          landFromRef.current.x + (target.x - landFromRef.current.x) * eased;
        ballY =
          landFromRef.current.y + (target.y - landFromRef.current.y) * eased;
        ballR = BALL_R + (SLOT_R - BALL_R) * eased;
        activeIdx = REPORT_IDX;
      } else {
        const p = path!.getPointAtLength(Math.min(distRef.current, total));
        ballX = p.x;
        ballY = p.y;
        let idx = cardAt(p.x, p.y);
        if (idx === -1) idx = lastIdxRef.current;
        else lastIdxRef.current = idx;
        activeIdx = phaseRef.current === "wait" ? REPORT_IDX : idx;
      }

      setScene({
        ballX,
        ballY,
        ballR,
        ballVisible: visible,
        activeIdx,
        fill: fillRef.current,
        sending: sendingRef.current,
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

  const activeCard = CARDS[scene.activeIdx] ?? CARDS[0];
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
          Diagram automatyzacji: lead płynie przez walidację, CRM i handlowca,
          gromadzi się w raporcie, który wysyła się automatycznie.
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

        {/* Ścieżka — referencyjna geometria */}
        <path ref={pathRef} d={FLOW_PATH} fill="none" stroke="none" />

        {/* Ścieżka — dim trace */}
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
          const isActive = scene.activeIdx === i;
          const isReport = i === REPORT_IDX;
          return (
            <g key={c.id}>
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

        {/* Kulka — zmienia kolor wraz z kartą, bez obwoluty */}
        {scene.ballVisible && (
          <circle
            cx={scene.ballX}
            cy={scene.ballY}
            r={scene.ballR}
            fill={activeCard.color}
            filter="url(#iw-glow)"
            style={{ transition: "fill 0.5s ease" }}
          />
        )}

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

      {/* Wyjaśnienie aktualnego kroku */}
      <div className="mt-3 flex items-center justify-center gap-2.5 min-h-[24px] text-center">
        <span
          className="inline-block w-2 h-2 rounded-full shrink-0"
          style={{ background: activeCard.color }}
          aria-hidden
        />
        <p
          key={scene.sending ? "send" : activeCard.id}
          className="text-sm text-gray-600 dark:text-gray-300 animate-fade-up"
          aria-live="polite"
        >
          {scene.sending ? (
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              Raport zebrał 5 leadów — wysłany na maila ✓
            </span>
          ) : (
            <>
              <span
                className="font-semibold"
                style={{ color: activeCard.color }}
              >
                {activeCard.title}:
              </span>{" "}
              {activeCard.caption}
            </>
          )}
        </p>
      </div>

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
