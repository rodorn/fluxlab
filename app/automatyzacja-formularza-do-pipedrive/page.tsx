import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";

export const metadata: Metadata = {
  title: "Formularz do Pipedrive: leady bez przepisywania | Fluxlab",
  description:
    "Jak połączyć formularz na stronie z Pipedrive bez przepisywania leadów. Tworzenie osoby, firmy i deala, routing do handlowca, zadanie kontaktu.",
  openGraph: {
    title: "Formularz do Pipedrive: leady bez przepisywania | Fluxlab",
    description:
      "Jak połączyć formularz na stronie z Pipedrive bez przepisywania leadów. Tworzenie osoby, firmy i deala, routing do handlowca, zadanie kontaktu.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, Integracja formularza z Pipedrive",
      },
    ],
  },
  alternates: {
    canonical: "/automatyzacja-formularza-do-pipedrive",
  },
};

const symptoms = [
  "Lead z formularza trafia na skrzynkę, a potem ktoś ręcznie przepisuje go do CRM, jeśli pamięta.",
  "Pierwszy kontakt zajmuje godziny zamiast minut, bo mail czeka, aż ktoś go zauważy.",
  "Marketing liczy 200 leadów w miesiącu, sprzedaż widzi w CRM 130.",
  "Źródło leada nie zapisuje się w dealu, więc raport „skąd przyszedł klient” robi się ręcznie.",
];

const afterSteps = [
  {
    title: "Formularz wysyła dane prosto do systemu",
    desc: "Webhook zamiast maila: imię, firma, telefon, NIP, źródło, kampania i UTM.",
  },
  {
    title: "Walidacja i deduplikacja",
    desc: "Sprawdzamy e-mail i telefon, dociągamy dane firmy po NIP. Istniejący kontakt dostaje nowy deal zamiast duplikatu.",
  },
  {
    title: "Osoba, organizacja i deal w Pipedrive",
    desc: "Z powiązaniami i polami źródła wypełnionymi od razu.",
  },
  {
    title: "Przypisanie i zadanie kontaktu",
    desc: "Reguły wybierają handlowca, Pipedrive tworzy zadanie „kontakt w 5 minut”. Brak reakcji uruchamia przypomnienie i eskalację.",
  },
];

const faq = [
  {
    question: "Czy potrzebujemy Zapiera albo Make?",
    answer:
      "Nie. Pipedrive ma pełne API i webhooki, więc formularz może rozmawiać z CRM bezpośrednio. Zwykle wystarcza endpoint w n8n albo lekki backend.",
  },
  {
    question: "Czy nasz formularz się nada?",
    answer:
      "Każdy, który potrafi wysłać dane przez HTTP: HubSpot, WPForms, Webflow albo własny w Next.js.",
  },
  {
    question: "Co jeśli Pipedrive API zwróci błąd?",
    answer:
      "Lead trafia do kolejki ponowień. Gdy wszystkie próby zawiodą, wysyłamy alert, a dane zostają zapisane do ręcznego wgrania. Żaden lead nie ginie.",
  },
  {
    question: "Jak długo trwa wdrożenie?",
    answer:
      "Etap minimalny zwykle 2 do 4 dni roboczych. Pełna integracja z routingiem i raportami źródeł 1 do 2 tygodni.",
  },
];

const pricing = [
  {
    zakres: "Etap 1, minimalny",
    opis: "Formularz do Pipedrive (osoba, organizacja, deal), walidacja, zadanie kontaktu, źródło i UTM w polach.",
    cena: "3 do 6 tys. zł",
  },
  {
    zakres: "Etap 2, pełny",
    opis: "Etap 1 plus deduplikacja po e-mailu i NIP, routing, eskalacja, alerty błędów, raport źródeł.",
    cena: "8 do 15 tys. zł",
  },
  {
    zakres: "Wiele źródeł leadów",
    opis: "Kilka formularzy i źródeł reklam, wzbogacanie po NIP, mapowanie kampanii.",
    cena: "15 do 25 tys. zł",
  },
];

const h2 = "h2-sekcji mt-4 mb-6";
const card = "bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4";

