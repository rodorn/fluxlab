import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "n8n dla CRM | Automatyzacja leadów, zadań i raportów",
  description:
    "Jak n8n staje się warstwą automatyzacji nad Pipedrive, HubSpotem czy Salesforce: routing leadów, sync z systemami zewnętrznymi, raporty, follow-upy. Self-hosted vs cloud i co wdrożyć w pierwszym etapie.",
  openGraph: {
    title: "n8n dla CRM | Automatyzacja leadów, zadań i raportów",
    description:
      "Jak n8n staje się warstwą automatyzacji nad Pipedrive, HubSpotem czy Salesforce: routing leadów, sync z systemami zewnętrznymi, raporty, follow-upy. Self-hosted vs cloud i co wdrożyć w pierwszym etapie.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab — n8n dla CRM",
      },
    ],
  },
  alternates: {
    canonical: "/n8n-dla-crm",
  },
};

const symptoms = [
  "Handlowiec ręcznie kopiuje dane z formularza WWW do CRM, bo natywna integracja gubi UTM-y i custom fieldy",
  "Lead z reklamy idzie do skrzynki marketingu, marketing przekazuje go w piątek na zbiorczo, kontakt wychodzi w poniedziałek",
  "CRM nie umie po swojej stronie zrobić wzbogacania (NIP → GUS, domena → branża), więc baza jest brudna i niewyszukiwalna",
  "Każda zmiana etapu deala wymaga osobnej akcji w innym systemie — księgowość, fakturowanie, slack, magazyn — i część osób tego nie robi",
  "Raport tygodniowy klei się ręcznie z eksportów CSV w piątek po południu",
  "Wbudowane workflow w CRM mają limity (kroki, liczba uruchomień, brak warunków, brak HTTP request), na które trafiasz po 3 miesiącach",
];

const beforeSteps = [
  "Lead wpada formularzem do skrzynki marketingu",
  "Ktoś raz dziennie przekleja dane do CRM",
  "Brak wzbogacenia (firma, branża, scoring) — handlowiec dzwoni „w ciemno”",
  "Po rozmowie ręcznie aktualizuje deal i dodaje aktywność",
  "Fakturowanie i księgowość dostają informację mailem na koniec tygodnia",
  "Raport sprzedaży klei się w Excelu z 3 eksportów",
];

const afterSteps = [
  "Webhook z formularza odpala workflow w n8n natychmiast po wysłaniu",
  "n8n wzbogaca lead (GUS po NIP, scoring, dedup, walidacja maila)",
  "Tworzy osobę + organizację + deal w CRM z pełnymi polami",
  "Routing do handlowca po regionie/produkcie/obciążeniu pipeline'u",
  "Zadanie „kontakt w 5 minut” + powiadomienie Slack/SMS",
  "Po zmianie etapu n8n synchronizuje fakturowanie, księgowość, slack",
  "Raport tygodniowy generowany automatycznie i wysyłany w poniedziałek 7:00",
];

