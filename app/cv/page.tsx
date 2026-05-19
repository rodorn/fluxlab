import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import CountUp from "@/components/CountUp";

export const metadata: Metadata = {
  title: "Paweł Iwanek — Software Engineer / Automation Engineer",
  description:
    "Interaktywne CV. Software Engineer z kilkuletnim doświadczeniem w Pythonie, automatyzacji procesów i przetwarzaniu danych.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/cv" },
};

const STATS = [
  { value: "5+", label: "lat doświadczenia" },
  { value: "3", label: "firmy" },
  { value: "3", label: "kluczowe projekty" },
  { value: "30000+", label: "rekordów w zbudowanej bazie" },
];

const EXPERIENCE = [
  {
    period: "04.2025 — obecnie",
    company: "Stermedia",
    role: "Software Engineer / Automation Engineer (Python)",
    points: [
      "Projektowanie i implementacja narzędzi backendowych w Pythonie wspierających procesy sprzedażowe i operacyjne",
      "Budowa i utrzymanie integracji systemów przez REST API i webhooki, w tym CRM Pipedrive",
      "Projektowanie i utrzymanie pipeline'ów przetwarzania danych: scraping, walidacja, normalizacja, synchronizacja",
      "Tworzenie narzędzi raportowych i skryptów analitycznych skracających czas raportowania",
      "Refaktoryzacja i stabilizacja rozwiązań produkcyjnych",
    ],
  },
  {
    period: "02.2022 — 04.2025",
    company: "Carmore",
    role: "Software Engineer / Automation Engineer (Python)",
    points: [
      "Automatyzacja procesów sprzedażowych i operacyjnych z wykorzystaniem Pythona",
      "Rozwój i utrzymanie integracji między CRM, systemami ofertowymi i narzędziami komunikacyjnymi",
      "Implementacja skryptów do masowego przetwarzania, walidacji i aktualizacji danych",
      "Rozwiązywanie problemów produkcyjnych w krytycznych procesach biznesowych",
      "Udział w projektowaniu rozwiązań technicznych wspierających rozwój produktu",
    ],
  },
  {
    period: "07.2020 — 02.2022",
    company: "Carberry",
    role: "Automation / Software Engineer",
    points: [
      "Tworzenie wewnętrznych narzędzi automatyzujących procesy operacyjne i sprzedażowe",
      "Integracje systemów oraz skrypty do przetwarzania danych",
      "Samodzielna realizacja zadań end-to-end w środowisku startupowym",
    ],
  },
];

const PROJECTS = [
  {
    name: "System scrapowania i selekcji ofert (Otomoto)",
    desc: "System scrapujący oferty, przetwarzanie i analiza kilkunastu tysięcy ofert dziennie, ocena atrakcyjności, synchronizacja danych i generowanie zadań dla zespołu.",
    tech: [
      "beautifulsoup4",
      "playwright",
      "selenium",
      "httpx",
      "openpyxl",
      "requests",
      "pydantic",
      "tqdm",
    ],
  },
  {
    name: "System anonimizacji zdjęć ofertowych (Photo Anonymizer)",
    desc: "Wykrywanie pojazdów, tablic rejestracyjnych i reklam; blurring i inpainting przy użyciu YOLO oraz segment-anything.",
    tech: [
      "opencv",
      "Pillow",
      "cloudinary",
      "torch",
      "segment-anything",
      "diffusers",
      "ultralytics",
      "transformers",
      "easyocr",
    ],
  },
  {
    name: "Baza danych wersji modeli samochodów",
    desc: "Budowa kompletnej bazy na podstawie danych z internetu (30000+ rekordów): pobieranie, normalizacja i walidacja danych, LLM function calling, edycje bulk SQL.",
    tech: [
      "fastapi",
      "supabase",
      "openai",
      "numpy",
      "pandas",
      "openpyxl",
      "httpx",
      "pytest",
    ],
  },
];

const SKILLS = [
  {
    category: "Web Frameworks & Servers",
    items: ["fastapi", "uvicorn", "flask", "websockets"],
  },
  {
    category: "Bazy danych & ORM",
    items: ["SQL", "supabase", "PostgreSQL", "SQLAlchemy", "MongoDB"],
  },
  {
    category: "AI / Machine Learning",
    items: [
      "torch",
      "transformers",
      "ultralytics",
      "easyocr",
      "segment-anything",
      "langchain",
      "langgraph",
      "tensorflow",
      "scikit",
    ],
  },
  {
    category: "Data Science & Analiza",
    items: ["numpy", "pandas", "openpyxl"],
  },
  {
    category: "Web Scraping",
    items: [
      "beautifulsoup4",
      "lxml",
      "playwright",
      "selenium",
      "aiohttp",
      "requests",
      "httpx",
      "urllib3",
      "tqdm",
    ],
  },
  {
    category: "Walidacja & Konfiguracja",
    items: ["pydantic", "python-dotenv", "easydict", "pytest", "black"],
  },
  {
    category: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Tailwind", "Vite"],
  },
];

