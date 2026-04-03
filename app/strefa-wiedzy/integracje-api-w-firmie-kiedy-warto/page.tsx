import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title:
    "Integracje API w firmie — kiedy warto, a kiedy to przesada | Fluxlab",
  description:
    "Kiedy integracje API mają sens w firmie, jakie problemy rozwiązują i kiedy lepiej wybrać prostsze podejście. Przykłady, błędy i praktyczne scenariusze.",
  openGraph: {
    title:
      "Integracje API w firmie — kiedy warto, a kiedy to przesada | Fluxlab",
    description:
      "Kiedy integracje API mają sens w firmie, jakie problemy rozwiązują i kiedy lepiej wybrać prostsze podejście. Przykłady, błędy i praktyczne scenariusze.",
    locale: "pl_PL",
    type: "article",
  },
  alternates: {
    canonical: "/strefa-wiedzy/integracje-api-w-firmie-kiedy-warto",
  },
};

export default function IntegracjeApiArticle() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Strefa wiedzy", href: "/strefa-wiedzy" }, { label: "Integracje API w firmie — kiedy warto?" }]} />
        {/* Hero */}
        <section className="bg-gray-50 dark:bg-gray-900/50 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Integracje API w firmie — kiedy warto?
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Integracje API brzmią technicznie, ale ich sens jest bardzo
              biznesowy. W praktyce chodzi o jedno: czy dane między systemami
              mają przepływać automatycznie, czy dalej mają być przenoszone
              ręcznie przez ludzi. Jeżeli firma używa kilku narzędzi
              jednocześnie i każde z nich żyje własnym życiem, to integracje
              API przestają być &bdquo;opcją dla działu IT&rdquo;. Zaczynają
              być elementem sprawnej operacji.
            </p>
          </div>
        </section>

        {/* Czym są integracje API */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Czym są integracje API
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              API to sposób, w jaki systemy komunikują się ze sobą. Dzięki temu
              CRM, formularz, ERP, narzędzie mailingowe, baza danych czy system
              raportowy mogą wymieniać informacje bez ręcznego udziału
              człowieka.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              W praktyce integracja API oznacza, że:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>dane są pobierane i wysyłane automatycznie,</li>
              <li>można synchronizować rekordy, statusy i pola,</li>
              <li>
                jedno zdarzenie w systemie może uruchamiać kolejne akcje
                w innym,
              </li>
              <li>
                firma przestaje polegać na kopiowaniu danych z miejsca do
                miejsca.
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              To nie zawsze wymaga &bdquo;wielkiego developmentu&rdquo;. Czasem
              jest to prosta, bardzo konkretna integracja, która eliminuje
              codzienny problem operacyjny.
            </p>
          </div>
        </section>

        {/* Kiedy integracje API mają sens */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Kiedy integracje API mają sens
            </h2>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              1. Gdy kilka systemów powinno działać jak jeden proces
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Najczęstszy przypadek: firma ma CRM, formularze, arkusze,
              narzędzie mailingowe, system fakturowy i raportowanie. Każdy
              działa osobno, ludzie sklejają proces ręcznie. Jeżeli dane muszą
              przepływać regularnie, API zwykle ma sens.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              2. Gdy ręczne przenoszenie danych generuje koszt
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Samo kopiowanie danych to wierzchołek problemu. Za nim stoją:
              błędy, duble, brak aktualności, pytania między działami,
              opóźnienia. Im częściej proces się powtarza, tym szybciej rośnie
              koszt ręcznego obejścia.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              3. Gdy liczy się aktualność danych
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Lead ma być od razu w CRM. Status ma się zmienić szybko. Raport
              ma bazować na aktualnych danych.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              4. Gdy firma potrzebuje stabilniejszej architektury
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Na początku wiele da się ogarnąć arkuszem. Ale z czasem to
              przestaje być skalowalne.
            </p>
          </div>
        </section>

        {/* Kiedy API nie jest najlepszym wyborem */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Kiedy API nie jest najlepszym wyborem
            </h2>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              1. Gdy proces jest rzadki
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Jeżeli coś dzieje się raz na miesiąc i zajmuje 5 minut, to
              integracja API może być przerostem formy.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              2. Gdy proces nie jest jeszcze uporządkowany
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Jeżeli firma nie wie: które dane są ważne, kto jest właścicielem
              procesu, które pole ma być źródłem prawdy, jak wygląda poprawny
              przepływ — to integracja API przeniesie chaos między systemami
              szybciej. Więcej o porządkowaniu procesów w{" "}
              <Link
                href="/strefa-wiedzy/co-to-jest-automatyzacja-procesow-biznesowych"
                className="text-accent hover:underline"
              >
                Co to jest automatyzacja procesów biznesowych
              </Link>
              .
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              3. Gdy wystarczy prostsza automatyzacja
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Niektóre przypadki lepiej obsłużyć prostym workflow no-code.
            </p>
          </div>
        </section>

        {/* Najczęstsze scenariusze integracji API */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Najczęstsze scenariusze integracji API
            </h2>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              CRM + formularze i źródła leadów
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Nowe zapytanie trafia automatycznie do CRM, jest oznaczane
              źródłem, przypisywane do handlowca i wyzwala zadanie follow-up.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              CRM + system ofertowy / ERP
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Dane klienta, status zamówienia są synchronizowane między
              systemami.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              CRM + raportowanie
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Integracja pozwala zasilać dashboardy bez ręcznej składanki.
              Zobacz{" "}
              <Link
                href="/strefa-wiedzy/jak-zautomatyzowac-raportowanie-w-firmie"
                className="text-accent hover:underline"
              >
                Jak zautomatyzować raportowanie w firmie
              </Link>
              .
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Obsługa zgłoszeń + powiadomienia + klasyfikacja
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Zgłoszenie trafia do odpowiedniego zespołu, jest kategoryzowane
              i uruchamia kolejne akcje automatycznie.
            </p>
          </div>
        </section>

        {/* Jak wygląda dobra integracja API */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Jak wygląda dobra integracja API
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Dobra integracja musi być przewidywalna, zrozumiała i odporna na
              problemy. Powinna odpowiadać na pytania:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>co jest źródłem danych,</li>
              <li>kiedy dane są synchronizowane,</li>
              <li>co dzieje się przy błędzie,</li>
              <li>jak wykrywać duplikaty,</li>
              <li>kto odpowiada za wyjątki,</li>
              <li>jak przetestować poprawność procesu.</li>
            </ul>
          </div>
        </section>

        {/* Mid-article CTA */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Masz kilka systemów, które powinny działać jak jeden proces?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Bezpłatna konsultacja, bez zobowiązań.
              </p>
              <Link href="/#kontakt" className="btn-primary inline-block">
                Umów rozmowę
              </Link>
            </div>
          </div>
        </section>

        {/* Najczęstsze błędy przy integracjach API */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Najczęstsze błędy przy integracjach API
            </h2>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Brak jednego źródła prawdy
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Podstawowy błąd. Jeżeli ten sam rekord może być edytowany w kilku
              miejscach bez jasnej logiki, konflikty danych są kwestią czasu.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Integracja bez walidacji
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Jeżeli integracja nie sprawdza, czy dane są kompletne, poprawne
              i nieduplikowane, to nie rozwiązuje problemu — tylko szybciej
              rozprowadza błędy.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Próba spięcia wszystkiego naraz
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Lepiej zacząć od jednego krytycznego przepływu.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Zbyt techniczne podejście bez perspektywy procesu
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Integracja może być świetna technicznie i nie rozwiązywać realnego
              problemu biznesowego.
            </p>
          </div>
        </section>

        {/* Mini-case 1 */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Mini-case 1: CRM i formularz kontaktowy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Firma miała formularz, ale leady trafiały do maila, CRM
              aktualizowany ręcznie. Po wdrożeniu: lead automatycznie w CRM,
              źródło przypisane, system tworzył zadanie. Zniknęła ręczna robota
              + opóźnienia i błędy.
            </p>
          </div>
        </section>

        {/* Mini-case 2 */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Mini-case 2: CRM, raportowanie i zespół operacyjny
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Raportowanie wymagało ręcznego wyciągania danych z CRM
              i weryfikacji w innych źródłach. Po integracji: dane nie
              przenoszone ręcznie, raport oparty na stałym modelu, zespół
              przestał korygować liczby &bdquo;na czuja&rdquo;.
            </p>
          </div>
        </section>

        {/* Jak ocenić, czy API ma sens */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Jak ocenić, czy API ma sens w Twojej firmie
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Zadaj sobie 5 pytań:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>Czy ten proces dzieje się często?</li>
              <li>
                Czy dane muszą przechodzić między systemami regularnie?
              </li>
              <li>
                Czy ręczne przenoszenie powoduje błędy lub opóźnienia?
              </li>
              <li>Czy aktualność danych ma znaczenie biznesowe?</li>
              <li>
                Czy proces jest już na tyle uporządkowany, że wiadomo, co ma
                się dziać?
              </li>
            </ol>
          </div>
        </section>

        {/* API, automatyzacja i AI */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              API, automatyzacja i AI — co jest czym
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>Automatyzacja procesów biznesowych to szerszy cel.</li>
              <li>
                Integracje API to sposób, by systemy wymieniały dane.
              </li>
              <li>
                AI ma sens tam, gdzie trzeba analizować treści, klasyfikować
                dane lub wspierać decyzje.
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <Link
                href="/strefa-wiedzy/co-to-jest-automatyzacja-procesow-biznesowych"
                className="text-accent hover:underline"
              >
                Co to jest automatyzacja procesów biznesowych
              </Link>
              {" | "}
              <Link
                href="/strefa-wiedzy/jak-zautomatyzowac-raportowanie-w-firmie"
                className="text-accent hover:underline"
              >
                Jak zautomatyzować raportowanie w firmie
              </Link>
              {" | "}
              <Link
                href="/strefa-wiedzy/automatyzacja-crm-od-czego-zaczac"
                className="text-accent hover:underline"
              >
                Automatyzacja CRM — od czego zacząć
              </Link>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Najczęściej zadawane pytania
            </h2>
            <div className="space-y-4">
              <details className="group rounded-2xl border border-gray-200 dark:border-gray-700">
                <summary className="flex cursor-pointer items-center justify-between p-6 text-gray-900 dark:text-white font-medium">
                  Czy integracje API są tylko dla dużych firm?
                  <svg
                    className="h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                  Nie. Mniejsze firmy często szybciej odczuwają korzyść.
                </div>
              </details>

              <details className="group rounded-2xl border border-gray-200 dark:border-gray-700">
                <summary className="flex cursor-pointer items-center justify-between p-6 text-gray-900 dark:text-white font-medium">
                  Czy API zawsze jest lepsze od prostych automatyzacji?
                  <svg
                    className="h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                  Nie. Zależy od procesu, skali, krytyczności i potrzebnej
                  elastyczności.
                </div>
              </details>

              <details className="group rounded-2xl border border-gray-200 dark:border-gray-700">
                <summary className="flex cursor-pointer items-center justify-between p-6 text-gray-900 dark:text-white font-medium">
                  Czy można połączyć CRM z innymi systemami bez pełnego
                  developmentu?
                  <svg
                    className="h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                  Często tak, ale zależy to od narzędzi i zakresu procesu.
                </div>
              </details>

              <details className="group rounded-2xl border border-gray-200 dark:border-gray-700">
                <summary className="flex cursor-pointer items-center justify-between p-6 text-gray-900 dark:text-white font-medium">
                  Co jest ważniejsze: narzędzie czy logika procesu?
                  <svg
                    className="h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                  Logika procesu. Źle przemyślana integracja będzie złym
                  wdrożeniem niezależnie od technologii.
                </div>
              </details>

              <details className="group rounded-2xl border border-gray-200 dark:border-gray-700">
                <summary className="flex cursor-pointer items-center justify-between p-6 text-gray-900 dark:text-white font-medium">
                  Jaki pierwszy scenariusz integracji zwykle daje najlepszy
                  efekt?
                  <svg
                    className="h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                  Bardzo często jest to obszar leadów, CRM i raportowania.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* Podsumowanie */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Podsumowanie
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Integracje API mają sens wtedy, gdy dane między systemami powinny
              przepływać automatycznie, a ręczne przenoszenie zaczyna być
              realnym kosztem operacyjnym. Nie chodzi o to, żeby &bdquo;mieć
              API&rdquo;, tylko żeby firma działała sprawniej.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Masz kilka systemów, które powinny działać jak jeden proces?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Zobacz usługę integracji i porównaj z artykułami poniżej.
              </p>
              <Link href="/#kontakt" className="btn-primary inline-block">
                Umów bezpłatną konsultację
              </Link>
            </div>
          </div>
        </section>

        {/* Related links */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Powiązane artykuły
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/strefa-wiedzy/co-to-jest-automatyzacja-procesow-biznesowych"
                      className="text-accent hover:underline"
                    >
                      Co to jest automatyzacja procesów biznesowych
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji"
                      className="text-accent hover:underline"
                    >
                      Jak policzyć ROI z automatyzacji
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/strefa-wiedzy/jak-zautomatyzowac-raportowanie-w-firmie"
                      className="text-accent hover:underline"
                    >
                      Jak zautomatyzować raportowanie w firmie
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Powiązane usługi
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/automatyzacja-procesow-biznesowych"
                      className="text-accent hover:underline"
                    >
                      Automatyzacja procesów biznesowych
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
                      href="/automatyzacja-crm"
                      className="text-accent hover:underline"
                    >
                      Automatyzacja CRM
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