const workflows = [
  {
    n: "1",
    title: "Routing leadów do handlowca",
    desc: "Webhook z formularza → walidacja → wzbogacenie po NIP/GUS → dedup w CRM → przypisanie po regionie/produkcie/obciążeniu pipeline'u → utworzenie deala i pierwszego zadania → notyfikacja w Slacku. Czas reakcji spada z godzin do sekund.",
    accent: true,
  },
  {
    n: "2",
    title: "Sync CRM ↔ system zewnętrzny",
    desc: "Pipedrive ↔ Comarch Optima, HubSpot ↔ Subiekt, Salesforce ↔ własna baza Postgres. n8n trzyma dwustronną synchronizację statusów umów, faktur i płatności. Każdy zapisuje tam, gdzie mu wygodnie, dane są spójne.",
    accent: false,
  },
  {
    n: "3",
    title: "Raport sprzedaży i marketingu",
    desc: "Cron raz dziennie/tygodniowo → pobiera dane z CRM, GA4 i Meta Ads → liczy KPI (czas reakcji, konwersja po źródle, koszt leada, koszt klienta) → buduje PDF + dashboard Metabase → wysyła do zarządu mailem. Bez piątkowego sklejania.",
    accent: true,
  },
  {
    n: "4",
    title: "Follow-up i ratowanie martwych dealów",
    desc: "Workflow nasłuchuje na deale bez aktywności X dni → po 3 dniach przypomnienie do handlowca, po 7 eskalacja do menedżera, po 14 automatyczny mail do klienta („Czy temat dalej aktualny?”). Część dealów wraca do życia bez udziału człowieka.",
    accent: false,
  },
  {
    n: "5",
    title: "Onboarding nowego klienta",
    desc: "Wygrany deal → n8n zakłada konto klienta w aplikacji, wysyła umowę przez Autenti, tworzy folder w Drive, dodaje task dla obsługi, wystawia fakturę zaliczkową. Handlowiec wraca do sprzedawania zamiast klikania w 6 narzędziach.",
    accent: false,
  },
];

const diagramSteps = [
  {
    n: "1",
    title: "Webhook z formularza",
    desc: "n8n nasłuchuje na endpoint, do którego wysyłają wszystkie źródła leadów (formularz, lead ads, e-mail).",
    accent: false,
  },
  {
    n: "2",
    title: "Walidacja + wzbogacenie",
    desc: "Code node sprawdza NIP w GUS, domenę w Clearbit/własnym scoringu, dedup w CRM.",
    accent: true,
  },
  {
    n: "3",
    title: "Tworzenie w CRM (Pipedrive/HubSpot/Salesforce)",
    desc: "Osoba + organizacja + deal w jednym kroku, z pełnymi custom fieldami i UTM-ami.",
    accent: true,
  },
  {
    n: "4",
    title: "Routing do handlowca",
    desc: "Region, produkt, obciążenie pipeline'u — n8n wybiera odbiorcę po regule biznesowej.",
    accent: false,
  },
  {
    n: "5",
    title: "Zadanie + powiadomienie",
    desc: "Task „kontakt w 5 minut” w CRM + push do Slacka/SMS-a do przypisanego handlowca.",
    accent: false,
  },
  {
    n: "6",
    title: "Sync ze światem zewnętrznym",
    desc: "Po zmianie etapu deala — fakturowanie, księgowość, magazyn, slack: wszystko przez n8n.",
    accent: true,
  },
  {
    n: "7",
    title: "Raport",
    desc: "Cron buduje codzienny/tygodniowy raport KPI i wysyła go zarządowi mailem albo do Slacka.",
    accent: false,
  },
];

const firstStage = [
  "Mapping źródeł leadów do jednego wejścia n8n (formularze, reklamy, lead ads, e-mail)",
  "Walidacja + wzbogacenie (GUS, biała lista VAT, scoring) i deduplikacja w CRM",
  "Tworzenie osoby + organizacji + deala w CRM z pełnymi custom fieldami",
  "Routing do handlowca + zadanie „kontakt w X minut” + powiadomienie",
  "Prosty raport: liczba leadów, czas reakcji, źródło — wysyłany codziennie rano",
];

const mistakes = [
  "Wdrażanie n8n „bo modne”, bez zmapowanego procesu — wtedy chaos zostaje, tylko szybszy",
  "Self-hosting bez osoby od Linuksa — brak backupów, brak monitoringu, pierwszy reboot kończy zabawę",
  "Brak dedupu w workflow — co tydzień ten sam lead leci do CRM 3 razy, baza zaczyna kłamać",
  "Logika biznesowa schowana w 30 IF-ach w jednym workflow zamiast w sub-workflow — po 6 miesiącach nikt tego nie ogarnia",
  "Brak loggingu i alertów — workflow pada cicho w nocy, nikt nie wie, że leady nie wpadają od dwóch dni",
];

