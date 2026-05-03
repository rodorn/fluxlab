import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";

export const metadata: Metadata = {
  title: "CRM jako system pracy, nie baza kontaktów | Fluxlab",
  description:
    "Jak zmienić CRM z notatnika w system, który wymusza dyscyplinę procesu sprzedaży. Pola, etapy, statusy, raporty i automatyzacje, którym handlowcy ufają.",
  openGraph: {
    title: "CRM jako system pracy, nie baza kontaktów | Fluxlab",
    description:
      "Jak zmienić CRM z notatnika w system, który wymusza dyscyplinę procesu sprzedaży. Pola, etapy, statusy, raporty i automatyzacje, którym handlowcy ufają.",
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
    canonical: "/crm-jako-system-pracy",
  },
};

const problemPoints = [
  "CRM jest miejscem dokumentowania chaosu, a nie narzędziem, które ten chaos ogranicza.",
  "Handlowcy wpisują dane „jakoś”, każdy w innym formacie i z innymi polami.",
  "Etapy w pipeline'ie nie odpowiadają realnemu stanowi sprzedaży.",
  "Statusy aktualizowane są raz w tygodniu, na piątkowym callu, kiedy manager pyta.",
  "Nikt nie wie, co znaczy „w trakcie negocjacji” — bo każdy rozumie to inaczej.",
  "Raporty z CRM-u są dyplomatycznie ignorowane, bo dane są niewiarygodne.",
];

const symptoms = [
  "Manager prosi o status pipeline'u i dostaje arkusz z notatnikiem zamiast raportu z CRM-u.",
  "Połowa deali ma „aktualizację” starszą niż 14 dni, a mimo to są w aktywnych etapach.",
  "Custom fieldy w CRM mają po 3–4 tysiące pustych wartości i kilka „testowych”.",
  "Handlowiec mówi „wiem, gdzie jest ten klient” — ale w CRM nie ma o tym ani słowa.",
  "Gdy ktoś idzie na urlop, jego deale stoją, bo nikt nie umie odczytać kontekstu z CRM-u.",
  "Sprzedaż prowadzi własną tabelę w Excelu — bo CRM-owi nie ufa.",
];

const beforeSteps = [
  "Handlowiec wraca z rozmowy, robi notatkę w głowie albo w telefonie.",
  "Wieczorem albo „jak będzie czas” wpisuje skrót do CRM-u.",
  "Status zmienia, gdy mu się przypomni — albo przed coniedzielnym raportem.",
  "Pole „następny krok” wypełnia ogólnikiem typu „kontakt z klientem”.",
  "Manager w piątek pyta „co z tym dealem” — handlowiec sprawdza maila, nie CRM.",
  "Raport z CRM-u jest robiony ręcznie w Excelu, bo dane w systemie są niespójne.",
];

const afterSteps = [
  "CRM ma sztywną strukturę: pola wymagane, słowniki zamiast wolnego tekstu, jasna definicja każdego etapu.",
  "Po każdej rozmowie handlowiec uzupełnia 3 pola w 30 sekund — system nie pozwala iść dalej bez nich.",
  "Etap deala zmienia się tylko po spełnieniu warunku (np. „oferta wysłana” = załącznik w deal'u).",
  "System pilnuje terminów: brak aktywności 7 dni → automatyczne przypomnienie, 14 dni → eskalacja.",
  "Dashboard managera czyta dane z CRM-u w czasie rzeczywistym — bez Excela.",
  "Onboarding nowego handlowca to 1 dzień, bo proces jest opisany w narzędziu, nie w głowie poprzednika.",
];

