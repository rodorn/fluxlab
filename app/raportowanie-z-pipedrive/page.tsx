import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";

export const metadata: Metadata = {
  title: "Automatyczne raportowanie z Pipedrive | Bez ręcznego Excela",
  description:
    "Jak zrobić automatyczne raporty sprzedaży z Pipedrive bez klejenia Excela co poniedziałek. Pipeline, źródła leadów, czas reakcji, prognozy — codziennie aktualne, bez ręcznej pracy.",
  openGraph: {
    title: "Automatyczne raportowanie z Pipedrive | Bez ręcznego Excela",
    description:
      "Jak zrobić automatyczne raporty sprzedaży z Pipedrive bez klejenia Excela co poniedziałek. Pipeline, źródła leadów, czas reakcji, prognozy — codziennie aktualne, bez ręcznej pracy.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab — Automatyczne raportowanie z Pipedrive",
      },
    ],
  },
  alternates: {
    canonical: "/raportowanie-z-pipedrive",
  },
};

const symptoms = [
  "W każdy poniedziałek ktoś otwiera Pipedrive, eksportuje deale do CSV i kleji to z arkuszem marketingu.",
  "Raport sprzedaży dla zarządu jest co tydzień inny — bo każdy liczy „pipeline” swoją metodą.",
  "Liczby z Pipedrive nie zgadzają się z liczbami z faktur ani z liczbami z marketingu.",
  "Handlowcy aktualizują etap deala raz w miesiącu, dzień przed spotkaniem z managerem.",
  "Raport „skąd przychodzą zamknięte deale” robi się ręcznie, bo źródło jest puste w połowie rekordów.",
  "Manager wchodzi rano do Pipedrive, klika 12 filtrów i robi screenshota — to jest dashboard.",
];

const beforeSteps = [
  "Piątek, 14:00. Manager prosi o raport sprzedaży na poniedziałek.",
  "Ktoś otwiera Pipedrive i eksportuje deale do CSV.",
  "Otwiera arkusz Google Sheets z poprzedniego tygodnia, kasuje stare dane, wkleja nowe.",
  "Robi VLOOKUP-y, żeby dokleić źródło leada (które trzyma się w innym pliku).",
  "Zauważa, że 30% dealów ma puste źródło — wpisuje „inne” i idzie dalej.",
  "Liczy konwersję, średni czas zamknięcia, sumy po etapach — ręcznie, formułami.",
  "Robi 3 wykresy w Excelu, robi screenshota, wkleja do PowerPointa.",
  "Wysyła PDF do zarządu o 23:30 w niedzielę.",
  "Pierwsza rzecz, jaką usłyszy w poniedziałek: „a możesz mi to też pokazać po regionie?”.",
];

const afterSteps = [
  {
    n: "1",
    title: "Pipedrive jako jedno źródło prawdy",
    desc: "Wszystkie deale, osoby, organizacje, aktywności i custom fields wyciągane przez API. Bez eksportów do CSV i ręcznych kopii.",
    accent: false,
  },
  {
    n: "2",
    title: "Synchronizacja do hurtowni / arkusza / BI",
    desc: "Cykliczny pull z Pipedrive do warstwy danych — Google Sheets, Postgres, BigQuery, Looker Studio, Metabase. Co 15 minut, co godzinę albo na żywo, zależnie od potrzeby.",
    accent: false,
  },
  {
    n: "3",
    title: "Wzbogacenie i wyliczenia",
    desc: "Dane z Pipedrive łączone z marketingiem (UTM-y, kampanie, koszty kliknięć), z księgowością (faktury, płatności) i z call center (połączenia, czas reakcji). Wszystko w jednym miejscu.",
    accent: true,
  },
  {
    n: "4",
    title: "Walidacja spójności",
    desc: "System pilnuje, że źródło, etap i właściciel deala są wypełnione. Brakujące pola = alert, nie cicha luka w raporcie. Manager nie dowiaduje się o tym dopiero przy raporcie kwartalnym.",
    accent: false,
  },
  {
    n: "5",
    title: "Raporty tematyczne, nie monolityczne",
    desc: "Pipeline, źródła leadów, czas reakcji, konwersja po etapach, performance handlowców, prognoza zamknięć — każdy raport osobno, każdy aktualny i klikalny.",
    accent: false,
  },
  {
    n: "6",
    title: "Codzienna dystrybucja",
    desc: "Każdy odbiorca dostaje to, czego potrzebuje, kiedy potrzebuje — manager mailem co rano, handlowiec dashboardem, zarząd raportem tygodniowym. Nikt nie czeka na piątek.",
    accent: false,
  },
  {
    n: "7",
    title: "Alerty i anomalie",
    desc: "Spadek liczby leadów, wydłużony czas zamknięcia, duża wartość deala stojąca w jednym etapie powyżej X dni — wszystko z automatycznym alertem do osoby odpowiedzialnej.",
    accent: true,
  },
];

