import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Tabs from "@/components/Tabs";
import PrevNextArticle from "@/components/PrevNextArticle";

export const metadata: Metadata = {
  title: "Automatyzacja CRM — od czego zacząć | Fluxlab",
  description:
    "Jak zacząć automatyzację CRM w firmie: audyt procesu, leady, zadania, statusy, walidacja danych i pierwsze wdrożenia o największym zwrocie.",
  openGraph: {
    title: "Automatyzacja CRM — od czego zacząć | Fluxlab",
    description:
      "Jak zacząć automatyzację CRM w firmie: audyt procesu, leady, zadania, statusy, walidacja danych i pierwsze wdrożenia o największym zwrocie.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab — Automatyzacja leadów, CRM i raportowania dla firm B2B",
      },
    ],
  },
  alternates: {
    canonical: "/strefa-wiedzy/automatyzacja-crm-od-czego-zaczac",
  },
};

const checkIcon = (
  <svg
    className="w-5 h-5 text-accent shrink-0 mt-0.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default function AutomatyzacjaCrmOdCzegoZaczacArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Automatyzacja CRM — od czego zacząć" },
          ]}
        />

        {/* Nagłówek artykułu — kompaktowy */}
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Automatyzacja CRM — od czego zacząć
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Firmy często wdrażają CRM, a dopiero później odkrywają, że zespół
              dalej robi większość pracy ręcznie. Automatyzacja CRM ma sens
              dopiero wtedy, gdy system zaczyna aktywnie wspierać sprzedaż, a
              nie tylko przechowuje kontakty.
            </p>
          </div>
        </section>

        {/* Treść w zakładkach — nic nie wycięte, podzielone wg rozdziałów */}
        <div className="container-wide pb-8">
          <Tabs
            ariaLabel="Rozdziały artykułu"
            tabs={[
              {
                label: "Krok 1: gdzie CRM nie działa",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Krok 1: sprawdź, gdzie CRM dziś nie działa
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        Zacznij od prostego pytania: co dziś handlowcy robią
                        ręcznie, mimo że dzieje się to codziennie? Najczęściej
                        będą to:
                      </p>
                      <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                        <li className="flex items-start gap-2">
                          {checkIcon}
                          tworzenie zadań,
                        </li>
                        <li className="flex items-start gap-2">
                          {checkIcon}
                          przenoszenie statusów,
                        </li>
                        <li className="flex items-start gap-2">
                          {checkIcon}
                          follow-upy,
                        </li>
                        <li className="flex items-start gap-2">
                          {checkIcon}
                          uzupełnianie pól,
                        </li>
                        <li className="flex items-start gap-2">
                          {checkIcon}
                          przepisywanie leadów.
                        </li>
                      </ul>
                      <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                        To właśnie tam zwykle leży najszybszy zwrot. Szczególnie
                        w obszarze{" "}
                        <Link
                          href="/automatyzacja-leadow"
                          className="text-accent hover:underline"
                        >
                          automatyzacji leadów
                        </Link>
                        , gdzie ręczna praca generuje największe straty.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                label: "Krok 2: nie wszystko naraz",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Krok 2: nie automatyzuj wszystkiego naraz
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        Najlepiej zacząć od 2–3 prostych scenariuszy. Dobry
                        pierwszy zestaw to:
                      </p>
                      <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                        <li className="flex items-start gap-2">
                          {checkIcon}
                          automatyczne tworzenie leada,
                        </li>
                        <li className="flex items-start gap-2">
                          {checkIcon}
                          przypisanie go do właściwej osoby,
                        </li>
                        <li className="flex items-start gap-2">
                          {checkIcon}
                          zadanie follow-up po określonym czasie,
                        </li>
                        <li className="flex items-start gap-2">
                          {checkIcon}
                          kontrola obowiązkowych pól.
                        </li>
                      </ul>
                      <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                        To wystarcza, żeby CRM zaczął realnie pomagać.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                label: "Krok 3: zasady procesu",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Krok 3: uporządkuj zasady procesu
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        Automatyzacja bez jasnych zasad tylko przyspiesza chaos.
                        Zanim ustawisz workflow, ustal:
                      </p>
                      <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                        <li className="flex items-start gap-2">
                          {checkIcon}
                          kiedy lead trafia do jakiego etapu,
                        </li>
                        <li className="flex items-start gap-2">
                          {checkIcon}
                          kto odpowiada za kolejny ruch,
                        </li>
                        <li className="flex items-start gap-2">
                          {checkIcon}
                          jakie pola są obowiązkowe,
                        </li>
                        <li className="flex items-start gap-2">
                          {checkIcon}
                          kiedy sprawa jest zamknięta.
                        </li>
                      </ul>
                    </div>
                  </div>
                ),
              },
              {
                label: "Krok 4: walidacja i wyjątki",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Krok 4: dodaj walidację i wyjątki
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        Dobrze zrobiona{" "}
                        <Link
                          href="/automatyzacja-crm"
                          className="text-accent hover:underline"
                        >
                          automatyzacja CRM
                        </Link>{" "}
                        nie tylko przesuwa dane, ale też pilnuje jakości.
                        Sprawdza duplikaty, brakujące pola i sytuacje, które
                        trzeba oddać człowiekowi.
                      </p>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>

        {/* Prev / Next */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <PrevNextArticle currentHref="/strefa-wiedzy/automatyzacja-crm-od-czego-zaczac" />
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="rounded-2xl bg-accent/10 p-8 lg:p-12 text-center">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Masz CRM, ale zespół dalej klika za dużo ręcznie?
              </p>
              <Link
                href="/automatyzacja-crm"
                className="btn-primary mt-6 inline-block"
              >
                Zobacz usługę Automatyzacja CRM
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Automatyzacja CRM — od czego zacząć",
            description:
              "Jak zacząć automatyzację CRM w firmie: audyt procesu, leady, zadania, statusy, walidacja danych i pierwsze wdrożenia o największym zwrocie.",
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

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Jak zacząć automatyzację CRM w firmie",
            step: [
              {
                "@type": "HowToStep",
                name: "Krok 1: sprawdź, gdzie CRM dziś nie działa",
                text: "Zacznij od pytania: co dziś handlowcy robią ręcznie codziennie? Najczęściej: tworzenie zadań, przenoszenie statusów, follow-upy, uzupełnianie pól, przepisywanie leadów. Tam zwykle leży najszybszy zwrot.",
              },
              {
                "@type": "HowToStep",
                name: "Krok 2: nie automatyzuj wszystkiego naraz",
                text: "Zacznij od 2–3 prostych scenariuszy: automatyczne tworzenie leada, przypisanie go do właściwej osoby, zadanie follow-up po określonym czasie, kontrola obowiązkowych pól.",
              },
              {
                "@type": "HowToStep",
                name: "Krok 3: uporządkuj zasady procesu",
                text: "Zanim ustawisz workflow, ustal: kiedy lead trafia do jakiego etapu, kto odpowiada za kolejny ruch, jakie pola są obowiązkowe, kiedy sprawa jest zamknięta.",
              },
              {
                "@type": "HowToStep",
                name: "Krok 4: dodaj walidację i wyjątki",
                text: "Dobra automatyzacja CRM nie tylko przesuwa dane, ale pilnuje jakości. Sprawdza duplikaty, brakujące pola i sytuacje, które trzeba oddać człowiekowi.",
              },
            ],
          }),
        }}
      />
    </>
  );
}
