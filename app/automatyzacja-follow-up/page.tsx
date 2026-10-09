import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";

export const metadata: Metadata = {
  title: "Automatyzacja follow-upów w CRM | Fluxlab",
  description:
    "Follow-upy w CRM: przypomnienia sprzedażowe, sekwencje po etapach deala i eskalacje, które pilnują leadów zamiast handlowca.",
  openGraph: {
    title: "Automatyzacja follow-upów w CRM | Fluxlab",
    description:
      "Follow-upy w CRM: przypomnienia sprzedażowe, sekwencje po etapach deala i eskalacje, które pilnują leadów zamiast handlowca.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, Automatyzacja leadów, CRM i raportowania dla firm B2B",
      },
    ],
  },
  alternates: {
    canonical: "/automatyzacja-follow-up",
  },
};

const problemPoints = [
  "Handlowiec sam pamięta, do kogo i kiedy się odezwać.",
  "Połowa leadów nie dostaje drugiego kontaktu w ogóle.",
  "W pipeline siedzą deale bez aktywności od miesięcy.",
  "Po urlopie handlowca część leadów przepada.",
];

const workflowSteps = [
  {
    n: "1",
    title: "Wejście do sekwencji",
    desc: "Zmiana etapu deala, np. „wysłana oferta”, uruchamia sekwencję.",
  },
  {
    n: "2",
    title: "Przypomnienia z kontekstem",
    desc: "Po 2, 5 i 10 dniach handlowiec dostaje zadanie z szablonem i kontekstem rozmowy, w różnych kanałach.",
  },
  {
    n: "3",
    title: "Odpowiedź klienta wstrzymuje sekwencję",
    desc: "Mail, telefon albo kliknięcie pauzuje automat, handlowiec przejmuje rozmowę.",
  },
  {
    n: "4",
    title: "Eskalacja albo zamknięcie",
    desc: "Po 20 dniach bez reakcji deal trafia do nurturingu albo zamyka się jako „brak kontaktu”.",
  },
  {
    n: "5",
    title: "Raport tygodniowy",
    desc: "Manager widzi liczbę follow-upów, odpowiedzi i miejsca, gdzie sekwencja się zacina.",
  },
];

const pricing = [
  {
    name: "Diagnoza follow-upu",
    price: "0 zł",
    description:
      "Analiza obecnych sekwencji i miejsc, gdzie leady się gubią.",
  },
  {
    name: "Pierwsza sekwencja",
    price: "od 1 800 zł",
    description:
      "Jedna sekwencja dla wybranego etapu deala: zadania, szablony, pauza po odpowiedzi.",
    highlighted: true,
  },
  {
    name: "Pełny system follow-upów",
    price: "od 3 500 zł",
    description:
      "Sekwencje dla wszystkich etapów, eskalacje i raport skuteczności.",
  },
];

const faq = [
  {
    question: "Czy automatyczne follow-upy nie wyglądają jak spam?",
    answer:
      "Nie, jeśli sekwencja wstrzymuje się po odpowiedzi klienta, używa kontekstu rozmowy i ma najwyżej 3 do 4 kontaktów.",
  },
  {
    question: "Czy handlowcy nie stracą kontroli nad dealami?",
    answer:
      "Nie. Dostają codzienną listę zadań i mogą zatrzymać sekwencję jednym kliknięciem.",
  },
  {
    question: "Jakie CRM-y obsługujecie?",
    answer:
      "Najczęściej Pipedrive, HubSpot i Salesforce. Inne łączymy przez n8n, Make albo API.",
  },
  {
    question: "Ile trwa wdrożenie pierwszej sekwencji?",
    answer:
      "Zwykle 5 do 10 dni roboczych. Pełny system z eskalacjami i raportem to 3 do 5 tygodni.",
  },
];

