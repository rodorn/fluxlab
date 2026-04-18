import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Jak pracuję — transparentny proces wdrożenia automatyzacji | Fluxlab",
  description:
    "Krok po kroku jak wygląda współpraca: bezpłatna konsultacja, audyt, wdrożenie i wsparcie. Stała cena projektowa, konkretne deliverables, realistyczne terminy.",
  openGraph: {
    title:
      "Jak pracuję — transparentny proces wdrożenia automatyzacji | Fluxlab",
    description:
      "Krok po kroku jak wygląda współpraca: bezpłatna konsultacja, audyt, wdrożenie i wsparcie. Stała cena projektowa, bez ukrytych kosztów.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab — Automatyzacja procesów biznesowych i CRM dla firm B2B",
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
    title: "Bezpłatna konsultacja (30 min)",
    duration: "30 minut · online",
    description:
      "Rozmawiamy o tym, co chcesz usprawnić. Opisujesz problem, ja dopytuję o szczegóły i mówię wprost, czy widzę sens automatyzacji, czy raczej trzeba najpierw uporządkować proces. Jeśli to nie mój obszar — powiem i skieruję gdzie indziej.",
    deliverables: [
      "Wstępna ocena, czy automatyzacja ma sens",
      "Wskazanie realnego efektu (ile godzin, jakie dane, jaki proces)",
      "Szacunkowe widełki czasowe i kosztowe",
      "Brak zobowiązań — nie kontynuujemy, jeśli nie widzę wartości",
    ],
  },
  {
    number: "02",
    title: "Audyt procesu",
    duration: "3–7 dni roboczych",
    description:
      "Jeśli po konsultacji chcemy jechać dalej, robię właściwy audyt. Patrzę na aktualny proces, dane, narzędzia i integracje. Efekt to dokument z konkretną rekomendacją: co, jak, w jakiej kolejności, ile trwa i ile kosztuje. Audyt jest płatny, ale jego koszt odliczamy od wdrożenia, jeśli zdecydujesz się kontynuować.",
    deliverables: [
      "Mapa procesu AS-IS → TO-BE",
      "Lista automatyzacji posortowana wg ROI",
      "Wybór narzędzi z uzasadnieniem",
      "Harmonogram wdrożenia z kamieniami milowymi",
      "Stała cena za cały projekt (bez godzin rozliczeniowych)",
    ],
  },
  {
    number: "03",
    title: "Wdrożenie",
    duration: "2–8 tygodni zależnie od zakresu",
    description:
      "Pracuję w krótkich iteracjach. Co tydzień dostajesz mierzalny postęp i możliwość zatrzymania projektu, jeśli coś nie działa jak trzeba. Płatność rozbijam na transze powiązane z kamieniami milowymi — nie płacisz z góry za coś, czego jeszcze nie widziałeś.",
    deliverables: [
      "Tygodniowy status w formie konkretów (co zrobione, co dalej)",
      "Środowisko testowe przed wdrożeniem na produkcję",
      "Dokumentacja każdej automatyzacji (co robi, kiedy się odpala, co zrobić gdy padnie)",
      "Szkolenie zespołu (1–2 h)",
      "Transze płatności powiązane z kamieniami milowymi",
    ],
  },
  {
    number: "04",
    title: "Wsparcie po wdrożeniu",
    duration: "Bezpłatnie przez 30 dni, potem opcjonalnie",
    description:
      "Przez pierwszy miesiąc od wdrożenia poprawiam bez dodatkowej opłaty wszystko, co wynika z błędów po mojej stronie lub niedoprecyzowanych wymagań. Potem mogę zostać jako stały serwis (retainer) albo przekazać pełną dokumentację twojemu zespołowi — zależnie od tego, co preferujesz.",
    deliverables: [
      "30 dni darmowych poprawek (bugi, uzupełnienia wymagań)",
      "Runbook w razie awarii (co sprawdzić, kogo powiadomić)",
      "Opcjonalny retainer (reakcja w 24 h w dni robocze)",
      "Opcjonalne przekazanie wiedzy zespołowi IT",
    ],
  },
];

const pricingPrinciples = [
  {
    title: "Stała cena za projekt",
    description:
      "Nie rozliczam się per godzinę. Po audycie dostajesz konkretną kwotę za cały projekt. Jeśli zajmie mi dłużej — to mój problem, nie twój.",
  },
  {
    title: "Audyt odliczany od wdrożenia",
    description:
      "Koszt audytu odejmujemy od ceny wdrożenia, jeśli kontynuujemy. Płacisz tylko wtedy, gdy audyt zostanie samodzielnym deliverable (np. zdecydujesz się wdrażać samodzielnie).",
  },
  {
    title: "Transze płatności",
    description:
      "Projekt dzielimy na kamienie milowe. Za każdą transzę płacisz dopiero po odbiorze etapu. Bez płatności z góry za cały zakres.",
  },
  {
    title: "Zero ukrytych kosztów",
    description:
      "Licencje narzędzi, koszty serwerowe i subskrypcje ustalamy przed startem. Nic nie dochodzi „po drodze”.",
  },
];

