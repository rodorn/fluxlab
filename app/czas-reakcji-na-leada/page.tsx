import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";

export const metadata: Metadata = {
  title: "Jak skrócić czas reakcji na leada do kilku minut | Fluxlab",
  description:
    "Jak skrócić czas reakcji na leada z godzin do minut bez dokładania pracy handlowcom. Konkretne wzorce automatyzacji, koszty i błędy do uniknięcia.",
  openGraph: {
    title: "Jak skrócić czas reakcji na leada do kilku minut | Fluxlab",
    description:
      "Speed-to-lead w B2B. Konkretne wzorce automatyzacji, które skracają czas reakcji z godzin do minut, bez dokładania pracy handlowcom.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, Jak skrócić czas reakcji na leada",
      },
    ],
  },
  alternates: {
    canonical: "/czas-reakcji-na-leada",
  },
};

const symptoms = [
  "Lead wpada wieczorem, handlowiec widzi go rano. Klient w tym czasie pisze do trzech firm.",
  "Powiadomienia o leadach giną w skrzynce wśród newsletterów.",
  "Nie ma ustalonego czasu reakcji i nikt go nie mierzy.",
  "Klienci dzwonią drugi raz, bo nikt nie odpisał.",
];

const workflowSteps = [
  {
    title: "Lead wpada",
    desc: "Formularz, reklama, e-mail i czat trafiają do jednej warstwy automatyzacji w sekundę.",
  },
  {
    title: "Walidacja i przypisanie",
    desc: "System sprawdza dane, odrzuca duplikaty i wybiera handlowca według regionu, produktu i obciążenia.",
  },
  {
    title: "Odpowiedź do klienta w 30 sekund",
    desc: "SMS albo mail: „dzwonimy do 5 minut”. Klient wie, że nie został zignorowany.",
  },
  {
    title: "Powiadomienie i licznik",
    desc: "Push, Slack i zadanie w CRM z terminem 5 minut. Brak reakcji przekazuje leada drugiej osobie albo managerowi.",
  },
  {
    title: "Raport czasu reakcji",
    desc: "Średni czas pierwszego kontaktu i odsetek leadów obsłużonych w terminie, per handlowiec i źródło.",
  },
];

const faq = [
  {
    question: "Jaki czas reakcji na leada jest realistyczny w B2B?",
    answer:
      "W branżach z dużą konkurencją, jak leasing czy finanse, standardem jest 5 minut. Dla większości firm B2B w godzinach pracy dobrym wynikiem jest 15 do 30 minut.",
  },
  {
    question: "Czy auto-odpowiedź zastępuje kontakt handlowca?",
    answer:
      "Nie. Pokazuje klientowi, że firma żyje, i zatrzymuje go do czasu rozmowy. Rozmowa z handlowcem wciąż musi się odbyć.",
  },
  {
    question: "Co z leadami po godzinach pracy?",
    answer:
      "Auto-odpowiedź z konkretnym czasem oddzwonienia i zadanie z priorytetem na początek następnego dnia.",
  },
  {
    question: "Jak mierzyć czas reakcji?",
    answer:
      "Średni czas do pierwszego kontaktu, odsetek leadów obsłużonych w terminie i rozkład w ciągu doby. Często problem dotyczy tylko kilku godzin.",
  },
];

const h2 = "mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight";
const card = "bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4";

