import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";

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
      className="section-violet relative overflow-hidden py-12 lg:py-16 scroll-mt-16"
    >
      {/* Atmosfera tła */}
      <div className="blob blob-violet -z-10 -top-20 right-0 h-80 w-80" />
      <div className="blob blob-accent -z-10 bottom-0 -left-24 h-72 w-72" />

      <div className="container-wide">
        <RevealOnScroll className="max-w-2xl mb-10">
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
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {cards.map((c, index) => (
            <RevealOnScroll
              key={c.title}
              delay={Math.min(index + 1, 4) as 1 | 2 | 3 | 4}
            >
              <Link
                href={c.href}
                className="card-lift group relative flex h-full flex-col overflow-hidden bg-white/85 backdrop-blur-sm dark:bg-white/[0.06] border border-gray-100 dark:border-white/10 rounded-2xl p-6 lg:p-7 hover:border-accent/40 dark:hover:border-accent/50"
              >
                {/* Akcent gradientowy u góry karty */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-light to-violet-100 dark:from-accent-dark-light dark:to-violet-500/15 text-accent flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105">
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
                    className="transition-transform group-hover:translate-x-1"
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
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
