import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";

export const metadata: Metadata = {
  title: "Automatyzacja leadów i CRM dla firm B2B | Fluxlab",
  description:
    "Automatyzuję obsługę leadów, CRM, follow-upy i raportowanie dla firm B2B. Leady trafiają do CRM, dostają handlowca, zadanie i raport bez ręcznej pracy.",
  openGraph: {
    title: "Automatyzacja leadów i CRM dla firm B2B | Fluxlab",
    description:
      "Automatyzuję obsługę leadów, CRM, follow-upy i raportowanie dla firm B2B. Leady trafiają do CRM, dostają handlowca, zadanie i raport bez ręcznej pracy.",
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
    canonical: "/automatyzacja-leadow-crm",
  },
};

const problemPoints = [
  "Leady z różnych źródeł trafiają w różne miejsca.",
  "Handlowcy ręcznie tworzą kontakty, firmy i deale.",
  "Follow-up zależy od pamięci człowieka.",
  "Dane w CRM są niespójne.",
  "Raporty są robione ręcznie.",
  "Nie widać prawdziwego kosztu opóźnienia i zgubionych leadów.",
];

const solutionSteps = [
  {
    title: "Zbieranie leadów",
    description:
      "Formularze, reklamy, maile i landing page'e trafiają do jednego procesu. Koniec z szukaniem zapytań po skrzynkach i arkuszach.",
  },
  {
    title: "Tworzenie rekordów w CRM",
    description:
      "System automatycznie tworzy osobę, firmę, deal, źródło, etap i pola potrzebne do raportowania.",
  },
  {
    title: "Routing do handlowca",
    description:
      "Lead trafia do właściwej osoby według reguł: region, produkt, źródło, wartość, dostępność albo obciążenie pipeline'u.",
  },
  {
    title: "Zadania i follow-upy",
    description:
      "CRM sam tworzy zadania, przypomnienia i kolejne kroki. Handlowiec nie musi pamiętać o procesie — proces pilnuje handlowca.",
  },
  {
    title: "Raportowanie",
    description:
      "Widzisz źródło leada, czas reakcji, status, wynik i miejsce, w którym proces się zacina.",
  },
];

const forWhom = [
  "firmy B2B z min. 30 leadami miesięcznie,",
  "zespoły sprzedaży pracujące na Pipedrive, HubSpot, Salesforce albo arkuszach,",
  "firmy, które mają leady z kilku źródeł,",
  "firmy, które ręcznie przepisują dane do CRM,",
  "firmy, które nie ufają raportom sprzedaży,",
  "firmy leasingowe, finansowe, brokerskie, dealerskie i usługowe.",
];

const notForWhom = [
  "masz 3 leady miesięcznie i każdy jest obsługiwany ręcznie bez problemu,",
  "nie masz powtarzalnego procesu,",
  "nie masz osoby decyzyjnej po stronie firmy,",
  "nikt nie wie, jak powinien wyglądać idealny pipeline,",
  "chcesz „AI”, ale nie umiesz powiedzieć, jaki problem biznesowy ma rozwiązać.",
];

const cooperationSteps = [
  {
    title: "Diagnoza",
    description:
      "Opisujesz obecny proces: skąd wpada lead, kto go obsługuje, gdzie trafiają dane i gdzie pojawia się ręczna praca.",
  },
  {
    title: "Mapa procesu",
    description:
      "Dostajesz prosty schemat: obecny przepływ, wąskie gardła, propozycję automatyzacji i szacowany ROI.",
  },
  {
    title: "Wdrożenie",
    description:
      "Buduję automatyzację, testuję ją na realnych danych i dopracowuję przypadki brzegowe.",
  },
  {
    title: "Dokumentacja i monitoring",
    description:
      "Dostajesz opis działania, instrukcję obsługi i możliwość dalszego rozwoju procesu.",
  },
];

const pricing = [
  {
    name: "Diagnoza procesu",
    price: "0 zł",
    description:
      "Krótka analiza problemu, potencjału automatyzacji i sensownego pierwszego kroku.",
  },
  {
    name: "Automatyzacja leadów",
    price: "od 1 500 zł",
    description:
      "Lead z formularza, reklamy lub maila trafia do CRM, dostaje handlowca, zadanie i źródło.",
    highlighted: true,
  },
  {
    name: "CRM + raportowanie",
    price: "od 2 500 zł",
    description:
      "Porządkowanie pól, statusów, follow-upów, raportów i przepływu danych między systemami.",
  },
  {
    name: "Integracje API / dedykowana logika",
    price: "wycena indywidualna",
    description:
      "Dla procesów z API, webhookami, walidacją, scoringiem, AI lub niestandardową logiką.",
  },
];

