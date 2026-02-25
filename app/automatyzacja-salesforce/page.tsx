import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Automatyzacja Salesforce – zaawansowane integracje i custom development | Fluxlab",
  description:
    "Projektuję i wdrażam zaawansowane automatyzacje Salesforce: integracje przez API, logika w Apex i Flow, webhooki, hurtownie danych i eliminacja ręcznej pracy zespołu sprzedaży.",
  openGraph: {
    title: "Automatyzacja Salesforce – zaawansowane integracje i custom development | Fluxlab",
    description:
      "Projektuję i wdrażam zaawansowane automatyzacje Salesforce: integracje przez API, logika w Apex i Flow, webhooki, hurtownie danych i eliminacja ręcznej pracy zespołu sprzedaży.",
    locale: "pl_PL",
    type: "article",
  },
};

const sections = [
  {
    number: "01",
    title: "Pełna automatyzacja procesu sprzedaży",
    subtitle: "Od pierwszego kontaktu do zamknięcia sprzedaży",
    items: [
      "Automatyczne tworzenie Leadów z wielu źródeł",
      "Dynamiczne przypisywanie do handlowców (round-robin, scoring, region)",
      "Automatyczne tworzenie Opportunity",
      "Kontrola wymaganych danych na każdym etapie",
      "Wymuszanie aktywności przed przejściem dalej",
      "Automatyczne follow-upy",
    ],
    effect: ["Brak utraconych leadów", "Przewidywalność pipeline'u", "Standaryzacja sprzedaży"],
  },
  {
    number: "02",
    title: "Zaawansowane integracje przez Salesforce API",
    subtitle: "Salesforce nie powinien być wyspą",
    items: [
      "ERP i systemy finansowania / leasingu",
      "Systemy księgowe i call center",
      "Platformy e-commerce i marketing automation",
      "Hurtownie danych i aplikacje customowe",
    ],
    apiItems: [
      "Synchronizacja danych w czasie rzeczywistym",
      "Aktualizacja statusów operacyjnych",
      "Przekazywanie danych do produkcji i finansów",
      "Uruchamianie procesów backendowych",
    ],
    note: "To poziom, którego nie da się osiągnąć samymi Flow Builderami.",
    effect: [],
  },
  {
    number: "03",
    title: "Automatyzacja logiki biznesowej",
    subtitle: "Apex / Flow / Triggery",
    items: [
      "Walidacje zależne od wielu warunków",
      "Dynamiczne wyliczanie wartości",
      "Automatyczne generowanie rekordów powiązanych",
      "Kontrola uprawnień i dostępów",
      "Automatyczne procesy po zmianie statusu",
    ],
    note: "CRM zaczyna pilnować procesów za zespół.",
    effect: [],
  },
  {
    number: "04",
    title: "Automatyzacja procesów operacyjnych",
    subtitle: "Salesforce jako centrum zarządzania firmą",
    items: [
      "Generowanie dokumentów",
      "Uruchamianie procesów finansowych",
      "Powiadamianie działu operacyjnego",
      "Aktualizowanie statusów realizacji",
      "Synchronizacja z systemami produkcyjnymi",
    ],
    effect: [],
  },
  {
    number: "05",
    title: "Webhooki i zdarzenia w czasie rzeczywistym",
    subtitle: "Platform Events i architektura event-driven",
    items: [
      "Reagowanie natychmiast na zmiany w systemie",
      "Wysyłanie danych do mikroserwisów",
      "Aktualizacja dashboardów live",
      "Budowanie architektury event-driven",
    ],
    note: "Kluczowe przy dużej skali operacyjnej.",
    effect: [],
  },
  {
    number: "06",
    title: "Automatyczne raportowanie i hurtownia danych",
    subtitle: "Standardowe raporty Salesforce są ograniczone",
    items: [
      "Dedykowane dashboardy dla zarządu",
      "Zewnętrzne hurtownie danych (np. PostgreSQL)",
      "Analizy skuteczności sprzedaży i marżowości",
      "Analizy konwersji i źródeł leadów",
      "Raporty automatycznie wysyłane e-mailem",
    ],
    note: "Dane synchronizowane cyklicznie lub w czasie rzeczywistym.",
    effect: [],
  },
  {
    number: "07",
    title: "Eliminacja ręcznej pracy zespołu",
    subtitle: "Handlowiec powinien sprzedawać, nie administrować",
    items: [
      "Eliminacja ręcznego wpisywania danych",
      "Automatyczne logowanie aktywności",
      "Aktualizacja statusów po zdarzeniach zewnętrznych",
      "Pilnowanie SLA",
      "Wymuszanie kompletności danych",
    ],
    note: "Każda minuta oszczędzona na osobę w zespole sprzedaży = realne oszczędności w skali roku.",
    effect: [],
  },
];

const problems = [
  "Zbyt skomplikowana struktura obiektów",
  "Brak standaryzacji etapów sprzedaży",
  "Ręczne operacje i chaos w danych",
  "Brak integracji z innymi systemami",
];

