import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "Zapier vs Make, co wybrać do automatyzacji w 2026 | Fluxlab",
  description:
    "Praktyczne porównanie Zapier i Make w 2026: pricing, integracje, logika, krzywa nauki i koszt na dużą skalę. Konkretne kryteria wyboru dla firm B2B.",
  openGraph: {
    title: "Zapier vs Make, co wybrać do automatyzacji w 2026 | Fluxlab",
    description:
      "Praktyczne porównanie Zapier i Make w 2026: pricing, integracje, logika, krzywa nauki i koszt na dużą skalę. Konkretne kryteria wyboru dla firm B2B.",
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
    canonical: "/strefa-wiedzy/zapier-vs-make",
  },
};

export default function ZapierVsMakeArticle() {
  const faqItems = [
    {
      question: "Czy Make jest tańszy od Zapiera w długim okresie?",
      answer:
        "Tak, w większości scenariuszy. Make rozlicza operacje, Zapier taski, a operacja w Make jest kilka razy tańsza. Przy kilku tysiącach operacji miesięcznie różnica rośnie szybko.",
    },
    {
      question: "Który jest łatwiejszy do nauki, Zapier czy Make?",
      answer:
        "Zapier. Ma liniowy interfejs krok po kroku. Make wymaga zrozumienia diagramu, routerów i agregatorów, ale daje dużo większe możliwości.",
    },
    {
      question: "Czy możemy przenieść automatyzacje z Zapiera do Make?",
      answer:
        "Nie ma automatycznego importu, scenariusze trzeba odbudować. Kilka prostych Zapów to jeden dzień pracy. Przy większym ekosystemie można migrować stopniowo: nowe automatyzacje w Make, stare zostają w Zapierze.",
    },
    {
      question: "Co z RODO i przetwarzaniem danych w UE?",
      answer:
        "Make należy do grupy Celonis i ma serwery w UE. Zapier ma siedzibę w USA. Oba podpisują DPA, ale przy danych wrażliwych Make jest zwykle prostszym wyborem.",
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs href="/strefa-wiedzy/zapier-vs-make" kolumna="srodek"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Zapier vs Make" },
          ]}
        />
        <section className="bg-gray-50 dark:bg-gray-900/50 pt-16 pb-6">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="h1-artykulu mt-4">
              Zapier vs Make, co wybrać do automatyzacji w 2026
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Oba narzędzia łączą setki aplikacji i ruszają w godzinę. Różnią
              się pricingiem, logiką scenariuszy i krzywą nauki. Pokazujemy,
              kiedy wybrać który.
            </p>
          </div>
        </section>

        <div id="sekcje" className="scroll-mt-20 container-wide pb-12">
          <Tabs
            ariaLabel="Rozdziały artykułu Zapier vs Make"
            tabs={[
              {
                label: "Jak działają",
                content: (
                  <div className="max-w-3xl mx-auto px-6 lg:px-8 py-6 lg:py-8">
                    <h2 className="h2-sekcji mb-6">
                      Zapier, jak działa i dla kogo
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Zapier ma ponad 6 000 integracji i prowadzi użytkownika
                      krok po kroku. Każdy Zap to trigger i jedna lub więcej
                      akcji, a każda akcja to jeden rozliczany task.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                      <li>Free: 100 tasków/mies., tylko jedna akcja</li>
                      <li>
                        Professional: od ok. 19,99 USD/mies., wieloetapowe Zapy,
                        webhooki
                      </li>
                      <li>
                        Team: od ok. 69 USD/mies., współdzielone foldery, role
                      </li>
                    </ul>
                    <p className="text-gray-600 dark:text-gray-400 mb-10">
                      Dobry wybór, gdy chcesz szybko ruszyć bez dewelopera i
                      potrzebujesz prostych integracji typu „przepisz dane z A
                      do B".
                    </p>

                    <h2 className="h2-sekcji mb-6">
                      Make, jak działa i dla kogo
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Make (dawniej Integromat) zamiast liniowego flow ma
                      wizualny diagram z routerami, iteratorami i agregatorami.
                      Rozlicza operacje, czyli pojedyncze wywołania modułów.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                      <li>Free: 1 000 operacji/mies., 2 aktywne scenariusze</li>
                      <li>Core: od ok. 9 USD/mies. za 10 000 operacji</li>
                      <li>Pro: od ok. 16 USD/mies.</li>
                      <li>Teams: od ok. 29 USD/mies., role, audit log</li>
                    </ul>
                    <p className="text-gray-600 dark:text-gray-400">
                      Wybór dla złożonych procesów z warunkami i pętlami.
                      Świetnie sprawdza się w{" "}
                      <Link
                        href="/automatyzacja-leadow-crm"
                        className="text-accent hover:underline"
                      >
                        automatyzacji CRM
                      </Link>{" "}
                      i przy dużych wolumenach danych.
                    </p>
                  </div>
                ),
              },
              {
                label: "Pricing",
                content: (
                  <div className="max-w-3xl mx-auto px-6 lg:px-8 py-6 lg:py-8">
                    <h2 className="h2-sekcji mb-6">
                      Pricing w praktyce, gdzie się rozjeżdża
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Przykład: lead z formularza, walidacja, sprawdzenie w CRM,
                      utworzenie lub aktualizacja rekordu i powiadomienie na
                      Slacku. W Zapierze to ok. 5 tasków, w Make ok. 7 operacji.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Przy 100 leadach dziennie wychodzi 15 000 tasków albo 21
                      000 operacji miesięcznie. Zapier kosztuje wtedy ok. 70 do
                      100 USD/mies., Make ok. 16 do 25 USD.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Do kilkuset operacji miesięcznie Zapier wychodzi
                      porównywalnie. Powyżej 5 000 operacji wygrywa Make.
                    </p>
                  </div>
                ),
              },
              {
                label: "Integracje i nauka",
                content: (
                  <div className="max-w-3xl mx-auto px-6 lg:px-8 py-6 lg:py-8">
                    <h2 className="h2-sekcji mb-6">
                      Integracje i pokrycie aplikacji
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-10">
                      Zapier ma ok. 6 000 integracji, Make ok. 1 800, ale
                      popularne SaaS-y (HubSpot, Pipedrive, Slack, Google
                      Workspace) są w obu. Make często daje więcej akcji na
                      aplikację. Gdy integracji brak, zostaje{" "}
                      <Link
                        href="/integracje-api"
                        className="text-accent hover:underline"
                      >
                        integracja przez API
                      </Link>
                      .
                    </p>

                    <h2 className="h2-sekcji mb-6">
                      Krzywa nauki i utrzymanie
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Zapier łatwiej zacząć. Make lepiej utrzymać: debug
                      pokazuje dane z każdego modułu, a scenariusz z 10+ krokami
                      wciąż jest jednym czytelnym diagramem. W Zapierze taki Zap
                      z filtrami i ścieżkami szybko staje się trudny.
                    </p>
                  </div>
                ),
              },
              {
                label: "Logika i compliance",
                content: (
                  <div className="max-w-3xl mx-auto px-6 lg:px-8 py-6 lg:py-8">
                    <h2 className="h2-sekcji mb-6">
                      Logika i obsługa błędów
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Make ma natywnie elementy, które w Zapierze wymagają
                      droższych planów albo obejść przez Code step:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-10">
                      <li>iteratory i agregatory list</li>
                      <li>routery z wieloma ścieżkami</li>
                      <li>obsługa błędów i ponawianie per moduł</li>
                    </ul>

                    <h2 className="h2-sekcji mb-6">
                      Compliance i RODO
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Make ma serwery w UE, Zapier działa globalnie z USA. Dla
                      branż regulowanych Make jest zwykle prostszy. Przy danych
                      wyjątkowo wrażliwych rozważ{" "}
                      <Link href="/n8n" className="text-accent hover:underline">
                        n8n self-hosted
                      </Link>
                      , opisane w artykule{" "}
                      <Link
                        href="/strefa-wiedzy/n8n-vs-zapier"
                        className="text-accent hover:underline"
                      >
                        n8n vs Zapier
                      </Link>
                      .
                    </p>
                  </div>
                ),
              },
              {
                label: "Który wybrać",
                content: (
                  <div className="max-w-3xl mx-auto px-6 lg:px-8 py-6 lg:py-8">
                    <h2 className="h2-sekcji mb-6">
                      Kiedy Zapier, a kiedy Make
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Wybierz Zapier, gdy:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                      <li>masz proste, liniowe automatyzacje</li>
                      <li>wolumen to do kilku tysięcy tasków miesięcznie</li>
                      <li>zespół potrzebuje „działa od jutra"</li>
                    </ul>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Wybierz Make, gdy:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                      <li>masz scenariusze z warunkami i pętlami</li>
                      <li>wolumen przekracza 5 000 operacji miesięcznie</li>
                      <li>potrzebujesz obsługi błędów i danych w UE</li>
                    </ul>
                    <p className="text-gray-600 dark:text-gray-400 mb-10">
                      Hybryda też ma sens: Zapier do prostych integracji
                      działowych, Make do procesów sprzedaży. Zanim wybierzesz,
                      policz{" "}
                      <Link
                        href="/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji"
                        className="text-accent hover:underline"
                      >
                        ROI z automatyzacji
                      </Link>
                      .
                    </p>

                    <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
                      <h2 className="h2-sekcji mb-6">
                        Nie wiesz, które narzędzie pasuje do Twoich procesów?
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Dobierzemy i wdrożymy platformę bez przepłacania za zbędne funkcje.
                      </p>
                      <Link href="/zapier-make" className="btn-primary inline-block">
                        Zobacz usługę Zapier i Make
                      </Link>
                    </div>
                  </div>
                ),
              },
              {
                label: "FAQ",
                content: (
                  <div className="max-w-3xl mx-auto px-6 lg:px-8 py-6 lg:py-8">
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
                ),
              },
            ]}
          />
        </div>

        <section className="py-8 lg:py-10">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <PrevNextArticle currentHref="/strefa-wiedzy/zapier-vs-make" />
          </div>
        </section>

        <section className="py-8 lg:py-10">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <CTA />
          </div>
        </section>

        <section className="py-8 lg:py-10">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Powiązane
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href="/strefa-wiedzy/zapier-make-n8n-porownanie"
                  className="text-accent hover:underline"
                >
                  Zapier vs Make vs n8n, porównanie 2026
                </Link>
              </li>
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
                  href="/zapier-make"
                  className="text-accent hover:underline"
                >
                  Zapier i Make, wdrożenia
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Zapier vs Make, co wybrać do automatyzacji w 2026",
            description:
              "Praktyczne porównanie Zapier i Make w 2026: pricing, integracje, logika, krzywa nauki i koszt na dużą skalę. Konkretne kryteria wyboru dla firm B2B.",
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
