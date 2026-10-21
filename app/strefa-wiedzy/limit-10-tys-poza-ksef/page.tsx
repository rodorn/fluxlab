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
  "Przekroczysz 10 tys. zł brutto w miesiącu, a ta faktura i wszystkie kolejne idą już przez KSeF, bez powrotu do papieru. Sprawdź, co wlicza się do limitu.";

export const metadata: Metadata = {
  title: "Limit 10 tys. zł poza KSeF: co po przekroczeniu | Fluxlab",
  description:
    "Przekroczysz 10 tys. zł brutto w miesiącu, a ta faktura i wszystkie kolejne idą już przez KSeF, bez powrotu do papieru. Sprawdź, co wlicza się do limitu.",
  openGraph: {
    title: "Limit 10 tys. zł poza KSeF: co po przekroczeniu | Fluxlab",
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
    canonical: "/strefa-wiedzy/limit-10-tys-poza-ksef",
  },
};

const faq: { q: string; a: string; linki?: LinkWTekscie[] }[] = [
  {
    q: "Przekroczony limit w jednym miesiącu. Czy w następnym wolno wrócić do papieru?",
    a: "Nie. Po przekroczeniu w KSeF idzie faktura, którą przekroczono limit, i wszystkie kolejne, a niższa sprzedaż w następnych miesiącach nic nie zmienia.",
  },
  {
    q: "Czy faktury dla osób prywatnych liczą się do limitu?",
    a: "Nie. Faktury konsumenckie nie są objęte obowiązkowym KSeF, więc nie wchodzą do sumy.",
  },
  {
    q: "Czy limit dotyczy też faktur kosztowych?",
    a: "Nie. Faktury od dostawców odbierasz w KSeF od 1 lutego 2026, niezależnie od limitu.",
  },
  {
    q: "Co się zmienia 1 stycznia 2027?",
    a: "Limit znika i KSeF obejmuje też najmniejsze firmy, na przykład kwiaciarnię z trzema fakturami po 1 500 do 2 500 zł miesięcznie.",
    linki: [{ fraza: "1 stycznia 2027", href: "/ksef-2027" }],
  },
];

export default function Limit10TysPozaKsefArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href="/strefa-wiedzy/limit-10-tys-poza-ksef"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Limit 10 tys. zł poza KSeF" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">
              Limit 10 tys. zł poza KSeF: co po pierwszym przekroczeniu
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              W kwietniu 2026 masz faktury dla firm na 9 tys. zł brutto, a 28
              kwietnia wystawiasz kolejną na 2 tys. zł. Ta faktura i wszystkie
              następne idą już przez{" "}
              <HasloSlownika slug="ksef">KSeF</HasloSlownika>
              . Jeśli w maju sprzedasz za 3 tys. zł, papier nie wraca.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">Co wlicza się do limitu</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Liczą się tylko faktury, które obowiązkowo idą do KSeF, czyli
                faktury dla firm.{" "}
                <Link
                  href="/strefa-wiedzy/faktura-dla-osoby-prywatnej-ksef"
                  className="text-accent hover:underline"
                >
                  Faktury dla osób prywatnych
                </Link>
                ,{" "}
                <Link
                  href="/strefa-wiedzy/faktura-do-paragonu-ksef"
                  className="text-accent hover:underline"
                >
                  faktury z kasy
                </Link>{" "}
                i paragony z NIP do 450 zł zostają poza
                limitem.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Który miesiąc</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                O miesiącu decyduje data wystawienia faktury, nie data
                sprzedaży. Sprzedaż z 5 kwietnia z fakturą wystawioną 7 maja
                liczy się do limitu maja.
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
              <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                Od 2027 numer KSeF trafia do tytułu przelewu, a nasze{" "}
                <Link href="/numer-ksef" className="text-accent hover:underline">
                  sprawdzenie numeru KSeF
                </Link>{" "}
                wyłapie literówkę.
              </p>
            </section>
          </div>

          <div className="max-w-3xl mx-auto mt-16">
            <PrevNextArticle currentHref="/strefa-wiedzy/limit-10-tys-poza-ksef" />
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
              headline: "Limit 10 tys. zł poza KSeF: co po pierwszym przekroczeniu",
              description: OPIS,
              datePublished: "2026-10-19",
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
