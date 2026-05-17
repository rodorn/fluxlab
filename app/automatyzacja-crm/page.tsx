import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "Automatyzacja CRM dla sprzedaży i obsługi klienta | Fluxlab",
  description:
    "Wdrażam automatyzację CRM: leady, follow-upy, statusy, zadania, pipeline i integracje. Mniej ręcznej pracy, lepsza kontrola sprzedaży i szybsza reakcja zespołu.",
  openGraph: {
    title: "Automatyzacja CRM dla sprzedaży i obsługi klienta | Fluxlab",
    description:
      "Wdrażam automatyzację CRM: leady, follow-upy, statusy, zadania, pipeline i integracje. Mniej ręcznej pracy, lepsza kontrola sprzedaży i szybsza reakcja zespołu.",
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
    canonical: "/automatyzacja-crm",
  },
};

const offer = [
  "Nowe leady z formularzy, maili i kampanii automatycznie trafiają do CRM, z przypisanym źródłem i priorytetem.",
  "Zadania i follow-upy tworzą się same — żaden lead nie znika z procesu.",
  "Pipeline pozostaje uporządkowany: aktualne pola, brak duplikatów, dane spójne z innymi systemami.",
];

const faq = [
  {
    question: "Czy automatyzacja CRM zastąpi handlowca?",
    answer:
      "Nie. Ma usunąć ręczne klikanie i pilnowanie procesu, żeby handlowiec mógł skupić się na sprzedaży.",
  },
  {
    question: "Z jakimi CRM pracujecie?",
    answer:
      "Wdrażam automatyzacje w popularnych systemach CRM i łączę je z innymi narzędziami używanymi w firmie.",
  },
  {
    question: "Ile to kosztuje?",
    answer:
      "Proste automatyzacje mają niski próg wejścia. Zaawansowane wdrożenia ze scoringiem i integracjami API wyceniam indywidualnie.",
  },
];

export default function AutomatyzacjaCRM() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Automatyzacja CRM" }]} />

        {/* Hero — kompaktowy */}
        <section className="relative overflow-hidden pt-24 pb-12">
          <div className="blob blob-accent -z-10 -top-32 -right-24 h-96 w-96" />
          <div className="container-wide max-w-3xl">
            <p className="section-label mb-5">Usługa</p>
            <h1 className="display-lg text-gray-900 dark:text-white">
              Automatyzacja CRM
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
              Uporządkuj sprzedaż i przyspiesz reakcję na leady. Sprawiam, że
              CRM nie jest tylko bazą kontaktów, ale realnym narzędziem pracy.
            </p>
            <a href="#sekcje" className="btn-primary mt-8 inline-flex">
              Chcę diagnozę procesu CRM
            </a>
          </div>
        </section>

        {/* Treść w zakładkach — nic nie wycięte, podzielone */}
        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje oferty automatyzacji CRM"
            tabs={[
              {
                label: "Co oferuję",
                content: (
                  <section className="py-10 lg:py-12">
                    <div className="max-w-3xl">
                      <h2 className="display-xl mb-12 text-gray-900 dark:text-white">
                        Co oferuję
                      </h2>
                      <ul className="space-y-6">
                        {offer.map((item) => (
                          <li
                            key={item}
                            className="card-lift flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-700 dark:bg-gray-800/60"
                          >
                            <svg
                              className="mt-0.5 shrink-0 text-accent"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="M4 10.5l3.5 3.5L16 5.5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>
                ),
              },
              {
                label: "Pytania",
                content: (
                  <section className="py-10 lg:py-12">
                    <div className="max-w-3xl">
                      <h2 className="display-xl mb-12 text-gray-900 dark:text-white">
                        Pytania
                      </h2>
                      <div className="space-y-4">
                        {faq.map((item) => (
                          <details
                            key={item.question}
                            className="group rounded-2xl border border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800/60"
                          >
                            <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 font-medium text-gray-900 dark:text-white [&::-webkit-details-marker]:hidden">
                              {item.question}
                              <svg
                                className="ml-4 h-5 w-5 shrink-0 text-gray-400 transition-transform group-open:rotate-45"
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
                ),
              },
              {
                label: "Diagnoza",
                content: (
                  <section
                    id="diagnoza"
                    className="scroll-mt-20 py-10 lg:py-12"
                  >
                    <LandingForm
                      formId="diagnosis_crm"
                      heading="Sprawdźmy Twój proces sprzedaży"
                      intro="Opisz krótko, jak dziś wygląda obsługa leadów i deali w Twoim CRM. W odpowiedzi dostaniesz informację, czy automatyzacja ma sens i jaki pierwszy krok da największy efekt."
                      submitLabel="Chcę diagnozę procesu CRM"
                    />
                  </section>
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
            name: "Automatyzacja CRM",
            description:
              "Wdrażam automatyzację CRM: leady, follow-upy, statusy, zadania, pipeline i integracje. Mniej ręcznej pracy, lepsza kontrola sprzedaży i szybsza reakcja zespołu.",
            provider: { "@id": "https://fluxlab.pl/#organization" },
            areaServed: { "@type": "Country", name: "Polska" },
            serviceType: "Automatyzacja procesów biznesowych",
            url: "https://fluxlab.pl/automatyzacja-crm",
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
