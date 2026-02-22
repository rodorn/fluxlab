const points = [
  "Pracujemy z firmami z sektorów: logistyka, e-commerce, usługi profesjonalne",
  "Budujemy na narzędziach, które Twój zespół może samodzielnie utrzymać",
  "Nie wdrażamy zbędnych technologii — wybieramy to, co faktycznie rozwiązuje problem",
  "Stały kontakt, terminowość i pełna transparentność kosztów",
];

export default function About() {
  return (
    <section id="o-nas" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="section-label mb-3">O nas</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Praktyczne podejście, mierzalne efekty
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-6">
              Fluxlab to jednoosobowe studio automatyzacji. Nie masz do czynienia
              z korporacyjną strukturą i anonimowym działem IT — rozmawiasz
              bezpośrednio ze specjalistą, który projektuje i wdraża Twoje rozwiązanie.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-10">
              Skupiam się wyłącznie na automatyzacji procesów biznesowych. To nie
              jest jeden z piętnastu serwisów w ofercie — to jedyna rzecz, którą robię.
            </p>

            <ul className="space-y-4">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-accent-light dark:bg-accent-dark-light flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5l2.5 2.5L8 3"
                        stroke="#6366f1"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — visual block */}
          <div className="relative">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm">
                  FL
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">Fluxlab</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Automatyzacja procesów B2B</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Wdrożeń zrealizowanych", value: "30+" },
                  { label: "Godzin zaoszczędzonych klientom / mies.", value: "500+" },
                  { label: "Najkrótszy czas wdrożenia", value: "9 dni" },
                  { label: "Zadowolenie klientów", value: "100%" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-700 last:border-0"
                  >
                    <span className="text-sm text-gray-500 dark:text-gray-400">{item.label}</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent-light dark:bg-accent-dark-light rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
