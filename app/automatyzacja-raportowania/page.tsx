import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";
import Tabs from "@/components/Tabs";
import ZakresWyceny from "@/components/ZakresWyceny";
import { WYCENA_RAPORTOWANIE } from "@/lib/wycena";

export const metadata: Metadata = {
  title: "Automatyzacja raportowania i danych w firmie | Fluxlab",
  description:
    "Składam raporty sprzedaży, marketingu i operacji tak, żeby powstawały same i przychodziły o stałej porze. Jedno źródło od 790 zł.",
  openGraph: {
    title: "Automatyzacja raportowania i danych w firmie | Fluxlab",
    description:
      "Składam raporty sprzedaży, marketingu i operacji tak, żeby powstawały same i przychodziły o stałej porze. Jedno źródło od 790 zł.",
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
  "Raportowanie sprzedaży, pipeline, leady, konwersje i wyniki zbierane automatycznie.",
  "Raportowanie marketingu, dane z reklam, formularzy i CRM w jednym widoku.",
  "Raportowanie operacyjne, statusy zadań, czas realizacji i wąskie gardła.",
];

const faqs = [
  {
    question: "Ile kosztuje automatyzacja raportu?",
    answer:
      "Raport z jednego źródła, wysyłany o stałej porze, to 790 do 1 500 zł. Każde kolejne źródło dokłada 390 do 700 zł, uzgodnienie rozjeżdżających się liczb 490 do 1 200 zł, a panel w przeglądarce zamiast maila 900 do 1 800 zł. Kalkulator na tej stronie składa z tego zakres dla Twojego przypadku.",
  },
  {
    question: "Czy można połączyć dane z kilku źródeł?",
    answer: "Tak, to jedna z głównych korzyści automatyzacji raportowania.",
  },
  {
    question: "Co jeśli dane są dziś niespójne?",
    answer:
      "To częsty problem i zwykle najdłuższa część pracy. Najpierw ustalamy, która definicja obowiązuje i po czym dopasować rekordy między źródłami, dopiero potem automatyzujemy raport. W wycenie to osobna pozycja, 490 do 1 200 zł.",
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

        {/* Hero, kompaktowy */}
        <section className="relative overflow-hidden pt-24 pb-12">
          <div className="blob blob-accent absolute -top-32 -right-20 h-96 w-96" />
          <div className="container-wide max-w-3xl mx-auto text-center">
            <p className="section-label mb-5">Usługa</p>
            <h1 className="display-lg text-gray-900 dark:text-white mb-6">
              Automatyzacja raportowania
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Dane z różnych źródeł zbierają się same, a zespół pracuje na
              aktualnych, spójnych liczbach. Bez przeklejania, bez błędów.
              Raport z jednego źródła, wysyłany o stałej porze, zaczyna się od
              790 zł, a co podnosi tę kwotę, rozpisuję niżej co do pozycji.
            </p>
            <div>
              <a href="#sekcje" className="btn-primary">
                Policz zakres wyceny
              </a>
            </div>
          </div>
        </section>

        {/* Treść w zakładkach, nic nie wycięte, podzielone */}
        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje oferty automatyzacji raportowania"
            tabs={[
              {
                label: "Ile to kosztuje",
                content: (
                  <section className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                        Ile to kosztuje
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-8">
                        Raport raportowi nierówny: jedno źródło i wysyłka na
                        maila to inna praca niż cztery źródła, które dziś
                        pokazują różne liczby. Zaznacz, co u Ciebie występuje, a
                        zobaczysz rząd wielkości od razu.
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
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8">
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
                      intro="Opisz krótko, skąd pochodzą dane, kto składa raport i jak często. W odpowiedzi dostaniesz informację, czy raport da się zautomatyzować i co z tego wyniknie."
                      submitLabel="Chcemy diagnozę raportowania"
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
            name: "Automatyzacja raportowania",
            description:
              "Składam raporty sprzedaży, marketingu i operacji tak, żeby powstawały same i przychodziły o stałej porze. Jedno źródło od 790 zł.",
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
