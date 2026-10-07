import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "CRM dla firm leasingowych i brokerów leasingu | Fluxlab",
  description:
    "CRM w leasingu, który sam przypisze lead po regionie, uzupełni dane po NIP z CEIDG i KRS, przygotuje wniosek do leasingodawcy i policzy prowizję.",
  openGraph: {
    title: "CRM dla firm leasingowych i brokerów leasingu | Fluxlab",
    description:
      "CRM w leasingu, który sam przypisze lead po regionie, uzupełni dane po NIP z CEIDG i KRS, przygotuje wniosek do leasingodawcy i policzy prowizję.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, Automatyzacja CRM dla firm leasingowych i finansowych",
      },
    ],
  },
  alternates: {
    canonical: "/automatyzacja-crm-leasing",
  },
};

const symptoms = [
  "Lead z porównywarki krąży po skrzynkach 24-48 h, zanim broker oddzwoni",
  "Handlowcy trzymają deale w Excelu i własnych folderach",
  "Wnioski do leasingodawców wypełniane ręcznie, każdy partner ma inny szablon",
  "Status decyzji przychodzi mailem i ktoś przepisuje go do CRM",
  "Prowizje liczone w Excelu na koniec miesiąca, z błędami",
];

const diagramSteps = [
  {
    n: "1",
    title: "Lead trafia do CRM",
    desc: "Wszystkie źródła na jednym wejściu, ze źródłem i UTM-ami.",
    accent: false,
  },
  {
    n: "2",
    title: "Wzbogacenie po NIP",
    desc: "GUS, CEIDG, KRS: branża, forma prawna, dane firmy.",
    accent: false,
  },
  {
    n: "3",
    title: "BIK / KRD po zgodzie klienta",
    desc: "Wstępny scoring zapisany w dealu. Broker dzwoni z kontekstem.",
    accent: true,
  },
  {
    n: "4",
    title: "Przypisanie do brokera",
    desc: "Po regionie, produkcie, jakości źródła i obciążeniu.",
    accent: false,
  },
  {
    n: "5",
    title: "Wniosek do leasingodawcy",
    desc: "Jednym kliknięciem, w szablonie konkretnego partnera.",
    accent: true,
  },
  {
    n: "6",
    title: "Status decyzji i prowizja",
    desc: "Status wraca do CRM sam, klient dostaje SMS. Prowizja liczy się po wypłacie.",
    accent: true,
  },
];

const faq = [
  {
    question: "Czy automatyzacja BIK/KRD jest legalna?",
    answer:
      "Tak, jeśli macie zgodę klienta i umowę z BIK lub KRD. CRM odpytuje API dopiero po zgodzie i zapisuje wynik w dealu. Wdrożenie konsultujemy z Waszym prawnikiem lub IOD.",
  },
  {
    question: "Mamy własny CRM sprzed lat. Da się go spiąć?",
    answer:
      "Tak, jeśli ma API, eksport CSV albo dostęp do bazy. Zwykle budujemy warstwę pośrednią (n8n self-hosted), która łączy systemy bez wymiany CRM.",
  },
  {
    question: "Czy musimy integrować się ze wszystkimi leasingodawcami?",
    answer:
      "Nie. Zaczynamy od 1-2 partnerów, którzy dają większość wolumenu. Gdy ktoś nie ma API, automatyzujemy wysyłkę dokumentów do jego portalu.",
  },
  {
    question: "Co z RODO?",
    answer:
      "Automatyzację stawiamy na n8n self-hosted na Waszym serwerze w Polsce lub EOG. Konfigurujemy retencję, rejestr zgód i logi dostępu.",
  },
];

