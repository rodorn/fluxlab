import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "Automatyczne przypisywanie leadów do handlowców | Routing CRM",
  description:
    "Automatyczne przypisywanie leadów do handlowców według regionu, źródła, produktu lub obciążenia pipeline'u. Lead routing CRM, który eliminuje ręczne przekazywanie zapytań i skraca czas reakcji.",
  openGraph: {
    title: "Automatyczne przypisywanie leadów do handlowców | Routing CRM",
    description:
      "Lead routing CRM, który automatycznie przypisuje zapytania według regionu, źródła lub produktu. Bez arkuszy, bez ręcznego przekazywania, bez gubienia leadów.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab — Automatyczne przypisywanie leadów do handlowców",
      },
    ],
  },
  alternates: {
    canonical: "/automatyczne-przypisywanie-leadow",
  },
};

const problemPoints = [
  "Lead wpada do wspólnej skrzynki i czeka, aż ktoś go zauważy.",
  "Manager rano patrzy na arkusz i ręcznie rozdziela zapytania między handlowców.",
  "Handlowcy „polują” na te same leady albo żaden nie wie, że dany lead jest jego.",
  "Reguły podziału (region, branża, produkt) są w głowie szefa sprzedaży.",
  "Gdy ktoś jest na urlopie, leady wpadają w czarną dziurę.",
  "Nie wiadomo, ile leadów dostał każdy handlowiec ani ile z nich realnie obsłużył.",
];

const symptoms = [
  "„Czy ktoś już dzwonił do tego klienta?” — pada na każdym standupie.",
  "Manager spędza 30–60 minut dziennie na rozdzielaniu leadów ręcznie.",
  "Klient dostaje pierwszy kontakt po 4–24 godzinach zamiast po 5 minutach.",
  "Najlepszy handlowiec dostaje wszystkie najgorętsze leady, reszta się nudzi.",
  "Tabela „kto co bierze” żyje w arkuszu Google, do którego pół zespołu nie ma dostępu.",
  "Po urlopie handlowca trzeba ręcznie przepiąć jego deale — często nie wiadomo, na czym stanęło.",
];

const beforeSteps = [
  "Lead wpada na maila firmowego lub do skrzynki sprzedaż@.",
  "Asystent / manager / pierwszy chętny otwiera maila.",
  "Patrzy na arkusz „rozdzielnik leadów” w Google Sheets.",
  "Decyduje (lub zgaduje), kto dostanie tego leada.",
  "Pisze maila do handlowca albo wkleja dane na Slacku.",
  "Handlowiec ręcznie tworzy kontakt, firmę i deal w CRM.",
  "Manager raz w tygodniu sprawdza, czy nikt nie zapomniał o leadzie.",
];

const afterSteps = [
  "Lead trafia z formularza / reklamy / maila do warstwy automatyzacji.",
  "System sprawdza dane: region (kod pocztowy, województwo), źródło, produkt, wartość.",
  "Reguły routingu wybierają właściwego handlowca — round-robin, waga pipeline'u, dostępność, specjalizacja.",
  "Lead trafia do CRM jako osoba + firma + deal z przypisanym właścicielem i etapem.",
  "CRM tworzy zadanie „kontakt w 5 minut” i wysyła notyfikację (Slack, push, e-mail).",
  "Brak reakcji w X minut — lead wraca do puli lub eskaluje do drugiej osoby.",
  "Manager widzi w raporcie: kto dostał, kto odpowiedział, ile czasu zajęło.",
];

