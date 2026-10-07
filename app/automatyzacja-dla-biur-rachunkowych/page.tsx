import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "Automatyzacja dla biur rachunkowych, KSeF i OCR | Fluxlab",
  description:
    "OCR faktur do Optimy, Symfonii i Enovy, integracje z SaldeoSmart i KSeF, przypomnienia o brakujących dokumentach i raporty, które robią się same.",
  openGraph: {
    title: "Automatyzacja dla biur rachunkowych, KSeF i OCR | Fluxlab",
    description:
      "OCR faktur do Optimy, Symfonii i Enovy, integracje z SaldeoSmart i KSeF, przypomnienia o brakujących dokumentach i raporty, które robią się same.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, Automatyzacja procesów dla biur rachunkowych",
      },
    ],
  },
  alternates: {
    canonical: "/automatyzacja-dla-biur-rachunkowych",
  },
};

const useCases = [
  {
    title: "OCR faktur do Comarch Optima, Symfonii i Enova",
    description:
      "Faktura od klienta trafia do OCR, dane sprawdzamy w GUS i na białej liście VAT, a dokument ląduje w systemie księgowym do zatwierdzenia. Księgowy zatwierdza zamiast przepisywać.",
  },
  {
    title: "Przypomnienia o brakujących dokumentach",
    description:
      "System widzi, czego brakuje od klienta za bieżący miesiąc, i wysyła przypomnienie mailem lub SMS-em. Po kilku dniach sprawa wraca do opiekuna. Koniec z dzwonieniem do tych samych klientów.",
  },
  {
    title: "Integracja z KSeF",
    description:
      "Pobieramy faktury z KSeF dla każdego klienta biura po pełnomocnictwach i wprowadzamy je do systemu księgowego. 1 stycznia 2027 kończą się przepisy przejściowe, więc warto zamknąć temat wcześniej.",
  },
  {
    title: "Raporty miesięczne dla klientów",
    description:
      "Po zamknięciu okresu system przygotowuje raport dla każdego klienta w jednym formacie i wysyła go bezpiecznym kanałem. Klient nie pyta, kiedy dostanie raport.",
  },
  {
    title: "Onboarding nowego klienta",
    description:
      "Formularz, podpis umowy online, dane z GUS, UPL-1 i założenie klienta w systemie księgowym oraz CRM. Jedno wypełnienie zamiast pięciu systemów.",
  },
];

const tools = [
  {
    name: "Comarch Optima, Symfonia, Enova, InsERT",
    description:
      "Każdy z tych systemów ma API albo SDK. Wprowadzamy do niego dane z OCR i KSeF w formacie, którego oczekuje, bez zmiany systemu.",
  },
  {
    name: "SaldeoSmart",
    description:
      "Spinamy SaldeoSmart ze skrzynkami klientów i z systemem księgowym. Gdy OCR nie poradzi sobie z dokumentem, trafia on do księgowego, a nie ginie.",
  },
  {
    name: "n8n na serwerze biura",
    description:
      "Na nim budujemy większość przepływów. Dane klientów zostają u Was (RODO, tajemnica zawodowa), bez limitów liczby dokumentów.",
  },
];

const faq = [
  {
    question:
      "Pracujemy w Comarch Optima. Czy automatyzacja wymaga zmiany systemu?",
    answer:
      "Nie. Optima ma własne API, przez które wprowadzamy dane z OCR i KSeF. Symfonię, Enovę i InsERT obsługujemy tą samą metodą.",
  },
  {
    question:
      "Mamy SaldeoSmart, ale tylko częściowo wykorzystany. Da się to lepiej spiąć?",
    answer:
      "Tak. Zwykle ktoś ręcznie eksportuje plik z SaldeoSmart i wgrywa go do Optimy. Łączymy te kroki, więc rozpoznana faktura trafia do systemu księgowego sama.",
  },
  {
    question: "Co z tajemnicą zawodową i RODO?",
    answer:
      "Dane klientów zostają w Polsce, najczęściej na serwerze biura (n8n na Waszej infrastrukturze). Integracje z KSeF, GUS i białą listą działają na oficjalnych API.",
  },
  {
    question: "Ile kosztuje wdrożenie automatyzacji w biurze rachunkowym?",
    answer:
      "Pojedynczy proces, np. przypomnienia albo spięcie SaldeoSmart z Optimą, to 1 do 2 tygodni pracy. Pełne wdrożenie robimy etapami w 2 do 4 miesięcy. Wycenę dajemy po rozmowie i przejrzeniu Waszych narzędzi.",
  },
];

const relatedLinks = [
  { label: "Integracja z KSeF", href: "/ksef-integracja" },
  { label: "Automatyzacja raportowania", href: "/automatyzacja-raportowania" },
  {
    label: "Jak policzyć ROI z automatyzacji",
    href: "/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji",
  },
];