const firstStage = [
  "Codzienny pull deali z Pipedrive do Google Sheets albo Postgresa.",
  "Walidacja kompletności pól (źródło, etap, właściciel, wartość).",
  "Jeden dashboard pipeline'u: liczba deali, wartość, średni czas, konwersja po etapach.",
  "Alert, gdy deal stoi w jednym etapie ponad ustalony czas.",
];

const mistakes = [
  {
    title: "Raporty robione w samym Pipedrive",
    desc: "Wbudowane raporty Pipedrive są okej do podglądu, ale słabe do prezentacji zarządowi i bezużyteczne do łączenia z marketingiem czy księgowością. Próba zrobienia tam wszystkiego prowadzi do tabelek, których nikt nie czyta.",
  },
  {
    title: "Eksport CSV jako proces",
    desc: "Jeśli twój „proces raportowania” opiera się na ręcznym eksporcie CSV — to nie jest proces, to ceremoniał. Jedna osoba na urlopie i raportu nie ma. Pipedrive ma API od kilkunastu lat, czas z niego skorzystać.",
  },
  {
    title: "Zbyt skomplikowany dashboard",
    desc: "Dashboard z 40 wskaźnikami nikt nie ogląda po dwóch tygodniach. Lepiej trzy dashboardy po 5 wskaźników każdy — pipeline, źródła, prognoza — niż jedno gigantyczne BI, które wymaga 20 minut na zrozumienie.",
  },
  {
    title: "Pipedrive jako źródło danych finansowych",
    desc: "Wartość deala w Pipedrive to nie to samo co przychód. Nie miksuj statusów sprzedażowych z fakturami — łącz dane z księgowością i traktuj Pipedrive jako źródło lejka, nie kasy.",
  },
  {
    title: "Brak mapowania pól",
    desc: "Custom fields w Pipedrive zwykle puchną z biegiem czasu — 50 pól, z których 30 jest zawsze puste, a 5 nikt nie pamięta po co. Przed automatyzacją raportowania trzeba zrobić porządek, jakie pola są wymagane i jakie liczą się do raportów.",
  },
];

const faq = [
  {
    question: "Czy potrzebuję BI typu Power BI, Looker albo Metabase?",
    answer:
      "Nie zawsze. Dla małych firm wystarczy Google Sheets z automatycznym zasilaniem z Pipedrive — czytelnie, zero kosztu licencji, zero progu wejścia. Większe firmy z wieloma źródłami danych zwykle skorzystają z Looker Studio (darmowy) albo Metabase (open source). Power BI wybieram, gdy reszta firmy już w nim siedzi.",
  },
  {
    question: "Jak często aktualizować dane?",
    answer:
      "Zależy od typu raportu. Dashboard pipeline'u — co 15 minut do godziny. Raport prognozy zamknięć — raz dziennie wystarczy. Alerty o stojących dealach — natychmiast, przez webhook. Synchronizacja co 5 minut „bo można” to przerost formy nad treścią i zwykle generuje zbędne rate-limity API.",
  },
  {
    question: "Czy raporty będą działać, gdy zmienimy strukturę Pipedrive?",
    answer:
      "Tak, jeśli integracja jest zrobiona porządnie — z mapowaniem pól w jednym miejscu, walidacją struktury i alertem przy zmianach schematu. Zmiana nazwy etapu, dodanie custom fielda, zmiana waluty — wszystko powinno być przewidziane. Słabo zbudowana integracja sypie się przy pierwszej zmianie i nikt nie wie czemu.",
  },
  {
    question: "Co z danymi historycznymi?",
    answer:
      "Pipedrive trzyma pełną historię zmian deali, ale wyciągnięcie jej przez API wymaga osobnej obsługi (tzw. flow). Jeśli zależy ci na śledzeniu, jak deal poruszał się przez etapy, to zapisujemy stan dzienny w hurtowni — od momentu wdrożenia masz pełną historię. Wcześniejszą historię można odtworzyć z Pipedrive deal flow API.",
  },
  {
    question: "Ile to trwa?",
    answer:
      "Najmniejszy działający kawałek (codzienny pull, jeden dashboard pipeline'u, alert o stojących dealach) — 3–5 dni roboczych. Pełne raportowanie z marketingiem, prognozą i alertami anomalii — 2–4 tygodnie zależnie od liczby źródeł danych i stopnia uporządkowania custom fields.",
  },
  {
    question: "Ile to kosztuje?",
    answer:
      "Etap 1 (jeden raport pipeline'u + alerty) — od 4 do 7 tys. zł. Pełne raportowanie z wieloma źródłami i prognozą — 10–20 tys. zł zależnie od stopnia bałaganu w Pipedrive i liczby integracji. Dokładną wycenę podaję po krótkim audycie.",
  },
];