const workflowSteps = [
  {
    n: "1",
    title: "Audyt obecnego CRM",
    desc: "Mapuję, jak handlowcy realnie używają systemu — które pola wypełniają, które ignorują, gdzie powstają niespójności.",
    accent: false,
  },
  {
    n: "2",
    title: "Definicja procesu sprzedaży",
    desc: "Ustalamy etapy, kryteria przejścia między nimi i co dokładnie znaczy każdy status. Bez „w trakcie” bez kontekstu.",
    accent: true,
  },
  {
    n: "3",
    title: "Czyszczenie pól i słowników",
    desc: "Usuwam pola nieużywane, zamieniam wolny tekst na słowniki, definiuję pola wymagane na każdym etapie.",
    accent: false,
  },
  {
    n: "4",
    title: "Reguły walidacji",
    desc: "Deal nie zmienia etapu, jeśli brakuje danych. Status nie aktualizuje się, jeśli nie ma odpowiadającej aktywności.",
    accent: false,
  },
  {
    n: "5",
    title: "Automatyczne zadania i przypomnienia",
    desc: "CRM tworzy zadania kontaktowe, pilnuje terminów, eskaluje brak aktywności. Handlowiec dostaje listę „dziś”, nie pipeline do przeglądania.",
    accent: true,
  },
  {
    n: "6",
    title: "Raporty operacyjne",
    desc: "Manager widzi: średni czas w etapie, konwersję między etapami, deale „zalegające”, miejsca gdzie proces się zacina.",
    accent: false,
  },
  {
    n: "7",
    title: "Adopcja i kalibracja",
    desc: "Pierwsze 4 tygodnie: cotygodniowy review użycia, korekty pól i reguł na podstawie tego, gdzie handlowcy się buntują albo gdzie system blokuje sensowne działanie.",
    accent: true,
  },
];

const firstStage = [
  "Audyt 5–10 najważniejszych pól w deal'u — które są używane, które martwe, które niespójne.",
  "Definicja 4–6 etapów sprzedaży z jednoznacznym kryterium przejścia (np. „etap N wymaga pola X”).",
  "Słowniki zamiast wolnego tekstu w polach „branża”, „źródło leada”, „typ kontraktu”.",
  "Jedna reguła walidacji: nie da się zamknąć deala bez powodu wygranej/przegranej.",
  "Raport tygodniowy: liczba deali w każdym etapie, średni czas w etapie, deale bez aktywności 7+ dni.",
];

const mistakes = [
  "Dodawanie kolejnych custom fieldów „bo manager poprosił” — bez usuwania martwych. CRM puchnie i przestaje być czytelny.",
  "Etapy pipeline'u kopiowane z metodologii sprzedażowej zamiast dopasowane do faktycznego procesu firmy.",
  "Sztywne reguły walidacji bez konsultacji z handlowcami — wszyscy znajdą obejście, system traci wiarygodność.",
  "Manager prosi o aktualizację „na piątkowy raport” zamiast wymagać uzupełnienia po każdej rozmowie. Dane są dopasowywane pod raport, nie pod prawdę.",
  "Wprowadzanie automatyzacji na bałaganie — tworzenie zadań w CRM, w którym deale nie mają nawet poprawnych etapów. Automatyzowanie bałaganu to tylko szybsze produkowanie bałaganu.",
];

const pricing = [
  {
    name: "Audyt CRM",
    price: "0 zł",
    description:
      "Diagnoza: jak handlowcy używają systemu, gdzie powstaje bałagan i co da największy efekt w pierwszej kolejności.",
  },
  {
    name: "Porządek w CRM",
    price: "od 2 200 zł",
    description:
      "Czyszczenie pól, definicja etapów i statusów, słowniki, podstawowe reguły walidacji, instrukcja dla zespołu.",
    highlighted: true,
  },
  {
    name: "CRM jako system pracy",
    price: "od 4 500 zł",
    description:
      "Pełne wdrożenie: porządek + automatyczne zadania, eskalacje, raporty operacyjne i kalibracja przez pierwsze 4 tygodnie.",
  },
];

