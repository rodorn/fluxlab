import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LandingForm from "@/components/LandingForm";
import TrackedCTA from "@/components/TrackedCTA";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Scraping i ekstrakcja danych — web, PDF, maile, dokumenty | Fluxlab",
  description:
    "Wyciągam strukturalne dane ze stron, PDF-ów, maili i dokumentów. AI rozpoznaje pola, walidacja w czasie rzeczywistym, pipeline do CRM lub arkusza. Bez ręcznego kopiowania.",
  alternates: { canonical: "/scraping-danych" },
  openGraph: {
    title:
      "Scraping i ekstrakcja danych — web, PDF, maile, dokumenty | Fluxlab",
    description:
      "Wyciągam strukturalne dane ze stron, PDF-ów, maili. AI rozpoznaje pola.",
    locale: "pl_PL",
    type: "website",
  },
};

const sourceTypes = [
  {
    title: "Web scraping",
    examples: "Monitoring cen, oferty konkurencji, katalogi branżowe.",
  },
  {
    title: "PDF i dokumenty",
    examples: "Faktury, umowy, raporty — OCR + AI klasyfikacja pól.",
  },
  {
    title: "Maile",
    examples: "Zapytania ofertowe, zamówienia, kontakty z luźnych wiadomości.",
  },
  {
    title: "Dokumenty Office",
    examples: "Excel, Word — chaos arkuszy do jednego czystego schematu.",
  },
];

const faq = [
  {
    question: "Czy scraping jest legalny?",
    answer:
      "Publiczne strony zgodnie z TOS i robots.txt — tak. Chronione, logged-in albo paid content — nie. Każdy przypadek oceniam indywidualnie i mówię wprost, gdy widzę ryzyko.",
  },
  {
    question: "Co jeśli strona zmieni layout?",
    answer:
      "Każdy produkcyjny scraper ma monitoring i alerty na anomalia. Aktualizację selektorów robię w ramach wsparcia, zwykle 1–2 dni od zgłoszenia.",
  },
  {
    question: "Czy dane są bezpieczne?",
    answer:
      "Tak. Pipeline szyfrowany, dane w Twojej infrastrukturze. Mam dostęp tylko na czas wdrożenia, później wszystko jest po Twojej stronie. NDA standardowo.",
  },
];

export default function ScrapingDanychPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section
          aria-labelledby="hero-heading"
          className="relative pt-32 pb-24 overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="blob blob-cyan -z-10 top-[-15%] left-[-10%] w-[600px] h-[600px]"
          />
          <div
            aria-hidden="true"
            className="blob blob-violet -z-10 bottom-[-20%] right-[-10%] w-[500px] h-[500px]"
          />
          <div className="container-wide relative">
            <div className="max-w-3xl">
              <p className="section-label animate-fade-up-1 mb-4">
                Scraping danych
              </p>
              <h1
                id="hero-heading"
                className="display-xl animate-fade-up-2 mb-6 text-gray-900 dark:text-white"
              >
                Wyciągam dane z miejsc, w których normalnie giną.
              </h1>
              <p className="animate-fade-up-3 text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-10 max-w-2xl">
                Strony WWW, PDF-y, maile, dokumenty. AI rozpoznaje pola,
                pipeline trafia do Twojego CRM albo arkusza. Bez kopiowania.
              </p>
              <TrackedCTA
                href="#diagnoza"
                location="hero_scraping"
                label="diagnoza"
                eventName="cta_click_hero_scraping_audit"
                className="btn-primary animate-fade-up-4 text-base px-8 py-4"
              >
                Zamów bezpłatną diagnozę
              </TrackedCTA>
            </div>
          </div>
        </section>

        {/* Typy źródeł */}
        <section
          id="zrodla"
          aria-labelledby="zrodla-heading"
          className="py-24 border-t border-gray-100 dark:border-gray-800"
        >
          <div className="container-wide">
            <h2
              id="zrodla-heading"
              className="display-lg text-gray-900 dark:text-white mb-12 max-w-2xl"
            >
              4 typy źródeł, jeden pipeline
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {sourceTypes.map((src, idx) => (
                <RevealOnScroll
                  key={src.title}
                  delay={((idx % 4) + 1) as 1 | 2 | 3 | 4}
                >
                  <article className="glass-card card-lift rounded-2xl p-7 h-full">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {src.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {src.examples}
                    </p>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Etyka */}
        <section
          id="etyka"
          aria-labelledby="etyka-heading"
          className="py-24 border-t border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/40"
        >
          <div className="container-wide">
            <div className="max-w-3xl">
              <p className="section-label mb-3">Etyka i prawo</p>
              <h2
                id="etyka-heading"
                className="display-lg text-gray-900 dark:text-white mb-6"
              >
                Scraping to narzędzie, nie wytrych.
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                Robię scraping publicznych stron zgodnie z TOS i robots.txt oraz
                ekstrakcję z Twoich danych. Nie obchodzę zabezpieczeń, nie
                ruszam chronionych zasobów ani danych osobowych bez podstawy
                prawnej. Gdy widzę ryzyko — mówię wprost.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          aria-labelledby="faq-heading"
          className="py-24 border-t border-gray-100 dark:border-gray-800"
        >
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2
                id="faq-heading"
                className="display-lg text-gray-900 dark:text-white mb-8"
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
                        className="shrink-0 ml-4 w-5 h-5 text-gray-400 transition-transform group-open:rotate-45"
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
          </div>
        </section>

        {/* Form — diagnoza */}
        <section
          id="diagnoza"
          aria-labelledby="diagnoza-heading"
          className="scroll-mt-20 py-24 bg-accent/10 border-t border-gray-100 dark:border-gray-800"
        >
          <div className="container-wide">
            <h2 id="diagnoza-heading" className="sr-only">
              Bezpłatna diagnoza scrapingu
            </h2>
            <LandingForm
              formId="diagnosis_scraping"
              heading="Bezpłatna diagnoza scrapingu"
              intro="Opisz krótko, jakich danych potrzebujesz i z jakich źródeł. Wrócę w 24h z informacją, czy widzę dopasowanie i czy źródło jest dostępne legalnie."
              submitLabel="Zamów diagnozę"
            />
          </div>
        </section>
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
              "Wyciągam strukturalne dane ze stron, PDF-ów, maili i dokumentów. AI rozpoznaje pola, walidacja w czasie rzeczywistym, pipeline do CRM lub arkusza.",
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
