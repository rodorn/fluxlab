import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "Jak liczyć składkę zdrowotną w JDG w 2026 | Fluxlab",
  description:
    "Zasady obliczania składki zdrowotnej w JDG w 2026. Różnice między skalą, liniowym i ryczałtem, progi, podstawy wymiaru i wpływ na opłacalność.",
  openGraph: {
    title: "Jak liczyć składkę zdrowotną w JDG w 2026 | Fluxlab",
    description:
      "Zasady obliczania składki zdrowotnej w JDG w 2026. Różnice między skalą, liniowym i ryczałtem, progi, podstawy wymiaru i wpływ na opłacalność.",
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
    canonical: "/strefa-wiedzy/jak-liczyc-zdrowotna-jdg",
  },
};

const faqItems = [
  {
    question: "Czy składkę zdrowotną można odliczyć?",
    answer:
      "Na liniowym od dochodu, do 14 100 zł rocznie. Na ryczałcie połowę składki od przychodu. Na skali nie.",
  },
  {
    question: "Jaka jest minimalna składka zdrowotna?",
    answer:
      "Na skali i liniowym 432,54 zł miesięcznie od lutego do grudnia 2026 (za styczeń 314,96 zł). Obowiązuje nawet przy zerowym dochodzie.",
  },
  {
    question: "Czy na ryczałcie zdrowotna zależy od dochodu?",
    answer:
      "Nie. Zależy od progu rocznego przychodu: do 60 tys., do 300 tys. albo powyżej 300 tys. zł.",
  },
  {
    question: "Dlaczego zdrowotna na liniowym jest niższa?",
    answer:
      "Stawka to 4,9% dochodu zamiast 9%, a zapłaconą składkę można odliczyć od dochodu do 14 100 zł rocznie.",
  },
];

export default function SkladkaZdrowotnaJDGArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Jak liczyć składkę zdrowotną w JDG" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Jak liczyć składkę zdrowotną w JDG w 2026
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Składka zdrowotna potrafi zmienić wynik porównania form
              opodatkowania o kilka tysięcy złotych rocznie. Na skali, liniowym i
              ryczałcie liczy się ją inaczej.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <Tabs
            ariaLabel="Rozdziały artykułu o składce zdrowotnej w JDG"
            tabs={[
              {
                label: "Zasady",
                content: (
                  <div className="py-10 lg:py-12 max-w-3xl mx-auto">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                      Skala, liniowy i ryczałt
                    </h2>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Skala podatkowa
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      9% dochodu, bez żadnego odliczenia. Przy dochodzie 10 000
                      zł miesięcznie to 900 zł.
                    </p>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Podatek liniowy
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      4,9% dochodu, odliczane od dochodu do 14 100 zł rocznie.
                      Przy dochodzie 10 000 zł miesięcznie to 490 zł, a
                      odliczenie obniża podatek o ok. 93 zł.
                    </p>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Ryczałt
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Stała kwota zależna od rocznego przychodu, nie od dochodu.
                      Połowę zapłaconej składki odlicza się od przychodu.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                      <li>do 60 000 zł: 498,35 zł/mies.,</li>
                      <li>od 60 001 do 300 000 zł: 830,58 zł/mies.,</li>
                      <li>powyżej 300 000 zł: 1 495,04 zł/mies.</li>
                    </ul>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Minimum
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Na skali i liniowym składka nie może być niższa niż 9% od
                      płacy minimalnej (4 806 zł), czyli 432,54 zł miesięcznie
                      od lutego 2026. Za styczeń obowiązuje jeszcze 314,96 zł.
                    </p>
                  </div>
                ),
              },
              {
                label: "Porównanie",
                content: (
                  <div className="py-10 lg:py-12 max-w-3xl mx-auto">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                      Porównanie na przykładach
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Składka zdrowotna rocznie, przy niskich kosztach
                      działalności.
                    </p>
                    <div className="overflow-x-auto mb-6">
                      <table className="w-full text-left text-sm text-gray-600 dark:text-gray-400">
                        <thead className="text-gray-900 dark:text-white">
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="py-2 pr-4 font-semibold">
                              Dochód miesięcznie
                            </th>
                            <th className="py-2 pr-4 font-semibold">Skala</th>
                            <th className="py-2 pr-4 font-semibold">Liniowy</th>
                            <th className="py-2 font-semibold">Ryczałt</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            ["6 000 zł", "6 480 zł", "5 190,48 zł (minimum)", "5 980,20 zł"],
                            ["15 000 zł", "16 200 zł", "8 820 zł", "9 966,96 zł"],
                            ["30 000 zł", "32 400 zł", "17 640 zł", "17 940,48 zł"],
                          ].map(([d, a, b, c]) => (
                            <tr
                              key={d}
                              className="border-b border-gray-100 dark:border-gray-800"
                            >
                              <td className="py-2 pr-4 font-medium text-gray-900 dark:text-white">
                                {d}
                              </td>
                              <td className="py-2 pr-4">{a}</td>
                              <td className="py-2 pr-4">{b}</td>
                              <td className="py-2">{c}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Skala jest najdroższa przy każdym dochodzie. Liniowy
                      dodatkowo pozwala odliczyć składkę od dochodu. Sam wybór
                      formy opisujemy w artykule{" "}
                      <Link
                        href="/strefa-wiedzy/jaka-forma-opodatkowania-jdg-2026"
                        className="text-accent hover:underline"
                      >
                        Jaka forma opodatkowania JDG w 2026
                      </Link>
                      .
                    </p>

                    <div className="mt-10 bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Sprawdź wpływ zdrowotnej na Twój wynik
                      </p>
                      <Link
                        href="/kalkulator-podatkowy"
                        className="btn-primary inline-block"
                      >
                        Sprawdź w kalkulatorze JDG 2026
                      </Link>
                    </div>
                  </div>
                ),
              },
              {
                label: "FAQ",
                content: (
                  <div className="py-10 lg:py-12 max-w-3xl mx-auto">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                      FAQ
                    </h2>
                    <div className="space-y-4">
                      {faqItems.map((item) => (
                        <details
                          key={item.question}
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

                    <div className="mt-12 bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Chcesz policzyć składki dla swojej sytuacji?
                      </h2>
                      <Link
                        href="/kontakt"
                        className="btn-primary inline-block"
                      >
                        Zamów diagnozę procesu
                      </Link>
                    </div>

                    <div className="mt-12">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Powiązane
                      </h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                        <li>
                          <Link
                            href="/strefa-wiedzy/skala-czy-liniowy-jdg"
                            className="text-accent hover:underline"
                          >
                            Skala czy liniowy w JDG
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/strefa-wiedzy/ryczalt-czy-liniowy"
                            className="text-accent hover:underline"
                          >
                            Ryczałt czy liniowy, co wybrać
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/kalkulator-podatkowy"
                            className="text-accent hover:underline"
                          >
                            Kalkulator podatkowy JDG 2026
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                ),
              },
            ]}
          />

          <div className="max-w-3xl mx-auto mt-16">
            <PrevNextArticle currentHref="/strefa-wiedzy/jak-liczyc-zdrowotna-jdg" />
          </div>
        </div>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />
    </>
  );
}
