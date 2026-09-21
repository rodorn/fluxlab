import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";
import Tabs from "@/components/Tabs";
import ZakresWyceny from "@/components/ZakresWyceny";
import { WYCENA_INTEGRACJE } from "@/lib/wycena";

export const metadata: Metadata = {
  title: "Integracje API i łączenie systemów w firmie | Fluxlab",
  description:
    "Spinam CRM, ERP, sklep i hurtownie tak, żeby dane przechodziły same. Spięcie dwóch systemów zaczyna się od 1 500 zł, a zakres wyliczysz na stronie bez wysyłania zapytania.",
  openGraph: {
    title: "Integracje API i łączenie systemów w firmie | Fluxlab",
    description:
      "Spinam CRM, ERP, sklep i hurtownie tak, żeby dane przechodziły same. Spięcie dwóch systemów zaczyna się od 1 500 zł, a zakres wyliczysz na stronie bez wysyłania zapytania.",
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
    canonical: "/integracje-api",
  },
};

const useCases = [
  "CRM z formularzami i źródłami leadów, nowe dane trafiają do CRM bez opóźnień.",
  "Systemy operacyjne i finansowe, statusy, klienci i zamówienia synchronizowane między sobą.",
  "Raportowanie i bazy danych, jeden uporządkowany przepływ danych do raportów i analiz.",
];

const faq = [
  {
    question: "Ile kosztuje integracja?",
    answer:
      "Spięcie dwóch systemów w jedną stronę to 1 500 do 2 900 zł. Każdy kolejny system dokłada 690 do 1 400 zł, praca w obie strony 590 do 1 200 zł, a system bez otwartego API 890 do 1 900 zł. Kalkulator na tej stronie składa z tego zakres dla Twojego przypadku. Wiążąca kwota pada po bezpłatnej diagnozie.",
  },
  {
    question: "Czym różni się integracja API od zwykłej automatyzacji?",
    answer:
      "Integracja API skupia się na bezpośredniej wymianie danych między systemami, w bardziej stabilny i elastyczny sposób.",
  },
  {
    question: "Czy da się połączyć systemy bez otwartego API?",
    answer:
      "Zwykle tak, tylko inną drogą: przez eksport pliku, skrzynkę pocztową albo pobieranie ze strony. Działa to wolniej i wymaga czujnika na zmianę formatu, bo taka zmiana nie zgłasza się sama. W wycenie to osobna pozycja, 890 do 1 900 zł.",
  },
  {
    question: "Czy integracje API są tylko dla dużych firm?",
    answer:
      "Nie. Mniejsze firmy często szybciej odczuwają wartość, bo eliminują ręczną pracę na małym zespole.",
  },
];

export default function IntegracjeApi() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs items={[{ label: "Integracje API" }]} />

        {/* Hero, kompaktowy */}
        <section className="relative overflow-hidden pt-24 pb-12">
          <div className="blob blob-cyan absolute -top-32 -right-20 h-96 w-96" />
          <div className="container-wide max-w-3xl mx-auto text-center">
            <p className="section-label mb-5">Usługa</p>
            <h1 className="display-lg text-gray-900 dark:text-white mb-6">
              Integracje API
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Łączę systemy ze sprzedaży, operacji i raportowania tak, żeby dane
              trafiały tam, gdzie trzeba, bez ręcznego przepisywania. Spięcie
              dwóch systemów w jedną stronę zaczyna się od 1 500 zł, a co
              podnosi tę kwotę, rozpisuję niżej co do pozycji.
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
            ariaLabel="Sekcje usługi integracji API"
            tabs={[
              {
                label: "Ile to kosztuje",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                        Ile to kosztuje
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-8">
                        Integracja nie ma jednej ceny, bo spięcie dwóch systemów
                        przez otwarte API i spięcie czterech, z których jeden
                        oddaje dane plikiem, to inna robota. Zaznacz, co u
                        Ciebie występuje, a zobaczysz rząd wielkości od razu.
                      </p>
                      <ZakresWyceny wycena={WYCENA_INTEGRACJE} />
                    </div>
                  </div>
                ),
              },
              {
                label: "Co łączę",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        Co łączę
                      </h2>
                      <ul className="grid gap-4">
                        {useCases.map((item, i) => (
                          <li
                            key={i}
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
                        {faq.map((item, i) => (
                          <details
                            key={i}
                            className="group bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden"
                          >
                            <summary className="cursor-pointer px-6 py-5 flex items-center justify-between gap-4 text-gray-900 dark:text-white font-medium list-none">
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
                            <div className="px-6 pb-5 text-sm text-gray-500 dark:text-gray-400">
                              {item.answer}
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
                        formId="diagnosis_api"
                        heading="Sprawdźmy Twój stack integracji"
                        intro="Opisz krótko, jakie systemy chcesz połączyć i gdzie dziś pojawia się ręczne przepisywanie danych. W odpowiedzi dostaniesz wstępną propozycję architektury i informację, od czego zacząć."
                        submitLabel="Chcę diagnozę integracji"
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
            name: "Integracje API",
            description:
              "Spinam CRM, ERP, sklep i hurtownie tak, żeby dane przechodziły same. Spięcie dwóch systemów zaczyna się od 1 500 zł, a zakres wyliczysz na stronie bez wysyłania zapytania.",
            provider: { "@id": "https://fluxlab.pl/#organization" },
            areaServed: { "@type": "Country", name: "Polska" },
            serviceType: "Automatyzacja procesów biznesowych",
            url: "https://fluxlab.pl/integracje-api",
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
