import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";

export const metadata: Metadata = {
  title: "Automatyzacja follow-upów w CRM | Fluxlab",
  description:
    "Automatyczne follow-upy w CRM: przypomnienia sprzedażowe, sekwencje po etapach deala i eskalacje, które pilnują leadów zamiast handlowca. Bez utraty kontroli nad sprzedażą.",
  openGraph: {
    title: "Automatyzacja follow-upów w CRM | Fluxlab",
    description:
      "Automatyczne follow-upy w CRM: przypomnienia sprzedażowe, sekwencje po etapach deala i eskalacje, które pilnują leadów zamiast handlowca. Bez utraty kontroli nad sprzedażą.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab — Automatyzacja procesów biznesowych i CRM dla firm B2B",
      },
    ],
  },
  alternates: {
    canonical: "/automatyzacja-follow-up",
  },
};

const problemPoints = [
  "Handlowiec sam pamięta, do kogo i kiedy się odezwać.",
  "Follow-up zależy od kalendarza, nastroju i obciążenia w danym tygodniu.",
  "Połowa leadów nie dostaje drugiego kontaktu w ogóle.",
  "Zadania w CRM są dodawane ręcznie albo wcale.",
  "Statusy w CRM nie odpowiadają temu, co się dzieje w rozmowach.",
  "Nie wiadomo, ile deali rozmywa się przez „odezwę się w przyszłym tygodniu”.",
];

const symptoms = [
  "Pipeline wygląda dobrze, ale zamknięć jest mniej niż obietnic.",
  "Handlowcy mówią „pisałem do niego, czekam” — ale ostatni mail był 11 dni temu.",
  "W „kontakt z klientem” siedzą deale z zerową aktywnością od miesięcy.",
  "Manager musi ręcznie sprawdzać, kto się komu odezwał i kiedy.",
  "Po urlopie albo zwolnieniu handlowca część leadów po prostu znika.",
  "Sprzedawcy reagują tylko na klientów, którzy sami napiszą drugi raz.",
];

const beforeSteps = [
  "Handlowiec wraca do biurka, otwiera CRM, scrolluje swoje deale.",
  "Próbuje sobie przypomnieć, gdzie skończyła się ostatnia rozmowa.",
  "Wysyła ad-hoc maila „odświeżającego” — bez kontekstu z poprzedniej rozmowy.",
  "Notuje sobie w głowie albo w kartce „zadzwonić w czwartek”.",
  "W czwartek jest pożar w innym deale — przesuwa kontakt na następny tydzień.",
  "Po dwóch tygodniach lead jest „zimny”, a handlowiec ma poczucie winy zamiast procesu.",
];

const afterSteps = [
  "Lead wpada w sekwencję dopasowaną do etapu deala i wartości kontraktu.",
  "CRM tworzy zadania kontaktowe automatycznie — z terminem, kanałem i kontekstem.",
  "Handlowiec dostaje rano listę „dziś do zrobienia” — bez przeglądania pipeline'u.",
  "Brak reakcji ze strony klienta uruchamia kolejne przypomnienie po określonym czasie.",
  "Po wyznaczonej liczbie prób bez odpowiedzi system eskaluje albo zamyka deal jako „brak kontaktu”.",
  "Manager widzi w raporcie: ile follow-upów wykonano, na które klient odpowiedział, ile się odbiło.",
];

