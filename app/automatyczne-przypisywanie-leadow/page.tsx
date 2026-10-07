import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "Automatyczne przypisywanie leadów w CRM | Fluxlab",
  description:
    "Przypisywanie leadów do handlowców według regionu, źródła, produktu lub obciążenia pipeline'u. Koniec z ręcznym przekazywaniem zapytań.",
  openGraph: {
    title: "Automatyczne przypisywanie leadów w CRM | Fluxlab",
    description:
      "Lead routing CRM, który automatycznie przypisuje zapytania według regionu, źródła lub produktu. Bez arkuszy, bez ręcznego przekazywania, bez gubienia leadów.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, Automatyczne przypisywanie leadów do handlowców",
      },
    ],
  },
  alternates: {
    canonical: "/automatyczne-przypisywanie-leadow",
  },
};

const problemPoints = [
  "Lead wpada do wspólnej skrzynki i czeka, aż ktoś go zauważy.",
  "Manager rano ręcznie rozdziela zapytania z arkusza.",
  "Reguły podziału (region, branża, produkt) są w głowie szefa sprzedaży.",
  "Gdy ktoś jest na urlopie, leady zostają bez opieki.",
];

const workflowSteps = [
  {
    n: "1",
    title: "Wejście i walidacja",
    desc: "Formularz, reklama i e-mail trafiają do jednego procesu. System uzupełnia region i źródło, odrzuca duplikaty.",
    accent: false,
  },
  {
    n: "2",
    title: "Reguły routingu",
    desc: "Region, produkt, wartość deala, obciążenie pipeline'u i dostępność handlowca decydują, kto dostaje leada.",
    accent: true,
  },
  {
    n: "3",
    title: "Rekord w CRM i powiadomienie",
    desc: "Osoba, firma i deal z właścicielem. Handlowiec dostaje powiadomienie i zadanie „kontakt w 5 minut”.",
    accent: false,
  },
  {
    n: "4",
    title: "Eskalacja i raport",
    desc: "Brak reakcji w ustalonym czasie, lead idzie do drugiej osoby. Raport pokazuje czas pierwszego kontaktu per handlowiec.",
    accent: true,
  },
];

const antipatterns = [
  {
    title: "Round-robin bez wagi pipeline'u",
    desc: "Handlowiec z 80 otwartymi dealami dostaje tyle samo co ten z 5. Kolejka rośnie u jednych, inni czekają.",
  },
  {
    title: "Brak fallbacku i dostępności",
    desc: "Lead spoza reguł albo do handlowca na urlopie trafia donikąd. Zawsze potrzebny jest scenariusz „idzie do X”.",
  },
  {
    title: "Routing bez SLA na reakcję",
    desc: "Szybkie przypisanie bez terminu i eskalacji nie daje szybkiego kontaktu, a o to chodzi.",
  },
];

const faq = [
  {
    question: "Po jakich kryteriach najlepiej rozdzielać leady?",
    answer:
      "Najczęściej region, produkt, źródło i wartość deala, do tego obciążenie pipeline'u i dostępność. Najlepiej działa kombinacja 2-3 kryteriów, nie jeden wymiar i nie dwanaście.",
  },
  {
    question: "Jak obsłużyć urlopy bez ręcznego przepinania?",
    answer:
      "Integrujemy routing z kalendarzem albo statusem w CRM, więc nieobecny handlowiec jest pomijany. Lead bez właściciela trafia do managera lub wspólnej puli.",
  },
  {
    question:
      "Czy automatyczny routing działa w Pipedrive, HubSpot, Salesforce?",
    answer:
      "Tak, każdy z nich ma natywne przypisywanie. Przy kilku źródłach i wzbogacaniu danych dodajemy warstwę pośrednią w n8n, Make albo Zapier.",
  },
  {
    question: "Ile trwa wdrożenie automatycznego routingu?",
    answer:
      "Pierwsza wersja zajmuje 2-5 dni roboczych. Złożone scenariusze z eskalacjami i kalendarzami to 1-3 tygodnie.",
  },
];

