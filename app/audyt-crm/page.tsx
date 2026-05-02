import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";
import AudytCRM from "./AudytCRM";

export const metadata: Metadata = {
  title:
    "Audyt CRM — checklist online | Sprawdź, czy Twój pipeline jest gotowy do automatyzacji",
  description:
    "10 pytań tak/nie. Wynik X/10 + obszar z największym potencjałem automatyzacji. Bez rejestracji.",
  openGraph: {
    title:
      "Audyt CRM — checklist online | Sprawdź, czy Twój pipeline jest gotowy do automatyzacji",
    description:
      "10 pytań tak/nie. Wynik X/10 + obszar z największym potencjałem automatyzacji. Bez rejestracji.",
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
    canonical: "/audyt-crm",
  },
};

const faqs = [
  {
    question: "Co dokładnie liczy ten audyt?",
    answer:
      "Mierzy 10 fundamentów dojrzałości pipeline'u: atrybucję źródeł, routing leadów, kryteria etapów, automatyzację zadań, follow-up, raportowanie end-to-end, ręczne przepisywanie danych, jakość danych, deduplikację i integracje wejściowe. Każdy obszar to jedno pytanie tak/nie. Wynik to liczba pozytywnych odpowiedzi z 10. Pytania o ręczne przepisywanie i duplikaty są odwrócone — tam „tak” oznacza problem, bo świadczy o tym, że proces nie jest jeszcze poukładany. Audyt nie zastąpi pełnej diagnozy procesu, ale w 3 minuty pokazuje, gdzie pipeline ma najsłabsze punkty.",
  },
  {
    question: "Co znaczy odpowiedź „nie wiem” i dlaczego liczy się jak „nie”?",
    answer:
      "Jeśli nie masz pewności, że coś działa, to znaczy, że nie działa świadomie. Na przykład: jeśli nie wiesz, czy każdy lead ma źródło, to znaczy, że nikt tego nie pilnuje — czyli efektywnie atrybucji nie masz. „Nie wiem” w audycie traktuję jak czerwoną flagę, bo brak widoczności jest sam w sobie problemem operacyjnym. To nie jest karanie za niewiedzę — to wskazanie obszaru, gdzie warto najpierw zrobić podstawową diagnostykę.",
  },
  {
    question: "Jak interpretuję wynik X/10?",
    answer:
      "8–10 to zdrowy pipeline gotowy do skalowania — automatyzacja na tym etapie wyciska z procesu jeszcze 20–30%. 5–7 to solidny fundament z lukami — najpierw warto załatać największą lukę (audyt ją wskazuje), potem dokładać kolejne automatyzacje. 0–4 to sygnał, że problem nie jest w CRM-ie, tylko w procesie — automatyzacja bałaganu daje zautomatyzowany bałagan, więc trzeba zacząć od ułożenia podstaw: właściciel leada, kryteria etapów, źródło. Wynik to punkt startowy dyskusji, nie ocena końcowa.",
  },
  {
    question: "Dlaczego pytania o duplikaty i przepisywanie są odwrócone?",
    answer:
      "Bo tam „tak” oznacza problem, a „nie” oznacza zdrowy stan. Jeśli handlowcy ręcznie przepisują dane z formularzy do CRM — to jest bardzo konkretny sygnał, że brakuje integracji wejściowej. Jeśli w CRM masz duplikaty firm i kontaktów — to pokazuje, że proces deduplikacji nie istnieje albo nie działa. Przy 10 pytaniach z różnymi kierunkami chodzi o to, żebyś nie mógł oszukać wyniku przez „klikanie tak na wszystko” — audyt patrzy na realne objawy zdrowego pipeline'u, nie na deklaracje.",
  },
  {
    question: "Czy ten audyt zastępuje konsultację?",
    answer:
      "Nie. Daje punkt startowy: pokazuje wynik i obszar z największym potencjałem, ale konkretna mapa automatyzacji wymaga rozmowy o specyfice firmy, narzędziach (Pipedrive, HubSpot, Salesforce, Bitrix, własne), wolumenie leadów i tym, co już próbowaliście. W diagnozie 30-minutowej zwykle udaje się ustalić: które 2–3 automatyzacje dadzą największy efekt w pierwszych 4 tygodniach, ile to kosztuje wdrożeniowo i miesięcznie, i czy w ogóle warto teraz, czy najpierw uporządkować proces ręcznie. Audyt online to filtr — diagnoza to konkretny plan.",
  },
];

