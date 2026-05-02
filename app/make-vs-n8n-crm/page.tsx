import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";

export const metadata: Metadata = {
  title: "Make czy n8n do automatyzacji CRM? | Fluxlab",
  description:
    "Make vs n8n w roli warstwy automatyzacji nad CRM. 5 typowych problemów CRM, jak rozwiązuje je każde z narzędzi, tabela porównawcza i kiedy wybrać Make, a kiedy n8n.",
  openGraph: {
    title: "Make czy n8n do automatyzacji CRM? | Fluxlab",
    description:
      "Make vs n8n w roli warstwy automatyzacji nad CRM. 5 typowych problemów CRM, jak rozwiązuje je każde z narzędzi, tabela porównawcza i kiedy wybrać Make, a kiedy n8n.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab — Make czy n8n do automatyzacji CRM",
      },
    ],
  },
  alternates: {
    canonical: "/make-vs-n8n-crm",
  },
};

const symptoms = [
  "Lead z reklamy idzie do skrzynki marketingu, do CRM trafia z opóźnieniem dnia roboczego",
  "Wbudowane workflow CRM nie radzą sobie z warunkami zagnieżdżonymi i HTTP request do zewnętrznych API",
  "Status w CRM rozjeżdża się ze statusem w fakturowaniu i księgowości",
  "Raport tygodniowy klejony ręcznie z 3 eksportów CSV w piątek po południu",
  "Custom fieldy giną w drodze przez natywne integracje (np. UTM-y nie wpadają)",
  "Brak dwustronnego sync CRM ↔ system wewnętrzny — handlowcy klikają w dwóch miejscach",
];

const beforeSteps = [
  "Lead w skrzynce marketingu — przekazywany ręcznie do CRM",
  "Brak wzbogacenia (NIP, GUS, scoring) — handlowiec dzwoni „w ciemno”",
  "Po rozmowie ręczna aktualizacja deala i custom fieldów",
  "Status zmienia się tylko w jednym systemie naraz",
  "Raport sprzedaży klei manager w Excelu z eksportów",
];

const afterSteps = [
  "Webhook z formularza odpala scenariusz/workflow w Make lub n8n",
  "Automatyczne wzbogacenie (GUS po NIP, walidacja maila, scoring)",
  "Tworzenie osoby + organizacji + deala w CRM ze wszystkimi polami",
  "Routing do handlowca i zadanie „kontakt w 5 minut”",
  "Sync statusów do fakturowania, księgowości, slack, magazyn",
  "Raport buduje się sam i ląduje w mailu w poniedziałek 7:00",
];

const crmProblems = [
  {
    n: "1",
    title: "Lead z formularza/reklamy do CRM ze wzbogaceniem",
    make: "Make: scenariusz Webhook → HTTP Request (GUS) → Pipedrive: Create Person/Org/Deal. Ładny diagram, mapowanie pól w UI, działa w 30 minut. Każdy moduł = 1 operacja, więc 1 lead z wzbogaceniem to 4–6 operacji.",
    n8n: "n8n: identyczna struktura, ale Code node pozwala wpiąć logikę dedupu (sprawdź email/nip → jeśli istnieje, zaktualizuj zamiast tworzyć) bez 5 dodatkowych modułów. 1 lead = 1 wykonanie, niezależnie od liczby kroków.",
    winner: "Remis przy małej skali. n8n wygrywa, gdy logika dedupu rośnie.",
  },
  {
    n: "2",
    title: "Dwustronny sync CRM ↔ system wewnętrzny (ERP/baza)",
    make: "Make: ma natywne moduły do najpopularniejszych systemów, dla custom backendu — HTTP Request. Działa, ale przy większej liczbie pól mapowanie staje się rozwlekłe. Sync co minutę = duża liczba operacji w pakiecie.",
    n8n: "n8n: code node + sub-workflow dają zwarty sync nawet przy 50+ polach. Self-hosted nie ma limitów wykonań — sync co 30 sekund kosztuje tyle samo co co godzinę. To miejsce, gdzie n8n wyraźnie wygrywa.",
    winner: "n8n — szczególnie przy częstym sync lub własnym backendzie.",
  },
  {
    n: "3",
    title: "Raporty managerskie i KPI sprzedaży",
    make: "Make: cron → eksport z CRM → transformacja → mail/Slack. Dla raportu na 3–5 metryk wystarczy. Przy raporcie z 20 metrykami i logiką per dział scenariusz puchnie.",
    n8n: "n8n: cron + code node liczący metryki w JS to zwykle jeden zwarty workflow. Łatwo wpiąć dashboard (Metabase/Grafana) wskazujący na bazę pośrednią, którą n8n napełnia.",
    winner:
      "n8n przy bardziej złożonych raportach. Make przy prostym e-mailu KPI.",
  },
  {
    n: "4",
    title: "Follow-up i ratowanie martwych dealów",
    make: "Make: scheduler → filtr deali bez aktywności X dni → akcja (mail, task, Slack). Łatwy do zbudowania, dobrze widoczny w UI, świetny dla osoby nietechnicznej.",
    n8n: "n8n: ten sam scenariusz, ale z możliwością dodania logiki w code node (np. skoring „prawdopodobieństwa odzyskania” na podstawie historii). Dla nietechnicznej osoby — odrobinę trudniejszy próg.",
    winner: "Make przy prostych regułach, n8n przy skoringu i logice ML.",
  },
  {
    n: "5",
    title: "Onboarding nowego klienta (po wygranej deala)",
    make: "Make: trigger Pipedrive: Deal won → akcje (utwórz folder Drive, wyślij umowę Autenti, wystaw fakturę, dodaj task). 5–10 modułów, czytelnie widoczne. Dla zespołu obsługi idealne.",
    n8n: "n8n: ten sam workflow w sub-workflow „onboarding”, wywoływany jako funkcja. Zysk: ten sam onboarding można odpalić ręcznie z innego workflow lub testowo bez czekania na wygranego deala.",
    winner: "Remis. Make wygrywa czytelnością, n8n elastycznością.",
  },
];

