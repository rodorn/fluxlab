import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "Make czy n8n do automatyzacji CRM? | Fluxlab",
  description:
    "Make vs n8n w roli warstwy automatyzacji nad CRM. Pięć typowych problemów, jak rozwiązuje je każde z narzędzi, i kiedy wybrać które.",
  openGraph: {
    title: "Make czy n8n do automatyzacji CRM? | Fluxlab",
    description:
      "Make vs n8n w roli warstwy automatyzacji nad CRM. Pięć typowych problemów, jak rozwiązuje je każde z narzędzi, i kiedy wybrać które.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, Make czy n8n do automatyzacji CRM",
      },
    ],
  },
  alternates: {
    canonical: "/make-vs-n8n-crm",
  },
};

const symptoms = [
  "Lead trafia do CRM z opóźnieniem dnia roboczego, nie minut",
  "Status w CRM rozjeżdża się z fakturowaniem i księgowością",
  "Raport tygodniowy klejony ręcznie z eksportów CSV",
  "Handlowcy klikają to samo w dwóch systemach",
];

const crmProblems = [
  {
    n: "1",
    title: "Lead z formularza do CRM ze wzbogaceniem",
    make: "Webhook, zapytanie do GUS, utworzenie osoby i deala. Działa w 30 minut, ale każdy moduł to osobna operacja.",
    n8n: "Ta sama struktura, a logikę deduplikacji mieści jeden węzeł z kodem. Jeden lead to jedno wykonanie.",
    winner: "Remis przy małej skali, n8n przy rozbudowanej deduplikacji.",
  },
  {
    n: "2",
    title: "Dwustronny sync CRM z ERP lub własną bazą",
    make: "Działa, ale przy wielu polach mapowanie się rozrasta, a częsty sync zjada pakiet operacji.",
    n8n: "Zwarty sync nawet przy 50+ polach. Na własnym serwerze sync co 30 sekund kosztuje tyle samo co co godzinę.",
    winner: "n8n, szczególnie przy częstym sync.",
  },
  {
    n: "3",
    title: "Raporty i KPI sprzedaży",
    make: "Wystarczy na raport z kilku metryk wysyłany mailem.",
    n8n: "Złożone metryki liczone w kodzie w jednym workflow, łatwo podpiąć dashboard.",
    winner: "Make przy prostym raporcie, n8n przy złożonym.",
  },
  {
    n: "4",
    title: "Follow-up martwych dealów",
    make: "Filtr deali bez aktywności i akcja. Łatwe dla osoby nietechnicznej.",
    n8n: "To samo plus własna logika, np. ocena szans na odzyskanie.",
    winner: "Make przy prostych regułach, n8n przy scoringu.",
  },
  {
    n: "5",
    title: "Onboarding klienta po wygranym dealu",
    make: "Folder, umowa, faktura i zadanie w czytelnym scenariuszu.",
    n8n: "Ten sam proces jako osobny workflow, który da się uruchomić też ręcznie.",
    winner: "Remis: Make czytelniejszy, n8n elastyczniejszy.",
  },
];

const comparison = [
  {
    dim: "Cena (10 tys. wykonań / mies.)",
    make: "Pro ok. 16 USD plus dopłata za operacje, typowo 30 do 50 USD/mies.",
    n8n: "n8n.cloud Pro ok. 60 EUR/mies. albo własny serwer od 25 zł/mies.",
  },
  {
    dim: "Hosting",
    make: "Tylko chmura (UE)",
    n8n: "Chmura (UE) albo własny serwer",
  },
  {
    dim: "Nauka",
    make: "Niższy próg wejścia, więcej poradników",
    n8n: "Bliżej programisty, kod w scenariuszu",
  },
  {
    dim: "Integracje CRM",
    make: "Pipedrive, HubSpot, Salesforce, Zoho natywnie",
    n8n: "Pipedrive, HubSpot, Salesforce natywnie, reszta przez HTTP",
  },
  {
    dim: "Własna logika",
    make: "Kilka modułów transformacji, głębsza logika wymaga obejść",
    n8n: "Kod JS/Python, własne moduły, wersjonowanie w gicie",
  },
];

const firstStage = [
  "jedno wejście dla wszystkich źródeł leadów",
  "wzbogacenie, deduplikacja i deal w CRM",
  "przypisanie handlowca i zadanie „kontakt w X minut”",
  "sync statusu z najpilniejszym systemem",
  "prosty raport KPI co rano",
];

const faq = [
  {
    question: "Make czy n8n, które jest lepsze do automatyzacji CRM?",
    answer:
      "Make, gdy scenariusze buduje osoba z biznesu, a wolumen nie przekracza 30 tys. operacji miesięcznie. n8n, gdy macie osobę techniczną, rosnący wolumen, własne systemy albo dane muszą zostać u Was.",
  },
  {
    question: "Czy możemy użyć obu narzędzi?",
    answer:
      "Tak, to częsty układ. Make do prostych scenariuszy marketingu i HR, n8n do sync z systemami i raportów. Minus: dwa narzędzia do utrzymania.",
  },
  {
    question: "Jak długo trwa wdrożenie?",
    answer:
      "Pierwszy etap 2 do 3 tygodni, pełna warstwa nad CRM 4 do 8 tygodni. Czas zależy od zakresu, nie od wyboru narzędzia.",
  },
  {
    question: "Co z RODO przy automatyzacji CRM?",
    answer:
      "Make i n8n.cloud trzymają dane w UE i mają DPA. W branżach regulowanych polecamy n8n na Waszym serwerze.",
  },
];

