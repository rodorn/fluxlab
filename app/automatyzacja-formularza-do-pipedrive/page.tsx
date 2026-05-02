import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";

export const metadata: Metadata = {
  title: "Integracja formularza z Pipedrive | Automatyczne leady w CRM",
  description:
    "Jak połączyć formularz na stronie z Pipedrive bez ręcznego przepisywania leadów. Automatyczne tworzenie osoby, firmy i deala, routing do handlowca, zadanie kontaktu w 5 minut.",
  openGraph: {
    title: "Integracja formularza z Pipedrive | Automatyczne leady w CRM",
    description:
      "Jak połączyć formularz na stronie z Pipedrive bez ręcznego przepisywania leadów. Automatyczne tworzenie osoby, firmy i deala, routing do handlowca, zadanie kontaktu w 5 minut.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab — Integracja formularza z Pipedrive",
      },
    ],
  },
  alternates: {
    canonical: "/automatyzacja-formularza-do-pipedrive",
  },
};

const symptoms = [
  "Lead z formularza wpada na maila firmowego, a potem ktoś ręcznie przepisuje go do CRM-a (jeśli pamięta).",
  "W Pipedrive są duplikaty tej samej osoby z trzech różnych kampanii — bo każdy handlowiec wpisuje na własny sposób.",
  "Pierwszy kontakt z leadem zajmuje 4 godziny zamiast 5 minut — bo wiadomość czeka w skrzynce na ogarniętą osobę.",
  "Marketing chwali się 200 leadami w miesiącu, sprzedaż widzi w CRM 130 — i nikt nie wie, gdzie zgubiło się 70.",
  "Handlowcy żonglują kartką, e-mailem i Pipedrive'em, bo każde źródło zapytań trafia gdzie indziej.",
  "Raporty „skąd przyszedł lead” robi się ręcznie, bo źródło i tak nie zapisuje się automatycznie w deal'u.",
];

const beforeSteps = [
  "Klient wypełnia formularz na stronie.",
  "Formularz wysyła maila na info@firma.pl.",
  "Mail leży w skrzynce, ktoś go w końcu otwiera.",
  "Ta osoba przepisuje dane do Pipedrive — imię, firmę, telefon, źródło (jeśli pamięta).",
  "Zakłada osobę, organizację, deal — albo zapomina o jednym z tych trzech.",
  "Wysyła wiadomość na Slacku do handlowca z regionu klienta.",
  "Handlowiec widzi Slacka po lunchu i dzwoni — 4 godziny po zgłoszeniu.",
  "Lead w międzyczasie napisał do konkurencji, która zadzwoniła w 8 minut.",
];

const afterSteps = [
  {
    n: "1",
    title: "Formularz wysyła payload do API",
    desc: "Zamiast maila — natychmiastowy webhook z czystym JSON-em (imię, firma, telefon, NIP, źródło, kampania, UTM-y).",
    accent: false,
  },
  {
    n: "2",
    title: "Walidacja i wzbogacenie danych",
    desc: "System sprawdza poprawność e-maila i telefonu, dociąga dane firmy po NIP, normalizuje nazwę firmy. Śmieciowe leady (test test, asdf@asdf.pl) trafiają do osobnego kosza, nie do CRM.",
    accent: false,
  },
  {
    n: "3",
    title: "Pipedrive: osoba + organizacja + deal",
    desc: "Jeden request do API tworzy trzy obiekty z poprawnymi powiązaniami. Custom fields (źródło, kampania, UTM, stanowisko) lecą od razu — nie trzeba ich uzupełniać ręcznie.",
    accent: true,
  },
  {
    n: "4",
    title: "Deduplikacja",
    desc: "Jeśli osoba o tym e-mailu lub firma o tym NIP już istnieją — system łączy nowy deal z istniejącym kontaktem zamiast plodzić duplikaty.",
    accent: false,
  },
  {
    n: "5",
    title: "Routing do handlowca",
    desc: "Reguły: region, produkt, źródło, obciążenie pipeline'u. Handlowiec dostaje przypisany deal automatycznie — bez Slacka „kto bierze tego leada”.",
    accent: false,
  },
  {
    n: "6",
    title: "Zadanie + powiadomienie",
    desc: "Pipedrive tworzy aktywność „kontakt w 5 minut”. Handlowiec dostaje notyfikację — push, Slack, mail. SLA reakcji jest mierzalne.",
    accent: false,
  },
  {
    n: "7",
    title: "Follow-up i eskalacja",
    desc: "Brak kontaktu w ustalonym czasie uruchamia przypomnienie, a po kolejnym przekroczeniu — eskalację do innego handlowca lub managera. Lead nie ginie w pipeline.",
    accent: false,
  },
  {
    n: "8",
    title: "Raport źródeł i konwersji",
    desc: "Każdy deal ma źródło, kampanię i UTM-y zapisane w polach. Raport „skąd przyszedł zamknięty deal” robi się sam — bez klejenia w Excelu.",
    accent: true,
  },
];

