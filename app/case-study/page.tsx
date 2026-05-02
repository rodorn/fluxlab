import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";

export const metadata: Metadata = {
  title: "Case study — przykłady wdrożeń automatyzacji | Fluxlab",
  description:
    "Konkretne przykłady wdrożeń automatyzacji obsługi leadów, CRM i raportowania w firmach B2B. Przed/po, mierzalne efekty, czego unikać.",
  alternates: {
    canonical: "/case-study",
  },
  openGraph: {
    title: "Case study — przykłady wdrożeń automatyzacji | Fluxlab",
    description:
      "Konkretne przykłady wdrożeń automatyzacji obsługi leadów, CRM i raportowania w firmach B2B.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab — Case study",
      },
    ],
  },
};

const examples = [
  {
    slug: "lead-flow-firma-uslugowa",
    industry: "Firma usługowa B2B (50–100 leadów / mies)",
    title: "Lead z formularza do CRM w mniej niż 60 sekund",
    summary:
      "Lead z formularza i reklam Meta Ads automatycznie ląduje w CRM jako osoba, firma i deal. Routing według regionu, zadanie kontaktu z deadline, eskalacja przy braku reakcji.",
    metrics: [
      { value: "z 12 min do 0", label: "ręcznej pracy na lead" },
      { value: "< 5 min", label: "średni czas reakcji" },
      { value: "+18%", label: "konwersji lead → spotkanie" },
    ],
  },
  {
    slug: "raport-pipedrive-bez-excela",
    industry: "Software house (zespół 6 handlowców)",
    title: "Tygodniowy raport sprzedaży bez Excela",
    summary:
      "Dane z Pipedrive, Google Ads i arkusza prowizji łączone automatycznie w jeden dashboard. Co poniedziałek 8:00 raport w Slacku — bez ręcznego klejenia.",
    metrics: [
      { value: "z 4h do 0", label: "tygodniowo na raport" },
      { value: "1 źródło", label: "prawdy zamiast 4" },
      { value: "100%", label: "powtarzalność" },
    ],
  },
];

export default function CaseStudy() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Case study" }]} />

        <section className="py-16 lg:py-20">
          <div className="container-wide">
            <div className="max-w-3xl">
              <p className="section-label mb-3">Case study</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">
                Jak wyglądają moje wdrożenia w praktyce
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Poniżej dwa przykłady typowych procesów, które wdrażam u
                klientów. To <strong>syntezy realnych projektów</strong> —
                detale techniczne i metodologia są autentyczne, ale nazwy firm i
                konkretne dane zostały zanonimizowane do czasu, aż klienci dadzą
                zgodę na publikację z imienia. Pełne case studies pojawią się
                tutaj w ramach{" "}
                <Link
                  href="/pilotaz"
                  className="text-accent hover:underline font-medium"
                >
                  programu case study
                </Link>{" "}
                — 3 firmy, 50% ceny w zamian za publikację efektu.
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 lg:py-12 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-4xl space-y-6">
              {examples.map((ex) => (
                <article
                  key={ex.slug}
                  className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 lg:p-8"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
                    {ex.industry}
                  </p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-snug">
                    {ex.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {ex.summary}
                  </p>
                  <div className="grid grid-cols-3 gap-4 mb-6 pt-5 border-t border-gray-100 dark:border-gray-700">
                    {ex.metrics.map((m) => (
                      <div key={m.label}>
                        <p className="text-lg lg:text-2xl font-bold text-accent leading-tight">
                          {m.value}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-snug">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                    Synteza typowego wdrożenia. Dane zaokrąglone, nazwa firmy
                    nieujawniona. Pełne case study z imienia — po zgodzie
                    klienta z programu case study.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-5">
                Jak liczę efekt wdrożenia
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Bez wymyślnych modeli. Porównuję cztery rzeczy przed i po
                wdrożeniu — to wystarczy, żeby zobaczyć, czy automatyzacja się
                zwróciła.
              </p>
              <ol className="space-y-4">
                {[
                  {
                    title: "Czas ręcznej pracy",
                    desc: "Ile minut na jednego leada / raport / fakturę przed automatyzacją vs po.",
                  },
                  {
                    title: "Liczba powtórzeń",
                    desc: "Ile razy w tygodniu/miesiącu proces się wykonuje. Bez tego oszczędność godziny to anegdota.",
                  },
                  {
                    title: "Liczba błędów",
                    desc: "Źle przepisane dane, podwójne zapytania, zgubione leady. Każdy błąd to cofnięcie procesu.",
                  },
                  {
                    title: "Wartość opóźnionych / zgubionych leadów",
                    desc: "Najczęściej pomijana metryka. Zwykle największa pozycja w kosztorysie.",
                  },
                ].map((it, i) => (
                  <li
                    key={it.title}
                    className="flex gap-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 rounded-xl p-5"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {it.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {it.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Możesz policzyć szacunek dla swojego procesu samodzielnie —
                udostępniam{" "}
                <Link
                  href="/kalkulator-leadow"
                  className="text-accent hover:underline font-medium"
                >
                  kalkulator kosztu ręcznej obsługi leadów
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-accent/10 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Chcesz, żeby Twoje wdrożenie trafiło tutaj?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                3 firmy B2B otrzymują wdrożenie za 50% ceny w zamian za zgodę na
                publiczne case study. Publikujemy tylko to, co zaakceptujesz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/pilotaz" className="btn-primary">
                  Zobacz warunki programu
                </Link>
                <TrackedCTA
                  href="/#kontakt"
                  location="case_study_final"
                  label="diagnoza"
                  eventName="cta_click_case_study"
                  className="btn-secondary"
                >
                  Najpierw diagnoza procesu
                </TrackedCTA>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
