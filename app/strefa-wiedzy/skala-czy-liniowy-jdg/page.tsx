import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "Skala czy liniowy dla JDG w 2026 | Fluxlab",
  description:
    "Porównanie skali podatkowej i podatku liniowego dla JDG w 2026. Kwota wolna, progi, składka zdrowotna, realne scenariusze i kalkulator.",
  openGraph: {
    title: "Skala czy liniowy dla JDG w 2026 | Fluxlab",
    description:
      "Porównanie skali podatkowej i podatku liniowego dla JDG w 2026. Kwota wolna, progi, składka zdrowotna, realne scenariusze i kalkulator.",
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
    canonical: "/strefa-wiedzy/skala-czy-liniowy-jdg",
  },
};

export default function SkalaCzyLiniowyJdgArticle() {
  const faqItems = [
    {
      question: "Od jakiego dochodu liniowy się opłaca?",
      answer:
        "Zwykle od ok. 100 do 120 tys. zł rocznego dochodu, licząc podatek razem ze składką zdrowotną.",
    },
    {
      question: "Czy na skali możemy rozliczać się z małżonkiem?",
      answer:
        "Tak, to główna przewaga skali. Opłaca się zwłaszcza, gdy jeden z małżonków zarabia dużo więcej.",
    },
    {
      question: "Czy składka zdrowotna na liniowym jest niższa?",
      answer:
        "Tak: 4,9% dochodu zamiast 9%, a do 14 100 zł rocznie można ją odliczyć od podstawy.",
    },
    {
      question: "Czy możemy zmienić ze skali na liniowy w ciągu roku?",
      answer:
        "Nie. Zmiana działa od 1 stycznia, zgłoszenie w CEIDG do 20 lutego.",
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs kolumna="srodek"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Skala czy liniowy, JDG" },
          ]}
        />

        <section className="pt-24 pb-10">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Skala czy liniowy, porównanie dla JDG w 2026
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Obie formy opierają się na dochodzie i pozwalają odliczać koszty.
              Różnią się stawkami, kwotą wolną i składką zdrowotną. Próg
              opłacalności liniowego to zwykle 100 do 120 tys. zł dochodu.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <Tabs
            ariaLabel="Rozdziały artykułu Skala czy liniowy"
            tabs={[
              {
                label: "Zasady obu form",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Skala i liniowy w 2026
                      </h2>
                      <div className="overflow-x-auto mb-6">
                        <table className="w-full text-left text-sm text-gray-600 dark:text-gray-400">
                          <thead className="text-gray-900 dark:text-white">
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                              <th className="py-2 pr-4 font-semibold"></th>
                              <th className="py-2 pr-4 font-semibold">Skala</th>
                              <th className="py-2 font-semibold">Liniowy</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ["Stawka", "12% do 120 000 zł, 32% powyżej", "19%"],
                              ["Kwota wolna", "30 000 zł", "brak"],
                              [
                                "Składka zdrowotna",
                                "9% dochodu, bez odliczenia",
                                "4,9% dochodu (min. 432,54 zł/mc od lutego 2026), odliczenie do 14 100 zł rocznie",
                              ],
                              ["Rozliczenie z małżonkiem", "tak", "nie"],
                            ].map(([k, a, b]) => (
                              <tr
                                key={k}
                                className="border-b border-gray-100 dark:border-gray-800"
                              >
                                <td className="py-2 pr-4 font-medium text-gray-900 dark:text-white">
                                  {k}
                                </td>
                                <td className="py-2 pr-4">{a}</td>
                                <td className="py-2">{b}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Licząc sam podatek, skala wygrywa do ok. 135 do 140 tys.
                        zł dochodu. Wyższa i nieodliczalna składka zdrowotna
                        przesuwa ten próg do ok. 100 do 120 tys. zł. Więcej w
                        artykule{" "}
                        <Link
                          href="/strefa-wiedzy/jak-liczyc-zdrowotna-jdg"
                          className="text-accent hover:underline"
                        >
                          Jak liczyć składkę zdrowotną w JDG
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                label: "Przykłady",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Podatek i składka zdrowotna łącznie
                      </h2>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                        <li>
                          <strong>Dochód 80 000 zł:</strong> skala 13 200 zł,
                          liniowy 18 375 zł. Skala tańsza o ok. 5 175 zł.
                        </li>
                        <li>
                          <strong>Dochód 110 000 zł:</strong> skala 19 500 zł,
                          liniowy 25 266 zł. Skala tańsza o ok. 5 766 zł.
                        </li>
                        <li>
                          <strong>Dochód 150 000 zł:</strong> skala 33 900 zł,
                          liniowy 34 454 zł. Praktycznie remis.
                        </li>
                        <li>
                          <strong>Dochód 200 000 zł:</strong> skala 54 400 zł,
                          liniowy 45 938 zł. Liniowy tańszy o ok. 8 462 zł.
                        </li>
                      </ul>

                      <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center mt-12">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                          Porównaj na swoich danych
                        </h2>
                        <Link
                          href="/kalkulator-podatkowy"
                          className="btn-primary inline-block"
                        >
                          Sprawdź w kalkulatorze JDG 2026
                        </Link>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Kiedy co",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Kiedy skala, kiedy liniowy
                      </h2>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Skala, gdy:
                      </h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                        <li>dochód nie przekracza 100 do 120 tys. zł,</li>
                        <li>chcesz rozliczać się z małżonkiem,</li>
                        <li>korzystasz z ulg dostępnych tylko na skali.</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Liniowy, gdy:
                      </h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                        <li>dochód przekracza 120 do 150 tys. zł,</li>
                        <li>nie rozliczasz się z małżonkiem,</li>
                        <li>niższa składka zdrowotna daje realną oszczędność.</li>
                      </ul>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Wspólne rozliczenie zmienia rachunek. Przy dochodzie
                        200 000 zł i małżonku z 20 000 zł podatek spada z 36 400
                        zł do 19 200 zł. Wtedy skala może wygrać nawet powyżej
                        150 tys. zł.
                      </p>
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
                      <PrevNextArticle currentHref="/strefa-wiedzy/skala-czy-liniowy-jdg" />

                      <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center mt-12">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                          Potrzebujesz pomocy w wyborze formy?
                        </h2>
                        <Link
                          href="/kontakt"
                          className="btn-primary inline-block"
                        >
                          Zamów diagnozę procesu
                        </Link>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8 mt-12">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Powiązane artykuły
                          </h3>
                          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                            <li>
                              <Link
                                href="/strefa-wiedzy/jaka-forma-opodatkowania-jdg-2026"
                                className="text-accent hover:underline"
                              >
                                Jaka forma opodatkowania JDG w 2026?
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/strefa-wiedzy/ryczalt-czy-liniowy"
                                className="text-accent hover:underline"
                              >
                                Ryczałt czy liniowy, co się bardziej opłaca w
                                2026
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/strefa-wiedzy/jak-liczyc-zdrowotna-jdg"
                                className="text-accent hover:underline"
                              >
                                Jak liczyć składkę zdrowotną w JDG
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Narzędzia
                          </h3>
                          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                            <li>
                              <Link
                                href="/kalkulator-podatkowy"
                                className="text-accent hover:underline"
                              >
                                Kalkulator JDG 2026
                              </Link>
                            </li>
                          </ul>
                        </div>
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
