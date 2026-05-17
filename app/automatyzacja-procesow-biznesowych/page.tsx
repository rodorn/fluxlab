import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LandingForm from "@/components/LandingForm";

export const metadata: Metadata = {
  title: "Automatyzacja procesów biznesowych dla firm | Fluxlab",
  description:
    "Projektuję i wdrażam automatyzację procesów biznesowych w firmach B2B. Mniej ręcznej pracy, mniej błędów, szybsze działanie i realny zwrot z wdrożenia.",
  openGraph: {
    title: "Automatyzacja procesów biznesowych dla firm | Fluxlab",
    description:
      "Projektuję i wdrażam automatyzację procesów biznesowych w firmach B2B. Mniej ręcznej pracy, mniej błędów, szybsze działanie i realny zwrot z wdrożenia.",
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
    canonical: "/automatyzacja-procesow-biznesowych",
  },
};

const offer = [
  "Obieg danych — z formularzy, maili, CRM i arkuszy trafiają tam, gdzie powinny. Bez kopiowania i dubli.",
  "Zadania i powiadomienia — nowy klient lub sprawa automatycznie uruchamia kolejny etap procesu.",
  "Raportowanie — gotowe raporty zamiast ręcznego zbierania danych z kilku miejsc.",
];

const faqs = [
  {
    question: "Czy automatyzacja ma sens w małej firmie?",
    answer:
      "Tak. Nawet mały zespół szybko traci czas na ręczne przepisywanie danych i pilnowanie statusów.",
  },
  {
    question: "Od czego zacząć automatyzację?",
    answer:
      "Od procesu, który jest częsty, powtarzalny i generuje błędy albo opóźnienia.",
  },
  {
    question: "Czy trzeba wymieniać obecne narzędzia?",
    answer:
      "Nie. Najczęściej automatyzuję to, co już działa, i łączę istniejące systemy.",
  },
];

export default function AutomatyzacjaProcesowBiznesowych() {
  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden py-24 lg:py-32">
          <div className="blob blob-accent -z-10 top-[-10%] left-[-5%]" />
          <div className="container-wide max-w-3xl mx-auto text-center">
            <p className="section-label mb-5">Usługa</p>
            <h1 className="display-lg text-gray-900 dark:text-white mb-6">
              Automatyzacja procesów biznesowych
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
              Eliminuję ręczną, powtarzalną pracę i zastępuję ją sprawnymi
              procesami. Mniej błędów, szybsza realizacja zadań, uporządkowany
              obieg danych.
            </p>
            <div className="mt-8">
              <a href="#diagnoza" className="btn-primary">
                Sprawdź, co zautomatyzować
              </a>
            </div>
          </div>
        </section>

        {/* Co oferuję */}
        <section className="py-20 lg:py-28 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide max-w-3xl mx-auto">
            <h2 className="display-md text-gray-900 dark:text-white mb-10">
              Co oferuję
            </h2>
            <ul className="space-y-5">
              {offer.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 text-lg text-gray-700 dark:text-gray-300"
                >
                  <span
                    className="shrink-0 mt-1 w-2.5 h-2.5 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 lg:py-28 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide max-w-3xl mx-auto">
            <h2 className="display-md text-gray-900 dark:text-white mb-10">
              Częste pytania
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group card-lift rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60"
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
        </section>

        {/* Form — diagnoza */}
        <section
          id="diagnoza"
          className="scroll-mt-20 py-20 lg:py-24 bg-accent/10 border-t border-gray-100 dark:border-gray-800"
        >
          <div className="container-wide">
            <LandingForm
              formId="diagnosis_procesy"
              heading="Sprawdźmy, który proces warto zautomatyzować"
              intro="Opisz krótko, co najbardziej kosztuje Cię czas: ręczne raporty, przepisywanie danych, follow-upy, obieg dokumentów. Dostaniesz informację, który proces da największy efekt."
              submitLabel="Sprawdźmy, który proces zautomatyzować"
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
            name: "Automatyzacja procesów biznesowych",
            description:
              "Projektuję i wdrażam automatyzację procesów biznesowych w firmach B2B. Mniej ręcznej pracy, mniej błędów, szybsze działanie i realny zwrot z wdrożenia.",
            provider: { "@id": "https://fluxlab.pl/#organization" },
            areaServed: { "@type": "Country", name: "Polska" },
            serviceType: "Automatyzacja procesów biznesowych",
            url: "https://fluxlab.pl/automatyzacja-procesow-biznesowych",
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
