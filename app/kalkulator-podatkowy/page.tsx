import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TaxCalculator from "./TaxCalculator";
import Breadcrumbs from "@/components/Breadcrumbs";
import Tabs from "@/components/Tabs";
import NazwaNarzedzia from "@/components/NazwaNarzedzia";

export const metadata: Metadata = {
  title: "Kalkulator JDG 2026: ryczałt, liniowy, skala i ZUS | Fluxlab",
  description:
    "Porównaj ryczałt, podatek liniowy i skalę dla JDG w 2026. Uwzględnia ZUS, składkę zdrowotną, VAT, koszty prywatne i samochód. Bez rejestracji.",
  openGraph: {
    title: "Kalkulator JDG 2026: ryczałt, liniowy, skala i ZUS | Fluxlab",
    description:
      "Porównaj ryczałt, podatek liniowy i skalę podatkową dla JDG w 2026. ZUS, zdrowotna, VAT, koszty prywatne i samochód.",
    locale: "pl_PL",
    type: "website",
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
    canonical: "/kalkulator-podatkowy",
  },
};

const faqs = [
  {
    question: "Która forma opodatkowania jest najlepsza dla JDG w 2026?",
    answer:
      "Zależy od przychodu, kosztów i stawki ryczałtu. Przy niskich kosztach i stawce do 12% często wygrywa ryczałt, przy wysokich kosztach liniowy lub skala.",
  },
  {
    question: "Jak liczy się składkę zdrowotną na ryczałcie w 2026?",
    answer:
      "9% od podstawy zależnej od rocznego przychodu (do 60 000 zł, do 300 000 zł, powyżej). Miesięcznie: 498,35 zł, 830,58 zł albo 1 495,04 zł.",
  },
  {
    question: "Ile wynosi ZUS dla JDG w 2026?",
    answer:
      "Pełny ZUS z chorobową to 1 926,76 zł miesięcznie (podstawa 5 652 zł). Mały ZUS liczy się od 1 441,80 zł. Składka zdrowotna jest osobno.",
  },
  {
    question: "Czy kalkulator zastępuje księgowego?",
    answer:
      "Nie. To uproszczony model bez ulg typu IP Box, rozliczenia z małżonkiem i stawek zależnych od PKD. Decyzję warto potwierdzić z księgowym.",
  },
];

export default function KalkulatorPodatkowyPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs items={[{ label: "Kalkulator podatkowy" }]} />

        <section className="pt-16 pb-6">
          <div className="container-wide max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="text-center lg:text-left">
                <p className="section-label mb-3">Narzędzie</p>
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Kalkulator JDG 2026
                </h1>
                <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                  Porównaj ryczałt, podatek liniowy i skalę podatkową.
                </p>
                <ul className="mt-4 space-y-2">
                  {[
                    "ZUS, zdrowotna i VAT",
                    "Koszty prywatne i samochód",
                    "Aktualne stawki i progi 2026",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <svg
                        className="shrink-0 mt-0.5 text-accent"
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
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative mx-auto lg:mx-0 w-full max-w-md">
                <div className="rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-black/30 border border-gray-100 dark:border-gray-800">
                  <Image
                    src="/photos/tax-calculation/calculator.jpg"
                    alt="Kalkulator podatkowy JDG 2026"
                    width={480}
                    height={320}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 w-24 h-16 rounded-xl overflow-hidden shadow-lg border-2 border-white dark:border-gray-900">
                  <Image
                    src="/photos/tax-calculation/urzad-skarbowy-plate.jpg"
                    alt="Urząd Skarbowy"
                    width={96}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-3 -right-3 w-16 h-16 rounded-xl overflow-hidden shadow-lg border-2 border-white dark:border-gray-900">
                  <Image
                    src="/photos/tax-calculation/coin.jpg"
                    alt="Finanse"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje kalkulatora JDG 2026"
            tabs={[
              {
                label: "Kalkulator",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-6xl min-[1800px]:max-w-none mx-auto">
                      <NazwaNarzedzia href="/kalkulator-podatkowy" />
                      <TaxCalculator />
                    </div>
                  </div>
                ),
              },
              {
                label: "Jak działa",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl space-y-8">
                      <div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                          Jak działa kalkulator
                        </h2>
                        <div className="space-y-4 text-gray-600 dark:text-gray-400">
                          <p>
                            Dla każdej formy liczy składki ZUS, zdrowotną,
                            podatek, VAT i kwotę do dyspozycji. Najwyższa kwota
                            do dyspozycji to najkorzystniejsza forma.
                          </p>
                          <p>
                            Uwzględnia pełny i mały ZUS, ulgę na start, mały ZUS
                            Plus, VAT czynny, zwolniony i marżę, koszty prywatne
                            oraz samochód firmowy lub mieszany.
                          </p>
                          <p>
                            Ryczałt przegrywa zwykle przy wysokich kosztach i
                            stawce 15% lub 17%. Więcej:{" "}
                            <Link
                              href="/strefa-wiedzy/ryczalt-czy-liniowy"
                              className="text-accent hover:underline"
                            >
                              ryczałt czy liniowy w 2026
                            </Link>
                            .
                          </p>
                        </div>
                      </div>

                      <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
                        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                          Potrzebujesz pomocy z wyborem formy opodatkowania?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          Przy złożonej sytuacji porozmawiaj z ekspertem.
                        </p>
                        <Link
                          href="/kontakt"
                          className="btn-primary px-8 py-3 text-base"
                        >
                          Zamów diagnozę
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
                    <div className="max-w-3xl">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Najczęstsze pytania
                      </h2>
                      <div className="space-y-3">
                        {faqs.map((faq) => (
                          <details
                            key={faq.question}
                            className="group rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60"
                          >
                            <summary className="flex items-center justify-between cursor-pointer p-6 text-gray-900 dark:text-white font-medium list-none">
                              {faq.question}
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
                            <div className="px-6 pb-6 text-sm text-gray-600 dark:text-gray-400">
                              {faq.answer}
                            </div>
                          </details>
                        ))}
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Źródła i artykuły",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl space-y-8">
                      <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40 p-6 space-y-4 text-sm text-gray-600 dark:text-gray-400">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                          Źródła i aktualność
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium text-gray-700 dark:text-gray-300">
                              Ostatnia aktualizacja
                            </p>
                            <p>Marzec 2026</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700 dark:text-gray-300">
                              Rok podatkowy
                            </p>
                            <p>2026</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700 dark:text-gray-300">
                              Źródła stawek
                            </p>
                            <p>
                              Ustawa o PIT, ustawa o zryczałtowanym podatku,
                              ustawa o świadczeniach opieki zdrowotnej,
                              obwieszczenia ZUS
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700 dark:text-gray-300">
                              Podstawy wymiaru ZUS
                            </p>
                            <p>
                              Prognozowane przeciętne wynagrodzenie: 9 420 zł,
                              minimalne wynagrodzenie: 4 806 zł, przeciętne
                              wynagrodzenie z IV kwartału 2025 r. (ryczałt): 9
                              228,64 zł
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-5">
                          Powiązane artykuły
                        </h2>
                        <div className="grid md:grid-cols-2 gap-3">
                          {[
                            {
                              href: "/strefa-wiedzy/jaka-forma-opodatkowania-jdg-2026",
                              title: "Jaka forma opodatkowania JDG w 2026?",
                              description:
                                "Porównanie skali, liniowego i ryczałtu, kryteria wyboru, progi, pułapki.",
                            },
                            {
                              href: "/strefa-wiedzy/ryczalt-czy-liniowy",
                              title:
                                "Ryczałt czy liniowy, co się bardziej opłaca",
                              description:
                                "Kiedy ryczałt wygrywa, kiedy przegrywa i jak to policzyć.",
                            },
                            {
                              href: "/strefa-wiedzy/maly-zus-plus-kiedy-sie-oplaca",
                              title: "Mały ZUS Plus, kiedy się opłaca",
                              description:
                                "Warunki, limity i realne oszczędności.",
                            },
                          ].map((article) => (
                            <Link
                              key={article.href}
                              href={article.href}
                              className="block p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60 hover:border-accent/30 dark:hover:border-accent/50 transition-colors group"
                            >
                              <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors mb-1">
                                {article.title}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {article.description}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                          Chcesz zautomatyzować procesy w firmie?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          Automatyzujemy raportowanie, integracje i obsługę
                          leadów. Porozmawiajmy.
                        </p>
                        <Link
                          href="/kontakt"
                          className="btn-primary px-8 py-3.5 text-base"
                        >
                          Zamów diagnozę procesu
                        </Link>
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </main>

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      <Footer />
    </>
  );
}
