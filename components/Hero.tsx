export default function Hero() {
  return (
    <section className="pt-32 pb-20 lg:pt-44 lg:pb-32">
      <div className="container-wide">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent-light dark:bg-accent-dark-light text-accent text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            Automatyzacja procesów B2B
          </div>

          {/* Headline */}
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-gray-900 dark:text-white">
            Automatyzujemy to,{" "}
            <span className="text-accent">co marnuje</span>{" "}
            Twój czas i pieniądze
          </h1>

          {/* Subheadline */}
          <p className="text-lg lg:text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-10 max-w-2xl">
            Budujemy systemy automatyzacji dla firm, które mają dość
            ręcznej pracy, błędów w Excelu i procesów opartych na kopiuj‑wklej.
            Efekty widoczne w ciągu kilku tygodni.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#kontakt" className="btn-primary text-base px-8 py-3.5">
              Umów bezpłatną konsultację
            </a>
            <a href="#uslugi" className="btn-secondary text-base px-8 py-3.5">
              Zobacz co robimy
            </a>
          </div>

          {/* Social proof */}
          <p className="mt-8 text-sm text-gray-400 dark:text-gray-500">
            Bezpłatna konsultacja · Bez zobowiązań · Odpowiedź w 24h
          </p>
        </div>

        {/* Divider */}
        <div className="mt-20 border-t border-gray-100 dark:border-gray-800" />

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: "80%", label: "średnia redukcja czasu na procesy" },
            { value: "2–4 tyg.", label: "czas wdrożenia pierwszej automatyzacji" },
            { value: "0 błędów", label: "w zautomatyzowanych procesach" },
            { value: "ROI < 3 mies.", label: "zwrot inwestycji" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
