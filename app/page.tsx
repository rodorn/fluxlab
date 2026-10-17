import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LandingForm from "@/components/LandingForm";
import RevealOnScroll from "@/components/RevealOnScroll";
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
        <section className="mx-auto flex min-h-[72vh] w-full max-w-6xl flex-col items-center justify-center px-6 pt-16 pb-16 text-center lg:pt-20">
          <h1 className="animate-fade-up text-balance text-5xl font-bold leading-[0.95] tracking-tighter sm:text-7xl lg:text-8xl">
            Strony internetowe i CRM dla firm
          </h1>
          <p className="animate-fade-up-1 mx-auto mt-7 max-w-xl text-lg text-gray-600 sm:text-xl dark:text-white/65">
            Formularz podpięty do CRM, cena z góry, gotowe w 2–3 tygodnie.
          </p>
          <div className="animate-fade-up-1 mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <a
              href="#kontakt"
              className="btn-primary w-full rounded-full px-8 py-4 text-base sm:w-60"
            >
              Zamów wycenę
            </a>
            <Link
              href="/audyt-strony"
              className="btn-secondary w-full rounded-full px-8 py-4 text-base sm:w-60"
            >
              Sprawdź swoją stronę
            </Link>
          </div>
        </section>

        <section
          aria-labelledby="oferta"
          className="container-wide pb-16"
        >
          <h2 id="oferta" className="sr-only">
            Oferta
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {OFERTA.map((o) => (
              <Link
                key={o.href}
                href={o.href}
                className={`group flex flex-col rounded-2xl border p-7 transition-colors hover:border-accent ${
                  o.wyrozniona
                    ? "border-accent/60 bg-accent/5"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >
                <h3 className="text-xl font-bold">{o.nazwa}</h3>
                <p className="mt-2 text-2xl font-bold text-accent">{o.cena}</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-white/70">
                  {o.opis}
                </p>
                <ul className="mt-4 space-y-1.5 text-sm text-gray-700 dark:text-white/80">
                  {o.punkty.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span aria-hidden="true" className="text-accent">
                        ✓
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto pt-6 text-sm font-semibold text-accent group-hover:underline">
                  {o.cta} →
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-white/60">
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
          </p>
        </section>

        <section className="border-t border-gray-200 dark:border-white/10 py-20 lg:py-28">
          <div className="container-wide">
            <RevealOnScroll className="text-center">
              <p className="section-label mb-3">Ostatnia realizacja</p>
              <h2 className="text-balance text-4xl font-bold tracking-tighter lg:text-6xl">
                Strona pośrednika kredytowego w 12 dni
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={1}>
              <Link
                href="/realizacje"
                className="group mx-auto mt-12 block max-w-5xl overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl shadow-black/10 transition-colors hover:border-accent"
              >
                <div className="flex items-center gap-1.5 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-900 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-gray-300 dark:bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-gray-300 dark:bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-gray-300 dark:bg-white/20" />
                  <span className="ml-3 text-xs text-gray-500 dark:text-white/50">
                    finreal.pl
                  </span>
                </div>
                <Image
                  src="/photos/realizacja-finreal-ostra.webp"
                  alt="Strona główna finreal.pl zrobiona przez FluxLab"
                  width={2048}
                  height={1152}
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.015]"
                />
              </Link>
            </RevealOnScroll>
            <dl className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-10 text-center sm:grid-cols-3">
              {WYNIKI.map(([liczba, opis], i) => (
                <RevealOnScroll key={liczba} delay={(i + 1) as 1 | 2 | 3}>
                  <dt className="text-5xl font-bold tracking-tighter lg:text-6xl">
                    {liczba}
                  </dt>
                  <dd className="mx-auto mt-2 max-w-[15rem] text-balance text-sm text-gray-600 dark:text-white/65">
                    {opis}
                  </dd>
                </RevealOnScroll>
              ))}
            </dl>
            <ol className="mx-auto mt-20 grid max-w-5xl gap-4 md:grid-cols-3">
              {KROKI.map(([tytul, opis], i) => (
                <RevealOnScroll
                  as="li"
                  key={tytul}
                  delay={(i + 1) as 1 | 2 | 3}
                  className="flex gap-4 rounded-2xl border border-gray-200 dark:border-white/10 p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-solid text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{tytul}</p>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      {opis}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="kontakt"
          className="scroll-mt-20 border-t border-gray-200 dark:border-white/10 py-16"
        >
          <div className="container-wide">
            <LandingForm
              formId="home"
              heading="Napisz, czego potrzebujesz"
              intro="Odpiszemy z ceną i terminem, zwykle tego samego dnia."
              submitLabel="Wyślij"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
