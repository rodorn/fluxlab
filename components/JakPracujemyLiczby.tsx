import Link from "next/link";

const KARTA =
  "rounded-2xl border border-gray-200/80 bg-white/60 p-6 dark:border-gray-800/80 dark:bg-gray-900/40";

const LICZBY: [string, string][] = [
  ["9 218", "testów automatycznych w repozytorium"],
  ["287", "z nich klika panel w prawdziwej przeglądarce"],
  ["1 065", "zmian w kodzie od 30 września 2026"],
  ["18", "integracji z systemami i platformami"],
];

const ETAPY: [string, string][] = [
  ["Przed wdrożeniem", "skrypt uruchamia pełne testy dokładnie tej wersji kodu, czerwony test = wdrożenie odmówione"],
  ["Dane", "migracje z Pipedrive, HubSpot i CSV oraz instalacja od zera"],
  ["Przeglądarka", "panel w Chrome, emulacja telefonu 390 × 844, dostępność (axe)"],
  ["Kod", "analiza statyczna, sprawdzanie typów, zgodność dokumentu API"],
];

const INTEGRACJE = [
  "Gmail",
  "Microsoft 365",
  "Kalendarz Google",
  "Arkusze Google",
  "poczta IMAP",
  "Pipedrive",
  "HubSpot",
  "Meta Lead Ads",
  "LinkedIn Lead Gen",
  "Stripe",
  "KSeF",
  "biała lista VAT",
  "kursy NBP",
  "Zapier",
  "Make",
  "n8n",
  "serwer MCP",
  "REST API",
];

export default function JakPracujemyLiczby() {
  return (
    <section aria-labelledby="jak-pracujemy" className="mt-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="section-label mb-3">Jak pracujemy</p>
        <h2 id="jak-pracujemy" className="h2-sekcji">
          Wersja z czerwonym testem nie trafia na produkcję
        </h2>
        <p className="mt-5 text-base text-gray-600 dark:text-gray-300">
          Liczby z repozytorium FluxCRM, naszego CRM dla pośredników
          kredytowych, stan na 8 listopada 2026.
        </p>
      </div>

      <dl className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-5 lg:grid-cols-4">
        {LICZBY.map(([l, o]) => (
          <div key={o} className={KARTA}>
            <dt className="text-3xl font-bold tabular-nums text-accent">{l}</dt>
            <dd className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {o}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mx-auto mt-5 grid max-w-5xl gap-5 lg:grid-cols-2">
        <div className={KARTA}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Co sprawdzają testy
          </h3>
          <ol className="mt-4 space-y-3 text-sm">
            {ETAPY.map(([n, o], i) => (
              <li key={n} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent">
                  {i + 1}
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong className="font-semibold text-gray-900 dark:text-white">
                    {n}:
                  </strong>{" "}
                  {o}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className={KARTA}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Integracje w kodzie FluxCRM
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {INTEGRACJE.map((n) => (
              <li
                key={n}
                className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-700 dark:border-gray-700 dark:text-gray-300"
              >
                {n}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Więcej o procesie:{" "}
            <Link href="/jak-pracuje" className="text-accent hover:underline">
              jak wygląda współpraca
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
