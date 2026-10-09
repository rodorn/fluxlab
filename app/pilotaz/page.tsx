import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "3 miejsca na publiczne case study, 50% ceny | Fluxlab",
  description:
    "3 firmy B2B otrzymają wdrożenie automatyzacji za 50 procent ceny w zamian za zgodę na publiczne case study. Publikujemy tylko to, co zaakceptujesz.",
  openGraph: {
    title: "3 miejsca na publiczne case study, 50% ceny | Fluxlab",
    description:
      "3 firmy B2B otrzymają wdrożenie automatyzacji za 50% standardowej ceny w zamian za zgodę na publiczne case study.",
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
    canonical: "/pilotaz",
  },
};

const whatYouGet = [
  {
    title: "50% ceny projektu",
    description:
      "Pełny audyt i wdrożenie za połowę standardowej ceny. Stałą cenę potwierdzamy po audycie.",
  },
  {
    title: "Priorytet",
    description: "Szybsza reakcja i więcej uwagi przez cały projekt.",
  },
  {
    title: "Dłuższe wsparcie",
    description:
      "60 dni poprawek zamiast 30 i bezpłatna sesja optymalizacyjna po 3 miesiącach.",
  },
  {
    title: "Płatność za efekt",
    description: "Stała cena projektowa, transze po kamieniach milowych.",
  },
];

const whatYouGive = [
  {
    title: "Case study",
    description:
      "Wspólny opis wdrożenia i jego mierzalnego efektu, publikowany na fluxlab.pl.",
  },
  {
    title: "Krótka referencja",
    description:
      "Kilka zdań o współpracy z imieniem, stanowiskiem i firmą.",
  },
  {
    title: "Feedback w trakcie",
    description: "Krótka informacja zwrotna raz w tygodniu.",
  },
];

const criteria = [
  "Firma B2B z powtarzalnym procesem: leady, CRM, raportowanie lub integracje",
  "Decydent dostępny na 2 lub 3 rozmowy w trakcie wdrożenia",
  "Zgoda na publikację case study do 30 dni po wdrożeniu",
  "Działalność w Polsce",
];

const notSuitable = [
  "Brak konkretnego problemu do rozwiązania",
  "Nieuporządkowany proces: najpierw proces, potem automatyzacja",
  "Jednorazowe zadanie zamiast cyklicznego procesu",
];

const faq = [
  {
    question: "Czy nasza firma się nadaje?",
    answer:
      "Sprawdzimy to na bezpłatnej 30-minutowej konsultacji. Wystarczy powtarzalny proces i możliwość pokazania efektu po wdrożeniu.",
  },
  {
    question: "Czy musimy ujawnić nazwę firmy?",
    answer:
      "Wolimy imienne case study, ale możemy opisać tylko branżę i skalę. Ustalamy to przed startem.",
  },
  {
    question: "Czy 50% ceny oznacza niższą jakość?",
    answer:
      "Nie. Jakość, dokumentacja, testy i wsparcie są takie same jak w pełnopłatnych wdrożeniach.",
  },
  {
    question: "Co jeśli projekt się nie uda?",
    answer:
      "Jeśli z naszej winy nie dowieziemy etapu, nie płacisz za niego i nie wymagamy case study.",
  },
];

export default function Pilotaz() {
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
      <main className="pt-16 prose-justify">
        <Breadcrumbs href="/pilotaz" kolumna="srodek" items={[{ label: "Program case study" }]} />

        {/* Hero, kompaktowy */}
        <section className="pt-24 pb-12 bg-gradient-to-b from-accent/10 to-transparent border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-label mb-3">O nas</p>
              <div className="inline-flex items-center gap-2 bg-accent/15 text-accent-hover text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                Zostały 3 miejsca
              </div>
              <h1 className="h1-strony mb-6">
                3 miejsca na publiczne case study
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-4 font-medium">
                50% ceny wdrożenia w zamian za publiczny opis efektu
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Publikujemy tylko to, co zaakceptujesz, bez danych wrażliwych i
                tajemnic handlowych.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#sekcje" className="btn-primary">
                  Aplikuj do programu case study
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje programu case study"
            tabs={[
              {
                label: "Co dostajesz",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-4xl mx-auto">
                      <div className="text-center mb-12">
                        <h2 className="h2-sekcji">
                          Co dostajesz
                        </h2>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        {whatYouGet.map((item) => (
                          <div
                            key={item.title}
                            className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6"
                          >
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Co dajesz w zamian",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-4xl mx-auto">
                      <div className="text-center mb-12">
                        <h2 className="h2-sekcji">
                          Co dajesz w zamian
                        </h2>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        {whatYouGive.map((item) => (
                          <div
                            key={item.title}
                            className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6"
                          >
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Dla kogo",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <div className="text-center mb-12">
                        <h2 className="h2-sekcji">
                          Dla kogo
                        </h2>
                      </div>
                      <ul className="space-y-3">
                        {criteria.map((c) => (
                          <li
                            key={c}
                            className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
                          >
                            <svg
                              className="flex-shrink-0 mt-0.5 text-accent"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M4 10l4 4 8-8"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {c}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ),
              },
              {
                label: "Dla kogo NIE",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <div className="text-center mb-12">
                        <h2 className="h2-sekcji">
                          Dla kogo NIE
                        </h2>
                      </div>
                      <ul className="space-y-3">
                        {notSuitable.map((c) => (
                          <li
                            key={c}
                            className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
                          >
                            <svg
                              className="flex-shrink-0 mt-0.5 text-gray-600 dark:text-gray-400"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M5 5l10 10M15 5L5 15"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {c}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ),
              },
              {
                label: "Proces aplikacji",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-4xl mx-auto">
                      <div className="text-center mb-12">
                        <h2 className="h2-sekcji">
                          Jak wygląda aplikacja
                        </h2>
                      </div>
                      <div className="grid md:grid-cols-3 gap-6">
                        {[
                          {
                            n: "1",
                            title: "Zgłoszenie",
                            desc: "Krótki opis problemu przez formularz lub e-mail.",
                          },
                          {
                            n: "2",
                            title: "Konsultacja (48 h)",
                            desc: "W ciągu 48 h umawiamy bezpłatną rozmowę albo mówimy wprost, że nie pasujemy.",
                          },
                          {
                            n: "3",
                            title: "Audyt i decyzja",
                            desc: "Po audycie dostajesz stałą wycenę i harmonogram.",
                          },
                        ].map((s) => (
                          <div
                            key={s.n}
                            className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6"
                          >
                            <span className="text-3xl font-bold text-accent">
                              {s.n}
                            </span>
                            <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {s.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {s.desc}
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
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="h2-sekcji mb-12 text-center">
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
            ]}
          />
        </div>
        <CTA naglowek="Zostały 3 miejsca" opis="Odpowiadamy w 48 h." etykieta="Aplikuj do programu case study" />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
