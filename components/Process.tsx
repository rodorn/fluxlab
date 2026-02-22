const steps = [
  {
    number: "01",
    title: "Bezpłatna konsultacja",
    description:
      "Rozmawiamy o Twoich procesach i identyfikujemy, gdzie automatyzacja przyniesie największy zysk. Żadnej sprzedaży — tylko konkretna analiza.",
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
      "Wdrażamy automatyzację, testujemy na rzeczywistych danych i iterujemy do momentu, gdy działa bezbłędnie w każdym scenariuszu.",
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
    <section id="proces" className="py-4 lg:py-7">
      <div className="container-wide">
        <div className="max-w-xl mb-4">
          <p className="section-label mb-3">Jak działamy</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Od rozmowy do działającej automatyzacji
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Prosty, przejrzysty proces bez niespodzianek. Wiesz na każdym etapie,
            co się dzieje i kiedy zobaczysz efekty.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[calc(50%+24px)] right-0 h-px bg-gray-200 dark:bg-gray-700" />
              )}

              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-accent-light dark:bg-accent-dark-light flex items-center justify-center mb-5">
                  <span className="text-accent font-bold text-sm font-mono">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