export default function AutomatycznePrzypisywanieLeadow() {
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
        <Breadcrumbs items={[{ label: "Automatyczne przypisywanie leadów" }]} />

        <section className="pt-16 pb-6 bg-gradient-to-b from-accent/10 to-transparent border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-label">Lead routing CRM</span>
              <h1 className="mt-4 text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Automatyczne przypisywanie leadów do handlowców według regionu,
                źródła lub produktu
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Lead wpada o 22:13, manager rozdziela go rano, handlowiec
                dzwoni po obiedzie. Klient jest już u konkurencji. Ustawiamy
                routing, który przypisuje leada w kilka sekund.
              </p>
              <div className="mt-8 flex justify-center">
                <TrackedCTA
                  href="#sekcje"
                  location="article_routing_hero"
                  label="Sprawdź routing leadów"
                  eventName="cta_click_article_audit"
                  className="btn-primary px-8 py-3.5 text-base"
                >
                  Sprawdź routing leadów
                </TrackedCTA>
              </div>
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
                Bezpłatna diagnoza w 24h · wstępna mapa pierwszego kroku ·
                szacowany ROI
              </p>
            </div>
          </div>
        </section>

        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje strony o routingu leadów"
            tabs={[
              {
                label: "Problem",
                content: (
                  <div className="py-6 lg:py-8">
                    <section className="max-w-3xl mx-auto">
                      <span className="section-label">Problem biznesowy</span>
                      <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        Leady giną, bo między formularzem a CRM-em jest człowiek
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                        Ręczny rozdział zależy od kogoś, kto bywa na spotkaniu
                        albo na urlopie. Każda minuta zwłoki działa na rzecz
                        konkurencji.
                      </p>
                      <ul className="space-y-3">
                        {problemPoints.map((point) => (
                          <li key={point} className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4">
                            <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                            <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section className="mt-10 lg:mt-12 pt-10 lg:pt-12 border-t border-gray-100 dark:border-gray-800 max-w-3xl mx-auto">
                      <span className="section-label">Koszt problemu</span>
                      <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        Ile kosztuje ręczne rozdzielanie leadów
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        Przykład: 300 leadów miesięcznie, 4 handlowców, manager
                        rozdziela ręcznie.
                      </p>
                      <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 lg:p-8 space-y-3 font-mono text-sm">
                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="text-accent font-semibold">
                            Czas managera:
                          </span>{" "}
                          300 × 3 min = 15 h × 120 zł/h ={" "}
                          <strong>1 800 zł/mies</strong>
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="text-accent font-semibold">
                            Czas reakcji:
                          </span>{" "}
                          średnio 4 h zamiast 5 minut
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="text-accent font-semibold">
                            Zgubione leady:
                          </span>{" "}
                          5% z 300 to 15 leadów miesięcznie bez kontaktu
                        </p>
                      </div>
                    </section>
                  </div>
                ),
              },
              {
                label: "Proces",
                content: (
                  <div className="py-6 lg:py-8">
                    <section className="max-w-4xl mx-auto">
                      <span className="section-label">Jak to działa</span>
                      <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        Routing leada od formularza do handlowca
                      </h2>
                      <ol className="relative space-y-3 lg:space-y-4">
                        {workflowSteps.map((s, i) => (
                          <li key={s.n} className="relative">
                            <div
                              className={`flex gap-4 lg:gap-5 items-start bg-white dark:bg-gray-800/80 border rounded-2xl p-5 lg:p-6 ${
                                s.accent
                                  ? "border-accent/40 shadow-sm"
                                  : "border-gray-100 dark:border-gray-700"
                              }`}
                            >
                              <div
                                className={`flex-shrink-0 w-10 h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center font-bold text-sm tabular-nums ${
                                  s.accent
                                    ? "bg-accent-solid text-white"
                                    : "bg-accent-light dark:bg-accent-dark-light text-accent"
                                }`}
                              >
                                {s.n}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                  {s.title}
                                </h3>
                                <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                  {s.desc}
                                </p>
                              </div>
                            </div>
                            {i < workflowSteps.length - 1 && (
                              <div className="flex justify-center py-1.5">
                                <svg
                                  className="text-gray-500 dark:text-gray-400"
                                  width="14"
                                  height="14"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M7 2v8m0 0l-3-3m3 3l3-3"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            )}
                          </li>
                        ))}
                      </ol>
                    </section>
                  </div>
                ),
              },
              {
                label: "Wdrożenie",
                content: (
                  <div className="py-6 lg:py-8">
                    <section className="max-w-3xl mx-auto">
                      <span className="section-label">Pierwszy etap</span>
                      <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        Efekt po tygodniu, nie po kwartale
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Zaczynamy od jednego źródła leadów, jednej reguły
                        (round-robin między 2-3 handlowcami) i automatycznego
                        deala w CRM z powiadomieniem. To 2-4 dni robocze.
                        Kolejne reguły dokładamy po dwóch tygodniach pracy na
                        żywych danych.
                      </p>
                    </section>

                    <section className="mt-10 lg:mt-12 pt-10 lg:pt-12 border-t border-gray-100 dark:border-gray-800 max-w-3xl mx-auto">
                      <span className="section-label">Typowe błędy</span>
                      <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        Czego unikamy przy routingu
                      </h2>
                      <div className="space-y-4">
                        {antipatterns.map((a) => (
                          <div key={a.title} className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {a.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {a.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                ),
              },
              {
                label: "Cennik",
                content: (
                  <div className="py-6 lg:py-8">
                    <section className="max-w-4xl mx-auto">
                      <div className="text-center mb-10">
                        <span className="section-label">Cennik</span>
                        <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                          Ile kosztuje wdrożenie routingu leadów
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          Stała cena za projekt. Konkretną wycenę dostajesz po
                          30-minutowej rozmowie.
                        </p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 lg:p-8">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Routing podstawowy
                          </h3>
                          <p className="text-3xl font-bold text-accent mb-3">
                            3 000-6 000 zł
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            Jedno źródło, 1-2 reguły, rekord w CRM, powiadomienie
                            i zadanie. Wdrożenie 2-4 dni.
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800/60 border border-accent/40 rounded-2xl p-6 lg:p-8 shadow-sm">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Routing zaawansowany
                          </h3>
                          <p className="text-3xl font-bold text-accent mb-3">
                            8 000-18 000 zł
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            Kilka źródeł, wzbogacanie danych, reguły
                            wielowymiarowe, eskalacje i raport routingu.
                            Wdrożenie 2-4 tygodnie.
                          </p>
                        </div>
                      </div>
                      <div className="text-center">
                        <Link
                          href="/automatyzacja-leadow-crm"
                          className="btn-secondary"
                        >
                          Zobacz pełną ofertę automatyzacji leadów
                        </Link>
                      </div>
                    </section>
                  </div>
                ),
              },
              {
                label: "FAQ",
                content: (
                  <div className="py-6 lg:py-8">
                    <section className="max-w-3xl mx-auto">
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                        Najczęstsze pytania o routing leadów
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
                      <div className="mt-10 text-sm text-gray-600 dark:text-gray-400 leading-relaxed bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                        <p className="mb-2">Powiązane materiały:</p>
                        <ul className="space-y-1.5">
                          <li>
                            <Link
                              href="/czas-reakcji-na-leada"
                              className="text-accent hover:underline"
                            >
                              Jak skrócić czas reakcji na leada do kilku minut
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/automatyzacja-formularza-do-pipedrive"
                              className="text-accent hover:underline"
                            >
                              Automatyzacja Pipedrive
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/koszt-recznej-obslugi-leadow"
                              className="text-accent hover:underline"
                            >
                              Kalkulator kosztu zgubionych leadów
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </section>

                    <section className="mt-10 lg:mt-12 pt-10 lg:pt-12 border-t border-gray-100 dark:border-gray-800 max-w-2xl mx-auto text-center">
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Chcesz, żeby leady same trafiały do właściwego
                        handlowca?
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                        30-minutowa diagnoza, mapa pierwszego kroku i szacowany
                        ROI. Bez zobowiązań.
                      </p>
                      <TrackedCTA
                        href="/kontakt"
                        location="article_routing_final"
                        label="Sprawdź routing leadów"
                        eventName="cta_click_article_audit"
                        className="btn-primary px-8 py-3.5 text-base"
                      >
                        Sprawdź routing leadów
                      </TrackedCTA>
                    </section>
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