const workflowSteps = [
  {
    n: "1",
    title: "Wejście do sekwencji",
    desc: "Po zmianie etapu deala (np. „wysłana oferta”) CRM automatycznie uruchamia odpowiednią sekwencję follow-upów.",
    accent: false,
  },
  {
    n: "2",
    title: "Pierwsze przypomnienie",
    desc: "Po 2 dniach roboczych: zadanie dla handlowca z gotowym szablonem maila i kontekstem ostatniej rozmowy.",
    accent: false,
  },
  {
    n: "3",
    title: "Drugi kontakt",
    desc: "Po 5 dniach: telefon albo wiadomość z innym kanałem (LinkedIn, SMS) — żeby nie dzwonić tym samym kanałem.",
    accent: true,
  },
  {
    n: "4",
    title: "Trzeci kontakt z konkretem",
    desc: "Po 10 dniach: wiadomość z nowym argumentem — case study, oferta czasowa, pytanie o decyzję.",
    accent: false,
  },
  {
    n: "5",
    title: "Reakcja klienta wstrzymuje sekwencję",
    desc: "Każda odpowiedź (mail, telefon, kliknięcie) automatycznie pauzuje sekwencję — handlowiec przejmuje kontrolę.",
    accent: false,
  },
  {
    n: "6",
    title: "Eskalacja albo zamknięcie",
    desc: "Po 20 dniach bez reakcji: deal trafia do kategorii „nurturing” lub jest zamykany ze statusem „brak kontaktu”. Bez ręcznego sprzątania.",
    accent: true,
  },
  {
    n: "7",
    title: "Raport efektywności",
    desc: "Manager dostaje co tydzień: ile follow-upów wysłano, jaka konwersja na odpowiedź, gdzie sekwencja się zacina.",
    accent: false,
  },
];

const firstStage = [
  "Mapowanie typów deali — które wymagają sekwencji, a które krótkiej eskalacji.",
  "Definicja 1–2 sekwencji: po wysłanej ofercie i po pierwszym kontakcie bez odpowiedzi.",
  "Konfiguracja zadań w CRM ze sztywnymi terminami i szablonami wiadomości.",
  "Mechanizm pauzy sekwencji po odpowiedzi klienta (na podstawie maila, kliknięcia lub aktywności).",
  "Prosty raport tygodniowy: liczba follow-upów, odpowiedzi, deali zamkniętych „brak kontaktu”.",
];

const mistakes = [
  "Sekwencje, które wysyłają mail nawet wtedy, gdy klient już odpowiedział — wyglądają jak spam.",
  "Identyczna sekwencja dla deala za 5 tys. zł i deala za 200 tys. zł — większy klient zasługuje na ręczną pracę handlowca.",
  "Brak limitu prób — system pisze do klienta po raz piąty zamiast oddać deal jako „nieaktywny”.",
  "Treści wysyłane przez automat z nazwiskiem handlowca, ale bez kontekstu — klient wyczuwa, że to bot.",
  "Brak monitoringu skuteczności — sekwencje działają, ale nikt nie sprawdza, czy w ogóle konwertują.",
];

const pricing = [
  {
    name: "Diagnoza follow-upu",
    price: "0 zł",
    description:
      "Analiza obecnych sekwencji, miejsc gdzie leady się gubią i propozycja pierwszego etapu automatyzacji.",
  },
  {
    name: "Pierwsza sekwencja",
    price: "od 1 800 zł",
    description:
      "Jedna sekwencja follow-upów dla wybranego etapu deala — zadania, szablony, pauza po odpowiedzi.",
    highlighted: true,
  },
  {
    name: "Pełny system follow-upów",
    price: "od 3 500 zł",
    description:
      "Sekwencje dla wszystkich etapów deala, raportowanie skuteczności, eskalacje i logika warunkowa.",
  },
];