const workflowSteps = [
  {
    n: "1",
    title: "Wejście leada",
    desc: "Formularz www, kampania reklamowa, e-mail, integracja z marketplace — wszystko trafia do jednego procesu.",
    accent: false,
  },
  {
    n: "2",
    title: "Wzbogacenie i walidacja",
    desc: "System uzupełnia dane (region z kodu pocztowego, branża z NIP, źródło z UTM), waliduje kompletność i odrzuca duplikaty.",
    accent: false,
  },
  {
    n: "3",
    title: "Reguły routingu",
    desc: "Decyzja: region, produkt, język, wartość deala, specjalizacja handlowca, obciążenie pipeline'u, dostępność (urlop, status w kalendarzu).",
    accent: true,
  },
  {
    n: "4",
    title: "Tworzenie rekordu w CRM",
    desc: "Osoba + firma + deal w odpowiednim pipeline z przypisanym właścicielem. Etap, źródło, kampania, UTM-y — wszystko uzupełnione.",
    accent: false,
  },
  {
    n: "5",
    title: "Powiadomienie + zadanie",
    desc: "Handlowiec dostaje notyfikację (Slack / push / e-mail) z linkiem do deala. CRM tworzy zadanie „kontakt do X minut”.",
    accent: false,
  },
  {
    n: "6",
    title: "Eskalacja przy braku reakcji",
    desc: "Brak akcji w zdefiniowanym czasie — lead trafia do drugiej osoby albo wraca do wspólnej puli. Lead nie ginie.",
    accent: true,
  },
  {
    n: "7",
    title: "Raport routingu",
    desc: "Kto ile dostał, kto ile obsłużył, średni czas pierwszego kontaktu, konwersja per handlowiec, per region, per źródło.",
    accent: false,
  },
];

const antipatterns = [
  {
    title: "Round-robin bez wagi pipeline'u",
    desc: "Najprostsze rozwiązanie — każdy po kolei. Problem: handlowiec z 80 otwartymi dealami dostaje tyle samo co ten z 5. Efekt: kolejka na pierwszy kontakt rośnie u jednych, drudzy się nudzą.",
  },
  {
    title: "Routing po regionie bez dostępności",
    desc: "Lead z Gdańska zawsze trafia do Kowalskiego. Kowalski jest na urlopie 2 tygodnie. Leady leżą i czekają, bo nikt nie zaktualizował reguły.",
  },
  {
    title: "Reguły w głowie managera, nie w systemie",
    desc: "Manager ręcznie nadzoruje rozdział „bo zna swoich ludzi”. Działa, dopóki manager jest w pracy. Gdy odejdzie albo zachoruje — system się rozsypuje.",
  },
  {
    title: "Brak fallbacku przy nietypowym leadzie",
    desc: "Lead spoza zdefiniowanych regionów / produktów wpada w pustkę. Nikt go nie dostaje, bo żadna reguła nie pasuje. Zawsze potrzebny jest scenariusz „nie pasuje nigdzie — idzie do X”.",
  },
  {
    title: "Routing bez SLA na reakcję",
    desc: "Handlowiec dostaje leada, ale nie ma deadline'u. Bez SLA i eskalacji szybkie przypisanie nie daje szybkiej reakcji — co jest sednem problemu.",
  },
];