const comparison = [
  {
    dim: "Cena (10 tys. wykonań / mies.)",
    make: "Make Pro ok. 16 USD + dopłata za przekroczone operacje (typowo 30–50 USD/mies.)",
    n8n: "n8n.cloud Pro ok. 60 EUR/mies. Self-hosted — koszt VPS od 25 zł/mies.",
  },
  {
    dim: "Hosting",
    make: "Tylko SaaS (serwery w UE — Czechy, Niemcy)",
    n8n: "Cloud (UE, Niemcy) lub self-hosted gdziekolwiek",
  },
  {
    dim: "Krzywa nauki",
    make: "Łatwiejszy próg wejścia, lepsza dokumentacja po polsku, więcej tutoriali",
    n8n: "Bliżej programisty — expressions w JS, code node, więcej opcji per moduł",
  },
  {
    dim: "Integracje CRM",
    make: "Pipedrive, HubSpot, Salesforce, Zoho — wszystkie natywnie, głębokie",
    n8n: "Pipedrive, HubSpot, Salesforce — natywnie. Plus moduł HTTP do dowolnego API w 30 min",
  },
  {
    dim: "Debugging",
    make: "Wykonania w UI, łatwy podgląd payloadów, replay scenariusza",
    n8n: "Executions w UI, logi w czasie rzeczywistym, łatwiejszy lokalny debug code node",
  },
  {
    dim: "Customizacja / własna logika",
    make: "Tools, set variable, kilka modułów transformacji — głębsza logika wymaga obejść",
    n8n: "Code node (JS/Python), custom nodes, sub-workflow, wersjonowanie w gicie",
  },
];

const firstStage = [
  "Mapping źródeł leadów do jednego wejścia (formularze, lead ads, e-mail)",
  "Wzbogacenie + dedup + utworzenie osoby/organizacji/deala w CRM",
  "Routing do handlowca i zadanie „kontakt w X minut”",
  "Sync statusu do jednego systemu zewnętrznego (najpilniejszy)",
  "Prosty raport KPI sprzedaży, wysyłany codziennie rano",
];

const mistakes = [
  "Wybór narzędzia przed mapowaniem procesu — wtedy automatyzujemy bałagan",
  "Make wybrany dla zespołu technicznego, który chce code node — frustracja po 2 miesiącach",
  "n8n self-hosted bez osoby od Linuksa — pierwszy reboot kończy zabawę",
  "Brak dedupu w pierwszym workflow — baza zaczyna kłamać po tygodniu",
  "Logika biznesowa w 30 IF-ach w jednym scenariuszu zamiast w sub-workflow",
];

