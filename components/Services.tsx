const services = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" />
      </svg>
    ),
    title: "Automatyzacja przepływu danych",
    description:
      "Eliminujemy ręczne przenoszenie danych między systemami. Integrujemy ERP, CRM, arkusze, e-mail i inne narzędzia, które już używasz.",
    tags: ["Make", "n8n", "API", "Webhooks"],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8m-4-4v4" />
      </svg>
    ),
    title: "Automatyzacja raportowania",
    description:
      "Raporty, które wcześniej zajmowały kilka godzin, generują się automatycznie. Dane zawsze aktualne, w odpowiednim formacie i czasie.",
    tags: ["Google Sheets", "Power BI", "E-mail", "PDF"],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: "Obsługa klienta bez chaosu",
    description:
      "Automatyczne odpowiedzi, routing zgłoszeń, powiadomienia i follow-upy. Twój zespół zajmuje się tylko tym, co wymaga ludzkiej uwagi.",
    tags: ["Helpdesk", "CRM", "E-mail", "Slack"],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    title: "Procesy na miarę",
    description:
      "Każda firma ma unikalny sposób pracy. Mapujemy Twoje procesy i projektujemy automatyzację dopasowaną do tego, jak rzeczywiście działasz.",
    tags: ["Audyt", "Projektowanie", "Wdrożenie", "Szkolenie"],
  },
];

export default function Services() {
  return (
    <section id="uslugi" className="relative py-8 lg:py-14 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {/* Light mode: jasne niebieskie tło + zdjęcie jako ledwo widoczny akcent */}
        <div className="absolute inset-0 bg-sky-50 dark:hidden" />
        <img
          src="/photos/Flow.avif"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.08] dark:hidden"
          style={{ filter: "invert(1)" }}
        />
        {/* Dark mode: oryginalne zdjęcie bez zmian */}
        <img
          src="/photos/Flow.avif"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover hidden dark:block"
        />
        <div className="absolute inset-0 hidden dark:block bg-gray-950/90" />

        {/* Fade top — light */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent dark:hidden" />
        {/* Fade bottom — light */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent dark:hidden" />
        {/* Fade top — dark */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-950 to-transparent hidden dark:block" />
        {/* Fade bottom — dark */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-950 to-transparent hidden dark:block" />
      </div>

      <div className="container-wide">
        <div className="max-w-xl mb-8">
          <p className="section-label mb-3">Co robimy</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Automatyzacje, które realnie odciążają Twój zespół
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Skupiamy się na procesach, które kosztują Cię najwięcej czasu.
            Nie sprzedajemy narzędzi — dostarczamy gotowe rozwiązania.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white/90 backdrop-blur-sm dark:bg-white/10 rounded-2xl p-8 border border-white dark:border-white/10 hover:bg-white dark:hover:bg-white/15 hover:border-accent/30 dark:hover:border-accent/50 transition-all shadow-sm"
            >
              <div className="w-10 h-10 flex items-center justify-center text-accent bg-accent-light dark:bg-accent-dark-light rounded-xl mb-5">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2.5 py-1 bg-white/70 dark:bg-white/10 text-gray-500 dark:text-gray-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
