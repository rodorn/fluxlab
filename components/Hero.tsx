import Image from "next/image";
import TrackedCTA from "@/components/TrackedCTA";

export default function Hero() {
  return (
    <section className="pt-20 pb-4 lg:pt-24 lg:pb-6 overflow-hidden">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - text */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent-light dark:bg-accent-dark-light text-accent text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-accent rounded-full" />
              Automatyzacja leadów, CRM i raportowania
            </div>

            {/* Headline */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-gray-900 dark:text-white">
              <span className="text-accent">Automatyzacja</span> leadów, CRM i
              raportowania dla firm B2B
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-10 max-w-xl">
              Leady z formularzy, reklam, maili i landing page&rsquo;y
              automatycznie trafiają do CRM, dostają właściciela, zadanie,
              follow-up i raport. Bez ręcznego przepisywania, bez zgubionych
              zapytań, bez Excela robionego w piątek wieczorem.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <TrackedCTA
                href="#kontakt"
                location="hero"
                label="diagnoza"
                eventName="cta_click_hero_audit"
                className="btn-primary text-base px-8 py-3.5"
              >
                Zamów bezpłatną diagnozę procesu
              </TrackedCTA>
              <TrackedCTA
                href="#workflow"
                location="hero"
                label="workflow"
                className="btn-secondary text-base px-8 py-3.5"
              >
                Zobacz przykładowy workflow
              </TrackedCTA>
            </div>

            {/* Social proof */}
            <p className="mt-8 text-sm text-gray-400 dark:text-gray-500">
              Odpowiedź w 24h · mapa automatyzacji · szacowany ROI · bez
              zobowiązań
            </p>
          </div>

          {/* Right - image */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
              <Image
                src="/photos/digital_eye.avif"
                alt="Wizualizacja przepływu danych"
                fill
                className="object-cover"
                priority
              />
              {/* Subtle gradient overlay to blend with page */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent mix-blend-multiply" />
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                &lt; 5 min
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                czas reakcji na leada
                <br />
                po wdrożeniu
              </p>
            </div>

            {/* Decorative dot grid */}
            <div
              className="absolute -top-4 -right-4 w-32 h-32 opacity-20 dark:opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #6366f1 1px, transparent 1px)",
                backgroundSize: "12px 12px",
              }}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="mt-6 border-t border-gray-100 dark:border-gray-800" />

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
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
              value: "ROI < 1 mies.",
              label: "dla typowego procesu z wolumenem",
            },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