const faq = [
  {
    question: "Czym n8n różni się od wbudowanych automatyzacji w CRM?",
    answer:
      "Wbudowane automatyzacje (Pipedrive Workflows, HubSpot Workflows, Salesforce Flow) są dobre do prostej logiki w obrębie jednego CRM. n8n wchodzi tam, gdzie te kończą — gdy potrzebujesz HTTP request do dowolnego API, transformacji danych, code node z JavaScriptem, dwustronnej synchronizacji z systemem zewnętrznym albo logiki, której CRM nie umie wyrazić swoimi blokami. n8n nie zastępuje natywnych workflow, tylko stoi nad nimi.",
  },
  {
    question: "n8n self-hosted czy n8n.cloud do CRM?",
    answer:
      "Cloud, jeśli wolumen jest mały (poniżej 5–10 tys. wykonań miesięcznie), nie macie osoby od infrastruktury i nie macie wymagań compliance, które wymuszają trzymanie danych u was. Self-hosted, gdy wolumen rośnie powyżej 30 tys. wykonań (tam koszt cloud zaczyna boleć), gdy macie własne API/bazy, do których chcecie się podpiąć po sieci wewnętrznej, albo gdy dane wrażliwe nie mogą wyjść poza infrastrukturę firmy. Najczęstsza ścieżka u klientów: start na cloud, migracja na self-hosted po 6–12 miesiącach, gdy wiadomo, czy projekt się przyjął.",
  },
  {
    question: "Czy n8n pasuje do Pipedrive, HubSpota i Salesforce?",
    answer:
      "Do wszystkich trzech. Pipedrive ma natywny moduł w n8n + dobre webhooki + proste API — najprostsza ścieżka. HubSpot ma natywny moduł, ale w darmowym planie część endpointów jest zablokowana. Salesforce wymaga Connected App i konta z dostępem do API (zwykle Enterprise lub wyżej), ale potem działa bez ograniczeń. Pierwsze pytanie nie brzmi „czy n8n umie się wpiąć”, tylko „co dokładnie chcesz z tym zrobić”.",
  },
  {
    question: "Ile kosztuje wdrożenie n8n dla CRM?",
    answer:
      "Pierwszy etap (routing leadów + sync + prosty raport) to typowo 4–8 tys. zł netto, robione w 2–3 tygodnie. Pełna warstwa automatyzacji nad CRM (sync z księgowością, raporty managerskie, follow-up, onboarding klienta) to 12–25 tys. zł netto, etapami przez 4–8 tygodni. Stała cena, kamienie milowe, płatność po odbiorze etapu.",
  },
  {
    question: "Co z RODO, gdy lead leci przez n8n?",
    answer:
      "n8n self-hosted na waszym serwerze (Hetzner Niemcy, OVH Polska, własne kolokacja) trzyma dane na waszej infrastrukturze — żaden zewnętrzny dostawca poza tymi, do których jawnie wysyłacie zapytania (CRM, GUS, biała lista). n8n.cloud ma serwery w Niemczech (UE), DPA i SOC 2. Dla większości firm B2B to wystarczy. Dla branż regulowanych (finanse, zdrowie) zwykle rekomenduję self-hosted.",
  },
  {
    question: "Czy mogę utrzymać workflow sam po wdrożeniu?",
    answer:
      "Tak, jeśli masz kogoś, kto rozumie podstawy programowania (zmienne, IF-y, JSON) — n8n nie wymaga umiejętności full-stack. Każde wdrożenie kończę dokumentacją workflow, instrukcją uruchomienia i 30 dniami darmowych poprawek. Po tym standardowo zostaję na retainerze (1–3 godz./mies.) na drobne zmiany, ale nie jest to obowiązkowe — projekt zostaje twój.",
  },
];

