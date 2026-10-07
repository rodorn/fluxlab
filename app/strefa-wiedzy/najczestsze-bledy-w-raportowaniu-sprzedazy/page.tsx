import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";

export const metadata: Metadata = {
  title: "Najczęstsze błędy w raportowaniu sprzedaży | Fluxlab",
  description:
    "Sprawdź najczęstsze błędy w raportowaniu sprzedaży: złe definicje, rozjazd danych, vanity metrics i ręczne arkusze, które fałszują obraz biznesu.",
  openGraph: {
    title: "Najczęstsze błędy w raportowaniu sprzedaży | Fluxlab",
    description:
      "Sprawdź najczęstsze błędy w raportowaniu sprzedaży: złe definicje, rozjazd danych, vanity metrics i ręczne arkusze, które fałszują obraz biznesu.",
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
    canonical: "/strefa-wiedzy/najczestsze-bledy-w-raportowaniu-sprzedazy",
  },
};

export default function BledyRaportowanieArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Najczęstsze błędy w raportowaniu sprzedaży" },
          ]}
        />

        {/* Kompaktowy nagłówek */}
        <section className="pt-24 pb-10">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Najczęstsze błędy w raportowaniu sprzedaży
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Ładny raport może być bezużyteczny. Winne są zwykle definicje i ręczna
              obróbka danych, nie wykresy.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-10">
            <ol className="space-y-6">
              {[
                ["Brak wspólnej definicji", "Gdy „lead” znaczy co innego dla każdego, raport jest fałszywy od początku."],
                ["Ręczne sklejanie źródeł", "CRM, Excel i maile składane ręcznie dają opóźnienia i błędy."],
                ["Vanity metrics", "Liczba leadów bez jakości, czasu reakcji i konwersji niewiele mówi."],
                ["Brak właściciela danych", "Jeśli nikt nie odpowiada za dane w CRM, same się nie poprawią."],
              ].map(([t, d], i) => (
                <li key={t}>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {i + 1}. {t}
                  </h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">{d}</p>
                </li>
              ))}
            </ol>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Jak to naprawić
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Najpierw definicje, potem porządek w CRM (
                <Link href="/automatyzacja-leadow-crm" className="text-accent hover:underline">
                  automatyzacja CRM
                </Link>
                ), na końcu{" "}
                <Link href="/automatyzacja-raportowania" className="text-accent hover:underline">
                  automatyzacja raportowania
                </Link>
                . Inaczej zautomatyzujesz bałagan.
              </p>
            </section>

            <PrevNextArticle currentHref="/strefa-wiedzy/najczestsze-bledy-w-raportowaniu-sprzedazy" />

            <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/50 p-8 text-center">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Nie masz pewności, czy raporty pokazują prawdę?
              </p>
              <Link href="/automatyzacja-raportowania" className="btn-primary mt-6 inline-block">
                Zobacz usługę Automatyzacja raportowania
              </Link>
            </div>
          </div>
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
            headline: "Najczęstsze błędy w raportowaniu sprzedaży",
            description:
              "Sprawdź najczęstsze błędy w raportowaniu sprzedaży: złe definicje, rozjazd danych, vanity metrics i ręczne arkusze, które fałszują obraz biznesu.",
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
    </>
  );
}
