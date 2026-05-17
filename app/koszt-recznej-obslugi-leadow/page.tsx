import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "Koszt ręcznej obsługi leadów — kalkulator i przykład | Fluxlab",
  description:
    "Ile naprawdę kosztuje ręczna obsługa leadów w firmie B2B? Pełny rachunek: czas pracy, zgubione leady, błędy, raporty, utracona widoczność. Z przykładami i kalkulatorem.",
  openGraph: {
    title: "Koszt ręcznej obsługi leadów — kalkulator i przykład | Fluxlab",
    description:
      "Pełny rachunek kosztu ręcznej obsługi leadów w B2B: czas, zgubione zapytania, błędy, raporty. Trzy przykłady firm i kalkulator do policzenia własnego.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab — Automatyzacja leadów, CRM i raportowania dla firm B2B",
      },
    ],
  },
  alternates: {
    canonical: "/koszt-recznej-obslugi-leadow",
  },
};

const symptoms = [
  "Lead z formularza wpada do skrzynki, ktoś go zauważa po godzinie albo następnego dnia.",
  "Handlowiec ręcznie przepisuje dane do CRM-a — imię, mail, telefon, źródło.",
  "Co tydzień ktoś składa raport sprzedaży z arkusza, maila i pamięci.",
  "Follow-up zależy od tego, czy ktoś się zorientuje, że minęły 3 dni od kontaktu.",
  "Te same dane krążą między formularzem, mailem, arkuszem i CRM-em.",
  "Nikt w firmie nie umie powiedzieć, jaki procent leadów dostał odpowiedź w 5 minut.",
];

const costComponents = [
  {
    title: "Koszt czasu pracy",
    formula: "liczba_leadow × czas_min × stawka_h",
    description:
      "Najprostszy do policzenia, ale prawie zawsze niedoszacowany. Liczy się nie tylko samo wpisanie do CRM, ale też przeskakiwanie między zakładkami, sprawdzanie czy klient już istnieje, ręczne przypisywanie handlowca i klejenie statusów.",
    example:
      "300 leadów × 5 minut × 60 zł/h = 1 500 zł / miesiąc, czyli 18 000 zł / rok samego przepisywania.",
  },
  {
    title: "Koszt zgubionych leadów",
    formula: "opóźnione_leady × konwersja × wartość_klienta",
    description:
      "Im dłużej lead czeka na pierwszy kontakt, tym mniejsza szansa, że kupi. Każdy lead, który dostał odpowiedź po 24 h zamiast po 5 minutach, to mierzalny koszt. Konwersja z opóźnionych leadów potrafi spaść kilkukrotnie.",
    example:
      "30 opóźnionych leadów / mies × różnica w konwersji 5 p.p. × 5 000 zł wartości klienta = 7 500 zł / mies utraconej sprzedaży.",
  },
  {
    title: "Koszt błędów",
    formula: "błędne_rekordy × czas_naprawy × stawka_h + zniszczone_leady",
    description:
      "Źle przepisany numer telefonu, dwukrotny rekord w CRM, lead przypisany do złej osoby, zła kategoria źródła w raporcie. Każdy taki błąd to czas na naprawę plus ryzyko, że lead nigdy nie dostanie kontaktu.",
    example:
      "5% rekordów ma błąd → 15 leadów / mies × 15 minut naprawy × 60 zł/h = 225 zł, plus część z nich nie dochodzi do skutku.",
  },
  {
    title: "Koszt raportowania ręcznego",
    formula: "godziny_analityka × częstotliwość × stawka_h",
    description:
      "Ktoś co tydzień albo co miesiąc skleja raport z CRM-a, arkusza, kampanii reklamowych i pamięci. Im więcej źródeł, tym więcej godzin. A raport i tak jest gotowy z opóźnieniem i z błędami.",
    example:
      "4 h tygodniowo × 4 tyg × 80 zł/h = 1 280 zł / mies za raport, który i tak nie wystarcza do podjęcia decyzji.",
  },
  {
    title: "Koszt utraconej widoczności",
    formula: "decyzje_oparte_na_złych_danych × wpływ_na_wynik",
    description:
      "Najtrudniejszy do policzenia, najbardziej dotkliwy. Jeśli nie wiesz, które źródło leadów konwertuje, ile czasu zajmuje pierwszy kontakt i gdzie pipeline się zacina — wydajesz pieniądze na reklamę, której nie powinieneś, i nie skalujesz tego, co działa.",
    example:
      "Budżet reklamowy 10 000 zł / mies, z czego 30% idzie do źródła z najgorszą konwersją, bo nikt tego nie mierzy = 3 000 zł / mies marnotrawstwa.",
  },
];

