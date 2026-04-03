import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Regulamin | Fluxlab",
  description:
    "Regulamin korzystania z serwisu fluxlab.pl. Warunki świadczenia usług automatyzacji procesów biznesowych.",
  openGraph: {
    title: "Regulamin | Fluxlab",
    description:
      "Regulamin korzystania z serwisu fluxlab.pl. Warunki świadczenia usług automatyzacji procesów biznesowych.",
    locale: "pl_PL",
    type: "website",
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
    canonical: "/regulamin",
  },
};

export default function Regulamin() {
  return (
    <>
      <Header />
      <main className="py-16 md:py-24">
        <div className="container-wide">
          <Breadcrumbs
            items={[
              { label: "Strona główna", href: "/" },
              { label: "Regulamin" },
            ]}
          />

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mt-8 mb-4">
            Regulamin
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-12">
            Ostatnia aktualizacja: 4 kwietnia 2026
          </p>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-10 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {/* 1 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                1. Postanowienia ogólne
              </h2>
              <p>
                Niniejszy Regulamin określa zasady korzystania z serwisu
                internetowego dostępnego pod adresem{" "}
                <Link href="/" className="text-accent hover:underline">
                  fluxlab.pl
                </Link>{" "}
                (dalej: „Serwis"), prowadzonego przez Fluxlab z siedzibą w
                Polsce (dalej: „Usługodawca").
              </p>
              <p className="mt-2">
                Korzystanie z Serwisu oznacza akceptację niniejszego Regulaminu.
                Jeśli nie zgadzasz się z jego postanowieniami, prosimy o
                niekorzystanie z Serwisu.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                2. Opis usług
              </h2>
              <p>
                Serwis służy do prezentacji oferty Usługodawcy w zakresie
                automatyzacji procesów biznesowych, wdrożeń CRM, integracji API,
                automatyzacji raportowania oraz powiązanych usług konsultingowych
                dla firm B2B. Za pośrednictwem Serwisu użytkownicy mogą:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Zapoznać się z ofertą i zakresem usług.</li>
                <li>
                  Przesłać zapytanie za pośrednictwem formularza kontaktowego.
                </li>
                <li>
                  Przeglądać materiały informacyjne dotyczące automatyzacji
                  procesów biznesowych.
                </li>
              </ul>
              <p className="mt-2">
                Szczegółowy zakres, warunki realizacji i wynagrodzenie za usługi
                konsultingowe ustalane są indywidualnie w odrębnej umowie
                zawieranej między Usługodawcą a klientem.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                3. Warunki korzystania z Serwisu
              </h2>
              <p>Korzystając z Serwisu, użytkownik zobowiązuje się do:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  Korzystania z Serwisu zgodnie z obowiązującymi przepisami
                  prawa i niniejszym Regulaminem.
                </li>
                <li>
                  Niepodejmowania działań mogących zakłócić prawidłowe
                  funkcjonowanie Serwisu.
                </li>
                <li>
                  Podawania prawdziwych danych w formularzu kontaktowym.
                </li>
              </ul>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                4. Własność intelektualna
              </h2>
              <p>
                Wszelkie treści zamieszczone w Serwisie — w tym teksty, grafiki,
                układ strony, logotypy i kod źródłowy — stanowią własność
                intelektualną Usługodawcy i są chronione przepisami prawa
                autorskiego oraz prawa własności przemysłowej.
              </p>
              <p className="mt-2">
                Kopiowanie, rozpowszechnianie lub wykorzystywanie materiałów z
                Serwisu w celach komercyjnych bez pisemnej zgody Usługodawcy
                jest zabronione.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                5. Odpowiedzialność
              </h2>
              <p>
                Usługodawca dokłada wszelkich starań, aby informacje
                zamieszczone w Serwisie były aktualne i rzetelne, jednak nie
                ponosi odpowiedzialności za:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  Czasową niedostępność Serwisu wynikającą z przyczyn
                  technicznych, konserwacji lub działania siły wyższej.
                </li>
                <li>
                  Skutki wynikające z korzystania z informacji zamieszczonych w
                  Serwisie w sposób niezgodny z ich przeznaczeniem.
                </li>
                <li>
                  Działania osób trzecich mogące wpłynąć na funkcjonowanie
                  Serwisu.
                </li>
              </ul>
              <p className="mt-2">
                W maksymalnym zakresie dopuszczalnym przez obowiązujące prawo
                odpowiedzialność Usługodawcy za szkody związane z korzystaniem z
                Serwisu jest wyłączona.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                6. Ochrona danych osobowych
              </h2>
              <p>
                Zasady przetwarzania danych osobowych użytkowników Serwisu
                określa{" "}
                <Link
                  href="/polityka-prywatnosci"
                  className="text-accent hover:underline"
                >
                  Polityka prywatności
                </Link>
                , stanowiąca integralną część niniejszego Regulaminu.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                7. Reklamacje
              </h2>
              <p>
                Reklamacje dotyczące działania Serwisu można zgłaszać za
                pośrednictwem formularza kontaktowego. Usługodawca rozpatrzy
                reklamację w terminie 14 dni od dnia jej otrzymania i
                poinformuje użytkownika o wyniku rozpatrzenia.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                8. Prawo właściwe i rozstrzyganie sporów
              </h2>
              <p>
                Niniejszy Regulamin podlega prawu polskiemu. Wszelkie spory
                wynikające z korzystania z Serwisu będą rozstrzygane przez sąd
                właściwy miejscowo dla siedziby Usługodawcy, chyba że przepisy
                prawa stanowią inaczej.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                9. Zmiany Regulaminu
              </h2>
              <p>
                Usługodawca zastrzega sobie prawo do zmiany niniejszego
                Regulaminu. O istotnych zmianach użytkownicy zostaną
                poinformowani za pośrednictwem Serwisu. Aktualna wersja
                Regulaminu jest zawsze dostępna pod adresem{" "}
                <Link
                  href="/regulamin"
                  className="text-accent hover:underline"
                >
                  fluxlab.pl/regulamin
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