const faq = [
  {
    question: "Mam już CRM od 3 lat. Czy nie taniej zacząć od zera?",
    answer:
      "Prawie nigdy. W obecnym CRM-ie jest historia, którą warto zachować — kontakty, deale, korespondencja. Posprzątanie istniejącego systemu to zwykle 2–3 tygodnie. Migracja do nowego CRM-u to 6–12 tygodni i prawie zawsze powstaje ten sam bałagan, tylko w nowym narzędziu. Najpierw porządek, potem ewentualna zmiana platformy.",
  },
  {
    question:
      "Handlowcy będą się buntować przeciw nowym regułom — co z tym zrobić?",
    answer:
      "Tak, będą. Dlatego nie wprowadzam reguł zza biurka, tylko po rozmowie z zespołem. Handlowcy zwykle wiedzą, które pola są bezsensowne i które reguły im pomagają, a które przeszkadzają. Po pierwszych 4 tygodniach dostosowujemy system na podstawie realnego użycia, nie założeń.",
  },
  {
    question:
      "Czy to działa dla każdego CRM-u (Pipedrive, HubSpot, Salesforce)?",
    answer:
      "Tak. Mechanika jest ta sama: definicja etapów, pola wymagane, walidacja, automatyczne zadania, raporty. Różni się sposób konfiguracji w narzędziu. Dla bardzo nietypowych procesów łączę CRM z warstwą pośrednią (n8n, Make) — wtedy logika jest poza CRM-em, ale wynik ten sam.",
  },
  {
    question: "Po jakim czasie widać efekty?",
    answer:
      "Pierwsze efekty (czytelność pipeline'u, krótsze planowanie tygodnia, raporty z CRM-u zamiast Excela) — w 2–4 tygodnie. Wzrost konwersji i krótszy cykl sprzedaży — 2–3 miesiące, bo zespół musi się przyzwyczaić do dyscypliny. Pełna stabilizacja — kwartał.",
  },
  {
    question: "Co jeśli mamy zespół 2 osób — czy to nie przerost formy?",
    answer:
      "Dla 2 osób nie potrzebujesz pełnego systemu z eskalacjami i raportami operacyjnymi. Wystarczy minimum: 4 etapy, 5 pól wymaganych, jedna reguła „brak aktywności 7 dni = przypomnienie”. To jest 1–2 dni pracy, nie wdrożenie. Większa skala uzasadnia większy system.",
  },
  {
    question: "Czy automatyzacja zastąpi managera sprzedaży?",
    answer:
      "Nie. Manager nadal robi 1:1, kalibruje zespół, decyduje o priorytetach. Ale przestaje spędzać 4 godziny tygodniowo na ręcznym sklejaniu raportu z CRM-u i Excela. To czas, który wraca do realnej pracy z zespołem i klientami.",
  },
];