export default function AudytCRMPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs
          items={[
            { label: "Narzędzia", href: "/narzedzia" },
            { label: "Audyt CRM" },
          ]}
        />

        {/* Hero */}
        <section className="py-16 lg:py-24">
          <div className="container-wide text-center max-w-3xl mx-auto">
            <p className="section-label mb-4">Narzędzie</p>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Audyt CRM: czy Twój pipeline nadaje się do automatyzacji?
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              10 pytań tak/nie. Wynik X/10 + obszar z największym potencjałem
              automatyzacji. Bez rejestracji, bez maila — w 3 minuty.
            </p>
          </div>
        </section>

        {/* Tool */}
        <section className="pb-16 lg:pb-24">
          <div className="container-wide">
            <AudytCRM />
          </div>
        </section>

        {/* Methodology */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Jak interpretuję wynik
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                Audyt mierzy 10 fundamentów zdrowego pipeline'u. Każdy ma jedno
                pytanie tak/nie z trzecią opcją „nie wiem” — która liczy się jak
                „nie”, bo brak widoczności jest sam w sobie problemem
                operacyjnym. Pytania 7 (ręczne przepisywanie) i 9 (duplikaty) są
                odwrócone: tam „tak” oznacza problem.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>8–10 — zdrowy pipeline.</strong> Większość filarów na
                  miejscu. Automatyzacja działa jak dokładanie sił do
                  działającej maszyny: szybsza reakcja, mniej ręcznej pracy,
                  lepsze raporty. Dobry moment, żeby zająć się obszarami
                  granicznymi.
                </li>
                <li>
                  <strong>5–7 — solidny fundament z lukami.</strong> Pipeline
                  działa, ale ma 3–5 brakujących filarów. Najpierw warto załatać
                  największą lukę (audyt ją wskazuje), potem wracać do
                  automatyzacji ogólnej. Próba zautomatyzowania bałaganu daje
                  zautomatyzowany bałagan.
                </li>
                <li>
                  <strong>0–4 — pipeline blokuje sprzedaż.</strong> To nie
                  problem CRM-a, to problem procesu. Zanim zautomatyzujesz
                  cokolwiek, trzeba ustalić podstawy: kto jest właścicielem
                  leada, jakie są kryteria etapów, skąd lead przychodzi.
                </li>
              </ul>
              <p>
                Po wyniku audyt wskazuje <strong>jeden obszar</strong> z
                największym potencjałem — pierwszy negatywny w kolejności
                ważności (definicja „kto jest właścicielem leada” jest
                ważniejsza niż „czy raport pokazuje source-to-revenue”). Do tego
                obszaru dostajesz 2–3 konkretne pierwsze kroki, które można
                zrobić bez wchodzenia w pełne wdrożenie.
              </p>
            </div>
          </div>
        </section>

        {/* For whom */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Dla kogo jest ten audyt
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                Audyt przyda się każdemu, kto rozważa automatyzację, ale nie ma
                pewności, czy proces jest do niej gotowy — albo czy najpierw nie
                trzeba uporządkować podstaw. Najczęściej korzystają z niego:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Właściciele firm B2B z działającym CRM</strong>{" "}
                  (Pipedrive, HubSpot, Salesforce, Bitrix), którzy podejrzewają,
                  że nie wyciskają z niego tyle, ile mogliby.
                </li>
                <li>
                  <strong>Szefowie sprzedaży</strong>, którzy mają wrażenie, że
                  pipeline „żyje własnym życiem” — leady wpadają, część się
                  zamyka, ale nikt nie wie, dlaczego konkretnie ta i nie inna.
                </li>
                <li>
                  <strong>
                    Osoby decyzyjne przed wyborem dostawcy automatyzacji
                  </strong>{" "}
                  — zanim zaczniesz rozmawiać z agencją albo freelancerem, warto
                  wiedzieć, w którym obszarze masz największą lukę.
                </li>
                <li>
                  <strong>Solopreneurzy</strong>, którzy wiedzą, że tracą czas
                  na klikanie w CRM, ale nie wiedzą, czy problem jest w
                  konfiguracji, w procesie, czy w tym, że jeszcze za mało
                  leadów, żeby się tym przejmować.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Mid CTA */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Wynik audytu wygląda znajomo?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                W diagnozie 30-minutowej dostaniesz konkretną mapę: które 2–3
                automatyzacje dadzą największy efekt w pierwszych 4 tygodniach,
                ile to kosztuje wdrożeniowo i miesięcznie.
              </p>
              <TrackedCTA
                href="/#kontakt"
                location="audit_crm_mid"
                eventName="cta_click_audit_crm"
                className="btn-primary px-8 py-3 text-base"
              >
                Chcę mapę automatyzacji CRM
              </TrackedCTA>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Najczęstsze pytania
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-6 text-gray-900 dark:text-white font-medium list-none">
                    {faq.question}
                    <svg
                      className="shrink-0 ml-4 w-5 h-5 text-gray-400 transition-transform group-open:rotate-45"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M10 4v12M4 10h12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Powiązane treści
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  href: "/automatyzacja-leadow-crm",
                  title: "Automatyzacja leadów i CRM dla firm B2B",
                  description:
                    "Co konkretnie da się zautomatyzować w 1. etapie i jak wygląda gotowy proces.",
                },
                {
                  href: "/kalkulator-leadow",
                  title: "Kalkulator kosztu ręcznej obsługi leadów",
                  description:
                    "Policz w zł, ile miesięcznie kosztuje Cię ręczne przepisywanie i pilnowanie follow-upów.",
                },
                {
                  href: "/zatrudnic-czy-zautomatyzowac",
                  title: "Zatrudnić czy zautomatyzować?",
                  description:
                    "Kalkulator decyzji: kiedy lepiej dołożyć osobę, a kiedy proces.",
                },
                {
                  href: "/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji",
                  title: "Jak policzyć ROI z automatyzacji",
                  description:
                    "Metoda liczenia zwrotu z wdrożenia automatyzacji — bez magii, z liczbami.",
                },
                {
                  href: "/strefa-wiedzy/automatyzacja-vs-zatrudnienie",
                  title: "Automatyzacja vs zatrudnienie",
                  description:
                    "Kiedy warto zautomatyzować, a kiedy zatrudnić kolejną osobę.",
                },
                {
                  href: "/narzedzia",
                  title: "Wszystkie narzędzia",
                  description:
                    "Pozostałe kalkulatory i narzędzia online — bez rejestracji, za darmo.",
                },
              ].map((article) => (
                <Link
                  key={article.href}
                  href={article.href}
                  className="block p-6 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60 hover:border-accent/30 dark:hover:border-accent/50 transition-colors group"
                >
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {article.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 lg:py-24">
          <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
            <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Masz wynik — chcesz konkretny plan?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                W diagnozie dostaniesz mapę obecnego procesu, listę ręcznych
                kroków, 3 automatyzacje o największym wpływie i orientacyjną
                wycenę.
              </p>
              <TrackedCTA
                href="/#kontakt"
                location="audit_crm_final"
                eventName="cta_click_audit_crm"
                className="btn-primary px-8 py-3.5 text-base"
              >
                Chcę mapę automatyzacji CRM
              </TrackedCTA>
            </div>
          </div>
        </section>
      </main>

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Audyt CRM — checklist online",
            url: "https://fluxlab.pl/audyt-crm",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "PLN",
            },
            inLanguage: "pl-PL",
            description:
              "Audyt CRM w 10 pytaniach tak/nie. Wynik X/10 + obszar z największym potencjałem automatyzacji.",
          }),
        }}
      />

      <Footer />
    </>
  );
}
