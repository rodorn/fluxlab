import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";
import TrackedCTA from "@/components/TrackedCTA";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Tworzenie stron WWW i poprawki w obecnych — Fluxlab",
  description:
    "Nowa strona albo poprawki w obecnej. Szybko, mobilnie, z AI w treści, obrazach i kodzie. Hosting w cenie wdrożenia. Pierwsza wersja w 2-3 tygodnie.",
  alternates: { canonical: "/strony-www" },
  openGraph: {
    title: "Tworzenie stron WWW i poprawki w obecnych — Fluxlab",
    description: "Nowa strona albo poprawki w obecnej. Szybko, mobilnie, z AI.",
    locale: "pl_PL",
    type: "website",
  },
};

const newSiteSituations = [
  "Startujesz firmę i nie masz jeszcze strony.",
  "Masz stronę zrobioną przez znajomego w 2018 i wstyd ją pokazać.",
  "Potrzebujesz landing page pod konkretną kampanię reklamową.",
  "Budujesz nowy produkt i chcesz stronę produktową.",
];

const fixesSituations = [
  "Wolno się ładuje — Web Vitals w czerwieni, klienci uciekają.",
  "Nie wygląda na telefonie — układ się rozjeżdża, przyciski za małe.",
  "Trudno zaktualizować treść — każda zmiana to telefon do programisty.",
  "Formularz nie działa albo zgłoszenia nigdzie nie wpadają.",
];

const deliverables = [
  {
    title: "Diagnoza i koncepcja",
    description:
      "Ustalamy cel strony, grupę odbiorców, jakie sekcje są potrzebne i co dokładnie ma się znaleźć. Wychodzi z tego prosta mapa strony i lista treści do przygotowania.",
  },
  {
    title: "Projekt graficzny",
    description:
      "UI w Figma, na bazie identyfikacji wizualnej Twojej firmy albo prostego systemu kolorów dobranego pod branżę. Dwie rundy poprawek w cenie.",
  },
  {
    title: "Wdrożenie",
    description:
      "Next.js + Tailwind, mobile-first, optymalizacja Web Vitals. Hosting na Vercel (free tier wystarczy dla większości stron) albo na Twojej infrastrukturze.",
  },
  {
    title: "Treści + AI",
    description:
      "Pomoc w napisaniu tekstów (z Twoim briefem jako input do AI), wygenerowanie ilustracji i ikon, podstawowy SEO: meta, schema, struktura nagłówków.",
  },
];

const aiAreas = [
  {
    title: "Teksty",
    description:
      "Claude i GPT do generowania treści sekcji, ofert, opisów produktów, FAQ i postów na bloga. Twój brief idzie jako kontekst, AI proponuje warianty, Ty wybierasz i edytujesz.",
  },
  {
    title: "Obrazy",
    description:
      "Midjourney, DALL-E i Stable Diffusion do ilustracji, ikon, zdjęć produktowych i grafik OpenGraph. Bez kupowania stockowych zdjęć, które wyglądają jak wszystkie inne.",
  },
  {
    title: "Kod",
    description:
      "Copilot i Claude w edytorze przyspieszają implementację. Krótsze iteracje, szybsze poprawki, mniej żmudnego pisania boilerplate.",
  },
  {
    title: "SEO",
    description:
      "Analiza luk treściowych vs konkurencja, optymalizacja meta opisów, generowanie schema.org dla treści. Punkt wyjścia, nie cudowne triki na pozycjonowanie.",
  },
];

const stackBadges = [
  "Next.js 16",
  "Tailwind CSS",
  "TypeScript",
  "Vercel",
  "Figma",
  "Resend (formularze)",
];

