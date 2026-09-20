interface Slupek {
  etykieta: string;
  wartosc: number;
  opis?: string;
  wyroznij?: boolean;
}

interface Props {
  tytul: string;
  podtytul?: string;
  jednostka?: string;
  slupki: Slupek[];
  zrodlo: string;
}

// Wykres rysowany zwyklym HTML, bez zadnej biblioteki. Dzieki temu dziala bez
// JavaScriptu, skaluje sie na telefonie i nie dokłada nic do wagi strony.
export default function WykresSlupkowy({
  tytul,
  podtytul,
  jednostka = "",
  slupki,
  zrodlo,
}: Props) {
  const maks = Math.max(...slupki.map((s) => s.wartosc), 1);

  return (
    <figure className="my-8 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-5 md:p-6">
      <figcaption className="mb-4">
        <p className="text-base font-bold text-gray-900 dark:text-white">{tytul}</p>
        {podtytul && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{podtytul}</p>
        )}
      </figcaption>

      <div className="space-y-3">
        {slupki.map((s) => (
          <div key={s.etykieta}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {s.etykieta}
              </span>
              <span
                className={`shrink-0 text-sm font-bold tabular-nums ${
                  s.wyroznij
                    ? "text-red-600 dark:text-red-400"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                {s.wartosc.toLocaleString("pl-PL")}
                {jednostka}
              </span>
            </div>
            <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
              <div
                className={`h-full rounded-full ${
                  s.wyroznij
                    ? "bg-red-500/80"
                    : "bg-accent/70 dark:bg-accent/60"
                }`}
                style={{ width: `${Math.max(1.5, (s.wartosc / maks) * 100)}%` }}
              />
            </div>
            {s.opis && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{s.opis}</p>
            )}
          </div>
        ))}
      </div>

      <p className="mt-4 border-t border-gray-200/70 dark:border-gray-800/70 pt-3 text-xs text-gray-500 dark:text-gray-400">
        {zrodlo}
      </p>
    </figure>
  );
}
