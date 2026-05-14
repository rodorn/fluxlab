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
      className="scroll-mt-16 relative py-20 lg:py-28 bg-gray-950 text-white overflow-hidden noise-overlay"
    >
      {/* Decorative blobs — visible on dark background */}
      <div
        aria-hidden="true"
        className="blob-strong blob-accent -z-0 top-[10%] right-[-10%] w-[600px] h-[600px] opacity-30"
      />
      <div
        aria-hidden="true"
        className="blob blob-violet -z-0 bottom-[-20%] left-[-5%] w-[500px] h-[500px] opacity-25"
      />

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-2">
            <p className="section-label mb-4">Punkt startowy</p>
            <h2 id="diagnoza-heading" className="display-lg mb-6 text-white">
              Zacznij od <span className="text-gradient-flow">diagnozy</span>,
              <br />
              nie od wdrożenia
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-5">
              Najpierw sprawdzam, czy automatyzacja ma sens. Nie każdy proces
              warto automatyzować i nie każde narzędzie trzeba integrować.
              Diagnoza jest <strong className="text-white">bezpłatna</strong> i
              daje wstępny kierunek.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed mb-8">
              Jeśli idziemy dalej — robię płatny{" "}
              <strong className="text-white">audyt procesu</strong> z mapą AS-IS
              → TO-BE, priorytetami, narzędziami, harmonogramem i ROI. Koszt
              audytu odliczam od wdrożenia, jeśli kontynuujemy.
            </p>
            <TrackedCTA
              href="#kontakt"
              location="diagnosis"
              label="diagnoza"
              eventName="cta_click_diagnosis"
              className="btn-primary text-base px-8 py-4 glow-accent"
            >
              Zamów bezpłatną diagnozę
            </TrackedCTA>
            <p className="mt-4 text-xs text-gray-500">
              Odpowiedź w 24h · bez prezentacji sprzedażowej · bez zobowiązań
            </p>
          </div>

          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
            <div className="glass-subtle rounded-2xl p-7 border border-accent/30 bg-white/[0.04]">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center glow-accent">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 7l3 3 5-6"
                      stroke="white"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h3 className="font-semibold text-white text-lg">
                  Co dostajesz
                </h3>
              </div>
              <ul className="space-y-3">
                {youGet.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-gray-200 leading-snug flex gap-2"
                  >
                    <span className="text-accent mt-1 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl p-7 border border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-9 h-9 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 4l6 6M10 4l-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="text-gray-400"
                    />
                  </svg>
                </span>
                <h3 className="font-semibold text-white text-lg">
                  Czego NIE dostajesz
                </h3>
              </div>
              <ul className="space-y-3">
                {youDontGet.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-gray-400 leading-snug flex gap-2"
                  >
                    <span className="mt-1 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 pt-5 border-t border-white/10 text-xs text-gray-500 leading-relaxed">
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
