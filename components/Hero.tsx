"use client";

import PathChooser, { usePathHover } from "@/components/PathChooser";
import TrackedCTA from "@/components/TrackedCTA";
import InteractiveWorkflow from "@/components/InteractiveWorkflow";
import RotatingSubline from "@/components/RotatingSubline";
import useParallax from "@/lib/use-parallax";

export default function Hero() {
  const { activePath, activeStats } = usePathHover();
  const blobLayer = useParallax<HTMLDivElement>({ speed: 0.15 });

  return (
    <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden bg-mesh noise-overlay">
      {/* Decorative gradient blobs — parallax layer */}
      <div
        ref={blobLayer}
        aria-hidden="true"
        className="absolute inset-0 -z-10"
      >
        <div className="blob blob-accent animate-drift-slow top-[-20%] left-[-15%] w-[600px] h-[600px]" />
        <div className="blob blob-violet animate-drift bottom-[-30%] right-[-10%] w-[500px] h-[500px]" />
        <div className="blob blob-cyan animate-drift-slow top-[20%] right-[20%] w-[350px] h-[350px] opacity-40 dark:opacity-25" />
      </div>

      <div className="container-wide relative">
        {/* Top intro */}
        <div className="max-w-4xl mx-auto text-center mb-10 lg:mb-12 px-2">
          <p className="animate-fade-up-1 section-label mb-5 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-soft-pulse" />
            Fluxlab
          </p>

          <h1
            className="display-xl animate-fade-up-2 mb-5 text-balance"
            style={{ textWrap: "balance" }}
          >
            <span className="text-gradient-flow">
              Strony, automatyzacja, dane.
            </span>
          </h1>

          <p className="animate-fade-up-3 text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto mb-3">
            Trzy ścieżki, jeden cel: mniej ręcznej pracy, więcej rzeczy
            zrobionych.
          </p>

          <p className="animate-fade-up-3 text-base lg:text-lg text-gray-500 dark:text-gray-500 max-w-2xl mx-auto">
            Robię to <RotatingSubline />.
          </p>
        </div>

        {/* Interactive workflow — działający pipeline */}
        <div className="animate-fade-up-4 relative mb-12 lg:mb-16">
          <div
            aria-hidden="true"
            className="absolute inset-x-8 -inset-y-2 -z-10 rounded-[2rem] bg-accent/10 blur-3xl"
          />
          <InteractiveWorkflow />
        </div>

        {/* 3 karty filarów */}
        <div className="max-w-5xl mx-auto mb-10 lg:mb-14">
          <PathChooser />
        </div>

        {/* Secondary CTA */}
        <div className="animate-fade-up-4 text-center mb-16 lg:mb-20">
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">
            Nie wiesz, co automatyzować?
          </p>
          <TrackedCTA
            href="#co-automatyzowac"
            location="hero"
            label="what_to_automate"
            eventName="cta_click_hero_what_to_automate"
            className="btn-secondary text-base"
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
