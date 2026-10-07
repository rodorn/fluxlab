import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";

export const metadata: Metadata = {
  title: "Jak policzyć ROI z automatyzacji | Fluxlab",
  description:
    "Zobacz, jak policzyć ROI z automatyzacji procesów biznesowych. Oszczędność czasu, koszt pracy, błędy, opóźnienia i wpływ na sprzedaż, bez marketingowej mgły.",
  openGraph: {
    title: "Jak policzyć ROI z automatyzacji | Fluxlab",
    description:
      "Zobacz, jak policzyć ROI z automatyzacji procesów biznesowych. Oszczędność czasu, koszt pracy, błędy, opóźnienia i wpływ na sprzedaż, bez marketingowej mgły.",
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
    canonical: "/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji",
  },
};

const faq = [
  {
    q: "Czy ROI z automatyzacji da się policzyć bez idealnych danych?",
    a: "Tak. Wystarczy uczciwe oszacowanie czasu, kosztu pracy i skali procesu.",
  },
  {
    q: "Co jeśli proces nie daje dużej oszczędności czasu?",
    a: "Sprawdź, czy nie poprawia jakości danych, przewidywalności albo czasu reakcji.",
  },
  {
    q: "Jaki proces najłatwiej policzyć?",
    a: "Zwykle raportowanie, obsługę leadów, CRM i zadania operacyjne.",
  },
  {
    q: "Czy małe wdrożenia też mają sens ekonomiczny?",
    a: "Tak. Małe, dobrze trafione wdrożenia często dają najlepszy stosunek kosztu do efektu.",
  },
];

const kroki = [
  ["Policz czas ręcznej pracy", "15 minut na zgłoszenie, 80 zgłoszeń miesięcznie = 20 godzin."],
  ["Przemnóż przez koszt godziny", "20 godzin x 90 zł = 1800 zł miesięcznie, 21 600 zł rocznie."],
  ["Dodaj koszt błędów i opóźnień", "Na przykład utracone leady i godziny poprawiania danych."],
  ["Załóż realistyczną poprawę", "Zwykle 50 do 80% mniej ręcznej pracy, nie 100%."],
  ["Porównaj z kosztem wdrożenia i utrzymania", "Wdrożenie 7000 zł przy rocznej korzyści 18 000 zł to prosta decyzja."],
];

export default function RoiAutomatyzacjiArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs kolumna="srodek"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Jak policzyć ROI z automatyzacji" },
          ]}
        />
        <section className="pt-16 pb-6">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Jak policzyć ROI z automatyzacji
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Wdrożenie jest odwlekane, bo nikt nie umie go obronić liczbami. A
              ROI da się policzyć prościej, niż się wydaje, bez idealnego modelu
              na start.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 font-mono text-center text-lg">
              ROI = (korzyść roczna &minus; koszt wdrożenia &minus; koszt
              utrzymania) / koszt wdrożenia
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
              Co liczyć
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong className="text-gray-900 dark:text-white">Koszty:</strong>{" "}
              wdrożenie (analiza, konfiguracja, integracje, testy), utrzymanie
              (abonamenty, monitoring, poprawki) i czas Twojego zespołu przy
              wdrożeniu.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong className="text-gray-900 dark:text-white">Korzyści:</strong>{" "}
              zaoszczędzone godziny, mniej błędów, szybsza reakcja na leady i
              mniej ręcznej koordynacji. Nie licz tylko czasu kliknięcia,
              poprawki i opóźnienia też kosztują.
            </p>

            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
              Model w pięciu krokach
            </h2>
            <ol className="list-decimal pl-5 space-y-3 text-gray-600 dark:text-gray-400 mb-6">
              {kroki.map(([t, d]) => (
                <li key={t}>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {t}.
                  </span>{" "}
                  {d}
                </li>
              ))}
            </ol>

            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
              Przykład: obsługa leadów
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              8 minut na leada, 180 leadów miesięcznie, czyli 24 godziny i 24 480
              zł rocznie przy 85 zł za godzinę. Po{" "}
              <Link
                href="/automatyzacja-leadow-crm"
                className="text-accent hover:underline"
              >
                automatyzacji leadów
              </Link>{" "}
              70% mniej pracy daje 17 136 zł rocznie.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Wdrożenie 6500 zł plus utrzymanie 200 zł miesięcznie to 8900 zł w
              pierwszym roku. Korzyść netto: ponad 8200 zł.
            </p>

            <div className="mt-12 bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Policzymy ROI dla Twojego procesu
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Bezpłatna diagnoza, bez zobowiązań.
              </p>
              <Link href="/kontakt" className="btn-primary inline-block">
                Zamów diagnozę procesu
              </Link>
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
              FAQ
            </h2>
            <dl className="space-y-5">
              {faq.map((f) => (
                <div key={f.q}>
                  <dt className="font-semibold text-gray-900 dark:text-white">
                    {f.q}
                  </dt>
                  <dd className="mt-1 text-gray-600 dark:text-gray-400">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 mt-12">
              Powiązane
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href="/strefa-wiedzy/jak-zautomatyzowac-raportowanie-w-firmie"
                  className="text-accent hover:underline"
                >
                  Jak zautomatyzować raportowanie w firmie
                </Link>
              </li>
              <li>
                <Link
                  href="/automatyzacja-raportowania"
                  className="text-accent hover:underline"
                >
                  Automatyzacja raportowania
                </Link>
              </li>
              <li>
                <Link
                  href="/integracje-api"
                  className="text-accent hover:underline"
                >
                  Integracje API
                </Link>
              </li>
            </ul>
          </div>

          <div className="max-w-3xl mx-auto mt-16">
            <PrevNextArticle currentHref="/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji" />
          </div>
        </div>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Jak policzyć ROI z automatyzacji",
            description:
              "Zobacz, jak policzyć ROI z automatyzacji procesów biznesowych. Oszczędność czasu, koszt pracy, błędy, opóźnienia i wpływ na sprzedaż, bez marketingowej mgły.",
            datePublished: "2026-03-30",
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
            mainEntity: faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </>
  );
}