export default function CzasReakcjiNaLeada() {
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

  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs kolumna="srodek" items={[{ label: "Czas reakcji na leada" }]} />

        <section className="pt-16 pb-10 bg-gradient-to-b from-accent/10 to-transparent border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-label">Speed-to-lead B2B</span>
              <h1 className="mt-4 text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Jak skrócić czas reakcji na leada bez dokładania pracy
                handlowcom
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Klient zostawia numer o 14:32, handlowiec dzwoni następnego dnia
                o 9:15. W tym czasie klient rozmawiał już z konkurencją.
                Automatyzujemy drogę leada tak, żeby handlowiec wiedział o nim w
                kilka sekund.
              </p>
              <div className="mt-8 flex justify-center">
                <TrackedCTA
                  href="#sekcje"
                  location="article_speed_hero"
                  label="Chcemy szybszą obsługę leadów"
                  eventName="cta_click_article_audit"
                  className="btn-primary px-8 py-3.5 text-base"
                >
                  Chcemy szybszą obsługę leadów
                </TrackedCTA>
              </div>
            </div>
          </div>
        </section>

        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <section className="pt-12 max-w-3xl mx-auto">
            <span className="section-label">Problem</span>
            <h2 className={h2}>Po czym poznać, że leady czekają za długo</h2>
            <ul className="space-y-3">
              {symptoms.map((s) => (
                <li key={s} className={`flex items-start gap-3 ${card}`}>
                  <span className="mt-2.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
              Rozwiązaniem nie jest szybsza praca handlowców, tylko informacja
              o leadzie, która sama trafia do właściwej osoby, z terminem.
              Ile kosztuje Was wolna reakcja, policzysz w{" "}
              <Link href="/koszt-recznej-obslugi-leadow" className="text-accent hover:underline">
                kalkulatorze kosztu obsługi leadów
              </Link>
              .
            </p>
          </section>

          <section className="mt-12 pt-12 border-t border-gray-100 dark:border-gray-800 max-w-3xl mx-auto">
            <span className="section-label">Jak to działa</span>
            <h2 className={h2}>Pierwsze 30 sekund po wysłaniu formularza</h2>
            <ol className="space-y-3">
              {workflowSteps.map((s, i) => (
                <li key={s.title} className={`flex items-start gap-4 ${card}`}>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-light dark:bg-accent-dark-light text-accent flex items-center justify-center text-sm font-bold tabular-nums">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {s.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
              Zaczynamy od powiadomień, auto-odpowiedzi, terminu i pomiaru. Po
              dwóch tygodniach na żywych danych dokładamy eskalacje i obsługę po
              godzinach.
            </p>
          </section>

          <section className="mt-12 pt-12 border-t border-gray-100 dark:border-gray-800 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="section-label">Cennik</span>
              <h2 className={h2}>Ile kosztuje wdrożenie</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Stała cena za projekt. Konkretną wycenę podajemy po 30-minutowej
                rozmowie.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 lg:p-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Podstawowy
                </h3>
                <p className="text-3xl font-bold text-accent mb-3">
                  4 000 do 8 000 zł
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Jedno źródło leadów, powiadomienia, auto-odpowiedź, termin z
                  licznikiem, raport. Wdrożenie 3 do 5 dni.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800/60 border border-accent/40 rounded-2xl p-6 lg:p-8 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Pełny
                </h3>
                <p className="text-3xl font-bold text-accent mb-3">
                  10 000 do 20 000 zł
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Kilka źródeł, routing, eskalacje, obsługa po godzinach,
                  kalendarze, pełny raport. Wdrożenie 2 do 4 tygodni.
                </p>
              </div>
            </div>
            <div className="text-center">
              <Link href="/automatyzacja-leadow-crm" className="btn-secondary">
                Zobacz pełną ofertę automatyzacji leadów
              </Link>
            </div>
          </section>

          <section className="mt-12 pt-12 border-t border-gray-100 dark:border-gray-800 max-w-3xl mx-auto">
            <h2 className={`${h2} text-center`}>Najczęstsze pytania</h2>
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
            <p className="mt-8 text-sm text-gray-600 dark:text-gray-400">
              Powiązane:{" "}
              <Link href="/automatyczne-przypisywanie-leadow" className="text-accent hover:underline">
                przypisywanie leadów do handlowców
              </Link>
              ,{" "}
              <Link href="/automatyzacja-formularza-do-pipedrive" className="text-accent hover:underline">
                formularz do Pipedrive
              </Link>
              .
            </p>
          </section>

          <section className="mt-12 pt-12 border-t border-gray-100 dark:border-gray-800 max-w-2xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Leady odbierane w 5 minut zamiast 5 godzin
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              30 minut rozmowy: pierwszy krok i szacunkowy koszt. Bez
              zobowiązań.
            </p>
            <TrackedCTA
              href="/kontakt"
              location="article_speed_final"
              label="Chcemy szybszą obsługę leadów"
              eventName="cta_click_article_audit"
              className="btn-primary px-8 py-3.5 text-base"
            >
              Chcemy szybszą obsługę leadów
            </TrackedCTA>
          </section>
        </div>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
