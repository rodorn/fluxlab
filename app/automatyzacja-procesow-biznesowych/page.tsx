import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";
import Tabs from "@/components/Tabs";
import WybierzBranze from "@/components/WybierzBranze";

export const metadata: Metadata = {
  title: "Automatyzacja procesów biznesowych dla firm | Fluxlab",
  description:
    "Projektujemy i wdrażamy automatyzację procesów biznesowych w firmach B2B. Mniej ręcznej pracy, mniej błędów, szybsze działanie i realny zwrot z wdrożenia.",
  openGraph: {
    title: "Automatyzacja procesów biznesowych dla firm | Fluxlab",
    description:
      "Projektujemy i wdrażamy automatyzację procesów biznesowych w firmach B2B. Mniej ręcznej pracy, mniej błędów, szybsze działanie i realny zwrot z wdrożenia.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, Automatyzacja leadów, CRM i raportowania dla firm B2B",
      },
    ],
  },
  alternates: {
    canonical: "/automatyzacja-procesow-biznesowych",
  },
};

const offer = [
  "Obieg danych: z formularzy, maili i arkuszy prosto do CRM, bez kopiowania.",
  "Zadania i powiadomienia: nowa sprawa sama uruchamia kolejny etap.",
  "Raporty: gotowe zestawienia zamiast zbierania danych ręcznie.",
];

const faqs = [
  {
    question: "Czy automatyzacja ma sens w małej firmie?",
    answer:
      "Tak. Mały zespół też traci czas na przepisywanie danych.",
  },
  {
    question: "Od czego zacząć automatyzację?",
    answer:
      "Od procesu częstego, powtarzalnego i podatnego na błędy.",
  },
  {
    question: "Czy trzeba wymieniać obecne narzędzia?",
    answer:
      "Nie. Łączymy systemy, które już macie.",
  },
];

export default function AutomatyzacjaProcesowBiznesowych() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs href="/automatyzacja-procesow-biznesowych" kolumna="srodek" items={[{ label: "Automatyzacja procesów biznesowych" }]} />

        {/* Hero */}
        <section className="relative overflow-hidden pt-24 pb-12">
          <div className="blob blob-accent -z-10 top-[-10%] left-[-5%]" />
          <div className="container-wide max-w-3xl mx-auto">
            <p className="section-label mb-5">Usługa</p>
            <h1 className="h1-strony mb-6">
              Automatyzacja procesów biznesowych
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
              Zastępujemy ręczną, powtarzalną pracę procesami, które działają
              same. Mniej błędów, szybsza realizacja.
            </p>
            <div className="mt-8">
              <a href="#branza" className="btn-primary">
                Sprawdź, co pochłania czas w Waszej branży
              </a>
            </div>
          </div>
        </section>

        {/* Wybor branzy nad zakladkami, zeby byl widoczny od razu. */}
        <div
          id="branza"
          className="scroll-mt-20 container-wide max-w-4xl mx-auto pb-14"
        >
          <WybierzBranze wariant="filar" />
        </div>

        {/* Treść w zakładkach */}
        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje usługi automatyzacji procesów biznesowych"
            tabs={[
              {
                label: "Co oferujemy",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="h2-sekcji mb-10">
                        Co oferujemy
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
                  </div>
                ),
              },
              {
                label: "FAQ",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="h2-sekcji mb-10">
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
                        formId="diagnosis_procesy"
                        heading="Sprawdźmy, który proces warto zautomatyzować"
                        intro="Opisz, co zabiera Wam najwięcej czasu. Wskażemy proces, który da największy efekt."
                        submitLabel="Sprawdźmy, który proces zautomatyzować"
                      />
                    </div>
                  </div>
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
            name: "Automatyzacja procesów biznesowych",
            description:
              "Projektujemy i wdrażamy automatyzację procesów biznesowych w firmach B2B. Mniej ręcznej pracy, mniej błędów, szybsze działanie i realny zwrot z wdrożenia.",
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
