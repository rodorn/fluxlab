import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Automatyzacja leadów i obsługi zapytań sprzedażowych | Fluxlab",
  description:
    "Wdrażamy automatyzację leadów: zbieranie, routing, kwalifikacja, powiadomienia i follow-up. Szybsza reakcja, mniej chaosu i lepsze wykorzystanie szans sprzedażowych.",
  openGraph: {
    title: "Automatyzacja leadów i obsługi zapytań sprzedażowych | Fluxlab",
    description:
      "Wdrażamy automatyzację leadów: zbieranie, routing, kwalifikacja, powiadomienia i follow-up. Szybsza reakcja, mniej chaosu i lepsze wykorzystanie szans sprzedażowych.",
    locale: "pl_PL",
    type: "article",
  },
};

const useCases = [
  {
    title: "Zbieranie leadów z wielu źródeł",
    description:
      "Formularze, reklamy, mail, landing page i inne źródła trafiają do jednego procesu, zamiast żyć w kilku osobnych miejscach.",
  },
  {
    title: "Routing leadów do właściwej osoby",
    description:
      "Lead może trafić do konkretnego handlowca według regionu, branży, typu zapytania, wartości lub innych zasad ustalonych w firmie.",
  },
  {
    title: "Automatyczne reakcje i follow-up",
    description:
      "Po wpłynięciu leada system może uruchomić potwierdzenie, zadanie, przypomnienie albo kolejny etap komunikacji.",
  },
];

const faq = [
  {
    question: "Czy automatyzacja leadów poprawia sprzedaż?",
    answer:
      "Tak, bo skraca czas reakcji i zmniejsza ryzyko, że lead zostanie pominięty lub źle obsłużony.",
  },
  {
    question: "Czy można ustawić różne reguły przypisywania leadów?",
    answer:
      "Tak, routing może być oparty o dowolne warunki biznesowe.",
  },
  {
    question: "Czy da się zautomatyzować pierwszy kontakt?",
    answer:
      "Tak, ale trzeba to zrobić rozsądnie, żeby nie wyglądało sztucznie i nie psuło jakości obsługi.",
  },
];

const relatedServices = [
  { href: "/automatyzacja-crm", label: "Automatyzacja CRM" },
  { href: "/automatyzacja-ai", label: "Automatyzacja AI" },
];

const relatedArticles = [
  {
    href: "/strefa-wiedzy/jak-zautomatyzowac-obsluge-leadow",
    label: "Jak zautomatyzować obsługę leadów",
  },
  {
    href: "/strefa-wiedzy/jak-skrocic-czas-reakcji-na-leada",
    label: "Jak skrócić czas reakcji na leada",
  },
];

export default function AutomatyzacjaLeadow() {
  return (
    <>
      <Header />
      <main className="pt-16">

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
                  Automatyzacja leadów
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Leady tracą wartość, kiedy wpadają do firmy i czekają na ręczne
                  ogarnięcie. Automatyzacja leadów pozwala szybciej reagować,
                  porządkować zapytania i kierować je do właściwych osób bez chaosu
                  i opóźnień.
                </p>
              </div>
              <div className="relative mx-auto lg:mx-0 w-full max-w-md">
                <div className="rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-black/30 border border-gray-100 dark:border-gray-800">
                  <Image
                    src="/photos/data.jpg"
                    alt="Automatyzacja leadów"
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

        {/* Co obejmuje */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Co obejmuje automatyzacja leadów
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-10">
                Automatyzujemy cały przepływ od momentu pojawienia się zapytania:
                pobranie danych, zapis w CRM, kwalifikację, routing,
                powiadomienie odpowiedniej osoby, a w razie potrzeby także
                follow-up i dalsze etapy procesu.
              </p>

              <div className="grid gap-5">
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
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
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

        {/* Dla kogo */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Dla kogo
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Dla firm, które pozyskują leady z kilku kanałów, mają problem z
                czasem reakcji, gubią zapytania albo nie panują nad ich jakością
                i przypisaniem.
              </p>
            </div>
          </div>
        </section>

        {/* Ile to kosztuje */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Ile to kosztuje
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Cena zależy od liczby źródeł leadów, CRM, reguł kwalifikacji i
                poziomu złożoności procesu. Proste wdrożenia można zrobić szybko.
                Zaawansowane procesy z scoringiem, AI lub wieloma wyjątkami
                wymagają większego zakresu prac.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                FAQ
              </h2>
              <div className="space-y-4">
                {faq.map((item, i) => (
                  <details
                    key={i}
                    className="group bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl"
                  >
                    <summary className="flex items-center justify-between gap-4 cursor-pointer p-6 text-sm font-semibold text-gray-900 dark:text-white select-none [&::-webkit-details-marker]:hidden list-none">
                      {item.question}
                      <svg
                        className="shrink-0 w-5 h-5 text-gray-400 transition-transform group-open:rotate-45"
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
                    <div className="px-6 pb-6 text-sm text-gray-500 dark:text-gray-400">
                      {item.answer}
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
                Masz leady, ale proces ich obsługi jest chaotyczny?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Pokaż nam, skąd wpadają i jak są obsługiwane, a zaprojektujemy
                prostszy przepływ.
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
                  <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                    Powiązane usługi
                  </h3>
                  <ul className="space-y-2">
                    {relatedServices.map((s) => (
                      <li key={s.href}>
                        <Link
                          href={s.href}
                          className="text-sm text-accent hover:underline"
                        >
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                    Powiązane artykuły
                  </h3>
                  <ul className="space-y-2">
                    {relatedArticles.map((a) => (
                      <li key={a.href}>
                        <Link
                          href={a.href}
                          className="text-sm text-accent hover:underline"
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
