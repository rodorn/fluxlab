import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Automatyzacja Pipedrive – jak wycisnąć 100% z CRM | Fluxlab",
  description:
    "Tworzę zaawansowane automatyzacje w oparciu o Pipedrive API, webhooki i integracje systemowe. Obsługa leadów, synchronizacja danych, raporty i eliminacja ręcznej pracy handlowców.",
  openGraph: {
    title: "Automatyzacja Pipedrive – jak wycisnąć 100% z CRM | Fluxlab",
    description:
      "Tworzę zaawansowane automatyzacje w oparciu o Pipedrive API, webhooki i integracje systemowe. Obsługa leadów, synchronizacja danych, raporty i eliminacja ręcznej pracy handlowców.",
    locale: "pl_PL",
    type: "article",
  },
};

const sections = [
  {
    number: "01",
    title: "Automatyczna obsługa leadów",
    subtitle: "Lead → Deal → Activity",
    items: [
      "Automatyczne tworzenie Deala po pojawieniu się leada",
      "Przypisywanie do handlowca na podstawie regionu, źródła, typu produktu lub obciążenia pipeline'u",
      "Automatyczne ustawienie wartości, prawdopodobieństwa i etapu",
      'Tworzenie pierwszego zadania (np. \u201EKontakt w 5 minut\u201D)',
    ],
    effect: ['Brak \u201Ezapomnianych\u201D leadów', "Standaryzacja procesu sprzedaży", "Natychmiastowa reakcja"],
  },
  {
    number: "02",
    title: "Integracje z formularzami, stroną i landing page'ami",
    subtitle: "Bezpośrednio pod API – bez pośredników",
    items: [
      "Tworzenie osoby + organizacji + deala jednym requestem",
      "Wzbogacanie danych (np. po NIP / domenie)",
      "Dedykowane pola niestandardowe (custom fields)",
      "Walidacja danych przed wysłaniem do CRM",
    ],
    effect: ["Czysta baza danych", "Brak duplikatów", "Spójne dane do raportowania"],
  },
  {
    number: "03",
    title: "Synchronizacja z innymi systemami",
    subtitle: "Pipedrive jako centrum dowodzenia",
    items: [
      "Systemy księgowe i ERP",
      "Systemy finansowania i call center (np. CloudTalk)",
      "Marketing automation",
      "Bazy danych (PostgreSQL, Supabase) i własne aplikacje",
    ],
    syncItems: [
      "Statusy umów i płatności",
      "Etapy produkcji i scoring klientów",
      "Dane o fakturach i aktywności klientów",
    ],
    effect: [],
  },
  {
    number: "04",
    title: "Automatyczne aktualizacje i logika biznesowa",
    subtitle: "API i webhooki – nie klikane workflow",
    items: [
      "Zmiana etapu przy spełnieniu warunku (np. podpisanie umowy)",
      "Zamykanie przegranych dealów po X dniach bez aktywności",
      "Dynamiczna zmiana wartości deala",
      "Automatyczne tworzenie follow-upów, jeśli klient nie odpowie",
      "Blokowanie przejścia do kolejnego etapu bez wymaganych danych",
    ],
    effect: [],
  },
  {
    number: "05",
    title: "Eliminacja ręcznej pracy handlowców",
    subtitle: "Handlowiec powinien sprzedawać, a nie przepisywać dane",
    items: [
      "Dodawanie aktywności po wykonaniu połączenia",
      "Aktualizacja statusów po rozmowie",
      "Wysyłka maili transakcyjnych",
      "Generowanie dokumentów",
      "Aktualizacja custom fieldów na podstawie działań",
    ],
    effect: [],
    note: "Każda minuta dziennie oszczędzona na osobę = realne pieniądze w skali roku.",
  },
  {
    number: "06",
    title: "Webhooki i automatyzacje w czasie rzeczywistym",
    subtitle: "Reakcja natychmiast – nie w kolejnym cronie",
    items: [
      "Uruchamianie procesów backendowych przy utworzeniu deala",
      "Wysyłanie danych do innych systemów przy zmianie etapu",
      "Aktualizacja dashboardów live",
      "Triggerowanie procesów operacyjnych przy wygranej / przegranej",
    ],
    effect: [],
    note: "To poziom, którego nie da się osiągnąć samymi wbudowanymi automatyzacjami.",
  },
  {
    number: "07",
    title: "Dedykowane raporty i eksport danych",
    subtitle: "Standardowe raporty często nie wystarczają",
    items: [
      "Zewnętrzne dashboardy (Python, BI)",
      "Automatyczne raporty wysyłane mailem",
      "Agregacja danych z wielu pipeline'ów",
      "Analiza skuteczności handlowców i źródeł leadów",
    ],
    effect: [],
    note: "Dane pobierane cyklicznie przez API i zapisywane do hurtowni danych.",
  },
  {
    number: "08",
    title: "Czyszczenie i standaryzacja bazy",
    subtitle: "CRM przestaje być bałaganem",
    items: [
      "Usuwanie duplikatów",
      "Normalizacja nazw firm",
      "Walidacja adresów e-mail",
      "Uzupełnianie brakujących danych",
      "Wykrywanie nieaktywnych dealów",
    ],
    effect: [],
  },
];

