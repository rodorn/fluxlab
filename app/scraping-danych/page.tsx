import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LandingForm from "@/components/LandingForm";
import TrackedCTA from "@/components/TrackedCTA";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Scraping i ekstrakcja danych — web, PDF, maile, dokumenty | Fluxlab",
  description:
    "Wyciągam strukturalne dane ze stron, PDF-ów, maili i dokumentów. AI rozpoznaje pola, walidacja w czasie rzeczywistym, pipeline do CRM lub arkusza. Bez ręcznego kopiowania.",
  alternates: { canonical: "/scraping-danych" },
  openGraph: {
    title:
      "Scraping i ekstrakcja danych — web, PDF, maile, dokumenty | Fluxlab",
    description:
      "Wyciągam strukturalne dane ze stron, PDF-ów, maili. AI rozpoznaje pola.",
    locale: "pl_PL",
    type: "website",
  },
};

const sourceTypes = [
  {
    title: "Web scraping",
    description:
      "Listingi, monitoring cen, oferty konkurencji, katalogi branżowe. Pobieranie strukturalnych danych ze stron bez API, łącznie z paginacją i dynamicznym JS.",
    icon: (
      <svg
        aria-hidden="true"
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    ),
    examples: [
      "Monitoring cen u konkurentów (co X godzin)",
      "Kontakty z katalogów branżowych",
      "Oferty z portali ogłoszeniowych / maklerek",
    ],
  },
  {
    title: "PDF i dokumenty",
    description:
      "Faktury, umowy, raporty, oferty handlowe. OCR rozpoznaje obraz, AI klasyfikuje pola i zwraca strukturalny rekord — nawet z niestandardowych layoutów.",
    icon: (
      <svg
        aria-hidden="true"
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
        <path d="M14 3v5h5M9 13h6M9 17h4" />
      </svg>
    ),
    examples: [
      "Faktury przychodzące → księgowość",
      "Umowy → klauzule i daty wygaśnięcia",
      "Raporty branżowe → tabele i wskaźniki",
    ],
  },
  {
    title: "Maile",
    description:
      "Ekstrakcja danych z luźnych maili: zapytania ofertowe, zamówienia, dane kontaktowe. AI rozumie kontekst i wyciąga pola, których wzorzec nigdy się nie powtarza.",
    icon: (
      <svg
        aria-hidden="true"
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 7 9-7" />
      </svg>
    ),
    examples: [
      "Zapytania ofertowe z formularzy → CRM",
      "Potwierdzenia zamówień od dostawców",
      "Kontakty z konferencji i targów",
    ],
  },
  {
    title: "Dokumenty Office",
    description:
      "Excel, Word, prezentacje. Ujednolicanie chaosu z arkuszy w różnych formatach do jednego, czystego schematu — gotowego do importu lub raportu.",
    icon: (
      <svg
        aria-hidden="true"
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M4 9h16M4 15h16M10 3v18" />
      </svg>
    ),
    examples: [
      "Arkusze handlowców → jeden master sheet",
      "Cenniki od dostawców → struktura porównawcza",
      "Stare bazy klientów → import do CRM",
    ],
  },
];

