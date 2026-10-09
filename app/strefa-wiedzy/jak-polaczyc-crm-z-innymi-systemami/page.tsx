import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";
import Tabs from "@/components/Tabs";

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
        alt: "Fluxlab, Automatyzacja leadów, CRM i raportowania dla firm B2B",
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
      <main className="pt-16 prose-justify">
        <Breadcrumbs href="/strefa-wiedzy/jak-polaczyc-crm-z-innymi-systemami" kolumna="srodek"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Jak połączyć CRM z innymi systemami" },
          ]}
        />
        {/* Kompaktowy nagłówek */}
        <section className="pt-24 pb-10">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">
              Jak połączyć CRM z innymi systemami
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed !text-left">
              CRM działający obok reszty firmy nie usuwa chaosu. Dopiero
              połączony z formularzami i raportami zaczyna pracować.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <Tabs
            ariaLabel="Rozdziały artykułu o łączeniu CRM z innymi systemami"
            tabs={[
              {
                label: "Od czego zacząć",
                content: (
                  <div className="py-10 lg:py-12 max-w-3xl mx-auto">
                    <h2 className="mb-6 h2-sekcji">
                      Od czego zacząć
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      Najpierw ustal, jakie dane mają przepływać, dopiero potem
                      wybieraj narzędzie. Rozpisz:
                    </p>
                    <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                      {[
                        "jakie systemy biorą udział w procesie,",
                        "jakie dane przechodzą między nimi,",
                        "kto jest właścicielem danych źródłowych,",
                        "co ma się stać po zmianie pola lub statusu.",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
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
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
              },
              {
                label: "Model połączenia",
                content: (
                  <div className="py-10 lg:py-12 max-w-3xl mx-auto">
                    <h2 className="mb-6 h2-sekcji">
                      Najczęstszy model połączenia
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      Formularz tworzy leada w CRM, system przypisuje go do
                      osoby, a dane trafiają dalej do raportów i faktur. Łączą
                      to{" "}
                      <Link
                        href="/integracje-api"
                        className="text-accent hover:underline"
                      >
                        integracje API
                      </Link>
                      .
                    </p>
                  </div>
                ),
              },
              {
                label: "Błędy integracji",
                content: (
                  <div className="py-10 lg:py-12 max-w-3xl mx-auto">
                    <h2 className="mb-6 h2-sekcji">
                      Błędy, które psują integrację
                    </h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      <li>
                        Brak jednego źródła prawdy: ten sam klient edytowany w
                        trzech miejscach.
                      </li>
                      <li>
                        Brak walidacji: duble, puste pola i złe formaty.
                      </li>
                      <li>
                        Automatyzowanie bałaganu. Najpierw uporządkuj proces,
                        pomaga w tym{" "}
                        <Link
                          href="/automatyzacja-leadow-crm"
                          className="text-accent hover:underline"
                        >
                          automatyzacja CRM
                        </Link>
                        .
                      </li>
                    </ul>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Zacznij od jednego przepływu o wysokiej wartości,
                      przetestuj wyjątki, potem rozbudowuj.
                    </p>

                  </div>
                ),
              },
            ]}
          />

          {/* Prev / Next */}
          <div className="max-w-3xl mx-auto mt-16">
            <PrevNextArticle currentHref="/strefa-wiedzy/jak-polaczyc-crm-z-innymi-systemami" />
          </div>
        </div>
        <CTA naglowek="CRM działa, ale nie jest spięty z resztą firmy?" />
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
