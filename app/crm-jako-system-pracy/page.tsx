import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";
import Tabs from "@/components/Tabs";
import KosztAdministracjiCrm from "@/components/KosztAdministracjiCrm";

export const metadata: Metadata = {
  title: "CRM jako system pracy, nie baza kontaktów | Fluxlab",
  description:
    "Jak zmienić CRM z notatnika w system, który wymusza dyscyplinę procesu sprzedaży. Pola, etapy, statusy, raporty i automatyzacje, którym handlowcy ufają.",
  openGraph: {
    title: "CRM jako system pracy, nie baza kontaktów | Fluxlab",
    description:
      "Jak zmienić CRM z notatnika w system, który wymusza dyscyplinę procesu sprzedaży. Pola, etapy, statusy, raporty i automatyzacje, którym handlowcy ufają.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, Automatyzacja leadów, CRM i raportowania dla firm B2B",
      },
    ],
  },
  alternates: {
    canonical: "/crm-jako-system-pracy",
  },
};

const symptoms = [
  "Statusy aktualizowane są raz w tygodniu, gdy manager pyta.",
  "Połowa deali w aktywnych etapach nie ma aktywności od ponad 14 dni.",
  "Każdy rozumie „w trakcie negocjacji” inaczej.",
  "Sprzedaż prowadzi własny Excel, bo CRM-owi nie ufa.",
];

const afterSteps = [
  "Pola wymagane i słowniki zamiast wolnego tekstu, jasna definicja każdego etapu.",
  "Po rozmowie handlowiec uzupełnia 3 pola w 30 sekund.",
  "Etap zmienia się tylko po spełnieniu warunku, np. „oferta wysłana” = załącznik w dealu.",
  "Brak aktywności 7 dni daje przypomnienie, 14 dni eskalację.",
  "Dashboard managera czyta dane z CRM-u na bieżąco, bez Excela.",
];

const workflowSteps = [
  {
    n: "1",
    title: "Audyt obecnego CRM",
    desc: "Sprawdzamy, które pola zespół wypełnia, które ignoruje i gdzie powstaje bałagan.",
    accent: false,
  },
  {
    n: "2",
    title: "Etapy, pola i słowniki",
    desc: "Ustalamy etapy z kryteriami przejścia, usuwamy martwe pola, wolny tekst zamieniamy na słowniki.",
    accent: true,
  },
  {
    n: "3",
    title: "Reguły i automatyczne zadania",
    desc: "Deal nie przejdzie dalej bez danych. CRM tworzy zadania, pilnuje terminów i eskaluje brak aktywności.",
    accent: false,
  },
  {
    n: "4",
    title: "Raporty i kalibracja",
    desc: "Manager widzi czas w etapie i konwersję. Przez 4 tygodnie poprawiamy reguły na podstawie realnego użycia.",
    accent: true,
  },
];

const pricing = [
  {
    name: "Audyt CRM",
    price: "0 zł",
    description:
      "Diagnoza: gdzie powstaje bałagan i co da największy efekt najpierw.",
  },
  {
    name: "Porządek w CRM",
    price: "od 2 200 zł",
    description:
      "Czyszczenie pól, etapy i statusy, słowniki, podstawowe reguły walidacji.",
    highlighted: true,
  },
  {
    name: "CRM jako system pracy",
    price: "od 4 500 zł",
    description:
      "Porządek plus automatyczne zadania, eskalacje, raporty i 4 tygodnie kalibracji.",
  },
];

const faq = [
  {
    question: "Mamy CRM od 3 lat. Nie taniej zacząć od zera?",
    answer:
      "Prawie nigdy. Porządek w obecnym systemie to zwykle 2-3 tygodnie, migracja 6-12 tygodni i ten sam bałagan w nowym narzędziu.",
  },
  {
    question: "Handlowcy będą się buntować przeciw nowym regułom?",
    answer:
      "Dlatego reguły ustalamy z zespołem, a przez pierwsze 4 tygodnie dostosowujemy je do realnego użycia.",
  },
  {
    question: "Czy to działa w Pipedrive, HubSpot i Salesforce?",
    answer:
      "Tak. Mechanika jest ta sama, różni się konfiguracja. Nietypowe procesy obsługujemy warstwą pośrednią (n8n, Make).",
  },
  {
    question: "Po jakim czasie widać efekty?",
    answer:
      "Czytelny pipeline i raporty bez Excela w 2-4 tygodnie. Wpływ na konwersję da się ocenić po kilku miesiącach.",
  },
];

