import TrackedCTA from "@/components/TrackedCTA";

const youGet = [
  "wstępna ocena — czy automatyzacja w ogóle ma sens",
  "wskazanie 1–3 obszarów z największym potencjałem",
  "szacunkowy rząd kosztu ręcznej pracy",
  "rekomendowany pierwszy krok",
  "orientacyjne widełki wyceny",
];

const youDontGet = [
  "pełnej mapy AS-IS → TO-BE (to jest płatny audyt)",
  "architektury technicznej do przekazania komuś innemu",
  "stałej ceny wdrożenia bez wcześniejszego audytu",
  "wielogodzinnego warsztatu za darmo",
];

export default function Diagnosis() {
  return (
    <section
      id="diagnoza"
      aria-labelledby="diagnoza-heading"
      className="scroll-mt-16 py-12 lg:py-16 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800"
    >
      <div className="container-wide">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-2">
            <p className="section-label mb-3">Punkt startowy</p>
            <h2
              id="diagnoza-heading"
              className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-5"
            >
              Zacznij od diagnozy, nie od wdrożenia
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-4">
              Najpierw sprawdzam, czy automatyzacja ma sens. Nie każdy proces
              warto automatyzować i nie każde narzędzie trzeba integrować.
              Diagnoza jest <strong>bezpłatna</strong> i daje wstępny kierunek.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 leading-relaxed mb-6">
              Jeśli idziemy dalej — robię płatny <strong>audyt procesu</strong>{" "}
              z mapą AS-IS → TO-BE, priorytetami, narzędziami, harmonogramem i
              ROI. Koszt audytu odliczam od wdrożenia, jeśli kontynuujemy.
            </p>
            <TrackedCTA
              href="#kontakt"
              location="diagnosis"
              label="diagnoza"
              eventName="cta_click_diagnosis"
              className="btn-primary text-base px-7 py-3"
            >
              Zamów bezpłatną diagnozę
            </TrackedCTA>
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
              Odpowiedź w 24h · bez prezentacji sprzedażowej · bez zobowiązań
            </p>
          </div>

          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
            <div className="bg-white dark:bg-gray-800/80 border border-accent/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-7 h-7 rounded-full bg-accent flex items-center justify-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 7l3 3 5-6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Co dostajesz
                </h3>
              </div>
              <ul className="space-y-2.5">
                {youGet.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-gray-700 dark:text-gray-300 leading-snug pl-1"
                  >
                    • {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 4l6 6M10 4l-6 6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      className="text-gray-500 dark:text-gray-400"
                    />
                  </svg>
                </span>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Czego NIE dostajesz
                </h3>
              </div>
              <ul className="space-y-2.5">
                {youDontGet.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-gray-500 dark:text-gray-500 leading-snug pl-1"
                  >
                    • {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-gray-500 dark:text-gray-500 leading-relaxed">
                Diagnoza to konkretna mapa pierwszego kroku, nie darmowa
                konsultacja techniczna do przekazania komuś innemu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
