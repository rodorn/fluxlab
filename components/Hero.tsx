"use client";

import PathChooser, { usePathHover } from "@/components/PathChooser";
import TrackedCTA from "@/components/TrackedCTA";

export default function Hero() {
  const { activePath, activeStats } = usePathHover();

  return (
    <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden bg-mesh noise-overlay">
      {/* Decorative gradient blobs */}
      <div
        aria-hidden="true"
        className="blob blob-accent animate-drift-slow -z-10 top-[-20%] left-[-15%] w-[600px] h-[600px]"
      />
      <div
        aria-hidden="true"
        className="blob blob-violet animate-drift -z-10 bottom-[-30%] right-[-10%] w-[500px] h-[500px]"
      />
      <div
        aria-hidden="true"
        className="blob blob-cyan animate-drift-slow -z-10 top-[20%] right-[20%] w-[350px] h-[350px] opacity-40 dark:opacity-25"
      />

      <div className="container-wide relative">
        {/* Top intro — krótki, klarowny */}
        <div className="max-w-4xl mx-auto text-center mb-12 lg:mb-16 px-2">
          <p className="animate-fade-up-1 section-label mb-5 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-soft-pulse" />
            Fluxlab
          </p>

          <h1
            className="display-xl animate-fade-up-2 mb-6 text-balance"
            style={{ textWrap: "balance" }}
          >
            <span className="text-gradient-flow">
              Strony, automatyzacja, dane.
            </span>
          </h1>

          <p className="animate-fade-up-3 text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Trzy ścieżki, jeden cel: mniej ręcznej pracy, więcej rzeczy
            zrobionych. Wybierz, w którym obszarze potrzebujesz pomocy — albo
            zamów bezpłatną diagnozę, jeśli nie wiesz, od czego zacząć.
          </p>
        </div>

        {/* 3 karty filarów — centralna część */}
        <div className="max-w-5xl mx-auto mb-10 lg:mb-14">
          <PathChooser />
        </div>

        {/* Secondary CTA — dla niezdecydowanych */}
        <div className="animate-fade-up-4 text-center mb-16 lg:mb-20">
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">
            Nie wiesz, co automatyzować?
          </p>
          <TrackedCTA
            href="#co-automatyzowac"
            location="hero"
            label="what_to_automate"
            eventName="cta_click_hero_what_to_automate"
            className="btn-secondary text-base px-6 py-3"
          >
            Pokaż mi sygnały, że warto →
          </TrackedCTA>
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-4">
            Albo od razu:{" "}
            <a
              href="#kontakt"
              className="text-accent hover:text-accent-hover underline underline-offset-2"
            >
              zamów bezpłatną diagnozę
            </a>{" "}
            · odpowiedź w 24h
          </p>
        </div>

        {/* Stats — reagują na hover/focus PathChooser */}
        <div className="animate-fade-up-4 border-t border-gray-200/60 dark:border-gray-800/60 pt-10">
          <p
            className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 text-center mb-6"
            aria-live="polite"
          >
            {activePath === "web" && "Strony WWW · liczby"}
            {activePath === "crm" && "Automatyzacja CRM · liczby"}
            {activePath === "scraping" && "Scraping danych · liczby"}
            {activePath === null && "Co wnoszę do projektu"}
          </p>
          <div
            key={activePath ?? "default"}
            className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 animate-fade-up"
          >
            {activeStats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <p className="stat-number text-gradient-flow">{stat.value}</p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