const faq = [
  {
    question: "Czy automatyczne follow-upy nie wyglądają jak spam?",
    answer:
      "Wyglądają, jeśli ktoś po prostu wciska szablon w masówkę. Dobrze zaprojektowana sekwencja wstrzymuje się w momencie, gdy klient odpowie, używa kontekstu z poprzedniej rozmowy i ma maksymalnie 3–4 punkty kontaktu. To różnica między „przypomnieniem” a „nękaniem”.",
  },
  {
    question: "Czy handlowcy nie stracą kontroli nad swoimi dealami?",
    answer:
      "Wręcz odwrotnie. Dziś tracą kontrolę, bo polegają na pamięci. Po wdrożeniu mają codzienną listę „do zrobienia”, jasny status każdego deala i możliwość zatrzymania sekwencji jednym kliknięciem. To system pomaga handlowcowi, a nie nim zarządza.",
  },
  {
    question: "Jakie CRM-y obsługujesz przy automatyzacji follow-upów?",
    answer:
      "Najczęściej Pipedrive, HubSpot i Salesforce. Dla bardziej złożonych przypadków łączę CRM z n8n, Make albo własnym kodem przez API. Jeśli firma ma własne narzędzie albo Excel — też da się to zautomatyzować, tylko trzeba dobrać warstwę pośrednią.",
  },
  {
    question: "Czy sekwencje działają też dla telefonów, nie tylko maili?",
    answer:
      "Tak. Sekwencja może tworzyć zadania telefoniczne w CRM, wysyłać SMS-y, generować przypomnienia w Slacku. Najlepiej działa miks: mail w pierwszym kroku, telefon w drugim, wiadomość na LinkedIn w trzecim. Klient nie czuje, że to ten sam kanał walący po raz trzeci.",
  },
  {
    question: "Co jeśli mam już skonfigurowane sekwencje, ale działają słabo?",
    answer:
      "Wtedy zaczynamy od audytu: które sekwencje konwertują, które wysyłają się do klientów już zamkniętych, gdzie szablony są suche. Często wystarczy posprzątać 30% i dopasować logikę — bez przepisywania wszystkiego od zera.",
  },
  {
    question: "Ile trwa wdrożenie pierwszej sekwencji?",
    answer:
      "Pierwsza działająca sekwencja w CRM zwykle 5–10 dni roboczych — od mapowania procesu do testów na realnych dealach. Pełny system z eskalacjami i raportowaniem to zwykle 3–5 tygodni.",
  },
];

