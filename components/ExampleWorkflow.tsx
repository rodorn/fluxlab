import TrackedCTA from "@/components/TrackedCTA";
import RevealOnScroll from "@/components/RevealOnScroll";

const steps = [
  {
    n: "1",
    title: "Lead wpada",
    desc: "Formularz, reklama, e-mail albo landing page — wszystkie źródła trafiają do jednego procesu.",
    accent: false,
  },
  {
    n: "2",
    title: "Walidacja danych",
    desc: "System sprawdza kompletność danych i identyfikuje źródło zapytania.",
    accent: false,
  },
  {
    n: "3",
    title: "CRM: osoba + firma + deal",
    desc: "Lead automatycznie trafia do CRM jako osoba, firma i deal — z odpowiednim etapem i polami.",
    accent: true,
  },
  {
    n: "4",
    title: "Routing do handlowca",
    desc: "Reguły: region, produkt, źródło, obciążenie pipeline'u — handlowiec dostaje przypisany lead.",
    accent: false,
  },
  {
    n: "5",
    title: "Zadanie + powiadomienie",
    desc: "CRM tworzy zadanie „kontakt w 5 minut”. Handlowiec dostaje notyfikację — Slack, e-mail, push.",
    accent: false,
  },
  {
    n: "6",
    title: "Follow-up / eskalacja",
    desc: "Brak reakcji uruchamia przypomnienie albo eskalację do drugiej osoby. Lead nie ginie.",
    accent: false,
  },
  {
    n: "7",
    title: "Raport sprzedaży",
    desc: "Dane trafiają do raportu: źródło, czas reakcji, status, wynik. Bez ręcznego klejenia w piątek.",
    accent: true,
  },
];

export default function ExampleWorkflow() {
  return (
    <section
      id="workflow"
      className="scroll-mt-16 py-12 lg:py-16 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800"
    >
      <div className="container-wide">
        <RevealOnScroll className="max-w-2xl mb-10">
          <p className="section-label mb-3">Jak to działa</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Przykład: automatyczna obsługa leada od formularza do raportu
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Pierwszy etap, który wdrażam u większości klientów. Każdy krok można
            zbudować osobno — i mierzyć efekt po kolei.
          </p>
        </RevealOnScroll>

        <ol className="relative max-w-4xl space-y-3 lg:space-y-4">
          {steps.map((s, i) => (
            <RevealOnScroll
              key={s.n}
              as="li"
              delay={Math.min(i + 1, 4) as 1 | 2 | 3 | 4}
              className="relative"
            >
              <div
                className={`flex gap-4 lg:gap-5 items-start bg-white dark:bg-gray-800/80 border rounded-2xl p-5 lg:p-6 ${
                  s.accent
                    ? "border-accent/40 shadow-sm"
                    : "border-gray-100 dark:border-gray-700"
                }`}
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center font-bold text-sm tabular-nums ${
                    s.accent
                      ? "bg-accent text-white"
                      : "bg-accent-light dark:bg-accent-dark-light text-accent"
                  }`}
                >
                  {s.n}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {s.title}
                  </h3>
                  <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="flex justify-center py-1.5">
                  <svg
                    className="text-gray-300 dark:text-gray-600"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 2v8m0 0l-3-3m3 3l3-3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </RevealOnScroll>
          ))}
        </ol>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 max-w-4xl">
          <TrackedCTA
            href="#kontakt"
            location="workflow"
            label="diagnoza"
            eventName="cta_click_workflow"
            className="btn-primary text-base px-7 py-3"
          >
            Chcę taki proces u siebie
          </TrackedCTA>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Pierwszy etap zwykle wdrażam w 2–4 dni. Każdy krok niezależnie
            mierzalny.
          </p>
        </div>
      </div>
    </section>
  );
}
