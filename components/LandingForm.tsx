import MultiStepForm from "@/components/MultiStepForm";

interface Props {
  /** Identyfikator formularza w GA, np. "diagnosis_lp_leadow". */
  formId: string;
  heading: string;
  intro: string;
  /** Zachowany dla kompatybilności wywołań — multi-step ma własny label. */
  submitLabel?: string;
  /** Mikrotekst pod przyciskiem. */
  microCopy?: string;
}

export default function LandingForm({
  formId,
  heading,
  intro,
  microCopy,
}: Props) {
  return (
    <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8 lg:gap-10 items-start">
      <div className="lg:col-span-2">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {heading}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-base lg:text-lg leading-relaxed mb-8">
          {intro}
        </p>

        <div className="bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 lg:p-6">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Co dostajesz po zgłoszeniu:
          </p>
          <ul className="space-y-2 mb-4">
            {[
              "ocenę, czy automatyzacja ma sens w Twoim przypadku",
              "wskazanie pierwszego procesu do uruchomienia",
              "orientacyjne widełki kosztu wdrożenia",
              "odpowiedź w ciągu 24h",
            ].map((item) => (
              <li
                key={item}
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
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 dark:text-gray-500 leading-relaxed pt-3 border-t border-gray-100 dark:border-gray-700">
            Pełna dokumentacja techniczna i mapa AS-IS → TO-BE to zakres
            płatnego audytu — diagnoza daje wstępny kierunek, nie pełny projekt.
          </p>
        </div>
      </div>

      <div className="lg:col-span-3">
        <MultiStepForm formId={formId} microCopy={microCopy} />
      </div>
    </div>
  );
}
