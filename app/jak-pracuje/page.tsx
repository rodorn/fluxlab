import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "Jak pracujemy, proces wdrożenia krok po kroku | Fluxlab",
  description:
    "Krok po kroku jak wygląda współpraca: bezpłatna konsultacja, audyt, wdrożenie i wsparcie. Stała cena projektowa, konkretne efekty, realistyczne terminy.",
  openGraph: {
    title:
      "Jak pracujemy, transparentny proces wdrożenia automatyzacji | Fluxlab",
    description:
      "Krok po kroku jak wygląda współpraca: bezpłatna konsultacja, audyt, wdrożenie i wsparcie. Stała cena projektowa, bez ukrytych kosztów.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, Automatyzacja leadów, CRM i raportowania dla firm B2B",
      },
    ],
  },
  alternates: {
    canonical: "/jak-pracuje",
  },
};

const steps = [
  {
    number: "01",
    title: "Bezpłatna diagnoza",
    duration: "30 minut · online",
    description:
      "Opisujesz problem, a my mówimy wprost, czy automatyzacja ma sens. Jeśli to nie nasz obszar, też to powiemy.",
    deliverables: [
      "Ocena, czy automatyzacja ma sens",
      "Szacunkowe widełki czasu i kosztu",
      "Brak zobowiązań",
    ],
  },
  {
    number: "02",
    title: "Audyt procesu",
    duration: "3-7 dni roboczych",
    description:
      "Sprawdzamy proces, dane i narzędzia. Koszt audytu odliczamy od wdrożenia, jeśli idziemy dalej.",
    deliverables: [
      "Mapa procesu i lista automatyzacji wg zwrotu",
      "Harmonogram wdrożenia",
      "Stała cena za cały projekt",
    ],
  },
  {
    number: "03",
    title: "Wdrożenie",
    duration: "2-8 tygodni zależnie od zakresu",
    description:
      "Pracujemy w krótkich iteracjach, z postępem co tydzień. Płacisz transzami po odbiorze etapów.",
    deliverables: [
      "Środowisko testowe przed produkcją",
      "Dokumentacja każdej automatyzacji",
      "Szkolenie zespołu (1-2 h)",
    ],
  },
  {
    number: "04",
    title: "Wsparcie po wdrożeniu",
    duration: "30 dni bezpłatnie, potem opcjonalnie",
    description:
      "Przez miesiąc poprawiamy bez opłat błędy po naszej stronie. Potem zostajemy jako stały serwis albo przekazujemy wszystko Twojemu zespołowi.",
    deliverables: [
      "30 dni darmowych poprawek",
      "Instrukcja na wypadek awarii",
      "Opcjonalny stały serwis (reakcja w 24 h)",
    ],
  },
];

const pricingPrinciples = [
  {
    title: "Stała cena za projekt",
    description:
      "Nie rozliczamy się za godziny. Po audycie dostajesz jedną kwotę za całość.",
  },
  {
    title: "Transze po odbiorze",
    description:
      "Za każdy etap płacisz dopiero po jego odbiorze. Bez płatności z góry.",
  },
  {
    title: "Bez ukrytych kosztów",
    description: "Licencje, serwery i subskrypcje ustalamy przed startem.",
  },
];

const faq = [
  {
    question: "Ile kosztuje konkretna automatyzacja?",
    answer: "Po 30-minutowej diagnozie znasz widełki, a po audycie stałą cenę.",
  },
  {
    question: "Ile trwa najkrótszy projekt?",
    answer:
      "Prosta integracja, np. formularz do CRM z powiadomieniem, to 2-4 dni robocze. Wdrożenie CRM zwykle 3-6 tygodni.",
  },
  {
    question: "Kto to potem utrzymuje?",
    answer:
      "Twój zespół z dokumentacją i szkoleniem, my w stałym serwisie albo oba warianty naraz.",
  },
  {
    question: "Co jeśli automatyzacja przestanie działać?",
    answer:
      "Jeśli to nasz błąd, poprawiamy bezpłatnie bez względu na czas. Jeśli zmienił się zewnętrzny system, podajemy koszt i termin naprawy.",
  },
];

type Step = (typeof steps)[number];

function renderStep(step: Step) {
  return (
    <div
      key={step.number}
      className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 lg:p-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        <div className="flex-shrink-0">
          <span className="text-4xl lg:text-5xl font-bold text-accent">
            {step.number}
          </span>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {step.title}
          </h2>
          <p className="text-sm text-accent font-medium mb-3">
            {step.duration}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            {step.description}
          </p>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Co dostajesz:
            </p>
            <ul className="space-y-1.5">
              {step.deliverables.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  <svg
                    className="flex-shrink-0 mt-0.5"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3 8l3 3 7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-accent"
                    />
                  </svg>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JakPracuje() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <>
      <Header />
      <main>
        <Breadcrumbs kolumna="srodek" items={[{ label: "Jak pracujemy" }]} />

        {/* Hero, kompaktowy */}
        <section className="pt-16 pb-6 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-label">Proces współpracy</span>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mt-3 mb-4 leading-tight">
                Jak pracujemy
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Wąski skład, stała cena projektowa i postęp co tydzień.
              </p>
            </div>
          </div>
        </section>

        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje strony Jak pracujemy"
            tabs={[
              {
                label: "Proces",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-4xl mx-auto space-y-6">
                      {steps.map(renderStep)}
                    </div>
                  </div>
                ),
              },
              {
                label: "Model rozliczeń",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-4xl mx-auto">
                      <div className="text-center mb-8">
                        <span className="section-label">Model rozliczeń</span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-3">
                          Jak wygląda cena
                        </h2>
                      </div>
                      <div className="grid md:grid-cols-3 gap-6">
                        {pricingPrinciples.map((p) => (
                          <div
                            key={p.title}
                            className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6"
                          >
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {p.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {p.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "FAQ",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                        Najczęstsze pytania
                      </h2>
                      <div className="space-y-4">
                        {faq.map((item) => (
                          <details
                            key={item.question}
                            className="group bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden"
                          >
                            <summary className="cursor-pointer px-6 py-5 flex items-center justify-between gap-4 list-none">
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {item.question}
                              </span>
                              <svg
                                className="flex-shrink-0 transition-transform group-open:rotate-180"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <path
                                  d="M5 7l5 5 5-5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </summary>
                            <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                              {item.answer}
                            </div>
                          </details>
                        ))}
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Kontakt",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-2xl mx-auto text-center">
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Zamów diagnozę procesu
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                        30 minut, bez zobowiązań.
                      </p>
                      <Link href="/kontakt" className="btn-primary">
                        Zamów diagnozę
                      </Link>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
