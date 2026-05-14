import RevealOnScroll from "@/components/RevealOnScroll";

type Capability = {
  icon: React.ReactNode;
  title: string;
  description: string;
  example: string;
};

const capabilities: Capability[] = [
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "AI w kodzie",
    description:
      "Generowanie i refaktoring kodu z Claude / Copilot. Skracam czas budowy integracji, workflow i prototypów. Mam kontrolę nad jakością — AI nie idzie samopas.",
    example: "Workflow n8n / Make z 12 kroków zbudowany w 2h zamiast 2 dni.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="14" y2="17" />
      </svg>
    ),
    title: "AI w tekście",
    description:
      "Klasyfikacja maili, generowanie follow-upów, podsumowania rozmów, ekstrakcja danych z luźnego tekstu. Modele typu Claude/GPT podłączone przez API do CRM albo workflow.",
    example:
      "Lead pisze „mam interes” — AI klasyfikuje branżę, intencję i pilność, przypisuje handlowca.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    ),
    title: "AI w dźwięku",
    description:
      "Whisper do transkrypcji rozmów handlowych i spotkań. Notatki, podsumowania, ekstrakcja decyzji — automatycznie do CRM albo dokumentu.",
    example:
      "Rozmowa 45 min → 2-zdaniowe podsumowanie i 3 akcje do CRM w 5 min.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "AI w obrazie",
    description:
      "OCR z faktur i dokumentów, rozpoznawanie pól na screenshotach, klasyfikacja zdjęć. Vision API podłączone do workflow.",
    example:
      "Faktura PDF → numer, kwota, data, kontrahent wyciągnięte i wpisane do arkusza, bez ręcznego przepisywania.",
  },
];

export default function AICapabilities() {
  return (
    <section
      id="ai"
      aria-labelledby="ai-heading"
      className="scroll-mt-16 py-16 lg:py-24 relative overflow-hidden bg-gray-50/50 dark:bg-gray-900/30"
    >
      <div
        aria-hidden="true"
        className="blob blob-violet -z-10 opacity-30 absolute top-1/3 -right-32 w-[480px] h-[480px]"
      />

      <div className="container-wide relative">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <p className="section-label">Wspomagane AI</p>
          <h2
            id="ai-heading"
            className="display-lg text-gray-900 dark:text-white mt-3"
          >
            AI w czterech obszarach: kod, tekst, dźwięk, obraz
          </h2>
          <p className="mt-5 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            AI nie jest dodatkiem na koniec projektu. Wpinam je tam, gdzie
            realnie skracają pracę albo wyciągają to, czego ręcznie nie da się
            szybko zrobić.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {capabilities.map((cap, idx) => {
            const delay = Math.min(idx + 1, 4) as 1 | 2 | 3 | 4;
            return (
              <RevealOnScroll key={cap.title} delay={delay} className="flex">
                <article className="card-lift flex flex-col h-full w-full rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800/60 p-6 lg:p-7 hover:border-accent/40 dark:hover:border-accent/60 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/15 to-violet-500/15 text-accent flex items-center justify-center mb-5">
                    {cap.icon}
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {cap.description}
                  </p>
                  <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mt-auto">
                    <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-1">
                      Przykład:
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                      {cap.example}
                    </p>
                  </div>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-500 mt-12 max-w-2xl mx-auto text-center">
          Pracuję z AI tam, gdzie ma sens. Nie sprzedaję AI — sprzedaję
          mierzalne efekty. Jeśli proces jest prosty, prosty workflow wystarczy
          bez AI.
        </p>
      </div>
    </section>
  );
}
