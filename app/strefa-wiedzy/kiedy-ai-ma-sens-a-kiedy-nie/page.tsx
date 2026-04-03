import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Kiedy AI ma sens w firmie, a kiedy nie | Fluxlab",
  description:
    "Jak ocenić, czy AI ma sens w Twojej firmie. Prosty framework decyzji: wolumen, powtarzalność, jakość danych, koszt błędu i rola człowieka.",
  openGraph: {
    title: "Kiedy AI ma sens w firmie, a kiedy nie | Fluxlab",
    description:
      "Jak ocenić, czy AI ma sens w Twojej firmie. Prosty framework decyzji: wolumen, powtarzalność, jakość danych, koszt błędu i rola człowieka.",
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
    canonical: "/strefa-wiedzy/kiedy-ai-ma-sens-a-kiedy-nie",
  },
};

export default function KiedyAiMaSensPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Strefa wiedzy", href: "/strefa-wiedzy" }, { label: "Kiedy AI ma sens, a kiedy nie" }]} />
        {/* Hero */}
        <section className="bg-gray-50 dark:bg-gray-900/50 py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-label">Strefa wiedzy</span>
              <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                Kiedy AI ma sens, a kiedy nie
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Najdroższy błąd to wdrożyć AI tylko dlatego, że „wszyscy już to
                robią". Drugi najdroższy to odrzucić AI tam, gdzie mogłoby
                szybko odciążyć zespół. Potrzebujesz prostego filtra
                decyzyjnego, a nie kolejnego sloganu.
              </p>
            </div>
          </div>
        </section>

        {/* AI ma sens, gdy… */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                AI ma sens, gdy…
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                AI ma sens wtedy, gdy:
              </p>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400 mb-6">
                <li>proces dotyczy dużej liczby podobnych danych lub treści,</li>
                <li>da się określić oczekiwany wynik,</li>
                <li>jakość danych wejściowych jest wystarczająca,</li>
                <li>
                  koszt błędu nie jest katastrofalny albo można go kontrolować,
                </li>
                <li>człowiek nie musi analizować wszystkiego od zera.</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Jeśli te warunki są spełnione, AI zwykle pomaga.
              </p>
            </div>
          </div>
        </section>

        {/* AI nie ma sensu, gdy… */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                AI nie ma sensu, gdy…
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                AI nie ma sensu wtedy, gdy proces jest rzadki, nieuporządkowany,
                oparty na chaosie danych albo wymaga stuprocentowej trafności
                bez walidacji. Nie ma też sensu, gdy firma nie wie jeszcze, jaki
                problem chce rozwiązać.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Wtedy AI staje się tylko drogim dodatkiem do źle zaprojektowanego
                procesu.
              </p>
            </div>
          </div>
        </section>

        {/* Prosty test */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Prosty test
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Zadaj sobie pięć pytań:
              </p>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400 mb-6">
                <li>Czy ten proces powtarza się często?</li>
                <li>Czy dane wejściowe są w miarę uporządkowane?</li>
                <li>Czy wynik da się ocenić jako dobry lub zły?</li>
                <li>Czy można dodać kontrolę człowieka?</li>
                <li>Czy oszczędność czasu lub jakości jest realna?</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Im więcej odpowiedzi „tak", tym większy sens ma wdrożenie.
              </p>
            </div>
          </div>
        </section>

        {/* Najpierw proces, potem AI */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Najpierw proces, potem AI
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Jeżeli proces jest słaby, AI go nie naprawi. Najpierw trzeba
                ustalić logikę działania, odpowiedzialność i przepływ danych.
                Dopiero potem dodawać warstwę AI.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="bg-accent/10 rounded-2xl p-8 lg:p-12 text-center">
                <p className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Nie wiesz, czy AI ma sens w Twoim procesie?
                </p>
                <Link href="/automatyzacja-ai" className="btn-primary">
                  Zobacz usługę Automatyzacja AI
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