const firstStage = [
  "Webhook z formularza → Pipedrive (osoba + organizacja + deal w jednym requeście).",
  "Walidacja kompletności i deduplikacja po e-mailu i NIP.",
  "Mapowanie źródła i UTM-ów na custom fields w deal'u.",
  "Automatyczne zadanie „kontakt w 5 minut” przypisane do handlowca.",
];

const mistakes = [
  {
    title: "Zapier jako jedyna warstwa logiki",
    desc: "Zapier jest świetny do prostych przepływów. Ale gdy w grze jest deduplikacja, walidacja po NIP, routing według reguł i eskalacja — kosztuje więcej niż dedykowane API i staje się czarną skrzynką, której nikt nie chce dotykać.",
  },
  {
    title: "Mailowanie zamiast webhooka",
    desc: "Wysyłanie leada na info@firma.pl i parsowanie maili to relikt. Wystarczy jedna zmiana szablonu wiadomości i parser się sypie. Webhook = JSON = stabilność.",
  },
  {
    title: "Tworzenie tylko deala bez osoby i organizacji",
    desc: "Deal bez powiązanej osoby i firmy to ślepy zaułek w raportach. Pipedrive nie zaprojektowano tak, żeby działać na samych dealach — i widać to przy każdej próbie zrobienia z tego raportu.",
  },
  {
    title: "Ręczne uzupełnianie źródła",
    desc: "Jeśli handlowiec ma sam wpisać „skąd przyszedł lead”, to w 40% przypadków pole będzie puste albo będzie tam „inne”. Źródło, kampanię i UTM-y trzeba zapisywać automatycznie, w momencie wpadnięcia leada.",
  },
  {
    title: "Brak monitoringu integracji",
    desc: "Integracja działa do momentu, kiedy nie działa. Bez powiadomień o błędach API (timeout, 5xx, błędna struktura) gubisz leady cicho. Każda integracja powinna mieć alert do Slacka albo maila.",
  },
];

