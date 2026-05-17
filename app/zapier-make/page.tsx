import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LandingForm from "@/components/LandingForm";

export const metadata: Metadata = {
  title:
    "Zapier vs Make (Integromat) — porównanie i wdrożenie automatyzacji | Fluxlab",
  description:
    "Zapier czy Make? Porównujemy platformy automatyzacji, pomagamy wybrać najlepsze narzędzie i wdrażam workflow dopasowane do potrzeb Twojej firmy.",
  openGraph: {
    title:
      "Zapier vs Make (Integromat) — porównanie i wdrożenie automatyzacji | Fluxlab",
    description:
      "Zapier czy Make? Porównujemy platformy automatyzacji, pomagamy wybrać najlepsze narzędzie i wdrażam workflow dopasowane do potrzeb Twojej firmy.",
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
    canonical: "/zapier-make",
  },
};

const compare = [
  {
    name: "Zapier",
    desc: "Proste, liniowe przepływy i 7 000+ gotowych integracji. Szybkie wdrożenie, minimalna krzywa uczenia.",
  },
  {
    name: "Make",
    desc: "Wizualny builder z rozgałęzieniami, pętlami i obsługą błędów. Wybór, gdy workflow jest wieloetapowy.",
  },
  {
    name: "Oba naraz",
    desc: "Zapier do prostych automatyzacji, Make do procesów operacyjnych. Liczy się dopasowanie do problemu.",
  },
];

const faq = [
  {
    question: "Czy Zapier jest lepszy od Make?",
    answer:
      "Zapier jest prostszy i ma więcej integracji. Make daje większą kontrolę nad logiką i bywa tańszy przy skali. Wybór zależy od procesu.",
  },
  {
    question: "Czy mogę przenieść automatyzacje między platformami?",
    answer:
      "Tak, choć nie ma automatycznej migracji — logikę odtwarza się w nowym narzędziu. Pomagam w takich migracjach.",
  },
  {
    question: "Ile kosztuje Zapier vs Make?",
    answer:
      "Zapier rozlicza zadania, Make operacje. Przy dużej skali Make bywa wyraźnie tańszy. Pomagam dobrać plan, żeby nie przepłacać.",
  },
];

export default function ZapierMake() {
  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden py-24 lg:py-32">
          <div className="blob blob-cyan -z-10 top-[-10%] right-[-5%]" />
          <div className="container-wide max-w-3xl mx-auto text-center">
            <p className="section-label mb-5">Usługa</p>
            <h1 className="display-lg text-gray-900 dark:text-white mb-6">
              Zapier vs Make
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
              Dwie najpopularniejsze platformy automatyzacji no-code. Pomagam
              wybrać właściwe narzędzie i wdrożyć workflow, które oszczędzają
              czas.
            </p>
            <div className="mt-8">
              <a href="#diagnoza" className="btn-primary">
                Dobierz narzędzie
              </a>
            </div>
          </div>
        </section>

        {/* Kiedy co */}
        <section className="py-20 lg:py-28 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide max-w-4xl mx-auto">
            <h2 className="display-md text-gray-900 dark:text-white mb-10">
              Kiedy Zapier, kiedy Make
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {compare.map((item) => (
                <div
                  key={item.name}
                  className="card-lift rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60 p-7"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 lg:py-28 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide max-w-3xl mx-auto">
            <h2 className="display-md text-gray-900 dark:text-white mb-10">
              Częste pytania
            </h2>
            <div className="space-y-4">
              {faq.map((item) => (
                <details
                  key={item.question}
                  className="group card-lift bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl"
                >
                  <summary className="cursor-pointer p-6 flex items-center justify-between gap-4 text-gray-900 dark:text-white font-medium list-none">
                    {item.question}
                    <svg
                      className="shrink-0 w-5 h-5 text-gray-400 transition-transform group-open:rotate-45"
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
          className="scroll-mt-20 py-20 lg:py-24 bg-accent/10 border-t border-gray-100 dark:border-gray-800"
        >
          <div className="container-wide">
            <LandingForm
              formId="diagnosis_zapier_make"
              heading="Dobierz narzędzie do procesu"
              intro="Opisz krótko, jaki proces chcesz zautomatyzować, jakie systemy łączymy i jaki masz wolumen. Dostaniesz informację, czy lepszy będzie Zapier, Make czy n8n."
              submitLabel="Dobierz narzędzie"
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
            name: "Zapier vs Make — wdrożenie automatyzacji",
            description:
              "Zapier czy Make? Porównujemy platformy automatyzacji, pomagamy wybrać najlepsze narzędzie i wdrażam workflow dopasowane do potrzeb Twojej firmy.",
            provider: { "@id": "https://fluxlab.pl/#organization" },
            areaServed: { "@type": "Country", name: "Polska" },
            serviceType: "Automatyzacja procesów biznesowych",
            url: "https://fluxlab.pl/zapier-make",
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