export default function MakeVsN8nCrm() {
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
        <Breadcrumbs kolumna="srodek" items={[{ label: "Make czy n8n do CRM" }]} />

        {/* Hero, kompaktowy */}
        <section className="pt-24 pb-12 bg-gradient-to-b from-accent/10 to-transparent border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-label mb-4">Make vs n8n dla CRM</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Make czy n8n: co wybrać do automatyzacji CRM i leadów?
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                Make to wygodne narzędzie bez kodu, n8n to silnik, który
                postawisz u siebie. Nad CRM działają oba, ale wygrywają w innych
                sytuacjach.
              </p>
              <TrackedCTA
                href="#sekcje"
                location="article_make-vs-n8n-crm_hero"
                label="Dobierz narzędzie do procesu"
                eventName="cta_click_article_audit"
                className="btn-primary"
              >
                Dobierz narzędzie do procesu
              </TrackedCTA>
            </div>
          </div>
        </section>

        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje artykułu Make vs n8n dla CRM"
            tabs={[
              {
                label: "Problem",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Problem biznesowy</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                        Najpierw proces, potem narzędzie
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        Zacznij od pytania, który proces powtarza się często i
                        kosztuje czas albo sprzedaż. Dopiero wtedy wybór narzędzia
                        ma sens. Sygnały, że jest co automatyzować:
                      </p>
                      <ul className="space-y-3">
                        {symptoms.map((p) => (
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
                label: "5 problemów CRM",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">5 problemów CRM</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                        Jak każde narzędzie rozwiązuje typowe problemy CRM
                      </h2>
                      <div className="space-y-6">
                        {crmProblems.map((p) => (
                          <div
                            key={p.n}
                            className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6"
                          >
                            <div className="flex items-start gap-4 mb-4">
                              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-solid text-white flex items-center justify-center font-bold text-sm">
                                {p.n}
                              </span>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white pt-1.5">
                                {p.title}
                              </h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                              <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                  Make
                                </p>
                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                  {p.make}
                                </p>
                              </div>
                              <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                  n8n
                                </p>
                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                  {p.n8n}
                                </p>
                              </div>
                            </div>
                            <p className="text-sm text-accent font-semibold border-l-2 border-accent/40 pl-3">
                              Werdykt: {p.winner}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Tabela",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-4xl mx-auto">
                      <span className="section-label">Tabela</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                        Make vs n8n w skrócie
                      </h2>
                      <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60">
                        <table className="w-full text-left">
                          <thead className="bg-gray-50 dark:bg-gray-900/50">
                            <tr>
                              <th className="px-4 lg:px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                Wymiar
                              </th>
                              <th className="px-4 lg:px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                Make
                              </th>
                              <th className="px-4 lg:px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                n8n
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {comparison.map((row) => (
                              <tr key={row.dim}>
                                <td className="px-4 lg:px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white align-top">
                                  {row.dim}
                                </td>
                                <td className="px-4 lg:px-6 py-4 text-sm text-gray-600 dark:text-gray-400 align-top leading-relaxed">
                                  {row.make}
                                </td>
                                <td className="px-4 lg:px-6 py-4 text-sm text-gray-600 dark:text-gray-400 align-top leading-relaxed">
                                  {row.n8n}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Decyzja",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Decyzja</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                        Kiedy Make, a kiedy n8n
                      </h2>
                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Wybierz Make, gdy:
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            scenariusze buduje osoba z biznesu, wolumen nie
                            przekracza 30 tys. operacji miesięcznie, a dane mogą
                            leżeć w UE u dostawcy.
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800/60 border border-accent/30 rounded-2xl p-6">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Wybierz n8n, gdy:
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            macie osobę techniczną, wolumen rośnie, łączycie
                            własne systemy albo dane muszą zostać u Was.
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Porównanie ogólne, poza CRM:{" "}
                        <Link
                          href="/strefa-wiedzy/make-vs-n8n"
                          className="text-accent hover:underline"
                        >
                          Make vs n8n dla MŚP
                        </Link>
                        .
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
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-4">
                        Ile kosztuje wdrożenie
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                        Stała cena za etap, płatność po odbiorze. Cena zależy od
                        zakresu, nie od wyboru narzędzia.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            Pierwszy etap, 2 do 3 tygodni
                          </p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                            4-8 tys. zł
                          </p>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            {firstStage.map((s) => (
                              <li key={s}>{s}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-white dark:bg-gray-800/60 border border-accent/30 rounded-2xl p-6">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            Pełna warstwa nad CRM, 4 do 8 tygodni
                          </p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                            12-25 tys. zł
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            Pierwszy etap plus sync z systemami, raporty,
                            follow-up i onboarding.
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
                        Dobierzmy narzędzie do Twojego procesu
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                        30 minut rozmowy o procesie sprzedaży. Wyjdziesz z
                        rekomendacją dopasowaną do wolumenu, zespołu i
                        integracji.
                      </p>
                      <TrackedCTA
                        href="/kontakt"
                        location="article_make-vs-n8n-crm_final"
                        label="Dobierz narzędzie do procesu"
                        eventName="cta_click_article_audit"
                        className="btn-primary"
                      >
                        Dobierz narzędzie do procesu
                      </TrackedCTA>
                      <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                        <li>
                          <Link
                            href="/n8n-dla-crm"
                            className="text-accent hover:underline"
                          >
                            n8n dla CRM
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/automatyzacja-pipedrive"
                            className="text-accent hover:underline"
                          >
                            Automatyzacja Pipedrive
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/zapier-make"
                            className="text-accent hover:underline"
                          >
                            Zapier i Make
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
