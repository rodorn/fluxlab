import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";

const OPIS =
  "KSeF odrzuca fakturę z błędem 440, gdy ten sam sprzedawca wysłał już taki numer. Numeracja bez roku w numerze zacznie się powtarzać w 2027.";

export const metadata: Metadata = {
  title: "Numeracja faktur w KSeF 2027, błąd 440 | Fluxlab",
  description:
    "KSeF odrzuca fakturę z błędem 440, gdy ten sam sprzedawca wysłał już taki numer. Numeracja bez roku w numerze zacznie się powtarzać w 2027.",
  openGraph: {
    title: "Numeracja faktur w KSeF w 2027: błąd 440 Duplikat faktury",
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
    canonical: "/strefa-wiedzy/numeracja-faktur-ksef-2027",
  },
};

const faq = [
  {
    q: "Czy po przejściu na KSeF trzeba zmienić numerację faktur?",
    a: "Nie, numer nadajecie sami jak dotąd. Zmiana jest potrzebna tylko wtedy, gdy wzór numeru nie zawiera roku.",
  },
  {
    q: "Jak długo KSeF pamięta numery?",
    a: "Sprawdza duplikaty 10 lat wstecz, dla tego samego NIP sprzedawcy i tego samego rodzaju faktury.",
  },
  {
    q: "Zmieniamy program do faktur. Czy można zacząć numerację od 1?",
    a: "Tylko jeśli nowa seria nie powtórzy numerów wysłanych do KSeF ze starego programu. Najprościej dodać do wzoru rok albo inny prefiks.",
  },
  {
    q: "Co zrobić z fakturą odrzuconą jako duplikat?",
    a: "Nadać jej nowy, niepowtarzalny numer i wysłać ponownie. Odrzucona faktura nie dostała numeru KSeF, więc w obrocie jej nie ma.",
  },
];

export default function NumeracjaFakturKsef2027Article() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href="/strefa-wiedzy/numeracja-faktur-ksef-2027"
          kolumna="srodek"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Numeracja faktur w KSeF w 2027" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">
              Numeracja faktur w KSeF w 2027: błąd 440 „Duplikat faktury”
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed !text-left">
              Jeśli numer faktury nie zawiera roku, w 2027 zacznie powtarzać
              numery z 2026, a KSeF takiej faktury nie przyjmie. Wystarczy
              dopisać rok do wzoru numeru przed pierwszą fakturą w styczniu.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">Skąd odrzucenie</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                KSeF odrzuca fakturę z kodem 440 „Duplikat faktury”, gdy ten sam
                NIP sprzedawcy wysłał już fakturę tego samego rodzaju z
                identycznym numerem. Sprawdza to 10 lat wstecz.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Kogo to dotyczy</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Firm, które w 2026 wystawiały faktury w KSeF i zerują numerację
                co roku albo co miesiąc bez roku w numerze (FV 1, FV 2 albo
                1/01). Pierwszy powtórzony numer w 2027 wróci jako odrzucenie.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Co zrobić teraz</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Sprawdźcie wzór numeru w programie do faktur i dopiszcie rok,
                np. 1/01/2027. Pozostałe sprawy na koniec przepisów
                przejściowych zbiera nasza{" "}
                <Link
                  href="/ksef-2027"
                  className="text-accent hover:underline"
                >
                  lista kontrolna KSeF na 1 stycznia 2027
                </Link>
                , bez rejestracji.
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
            <PrevNextArticle currentHref="/strefa-wiedzy/numeracja-faktur-ksef-2027" />
          </div>
        </div>
        <CTA naglowek="Chcecie, żeby faktury z KSeF same trafiały do księgowości?" />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Numeracja faktur w KSeF w 2027: błąd 440 Duplikat faktury",
              description: OPIS,
              datePublished: "2026-10-10",
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