export default function AutomatyzacjaDlaBiurRachunkowych() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs
          items={[{ label: "Automatyzacja dla biur rachunkowych" }]}
        />

        {/* Hero, kompaktowy */}
        <section className="relative pt-16 pb-6 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gray-50 dark:hidden" />
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
                <p className="section-label mb-4">Dla branży</p>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  Automatyzacja dla biur rachunkowych
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Automatyzujemy OCR faktur, KSeF, przypomnienia, raporty i
                  onboarding. Zespół ma czas na doradztwo, a nie na
                  przepisywanie.
                </p>
              </div>
              <div className="relative mx-auto lg:mx-0 w-full max-w-md">
                <div className="rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-black/30 border border-gray-100 dark:border-gray-800">
                  <Image
                    src="/photos/data.jpg"
                    alt="Automatyzacja dla biur rachunkowych"
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

        <section
          id="enova365"
          className="scroll-mt-20 container-wide pt-6 pb-4"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Integracja enova365 z CRM i stroną
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                Łączymy się z enova365 przez moduł API. Odczytujemy
                kontrahentów, dokumenty i rozrachunki, a zapisujemy nowych
                kontrahentów i dokumenty do zatwierdzenia. Nic nie trafia do
                ksiąg bez decyzji księgowego.
              </p>
              <p>
                Nowy klient z CRM trafia do enova365 z NIP sprawdzonym w GUS i
                na białej liście VAT. Do CRM wracają statusy płatności, więc
                handlowiec widzi zaległości. Pojedynczy numer sprawdzicie w{" "}
                <Link
                  href="/sprawdzenie-nip"
                  className="text-accent hover:underline"
                >
                  darmowym sprawdzeniu NIP
                </Link>
                .
              </p>
              <p>
                Synchronizacja w jedną stronę to 1 do 2 tygodni, dwukierunkowa z
                rozrachunkami 3 do 4 tygodni. Więcej o łączeniu systemów na
                stronie{" "}
                <Link
                  href="/integracje-api"
                  className="text-accent hover:underline"
                >
                  integracje API
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje oferty dla biur rachunkowych"
            tabs={[
              {
                label: "Co automatyzujemy",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Co automatyzujemy w biurze rachunkowym
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 mb-10">
                        Ręczna praca rośnie razem z portfelem klientów.
                        Automatyzacja pozwala obsłużyć więcej klientów bez
                        powiększania zespołu.
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
                ),
              },
              {
                label: "Narzędzia",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Narzędzia, z którymi pracujemy w biurach rachunkowych
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 mb-10">
                        Spinamy to, co już macie, z OCR, KSeF i automatyczną
                        komunikacją z klientami.
                      </p>

                      <div className="space-y-6">
                        {tools.map((tool) => (
                          <div
                            key={tool.name}
                            className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-8"
                          >
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {tool.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {tool.description}
                            </p>
                          </div>
                        ))}
                      </div>

                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
                        Szczegóły i darmowe sprawdzenie na stronie{" "}
                        <Link
                          href="/ksef-integracja"
                          className="text-accent hover:underline"
                        >
                          integracji z KSeF
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                label: "Dla kogo i FAQ",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Dla kogo
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 mb-12">
                        Dla biur pełnoksięgowych i obsługujących JDG, które mają
                        od kilkudziesięciu klientów i toną w ręcznym
                        wprowadzaniu faktur, przypomnieniach i raportach.
                      </p>

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
                                className="shrink-0 ml-4 w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform group-open:rotate-45"
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
                ),
              },
              {
                label: "Kontakt",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <div className="max-w-2xl mx-auto text-center bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-10 mb-16">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                          KSeF już obowiązuje, a zespół nie wyrabia z papierami?
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">
                          Opisz obieg dokumentów w biurze. Wskażemy, gdzie
                          traci się czas, i policzymy, ile.
                        </p>
                        <Link
                          href="/kontakt"
                          className="btn-primary px-8 py-3.5 text-base"
                        >
                          Zamów diagnozę
                        </Link>
                        <p className="mt-4 text-xs text-gray-600 dark:text-gray-400">
                          Bezpłatna diagnoza · Odpowiedź w 24h
                        </p>
                      </div>

                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Zobacz też
                        </h2>
                        <ul className="space-y-3">
                          {relatedLinks.map((item) => (
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
                ),
              },
            ]}
          />
        </div>
      </main>

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Automatyzacja dla biur rachunkowych",
            description:
              "OCR faktur do Optimy, Symfonii i Enovy, integracje z SaldeoSmart i KSeF, przypomnienia o brakujących dokumentach i raporty, które robią się same.",
            provider: { "@id": "https://fluxlab.pl/#organization" },
            areaServed: { "@type": "Country", name: "PL" },
            serviceType:
              "Automatyzacja procesów biznesowych dla biur rachunkowych",
            url: "https://fluxlab.pl/automatyzacja-dla-biur-rachunkowych",
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
