import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Jak uporządkować proces sprzedaży w CRM | Fluxlab",
  description:
    "Jak uporządkować proces sprzedaży w CRM: etapy, kryteria przejścia, pola obowiązkowe, follow-up i raportowanie.",
  openGraph: {
    title: "Jak uporządkować proces sprzedaży w CRM | Fluxlab",
    description:
      "Jak uporządkować proces sprzedaży w CRM: etapy, kryteria przejścia, pola obowiązkowe, follow-up i raportowanie.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab — Automatyzacja procesów biznesowych i CRM dla firm B2B",
      },
    ],
  },
  alternates: {
    canonical: "/strefa-wiedzy/jak-uporzadkowac-proces-sprzedazy-w-crm",
  },
};

export default function JakUporzadkowacProcesSprzedazyArticle() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Strefa wiedzy", href: "/strefa-wiedzy" }, { label: "Jak uporządkować proces sprzedaży w CRM" }]} />
        {/* Hero */}
        <section className="bg-gray-50 dark:bg-gray-900/50 py-16 lg:py-24">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Jak uporządkować proces sprzedaży w CRM
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Większość problemów z CRM nie wynika z narzędzia, tylko z tego, że
              sam proces sprzedaży nie został opisany i uporządkowany. Jeśli
              etapy są niejasne, statusy uznaniowe, a dane niekompletne, to CRM
              nie pomoże — tylko pokaże bałagan w ładniejszej formie.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-24">
          <div className="container-wide max-w-3xl mx-auto space-y-16">
            {/* Section 1 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Zacznij od etapów pipeline
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Pipeline powinien odzwierciedlać realny proces, a nie życzeniowy
                model. Każdy etap musi mieć jasne znaczenie. Handlowiec
                powinien wiedzieć, co oznacza przejście dalej i kiedy sprawa
                realnie zmienia status.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Zbyt wiele etapów komplikuje pracę. Zbyt mało nie daje kontroli.
                W praktyce lepiej mieć mniej etapów, ale z wyraźnymi
                kryteriami.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Ustal kryteria przejścia
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Najważniejsze pytanie brzmi: po czym poznajesz, że lead przeszedł
                z etapu A do B? Jeśli nie ma obiektywnej odpowiedzi, proces jest
                uznaniowy.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Dla każdego etapu określ:
              </p>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-accent shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  warunek wejścia,
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-accent shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  obowiązkowe dane,
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-accent shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  kolejny ruch,
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-accent shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  odpowiedzialną osobę.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Wymuś jakość danych
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Bez pól obowiązkowych, walidacji i prostych reguł CRM szybko
                zamienia się w luźny notatnik. Dane muszą być kompletne, bo
                tylko wtedy pipeline, follow-up i raportowanie mają sens.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Połącz proces z automatyzacją
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Dopiero uporządkowany proces warto automatyzować. Wtedy CRM może
                sam tworzyć zadania, przypominać o follow-upie, pilnować braków
                i zasilać raporty.
              </p>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-accent/10 p-8 lg:p-12 text-center">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Chcesz uporządkować proces sprzedaży, zanim zaczniesz go
                automatyzować?
              </p>
              <Link
                href="/automatyzacja-crm"
                className="btn-primary mt-6 inline-block"
              >
                Zobacz usługę Automatyzacja CRM
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Jak uporządkować proces sprzedaży w CRM",
            description:
              "Jak uporządkować proces sprzedaży w CRM: etapy, kryteria przejścia, pola obowiązkowe, follow-up i raportowanie.",
            datePublished: "2026-03-30",
            author: {
              "@type": "Organization",
              name: "Fluxlab",
              url: "https://fluxlab.pl",
            },
            publisher: {
              "@type": "Organization",
              name: "Fluxlab",
              url: "https://fluxlab.pl",
            },
          }),
        }}
      />
    </>
  );
}
