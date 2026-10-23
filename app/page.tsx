import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TloHero from "@/components/TloHero";
import KartaPoswiata from "@/components/KartaPoswiata";
import LandingForm from "@/components/LandingForm";
import PasekAkcji from "@/components/PasekAkcji";
import PoleAudytu from "@/components/PoleAudytu";
import WitajPonownie from "@/components/WitajPonownie";
import IntroZnaku from "@/components/IntroZnaku";
import EtykietaNocna from "@/components/EtykietaNocna";
import NaglowekSklada from "@/components/NaglowekSklada";
import PodtytulZrodlo from "@/components/PodtytulZrodlo";
import RevealOnScroll from "@/components/RevealOnScroll";
import ScenaLeada from "@/components/ScenaLeada";
import CountUp from "@/components/CountUp";
import KrokiSticky from "@/components/KrokiSticky";
import Manifest from "@/components/Manifest";
import PisanyTekst from "@/components/PisanyTekst";
import { nazwaFilaru } from "@/lib/filary";
import NapisBoczny from "@/components/NapisBoczny";
import { Ikona, type NazwaIlustracji } from "@/components/Ilustracje";

// Oferta jak w szkoleniu produktowym (16.10.2026): projekty z ceną z góry,
// FluxCRM jako produkt flagowy, katalog małych usług jako wejście.
const OFERTA = [
  {
    href: "/strony-www",
    nazwa: nazwaFilaru("/strony-www"),
    cena: "naprawa od 150 zł",
    opis: "Naprawa i poprawki obecnej strony albo nowa: landing, strona z CMS, sklep. Formularz trafia od razu do CRM albo na Twoją skrzynkę.",
    punkty: [
      "naprawa i poprawki: 150 / 290 / 490 zł",
      "strona w tydzień, do 5 podstron: 2 900 zł",
      "strona firmowa z CMS: 5 900 zł, sklep od 9 900 zł",
      "opieka nad stroną i Profilem Google: od 300 zł/mies.",
    ],
    cta: "Zobacz strony",
    ikona: "strony" as NazwaIlustracji,
    wyrozniona: true,
  },
  {
    href: "/wlasny-crm",
    nazwa: "Własny CRM",
    cena: "wdrożenie od 1 zł",
    opis: "Lead z formularza, telefonu i poczty trafia sam do handlowca, z zadaniem „zadzwoń w 15 minut”.",
    punkty: [
      "abonament 499 zł/mies. do 3 osób, potem 99 zł za osobę",
      "pilotaż do 3 osób: wdrożenie 1 zł, miejsca ograniczone",
      "z dowolnymi integracjami: 12 900 zł, z narzędziami AI: 24 900 zł i 999 zł/mies.",
    ],
    cta: "Zobacz CRM",
    ikona: "crm" as NazwaIlustracji,
  },
  {
    href: "/automatyzacja-leadow-crm",
    nazwa: nazwaFilaru("/automatyzacja-leadow-crm"),
    cena: "od 900 zł",
    opis: "Jeden proces od początku do końca: dokumenty, raporty, KSeF, połączenie CRM z ERP.",
    punkty: [
      "pierwszy krok: 900 / 1 200 / 1 500 zł w 5 dni, cała ścieżka od 2 500 zł",
      "integracje przez API",
      "cena z góry, bez rozliczania godzin",
    ],
    cta: "Zobacz automatyzacje",
    ikona: "automatyzacje" as NazwaIlustracji,
  },
];

const KROKI = [
  ["Piszesz, czego potrzebujesz", "Dwa zdania w formularzu albo mail."],
  ["Dostajesz cenę i termin", "Tego samego dnia, bez spotkań."],
  ["Strona albo CRM działa po 2\u2060–\u20603\u00a0tygodniach", "Płacisz za efekt, nie za godziny."],
];

const MANIFEST = KROKI[2][1];

