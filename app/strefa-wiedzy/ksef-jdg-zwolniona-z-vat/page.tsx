import type { Metadata } from "next";
import Link from "next/link";
import HasloSlownika from "@/components/HasloSlownika";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";
import { zLinkami, type LinkWTekscie } from "@/lib/zLinkami";
import { PODATNICY } from "@/lib/terminy-ksef";

const OPIS =
  "JDG zwolniona z VAT wystawia faktury dla firm w KSeF od 1 kwietnia 2026, do końca 2026 do 10 tys. zł brutto miesięcznie także poza KSeF.";

const OD_KIEDY = PODATNICY.find((p) => p.klucz === "pozostali")!.dataOpis;

export const metadata: Metadata = {
  title: "KSeF w JDG zwolnionej z VAT: czy musisz? | Fluxlab",
  description:
    "JDG zwolniona z VAT wystawia faktury dla firm w KSeF od 1 kwietnia 2026, do końca 2026 do 10 tys. zł brutto miesięcznie także poza KSeF.",
  openGraph: {
    title: "KSeF w JDG zwolnionej z VAT: czy musisz? | Fluxlab",
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
    canonical: "/strefa-wiedzy/ksef-jdg-zwolniona-z-vat",
  },
};

const faq: { q: string; a: string; linki?: LinkWTekscie[] }[] = [
  {
    q: "Trzy faktury w miesiącu. Czy to już KSeF?",
    a: "Do końca 2026 nie, jeśli ich suma brutto w miesiącu nie przekracza 10 tys. zł. Od 1 stycznia 2027 tak, niezależnie od liczby faktur.",
    linki: [{ fraza: "Od 1 stycznia 2027", href: "/ksef-2027" }],
  },
  {
    q: "Czy zamiast faktury wolno wystawić rachunek?",
    a: "Nie. Sprzedaż zwolnioną z VAT dokumentuje się fakturą, a gdy nabywcą jest firma, ta faktura idzie przez KSeF.",
  },
  {
    q: "Czy KSeF sprawdza zwolnienie z VAT?",
    a: "Nie. KSeF nie sprawdza statusu sprzedawcy ani nabywcy w wykazie podatników VAT.",
  },
  {
    q: "Czy firma, która dostaje fakturę, musi ją zaakceptować?",
    a: "Nie. Faktura jest otrzymana w chwili nadania jej numeru KSeF, bez potwierdzenia od nabywcy.",
    linki: [{ fraza: "w chwili nadania jej numeru KSeF", href: "/strefa-wiedzy/kiedy-odliczyc-vat-z-faktury-ksef" }],
  },
];

export default function KsefJdgZwolnionaZVatArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href="/strefa-wiedzy/ksef-jdg-zwolniona-z-vat"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "KSeF w JDG zwolnionej z VAT" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">
              KSeF w JDG zwolnionej z VAT: czy musisz?
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Tak, gdy wystawiasz fakturę firmie. Zwolnienie z VAT nie zwalnia z{" "}
              <HasloSlownika slug="ksef">KSeF</HasloSlownika>
              , obowiązek obejmuje podatników czynnych i zwolnionych od{" "}
              {OD_KIEDY}.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">
                <Link href="/strefa-wiedzy/limit-10-tys-poza-ksef" className="text-accent hover:underline">
                  Limit 10 tys. zł
                </Link>{" "}
                do końca 2026
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Do 31 grudnia 2026 możesz wystawiać faktury poza KSeF, jeśli ich
                suma brutto w miesiącu nie przekracza 10 tys. zł. Fakturę, która
                przekracza limit, i wszystkie kolejne wystawiasz już w KSeF.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Faktura dla osoby prywatnej</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Konsumentowi wystawiasz fakturę tylko na jego żądanie i{" "}
                <Link
                  href="/strefa-wiedzy/faktura-dla-osoby-prywatnej-ksef"
                  className="text-accent hover:underline"
                >
                  nie musisz robić tego w KSeF
                </Link>
                . Możesz ją tam wysłać dobrowolnie.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Faktury od dostawców</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Każda firma z NIP ma dostęp do KSeF, więc faktury kosztowe
                znajdziesz tam niezależnie od zwolnienia. Nasze{" "}
                <Link
                  href="/numer-ksef"
                  className="text-accent hover:underline"
                >
                  sprawdzenie numeru KSeF
                </Link>{" "}
                pokazuje, czy numer z takiej faktury jest poprawny.
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
            <PrevNextArticle currentHref="/strefa-wiedzy/ksef-jdg-zwolniona-z-vat" />
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
              headline: "KSeF w JDG zwolnionej z VAT: czy musisz?",
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
