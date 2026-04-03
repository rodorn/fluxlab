import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Jak połączyć CRM z innymi systemami w firmie | Fluxlab",
  description:
    "Jak połączyć CRM z formularzami, ERP, mailami i raportowaniem bez chaosu. Praktyczny model wdrożenia i najczęstsze błędy.",
  openGraph: {
    title: "Jak połączyć CRM z innymi systemami w firmie | Fluxlab",
    description:
      "Jak połączyć CRM z formularzami, ERP, mailami i raportowaniem bez chaosu. Praktyczny model wdrożenia i najczęstsze błędy.",
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
    canonical: "/strefa-wiedzy/jak-polaczyc-crm-z-innymi-systemami",
  },
};

export default function CrmIntegracjaArticle() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Strefa wiedzy", href: "/strefa-wiedzy" }, { label: "Jak połączyć CRM z innymi systemami" }]} />
        {/* Hero */}
        <section className="bg-gray-50 dark:bg-gray-900/50 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Jak połączyć CRM z innymi systemami
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Sam CRM nie rozwiązuje problemu chaosu, jeśli dalej działa obok
              reszty firmy. Dopiero połączenie CRM z formularzami, marketingiem,
              raportowaniem i innymi systemami sprawia, że dane zaczynają
              pracować, zamiast tylko zalegać w bazie.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-16">
            {/* Section 1 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Od czego zacząć
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Najpierw trzeba ustalić, jakie dane naprawdę mają przepływać. To
                jest etap, który firmy najczęściej pomijają. Zamiast projektować
                proces, od razu wybierają narzędzie. Efekt: dane lecą w złą
                stronę albo aktualizują się zbyt szeroko.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Na początek rozpisz:
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
                  jakie systemy biorą udział w procesie,
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
                  jakie dane przechodzą między nimi,
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
                  kto jest właścicielem danych źródłowych,
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
                  co ma się stać po zmianie konkretnego pola lub statusu.
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Najczęstszy model połączenia
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Najczęstszy scenariusz jest prosty: formularz lub kampania
                generuje leada, CRM tworzy rekord, system przypisuje go do
                osoby, a później informacje z CRM trafiają do raportów, narzędzi
                operacyjnych albo systemów fakturowych. Kluczem są tutaj dobrze zaprojektowane <Link href="/integracje-api" className="text-accent hover:underline">integracje API</Link>, które łączą te systemy w jeden spójny przepływ.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                W bardziej zaawansowanych procesach CRM staje się centrum
                operacyjnym: trzyma statusy, wyzwala działania i zasila inne
                narzędzia danymi.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Błędy, które psują integrację
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Pierwszy błąd to brak jednego źródła prawdy. Jeśli ten sam
                klient może być edytowany niezależnie w trzech miejscach, szybko
                pojawią się konflikty danych.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Drugi błąd to brak walidacji. Integracja bez sprawdzania dubli,
                pustych pól i niepoprawnych formatów wprowadza chaos szybciej,
                niż ręczna praca.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Trzeci błąd to automatyzowanie bałaganu. Jeśli pipeline i statusy
                w CRM są nieuporządkowane, integracja tylko ten bałagan
                rozprowadzi. Dlatego warto najpierw uporządkować sam proces — pomaga w tym dobrze wdrożona <Link href="/automatyzacja-crm" className="text-accent hover:underline">automatyzacja CRM</Link>.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Jak zrobić to dobrze
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Najpierw uporządkuj logikę CRM, potem podłączaj kolejne systemy.
                Zacznij od jednego przepływu o wysokiej wartości, przetestuj
                wyjątki i dopiero później rozbudowuj architekturę.
              </p>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/50 p-8 lg:p-12 text-center">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                CRM działa, ale nie jest spięty z resztą firmy?
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/automatyzacja-crm"
                  className="btn-primary inline-block"
                >
                  Automatyzacja CRM
                </Link>
                <Link
                  href="/integracje-api"
                  className="btn-secondary inline-block"
                >
                  Integracje API
                </Link>
              </div>
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
            headline: "Jak połączyć CRM z innymi systemami",
            description:
              "Jak połączyć CRM z formularzami, ERP, mailami i raportowaniem bez chaosu. Praktyczny model wdrożenia i najczęstsze błędy.",
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