const faq = [
  {
    question: "Czy potrzebuję Zapiera albo Make do tej integracji?",
    answer:
      "Nie — Pipedrive ma pełne REST API i webhooki, więc formularz może rozmawiać z CRM-em bezpośrednio. Zapier/Make ma sens, gdy klejesz wiele systemów i nie chcesz pisać kodu, ale przy samym formularzu to dodatkowy koszt miesięczny i kolejna warstwa, która może się zepsuć. W większości projektów stawiam dedykowany endpoint w n8n albo lekki backend i to wystarcza.",
  },
  {
    question: "Co z RODO i zgodami?",
    answer:
      "Zgody marketingowe i komunikacyjne lecą do Pipedrive jako custom fields (data zgody, treść, IP, źródło). Dzięki temu masz pełen audyt, kiedy i na co klient się zgodził. Sam formularz powinien zapisywać też kopię checkboxów do osobnego loga — to nie jest praca na 5 minut, ale robi się raz i działa.",
  },
  {
    question:
      "Czy formularz HubSpot, WPForms, Webflow albo własny w Next.js się nada?",
    answer:
      "Każdy formularz, który potrafi wysłać dane HTTP-em, się nada. Idealnie własny endpoint po stronie strony (np. Next.js API route lub serverless), który robi walidację, a potem woła Pipedrive API. Wtyczki typu „prześlij do Pipedrive jednym klikiem” zwykle nie radzą sobie z deduplikacją, custom fields i routing'iem — robią najprostszy POST i tyle.",
  },
  {
    question: "Jak długo trwa wdrożenie?",
    answer:
      "Najmniejszy działający kawałek (formularz → osoba + organizacja + deal + zadanie) zwykle 2–4 dni roboczych. Pełna integracja z deduplikacją, routingiem, eskalacją i raportowaniem źródeł — 1–2 tygodnie zależnie od liczby źródeł leadów i stopnia bałaganu w obecnym Pipedrive.",
  },
  {
    question: "Co jeśli Pipedrive API zwróci błąd?",
    answer:
      "Lead trafia do kolejki retry i jest ponawiany kilka razy z narastającym opóźnieniem. Jeśli wszystkie próby się nie powiodą — alert do Slacka lub maila, a payload trafia do storage'a, żebyś mógł go ręcznie wgrać po naprawie. Żaden lead nie ginie w eter.",
  },
  {
    question: "Ile to kosztuje?",
    answer:
      "Najmniejszy zakres (jeden formularz, podstawowa logika, walidacja, custom fields) — od 3 do 6 tys. zł. Pełna integracja z routingiem, deduplikacją, eskalacją i raportami źródeł — 8–15 tys. zł zależnie od liczby źródeł leadów. Dokładną wycenę podaję po krótkim audycie.",
  },
];

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
        <Breadcrumbs
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Integracja formularza z Pipedrive" },
          ]}
        />

        {/* Hero */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-accent/10 to-transparent border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-label">Integracja Pipedrive</span>
              <h1 className="mt-4 text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Integracja formularza z Pipedrive bez ręcznego przepisywania
                leadów
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Większość firm nie traci leadów dlatego, że ma zły CRM. Traci je
                dlatego, że między formularzem a CRM-em jest człowiek robiący za
                integrację API.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Pokażę ci, jak ten kawałek wygląda, gdy zadziała sam — od
                kliknięcia „Wyślij” po zadanie u handlowca z mierzalnym SLA.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <TrackedCTA
                  href="/#kontakt"
                  location="article_formularz_pipedrive_hero"
                  label="Chcę połączyć formularz z CRM"
                  eventName="cta_click_article_audit"
                  className="btn-primary text-base px-7 py-3"
                >
                  Chcę połączyć formularz z CRM
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
                Czemu ten kawałek boli najbardziej
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Formularz na stronie to często pierwszy realny punkt kontaktu
                klienta z firmą. To moment, w którym klient sam zgłasza chęć
                kupna — i równocześnie najczęściej zepsuty kawałek procesu B2B.
                Bo zamiast trafić do CRM, lead zwykle trafia na maila, którego
                nikt nie traktuje priorytetowo.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Ręczne przepisywanie leadów ma trzy konsekwencje, których
                nigdzie nie widać w arkuszu „koszty marketingu”: gubione leady,
                niespójne dane i opóźnienia w pierwszym kontakcie. Każda z nich
                kosztuje, ale liczona jest dopiero, jak się policzy. Stąd ten
                tekst.
              </p>
              <ul className="space-y-3">
                {[
                  "Marketing płaci za leady, sprzedaż widzi tylko część z nich w pipeline.",
                  "Każdy handlowiec wpisuje dane w swój sposób — raporty są nie do złożenia.",
                  "Reakcja na leada zajmuje godziny zamiast minut, konwersja spada o kilkadziesiąt procent.",
                  "Nikt nie wie, ile leadów wpadło w danym tygodniu — bo nikt nie liczy maili.",
                  "Handlowiec spędza 30–60 minut dziennie na klikaniu w CRM zamiast dzwonić.",
                  "Przy próbie zrobienia raportu „skąd przyszedł zamknięty klient” okazuje się, że źródło jest puste w 40% dealów.",
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
                Nie trzeba audytu, żeby to zauważyć. Wystarczy, że któreś z
                poniższych zdań brzmi znajomo:
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
                Ile to naprawdę kosztuje
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Liczby, nie wrażenia. Załóżmy realistyczne wejście:
              </p>
              <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 mb-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  <strong className="text-gray-900 dark:text-white">
                    300 leadów miesięcznie × 5 minut przepisywania × 60 zł/h ={" "}
                    <span className="text-accent">1 500 zł / miesiąc</span>
                  </strong>{" "}
                  samego przepisywania danych do CRM.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  18 000 zł rocznie. Przy 1 000 leadów miesięcznie — 60 000 zł.
                  I to tylko za czynność „kopiuj-wklej”.
                </p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Ale to nie jest największy koszt. Większy koszt to:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-accent" />
                  <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    <strong>Zgubione leady.</strong> Realistycznie 5–15% maili
                    nie trafia do CRM. Przy 300 leadach miesięcznie i średniej
                    wartości deala 5 000 zł — gubisz 75 000 — 225 000 zł
                    wartości pipeline'u rocznie.
                  </span>
                </li>
                <li className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-accent" />
                  <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    <strong>Spadek konwersji przez czas reakcji.</strong> Lead
                    odebrany w 5 minut konwertuje wielokrotnie lepiej niż
                    odebrany po 4 godzinach. To jest dziś branżowy konsensus,
                    nie marketingowy slogan.
                  </span>
                </li>
                <li className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-accent" />
                  <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    <strong>Błędy w danych.</strong> Literówka w numerze
                    telefonu, niepoprawny e-mail, źle wpisana firma — i już nie
                    masz jak skontaktować się z gotowym do kupna klientem.
                  </span>
                </li>
                <li className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-accent" />
                  <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    <strong>Rozjazd marketing — sprzedaż.</strong> Bez spójnego
                    przepływu danych marketing nie wie, które kampanie zamykają
                    deale, a sprzedaż nie ufa danym z marketingu. Optymalizacja
                    budżetu reklamowego staje się zgadywanką.
                  </span>
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Jeśli handlowiec przepisuje dane, to nie sprzedaje. Tyle
                filozofii.
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
                Klasyczny łańcuch nadziei: każdy ogniwo to człowiek, który musi
                pamiętać, kliknąć, przepisać i przekazać dalej. Wystarczy, że
                jedna osoba ma chory dzień albo urlop, i lead leży:
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
                Każdy etap to potencjalne miejsce zgubienia leada. Sumarycznie:
                konwersja niższa niż mogłaby być, marketing przepala budżet, a
                handlowcy klną na CRM.
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
                Tak to wygląda, gdy działa samo
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                Każdy krok można zbudować osobno i zmierzyć efekt po kolei.
                Najczęściej zaczynamy od kroków 1–3 i 6 — bo to one dają
                największy zwrot na początku.
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
                Nie wszystko naraz. Najpierw najmniejszy działający kawałek,
                który eliminuje 80% bólu — czyli ręczne przepisywanie i zgubione
                leady. Reszta (eskalacja, raportowanie, deduplikacja
                zaawansowana) idzie w drugim etapie, gdy widać, że pierwszy
                działa.
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
                Zwykle 2–4 dni roboczych. Po wdrożeniu mierzymy efekt przez 2–3
                tygodnie i decydujemy, co dalej. Automatyzowanie bałaganu to
                tylko szybsze produkowanie bałaganu — dlatego zaczynamy od
                jednego procesu, a nie od wszystkiego naraz.
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
                Typowe błędy przy łączeniu formularza z Pipedrive
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
                Widełki potwierdzam po krótkim audycie — bez niespodzianek. Dla
                porównania: realny koszt ręcznego przepisywania to często
                powyżej 18 tys. zł rocznie.
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
                        Webhook formularz → Pipedrive (osoba + organizacja +
                        deal), walidacja, zadanie kontaktu, źródło i UTM-y w
                        custom fields.
                      </td>
                      <td className="px-6 py-5 align-top whitespace-nowrap font-semibold text-accent">
                        3 — 6 tys. zł
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-5 font-semibold text-gray-900 dark:text-white align-top">
                        Etap 2 — pełny
                      </td>
                      <td className="px-6 py-5 align-top">
                        Wszystko z etapu 1 + deduplikacja po e-mailu/NIP,
                        routing po regułach, eskalacja, alerty błędów,
                        raportowanie źródeł.
                      </td>
                      <td className="px-6 py-5 align-top whitespace-nowrap font-semibold text-accent">
                        8 — 15 tys. zł
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-5 font-semibold text-gray-900 dark:text-white align-top">
                        Wiele źródeł leadów
                      </td>
                      <td className="px-6 py-5 align-top">
                        Powyższe + kilka formularzy/landingów/źródeł reklam,
                        wzbogacanie po NIP, zaawansowane mapowanie kampanii.
                      </td>
                      <td className="px-6 py-5 align-top whitespace-nowrap font-semibold text-accent">
                        15 — 25 tys. zł
                      </td>
                    </tr>
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
                  href="/#kontakt"
                  location="article_formularz_pipedrive_pricing_primary"
                  label="Chcę połączyć formularz z CRM"
                  eventName="cta_click_article_audit"
                  className="btn-primary"
                >
                  Chcę połączyć formularz z CRM
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
                  href="/raportowanie-z-pipedrive"
                  className="text-accent hover:underline"
                >
                  raportowanie z Pipedrive
                </Link>
                ,{" "}
                <Link
                  href="/strefa-wiedzy/jak-zautomatyzowac-raportowanie-w-firmie"
                  className="text-accent hover:underline"
                >
                  jak zautomatyzować raportowanie
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
                Czas, żeby formularz sam wbijał leady do CRM
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                30 minut konsultacji wystarczy, żeby określić, czy w twojej
                firmie ten jeden kawałek można zamknąć w 2–4 dni roboczych. Bez
                zobowiązań, bez prezentacji w PowerPoincie.
              </p>
              <TrackedCTA
                href="/#kontakt"
                location="article_formularz_pipedrive_final"
                label="Chcę połączyć formularz z CRM"
                eventName="cta_click_article_audit"
                className="btn-primary text-base px-7 py-3"
              >
                Chcę połączyć formularz z CRM
              </TrackedCTA>
            </div>
          </div>
        </section>

        {/* Bottom breadcrumb */}
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