const faq = [
  {
    question: "Make czy n8n — które jest lepsze do automatyzacji CRM?",
    answer:
      "Nie ma uniwersalnej odpowiedzi. Make jest lepszy, gdy scenariusze ma budować osoba z biznesu (head of sales, marketing manager), wolumen jest do 30 tys. operacji miesięcznie i nie potrzebujecie self-hostingu. n8n jest lepszy, gdy macie osobę techniczną, wolumen rośnie, integrujecie się z własnymi systemami wewnętrznymi albo branża wymaga trzymania danych u siebie. W praktyce 60% klientów B2B trafia w obszar, gdzie oba narzędzia są równoważne — wtedy decyduje, kogo macie w zespole do utrzymania.",
  },
  {
    question: "Czy mogę użyć obu — Make do prostych rzeczy, n8n do reszty?",
    answer:
      "Tak i to częsta architektura. Make obsługuje scenariusze marketingowe i HR (proste, niskim wolumenem, budowane przez nietechniczne osoby). n8n obsługuje sync z systemami wewnętrznymi, raporty zarządcze i procesy operacyjne (większy wolumen, code node, własne API). Oba spinają się przez webhook, jeśli trzeba. Wadą jest dwa narzędzia do utrzymania, zaletą — narzędzie dopasowane do roli.",
  },
  {
    question:
      "Czy n8n self-hosted jest opłacalny przy CRM-owym wolumenie 5–10 tys. wykonań?",
    answer:
      "Próg opłacalności self-hostingu to ok. 30 tys. wykonań miesięcznie i/lub wymóg trzymania danych u siebie. Poniżej tego — n8n.cloud lub Make wychodzą podobnie. Self-hosted ma drugi koszt: utrzymanie. Bez osoby technicznej w firmie lub na retainerze (200–500 zł/mies.) self-hosting nie ma sensu — wtedy wybierajcie cloud.",
  },
  {
    question: "Które narzędzie ma więcej integracji CRM?",
    answer:
      "Make — ok. 1 800 natywnych integracji vs 500+ w n8n. Ale dla popularnych CRM-ów (Pipedrive, HubSpot, Salesforce, Zoho) głębokość integracji jest porównywalna. n8n ma natywny moduł HTTP Request i Code node, więc zintegrowanie się z dowolnym CRM-em (włącznie z polskim Livespace czy SugarCRM) zajmuje 30 minut.",
  },
  {
    question: "Jak długo trwa wdrożenie automatyzacji CRM w Make vs n8n?",
    answer:
      "Pierwszy etap (routing leadów + wzbogacenie + raport) — w obu narzędziach 2–3 tygodnie. Make startuje szybciej (pierwszy scenariusz w godzinach), ale przy bardziej złożonej logice n8n nadrabia w drugim tygodniu. Pełna warstwa nad CRM — 4–8 tygodni, niezależnie od narzędzia. Czas wdrożenia zależy od zakresu, nie wyboru Make/n8n.",
  },
  {
    question: "Co z RODO przy automatyzacji CRM?",
    answer:
      "Make: serwery w UE (Czechy, Niemcy), DPA, SOC 2. Dla większości firm B2B w Polsce wystarcza. n8n.cloud: serwery w UE (Niemcy), DPA, SOC 2 Type II. n8n self-hosted na waszym serwerze (Polska, Niemcy, własna infra) — pełna kontrola, dane nigdy nie wychodzą poza waszą infrastrukturę. Dla branż regulowanych (finanse, zdrowie, sektor publiczny) standardowo rekomenduję self-hosted.",
  },
];

