import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import Tabs from "@/components/Tabs";
import CzasRaportowAgencji from "@/components/CzasRaportowAgencji";

export const metadata: Metadata = {
  title: "Automatyzacja dla agencji marketingowych | Fluxlab",
  description:
    "Raporty z Google Ads, Meta Ads i GA4, onboarding klienta, śledzenie godzin i fakturowanie retainerów. Spinamy HubSpot, Pipedrive, ClickUp, Asanę i Slacka.",
  openGraph: {
    title: "Automatyzacja dla agencji marketingowych | Fluxlab",
    description:
      "Raporty z Google Ads, Meta Ads i GA4, onboarding klienta, śledzenie godzin i fakturowanie retainerów. Spinamy HubSpot, Pipedrive, ClickUp, Asanę i Slacka.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, Automatyzacja procesów dla agencji marketingowych",
      },
    ],
  },
  alternates: {
    canonical: "/automatyzacja-dla-agencji-marketingowych",
  },
};

const useCases = [
  {
    title: "Raporty z Google Ads, Meta Ads i GA4",
    description:
      "Raport dla każdego klienta tworzy się sam co tydzień lub co miesiąc, jako PDF, dashboard albo wiadomość na Slacku. Account manager tylko dopisuje komentarz.",
  },
  {
    title: "Onboarding nowego klienta",
    description:
      "Podpisana umowa zakłada klienta w CRM, folder w Drive, projekt w ClickUp lub Asanie i kanał na Slacku. Pół dnia pracy zamienia się w 5 minut.",
  },
  {
    title: "Godziny i rentowność klienta",
    description:
      "Czas z time trackera zestawiamy z umową klienta. Przekroczenie budżetu retainera widzisz od razu, a nie przy fakturowaniu.",
  },
  {
    title: "Fakturowanie retainerów",
    description:
      "Pierwszego dnia miesiąca faktury za retainery i nadgodziny wystawiają się same w Fakturowni lub iFirmie.",
  },
];

const tools = [
  {
    name: "HubSpot i Pipedrive",
    description:
      "CRM do leadów i obsługi klientów. Zostaje ten, który już macie.",
  },
  {
    name: "ClickUp i Asana",
    description: "Szablony projektów, statusy i podsumowania dla klienta.",
  },
  {
    name: "n8n, Zapier, Make i Looker Studio",
    description:
      "Warstwa spinająca systemy i dashboardy raportowe dla klientów.",
  },
];

const faq = [
  {
    question:
      "Pracujemy w HubSpot. Czy automatyzacja onboardingu wymaga zmiany CRM?",
    answer:
      "Nie. To, czego HubSpot nie umie sam, np. kanał na Slacku czy projekt w ClickUp, dokładamy przez n8n lub Zapiera.",
  },
  {
    question:
      "Mamy 30 klientów na retainerach. Czy raporty da się zautomatyzować dla wszystkich naraz?",
    answer:
      "Tak. Budujemy jeden szablon i podstawiamy dane każdego klienta. Dodanie kolejnego klienta to wpis w arkuszu.",
  },
  {
    question: "Ile to kosztuje przy agencji do 20 osób?",
    answer:
      "Pojedynczy proces to 1-2 tygodnie pracy, pełne wdrożenie 1-3 miesiące w etapach. Orientacyjną wycenę podajemy po rozmowie.",
  },
  {
    question: "Co z bezpieczeństwem dostępów do kont reklamowych klientów?",
    answer:
      "Nie przechowujemy haseł. Integracje działają przez OAuth, a dostęp można cofnąć w każdej chwili.",
  },
];

const related = [
  { label: "Automatyzacja raportowania", href: "/automatyzacja-raportowania" },
  { label: "Automatyzacja leadów i CRM", href: "/automatyzacja-leadow-crm" },
  {
    label: "Jak policzyć ROI z automatyzacji",
    href: "/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji",
  },
];

