import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";
import { zLinkami, type LinkWTekscie } from "@/lib/zLinkami";

const OPIS =
  "Do końca 2026 fakturę z kasy wystawiasz poza KSeF. Od 2027 fakturę do paragonu dla firmy wystawiasz już w KSeF, a dla osoby prywatnej nadal nie musisz.";

export const metadata: Metadata = {
  title: "Faktura do paragonu a KSeF: 2026 i 2027 | Fluxlab",
  description:
    "Do końca 2026 fakturę z kasy wystawiasz poza KSeF. Od 2027 fakturę do paragonu dla firmy wystawiasz już w KSeF, a dla osoby prywatnej nadal nie musisz.",
  openGraph: {
    title: "Faktura do paragonu a KSeF: 2026 i 2027 | Fluxlab",
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
    canonical: "/strefa-wiedzy/faktura-do-paragonu-ksef",
  },
};

const faq: { q: string; a: string; linki?: LinkWTekscie[] }[] = [
  {
    q: "Klient prywatny chce fakturę do paragonu. Czy idzie do KSeF?",
    a: "Nie musi, ani w 2026, ani od 2027. Wolno ją jednak wystawić w KSeF dobrowolnie, jeśli wszystkie faktury chcesz mieć w jednym miejscu.",
    linki: [{ fraza: "Nie musi", href: "/strefa-wiedzy/faktura-dla-osoby-prywatnej-ksef" }],
  },
  {
    q: "Czy paragon z NIP do 450 zł nadal jest fakturą?",
    a: "Do 31 grudnia 2026 tak, jako faktura uproszczona poza KSeF. Od 2027 faktury dla firm idą przez KSeF.",
  },
  {
    q: "Firma prosi o fakturę do paragonu bez NIP. Co zrobić?",
    a: "Odmówić. Fakturę do paragonu dla firmy wystawiasz tylko wtedy, gdy paragon ma NIP nabywcy (art. 106b ust. 5 ustawy o VAT), i ta zasada z KSeF się nie zmienia.",
  },
  {
    q: "Czy faktury z kasy wliczają się do limitu 10 tys. zł?",
    a: "Nie. Do limitu liczą się tylko faktury, które obowiązkowo idą do KSeF, a faktur z kasy i paragonów z NIP do 450 zł to nie dotyczy.",
    linki: [{ fraza: "Do limitu", href: "/strefa-wiedzy/limit-10-tys-poza-ksef" }],
  },
];

export default function FakturaDoParagonuKsefArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href="/strefa-wiedzy/faktura-do-paragonu-ksef"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Faktura do paragonu a KSeF" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">
              Faktura do paragonu a KSeF w 2026 i 2027
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Sklep, stacja paliw albo warsztat z kasą fiskalną ma do końca
              2026 roku wyjątek. Liczy się, kto kupuje i czym wystawiasz
              fakturę.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">Do końca 2026: kasa poza KSeF</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Faktury wystawione przy użyciu kasy rejestrującej i paragony z
                NIP do 450 zł nie muszą trafiać do KSeF do 31 grudnia 2026.
                Wyjątek dotyczy faktur z kasy, a nie z programu do faktur.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Od 2027: firma przez KSeF</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Gdy do sprzedaży z kasy online wystawiasz fakturę dla firmy, od
                1 stycznia 2027 musi ona przejść przez KSeF. Kasa zostaje do
                paragonów, a fakturę wystawia program połączony z KSeF.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Co przygotować</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Sprawdź, czy Twój program do faktur ma już połączenie z KSeF i
                kto z obsługi kasy ma w nim uprawnienia. Numer z paragonu
                wpisujesz do faktury tak jak dotąd.
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
            <PrevNextArticle currentHref="/strefa-wiedzy/faktura-do-paragonu-ksef" />
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
              headline: "Faktura do paragonu a KSeF w 2026 i 2027",
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