export default function AutomatyzacjaFormularzaDoPipedrive() {
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
        name: "Integracja formularza z Pipedrive",
        item: "https://fluxlab.pl/automatyzacja-formularza-do-pipedrive",
      },
    ],
  };

  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs href="/automatyzacja-formularza-do-pipedrive" kolumna="srodek"
          items={[{ label: "Integracja formularza z Pipedrive" }]}
        />

        <section className="pt-16 pb-10 bg-gradient-to-b from-accent/10 to-transparent border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl">
              <span className="section-label">Usługa</span>
              <h1 className="h1-strony mt-4 mb-6">
                Integracja formularza z Pipedrive bez ręcznego przepisywania
                leadów
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Firmy tracą leady nie przez zły CRM, tylko przez człowieka,
                który przepisuje je z maila. Łączymy formularz z Pipedrive tak,
                żeby lead trafiał do handlowca w kilka sekund.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <TrackedCTA
                  href="#sekcje"
                  location="article_formularz_pipedrive_hero"
                  label="Bezpłatna diagnoza"
                  eventName="cta_click_article_audit"
                  className="btn-primary text-base px-7 py-3"
                >
                  Bezpłatna diagnoza
                </TrackedCTA>
              </div>
            </div>
          </div>
        </section>

        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <section className="pt-12 max-w-3xl mx-auto">
            <h2 className={h2}>Po czym poznać, że masz ten problem</h2>
            <ul className="space-y-3">
              {symptoms.map((s) => (
                <li key={s} className={`flex items-start gap-3 ${card}`}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-accent" />
                  <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed">
              300 leadów miesięcznie razy 5 minut przepisywania przy 60 zł/h to{" "}
              <strong className="text-gray-900 dark:text-white">1 500 zł miesięcznie</strong>
              , czyli 18 000 zł rocznie. Większy koszt to leady zgubione po
              drodze i spóźniony pierwszy kontakt.
            </p>
          </section>

          <section className="mt-12 pt-12 border-t border-gray-100 dark:border-gray-800 max-w-3xl mx-auto">
            <h2 className={h2}>Od kliknięcia „Wyślij” do zadania u handlowca</h2>
            <ol className="space-y-3">
              {afterSteps.map((s, i) => (
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
            <p className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed">
              Zaczynamy od najmniejszego działającego kawałka, potem mierzymy
              efekt przez 2 do 3 tygodni i decydujemy, co dalej.
            </p>
          </section>

          <section className="mt-12 pt-12 border-t border-gray-100 dark:border-gray-800 max-w-3xl mx-auto">
            <h2 className={h2}>Ile to kosztuje</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              Stała cena za projekt, płatna w transzach po kamieniach milowych.
              Widełki potwierdzamy po krótkim audycie.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60">
              <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-900/50 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Zakres</th>
                    <th className="px-6 py-4 font-semibold">Co dostajesz</th>
                    <th className="px-6 py-4 font-semibold">Widełki</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700 dark:text-gray-300 divide-y divide-gray-100 dark:divide-gray-700">
                  {pricing.map((r) => (
                    <tr key={r.zakres}>
                      <td className="px-6 py-5 font-semibold text-gray-900 dark:text-white align-top">
                        {r.zakres}
                      </td>
                      <td className="px-6 py-5 align-top">{r.opis}</td>
                      <td className="px-6 py-5 align-top whitespace-nowrap font-semibold text-accent">
                        {r.cena}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <TrackedCTA
                href="/automatyzacja-leadow-crm"
                location="article_formularz_pipedrive_pricing"
                label="Zobacz pełną ofertę"
                eventName="cta_click_article_audit"
                className="btn-secondary"
              >
                Zobacz pełną ofertę: automatyzacja leadów do CRM
              </TrackedCTA>
              <TrackedCTA
                href="/kontakt"
                location="article_formularz_pipedrive_pricing_primary"
                label="Bezpłatna diagnoza"
                eventName="cta_click_article_audit"
                className="btn-primary"
              >
                Bezpłatna diagnoza
              </TrackedCTA>
            </div>
            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Powiązane:{" "}
              <Link href="/automatyzacja-raportowania" className="text-accent hover:underline">
                raportowanie z Pipedrive
              </Link>
              ,{" "}
              <Link href="/strefa-wiedzy/jak-zautomatyzowac-raportowanie-w-firmie" className="text-accent hover:underline">
                jak zautomatyzować raportowanie
              </Link>
              .
            </p>
          </section>

          <section className="mt-12 pt-12 border-t border-gray-100 dark:border-gray-800 max-w-3xl mx-auto">
            <h2 className={h2}>Najczęstsze pytania</h2>
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
          </section>
        </div>

        <CTA />

        <div className="pb-8">
          <Breadcrumbs
            items={[{ label: "Integracja formularza z Pipedrive" }]}
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
