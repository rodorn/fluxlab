import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "n8n dla CRM | Automatyzacja leadów, zadań i raportów",
  description:
    "Jak n8n staje się warstwą automatyzacji nad Pipedrive, HubSpotem i Salesforce: routing leadów, sync, raporty, follow-upy. Self-hosted czy cloud.",
  openGraph: {
    title: "n8n dla CRM | Automatyzacja leadów, zadań i raportów",
    description:
      "Jak n8n staje się warstwą automatyzacji nad Pipedrive, HubSpotem i Salesforce: routing leadów, sync, raporty, follow-upy. Self-hosted czy cloud.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, n8n dla CRM",
      },
    ],
  },
  alternates: {
    canonical: "/n8n-dla-crm",
  },
};

const problems = [
  "Lead z formularza trafia do skrzynki, a nie do CRM",
  "Custom fieldy i UTM-y giną w natywnej integracji",
  "Status w CRM nie zgadza się z fakturowaniem i księgowością",
  "Raport sprzedaży powstaje ręcznie z kilku eksportów CSV",
];

const diagramSteps = [
  {
    n: "1",
    title: "Webhook z formularza",
    desc: "Wszystkie źródła leadów trafiają do jednego wejścia w n8n.",
    accent: false,
  },
  {
    n: "2",
    title: "Walidacja i wzbogacenie",
    desc: "NIP w GUS, scoring i deduplikacja w CRM.",
    accent: true,
  },
  {
    n: "3",
    title: "Zapis w CRM i routing",
    desc: "Osoba, organizacja i deal z pełnymi polami, przypisane do handlowca po regule.",
    accent: true,
  },
  {
    n: "4",
    title: "Zadanie i powiadomienie",
    desc: "Zadanie „kontakt w 5 minut” w CRM i powiadomienie na Slacku albo SMS-em.",
    accent: false,
  },
  {
    n: "5",
    title: "Sync i raport",
    desc: "Zmiana etapu aktualizuje fakturowanie i księgowość, a raport KPI przychodzi sam.",
    accent: false,
  },
];

const faq = [
  {
    question: "Czym n8n różni się od wbudowanych automatyzacji w CRM?",
    answer:
      "Wbudowane workflow są dobre do prostej logiki w jednym CRM. n8n dochodzi tam, gdzie trzeba wywołać dowolne API, przekształcić dane albo synchronizować się z innym systemem.",
  },
  {
    question: "Czy n8n pasuje do Pipedrive, HubSpota i Salesforce?",
    answer:
      "Tak, do wszystkich trzech. Pipedrive jest najprostszy, HubSpot w darmowym planie blokuje część API, a Salesforce wymaga konta z dostępem do API.",
  },
  {
    question: "Co z RODO, gdy lead leci przez n8n?",
    answer:
      "n8n na Twoim serwerze trzyma dane u Ciebie. n8n.cloud ma serwery w UE i DPA, co wystarcza większości firm B2B.",
  },
  {
    question: "Czy możemy utrzymać workflow sami po wdrożeniu?",
    answer:
      "Tak. Dostajesz dokumentację i 30 dni darmowych poprawek, a dalsza opieka nie jest obowiązkowa.",
  },
];