const processSteps = [
  {
    label: "Krok 1",
    title: "Diagnoza",
    description:
      "Krótka rozmowa: po co Ci strona, kto ma na nią trafiać, czego oczekujesz. 30-45 min, bez zobowiązań.",
  },
  {
    label: "Krok 2",
    title: "Brief i wycena",
    description:
      "Spisuję zakres prac, sekcje, harmonogram i stałą cenę. Jeśli się zgadzamy — startujemy.",
  },
  {
    label: "Krok 3",
    title: "Projekt",
    description:
      "UI w Figma, dwie rundy poprawek. Treści powstają równolegle — moja propozycja, Twoja akceptacja.",
  },
  {
    label: "Krok 4",
    title: "Wdrożenie i live",
    description:
      "Kod, deployment, podpięcie domeny, formularze, testy mobile. Strona wchodzi na produkcję.",
  },
];

const pricingTracks = [
  {
    label: "Start",
    title: "Diagnoza",
    price: "0 zł",
    description:
      "Bezpłatna rozmowa: czy w ogóle warto, co i jak najlepiej zrobić w Twoim przypadku. Bez wciskania.",
    bullets: [
      "30-45 min rozmowy",
      "ocena potrzeby i zakresu",
      "rekomendacja punktu startu",
      "orientacyjne widełki kosztu",
    ],
    cta: "Zamów bezpłatną diagnozę",
    accent: false,
  },
  {
    label: "Pakiet A",
    title: "Landing page",
    price: "od 2 500 zł",
    description:
      "Jedna strona pod konkretny cel: kampania, premiera produktu, lead magnet. Z formularzem kontaktowym i deploymentem.",
    bullets: [
      "1 strona, do 6 sekcji",
      "formularz kontaktowy (Resend)",
      "deploy na Vercel + domena",
      "podstawowy SEO i OG",
    ],
    cta: "Wycena landing page",
    accent: true,
  },
  {
    label: "Pakiet B",
    title: "Strona firmowa",
    price: "od 4 500 zł",
    description:
      "Pełna strona z 5+ podstronami, blogiem, CMS-em do samodzielnej edycji treści. Dla firm, które chcą się prezentować poważnie.",
    bullets: [
      "5+ podstron, struktura serwisu",
      "blog + CMS (Sanity / Notion)",
      "deploy, domena, formularze",
      "SEO, schema, analytics",
    ],
    cta: "Wycena strony firmowej",
    accent: false,
  },
];

const faq = [
  {
    question: "W jakiej technologii budujesz?",
    answer:
      "Next.js 16 + Tailwind CSS + TypeScript. Standard branżowy używany przez tysiące firm, łatwo modyfikowalny, dobrze zoptymalizowany pod Web Vitals. Bez ezoterycznych frameworków, które za rok nie będą wspierane.",
  },
  {
    question: "Ile czasu zajmuje wdrożenie?",
    answer:
      "Landing page: 2-3 tygodnie od briefa do live. Strona firmowa z 5+ podstronami: 3-5 tygodni. Czas zależy głównie od tego, jak szybko dostaję treści i decyzje po Twojej stronie.",
  },
  {
    question: "Czy mogę modyfikować treści samodzielnie?",
    answer:
      "Tak. Dla strony firmowej podpinam prosty CMS (Sanity albo Notion-as-CMS) — edytujesz teksty jak dokument. Dla landing page-a treści są w plikach na GitHubie, edycja przez interfejs GitHuba zajmuje minutę.",
  },
  {
    question: "Hosting i domena?",
    answer:
      "Hosting w cenie wdrożenia — Vercel ma darmowy plan, który wystarcza dla większości stron firmowych. Domenę kupujesz na siebie (orientacyjnie 50-150 zł/rok), mogę pomóc w rejestracji i konfiguracji DNS.",
  },
  {
    question: "Jak wygląda płatność?",
    answer:
      "50% przed startem prac (po akceptacji briefa i wyceny), 50% przy odbiorze i wdrożeniu na produkcję. Faktura, JDG ryczałt — bez VAT.",
  },
  {
    question: "A jeśli mam już stronę i chcę tylko poprawki?",
    answer:
      "Robię audyt techniczno-treściowy (płatny, ok. 800 zł, odliczam od wdrożenia jeśli idziemy dalej): wskazuję co warto poprawić, w jakiej kolejności i ile to potrwa. Mniejsze poprawki od 1 500 zł.",
  },
];

