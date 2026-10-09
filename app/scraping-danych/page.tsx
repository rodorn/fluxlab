import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";
import TrackedCTA from "@/components/TrackedCTA";
import Tabs from "@/components/Tabs";
import ProductGrid from "@/components/ProductGrid";
import CzyDaSieSpiac from "@/components/CzyDaSieSpiac";

export const metadata: Metadata = {
  title: "Scraping danych: web, PDF, maile, dokumenty | Fluxlab",
  description:
    "Wyciągamy strukturalne dane ze stron, PDF-ów, maili i dokumentów. Rozpoznawanie pól, walidacja i przesył do CRM lub arkusza. Bez kopiowania ręcznie.",
  alternates: { canonical: "/scraping-danych" },
  openGraph: {
    title:
      "Scraping i ekstrakcja danych, web, PDF, maile, dokumenty | Fluxlab",
    description:
      "Wyciągamy strukturalne dane ze stron, PDF-ów, maili. AI rozpoznaje pola.",
    locale: "pl_PL",
    type: "website",
  },
};

const sourceTypes = [
  {
    title: "Web scraping",
    examples: "Ceny, oferty konkurencji, katalogi.",
  },
  {
    title: "PDF i dokumenty",
    examples: "Faktury, umowy, raporty, także skany.",
  },
  {
    title: "Maile",
    examples: "Zapytania ofertowe i zamówienia.",
  },
  {
    title: "Dokumenty Office",
    examples: "Wiele arkuszy w jednym schemacie.",
  },
];

const faq = [
  {
    question: "Czy scraping jest legalny?",
    answer:
      "Publiczne strony zgodnie z regulaminem i robots.txt, tak. Treści za logowaniem albo płatne, nie. Gdy widzimy ryzyko, mówimy wprost.",
  },
  {
    question: "Co jeśli strona zmieni layout?",
    answer:
      "Każdy stały scraper ma monitoring i alerty. Poprawkę robimy w ramach wsparcia, zwykle w 1 do 2 dni.",
  },
  {
    question: "Czy dane są bezpieczne?",
    answer:
      "Tak. Dane trafiają do Twojej infrastruktury, dostęp mamy tylko na czas wdrożenia. NDA standardowo.",
  },
];