const useCases = [
  {
    id: "monitoring-cen",
    title: "Monitoring cen konkurencji",
    problem:
      "Handlowiec codziennie wchodzi na 5 stron konkurentów i sprawdza ceny w arkuszu. Zajmuje to 30–60 minut dziennie, a zmiany i tak są zauważane z opóźnieniem.",
    solution:
      "Scraper co 6h pobiera ceny ze zdefiniowanych źródeł, wykrywa zmiany (próg procentowy konfigurowalny) i wysyła alert na Slacka lub mail. Pełna historia trafia do Google Sheets albo BigQuery — gotowa do analizy trendu.",
    stack: "Playwright + n8n + AI do parsowania niestandardowych formatów",
  },
  {
    id: "faktury-pdf",
    title: "Faktury PDF → arkusz / CRM",
    problem:
      "Faktury przychodzą mailem w różnych formatach. Ktoś ręcznie wpisuje NIP, kwoty, daty i kontrahenta do księgowości albo arkusza. Błędy przy przepisywaniu są regułą, nie wyjątkiem.",
    solution:
      "Mailbox webhook przechwytuje wiadomość, AI vision wyciąga pola z załącznika PDF, walidacja sprawdza poprawność NIP-u w GUS i formatu kwot. Rekord trafia do arkusza i Pipedrive — z linkiem do oryginału.",
    stack: "Mailparser + GPT-4 Vision + Google Sheets API + Pipedrive",
  },
  {
    id: "leady-katalogi",
    title: "Leady z LinkedIn / katalogów",
    problem:
      "Research firm zajmuje 4h tygodniowo. Kopiowanie nazw, NIP-ów, adresów i kontaktów ze stron branżowych do arkusza, potem do CRM. Połowa danych jest nieaktualna albo niekompletna.",
    solution:
      "Scraper konfigurowalny per branża pobiera dane, waliduje NIP w GUS i sprawdza poprawność maila przez DNS/MX. Zapis trafia bezpośrednio do CRM z oznaczeniem źródła. Uwaga: zgodnie z TOS platformy i RODO.",
    stack: "Playwright + GUS API + walidacja MX + Pipedrive integration",
  },
  {
    id: "raport-maile",
    title: "Raport z maili — co klienci pytają",
    problem:
      "Zespół sprzedaży nie ma overview, jakie pytania powtarzają się od klientów. Każdy widzi swoje maile, nikt nie widzi wzorca. Decyzje produktowe oparte na przeczuciu.",
    solution:
      "AI klasyfikuje tematy, tonację i intencje wiadomości z inboxu, agreguje wyniki tygodniowo. Dashboard pokazuje top 10 pytań, trend zgłoszeń i sentiment per produkt. Co tydzień raport do skrzynki managera.",
    stack: "Gmail API + Claude do klasyfikacji + Looker Studio",
  },
];

const ethicsDo = [
  "Scraping publicznych stron zgodnie z TOS i robots.txt",
  "Ekstrakcja z Twoich danych (PDF-y, maile firmowe, dokumenty)",
  "Monitoring cen, ofert, listingów — w granicach prawa",
];

const ethicsDont = [
  "Scrapowanie chronionych zasobów (logged-in only, paid content)",
  "Omijanie zabezpieczeń antybotowych (captcha, fingerprinting)",
  "Pobieranie danych osobowych bez podstawy prawnej (RODO)",
  "Scraping LinkedIn obchodzący rate limity (banuje konta klientów)",
];

const process = [
  {
    step: "01",
    title: "Diagnoza",
    description:
      "Rozmawiamy o tym, jakich danych potrzebujesz, jak często i w jakim formacie. Sprawdzam, czy źródło jest dostępne i czy scraping jest legalny.",
  },
  {
    step: "02",
    title: "Identyfikacja źródeł",
    description:
      "Mapuję wszystkie miejsca, w których dane się znajdują (strony, skrzynki, foldery PDF). Określam strukturę, jakość i częstotliwość zmian.",
  },
  {
    step: "03",
    title: "POC scraper",
    description:
      "Buduję działający scraper dla 1–2 źródeł. Pokazuję jakość danych, walidację, format wyjściowy. Decydujemy, czy idziemy w produkcję.",
  },
  {
    step: "04",
    title: "Pipeline produkcyjny",
    description:
      "Pełen pipeline z monitoringiem, alertami i dashboardem. Twoja infrastruktura, Twoje dane, mój kod udokumentowany do przejęcia.",
  },
];

const pricing = [
  {
    name: "Diagnoza",
    price: "0 zł",
    description:
      "Rozmawiamy o tym, czego potrzebujesz i czy w ogóle warto. Sprawdzam dostępność i legalność źródeł, oceniam jakość danych.",
    features: [
      "Konsultacja 30–45 min",
      "Mapa potencjalnych źródeł",
      "Ocena legalności i ryzyk",
      "Szacunek skali pracy",
    ],
    cta: { label: "Zamów diagnozę", href: "#diagnoza" },
    highlight: false,
  },
  {
    name: "POC scraper",
    price: "od 2 000 zł",
    description:
      "Jeden konkretny use case, 1–2 źródła. Działający scraper z walidacją, dane w Twoim arkuszu lub CRM, gotowy do dalszej rozbudowy.",
    features: [
      "1–2 źródła danych",
      "Walidacja pipeline'u",
      "Zapis do arkusza / CRM",
      "Dokumentacja techniczna",
    ],
    cta: { label: "Zacznij od POC", href: "#diagnoza" },
    highlight: true,
  },
  {
    name: "Pipeline produkcyjny",
    price: "od 5 000 zł",
    description:
      "Multi-source, scheduling, monitoring, alerty, dashboard. Pełna infrastruktura z health checkami i obsługą edge case'ów.",
    features: [
      "Wiele źródeł i formatów",
      "Monitoring + alerty",
      "Dashboard / raporty",
      "Wsparcie po wdrożeniu",
    ],
    cta: { label: "Wyceń pipeline", href: "#diagnoza" },
    highlight: false,
  },
];

