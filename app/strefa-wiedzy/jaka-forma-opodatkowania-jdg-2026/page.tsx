import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "Jaka forma opodatkowania JDG w 2026 | Fluxlab",
  description:
    "Którą formę opodatkowania wybrać w 2026: skalę podatkową, podatek liniowy czy ryczałt? Kryteria wyboru, progi, składka zdrowotna i pułapki.",
  openGraph: {
    title: "Jaka forma opodatkowania JDG w 2026 | Fluxlab",
    description:
      "Którą formę opodatkowania wybrać w 2026: skalę podatkową, podatek liniowy czy ryczałt? Kryteria wyboru, progi, składka zdrowotna i pułapki.",
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
    canonical: "/strefa-wiedzy/jaka-forma-opodatkowania-jdg-2026",
  },
};

export default function JakaFormaOpodatkowaniaJdgArticle() {
  const faqItems = [
    {
      question: "Czy możemy zmienić formę opodatkowania w trakcie roku?",
      answer:
        "Nie. Zmiana działa od 1 stycznia, a zgłasza się ją do 20 lutego roku, od którego ma obowiązywać.",
    },
    {
      question: "Czy ryczałt jest zawsze najtańszy?",
      answer:
        "Nie. Ryczałt nie pozwala odliczać kosztów. Przy wysokich kosztach podatek od całego przychodu bywa wyższy niż na liniowym lub skali.",
    },
    {
      question: "Czy na liniowym możemy odliczyć składkę zdrowotną?",
      answer:
        "Tak. Składka wynosi 4,9% dochodu i można ją odliczyć od podstawy do limitu 14 100 zł rocznie.",
    },
    {
      question: "Czy warto konsultować wybór z księgowym?",
      answer:
        "Tak, zwłaszcza przy kilku źródłach dochodu, rozliczeniu z małżonkiem albo planowanych inwestycjach.",
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs href="/strefa-wiedzy/jaka-forma-opodatkowania-jdg-2026" kolumna="srodek"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Jaka forma opodatkowania JDG w 2026?" },
          ]}
        />
        {/* Kompaktowy nagłówek */}
        <section className="pt-16 pb-6">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">
              Jaka forma opodatkowania JDG w 2026?
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed !text-left">
              W 2026 roku JDG wybiera między skalą, podatkiem liniowym i
              ryczałtem. Różnią się stawką, kosztami i składką zdrowotną.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <Tabs
            ariaLabel="Rozdziały artykułu o formie opodatkowania JDG w 2026"
            tabs={[
              {
                label: "Trzy formy",
                content: (
                  <div className="py-6 lg:py-8 max-w-3xl mx-auto">
                    <h2 className="mb-6 h2-sekcji">
                      Trzy formy opodatkowania JDG
                    </h2>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Skala podatkowa
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                      <li>12% do 120 000 zł dochodu, 32% powyżej</li>
                      <li>kwota wolna 30 000 zł, koszty odliczalne</li>
                      <li>składka zdrowotna 9% dochodu, nieodliczalna</li>
                      <li>
                        opłaca się przy niższych dochodach i wspólnym
                        rozliczeniu z małżonkiem
                      </li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Podatek liniowy
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                      <li>stałe 19% od dochodu, bez kwoty wolnej</li>
                      <li>
                        składka zdrowotna 4,9% dochodu, odliczalna do 14 100 zł
                        rocznie
                      </li>
                      <li>
                        opłaca się przy dochodzie powyżej ok. 120 tys. zł i
                        wysokich kosztach
                      </li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Ryczałt ewidencjonowany
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                      <li>od 2% do 17% od przychodu, zależnie od branży</li>
                      <li>bez odliczania kosztów</li>
                      <li>
                        składka zdrowotna zryczałtowana według progu przychodu
                      </li>
                      <li>opłaca się przy niskich kosztach i niskiej stawce</li>
                    </ul>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Szczegóły:{" "}
                      <Link
                        href="/strefa-wiedzy/skala-czy-liniowy-jdg"
                        className="text-accent hover:underline"
                      >
                        skala czy liniowy
                      </Link>
                      ,{" "}
                      <Link
                        href="/strefa-wiedzy/ryczalt-czy-liniowy"
                        className="text-accent hover:underline"
                      >
                        ryczałt czy liniowy
                      </Link>
                      .
                    </p>
                  </div>
                ),
              },
              {
                label: "Jak wybrać formę",
                content: (
                  <div className="py-6 lg:py-8 max-w-3xl mx-auto">
                    <h2 className="mb-6 h2-sekcji">
                      Jak wybrać formę
                    </h2>
                    <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                      <li>
                        Koszty powyżej 30% przychodu? Ryczałt raczej odpada.
                      </li>
                      <li>
                        Niskie koszty i stawka ryczałtu do 12%? Ryczałt jest
                        mocnym kandydatem.
                      </li>
                      <li>
                        Dochód do 120 000 zł? Skala może wygrać z liniowym.
                      </li>
                      <li>
                        Licz podatek razem ze składką zdrowotną, bo potrafi
                        zmienić wynik o kilka tysięcy złotych.
                      </li>
                    </ol>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Nie patrz tylko na stawkę. Ryczałt liczy się od
                      przychodu, liniowy od dochodu. Przy 40% kosztów liniowy
                      to ok. 11,4% przychodu, mniej niż 12% ryczałtu. Więcej o
                      składce:{" "}
                      <Link
                        href="/strefa-wiedzy/jak-liczyc-zdrowotna-jdg"
                        className="text-accent hover:underline"
                      >
                        jak liczyć składkę zdrowotną w JDG
                      </Link>
                      .
                    </p>

                    <div className="mt-10 bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Sprawdź wynik na swoich liczbach
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Porównaj trzy formy razem ze składką zdrowotną.
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
                  <div className="py-6 lg:py-8 max-w-3xl mx-auto">
                    <h2 className="mb-6 h2-sekcji">
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
                ),
              },
            ]}
          />

          {/* Prev / Next */}
          <div className="max-w-3xl mx-auto mt-16">
            <PrevNextArticle currentHref="/strefa-wiedzy/jaka-forma-opodatkowania-jdg-2026" />
          </div>
        </div>
        <CTA />
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
