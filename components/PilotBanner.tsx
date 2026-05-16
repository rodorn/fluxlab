import TrackedCTA from "@/components/TrackedCTA";

export default function PilotBanner() {
  return (
    <section
      id="program-case-study"
      aria-labelledby="pilot-banner-heading"
      className="py-6 lg:py-8 scroll-mt-16"
    >
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-2xl border border-accent/30 dark:border-accent/30 glow-accent bg-gradient-to-br from-accent/[0.07] via-violet-500/10 to-cyan-500/[0.07] dark:from-accent/15 dark:via-violet-500/15 dark:to-cyan-500/10 p-6 lg:p-8">
          {/* Animowane bloby — temperatura banera */}
          <div className="blob blob-accent w-72 h-72 -top-28 -left-24 animate-drift" />
          <div className="blob blob-violet w-64 h-64 -bottom-28 right-1/4 animate-drift-slow" />
          <div className="blob blob-cyan w-60 h-60 -top-24 -right-20 animate-drift-slow" />

          {/* Siatka kropek */}
          <div
            className="absolute inset-0 opacity-[0.05] dark:opacity-[0.09] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, #6366f1 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          {/* Górny akcentowy pasek */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-violet-500 to-cyan-400" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 shadow-sm shadow-accent/40">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                Program case study · 3 miejsca
              </div>
              <h2
                id="pilot-banner-heading"
                className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white tracking-tight"
              >
                3 miejsca na publiczne case study —{" "}
                <span className="text-gradient-flow">50% ceny wdrożenia</span>
              </h2>
              <p className="mt-1.5 text-sm lg:text-base text-gray-600 dark:text-gray-400 max-w-2xl">
                Szukam 3 firm B2B z realnym procesem do automatyzacji, które
                zgodzą się pokazać efekt wdrożenia jako case study. W zamian
                dostajesz pełny zakres prac za 50% standardowej ceny,
                rozszerzone wsparcie po wdrożeniu i priorytetową obsługę.
                Publikujemy tylko to, co zaakceptujesz.
              </p>
            </div>

            <div className="flex-shrink-0">
              <TrackedCTA
                href="/pilotaz"
                location="homepage_banner"
                label="pilotaz"
                eventName="cta_click_pilot"
                className="btn-primary group/cta inline-flex items-center gap-2 text-sm px-6 py-3 whitespace-nowrap shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 transition-shadow"
              >
                Aplikuj do programu case study
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="mt-px transition-transform duration-300 ease-out group-hover/cta:translate-x-1"
                  aria-hidden="true"
                >
                  <path
                    d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </TrackedCTA>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
