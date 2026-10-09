import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "Ryczałt czy liniowy w 2026, co się opłaca | Fluxlab",
  description:
    "Porównanie ryczałtu i podatku liniowego dla JDG w 2026. Kiedy ryczałt wygrywa, kiedy przegrywa i jak to policzyć na konkretnych liczbach.",
  openGraph: {
    title: "Ryczałt czy liniowy w 2026, co się opłaca | Fluxlab",
    description:
      "Porównanie ryczałtu i podatku liniowego dla JDG w 2026. Kiedy ryczałt wygrywa, kiedy przegrywa i jak to policzyć na konkretnych liczbach.",
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
    canonical: "/strefa-wiedzy/ryczalt-czy-liniowy",
  },
};

export default function RyczaltCzyLiniowyArticle() {
  const faqItems = [
    {
      question: "Czy można mieć ryczałt i VAT jednocześnie?",
      answer:
        "Tak. Ryczałt dotyczy podatku dochodowego, VAT to osobny podatek. Ryczałt z czynnym VAT to częsta konfiguracja, gdy klienci też są VAT-owcami.",
    },
    {
      question: "Czy zmiana z ryczałtu na liniowy jest trudna?",
      answer:
        "Nie. Wystarczy aktualizacja wpisu w CEIDG do 20 lutego. Nowa forma obowiązuje od 1 stycznia tego roku.",
    },
    {
      question: "Przy jakiej stawce ryczałtu liniowy zaczyna wygrywać?",
      answer:
        "Zwykle przy stawce ryczałtu 15% lub wyższej i kosztach powyżej 30-40% przychodu. Przy stawkach 8,5-12% i niskich kosztach przewagę ma ryczałt.",
    },
    {
      question: "Czy freelancer IT powinien wybrać ryczałt?",
      answer:
        "Przy stawce 12% i niskich kosztach ryczałt zazwyczaj wygrywa. Przy drogim sprzęcie, coworkingu czy podróżach warto przeliczyć też liniowy.",
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs href="/strefa-wiedzy/ryczalt-czy-liniowy" kolumna="srodek"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Ryczałt czy liniowy" },
          ]}
        />

        <section className="pt-24 pb-10">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="h1-artykulu mt-4">
              Ryczałt czy liniowy, co się bardziej opłaca w 2026
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Ryczałt liczy się od przychodu, liniowy 19% od dochodu. O wyniku
              decydują stawka ryczałtu, koszty i składka zdrowotna, a różnica
              sięga kilku tysięcy złotych rocznie.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20 prose-justify">
          <Tabs
            ariaLabel="Rozdziały artykułu Ryczałt czy liniowy"
            tabs={[
              {
                label: "Jak działają obie formy",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <h2 className="h2-sekcji mb-6">
                        Ryczałt
                      </h2>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                        <li>
                          Podatek od przychodu, bez odliczania kosztów. Stawki od
                          2% do 17%, najczęściej 8,5% (usługi), 12% (IT) i 15%
                          (doradztwo, marketing)
                        </li>
                        <li>
                          Składka zdrowotna w trzech progach: 498,35 zł, 830,58
                          zł lub 1 495,04 zł miesięcznie, 50% można odliczyć
                        </li>
                        <li>Prosta ewidencja przychodów, bez KPiR</li>
                      </ul>

                      <h2 className="h2-sekcji mb-6 mt-12">
                        Liniowy
                      </h2>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                        <li>
                          19% od dochodu, czyli przychodu minus koszty, bez
                          kwoty wolnej
                        </li>
                        <li>
                          Składka zdrowotna 4,9% dochodu (minimum 432,54 zł
                          miesięcznie od lutego 2026), odliczana do 14 100 zł
                          rocznie
                        </li>
                        <li>KPiR albo księgi rachunkowe</li>
                      </ul>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Sama stawka myli. Przy 40% kosztów liniowy daje
                        efektywnie 19% x 60% = 11,4% przychodu, mniej niż 12%
                        ryczałtu. Szczegóły składki opisujemy w artykule{" "}
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
                label: "Kiedy która wygrywa",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <h2 className="h2-sekcji mb-6">
                        Ryczałt wygrywa, gdy
                      </h2>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                        <li>koszty są niskie, poniżej 20-30% przychodu</li>
                        <li>stawka ryczałtu wynosi 12% lub mniej</li>
                        <li>nie planujesz dużych zakupów firmowych</li>
                      </ul>

                      <h2 className="h2-sekcji mb-6 mt-12">
                        Liniowy wygrywa, gdy
                      </h2>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                        <li>koszty przekraczają 30-40% przychodu</li>
                        <li>stawka ryczałtu wynosi 15% lub więcej</li>
                        <li>
                          masz samochód w leasingu, drogi sprzęt albo
                          podwykonawców
                        </li>
                      </ul>

                      <h2 className="h2-sekcji mb-6 mt-12">
                        Dwa przykłady
                      </h2>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Programista, 15 000 zł/mies., koszty 1 500 zł/mies.,
                        ryczałt 12%
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Ryczałt: ok. 30 970 zł rocznie (podatek i składka).
                        Liniowy: ok. 37 210 zł. Ryczałt oszczędza ok. 6 240 zł.
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Konsultant, 20 000 zł/mies., koszty 8 000 zł/mies.,
                        ryczałt 15%
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Ryczałt: ok. 45 220 zł rocznie. Liniowy: ok. 33 075 zł.
                        Liniowy oszczędza ok. 12 145 zł.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Formę zmienisz raz w roku, do 20 lutego, więc przelicz
                        ją co roku na aktualnych liczbach.
                      </p>

                      <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center mt-12">
                        <h2 className="h2-sekcji mb-6">
                          Sprawdź na swoich liczbach
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Wpisz przychód, koszty i stawkę ryczałtu, a kalkulator pokaże, która forma jest tańsza.
                        </p>
                        <Link href="/kalkulator-podatkowy" className="btn-primary inline-block">
                          Sprawdź w kalkulatorze JDG 2026
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
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <PrevNextArticle currentHref="/strefa-wiedzy/ryczalt-czy-liniowy" />

                      <CTA />

                      <div className="mt-12">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Zobacz też
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
                              href="/strefa-wiedzy/skala-czy-liniowy-jdg"
                              className="text-accent hover:underline"
                            >
                              Skala czy liniowy, porównanie dla JDG w 2026
                            </Link>
                          </li>
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