export default function CrmJakoSystemPracy() {
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
        name: "CRM jako system pracy",
        item: "https://fluxlab.pl/crm-jako-system-pracy",
      },
    ],
  };

  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "CRM jako system pracy" }]} />

        {/* Hero */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-accent/10 to-transparent border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-label">CRM jako system pracy</span>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mt-4 mb-6 leading-tight">
                Jak zmienić CRM z notatnika w system pracy handlowców
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                CRM nie powinien być miejscem, gdzie handlowiec dokumentuje
                chaos. Powinien być systemem, który ten chaos ogranicza —
                wymusza dyscyplinę procesu, pilnuje terminów, podpowiada kolejny
                krok. Tu opisuję, jak doprowadzić istniejący CRM do stanu, w
                którym zespół mu ufa, a manager przestaje sklejać raporty w
                Excelu.
              </p>
              <div className="mt-8 flex justify-center">
                <TrackedCTA
                  href="/#kontakt"
                  location="article_crm-jako-system-pracy_hero"
                  label="uporządkuj crm"
                  eventName="cta_click_article_audit"
                  className="btn-primary px-8 py-3.5 text-base"
                >
                  Uporządkuj CRM
                </TrackedCTA>
              </div>
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
                Audyt w 24h · mapa porządku · bez zobowiązań
              </p>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">Problem</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 leading-tight">
                  CRM, w którym dane są „cokolwiek”, daje raporty „cokolwiek”
                </h2>
              </div>
              <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-4 mb-10">
                <p>
                  Handlowcy tworzą zadania ręcznie, zapominają o follow-upach,
                  zmieniają statusy po czasie i wpisują dane różnie. Potem
                  raport mówi cokolwiek, bo dane są cokolwiek. Manager patrzy na
                  pipeline 800 tys. zł i nie wie, czy 200 tys. z tego to realna
                  sprzedaż, czy 80% to „klient się odezwie po wakacjach” z
                  kwietnia.
                </p>
                <p>
                  CRM nie powinien być miejscem, gdzie handlowiec dokumentuje
                  chaos. Powinien być systemem, który ten chaos ogranicza.
                  Różnica jest w tym, czy narzędzie wymusza dyscyplinę procesu,
                  czy tylko biernie zapisuje to, co zespół chce wpisać.
                </p>
              </div>
              <ul className="space-y-3">
                {problemPoints.map((point) => (
                  <li
                    key={point}
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
                      {point}
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
              <div className="text-center mb-12">
                <span className="section-label">Objawy</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                  Po czym poznać, że CRM jest notatnikiem, nie systemem
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
                  Te objawy pojawiają się stopniowo. Firma rośnie, dochodzą
                  pola, etapy i custom fieldy, a CRM zamiast usprawniać sprzedaż
                  zaczyna jej przeszkadzać.
                </p>
              </div>
              <ul className="space-y-3">
                {symptoms.map((item) => (
                  <li
                    key={item}
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
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Koszt */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">Koszt problemu</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                  Ile kosztuje CRM, którego nie używa się dyscyplinarnie
                </h2>
              </div>
              <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-4">
                <p>
                  Zespół 5 handlowców, każdy spędza średnio 45 minut dziennie na
                  „administracji w CRM” — szukaniu kontekstu, ręcznym
                  uzupełnianiu pól, klikaniu między ekranami. To 3,75 godziny
                  dziennie zespołu, czyli ok. 75 godzin miesięcznie. Przy stawce
                  80 zł/h kosztu pracodawcy to 6 000 zł miesięcznie spalone na
                  nawigację po notatniku.
                </p>
                <p>
                  Manager sprzedaży poświęca 4–6 godzin tygodniowo na sklejanie
                  raportu z CRM-u i Excela, weryfikację, pytanie „a co z tym
                  klientem” i prostowanie statusów. To kolejne 2 000 zł
                  miesięcznie kosztu menedżerskiego — znacznie wartościowszego
                  czasu, który mógłby pójść na rozmowy z zespołem albo z
                  klientami.
                </p>
                <p>
                  Plus efekty pośrednie: utracone deale, do których nikt się nie
                  odezwał, bo „status był aktualny”. Onboarding nowego handlowca
                  trwa 2x dłużej, bo proces jest w głowach, nie w systemie.
                  Decyzje o produktach i targetach podejmowane są na podstawie
                  raportów, którym sam manager nie ufa.
                </p>
                <p>
                  Wdrożenie porządku w CRM dla zespołu tej skali to zwykle 4–8
                  tys. zł setupu i 4 tygodnie kalibracji. Wraca w 2–3 miesiące z
                  samego odzyskanego czasu zespołu — bez liczenia odzyskanych
                  deali.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Proces przed */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">Proces przed</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                  Jak handlowiec używa CRM-u dziś — łańcuch nadziei
                </h2>
              </div>
              <ol className="space-y-3">
                {beforeSteps.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-start gap-4 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center text-xs font-bold tabular-nums">
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
              <div className="text-center mb-12">
                <span className="section-label">Proces po</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                  Jak wygląda CRM, który jest systemem pracy
                </h2>
              </div>
              <ol className="space-y-3">
                {afterSteps.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-start gap-4 bg-white dark:bg-gray-800/60 border border-accent/30 rounded-xl px-5 py-4"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold tabular-nums">
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

        {/* Diagram */}
        <section className="py-12 lg:py-16 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-2xl mb-10">
              <p className="section-label mb-3">Diagram</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Etapy wdrożenia porządku w CRM
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                To jest sekwencja, którą prowadzę u większości klientów. Każdy
                etap można zatrzymać i mierzyć efekt po kolei — bez wdrażania
                wszystkiego naraz.
              </p>
            </div>
            <ol className="relative max-w-4xl space-y-3 lg:space-y-4">
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
        </section>

        {/* Pierwszy etap */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">Pierwszy etap</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                  Co wdrożyć w pierwszym etapie
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
                  Najmniejszy kawałek, który zwykle daje widoczny efekt już w
                  drugim tygodniu. Bez przebudowy całego CRM-u, bez migracji do
                  nowego narzędzia.
                </p>
              </div>
              <ul className="space-y-3">
                {firstStage.map((item) => (
                  <li
                    key={item}
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
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-gray-600 dark:text-gray-400 leading-relaxed">
                Dopiero potem dochodzą automatyczne sekwencje, integracje z
                marketingiem, scoring leadów i raporty zaawansowane. Najczęstszy
                błąd to próba zrobienia wszystkiego naraz — handlowcy nie
                nadążają z adopcją i wracają do Excela.
              </p>
            </div>
          </div>
        </section>

        {/* Błędy */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">Antywzorce</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                  Najczęstsze błędy w porządkowaniu CRM-u
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
                  Te wzorce widzę regularnie u firm, które próbowały „naprawić
                  CRM” samodzielnie. Każdy z nich powoduje, że wdrożenie się
                  rozsypuje po 2–3 miesiącach.
                </p>
              </div>
              <ul className="space-y-3">
                {mistakes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
                  >
                    <svg
                      className="flex-shrink-0 mt-0.5 text-gray-400"
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
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Cennik */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">Cennik</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                  Ile kosztuje porządek w CRM-ie
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed max-w-2xl mx-auto">
                  Wycena zależy od skali zespołu, CRM-u, liczby pól i etapów
                  oraz tego, ile bałaganu trzeba posprzątać. Poniżej widełki dla
                  typowych wdrożeń. Audyt zawsze bezpłatny.
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-6">
                {pricing.map((tier) => (
                  <div
                    key={tier.name}
                    className={`rounded-2xl p-6 border ${
                      tier.highlighted
                        ? "bg-accent-light dark:bg-accent-dark-light border-accent/30"
                        : "bg-white dark:bg-gray-800/60 border-gray-100 dark:border-gray-700"
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {tier.name}
                    </h3>
                    <p className="text-2xl font-bold text-accent mb-3">
                      {tier.price}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {tier.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <TrackedCTA
                  href="/automatyzacja-leadow-crm"
                  location="article_crm-jako-system-pracy_pricing"
                  label="zobacz pełną ofertę"
                  eventName="cta_click_article_audit"
                  className="btn-secondary px-6 py-3 text-base"
                >
                  Zobacz pełną ofertę
                </TrackedCTA>
                <TrackedCTA
                  href="/#kontakt"
                  location="article_crm-jako-system-pracy_pricing"
                  label="wycena"
                  eventName="cta_click_article_audit"
                  className="btn-primary px-8 py-3.5 text-base"
                >
                  Wyceń mój CRM
                </TrackedCTA>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">FAQ</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                  Najczęstsze pytania o porządkowanie CRM-u
                </h2>
              </div>
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
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Zobacz też
              </h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                <li>
                  <Link
                    href="/automatyzacja-follow-up"
                    className="block bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4 hover:border-accent/40 transition-colors"
                  >
                    <span className="block font-semibold text-gray-900 dark:text-white">
                      Automatyzacja follow-upów w CRM
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Sekwencje przypomnień, które pilnują leadów zamiast
                      handlowca
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/automatyzacja-crm"
                    className="block bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4 hover:border-accent/40 transition-colors"
                  >
                    <span className="block font-semibold text-gray-900 dark:text-white">
                      Automatyzacja CRM
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Pełny zakres automatyzacji w CRM dla zespołów B2B
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/automatyzacja-pipedrive"
                    className="block bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4 hover:border-accent/40 transition-colors"
                  >
                    <span className="block font-semibold text-gray-900 dark:text-white">
                      Automatyzacja Pipedrive
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      API, webhooki i logika sprzedażowa w Pipedrive
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/strefa-wiedzy/jak-uporzadkowac-proces-sprzedazy-w-crm"
                    className="block bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4 hover:border-accent/40 transition-colors"
                  >
                    <span className="block font-semibold text-gray-900 dark:text-white">
                      Jak uporządkować proces sprzedaży w CRM
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Artykuł: jak ułożyć etapy, pola i statusy w CRM
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 lg:py-24 bg-accent/10 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Zrób z CRM-u system pracy, nie cmentarz danych
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                30 minut audytu, mapa porządku, wycena pierwszego etapu. Bez
                sprzedażowej presji.
              </p>
              <TrackedCTA
                href="/#kontakt"
                location="article_crm-jako-system-pracy_final"
                label="uporządkuj crm"
                eventName="cta_click_article_audit"
                className="btn-primary px-8 py-3.5 text-base"
              >
                Uporządkuj CRM
              </TrackedCTA>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                Odpowiedź w 24h · audyt CRM · bez zobowiązań
              </p>
            </div>
          </div>
        </section>
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
