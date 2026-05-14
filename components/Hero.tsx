import Image from "next/image";
import TrackedCTA from "@/components/TrackedCTA";

export default function Hero() {
  return (
    <section className="relative pt-20 pb-8 lg:pt-28 lg:pb-12 overflow-hidden bg-mesh noise-overlay">
      {/* Decorative gradient blobs — wyciszone, nie konkurują z tekstem */}
      <div
        aria-hidden="true"
        className="blob blob-accent animate-drift-slow -z-10 top-[-15%] left-[-15%] w-[600px] h-[600px]"
      />
      <div
        aria-hidden="true"
        className="blob blob-violet animate-drift -z-10 bottom-[-25%] right-[-10%] w-[500px] h-[500px]"
      />
      <div
        aria-hidden="true"
        className="blob blob-cyan animate-drift-slow -z-10 top-[30%] right-[30%] w-[300px] h-[300px] opacity-40 dark:opacity-25"
      />

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left - text */}
          <div className="lg:col-span-7">
            {/* Badge */}
            <div className="animate-fade-up-1 inline-flex items-center gap-2 glass-card text-accent text-xs font-semibold px-3 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-soft-pulse" />
              Automatyzacja leadów, CRM i raportowania dla firm B2B
            </div>

            {/* Headline — 2 linie, czytelna skala */}
            <h1 className="display-xl animate-fade-up-2 mb-8 text-gray-900 dark:text-white">
              <span className="text-gradient-flow">Automatyzacja</span> leadów,
              CRM i raportowania.
            </h1>

            {/* Subheadline */}
            <p className="animate-fade-up-3 text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-10 max-w-2xl">
              Lead z formularza, reklamy lub maila trafia do CRM, dostaje
              właściciela, zadanie, follow-up i raport. Bez ręcznego
              przepisywania, bez zgubionych zapytań, bez Excela robionego w
              piątek wieczorem.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up-4 flex flex-col sm:flex-row gap-4">
              <TrackedCTA
                href="#kontakt"
                location="hero"
                label="diagnoza"
                eventName="cta_click_hero_audit"
                className="btn-primary text-base px-8 py-4"
              >
                Zamów bezpłatną diagnozę procesu
              </TrackedCTA>
              <TrackedCTA
                href="#workflow"
                location="hero"
                label="workflow"
                className="btn-secondary text-base px-8 py-4"
              >
                Zobacz przykładowy workflow
              </TrackedCTA>
            </div>

            {/* Social proof */}
            <p className="animate-fade-up-4 mt-8 text-sm text-gray-500 dark:text-gray-500">
              Odpowiedź w 24h · mapa automatyzacji · szacowany ROI · bez
              zobowiązań
            </p>
          </div>

          {/* Right - image */}
          <div className="lg:col-span-5 relative hidden lg:block animate-fade-up-3">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl ring-1 ring-gray-900/5 dark:ring-white/10">
              <Image
                src="/photos/digital_eye.avif"
                alt="Wizualizacja przepływu danych w automatyzacji procesów B2B"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/35 via-violet-500/15 to-transparent mix-blend-multiply dark:mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-950/30" />

              {/* Floating stat — wewnątrz image div, nie wystaje na tekst */}
              <div className="absolute bottom-5 left-5 right-5 glass-card rounded-2xl p-4">
                <p className="stat-number text-gradient-accent">&lt; 5 min</p>
                <p className="text-xs text-gray-700 dark:text-gray-200 mt-1 leading-snug font-medium">
                  czas reakcji na leada po wdrożeniu
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="animate-fade-up-4 mt-20 lg:mt-28 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 border-t border-gray-200/60 dark:border-gray-800/60 pt-10">
          {[
            {
              value: "60-90%",
              label: "mniej ręcznej pracy w zautomatyzowanych krokach",
            },
            {
              value: "2-4 dni",
              label: "czas wdrożenia pierwszej automatyzacji",
            },
            {
              value: "< 5 min",
              label: "czas reakcji na nowego leada",
            },
            {
              value: "1–3 mies.",
              label: "ROI dla procesów z dużym wolumenem ręcznej pracy",
            },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="stat-number text-gradient-accent">{stat.value}</p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