export default function AutomatyzacjaCrmLeasing() {
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

  return (
    <>
      <Header />
      <main>
        <Breadcrumbs
          items={[
            { label: "Automatyzacja CRM dla firm leasingowych i finansowych" },
          ]}
        />

        <section className="pt-16 pb-6 bg-gradient-to-b from-accent/10 to-transparent border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-label mb-4">Branża: leasing i finanse</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Automatyzacja leadów i CRM dla firm leasingowych, finansowych i
                brokerskich
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                Automatyzujemy obsługę leada od wpadnięcia do CRM, przez BIK/KRD
                i wniosek do leasingodawcy, aż po prowizję. Zgodnie z RODO i
                wymogami sektora finansowego.
              </p>
              <TrackedCTA
                href="#sekcje"
                location="article_automatyzacja-crm-leasing_hero"
                label="Chcemy audyt procesu leadów"
                eventName="cta_click_article_audit"
                className="btn-primary"
              >
                Chcemy audyt procesu leadów
              </TrackedCTA>
            </div>
          </div>
        </section>

        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje strony automatyzacji CRM dla leasingu"
            tabs={[
              {
                label: "Problem",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Problem</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                        Pipeline w głowie brokera, prowizje w Excelu
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        Zwykły CRM (Pipedrive, HubSpot) nie łączy się z BIK,
                        portalami leasingodawców ani z prowizją
                        wieloskładnikową. Reszta pracy zostaje ręczna.
                      </p>
                      <ul className="space-y-3">
                        {symptoms.map((s) => (
                          <li
                            key={s}
                            className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
                          >
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {s}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ),
              },
              {
                label: "Koszt problemu",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Koszt problemu</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                        Ile to kosztuje firmę 6-osobową
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        Przykład: 4 brokerów i 2 osoby w backoffice, 800 leadów
                        i 80 wniosków miesięcznie, średnia prowizja 1 200 zł
                        netto.
                      </p>
                      <div className="grid sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            Wolna reakcja na lead
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            ~14 400 zł/mies.
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            Ręczne wnioski
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            60 h/mies.
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            Łącznie
                          </p>
                          <p className="text-2xl font-bold text-accent">
                            ~25-35 tys. zł
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Czy wdrożenie się spłaci, liczymy na Waszych danych
                        przed wyceną.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                label: "Jak to działa",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto mb-8">
                      <span className="section-label">Jak to działa</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-4">
                        Od leada do prowizji bez przepisywania
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Wyróżnione kroki to miejsca, w których zwykły CRM się
                        kończy.
                      </p>
                    </div>
                    <ol className="relative max-w-3xl mx-auto space-y-3">
                      {diagramSteps.map((s) => (
                        <li
                          key={s.n}
                          className={`flex gap-4 items-start bg-white dark:bg-gray-800/80 border rounded-2xl p-5 ${
                            s.accent
                              ? "border-accent/40"
                              : "border-gray-100 dark:border-gray-700"
                          }`}
                        >
                          <div
                            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm tabular-nums ${
                              s.accent
                                ? "bg-accent-solid text-white"
                                : "bg-accent-light dark:bg-accent-dark-light text-accent"
                            }`}
                          >
                            {s.n}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              {s.title}
                            </h3>
                            <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                              {s.desc}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                ),
              },
              {
                label: "Cennik",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Cennik</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-4">
                        Ile kosztuje wdrożenie
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                        Stała cena, kamienie milowe, płatność po odbiorze etapu.
                        Zaczynamy od jednej pętli, której efekt da się zmierzyć.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            Pierwszy etap
                          </p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            8-15 tys. zł
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            Przypisywanie leadów, wzbogacenie, integracja z 1
                            leasingodawcą, SMS do klienta. 3-5 tygodni.
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800/60 border border-accent/30 rounded-2xl p-6">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            Pełna warstwa branżowa
                          </p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            25-60 tys. zł
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            Wszyscy partnerzy, scoring BIK/KRD, prowizje,
                            raporty. 3-6 miesięcy etapami.
                          </p>
                        </div>
                      </div>
                      <Link
                        href="/automatyzacja-leadow-crm"
                        className="btn-secondary"
                      >
                        Zobacz pełny cennik automatyzacji CRM
                      </Link>
                    </div>
                  </div>
                ),
              },
              {
                label: "FAQ",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
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
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-10 mb-3">
                        Powiązane
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <Link
                            href="/automatyzacja-leadow-crm"
                            className="text-accent hover:underline"
                          >
                            Automatyzacja leadów i CRM
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/automatyzacja-formularza-do-pipedrive"
                            className="text-accent hover:underline"
                          >
                            Automatyzacja Pipedrive
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/strefa-wiedzy/zapier-make-n8n-porownanie"
                            className="text-accent hover:underline"
                          >
                            Zapier, Make czy n8n
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                ),
              },
              {
                label: "Audyt",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-2xl mx-auto text-center">
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Audyt procesu leadów dla biura brokerskiego
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                        30 minut rozmowy. Dostajesz mapę procesu, 3 miejsca do
                        automatyzacji i widełki cenowe. Bez zobowiązań.
                      </p>
                      <TrackedCTA
                        href="/kontakt"
                        location="article_automatyzacja-crm-leasing_final"
                        label="Chcemy audyt procesu leadów"
                        eventName="cta_click_article_audit"
                        className="btn-primary"
                      >
                        Chcemy audyt procesu leadów
                      </TrackedCTA>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