export default function AutomatyzacjaFollowUp() {
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Strona główna",
        item: "https://fluxlab.pl/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Automatyzacja follow-upów w CRM",
        item: "https://fluxlab.pl/automatyzacja-follow-up",
      },
    ],
  };

  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs href="/automatyzacja-follow-up" kolumna="srodek" items={[{ label: "Automatyzacja follow-upów w CRM" }]} />

        <section className="pt-16 pb-10 bg-gradient-to-b from-accent/10 to-transparent border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl">
              <span className="section-label">Usługa</span>
              <h1 className="h1-strony mt-4 mb-6">
                Automatyczne follow-upy w CRM bez utraty kontroli nad sprzedażą
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Ustawiamy sekwencje przypomnień i eskalacje, które pilnują
                każdego deala zamiast handlowca. Sekwencja sama staje, gdy klient
                odpowie.
              </p>
              <div className="mt-8 flex">
                <TrackedCTA
                  href="#sekcje"
                  location="article_automatyzacja-follow-up_hero"
                  label="Bezpłatna diagnoza"
                  eventName="cta_click_article_audit"
                  className="btn-primary"
                >
                  Bezpłatna diagnoza
                </TrackedCTA>
              </div>
            </div>
          </div>
        </section>

        <div id="sekcje" className="scroll-mt-20 container-wide py-16 space-y-16">
          <section className="max-w-3xl mx-auto">
            <h2 className="h2-sekcji mb-4">
              Follow-up nie powinien zależeć od pamięci handlowca
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              W większości firm B2B follow-up to dobra intencja, nie proces.
              „Odezwę się za tydzień” kończy się po trzech tygodniach albo wcale.
            </p>
            <ul className="space-y-3">
              {problemPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="max-w-3xl mx-auto">
            <h2 className="h2-sekcji mb-4">
              Ile kosztuje zaniedbany follow-up
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Przykład: 4 handlowców, po 30 deali za 15 000 zł. Spadek konwersji
              z 22% do 9% przez brak drugiego kontaktu to 234 000 zł niepodjętej
              sprzedaży kwartalnie. Wdrożenie dla takiego zespołu zwraca się
              przy odzyskaniu jednego deala.
            </p>
          </section>

          <section className="max-w-3xl mx-auto">
            <h2 className="h2-sekcji mb-6">
              Jak działa sekwencja po wysłanej ofercie
            </h2>
            <ol className="space-y-3">
              {workflowSteps.map((s) => (
                <li
                  key={s.n}
                  className="flex gap-4 items-start bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700 rounded-2xl p-5"
                >
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-accent-light dark:bg-accent-dark-light text-accent flex items-center justify-center font-bold text-sm tabular-nums">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {s.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="max-w-4xl mx-auto">
            <h2 className="h2-sekcji mb-4 text-center">
              Ile kosztuje automatyzacja follow-upów
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
              Orientacyjne widełki. Diagnoza zawsze bezpłatna.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
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
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <TrackedCTA
                href="/automatyzacja-leadow-crm"
                location="article_automatyzacja-follow-up_pricing"
                label="zobacz pełną ofertę"
                eventName="cta_click_article_audit"
                className="btn-secondary px-6 py-3 text-base"
              >
                Zobacz pełną ofertę
              </TrackedCTA>
              <TrackedCTA
                href="/kontakt"
                location="article_automatyzacja-follow-up_pricing"
                label="Bezpłatna diagnoza"
                eventName="cta_click_article_audit"
                className="btn-primary px-8 py-3.5 text-base"
              >
                Bezpłatna diagnoza
              </TrackedCTA>
            </div>
          </section>

          <section className="max-w-3xl mx-auto">
            <h2 className="h2-sekcji mb-6">
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
          </section>

          <section className="max-w-3xl mx-auto">
            <h2 className="h2-sekcji mb-4">
              Zobacz też
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/automatyzacja-leadow-crm" className="text-accent hover:underline">
                  Automatyzacja leadów i CRM
                </Link>
              </li>
              <li>
                <Link href="/automatyzacja-formularza-do-pipedrive" className="text-accent hover:underline">
                  Automatyzacja formularza do Pipedrive
                </Link>
              </li>
              <li>
                <Link href="/strefa-wiedzy/automatyzacja-crm-od-czego-zaczac" className="text-accent hover:underline">
                  Automatyzacja CRM, od czego zacząć
                </Link>
              </li>
            </ul>
          </section>
        </div>
        <CTA />

      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