const faq = [
  {
    question: "Po jakich kryteriach najlepiej rozdzielać leady?",
    answer:
      "Klasyka: region (kod pocztowy / województwo), produkt lub linia biznesowa, źródło (organic vs reklama vs partner), wartość deala, język klienta. Do tego waga pipeline'u (kto ma mniej otwartych deali) i dostępność (urlop, status kalendarza). Najlepsze reguły to kombinacja 2–3 z tych kryteriów — nie jeden wymiar, ale też nie 12, bo wtedy nikt nie ogarnie, dlaczego lead trafił akurat tam.",
  },
  {
    question:
      "Czy round-robin wystarczy, czy potrzebne są bardziej złożone reguły?",
    answer:
      "Czysty round-robin działa tylko w bardzo równym zespole, gdzie każdy obsługuje to samo. W praktyce zawsze są specjalizacje (regiony, produkty, języki) i różne obciążenia pipeline'u. Lepsze rozwiązanie: round-robin w obrębie podgrupy (np. „handlowcy regionu Mazowsze”) z wagą pipeline'u — kto ma mniej, dostaje następnego.",
  },
  {
    question: "Jak obsłużyć urlopy i nieobecności bez ręcznego przepinania?",
    answer:
      "Dwa sposoby. Pierwszy: integracja z kalendarzem firmowym — jeśli handlowiec ma w Google Calendar event „urlop”, system pomija go w routingu. Drugi: status w CRM („out of office”) ustawiany ręcznie albo przez Slack-bota. Plus zawsze fallback: lead, który nie znalazł właściciela, idzie do managera lub wspólnej puli.",
  },
  {
    question:
      "Czy automatyczny routing działa w Pipedrive, HubSpot, Salesforce?",
    answer:
      "Tak. Wszystkie te CRM-y mają natywne mechanizmy przypisywania (Pipedrive — automation, HubSpot — Workflows + assignment rotation, Salesforce — Lead Assignment Rules). W bardziej złożonych przypadkach (kilka systemów, custom logika, wzbogacanie danych) lepiej dodać warstwę pośrednią — n8n, Make albo Zapier — która konsumuje leada przed CRM-em i decyduje, gdzie go wstawić.",
  },
  {
    question: "Co zrobić z leadami, które nie pasują do żadnej reguły?",
    answer:
      "Zawsze potrzebny jest scenariusz „catch-all”. Najczęściej: trafiają do managera sprzedaży lub do wspólnej puli, z której pierwsza dostępna osoba je odbiera. Dodatkowo warto raportować, ile leadów wpada w catch-all — jeśli to więcej niż 5–10%, znaczy że reguły są niekompletne i trzeba je rozszerzyć.",
  },
  {
    question: "Ile trwa wdrożenie automatycznego routingu?",
    answer:
      "Pierwsza działająca wersja — 2–5 dni roboczych, jeśli reguły są jasne i CRM jest standardowy. Bardziej złożone scenariusze (kilka źródeł, wzbogacanie danych, integracja z kalendarzami, eskalacje wielopoziomowe) to 1–3 tygodnie. Warto zacząć od najprostszej wersji i dopiero po 2–3 tygodniach pracy na żywych danych dokładać kolejne reguły.",
  },
];

