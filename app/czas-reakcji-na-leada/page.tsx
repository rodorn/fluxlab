import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "Jak skrócić czas reakcji na leada do kilku minut | Fluxlab",
  description:
    "Speed-to-lead w B2B. Jak skrócić czas reakcji na leada z godzin do minut bez dokładania pracy handlowcom. Konkretne wzorce automatyzacji, koszty, błędy do uniknięcia.",
  openGraph: {
    title: "Jak skrócić czas reakcji na leada do kilku minut | Fluxlab",
    description:
      "Speed-to-lead w B2B. Konkretne wzorce automatyzacji, które skracają czas reakcji z godzin do minut — bez dokładania pracy handlowcom.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab — Jak skrócić czas reakcji na leada",
      },
    ],
  },
  alternates: {
    canonical: "/czas-reakcji-na-leada",
  },
};

const problemPoints = [
  "Lead wpada wieczorem, handlowiec widzi go rano. Klient w międzyczasie pisze do trzech firm.",
  "Powiadomienia o nowych leadach lecą na maila i giną wśród newsletterów.",
  "Handlowiec dowiaduje się o leadzie przez Slacka od managera, a nie z CRM-a.",
  "Pierwszy kontakt to wciąż „odpiszę na maila”, a nie telefon.",
  "Brak SLA na reakcję — nikt nie wie, ile to powinno trwać.",
  "Speed-to-lead nie jest mierzony, więc nikt nie wie, czy się poprawia.",
];

const symptoms = [
  "Średni czas pierwszego kontaktu liczony w godzinach, nie minutach.",
  "Handlowcy mówią „ja oddzwonię, jak będę miał chwilę”.",
  "W weekend i po 17:00 leady leżą bez reakcji do następnego dnia roboczego.",
  "Klienci często sami dzwonią drugi raz, bo „nikt nie odpisał”.",
  "Nikt nie wie, ile leadów dziś wpadło — dane są w skrzynce, w arkuszu, w CRM.",
  "Konwersja z leada na rozmowę spada z miesiąca na miesiąc — nie wiadomo dlaczego.",
];

const beforeSteps = [
  "Lead wypełnia formularz na stronie.",
  "Mail z formularza ląduje w skrzynce sprzedaż@.",
  "Skrzynkę sprawdza ktoś rano — albo dopiero po obiedzie.",
  "Osoba ze skrzynki przekleja dane do CRM (jeśli ma czas).",
  "Manager albo asystent decyduje, kto bierze leada.",
  "Handlowiec dostaje informację mailem, Slackiem albo na zawołanie.",
  "Handlowiec dzwoni, gdy skończy aktualną rozmowę. Albo zapomina.",
  "Klient w międzyczasie wysłał formularze do dwóch konkurentów. Pierwszy oddzwonił — wygrał.",
];

const afterSteps = [
  "Lead wypełnia formularz, dane lecą do warstwy automatyzacji w sekundę.",
  "System waliduje, wzbogaca (region, branża, źródło) i decyduje o właścicielu.",
  "Lead trafia do CRM z przypisanym handlowcem i etapem.",
  "Handlowiec dostaje push na telefon + powiadomienie na Slacku z linkiem do deala.",
  "Klient automatycznie dostaje SMS / mail „dzwonimy do 5 minut, w międzyczasie sprawdź X”.",
  "CRM tworzy zadanie z deadline'em (np. 5 min) i SLA-licznikiem.",
  "Brak reakcji w SLA — eskalacja do drugiej osoby albo do managera.",
  "Raport: średni czas pierwszego kontaktu, % leadów obsłużonych w SLA, per handlowiec.",
];

