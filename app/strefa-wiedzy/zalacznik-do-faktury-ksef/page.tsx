import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";
import { zLinkami, type LinkWTekscie } from "@/lib/zLinkami";

const OPIS =
  "Załącznik do faktury w KSeF to dodatkowy plik XML, nie PDF ani zdjęcie. Wystawisz go dopiero po zgłoszeniu w e-Urzędzie Skarbowym; odbiór nie wymaga zgłoszenia.";

export const metadata: Metadata = {
  title: "Załącznik do faktury w KSeF: co wolno i jak | Fluxlab",
  description:
    "Załącznik do faktury w KSeF to dodatkowy plik XML, nie PDF ani zdjęcie. Wystawisz go dopiero po zgłoszeniu w e-Urzędzie Skarbowym; odbiór nie wymaga zgłoszenia.",
  openGraph: {
    title: "Załącznik do faktury w KSeF: co wolno i jak | Fluxlab",
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
    canonical: "/strefa-wiedzy/zalacznik-do-faktury-ksef",
  },
};

const faq: { q: string; a: string; linki?: LinkWTekscie[] }[] = [
  {
    q: "Czy załącznik jest obowiązkowy?",
    a: "Nie. Korzystasz z niego tylko wtedy, gdy faktura ma bardzo złożone dane o cenach, ilościach i jednostkach, jak w mediach, telekomunikacji czy paliwach.",
  },
  {
    q: "Jak długo trwa zgłoszenie?",
    a: "Najwyżej 3 dni robocze i nie jest odrzucane, jeśli jest poprawnie złożone. UPO oznacza tylko złożenie, o możliwości wystawiania informuje osobny mail.",
  },
  {
    q: "Czy wystawię taką fakturę w darmowej aplikacji MF?",
    a: "Nie. Fakturę z załącznikiem wyślesz tylko z programu połączonego z API KSeF 2.0. Cała faktura może mieć najwyżej 3 MB.",
    linki: [{ fraza: "programu połączonego z API KSeF 2.0", href: "/ksef-integracja" }],
  },
  {
    q: "Przestałem używać załączników. Zgłosić rezygnację?",
    a: "Lepiej nie. Po rezygnacji nie wystawisz już korekt do starych faktur z załącznikiem.",
  },
];

export default function ZalacznikDoFakturyKsefArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href="/strefa-wiedzy/zalacznik-do-faktury-ksef"
          kolumna="srodek"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Załącznik do faktury w KSeF" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">
              Załącznik do faktury w KSeF
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed !text-left">
              Od 1 lutego 2026 faktura w KSeF może mieć załącznik, ale tylko w
              XML. PDF, zdjęcie, protokół odbioru czy list przewozowy dalej
              wysyłasz klientowi osobno.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">Co da się dołączyć</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Załącznik jest częścią faktury, więc musi być w tym samym
                formacie, czyli w{" "}
                <Link href="/slownik#fa3" className="text-accent hover:underline">
                  strukturze FA(3)
                </Link>
                . Krótką informację, na przykład numer licznika, wpiszesz bez
                załącznika w pole DodatkowyOpis albo StopkaFaktury.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Zgłoszenie w e-Urzędzie Skarbowym</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Zanim wyślesz pierwszą fakturę z załącznikiem, zgłaszasz to w
                e-Urzędzie Skarbowym, wyłącznie elektronicznie. W JDG robi to
                właściciel, w spółce użytkownik konta organizacji. Odbieranie
                takich faktur nie wymaga żadnego zgłoszenia.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">PDF i protokół obok faktury</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Klient dostaje je osobno, więc warto je powiązać z fakturą, żeby
                wiedział, czego dotyczą. Najprościej podać w mailu{" "}
                <Link href="/numer-ksef" className="text-accent hover:underline">
                  numer KSeF
                </Link>{" "}
                faktury, który klient sprawdzi bez logowania.
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
            <PrevNextArticle currentHref="/strefa-wiedzy/zalacznik-do-faktury-ksef" />
          </div>
        </div>
        <CTA naglowek="Chcesz, żeby faktury z KSeF same trafiały do księgowości?" />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Załącznik do faktury w KSeF",
              description: OPIS,
              datePublished: "2026-10-17",
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
