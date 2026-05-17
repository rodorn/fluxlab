import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";

export const metadata: Metadata = {
  title: "Automatyzacja leadów i obsługi zapytań sprzedażowych | Fluxlab",
  description:
    "Wdrażam automatyzację leadów: zbieranie, routing, kwalifikacja, powiadomienia i follow-up. Szybsza reakcja, mniej chaosu i lepsze wykorzystanie szans sprzedażowych.",
  openGraph: {
    title: "Automatyzacja leadów i obsługi zapytań sprzedażowych | Fluxlab",
    description:
      "Wdrażam automatyzację leadów: zbieranie, routing, kwalifikacja, powiadomienia i follow-up. Szybsza reakcja, mniej chaosu i lepsze wykorzystanie szans sprzedażowych.",
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
    canonical: "/automatyzacja-leadow",
  },
};

const offer = [
  "Zbieram leady z wielu źródeł — formularzy, reklam, maila, landing page — do jednego procesu.",
  "Każdy lead trafia do właściwej osoby według regionu, branży, typu zapytania lub wartości.",
  "Po wpłynięciu leada uruchamiam potwierdzenie, zadanie i follow-up — bez opóźnień.",
];

const faq = [
  {
    question: "Czy automatyzacja leadów poprawia sprzedaż?",
    answer:
      "Tak, bo skraca czas reakcji i zmniejsza ryzyko, że lead zostanie pominięty lub źle obsłużony.",
  },
  {
    question: "Czy można ustawić różne reguły przypisywania leadów?",
    answer: "Tak, routing może być oparty o dowolne warunki biznesowe.",
  },
  {
    question: "Ile to kosztuje?",
    answer:
      "Proste wdrożenia można zrobić szybko. Zaawansowane procesy ze scoringiem i wieloma wyjątkami wyceniam indywidualnie.",
  },
];

export default function AutomatyzacjaLeadow() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Automatyzacja leadów" }]} />

        {/* Hero */}
        <section className="relative overflow-hidden py-24 lg:py-32">
          <div className="blob blob-cyan -z-10 -top-32 -right-24 h-96 w-96" />
          <div className="container-wide max-w-3xl">
            <p className="section-label mb-5">Usługa</p>
            <h1 className="display-lg text-gray-900 dark:text-white">
              Automatyzacja leadów
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
              Leady tracą wartość, gdy czekają na ręczne ogarnięcie. Pomagam
              szybciej reagować i kierować zapytania do właściwych osób bez
              chaosu i opóźnień.
            </p>
            <a href="#diagnoza" className="btn-primary mt-8 inline-flex">
              Chcę diagnozę procesu leadów
            </a>
          </div>
        </section>

        {/* Co oferuję */}
        <section className="border-t border-gray-100 py-24 dark:border-gray-800 lg:py-32">
          <div className="container-wide max-w-3xl">
            <h2 className="display-xl mb-12 text-gray-900 dark:text-white">
              Co oferuję
            </h2>
            <div className="space-y-6">
              {offer.map((item, i) => (
                <div
                  key={i}
                  className="card-lift flex items-start gap-5 rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-700 dark:bg-gray-800/60"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-sm font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-gray-700 dark:text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-gray-100 py-24 dark:border-gray-800 lg:py-32">
          <div className="container-wide max-w-3xl">
            <h2 className="display-xl mb-12 text-gray-900 dark:text-white">
              Pytania
            </h2>
            <div className="space-y-4">
              {faq.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800/60"
                >
                  <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-4 p-6 font-medium text-gray-900 dark:text-white [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <svg
                      className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-open:rotate-45"
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
                  <div className="px-6 pb-6 text-sm text-gray-500 dark:text-gray-400">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Form — diagnoza */}
        <section
          id="diagnoza"
          className="scroll-mt-20 border-t border-gray-100 bg-accent/10 py-24 dark:border-gray-800 lg:py-28"
        >
          <div className="container-wide">
            <LandingForm
              formId="diagnosis_leadow"
              heading="Sprawdźmy Twój proces obsługi leadów"
              intro="Opisz krótko, skąd wpadają zapytania, kto je odbiera i co dziś robicie ręcznie. W odpowiedzi dostaniesz informację, gdzie najprawdopodobniej giną leady i jaki pierwszy krok da największy efekt."
              submitLabel="Chcę diagnozę procesu leadów"
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
            name: "Automatyzacja leadów",
            description:
              "Wdrażam automatyzację leadów: zbieranie, routing, kwalifikacja, powiadomienia i follow-up. Szybsza reakcja, mniej chaosu i lepsze wykorzystanie szans sprzedażowych.",
            provider: { "@id": "https://fluxlab.pl/#organization" },
            areaServed: { "@type": "Country", name: "Polska" },
            serviceType: "Automatyzacja procesów biznesowych",
            url: "https://fluxlab.pl/automatyzacja-leadow",
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
