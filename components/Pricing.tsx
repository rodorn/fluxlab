import TrackedCTA from "@/components/TrackedCTA";
import RevealOnScroll from "@/components/RevealOnScroll";

const tracks = [
  {
    label: "Krok 1",
    title: "Diagnoza procesu",
    price: "0 zł",
    description:
      "Bezpłatny pierwszy filtr. Sprawdzamy, czy automatyzacja ma u Ciebie sens i jaki kierunek dałby największy efekt.",
    bullets: [
      "wstępna ocena potencjału",
      "1–3 obszary z największym wpływem",
      "szacunkowy rząd kosztu ręcznej pracy",
      "rekomendacja pierwszego kroku",
    ],
    cta: "Chcę diagnozę",
    accent: false,
  },
  {
    label: "Krok 2",
    title: "Audyt procesu",
    price: "płatny — odliczany od wdrożenia",
    description:
      "Konkretna dokumentacja, na podstawie której można realnie wdrożyć proces — ze mną albo samodzielnie. Koszt audytu odliczam od wdrożenia, jeśli kontynuujemy.",
    bullets: [
      "mapa AS-IS → TO-BE",
      "priorytety automatyzacji wg ROI",
      "narzędzia, architektura, harmonogram",
      "stała wycena wdrożenia",
    ],
    cta: "Zamów audyt",
    accent: true,
  },
  {
    label: "Krok 3",
    title: "Wdrożenie",
    price: "od 1 500 zł",
    description:
      "Dla firm, które mają konkretny problem: leady, CRM, zadania, follow-upy, raporty albo ręczne przepisywanie danych. Stała cena za zakres, bez rozliczania godzinowego.",
    bullets: [
      "proces wdrożony end-to-end",
      "integracja z CRM i źródłem leadów",
      "monitoring i powiadomienia o błędach",
      "dokumentacja i instrukcja dla zespołu",
    ],
    cta: "Zaplanujmy wdrożenie",
    accent: false,
  },
];

export default function Pricing() {
  return (
    <section id="cennik" className="scroll-mt-16 py-12 lg:py-16">
      <div className="container-wide">
        <RevealOnScroll className="max-w-2xl mb-10">
          <p className="section-label mb-3">Cennik</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Wybierz punkt startowy
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Trzy ścieżki — od bezpłatnej diagnozy po pełne wdrożenie. Każdy
            projekt wyceniam po diagnozie, bo koszt zależy od liczby źródeł
            leadów, CRM i jakości danych.
          </p>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {tracks.map((t, idx) => (
            <RevealOnScroll
              key={t.title}
              delay={Math.min(idx + 1, 4) as 1 | 2 | 3 | 4}
              className={`flex flex-col bg-white dark:bg-gray-800/60 border rounded-2xl p-6 lg:p-7 ${
                t.accent
                  ? "border-accent shadow-lg shadow-accent/10 ring-1 ring-accent/30"
                  : "border-gray-100 dark:border-gray-700"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-xs font-semibold uppercase tracking-widest ${
                    t.accent
                      ? "text-accent"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {t.label}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {t.title}
              </h3>
              <p className="text-2xl lg:text-3xl font-bold text-accent mb-4">
                {t.price}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                {t.description}
              </p>
              <ul className="space-y-2 mb-6 flex-1">
                {t.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="flex-shrink-0 mt-0.5 text-accent"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 8l3 3 7-7"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="leading-snug">{b}</span>
                  </li>
                ))}
              </ul>
              <TrackedCTA
                href="#kontakt"
                location="pricing"
                label={t.title}
                eventName="cta_click_pricing"
                className={
                  t.accent
                    ? "btn-primary w-full justify-center text-center"
                    : "btn-secondary w-full justify-center text-center"
                }
              >
                {t.cta}
              </TrackedCTA>
            </RevealOnScroll>
          ))}
        </div>

        <p className="mt-10 text-sm text-gray-500 dark:text-gray-400 text-center max-w-2xl mx-auto leading-relaxed">
          Nie rozliczam godzin, tylko zakres. Przed startem dostajesz konkretną
          wycenę, opis efektu i warunki odbioru.
        </p>
      </div>
    </section>
  );
}