export default function CrmJakoSystemPracy() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Strona główna",
        item: "https://fluxlab.pl/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "CRM jako system pracy",
        item: "https://fluxlab.pl/crm-jako-system-pracy",
      },
    ],
  };

  return (
    <>
      <Header />
      <main>
        <Breadcrumbs kolumna="srodek" items={[{ label: "CRM jako system pracy" }]} />

        {/* Hero, kompaktowy */}
        <section className="pt-24 pb-12 bg-gradient-to-b from-accent/10 to-transparent border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-label">CRM jako system pracy</span>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mt-4 mb-6 leading-tight">
                Jak zmienić CRM z notatnika w system pracy handlowców
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                CRM ma ograniczać chaos, a nie go dokumentować. Porządkujemy
                istniejący system tak, żeby pilnował terminów, podpowiadał
                kolejny krok, a manager przestał sklejać raporty w Excelu.
              </p>
              <div className="mt-8 flex justify-center">
                <TrackedCTA
                  href="#sekcje"
                  location="article_crm-jako-system-pracy_hero"
                  label="uporządkuj crm"
                  eventName="cta_click_article_audit"
                  className="btn-primary px-8 py-3.5 text-base"
                >
                  Uporządkuj CRM
                </TrackedCTA>
              </div>
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
                Audyt w 24h · mapa porządku · bez zobowiązań
              </p>
            </div>
          </div>
        </section>

        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje artykułu o CRM jako systemie pracy"
            tabs={[
              {
                label: "Problem",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <div className="text-center mb-12">
                        <span className="section-label">Problem</span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 leading-tight">
                          CRM, w którym dane są „cokolwiek”, daje raporty
                          „cokolwiek”
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
                          Manager patrzy na pipeline 800 tys. zł i nie wie, ile
                          z tego to realna sprzedaż. Po tym poznasz, że CRM jest
                          notatnikiem, nie systemem:
                        </p>
                      </div>
                      <ul className="space-y-3">
                        {symptoms.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
                          >
                            <svg
                              className="flex-shrink-0 mt-0.5 text-accent"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <circle
                                cx="10"
                                cy="10"
                                r="8"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M10 6v4M10 13v.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ),
              },
              {
                label: "Koszt problemu",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <div className="text-center mb-12">
                        <span className="section-label">Koszt problemu</span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                          Ile kosztuje administracja w CRM
                        </h2>
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-4">
                        <p>
                          Szukanie kontekstu, ręczne pola, sklejanie raportów.
                          Koszt zależy od zespołu, więc zamiast jednej liczby
                          jest rachunek z jawnymi założeniami.
                        </p>
                        <KosztAdministracjiCrm />
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Jak to wygląda",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <div className="text-center mb-12">
                        <span className="section-label">Po wdrożeniu</span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                          Jak wygląda CRM, który jest systemem pracy
                        </h2>
                      </div>
                      <ol className="space-y-3">
                        {afterSteps.map((step, i) => (
                          <li
                            key={step}
                            className="flex items-start gap-4 bg-white dark:bg-gray-800/60 border border-accent/30 rounded-xl px-5 py-4"
                          >
                            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent-solid text-white flex items-center justify-center text-xs font-bold tabular-nums">
                              {i + 1}
                            </span>
                            <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {step}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ),
              },
              {
                label: "Etapy",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="container-wide">
                      <div className="max-w-2xl mb-10">
                        <p className="section-label mb-3">Etapy</p>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                          Etapy wdrożenia porządku w CRM
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                          Każdy etap można zatrzymać i zmierzyć efekt, bez
                          wdrażania wszystkiego naraz.
                        </p>
                      </div>
                      <ol className="relative max-w-4xl space-y-3 lg:space-y-4">
                        {workflowSteps.map((s, i) => (
                          <li key={s.n} className="relative">
                            <div
                              className={`flex gap-4 lg:gap-5 items-start bg-white dark:bg-gray-800/80 border rounded-2xl p-5 lg:p-6 ${
                                s.accent
                                  ? "border-accent/40 shadow-sm"
                                  : "border-gray-100 dark:border-gray-700"
                              }`}
                            >
                              <div
                                className={`flex-shrink-0 w-10 h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center font-bold text-sm tabular-nums ${
                                  s.accent
                                    ? "bg-accent-solid text-white"
                                    : "bg-accent-light dark:bg-accent-dark-light text-accent"
                                }`}
                              >
                                {s.n}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                  {s.title}
                                </h3>
                                <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                  {s.desc}
                                </p>
                              </div>
                            </div>
                            {i < workflowSteps.length - 1 && (
                              <div className="flex justify-center py-1.5">
                                <svg
                                  className="text-gray-500 dark:text-gray-400"
                                  width="14"
                                  height="14"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M7 2v8m0 0l-3-3m3 3l3-3"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            )}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ),
              },
              {
                label: "Cennik",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-4xl mx-auto">
                      <div className="text-center mb-12">
                        <span className="section-label">Cennik</span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                          Ile kosztuje porządek w CRM-ie
                        </h2>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-6">
                        {pricing.map((tier) => (
                          <div
                            key={tier.name}
                            className={`rounded-2xl p-6 border ${
                              tier.highlighted
                                ? "bg-accent-light dark:bg-accent-dark-light border-accent/30"
                                : "bg-white dark:bg-gray-800/60 border-gray-100 dark:border-gray-700"
                            }`}
                          >
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              {tier.name}
                            </h3>
                            <p className="text-2xl font-bold text-accent mb-3">
                              {tier.price}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {tier.description}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <TrackedCTA
                          href="/automatyzacja-leadow-crm"
                          location="article_crm-jako-system-pracy_pricing"
                          label="zobacz pełną ofertę"
                          eventName="cta_click_article_audit"
                          className="btn-secondary px-6 py-3 text-base"
                        >
                          Zobacz pełną ofertę
                        </TrackedCTA>
                        <TrackedCTA
                          href="/kontakt"
                          location="article_crm-jako-system-pracy_pricing"
                          label="wycena"
                          eventName="cta_click_article_audit"
                          className="btn-primary px-8 py-3.5 text-base"
                        >
                          Wyceń nasz CRM
                        </TrackedCTA>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "FAQ",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <div className="text-center mb-12">
                        <span className="section-label">FAQ</span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                          Najczęstsze pytania o porządkowanie CRM-u
                        </h2>
                      </div>
                      <div className="space-y-4">
                        {faq.map((item) => (
                          <details
                            key={item.question}
                            className="group bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden"
                          >
                            <summary className="cursor-pointer px-6 py-5 flex items-center justify-between gap-4 list-none">
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {item.question}
                              </span>
                              <svg
                                className="flex-shrink-0 transition-transform group-open:rotate-180"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <path
                                  d="M5 7l5 5 5-5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </summary>
                            <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed">
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
                label: "Zobacz też",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Zobacz też
                      </h2>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        <li>
                          <Link
                            href="/automatyzacja-follow-up"
                            className="block bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4 hover:border-accent/40 transition-colors"
                          >
                            <span className="block font-semibold text-gray-900 dark:text-white">
                              Automatyzacja follow-upów w CRM
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Przypomnienia, które pilnują leadów
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/automatyzacja-pipedrive"
                            className="block bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4 hover:border-accent/40 transition-colors"
                          >
                            <span className="block font-semibold text-gray-900 dark:text-white">
                              Automatyzacja Pipedrive
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              API, webhooki i logika sprzedażowa
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/strefa-wiedzy/jak-uporzadkowac-proces-sprzedazy-w-crm"
                            className="block bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4 hover:border-accent/40 transition-colors"
                          >
                            <span className="block font-semibold text-gray-900 dark:text-white">
                              Jak uporządkować proces sprzedaży w CRM
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Etapy, pola i statusy krok po kroku
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                ),
              },
              {
                label: "Kontakt",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-2xl mx-auto text-center">
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Zrób z CRM-u system pracy, nie cmentarz danych
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                        30 minut audytu, mapa porządku, wycena pierwszego etapu.
                        Bez sprzedażowej presji.
                      </p>
                      <TrackedCTA
                        href="/kontakt"
                        location="article_crm-jako-system-pracy_final"
                        label="uporządkuj crm"
                        eventName="cta_click_article_audit"
                        className="btn-primary px-8 py-3.5 text-base"
                      >
                        Uporządkuj CRM
                      </TrackedCTA>
                      <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                        Odpowiedź w 24h · audyt CRM · bez zobowiązań
                      </p>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