const faq = [
  {
    question: "Czy scraping jest legalny?",
    answer:
      "Zależy od źródła i sposobu. Publiczne strony zgodnie z TOS i robots.txt — tak. Chronione, logged-in albo paid content — nie. RODO i etyka w pierwszej kolejności. Każdy przypadek oceniam indywidualnie i mówię wprost, gdy widzę ryzyko.",
  },
  {
    question: "Co jeśli strona zmieni layout?",
    answer:
      "Każdy produkcyjny scraper ma monitoring i alerty na anomalia (brak danych, zerowy fill rate kluczowych pól). Aktualizację selektorów robię w ramach wsparcia po wdrożeniu, zwykle 1–2 dni od zgłoszenia.",
  },
  {
    question: "Jak działa AI rozpoznawanie pól?",
    answer:
      "LLM (Claude / GPT) dostaje surowy tekst albo obraz, w prompcie schemat oczekiwanych pól i przykłady. Zwraca strukturalny JSON. Walidacja po stronie kodu sprawdza poprawność (NIP, daty, kwoty, formaty). Błędne rekordy trafiają do osobnej kolejki do ręcznego review.",
  },
  {
    question: "Czy dane są bezpieczne?",
    answer:
      "Tak. Pipeline szyfrowany w transporcie i spoczynku, dane w Twojej infrastrukturze (Google Cloud / AWS / on-prem). Mam dostęp tylko na czas wdrożenia, później wszystko jest po Twojej stronie. NDA standardowo na początku współpracy.",
  },
  {
    question: "A jeśli scraper trafi na captcha?",
    answer:
      "Niektóre źródła nie pozwalają na scraping i to widać po stronie technicznej (captcha, rate limit, fingerprinting). Powiem wprost, jeśli widzę takie ograniczenie — nie obchodzę zabezpieczeń, zamiast tego szukam alternatywnego źródła lub oficjalnego API.",
  },
  {
    question: "Czy mogę monitorować scrapery sam?",
    answer:
      "Tak. Standardowo wdrażam dashboard z health checkami (Grafana / Looker Studio), logi w Sentry, alerty na Slack lub mail. Po wdrożeniu masz pełny wgląd w to, co dzieje się z każdym źródłem, kiedy ostatnio pobierało dane i jaka jest jakość.",
  },
];

