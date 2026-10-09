import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import CarConfigurator from "./CarConfigurator";
import Breadcrumbs from "@/components/Breadcrumbs";
import Tabs from "@/components/Tabs";
import NazwaNarzedzia from "@/components/NazwaNarzedzia";

export const metadata: Metadata = {
  title: "Dobór samochodu, znajdź auto dla siebie | Fluxlab",
  description:
    "Interaktywny kreator doboru samochodu. Dopasuj segment, nadwozie, napęd i moc do realnych potrzeb, bez marketingowej ściemy.",
  openGraph: {
    title: "Dobór samochodu, znajdź auto dla siebie | Fluxlab",
    description:
      "Interaktywne narzędzie do doboru samochodu. Dopasuj segment, nadwozie i moc do swoich potrzeb.",
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
    canonical: "/dobor-samochodu",
  },
};

const faqs = [
  {
    question: "Skąd wiadomo, że rekomendacja jest trafna?",
    answer:
      "Kreator działa na regułach, nie zgaduje. Każda odpowiedź odsiewa segmenty, nadwozia i moce, które nie spełniają warunków. Na końcu dostajesz profil auta, nie jeden model.",
  },
  {
    question: "Elektryk, hybryda czy spalinowy, jak wybrać napęd?",
    answer:
      "Do 10 tys. km rocznie w mieście i z ładowaniem w domu: elektryk. 10 do 20 tys. km bez gniazdka: pełna hybryda. Powyżej 25 tys. km po trasach: diesel.",
  },
  {
    question: "Dlaczego sugerujecie segmenty, a nie konkretne modele?",
    answer:
      "Modele i wersje zmieniają się co roku, a profil (segment, nadwozie, napęd, moc) zostaje aktualny. Z nim przeglądasz bieżący rynek.",
  },
  {
    question: "Czy konfigurator nadaje się do wyboru auta służbowego?",
    answer:
      "Tak, zawęzi segment i napęd. Przy aucie firmowym dochodzą limity amortyzacji (150 tys. zł, dla elektryków 225 tys. zł) i warunki leasingu.",
  },
];

export default function DoborSamochoduPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs href="/dobor-samochodu" kolumna="srodek" items={[{ label: "Dobór samochodu" }]} />

        {/* Hero, kompaktowy */}
        <section className="pt-24 pb-12">
          <div className="container-wide max-w-3xl">
            <p className="section-label mb-4">Narzędzie</p>
            <h1 className="h1-strony">
              Dobierz idealny samochód
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Odpowiedz na kilka pytań, a podpowiemy segment, nadwozie i moc
              pasujące do Twojego stylu jazdy.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje doboru samochodu"
            tabs={[
              {
                label: "Kreator",
                content: (
                  <div className="py-8 lg:py-10">
                    <NazwaNarzedzia href="/dobor-samochodu" />
                    <CarConfigurator />
                  </div>
                ),
              },
              {
                label: "Jak działa",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl">
                      <h2 className="h2-sekcji mb-6">
                        Jak działa dobór samochodu
                      </h2>
                      <div className="space-y-4 text-gray-600 dark:text-gray-400">
                        <p>
                          Kreator odsiewa segmenty i napędy, które nie pasują do
                          Twoich odpowiedzi. Zostaje profil auta: zestaw
                          parametrów, w których opłaca się szukać.
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            <strong>Użycie.</strong> Trasy, roczny przebieg,
                            liczba osób, bagaż.
                          </li>
                          <li>
                            <strong>Budżet.</strong> Cena zakupu albo rata i
                            akceptowalny koszt utrzymania.
                          </li>
                          <li>
                            <strong>Priorytety.</strong> Ekonomia, komfort,
                            osiągi, przestrzeń.
                          </li>
                          <li>
                            <strong>Ograniczenia.</strong> Ładowanie w domu
                            (nocą prąd bywa najtańszy, co widać w{" "}
                            <Link
                              href="/ceny-energii-jutro"
                              className="text-accent hover:underline"
                            >
                              cenach energii na jutro
                            </Link>
                            ), garaż, długie trasy.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Co dalej",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl space-y-12">
                      <div>
                        <h2 className="h2-sekcji mb-6">
                          Co zrobić z rekomendacją kreatora
                        </h2>
                        <ol className="list-decimal pl-5 space-y-3 text-gray-600 dark:text-gray-400">
                          <li>
                            Zrób listę 8 do 12 modeli pasujących do profilu i
                            sprawdź ich ceny w ogłoszeniach.
                          </li>
                          <li>
                            Zawęź do 3 do 5 finalistów według niezawodności i
                            opinii właścicieli.
                          </li>
                          <li>
                            Policz roczny koszt każdego w{" "}
                            <Link
                              href="/kalkulator-kosztow"
                              className="text-accent hover:underline"
                            >
                              kalkulatorze kosztów
                            </Link>
                            . Różnica między podobnymi modelami to często 3 do
                            8 tys. zł rocznie.
                          </li>
                          <li>
                            Ogłoszenie przepuść przez{" "}
                            <Link
                              href="/sprawdz-auto"
                              className="text-accent hover:underline"
                            >
                              sprawdzenie auta przed zakupem
                            </Link>
                            , a auto z Niemiec przez{" "}
                            <Link
                              href="/import-radar"
                              className="text-accent hover:underline"
                            >
                              ImportRadar
                            </Link>
                            . Potem niezależny mechanik.
                          </li>
                          <li>
                            Dla firmy sprawdź wpływ auta na podatek w{" "}
                            <Link
                              href="/kalkulator-podatkowy"
                              className="text-accent hover:underline"
                            >
                              kalkulatorze podatkowym
                            </Link>
                            .
                          </li>
                        </ol>
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
                        <h2 className="h2-sekcji mb-8">
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
                        <h2 className="h2-sekcji mb-8">
                          Powiązane treści
                        </h2>
                        <div className="grid md:grid-cols-3 gap-4">
                          {[
                            {
                              href: "/kalkulator-kosztow",
                              title: "Kalkulator kosztów samochodu",
                              description:
                                "Roczny koszt utrzymania konkretnego modelu.",
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
                                "Ile z kosztu auta realnie odzyskasz.",
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

                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </main>
      <CTA />

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
            name: "Dobór samochodu",
            url: "https://fluxlab.pl/dobor-samochodu",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "PLN",
            },
            inLanguage: "pl-PL",
            description:
              "Interaktywny kreator doboru samochodu, rekomenduje segment, nadwozie i napęd na podstawie potrzeb użytkownika.",
          }),
        }}
      />

      <Footer />
    </>
  );
}