export default function ScrapingDanychPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs href="/scraping-danych" items={[{ label: "Scraping danych" }]} />

        {/* Hero, kompaktowy */}
        <section
          aria-labelledby="hero-heading"
          className="relative pt-24 pb-12 overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="blob blob-accent -z-10 top-[-15%] left-[-10%] w-[600px] h-[600px]"
          />
          <div
            aria-hidden="true"
            className="blob blob-accent -z-10 bottom-[-20%] right-[-10%] w-[500px] h-[500px]"
          />
          <div className="container-wide max-w-3xl mx-auto relative">
            <div>
              <p className="section-label animate-fade-up-1 mb-4">Usługa</p>
              <h1
                id="hero-heading"
                className="h1-strony animate-fade-up-2 mb-6"
              >
                Wyciągamy dane z miejsc, w których normalnie giną
              </h1>
              <p className="animate-fade-up-3 text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-10 max-w-2xl">
                Strony WWW, PDF-y, maile i dokumenty trafiają do Twojego CRM
                albo arkusza. Bez ręcznego kopiowania.
              </p>
              <div className="animate-fade-up-4 flex flex-wrap items-center gap-4">
                <TrackedCTA
                  href="#sekcje"
                  location="hero_scraping"
                  label="diagnoza"
                  eventName="cta_click_hero_scraping_audit"
                  className="btn-primary"
                >
                  Bezpłatna diagnoza
                </TrackedCTA>
                {/* Odnosnik do sprawdzenia stoi obok glownego przycisku, bo
                    pomiar pokazal, ze narzedzia schowane nizej nikt nie
                    naciska. */}
                <a
                  href="#czy-da-sie-spiac"
                  className="text-base font-semibold text-accent hover:underline"
                >
                  Sprawdź, czy da się to spiąć
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="container-wide pb-16">
          <CzyDaSieSpiac biezacaStrona="/scraping-danych" />
        </section>

        <section className="container-wide pb-16">
          <ProductGrid category="dane" showHeading />
        </section>
        <section className="container-wide pb-16" aria-labelledby="cennik-heading">
          <h2
            id="cennik-heading"
            className="h2-sekcji"
          >
            Ile to kosztuje
          </h2>
          <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-300">
            Płacisz za dane, nie za godziny. Zbieranie robi automat.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Jednorazowy zbiór",
                price: "od 49 zł",
                desc: "Jedno źródło, wynik w XLSX lub CSV.",
              },
              {
                title: "Odświeżanie cykliczne",
                price: "od 99 zł miesięcznie",
                desc: "Zbiór odświeżany automatycznie, ze zmianami oznaczonymi.",
                accent: true,
              },
              {
                title: "Źródło trudne",
                price: "wycena po sprawdzeniu",
                desc: "Najpierw sprawdzamy, czy da się to zebrać legalnie i stabilnie.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className={`rounded-2xl border p-6 ${
                  c.accent
                    ? "border-accent/50 bg-accent/5"
                    : "border-gray-200/80 dark:border-gray-800/80 bg-white/60 dark:bg-gray-900/40"
                }`}
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {c.title}
                </h3>
                <p className="mt-1 text-2xl font-bold text-accent">{c.price}</p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            Na start darmowa próbka kilkunastu rekordów, żebyś ocenił jakość
            przed zapłatą.
          </p>
        </section>

        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje oferty scrapingu danych"
            tabs={[
              {
                label: "Typy źródeł",
                content: (
                  <section
                    id="zrodla"
                    aria-labelledby="zrodla-heading"
                    className="py-10 lg:py-12"
                  >
                    <h2
                      id="zrodla-heading"
                      className="h2-sekcji mb-12 max-w-2xl"
                    >
                      4 typy źródeł, jeden pipeline
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {sourceTypes.map((src) => (
                        <div key={src.title}>
                          <article className="glass-card card-lift rounded-2xl p-7 h-full">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {src.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {src.examples}
                            </p>
                          </article>
                        </div>
                      ))}
                    </div>
                  </section>
                ),
              },
              {
                label: "FAQ",
                content: (
                  <section
                    id="faq"
                    aria-labelledby="faq-heading"
                    className="py-10 lg:py-12"
                  >
                    <div className="max-w-3xl mx-auto">
                      <h2
                        id="faq-heading"
                        className="h2-sekcji mb-8"
                      >
                        Częste pytania
                      </h2>
                      <div className="space-y-4">
                        {faq.map((item) => (
                          <details
                            key={item.question}
                            className="group bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl"
                          >
                            <summary className="flex items-center justify-between cursor-pointer p-6 text-gray-900 dark:text-white font-medium">
                              {item.question}
                              <svg
                                aria-hidden="true"
                                className="shrink-0 ml-4 w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform group-open:rotate-45"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <path
                                  d="M10 4v12M4 10h12"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </summary>
                            <div className="px-6 pb-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {item.answer}
                            </div>
                          </details>
                        ))}
                      </div>
                    </div>
                  </section>
                ),
              },
              {
                label: "Diagnoza",
                content: (
                  <section
                    id="diagnoza"
                    aria-labelledby="diagnoza-heading"
                    className="scroll-mt-20 py-10 lg:py-12"
                  >
                    <h2 id="diagnoza-heading" className="sr-only">
                      Bezpłatna diagnoza scrapingu
                    </h2>
                    <LandingForm
                      formId="diagnosis_scraping"
                      heading="Bezpłatna diagnoza scrapingu"
                      intro="Opisz, jakich danych potrzebujesz i skąd. Wrócimy w 24h z odpowiedzią, czy da się je zebrać."
                      submitLabel="Zamów diagnozę"
                    />
                  </section>
                ),
              },
            ]}
          />
        </div>
      <CTA />
      </main>

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Scraping i ekstrakcja danych",
            description:
              "Wyciągamy strukturalne dane ze stron, PDF-ów, maili i dokumentów. AI rozpoznaje pola, walidacja w czasie rzeczywistym, pipeline do CRM lub arkusza.",
            provider: { "@id": "https://fluxlab.pl/#organization" },
            areaServed: { "@type": "Country", name: "Polska" },
            serviceType: "Scraping i ekstrakcja danych",
            url: "https://fluxlab.pl/scraping-danych",
          }),
        }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />

      <Footer />
    </>
  );
}
