import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "Automatyzacja dla e-commerce, Shopify i Allegro | Fluxlab",
  description:
    "Synchronizacja stanów, fakturowanie, etykiety InPost i DPD, obsługa zwrotów. Łączymy Shopify, WooCommerce, PrestaShop, BaseLinker i Allegro w jeden proces.",
  openGraph: {
    title: "Automatyzacja dla e-commerce, Shopify i Allegro | Fluxlab",
    description:
      "Synchronizacja stanów, fakturowanie, etykiety InPost i DPD, obsługa zwrotów. Łączymy Shopify, WooCommerce, PrestaShop, BaseLinker i Allegro w jeden proces.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, Automatyzacja procesów dla e-commerce",
      },
    ],
  },
  alternates: {
    canonical: "/automatyzacja-dla-ecommerce",
  },
};

const useCases = [
  {
    title: "Stany magazynowe w każdym kanale",
    description:
      "Sprzedaż w sklepie albo na Allegro od razu zmniejsza stan we wszystkich kanałach. Koniec ze sprzedawaniem towaru, którego nie ma.",
  },
  {
    title: "Faktury bez przepisywania",
    description:
      "Opłacone zamówienie tworzy fakturę w Fakturowni, iFirmie lub InFakcie, z NIP-em sprawdzonym w GUS. Klient dostaje PDF, księgowa kopię.",
  },
  {
    title: "Etykiety InPost, DPD, Poczta Polska",
    description:
      "Po opłaceniu powstaje etykieta, numer listu trafia do zamówienia, a klient dostaje link do śledzenia.",
  },
  {
    title: "Zwroty i reklamacje",
    description:
      "Zgłoszenie z formularza tworzy etykietę zwrotną, informuje magazyn i po przyjęciu paczki wystawia korektę faktury.",
  },
  {
    title: "Raport marży z kanałów",
    description:
      "Sprzedaż, koszty reklam i wysyłki w jednym zestawieniu, aktualnym codziennie zamiast eksportu CSV raz w miesiącu.",
  },
];

const tools = [
  "BaseLinker",
  "Shopify",
  "WooCommerce",
  "PrestaShop",
  "Allegro",
  "n8n",
  "Zapier",
  "Make",
  "Pipedrive",
  "HubSpot",
];

const faq = [
  {
    question:
      "Mamy sklep na Shopify i sprzedajemy też na Allegro. Czy automatyzacja stanów wymaga BaseLinkera?",
    answer:
      "Niekoniecznie. Przy mniejszej liczbie produktów łączymy Shopify z Allegro bezpośrednio przez API. Wybór zależy od skali i liczby kanałów.",
  },
  {
    question: "Ile kosztuje automatyzacja typowego sklepu internetowego?",
    answer:
      "Jeden proces, np. fakturowanie, to kilka dni pracy i koszt w niskich tysiącach. Pełne spięcie sklepu z 5 do 6 systemami trwa zwykle od 2 do 6 tygodni. Dokładną wycenę dajemy po diagnozie.",
  },
  {
    question:
      "Czy automatyzację da się wdrożyć bez przerywania działania sklepu?",
    answer:
      "Tak. Najpierw testujemy na fragmencie ruchu, potem przełączamy. Większe zmiany robimy poza godzinami szczytu.",
  },
  {
    question:
      "Sprzedajemy głównie na Allegro. Czy to ma sens bez własnego sklepu?",
    answer:
      "Ma. Allegro ma własne API, więc fakturowanie, etykiety, komunikację z klientem i raport marży zautomatyzujemy także bez sklepu.",
  },
];

const relatedServices = [
  { label: "Integracje API", href: "/integracje-api" },
  { label: "Automatyzacja CRM", href: "/automatyzacja-leadow-crm" },
  { label: "Automatyzacja raportowania", href: "/automatyzacja-raportowania" },
];

