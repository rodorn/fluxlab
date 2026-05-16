import RevealOnScroll from "@/components/RevealOnScroll";

const steps = [
  {
    number: "01",
    title: "Bezpłatna diagnoza",
    description:
      "Rozmawiamy o Twoich procesach i identyfikujemy, gdzie automatyzacja przyniesie największy zysk. Żadnej sprzedaży - tylko konkretna analiza.",
  },
  {
    number: "02",
    title: "Mapa procesów i propozycja",
    description:
      "Dokumentujemy wybrany proces i przygotowujemy propozycję wdrożenia z szacowanym czasem, kosztem i zwrotem z inwestycji.",
  },
  {
    number: "03",
    title: "Budowa i testy",
    description:
      "Wdrażam automatyzację, testujemy na rzeczywistych danych i iterujemy do momentu, gdy działa bezbłędnie w każdym scenariuszu.",
  },
  {
    number: "04",
    title: "Przekazanie i wsparcie",
    description:
      "Przekazujemy gotowe rozwiązanie z dokumentacją i szkoleniem. Oferujemy stałe wsparcie, żebyś miał pewność, że wszystko działa.",
  },
];

export default function Process() {
  return (
    <section
      id="proces"
      className="section-cyan scroll-mt-16 relative overflow-hidden py-4 lg:py-7"
    >
      {/* Atmosfera tła */}
      <div className="blob blob-cyan -z-10 -top-16 -left-24 h-72 w-72" />
      <div className="blob blob-accent -z-10 -bottom-24 right-0 h-80 w-80" />

      <div className="container-wide">
        <RevealOnScroll className="max-w-xl mb-4">
          <p className="section-label mb-3">Jak działamy</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Od rozmowy do działającej automatyzacji
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Prosty, przejrzysty proces bez niespodzianek. Wiesz na każdym
            etapie, co się dzieje i kiedy zobaczysz efekty.
          </p>
        </RevealOnScroll>

        <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Ciągła linia progresji — desktop, biegnie przez wszystkie kółka */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-accent/10 via-accent/40 to-accent/10"
          />

          {steps.map((step, index) => (
            <RevealOnScroll
              key={step.number}
              delay={Math.min(index + 1, 4) as 1 | 2 | 3 | 4}
              className="relative"
            >
              {/* Pionowa linia łącząca — mobile / tablet */}
              {index < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="md:hidden absolute left-7 top-14 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-accent/40 to-transparent"
                />
              )}

              <div className="card-lift group relative h-full rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm p-6 dark:border-white/10 dark:bg-white/[0.06] hover:border-accent/40 dark:hover:border-accent/50">
                {/* Numer w kółku z gradientem */}
                <div className="relative mb-5 w-14 h-14">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent to-cyan-400 opacity-90 transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-[2px] rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                    <span className="bg-gradient-to-br from-accent to-cyan-500 bg-clip-text text-transparent font-bold text-lg font-mono">
                      {step.number}
                    </span>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-accent transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
