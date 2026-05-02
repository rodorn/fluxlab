import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dziękuję — zgłoszenie odebrane | Fluxlab",
  description:
    "Twoje zgłoszenie do diagnozy procesu trafiło do mnie. Odpowiedź w ciągu 24h.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/dziekuje",
  },
};

export default function Dziekuje() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-10 lg:p-14 shadow-sm">
              <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center mb-6">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 13l5 5 11-11"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Mam Twoje zgłoszenie
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Odezwę się z odpowiedzią w ciągu 24h. Jeśli widzę potencjał na
                automatyzację, zaproponuję termin krótkiej rozmowy. Jeśli nie,
                napiszę wprost, dlaczego nie warto tego automatyzować na tym
                etapie.
              </p>

              <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-xl p-5 mb-8">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong className="text-gray-900 dark:text-white">
                    Tymczasem:
                  </strong>{" "}
                  jeśli chcesz przyspieszyć diagnozę, odpowiedz na ten mail
                  trzema rzeczami: skąd dziś wpadają leady, gdzie trafiają i co
                  zespół robi z nimi ręcznie. To zwykle wystarczy, żeby pokazać,
                  od którego kroku zacząć.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Zanim odpiszę, zobacz:
                </p>

                <Link
                  href="/automatyzacja-leadow-crm"
                  className="block group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-accent transition-colors"
                >
                  <p className="font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors">
                    Jak wygląda typowy proces po wdrożeniu
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Lead → walidacja → CRM → handlowiec → follow-up → raport.
                  </p>
                </Link>

                <Link
                  href="/jak-pracuje"
                  className="block group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-accent transition-colors"
                >
                  <p className="font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors">
                    Jak wygląda współpraca
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Diagnoza → mapa procesu → wdrożenie → dokumentacja.
                  </p>
                </Link>

                <Link
                  href="/strefa-wiedzy"
                  className="block group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-accent transition-colors"
                >
                  <p className="font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors">
                    Strefa wiedzy
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Praktyczne artykuły o automatyzacji, CRM i raportowaniu.
                  </p>
                </Link>
              </div>

              <p className="mt-8 text-xs text-gray-400 dark:text-gray-500 text-center">
                Brak maila ode mnie po 24h? Sprawdź spam albo napisz wprost na{" "}
                <a
                  href="mailto:iwanekpawel55@gmail.com"
                  className="text-accent hover:underline"
                >
                  iwanekpawel55@gmail.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