const forWhom = [
  "Firmy sprzedażowe B2B",
  "E-commerce z procesem handlowym",
  "Firmy finansowe i leasingowe",
  "Startupy z 100+ leadami miesięcznie",
  "Organizacje z zespołem handlowym",
];

const processSteps = [
  "Analiza procesu sprzedaży",
  "Identyfikacja wąskich gardeł",
  "Projekt architektury automatyzacji",
  "Implementacja (API, webhooki, integracje)",
  "Monitoring i optymalizacja",
];

export default function AutomatyzacjaPipedrive() {
  return (
    <>
      <Header />
      <main className="pt-16">

        {/* Hero */}
        <section className="py-16 lg:py-24 border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p className="section-label mb-4">Pipedrive CRM</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Automatyzacja Pipedrive –<br className="hidden sm:block" /> jak wycisnąć 100% z Twojego CRM
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
                Większość firm używa Pipedrive jak notatnika do leadów. Tymczasem
                Pipedrive z dobrze zaprojektowanymi automatyzacjami staje się silnikiem
                sprzedaży.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-10 text-sm">
                {[
                  "Czas reakcji na leada: sekundy",
                  "Zero ręcznego wpisywania",
                  "Follow-upy bez handlowca",
                  "Synchronizacja systemów",
                  "Raporty bez Excela",
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
              <a href="#kontakt-pipedrive" className="btn-primary px-8 py-3.5 text-base">
                Porozmawiajmy o automatyzacji
              </a>
            </div>

            {/* Demo image */}
            <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
              <Image
                src="/photos/pipedrive-light.gif"
                alt="Pipedrive automatyzacja – demo"
                width={1200}
                height={675}
                className="w-full dark:hidden"
                unoptimized
              />
              <Image
                src="/photos/pipedrive-dark.webp"
                alt="Pipedrive automatyzacja – demo"
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
                Co realnie można zautomatyzować
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

                      {section.syncItems && (
                        <div className="mt-4">
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                            Co można zsynchronizować
                          </p>
                          <ul className="space-y-1.5">
                            {section.syncItems.map((item) => (
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

        {/* Why built-in isn't enough */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Dlaczego nie wystarczy wbudowana automatyzacja Pipedrive?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Bo jest ograniczona. Nie obsługuje:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Złożonej logiki warunkowej",
                  "Zaawansowanych integracji",
                  "Synchronizacji w czasie rzeczywistym",
                  "Operacji masowych na dużej skali",
                  "Customowych procesów sprzedażowych",
                ].map((item) => (
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
              <p className="mt-6 text-gray-500 dark:text-gray-400">
                Jeśli firma rośnie, potrzebuje warstwy automatyzacji opartej o API.
              </p>
            </div>
          </div>
        </section>

        {/* Process */}
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
                  <div className="mt-6 flex flex-wrap gap-2">
                    {["Skalowalne", "Bezpieczne", "Szybkie", "Odporne na zmiany"].map((q) => (
                      <span key={q} className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                        {q}
                      </span>
                    ))}
                  </div>
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
        <section id="kontakt-pipedrive" className="py-16 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-2xl mx-auto text-center bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                CRM przestaje być miejscem, gdzie wpisuje się dane.
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Staje się systemem, który pracuje za zespół.
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