export default function AutomatyzacjaDlaEcommerce() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs href="/automatyzacja-dla-ecommerce" items={[{ label: "Automatyzacja dla e-commerce" }]} />

        {/* Hero, kompaktowy */}
        <section className="relative overflow-hidden pt-24 pb-12">
          <div className="blob blob-accent absolute -top-32 -right-20 h-96 w-96" />
          <div className="container-wide max-w-3xl mx-auto">
            <p className="section-label mb-5">Branża</p>
            <h1 className="h1-strony mb-6">
              Automatyzacja dla e-commerce
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Magazyn, faktury, etykiety, Allegro, BaseLinker. Spinamy te
                  systemy tak, żeby zamówienie przeszło całą drogę bez
                  ręcznego przepisywania danych.
            </p>
            <div>
              <a href="#sekcje" className="btn-primary">Bezpłatna diagnoza</a>
            </div>
          </div>
        </section>

        {/* Treść w zakładkach */}
        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje strony automatyzacji dla e-commerce"
            tabs={[
              {
                label: "Co automatyzujemy",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="h2-sekcji mb-4">
                        Co automatyzujemy w e-commerce
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 mb-10">
                        Sklep traci też pieniądze po cichu: na dopłatach
                        kurierskich (sprawdza to{" "}
                        <Link
                          href="/audyt-kurierski"
                          className="text-accent hover:underline"
                        >
                          audyt faktur kurierskich
                        </Link>
                        ) i na braku danych firmy na stronie, przez który klient
                        B2B wstrzymuje przelew (pokaże to{" "}
                        <Link
                          href="/dane-sprzedawcy"
                          className="text-accent hover:underline"
                        >
                          sprawdzenie danych sprzedawcy
                        </Link>
                        ). Ile zostaje na sztuce po prowizji i zwrocie, liczy{" "}
                        <Link
                          href="/audyt-marz"
                          className="text-accent hover:underline"
                        >
                          audyt marży
                        </Link>
                        , a braki w cenie z 30 dni, zasadach zwrotu i
                        odpowiedziach bota pokażą{" "}
                        <Link
                          href="/rejestr-cen"
                          className="text-accent hover:underline"
                        >
                          kontrola cen
                        </Link>
                        ,{" "}
                        <Link
                          href="/panel-zwrotow"
                          className="text-accent hover:underline"
                        >
                          kontrola zwrotów
                        </Link>{" "}
                        i{" "}
                        <Link
                          href="/audyt-chatbota"
                          className="text-accent hover:underline"
                        >
                          audyt chatbota
                        </Link>
                        .
                      </p>

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
                        Narzędzia, z którymi pracujemy w e-commerce
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 mb-8">
                        Dobieramy narzędzie do skali sklepu i tego, co już
                        działa. Przy rosnącej liczbie zamówień przenosimy
                        scenariusze na n8n, żeby koszt nie rósł z każdym
                        zamówieniem.
                      </p>

                      <ul className="flex flex-wrap gap-2">
                        {tools.map((tool) => (
                          <li
                            key={tool}
                            className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-full px-4 py-1.5"
                          >
                            {tool}
                          </li>
                        ))}
                      </ul>

                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
                        Porównanie narzędzi:{" "}
                        <Link
                          href="/strefa-wiedzy/zapier-make-n8n-porownanie"
                          className="text-accent hover:underline"
                        >
                          Zapier, Make czy n8n
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                label: "Dla kogo",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="h2-sekcji mb-4">
                        Dla kogo
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400">
                        Dla sklepów od kilkudziesięciu zamówień miesięcznie,
                        zwłaszcza sprzedających w kilku kanałach naraz. W B2B
                        łączymy automatyzację sklepu z{" "}
                        <Link
                          href="/automatyzacja-leadow-crm"
                          className="text-accent hover:underline"
                        >
                          automatyzacją leadów
                        </Link>{" "}
                        i procesem ofertowania.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                label: "FAQ",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
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
                label: "Diagnoza",
                content: (
                  <CTA
                    naglowek="Twój sklep rośnie, a operacja zaczyna gasić pożary?"
                    opis="Opisz narzędzia i procesy. Wskażemy, gdzie dane przepisuje się ręcznie i czy automatyzacja się opłaca."
                  />
                ),
              },
              {
                label: "Powiązane",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Powiązane usługi
                      </h2>
                      <ul className="space-y-3">
                        {relatedServices.map((item) => (
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
            name: "Automatyzacja dla e-commerce",
            description:
              "Synchronizacja stanów, fakturowanie, etykiety InPost i DPD, obsługa zwrotów. Łączymy Shopify, WooCommerce, PrestaShop, BaseLinker i Allegro w jeden proces.",
            provider: { "@id": "https://fluxlab.pl/#organization" },
            areaServed: { "@type": "Country", name: "PL" },
            serviceType: "Automatyzacja procesów biznesowych dla e-commerce",
            url: "https://fluxlab.pl/automatyzacja-dla-ecommerce",
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