export default function MakeVsN8nCrm() {
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
        <Breadcrumbs items={[{ label: "Make czy n8n do CRM" }]} />

        {/* Hero */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-accent/10 to-transparent border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-label mb-4">Make vs n8n dla CRM</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Make czy n8n: co wybrać do automatyzacji CRM i leadów?
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                Make jest jak ładny IDE dla automatyzacji bez kodu. n8n jest jak
                silnik, który możesz odpalić u siebie i pchać do końca. W roli
                warstwy automatyzacji nad CRM oba działają — ale wygrywają w
                innych scenariuszach. Konkretne porównanie na 5 typowych
                problemach CRM, tabela na 6 wymiarach i decyzja końcowa.
              </p>
              <TrackedCTA
                href="/#kontakt"
                location="article_make-vs-n8n-crm_hero"
                label="Dobierz narzędzie do procesu"
                eventName="cta_click_article_audit"
                className="btn-primary"
              >
                Dobierz narzędzie do procesu
              </TrackedCTA>
            </div>
          </div>
        </section>

        {/* Problem biznesowy */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <span className="section-label">Problem biznesowy</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                Najpierw proces, potem narzędzie
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Pierwsze pytanie nie brzmi: „Make czy n8n?”. Pierwsze pytanie
                brzmi: „który proces CRM-owy powtarza się często i kosztuje nas
                czas albo sprzedaż?”. Dopiero kiedy mamy konkretną pętlę do
                zautomatyzowania, wybór narzędzia ma sens. Inaczej wybieramy w
                ciemno i po dwóch miesiącach okazuje się, że Make nie umie tego,
                czego potrzebujemy, albo że n8n to overkill na dwa scenariusze.
                Konkretne ślady w firmie B2B, że jest co automatyzować:
              </p>
              <ul className="space-y-3">
                {[
                  "Lead trafia do CRM z opóźnieniem dnia roboczego, nie minut",
                  "Wbudowane automatyzacje CRM trafiły na limity logiczne lub liczbowe",
                  "Status w CRM ≠ status w fakturowaniu / księgowości / magazynie",
                  "Raporty managerskie klejone ręcznie z eksportów",
                  "Zespół klika to samo w 3 systemach przy każdej zmianie deala",
                  "Marketing nie wie, co stało się z lead'em po przekazaniu do sprzedaży",
                ].map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Objawy */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <span className="section-label">Objawy</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                Po czym poznasz, że potrzebujesz Make lub n8n nad CRM
              </h2>
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
                        d="M10 2v6m0 4v.01M10 18a8 8 0 100-16 8 8 0 000 16z"
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

        {/* Koszt problemu */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <span className="section-label">Koszt problemu</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                Ile kosztuje brak automatyzacji nad CRM
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Realny przypadek: zespół 4 handlowców, 600 leadów miesięcznie,
                ręczne wpisywanie do CRM zajmuje średnio 8 minut na lead (z
                wzbogaceniem). Manager klei raport tygodniowy 4 godziny w każdy
                piątek. To wszystko bez liczenia utraconych deali przez wolny
                czas reakcji.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Ręczna obsługa leadów
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    600 × 8 min = 80 h/mies.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Sklejanie raportu
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    16 h/mies. managera
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Stracone deale (wolna reakcja)
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ~12% konwersji w dół
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Łącznie miesięcznie
                  </p>
                  <p className="text-2xl font-bold text-accent">
                    ~12–18 tys. zł
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Wdrożenie pierwszego etapu (Make lub n8n) — 4–8 tys. zł netto,
                2–3 tygodnie. ROI w pierwszym miesiącu, jeśli zespół ma 2+
                handlowców i 200+ leadów miesięcznie.
              </p>
            </div>
          </div>
        </section>

        {/* Proces przed */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <span className="section-label">Przed wdrożeniem</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-8">
                Proces ręczny — niezależnie od CRM-a
              </h2>
              <ol className="space-y-3">
                {beforeSteps.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-start gap-4 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl p-5"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center text-sm font-semibold">
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
        </section>

        {/* Proces po */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <span className="section-label">Po wdrożeniu</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-8">
                Proces po Make lub n8n
              </h2>
              <ol className="space-y-3">
                {afterSteps.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-start gap-4 bg-white dark:bg-gray-800/60 border border-accent/20 rounded-xl p-5"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-semibold">
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
        </section>

        {/* Diagram (stepper) */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-10">
              <span className="section-label">Diagram</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-4">
                Identyczny scenariusz w Make i w n8n — krok po kroku
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Architektura jest praktycznie taka sama. Różnice są w
                szczegółach implementacji i kosztu skalowania.
              </p>
            </div>
            <ol className="relative max-w-3xl mx-auto space-y-3 lg:space-y-4">
              {[
                {
                  n: "1",
                  title: "Webhook / Trigger",
                  desc: "Make: Webhooks > Custom webhook. n8n: Webhook node. Identyczne, jeden URL na źródło leadów.",
                  accent: false,
                },
                {
                  n: "2",
                  title: "Walidacja danych",
                  desc: "Make: Filter / Tools > Set variable. n8n: IF node + Code node. n8n daje więcej swobody, Make jest czytelniejszy.",
                  accent: false,
                },
                {
                  n: "3",
                  title: "Wzbogacenie (GUS, scoring)",
                  desc: "Make: HTTP Request → Tools. n8n: HTTP Request → Code node. Tu n8n ma przewagę przy logice scoringu w JS.",
                  accent: true,
                },
                {
                  n: "4",
                  title: "Dedup w CRM",
                  desc: "Make: Pipedrive: Search → router → Update lub Create. n8n: Pipedrive: Search → IF → Update/Create lub jeden Code node.",
                  accent: true,
                },
                {
                  n: "5",
                  title: "Tworzenie deala + zadania",
                  desc: "Make: Pipedrive: Create Deal + Create Activity. n8n: identycznie. Funkcjonalnie remis.",
                  accent: false,
                },
                {
                  n: "6",
                  title: "Notyfikacja Slack/SMS",
                  desc: "Make: Slack: Send Message + Twilio: Send SMS. n8n: identycznie, ale można wpiąć w sub-workflow „notify” reużywany w innych scenariuszach.",
                  accent: false,
                },
                {
                  n: "7",
                  title: "Sync do systemu zewnętrznego",
                  desc: "Make: HTTP Request lub natywny moduł. n8n: HTTP Request, Postgres node lub własny node. Tu n8n self-hosted wygrywa kosztem.",
                  accent: true,
                },
              ].map((s, i, arr) => (
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
                  {i < arr.length - 1 && (
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

        {/* 5 problemów CRM — Make vs n8n */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <span className="section-label">5 problemów CRM</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                Jak każde narzędzie rozwiązuje 5 typowych problemów CRM
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                Zamiast porównania abstrakcyjnego — konkretne CRM-owe
                scenariusze i jak Make oraz n8n radzą sobie w każdym z nich.
              </p>
              <div className="space-y-6">
                {crmProblems.map((p) => (
                  <div
                    key={p.n}
                    className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm">
                        {p.n}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white pt-1.5">
                        {p.title}
                      </h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                          Make
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {p.make}
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                          n8n
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {p.n8n}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-accent font-semibold border-l-2 border-accent/40 pl-3">
                      Werdykt: {p.winner}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tabela porównawcza */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              <span className="section-label">Tabela</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                Make vs n8n — 6 wymiarów decyzji
              </h2>
              <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th className="px-4 lg:px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Wymiar
                      </th>
                      <th className="px-4 lg:px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Make
                      </th>
                      <th className="px-4 lg:px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        n8n
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {comparison.map((row) => (
                      <tr key={row.dim}>
                        <td className="px-4 lg:px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white align-top">
                          {row.dim}
                        </td>
                        <td className="px-4 lg:px-6 py-4 text-sm text-gray-600 dark:text-gray-400 align-top leading-relaxed">
                          {row.make}
                        </td>
                        <td className="px-4 lg:px-6 py-4 text-sm text-gray-600 dark:text-gray-400 align-top leading-relaxed">
                          {row.n8n}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Decyzja końcowa */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <span className="section-label">Decyzja</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                Kiedy Make, a kiedy n8n
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Wybierz Make, gdy:
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                    Scenariusze ma budować osoba z biznesu — head of sales,
                    marketing manager, ops lead. Make jest jak ładny IDE: ma
                    czytelny diagram, świetne UI mapowania pól, lepsze tutoriale
                    po polsku. Pierwszy działający scenariusz w godzinach, nie
                    dniach. Wolumen do 30 tys. operacji miesięcznie, brak osoby
                    technicznej w firmie, dane mogą leżeć w UE u dostawcy SaaS.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    To również wybór dla zespołów marketingu i HR w większej
                    organizacji — nawet jeśli backoffice działa na n8n.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800/60 border border-accent/30 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Wybierz n8n, gdy:
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                    Macie osobę techniczną (lub partnera na retainerze), wolumen
                    rośnie powyżej 30 tys. operacji, integrujecie się z własnymi
                    systemami wewnętrznymi (ERP, własna baza Postgres, backend)
                    lub branża wymaga trzymania danych u siebie. n8n jest jak
                    silnik — daje code node, sub-workflow, wersjonowanie w
                    gicie, własne moduły, self-hosting.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    To też wybór, gdy chcecie pełnej kontroli nad logiką
                    biznesową i nie chcecie być uzależnieni od planu cenowego
                    dostawcy SaaS przy skalowaniu.
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Cała ogólna analiza Make vs n8n (poza CRM) jest w{" "}
                <Link
                  href="/strefa-wiedzy/make-vs-n8n"
                  className="text-accent hover:underline"
                >
                  Make vs n8n — porównanie dla MŚP
                </Link>
                . Tu skupiłem się na CRM-owym kącie. Pełniejszy obraz całego
                ekosystemu — w{" "}
                <Link
                  href="/strefa-wiedzy/zapier-make-n8n-porownanie"
                  className="text-accent hover:underline"
                >
                  Zapier vs Make vs n8n
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Co wdrożyć w pierwszym etapie */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <span className="section-label">Pierwszy etap</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                Co wdrożyć w pierwszych 2–3 tygodniach (niezależnie od
                narzędzia)
              </h2>
              <ul className="space-y-3">
                {firstStage.map((s, i) => (
                  <li
                    key={s}
                    className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Typowe błędy */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <span className="section-label">Antywzorce</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                Typowe błędy przy wyborze i wdrażaniu Make/n8n nad CRM
              </h2>
              <ul className="space-y-3">
                {mistakes.map((m) => (
                  <li
                    key={m}
                    className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
                  >
                    <svg
                      className="flex-shrink-0 mt-0.5 text-red-400"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M5 5l10 10M15 5L5 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {m}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Cennik */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <span className="section-label">Cennik</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-4">
                Ile kosztuje wdrożenie
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                Stała cena projektowa, kamienie milowe, płatność po odbiorze
                etapu. Cena nie zależy od wyboru Make vs n8n — zależy od
                zakresu. Wycenę dostajesz po godzinnej rozmowie.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Pierwszy etap
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    4–8 tys. zł
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Routing leadów + wzbogacenie + tworzenie w CRM + prosty
                    raport. 2–3 tygodnie.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800/60 border border-accent/30 rounded-2xl p-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Pełna warstwa nad CRM
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    12–25 tys. zł
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Routing + sync z systemami zewnętrznymi + raporty +
                    follow-up + onboarding. 4–8 tygodni etapami.
                  </p>
                </div>
              </div>
              <Link href="/automatyzacja-leadow-crm" className="btn-secondary">
                Zobacz pełny cennik automatyzacji CRM
              </Link>
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

        {/* Powiązane */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Powiązane
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                    Strefa wiedzy
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/strefa-wiedzy/make-vs-n8n"
                        className="text-accent hover:underline"
                      >
                        Make vs n8n — porównanie dla MŚP (ogólne)
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/strefa-wiedzy/n8n-vs-zapier"
                        className="text-accent hover:underline"
                      >
                        n8n vs Zapier
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/strefa-wiedzy/zapier-make-n8n-porownanie"
                        className="text-accent hover:underline"
                      >
                        Zapier vs Make vs n8n — wielkie porównanie
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                    Usługi
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/n8n-dla-crm"
                        className="text-accent hover:underline"
                      >
                        n8n dla CRM
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/automatyzacja-leadow-crm"
                        className="text-accent hover:underline"
                      >
                        Automatyzacja leadów i CRM
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/automatyzacja-pipedrive"
                        className="text-accent hover:underline"
                      >
                        Automatyzacja Pipedrive
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/automatyzacja-salesforce"
                        className="text-accent hover:underline"
                      >
                        Automatyzacja Salesforce
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/zapier-make"
                        className="text-accent hover:underline"
                      >
                        Zapier i Make
                      </Link>
                    </li>
                    <li>
                      <Link href="/n8n" className="text-accent hover:underline">
                        n8n — wdrożenia
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 lg:py-24 bg-accent/10 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Dobierzmy narzędzie do twojego procesu
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                30 minut rozmowy o procesie sprzedaży. Wyjdziesz z rekomendacją
                Make vs n8n popartą konkretnymi wymiarami z waszej firmy —
                wolumen, zespół, integracje, compliance.
              </p>
              <TrackedCTA
                href="/#kontakt"
                location="article_make-vs-n8n-crm_final"
                label="Dobierz narzędzie do procesu"
                eventName="cta_click_article_audit"
                className="btn-primary"
              >
                Dobierz narzędzie do procesu
              </TrackedCTA>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