export default function N8nDlaCrm() {
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
      <main>
        <Breadcrumbs items={[{ label: "n8n dla CRM" }]} />

        {/* Hero — kompaktowy */}
        <section className="pt-24 pb-12 bg-gradient-to-b from-accent/10 to-transparent border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-label mb-4">n8n dla CRM</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                n8n jako warstwa automatyzacji dla CRM
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                Wbudowane automatyzacje w Pipedrive, HubSpocie czy Salesforce
                kończą się tam, gdzie zaczynają się prawdziwe potrzeby — HTTP
                request do dowolnego API, dwustronny sync z systemem
                zewnętrznym, transformacja danych, własna logika. n8n wchodzi w
                tę dziurę: jest silnikiem, który możesz odpalić u siebie i pchać
                do końca.
              </p>
              <TrackedCTA
                href="#sekcje"
                location="article_n8n-dla-crm_hero"
                label="Sprawdź, czy n8n ma sens u mnie"
                eventName="cta_click_article_audit"
                className="btn-primary"
              >
                Sprawdź, czy n8n ma sens u mnie
              </TrackedCTA>
            </div>
          </div>
        </section>

        {/* Treść w zakładkach — nic nie wycięte, podzielone */}
        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje artykułu o n8n dla CRM"
            tabs={[
              {
                label: "Problem biznesowy",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Problem biznesowy</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                        CRM przestaje wyrabiać tam, gdzie kończy się jego
                        natywna automatyzacja
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        Pierwsze pytanie nie brzmi: „jakiego narzędzia użyć?”.
                        Pierwsze pytanie brzmi: „który proces powtarza się
                        często i kosztuje nas czas albo sprzedaż?”. W praktyce
                        odpowiedź u 80% firm B2B wygląda tak samo: lead wpada,
                        ktoś go ręcznie wpisuje, ktoś inny ręcznie aktualizuje
                        status, raport klei się w Excelu na koniec tygodnia.
                        Wbudowane automatyzacje CRM łatają część problemu, ale
                        po kilku miesiącach trafia się na ścianę: brak HTTP
                        request, brak code node, brak warunków zagnieżdżonych,
                        limit kroków na workflow. n8n jest tym, co zaczyna się
                        tam, gdzie kończy się natywne workflow.
                      </p>
                      <ul className="space-y-3">
                        {[
                          "Lead z formularza nie trafia do CRM, tylko do skrzynki marketingu",
                          "Custom fieldy i UTM-y giną w drodze przez natywne integracje",
                          "Brak wzbogacenia (NIP→GUS, domena→branża, scoring) po stronie CRM",
                          "Status w CRM ≠ status w księgowości ≠ status w fakturowaniu",
                          "Raport sprzedaży powstaje ręcznie z 3 eksportów CSV",
                          "Workflow Pipedrive/HubSpot przekracza limity logiczne lub liczbowe",
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
                ),
              },
              {
                label: "Objawy",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Objawy</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                        Po czym poznasz, że CRM dojechał do swojego sufitu
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        Nie chodzi o „zły CRM” — chodzi o to, że pojedynczy CRM
                        nie umie obsłużyć całego procesu sprzedaży i obsługi
                        klienta. Konkretne zachowania, które pojawiają się u 9
                        na 10 firm B2B przed wdrożeniem n8n:
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
                ),
              },
              {
                label: "Koszt problemu",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Koszt problemu</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                        Ile to realnie kosztuje firmę
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        Konkretny rachunek z firmy, którą obsługiwałem niedawno:
                        4 handlowców, 600 leadów miesięcznie, średni czas
                        reakcji 3 godziny w godzinach pracy. Każdy lead to ok. 3
                        minuty ręcznego wprowadzania do CRM (kopiuj-wklej z
                        maila, dodanie organizacji, ustawienie etapu) plus ok. 5
                        minut na sprawdzenie firmy ręcznie w GUS i Google.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            Ręczne wprowadzanie leadów
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            600 × 8 min = 80 h/mies.
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Połowa etatu wyrzucona na klepanie
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            Stracone leady przez czas reakcji
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            ~12% konwersji w dół
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Reakcja powyżej godziny vs poniżej 5 min
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            Klejenie raportu tygodniowego
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            4 h × 4 tyg. = 16 h/mies.
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Czas managera, najdroższa godzina w firmie
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            Łączny koszt miesięczny
                          </p>
                          <p className="text-2xl font-bold text-accent">
                            ~12–18 tys. zł
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Praca + utracone deale (konserwatywnie)
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Wdrożenie n8n na warstwie CRM (pierwszy etap) to typowo
                        4–8 tys. zł netto i 2–3 tygodnie pracy. ROI w pierwszym
                        miesiącu po uruchomieniu, jeśli zespół ma więcej niż 2
                        handlowców i więcej niż 200 leadów miesięcznie.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                label: "Proces przed",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Przed wdrożeniem</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-8">
                        Jak to wygląda dziś, ręcznie
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
                ),
              },
              {
                label: "Proces po",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Po wdrożeniu</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-8">
                        Jak to wygląda po wpięciu n8n
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
                ),
              },
              {
                label: "Diagram",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto mb-10">
                      <span className="section-label">Diagram</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-4">
                        Anatomia workflow „lead → CRM → handlowiec → raport”
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Każdy krok można zbudować osobno i mierzyć efekt po
                        kolei. Akcentowane kafelki to miejsca, w których natywne
                        workflow CRM najczęściej się wykładają.
                      </p>
                    </div>
                    <ol className="relative max-w-3xl mx-auto space-y-3 lg:space-y-4">
                      {diagramSteps.map((s, i, arr) => (
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
                ),
              },
              {
                label: "Decyzja techniczna",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Decyzja techniczna</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                        Self-hosted czy n8n.cloud — co wybrać do CRM
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        Krótka odpowiedź: zacznij od cloud, jeśli nie masz osoby
                        od infrastruktury. Migracja na self-hosted jest prosta,
                        gdy już wiesz, jakie workflow naprawdę u was działają.
                        Dłuższa odpowiedź — kryteria po kolei:
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Wybierz n8n.cloud, gdy:
                          </h3>
                          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li>• Wolumen do 5–10 tys. wykonań miesięcznie</li>
                            <li>
                              • Brak osoby technicznej w firmie / na retainerze
                            </li>
                            <li>• Chcecie ruszyć w tym tygodniu</li>
                            <li>• UE i DPA wystarczają wam do RODO</li>
                            <li>
                              • Brak własnych systemów wewnętrznych do spinania
                            </li>
                          </ul>
                        </div>
                        <div className="bg-white dark:bg-gray-800/60 border border-accent/30 rounded-2xl p-6">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Wybierz self-hosted, gdy:
                          </h3>
                          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li>
                              • Wolumen powyżej 30 tys. wykonań miesięcznie
                            </li>
                            <li>• Macie własne API/bazy w sieci wewnętrznej</li>
                            <li>
                              • Branża regulowana (finanse, zdrowie, sektor
                              publiczny)
                            </li>
                            <li>
                              • Chcecie pisać własne moduły / mocno custom
                              logikę
                            </li>
                            <li>
                              • Macie kogoś, kto rozumie Linuksa i Dockera
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-6">
                        Realne koszty: n8n.cloud Pro ok. 60 EUR/mies. za 10 tys.
                        wykonań. Self-hosted — Hetzner CX22 za ok. 25 zł/mies.
                        plus koszt utrzymania (200–500 zł/mies., jeśli
                        outsourcujecie). Pełne porównanie z innymi narzędziami
                        zostawiłem w{" "}
                        <Link
                          href="/strefa-wiedzy/make-vs-n8n"
                          className="text-accent hover:underline"
                        >
                          Make vs n8n
                        </Link>{" "}
                        i{" "}
                        <Link
                          href="/strefa-wiedzy/n8n-vs-zapier"
                          className="text-accent hover:underline"
                        >
                          n8n vs Zapier
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                label: "5 typowych workflow",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">5 typowych workflow</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                        Co buduje się w n8n nad CRM-em najczęściej
                      </h2>
                      <div className="space-y-4">
                        {workflows.map((w) => (
                          <div
                            key={w.n}
                            className={`flex gap-5 items-start bg-white dark:bg-gray-800/60 border rounded-2xl p-6 ${
                              w.accent
                                ? "border-accent/30 shadow-sm"
                                : "border-gray-100 dark:border-gray-700"
                            }`}
                          >
                            <span
                              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                                w.accent
                                  ? "bg-accent text-white"
                                  : "bg-accent-light dark:bg-accent-dark-light text-accent"
                              }`}
                            >
                              {w.n}
                            </span>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {w.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                {w.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Pierwszy etap",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Pierwszy etap</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                        Co wdrażam u klienta w pierwszych 2–3 tygodniach
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        Nie zaczynam od pełnej warstwy automatyzacji. Zaczynam
                        od pętli, którą da się zmierzyć w 2 tygodnie i pokazać
                        klientowi liczbę godzin oszczędności w miesiącu. Reszta
                        dochodzi etapami, gdy fundament działa.
                      </p>
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
                ),
              },
              {
                label: "Antywzorce",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Antywzorce</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                        Typowe błędy przy wdrażaniu n8n nad CRM
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
                ),
              },
              {
                label: "Cennik",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Cennik</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-4">
                        Ile to kosztuje
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                        Stała cena projektowa, kamienie milowe, płatność po
                        odbiorze etapu. Wycenę dostajesz po godzinnej rozmowie i
                        przejrzeniu obecnego stacku. Pełen cennik usług
                        automatyzacji CRM jest rozpisany osobno.
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
                            Routing leadów + walidacja + tworzenie w CRM +
                            prosty raport. 2–3 tygodnie pracy.
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
                            Routing + sync z zewnętrznymi systemami + raporty +
                            follow-up + onboarding. 4–8 tygodni etapami.
                          </p>
                        </div>
                      </div>
                      <Link
                        href="/automatyzacja-leadow-crm"
                        className="btn-secondary"
                      >
                        Zobacz pełny cennik automatyzacji CRM
                      </Link>
                    </div>
                  </div>
                ),
              },
              {
                label: "FAQ",
                content: (
                  <div className="py-10 lg:py-12">
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
                ),
              },
              {
                label: "Powiązane",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Powiązane
                      </h2>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                            Usługi
                          </h3>
                          <ul className="space-y-2 text-sm">
                            <li>
                              <Link
                                href="/n8n"
                                className="text-accent hover:underline"
                              >
                                n8n — wdrożenia
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
                          </ul>
                        </div>
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
                                Make vs n8n — porównanie dla MŚP
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
                                href="/make-vs-n8n-crm"
                                className="text-accent hover:underline"
                              >
                                Make vs n8n dla CRM — decyzja
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
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
                        Sprawdźmy, gdzie u was n8n ma sens
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                        30 minut na rozmowę o procesie. Wyjdziesz z konkretną
                        listą miejsc, gdzie automatyzacja zwraca się w pierwszym
                        miesiącu — albo z uczciwą informacją, że na tym etapie
                        n8n nie ma sensu.
                      </p>
                      <TrackedCTA
                        href="/#kontakt"
                        location="article_n8n-dla-crm_final"
                        label="Sprawdź, czy n8n ma sens u mnie"
                        eventName="cta_click_article_audit"
                        className="btn-primary"
                      >
                        Sprawdź, czy n8n ma sens u mnie
                      </TrackedCTA>
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
    </>
  );
}
