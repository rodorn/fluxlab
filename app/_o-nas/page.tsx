import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
import { WDROZENIA } from "@/lib/wdrozenia";

export const metadata: Metadata = {
  title: "O nas: kto stoi za Fluxlab | Fluxlab",
  description:
    "Fluxlab prowadzi Paweł Iwanek, od 2020 roku automatyzuje sprzedaż i obsługę klienta w firmach. Doświadczenie, wdrożenia z wynikami i dane firmy.",
  alternates: { canonical: "/o-nas" },
  openGraph: {
    title: "O nas: kto stoi za Fluxlab | Fluxlab",
    description:
      "Fluxlab prowadzi Paweł Iwanek. Doświadczenie, wdrożenia z wynikami i dane firmy.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, o nas",
      },
    ],
  },
};

const DROGA = [
  {
    okres: "2020 do 2022",
    firma: "Carberry",
    opis: "Pierwsze automaty sprzedaży i obsługi w startupie samochodowym: integracje systemów i przetwarzanie danych.",
  },
  {
    okres: "od 2022",
    firma: "Carmore, leasing i sprzedaż samochodów",
    opis: "Automatyzacja sprzedaży, integracje z Pipedrive i systemami leasingodawców, scraping ofert, raporty dla zarządu. Od października 2026 odpowiada tam za technologię i ofertę.",
  },
  {
    okres: "od 2026",
    firma: "Fluxlab",
    opis: "Te same rozwiązania dla innych firm: automatyzacje, integracje, strony i narzędzia z ceną podaną z góry.",
  },
];

const DANE = [
  { k: "Firma", v: "Paweł Iwanek (Fluxlab), działalność od 2017 roku" },
  { k: "NIP", v: "7123336008" },
  { k: "REGON", v: "366862577" },
  { k: "VAT", v: "czynny podatnik, rachunek w wykazie Ministerstwa Finansów" },
  { k: "Adres", v: "ul. Żołnierska 10/36, 20-801 Lublin" },
  { k: "Kontakt", v: "pawel@fluxlab.pl, 667 767 474" },
];

export default function ONasPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="container-wide py-14 md:py-20">
          <Breadcrumbs href="/o-nas" items={[{ label: "O nas" }]} />

          <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 md:flex-row md:items-start">
            <Image
              src="/pawel.webp"
              alt="Paweł Iwanek, założyciel Fluxlab"
              width={240}
              height={304}
              priority
              className="h-[304px] w-[240px] shrink-0 rounded-2xl object-cover shadow-xl shadow-accent/10 ring-1 ring-gray-200 dark:ring-white/10"
            />
            <div className="text-center md:text-left">
              <p className="section-label mb-3">O nas</p>
              <h1 className="h1-strony">Paweł Iwanek, założyciel Fluxlab</h1>
              <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">
                Od 2020 roku automatyzuje sprzedaż i obsługę klienta w firmach z
                branży samochodowej i finansowej. Fluxlab powstał, żeby te same
                rozwiązania trafiały do mniejszych firm, bez wielomiesięcznych
                projektów i bez ceny ustalanej na końcu.
              </p>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Każde zlecenie prowadzi osobiście: rozmawiasz z nim od
                pierwszego maila do odbioru. Kod piszemy z pomocą AI, dlatego
                prace, które w agencji trwają tygodnie, oddajemy w dni.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 py-14 dark:border-white/10">
          <div className="container-wide max-w-4xl">
            <h2 className="h2-sekcji">Doświadczenie</h2>
            <ol className="mt-8 space-y-6 border-l-2 border-accent/30 pl-6">
              {DROGA.map((d) => (
                <li key={d.firma} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-accent"
                  />
                  <p className="text-sm font-semibold text-accent">{d.okres}</p>
                  <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {d.firma}
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    {d.opis}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-gray-200 py-14 dark:border-white/10">
          <div className="container-wide max-w-4xl">
            <h2 className="h2-sekcji">Co dało się zmierzyć po wdrożeniach</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {WDROZENIA.slice(0, 3).map((w) => (
                <div
                  key={w.tytul}
                  className="rounded-xl border border-gray-200 bg-white/60 p-5 dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <span className="block text-2xl font-bold tabular-nums text-gray-900 dark:text-white">
                    {w.liczba}
                  </span>
                  <span className="mt-1 block text-sm text-gray-600 dark:text-gray-400">
                    {w.liczbaOpis}
                  </span>
                  <span className="mt-3 block text-sm font-semibold text-gray-900 dark:text-white">
                    {w.tytul}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-6">
              <Link
                href="/realizacje"
                className="font-semibold text-accent hover:underline"
              >
                Wszystkie wdrożenia z opisem problemu i efektu →
              </Link>
            </p>
          </div>
        </section>

        <section className="border-t border-gray-200 py-14 dark:border-white/10">
          <div className="container-wide max-w-4xl">
            <h2 className="h2-sekcji">Dane firmy</h2>
            <dl className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-[max-content_1fr]">
              {DANE.map((d) => (
                <div key={d.k} className="contents">
                  <dt className="font-semibold text-gray-900 dark:text-white">
                    {d.k}
                  </dt>
                  <dd className="text-gray-600 dark:text-gray-300">{d.v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
              Dane sprawdzisz w{" "}
              <a
                href="https://aplikacja.ceidg.gov.pl/ceidg/ceidg.public.ui/search.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                CEIDG
              </a>{" "}
              albo naszym{" "}
              <Link href="/sprawdzenie-nip" className="text-accent hover:underline">
                sprawdzeniem NIP
              </Link>
              .
            </p>
          </div>
        </section>
        <CTA />
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            url: "https://fluxlab.pl/o-nas",
            mainEntity: {
              "@type": "Person",
              name: "Paweł Iwanek",
              jobTitle: "Założyciel Fluxlab",
              image: "https://fluxlab.pl/pawel.webp",
              email: "pawel@fluxlab.pl",
              worksFor: { "@type": "Organization", name: "Fluxlab", url: "https://fluxlab.pl" },
            },
          }),
        }}
      />
      <Footer />
    </>
  );
}
