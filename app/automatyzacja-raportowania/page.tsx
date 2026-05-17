import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";

export const metadata: Metadata = {
  title: "Automatyzacja raportowania i danych w firmie | Fluxlab",
  description:
    "Automatyzujemy raportowanie sprzedaży, marketingu i operacji. Łączymy dane z wielu źródeł i eliminujemy ręczne przygotowywanie raportów.",
  openGraph: {
    title: "Automatyzacja raportowania i danych w firmie | Fluxlab",
    description:
      "Automatyzujemy raportowanie sprzedaży, marketingu i operacji. Łączymy dane z wielu źródeł i eliminujemy ręczne przygotowywanie raportów.",
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
    canonical: "/automatyzacja-raportowania",
  },
};

const useCases = [
  "Raportowanie sprzedaży — pipeline, leady, konwersje i wyniki zbierane automatycznie.",
  "Raportowanie marketingu — dane z reklam, formularzy i CRM w jednym widoku.",
  "Raportowanie operacyjne — statusy zadań, czas realizacji i wąskie gardła.",
];

const faqs = [
  {
    question: "Czy można połączyć dane z kilku źródeł?",
    answer: "Tak, to jedna z głównych korzyści automatyzacji raportowania.",
  },
  {
    question: "Co jeśli dane są dziś niespójne?",
    answer:
      "To częsty problem. Najpierw porządkujemy logikę i źródła danych, potem automatyzujemy raport.",
  },
  {
    question: "Czy to ma sens przy małym zespole?",
    answer:
      "Tak. Czasem największą wartość daje po prostu stały, poprawny raport wysyłany automatycznie.",
  },
];

export default function AutomatyzacjaRaportowania() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Automatyzacja raportowania" }]} />

        {/* Hero */}
        <section className="relative overflow-hidden py-24 lg:py-32">
          <div className="blob blob-accent absolute -top-32 -right-20 h-96 w-96" />
          <div className="container-wide max-w-3xl mx-auto text-center">
            <p className="section-label mb-5">Usługa</p>
            <h1 className="display-lg text-gray-900 dark:text-white mb-6">
              Automatyzacja raportowania
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Dane z różnych źródeł zbierają się same, a zespół pracuje na
              aktualnych, spójnych liczbach. Bez przeklejania, bez błędów.
            </p>
          </div>
        </section>

        {/* Co automatyzuję */}
        <section className="py-20 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide max-w-3xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Co automatyzuję
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
        </section>

        {/* FAQ */}
        <section className="py-20 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide max-w-3xl mx-auto">
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
        </section>

        {/* Form — diagnoza */}
        <section
          id="diagnoza"
          className="scroll-mt-20 py-20 bg-accent/10 border-t border-gray-100 dark:border-gray-800"
        >
          <div className="container-wide">
            <LandingForm
              formId="diagnosis_raport"
              heading="Sprawdźmy Twój proces raportowania"
              intro="Opisz krótko, skąd pochodzą dane, kto składa raport i jak często. W odpowiedzi dostaniesz informację, czy raport da się zautomatyzować i co z tego wyniknie."
              submitLabel="Chcę diagnozę raportowania"
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
            name: "Automatyzacja raportowania",
            description:
              "Automatyzujemy raportowanie sprzedaży, marketingu i operacji. Łączymy dane z wielu źródeł i eliminujemy ręczne przygotowywanie raportów.",
            provider: { "@id": "https://fluxlab.pl/#organization" },
            areaServed: { "@type": "Country", name: "Polska" },
            serviceType: "Automatyzacja procesów biznesowych",
            url: "https://fluxlab.pl/automatyzacja-raportowania",
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