const processSteps = [
  "Analiza procesu sprzedaży i operacji",
  "Audyt aktualnej konfiguracji Salesforce",
  "Projekt architektury automatyzacji",
  "Implementacja (Flow / Apex / API / integracje)",
  "Testy i optymalizacja wydajności",
  "Monitoring i dalszy rozwój",
];

const forWhom = [
  "Firmy B2B z rozbudowanym procesem sprzedaży",
  "Organizacje z zespołem 10+ handlowców",
  "Firmy finansowe i leasingowe",
  "SaaS i scale-upy",
  "Enterprise z wieloma systemami operacyjnymi",
];

export default function AutomatyzacjaSalesforce() {
  return (
    <>
      <Header />
      <main className="pt-16">

        {/* Hero */}
        <section className="py-16 lg:py-24 border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-2.5 bg-[#00a1e0]/10 dark:bg-[#00a1e0]/15 px-4 py-2 rounded-full mb-6">
                <Image
                  src="/photos/Salesforce.com_logo.svg.png"
                  alt="Salesforce"
                  width={88}
                  height={20}
                  className="h-5 w-auto"
                />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Automatyzacja Salesforce –<br className="hidden sm:block" /> zaawansowane integracje i custom development
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">
                Salesforce to potężna platforma. Ale w większości firm jest
                wykorzystywana w 30–40% swoich możliwości.
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
                Prawdziwa przewaga zaczyna się tam, gdzie kończy się konfiguracja
                w GUI, a zaczyna architektura procesów, integracje i development
                oparty o API.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-10 text-sm">
                {[
                  "Apex & Flow",
                  "REST API",
                  "Platform Events",
                  "Integracje ERP",
                  "Hurtownia danych",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <circle cx="5" cy="5" r="5" fill="currentColor" opacity="0.3" />
                      <circle cx="5" cy="5" r="2" fill="currentColor" />
                    </svg>
                    {item}
                  </span>
                ))}
              </div>
              <a href="#kontakt-salesforce" className="btn-primary px-8 py-3.5 text-base">
                Porozmawiajmy o automatyzacji
              </a>
            </div>

            {/* Demo image */}
            <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
              <Image
                src="/photos/Salesforce-light.webp"
                alt="Salesforce automatyzacja – widok interfejsu"
                width={1200}
                height={675}
                className="w-full dark:hidden"
              />
              <Image
                src="/photos/salesforce_dark.png"
                alt="Salesforce automatyzacja – widok interfejsu"
                width={1200}
                height={675}
                className="w-full hidden dark:block"
              />
            </div>
          </div>
        </section>

        {/* Sections */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Co można zautomatyzować w Salesforce?
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {sections.map((section) => (
                <div
                  key={section.number}
                  className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-8"
                >
                  <div className="flex items-start gap-5">
                    <span className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-accent/10 text-accent text-sm font-bold">
                      {section.number}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-0.5">
                        {section.title}
                      </h3>
                      <p className="text-sm text-accent font-medium mb-4">{section.subtitle}</p>

                      <ul className="space-y-2">
                        {section.items.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                            <svg className="shrink-0 mt-0.5 text-accent" width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>

                      {"apiItems" in section && section.apiItems && (
                        <div className="mt-4">
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                            Dzięki REST API można
                          </p>
                          <ul className="space-y-1.5">
                            {section.apiItems.map((item) => (
                              <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                                <svg className="shrink-0 mt-0.5 text-gray-400" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                  <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {section.effect.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                            Efekt biznesowy
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {section.effect.map((e) => (
                              <span
                                key={e}
                                className="px-2.5 py-1 rounded-lg bg-accent/10 text-accent text-xs font-medium"
                              >
                                {e}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {section.note && (
                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic border-l-2 border-accent/30 pl-3">
                          {section.note}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why implementation alone isn't enough */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Dlaczego samo wdrożenie Salesforce nie wystarcza?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Bo Salesforce bez architektury procesowej to tylko drogi CRM. Najczęstsze problemy:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {problems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  >
                    <svg className="shrink-0 text-red-400" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Rozwiązaniem nie jest więcej kliknięć w konfiguracji.
                Rozwiązaniem jest przemyślana architektura + automatyzacja.
              </p>
            </div>
          </div>
        </section>

        {/* Process + For whom */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Jak wygląda współpraca?
                  </h2>
                  <ol className="space-y-4">
                    {processSteps.map((step, i) => (
                      <li key={step} className="flex items-start gap-4">
                        <span className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full border-2 border-accent text-accent text-xs font-bold">
                          {i + 1}
                        </span>
                        <span className="text-sm text-gray-700 dark:text-gray-300 pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 italic border-l-2 border-accent/30 pl-3">
                    Celem nie jest konfiguracja CRM, tylko zwiększenie efektywności organizacji.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Dla kogo?
                  </h2>
                  <ul className="space-y-3">
                    {forWhom.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                        <svg className="shrink-0 text-accent" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="kontakt-salesforce" className="py-16 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-2xl mx-auto text-center bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Salesforce przestaje być kosztem.
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Zaczyna być przewagą operacyjną.
              </p>
              <Link href="/#kontakt" className="btn-primary px-8 py-3.5 text-base">
                Zacznijmy od rozmowy
              </Link>
              <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
                Bezpłatna konsultacja · Odpowiedź w 24h
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