const examples = [
  {
    size: "Mała firma B2B",
    leads: "30 leadów / mies",
    breakdown: [
      { label: "Czas pracy", value: "30 × 5 min × 60 zł/h = 150 zł" },
      { label: "Zgubione leady (przy 24h reakcji)", value: "~600 zł" },
      { label: "Błędy i poprawki", value: "~80 zł" },
      { label: "Raport ręczny (2 h / mies)", value: "120 zł" },
    ],
    total: "~950 zł / mies · ~11 400 zł / rok",
    note: "Niby mało. Ale mała firma najczęściej żyje z każdej domkniętej sprzedaży — utrata 2 leadów miesięcznie zmienia rachunek całego roku.",
  },
  {
    size: "Średnia firma B2B",
    leads: "300 leadów / mies",
    breakdown: [
      { label: "Czas pracy", value: "300 × 5 min × 60 zł/h = 1 500 zł" },
      {
        label: "Zgubione leady (różnica 5 p.p. konwersji)",
        value: "~7 500 zł",
      },
      { label: "Błędy i dwukrotne rekordy", value: "~600 zł" },
      { label: "Raport ręczny (4 h / tydz × 80 zł/h)", value: "1 280 zł" },
      { label: "Reklama wydana w złe źródło", value: "~2 000 zł" },
    ],
    total: "~12 880 zł / mies · ~154 560 zł / rok",
    note: "Tu zwykle leży największa nieuświadomiona dziura. Zarząd patrzy na koszt handlowca, nie patrzy na koszt procesu obok handlowca.",
  },
  {
    size: "Duża firma B2B",
    leads: "1 000+ leadów / mies",
    breakdown: [
      { label: "Czas pracy", value: "1 000 × 5 min × 60 zł/h = 5 000 zł" },
      {
        label: "Zgubione leady (różnica 7 p.p. konwersji)",
        value: "~35 000 zł",
      },
      { label: "Błędy, duplikaty, naprawy danych", value: "~2 500 zł" },
      { label: "Raporty (2 osoby × 8 h / tydz)", value: "~5 120 zł" },
      { label: "Marnotrawstwo budżetu reklamowego", value: "~8 000 zł" },
    ],
    total: "~55 600 zł / mies · ~667 200 zł / rok",
    note: "Przy tej skali ręczna obsługa to nie jest koszt jednego procesu — to jest koszt budowania firmy, w której nikt nie wie, co się dzieje na lejku.",
  },
];

const firstStage = [
  {
    title: "Lead z formularza prosto do CRM",
    desc: "Najmniejszy kawałek z największym efektem. Formularz → walidacja → osoba + firma + deal w CRM, ze źródłem i kampanią. Koniec z przepisywaniem.",
  },
  {
    title: "Routing do handlowca i zadanie „kontakt w 5 minut”",
    desc: "Ten sam lead od razu trafia do właściwej osoby. CRM tworzy zadanie z deadlinem, handlowiec dostaje notyfikację. Przestaje liczyć się pamięć.",
  },
  {
    title: "Prosty raport: źródło + czas reakcji + status",
    desc: "Trzy liczby, które wystarczą do pierwszych decyzji: skąd przyszedł lead, ile czekał, co się z nim stało. Bez sklejania w piątek.",
  },
];

