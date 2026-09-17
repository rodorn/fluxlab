import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";

export const metadata: Metadata = {
  title: "Produkty i narzędzia Fluxlab, gotowe raporty i audyty | Fluxlab",
  description:
    "Gotowe narzędzia Fluxlab, które rozwiązują jeden policzalny problem: sprawdzenie auta przed zakupem, opłacalność importu DE→PL i audyt zmarnowanego budżetu Google Ads. Stała cena, konkretny efekt.",
  alternates: { canonical: "/produkty" },
  openGraph: {
    title: "Produkty i narzędzia Fluxlab, gotowe raporty i audyty | Fluxlab",
    description:
      "Gotowe narzędzia Fluxlab: sprawdzenie auta przed zakupem, opłacalność importu DE→PL i audyt zmarnowanego budżetu Google Ads. Stała cena, konkretny efekt.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, produkty i narzędzia",
      },
    ],
  },
};

interface Product {
  name: string;
  tagline: string;
  desc: string;
  price: string;
  href: string;
  cta: string;
  bullets: string[];
}

const PRODUCTS: Product[] = [
  {
    name: "Sprawdź auto przed zakupem",
    tagline: "Raport due-diligence dla kupującego",
    desc: "Wklejasz link do oferty z Otomoto lub OLX, a dostajesz benchmark ceny wobec podobnych aut, listę typowych usterek modelu, wykryte red-flagi i gotowy skrypt negocjacji.",
    price: "od 49 zł",
    href: "/sprawdz-auto",
    cta: "Zamów sprawdzenie auta",
    bullets: [
      "price-check 49 zł, pełny raport 149 zł",
      "benchmark ceny i wykrywanie cofniętego licznika",
      "argumenty do negocjacji ceny",
    ],
  },
  {
    name: "ImportRadar DE→PL",
    tagline: "Które auta z Niemiec realnie się opłaca",
    desc: "Skanuję żywe oferty z DE i NL i wskazuję konkretne egzemplarze, które zarabiają po odjęciu wszystkich kosztów sprowadzenia, oraz modele z kosztownymi wadami, których lepiej unikać. To sygnał zakupowy dla handlarzy i kupujących na zamówienie, nie kolejny darmowy kalkulator akcyzy.",
    price: "od 149 zł",
    href: "/import-radar",
    cta: "Znajdź opłacalne auto",
    bullets: [
      "ranking marży netto na realnych ofertach, nie sama tabelka kosztów",
      "wskazuję niedowartościowane egzemplarze warte sprowadzenia",
      "ostrzegam przed modelami z drogimi usterkami",
    ],
  },
  {
    name: "Audyt zmarnowanego budżetu Google Ads",
    tagline: "Odzyskaj pieniądze przepalane na frazy bez konwersji",
    desc: "Analiza raportu wyszukiwanych haseł: ile budżetu idzie na kliknięcia bez efektu, gotowa lista wykluczeń i plan naprawy konta. Mini-audyt z gwarancją zwrotu.",
    price: "690 zł",
    href: "/audyt-google-ads",
    cta: "Zamów mini-audyt",
    bullets: [
      "mini-audyt 690 zł",
      "zwrot, jeśli znajdę mniej niż 500 zł/mc do odzyskania",
      "gotowa lista wykluczających słów kluczowych",
    ],
  },
];

export default function ProduktyPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs items={[{ label: "Produkty" }]} />
        <section className="container-wide pb-14 md:pb-20 pt-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              Produkty
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Gotowe narzędzia, które rozwiązują jeden policzalny problem
            </h1>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">
              Zamiast długiego wdrożenia dostajesz konkretny raport za stałą
              cenę. Każdy produkt ma jasny zakres, przykładowy efekt i formularz
              zamówienia. Zgłoszenie realizuję i odsyłam wynik mailem.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {PRODUCTS.map((p) => (
              <div
                key={p.href}
                className="flex flex-col rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/60 dark:bg-gray-900/40 p-6 transition-colors hover:border-accent/50"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {p.tagline}
                </p>
                <h2 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                  {p.name}
                </h2>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  {p.desc}
                </p>
                <ul className="mt-4 space-y-2">
                  {p.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <svg
                        className="mt-0.5 flex-shrink-0 text-accent"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2.5 7l3 3 6-6"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {p.price}
                  </span>
                </div>
                <Link
                  href={p.href}
                  className="btn-primary mt-4 w-full justify-center text-center text-sm"
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-gray-50/60 dark:bg-gray-900/40 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Potrzebujesz czegoś szytego pod Twój proces?
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Produkty to gotowce ze stałą ceną. Jeśli masz szerszy proces do
              zautomatyzowania, zacznę od bezpłatnej diagnozy i darmowego dowodu
              na wąskim wycinku.
            </p>
            <div className="mt-6">
              <TrackedCTA
                href="/kontakt"
                location="produkty_cta"
                className="btn-primary"
              >
                Bezpłatna diagnoza
              </TrackedCTA>
            </div>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Produkty i narzędzia Fluxlab",
            itemListElement: PRODUCTS.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.name,
              url: `https://fluxlab.pl${p.href}`,
            })),
          }),
        }}
      />

      <Footer />
    </>
  );
}