const workflowSteps = [
  {
    n: "1",
    title: "Lead wpada",
    desc: "Formularz, reklama, e-mail, czat — wszystkie źródła trafiają do jednej warstwy automatyzacji w sekundę.",
    accent: false,
  },
  {
    n: "2",
    title: "Walidacja i wzbogacenie",
    desc: "System sprawdza dane (numer, e-mail, NIP), uzupełnia (region z kodu pocztowego, branża z bazy GUS), odrzuca duplikaty.",
    accent: false,
  },
  {
    n: "3",
    title: "Auto-odpowiedź do klienta",
    desc: "Klient dostaje SMS / e-mail w 30 sekund: „Cześć, dziękujemy. Dzwonimy do 5 minut.” Klient wie, że nie został zignorowany.",
    accent: true,
  },
  {
    n: "4",
    title: "Routing do handlowca",
    desc: "Reguły: region, produkt, waga pipeline'u, dostępność. Lead trafia do właściwej osoby — nie do wspólnej puli.",
    accent: false,
  },
  {
    n: "5",
    title: "Powiadomienie wielokanałowe",
    desc: "Push na telefon + Slack + zadanie w CRM. Handlowiec ma deadline (5 minut) i licznik SLA na ekranie.",
    accent: true,
  },
  {
    n: "6",
    title: "Eskalacja przy braku reakcji",
    desc: "Brak akcji w 5 minut — lead trafia do drugiej osoby. Po kolejnych 5 minutach — do managera. Lead nie zostaje sam.",
    accent: false,
  },
  {
    n: "7",
    title: "Raport speed-to-lead",
    desc: "Średni czas pierwszego kontaktu, % leadów obsłużonych w SLA, podział na godziny dnia, na handlowca, na źródło.",
    accent: false,
  },
];

const antipatterns = [
  {
    title: "Wysłanie powiadomienia na maila",
    desc: "Mail to najgorszy kanał notyfikacji o nowym leadzie. Ginie wśród newsletterów, fakturek i thread'ów. Push, SMS, Slack lub Teams działają w 5 minut. E-mail — w 5 godzin.",
  },
  {
    title: "Brak SLA na reakcję",
    desc: "Bez deadline'u handlowiec oddzwoni „jak będzie miał chwilę”. SLA (5/15/30 minut) musi być zdefiniowane, mierzone i widoczne — najlepiej w postaci licznika tykającego przy deal'u.",
  },
  {
    title: "Speed-to-lead bez routingu",
    desc: "Wszystko leci jednocześnie do całego zespołu. Pierwszy chętny bierze. W praktyce nikt nie czuje się odpowiedzialny — bo „pewnie ktoś inny już tam dzwoni”.",
  },
  {
    title: "Auto-odpowiedź zamiast kontaktu",
    desc: "Auto-reply „odezwiemy się w 24h” nie zastępuje rozmowy. Wysyłaj go obok kontaktu, nie zamiast. Klient i tak chce usłyszeć żywą osobę.",
  },
  {
    title: "Brak fallbacku po godzinach",
    desc: "Lead wpada o 21:00 — nikt nie pracuje. Bez fallbacku (kolejka na rano + komunikat „odzwoniamy do 9:30”) speed-to-lead poza godzinami pracy zawsze będzie zły.",
  },
];

const faq = [
  {
    question: "Jaki czas reakcji na leada jest realistyczny w B2B?",
    answer:
      "5 minut to standard w branżach z wysoką konkurencją (leasing, nieruchomości, usługi finansowe). 15–30 minut to przyzwoity wynik dla większości firm B2B w godzinach pracy. Powyżej godziny szansa na dodzwonienie się i jakościową rozmowę spada bardzo mocno — różne badania B2B konsekwentnie pokazują wykładniczy spadek po pierwszych minutach. Konkretną wartość referencyjną dobieramy w diagnozie pod Twoją branżę i typ leada.",
  },
  {
    question: "Czy auto-odpowiedź zastępuje kontakt handlowca?",
    answer:
      "Nie. Auto-odpowiedź („odezwiemy się do 5 minut”) działa jako most między momentem zgłoszenia a realnym kontaktem. Pokazuje, że firma żyje, i daje klientowi powód, żeby nie wysyłać tego samego do trzech konkurentów. Ale rozmowa z handlowcem to wciąż obowiązek — i właśnie tę rozmowę chcemy uruchomić w 5 minut, nie odsunąć w czasie.",
  },
  {
    question: "Co zrobić z leadami wpadającymi po godzinach pracy?",
    answer:
      "Trzy mechanizmy razem: (1) auto-odpowiedź z konkretnym czasem oddzwonienia („dzwonimy jutro do 9:30”), (2) automatyczne dodanie zadania na początek następnego dnia z priorytetem, (3) powiadomienie do handlowca jeszcze w godzinach pracy, jeśli ma chętność. W branżach kosztownych (np. leasing) warto też mieć dyżur weekendowy z podwyższoną stawką — koszt zwraca się przy jednym wygranym dealu.",
  },
  {
    question: "Czy szybsza reakcja realnie przekłada się na sprzedaż?",
    answer:
      "Tak — i to jest jeden z najlepiej zbadanych wskaźników w sprzedaży B2B. Skrócenie reakcji z godziny do kilku minut wyraźnie zwiększa szansę na realną rozmowę: klient w trakcie zapytania jest „gorący”, po godzinie ma już inne sprawy, a po dniu zwykle rozmawia z konkurencją. Skala tej różnicy zależy od branży i wartości leada — w diagnozie weryfikuję, jaki przedział jest realistyczny dla Twojego procesu.",
  },
  {
    question: "Jak mierzyć speed-to-lead w praktyce?",
    answer:
      "Trzy wskaźniki minimum: (1) średni czas od wpadnięcia leada do pierwszego wychodzącego kontaktu (call / SMS), (2) % leadów obsłużonych w zdefiniowanym SLA (np. 5 min w godzinach pracy), (3) rozkład czasu reakcji w ciągu doby — często okazuje się, że problem jest tylko w określonych godzinach. Bez tych wskaźników optymalizacja procesu opiera się na intuicji.",
  },
  {
    question: "Czy AI / czatbot to dobre rozwiązanie speed-to-lead?",
    answer:
      "Czatbot ma sens jako warstwa kwalifikacji (zbieranie podstawowych danych, odsiewanie spamu, wstępne pytania) — ale nie jako zastępstwo handlowca. W B2B, zwłaszcza przy większych dealach, klient i tak chce rozmawiać z człowiekiem. AI/czatbot powinien skracać drogę do tej rozmowy, nie ją zastępować.",
  },
];

