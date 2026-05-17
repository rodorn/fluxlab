import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";
import LandingForm from "@/components/LandingForm";

export const metadata: Metadata = {
  title: "Automatyzacja leadów i CRM dla firm B2B | Fluxlab",
  description:
    "Automatyzuję obsługę leadów, CRM, follow-upy i raportowanie dla firm B2B. Leady trafiają do CRM, dostają handlowca, zadanie i raport bez ręcznej pracy.",
  openGraph: {
    title: "Automatyzacja leadów i CRM dla firm B2B | Fluxlab",
    description:
      "Automatyzuję obsługę leadów, CRM, follow-upy i raportowanie dla firm B2B. Leady trafiają do CRM, dostają handlowca, zadanie i raport bez ręcznej pracy.",
    locale: "pl_PL",
    type: "website",
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
    canonical: "/automatyzacja-leadow-crm",
  },
};

const offer = [
  "Leady z formularzy, reklam i maili lądują w jednym CRM.",
  "Każdy lead dostaje handlowca, zadanie i follow-up automatycznie.",
  "Spójne dane: osoba, firma, deal, źródło, etap.",
  "Raport pokazuje czas reakcji, status i wąskie gardła.",
];

const steps = [
  {
    title: "Diagnoza",
    description:
      "Opisujesz proces. Dostajesz mapę przepływu, wąskie gardła i szacowany ROI. Bezpłatnie.",
  },
  {
    title: "Wdrożenie",
    description:
      "Buduję automatyzację, testuję na realnych danych, dopracowuję przypadki brzegowe.",
  },
  {
    title: "Dokumentacja",
    description:
      "Dostajesz instrukcję, opis działania i gotowość do dalszego rozwoju procesu.",
  },
];

const pricing = [
  { name: "Diagnoza procesu", price: "0 zł" },
  { name: "Automatyzacja leadów", price: "od 1 500 zł" },
  { name: "CRM + raportowanie", price: "od 2 500 zł" },
  { name: "Integracje API", price: "wycena indywidualna" },
];

const faq = [
  {
    question: "Czy muszę mieć już CRM?",
    answer:
      "Nie. Możemy zacząć od arkuszy lub maili. Jeśli CRM jest potrzebny, dobiorę najprostsze rozwiązanie do skali firmy.",
  },
  {
    question: "Czy automatyzacja zastąpi handlowca?",
    answer:
      "Nie. Usuwa przepisywanie danych i pilnowanie follow-upów. Handlowiec ma sprzedawać, nie klikać.",
  },
  {
    question: "Co jeśli moje dane to bałagan?",
    answer:
      "Najpierw porządkujemy minimum: pola, statusy, źródła i reguły etapów. Automatyzowanie bałaganu to szybszy bałagan.",
  },
];

export default function AutomatyzacjaLeadowCRM() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Automatyzacja leadów i CRM",
    serviceType: "Automatyzacja procesów sprzedażowych",
    provider: { "@id": "https://fluxlab.pl/#organization" },
    areaServed: { "@type": "Country", name: "Poland" },
    description:
      "Wdrożenie automatyzacji obsługi leadów: zbieranie z formularzy, reklam, maili i landing page'y, walidacja, tworzenie rekordów w CRM, routing do handlowca, zadania, follow-upy i raportowanie.",
    offers: {
      "@type": "Offer",
      priceCurrency: "PLN",
      price: "1500",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "PLN",
        minPrice: "1500",
      },
    },
    url: "https://fluxlab.pl/automatyzacja-leadow-crm",
  };

  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Automatyzacja leadów i CRM" }]} />

        {/* Hero */}
        <section className="relative overflow-hidden py-24 lg:py-32">
          <div className="blob blob-accent w-[40rem] h-[40rem] -top-40 -right-40 animate-drift-slow" />
          <div className="container-wide relative">
            <div className="max-w-3xl">
              <span className="section-label">Automatyzacja leadów i CRM</span>
              <h1 className="display-lg text-gray-900 dark:text-white mt-4">
                Przestań tracić leady przez ręczną robotę.
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Leady same trafiają do CRM, dostają handlowca, zadanie i raport.
                Twój zespół sprzedaje, zamiast przepisywać dane.
              </p>
              <div className="mt-10">
                <TrackedCTA
                  href="#diagnoza"
                  location="lp_leadow_hero"
                  label="diagnoza"
                  eventName="cta_click_landing_audit"
                  className="btn-primary px-8 py-3.5 text-base"
                >
                  Zamów bezpłatną diagnozę
                </TrackedCTA>
              </div>
            </div>
          </div>
        </section>

        {/* Co oferuję */}
        <section className="py-20 lg:py-28 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-4xl">
              <span className="section-label">Co dostajesz</span>
              <h2 className="display-md text-gray-900 dark:text-white mt-4 mb-12">
                Proces, który pilnuje się sam.
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {offer.map((item) => (
                  <div
                    key={item}
                    className="card-lift flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl px-6 py-5"
                  >
                    <svg
                      className="flex-shrink-0 mt-0.5 text-accent"
                      width="22"
                      height="22"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M4 10l4 4 8-8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Jak to działa + cennik */}
        <section className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-4xl">
              <span className="section-label">Jak to działa</span>
              <h2 className="display-md text-gray-900 dark:text-white mt-4 mb-12">
                Trzy kroki do wdrożenia.
              </h2>
              <div className="grid md:grid-cols-3 gap-5">
                {steps.map((step, i) => (
                  <div
                    key={step.title}
                    className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6"
                  >
                    <span className="text-3xl font-bold text-accent">
                      {i + 1}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {pricing.map((tier) => (
                  <div
                    key={tier.name}
                    className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl px-5 py-5"
                  >
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {tier.name}
                    </p>
                    <p className="text-xl font-bold text-accent">
                      {tier.price}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
                Orientacyjne zakresy. Dokładną wycenę dostajesz po bezpłatnej
                diagnozie.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 lg:py-28">
          <div className="container-wide">
            <div className="max-w-3xl">
              <span className="section-label">FAQ</span>
              <h2 className="display-md text-gray-900 dark:text-white mt-4 mb-10">
                Najczęstsze pytania.
              </h2>
              <div className="space-y-4">
                {faq.map((item) => (
                  <details
                    key={item.question}
                    className="group bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden"
                  >
                    <summary className="cursor-pointer px-6 py-5 flex items-center justify-between gap-4 list-none">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {item.question}
                      </span>
                      <svg
                        className="flex-shrink-0 transition-transform group-open:rotate-180"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M5 7l5 5 5-5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </summary>
                    <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Form — diagnoza */}
        <section
          id="diagnoza"
          className="scroll-mt-20 py-20 lg:py-28 bg-accent/10 border-t border-gray-100 dark:border-gray-800"
        >
          <div className="container-wide">
            <LandingForm
              formId="diagnosis_lp_leadow"
              heading="Sprawdźmy, gdzie tracisz leady"
              intro="Opisz krótko, skąd wpadają leady i co robicie ręcznie. Dostaniesz informację, czy automatyzacja ma sens i jaki pierwszy krok da największy efekt."
              submitLabel="Chcę mapę pierwszej automatyzacji"
            />
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