const WYNIKI = [
  ["12 dni", "od startu prac do publikacji, przy terminie 5 tygodni"],
  ["97/100", "w audycie technicznym, stara strona miała 45"],
  ["6,4×", "mniej danych do pobrania niż na starej stronie"],
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-white pt-16">
        <TloHero />
        <section className="relative z-10 mx-auto flex min-h-[72vh] w-full max-w-6xl flex-col items-center justify-center px-6 pt-16 pb-16 text-center lg:pt-20">
          <WitajPonownie />
          <IntroZnaku />
          <EtykietaNocna />
          <NaglowekSklada tekst="Strony internetowe i CRM dla firm" wyroznione={["dla", "firm"]} />
          <PodtytulZrodlo />
          <div className="animate-fade-up-1 mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <a
              href="#kontakt"
              className="btn-primary btn-lg poswiata-przycisku w-full sm:w-60"
            >
              Zamów wycenę
            </a>
            <Link
              href="/audyt-strony"
              className="btn-secondary btn-lg w-full sm:w-60"
            >
              Sprawdź swoją stronę
            </Link>
          </div>
        </section>

        <section aria-labelledby="oferta" className="container-wide relative pb-16">
          <NapisBoczny tekst="Oferta" />
          <h2 id="oferta" className="sr-only">
            Oferta
          </h2>
          <p aria-hidden="true" className="section-label mb-6 text-center">
            <span className="tabular-nums opacity-60">01</span> Oferta
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            {OFERTA.map((o, i) => (
              <RevealOnScroll
                key={o.href}
                delay={(i + 1) as 1 | 2 | 3}
                className={`flex ${i === 0 ? "md:col-span-2" : ""}`}
              >
                <KartaPoswiata
                  href={o.href}
                  className={`group flex w-full flex-col rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl hover:shadow-accent/10 ${
                    o.wyrozniona
                      ? "border-accent/60 bg-accent/5"
                      : "border-gray-200 dark:border-white/10"
                  }`}
                >
                  <Ikona nazwa={o.ikona} className="mb-4 h-11 w-11" />
                  <h3 className="text-xl font-bold">{o.nazwa}</h3>
                  <p className="mt-2 text-2xl font-bold text-accent">
                    <CountUp value={o.cena} spadek />
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-white/70">
                    {o.opis}
                  </p>
                  <div className="oferta-detale">
                    <ul className={`gap-x-8 gap-y-1.5 pt-4 text-sm text-gray-700 dark:text-white/80 ${o.wyrozniona ? "md:grid md:grid-cols-2" : "space-y-1.5"}`}>
                      {o.punkty.map((p) => (
                        <li key={p} className="flex gap-2">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path className="oferta-ptak" d="M3 8.5l3.2 3.2L13 4.5" />
                          </svg>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="mt-auto pt-6 text-sm font-semibold text-accent group-hover:underline">
                    {o.cta} →
                  </span>
                </KartaPoswiata>
              </RevealOnScroll>
            ))}
          </div>
          <RevealOnScroll as="p" className="mt-6 text-center text-sm text-gray-600 dark:text-white/60">
            Ceny netto. Na start bez rozmowy:{" "}
            <Link href="/audyt-strony" className="text-accent hover:underline">
              audyt strony 0 zł
            </Link>
            ,{" "}
            <Link
              href="/audyt-strony#audyt-calosci"
              className="text-accent hover:underline"
            >
              audyt wszystkich podstron 10 zł
            </Link>
            , pozostałe drobne usługi w{" "}
            <Link href="/produkty" className="text-accent hover:underline">
              cenniku
            </Link>
            .
          </RevealOnScroll>
        </section>

        <section aria-label="Zasada" className="maska-sekcji bg-accent-solid py-20 text-white lg:py-32">
          <div className="container-wide">
          <Manifest
            tekst={MANIFEST}
            className="mx-auto max-w-3xl text-balance text-center text-4xl font-bold leading-tight tracking-tighter lg:text-6xl"
          />
          </div>
        </section>

        <section className="relative border-t border-gray-200 dark:border-white/10 overflow-x-clip py-24 lg:py-32">
          <NapisBoczny tekst="Realizacja" />
          <div className="container-wide">
            <RevealOnScroll className="text-center">
              <p className="section-label mb-3"><span className="tabular-nums opacity-60">02</span> Ostatnia realizacja</p>
              <h2 className="text-balance text-4xl font-bold tracking-tighter lg:text-5xl">
                Nowa strona FINREAL w 12 dni
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={1}>
              <div className="ramka-3d relative mx-auto mt-12 max-w-5xl">
                <span
                  aria-hidden="true"
                  className="paralaksa-a absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br from-accent-solid to-indigo-800 sm:-right-10 sm:-top-10 sm:h-40 sm:w-40"
                />
                <span
                  aria-hidden="true"
                  className="paralaksa-b absolute -bottom-6 -left-6 h-24 w-24 rounded-full border-2 border-accent/40 sm:-bottom-10 sm:-left-10 sm:h-36 sm:w-36"
                />
                <div className="relative rounded-[1.75rem] bg-gradient-to-br from-accent-solid via-indigo-500/60 to-indigo-800 p-[3px] shadow-2xl shadow-accent/20">
                  <div className="overflow-hidden rounded-[1.6rem] bg-white dark:bg-gray-900">
                    <div className="flex items-center gap-1.5 bg-gray-900 px-5 py-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                      <span className="mx-auto rounded-full bg-white/10 px-4 py-1 text-xs text-white/70">
                        finreal.pl
                      </span>
                      <Link href="/realizacje" className="text-xs text-white/70 transition-colors hover:text-white">
                        Realizacje →
                      </Link>
                    </div>
                    {/* Zwykły <img> z tym samym srcset co next/image: sam komponent
                        dokłada do pierwszego ładunku skryptów ok. 5 kB. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/_next/image?url=%2Fphotos%2Frealizacja-finreal-2x.webp&w=3840&q=90"
                      srcSet="/_next/image?url=%2Fphotos%2Frealizacja-finreal-2x.webp&w=640&q=90 640w, /_next/image?url=%2Fphotos%2Frealizacja-finreal-2x.webp&w=750&q=90 750w, /_next/image?url=%2Fphotos%2Frealizacja-finreal-2x.webp&w=828&q=90 828w, /_next/image?url=%2Fphotos%2Frealizacja-finreal-2x.webp&w=1080&q=90 1080w, /_next/image?url=%2Fphotos%2Frealizacja-finreal-2x.webp&w=1200&q=90 1200w, /_next/image?url=%2Fphotos%2Frealizacja-finreal-2x.webp&w=1920&q=90 1920w, /_next/image?url=%2Fphotos%2Frealizacja-finreal-2x.webp&w=2048&q=90 2048w, /_next/image?url=%2Fphotos%2Frealizacja-finreal-2x.webp&w=3840&q=90 3840w"
                      alt="Nowa strona finreal.pl zrobiona przez FluxLab"
                      width={2880}
                      height={1620}
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 1024px) 1024px, 100vw"
                      className="h-auto w-full"
                      style={{ color: "transparent" }}
                    />
                  </div>
                </div>
              </div>
            </RevealOnScroll>
            <dl className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-10 text-center sm:grid-cols-3">
              {WYNIKI.map(([liczba, opis], i) => (
                <RevealOnScroll key={liczba} delay={(i + 1) as 1 | 2 | 3}>
                  <dt className="liczba-obrys text-5xl font-bold tracking-tighter lg:text-6xl">
                    <CountUp value={liczba} />
                  </dt>
                  <dd className="mx-auto mt-2 max-w-[15rem] text-balance text-sm text-gray-600 dark:text-white/65">
                    {opis}
                  </dd>
                </RevealOnScroll>
              ))}
            </dl>
          </div>
        </section>

        <section className="relative border-t border-gray-200 dark:border-white/10 py-20 lg:py-24">
          <NapisBoczny tekst="Audyt" />
          <div className="container-wide">
            <RevealOnScroll className="text-center">
              <Ikona nazwa="audyt" className="mx-auto mb-4 h-11 w-11" />
              <p className="section-label mb-3"><span className="tabular-nums opacity-60">03</span> Audyt</p>
              <h2 className="text-balance text-4xl font-bold tracking-tighter lg:text-5xl">
                <PisanyTekst id="audyt" tekst="Sprawdź swoją stronę w minutę" />
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={1}>
              <PoleAudytu />
            </RevealOnScroll>
          </div>
        </section>

        <section className="relative border-t border-gray-200 dark:border-white/10 py-24 lg:py-32">
          <NapisBoczny tekst="CRM" />
          <div className="container-wide">
            <RevealOnScroll className="mb-12 text-center">
              <p className="section-label mb-3"><span className="tabular-nums opacity-60">04</span> CRM</p>
              <h2 className="text-balance text-4xl font-bold tracking-tighter lg:text-5xl">
                <PisanyTekst id="crm" tekst="Twój CRM czyta zapytanie, zanim Ty je przeczytasz" />
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-600 dark:text-white/65">
                Wybierz firmę i wyślij zapytanie jak jej klient. AI założy kartę leada w jej CRM i
                przygotuje odpowiedź, na żywo.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={1}>
              <ScenaLeada />
            </RevealOnScroll>
          </div>
        </section>

        <section
          id="kontakt"
          className="scroll-mt-20 border-t border-gray-200 dark:border-white/10 py-16"
        >
          <div className="container-wide">
            <RevealOnScroll>
<LandingForm
              formId="home"
              heading="Napisz, czego potrzebujesz"
              intro="Odpiszemy z ceną i terminem, tego samego dnia."
              submitLabel="Wyślij i poproś o cenę"
            />
</RevealOnScroll>
            <KrokiSticky kroki={KROKI} />
          </div>
        </section>
      </main>
      <PasekAkcji />
      <Footer />
    </>
  );
}
