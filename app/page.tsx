import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LandingForm from "@/components/LandingForm";
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

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-white pt-16">
        <section className="mx-auto w-full max-w-4xl px-6 pt-16 pb-12 text-center lg:pt-24">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Strony internetowe i CRM dla firm
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-gray-600 sm:text-lg dark:text-white/65">
            Budujemy stronę z formularzem podpiętym do CRM, a potem system, w
            którym żadne zapytanie nie ginie. Cena z góry, pierwsza wersja w 2–3
            tygodnie.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <a href="#kontakt" className="btn-primary px-7 py-3.5 text-base">
              Zamów wycenę
            </a>
            <Link
              href="/audyt-strony"
              className="text-sm font-semibold text-accent hover:underline"
            >
              Sprawdź swoją stronę za darmo →
            </Link>
          </div>
          <Link
            href="/realizacje"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/15 px-4 py-1.5 text-sm text-gray-700 dark:text-white/75 hover:border-accent transition-colors"
          >
            <span className="font-semibold text-accent">12 dni</span>
            tyle zajęła ostatnia strona dla klienta, od startu prac do publikacji →
          </Link>
        </section>

        <section
          aria-labelledby="oferta"
          className="container-wide max-w-6xl pb-16"
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
            <Link href="/cennik" className="text-accent hover:underline">
              cenniku
            </Link>
            .
          </p>
        </section>

        <section className="border-t border-gray-200 dark:border-white/10 py-14">
          <div className="container-wide max-w-5xl grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="section-label mb-3">Ostatnia realizacja</p>
              <h2 className="text-2xl font-bold lg:text-3xl">
                Nowa strona pośrednika kredytowego w 12 dni
              </h2>
              <p className="mt-3 text-gray-600 dark:text-white/70">
                Stara strona miała 45 punktów w audycie technicznym i ładowała
                się na telefonie 11 sekund. Nowa ma 97 punktów i waży 6,4 raza
                mniej. Oddaliśmy ją 12 dni od startu prac, przy terminie 5 tygodni.
              </p>
              <Link
                href="/realizacje"
                className="mt-4 inline-block text-sm font-semibold text-accent hover:underline"
              >
                Zobacz realizacje →
              </Link>
            </div>
            <ol className="grid gap-4">
              {KROKI.map(([tytul, opis], i) => (
                <li
                  key={tytul}
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
                </li>
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
