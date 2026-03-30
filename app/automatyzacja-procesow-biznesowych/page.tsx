import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Automatyzacja procesów biznesowych dla firm | Fluxlab",
  description:
    "Projektujemy i wdrażamy automatyzację procesów biznesowych w firmach B2B. Mniej ręcznej pracy, mniej błędów, szybsze działanie i realny zwrot z wdrożenia.",
  openGraph: {
    title: "Automatyzacja procesów biznesowych dla firm | Fluxlab",
    description:
      "Projektujemy i wdrażamy automatyzację procesów biznesowych w firmach B2B. Mniej ręcznej pracy, mniej błędów, szybsze działanie i realny zwrot z wdrożenia.",
    locale: "pl_PL",
    type: "article",
  },
};

const useCases = [
  {
    title: "Automatyzacja obiegu danych",
    description:
      "Dane z formularzy, maili, CRM, arkuszy i innych narzędzi trafiają automatycznie tam, gdzie powinny. Bez kopiowania, bez dubli i bez opóźnień.",
  },
  {
    title: "Automatyzacja zadań i powiadomień",
    description:
      "Gdy pojawia się nowy klient, zapytanie lub status sprawy, system automatycznie przypisuje zadanie, wysyła powiadomienie i uruchamia kolejny etap procesu.",
  },
  {
    title: "Automatyzacja raportowania i kontroli procesu",
    description:
      "Zamiast ręcznie zbierać dane z kilku miejsc, firma otrzymuje gotowe raporty i wgląd w to, gdzie proces się blokuje i co trzeba poprawić.",
  },
];

const faqs = [
  {
    question: "Czy automatyzacja procesów biznesowych ma sens w małej firmie?",
    answer:
      "Tak, bo nawet mały zespół szybko traci czas na ręczne przepisywanie danych, pilnowanie statusów i powtarzalne działania.",
  },
  {
    question: "Od czego zacząć automatyzację?",
    answer:
      "Najlepiej od procesu, który jest częsty, powtarzalny i generuje błędy albo opóźnienia.",
  },
  {
    question: "Czy trzeba wymieniać obecne narzędzia?",
    answer:
      "Nie. Najczęściej automatyzujemy to, co już działa w firmie, i łączymy istniejące systemy.",
  },
];

const relatedServices = [
  { href: "/automatyzacja-crm", label: "Automatyzacja CRM" },
  { href: "/automatyzacja-raportowania", label: "Automatyzacja raportowania" },
];

const relatedArticles = [
  {
    href: "/strefa-wiedzy/co-to-jest-automatyzacja-procesow-biznesowych",
    label: "Co to jest automatyzacja procesów biznesowych?",
  },
  {
    href: "/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji",
    label: "Jak policzyć ROI z automatyzacji?",
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

export default function AutomatyzacjaProcesowBiznesowych() {
  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-16 lg:py-24 border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="text-center lg:text-left">
                <p className="section-label mb-4">Usługa</p>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  Automatyzacja procesów biznesowych
                </h1>
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  Pomagamy firmom eliminować ręczną, powtarzalną pracę i zastępować
                  ją sprawnymi procesami opartymi o automatyzację. Projektujemy
                  rozwiązania, które porządkują obieg danych, skracają czas
                  realizacji zadań i zmniejszają liczbę błędów operacyjnych.
                </p>
              </div>
              <div className="relative mx-auto lg:mx-0 w-full max-w-md">
                <div className="rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-black/30 border border-gray-100 dark:border-gray-800">
                  <Image
                    src="/photos/plan.jpg"
                    alt="Automatyzacja procesów biznesowych"
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

        {/* Na czym polega */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Na czym polega automatyzacja procesów biznesowych
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  Automatyzacja procesów biznesowych polega na tym, że działania
                  wykonywane dotąd ręcznie zaczynają odbywać się szybciej, w
                  ustalonej kolejności i bez ciągłego angażowania pracowników.
                  Dotyczy to między innymi przepisywania danych, przekazywania
                  zadań między działami, aktualizowania CRM, raportowania,
                  obsługi leadów czy komunikacji między systemami.
                </p>
                <p>
                  Zamiast opierać firmę na pamięci ludzi i ręcznym pilnowaniu
                  kolejnych kroków, budujemy procesy, które działają
                  przewidywalnie i skalowalnie.
                </p>
              </div>
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
                Ta usługa jest dla firm, które mają coraz więcej pracy
                operacyjnej, korzystają z kilku narzędzi jednocześnie i czują, że
                ludzie marnują czas na rzeczy, które da się uporządkować.
                Szczególnie dobrze sprawdza się w firmach B2B, sprzedaży,
                obsłudze klienta, operacjach i back office.
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
                Koszt zależy od liczby systemów, złożoności procesu i tego, czy
                wystarczy no-code, czy potrzebna jest również integracja API lub
                logika szyta pod firmę. Proste wdrożenia zaczynają się od kilku
                tysięcy złotych. Bardziej rozbudowane projekty wyceniamy po
                analizie procesu i zakresu integracji.
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
                Chcesz sprawdzić, które procesy warto zautomatyzować?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Umów konsultację i pokaż nam swój obecny workflow.
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
