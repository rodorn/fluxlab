import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Polityka prywatności | Fluxlab",
  description:
    "Polityka prywatności serwisu fluxlab.pl. Dowiedz się, jak przetwarzamy Twoje dane osobowe zgodnie z RODO.",
  openGraph: {
    title: "Polityka prywatności | Fluxlab",
    description:
      "Polityka prywatności serwisu fluxlab.pl. Dowiedz się, jak przetwarzamy Twoje dane osobowe zgodnie z RODO.",
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
    canonical: "/polityka-prywatnosci",
  },
};

export default function PolitykaPrywatnosci() {
  return (
    <>
      <Header />
      <main className="py-16 md:py-24">
        <div className="container-wide">
          <Breadcrumbs
            items={[
              { label: "Strona główna", href: "/" },
              { label: "Polityka prywatności" },
            ]}
          />

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mt-8 mb-4">
            Polityka prywatności
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-12">
            Ostatnia aktualizacja: 4 kwietnia 2026
          </p>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-10 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {/* 1 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                1. Administrator danych
              </h2>
              <p>
                Administratorem danych osobowych jest Fluxlab z siedzibą w
                Polsce, prowadzący serwis internetowy pod adresem{" "}
                <Link href="/" className="text-accent hover:underline">
                  fluxlab.pl
                </Link>{" "}
                (dalej: „Serwis"). W sprawach związanych z ochroną danych
                osobowych można kontaktować się za pośrednictwem formularza
                kontaktowego dostępnego w Serwisie.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                2. Zakres zbieranych danych
              </h2>
              <p>W ramach korzystania z Serwisu możemy zbierać następujące dane:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Formularz kontaktowy</strong> – imię, adres e-mail,
                  nazwa firmy oraz treść wiadomości przesłanej przez użytkownika.
                </li>
                <li>
                  <strong>Dane analityczne</strong> – anonimowe dane dotyczące
                  odwiedzin strony zbierane przez Vercel Analytics (np. kraj,
                  przeglądarka, typ urządzenia, odwiedzane podstrony). Vercel
                  Analytics nie wykorzystuje plików cookie i nie zbiera danych
                  umożliwiających identyfikację użytkownika.
                </li>
                <li>
                  <strong>Dane techniczne</strong> – adres IP, typ
                  przeglądarki, system operacyjny, dostawca internetu —
                  przetwarzane automatycznie przez serwer w ramach logów
                  systemowych.
                </li>
              </ul>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                3. Cele i podstawy przetwarzania danych
              </h2>
              <p>Dane osobowe przetwarzamy w następujących celach:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  Odpowiedź na zapytanie przesłane przez formularz kontaktowy —
                  na podstawie art. 6 ust. 1 lit. b) RODO (działania na żądanie
                  osoby, której dane dotyczą, przed zawarciem umowy) oraz lit.
                  f) (prawnie uzasadniony interes administratora).
                </li>
                <li>
                  Analiza ruchu na stronie w celu poprawy jakości usług — na
                  podstawie art. 6 ust. 1 lit. f) RODO (prawnie uzasadniony
                  interes administratora).
                </li>
                <li>
                  Zapewnienie prawidłowego działania i bezpieczeństwa Serwisu —
                  na podstawie art. 6 ust. 1 lit. f) RODO.
                </li>
              </ul>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                4. Pliki cookie
              </h2>
              <p>
                Serwis nie wykorzystuje plików cookie do celów marketingowych ani
                śledzących. Vercel Analytics, którego używamy do analizy ruchu na
                stronie, działa bez plików cookie i nie identyfikuje
                indywidualnych użytkowników. Pliki cookie mogą być wykorzystywane
                wyłącznie w zakresie niezbędnym do prawidłowego funkcjonowania
                Serwisu (np. pliki techniczne).
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                5. Udostępnianie danych
              </h2>
              <p>Dane osobowe mogą być udostępniane następującym podmiotom:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Vercel Inc.</strong> – dostawca hostingu oraz narzędzi
                  analitycznych (Vercel Analytics, Speed Insights). Dane mogą
                  być przetwarzane na serwerach zlokalizowanych poza Europejskim
                  Obszarem Gospodarczym, z zachowaniem odpowiednich zabezpieczeń
                  (standardowe klauzule umowne).
                </li>
                <li>
                  Podmiotom uprawnionym na podstawie obowiązujących przepisów
                  prawa.
                </li>
              </ul>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                6. Okres przechowywania danych
              </h2>
              <p>
                Dane z formularza kontaktowego przechowujemy przez okres
                niezbędny do obsługi zapytania, nie dłużej niż 12 miesięcy od
                ostatniego kontaktu, chyba że dłuższe przechowywanie jest
                uzasadnione realizacją umowy lub obowiązkiem prawnym. Logi
                systemowe serwera przechowywane są przez okres do 30 dni.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                7. Prawa użytkownika
              </h2>
              <p>
                Zgodnie z RODO przysługują Ci następujące prawa:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Prawo dostępu do swoich danych osobowych.</li>
                <li>Prawo do sprostowania (poprawiania) danych.</li>
                <li>Prawo do usunięcia danych („prawo do bycia zapomnianym").</li>
                <li>Prawo do ograniczenia przetwarzania.</li>
                <li>Prawo do przenoszenia danych.</li>
                <li>
                  Prawo do wniesienia sprzeciwu wobec przetwarzania opartego na
                  prawnie uzasadnionym interesie administratora.
                </li>
                <li>
                  Prawo do wniesienia skargi do organu nadzorczego — Prezesa
                  Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193
                  Warszawa).
                </li>
              </ul>
              <p className="mt-2">
                Aby skorzystać z powyższych praw, skontaktuj się z nami za
                pośrednictwem formularza kontaktowego w Serwisie.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                8. Zmiany polityki prywatności
              </h2>
              <p>
                Administrator zastrzega sobie prawo do wprowadzania zmian w
                niniejszej Polityce prywatności. O istotnych zmianach
                użytkownicy zostaną poinformowani za pośrednictwem Serwisu.
                Aktualna wersja Polityki prywatności jest zawsze dostępna pod
                adresem{" "}
                <Link
                  href="/polityka-prywatnosci"
                  className="text-accent hover:underline"
                >
                  fluxlab.pl/polityka-prywatnosci
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
