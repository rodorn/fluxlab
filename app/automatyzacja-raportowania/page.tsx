import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";
import Tabs from "@/components/Tabs";
import ZakresWyceny from "@/components/ZakresWyceny";
import { WYCENA_RAPORTOWANIE } from "@/lib/wycena";

export const metadata: Metadata = {
  title: "Automatyzacja raportowania i danych w firmie | Fluxlab",
  description:
    "Składamy raporty sprzedaży, marketingu i operacji tak, żeby powstawały same i przychodziły o stałej porze. Jedno źródło od 790 zł.",
  openGraph: {
    title: "Automatyzacja raportowania i danych w firmie | Fluxlab",
    description:
      "Składamy raporty sprzedaży, marketingu i operacji tak, żeby powstawały same i przychodziły o stałej porze. Jedno źródło od 790 zł.",
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
    canonical: "/automatyzacja-raportowania",
  },
};

const useCases = [
  "Sprzedaż: pipeline, leady i konwersje.",
  "Marketing: reklamy, formularze i CRM w jednym widoku.",
  "Operacje: statusy zadań, czas realizacji, wąskie gardła.",
];

const faqs = [
  {
    question: "Ile kosztuje automatyzacja raportu?",
    answer:
      "Raport z jednego źródła to 790 do 1 500 zł. Każde kolejne źródło dokłada 390 do 700 zł, a panel w przeglądarce 900 do 1 800 zł.",
  },
  {
    question: "Czy można połączyć dane z kilku źródeł?",
    answer: "Tak, łączymy dane z kilku systemów w jeden raport.",
  },
  {
    question: "Co jeśli dane są dziś niespójne?",
    answer:
      "Najpierw ustalamy jedną definicję i dopasowujemy rekordy między źródłami, potem automatyzujemy raport. To osobna pozycja, 490 do 1 200 zł.",
  },
  {
    question: "Czy to ma sens przy małym zespole?",
    answer:
      "Tak. Często największą wartość daje stały, poprawny raport wysyłany automatycznie.",
  },
];

export default function AutomatyzacjaRaportowania() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs href="/automatyzacja-raportowania" kolumna="srodek" items={[{ label: "Automatyzacja raportowania" }]} />

        {/* Hero, kompaktowy */}
        <section className="relative overflow-hidden pt-24 pb-12">
          <div className="blob blob-accent absolute -top-32 -right-20 h-96 w-96" />
          <div className="container-wide max-w-3xl mx-auto">
            <p className="section-label mb-5">Usługa</p>
            <h1 className="h1-strony mb-6">
              Automatyzacja raportowania
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Dane z różnych źródeł zbierają się same, a raport przychodzi o
              stałej porze. Jedno źródło od 790 zł.
            </p>
            <div>
              <a href="#sekcje" className="btn-primary">
                Policz zakres wyceny
              </a>
            </div>
          </div>
        </section>

        {/* Treść w zakładkach */}
        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje oferty automatyzacji raportowania"
            tabs={[
              {
                label: "Ile to kosztuje",
                content: (
                  <section className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="h2-sekcji mb-3">
                        Ile to kosztuje
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-8">
                        Zaznacz, co u Ciebie występuje, a zobaczysz zakres
                        ceny od razu.
                      </p>
                      <ZakresWyceny wycena={WYCENA_RAPORTOWANIE} />
                    </div>
                  </section>
                ),
              },
              {
                label: "Co automatyzujemy",
                content: (
                  <section className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="h2-sekcji mb-8">
                        Co automatyzujemy
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
                ),
              },
              {
                label: "Najczęstsze pytania",
                content: (
                  <section className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="h2-sekcji mb-8">
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
                      formId="diagnosis_raport"
                      heading="Sprawdźmy Twój proces raportowania"
                      intro="Napisz, skąd pochodzą dane i jak często składacie raport. Odpowiemy, czy da się go zautomatyzować."
                      submitLabel="Chcemy diagnozę raportowania"
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
            name: "Automatyzacja raportowania",
            description:
              "Składamy raporty sprzedaży, marketingu i operacji tak, żeby powstawały same i przychodziły o stałej porze. Jedno źródło od 790 zł.",
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