const faq = [
  {
    question: "Ile kosztuje konkretna automatyzacja?",
    answer:
      "Nie podaję cennika z sufitu, bo tak samo nazwany projekt może mieć dwa różne koszty w zależności od danych i integracji. Po 30-minutowej konsultacji znasz widełki. Po audycie — konkretną, stałą cenę.",
  },
  {
    question: "Pracujesz sam czy w zespole?",
    answer:
      "Pracuję sam. To oznacza dwie rzeczy: nie przepłacasz za warstwy pośrednie (project managerów, account managerów), ale też — terminy zależą od jednej osoby. Jeśli projekt wymaga więcej rąk, mówię o tym od razu i albo polecam kogoś, albo podpinam konkretnych podwykonawców za zgodą.",
  },
  {
    question: "Co jeśli automatyzacja przestanie działać po kilku miesiącach?",
    answer:
      "Po wdrożeniu dostajesz dokumentację i runbook: co sprawdzić w pierwszej kolejności, kogo powiadomić, jak przywrócić działanie. Jeśli awaria wynika z mojego błędu — poprawiam bezpłatnie niezależnie od tego, ile czasu minęło. Jeśli z zewnętrznej zmiany (np. API dostawcy) — podaję widełki i termin naprawy.",
  },
  {
    question: "Kto to potem utrzymuje?",
    answer:
      "Masz trzy opcje: (1) utrzymanie przejmuje twój zespół — dostaje dokumentację i szkolenie; (2) zostaję na retainerze ze stałą miesięczną opłatą i zdefiniowanym SLA; (3) rozwiązanie hybrydowe — zespół obsługuje codzienność, ja jestem do eskalacji.",
  },
  {
    question: "Ile trwa najkrótszy projekt?",
    answer:
      "Najprostsza integracja (np. formularz → CRM + notyfikacja) zajmuje ok. 2–4 dni roboczych od podpisania do uruchomienia. Wdrożenia CRM zwykle 3–6 tygodni, większe przepływy z integracjami API — do 8 tygodni.",
  },
  {
    question: "Czy zobaczę postęp w trakcie wdrożenia?",
    answer:
      "Tak, co tydzień. Dostajesz krótkie podsumowanie (3–5 zdań): co skończyłem, co jest w trakcie, co blokuje. Większe etapy pokazuję na demo na żywo, zanim idą na produkcję.",
  },
  {
    question: "Czy podpisujemy umowę i NDA?",
    answer:
      "Tak. Każdy projekt ma prostą umowę z zakresem, ceną, harmonogramem, warunkami odbioru i warunkami rozwiązania współpracy. NDA podpisuję standardowo, jeśli potrzebujesz — mam własny wzór albo pracujemy na twoim.",
  },
  {
    question: "Co jeśli po audycie uznam, że mi się nie opłaca?",
    answer:
      "Dostajesz dokument audytowy i nie kontynuujemy. Koszt audytu nie jest zwracany, ale cały materiał zostaje u ciebie — możesz na jego podstawie wdrożyć się samodzielnie albo zlecić komuś innemu.",
  },
];

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
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Jak pracuję" }]} />

        {/* Hero */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-label">Proces współpracy</span>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mt-4 mb-6 leading-tight">
                Jak pracuję
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Solo consultant, stała cena projektowa, tygodniowy postęp w
                konkretach. Poniżej masz pełny proces od pierwszej rozmowy do
                wsparcia po wdrożeniu — bez marketingu, bez ukrytych kosztów.
              </p>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto space-y-10">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-8 lg:p-10"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-shrink-0">
                      <span className="text-4xl lg:text-5xl font-bold text-accent">
                        {step.number}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {step.title}
                      </h2>
                      <p className="text-sm text-accent font-medium mb-4">
                        {step.duration}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        {step.description}
                      </p>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                          Co dostajesz:
                        </p>
                        <ul className="space-y-2">
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
              ))}
            </div>
          </div>
        </section>

        {/* Pricing principles */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">Model rozliczeń</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-4">
                  Jak wygląda cena
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Konkretne zasady zamiast marketingowych haseł. Podaję widełki
                  po konsultacji, stałą cenę po audycie, a transze płacisz
                  dopiero po odbiorze etapów.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
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
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Najczęstsze pytania
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-12 text-center">
                Konkretne odpowiedzi na to, o co klienci pytają najczęściej
                przed podpisaniem umowy.
              </p>
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
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Umów bezpłatną konsultację
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                30 minut, bez zobowiązań. Jeśli widzę, że automatyzacja nie ma
                sensu — powiem to wprost na pierwszej rozmowie.
              </p>
              <Link href="/#kontakt" className="btn-primary">
                Porozmawiajmy
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
