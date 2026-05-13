import Link from "next/link";

const cards = [
  {
    label: "Case study",
    title: "Mapa przed i po wdrożeniu",
    description:
      "Przed: leady trafiały do kilku miejsc, CRM uzupełniany ręcznie, follow-up zależał od pamięci handlowców. Po: lead automatycznie ląduje w CRM, dostaje właściciela, zadanie i status, a dane są dostępne w raporcie.",
    href: "/case-study",
    cta: "Zobacz przykład wdrożenia",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h14v14H4z" />
        <path d="M8 9h6M8 13h6" />
      </svg>
    ),
  },
  {
    label: "Demo workflow",
    title: "Pełny przepływ leada",
    description:
      "Pokazuję krok po kroku przykładowy proces: formularz → walidacja → CRM → routing → zadanie → follow-up → raport. Każdy krok osobno mierzalny.",
    href: "/#workflow",
    cta: "Zobacz workflow",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="16" cy="6" r="2.5" />
        <circle cx="11" cy="16" r="2.5" />
        <path d="M6 8.5L11 13.5M16 8.5L11 13.5" />
      </svg>
    ),
  },
  {
    label: "Metoda liczenia ROI",
    title: "Jak liczę zwrot z automatyzacji",
    description:
      "Porównuję czas ręcznej pracy, liczbę powtórzeń, koszt pracy, liczbę błędów i wartość opóźnionych lub zgubionych leadów. Bez wymyślnych modeli — proste mnożenie i konkretne liczby.",
    href: "/kalkulator-leadow",
    cta: "Policz koszt swojego procesu",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="4" width="14" height="14" rx="2" />
        <path d="M8 8h6M8 12h6M8 16h3" />
      </svg>
    ),
  },
];

export default function Proof() {
  return (
    <section
      id="dowody"
      aria-labelledby="dowody-heading"
      className="py-12 lg:py-16 scroll-mt-16"
    >
      <div className="container-wide">
        <div className="max-w-2xl mb-10">
          <p className="section-label mb-3">Dowody</p>
          <h2
            id="dowody-heading"
            className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Nie musisz wierzyć w obietnice. Zobacz, jak wygląda proces.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Trzy sposoby, żeby sprawdzić, czy moje podejście pasuje do Twojej
            firmy — bez żadnej rozmowy sprzedażowej.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {cards.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group flex flex-col bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 lg:p-7 hover:border-accent/40 dark:hover:border-accent/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-light dark:bg-accent-dark-light text-accent flex items-center justify-center mb-4">
                {c.icon}
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
                {c.label}
              </p>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-accent transition-colors">
                {c.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5 flex-1">
                {c.description}
              </p>
              <span className="text-sm font-medium text-accent inline-flex items-center gap-1.5">
                {c.cta}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  <path
                    d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
