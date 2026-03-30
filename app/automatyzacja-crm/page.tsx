import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Automatyzacja CRM dla sprzedaży i obsługi klienta | Fluxlab",
  description:
    "Wdrażamy automatyzację CRM: leady, follow-upy, statusy, zadania, pipeline i integracje. Mniej ręcznej pracy, lepsza kontrola sprzedaży i szybsza reakcja zespołu.",
  openGraph: {
    title: "Automatyzacja CRM dla sprzedaży i obsługi klienta | Fluxlab",
    description:
      "Wdrażamy automatyzację CRM: leady, follow-upy, statusy, zadania, pipeline i integracje. Mniej ręcznej pracy, lepsza kontrola sprzedaży i szybsza reakcja zespołu.",
    locale: "pl_PL",
    type: "article",
  },
};

const useCases = [
  {
    title: "Automatyczne tworzenie i kwalifikacja leadów",
    description:
      "Nowe zapytania z formularzy, kampanii, maili i innych źródeł automatycznie trafiają do CRM. System może przypisać źródło leada, ocenić priorytet i skierować go do odpowiedniej osoby.",
  },
  {
    title: "Automatyczne zadania i follow-upy",
    description:
      "Po zmianie statusu lub braku odpowiedzi CRM sam tworzy kolejne zadanie, przypomina o kontakcie i pilnuje, żeby lead nie zniknął z procesu.",
  },
  {
    title: "Porządkowanie pipeline i danych",
    description:
      "Automatyzacja CRM może aktualizować pola, pilnować kompletności danych, wykrywać duplikaty i synchronizować informacje z innymi systemami.",
  },
];

const faq = [
  {
    question: "Czy automatyzacja CRM zastąpi handlowca?",
    answer:
      "Nie. Ma usunąć ręczne klikanie i pilnowanie procesu, żeby handlowiec mógł skupić się na sprzedaży.",
  },
  {
    question: "Z jakimi CRM pracujecie?",
    answer:
      "Wdrażamy automatyzacje w popularnych systemach CRM i łączymy je z innymi narzędziami używanymi w firmie.",
  },
  {
    question: "Czy można zautomatyzować follow-up bez utraty kontroli?",
    answer:
      "Tak, pod warunkiem że proces jest dobrze zaprojektowany, a wyjątki są obsługiwane świadomie.",
  },
];

const relatedServices = [
  { label: "Automatyzacja Pipedrive", href: "/automatyzacja-pipedrive" },
  { label: "Automatyzacja leadów", href: "/automatyzacja-leadow" },
];

const relatedArticles = [
  {
    label: "Automatyzacja CRM — od czego zacząć",
    href: "/strefa-wiedzy/automatyzacja-crm-od-czego-zaczac",
  },
  {
    label: "Jak uporządkować proces sprzedaży w CRM",
    href: "/strefa-wiedzy/jak-uporzadkowac-proces-sprzedazy-w-crm",
  },
];

export default function AutomatyzacjaCRM() {
  return (
    <>
      <Header />
      <main className="pt-16">

        {/* Hero */}
        <section className="py-16 lg:py-24 border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-label mb-4">Usługa</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Automatyzacja CRM
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Automatyzacja CRM pozwala uporządkować sprzedaż, przyspieszyć reakcję na
                leady i ograniczyć chaos w pipeline. Projektujemy procesy, dzięki którym
                CRM nie jest tylko bazą kontaktów, ale realnym narzędziem pracy handlowców
                i operacji.
              </p>
            </div>
          </div>
        </section>

        {/* Co daje automatyzacja CRM */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Co daje automatyzacja CRM
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-10">
                Dobrze wdrożony CRM powinien automatycznie porządkować dane, przypisywać
                leady, pilnować kolejnych kroków i dostarczać zespołowi aktualnych
                informacji. Jeśli handlowcy ręcznie tworzą zadania, przenoszą statusy,
                dopisują notatki i gubią follow-upy, to znaczy, że CRM pracuje za słabo.
              </p>

              <div className="space-y-6">
                {useCases.map((useCase) => (
                  <div
                    key={useCase.title}
                    className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-8"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {useCase.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {useCase.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Dla kogo */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Dla kogo
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Dla firm, które mają zespół sprzedaży, korzystają z CRM i chcą przyspieszyć
                pracę handlowców bez dokładania kolejnej ręcznej roboty. Szczególnie dla
                organizacji, które rosną i zaczynają tracić kontrolę nad leadami, statusami
                i jakością danych.
              </p>
            </div>
          </div>
        </section>

        {/* Ile to kosztuje */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Ile to kosztuje
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Proste automatyzacje CRM, takie jak routing leadów, zadania czy
                synchronizacja pól, mają zwykle niski próg wejścia. Bardziej zaawansowane
                wdrożenia, obejmujące wiele źródeł danych, scoring, integracje API i logikę
                sprzedażową, wymagają indywidualnej wyceny.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Najczęściej zadawane pytania
              </h2>
              <div className="space-y-4">
                {faq.map((item) => (
                  <details
                    key={item.question}
                    className="group bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl"
                  >
                    <summary className="flex items-center justify-between cursor-pointer p-6 text-gray-900 dark:text-white font-medium">
                      {item.question}
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
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-2xl mx-auto text-center bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Masz CRM, ale zespół nadal robi za dużo ręcznie?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Pokaż nam proces sprzedaży, a wskażemy, co da się zautomatyzować.
              </p>
              <Link href="/#kontakt" className="btn-primary px-8 py-3.5 text-base">
                Porozmawiajmy
              </Link>
              <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
                Bezpłatna konsultacja · Odpowiedź w 24h
              </p>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Powiązane usługi
                  </h2>
                  <ul className="space-y-3">
                    {relatedServices.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
                        >
                          <svg
                            className="shrink-0 text-accent"
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
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Powiązane artykuły
                  </h2>
                  <ul className="space-y-3">
                    {relatedArticles.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
                        >
                          <svg
                            className="shrink-0 text-accent"
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
