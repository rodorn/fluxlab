import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Integracje API i łączenie systemów w firmie | Fluxlab",
  description:
    "Tworzymy integracje API między CRM, ERP, formularzami, bazami danych i narzędziami operacyjnymi. Łączymy systemy tak, żeby dane przepływały automatycznie.",
  openGraph: {
    title: "Integracje API i łączenie systemów w firmie | Fluxlab",
    description:
      "Tworzymy integracje API między CRM, ERP, formularzami, bazami danych i narzędziami operacyjnymi. Łączymy systemy tak, żeby dane przepływały automatycznie.",
    locale: "pl_PL",
    type: "article",
  },
  alternates: {
    canonical: "/integracje-api",
  },
};

const useCases = [
  {
    title: "Integracja CRM z formularzami i źródłami leadów",
    description:
      "Nowe dane trafiają automatycznie do CRM, bez opóźnień i bez przepisywania. Można od razu uruchomić scoring, routing albo zadanie dla handlowca.",
  },
  {
    title: "Integracja systemów operacyjnych i finansowych",
    description:
      "Statusy, dane klientów, zamówienia lub informacje o realizacji są synchronizowane między systemami, co ogranicza błędy i rozjazdy danych.",
  },
  {
    title: "Integracje z raportowaniem i bazami danych",
    description:
      "Zamiast ręcznie zbierać dane z kilku narzędzi, firma ma jeden uporządkowany przepływ danych do raportów, dashboardów i analiz.",
  },
];

const faq = [
  {
    question: "Czym różni się integracja API od zwykłej automatyzacji?",
    answer:
      "Integracja API skupia się na bezpośredniej wymianie danych między systemami, często w bardziej stabilny i elastyczny sposób.",
  },
  {
    question: "Czy da się połączyć systemy bez otwartego API?",
    answer:
      "Czasem tak, ale zależy to od konkretnego narzędzia i dostępnych metod obejścia.",
  },
  {
    question: "Czy integracje API są tylko dla dużych firm?",
    answer:
      "Nie. Często właśnie mniejsze firmy szybciej odczuwają wartość, bo eliminują ręczną pracę na małym zespole.",
  },
];

const relatedServices = [
  { href: "/automatyzacja-procesow-biznesowych", label: "Automatyzacja procesów biznesowych" },
  { href: "/automatyzacja-ai", label: "Automatyzacja AI" },
];

const relatedArticles = [
  { href: "/strefa-wiedzy/integracje-api-w-firmie-kiedy-warto", label: "Integracje API w firmie — kiedy warto?" },
  { href: "/strefa-wiedzy/jak-polaczyc-crm-z-innymi-systemami", label: "Jak połączyć CRM z innymi systemami?" },
];

export default function IntegracjeApi() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Integracje API" }]} />

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
                  Integracje API
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Firmy tracą czas i pieniądze, gdy ich narzędzia nie wymieniają danych
                  automatycznie. Projektujemy integracje API, które łączą systemy używane
                  w sprzedaży, operacjach i raportowaniu, dzięki czemu informacje trafiają
                  tam, gdzie trzeba, bez ręcznego przepisywania.
                </p>
              </div>
              <div className="relative mx-auto lg:mx-0 w-full max-w-md">
                <div className="rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-black/30 border border-gray-100 dark:border-gray-800">
                  <Image
                    src="/photos/api.png"
                    alt="Integracje API"
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

        {/* Po co firmie integracje API */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Po co firmie integracje API
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
                Gdy CRM, formularze, ERP, systemy mailingowe, arkusze i inne narzędzia
                działają osobno, ludzie zaczynają robić za łącznik między nimi. Integracje
                API likwidują ten problem. Umożliwiają automatyczne przesyłanie danych,
                aktualizację rekordów, synchronizację statusów i uruchamianie kolejnych
                akcji w innych systemach.
              </p>
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="grid gap-6">
                {useCases.map((uc, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-8"
                  >
                    <div className="flex items-start gap-5">
                      <span className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-accent/10 text-accent text-sm font-bold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {uc.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {uc.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Dla kogo + Ile to kosztuje */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Dla kogo
                </h2>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  Dla firm, które korzystają z kilku narzędzi jednocześnie i czują, że dane
                  są rozproszone, nieaktualne albo wymagają ręcznego przenoszenia. To
                  szczególnie ważne w sprzedaży, operacjach, marketingu i raportowaniu.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Ile to kosztuje
                </h2>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  Koszt integracji API zależy od liczby systemów, jakości dokumentacji,
                  logiki biznesowej i liczby wyjątków do obsłużenia. Prostsze integracje są
                  relatywnie szybkie. Integracje niestandardowe, wieloetapowe albo krytyczne
                  biznesowo wymagają szerszej analizy i wyceny.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Najczęstsze pytania
              </h2>
              <div className="space-y-4">
                {faq.map((item, i) => (
                  <details
                    key={i}
                    className="group bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden"
                  >
                    <summary className="cursor-pointer px-6 py-5 flex items-center justify-between gap-4 text-gray-900 dark:text-white font-medium">
                      {item.question}
                      <svg
                        className="shrink-0 w-5 h-5 text-gray-400 transition-transform group-open:rotate-45"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-5 text-sm text-gray-500 dark:text-gray-400">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-2xl mx-auto text-center bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Masz kilka systemów, które nie gadają ze sobą?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Pokaż nam stack, a zaproponujemy sensowną architekturę integracji.
              </p>
              <Link href="/#kontakt" className="btn-primary px-8 py-3.5 text-base">
                Porozmawiajmy
              </Link>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                    Powiązane usługi
                  </h3>
                  <ul className="space-y-3">
                    {relatedServices.map((s) => (
                      <li key={s.href}>
                        <Link
                          href={s.href}
                          className="text-accent hover:underline text-sm font-medium"
                        >
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                    Powiązane artykuły
                  </h3>
                  <ul className="space-y-3">
                    {relatedArticles.map((a) => (
                      <li key={a.href}>
                        <Link
                          href={a.href}
                          className="text-accent hover:underline text-sm font-medium"
                        >
                          {a.label}
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
