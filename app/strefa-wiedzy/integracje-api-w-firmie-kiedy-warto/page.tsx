import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Tabs from "@/components/Tabs";
import PrevNextArticle from "@/components/PrevNextArticle";

export const metadata: Metadata = {
  title: "Integracje API w firmie, kiedy warto | Fluxlab",
  description:
    "Kiedy integracje API mają sens w firmie, jakie problemy rozwiązują i kiedy lepiej wybrać prostsze podejście. Przykłady, błędy i praktyczne scenariusze.",
  openGraph: {
    title:
      "Integracje API w firmie, kiedy warto, a kiedy to przesada | Fluxlab",
    description:
      "Kiedy integracje API mają sens w firmie, jakie problemy rozwiązują i kiedy lepiej wybrać prostsze podejście. Przykłady, błędy i praktyczne scenariusze.",
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
    canonical: "/strefa-wiedzy/integracje-api-w-firmie-kiedy-warto",
  },
};

const faq = [
  {
    q: "Czy integracje API są tylko dla dużych firm?",
    a: "Nie. Mniejsze firmy często szybciej odczuwają korzyść.",
  },
  {
    q: "Czy można połączyć CRM z innymi systemami bez pełnego developmentu?",
    a: "Często tak, zależy to od narzędzi i zakresu procesu.",
  },
  {
    q: "Co jest ważniejsze: narzędzie czy logika procesu?",
    a: "Logika procesu. Źle przemyślana integracja będzie złym wdrożeniem niezależnie od technologii.",
  },
  {
    q: "Jaki pierwszy scenariusz integracji zwykle daje najlepszy efekt?",
    a: "Najczęściej leady, CRM i raportowanie.",
  },
];

export default function IntegracjeApiArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs kolumna="waska"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Integracje API w firmie, kiedy warto?" },
          ]}
        />

        <section className="pt-16 pb-6">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Integracje API w firmie, kiedy warto?
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Chodzi o jedno: czy dane między systemami przepływają same, czy
              przenoszą je ludzie. Gdy firma używa kilku narzędzi, które żyją
              osobno, integracja staje się elementem sprawnej operacji.
            </p>
          </div>
        </section>

        <div className="container-wide pb-8">
          <Tabs
            ariaLabel="Rozdziały artykułu"
            tabs={[
              {
                label: "Kiedy warto",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Kiedy integracje API mają sens
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Dzięki{" "}
                        <Link
                          href="/integracje-api"
                          className="text-accent hover:underline"
                        >
                          integracjom API
                        </Link>{" "}
                        CRM, formularze, ERP i raporty wymieniają dane bez
                        ręcznego kopiowania. Warto, gdy:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                        <li>
                          kilka systemów powinno działać jak jeden proces, a
                          ludzie sklejają go ręcznie,
                        </li>
                        <li>
                          ręczne przenoszenie danych powoduje błędy, duble i
                          opóźnienia,
                        </li>
                        <li>
                          liczy się aktualność: lead od razu w CRM, raport na
                          bieżących danych,
                        </li>
                        <li>arkusz przestaje wystarczać przy rosnącej skali.</li>
                      </ul>
                    </div>
                  </div>
                ),
              },
              {
                label: "Kiedy to przesada",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Kiedy API nie jest najlepszym wyborem
                      </h2>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                        <li>
                          Proces jest rzadki: raz w miesiącu przez 5 minut.
                        </li>
                        <li>
                          Proces nie jest uporządkowany. Bez źródła prawdy i
                          właściciela integracja tylko szybciej przeniesie chaos.
                        </li>
                        <li>Wystarczy prosty workflow no-code.</li>
                      </ul>
                    </div>
                  </div>
                ),
              },
              {
                label: "Scenariusze",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Najczęstsze scenariusze
                      </h2>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                        <li>
                          Formularz i CRM: lead trafia do CRM ze źródłem,
                          handlowcem i zadaniem follow-up. To klasyczna{" "}
                          <Link
                            href="/automatyzacja-leadow-crm"
                            className="text-accent hover:underline"
                          >
                            automatyzacja CRM
                          </Link>
                          .
                        </li>
                        <li>
                          CRM i ERP: dane klienta i status zamówienia są
                          zsynchronizowane.
                        </li>
                        <li>
                          CRM i raportowanie: dashboardy zasilane bez ręcznej
                          składanki.
                        </li>
                        <li>
                          Zgłoszenia: trafiają do właściwego zespołu i
                          uruchamiają kolejne akcje.
                        </li>
                      </ul>
                    </div>
                  </div>
                ),
              },
              {
                label: "Błędy",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Najczęstsze błędy
                      </h2>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                        <li>
                          Brak jednego źródła prawdy: ten sam rekord edytowany w
                          kilku miejscach.
                        </li>
                        <li>
                          Brak walidacji: integracja szybciej rozprowadza błędy
                          i duplikaty.
                        </li>
                        <li>
                          Spinanie wszystkiego naraz. Lepiej zacząć od jednego
                          krytycznego przepływu.
                        </li>
                        <li>
                          Technika bez procesu: integracja działa, ale nie
                          rozwiązuje problemu biznesowego.
                        </li>
                      </ul>
                    </div>
                  </div>
                ),
              },
              {
                label: "FAQ",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Najczęściej zadawane pytania
                      </h2>
                      <div className="space-y-4">
                        {faq.map((item) => (
                          <details
                            key={item.q}
                            className="group rounded-2xl border border-gray-200 dark:border-gray-700"
                          >
                            <summary className="flex cursor-pointer items-center justify-between p-6 text-gray-900 dark:text-white font-medium">
                              {item.q}
                              <svg
                                className="h-5 w-5 shrink-0 text-gray-600 dark:text-gray-400 transition-transform duration-200 group-open:rotate-45"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 4v16m8-8H4"
                                />
                              </svg>
                            </summary>
                            <div className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                              {item.a}
                            </div>
                          </details>
                        ))}
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>

        {/* Prev / Next */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <PrevNextArticle currentHref="/strefa-wiedzy/integracje-api-w-firmie-kiedy-warto" />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Masz kilka systemów, które powinny działać jak jeden proces?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Bezpłatna diagnoza, bez zobowiązań.
              </p>
              <Link href="/kontakt" className="btn-primary inline-block">
                Zamów diagnozę procesu
              </Link>
            </div>
          </div>
        </section>

        {/* Related links */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Powiązane artykuły
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/strefa-wiedzy/co-to-jest-automatyzacja-procesow-biznesowych"
                      className="text-accent hover:underline"
                    >
                      Co to jest automatyzacja procesów biznesowych
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji"
                      className="text-accent hover:underline"
                    >
                      Jak policzyć ROI z automatyzacji
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/strefa-wiedzy/jak-zautomatyzowac-raportowanie-w-firmie"
                      className="text-accent hover:underline"
                    >
                      Jak zautomatyzować raportowanie w firmie
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Powiązane usługi
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/automatyzacja-procesow-biznesowych"
                      className="text-accent hover:underline"
                    >
                      Automatyzacja procesów biznesowych
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/integracje-api"
                      className="text-accent hover:underline"
                    >
                      Integracje API
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/automatyzacja-leadow-crm"
                      className="text-accent hover:underline"
                    >
                      Automatyzacja CRM
                    </Link>
                  </li>
                </ul>
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
            headline: "Integracje API w firmie, kiedy warto?",
            description:
              "Kiedy integracje API mają sens w firmie, jakie problemy rozwiązują i kiedy lepiej wybrać prostsze podejście. Przykłady, błędy i praktyczne scenariusze.",
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

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
    </>
  );
}
