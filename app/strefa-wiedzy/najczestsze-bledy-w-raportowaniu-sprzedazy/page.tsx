import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

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
        alt: "Fluxlab — Automatyzacja procesów biznesowych i CRM dla firm B2B",
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
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Strefa wiedzy", href: "/strefa-wiedzy" }, { label: "Najczęstsze błędy w raportowaniu sprzedaży" }]} />
        {/* Hero */}
        <section className="bg-gray-50 dark:bg-gray-900/50 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Najczęstsze błędy w raportowaniu sprzedaży
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Raport sprzedaży może wyglądać profesjonalnie i jednocześnie być
              kompletnie bezużyteczny. Problem zwykle nie leży w wykresach, tylko
              w złej logice, niespójnych definicjach i ręcznej obróbce danych.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-16">
            {/* Section 1 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Błąd 1: brak jednej definicji wskaźników
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Jeżeli dla jednej osoby &bdquo;lead&rdquo; oznacza każde
                zapytanie, a dla drugiej tylko kontakt zakwalifikowany, to raport
                od początku jest fałszywy. To samo dotyczy sprzedaży, szansy,
                spotkania czy utraty leada. Bez wspólnego słownika nie ma
                rzetelnego raportowania.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Błąd 2: raport z kilku ręcznie składanych źródeł
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Klasyczny problem: część danych jest w CRM, część w Excelu,
                część w mailu, a końcowy raport ktoś skleja ręcznie. To prawie
                gwarantuje opóźnienia, błędy i brak zaufania do liczb. Im więcej
                ręcznego przeklejania, tym mniejsza wiarygodność raportu.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Błąd 3: focus na vanity metrics
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Sama liczba leadów niewiele mówi, jeśli nie wiesz, jaka jest ich
                jakość, czas reakcji, konwersja i wpływ na wynik. Firmy często
                raportują to, co łatwo policzyć, zamiast tego, co naprawdę
                pomaga zarządzać sprzedażą.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Błąd 4: brak właściciela danych
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Jeżeli nikt nie odpowiada za jakość danych w CRM, raport zawsze
                będzie miał wady. Dane nie poprawiają się same.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Jak to naprawić
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Najpierw ustal definicje. Potem uporządkuj CRM i źródła danych.
                Dopiero później automatyzuj raport. W przeciwnym razie
                zautomatyzujesz bałagan.
              </p>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/50 p-8 lg:p-12 text-center">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Masz raporty, ale nie masz pewności, czy pokazują prawdę?
              </p>
              <Link
                href="/automatyzacja-raportowania"
                className="btn-primary mt-6 inline-block"
              >
                Zobacz usługę Automatyzacja raportowania
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
