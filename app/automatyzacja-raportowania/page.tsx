import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Automatyzacja raportowania i danych w firmie | Fluxlab",
  description:
    "Automatyzujemy raportowanie sprzedaży, marketingu i operacji. Łączymy dane z wielu źródeł i eliminujemy ręczne przygotowywanie raportów.",
  openGraph: {
    title: "Automatyzacja raportowania i danych w firmie | Fluxlab",
    description:
      "Automatyzujemy raportowanie sprzedaży, marketingu i operacji. Łączymy dane z wielu źródeł i eliminujemy ręczne przygotowywanie raportów.",
    locale: "pl_PL",
    type: "article",
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
    canonical: "/automatyzacja-raportowania",
  },
};

const useCases = [
  {
    title: "Raportowanie sprzedaży",
    description:
      "Pipeline, liczba leadów, konwersje, aktywność handlowców i wyniki sprzedaży są zbierane automatycznie, bez przeklejania danych z kilku narzędzi.",
  },
  {
    title: "Raportowanie marketingu",
    description:
      "Dane z reklam, formularzy i CRM mogą być połączone w jeden spójny widok, który pokazuje nie tylko liczbę leadów, ale też ich jakość i wynik biznesowy.",
  },
  {
    title: "Raportowanie operacyjne",
    description:
      "Można automatycznie monitorować statusy zadań, obciążenie zespołu, czas realizacji i wąskie gardła procesu.",
  },
];

const faqs = [
  {
    question:
      "Czy automatyzacja raportowania działa tylko z dużymi dashboardami?",
    answer:
      "Nie. Czasem największą wartość daje po prostu stały, poprawny raport wysyłany automatycznie.",
  },
  {
    question: "Czy można połączyć dane z kilku źródeł?",
    answer:
      "Tak, to jedna z głównych korzyści automatyzacji raportowania.",
  },
  {
    question: "Co jeśli dane są dziś niespójne?",
    answer:
      "To częsty problem. Najpierw porządkujemy logikę i źródła danych, potem automatyzujemy raport.",
  },
];

const relatedServices = [
  { href: "/integracje-api", label: "Integracje API" },
  {
    href: "/automatyzacja-procesow-biznesowych",
    label: "Automatyzacja procesów biznesowych",
  },
];

const relatedArticles = [
  {
    href: "/strefa-wiedzy/jak-zautomatyzowac-raportowanie-w-firmie",
    label: "Jak zautomatyzować raportowanie w firmie?",
  },
  {
    href: "/strefa-wiedzy/najczestsze-bledy-w-raportowaniu-sprzedazy",
    label: "Najczęstsze błędy w raportowaniu sprzedaży",
  },
];

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className || "shrink-0 mt-0.5 text-accent"}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="M2.5 7l3 3 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AutomatyzacjaRaportowania() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Automatyzacja raportowania" }]} />
        {/* Hero */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-sky-50 dark:hidden" />
            <img src="/photos/Flow.avif" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-[0.08] dark:hidden" style={{ filter: "invert(1)" }} />
            <img src="/photos/Flow.avif" alt="" aria-hidden="true" className="w-full h-full object-cover hidden dark:block" />
            <div className="absolute inset-0 hidden dark:block bg-gray-950/90" />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent dark:hidden" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent dark:hidden" />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-950 to-transparent hidden dark:block" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-950 to-transparent hidden dark:block" />
          </div>
          <div className="container-wide max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="text-center lg:text-left">
                <p className="section-label mb-4">Usługa</p>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  Automatyzacja raportowania
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Ręczne raportowanie zabiera czas, generuje błędy i opóźnia
                  decyzje. Wdrażamy automatyzację raportowania, dzięki której dane
                  z różnych źródeł zbierają się same, a zespół pracuje na
                  aktualnych, spójnych liczbach.
                </p>
              </div>
              <div className="relative mx-auto lg:mx-0 w-full max-w-md">
                <div className="rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-black/30 border border-gray-100 dark:border-gray-800">
                  <Image
                    src="/photos/raport.jpg"
                    alt="Automatyzacja raportowania"
                    width={480}
                    height={320}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Co automatyzujemy */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Co automatyzujemy w raportowaniu
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Automatyzujemy pobieranie, czyszczenie i łączenie danych z CRM,
                arkuszy, kampanii, formularzy i innych systemów. Dzięki temu
                raporty nie powstają w pośpiechu na koniec tygodnia lub miesiąca,
                tylko są gotowe regularnie i bez ręcznej składanki.
              </p>
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="grid gap-6">
                {useCases.map((useCase) => (
                  <div
                    key={useCase.title}
                    className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60 p-8"
                  >
                    <div className="flex items-start gap-4">
                      <span className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <CheckIcon />
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {useCase.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {useCase.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Dla kogo */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Dla kogo
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Dla firm, które podejmują decyzje na podstawie danych, ale dziś
                tracą za dużo czasu na ich ręczne przygotowanie albo nie ufają
                liczbom, bo każdy raport wygląda inaczej.
              </p>
            </div>
          </div>
        </section>

        {/* Ile to kosztuje */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Ile to kosztuje
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Cena zależy od liczby źródeł danych, jakości obecnych danych,
                częstotliwości raportów i poziomu przetwarzania. Proste
                raportowanie można wdrożyć szybko. Bardziej rozbudowane systemy
                raportowe wymagają uporządkowania struktury danych i logiki
                biznesowej.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
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
                    <div className="px-6 pb-6 text-sm text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-2xl mx-auto text-center bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Masz dane w kilku miejscach i nie ufasz raportom?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Pokaż nam obecny układ, a zaproponujemy prostszy i bardziej
                wiarygodny model raportowania.
              </p>
              <Link
                href="/#kontakt"
                className="btn-primary px-8 py-3.5 text-base"
              >
                Umów bezpłatną konsultację
              </Link>
            </div>
          </div>
        </section>

        {/* Related links */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                    Powiązane usługi
                  </h3>
                  <ul className="space-y-3">
                    {relatedServices.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors"
                        >
                          <CheckIcon />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                    Artykuły
                  </h3>
                  <ul className="space-y-3">
                    {relatedArticles.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors"
                        >
                          <CheckIcon />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
