import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Jak zautomatyzować raportowanie w firmie | Fluxlab",
  description:
    "Jak krok po kroku zautomatyzować raportowanie sprzedaży, marketingu i operacji. Mniej ręcznej pracy, spójne dane i szybsze decyzje.",
};

export default function AutomatyzacjaRaportowaniaArticle() {
  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="bg-gray-50 dark:bg-gray-900/50 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Jak zautomatyzować raportowanie w firmie
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Ręczne raportowanie wygląda niewinnie, dopóki nie policzysz, ile
              czasu kosztuje i jak często prowadzi do rozjazdu danych.
              Automatyzacja raportowania nie polega na zrobieniu
              &bdquo;ładnego dashboardu&rdquo;, tylko na tym, żeby liczby były
              spójne, regularne i gotowe wtedy, kiedy są potrzebne.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-16">
            {/* Section 1 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Zacznij od definicji, nie od narzędzia
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Najpierw trzeba ustalić, co dokładnie chcesz mierzyć. Bez tego
                nawet najlepszy dashboard niczego nie naprawi. Rozpisz
                wskaźniki, definicje i źródła danych. Jeden wskaźnik powinien
                znaczyć dokładnie to samo dla wszystkich.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Typowe pytania:
              </p>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-accent shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  skąd bierzemy leady,
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-accent shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  co liczymy jako sprzedaż,
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-accent shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  kto odpowiada za poprawność danych,
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-accent shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  jak często raport ma być gotowy.
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Uporządkuj źródła danych
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Raportowanie najczęściej psuje się dlatego, że dane siedzą w
                kilku miejscach: CRM, arkusze, formularze, kampanie, systemy
                operacyjne. Jeśli nie ustalisz, które źródło jest nadrzędne, to
                raport będzie tylko ładniejszą wersją chaosu.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Dopiero po ustaleniu źródeł danych ma sens łączenie ich w jeden
                proces.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Zautomatyzuj pobieranie i dostarczanie
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                W praktyce automatyzacja raportowania oznacza trzy rzeczy:
              </p>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-accent shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  dane zbierają się same,
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-accent shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  logika obliczeń jest ustalona raz,
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-accent shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  gotowy raport trafia automatycznie do właściwych osób.
                </li>
              </ul>
              <p className="mt-6 text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Nie zawsze potrzebujesz rozbudowanego BI. Czasem wystarczy
                poprawnie zbudowany raport w arkuszu, PDF albo mail wysyłany
                cyklicznie.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Najważniejszy efekt
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Największą korzyścią nie jest oszczędność kilku godzin
                miesięcznie. Największą korzyścią jest to, że firma wreszcie
                pracuje na tych samych liczbach i może podejmować decyzje
                szybciej.
              </p>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/50 p-8 lg:p-12 text-center">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Masz dane w kilku miejscach i nie ufasz raportom?
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