const faq = [
  {
    question: "Czy muszę mieć już CRM?",
    answer:
      "Nie. Możemy zacząć od obecnego procesu w arkuszach, mailach albo formularzach. Jeśli CRM jest potrzebny, dobierzemy najprostsze rozwiązanie do skali firmy.",
  },
  {
    question: "Czy automatyzacja zastąpi handlowca?",
    answer:
      "Nie. Ma usunąć przepisywanie danych, ręczne zadania i pilnowanie follow-upów. Handlowiec ma sprzedawać, nie robić za półautomatyczny formularz.",
  },
  {
    question: "Czy można zautomatyzować Pipedrive?",
    answer:
      "Tak. Pipedrive dobrze nadaje się do automatyzacji leadów, dealów, aktywności, follow-upów i raportów. Przy bardziej złożonej logice używam API, webhooków, n8n, Make albo kodu.",
  },
  {
    question: "Czy da się połączyć formularz ze stroną z CRM?",
    answer:
      "Tak. To jeden z najczęstszych pierwszych etapów: formularz → walidacja → CRM → przypisanie handlowca → zadanie → raport.",
  },
  {
    question: "Czy wdrożenie będzie trudne dla zespołu?",
    answer:
      "Nie powinno być. Dobra automatyzacja usuwa kroki, a nie dokłada nowy rytuał klikania. Zespół dostaje prostszy proces i jasną instrukcję.",
  },
  {
    question: "Co jeśli obecne dane są bałaganem?",
    answer:
      "Wtedy najpierw porządkujemy minimum potrzebne do działania: pola, statusy, źródła leadów i reguły przejścia między etapami. Automatyzowanie bałaganu to tylko szybsze produkowanie bałaganu.",
  },
];

