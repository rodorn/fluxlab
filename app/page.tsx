import Link from "next/link";
import Header from "@/components/Header";
import TileVideo from "@/components/TileVideo";

const PILLARS = [
  {
    href: "/automatyzacja-leadow-crm",
    img: "/abstract/automation.webp",
    video: "/abstract/automation.mp4",
    videoLight: "/abstract/automation-light.mp4",
    variant: "automation" as const,
    num: "01",
    title: "Automatyzacja procesów",
    desc: "Leady nie trafiają automatycznie do CRM, handlowiec zapomina o follow-upie, a raport składa się ręcznie przez pół dnia. Buduję przepływ, który robi to sam i nie gubi zgłoszeń.",
    cta: "Znajdź proces do automatyzacji",
    // Akcent: indigo
    ring: "group-hover:ring-accent/80 focus-visible:ring-accent",
    glow: "from-accent/35",
    numColor: "group-hover:text-accent",
    btn: "text-accent group-hover:bg-accent group-hover:text-white",
  },
  {
    href: "/scraping-danych",
    img: "/abstract/data.webp",
    video: "/abstract/data.mp4",
    videoLight: "/abstract/data-light.mp4",
    variant: "data" as const,
    num: "02",
    title: "Integracje i dane",
    desc: "Dane leżą w kilku systemach i w Excelach, a ERP nie rozmawia z CRM. Spinam je przez API, porządkuję i zamieniam w raport, który przychodzi sam.",
    cta: "Zobacz, jak spiąć systemy",
    // Akcent: zieleń
    ring: "group-hover:ring-emerald-400/80 focus-visible:ring-emerald-400",
    glow: "from-emerald-500/35",
    numColor: "group-hover:text-emerald-300",
    btn: "text-emerald-300 group-hover:bg-emerald-500 group-hover:text-white",
  },
  {
    href: "/strony-www",
    img: "/abstract/web.webp",
    video: "/abstract/web.mp4",
    videoLight: "/abstract/web-light.mp4",
    variant: "web" as const,
    num: "03",
    title: "Systemy i strony",
    desc: "Aplikacje webowe, panele i formularze, które są częścią procesu, a nie osobnym bytem. Strona firmowa też, ale jako element całości, nie jako produkt sam w sobie.",
    cta: "Zobacz, co buduję",
    // Akcent: fiolet
    ring: "group-hover:ring-violet-400/80 focus-visible:ring-violet-400",
    glow: "from-violet-500/35",
    numColor: "group-hover:text-violet-300",
    btn: "text-violet-300 group-hover:bg-violet-500 group-hover:text-white",
  },
];