export default function CzasReakcjiNaLeada() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Czas reakcji na leada" }]} />

        {/* Hero — kompaktowy */}
        <section className="pt-16 pb-6 bg-gradient-to-b from-accent/10 to-transparent border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-label">Speed-to-lead B2B</span>
              <h1 className="mt-4 text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Jak skrócić czas reakcji na leada bez dokładania pracy
                handlowcom
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Klient zostawia numer o 14:32. O 17:45 ktoś otwiera maila ze
                skrzynki sprzedaż@. O 9:15 następnego dnia handlowiec wreszcie
                dzwoni. W tym czasie ten sam klient rozmawiał już z dwoma
                konkurentami i prawie podpisał umowę. Większość firm nie traci
                leadów dlatego, że ma zły CRM. Traci je dlatego, że nikt nie
                pilnuje minut.
              </p>
              <div className="mt-8 flex justify-center">
                <TrackedCTA
                  href="#sekcje"
                  location="article_speed_hero"
                  label="Chcę szybszą obsługę leadów"
                  eventName="cta_click_article_audit"
                  className="btn-primary px-8 py-3.5 text-base"
                >
                  Chcę szybszą obsługę leadów
                </TrackedCTA>
              </div>
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
                Bezpłatna diagnoza w 24h · wstępna mapa pierwszego kroku ·
                szacowany ROI
              </p>
            </div>
          </div>
        </section>

        {/* Treść w zakładkach — nic nie wycięte, podzielone */}
        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje strony o czasie reakcji na leada"
            tabs={[
              {
                label: "Problem",
                content: (
                  <div className="py-6 lg:py-8">
                    {/* Problem biznesowy */}
                    <section className="">
                      <div className="">
                        <div className="max-w-3xl mx-auto">
                          <span className="section-label">
                            Problem biznesowy
                          </span>
                          <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            Speed-to-lead to nie luksus — to przewaga, której
                            nie widać w tabelce
                          </h2>
                          <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-4 mb-8">
                            <p>
                              W większości firm B2B czas reakcji na leada jest
                              mierzony w godzinach. W najlepszych — w minutach.
                              Różnica między tymi dwoma światami to nie jakość
                              handlowców i nie wysokość budżetu marketingowego.
                              To architektura tego, co dzieje się w pierwszych
                              30 sekundach po wypełnieniu formularza.
                            </p>
                            <p>
                              Większość firm nie traci leadów dlatego, że ma zły
                              CRM. Traci je dlatego, że między formularzem a
                              CRM-em jest człowiek robiący za integrację API.
                              Ten człowiek czasem śpi, czasem ma spotkanie,
                              czasem jest na chorobowym. Lead nie czeka.
                            </p>
                            <p>
                              Skrócenie czasu reakcji nie polega na tym, żeby
                              handlowcy pracowali szybciej. Polega na tym, żeby
                              informacja o nowym leadzie trafiała do właściwej
                              osoby, na właściwym kanale, z właściwym
                              deadline'em — automatycznie.
                            </p>
                          </div>
                          <ul className="space-y-3">
                            {problemPoints.map((point) => (
                              <li
                                key={point}
                                className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
                              >
                                <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                                <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                  {point}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>

                    {/* Objawy w firmie */}
                    <section className="mt-10 lg:mt-12 pt-10 lg:pt-12 border-t border-gray-100 dark:border-gray-800">
                      <div className="">
                        <div className="max-w-3xl mx-auto">
                          <span className="section-label">Objawy w firmie</span>
                          <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            Po czym poznać, że masz problem ze speed-to-lead
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            Te zachowania są w 90% firm B2B i wszyscy je
                            akceptują jako normalność. To nie jest normalność —
                            to zaakceptowana strata.
                          </p>
                          <ul className="space-y-3">
                            {symptoms.map((s) => (
                              <li
                                key={s}
                                className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
                              >
                                <svg
                                  className="flex-shrink-0 mt-0.5 text-accent"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                >
                                  <path
                                    d="M10 6v4m0 4h.01"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                  <circle
                                    cx="10"
                                    cy="10"
                                    r="8"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  />
                                </svg>
                                <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                  {s}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>
                  </div>
                ),
              },
              {
                label: "Koszt",
                content: (
                  <div className="py-6 lg:py-8">
                    {/* Koszt problemu */}
                    <section className="">
                      <div className="">
                        <div className="max-w-3xl mx-auto">
                          <span className="section-label">Koszt problemu</span>
                          <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            Ile kosztuje wolna reakcja — w liczbach
                          </h2>
                          <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-4 mb-8">
                            <p>
                              Załóżmy realistyczny scenariusz: firma B2B z 200
                              leadami miesięcznie, średnia wartość deala 8 000
                              zł, konwersja z leada na klienta przy reakcji 5
                              min — 12%, przy reakcji 4 h — 4%.
                            </p>
                          </div>
                          <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 lg:p-8 mb-6 space-y-3 font-mono text-sm">
                            <p className="text-gray-700 dark:text-gray-300">
                              <span className="text-accent font-semibold">
                                Wolumen:
                              </span>{" "}
                              200 leadów × 12 miesięcy = 2 400 leadów/rok
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                              <span className="text-accent font-semibold">
                                Konwersja przy 5 min:
                              </span>{" "}
                              2 400 × 12% = 288 klientów × 8 000 zł ={" "}
                              <strong>2 304 000 zł</strong>
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                              <span className="text-accent font-semibold">
                                Konwersja przy 4 h:
                              </span>{" "}
                              2 400 × 4% = 96 klientów × 8 000 zł ={" "}
                              <strong>768 000 zł</strong>
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                              <span className="text-accent font-semibold">
                                Różnica:
                              </span>{" "}
                              <strong>1 536 000 zł rocznie</strong> — wyłącznie
                              z powodu czasu reakcji
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 pt-3 border-t border-gray-100 dark:border-gray-700">
                              <span className="text-accent font-semibold">
                                Koszt automatyzacji:
                              </span>{" "}
                              jednorazowo 5–15 tys. zł + 200–500 zł/mies
                              utrzymania
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                              <span className="text-accent font-semibold">
                                ROI:
                              </span>{" "}
                              zwykle 1–3 miesiące, nawet przy konserwatywnych
                              założeniach konwersji
                            </p>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Liczby zależą od branży i wartości deala — w
                            leasingu czy ubezpieczeniach skala bywa większa, w
                            niskomarżowym e-commerce mniejsza. Ale kierunek jest
                            zawsze ten sam:{" "}
                            <strong>
                              różnica między 5 min a 4 h to nie kosmetyka — to
                              zwykle kilkadziesiąt procent rocznego przychodu z
                              leadów.
                            </strong>
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>
                ),
              },
              {
                label: "Proces",
                content: (
                  <div className="py-6 lg:py-8">
                    {/* Proces przed i po */}
                    <section className="">
                      <div className="">
                        <div className="max-w-5xl mx-auto">
                          <div className="text-center mb-12">
                            <span className="section-label">Przed i po</span>
                            <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                              Jak wygląda obsługa leada przy 4-godzinnej reakcji
                              vs 5-minutowej
                            </h2>
                          </div>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 lg:p-8">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Proces ręczny (4 h albo gorzej)
                              </h3>
                              <ol className="space-y-3 list-decimal list-inside text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                {beforeSteps.map((step) => (
                                  <li key={step}>{step}</li>
                                ))}
                              </ol>
                            </div>
                            <div className="bg-white dark:bg-gray-800/60 border border-accent/40 rounded-2xl p-6 lg:p-8 shadow-sm">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Proces zautomatyzowany (5 minut)
                              </h3>
                              <ol className="space-y-3 list-decimal list-inside text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                {afterSteps.map((step) => (
                                  <li key={step}>{step}</li>
                                ))}
                              </ol>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Diagram */}
                    <section className="mt-10 lg:mt-12 pt-10 lg:pt-12 border-t border-gray-100 dark:border-gray-800">
                      <div className="">
                        <div className="max-w-4xl mx-auto">
                          <div className="mb-10">
                            <span className="section-label">Diagram</span>
                            <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                              Krok po kroku: jak wygląda speed-to-lead pod maską
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                              Każdy z tych kroków wykonuje się w pierwszych 30
                              sekundach od wpadnięcia leada. Handlowiec ma
                              realnie 5 minut na rozmowę — system robi resztę.
                            </p>
                          </div>
                          <ol className="relative space-y-3 lg:space-y-4">
                            {workflowSteps.map((s, i) => (
                              <li key={s.n} className="relative">
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
                                {i < workflowSteps.length - 1 && (
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
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </section>
                  </div>
                ),
              },
              {
                label: "Wdrożenie",
                content: (
                  <div className="py-6 lg:py-8">
                    {/* Co wdrożyć w 1. etapie */}
                    <section className="">
                      <div className="">
                        <div className="max-w-3xl mx-auto">
                          <span className="section-label">Pierwszy etap</span>
                          <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            Co wdrożyć najpierw, żeby skrócić czas reakcji w
                            tydzień
                          </h2>
                          <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-4 mb-6">
                            <p>
                              Pełen system speed-to-lead z eskalacjami i
                              auto-odpowiedziami to projekt na 2–4 tygodnie. Ale
                              80% efektu daje najprostsza konfiguracja, którą da
                              się postawić w kilka dni.
                            </p>
                            <p>Konkretny pierwszy etap:</p>
                          </div>
                          <ul className="space-y-3 mb-6">
                            <li className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4">
                              <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold">
                                1
                              </span>
                              <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                <strong>Push + Slack zamiast maila</strong> — od
                                razu przenieś notyfikacje o leadach z poczty na
                                kanał, który handlowcy mają na ekranie. Sam ten
                                ruch potrafi obniżyć czas reakcji o 50%.
                              </span>
                            </li>
                            <li className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4">
                              <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold">
                                2
                              </span>
                              <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                <strong>
                                  Auto-odpowiedź dla klienta w 30 sekund
                                </strong>{" "}
                                — SMS lub mail „dzwonimy do 5 minut”. Klient
                                wie, że jest obsłużony, i nie wysyła zapytania
                                do konkurencji.
                              </span>
                            </li>
                            <li className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4">
                              <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold">
                                3
                              </span>
                              <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                <strong>SLA 5 minut z licznikiem</strong> —
                                zadanie w CRM z deadline'em i widocznym
                                licznikiem. Bez deadline'u nie ma speed-to-lead.
                              </span>
                            </li>
                            <li className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4">
                              <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold">
                                4
                              </span>
                              <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                <strong>Pomiar od dnia 1.</strong> — średni czas
                                pierwszego kontaktu, % leadów w SLA, podział wg
                                godzin. Bez pomiaru nie wiesz, co działa.
                              </span>
                            </li>
                          </ul>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Dopiero po dwóch tygodniach pracy na żywych danych
                            dokładamy eskalacje, routing wielowymiarowy i
                            obsługę po godzinach. Bez pomiarów z pierwszego
                            etapu te kolejne kroki to zgadywanie.
                          </p>
                        </div>
                      </div>
                    </section>

                    {/* Typowe błędy */}
                    <section className="mt-10 lg:mt-12 pt-10 lg:pt-12 border-t border-gray-100 dark:border-gray-800">
                      <div className="">
                        <div className="max-w-3xl mx-auto">
                          <span className="section-label">Antywzorce</span>
                          <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            Najczęstsze błędy przy skracaniu czasu reakcji
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            Te błędy widzę u firm, które już &bdquo;mają
                            speed-to-lead&rdquo; — ale dane mówią co innego.
                            Każdy z nich da się obejść, jeśli wiesz, że
                            istnieje.
                          </p>
                          <div className="space-y-4">
                            {antipatterns.map((a) => (
                              <div
                                key={a.title}
                                className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6"
                              >
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                  {a.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                  {a.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                ),
              },
              {
                label: "Cennik",
                content: (
                  <div className="py-6 lg:py-8">
                    {/* Cennik */}
                    <section className="">
                      <div className="">
                        <div className="max-w-4xl mx-auto">
                          <div className="text-center mb-10">
                            <span className="section-label">Cennik</span>
                            <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                              Ile kosztuje wdrożenie speed-to-lead
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                              Stała cena za projekt po krótkim audycie. Widełki
                              poniżej — konkretną wycenę dostajesz po
                              30-minutowej rozmowie.
                            </p>
                          </div>
                          <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 lg:p-8">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Speed-to-lead podstawowy
                              </h3>
                              <p className="text-3xl font-bold text-accent mb-3">
                                4 000–8 000 zł
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                Jedno źródło leadów, push / Slack do handlowca,
                                auto-odpowiedź dla klienta, SLA z licznikiem,
                                podstawowy raport. Wdrożenie 3–5 dni.
                              </p>
                            </div>
                            <div className="bg-white dark:bg-gray-800/60 border border-accent/40 rounded-2xl p-6 lg:p-8 shadow-sm">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Speed-to-lead pełny
                              </h3>
                              <p className="text-3xl font-bold text-accent mb-3">
                                10 000–20 000 zł
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                Kilka źródeł, routing wielowymiarowy, eskalacje,
                                obsługa po godzinach pracy, integracja z
                                kalendarzami, pełny raport speed-to-lead per
                                handlowiec / źródło. Wdrożenie 2–4 tygodnie.
                              </p>
                            </div>
                          </div>
                          <div className="text-center">
                            <Link
                              href="/automatyzacja-leadow-crm"
                              className="btn-secondary"
                            >
                              Zobacz pełną ofertę automatyzacji leadów
                            </Link>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                ),
              },
              {
                label: "FAQ",
                content: (
                  <div className="py-6 lg:py-8">
                    {/* FAQ */}
                    <section className="">
                      <div className="">
                        <div className="max-w-3xl mx-auto">
                          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                            Najczęstsze pytania o speed-to-lead
                          </h2>
                          <div className="space-y-4">
                            {faq.map((item) => (
                              <details
                                key={item.question}
                                className="group bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden"
                              >
                                <summary className="cursor-pointer px-6 py-5 flex items-center justify-between gap-4 list-none">
                                  <span className="font-semibold text-gray-900 dark:text-white">
                                    {item.question}
                                  </span>
                                  <svg
                                    className="flex-shrink-0 transition-transform group-open:rotate-180"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                  >
                                    <path
                                      d="M5 7l5 5 5-5"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </summary>
                                <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                                  {item.answer}
                                </div>
                              </details>
                            ))}
                          </div>
                          <div className="mt-10 text-sm text-gray-600 dark:text-gray-400 leading-relaxed bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                            <p className="mb-2">Powiązane materiały:</p>
                            <ul className="space-y-1.5">
                              <li>
                                <Link
                                  href="/automatyczne-przypisywanie-leadow"
                                  className="text-accent hover:underline"
                                >
                                  Automatyczne przypisywanie leadów do
                                  handlowców
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/automatyzacja-pipedrive"
                                  className="text-accent hover:underline"
                                >
                                  Automatyzacja Pipedrive
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/automatyzacja-crm"
                                  className="text-accent hover:underline"
                                >
                                  Automatyzacja CRM — przegląd
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/kalkulator-leadow"
                                  className="text-accent hover:underline"
                                >
                                  Kalkulator kosztu zgubionych leadów
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Final CTA */}
                    <section className="mt-10 lg:mt-12 pt-10 lg:pt-12 border-t border-gray-100 dark:border-gray-800">
                      <div className="">
                        <div className="max-w-2xl mx-auto text-center">
                          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Chcesz, żeby leady były odbierane w 5 minut zamiast
                            5 godzin?
                          </h2>
                          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            30-minutowa diagnoza, wstępna mapa pierwszego kroku
                            i szacowany ROI. Bez zobowiązań. Po rozmowie wiesz,
                            czy w twoim przypadku to ma sens — i ile by
                            kosztowało.
                          </p>
                          <TrackedCTA
                            href="/#kontakt"
                            location="article_speed_final"
                            label="Chcę szybszą obsługę leadów"
                            eventName="cta_click_article_audit"
                            className="btn-primary px-8 py-3.5 text-base"
                          >
                            Chcę szybszą obsługę leadów
                          </TrackedCTA>
                        </div>
                      </div>
                    </section>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