export default function RaportowanieZPipedrive() {
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
        name: "Automatyczne raportowanie z Pipedrive",
        item: "https://fluxlab.pl/raportowanie-z-pipedrive",
      },
    ],
  };

  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Automatyczne raportowanie z Pipedrive" },
          ]}
        />

        {/* Hero */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-accent/10 to-transparent border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-label">Raportowanie Pipedrive</span>
              <h1 className="mt-4 text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Automatyczne raporty z Pipedrive bez ręcznego Excela
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Pipedrive zna każdą zmianę etapu, każde aktywne zadanie i każdą
                wartość deala. Mimo to większość firm liczy raporty ręcznie w
                piątek wieczorem. Bo „eksport CSV plus VLOOKUP” to nie jest
                proces, tylko ceremoniał.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Pokażę ci, co trzeba zrobić, żeby zarząd dostawał raport
                codziennie rano, a nikt nie musiał klejić niczego w arkuszu.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <TrackedCTA
                  href="/#kontakt"
                  location="article_raportowanie_pipedrive_hero"
                  label="Chcę raporty bez ręcznej pracy"
                  eventName="cta_click_article_audit"
                  className="btn-primary text-base px-7 py-3"
                >
                  Chcę raporty bez ręcznej pracy
                </TrackedCTA>
                <Link href="/automatyzacja-pipedrive" className="btn-secondary">
                  Zobacz pełną ofertę Pipedrive
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Problem biznesowy */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <span className="section-label">Problem</span>
              <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Czemu raporty z CRM-a tak bolą
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Pipedrive nie został zaprojektowany jako narzędzie raportowe.
                Jest świetny do prowadzenia pipeline'u i zadań, ale jego
                wbudowane raporty są albo zbyt proste (statyczne dashboardy),
                albo zbyt sztywne (filtry zamiast prawdziwego BI). Dlatego
                większość firm i tak kończy w Excelu — i tam zaczynają się
                problemy.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Ręczne raportowanie nie jest tylko stratą czasu. Jest stratą
                spójności. Każdy tydzień wygląda inaczej, bo ktoś inny robi
                raport, ktoś inny wpisuje formuły, ktoś inny ignoruje 30% dealów
                z pustym źródłem. Po pół roku takiego trybu nikt już nie wie, co
                naprawdę pokazują liczby.
              </p>
              <ul className="space-y-3">
                {[
                  "Ten sam wskaźnik różni się między raportami, bo każdy liczy go inaczej.",
                  "Zarząd dostaje raport raz w tygodniu, kiedy decyzja jest już spóźniona o 5 dni.",
                  "Manager nie ma jak sprawdzić w środę, ile dealów stoi w danym etapie powyżej tygodnia.",
                  "Marketing pokazuje 200 leadów, sprzedaż widzi 130 — i nikt nie wie, gdzie zniknęło 70.",
                  "Prognozy zamknięć opierają się na intuicji handlowca, bo dane są niespójne.",
                  "Każdy nowy raport oznacza dodatkowe 2 godziny pracy ręcznej w piątek.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
                  >
                    <span className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-accent" />
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Objawy */}
        <section className="py-12 lg:py-16 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <span className="section-label">Objawy</span>
              <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Po czym poznać, że masz ten problem
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Wystarczy, że któreś z poniższych zdań brzmi jak twoja firma. Im
                więcej trafień, tym pilniejszy temat:
              </p>
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
                      <path
                        d="M10 2v10m0 4h.01"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="currentColor"
                        strokeWidth="2"
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

        {/* Koszt problemu */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <span className="section-label">Koszt</span>
              <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Ile kosztuje raport robiony w Excelu
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Konkretny rachunek, realistyczne wejście:
              </p>
              <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 mb-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  <strong className="text-gray-900 dark:text-white">
                    4 raporty w tygodniu × 1,5 h × 100 zł/h × 50 tygodni ={" "}
                    <span className="text-accent">30 000 zł / rok</span>
                  </strong>{" "}
                  samego klejenia danych. Plus ad-hoc'i („a możesz mi to po
                  regionie?”) — kolejne 8–12 tys. zł rocznie.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  W większych firmach — łatwo 60–80 tys. zł rocznie samego
                  ręcznego raportowania. I to bez liczenia kosztu spóźnionych
                  decyzji.
                </p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Ale to nie jest największy koszt. Większy to:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-accent" />
                  <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    <strong>Spóźnione decyzje.</strong> Raport tygodniowy w
                    piątek znaczy, że problem zauważasz 5 dni za późno. W
                    sprzedaży 5 dni to różnica między domkniętym a przegranym
                    deal'em.
                  </span>
                </li>
                <li className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-accent" />
                  <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    <strong>Błędne decyzje.</strong> Liczby z różnych raportów
                    się nie zgadzają. Zarząd wybiera tę, która pasuje do
                    narracji, a niekoniecznie tę, która jest prawdziwa.
                  </span>
                </li>
                <li className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-accent" />
                  <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    <strong>Marketing i sprzedaż mówią innymi językami.</strong>{" "}
                    Bez wspólnego źródła danych nikt nie wie, które kampanie
                    zamykają deale, a budżet reklamowy wydaje się „na czuja”.
                  </span>
                </li>
                <li className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-accent" />
                  <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    <strong>Bus factor równy jeden.</strong> Raport jest w
                    głowie jednej osoby. Urlop tej osoby = brak raportów. To nie
                    jest skalowanie firmy, to budowanie kuli śnieżnej.
                  </span>
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Automatyzowanie bałaganu to tylko szybsze produkowanie bałaganu.
                Dlatego automatyzację raportowania trzeba zacząć od porządku w
                samych danych — nie od pięknego dashboardu.
              </p>
            </div>
          </div>
        </section>

        {/* Proces przed */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <span className="section-label">Proces przed</span>
              <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Tak to wygląda dziś
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Klasyczny piątek w firmie B2B, gdzie raporty robi się ręcznie:
              </p>
              <ol className="space-y-3">
                {beforeSteps.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-start gap-4 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                W tym przepływie raport jest zawsze spóźniony, zawsze trochę
                inny i zawsze zależny od jednej osoby. Pierwsze pytanie po
                pokazaniu raportu zwykle wywraca cały arkusz — bo „pokaż mi to
                jeszcze po regionie” oznacza kolejną godzinę pracy.
              </p>
            </div>
          </div>
        </section>

        {/* Proces po + diagram */}
        <section className="py-12 lg:py-16">
          <div className="container-wide">
            <div className="max-w-2xl mb-10">
              <span className="section-label">Proces po</span>
              <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Tak to wygląda, gdy raport robi się sam
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                Nie chodzi o jeden „magiczny dashboard”. Chodzi o łańcuch:
                Pipedrive → warstwa danych → wyliczenia → raporty. Każdy element
                osobno mierzalny, każdy można zbudować niezależnie.
              </p>
            </div>

            <ol className="relative max-w-4xl space-y-3 lg:space-y-4">
              {afterSteps.map((s, i) => (
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
                  {i < afterSteps.length - 1 && (
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
        </section>

        {/* Co wdrożyć w 1. etapie */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <span className="section-label">Etap 1</span>
              <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Co wdrożyć najpierw
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Najmniejszy kawałek, który eliminuje 80% bólu — czyli ręczny
                eksport CSV i klejenie pipeline'u. Reszta (marketing,
                księgowość, prognozy) idzie w drugim etapie, gdy widać, że
                pierwszy działa.
              </p>
              <ul className="space-y-3">
                {firstStage.map((s) => (
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
                      <path
                        d="M4 10l4 4 8-8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                3–5 dni roboczych. Po wdrożeniu mierzymy efekt przez 2–3
                tygodnie i decydujemy, co dalej. Zwykle drugi etap wraca w
                temacie „a teraz dołóżmy źródła leadów i prognozę”.
              </p>
            </div>
          </div>
        </section>

        {/* Typowe błędy */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <span className="section-label">Antywzorce</span>
              <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Typowe błędy przy raportowaniu z Pipedrive
              </h2>
              <div className="space-y-4">
                {mistakes.map((m) => (
                  <div
                    key={m.title}
                    className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {m.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Cennik */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <span className="section-label">Cennik</span>
              <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Ile to kosztuje
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                Stała cena za projekt, transze powiązane z kamieniami milowymi.
                Widełki potwierdzam po krótkim audycie. Dla porównania: realny
                koszt ręcznego raportowania to często 30–60 tys. zł rocznie
                samej pracy.
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
                    <tr>
                      <td className="px-6 py-5 font-semibold text-gray-900 dark:text-white align-top">
                        Etap 1 — minimalny
                      </td>
                      <td className="px-6 py-5 align-top">
                        Codzienny pull deali z Pipedrive, jeden dashboard
                        pipeline'u, walidacja kompletności pól, alert o
                        stojących dealach.
                      </td>
                      <td className="px-6 py-5 align-top whitespace-nowrap font-semibold text-accent">
                        4 — 7 tys. zł
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-5 font-semibold text-gray-900 dark:text-white align-top">
                        Etap 2 — pełny
                      </td>
                      <td className="px-6 py-5 align-top">
                        Wszystko z etapu 1 + raporty źródeł leadów, czas
                        reakcji, performance handlowców, prognoza zamknięć,
                        alerty anomalii.
                      </td>
                      <td className="px-6 py-5 align-top whitespace-nowrap font-semibold text-accent">
                        10 — 18 tys. zł
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-5 font-semibold text-gray-900 dark:text-white align-top">
                        Wielo-źródłowe BI
                      </td>
                      <td className="px-6 py-5 align-top">
                        Powyższe + integracja z marketingiem (UTM, kampanie,
                        koszty), księgowością (faktury, płatności), call center,
                        dedykowane dashboardy w Looker / Metabase / Power BI.
                      </td>
                      <td className="px-6 py-5 align-top whitespace-nowrap font-semibold text-accent">
                        18 — 30 tys. zł
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <TrackedCTA
                  href="/automatyzacja-leadow-crm"
                  location="article_raportowanie_pipedrive_pricing"
                  label="Zobacz pełną ofertę"
                  eventName="cta_click_article_audit"
                  className="btn-secondary"
                >
                  Zobacz pełną ofertę: automatyzacja leadów do CRM
                </TrackedCTA>
                <TrackedCTA
                  href="/#kontakt"
                  location="article_raportowanie_pipedrive_pricing_primary"
                  label="Chcę raporty bez ręcznej pracy"
                  eventName="cta_click_article_audit"
                  className="btn-primary"
                >
                  Chcę raporty bez ręcznej pracy
                </TrackedCTA>
              </div>
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Powiązane:{" "}
                <Link
                  href="/automatyzacja-pipedrive"
                  className="text-accent hover:underline"
                >
                  automatyzacja Pipedrive
                </Link>
                ,{" "}
                <Link
                  href="/automatyzacja-formularza-do-pipedrive"
                  className="text-accent hover:underline"
                >
                  integracja formularza z Pipedrive
                </Link>
                ,{" "}
                <Link
                  href="/strefa-wiedzy/jak-zautomatyzowac-raportowanie-w-firmie"
                  className="text-accent hover:underline"
                >
                  jak zautomatyzować raportowanie w firmie
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
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
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 lg:py-24 bg-accent/10 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Czas, żeby raporty robiły się same
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                30 minut konsultacji wystarczy, żeby określić, czy w twojej
                firmie pierwszy etap automatycznego raportowania można zamknąć w
                3–5 dni. Bez zobowiązań, bez prezentacji w PowerPoincie.
              </p>
              <TrackedCTA
                href="/#kontakt"
                location="article_raportowanie_pipedrive_final"
                label="Chcę raporty bez ręcznej pracy"
                eventName="cta_click_article_audit"
                className="btn-primary text-base px-7 py-3"
              >
                Chcę raporty bez ręcznej pracy
              </TrackedCTA>
            </div>
          </div>
        </section>

        {/* Bottom breadcrumb */}
        <div className="pb-8">
          <Breadcrumbs
            items={[{ label: "Automatyczne raportowanie z Pipedrive" }]}
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