export default function AutomatyzacjaLeadowCRM() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Automatyzacja leadów i CRM",
    serviceType: "Automatyzacja procesów sprzedażowych",
    provider: { "@id": "https://fluxlab.pl/#organization" },
    areaServed: { "@type": "Country", name: "Poland" },
    description:
      "Wdrożenie automatyzacji obsługi leadów: zbieranie z formularzy, reklam, maili i landing page'y, walidacja, tworzenie rekordów w CRM, routing do handlowca, zadania, follow-upy i raportowanie.",
    offers: {
      "@type": "Offer",
      priceCurrency: "PLN",
      price: "1500",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "PLN",
        minPrice: "1500",
      },
    },
    url: "https://fluxlab.pl/automatyzacja-leadow-crm",
  };

  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Automatyzacja leadów i CRM" }]} />

        {/* Hero */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-accent/10 to-transparent border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-label">Automatyzacja leadów i CRM</span>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mt-4 mb-6 leading-tight">
                Nie trać leadów przez ręczne przepisywanie i spóźnione
                follow-upy
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Wdrożę proces, w którym leady z formularzy, reklam, maili i
                landing page&rsquo;y automatycznie trafiają do CRM, dostają
                właściciela, zadanie, follow-up i raport. Twój zespół sprzedaje,
                zamiast pilnować, czy ktoś zauważył maila.
              </p>
              <div className="mt-8 flex justify-center">
                <TrackedCTA
                  href="/#kontakt"
                  location="lp_leadow_hero"
                  label="diagnoza"
                  eventName="cta_click_landing_audit"
                  className="btn-primary px-8 py-3.5 text-base"
                >
                  Zamów bezpłatną diagnozę
                </TrackedCTA>
              </div>
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
                Odpowiedź w 24h · mapa procesu · szacowany ROI · bez zobowiązań
              </p>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">Problem</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 leading-tight">
                  Ten problem zwykle nie wygląda jak katastrofa. I właśnie
                  dlatego kosztuje pieniądze.
                </h2>
              </div>
              <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-4 mb-10">
                <p>
                  Lead wpada do firmy. Ktoś dostaje maila. Ktoś ma przepisać
                  dane. Ktoś ma założyć deal w CRM. Ktoś ma pamiętać o
                  follow-upie. Ktoś ma potem zrobić raport.
                </p>
                <p>
                  Brzmi znajomo? To nie jest proces. To jest łańcuch nadziei z
                  CRM-em w tle.
                </p>
              </div>
              <ul className="space-y-3">
                {problemPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
                  >
                    <svg
                      className="flex-shrink-0 mt-0.5 text-accent"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M10 6v4M10 13v.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Rozwiązanie */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">Rozwiązanie</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                  Co można zautomatyzować jako pierwszy etap?
                </h2>
              </div>
              <div className="space-y-4">
                {solutionSteps.map((step, i) => (
                  <div
                    key={step.title}
                    className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 flex items-start gap-5"
                  >
                    <span className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-accent/10 text-accent text-sm font-bold">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Dla kogo */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">Dla kogo</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                  Dla kogo to ma sens?
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
                  Największy efekt pojawia się tam, gdzie jest powtarzalność,
                  wolumen i realna wartość jednego leada.
                </p>
              </div>
              <ul className="space-y-3">
                {forWhom.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
                  >
                    <svg
                      className="flex-shrink-0 mt-0.5 text-accent"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M4 10l4 4 8-8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Dla kogo NIE */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">Wykluczenia</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                  Dla kogo to nie ma sensu?
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
                  Automatyzacja nie naprawia braku procesu. Ona tylko szybciej
                  wykonuje to, co zostało dobrze zaprojektowane.
                </p>
              </div>
              <ul className="space-y-3">
                {notForWhom.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
                  >
                    <svg
                      className="flex-shrink-0 mt-0.5 text-gray-400"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M5 5l10 10M15 5L5 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-gray-500 dark:text-gray-500 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Jak wygląda współpraca */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">Współpraca</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                  Od chaosu do działającej automatyzacji
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {cooperationSteps.map((step, i) => (
                  <div
                    key={step.title}
                    className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6"
                  >
                    <span className="text-3xl font-bold text-accent">
                      {i + 1}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Cennik */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">Cennik</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                  Ile kosztuje automatyzacja leadów i CRM?
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed max-w-2xl mx-auto">
                  Każdy proces wyceniam po diagnozie, bo koszt zależy od liczby
                  źródeł leadów, CRM, reguł routingu, jakości danych i
                  integracji. Poniżej orientacyjne zakresy dla typowych wdrożeń.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {pricing.map((tier) => (
                  <div
                    key={tier.name}
                    className={`rounded-2xl p-6 border ${
                      tier.highlighted
                        ? "bg-accent-light dark:bg-accent-dark-light border-accent/30"
                        : "bg-white dark:bg-gray-800/60 border-gray-100 dark:border-gray-700"
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {tier.name}
                    </h3>
                    <p className="text-2xl font-bold text-accent mb-3">
                      {tier.price}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {tier.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex justify-center">
                <TrackedCTA
                  href="/#kontakt"
                  location="lp_leadow_pricing"
                  label="cennik"
                  eventName="cta_click_pricing"
                  className="btn-primary px-8 py-3.5 text-base"
                >
                  Sprawdź koszt mojego procesu
                </TrackedCTA>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                Najczęstsze pytania
              </h2>
              <div className="space-y-4">
                {faq.map((item) => (
                  <details
                    key={item.question}
                    className="group bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden"
                  >
                    <summary className="cursor-pointer px-6 py-5 flex items-center justify-between gap-4 list-none">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {item.question}
                      </span>
                      <svg
                        className="flex-shrink-0 transition-transform group-open:rotate-180"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M5 7l5 5 5-5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </summary>
                    <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 lg:py-24 bg-accent/10 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Sprawdź, gdzie tracisz leady
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Krótka diagnoza procesu, mapa pierwszej automatyzacji i
                szacowany ROI. Bez zobowiązań.
              </p>
              <TrackedCTA
                href="/#kontakt"
                location="lp_leadow_final"
                label="diagnoza"
                eventName="cta_click_landing_audit"
                className="btn-primary px-8 py-3.5 text-base"
              >
                Zamów bezpłatną diagnozę
              </TrackedCTA>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                Odpowiedź w 24h · mapa procesu · szacowany ROI · bez zobowiązań
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
