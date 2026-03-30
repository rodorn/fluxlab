import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Integracje API w firmie — kiedy warto i kiedy nie | Fluxlab",
  description:
    "Kiedy integracje API mają sens w firmie, jakie problemy rozwiązują i w jakich przypadkach lepiej nie komplikować architektury.",
};

export default function IntegracjeApiArticle() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gray-50 dark:bg-gray-900/50 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Integracje API w firmie — kiedy warto?
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Integracje API brzmią technicznie, ale problem, który rozwiązują,
              jest bardzo biznesowy: Twoje systemy nie wymieniają danych same,
              więc robią to ludzie. To kosztuje czas, generuje błędy i tworzy
              bałagan. Pytanie nie brzmi więc &bdquo;czy robić API&rdquo;, tylko
              &bdquo;kiedy naprawdę jest to najlepsze rozwiązanie&rdquo;.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-16">
            {/* Section 1 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Kiedy integracje API mają sens
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                Integracja API ma sens wtedy, gdy w firmie istnieje kilka
                systemów, które powinny działać jak jeden proces. Typowy przykład
                to CRM, formularz leadowy, system mailingowy, ERP, system
                fakturowy albo baza danych. Gdy dane muszą przeskakiwać między
                nimi ręcznie, pojawia się opóźnienie i ryzyko błędu.
              </p>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                API sprawdza się szczególnie tam, gdzie:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
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
                  dane muszą być aktualne w czasie zbliżonym do rzeczywistego,
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
                  proces jest częsty,
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
                  liczy się spójność i brak dubli,
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
                  trzeba uruchamiać dalsze akcje po zmianie danych.
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Jakie problemy rozwiązuje API
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                Dzięki integracji API możesz automatycznie utworzyć leada w CRM,
                zaktualizować dane klienta w innym systemie, odpalić raport lub
                synchronizować statusy realizacji. Znika ręczne kopiowanie, a
                proces staje się przewidywalny.
              </p>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                Dodatkową korzyścią jest to, że API zwykle daje większą kontrolę
                i stabilność niż kombinowanie na eksporcie plików, mailach czy
                ręcznych obejściach.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Kiedy API nie jest najlepszym wyborem
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                Nie każdy problem wymaga integracji API. Jeżeli proces jest
                rzadki, prosty i nie ma dużej wartości biznesowej, to budowa
                integracji może być przerostem formy nad treścią. W takich
                przypadkach wystarczą prostsze automatyzacje no-code albo nawet
                dobrze zaprojektowana procedura ręczna.
              </p>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                Problemem nie jest samo API, tylko sytuacja, w której firma
                próbuje budować ciężką architekturę tam, gdzie wystarczyłby
                prostszy przepływ.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Jak podjąć decyzję
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                Sprawdź trzy rzeczy:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
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
                  jak często proces się wykonuje,
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
                  ile kosztuje ręczna obsługa,
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
                  ile szkód robią błędy lub opóźnienia.
                </li>
              </ul>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                Jeśli odpowiedź brzmi &bdquo;często, dużo i regularnie&rdquo;,
                integracja API zwykle jest uzasadniona.
              </p>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/50 p-8 lg:p-12 text-center">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Masz kilka systemów, które powinny wymieniać dane automatycznie?
              </p>
              <Link
                href="/integracje-api"
                className="btn-primary mt-6 inline-block"
              >
                Zobacz usługę Integracje API
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
