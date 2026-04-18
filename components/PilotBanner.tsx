import TrackedCTA from "@/components/TrackedCTA";

export default function PilotBanner() {
  return (
    <section className="py-6 lg:py-8">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 via-accent/10 to-accent/5 dark:from-accent/10 dark:via-accent/15 dark:to-accent/10 p-6 lg:p-8">
          <div
            className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, #6366f1 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                Program pilotażowy · 3 miejsca
              </div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                50% taniej dla pierwszych 3 klientów
              </h2>
              <p className="mt-1.5 text-sm lg:text-base text-gray-600 dark:text-gray-400 max-w-2xl">
                Wdrożenie w pełnym zakresie za połowę ceny w zamian za case
                study i referencję. Bez ukrytych kosztów — płacisz tylko za
                wdrożenie.
              </p>
            </div>

            <div className="flex-shrink-0">
              <TrackedCTA
                href="/pilotaz"
                location="homepage_banner"
                label="pilotaz"
                className="btn-primary inline-flex items-center gap-2 text-sm px-6 py-3 whitespace-nowrap"
              >
                Zobacz warunki pilotażu
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="mt-px"
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