const STACK = [
  "JetBrains IDE",
  "Linux (Arch)",
  "Claude Code (+speckit)",
  "Neovim (podstawy)",
  "Docker",
  "Git",
  "GitLab",
  "GitHub",
];

const LANGUAGES = [
  { name: "Angielski", level: "B2", pct: 78 },
  { name: "Niemiecki", level: "A2", pct: 32 },
];

const TRAINING = [
  { name: "AI_devs 2", date: "08.2024" },
  { name: "AI_devs 3", date: "03.2025" },
  { name: "Boot.dev", date: "09.2025" },
  { name: "AI_devs 4", date: "03.2026" },
];

const INTERESTS = [
  {
    name: "Motoryzacja",
    desc: "analiza rynku, modele samochodów, struktury danych i porównywanie wariantów",
  },
  {
    name: "Technologia",
    desc: "hardware, automatyzacja, sztuczna inteligencja i skalowanie rozwiązań",
  },
  {
    name: "Inwestowanie",
    desc: "analiza danych finansowych i podejmowanie decyzji w warunkach ryzyka",
  },
];

const CONTACT = [
  { label: "Warszawa", href: null },
  { label: "iwanekpawel55@gmail.com", href: "mailto:iwanekpawel55@gmail.com" },
  { label: "667 767 474", href: "tel:+48667767474" },
  { label: "fluxlab.pl", href: "https://www.fluxlab.pl" },
  { label: "gitlab.com/PawelIwanek", href: "https://gitlab.com/PawelIwanek" },
  { label: "carcost.netlify.app", href: "https://carcost.netlify.app" },
];

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="display-md text-gray-900 dark:text-white mb-8">
      {children}
    </h2>
  );
}

