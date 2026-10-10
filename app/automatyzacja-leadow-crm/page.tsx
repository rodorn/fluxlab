import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";
import LandingForm from "@/components/LandingForm";
import Tabs from "@/components/Tabs";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products";
import DrogaLeada from "@/components/DrogaLeada";

export const metadata: Metadata = {
  title: "Automatyzacja CRM z AI: lead w minutę | Fluxlab",
  description:
    "Automatyzacja CRM z AI: lead w minutę trafia do Pipedrive albo HubSpot, AI ocenia zapytanie, a handlowiec dostaje zadanie. Bez przepisywania.",
  openGraph: {
    title: "Automatyzacja CRM z AI: lead w minutę | Fluxlab",
    description:
      "Automatyzacja CRM z AI: lead w minutę trafia do Pipedrive albo HubSpot, AI ocenia zapytanie, a handlowiec dostaje zadanie. Bez przepisywania.",
    locale: "pl_PL",
    type: "website",
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
    canonical: "/automatyzacja-leadow-crm",
  },
};

const offer = [
  "Leady z formularzy, reklam i maili trafiają do jednego CRM.",
  "Każdy lead dostaje handlowca, zadanie i follow-up automatycznie.",
  "Spójne dane: osoba, firma, deal, źródło, etap.",
  "Raport pokazuje czas reakcji, status i wąskie gardła.",
];

const steps = [
  {
    title: "Diagnoza",
    description:
      "Opisujesz proces, dostajesz mapę i wąskie gardła. Bezpłatnie.",
  },
  {
    title: "Wdrożenie",
    description: "Budujemy i testujemy na realnych danych.",
  },
  {
    title: "Dokumentacja",
    description: "Dostajesz instrukcję i opis działania.",
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
    question: "Czy musimy mieć już CRM?",
    answer: "Nie. Możemy zacząć od arkuszy lub maili i dobrać najprostszy CRM.",
  },
  {
    question: "Co jeśli nasze dane to bałagan?",
    answer: "Najpierw porządkujemy minimum: pola, statusy i źródła.",
  },
  {
    question: "Z jakimi systemami CRM to działa?",
    answer:
      "Najczęściej z Pipedrive, ale z każdym popularnym CRM-em, który ma API.",
  },
  {
    question: "Ile to kosztuje?",
    answer:
      "Jeden etap od 1 500 zł, cała ścieżka z raportem od 2 500 zł. Diagnoza jest bezpłatna.",
  },
];

const POWIAZANE_Z_CRM = [
  "/integracja-crm-z-erp",
  "/automatyzacja-raportowania",
  "/wdrozenie-n8n-cena",
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
        <Breadcrumbs href="/automatyzacja-leadow-crm" items={[{ label: "Automatyzacja leadów i CRM" }]} />

        {/* Hero, kompaktowy */}
        <section className="relative overflow-hidden pt-24 pb-12">
          <div className="blob blob-accent w-[40rem] h-[40rem] -top-40 -right-40 animate-drift-slow" />
          <div className="container-wide relative">
            <div className="max-w-3xl">
              <span className="section-label">Usługa</span>
              <h1 className="h1-strony mt-4">
                Automatyzacja CRM z AI bez pracy ręcznej
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Leady same trafiają do CRM i{" "}
                <Link href="/case-study" className="text-accent hover:underline">
                  dostają handlowca, zadanie i raport
                </Link>
                .
              </p>
              <div className="mt-10">
                <TrackedCTA
                  href="#sekcje"
                  location="lp_leadow_hero"
                  label="Bezpłatna diagnoza"
                  eventName="cta_click_landing_audit"
                  className="btn-primary"
                >
                  Bezpłatna diagnoza
                </TrackedCTA>
              </div>
            </div>
          </div>
        </section>

        {/* Wybor etapu stoi przed katalogiem, bo to jedyna rzecz na tej
            stronie, ktora daje odpowiedz od razu i nie wymaga wpisywania
            czegokolwiek. Katalog produktow czeka nizej. */}
        <section className="container-wide pb-16">
          <DrogaLeada />
        </section>

        <section className="container-wide pb-16">
          <h2 className="h2-sekcji">Zobacz, jak to wdrażamy</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.filter((p) => POWIAZANE_Z_CRM.includes(p.href)).map(
              (p) => (
                <ProductCard key={p.name} p={p} />
              ),
            )}
          </div>
          <p className="mt-6">
            <Link href="/produkty" className="text-accent hover:underline">
              Zobacz cały cennik
            </Link>
          </p>
        </section>

        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje oferty automatyzacji leadów i CRM"
            tabs={[
              {
                label: "Co dostajesz",
                content: (
                  <section className="py-10 lg:py-12">
                    <div className="max-w-4xl">
                      <h2 className="h2-sekcji mt-4 mb-12">
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
                      <p className="mt-8 text-gray-600 dark:text-gray-400 leading-relaxed">
                        Najwięcej daje{" "}
                        <Link
                          href="/czas-reakcji-na-leada"
                          className="text-accent hover:underline"
                        >
                          szybka reakcja na leada
                        </Link>{" "}
                        i{" "}
                        <Link
                          href="/automatyzacja-follow-up"
                          className="text-accent hover:underline"
                        >
                          automatyczne follow-upy
                        </Link>
                        .
                      </p>
                    </div>
                  </section>
                ),
              },
              {
                label: "Jak to działa",
                content: (
                  <section className="py-10 lg:py-12">
                    <div className="max-w-4xl">
                      <h2 className="h2-sekcji mt-4 mb-12">
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
                        <Link
                          href="/strefa-wiedzy/automatyzacja-crm-od-czego-zaczac"
                          className="text-accent hover:underline"
                        >
                          Automatyzacja CRM: od czego zacząć
                        </Link>
                        .
                      </p>
                    </div>
                  </section>
                ),
              },
              {
                label: "FAQ",
                content: (
                  <section className="py-10 lg:py-12">
                    <div className="max-w-3xl">
                      <h2 className="h2-sekcji mt-4 mb-10">
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
                      formId="diagnosis_lp_leadow"
                      heading="Sprawdźmy, gdzie tracisz leady"
                      intro="Napisz, skąd przychodzą leady i co robicie ręcznie. Odpowiemy, od czego zacząć."
                      submitLabel="Chcemy mapę pierwszej automatyzacji"
                    />
                  </section>
                ),
              },
            ]}
          />
        </div>
        <CTA />
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
