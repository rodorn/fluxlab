import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LandingForm from "@/components/LandingForm";

export const metadata: Metadata = {
  title: "n8n — automatyzacja workflow z pełną kontrolą | Fluxlab",
  description:
    "Wdrażam automatyzacje na platformie n8n: self-hosted lub cloud, integracje API, webhooki, własne nody. Alternatywa dla Zapier i Make z pełną kontrolą nad infrastrukturą.",
  openGraph: {
    title: "n8n — automatyzacja workflow z pełną kontrolą | Fluxlab",
    description:
      "Wdrażam automatyzacje na platformie n8n: self-hosted lub cloud, integracje API, webhooki, własne nody. Alternatywa dla Zapier i Make z pełną kontrolą nad infrastrukturą.",
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
    canonical: "/n8n",
  },
};

const offer = [
  "Integracja CRM, ERP, baz danych i dowolnego API w jeden workflow.",
  "Webhooki — reakcja na zdarzenia w czasie rzeczywistym, bez pollingu.",
  "Własna logika w nodach JavaScript i Python tam, gdzie no-code nie wystarcza.",
  "Self-hosted lub cloud — Twoje dane, Twoja infrastruktura.",
];

const faq = [
  {
    question: "Czym n8n różni się od Zapier i Make?",
    answer:
      "n8n można hostować na własnym serwerze, ma kod nodów (JS, Python) i nie płacisz za każde wykonanie scenariusza.",
  },
  {
    question: "Czy n8n nadaje się dla małej firmy?",
    answer:
      "Tak. Wersja self-hosted jest darmowa, a n8n Cloud pozwala zacząć bez własnej infrastruktury.",
  },
  {
    question: "Czy mogę przenieść automatyzacje z Zapier/Make?",
    answer:
      "Tak. Większość scenariuszy da się odtworzyć w n8n — migracja to dobra okazja, by je uprościć.",
  },
];

export default function N8nPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden py-24 lg:py-32">
          <div className="blob blob-violet -z-10 top-[-10%] left-[-5%]" />
          <div className="container-wide max-w-3xl mx-auto text-center">
            <p className="section-label mb-5">Usługa</p>
            <h1 className="display-lg text-gray-900 dark:text-white mb-6">
              Automatyzacja z n8n
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
              Workflow, które łączą systemy, API i logikę biznesową w jednym
              miejscu. Self-hosted lub cloud — z pełną kontrolą nad danymi.
            </p>
            <div className="mt-8">
              <a href="#diagnoza" className="btn-primary">
                Sprawdź swój workflow
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
              {faq.map((item) => (
                <details
                  key={item.question}
                  className="group card-lift bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-6 text-gray-900 dark:text-white font-medium list-none">
                    {item.question}
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
              formId="diagnosis_n8n"
              heading="Sprawdźmy Twój workflow w n8n"
              intro="Opisz krótko, jakie procesy chcesz zautomatyzować: jakie systemy łączymy, jaki wolumen, self-hosted czy cloud. Dostaniesz wstępną propozycję architektury."
              submitLabel="Chcę diagnozę workflow n8n"
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
            name: "Automatyzacja z n8n",
            description:
              "Wdrażam automatyzacje na platformie n8n: self-hosted lub cloud, integracje API, webhooki, własne nody. Alternatywa dla Zapier i Make z pełną kontrolą nad infrastrukturą.",
            provider: { "@id": "https://fluxlab.pl/#organization" },
            areaServed: { "@type": "Country", name: "Polska" },
            serviceType: "Automatyzacja procesów biznesowych",
            url: "https://fluxlab.pl/n8n",
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
