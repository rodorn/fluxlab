import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "Zapier vs Make vs n8n, wielkie porównanie 2026 | Fluxlab",
  description:
    "Pełne porównanie Zapier, Make i n8n w 2026: pricing, integracje, krzywa nauki, skalowalność, compliance i koszt na różną skalę. Konkretne kryteria wyboru.",
  openGraph: {
    title: "Zapier vs Make vs n8n, wielkie porównanie 2026 | Fluxlab",
    description:
      "Pełne porównanie Zapier, Make i n8n w 2026: pricing, integracje, krzywa nauki, skalowalność, compliance i koszt na różną skalę. Konkretne kryteria wyboru.",
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
    canonical: "/strefa-wiedzy/zapier-make-n8n-porownanie",
  },
};

export default function ZapierMakeN8nPorownanieArticle() {
  const faqItems = [
    {
      question: "Które narzędzie jest najlepsze dla małej firmy?",
      answer:
        "Bez działu IT najczęściej Zapier lub Make. Zapier przy prostych integracjach i szybkim starcie, Make przy bardziej złożonych procesach i niższym koszcie.",
    },
    {
      question: "Czy n8n da się używać bez znajomości kodu?",
      answer:
        "Tak, edytor jest wizualny jak w Make. Pełnia możliwości (Code node, wyrażenia JavaScript) wymaga jednak podstaw programowania.",
    },
    {
      question: "Co jest najtańsze przy 100 000 wykonań miesięcznie?",
      answer:
        "n8n self-hosted: serwer 25-100 zł/mies. plus utrzymanie 200-500 zł/mies. Make to ok. 200-400 USD/mies., Zapier często ponad 600 USD/mies.",
    },
    {
      question: "Czy możemy zacząć od Zapiera i przejść później na Make lub n8n?",
      answer:
        "Tak, to częsta ścieżka. Nie ma automatycznego importu, ale scenariusze przenosi się wybiórczo, gdy procesy się ustabilizują i wolumen urośnie.",
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Zapier vs Make vs n8n" },
          ]}
        />

        <section className="pt-16 pb-6">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Zapier vs Make vs n8n, wielkie porównanie 2026
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Zapier stawia na prostotę i szybki start, Make na elastyczność w
              rozsądnej cenie, n8n na pełną kontrolę i niski koszt przy dużej
              skali. Porównujemy cenę, integracje, naukę, utrzymanie i RODO.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <Tabs
            ariaLabel="Rozdziały artykułu Zapier vs Make vs n8n"
            tabs={[
              {
                label: "Ceny",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Ile to kosztuje na trzech wolumenach
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Zapier liczy taski (każda akcja), Make operacje (każdy
                        moduł), n8n wykonania całego scenariusza. Przykład: lead
                        z formularza do CRM z powiadomieniem, ok. 7 kroków.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        <strong>500 leadów miesięcznie (~3 500 operacji):</strong>
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                        <li>Zapier Professional, ok. 19,99 USD/mies.</li>
                        <li>Make Core, ok. 9 USD/mies.</li>
                        <li>n8n.cloud Starter, ok. 24 EUR/mies.</li>
                        <li>n8n self-hosted, ok. 25 zł/mies. za serwer</li>
                      </ul>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        <strong>5 000 leadów miesięcznie (~35 000 operacji):</strong>
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                        <li>Zapier Team, ok. 200 USD/mies.</li>
                        <li>Make Pro, ok. 60-80 USD/mies.</li>
                        <li>n8n.cloud Pro, ok. 60 EUR/mies.</li>
                        <li>n8n self-hosted, ok. 325 zł z utrzymaniem</li>
                      </ul>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        <strong>50 000 leadów miesięcznie (~350 000 operacji):</strong>
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                        <li>Zapier Company, od ok. 600 USD/mies.</li>
                        <li>Make Teams, ok. 200-400 USD/mies.</li>
                        <li>n8n self-hosted, ok. 700 zł/mies. z utrzymaniem</li>
                      </ul>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Na małej skali różnice są nieistotne. Przy średniej Make
                        i n8n.cloud są wyraźnie tańsze od Zapiera, przy dużej n8n
                        self-hosted bywa tańszy o rząd wielkości.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                label: "Integracje i nauka",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Integracje
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Zapier ma ok. 6 000 integracji, Make ok. 1 800, n8n ponad
                        500. Popularne systemy (HubSpot, Pipedrive, Slack, Google
                        Workspace, Shopify) są wszędzie.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Przy niszowych SaaS-ach Zapier zwykle jest pierwszy.
                        Przy nietypowym API n8n wygrywa modułem HTTP i Code,
                        który podłącza dowolne REST API bez czekania na gotowy
                        moduł.
                      </p>

                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                        Nauka i logika
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Zapier: pierwsza automatyzacja w 15 minut, ale słaba
                        obsługa warunków, pętli i błędów. Make: 30-45 minut na
                        start, za to routery, iteratory i obsługa błędów per
                        moduł.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        n8n: 1-2 godziny na start, najwięcej możliwości (kod w
                        JavaScript lub Pythonie, pod-scenariusze). Dla osoby z
                        biznesu wybierzcie Zapier lub Make, dla osoby
                        technicznej n8n.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                label: "Utrzymanie i RODO",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        RODO i lokalizacja danych
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Zapier trzyma dane głównie w USA, co bywa problemem w
                        branżach regulowanych. Make (Czechy) i n8n.cloud (Niemcy)
                        mają serwery w UE.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        n8n self-hosted to jedyna opcja on-premise: dane nie
                        wychodzą poza Waszą sieć. To standard w finansach i
                        zdrowiu.
                      </p>

                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                        Kto utrzymuje
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Zapier, Make i n8n.cloud to SaaS: producent dba o
                        serwery i aktualizacje. Przy n8n self-hosted serwer,
                        aktualizacje, kopie i monitoring są po Waszej stronie,
                        zwykle 1-3 godziny miesięcznie.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Bez osoby znającej Linuksa i Dockera self-hosted nie ma
                        sensu. Wtedy n8n.cloud, Make albo Zapier.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                label: "Decyzja",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Który wybrać
                      </h2>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                        <li>
                          <strong>Zapier:</strong> mały wolumen, buduje osoba z
                          biznesu, automatyzacja potrzebna od razu.
                        </li>
                        <li>
                          <strong>Make:</strong> rosnący wolumen, bardziej
                          złożone procesy, dane w UE. Najlepszy kompromis dla
                          większości firm MŚP.
                        </li>
                        <li>
                          <strong>n8n:</strong> duży wolumen, wymogi compliance,
                          integracje z systemami wewnętrznymi i osoba techniczna
                          w zespole.
                        </li>
                      </ul>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Średnie firmy często łączą dwa narzędzia: Zapier lub Make
                        do prostych integracji działów, n8n do sprzedaży,
                        raportowania i integracji z ERP lub CRM.
                      </p>

                      <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center mt-12">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                          Chcesz dobrać narzędzie pod swoje procesy?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Policzymy roczny koszt każdego z trzech narzędzi i
                          zbudujemy pierwsze scenariusze.
                        </p>
                        <Link
                          href="/automatyzacja-leadow-crm"
                          className="btn-primary inline-block"
                        >
                          Zobacz usługę automatyzacji procesów
                        </Link>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "FAQ",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        FAQ
                      </h2>
                      <div className="space-y-4">
                        {faqItems.map((item, index) => (
                          <details
                            key={index}
                            className="group rounded-2xl border border-gray-200 dark:border-gray-700"
                          >
                            <summary className="flex cursor-pointer items-center justify-between p-6 text-gray-900 dark:text-white font-medium">
                              {item.question}
                              <span className="ml-4 shrink-0 text-gray-600 dark:text-gray-400 transition-transform group-open:rotate-45">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <line x1="10" y1="4" x2="10" y2="16" />
                                  <line x1="4" y1="10" x2="16" y2="10" />
                                </svg>
                              </span>
                            </summary>
                            <p className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                              {item.answer}
                            </p>
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
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <PrevNextArticle currentHref="/strefa-wiedzy/zapier-make-n8n-porownanie" />

                      <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center mt-12">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                          Pomożemy wybrać i wdrożyć, bez przepłacania
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Krótka rozmowa o Waszych procesach, skali i zespole.
                        </p>
                        <Link
                          href="/kontakt"
                          className="btn-primary inline-block"
                        >
                          Zamów diagnozę procesu
                        </Link>
                      </div>

                      <div className="mt-12">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Zobacz też
                        </h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
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
                              href="/automatyzacja-leadow-crm"
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
                        </ul>
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </main>
      <Footer />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Zapier vs Make vs n8n, wielkie porównanie 2026",
            description:
              "Pełne porównanie Zapier, Make i n8n w 2026: pricing, integracje, krzywa nauki, skalowalność, compliance i koszt na różną skalę. Konkretne kryteria wyboru.",
            datePublished: "2026-04-19",
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
            mainEntity: faqItems.map((item) => ({
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
    </>
  );
}
