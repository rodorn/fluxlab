import type { Metadata } from "next";
import Link from "next/link";
import HasloSlownika from "@/components/HasloSlownika";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";
import { zLinkami, type LinkWTekscie } from "@/lib/zLinkami";

const OPIS =
  "Adres firmy znajdziesz we wpisie w CEIDG albo KRS, urzędu w wyszukiwarce na gov.pl. Co zrobić, gdy adresu nie ma, i czego sprawdzić się nie da.";

const TYTUL = "Czy firma ma adres do e-Doręczeń? Jak to sprawdzić | Fluxlab";

export const metadata: Metadata = {
  title: "Czy firma ma adres do e-Doręczeń? Jak to sprawdzić | Fluxlab",
  description:
    "Adres firmy znajdziesz we wpisie w CEIDG albo KRS, urzędu w wyszukiwarce na gov.pl. Co zrobić, gdy adresu nie ma, i czego sprawdzić się nie da.",
  openGraph: {
    title: TYTUL,
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
  alternates: {
    canonical: "/strefa-wiedzy/czy-firma-ma-adres-do-e-doreczen",
  },
};

const faq: { q: string; a: string; linki?: LinkWTekscie[] }[] = [
  {
    q: "Czy da się sprawdzić wielu kontrahentów naraz?",
    a: "Nie, wyszukiwarka w e-Doręczeniach szuka po jednym adresie. Przy dużej liście zostaje system obiegu dokumentów klasy EZD.",
  },
  {
    q: "Czy da się sprawdzić adres osoby prywatnej?",
    a: "Nie. Firmy i inne podmioty niepubliczne nie mogą wyszukiwać adresów obywateli, tylko firm i urzędów. Więcej w tekście o adresie prywatnym i firmowym.",
    linki: [
      {
        fraza: "adresie prywatnym i firmowym",
        href: "/strefa-wiedzy/e-doreczenia-adres-prywatny-i-firmowy",
      },
    ],
  },
  {
    q: "Czy spółka cywilna ma adres do e-Doręczeń?",
    a: "Nie. Adres mogą mieć jej wspólnicy, każdy osobno.",
  },
  {
    q: "Od kiedy firma musi mieć adres?",
    a: "Spółki z KRS wpisane przed 2025 od 1 kwietnia 2025, firmy z CEIDG wpisane przed 2025 od 1 października 2026, nowe od dnia wpisu.",
  },
];

export default function CzyFirmaMaAdresArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href="/strefa-wiedzy/czy-firma-ma-adres-do-e-doreczen"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Czy firma ma adres do e-Doręczeń" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">
              Jak sprawdzić, czy kontrahent albo urząd ma adres do e-Doręczeń
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Chcesz wysłać wezwanie do zapłaty z dowodem doręczenia i nie
              wiesz, czy dłużnik ma skrzynkę. Sprawdzenie zajmuje minutę, jeśli
              wiesz, gdzie patrzeć.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">Gdzie zapisany jest adres</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Każdy adres do e-Doręczeń jest wpisany do{" "}
                <HasloSlownika slug="bae">
                  Bazy Adresów Elektronicznych
                </HasloSlownika>{" "}
                (BAE) i wygląda jak AE:PL-45928-68514-CHARA-16. Dane firm w
                bazie widzą wszyscy użytkownicy e-Doręczeń.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Jak sprawdzić firmę</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Aktywny adres jest ujawniony we{" "}
                <Link
                  href="/e-doreczenia-integracja"
                  className="text-accent hover:underline"
                >
                  wpisie firmy w CEIDG albo KRS
                </Link>
                , więc wystarczy wyszukiwarka firm na Biznes.gov.pl. W samej
                skrzynce do e-Doręczeń wyszukasz adres w BAE, ale tylko
                pojedynczo.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Jak sprawdzić urząd</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Na gov.pl działa wyszukiwarka urzędów po nazwie, REGON,
                miejscowości albo województwie, aktualizowana w dni robocze.
                Jeśli urzędu nie ma w wynikach, nie ma on jeszcze aktywnego
                adresu. Źródło:{" "}
                <a
                  href="https://www.gov.pl/web/e-doreczenia/pytania-i-odpowiedzi"
                  className="text-accent hover:underline"
                  rel="noopener"
                >
                  gov.pl, e-Doręczenia, pytania i odpowiedzi
                </a>
                .
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Gdy adresu nie ma</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Urząd wyśle wtedy pismo usługą hybrydową: Poczta Polska je
                drukuje i doręcza. Firma takiej drogi nie ma, bo e-Doręczeniem
                wyśle do innej firmy tylko wtedy, gdy obie mają adres, więc
                zostaje tradycyjna przesyłka.
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
                      {zLinkami(f.a, f.linki)}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <div className="max-w-3xl mx-auto mt-16">
            <PrevNextArticle currentHref="/strefa-wiedzy/czy-firma-ma-adres-do-e-doreczen" />
          </div>
        </div>
        <CTA naglowek="Chcesz, żeby pisma z e-Doręczeń same trafiały do systemu?" />
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
                "Jak sprawdzić, czy kontrahent albo urząd ma adres do e-Doręczeń",
              description: OPIS,
              datePublished: "2026-11-09",
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