export default function AutomatyzacjaFollowUp() {
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Strona główna",
        item: "https://fluxlab.pl/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Automatyzacja follow-upów w CRM",
        item: "https://fluxlab.pl/automatyzacja-follow-up",
      },
    ],
  };

  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Automatyzacja follow-upów w CRM" }]} />

        {/* Hero */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-accent/10 to-transparent border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-label">Follow-up w CRM</span>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mt-4 mb-6 leading-tight">
                Automatyczne follow-upy w CRM bez utraty kontroli nad sprzedażą
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Sekwencje przypomnień, zadania kontaktowe i eskalacje, które
                pilnują każdego deala zamiast handlowca. CRM tworzy listę „dziś
                do zrobienia”, sam wstrzymuje sekwencję po odpowiedzi klienta i
                pokazuje, gdzie proces się zacina. Handlowiec wraca do
                sprzedawania, a manager przestaje zgadywać, co się dzieje w
                pipeline&rsquo;ie.
              </p>
              <div className="mt-8 flex justify-center">
                <TrackedCTA
                  href="/#kontakt"
                  location="article_automatyzacja-follow-up_hero"
                  label="zautomatyzuj follow-upy"
                  eventName="cta_click_article_audit"
                  className="btn-primary px-8 py-3.5 text-base"
                >
                  Zautomatyzuj follow-upy
                </TrackedCTA>
              </div>
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
                Diagnoza w 24h · mapa pierwszej sekwencji · bez zobowiązań
              </p>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">Problem</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 leading-tight">
                  Follow-up nie powinien zależeć od pamięci handlowca
                </h2>
              </div>
              <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-4 mb-10">
                <p>
                  W większości firm B2B follow-up to nie proces — to dobra
                  intencja. Handlowiec wraca z rozmowy, myśli „odezwę się za
                  tydzień”, zapisuje to gdzieś, a potem dzieją się trzy inne
                  rzeczy i odzywa się za trzy tygodnie. Albo wcale.
                </p>
                <p>
                  Statystycznie 80% sprzedaży B2B wymaga 5+ punktów kontaktu, a
                  44% handlowców rezygnuje po pierwszej próbie. To nie
                  motywacyjny problem. To problem systemu, który nie wymusza
                  rytmu.
                </p>
              </div>
              <ul className="space-y-3">
                {problemPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
                  >
                    <svg
                      className="flex-shrink-0 mt-0.5 text-accent"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M10 6v4M10 13v.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Objawy */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">Objawy</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                  Po czym poznać, że follow-up Ci się sypie
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
                  Te zachowania zwykle pojawiają się razem. Jeśli widzisz u
                  siebie 3 z 6 — masz problem, którego raport sprzedaży Ci nie
                  pokaże, bo dane już są skażone.
                </p>
              </div>
              <ul className="space-y-3">
                {symptoms.map((item) => (
                  <li
                    key={item}
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
                        d="M4 10l4 4 8-8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Koszt */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">Koszt problemu</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                  Ile kosztuje zaniedbany follow-up
                </h2>
              </div>
              <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-4">
                <p>
                  Załóżmy zespół 4 handlowców, każdy obsługuje średnio 30
                  aktywnych deali w pipeline&rsquo;ie. Średnia wartość kontraktu
                  B2B to 15 000 zł, średnia konwersja po pełnej sekwencji
                  follow-upów — 22%. Bez sekwencji konwersja spada do 9%, bo
                  połowa deali nie dostaje drugiego kontaktu.
                </p>
                <p>
                  Liczby na stole: 4 handlowców × 30 deali × 15 000 zł = 1,8 mln
                  zł aktywnego pipeline&rsquo;u. Różnica między 22% a 9%
                  konwersji to 234 000 zł niepodjętej sprzedaży kwartalnie.
                  Rocznie — niemal milion złotych, który handlowcy mieli w
                  zasięgu, ale nie zdążyli się odezwać.
                </p>
                <p>
                  Do tego doliczamy koszty miękkie: czas managera na
                  cotygodniowe „dlaczego do tego klienta nie pisałeś”,
                  frustrację zespołu, leady wracające do firmy konkurenta po 6
                  miesiącach bo „zapomnieliście o mnie”. To są pieniądze, które
                  już wydałeś na pozyskanie tych leadów — i puszczasz je dalej,
                  bo nie ma rytmu kontaktu.
                </p>
                <p>
                  Wdrożenie automatycznych follow-upów dla zespołu tej skali to
                  zwykle 4–8 tys. zł setupu i 200–400 zł miesięcznie utrzymania.
                  Zwrot przy odzyskaniu choćby 1 deala kwartalnie. Reszta to
                  czysty zysk.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Proces przed */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">Proces przed</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                  Jak follow-up wygląda dziś — łańcuch nadziei
                </h2>
              </div>
              <ol className="space-y-3">
                {beforeSteps.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-start gap-4 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center text-xs font-bold tabular-nums">
                      {i + 1}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Proces po */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">Proces po</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                  Jak follow-up wygląda po wdrożeniu
                </h2>
              </div>
              <ol className="space-y-3">
                {afterSteps.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-start gap-4 bg-white dark:bg-gray-800/60 border border-accent/30 rounded-xl px-5 py-4"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold tabular-nums">
                      {i + 1}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Diagram */}
        <section className="py-12 lg:py-16 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-2xl mb-10">
              <p className="section-label mb-3">Diagram</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Przykładowa sekwencja follow-upów po wysłanej ofercie
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                Tak wygląda sekwencja, którą buduję u większości klientów jako
                pierwszy etap. Każdy krok można uruchomić osobno i mierzyć
                konwersję po kolei.
              </p>
            </div>
            <ol className="relative max-w-4xl space-y-3 lg:space-y-4">
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
        </section>

        {/* Pierwszy etap */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">Pierwszy etap</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                  Co wdrożyć w pierwszym etapie
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
                  Najmniejszy kawałek, który zwykle daje widoczny efekt już w
                  drugim tygodniu. Bez przebudowy całego CRM, bez przepisywania
                  procesu.
                </p>
              </div>
              <ul className="space-y-3">
                {firstStage.map((item) => (
                  <li
                    key={item}
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
                        d="M4 10l4 4 8-8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-gray-600 dark:text-gray-400 leading-relaxed">
                Dwie sekwencje, jeden raport, jasna logika pauzy. Reszta —
                eskalacje, scoring, integracja z Slackiem, wielokanałowość —
                może poczekać do drugiego etapu, kiedy wiadomo już, że podstawa
                działa.
              </p>
            </div>
          </div>
        </section>

        {/* Błędy */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">Antywzorce</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                  Najczęstsze błędy w automatycznych follow-upach
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
                  Automatyzowanie bałaganu to tylko szybsze produkowanie
                  bałaganu. Jeśli widzisz któryś z tych wzorców u siebie —
                  najpierw posprzątaj logikę, potem skaluj.
                </p>
              </div>
              <ul className="space-y-3">
                {mistakes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
                  >
                    <svg
                      className="flex-shrink-0 mt-0.5 text-gray-400"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M5 5l10 10M15 5L5 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Cennik */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">Cennik</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                  Ile kosztuje automatyzacja follow-upów
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed max-w-2xl mx-auto">
                  Wycena zależy od liczby sekwencji, CRM-u, kanałów kontaktu i
                  poziomu raportowania. Poniżej orientacyjne widełki dla
                  typowych wdrożeń. Diagnoza zawsze bezpłatna.
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-6">
                {pricing.map((tier) => (
                  <div
                    key={tier.name}
                    className={`rounded-2xl p-6 border ${
                      tier.highlighted
                        ? "bg-accent-light dark:bg-accent-dark-light border-accent/30"
                        : "bg-white dark:bg-gray-800/60 border-gray-100 dark:border-gray-700"
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {tier.name}
                    </h3>
                    <p className="text-2xl font-bold text-accent mb-3">
                      {tier.price}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {tier.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <TrackedCTA
                  href="/automatyzacja-leadow-crm"
                  location="article_automatyzacja-follow-up_pricing"
                  label="zobacz pełną ofertę"
                  eventName="cta_click_article_audit"
                  className="btn-secondary px-6 py-3 text-base"
                >
                  Zobacz pełną ofertę
                </TrackedCTA>
                <TrackedCTA
                  href="/#kontakt"
                  location="article_automatyzacja-follow-up_pricing"
                  label="diagnoza"
                  eventName="cta_click_article_audit"
                  className="btn-primary px-8 py-3.5 text-base"
                >
                  Sprawdź koszt mojego procesu
                </TrackedCTA>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">FAQ</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                  Najczęstsze pytania o automatyzację follow-upów
                </h2>
              </div>
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
            </div>
          </div>
        </section>

        {/* Powiązane */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Zobacz też
              </h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                <li>
                  <Link
                    href="/crm-jako-system-pracy"
                    className="block bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4 hover:border-accent/40 transition-colors"
                  >
                    <span className="block font-semibold text-gray-900 dark:text-white">
                      CRM jako system pracy
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Jak zmienić CRM z notatnika w narzędzie egzekucji procesu
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/automatyzacja-crm"
                    className="block bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4 hover:border-accent/40 transition-colors"
                  >
                    <span className="block font-semibold text-gray-900 dark:text-white">
                      Automatyzacja CRM
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Pełny zakres automatyzacji w CRM dla zespołów B2B
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/automatyzacja-pipedrive"
                    className="block bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4 hover:border-accent/40 transition-colors"
                  >
                    <span className="block font-semibold text-gray-900 dark:text-white">
                      Automatyzacja Pipedrive
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      API, webhooki i logika sprzedażowa w Pipedrive
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/strefa-wiedzy/jak-uporzadkowac-proces-sprzedazy-w-crm"
                    className="block bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4 hover:border-accent/40 transition-colors"
                  >
                    <span className="block font-semibold text-gray-900 dark:text-white">
                      Jak uporządkować proces sprzedaży w CRM
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Artykuł: jak ułożyć etapy, pola i statusy w CRM
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 lg:py-24 bg-accent/10 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Przestań tracić deale przez „odezwę się w przyszłym tygodniu”
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                30 minut diagnozy, mapa pierwszej sekwencji follow-upów dla
                Twojego CRM-u, szacowany ROI. Bez sprzedażowej presji.
              </p>
              <TrackedCTA
                href="/#kontakt"
                location="article_automatyzacja-follow-up_final"
                label="zautomatyzuj follow-upy"
                eventName="cta_click_article_audit"
                className="btn-primary px-8 py-3.5 text-base"
              >
                Zautomatyzuj follow-upy
              </TrackedCTA>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                Odpowiedź w 24h · mapa procesu · bez zobowiązań
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
