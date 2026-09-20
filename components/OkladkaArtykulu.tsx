interface Props {
  tytul: string;
  kategoria?: string;
  wysoka?: boolean;
}

// Okladka rysowana z tytulu, a nie brana ze zdjec stokowych. Kazdy artykul
// dostaje wlasny, powtarzalny uklad i kolor, wiec lista przestaje byc sciana
// tekstu, a strona nie tyje o ani jeden kilobajt obrazkow.
const PALETY = [
  ["#6d28d9", "#a78bfa"],
  ["#0f766e", "#5eead4"],
  ["#b45309", "#fcd34d"],
  ["#9d174d", "#f9a8d4"],
  ["#1d4ed8", "#93c5fd"],
  ["#4d7c0f", "#bef264"],
];

// Mnoznik 31 na krotkich, podobnie zaczynajacych sie tytulach dawal te sama
// palete kilka razy z rzedu. Mieszanie bitowe rozrzuca wyniki rownomiernie.
function ziarno(tekst: string): number {
  let h = 2166136261;
  for (let i = 0; i < tekst.length; i++) {
    h ^= tekst.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h ^ (h >>> 15)) % 100000;
}

export default function OkladkaArtykulu({ tytul, kategoria, wysoka }: Props) {
  const z = ziarno(tytul);
  const [ciemny, jasny] = PALETY[z % PALETY.length];
  const wariant = z % 3;
  const id = `g${z}`;

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${wysoka ? "aspect-[21/9]" : "aspect-[16/7]"}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 320 120"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={ciemny} />
            <stop offset="100%" stopColor={jasny} />
          </linearGradient>
        </defs>
        <rect width="320" height="120" fill={`url(#${id})`} />

        {wariant === 0 &&
          [0, 1, 2, 3, 4].map((i) => (
            <circle
              key={i}
              cx={30 + i * 62 + (z % 17)}
              cy={60 + ((z + i * 13) % 40) - 20}
              r={14 + ((z + i * 7) % 22)}
              fill="#fff"
              opacity={0.08 + (i % 3) * 0.04}
            />
          ))}

        {wariant === 1 &&
          [0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect
              key={i}
              x={i * 46 + (z % 11)}
              y={120 - (18 + ((z + i * 29) % 70))}
              width="26"
              height={18 + ((z + i * 29) % 70)}
              rx="4"
              fill="#fff"
              opacity={0.1 + (i % 4) * 0.045}
            />
          ))}

        {wariant === 2 &&
          [0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={i}
              d={`M${-20 + i * 64} 130 L${30 + i * 64 + (z % 19)} -10`}
              stroke="#fff"
              strokeWidth={6 + (i % 3) * 5}
              opacity={0.08 + (i % 3) * 0.05}
              fill="none"
            />
          ))}
      </svg>

      {kategoria && (
        <span className="absolute left-3 top-3 rounded-md bg-black/25 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
          {kategoria}
        </span>
      )}
    </div>
  );
}