export default function CVPage() {
  return (
    <main className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Topbar */}
      <div className="border-b border-gray-100 dark:border-gray-800">
        <div className="container-wide flex items-center justify-between h-14">
          <Link
            href="/"
            className="text-sm font-bold tracking-tight text-gray-900 dark:text-white"
          >
            flux<span className="text-accent">lab</span>
          </Link>
          <span className="text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
            Curriculum Vitae
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-mesh">
        <div
          aria-hidden="true"
          className="blob blob-accent animate-drift-slow -z-10 top-[-30%] left-[-10%] w-[520px] h-[520px]"
        />
        <div
          aria-hidden="true"
          className="blob blob-violet animate-drift -z-10 bottom-[-40%] right-[-10%] w-[440px] h-[440px]"
        />
        <div className="container-wide relative py-16 lg:py-20">
          <div className="grid lg:grid-cols-[auto,1fr] gap-8 lg:gap-12 items-start">
            {/* Zdjęcie */}
            <div className="flex-shrink-0">
              <div className="relative w-32 lg:w-44 aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-gray-200 dark:ring-white/10 shadow-xl shadow-accent/15">
                <Image
                  src="/pawel.webp"
                  alt="Paweł Iwanek"
                  fill
                  sizes="(min-width: 1024px) 176px, 128px"
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <p className="section-label mb-3 animate-fade-up-1">
                Software Engineer · Automation Engineer
              </p>
              <h1 className="display-xl text-gray-900 dark:text-white mb-5 animate-fade-up-2">
                Paweł Iwanek
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mb-7 animate-fade-up-3">
                Software Engineer z kilkuletnim doświadczeniem w projektowaniu,
                wdrażaniu i utrzymaniu systemów backendowych w Pythonie.
                Specjalizuję się w automatyzacji procesów biznesowych,
                przetwarzaniu danych na dużą skalę oraz integracjach systemów
                zewnętrznych. Chętnie sięgam po algorytmy, metody numeryczne i
                rozwiązania oparte na matematyce tam, gdzie złożoność problemu
                tego wymaga.
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 animate-fade-up-4">
                {CONTACT.map((c) =>
                  c.href ? (
                    <a
                      key={c.label}
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        c.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
                    >
                      {c.label}
                    </a>
                  ) : (
                    <span
                      key={c.label}
                      className="text-sm font-medium text-gray-500 dark:text-gray-400"
                    >
                      {c.label}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 border-t border-gray-200/70 dark:border-gray-800 pt-8 animate-fade-up-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="stat-number text-gradient-flow">
                  <CountUp value={s.value} />
                </p>
                <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 leading-snug">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doświadczenie — timeline */}
      <section className="container-wide py-16 lg:py-20">
        <RevealOnScroll>
          <SectionTitle>Doświadczenie</SectionTitle>
        </RevealOnScroll>
        <div className="relative">
          {/* Pionowa linia */}
          <div
            aria-hidden="true"
            className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-accent via-violet-500 to-transparent"
          />
          <div className="space-y-10">
            {EXPERIENCE.map((job, idx) => (
              <RevealOnScroll
                key={job.company}
                delay={Math.min(idx + 1, 4) as 1 | 2 | 3 | 4}
              >
                <div className="relative pl-10">
                  {/* Node */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-accent ring-4 ring-white dark:ring-gray-950"
                  />
                  <p className="text-xs font-mono uppercase tracking-widest text-accent mb-1">
                    {job.period}
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {job.company}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                    {job.role}
                  </p>
                  <ul className="space-y-2">
                    {job.points.map((p) => (
                      <li
                        key={p}
                        className="flex gap-2.5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                      >
                        <span className="text-accent mt-1.5 shrink-0 w-1 h-1 rounded-full bg-accent" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Kluczowe projekty */}
      <section className="bg-gray-50 dark:bg-gray-900/40 border-y border-gray-100 dark:border-gray-800">
        <div className="container-wide py-16 lg:py-20">
          <RevealOnScroll>
            <SectionTitle>Kluczowe projekty</SectionTitle>
          </RevealOnScroll>
          <div className="grid lg:grid-cols-3 gap-6">
            {PROJECTS.map((proj, idx) => (
              <RevealOnScroll
                key={proj.name}
                delay={Math.min(idx + 1, 4) as 1 | 2 | 3 | 4}
              >
                <div className="card-lift h-full flex flex-col bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 dark:text-white leading-snug mb-2">
                    {proj.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-1">
                    {proj.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono px-2 py-0.5 rounded-md bg-accent/10 text-accent"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Umiejętności */}
      <section className="container-wide py-16 lg:py-20">
        <RevealOnScroll>
          <SectionTitle>Umiejętności</SectionTitle>
        </RevealOnScroll>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-7">
          {SKILLS.map((group, idx) => (
            <RevealOnScroll
              key={group.category}
              delay={(Math.min(idx, 3) + 1) as 1 | 2 | 3 | 4}
            >
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm font-mono px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 transition-all duration-200 hover:border-accent hover:text-accent hover:-translate-y-0.5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Dół — 2 kolumny */}
      <section className="bg-gray-50 dark:bg-gray-900/40 border-t border-gray-100 dark:border-gray-800">
        <div className="container-wide py-16 lg:py-20 grid lg:grid-cols-2 gap-x-14 gap-y-12">
          {/* Lewa: wykształcenie + języki + szkolenia */}
          <div className="space-y-12">
            <RevealOnScroll>
              <div>
                <SectionTitle>Wykształcenie</SectionTitle>
                <p className="text-xs font-mono uppercase tracking-widest text-accent mb-1">
                  10.2019 — 04.2023
                </p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Szkoła Główna Handlowa
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Metody Ilościowe w Ekonomii i Systemy Informacyjne
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={1}>
              <div>
                <SectionTitle>Języki</SectionTitle>
                <div className="space-y-4 max-w-sm">
                  {LANGUAGES.map((lang) => (
                    <div key={lang.name}>
                      <div className="flex items-baseline justify-between mb-1.5">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {lang.name}
                        </span>
                        <span className="text-xs font-mono text-accent">
                          {lang.level}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-accent to-violet-500"
                          style={{ width: `${lang.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={2}>
              <div>
                <SectionTitle>Szkolenia</SectionTitle>
                <ul className="space-y-2">
                  {TRAINING.map((t) => (
                    <li
                      key={t.name}
                      className="flex items-baseline gap-3 text-sm"
                    >
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {t.name}
                      </span>
                      <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
                        {t.date}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          </div>

          {/* Prawa: stack + zainteresowania */}
          <div className="space-y-12">
            <RevealOnScroll delay={1}>
              <div>
                <SectionTitle>Stack technologiczny</SectionTitle>
                <div className="flex flex-wrap gap-2">
                  {STACK.map((s) => (
                    <span
                      key={s}
                      className="text-sm px-3 py-1.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-200 hover:border-accent hover:text-accent hover:-translate-y-0.5"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={2}>
              <div>
                <SectionTitle>Zainteresowania</SectionTitle>
                <div className="space-y-4">
                  {INTERESTS.map((i) => (
                    <div
                      key={i.name}
                      className="card-lift bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4"
                    >
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {i.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                        {i.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Stopka — klauzula RODO */}
      <footer className="container-wide py-8">
        <p className="text-[11px] leading-relaxed text-gray-400 dark:text-gray-600 max-w-3xl">
          Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb
          niezbędnych do realizacji procesu rekrutacji zgodnie z Rozporządzeniem
          Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016
          r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych
          osobowych i w sprawie swobodnego przepływu takich danych oraz
          uchylenia dyrektywy 95/46/WE (RODO).
        </p>
      </footer>
    </main>
  );
}
