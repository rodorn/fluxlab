const services = [
  {
    title: "Integracja CRM z zewnętrznymi systemami",
    description:
      "Połączenie CRM (Pipedrive, HubSpot i in.) z narzędziami, których już używasz — formularzami, e-mailem, arkuszami, systemem fakturowania lub magazynem. Dane przepływają automatycznie, bez ręcznego przepisywania.",
    range: "2 800 – 6 400 zł",
    tools: ["CRM", "API", "Webhooks"],
  },
  {
    title: "Automatyzacja przepływu leadów",
    description:
      "Zbieranie leadów z różnych źródeł, wzbogacanie danych, automatyczne przypisywanie do CRM i uruchamianie sekwencji follow-up. Skracasz czas reakcji, nie tracisz żadnego kontaktu.",
    range: "3 200 – 7 900 zł",
    tools: ["Python", "n8n", "CRM"],
  },
  {
    title: "Automatyczne raportowanie",
    description:
      "Raporty generowane i wysyłane samodzielnie — codziennie, tygodniowo lub na żądanie. Bez ręcznego zbierania danych z wielu miejsc, bez Excela uzupełnianego w piątek wieczór.",
    range: "1 900 – 4 400 zł",
    tools: ["Python", "Zapier", "Google Sheets"],
  },
  {
    title: "Prosta automatyzacja procesów (no-code)",
    description:
      "Automatyzacje oparte o Make, n8n lub Zapier dla powtarzalnych zadań: powiadomienia, synchronizacja danych między aplikacjami, routing zgłoszeń, automatyczne odpowiedzi.",
    range: "1 400 – 3 600 zł",
    tools: ["Make", "n8n", "Zapier"],
  },
  {
    title: "Dedykowana integracja API / skrypt Python",
    description:
      "Niestandardowe połączenia między systemami, które nie mają gotowych integracji. Scraping danych, przetwarzanie plików, automatyzacje wymagające logiki biznesowej lub większej kontroli nad procesem.",
    range: "4 200 – 11 500 zł",
    tools: ["Python", "REST API", "Supabase"],
  },
  {
    title: "Automatyzacja z wykorzystaniem AI",
    description:
      "Wzbogacenie istniejących procesów o możliwości AI — kategoryzacja, streszczenia, generowanie treści, analiza danych wejściowych. Integracja z OpenAI API w ramach istniejącego workflow.",
    range: "2 600 – 8 200 zł",
    tools: ["OpenAI API", "Python", "n8n"],
  },
];

export default function Pricing() {
  return (
    <section id="cennik" className="scroll-mt-16 py-4 lg:py-7">
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-2xl mb-4">
          <p className="section-label mb-3">Cennik</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Każdy projekt wyceniamy indywidualnie
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
            Poniższe widełki to orientacyjne zakresy dla typowych realizacji.
            Ostateczna cena zależy od liczby integrowanych systemów, złożoności
            logiki i wymaganego czasu wdrożenia. Zawsze dostajesz stałą wycenę
            przed startem — bez niespodzianek w trakcie.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex flex-col bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 hover:border-accent/30 dark:hover:border-accent/40 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-2">
                {service.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {service.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs font-medium px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Orientacyjny koszt</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{service.range}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Entry point */}
        <div className="rounded-2xl border border-accent/30 bg-accent-light dark:bg-accent-dark-light p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 mb-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 text-accent text-xs font-semibold uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Dobry punkt startowy
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
              Audyt procesu
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed max-w-xl">
              Analizujemy wybrany proces w Twojej firmie i dostarczamy dokumentację
              z mapą działania, wskazaniem wąskich gardeł i konkretną propozycją
              automatyzacji wraz z wyceną wdrożenia. Koszt audytu zależy od
              wielkości firmy i zakresu analizy.
            </p>
          </div>
          <div className="flex-shrink-0 flex flex-col sm:flex-row md:flex-col gap-3">
            <a href="#kontakt" className="btn-primary whitespace-nowrap">
              Zapytaj o audyt
            </a>
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">Wycena bezpłatnie</p>
          </div>
        </div>

        {/* Value statement */}
        <p className="text-sm text-gray-400 dark:text-gray-500 text-center max-w-2xl mx-auto">
          Automatyzacja jednego procesu zajmującego 10 godzin miesięcznie zwraca
          koszt wdrożenia w ciągu kilku miesięcy — i działa dalej bez dodatkowych nakładów.
        </p>
      </div>
    </section>
  );
}