const flowSteps = [
  {
    n: "1",
    title: "Lead wpada (formularz, reklama, mail)",
    desc: "Wszystkie źródła w jednym wejściu. Nikt nie szuka po skrzynkach.",
    accent: false,
  },
  {
    n: "2",
    title: "Walidacja i deduplikacja",
    desc: "System sprawdza, czy klient już istnieje, czy dane są kompletne, czy lead nie jest spamem.",
    accent: false,
  },
  {
    n: "3",
    title: "CRM: osoba + firma + deal",
    desc: "Rekord powstaje w CRM ze źródłem, kampanią, etapem i polami potrzebnymi do raportu.",
    accent: true,
  },
  {
    n: "4",
    title: "Routing + zadanie",
    desc: "Lead trafia do handlowca po regule (region, produkt, źródło). CRM tworzy zadanie „kontakt w 5 minut”.",
    accent: false,
  },
  {
    n: "5",
    title: "Follow-up i eskalacja",
    desc: "Brak reakcji w X minut → przypomnienie. Brak reakcji w Y godzin → eskalacja. Lead nie ginie w skrzynce.",
    accent: false,
  },
  {
    n: "6",
    title: "Raport: źródło, czas, status, wynik",
    desc: "Trzy liczby pojawiają się same. Bez kogoś, kto klei to w piątek po południu.",
    accent: true,
  },
];

const measurementMistakes = [
  {
    title: "Liczenie tylko czasu przepisywania",
    desc: "Najczęstszy błąd. „5 minut na lead × 300 leadów = 1 500 zł, da się przeżyć”. Tymczasem czas to zwykle 10–20% realnego kosztu. Reszta to zgubione leady, błędy i decyzje na złych danych.",
  },
  {
    title: "Ignorowanie zgubionych leadów",
    desc: "Bo „nie wiemy, ile by ich konwertowało”. Wiemy. Konwersja z leadów obsłużonych w 5 minut vs 24 h jest opisana w setkach badań — różnica jest realna i mierzalna.",
  },
  {
    title: "Wrzucanie raportowania do „pracy menadżera”",
    desc: "Raporty robione ręcznie znikają z rachunku, bo „menadżer i tak ma za to płacone”. Tylko że ten menadżer mógłby w tym czasie zamykać sprzedaż albo prowadzić zespół.",
  },
  {
    title: "Liczenie kosztu obecnego, bez kosztu skalowania",
    desc: "Dziś 300 leadów. Za rok 600. Ręczna obsługa skaluje się liniowo — 600 leadów to dwa razy więcej godzin albo druga osoba do CRM-a. Automatyzacja skaluje się prawie zerowo.",
  },
  {
    title: "Pomijanie kosztu utraconej widoczności",
    desc: "Brak wiarygodnych danych = decyzje na bazie wrażeń. Reklama trafia do złego źródła, handlowcy są oceniani po niewłaściwych metrykach, pipeline jest wyceniany od czapy. To koszt, który się zwykle widzi dopiero, jak się go wyeliminuje.",
  },
];

