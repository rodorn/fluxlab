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
          <rect x="47.5" y="16" width="7" height="6" rx="2" className="ilustracja-akcent" />
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
      viewBox="0 0 320 200"
      className={`ilustracja-linia ${className}`}
      {...KRESKA}
    >
      <path d="M30 150h260" opacity="0.35" />
      <path d="M60 150c0-6 40-6 40 0" opacity="0.35" />
      <g>
        <path d="M92 150V30a8 8 0 0 1 8-8h58l30 30v28" />
        <path d="M158 22v22a8 8 0 0 0 8 8h22" />
        <path d="M110 70h36M110 88h56M110 106h30" opacity="0.6" />
        <path d="M92 150h28l8-10 10 10 10-8 10 8h20" />
      </g>
      <g className="ilustracja-lupa">
        <circle cx="222" cy="108" r="36" className="ilustracja-akcent" />
        <path d="m248 134 34 34" strokeWidth="4" />
        <path d="M212 98a10 10 0 1 1 14 9c-3 2-4 4-4 8" />
        <circle cx="222" cy="125" r="1.5" fill="currentColor" />
      </g>
      <path d="M40 60h8M52 60h8M270 60h8M262 82h8" opacity="0.4" />
    </svg>
  );
}
