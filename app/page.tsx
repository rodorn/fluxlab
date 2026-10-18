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
import MiastoHero from "@/components/MiastoHero";
import RevealOnScroll from "@/components/RevealOnScroll";
import ScenaLeada from "@/components/ScenaLeada";
import CountUp from "@/components/CountUp";
import KrokiSticky from "@/components/KrokiSticky";
import Manifest from "@/components/Manifest";
import { nazwaFilaru } from "@/lib/filary";

// Oferta jak w szkoleniu produktowym (16.10.2026): projekty z ceną z góry,
// FluxCRM jako produkt flagowy, katalog małych usług jako wejście.
const OFERTA = [
  {
    href: "/strony-www",
    nazwa: nazwaFilaru("/strony-www"),
    cena: "od 4 500 zł",
    opis: "Landing, strona firmowa z CMS albo sklep. Formularz trafia od razu do CRM albo na Twoją skrzynkę.",
    punkty: [
      "landing do 5 podstron: 4 500 zł",
      "strona firmowa z CMS: od 9 000 zł",
      "sklep z integracją: od 15 000 zł",
    ],
    cta: "Zobacz strony",
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
      "z dowolnymi integracjami: 12 900 zł, z narzędziami AI: 24 900 zł",
    ],
    cta: "Zobacz CRM",
  },
  {
    href: "/automatyzacja-leadow-crm",
    nazwa: nazwaFilaru("/automatyzacja-leadow-crm"),
    cena: "od 1 500 zł",
    opis: "Jeden proces od początku do końca: dokumenty, raporty, KSeF, połączenie CRM z ERP.",
    punkty: [
      "jeden etap od 1 500 zł, cała ścieżka od 2 500 zł",
      "integracje przez API",
      "cena z góry, bez rozliczania godzin",
    ],
    cta: "Zobacz automatyzacje",
  },
];

const KROKI = [
  ["Piszesz, czego potrzebujesz", "Dwa zdania w formularzu albo mail."],
  ["Dostajesz cenę i termin", "Zwykle tego samego dnia, bez spotkań."],
  ["Strona działa po 2–3 tygodniach", "Płacisz za efekt, nie za godziny."],
];

const MANIFEST = KROKI[2][1];

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
          <NaglowekSklada tekst="Strony internetowe i CRM dla firm" />
          <PodtytulZrodlo />
          <div className="animate-fade-up-1 mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <a
              href="#kontakt"
              className="btn-primary btn-lg w-full sm:w-60"
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
          <MiastoHero />
        </section>

        <section aria-labelledby="oferta" className="container-wide pb-16">
          <h2 id="oferta" className="sr-only">
            Oferta
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {OFERTA.map((o, i) => (
              <RevealOnScroll
                key={o.href}
                delay={(i + 1) as 1 | 2 | 3}
                className="flex"
              >
                <KartaPoswiata
                  href={o.href}
                  className={`group flex w-full flex-col rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl hover:shadow-accent/10 ${
                    o.wyrozniona
                      ? "border-accent/60 bg-accent/5"
                      : "border-gray-200 dark:border-white/10"
                  }`}
                >
                  <h3 className="text-xl font-bold">{o.nazwa}</h3>
                  <p className="mt-2 text-2xl font-bold text-accent">
                    <CountUp value={o.cena} />
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-white/70">
                    {o.opis}
                  </p>
                  <div className="oferta-detale">
                    <ul className="space-y-1.5 pt-4 text-sm text-gray-700 dark:text-white/80">
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

        <section aria-label="Zasada" className="container-wide py-16 lg:py-24">
          <Manifest
            tekst={MANIFEST}
            className="mx-auto max-w-3xl text-balance text-center text-4xl font-bold leading-tight tracking-tighter lg:text-6xl"
          />
        </section>

        <section className="border-t border-gray-200 dark:border-white/10 py-20 lg:py-24">
          <div className="container-wide">
            <RevealOnScroll className="text-center">
              <h2 className="text-balance text-4xl font-bold tracking-tighter lg:text-5xl">
                Sprawdź swoją stronę w minutę
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={1}>
              <PoleAudytu />
            </RevealOnScroll>
          </div>
        </section>

        <section className="border-t border-gray-200 dark:border-white/10 py-20 lg:py-28">
          <div className="container-wide">
            <RevealOnScroll className="mb-12 text-center">
              <h2 className="text-balance text-4xl font-bold tracking-tighter lg:text-5xl">
                Twój CRM czyta zapytanie, zanim Ty je przeczytasz
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-600 dark:text-white/65">
                Napisz zapytanie, jakbyś był klientem. AI założy kartę leada i
                przygotuje odpowiedź, na żywo.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={1}>
              <ScenaLeada />
            </RevealOnScroll>
            <KrokiSticky kroki={KROKI} />
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
              intro="Odpiszemy z ceną i terminem, zwykle tego samego dnia."
              submitLabel="Wyślij"
            />
</RevealOnScroll>
          </div>
        </section>
      </main>
      <PasekAkcji />
      <Footer />
    </>
  );
}