const faq = [
  {
    question: "Ile naprawdę kosztuje ręczna obsługa jednego leada?",
    answer:
      "W większości firm B2B realny koszt to 30–80 zł na lead, jeśli policzy się wszystko: czas pracy, opóźnienia, błędy, raporty i utraconą widoczność. Sam czas przepisywania to zwykle 10–20% tej kwoty. Najprościej policzyć własny przypadek w kalkulatorze: /kalkulator-leadow.",
  },
  {
    question: "Skąd różnica między 5 zł kosztu czasu a 50 zł realnego kosztu?",
    answer:
      "Bo czas to tylko jeden komponent. Drugi to leady, które nie konwertują, bo czekały za długo. Trzeci to błędy, które zniknęły z CRM-a albo trafiły do złego handlowca. Czwarty to raporty, które ktoś musi co tydzień składać. Piąty — najgorszy — to decyzje finansowe podejmowane na danych, którym nie można ufać.",
  },
  {
    question: "Czy automatyzacja faktycznie zwraca się w kilka miesięcy?",
    answer:
      "Przy 300+ leadach miesięcznie i wartości klienta od ok. 2 000 zł — tak, zwykle 2–4 miesiące. Przy mniejszej skali zwrot jest wolniejszy, ale i tak realny, bo największy koszt to zgubione leady, nie czas pracy. Pełny rachunek opisałem w artykule /strefa-wiedzy/jak-policzyc-roi-z-automatyzacji.",
  },
  {
    question: "Co jeśli moja firma ma niski wolumen leadów?",
    answer:
      "Wtedy koszt czasu jest mały, ale koszt zgubionych leadów względnie duży — bo każdy lead waży więcej. Mała firma B2B z 30 leadami miesięcznie i klientem za 5 000 zł wciąż traci 8–12 tys. rocznie na ręcznej obsłudze. Najlepiej zrobić bezpłatną diagnozę i policzyć konkretny przypadek — formularz jest na /#kontakt.",
  },
  {
    question: "Czy muszę mieć CRM, żeby liczyć ten koszt?",
    answer:
      "Nie. Jeśli leady wpadają do skrzynki, arkusza albo formularza — koszt i tak istnieje, tylko jest jeszcze trudniej zmierzony. Brak CRM-a oznacza zwykle wyższy koszt utraconej widoczności (nikt nie wie, co dzieje się z leadem po pierwszym kontakcie).",
  },
  {
    question: "Czym różni się ten rachunek od „policzcie ROI z automatyzacji”?",
    answer:
      "ROI z automatyzacji liczy zwrot z inwestycji w narzędzie. Koszt ręcznej obsługi to baza pod ten rachunek — bez niej nie wiesz, co właściwie miałbyś odzyskać. Najpierw poznajesz koszt obecnego stanu, potem oceniasz, czy automatyzacja jest tego warta. Patrz też: /strefa-wiedzy/automatyzacja-vs-zatrudnienie.",
  },
];

