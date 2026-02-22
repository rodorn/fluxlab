import Image from "next/image";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — text */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent-light dark:bg-accent-dark-light text-accent text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-accent rounded-full" />
              Automatyzacja procesów B2B
            </div>

            {/* Headline */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-gray-900 dark:text-white">
              Automatyzujemy to,{" "}
              <span className="text-accent">co marnuje</span>{" "}
              Twój czas i pieniądze
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-10 max-w-lg">
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

          {/* Right — image */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
              <Image
                src="/photos/digital_eye.avif"
                alt="Wizualizacja przepływu danych"
                fill
                className="object-cover"
                priority
              />
              {/* Subtle gradient overlay to blend with page */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent mix-blend-multiply" />
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">500+</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">godzin zwróconych<br />klientom miesięcznie</p>
            </div>

            {/* Decorative dot grid */}
            <div
              className="absolute -top-4 -right-4 w-32 h-32 opacity-20 dark:opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)",
                backgroundSize: "12px 12px",
              }}
            />
          </div>
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
