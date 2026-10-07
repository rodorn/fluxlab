import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "Automatyczne raportowanie z Pipedrive | Bez ręcznego Excela",
  description:
    "Jak zrobić automatyczne raporty sprzedaży z Pipedrive bez klejenia Excela co poniedziałek. Pipeline, źródła leadów, czas reakcji, prognozy.",
  openGraph: {
    title: "Automatyczne raportowanie z Pipedrive | Bez ręcznego Excela",
    description:
      "Jak zrobić automatyczne raporty sprzedaży z Pipedrive bez klejenia Excela co poniedziałek. Pipeline, źródła leadów, czas reakcji, prognozy.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, Automatyczne raportowanie z Pipedrive",
      },
    ],
  },
  alternates: {
    canonical: "/raportowanie-z-pipedrive",
  },
};

const symptoms = [
  "Co poniedziałek ktoś eksportuje deale do CSV i skleja je z arkuszem marketingu.",
  "Każdy liczy „pipeline” swoją metodą, więc raport co tydzień wygląda inaczej.",
  "Liczby z Pipedrive nie zgadzają się z fakturami ani z marketingiem.",
  "Źródło leada jest puste w połowie rekordów.",
];

const afterSteps = [
  {
    n: "1",
    title: "Pipedrive jako jedno źródło prawdy",
    desc: "Deale, osoby, aktywności i custom fields pobieramy przez API. Bez eksportów CSV.",
    accent: false,
  },
  {
    n: "2",
    title: "Synchronizacja do arkusza lub BI",
    desc: "Cykliczny pull do Google Sheets, Postgresa, BigQuery, Looker Studio albo Metabase.",
    accent: false,
  },
  {
    n: "3",
    title: "Łączenie z innymi danymi",
    desc: "Marketing (UTM, kampanie, koszty), księgowość (faktury) i call center w jednym miejscu.",
    accent: true,
  },
  {
    n: "4",
    title: "Walidacja pól",
    desc: "Brak źródła, etapu albo właściciela to alert, a nie cicha luka w raporcie.",
    accent: false,
  },
  {
    n: "5",
    title: "Raporty i alerty",
    desc: "Manager dostaje raport mailem co rano, zarząd raz w tygodniu. Deal stojący za długo w etapie wywołuje alert.",
    accent: true,
  },
];

const firstStage = [
  "Codzienny pull deali z Pipedrive do Google Sheets albo Postgresa.",
  "Walidacja kompletności pól (źródło, etap, właściciel, wartość).",
  "Jeden dashboard pipeline'u: liczba deali, wartość, średni czas, konwersja po etapach.",
  "Alert, gdy deal stoi w jednym etapie ponad ustalony czas.",
];

const faq = [
  {
    question: "Czy potrzebujemy BI typu Power BI, Looker albo Metabase?",
    answer:
      "Nie zawsze. Małej firmie wystarczy Google Sheets zasilany automatycznie z Pipedrive. Przy wielu źródłach danych polecamy Looker Studio albo Metabase.",
  },
  {
    question: "Jak często aktualizować dane?",
    answer:
      "Dashboard pipeline'u co 15 minut do godziny, prognozę raz dziennie, alerty o stojących dealach od razu przez webhook.",
  },
  {
    question: "Czy raporty przetrwają zmiany w Pipedrive?",
    answer:
      "Tak. Mapowanie pól trzymamy w jednym miejscu, a zmiana schematu (nowy etap, nowe pole) wywołuje alert zamiast cichej awarii.",
  },
  {
    question: "Ile to trwa?",
    answer:
      "Etap 1 zajmuje od 3 do 5 dni roboczych. Pełne raportowanie z marketingiem i prognozą od 2 do 4 tygodni.",
  },
];

