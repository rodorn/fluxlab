import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";
import { PODATNICY } from "@/lib/terminy-ksef";

const ADRES = "/strefa-wiedzy/faktury-kosztowe-z-ksef";

const START_ODBIORU = PODATNICY.find((p) => p.klucz === "duzi")!.dataOpis;

const OPIS =
  "KSeF nie powiadamia o nowych fakturach zakupowych. Sprawdź, jak program ma je pobierać sam, jakie uprawnienie nadać i jakie limity ma API.";

export const metadata: Metadata = {
  title: "Faktury kosztowe z KSeF do programu księgowego | Fluxlab",
  description:
    "KSeF nie powiadamia o nowych fakturach zakupowych. Sprawdź, jak program ma je pobierać sam, jakie uprawnienie nadać i jakie limity ma API.",
  openGraph: {
    title: "Faktury kosztowe z KSeF do programu księgowego",
    description: OPIS,
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, KSeF i automatyzacja dla firm",
      },
    ],
  },
  alternates: { canonical: ADRES },
};

const faq = [
  {
    q: "Czy muszę potwierdzić odbiór faktury w KSeF?",
    a: "Nie. Faktura jest otrzymana w chwili, gdy KSeF nada jej numer, a datę przyjęcia widać w UPO.",
  },
  {
    q: "Czy KSeF wyśle mi maila o nowej fakturze?",
    a: "Nie, system nie wysyła powiadomień. Nowe faktury sprawdza program albo Ty.",
  },
  {
    q: "Czy biuro rachunkowe może pobierać faktury kosztowe firmy?",
    a: "Tak, po nadaniu mu uprawnienia do przeglądania faktur w Aplikacji Podatnika KSeF.",
  },
];

const link = "text-accent hover:underline";
const akapit = "text-gray-600 dark:text-gray-400 leading-relaxed";

export default function FakturyKosztoweZKsefArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href={ADRES}
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Faktury kosztowe z KSeF" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">
              Faktury kosztowe z KSeF do programu księgowego: jak pobierać je
              automatycznie
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Faktury zakupowe leżą w KSeF, ale nikt Cię o nich nie zawiadomi.
              Program może pobierać je sam, jeśli dostanie uprawnienie i token.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">
                Faktura jest Twoja w chwili nadania numeru
              </h2>
              <p className={akapit}>
                Nie musisz jej akceptować ani odbierać. Fakturę uznaje się za
                otrzymaną, gdy KSeF nada jej numer, a datę widać w UPO. Od{" "}
                {START_ODBIORU} tak dostaje faktury każda firma, także ta, która
                sama wystawia jeszcze poza systemem.
              </p>
            </section>

            <section>
              <h2 className="mb-4 h2-sekcji">KSeF nic Ci nie powie</h2>
              <p className={akapit}>
                System nie wysyła powiadomień, a sprzedawca nie musi przesyłać
                Ci numeru faktury. Jeśli nikt nie zajrzy do KSeF, koszt czeka
                tam niezauważony, choć faktury leżą w systemie przez 10 lat.
              </p>
            </section>

            <section>
              <h2 className="mb-4 h2-sekcji">Ręcznie czy automatem</h2>
              <p className={akapit}>
                Przy kilku fakturach wystarczy Aplikacja Podatnika albo
                Aplikacja Mobilna KSeF. Przy większej liczbie program może
                pobierać faktury sam, przez integrację z API. Masowo pobierzesz
                je wyłącznie jako XML, więc program musi umieć je odczytać.
              </p>
            </section>

            <section>
              <h2 className="mb-4 h2-sekcji">Jedno uprawnienie i token</h2>
              <p className={akapit}>
                Program albo biuro potrzebuje uprawnienia do przeglądania
                faktur. Nadasz je w Aplikacji Podatnika, a biuro może przekazać
                je swoim pracownikom (zmianę biura opisujemy w tekście{" "}
                <Link
                  href="/strefa-wiedzy/faktury-z-ksef-po-zmianie-biura"
                  className={link}
                >
                  faktury z KSeF po zmianie biura
                </Link>
                ). Token do programu generuje osoba z uprawnieniami i działa on
                do unieważnienia.
              </p>
            </section>

            <section>
              <h2 className="mb-4 h2-sekcji">Jak często program może pytać</h2>
              <p className={akapit}>
                API pozwala na najwyżej 20 eksportów faktur na godzinę, a przy
                stałej synchronizacji sprawdzanie nie częściej niż co 15 minut.
                Firma, której to nie wystarcza, może wnioskować o wyższe limity
                z uzasadnieniem.
              </p>
              <p className={`${akapit} mt-4`}>
                Numer z faktury sprawdzisz{" "}
                <Link href="/numer-ksef" className={link}>
                  naszym narzędziem do numeru KSeF
                </Link>
                , a pojęcie wyjaśnia{" "}
                <Link href="/slownik#ksef" className={link}>
                  słownik
                </Link>
                . Gdy faktury kosztowe mają same trafiać do księgowości albo
                arkusza, robimy{" "}
                <Link href="/ksef-integracja" className={link}>
                  integrację z KSeF
                </Link>
                . Podstawa: pytania i odpowiedzi na{" "}
                <a
                  href="https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/"
                  className={link}
                  rel="noopener"
                >
                  ksef.podatki.gov.pl
                </a>{" "}
                i{" "}
                <a
                  href="https://github.com/CIRFMF/ksef-docs/blob/main/pobieranie-faktur/przyrostowe-pobieranie-faktur.md"
                  className={link}
                  rel="noopener"
                >
                  dokumentacja API KSeF
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-4 h2-sekcji">Pytania</h2>
              <div className="space-y-4">
                {faq.map((f) => (
                  <details
                    key={f.q}
                    className="group rounded-2xl border border-gray-200 dark:border-gray-700"
                  >
                    <summary className="cursor-pointer p-6 text-gray-900 dark:text-white font-medium">
                      {f.q}
                    </summary>
                    <p className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <div className="max-w-3xl mx-auto mt-16">
            <PrevNextArticle currentHref={ADRES} />
          </div>
        </div>
        <CTA naglowek="Chcesz, żeby faktury kosztowe same trafiały do księgowości?" />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline:
                "Faktury kosztowe z KSeF do programu księgowego: jak pobierać je automatycznie",
              description: OPIS,
              datePublished: "2026-11-02",
              author: {
                "@type": "Organization",
                name: "Fluxlab",
                url: "https://fluxlab.pl",
              },
              publisher: {
                "@type": "Organization",
                name: "Fluxlab",
                url: "https://fluxlab.pl",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]),
        }}
      />
    </>
  );
}
