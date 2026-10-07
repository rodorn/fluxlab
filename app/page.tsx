import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TileVideo from "@/components/TileVideo";
import PoleAudytu from "@/components/PoleAudytu";
import { LICZBA_NARZEDZI } from "@/lib/narzedzia";
import { nazwaFilaru } from "@/lib/filary";

const PILLARS = [
  {
    href: "/automatyzacja-leadow-crm",
    img: "/abstract/automation.webp",
    imgLight: "/abstract/automation-light.webp",
    video: "/abstract/automation.mp4",
    videoLight: "/abstract/automation-light.mp4",
    variant: "automation" as const,
    desc: "Leady nie trafiają automatycznie do CRM, handlowiec zapomina o follow-upie, a raport składa się ręcznie przez pół dnia. Budujemy przepływ, który robi to sam i nie gubi zgłoszeń.",
    cta: "Znajdź proces do automatyzacji",
  },
  {
    href: "/scraping-danych",
    img: "/abstract/data.webp",
    imgLight: "/abstract/data-light.webp",
    video: "/abstract/data.mp4",
    videoLight: "/abstract/data-light.mp4",
    variant: "data" as const,
    desc: "Dane leżą w kilku systemach i w Excelach, a ERP nie rozmawia z CRM. Spinamy je przez API, porządkujemy i zamieniamy w raport, który przychodzi sam.",
    cta: "Zobacz, jak spiąć systemy",
  },
  {
    href: "/strony-www",
    img: "/abstract/web.webp",
    imgLight: "/abstract/web-light.webp",
    video: "/abstract/web.mp4",
    videoLight: "/abstract/web-light.mp4",
    variant: "web" as const,
    desc: "Aplikacje webowe, panele i formularze, które są częścią procesu, a nie osobnym bytem. Strona firmowa też, ale jako element całości, nie jako produkt sam w sobie.",
    cta: "Zobacz, co budujemy",
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
    zdanie: "Raport sprzedaży składamy ręcznie przez pół dnia",
    skutek:
      "Co miesiąc to samo: eksport, sklejanie w Excelu, przeliczanie, wysyłka.",
    cta: "Zobacz, co da się zautomatyzować",
  },
  {
    href: "/integracje-api",
    zdanie: "ERP nie rozmawia z CRM, dane żyją w kilku Excelach",
    skutek:
      "Każdy dział ma swoją wersję prawdy, a uzgodnienie jej zajmuje więcej niż sama praca.",
    cta: "Zobacz, jak łączymy systemy",
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
        {/* Hasło: jedno zdanie, jedno wyjaśnienie, jedna akcja. Wcześniej pod
            nagłówkiem stało sześć elementów drobnym drukiem, a nagłówki kafli
            były większe od hasła. */}
        <div className="relative z-20 mx-auto w-full max-w-4xl px-6 pt-16 pb-14 text-center lg:pt-24 lg:pb-20">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
            Automatyzujemy sprzedaż i{"\u00a0"}operacje w firmach B2B
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-gray-600 sm:text-lg dark:text-white/65">
            Łączymy CRM, formularze, maile i raporty tak, żeby ludzie przestali
            ręcznie przepisywać dane i pilnować procesów.
          </p>
          <PoleAudytu />
          <p className="mt-4 text-sm text-gray-500 dark:text-white/50">
            Albo{" "}
            <Link
              href="/narzedzia"
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              sprawdź firmę {LICZBA_NARZEDZI} darmowymi narzędziami
            </Link>
            .
          </p>
        </div>

        {/* Trzy filary */}
        <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-4 pb-16 md:grid-cols-3 lg:gap-5 lg:px-6">
          {PILLARS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group relative flex h-[22rem] flex-col justify-end overflow-hidden rounded-2xl bg-white dark:bg-gray-950 ring-1 ring-gray-200 dark:ring-white/10 transition-all duration-300 focus:outline-none group-hover:ring-accent/80 focus-visible:ring-accent hover:ring-2"
            >
              <TileVideo
                srcDark={p.video}
                srcLight={p.videoLight}
                poster={p.img}
                posterLight={p.imgLight}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-white/30 transition-all duration-500 group-hover:via-white/70 dark:from-gray-950 dark:via-gray-950/60 dark:to-gray-950/10 dark:group-hover:from-gray-950/90 dark:group-hover:via-gray-950/40" />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-accent/15 dark:from-accent/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative p-6 lg:p-7 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {nazwaFilaru(p.href)}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-white/70">
                  {p.desc}
                </p>
                <span
                  className="mt-4 inline-flex items-center gap-2 rounded-lg px-3 py-1.5 -ml-3 text-sm font-semibold text-accent dark:text-white transition-all duration-300 group-hover:gap-3 group-hover:bg-accent-solid group-hover:text-white"
                >
                  {p.cta}
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Klient nie szuka "automatyzacji", tylko konca konkretnej
            uciazliwosci. Te szesc zdan to jego slowa, a nie nasze nazwy
            kategorii, i kazde prowadzi do strony, ktora opisuje wlasnie ten
            jeden przypadek. */}
        <section className="relative z-20 py-12 lg:py-16 px-[max(1.5rem,calc((100%-72rem)/2+1.5rem))] border-t border-gray-200 dark:border-white/10">
          <h2 className="text-xl lg:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white/90">
            Najczęściej rozwiązujemy
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-gray-600 dark:text-white/60">
            Jeśli któreś z tych zdań brzmi jak Twoja firma, kliknij. Pod każdym
            opisaliśmy, na czym dokładnie polega problem, ile kosztuje i co
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

        {/* Dowod kompetencji dla firmy bez ani jednego klienta. Liczby z
            wlasnego pomiaru, z podana probka i metoda, zeby kazdy mogl je
            powtorzyc i sprawdzic. Na dole, a nie pod haslem: to jest odpowiedz
            na pytanie "skad mamy wiedziec, ze on sie na tym zna", a takie
            pytanie pada po przeczytaniu oferty, nie przed. */}
        <section className="relative z-20 border-t border-gray-200 py-12 dark:border-white/10 lg:py-16 px-[max(1.5rem,calc((100%-72rem)/2+1.5rem))]">
          <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white/90 lg:text-2xl">
            Skąd mamy wiedzieć, że się na tym znamy
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-gray-600 dark:text-white/60">
            Nie pokazujemy cudzych logotypów. Pokazujemy, co sami zmierzyliśmy
            na 386 stronach dealerów tymi samymi narzędziami, które są tutaj,
            z metodą, którą każdy może powtórzyć.
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
