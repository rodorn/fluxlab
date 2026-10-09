import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "Make vs n8n, porównanie dla firm MŚP | Fluxlab",
  description:
    "Make i n8n w boju: koszt, elastyczność, krzywa nauki i lokalizacja danych. Praktyczne porównanie dla małych i średnich firm w 2026 roku.",
  openGraph: {
    title: "Make vs n8n, porównanie dla firm MŚP | Fluxlab",
    description:
      "Make i n8n w boju: koszt, elastyczność, krzywa nauki i lokalizacja danych. Praktyczne porównanie dla małych i średnich firm w 2026 roku.",
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
    canonical: "/strefa-wiedzy/make-vs-n8n",
  },
};

export default function MakeVsN8nArticle() {
  const faqItems = [
    {
      question: "Czy Make jest tańszy od n8n.cloud?",
      answer:
        "Przy małym wolumenie zwykle tak. Make liczy każdy moduł jako operację, n8n cały scenariusz jako jedno wykonanie, więc przy scenariuszach z 5 do 10 modułów n8n często wychodzi taniej.",
    },
    {
      question: "Czy n8n self-hosted jest tańszy od Make?",
      answer:
        "Powyżej ok. 50 000 operacji miesięcznie tak. Serwer to ok. 25 zł/mies., do tego utrzymanie 200 do 500 zł/mies.",
    },
    {
      question: "Czy Make jest łatwiejszy w nauce niż n8n?",
      answer:
        "Trochę. Make ma bardziej dopracowany interfejs i więcej poradników. n8n jest bliżej programowania, co dla osoby technicznej jest zaletą.",
    },
    {
      question: "Co z RODO i lokalizacją danych?",
      answer:
        "Make i n8n.cloud mają serwery w UE. Najpełniejszą kontrolę daje n8n na własnym serwerze w Polsce, polecany w branżach regulowanych.",
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs href="/strefa-wiedzy/make-vs-n8n" kolumna="srodek"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Make vs n8n" },
          ]}
        />

        {/* Kompaktowy nagłówek */}
        <section className="pt-16 pb-6">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="h1-artykulu mt-4">
              Make vs n8n, porównanie dla firm MŚP
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Oba to wizualne platformy automatyzacji z mocną logiką. Różnią je
              model dostarczania, koszt przy wzroście i miejsce, w którym leżą
              Twoje dane.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20 prose-justify">
          <Tabs
            ariaLabel="Rozdziały artykułu Make vs n8n"
            tabs={[
              {
                label: "Koszt",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <h2 className="h2-sekcji mb-6">
                        Model i koszt dla MŚP
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Make to czeski SaaS, działa tylko w chmurze. n8n to
                        platforma open-source z Berlina: chmura n8n.cloud albo
                        własny serwer.
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                        <li>Make Core: od ok. 9 USD/mies. za 10 000 operacji</li>
                        <li>n8n.cloud Starter: od ok. 24 EUR/mies. za 2 500 wykonań</li>
                        <li>
                          n8n self-hosted: serwer ok. 25 zł/mies. plus utrzymanie
                          200 do 500 zł/mies.
                        </li>
                      </ul>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Do ok. 10 tys. wykonań miesięcznie Make i n8n.cloud
                        kosztują podobnie. Powyżej 30 tys. wyraźnie wygrywa n8n
                        na własnym serwerze, bo koszt rośnie z serwerem, a nie z
                        liczbą operacji.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                label: "Różnice",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <h2 className="h2-sekcji mb-6">
                        Nauka i elastyczność
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Make ma dopracowany interfejs i więcej poradników, pierwszy
                        scenariusz zbudujesz w niecałą godzinę. n8n jest bliżej
                        programisty: kod JavaScript w scenariuszu, własne moduły,
                        wersjonowanie w gicie.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Przy 10 do 30 scenariuszach możliwości są podobne. Różnica
                        rośnie przy 50+ scenariuszach i osobnych środowiskach.
                      </p>

                      <h2 className="h2-sekcji mb-6 mt-12">
                        Dane i utrzymanie
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Make i n8n.cloud trzymają dane w UE i wystarczają do RODO
                        w większości firm. n8n na własnym serwerze daje pełną
                        kontrolę, ale ktoś musi dbać o aktualizacje, kopie
                        zapasowe i monitoring. To 1 do 3 godzin miesięcznie, o
                        ile ktoś zna Linuxa i Dockera. Przy danych wrażliwych
                        pomagają{" "}
                        <Link
                          href="/integracje-api"
                          className="text-accent hover:underline"
                        >
                          integracje API
                        </Link>
                        {" "}w jednej sieci.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                label: "Co wybrać",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <h2 className="h2-sekcji mb-6">
                        Kiedy Make, a kiedy n8n
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Wybierz Make, gdy:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                        <li>nie macie osoby technicznej,</li>
                        <li>wolumen nie przekracza 30 000 operacji miesięcznie,</li>
                        <li>chcecie ruszyć w tym tygodniu.</li>
                      </ul>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Wybierz n8n, gdy:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                        <li>macie osobę techniczną albo partnera od infrastruktury,</li>
                        <li>koszty Make przekraczają ok. 50 USD miesięcznie,</li>
                        <li>
                          łączycie systemy wewnętrzne albo branża wymaga pełnej
                          kontroli nad danymi.
                        </li>
                      </ul>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Pełny obraz:{" "}
                        <Link
                          href="/strefa-wiedzy/zapier-make-n8n-porownanie"
                          className="text-accent hover:underline"
                        >
                          Zapier vs Make vs n8n
                        </Link>
                        .
                      </p>

                      <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center mt-12">
                        <h2 className="h2-sekcji mb-6">
                          Make czy n8n? Pomożemy dobrać i wdrożyć.
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Krótka rozmowa o Twojej skali i procesach.
                        </p>
                        <Link href="/automatyzacja-procesow-biznesowych" className="btn-primary inline-block">
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
                      <h2 className="h2-sekcji mb-6">
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
                      <PrevNextArticle currentHref="/strefa-wiedzy/make-vs-n8n" />

                      <CTA />

                      <div className="mt-12">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Usługi
                        </h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                          <li>
                            <Link
                              href="/zapier-make"
                              className="text-accent hover:underline"
                            >
                              Zapier i Make
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/n8n"
                              className="text-accent hover:underline"
                            >
                              n8n, wdrożenia
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
            headline: "Make vs n8n, porównanie dla firm MŚP",
            description:
              "Make i n8n w boju: koszt, elastyczność, krzywa nauki i lokalizacja danych. Praktyczne porównanie dla małych i średnich firm w 2026 roku.",
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
