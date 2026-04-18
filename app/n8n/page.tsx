import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "n8n — automatyzacja workflow z pełną kontrolą | Fluxlab",
  description:
    "Wdrażamy automatyzacje na platformie n8n: self-hosted lub cloud, integracje API, webhooki, własne nody. Alternatywa dla Zapier i Make z pełną kontrolą nad infrastrukturą.",
  openGraph: {
    title: "n8n — automatyzacja workflow z pełną kontrolą | Fluxlab",
    description:
      "Wdrażamy automatyzacje na platformie n8n: self-hosted lub cloud, integracje API, webhooki, własne nody. Alternatywa dla Zapier i Make z pełną kontrolą nad infrastrukturą.",
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
    canonical: "/n8n",
  },
};

const useCases = [
  {
    title: "Integracja systemów przez API i webhooki",
    description:
      "n8n łączy CRM, ERP, bazy danych, narzędzia marketingowe i dowolne API w jeden spójny workflow. Webhooki pozwalają reagować na zdarzenia w czasie rzeczywistym, bez pollingu i opóźnień.",
  },
  {
    title: "Automatyzacja procesów wewnętrznych",
    description:
      "Onboarding klientów, generowanie dokumentów, synchronizacja danych między systemami, powiadomienia Slack — n8n pozwala zautomatyzować powtarzalne zadania bez pisania aplikacji od zera.",
  },
  {
    title: "Przetwarzanie danych z logiką kodu",
    description:
      "Dzięki nodom JavaScript i Python możesz dodać własną logikę tam, gdzie standardowe integracje nie wystarczają. Transformacje danych, walidacje, warunkowe rozgałęzienia — wszystko w jednym workflow.",
  },
];

const faq = [
  {
    question: "Czym n8n różni się od Zapier i Make?",
    answer:
      "n8n daje pełną kontrolę nad infrastrukturą — możesz go hostować na własnym serwerze, masz dostęp do kodu źródłowego i nie płacisz za każde wykonanie. Dodatkowo oferuje nody z kodem (JavaScript, Python), co pozwala na bardziej zaawansowaną logikę niż w Zapier czy Make.",
  },
  {
    question: "Czy n8n nadaje się dla małej firmy?",
    answer:
      "Tak. n8n Cloud pozwala zacząć bez własnej infrastruktury, a wersja self-hosted jest darmowa. Koszt rośnie dopiero z liczbą workflow i potrzebą wsparcia, nie z liczbą wykonań.",
  },
  {
    question: "Czy mogę przenieść automatyzacje z Zapier/Make do n8n?",
    answer:
      "Tak, większość scenariuszy da się odtworzyć w n8n. Migracja wymaga przeprojektowania workflow, ale daje szansę na ich uproszczenie i lepszą kontrolę nad danymi.",
  },
];

const relatedServices = [
  {
    label: "Automatyzacja procesów biznesowych",
    href: "/automatyzacja-procesow-biznesowych",
  },
  { label: "Integracje API", href: "/integracje-api" },
];

export default function N8nPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "n8n" }]} />

        {/* Hero */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-sky-50 dark:hidden" />
            <img
              src="/photos/Flow.avif"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-[0.08] dark:hidden"
              style={{ filter: "invert(1)" }}
            />
            <img
              src="/photos/Flow.avif"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover hidden dark:block"
            />
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
                  Automatyzacja z n8n
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  n8n to platforma do budowania workflow, która łączy systemy,
                  API i logikę biznesową w jednym miejscu. Self-hosted lub cloud
                  — z pełną kontrolą nad danymi i infrastrukturą. Alternatywa
                  dla Zapier i Make dla firm, które chcą więcej niż
                  drag-and-drop.
                </p>
              </div>
              <div className="relative mx-auto lg:mx-0 w-full max-w-md">
                <div className="rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-black/30 border border-gray-100 dark:border-gray-800">
                  <Image
                    src="/photos/cloud.webp"
                    alt="n8n automatyzacja"
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

        {/* Czym jest n8n */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Czym jest n8n i dlaczego warto
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                n8n to open-source&apos;owa platforma automatyzacji, która
                pozwala budować złożone workflow łączące dowolne systemy. W
                odróżnieniu od Zapier czy Make, n8n daje możliwość self-hostingu
                — dane zostają na Twoim serwerze, a koszt nie rośnie z każdym
                wykonaniem scenariusza.
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-10">
                Platforma oferuje ponad 400 gotowych integracji, webhooki, nody
                z kodem JavaScript i Python, warunkową logikę, pętle i obsługę
                błędów. To narzędzie dla firm, które potrzebują czegoś więcej
                niż proste &quot;jeśli X to Y&quot; — i chcą mieć pełną własność
                swojej infrastruktury automatyzacji.
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
                Dla firm, które chcą mieć własność swojej infrastruktury
                automatyzacji — nie chcą być zależne od limitu wykonań w Zapier
                ani od zamkniętego ekosystemu. Szczególnie dla zespołów
                technicznych, firm z własnymi API i organizacji, które
                przetwarzają wrażliwe dane i potrzebują self-hostingu. Sprawdza
                się też u firm, które przerosły możliwości prostych narzędzi
                no-code i potrzebują logiki z kodem w workflow.
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
                Sam n8n w wersji self-hosted jest darmowy — płacisz tylko za
                serwer. n8n Cloud zaczyna się od niskich kwot miesięcznie. Koszt
                wdrożenia zależy od liczby workflow, złożoności integracji i
                tego, czy potrzebujesz konfiguracji infrastruktury. Proste
                scenariusze wdrażamy szybko, bardziej zaawansowane projekty
                wyceniamy indywidualnie.
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
                Chcesz zbudować automatyzacje na n8n?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Opowiedz nam o procesach, które chcesz zautomatyzować —
                dobierzemy architekturę i wdrożymy workflow.
              </p>
              <Link
                href="/#kontakt"
                className="btn-primary px-8 py-3.5 text-base"
              >
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
          </div>
        </section>
      </main>

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Automatyzacja z n8n",
            description:
              "Wdrażamy automatyzacje na platformie n8n: self-hosted lub cloud, integracje API, webhooki, własne nody. Alternatywa dla Zapier i Make z pełną kontrolą nad infrastrukturą.",
            provider: { "@id": "https://fluxlab.pl/#organization" },
            areaServed: { "@type": "Country", name: "Polska" },
            serviceType: "Automatyzacja procesów biznesowych",
            url: "https://fluxlab.pl/n8n",
          }),
        }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />

      <Footer />
    </>
  );
}
