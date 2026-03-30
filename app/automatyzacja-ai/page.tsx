import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Automatyzacja AI w procesach firmowych | Fluxlab",
  description:
    "Wdrażamy automatyzację AI w firmie: klasyfikacja danych, streszczenia, analiza treści, wsparcie obsługi i inteligentne workflow połączone z CRM i innymi systemami.",
  openGraph: {
    title: "Automatyzacja AI w procesach firmowych | Fluxlab",
    description:
      "Wdrażamy automatyzację AI w firmie: klasyfikacja danych, streszczenia, analiza treści, wsparcie obsługi i inteligentne workflow połączone z CRM i innymi systemami.",
    locale: "pl_PL",
    type: "article",
  },
};

const useCases = [
  {
    title: "Klasyfikacja i priorytetyzacja zapytań",
    description:
      "AI może rozpoznawać temat wiadomości, typ klienta, intencję zapytania albo pilność sprawy, a następnie kierować ją do właściwego procesu.",
  },
  {
    title: "Streszczenia i porządkowanie informacji",
    description:
      "Długie maile, notatki ze spotkań, opisy zgłoszeń — AI potrafi wyciągnąć kluczowe informacje i przedstawić je w zwięzłej, uporządkowanej formie.",
  },
  {
    title: "Wsparcie obsługi klienta i sprzedaży",
    description:
      "AI może przygotowywać szkice odpowiedzi, sugerować kolejne kroki, analizować historię kontaktu i pomagać w szybszym podejmowaniu decyzji.",
  },
];

const faqs = [
  {
    question: "Czy AI zastąpi pracowników?",
    answer:
      "Nie w tym modelu. AI wspiera ludzi, automatyzując powtarzalne analizy i przygotowując dane do decyzji.",
  },
  {
    question: "Czy AI się myli?",
    answer:
      "Tak, dlatego projektujemy procesy z weryfikacją i fallbackiem na człowieka tam, gdzie to potrzebne.",
  },
  {
    question: "Czy potrzebuję własnych danych do treningu?",
    answer:
      "Nie zawsze. Wiele zastosowań działa na gotowych modelach z odpowiednim promptem i kontekstem.",
  },
];

const relatedServices = [
  { href: "/automatyzacja-procesow-biznesowych", label: "Automatyzacja procesów biznesowych" },
  { href: "/integracje-api", label: "Integracje API" },
];

const relatedArticles = [
  {
    href: "/strefa-wiedzy/ai-w-automatyzacji-firm",
    label: "AI w automatyzacji firm",
  },
  {
    href: "/strefa-wiedzy/kiedy-ai-ma-sens-a-kiedy-nie",
    label: "Kiedy AI ma sens, a kiedy nie",
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

export default function AutomatyzacjaAI() {
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
                Automatyzacja AI
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Automatyzacja AI pozwala rozszerzyć zwykłe workflow o analizę
                treści, klasyfikację danych, generowanie odpowiedzi
                i podejmowanie prostych decyzji według ustalonych reguł. Nie
                sprzedajemy modnego hasła. Wdrażamy AI tam, gdzie realnie skraca
                czas pracy i poprawia jakość procesu.
              </p>
            </div>
          </div>
        </section>

        {/* Gdzie AI ma sens */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Gdzie AI ma sens w automatyzacji
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                AI nie jest potrzebne do wszystkiego. Największą wartość daje
                tam, gdzie firma pracuje na dużej liczbie wiadomości, opisów,
                zgłoszeń, dokumentów albo leadów i chce szybciej je rozumieć,
                porządkować i przekazywać dalej do odpowiednich działań.
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
                Dla firm, które przetwarzają dużo tekstu, zapytań lub danych
                i chcą przyspieszyć ich analizę bez zwiększania zespołu.
                Szczególnie dobrze sprawdza się w obsłudze klienta, sprzedaży,
                marketingu i operacjach.
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
                Koszt zależy od złożoności modelu, liczby procesów do objęcia
                i wymaganej jakości wyników. Proste klasyfikacje i streszczenia
                mają niski próg wejścia. Bardziej zaawansowane wdrożenia
                z logiką biznesową, walidacją i integracjami wymagają
                indywidualnej wyceny.
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
                Chcesz sprawdzić, gdzie AI realnie pomoże w Twojej firmie?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Pokaż nam proces, a ocenimy, czy AI da tu wartość i jak szybko.
              </p>
              <Link href="/#kontakt" className="btn-primary px-8 py-3.5 text-base">
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
