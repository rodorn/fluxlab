export type Pytanie = { q: string; a: string };

export default function FaqSekcja({
  pytania,
  sciezka,
  className = "",
}: {
  pytania: Pytanie[];
  sciezka: string;
  className?: string;
}) {
  return (
    <section aria-labelledby="pytania" className={className}>
      <div className="mx-auto max-w-3xl">
        <h2 id="pytania" className="h2-sekcji mb-8 text-center">
          Najczęstsze pytania
        </h2>
        <div className="space-y-4">
          {pytania.map((p) => (
            <details
              key={p.q}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800/60"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5">
                <span className="font-semibold text-gray-900 dark:text-white">{p.q}</span>
                <svg
                  className="flex-shrink-0 transition-transform group-open:rotate-180"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <div className="px-6 pb-5 leading-relaxed text-gray-600 dark:text-gray-400">{p.a}</div>
            </details>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            url: `https://fluxlab.pl${sciezka}`,
            mainEntity: pytania.map((p) => ({
              "@type": "Question",
              name: p.q,
              acceptedAnswer: { "@type": "Answer", text: p.a },
            })),
          }),
        }}
      />
    </section>
  );
}