export default function AutomatycznePrzypisywanieLeadow() {
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
        <Breadcrumbs items={[{ label: "Automatyczne przypisywanie leadów" }]} />

        {/* Hero — kompaktowy */}
        <section className="pt-24 pb-12 bg-gradient-to-b from-accent/10 to-transparent border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-label">Lead routing CRM</span>
              <h1 className="mt-4 text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Automatyczne przypisywanie leadów do handlowców według regionu,
                źródła lub produktu
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Lead wpada o 22:13. O 8:30 manager otwiera arkusz, decyduje
                ręcznie, kto go obsłuży, i pisze maila. Handlowiec odbiera
                wiadomość po obiedzie. Klient w międzyczasie wysłał zapytanie do
                konkurencji. Tak gubi się leady — nie z powodu złego CRM-a,
                tylko z powodu człowieka udającego integrację.
              </p>
              <div className="mt-8 flex justify-center">
                <TrackedCTA
                  href="#sekcje"
                  location="article_routing_hero"
                  label="Sprawdź routing leadów"
                  eventName="cta_click_article_audit"
                  className="btn-primary px-8 py-3.5 text-base"
                >
                  Sprawdź routing leadów
                </TrackedCTA>
              </div>
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
                Bezpłatna diagnoza w 24h · wstępna mapa pierwszego kroku ·
                szacowany ROI
              </p>
            </div>
          </div>
        </section>

        {/* Treść w zakładkach — nic nie wycięte, podzielone */}
        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje strony o routingu leadów"
            tabs={[
              {
                label: "Problem",
                content: (
                  <div className="py-10 lg:py-12">
                    {/* Problem biznesowy */}
                    <section className="">
                      <div className="">
                        <div className="max-w-3xl mx-auto">
                          <span className="section-label">
                            Problem biznesowy
                          </span>
                          <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            Większość firm traci leady, bo między formularzem a
                            CRM-em jest człowiek
                          </h2>
                          <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-4 mb-8">
                            <p>
                              Routing leadów to z pozoru drobnostka —
                              &bdquo;ktoś musi zdecydować, kto bierze tego
                              klienta&rdquo;. W rzeczywistości to jeden z
                              najbardziej kosztownych wąskich gardeł w sprzedaży
                              B2B. Każda minuta między momentem, w którym lead
                              zostawił numer, a momentem, w którym handlowiec do
                              niego dzwoni, działa na rzecz konkurencji.
                            </p>
                            <p>
                              Większość firm próbuje rozwiązać to ręcznie:
                              arkusz rozdzielnika, „pierwszy chętny bierze”,
                              manager, który rano rozdaje leady. Wszystkie te
                              metody mają jedną wspólną wadę — zależą od
                              człowieka, który czasem śpi, czasem jest na
                              spotkaniu, czasem na urlopie. Lead nie czeka.
                            </p>
                            <p>
                              Jeśli handlowiec przepisuje dane, to nie
                              sprzedaje. Tyle filozofii.
                            </p>
                          </div>
                          <ul className="space-y-3">
                            {problemPoints.map((point) => (
                              <li
                                key={point}
                                className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
                              >
                                <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                                <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                  {point}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>

                    {/* Objawy w firmie */}
                    <section className="mt-16 lg:mt-24 pt-16 lg:pt-24 border-t border-gray-100 dark:border-gray-800">
                      <div className="">
                        <div className="max-w-3xl mx-auto">
                          <span className="section-label">Objawy w firmie</span>
                          <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            Po czym poznać, że routing leadów jest zepsuty
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            Te zachowania wyglądają niewinnie. Każde z osobna
                            jest do zaakceptowania. Razem oznaczają, że proces
                            przypisywania leadów żyje w głowach ludzi, a nie w
                            systemie.
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
                                    d="M10 6v4m0 4h.01"
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
                    <section className="mt-16 lg:mt-24 pt-16 lg:pt-24 border-t border-gray-100 dark:border-gray-800">
                      <div className="">
                        <div className="max-w-3xl mx-auto">
                          <span className="section-label">Koszt problemu</span>
                          <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            Policzmy konkretnie, ile kosztuje ręczne
                            rozdzielanie leadów
                          </h2>
                          <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-4 mb-8">
                            <p>
                              Załóżmy firmę B2B z umiarkowanym wolumenem: 300
                              leadów miesięcznie, 4 handlowców, manager
                              rozdziela ręcznie.
                            </p>
                          </div>
                          <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 lg:p-8 mb-6 space-y-3 font-mono text-sm">
                            <p className="text-gray-700 dark:text-gray-300">
                              <span className="text-accent font-semibold">
                                Czas managera:
                              </span>{" "}
                              300 leadów × 3 min/lead = 900 min = 15 h/mies
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                              <span className="text-accent font-semibold">
                                Koszt managera:
                              </span>{" "}
                              15 h × 120 zł/h = <strong>1 800 zł/mies</strong>
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                              <span className="text-accent font-semibold">
                                Czas reakcji:
                              </span>{" "}
                              średnio 4 h od wpadnięcia leada do pierwszego
                              kontaktu
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                              <span className="text-accent font-semibold">
                                Konwersja:
                              </span>{" "}
                              modelowo: spadek z 5 min do 4 h oznacza znacząco
                              mniej realnych kontaktów (lead w międzyczasie
                              rozmawia z konkurencją). Konkretną wartość
                              referencyjną dobieram w diagnozie pod Twoją
                              branżę.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                              <span className="text-accent font-semibold">
                                Zgubione leady:
                              </span>{" "}
                              przy 300 leadach miesięcznie i konserwatywnie 5%
                              trafiających do czarnej dziury (urlopy,
                              niepasujące reguły, „nie wiedziałem, że to mój”) =
                              15 leadów/mies × średnia wartość deala = realna
                              strata w przychodzie
                            </p>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Te liczby nie są spektakularne dla pojedynczego
                            leada. Stają się spektakularne, gdy pomnożysz przez
                            12 miesięcy i dodasz koszt frustracji handlowców,
                            którzy zamiast sprzedawać, walczą o leady na Slacku.
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>
                ),
              },
              {
                label: "Proces",
                content: (
                  <div className="py-10 lg:py-12">
                    {/* Proces przed i po */}
                    <section className="">
                      <div className="">
                        <div className="max-w-5xl mx-auto">
                          <div className="text-center mb-12">
                            <span className="section-label">Przed i po</span>
                            <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                              Jak wygląda proces ręczny vs zautomatyzowany
                            </h2>
                          </div>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 lg:p-8">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Proces ręczny (łańcuch nadziei)
                              </h3>
                              <ol className="space-y-3 list-decimal list-inside text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                {beforeSteps.map((step) => (
                                  <li key={step}>{step}</li>
                                ))}
                              </ol>
                            </div>
                            <div className="bg-white dark:bg-gray-800/60 border border-accent/40 rounded-2xl p-6 lg:p-8 shadow-sm">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Proces zautomatyzowany
                              </h3>
                              <ol className="space-y-3 list-decimal list-inside text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                {afterSteps.map((step) => (
                                  <li key={step}>{step}</li>
                                ))}
                              </ol>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Diagram */}
                    <section className="mt-16 lg:mt-24 pt-16 lg:pt-24 border-t border-gray-100 dark:border-gray-800">
                      <div className="">
                        <div className="max-w-4xl mx-auto">
                          <div className="mb-10">
                            <span className="section-label">Diagram</span>
                            <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                              Krok po kroku: routing leada od formularza do
                              handlowca
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                              Każdy z tych kroków buduję osobno i mierzę osobno.
                              Możesz wdrożyć tylko 3 pierwsze i już dostać efekt
                              — reszta dochodzi iteracyjnie.
                            </p>
                          </div>
                          <ol className="relative space-y-3 lg:space-y-4">
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
                                {i < workflowSteps.length - 1 && (
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
                label: "Wdrożenie",
                content: (
                  <div className="py-10 lg:py-12">
                    {/* Co wdrożyć w 1. etapie */}
                    <section className="">
                      <div className="">
                        <div className="max-w-3xl mx-auto">
                          <span className="section-label">Pierwszy etap</span>
                          <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            Co wdrożyć najpierw, żeby już za tydzień zobaczyć
                            efekt
                          </h2>
                          <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-4 mb-6">
                            <p>
                              Nie próbuj zbudować pełnego routingu z 12 regułami
                              i eskalacjami w pierwszym tygodniu. Najszybszy
                              efekt daje najprostszy scenariusz:{" "}
                              <strong>
                                jedno źródło leadów + jedna reguła +
                                automatyczne tworzenie deala w CRM
                              </strong>
                              .
                            </p>
                            <p>Konkretnie:</p>
                          </div>
                          <ul className="space-y-3 mb-6">
                            <li className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4">
                              <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold">
                                1
                              </span>
                              <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                <strong>Wybierz jedno źródło</strong> —
                                najczęściej formularz z głównej strony albo
                                formularz z reklam Google. Resztę odłóż.
                              </span>
                            </li>
                            <li className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4">
                              <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold">
                                2
                              </span>
                              <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                <strong>Wybierz jedną regułę</strong> —
                                najprostsza to round-robin między 2–3
                                handlowcami. Region i produkt dodasz w drugim
                                etapie.
                              </span>
                            </li>
                            <li className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4">
                              <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold">
                                3
                              </span>
                              <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                <strong>Automatyczny rekord w CRM</strong> —
                                osoba + firma + deal z przypisanym właścicielem.
                                Zadanie „kontakt w 5 minut” + powiadomienie na
                                Slacku.
                              </span>
                            </li>
                            <li className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4">
                              <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold">
                                4
                              </span>
                              <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                <strong>Mierz przed/po</strong> — średni czas
                                pierwszego kontaktu, liczba leadów, które
                                trafiły do złego handlowca, czas managera
                                spędzony na rozdzielaniu.
                              </span>
                            </li>
                          </ul>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Tyle. Pierwszy etap robię u klientów w 2–4 dni. Po
                            dwóch tygodniach pracy na żywych danych dokładamy
                            kolejne źródła i reguły — ale dopiero wtedy, gdy
                            wiemy, co realnie działa.
                          </p>
                        </div>
                      </div>
                    </section>

                    {/* Typowe błędy */}
                    <section className="mt-16 lg:mt-24 pt-16 lg:pt-24 border-t border-gray-100 dark:border-gray-800">
                      <div className="">
                        <div className="max-w-3xl mx-auto">
                          <span className="section-label">Antywzorce</span>
                          <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            Typowe błędy przy automatycznym przypisywaniu leadów
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            Te błędy widzę u 80% firm, które próbowały zrobić
                            routing samodzielnie. Każdy z nich da się obejść —
                            ale lepiej wiedzieć wcześniej.
                          </p>
                          <div className="space-y-4">
                            {antipatterns.map((a) => (
                              <div
                                key={a.title}
                                className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6"
                              >
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                  {a.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                  {a.desc}
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
                label: "Cennik i FAQ",
                content: (
                  <div className="py-10 lg:py-12">
                    {/* Cennik */}
                    <section className="">
                      <div className="">
                        <div className="max-w-4xl mx-auto">
                          <div className="text-center mb-10">
                            <span className="section-label">Cennik</span>
                            <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                              Ile kosztuje wdrożenie routingu leadów
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                              Stała cena za projekt po krótkim audycie. Widełki
                              poniżej — konkretną wycenę dostajesz po
                              30-minutowej rozmowie.
                            </p>
                          </div>
                          <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 lg:p-8">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Routing podstawowy
                              </h3>
                              <p className="text-3xl font-bold text-accent mb-3">
                                3 000–6 000 zł
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                Jedno źródło leadów, 1–2 reguły (region lub
                                round-robin), automatyczny rekord w CRM,
                                powiadomienie i zadanie. Wdrożenie 2–4 dni.
                              </p>
                            </div>
                            <div className="bg-white dark:bg-gray-800/60 border border-accent/40 rounded-2xl p-6 lg:p-8 shadow-sm">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Routing zaawansowany
                              </h3>
                              <p className="text-3xl font-bold text-accent mb-3">
                                8 000–18 000 zł
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                Kilka źródeł, wzbogacanie danych, reguły
                                wielowymiarowe (region + produkt + waga
                                pipeline'u + dostępność), eskalacje, raport
                                routingu. Wdrożenie 2–4 tygodnie.
                              </p>
                            </div>
                          </div>
                          <div className="text-center">
                            <Link
                              href="/automatyzacja-leadow-crm"
                              className="btn-secondary"
                            >
                              Zobacz pełną ofertę automatyzacji leadów
                            </Link>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* FAQ */}
                    <section className="mt-16 lg:mt-24 pt-16 lg:pt-24 border-t border-gray-100 dark:border-gray-800">
                      <div className="">
                        <div className="max-w-3xl mx-auto">
                          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                            Najczęstsze pytania o routing leadów
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
                          <div className="mt-10 text-sm text-gray-600 dark:text-gray-400 leading-relaxed bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                            <p className="mb-2">Powiązane materiały:</p>
                            <ul className="space-y-1.5">
                              <li>
                                <Link
                                  href="/czas-reakcji-na-leada"
                                  className="text-accent hover:underline"
                                >
                                  Jak skrócić czas reakcji na leada do kilku
                                  minut
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
                                  href="/automatyzacja-crm"
                                  className="text-accent hover:underline"
                                >
                                  Automatyzacja CRM — przegląd
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/kalkulator-leadow"
                                  className="text-accent hover:underline"
                                >
                                  Kalkulator kosztu zgubionych leadów
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Final CTA */}
                    <section className="mt-16 lg:mt-24 pt-16 lg:pt-24 border-t border-gray-100 dark:border-gray-800">
                      <div className="">
                        <div className="max-w-2xl mx-auto text-center">
                          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Chcesz, żeby leady same trafiały do właściwego
                            handlowca?
                          </h2>
                          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            30-minutowa diagnoza, wstępna mapa pierwszego kroku
                            i szacowany ROI. Bez zobowiązań. Po rozmowie wiesz,
                            czy w twoim przypadku to ma sens — i ile by
                            kosztowało.
                          </p>
                          <TrackedCTA
                            href="/#kontakt"
                            location="article_routing_final"
                            label="Sprawdź routing leadów"
                            eventName="cta_click_article_audit"
                            className="btn-primary px-8 py-3.5 text-base"
                          >
                            Sprawdź routing leadów
                          </TrackedCTA>
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
