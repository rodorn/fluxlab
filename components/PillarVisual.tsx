/**
 * PillarVisual — animowany motyw SVG dla kafelka na stronie głównej.
 * Animacje SMIL (natywne SVG) — działają bez JS, server component.
 *   web        — okno strony, bloki content pojawiają się sekwencyjnie
 *   automation — przepływ: kropka krąży po ścieżce między węzłami
 *   data       — słupki wykresu rosną sekwencyjnie
 */

type Variant = "web" | "automation" | "data";

const COLOR: Record<Variant, string> = {
  web: "#a78bfa", // violet-400
  automation: "#818cf8", // indigo-400
  data: "#34d399", // emerald-400
};

export default function PillarVisual({ variant }: { variant: Variant }) {
  const c = COLOR[variant];

  return (
    <svg
      viewBox="0 0 200 200"
      className="w-36 h-36 lg:w-44 lg:h-44"
      fill="none"
      aria-hidden="true"
    >
      {variant === "web" && (
        <g>
          {/* Ramka okna */}
          <rect
            x="30"
            y="40"
            width="140"
            height="110"
            rx="10"
            stroke={c}
            strokeWidth="2.5"
            opacity="0.9"
          />
          {/* Pasek okna */}
          <line
            x1="30"
            y1="58"
            x2="170"
            y2="58"
            stroke={c}
            strokeWidth="2.5"
            opacity="0.9"
          />
          <circle cx="42" cy="49" r="3" fill={c} />
          <circle cx="54" cy="49" r="3" fill={c} opacity="0.6" />
          <circle cx="66" cy="49" r="3" fill={c} opacity="0.4" />
          {/* Bloki content — pojawiają się sekwencyjnie */}
          <rect x="44" y="72" width="60" height="10" rx="3" fill={c}>
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.15;0.85;1"
              dur="4s"
              repeatCount="indefinite"
            />
          </rect>
          <rect
            x="44"
            y="90"
            width="112"
            height="8"
            rx="3"
            fill={c}
            opacity="0.55"
          >
            <animate
              attributeName="opacity"
              values="0;0.55;0.55;0"
              keyTimes="0;0.25;0.85;1"
              dur="4s"
              repeatCount="indefinite"
            />
          </rect>
          <rect
            x="44"
            y="104"
            width="90"
            height="8"
            rx="3"
            fill={c}
            opacity="0.55"
          >
            <animate
              attributeName="opacity"
              values="0;0.55;0.55;0"
              keyTimes="0;0.35;0.85;1"
              dur="4s"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="44" y="122" width="44" height="16" rx="5" fill={c}>
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.45;0.85;1"
              dur="4s"
              repeatCount="indefinite"
            />
          </rect>
        </g>
      )}

      {variant === "automation" && (
        <g>
          {/* Ścieżka przepływu */}
          <path
            id="flow-path"
            d="M40 60 H120 Q140 60 140 80 V120 Q140 140 120 140 H60"
            stroke={c}
            strokeWidth="2.5"
            strokeOpacity="0.4"
            strokeLinecap="round"
            strokeDasharray="5 7"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;-24"
              dur="1.4s"
              repeatCount="indefinite"
            />
          </path>
          {/* Węzły */}
          <circle
            cx="40"
            cy="60"
            r="11"
            stroke={c}
            strokeWidth="2.5"
            fill="none"
          />
          <circle
            cx="140"
            cy="80"
            r="11"
            stroke={c}
            strokeWidth="2.5"
            fill="none"
          />
          <circle
            cx="60"
            cy="140"
            r="11"
            stroke={c}
            strokeWidth="2.5"
            fill="none"
          />
          {/* Pulsujące węzły */}
          {[
            { cx: 40, cy: 60 },
            { cx: 140, cy: 80 },
            { cx: 60, cy: 140 },
          ].map((n, i) => (
            <circle
              key={i}
              cx={n.cx}
              cy={n.cy}
              r="11"
              stroke={c}
              fill="none"
              strokeWidth="2"
            >
              <animate
                attributeName="r"
                values="11;18;11"
                dur="2.4s"
                begin={`${i * 0.8}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                values="0.7;0;0.7"
                dur="2.4s"
                begin={`${i * 0.8}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
          {/* Kropka przepływu */}
          <circle r="6" fill={c}>
            <animateMotion
              dur="3.4s"
              repeatCount="indefinite"
              path="M40 60 H120 Q140 60 140 80 V120 Q140 140 120 140 H60"
            />
          </circle>
        </g>
      )}

      {variant === "data" && (
        <g>
          {/* Oś */}
          <line
            x1="42"
            y1="150"
            x2="162"
            y2="150"
            stroke={c}
            strokeWidth="2.5"
            opacity="0.5"
            strokeLinecap="round"
          />
          {/* Słupki — rosną sekwencyjnie */}
          {[
            { x: 52, h: 46 },
            { x: 76, h: 78 },
            { x: 100, h: 58 },
            { x: 124, h: 96 },
            { x: 148, h: 70 },
          ].map((b, i) => (
            <rect key={i} x={b.x} width="16" rx="4" fill={c} opacity="0.85">
              <animate
                attributeName="height"
                values={`0;${b.h};${b.h};0`}
                keyTimes="0;0.3;0.85;1"
                dur="3.6s"
                begin={`${i * 0.18}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                values={`150;${150 - b.h};${150 - b.h};150`}
                keyTimes="0;0.3;0.85;1"
                dur="3.6s"
                begin={`${i * 0.18}s`}
                repeatCount="indefinite"
              />
            </rect>
          ))}
          {/* Kropka-dana spadająca */}
          <circle cx="100" r="5" fill={c}>
            <animate
              attributeName="cy"
              values="30;150"
              dur="2.2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="1;1;0"
              keyTimes="0;0.8;1"
              dur="2.2s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      )}
    </svg>
  );
}