export default function AutomatyzacjaDlaAgencjiMarketingowych() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs href="/automatyzacja-dla-agencji-marketingowych"
          items={[{ label: "Automatyzacja dla agencji marketingowych" }]}
        />

        {/* Hero, kompaktowy */}
        <section className="relative overflow-hidden pt-24 pb-12">
          <div className="blob blob-accent absolute -top-32 -right-20 h-96 w-96" />
          <div className="container-wide max-w-3xl mx-auto">
            <p className="section-label mb-5">Branża</p>
            <h1 className="h1-strony mb-6">
              Automatyzacja dla agencji marketingowych
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Raporty, onboarding i faktury robią się same. Zespół zajmuje
                  się klientem, a nie składaniem slajdów.
            </p>
            <div>
              <a href="#sekcje" className="btn-primary">Bezpłatna diagnoza</a>
            </div>
          </div>
        </section>

        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje oferty dla agencji marketingowych"
            tabs={[
              {
                label: "Co automatyzujemy",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="h2-sekcji mb-4">
                        Co automatyzujemy w agencji
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 mb-10">
                        Powtarzalną pracę przy każdym kliencie przenosimy na
                        maszynę. Ludziom zostaje strategia i kontakt z klientem.
                      </p>

                      <CzasRaportowAgencji />

                      <div className="space-y-6">
                        {useCases.map((useCase) => (
                          <div
                            key={useCase.title}
                            className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-5"
                          >
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {useCase.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {useCase.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Narzędzia",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="h2-sekcji mb-4">
                        Narzędzia, które spinamy
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 mb-10">
                        Łączymy to, co już macie. Nie sprzedajemy nowego
                        oprogramowania.
                      </p>

                      <div className="space-y-6">
                        {tools.map((tool) => (
                          <div
                            key={tool.name}
                            className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-5"
                          >
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {tool.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {tool.description}
                            </p>
                          </div>
                        ))}
                      </div>

                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
                        Porównanie platform:{" "}
                        <Link
                          href="/strefa-wiedzy/zapier-make-n8n-porownanie"
                          className="text-accent hover:underline"
                        >
                          Zapier, Make i n8n
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                label: "Dla kogo i FAQ",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="h2-sekcji mb-4">
                        Dla kogo
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 mb-12">
                        Dla agencji performance, SEO, social media i 360° z
                        kilkunastoma aktywnymi klientami. Tam ręczne raporty i
                        fakturowanie zjadają najwięcej czasu.
                      </p>

                      <h2 className="h2-sekcji mb-8">
                        Najczęściej zadawane pytania
                      </h2>
                      <div className="space-y-4">
                        {faq.map((item) => (
                          <details
                            key={item.question}
                            className="group bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl"
                          >
                            <summary className="flex items-center justify-between cursor-pointer p-6 text-gray-900 dark:text-white font-medium">
                              {item.question}
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
                            <div className="px-6 pb-6 text-sm text-gray-500 dark:text-gray-400">
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
                label: "Kontakt",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <CTA
                        naglowek="Zespół spędza więcej czasu na raportach niż na klientach?"
                        opis="Opisz Wasz proces, a wskażemy, co warto zautomatyzować."
                      />

                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Zobacz też
                      </h2>
                      <ul className="space-y-3">
                        {related.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
                            >
                              <svg
                                className="shrink-0 text-accent"
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  d="M2.5 7l3 3 6-6"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
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
            name: "Automatyzacja dla agencji marketingowych",
            description:
              "Raporty z Google Ads, Meta Ads i GA4, onboarding klienta, śledzenie godzin i fakturowanie retainerów. Spinamy HubSpot, Pipedrive, ClickUp, Asanę i Slacka.",
            provider: { "@id": "https://fluxlab.pl/#organization" },
            areaServed: { "@type": "Country", name: "PL" },
            serviceType:
              "Automatyzacja procesów biznesowych dla agencji marketingowych",
            url: "https://fluxlab.pl/automatyzacja-dla-agencji-marketingowych",
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