export default function RaportowanieZPipedrive() {
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
        name: "Automatyczne raportowanie z Pipedrive",
        item: "https://fluxlab.pl/raportowanie-z-pipedrive",
      },
    ],
  };

  return (
    <>
      <Header />
      <main>
        <Breadcrumbs
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Automatyczne raportowanie z Pipedrive" },
          ]}
        />

        <section className="pt-24 pb-12 bg-gradient-to-b from-accent/10 to-transparent border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-label">Raportowanie Pipedrive</span>
              <h1 className="mt-4 text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Automatyczne raporty z Pipedrive bez ręcznego Excela
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Pipedrive zna każdy deal i każdą zmianę etapu, a raporty i tak
                powstają ręcznie w piątek wieczorem. Ustawiamy to tak, żeby
                zarząd dostawał raport codziennie rano bez klejenia arkuszy.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <TrackedCTA
                  href="#sekcje"
                  location="article_raportowanie_pipedrive_hero"
                  label="Chcemy raporty bez ręcznej pracy"
                  eventName="cta_click_article_audit"
                  className="btn-primary text-base px-7 py-3"
                >
                  Chcemy raporty bez ręcznej pracy
                </TrackedCTA>
                <Link href="/automatyzacja-pipedrive" className="btn-secondary">
                  Zobacz pełną ofertę Pipedrive
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje artykułu o raportowaniu z Pipedrive"
            tabs={[
              {
                label: "Problem",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Problem</span>
                      <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Czemu raporty z CRM-a tak bolą
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                        Wbudowane raporty Pipedrive są za proste na zarząd i nie
                        łączą się z marketingiem ani księgowością. Dlatego firmy
                        kończą w Excelu, gdzie każdy tydzień liczy się inaczej.
                      </p>
                      <ul className="space-y-3 mb-6">
                        {symptoms.map((s) => (
                          <li key={s} className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4">
                            <span className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-accent" />
                            <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {s}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          <strong className="text-gray-900 dark:text-white">
                            4 raporty w tygodniu × 1,5 h × 100 zł/h × 50 tygodni
                            ={" "}
                            <span className="text-accent">30 000 zł / rok</span>
                          </strong>{" "}
                          samego klejenia danych. Do tego spóźnione decyzje i
                          raport, który znika, gdy jedna osoba idzie na urlop.
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Jak to działa",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="container-wide">
                      <div className="max-w-2xl mb-10">
                        <span className="section-label">Jak to działa</span>
                        <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                          Tak to wygląda, gdy raport robi się sam
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                          Łańcuch: Pipedrive, warstwa danych, wyliczenia,
                          raporty. Każdy element da się zbudować osobno.
                        </p>
                      </div>

                      <ol className="relative max-w-4xl space-y-3 lg:space-y-4">
                        {afterSteps.map((s, i) => (
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
                            {i < afterSteps.length - 1 && (
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
                  </div>
                ),
              },
              {
                label: "Etap 1",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Etap 1</span>
                      <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Co wdrożyć najpierw
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                        Najmniejszy kawałek, który usuwa ręczny eksport i
                        klejenie pipeline'u. Zajmuje od 3 do 5 dni roboczych.
                      </p>
                      <ul className="space-y-3">
                        {firstStage.map((s) => (
                          <li key={s} className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4">
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
                              {s}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                        Po wdrożeniu mierzymy efekt przez 2 do 3 tygodni. Źródła
                        leadów i prognoza idą w drugim etapie.
                      </p>
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
                      <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Ile to kosztuje
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                        Stała cena za projekt, płatna w transzach. Widełki
                        potwierdzamy po krótkim audycie.
                      </p>
                      <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60">
                        <table className="w-full text-left">
                          <thead className="bg-gray-50 dark:bg-gray-900/50 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            <tr>
                              <th className="px-6 py-4 font-semibold">
                                Zakres
                              </th>
                              <th className="px-6 py-4 font-semibold">
                                Co dostajesz
                              </th>
                              <th className="px-6 py-4 font-semibold">
                                Widełki
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-sm text-gray-700 dark:text-gray-300 divide-y divide-gray-100 dark:divide-gray-700">
                            <tr>
                              <td className="px-6 py-5 font-semibold text-gray-900 dark:text-white align-top">
                                Etap 1, minimalny
                              </td>
                              <td className="px-6 py-5 align-top">
                                Codzienny pull deali, dashboard pipeline'u,
                                walidacja pól, alert o stojących dealach.
                              </td>
                              <td className="px-6 py-5 align-top whitespace-nowrap font-semibold text-accent">
                                4 do 7 tys. zł
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-5 font-semibold text-gray-900 dark:text-white align-top">
                                Etap 2, pełny
                              </td>
                              <td className="px-6 py-5 align-top">
                                Etap 1 oraz źródła leadów, czas reakcji, wyniki
                                handlowców, prognoza, alerty anomalii.
                              </td>
                              <td className="px-6 py-5 align-top whitespace-nowrap font-semibold text-accent">
                                10 do 18 tys. zł
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-5 font-semibold text-gray-900 dark:text-white align-top">
                                Wieloźródłowe BI
                              </td>
                              <td className="px-6 py-5 align-top">
                                Powyższe oraz marketing, księgowość, call center
                                i dashboardy w Looker, Metabase lub Power BI.
                              </td>
                              <td className="px-6 py-5 align-top whitespace-nowrap font-semibold text-accent">
                                18 do 30 tys. zł
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <TrackedCTA
                          href="/automatyzacja-leadow-crm"
                          location="article_raportowanie_pipedrive_pricing"
                          label="Zobacz pełną ofertę"
                          eventName="cta_click_article_audit"
                          className="btn-secondary"
                        >
                          Zobacz pełną ofertę: automatyzacja leadów do CRM
                        </TrackedCTA>
                        <TrackedCTA
                          href="/kontakt"
                          location="article_raportowanie_pipedrive_pricing_primary"
                          label="Chcemy raporty bez ręcznej pracy"
                          eventName="cta_click_article_audit"
                          className="btn-primary"
                        >
                          Chcemy raporty bez ręcznej pracy
                        </TrackedCTA>
                      </div>
                      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        Powiązane:{" "}
                        <Link
                          href="/automatyzacja-pipedrive"
                          className="text-accent hover:underline"
                        >
                          automatyzacja Pipedrive
                        </Link>
                        ,{" "}
                        <Link
                          href="/automatyzacja-formularza-do-pipedrive"
                          className="text-accent hover:underline"
                        >
                          integracja formularza z Pipedrive
                        </Link>
                        ,{" "}
                        <Link
                          href="/strefa-wiedzy/jak-zautomatyzowac-raportowanie-w-firmie"
                          className="text-accent hover:underline"
                        >
                          jak zautomatyzować raportowanie w firmie
                        </Link>
                        .
                      </p>
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
                        Czas, żeby raporty robiły się same
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                        W 30 minut sprawdzimy, czy pierwszy etap da się zamknąć
                        w 3 do 5 dni. Bez zobowiązań.
                      </p>
                      <TrackedCTA
                        href="/kontakt"
                        location="article_raportowanie_pipedrive_final"
                        label="Chcemy raporty bez ręcznej pracy"
                        eventName="cta_click_article_audit"
                        className="btn-primary text-base px-7 py-3"
                      >
                        Chcemy raporty bez ręcznej pracy
                      </TrackedCTA>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>

        <div className="pb-8">
          <Breadcrumbs
            items={[{ label: "Automatyczne raportowanie z Pipedrive" }]}
          />
        </div>
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