const PROBLEMY = [
  {
    href: "/automatyzacja-formularza-do-pipedrive",
    zdanie: "Zgłoszenia z formularza przepisujemy do CRM ręcznie",
    skutek:
      "Przy kilkunastu leadach dziennie to godzina pracy i regularnie gubiona jedna sprawa.",
    cta: "Zobacz, jak to spiąć",
  },
  {
    href: "/czas-reakcji-na-leada",
    zdanie: "Handlowiec oddzwania po dwóch dniach albo wcale",
    skutek:
      "Klient w tym czasie zdążył dostać ofertę od kogoś, kto odezwał się w kwadrans.",
    cta: "Policz, ile to kosztuje",
  },
  {
    href: "/automatyzacja-follow-up",
    zdanie: "Follow-upy giną, bo nikt ich nie pilnuje",
    skutek:
      "Deale stoją tygodniami w tym samym etapie i nikt nie wie, na kogo czekają.",
    cta: "Zobacz przepływ",
  },
  {
    href: "/automatyzacja-raportowania",
    zdanie: "Raport sprzedaży składam ręcznie przez pół dnia",
    skutek:
      "Co miesiąc ta sama robota: eksport, sklejanie w Excelu, przeliczanie, wysyłka.",
    cta: "Zobacz, co da się zautomatyzować",
  },
  {
    href: "/integracje-api",
    zdanie: "ERP nie rozmawia z CRM, dane żyją w kilku Excelach",
    skutek:
      "Każdy dział ma swoją wersję prawdy, a uzgodnienie jej zajmuje więcej niż sama praca.",
    cta: "Zobacz, jak łączę systemy",
  },
  {
    href: "/automatyczne-przypisywanie-leadow",
    zdanie: "Leady wpadają bez właściciela i leżą",
    skutek:
      "Nikt nie czuje się za nie odpowiedzialny, więc odzywa się do nich ktoś przypadkiem.",
    cta: "Zobacz zasady przydziału",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-white min-h-screen pt-16">
        {/* Hasło */}
        <div className="relative z-20 px-6 lg:px-10 pt-7 pb-6 lg:pb-8 col-enter-1">
          <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white/90">
            Automatyzuję procesy sprzedaży i operacji w firmach B2B
          </h1>
          <p className="mt-2 max-w-3xl text-sm lg:text-base text-gray-600 dark:text-white/60">
            Łączę CRM, formularze, maile, API i raportowanie tak, żeby ludzie
            przestali ręcznie przepisywać dane i pilnować procesów.
          </p>
          <p className="mt-1.5 text-xs text-gray-500 dark:text-white/40">
            Pipedrive · HubSpot · Make · n8n · API · Python
          </p>
          {/* Darmowe narzedzia to najnizszy prog wejscia, jaki mamy, a strona
              glowna milczala o nich az do stopki, czyli na telefonie po
              przewinieciu trzech pelnoekranowych kafli. Liczbe trzymamy zgodna
              z lista na /narzedzia. */}
          <Link
            href="/narzedzia"
            className="group mt-3 inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600 dark:text-white/60 hover:text-accent dark:hover:text-accent transition-colors"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Za darmo
            </span>
            <span>
              Sprawdź swoją firmę dwunastoma narzędziami, bez rejestracji{" "}
              <span
                aria-hidden="true"
                className="inline-block transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </span>
          </Link>

          {/* Wlasne badania to jedyna tresc, ktorej nikt inny nie ma, a lezaly
              trzy klikniecia od strony glownej. Link stad daje im tez sciezke
              dla robota wyszukiwarki. */}
          <p className="mt-2 text-sm text-gray-600 dark:text-white/60">
            Nasze badania:{" "}
            <Link
              href="/strefa-wiedzy/co-jest-nie-tak-ze-stronami-dealerow"
              className="text-accent hover:underline"
            >
              sprawdziliśmy 386 stron dealerów
            </Link>
            {" "}oraz{" "}
            <Link
              href="/strefa-wiedzy/podszywanie-pod-salony-samochodowe"
              className="text-accent hover:underline"
            >
              pod 84 procent z nich można się podszyć mailowo
            </Link>
            .
          </p>
        </div>

        {/* 3 kolumny wyboru, zaokrąglone karty z odstępem */}
        <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 px-4 lg:px-5 pb-4 lg:pb-5">
          {PILLARS.map((p, idx) => (
            <Link
              key={p.href}
              href={p.href}
              className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl min-h-[34vh] lg:min-h-[56vh] ring-1 ring-gray-200 dark:ring-white/10 transition-all duration-300 focus:outline-none ${p.ring} hover:ring-2 ${
                ["col-enter-1", "col-enter-2", "col-enter-3"][idx]
              }`}
            >
              {/* Animowane tło, zapętlone wideo (Sora): płynna pętla
                  ping-pong, 10× wolniej, pełna prędkość na hover */}
              <TileVideo
                srcDark={p.video}
                srcLight={p.videoLight}
                poster={p.img}
              />
              {/* Przyciemnienie dla czytelności */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/55 to-gray-950/10 transition-all duration-500 group-hover:from-gray-950/90 group-hover:via-gray-950/35" />
              {/* Akcentowa poświata od dołu, kolor filaru, na hover */}
              <div
                aria-hidden="true"
                className={`absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t ${p.glow} to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />

              {/* Treść, unosi się na hover */}
              <div className="relative p-7 lg:p-9 transition-transform duration-500 ease-out group-hover:-translate-y-2">
                <span
                  className={`text-sm font-mono text-white/40 transition-colors duration-300 ${p.numColor}`}
                >
                  {p.num}
                </span>
                <h2 className="mt-1.5 text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-white">
                  {p.title}
                </h2>
                <p className="mt-2.5 text-sm lg:text-base text-white/65 leading-relaxed max-w-sm">
                  {p.desc}
                </p>
                <span
                  className={`mt-5 inline-flex items-center gap-2 rounded-lg px-3 py-1.5 -ml-3 text-sm font-semibold transition-all duration-300 group-hover:gap-3.5 ${p.btn}`}
                >
                  {p.cta}
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>


        {/* Klient nie szuka "automatyzacji", tylko konca konkretnej
            uciazliwosci. Te szesc zdan to jego slowa, a nie moje nazwy
            kategorii, i kazde prowadzi do strony, ktora opisuje wlasnie ten
            jeden przypadek. */}
        <section className="relative z-20 px-6 lg:px-10 py-12 lg:py-16 border-t border-gray-200 dark:border-white/10">
          <h2 className="text-xl lg:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white/90">
            Najczęściej rozwiązuję
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-gray-600 dark:text-white/60">
            Jeśli któreś z tych zdań brzmi jak Twoja firma, kliknij. Pod każdym
            opisałem, na czym dokładnie polega problem, ile kosztuje i co
            zostaje po wdrożeniu.
          </p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PROBLEMY.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="group flex h-full flex-col rounded-xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/[0.03] p-5 transition-colors hover:border-accent/70 dark:hover:border-accent/70"
                >
                  <span className="text-[15px] font-semibold leading-snug text-gray-900 dark:text-white/90">
                    {p.zdanie}
                  </span>
                  <span className="mt-2 text-sm text-gray-600 dark:text-white/55">
                    {p.skutek}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    {p.cta}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Dolny pasek */}
        <footer className="relative z-20 flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 px-6 py-3.5 text-xs text-gray-500 dark:text-white/40 border-t border-gray-200 dark:border-white/10">
          <Link
            href="/produkty"
            className="hover:text-gray-900 dark:hover:text-white/70 transition-colors"
          >
            Produkty
          </Link>
          <Link
            href="/narzedzia"
            className="font-semibold text-accent hover:underline transition-colors"
          >
            Darmowe narzędzia
          </Link>
          <Link
            href="/jak-pracuje"
            className="hover:text-gray-900 dark:hover:text-white/70 transition-colors"
          >
            Jak pracuję
          </Link>
          <Link
            href="/strefa-wiedzy"
            className="hover:text-gray-900 dark:hover:text-white/70 transition-colors"
          >
            Strefa wiedzy
          </Link>
          <Link
            href="/pilotaz"
            className="hover:text-gray-900 dark:hover:text-white/70 transition-colors"
          >
            Program case study
          </Link>
          <Link
            href="/kontakt"
            className="hover:text-gray-900 dark:hover:text-white/70 transition-colors"
          >
            Kontakt
          </Link>
        </footer>
      </main>
    </>
  );
}