export default function KosztRecznejObslugiLeadow() {
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
        <Breadcrumbs items={[{ label: "Koszt ręcznej obsługi leadów" }]} />

        {/* Hero — kompaktowy */}
        <section className="pt-16 pb-6 bg-gradient-to-b from-accent/10 to-transparent border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-label">Koszt obsługi leadów</span>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mt-4 mb-6 leading-tight">
                Ile kosztuje ręczna obsługa leadów w firmie B2B?
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Pełny rachunek: czas pracy, zgubione leady, błędy, raporty
                ręczne i koszt decyzji podejmowanych na złych danych. Z trzema
                przykładami firm i kalkulatorem do policzenia własnego
                przypadku.
              </p>
              <div className="mt-8 flex justify-center">
                <TrackedCTA
                  href="/kalkulator-leadow"
                  location="article_koszt_hero"
                  label="kalkulator"
                  eventName="cta_click_calculator"
                  className="btn-primary px-8 py-3.5 text-base"
                >
                  Policz koszt mojego procesu
                </TrackedCTA>
              </div>
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
                Bez logowania · wynik w zł / mies i / rok · 2 minuty
              </p>
            </div>
          </div>
        </section>

        {/* Treść w zakładkach — nic nie wycięte, podzielone */}
        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje strony o koszcie ręcznej obsługi leadów"
            tabs={[
              {
                label: "Problem",
                content: (
                  <div className="py-6 lg:py-8">
                    {/* Problem biznesowy */}
                    <section className="">
                      <div className="">
                        <div className="max-w-3xl mx-auto">
                          <div className="mb-10">
                            <span className="section-label">Problem</span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 leading-tight">
                              „Da się przeżyć” to najdroższe zdanie w sprzedaży
                              B2B
                            </h2>
                          </div>
                          <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-4 text-lg">
                            <p>
                              Ręczna obsługa leadów rzadko wygląda jak problem.
                              Wygląda jak rutyna. Ktoś dostaje maila, ktoś
                              przepisuje do CRM-a, ktoś pamięta o follow-upie,
                              ktoś składa raport w piątek. Nic się nie psuje na
                              tyle widocznie, żeby ktoś krzyknął „stop”.
                            </p>
                            <p>
                              I właśnie dlatego ten koszt jest największy. Bo
                              kosztuje każdego dnia, w małych kwotach, w wielu
                              miejscach naraz — zamiast jednego dużego rachunku,
                              który by zwrócił uwagę zarządu.
                            </p>
                            <p className="font-medium text-gray-900 dark:text-white">
                              Pierwsze pytanie nie brzmi: „jakiego narzędzia
                              użyć?”. Pierwsze pytanie brzmi: „ile faktycznie
                              nas kosztuje, że robimy to ręcznie?”.
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Objawy */}
                    <section className="mt-10 lg:mt-12 pt-10 lg:pt-12 border-t border-gray-100 dark:border-gray-800">
                      <div className="">
                        <div className="max-w-3xl mx-auto">
                          <div className="mb-10">
                            <span className="section-label">Objawy</span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                              Po czym poznasz, że firma płaci ten rachunek
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
                              Sześć konkretnych zachowań, które prawie zawsze
                              oznaczają, że koszt obsługi leadów jest wyższy niż
                              się wydaje.
                            </p>
                          </div>
                          <ul className="space-y-3">
                            {symptoms.map((s) => (
                              <li
                                key={s}
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
                                  {s}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>
                  </div>
                ),
              },
              {
                label: "Rachunek",
                content: (
                  <div className="py-6 lg:py-8">
                    {/* Pełny rachunek */}
                    <section className="">
                      <div className="">
                        <div className="max-w-4xl mx-auto">
                          <div className="mb-12">
                            <span className="section-label">
                              Pełny rachunek
                            </span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                              Pięć komponentów kosztu, które trzeba policzyć
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
                              Większość firm liczy tylko pierwszy. Stąd wniosek
                              „da się przeżyć” i stąd dziura w wyniku, której
                              nikt nie umie wskazać.
                            </p>
                          </div>
                          <div className="space-y-5">
                            {costComponents.map((c, i) => (
                              <div
                                key={c.title}
                                className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6"
                              >
                                <div className="flex items-start gap-4 mb-3">
                                  <span className="shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-accent/10 text-accent text-sm font-bold">
                                    {i + 1}
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                      {c.title}
                                    </h3>
                                    <p className="text-xs font-mono text-accent bg-accent/10 inline-block px-2 py-1 rounded mb-3">
                                      {c.formula}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                                      {c.description}
                                    </p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed border-l-2 border-accent/40 pl-4">
                                      <span className="font-semibold">
                                        Przykład:
                                      </span>{" "}
                                      {c.example}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-10 bg-accent-light dark:bg-accent-dark-light border border-accent/30 rounded-2xl p-6">
                            <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                              300 leadów miesięcznie × 5 minut × 60 zł/h = 1 500
                              zł miesięcznie samego przepisywania.
                            </p>
                            <p className="text-gray-800 dark:text-gray-200 leading-relaxed mt-3">
                              A to nie liczy: błędów, opóźnień, zgubionych
                              leadów, braku follow-upów, raportów robionych
                              ręcznie i decyzji finansowych podejmowanych na
                              bazie złych danych.
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* 3 przykłady firm */}
                    <section className="mt-10 lg:mt-12 pt-10 lg:pt-12 border-t border-gray-100 dark:border-gray-800">
                      <div className="">
                        <div className="max-w-5xl mx-auto">
                          <div className="mb-12 text-center">
                            <span className="section-label">Trzy skale</span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                              Mała, średnia, duża firma — konkretne liczby
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">
                              Założenia: stawka 60 zł/h dla operacji, 80 zł/h
                              dla raportowania, wartość klienta 5 000 zł, 5
                              minut na ręczną obsługę leada.
                            </p>
                          </div>
                          <div className="grid lg:grid-cols-3 gap-6">
                            {examples.map((e) => (
                              <div
                                key={e.size}
                                className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 flex flex-col"
                              >
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                  {e.size}
                                </h3>
                                <p className="text-sm text-accent font-medium mb-5">
                                  {e.leads}
                                </p>
                                <ul className="space-y-2 mb-5 flex-1">
                                  {e.breakdown.map((b) => (
                                    <li
                                      key={b.label}
                                      className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                                    >
                                      <span className="block text-gray-500 dark:text-gray-500 text-xs mb-0.5">
                                        {b.label}
                                      </span>
                                      <span className="font-mono text-gray-800 dark:text-gray-200">
                                        {b.value}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                                <p className="text-base font-bold text-gray-900 dark:text-white border-t border-gray-100 dark:border-gray-700 pt-4 mb-3">
                                  {e.total}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500 leading-relaxed">
                                  {e.note}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                ),
              },
              {
                label: "Wdrożenie",
                content: (
                  <div className="py-6 lg:py-8">
                    {/* Co da się zautomatyzować w 1. etapie */}
                    <section className="">
                      <div className="">
                        <div className="max-w-3xl mx-auto">
                          <div className="mb-10">
                            <span className="section-label">Pierwszy etap</span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                              Co da się zautomatyzować jako pierwsze,
                              najmniejszym kosztem
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
                              Nie cały proces. Najmniejszy kawałek, który
                              eliminuje największy komponent kosztu z rachunku
                              powyżej. U większości firm B2B to są te trzy
                              rzeczy:
                            </p>
                          </div>
                          <div className="space-y-4">
                            {firstStage.map((s, i) => (
                              <div
                                key={s.title}
                                className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 flex items-start gap-5"
                              >
                                <span className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-accent/10 text-accent text-sm font-bold">
                                  {i + 1}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    {s.title}
                                  </h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {s.desc}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <p className="mt-8 text-gray-600 dark:text-gray-400 leading-relaxed">
                            Pełny przepływ od formularza do raportu opisałem w
                            sekcji o{" "}
                            <Link
                              href="/automatyzacja-leadow-crm"
                              className="text-accent hover:underline"
                            >
                              automatyzacji leadów i CRM
                            </Link>
                            . Konkretną wycenę dla Pipedrive — w{" "}
                            <Link
                              href="/automatyzacja-pipedrive"
                              className="text-accent hover:underline"
                            >
                              automatyzacji Pipedrive
                            </Link>
                            .
                          </p>
                        </div>
                      </div>
                    </section>

                    {/* Diagram – stepper procesu */}
                    <section className="mt-10 lg:mt-12 pt-10 lg:pt-12 border-t border-gray-100 dark:border-gray-800">
                      <div className="">
                        <div className="max-w-4xl mx-auto">
                          <div className="mb-10">
                            <span className="section-label">Diagram</span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                              Jak wygląda proces, który eliminuje ten koszt
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
                              Sześć kroków zamiast łańcucha nadziei. Każdy
                              mierzalny osobno.
                            </p>
                          </div>
                          <ol className="relative space-y-3 lg:space-y-4">
                            {flowSteps.map((s, i) => (
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
                                        ? "bg-accent text-white"
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
                                {i < flowSteps.length - 1 && (
                                  <div className="flex justify-center py-1.5">
                                    <svg
                                      className="text-gray-300 dark:text-gray-600"
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
                    </section>
                  </div>
                ),
              },
              {
                label: "Błędy w liczeniu",
                content: (
                  <div className="py-6 lg:py-8">
                    {/* Typowe błędy w mierzeniu kosztu */}
                    <section className="">
                      <div className="">
                        <div className="max-w-3xl mx-auto">
                          <div className="mb-10">
                            <span className="section-label">Typowe błędy</span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                              Pięć błędów, przez które koszt wychodzi za niski
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
                              Każdy z nich osobno potrafi przekłamać rachunek o
                              kilkadziesiąt procent. Razem — sprawiają, że
                              zarząd patrzy na inny problem niż ten, który firma
                              faktycznie ma.
                            </p>
                          </div>
                          <div className="space-y-4">
                            {measurementMistakes.map((m, i) => (
                              <div
                                key={m.title}
                                className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6"
                              >
                                <div className="flex items-start gap-4">
                                  <span className="shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-bold">
                                    {i + 1}
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                      {m.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                      {m.desc}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                ),
              },
              {
                label: "FAQ i kontakt",
                content: (
                  <div className="py-6 lg:py-8">
                    {/* CTA-blok: kalkulator + diagnoza */}
                    <section className="">
                      <div className="">
                        <div className="max-w-3xl mx-auto text-center">
                          <span className="section-label">
                            Policz swój koszt
                          </span>
                          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-4">
                            Wpisz swoje liczby i zobacz wynik w 2 minuty
                          </h2>
                          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            Kalkulator policzy wszystkie pięć komponentów: czas,
                            zgubione leady, błędy, raportowanie. Wynik dostajesz
                            w zł na miesiąc i rok — z rozbiciem na pozycje,
                            żebyś wiedział, co naprawić w pierwszej kolejności.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedCTA
                              href="/kalkulator-leadow"
                              location="article_koszt_cta_block"
                              label="kalkulator"
                              eventName="cta_click_calculator"
                              className="btn-primary px-8 py-3.5 text-base"
                            >
                              Otwórz kalkulator
                            </TrackedCTA>
                            <TrackedCTA
                              href="/#kontakt"
                              location="article_koszt_cta_block"
                              label="diagnoza"
                              eventName="cta_click_article_audit"
                              className="btn-secondary px-8 py-3.5 text-base"
                            >
                              Zamów bezpłatną diagnozę
                            </TrackedCTA>
                          </div>
                          <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
                            Kalkulator: bez logowania · Diagnoza: odpowiedź w 24
                            h, bez zobowiązań
                          </p>
                        </div>
                      </div>
                    </section>

                    {/* FAQ */}
                    <section className="mt-10 lg:mt-12 pt-10 lg:pt-12 border-t border-gray-100 dark:border-gray-800">
                      <div className="">
                        <div className="max-w-3xl mx-auto">
                          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                            Najczęstsze pytania
                          </h2>
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
                          <div className="mt-10 text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                            Powiązane:{" "}
                            <Link
                              href="/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji"
                              className="text-accent hover:underline"
                            >
                              Jak policzyć ROI z automatyzacji
                            </Link>
                            {" · "}
                            <Link
                              href="/strefa-wiedzy/automatyzacja-vs-zatrudnienie"
                              className="text-accent hover:underline"
                            >
                              Automatyzacja vs zatrudnienie
                            </Link>
                            {" · "}
                            <Link
                              href="/automatyzacja-leadow-crm"
                              className="text-accent hover:underline"
                            >
                              Automatyzacja leadów i CRM
                            </Link>
                            {" · "}
                            <Link
                              href="/automatyzacja-pipedrive"
                              className="text-accent hover:underline"
                            >
                              Automatyzacja Pipedrive
                            </Link>
                            .
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Final CTA */}
                    <section className="mt-10 lg:mt-12 pt-10 lg:pt-12 border-t border-gray-100 dark:border-gray-800">
                      <div className="">
                        <div className="max-w-2xl mx-auto text-center">
                          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Najpierw policz, potem decyduj
                          </h2>
                          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            Bez liczby na stole każda dyskusja o automatyzacji
                            kończy się na „kiedyś się tym zajmiemy”. Z liczbą —
                            kończy się na konkretnym pierwszym etapie.
                          </p>
                          <TrackedCTA
                            href="/kalkulator-leadow"
                            location="article_koszt_final"
                            label="kalkulator"
                            eventName="cta_click_calculator"
                            className="btn-primary px-8 py-3.5 text-base"
                          >
                            Policz koszt mojego procesu
                          </TrackedCTA>
                          <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                            Bez logowania · wynik w 2 minuty · z rozbiciem na
                            pozycje
                          </p>
                        </div>
                      </div>
                    </section>
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
    </>
  );
}
