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

type CaseKind = "synteza" | "anonim" | "pelne";

interface Example {
  slug: string;
  kind: CaseKind;
  industry: string;
  title: string;
  problem: string;
  before: string;
  after: string;
  metrics: { value: string; label: string }[];
  limits: string;
}

const KIND_META: Record<
  CaseKind,
  { label: string; tone: "synteza" | "anonim" | "pelne" }
> = {
  synteza: {
    label: "Synteza projektów",
    tone: "synteza",
  },
  anonim: {
    label: "Anonimowe wdrożenie",
    tone: "anonim",
  },
  pelne: {
    label: "Pełne case study",
    tone: "pelne",
  },
};

const examples: Example[] = [
  {
    slug: "lead-flow-firma-uslugowa",
    kind: "synteza",
    industry: "Firma usługowa B2B · 50–100 leadów / mies",
    title: "Lead z formularza do CRM w mniej niż 60 sekund",
    problem:
      "Leady z formularza i reklam Meta Ads wpadały na wspólną skrzynkę. Recepcja przepisywała dane do Pipedrive, przypisywała handlowca i zakładała zadanie kontaktu. Średni czas reakcji wynosił 1–2 godziny, część leadów ginęła w wątkach mailowych.",
    before:
      "Formularz → e-mail → recepcja przepisuje dane → ręczne założenie deala → e-mail do handlowca → handlowiec sam pamięta o follow-upie.",
    after:
      "Formularz/Meta Ads → walidacja → utworzenie kontaktu, firmy i deala w Pipedrive → routing wg regionu → zadanie z deadline → eskalacja przy braku reakcji w 30 min → dane do raportu.",
    metrics: [
      { value: "z 12 min do 0", label: "ręcznej pracy na lead" },
      { value: "< 5 min", label: "średni czas reakcji" },
      { value: "+18%", label: "konwersji lead → spotkanie" },
    ],
    limits:
      "Synteza kilku podobnych wdrożeń, nie pojedynczy projekt. Liczby zaokrąglone w górę do najbliższej znaczącej wartości — realny zakres mieścił się w 10–15 min ręcznej pracy i 12–22% wzrostu konwersji w zależności od źródła leadów.",
  },
  {
    slug: "raport-pipedrive-bez-excela",
    kind: "synteza",
    industry: "Software house · zespół 6 handlowców",
    title: "Tygodniowy raport sprzedaży bez Excela",
    problem:
      "Co poniedziałek jedna osoba poświęcała pół dnia na sklejenie danych z Pipedrive, Google Ads, arkusza prowizji i mailowych zamówień w jeden dashboard. Liczby często rozjeżdżały się między raportami, bo każde źródło miało inny format.",
    before:
      "Eksport CSV z Pipedrive → ręczne kopiowanie kolumn → arkusz prowizji → ręczna walidacja → wklejenie do prezentacji → mail do zarządu.",
    after:
      "Skrypt zbiera dane z Pipedrive API, Google Ads API i arkusza prowizji raz na dobę, normalizuje do jednego schematu, generuje raport jako PDF + post w Slacku w poniedziałek 8:00. Anomalia (np. brak danych w API) → alert na e-mail.",
    metrics: [
      { value: "z 4h do 0", label: "tygodniowo na raport" },
      { value: "1", label: "źródło prawdy zamiast 4" },
      { value: "stała pora", label: "publikacji raportu" },
    ],
    limits:
      "Synteza dwóch wdrożeń. Dane wejściowe i strukturę raportu zanonimizowano. Czas oszczędności (4h/tydz.) odnosi się do osoby kompletującej raport — nie do ogólnego ROI dla firmy.",
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
              {examples.map((ex) => {
                const meta = KIND_META[ex.kind];
                const badgeClass =
                  meta.tone === "pelne"
                    ? "bg-accent text-white"
                    : meta.tone === "anonim"
                      ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
                return (
                  <article
                    key={ex.slug}
                    className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 lg:p-8"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeClass}`}
                      >
                        {meta.label}
                      </span>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {ex.industry}
                      </span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-5 leading-snug">
                      {ex.title}
                    </h2>

                    <div className="space-y-5 mb-6">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1.5">
                          Problem
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {ex.problem}
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
                            Proces przed
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {ex.before}
                          </p>
                        </div>
                        <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-xl p-4">
                          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
                            Proces po
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            {ex.after}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-5 pt-5 border-t border-gray-100 dark:border-gray-700">
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

                    <div className="bg-gray-50 dark:bg-gray-900/30 border border-gray-100 dark:border-gray-700 rounded-lg p-3">
                      <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">
                        Ograniczenia danych
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 leading-relaxed">
                        {ex.limits}
                      </p>
                    </div>
                  </article>
                );
              })}

              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed pt-2">
                <strong className="text-gray-900 dark:text-white">
                  Pełne case studies z nazwą klienta
                </strong>{" "}
                publikuję tylko po pisemnej akceptacji klienta. Pierwsze pojawią
                się tutaj w ramach{" "}
                <Link
                  href="/pilotaz"
                  className="text-accent hover:underline font-medium"
                >
                  programu case study
                </Link>
                .
              </p>
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