export default function ScrapingDanychPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section
          aria-labelledby="hero-heading"
          className="relative pt-28 pb-16 overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="blob blob-cyan -z-10 top-[-15%] left-[-10%] w-[600px] h-[600px]"
          />
          <div
            aria-hidden="true"
            className="blob blob-violet -z-10 bottom-[-20%] right-[-10%] w-[500px] h-[500px]"
          />
          <div className="container-wide relative">
            <div className="max-w-3xl">
              <div className="animate-fade-up-1 inline-flex items-center gap-2 glass-card text-accent text-xs font-semibold px-3 py-1.5 rounded-full mb-8">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-soft-pulse" />
                Scraping danych · Fluxlab
              </div>
              <h1
                id="hero-heading"
                className="display-xl animate-fade-up-2 mb-6 text-gray-900 dark:text-white"
              >
                Wyciągam dane z miejsc, w których normalnie giną.
              </h1>
              <p className="animate-fade-up-3 text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-10 max-w-2xl">
                Strony WWW, PDF-y, maile, dokumenty. AI rozpoznaje pola,
                walidacja na bieżąco, pipeline do Twojego CRM albo arkusza. Bez
                kopiowania, bez przepisywania.
              </p>
              <div className="animate-fade-up-4 flex flex-col sm:flex-row gap-4">
                <TrackedCTA
                  href="#diagnoza"
                  location="hero_scraping"
                  label="diagnoza"
                  eventName="cta_click_hero_scraping_audit"
                  className="btn-primary text-base px-8 py-4"
                >
                  Zamów bezpłatną diagnozę
                </TrackedCTA>
                <TrackedCTA
                  href="#use-cases"
                  location="hero_scraping"
                  label="use_cases"
                  className="btn-secondary text-base px-8 py-4"
                >
                  Zobacz use cases
                </TrackedCTA>
              </div>
            </div>
          </div>
        </section>

        {/* 4 typy źródeł */}
        <section
          id="zrodla"
          aria-labelledby="zrodla-heading"
          className="py-20 lg:py-28 border-t border-gray-100 dark:border-gray-800"
        >
          <div className="container-wide">
            <div className="max-w-3xl mb-14">
              <p className="section-label mb-3">Co potrafię wyciągać</p>
              <h2
                id="zrodla-heading"
                className="display-lg text-gray-900 dark:text-white mb-4"
              >
                4 typy źródeł, jeden pipeline
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Nieważne, czy dane są na stronie bez API, w PDF-ie od dostawcy,
                w maila od klienta czy w arkuszu od handlowca — celem jest
                strukturalny rekord, gotowy do systemu.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {sourceTypes.map((src, idx) => (
                <RevealOnScroll
                  key={src.title}
                  delay={((idx % 4) + 1) as 1 | 2 | 3 | 4}
                >
                  <article className="glass-card rounded-2xl p-7 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-accent/10 text-accent">
                        {src.icon}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {src.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">
                      {src.description}
                    </p>
                    <ul className="space-y-2">
                      {src.examples.map((ex) => (
                        <li
                          key={ex}
                          className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                        >
                          <svg
                            aria-hidden="true"
                            className="shrink-0 mt-0.5 w-4 h-4 text-accent"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M2.5 7l3 3 6-6"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section
          id="use-cases"
          aria-labelledby="use-cases-heading"
          className="scroll-mt-20 py-20 lg:py-28 border-t border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/40"
        >
          <div className="container-wide">
            <div className="max-w-3xl mb-14">
              <p className="section-label mb-3">Konkretne wdrożenia</p>
              <h2
                id="use-cases-heading"
                className="display-lg text-gray-900 dark:text-white mb-4"
              >
                4 use cases, które robię najczęściej
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Każdy z nich da się powtórzyć w Twojej firmie. Liczby i stack
                pochodzą z rzeczywistych projektów — nie z prezentacji.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              {useCases.map((uc, idx) => (
                <RevealOnScroll
                  key={uc.id}
                  delay={((idx % 4) + 1) as 1 | 2 | 3 | 4}
                >
                  <article
                    id={uc.id}
                    className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-7 h-full"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-5">
                      {uc.title}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs uppercase tracking-wider font-semibold text-rose-500 dark:text-rose-400 mb-1.5">
                          Problem
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {uc.problem}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400 mb-1.5">
                          Rozwiązanie
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {uc.solution}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider font-semibold text-accent mb-1.5">
                          Stack
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                          {uc.stack}
                        </p>
                      </div>
                    </div>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* AI rozpoznaje strukturę */}
        <section
          aria-labelledby="ai-heading"
          className="py-20 lg:py-28 border-t border-gray-100 dark:border-gray-800"
        >
          <div className="container-wide">
            <RevealOnScroll>
              <div className="relative overflow-hidden glass-card rounded-3xl p-10 lg:p-14 max-w-5xl mx-auto">
                <div
                  aria-hidden="true"
                  className="blob blob-cyan -z-10 top-[-30%] right-[-10%] w-[400px] h-[400px] opacity-50"
                />
                <p className="section-label mb-3">Wspomagane AI</p>
                <h2
                  id="ai-heading"
                  className="display-lg text-gray-900 dark:text-white mb-6"
                >
                  AI rozpoznaje pola w 95%+ przypadków, nawet w
                  nieustrukturyzowanych źródłach.
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-10 max-w-3xl">
                  Faktury w różnych formatach, maile w luźnym języku, strony bez
                  API — AI radzi sobie tam, gdzie tradycyjny scraping pęka.
                  Walidacja w czasie rzeczywistym wyłapuje błędy (zły NIP,
                  brakujące pole, nieprawidłowy format daty) zanim trafią do
                  Twojego systemu.
                </p>
                <div className="grid sm:grid-cols-3 gap-6 border-t border-gray-200/60 dark:border-gray-700/60 pt-8">
                  <div>
                    <p className="stat-number text-gradient-flow">95%+</p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      dokładność rozpoznawania pól
                    </p>
                  </div>
                  <div>
                    <p className="stat-number text-gradient-flow">tysiące</p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      rekordów przetworzonych w godzinę
                    </p>
                  </div>
                  <div>
                    <p className="stat-number text-gradient-flow">0</p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      ręcznego copy-paste w pipeline
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* Etyka i ograniczenia */}
        <section
          id="etyka"
          aria-labelledby="etyka-heading"
          className="py-20 lg:py-28 border-t border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/40"
        >
          <div className="container-wide">
            <div className="max-w-3xl mb-14">
              <p className="section-label mb-3">Etyka i prawo</p>
              <h2
                id="etyka-heading"
                className="display-lg text-gray-900 dark:text-white mb-4"
              >
                Co robię i czego NIE robię
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Scraping jest narzędziem, nie wytrychem. Granica między
                pożytecznym a problematycznym jest cienka — staram się być po
                właściwej stronie i mówię wprost, gdy widzę ryzyko.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
              <article className="rounded-2xl p-7 bg-white dark:bg-gray-800/60 border border-emerald-200/60 dark:border-emerald-900/40">
                <div className="flex items-center gap-2 mb-5">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M4 10l4 4 8-8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Co robię
                  </h3>
                </div>
                <ul className="space-y-3">
                  {ethicsDo.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <svg
                        aria-hidden="true"
                        className="shrink-0 mt-0.5 w-4 h-4 text-emerald-500"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M2.5 7l3 3 6-6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
              <article className="rounded-2xl p-7 bg-white dark:bg-gray-800/60 border border-rose-200/60 dark:border-rose-900/40">
                <div className="flex items-center gap-2 mb-5">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
                    </svg>
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Czego NIE robię
                  </h3>
                </div>
                <ul className="space-y-3">
                  {ethicsDont.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <svg
                        aria-hidden="true"
                        className="shrink-0 mt-0.5 w-4 h-4 text-rose-500"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M3 3l8 8M11 3L3 11"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* Proces */}
        <section
          id="proces"
          aria-labelledby="proces-heading"
          className="py-20 lg:py-28 border-t border-gray-100 dark:border-gray-800"
        >
          <div className="container-wide">
            <div className="max-w-3xl mb-14">
              <p className="section-label mb-3">Jak pracuję</p>
              <h2
                id="proces-heading"
                className="display-lg text-gray-900 dark:text-white mb-4"
              >
                4 kroki od pomysłu do produkcji
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Bez wielkiego waterfall i 3-miesięcznych specyfikacji. Każdy
                krok kończy się czymś, co można zobaczyć i ocenić.
              </p>
            </div>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((p, idx) => (
                <RevealOnScroll
                  key={p.step}
                  as="li"
                  delay={((idx % 4) + 1) as 1 | 2 | 3 | 4}
                >
                  <div className="glass-card rounded-2xl p-6 h-full">
                    <p className="text-3xl font-bold text-gradient-flow mb-3">
                      {p.step}
                    </p>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </ol>
          </div>
        </section>

        {/* Cennik */}
        <section
          id="cennik"
          aria-labelledby="cennik-heading"
          className="py-20 lg:py-28 border-t border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/40"
        >
          <div className="container-wide">
            <div className="max-w-3xl mb-14">
              <p className="section-label mb-3">Cennik</p>
              <h2
                id="cennik-heading"
                className="display-lg text-gray-900 dark:text-white mb-4"
              >
                3 ścieżki — od bezpłatnej diagnozy do pełnego pipeline'u
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Wycena indywidualna dla niestandardowych źródeł. Poniższe
                widełki to typowe projekty z 1–3 źródłami danych.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {pricing.map((tier, idx) => (
                <RevealOnScroll
                  key={tier.name}
                  delay={((idx % 4) + 1) as 1 | 2 | 3 | 4}
                >
                  <article
                    className={`rounded-2xl p-7 h-full flex flex-col ${
                      tier.highlight
                        ? "bg-white dark:bg-gray-800/80 border-2 border-accent shadow-xl shadow-accent/10"
                        : "bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700"
                    }`}
                  >
                    {tier.highlight && (
                      <span className="inline-flex items-center gap-1 self-start text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full mb-3">
                        Najczęstszy wybór
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {tier.name}
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {tier.price}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {tier.description}
                    </p>
                    <ul className="space-y-2.5 mb-7 flex-1">
                      {tier.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                        >
                          <svg
                            aria-hidden="true"
                            className="shrink-0 mt-0.5 w-4 h-4 text-accent"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M2.5 7l3 3 6-6"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <TrackedCTA
                      href={tier.cta.href}
                      location={`pricing_${tier.name.toLowerCase()}`}
                      label={tier.cta.label}
                      className={
                        tier.highlight
                          ? "btn-primary w-full justify-center"
                          : "btn-secondary w-full justify-center"
                      }
                    >
                      {tier.cta.label}
                    </TrackedCTA>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-500 mt-8">
              Wycena indywidualna dla niestandardowych źródeł, dużej skali lub
              wysokich wymagań SLA.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          aria-labelledby="faq-heading"
          className="py-20 lg:py-28 border-t border-gray-100 dark:border-gray-800"
        >
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <p className="section-label mb-3">FAQ</p>
              <h2
                id="faq-heading"
                className="display-lg text-gray-900 dark:text-white mb-8"
              >
                Najczęściej zadawane pytania
              </h2>
              <div className="space-y-4">
                {faq.map((item) => (
                  <details
                    key={item.question}
                    className="group bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl"
                  >
                    <summary className="flex items-center justify-between cursor-pointer p-6 text-gray-900 dark:text-white font-medium">
                      {item.question}
                      <svg
                        aria-hidden="true"
                        className="shrink-0 ml-4 w-5 h-5 text-gray-400 transition-transform group-open:rotate-45"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M10 4v12M4 10h12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </summary>
                    <div className="px-6 pb-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Form — diagnoza */}
        <section
          id="diagnoza"
          aria-labelledby="diagnoza-heading"
          className="scroll-mt-20 py-20 lg:py-24 bg-accent/10 border-t border-gray-100 dark:border-gray-800"
        >
          <div className="container-wide">
            <h2 id="diagnoza-heading" className="sr-only">
              Bezpłatna diagnoza scrapingu
            </h2>
            <LandingForm
              formId="diagnosis_scraping"
              heading="Bezpłatna diagnoza scrapingu"
              intro="Opisz krótko, jakich danych potrzebujesz i z jakich źródeł. Wrócę w 24h z informacją, czy widzę dopasowanie i czy źródło jest dostępne legalnie."
              submitLabel="Zamów diagnozę"
            />
          </div>
        </section>

        {/* Related links */}
        <section
          aria-labelledby="related-heading"
          className="py-16 lg:py-20 border-t border-gray-100 dark:border-gray-800"
        >
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2
                id="related-heading"
                className="text-lg font-semibold text-gray-900 dark:text-white mb-4"
              >
                Inne usługi
              </h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                <li>
                  <Link
                    href="/automatyzacja-crm"
                    className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
                  >
                    <svg
                      aria-hidden="true"
                      className="shrink-0 text-accent"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M2.5 7l3 3 6-6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Automatyzacja CRM
                  </Link>
                </li>
                <li>
                  <Link
                    href="/automatyzacja-leadow"
                    className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
                  >
                    <svg
                      aria-hidden="true"
                      className="shrink-0 text-accent"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M2.5 7l3 3 6-6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Automatyzacja leadów
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Scraping i ekstrakcja danych",
            description:
              "Wyciągam strukturalne dane ze stron, PDF-ów, maili i dokumentów. AI rozpoznaje pola, walidacja w czasie rzeczywistym, pipeline do CRM lub arkusza.",
            provider: { "@id": "https://fluxlab.pl/#organization" },
            areaServed: { "@type": "Country", name: "Polska" },
            serviceType: "Scraping i ekstrakcja danych",
            url: "https://fluxlab.pl/scraping-danych",
          }),
        }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />

      <Footer />
    </>
  );
}