export default function N8nDlaCrm() {
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
        <Breadcrumbs kolumna="srodek" items={[{ label: "n8n dla CRM" }]} />

        <section className="pt-24 pb-12 bg-gradient-to-b from-accent/10 to-transparent border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-label mb-4">n8n dla CRM</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                n8n jako warstwa automatyzacji dla CRM
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                Automatyzacje w Pipedrive, HubSpocie czy Salesforce kończą się
                tam, gdzie trzeba połączyć CRM z innym systemem. Wtedy wpinamy
                n8n, który robi resztę.
              </p>
              <TrackedCTA
                href="#sekcje"
                location="article_n8n-dla-crm_hero"
                label="Sprawdź, czy n8n ma sens u nas"
                eventName="cta_click_article_audit"
                className="btn-primary"
              >
                Sprawdź, czy n8n ma sens u nas
              </TrackedCTA>
            </div>
          </div>
        </section>

        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje artykułu o n8n dla CRM"
            tabs={[
              {
                label: "Problem",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Problem</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                        Gdzie CRM przestaje wyrabiać
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        Lead wpada, ktoś go ręcznie przepisuje, ktoś inny
                        aktualizuje status, a raport klei się w piątek. Natywne
                        workflow CRM łatają część tego, ale szybko trafiają na
                        limity.
                      </p>
                      <ul className="space-y-3">
                        {problems.map((p) => (
                          <li
                            key={p}
                            className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">
                              {p}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ),
              },
              {
                label: "Jak to działa",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto mb-10">
                      <span className="section-label">Jak to działa</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-4">
                        Od formularza do raportu, bez przepisywania
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Każdy krok budujemy osobno i mierzymy efekt. Wyróżnione
                        kroki to te, przy których natywne workflow CRM zwykle
                        nie dają rady.
                      </p>
                    </div>
                    <ol className="relative max-w-3xl mx-auto space-y-3 lg:space-y-4">
                      {diagramSteps.map((s, i, arr) => (
                        <li key={s.n} className="relative">
                          <div
                            className={`flex gap-4 lg:gap-5 items-start bg-white dark:bg-gray-800/80 border rounded-2xl p-5 lg:p-6 ${
                              s.accent
                                ? "border-accent/40 shadow-sm"
                                : "border-gray-100 dark:border-gray-700"
                            }`}
                          >
                            <div
                              className={`flex-shrink-0 w-10 h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center font-bold text-sm tabular-nums ${
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
                          </div>
                          {i < arr.length - 1 && (
                            <div className="flex justify-center py-1.5">
                              <svg
                                className="text-gray-500 dark:text-gray-400"
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                aria-hidden="true"
                              >
                                <path
                                  d="M7 2v8m0 0l-3-3m3 3l3-3"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>
                ),
              },
              {
                label: "Cloud czy własny serwer",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Decyzja techniczna</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                        n8n.cloud czy własny serwer
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        Bez osoby od infrastruktury zacznij od chmury. Przeniesienie
                        na własny serwer jest proste, gdy wiadomo już, które
                        workflow zostają.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            n8n.cloud, gdy:
                          </h3>
                          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li>• do 10 tys. wykonań miesięcznie</li>
                            <li>• brak osoby technicznej</li>
                            <li>• start w tym tygodniu</li>
                          </ul>
                        </div>
                        <div className="bg-white dark:bg-gray-800/60 border border-accent/30 rounded-2xl p-6">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Własny serwer, gdy:
                          </h3>
                          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li>• powyżej 30 tys. wykonań miesięcznie</li>
                            <li>• własne API i bazy w sieci wewnętrznej</li>
                            <li>• branża regulowana</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Cennik",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Cennik</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-4">
                        Ile to kosztuje
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                        Stała cena, kamienie milowe, płatność po odbiorze etapu.
                        Zaczynamy od pętli, której efekt widać po dwóch
                        tygodniach.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            Pierwszy etap
                          </p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            4 do 8 tys. zł
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            Routing leadów, walidacja, zapis w CRM i prosty
                            raport. 2 do 3 tygodni.
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800/60 border border-accent/30 rounded-2xl p-6">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            Pełna warstwa nad CRM
                          </p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            12 do 25 tys. zł
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            Do tego sync z innymi systemami, raporty, follow-up
                            i onboarding. 4 do 8 tygodni etapami.
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
                  <div className="py-10 lg:py-12">
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
                ),
              },
              {
                label: "Kontakt",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-2xl mx-auto text-center">
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Sprawdźmy, gdzie u was n8n ma sens
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                        30 minut rozmowy o procesie. Dostaniesz listę miejsc do
                        automatyzacji albo uczciwą informację, że n8n jeszcze
                        się nie opłaca.
                      </p>
                      <TrackedCTA
                        href="/kontakt"
                        location="article_n8n-dla-crm_final"
                        label="Sprawdź, czy n8n ma sens u nas"
                        eventName="cta_click_article_audit"
                        className="btn-primary"
                      >
                        Sprawdź, czy n8n ma sens u nas
                      </TrackedCTA>
                      <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                        <li>
                          <Link href="/n8n" className="text-accent hover:underline">
                            Wdrożenia n8n
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/strefa-wiedzy/make-vs-n8n"
                            className="text-accent hover:underline"
                          >
                            Make vs n8n
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/make-vs-n8n-crm"
                            className="text-accent hover:underline"
                          >
                            Make vs n8n dla CRM
                          </Link>
                        </li>
                      </ul>
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
