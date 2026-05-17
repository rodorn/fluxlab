import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "Automatyzacja AI w procesach firmowych | Fluxlab",
  description:
    "Wdrażam automatyzację AI w firmie: klasyfikacja danych, streszczenia, analiza treści, wsparcie obsługi i inteligentne workflow połączone z CRM i innymi systemami.",
  openGraph: {
    title: "Automatyzacja AI w procesach firmowych | Fluxlab",
    description:
      "Wdrażam automatyzację AI w firmie: klasyfikacja danych, streszczenia, analiza treści, wsparcie obsługi i inteligentne workflow połączone z CRM i innymi systemami.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab — Automatyzacja leadów, CRM i raportowania dla firm B2B",
      },
    ],
  },
  alternates: {
    canonical: "/automatyzacja-ai",
  },
};

const useCases = [
  "Klasyfikacja i priorytetyzacja zapytań — rozpoznanie tematu, typu klienta i pilności sprawy.",
  "Streszczenia i porządkowanie informacji — kluczowe punkty z długich maili, notatek i zgłoszeń.",
  "Wsparcie obsługi i sprzedaży — szkice odpowiedzi, sugestie kolejnych kroków, analiza historii.",
];

const faqs = [
  {
    question: "Czy AI zastąpi pracowników?",
    answer:
      "Nie w tym modelu. AI wspiera ludzi, automatyzując powtarzalne analizy i przygotowując dane do decyzji.",
  },
  {
    question: "Czy AI się myli?",
    answer:
      "Tak, dlatego projektuję procesy z weryfikacją i fallbackiem na człowieka tam, gdzie to potrzebne.",
  },
  {
    question: "Czy potrzebuję własnych danych do treningu?",
    answer:
      "Nie zawsze. Wiele zastosowań działa na gotowych modelach z odpowiednim promptem i kontekstem.",
  },
];

export default function AutomatyzacjaAI() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs items={[{ label: "Automatyzacja AI" }]} />

        {/* Hero — kompaktowy */}
        <section className="relative overflow-hidden pt-24 pb-12">
          <div className="blob blob-violet absolute -top-32 -right-20 h-96 w-96" />
          <div className="container-wide max-w-3xl mx-auto text-center">
            <p className="section-label mb-5">Usługa</p>
            <h1 className="display-lg text-gray-900 dark:text-white mb-6">
              Automatyzacja AI
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Wdrażam AI tam, gdzie realnie skraca czas pracy: analiza treści,
              klasyfikacja danych i generowanie odpowiedzi w istniejących
              procesach. Bez modnego hasła.
            </p>
            <div>
              <a href="#sekcje" className="btn-primary">
                Sprawdźmy, gdzie AI ma sens
              </a>
            </div>
          </div>
        </section>

        {/* Treść w zakładkach — nic nie wycięte, podzielone */}
        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje usługi automatyzacji AI"
            tabs={[
              {
                label: "Gdzie AI ma sens",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        Gdzie AI ma sens
                      </h2>
                      <ul className="grid gap-4">
                        {useCases.map((item) => (
                          <li
                            key={item}
                            className="card-lift rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60 p-6 text-gray-700 dark:text-gray-300"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ),
              },
              {
                label: "FAQ",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        Najczęstsze pytania
                      </h2>
                      <div className="space-y-4">
                        {faqs.map((faq) => (
                          <details
                            key={faq.question}
                            className="group rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60"
                          >
                            <summary className="flex items-center justify-between cursor-pointer p-6 text-gray-900 dark:text-white font-medium list-none">
                              {faq.question}
                              <svg
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
                            <div className="px-6 pb-6 text-sm text-gray-600 dark:text-gray-400">
                              {faq.answer}
                            </div>
                          </details>
                        ))}
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Diagnoza",
                content: (
                  <div id="diagnoza" className="scroll-mt-20 py-10 lg:py-12">
                    <div className="container-wide">
                      <LandingForm
                        formId="diagnosis_ai"
                        heading="Sprawdźmy, gdzie AI ma sens"
                        intro="Opisz krótko proces, który chcesz wzbogacić o AI: co dziś robi człowiek ręcznie, na jakich danych i w jakiej skali. W odpowiedzi dostaniesz informację, czy AI rozwiąże problem szybko."
                        submitLabel="Sprawdźmy, gdzie AI ma sens"
                      />
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </main>

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Automatyzacja AI",
            description:
              "Wdrażam automatyzację AI w firmie: klasyfikacja danych, streszczenia, analiza treści, wsparcie obsługi i inteligentne workflow połączone z CRM i innymi systemami.",
            provider: { "@id": "https://fluxlab.pl/#organization" },
            areaServed: { "@type": "Country", name: "Polska" },
            serviceType: "Automatyzacja procesów biznesowych",
            url: "https://fluxlab.pl/automatyzacja-ai",
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
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      <Footer />
    </>
  );
}
