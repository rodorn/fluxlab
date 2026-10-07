import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarCostCalculator from "./CarCostCalculator";
import Breadcrumbs from "@/components/Breadcrumbs";
import Tabs from "@/components/Tabs";
import NazwaNarzedzia from "@/components/NazwaNarzedzia";

export const metadata: Metadata = {
  title: "Kalkulator kosztów samochodu | Fluxlab",
  description:
    "Oblicz pełny roczny koszt posiadania samochodu: paliwo, olej, opony, serwis, ubezpieczenie i utrata wartości. Poznaj realny koszt na kilometr.",
  openGraph: {
    title: "Kalkulator kosztów samochodu | Fluxlab",
    description:
      "Oblicz pełny roczny koszt posiadania samochodu: paliwo, serwis, opony, ubezpieczenie, spadek wartości.",
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
    canonical: "/kalkulator-kosztow",
  },
};

const faqs = [
  {
    question: "Jak policzyć koszt auta elektrycznego?",
    answer:
      "Zamiast litrów wpisz zużycie energii, np. 18 kWh/100 km, i cenę kWh. Pomiń olej i obniż serwis. Utratę wartości załóż ostrożniej niż przy spalinowym.",
  },
  {
    question: "Dlaczego amortyzacja potrafi być największą pozycją kosztu?",
    answer:
      "Auto traci zwykle 15 do 20% wartości w pierwszym roku i 8 do 12% w kolejnych. Przy aucie za 120 000 zł to 12 do 18 tys. zł rocznie, często więcej niż paliwo, ubezpieczenie i serwis razem.",
  },
  {
    question: "Czy auto firmowe w JDG jest tańsze od prywatnego?",
    answer:
      "Zwykle tak, ale mniej niż się wydaje: w praktyce 15 do 25% całkowitego kosztu. Formę rozliczenia policzysz w kalkulatorze podatkowym.",
  },
  {
    question: "Czy leasing obniża realny koszt auta?",
    answer:
      "Nie, przenosi go. Suma rat i wykupu jest zbliżona do zakupu za gotówkę. Zyskujesz płynność i ratę w kosztach firmy.",
  },
];

export default function KalkulatorKosztowPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs items={[{ label: "Kalkulator kosztów" }]} />

        {/* Hero, kompaktowy */}
        <section className="pt-24 pb-12">
          <div className="container-wide text-center max-w-3xl mx-auto">
            <p className="section-label mb-4">Narzędzie</p>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Kalkulator kosztów samochodu
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ile naprawdę kosztuje auto: paliwo, olej, opony, serwis,
              ubezpieczenie i utrata wartości.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje kalkulatora kosztów samochodu"
            tabs={[
              {
                label: "Kalkulator",
                content: (
                  <div className="py-8 lg:py-10">
                    <NazwaNarzedzia href="/kalkulator-kosztow" />
                    <CarCostCalculator />
                  </div>
                ),
              },
              {
                label: "Jak liczymy",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Jak liczymy koszt samochodu
                      </h2>
                      <div className="space-y-4 text-gray-600 dark:text-gray-400">
                        <p>
                          Kalkulator sumuje sześć składników rocznie i rozkłada
                          je na miesiąc i kilometr. Każdą liczbę możesz
                          nadpisać własnymi danymi.
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            <strong>Paliwo.</strong> Przebieg × realne zużycie ×
                            cena. Realne zużycie jest zwykle o 15 do 25% wyższe
                            niż katalogowe.
                          </li>
                          <li>
                            <strong>Olej i płyny.</strong> Zwykle 400 do 800 zł
                            rocznie.
                          </li>
                          <li>
                            <strong>Opony.</strong> Dwa komplety i sezonowe
                            wymiany: 1 500 do 4 000 zł rocznie.
                          </li>
                          <li>
                            <strong>Serwis.</strong> Dla 4 do 8-letniego auta
                            segmentu C około 2 000 do 4 000 zł rocznie.
                          </li>
                          <li>
                            <strong>Ubezpieczenie.</strong> Twoja roczna polisa
                            OC, AC i NNW.
                          </li>
                          <li>
                            <strong>Utrata wartości.</strong> Zwykle największa
                            pozycja, choć nie widać jej na żadnym rachunku.
                          </li>
                        </ul>
                        <p>
                          Porównuj koszt na kilometr i zawsze dwa auta naraz.
                          Przy elektryku sprawdź{" "}
                          <Link
                            href="/ceny-energii-jutro"
                            className="text-accent hover:underline"
                          >
                            ceny energii na jutro
                          </Link>
                          , a cenę z ogłoszenia w{" "}
                          <Link
                            href="/sprawdz-auto"
                            className="text-accent hover:underline"
                          >
                            sprawdzeniu auta przed zakupem
                          </Link>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "FAQ",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl space-y-12">
                      <div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                          Najczęstsze pytania
                        </h2>
                        <div className="space-y-4">
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

                      <div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                          Powiązane treści
                        </h2>
                        <div className="grid md:grid-cols-3 gap-4">
                          {[
                            {
                              href: "/dobor-samochodu",
                              title: "Dobór samochodu, interaktywny kreator",
                              description:
                                "Dobierz segment, nadwozie i napęd.",
                            },
                            {
                              href: "/kalkulator-podatkowy",
                              title: "Kalkulator JDG 2026",
                              description:
                                "Wpływ auta firmowego na podatek.",
                            },
                            {
                              href: "/strefa-wiedzy/jaka-forma-opodatkowania-jdg-2026",
                              title: "Jaka forma opodatkowania JDG w 2026?",
                              description:
                                "Ile z kosztu auta odzyskasz.",
                            },
                          ].map((article) => (
                            <Link
                              key={article.href}
                              href={article.href}
                              className="block p-6 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60 hover:border-accent/30 dark:hover:border-accent/50 transition-colors group"
                            >
                              <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors mb-2">
                                {article.title}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {article.description}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-10 text-center">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                          Potrzebujesz automatyzacji procesów w firmie?
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">
                          Automatyzujemy raporty kosztów floty i integracje z
                          księgowością.
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

      {/* WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Kalkulator kosztów samochodu",
            url: "https://fluxlab.pl/kalkulator-kosztow",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "PLN",
            },
            inLanguage: "pl-PL",
            description:
              "Kalkulator rocznego kosztu posiadania samochodu: paliwo, olej, opony, serwis, ubezpieczenie, utrata wartości. Koszt na kilometr i miesiąc.",
          }),
        }}
      />

      <Footer />
    </>
  );
}