export default function StronyWww() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs items={[{ label: "Strony WWW" }]} />

        {/* Hero */}
        <section
          aria-labelledby="hero-heading"
          className="relative pt-28 pb-16 overflow-hidden"
        >
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <div className="blob blob-accent w-[520px] h-[520px] -top-32 -left-32 animate-drift" />
            <div className="blob blob-violet w-[480px] h-[480px] top-20 -right-24 animate-drift-slow" />
          </div>
          <div className="container-wide">
            <div className="max-w-4xl">
              <p className="section-label mb-4 animate-fade-up-1">
                Strony WWW · Fluxlab
              </p>
              <h1
                id="hero-heading"
                className="display-xl text-gray-900 dark:text-white mb-6 animate-fade-up-2"
              >
                Tworzę strony, które naprawdę działają — szybko, mobilnie, z AI.
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl leading-relaxed animate-fade-up-3">
                Nowa strona od zera albo poprawki w istniejącej. Pierwsza wersja
                w 2-3 tygodnie. Web Vitals 90+, mobile-first, AI do tekstów i
                obrazów — żebyś nie spędził dwóch miesięcy na pisaniu treści.
              </p>
              <div className="flex flex-wrap gap-3 animate-fade-up-4">
                <TrackedCTA
                  href="#diagnoza"
                  location="strony_www_hero"
                  className="btn-primary"
                >
                  Zamów bezpłatną diagnozę
                </TrackedCTA>
                <TrackedCTA
                  href="#przyklady"
                  location="strony_www_hero_examples"
                  className="btn-secondary"
                >
                  Zobacz przykładowe realizacje
                </TrackedCTA>
              </div>
            </div>
          </div>
        </section>

        {/* Dla kogo */}
        <section
          aria-labelledby="dla-kogo-heading"
          className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800"
        >
          <div className="container-wide">
            <RevealOnScroll className="max-w-2xl mb-12">
              <p className="section-label mb-3">Dla kogo</p>
              <h2
                id="dla-kogo-heading"
                className="display-lg text-gray-900 dark:text-white mb-4"
              >
                Dwa typowe scenariusze
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Albo budujesz coś nowego, albo coś istniejącego wymaga remontu.
                W obu przypadkach pierwszym krokiem jest rozmowa.
              </p>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              <RevealOnScroll
                delay={1}
                className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 lg:p-8"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
                  Potrzebuję nowej strony
                </h3>
                <ul className="space-y-3">
                  {newSiteSituations.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <svg
                        className="flex-shrink-0 mt-0.5 text-accent"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 8l3.5 3.5L13 5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </RevealOnScroll>

              <RevealOnScroll
                delay={2}
                className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 lg:p-8"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
                  Mam stronę, ale...
                </h3>
                <ul className="space-y-3">
                  {fixesSituations.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <svg
                        className="flex-shrink-0 mt-0.5 text-accent"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 8l3.5 3.5L13 5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* Co dostajesz */}
        <section
          aria-labelledby="co-dostajesz-heading"
          className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800"
        >
          <div className="container-wide">
            <RevealOnScroll className="max-w-2xl mb-12">
              <p className="section-label mb-3">Co dostajesz</p>
              <h2
                id="co-dostajesz-heading"
                className="display-lg text-gray-900 dark:text-white mb-4"
              >
                Cztery etapy, jeden efekt
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Diagnoza → projekt → wdrożenie → treści. Każdy etap ma jasny
                rezultat, który widzisz, zanim ruszymy z następnym.
              </p>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
              {deliverables.map((item, idx) => (
                <RevealOnScroll
                  key={item.title}
                  delay={Math.min(idx + 1, 4) as 1 | 2 | 3 | 4}
                  className="card-lift bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 lg:p-7"
                >
                  <div className="flex items-start gap-4">
                    <span className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-accent/10 text-accent text-sm font-bold">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* AI w stronach */}
        <section aria-labelledby="ai-heading" className="py-16 lg:py-24">
          <div className="container-wide">
            <RevealOnScroll className="max-w-2xl mb-12">
              <p className="section-label mb-3">AI w stronach</p>
              <h2
                id="ai-heading"
                className="display-lg text-gray-900 dark:text-white mb-4"
              >
                Co używam z AI przy budowie
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                AI nie zastępuje myślenia, ale skraca rzeczy żmudne: pisanie
                rutynowych tekstów, generowanie ilustracji, boilerplate w
                kodzie. Dzięki temu strona kosztuje mniej i powstaje szybciej.
              </p>
            </RevealOnScroll>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {aiAreas.map((area, idx) => (
                <RevealOnScroll
                  key={area.title}
                  delay={Math.min(idx + 1, 4) as 1 | 2 | 3 | 4}
                  className="card-lift bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 lg:p-6"
                >
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                    {area.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {area.description}
                  </p>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Stack */}
        <section
          aria-labelledby="stack-heading"
          className="py-12 lg:py-16 border-t border-gray-100 dark:border-gray-800"
        >
          <div className="container-wide">
            <div className="max-w-3xl">
              <p className="section-label mb-3">Stack</p>
              <h2
                id="stack-heading"
                className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4"
              >
                Standardy branżowe, bez egzotyki
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Używam stacka, który zna każdy frontendowiec. Strona zbudowana
                tak, że jutro możesz przekazać kod komuś innemu albo modyfikować
                ją samodzielnie, bez konieczności uczenia się czyjegoś
                autorskiego frameworka.
              </p>
              <div className="flex flex-wrap gap-2">
                {stackBadges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Proces */}
        <section
          aria-labelledby="proces-heading"
          className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800"
        >
          <div className="container-wide">
            <RevealOnScroll className="max-w-2xl mb-12">
              <p className="section-label mb-3">Proces</p>
              <h2
                id="proces-heading"
                className="display-lg text-gray-900 dark:text-white mb-4"
              >
                Od pierwszego kontaktu do live
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                2-3 tygodnie dla standardowej landing page, 3-5 tygodni dla
                strony firmowej z 5+ podstronami. Bez ślepych zaułków — wiesz,
                gdzie jesteśmy w każdym momencie.
              </p>
            </RevealOnScroll>

            <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {processSteps.map((step, idx) => (
                <RevealOnScroll
                  key={step.title}
                  delay={Math.min(idx + 1, 4) as 1 | 2 | 3 | 4}
                  as="li"
                  className="relative bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                    {step.label}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </RevealOnScroll>
              ))}
            </ol>
          </div>
        </section>

        {/* Cennik */}
        <section
          id="przyklady"
          aria-labelledby="cennik-heading"
          className="scroll-mt-16 py-16 lg:py-24"
        >
          <div className="container-wide">
            <RevealOnScroll className="max-w-2xl mb-12">
              <p className="section-label mb-3">Cennik</p>
              <h2
                id="cennik-heading"
                className="display-lg text-gray-900 dark:text-white mb-4"
              >
                Trzy ścieżki
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Od bezpłatnej diagnozy po stronę firmową z blogiem. Ceny
                widełkowe — finalna wycena po krótkiej rozmowie, kiedy znam
                zakres i specyfikę projektu.
              </p>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
              {pricingTracks.map((track, idx) => (
                <RevealOnScroll
                  key={track.title}
                  delay={Math.min(idx + 1, 4) as 1 | 2 | 3 | 4}
                  className={`card-lift flex flex-col bg-white dark:bg-gray-800/60 border rounded-2xl p-6 lg:p-7 ${
                    track.accent
                      ? "border-accent shadow-lg shadow-accent/10 ring-1 ring-accent/30"
                      : "border-gray-100 dark:border-gray-700"
                  }`}
                >
                  <span
                    className={`text-xs font-semibold uppercase tracking-widest mb-3 ${
                      track.accent
                        ? "text-accent"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {track.label}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {track.title}
                  </h3>
                  <p className="text-2xl lg:text-3xl font-bold text-accent mb-4">
                    {track.price}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                    {track.description}
                  </p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {track.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <svg
                          className="flex-shrink-0 mt-0.5 text-accent"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M2.5 7l3 3 6-6"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <TrackedCTA
                    href="#diagnoza"
                    location={`strony_www_pricing_${track.title}`}
                    className={
                      track.accent
                        ? "btn-primary w-full"
                        : "btn-secondary w-full"
                    }
                  >
                    {track.cta}
                  </TrackedCTA>
                </RevealOnScroll>
              ))}
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-8 max-w-2xl">
              Wycena indywidualna jeśli scope jest niestandardowy — np. sklep,
              portal, integracja z zewnętrznymi systemami, wielojęzyczność.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section
          aria-labelledby="faq-heading"
          className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800"
        >
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <RevealOnScroll>
                <p className="section-label mb-3">FAQ</p>
                <h2
                  id="faq-heading"
                  className="display-lg text-gray-900 dark:text-white mb-8"
                >
                  Najczęstsze pytania
                </h2>
              </RevealOnScroll>
              <div className="space-y-4">
                {faq.map((item, idx) => (
                  <details
                    key={idx}
                    className="group bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl"
                  >
                    <summary className="flex items-center justify-between gap-4 cursor-pointer p-6 text-sm font-semibold text-gray-900 dark:text-white select-none [&::-webkit-details-marker]:hidden list-none">
                      {item.question}
                      <svg
                        className="shrink-0 w-5 h-5 text-gray-400 transition-transform group-open:rotate-45"
                        viewBox="0 0 20 20"
                        fill="none"
                        aria-hidden="true"
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
          className="scroll-mt-20 py-16 lg:py-20 bg-accent/10"
        >
          <div className="container-wide">
            <h2 id="diagnoza-heading" className="sr-only">
              Bezpłatna diagnoza strony WWW
            </h2>
            <LandingForm
              formId="diagnosis_web"
              heading="Bezpłatna diagnoza strony WWW"
              intro="Krótko opisz, jakiej strony potrzebujesz albo co Cię uwiera w obecnej. Wrócę w ciągu 24h z informacją, czy widzę dopasowanie i jaki kolejny krok ma sens."
              submitLabel="Zamów diagnozę"
            />
          </div>
        </section>

        {/* Related */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Powiązane filary
              </h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                <li>
                  <Link
                    href="/automatyzacja-crm"
                    className="text-sm text-accent hover:underline"
                  >
                    Automatyzacja CRM →
                  </Link>
                </li>
                <li>
                  <Link
                    href="/automatyzacja-ai"
                    className="text-sm text-accent hover:underline"
                  >
                    Automatyzacja AI →
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
            name: "Tworzenie stron WWW",
            description:
              "Tworzenie nowych stron WWW i poprawki w obecnych. Next.js, Tailwind, mobile-first, AI w treści i obrazach. Pierwsza wersja w 2-3 tygodnie.",
            provider: { "@id": "https://fluxlab.pl/#organization" },
            areaServed: { "@type": "Country", name: "Polska" },
            serviceType: "Tworzenie stron internetowych",
            url: "https://fluxlab.pl/strony-www",
            offers: [
              {
                "@type": "Offer",
                name: "Diagnoza",
                price: "0",
                priceCurrency: "PLN",
                description:
                  "Bezpłatna rozmowa diagnostyczna: czy warto, co i jak.",
              },
              {
                "@type": "Offer",
                name: "Landing page",
                price: "2500",
                priceCurrency: "PLN",
                description:
                  "Jedna strona z formularzem, deployment, podstawowy SEO.",
              },
              {
                "@type": "Offer",
                name: "Strona firmowa",
                price: "4500",
                priceCurrency: "PLN",
                description:
                  "5+ podstron, CMS, blog, deployment, SEO i schema.",
              },
            ],
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
