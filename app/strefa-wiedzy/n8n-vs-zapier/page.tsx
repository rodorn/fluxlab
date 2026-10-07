import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "n8n vs Zapier, kiedy warto iść w self-hosting | Fluxlab",
  description:
    "Porównanie n8n i Zapier w 2026: pricing, krzywa nauki, kontrola danych, skalowalność i kiedy self-hosting realnie się opłaca. Praktyczne kryteria wyboru.",
  openGraph: {
    title: "n8n vs Zapier, kiedy warto iść w self-hosting | Fluxlab",
    description:
      "Porównanie n8n i Zapier w 2026: pricing, krzywa nauki, kontrola danych, skalowalność i kiedy self-hosting realnie się opłaca. Praktyczne kryteria wyboru.",
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
    canonical: "/strefa-wiedzy/n8n-vs-zapier",
  },
};

export default function N8nVsZapierArticle() {
  const faqItems = [
    {
      question: "Czy n8n jest naprawdę darmowy?",
      answer:
        "Wersja Community Edition jest bezpłatna do użytku wewnętrznego na własnym serwerze. Płatne są n8n.cloud (od ok. 24 EUR/mies.) i Enterprise Edition (SSO, role, log audytowy).",
    },
    {
      question: "Ile kosztuje utrzymanie n8n self-hosted?",
      answer:
        "Serwer to ok. 5-20 USD/mies. Pierwsze wdrożenie zajmuje 4-8 godzin, utrzymanie 1-3 godziny miesięcznie. U zewnętrznego wykonawcy to zwykle 200-500 zł miesięcznie.",
    },
    {
      question: "Czy n8n ma tyle integracji co Zapier?",
      answer:
        "Nie: ok. 500 wobec ok. 6 000. Moduły HTTP Request i Code pozwalają jednak podłączyć dowolne API, a popularne systemy (HubSpot, Pipedrive, Slack, Google, Microsoft) są w obu narzędziach.",
    },
    {
      question: "Czy łatwo migrować z Zapiera do n8n?",
      answer:
        "Nie ma automatycznego importu, scenariusze trzeba odbudować. Dla 10-20 Zapów to zwykle 3-5 dni pracy. Najlepiej migrować etapami, od Zapów zużywających najwięcej tasków.",
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "n8n vs Zapier" },
          ]}
        />

        <section className="pt-24 pb-10">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              n8n vs Zapier, kiedy warto iść w self-hosting
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Zapier jest szybki i wygodny, ale płacisz za każdy krok. n8n na
              własnym serwerze wymaga więcej pracy, za to daje kontrolę i niższe
              koszty przy dużym wolumenie. Pokazujemy, kiedy to się opłaca.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <Tabs
            ariaLabel="Rozdziały artykułu n8n vs Zapier"
            tabs={[
              {
                label: "Różnice i pricing",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Czym różni się n8n od Zapiera
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Zapier to usługa w chmurze w USA: zakładasz konto, łączysz
                        aplikacje, płacisz co miesiąc. Nie kontrolujesz serwera
                        ani drogi, którą płyną dane.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        n8n to platforma open-source. Uruchamiasz ją na własnym
                        serwerze albo w n8n.cloud. Interfejsem jest bliżej Make:
                        diagram, rozgałęzienia, pętle.
                      </p>

                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                        Gdzie jest realna oszczędność
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Zapier liczy taski: plan Professional za 19,99 USD/mies.
                        daje 750 tasków, Team za 69 USD/mies. daje 2 000. Przy
                        50 000 tasków miesięcznie to ok. 600-800 USD/mies.
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                        <li>
                          n8n self-hosted: ok. 25 zł/mies. za serwer plus
                          ewentualnie 200-500 zł utrzymania, bez limitu wykonań
                        </li>
                        <li>n8n.cloud Starter: od ok. 24 EUR/mies., 2 500 wykonań</li>
                        <li>n8n.cloud Pro: od ok. 60 EUR/mies., 10 000 wykonań</li>
                      </ul>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        W n8n wykonanie to cały scenariusz. Ten sam scenariusz z
                        10 krokami to w Zapierze 10 tasków. Zanim zdecydujesz,
                        policz{" "}
                        <Link
                          href="/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji"
                          className="text-accent hover:underline"
                        >
                          ROI z automatyzacji
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                label: "Nauka, dane, integracje",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Start i utrzymanie
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        W Zapierze pierwsza automatyzacja działa po 15 minutach.
                        n8n self-hosted wymaga podstaw Linuksa i Dockera, reverse
                        proxy z SSL, codziennego backupu bazy, monitoringu i
                        regularnych aktualizacji.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Firma bez własnego IT potrzebuje do tego zewnętrznego
                        wsparcia albo n8n.cloud.
                      </p>

                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                        Kontrola danych
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        n8n self-hosted nie wypuszcza danych poza Twoją
                        infrastrukturę, a serwer w Polsce upraszcza zgodność z
                        RODO. Może też działać w sieci wewnętrznej i łączyć się z
                        CRM, ERP czy bazą księgową, które nie są wystawione na
                        zewnątrz.
                      </p>

                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                        Integracje
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Zapier ma ok. 6 000 integracji, n8n ok. 500. Popularne
                        systemy są w obu. Przy nietypowych n8n wygrywa modułem
                        HTTP Request i Code (JavaScript lub Python), które w
                        Zapierze są dopiero od planu Professional.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                label: "Skalowanie i decyzja",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Co się dzieje, gdy wolumen rośnie
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Koszt Zapiera rośnie z liczbą operacji, plan Company to
                        od ok. 599 USD/mies. Koszt n8n rośnie z serwerem: VPS za
                        25 zł/mies. udźwignie kilka tysięcy wykonań dziennie.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Powyżej 50 000 wykonań miesięcznie n8n self-hosted jest
                        praktycznie zawsze tańszy, nawet z kosztem utrzymania.
                      </p>

                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                        Kiedy zostać przy Zapierze
                      </h2>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                        <li>Nikt w firmie nie zna Linuksa i nie chcecie płacić za utrzymanie</li>
                        <li>Wolumen jest mały, poniżej 1 000 tasków miesięcznie</li>
                        <li>Macie kilka prostych automatyzacji i liczy się szybki start</li>
                        <li>Nie musicie trzymać danych w UE ani łączyć systemów wewnętrznych</li>
                      </ul>

                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                        Najczęstszy układ: hybryda
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Zapier lub Make do prostych automatyzacji działowych, n8n
                        do leadów, synchronizacji CRM z ERP i raportów sprzedaży.
                        Narzędzie wybieramy dopiero po rozpisaniu procesu, od
                        tego zaczyna się{" "}
                        <Link
                          href="/automatyzacja-procesow-biznesowych"
                          className="text-accent hover:underline"
                        >
                          automatyzacja procesów biznesowych w firmie
                        </Link>
                        .
                      </p>

                      <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center mt-12">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                          Chcesz n8n bez utrzymywania serwera?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Wdrażamy n8n na Twoim serwerze albo zarządzamy nim za
                          Ciebie.
                        </p>
                        <Link href="/n8n" className="btn-primary inline-block">
                          Zobacz usługę n8n
                        </Link>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "FAQ",
                content: (
                  <div className="py-10 lg:py-12">
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
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <PrevNextArticle currentHref="/strefa-wiedzy/n8n-vs-zapier" />

                      <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center mt-12">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                          Nie wiesz, czy warto wchodzić w self-hosting?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Przejrzymy Twoje procesy i porównamy koszty na 12 i 24
                          miesiące.
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
                              href="/strefa-wiedzy/make-vs-n8n"
                              className="text-accent hover:underline"
                            >
                              Make vs n8n, porównanie dla firm MŚP
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/n8n"
                              className="text-accent hover:underline"
                            >
                              n8n, wdrożenia i utrzymanie
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/zapier-make"
                              className="text-accent hover:underline"
                            >
                              Zapier i Make
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
            headline: "n8n vs Zapier, kiedy warto iść w self-hosting",
            description:
              "Porównanie n8n i Zapier w 2026: pricing, krzywa nauki, kontrola danych, skalowalność i kiedy self-hosting realnie się opłaca. Praktyczne kryteria wyboru.",
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
