import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TileVideo from "@/components/TileVideo";
import PoleAudytu from "@/components/PoleAudytu";
import WybierzBranze from "@/components/WybierzBranze";
import RachunekWJednymKlikniecu from "@/components/RachunekWJednymKlikniecu";
import { LICZBA_NARZEDZI } from "@/lib/narzedzia";
import { nazwaFilaru } from "@/lib/filary";

const PILLARS = [
  {
    href: "/automatyzacja-leadow-crm",
    img: "/abstract/automation.webp",
    video: "/abstract/automation.mp4",
    videoLight: "/abstract/automation-light.mp4",
    variant: "automation" as const,
    num: "01",
    desc: "Leady nie trafiają automatycznie do CRM, handlowiec zapomina o follow-upie, a raport składa się ręcznie przez pół dnia. Buduję przepływ, który robi to sam i nie gubi zgłoszeń.",
    cta: "Znajdź proces do automatyzacji",
    // Akcent: indigo
    ring: "group-hover:ring-accent/80 focus-visible:ring-accent",
    glow: "from-accent/35",
    numColor: "group-hover:text-accent",
    btn: "text-accent group-hover:bg-accent-solid group-hover:text-white",
  },
  {
    href: "/scraping-danych",
    img: "/abstract/data.webp",
    video: "/abstract/data.mp4",
    videoLight: "/abstract/data-light.mp4",
    variant: "data" as const,
    num: "02",
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

// Trzy liczby z wlasnych pomiarow na tej samej probce 386 domen. Nie mamy
// referencji od klientow, wiec dowodem jest to, co sami policzylismy i co
// kazdy moze powtorzyc. Stoja na dole strony, a nie tuz pod haslem, bo jako
// pierwsza tresc odpowiadaly na pytanie, ktorego nikt nie zadal: osoba z
// biura rachunkowego dowiadywala sie najpierw, ile salonow samochodowych da
// sie podszyc mailowo. Jako dowod kompetencji dzialaja, jako powitanie nie.
const BADANIA = [
  {
    href: "/strefa-wiedzy/podszywanie-pod-salony-samochodowe",
    liczba: "84%",
    opis: "salonów samochodowych, pod które da się podszyć mailowo",
  },
  {
    href: "/strefa-wiedzy/czy-ai-widzi-strony-dealerow",
    liczba: "54%",
    opis: "stron nie mówi asystentom AI, czym w ogóle jest firma",
  },
  {
    href: "/strefa-wiedzy/co-jest-nie-tak-ze-stronami-dealerow",
    liczba: "386",
    opis: "sprawdzonych stron dealerów, z metodą i zastrzeżeniami",
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
          <p className="mt-1.5 text-xs text-gray-500 dark:text-white/60">
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
              Sprawdź swoją firmę {LICZBA_NARZEDZI} narzędziami, bez rejestracji{" "}
              <span
                aria-hidden="true"
                className="inline-block transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </span>
          </Link>

          {/* Jedyna rzecz, ktora dotyczy kazdego, kto tu trafil: jego wlasna
              strona. Wynik jest na ekranie, zanim ktokolwiek poprosi go o
              adres e-mail. */}
          <PoleAudytu />
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
                  {nazwaFilaru(p.href)}
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


        {/* Strona glowna to 20 z 50 odslon na dobe, a uruchomien narzedzi
            bylo zero. Kazdy wynik lezal za przejsciem na inna strone. Ten
            blok daje kwote na miejscu, po jednym kliknieciu. */}
        <RachunekWJednymKlikniecu />

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

        <WybierzBranze />

        {/* Dowod kompetencji dla firmy bez ani jednego klienta. Liczby z
            wlasnego pomiaru, z podana probka i metoda, zeby kazdy mogl je
            powtorzyc i sprawdzic. Na dole, a nie pod haslem: to jest odpowiedz
            na pytanie "skad mam wiedziec, ze on sie na tym zna", a takie
            pytanie pada po przeczytaniu oferty, nie przed. */}
        <section className="relative z-20 border-t border-gray-200 px-6 py-12 dark:border-white/10 lg:px-10 lg:py-16">
          <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white/90 lg:text-2xl">
            Skąd mam wiedzieć, że się na tym znam
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-gray-600 dark:text-white/60">
            Nie mam jeszcze klientów, więc nie pokażę Wam cudzych logotypów ani
            opinii. Zamiast tego pokazuję, co sam zmierzyłem. Wziąłem 386 stron
            dealerów samochodowych, bo to branża, w której łatwo o porównywalną
            próbkę, i sprawdziłem je tymi samymi narzędziami, które stoją na tej
            stronie. Przy każdym badaniu jest metoda i zastrzeżenia, więc można
            je powtórzyć i sprawdzić, czy się mylę.
          </p>
          <div className="mt-6 grid max-w-3xl gap-3 sm:grid-cols-3">
            {BADANIA.map((b) => (
              <Link
                key={b.href}
                href={b.href}
                className="group rounded-xl border border-gray-200 bg-white/60 p-4 transition-colors hover:border-accent/70 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-accent/70"
              >
                <span className="block text-xl font-bold tabular-nums text-gray-900 dark:text-white">
                  {b.liczba}
                </span>
                <span className="mt-1 block text-sm text-gray-600 dark:text-white/60">
                  {b.opis}
                </span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  Nasze badanie
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
