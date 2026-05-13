import RevealOnScroll from "@/components/RevealOnScroll";

const painPoints = [
  {
    title: "Lead wpada, ale nikt nie reaguje od razu",
    description:
      "Formularz wysyła maila, ktoś ma go zauważyć, przepisać dane i założyć temat w CRM. Czyli proces sprzedaży opiera się na nadziei. Odważna strategia, tylko trochę kosztowna.",
  },
  {
    title: "CRM jest bazą kontaktów, nie systemem pracy",
    description:
      "Handlowcy tworzą zadania ręcznie, zapominają o follow-upach, zmieniają statusy po czasie i wpisują dane różnie. Potem raport mówi cokolwiek, bo dane są cokolwiek.",
  },
  {
    title: "Raporty powstają ręcznie",
    description:
      "Dane są w CRM, arkuszach, reklamach, mailach i kilku systemach naraz. Raz w tygodniu ktoś to skleja, poprawia i udaje, że to proces.",
  },
  {
    title: "Nie wiadomo, które źródła leadów dowożą sprzedaż",
    description:
      "Masz liczbę zapytań, ale nie masz jasnego widoku: źródło → handlowiec → status → sprzedaż → przychód. Bez tego optymalizacja marketingu jest zgadywaniem w ładnym dashboardzie.",
  },
];

export default function PainPoints() {
  return (
    <section id="problem" className="scroll-mt-16 py-12 lg:py-16">
      <div className="container-wide">
        <RevealOnScroll className="max-w-2xl mb-10">
          <p className="section-label mb-3">Problem</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Gdzie najczęściej uciekają leady i czas?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Cztery sytuacje, które kosztują firmy B2B najwięcej — i które zwykle
            nie wyglądają jak katastrofa, dopóki ktoś ich nie policzy.
          </p>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {painPoints.map((p, i) => (
            <RevealOnScroll
              key={p.title}
              delay={Math.min(i + 1, 4) as 1 | 2 | 3 | 4}
              className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 lg:p-7"
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-2xl font-bold text-accent tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-snug">
                  {p.title}
                </h3>
              </div>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-relaxed pl-9">
                {p.description}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
