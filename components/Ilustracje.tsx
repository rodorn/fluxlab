/* Ilustracje liniowe w jednym stylu: siatka 64, kreska 2, zaokraglone konce,
   kolor z currentColor, jeden wypelniony punkt w kolorze akcentu. */
export type NazwaIlustracji = "strony" | "crm" | "automatyzacje" | "audyt";

const KRESKA = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function Ikona({
  nazwa,
  className = "h-10 w-10",
}: {
  nazwa: NazwaIlustracji;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      className={`ilustracja-linia ${className}`}
      {...KRESKA}
    >
      {nazwa === "strony" && (
        <>
          <rect x="6" y="10" width="52" height="44" rx="6" />
          <path d="M6 22h52" />
          <circle cx="13" cy="16" r="1" fill="currentColor" />
          <circle cx="19" cy="16" r="1" fill="currentColor" />
          <rect x="14" y="30" width="20" height="16" rx="3" />
          <path d="M40 32h10M40 38h10M40 44h6" />
        </>
      )}
      {nazwa === "crm" && (
        <>
          <rect x="6" y="10" width="14" height="44" rx="4" />
          <rect x="25" y="10" width="14" height="44" rx="4" />
          <rect x="44" y="10" width="14" height="44" rx="4" />
          <rect x="9.5" y="16" width="7" height="6" rx="2" />
          <rect x="9.5" y="26" width="7" height="6" rx="2" />
          <rect x="28.5" y="16" width="7" height="6" rx="2" />
          <rect
            x="47.5"
            y="16"
            width="7"
            height="6"
            rx="2"
            className="ilustracja-akcent"
          />
        </>
      )}
      {nazwa === "automatyzacje" && (
        <>
          <circle cx="12" cy="20" r="6" />
          <circle cx="52" cy="20" r="6" />
          <circle cx="32" cy="50" r="6" className="ilustracja-akcent" />
          <path d="M18 20h28M49 25.5 36 44.5M28 44.5 15 25.5" />
        </>
      )}
      {nazwa === "audyt" && (
        <>
          <path d="M40 30V12a4 4 0 0 0-4-4H14a4 4 0 0 0-4 4v38a4 4 0 0 0 4 4h14" />
          <path d="M18 18h14M18 26h14M18 34h6" />
          <circle cx="42" cy="40" r="11" className="ilustracja-akcent" />
          <path d="m50 48 8 8" />
        </>
      )}
    </svg>
  );
}

/** Ilustracja strony 404: rozerwana kartka i lupa ze znakiem zapytania. */
export function Ilustracja404({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 280"
      className={`overflow-visible ${className}`}
      fill="none"
    >
      <style>{`
        .z404-orbita{transform-box:view-box;transform-origin:320px 142px;animation:z404-orbita 14s linear infinite}
        @keyframes z404-orbita{to{transform:rotate(360deg)}}
        @media (prefers-reduced-motion:reduce){.z404-orbita{animation:none}}
      `}</style>
      <g
        className="fill-gray-900 dark:fill-white"
        style={{
          fontFamily: "var(--font-sans), system-ui, sans-serif",
          fontWeight: 800,
          letterSpacing: "-0.06em",
        }}
      >
        <text x="118" y="236" fontSize="300" textAnchor="middle">
          4
        </text>
        <text x="522" y="236" fontSize="300" textAnchor="middle">
          4
        </text>
      </g>
      <text
        x="320"
        y="236"
        fontSize="300"
        textAnchor="middle"
        className="fill-accent"
        style={{
          fontFamily: "var(--font-serif), Georgia, serif",
          fontStyle: "italic",
          fontWeight: 400,
        }}
      >
        0
      </text>
      <circle
        cx="320"
        cy="142"
        r="128"
        className="stroke-gray-900/15 dark:stroke-white/20"
        strokeWidth="1"
      />
      <g className="z404-orbita">
        <circle cx="320" cy="14" r="6" className="fill-accent" />
      </g>
      <path
        d="M0 262H640"
        className="stroke-gray-900/20 dark:stroke-white/20"
        strokeWidth="1"
      />
    </svg>
  );
}
