import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
import KatalogProduktow from "@/components/KatalogProduktow";
import ZaZlotowke from "@/components/ZaZlotowke";
import WycenaAI from "@/components/WycenaAI";
import { CENNIK as PRODUCTS, PRODUCTS as PRODUCTS_ALL, cenaWejscia } from "@/lib/products";

// Kolejność z licznika ruchu (sesje na stronie produktu, 20.09–24.10.2026).
const NAJCZESCIEJ = ["/audyt-strony", "/e-doreczenia-integracja", "/strony-www", "/audyt-kurierski"]
  .map((h) => PRODUCTS_ALL.find((p) => p.href === h))
  .filter((p) => p !== undefined);

const ZASADY = [
  ["Stała cena", "Nie liczymy godzin. Przed startem dostajesz jedną kwotę za całość."],
  ["Płatność po odbiorze", "Za każdy etap płacisz dopiero, gdy go odbierzesz."],
  ["Bez ukrytych kosztów", "Licencje, serwery i abonamenty ustalamy przed startem."],
  ["30 dni poprawek", "Błędy po naszej stronie poprawiamy po wdrożeniu bez opłat."],
];

const ZASADY_AUDYTU = [
  ["Audyt strony 0 zł", "Raport od ręki, bez konta: telefon i komputer, wyszukiwarka, AI, poczta."],
  ["Cała strona 10 zł", "Do 200 podstron, raport mailem, płacisz po otrzymaniu."],
  ["Cena naprawy w raporcie", "Przy każdym problemie koszt usunięcia. Wycena wiąże 30 dni."],
  ["Audyt procesu odliczamy", "Koszt audytu procesu odejmujemy od wdrożenia, jeśli idziemy dalej."],
];

const DO_KALKULATORA = PRODUCTS.flatMap((p) => {
  const cena = cenaWejscia(p.price);
  return cena && !/\/mc/.test(p.price) ? [{ nazwa: p.name, href: p.href, cena }] : [];
});

export const metadata: Metadata = {
  title: "Cennik: usługi ze stałą ceną | Fluxlab",
  description:
    "Cennik Fluxlab: usługi ze stałą ceną w działach automatyzacja, integracje i dane, systemy i strony oraz dla osób prywatnych.",
  alternates: { canonical: "/produkty" },
  openGraph: {
    title: "Cennik: usługi ze stałą ceną | Fluxlab",
    description:
      "Cennik Fluxlab: usługi ze stałą ceną w działach automatyzacja, integracje i dane, systemy i strony oraz dla osób prywatnych.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, cennik usług ze stałą ceną",
      },
    ],
  },
};

export default function ProduktyPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs
          href="/produkty"
          items={[{ label: "Cennik" }]}
        />
        <section className="pt-6 pb-10 lg:pb-12">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-label mb-3">Cennik</p>
              <h1 className="h1-strony">
                Usługi ze stałą ceną
              </h1>
              <p className="hero-lead">
                Każda pozycja ma podaną kwotę wejścia i konkretny efekt, a wynik
                odsyłamy mailem.
              </p>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Darmowe sprawdzenia i kalkulatory są w dziale{" "}
                <Link
                  href="/narzedzia"
                  className="font-semibold text-accent hover:underline"
                >
                  Narzędzia
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="container-wide pb-10" aria-label="Wycena przez AI">
          <WycenaAI />
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Wolisz porozmawiać?{" "}
            <Link href="/kontakt?forma=meet&utm_source=produkty" className="font-semibold text-accent hover:underline">
              Umów 30 minut w Google Meet
            </Link>{" "}
            albo napisz na{" "}
            <a href="mailto:pawel@fluxlab.pl" className="font-semibold text-accent hover:underline">
              pawel@fluxlab.pl
            </a>
            , co chcesz zrobić.
          </p>
        </section>

        <section className="container-wide pb-12" aria-labelledby="najczesciej">
          <h2 id="najczesciej" className="h2-sekcji mb-6 text-center">
            Najczęściej wybierane
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {NAJCZESCIEJ.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  data-vt-karta
                  className="flex h-full flex-col rounded-2xl border border-gray-200 p-5 transition-colors hover:border-accent dark:border-white/10"
                >
                  <span data-vt-tytul className="text-sm font-semibold text-gray-900 dark:text-white">{p.name}</span>
                  <span className="mt-1 flex-1 text-sm text-gray-600 dark:text-gray-400">{p.tagline}</span>
                  <span className="mt-4 text-lg font-bold text-accent">{p.price}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="container-wide pb-12" aria-label="Zasady">
          <div className="grid gap-6 lg:grid-cols-2">
            {[
              ["Zasady wyceny", ZASADY],
              ["Zasady audytu", ZASADY_AUDYTU],
            ].map(([tytul, lista]) => (
              <div key={tytul as string} className="rounded-2xl bg-gray-50 p-6 dark:bg-white/5">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{tytul as string}</h2>
                <dl className="mt-4 space-y-3">
                  {(lista as string[][]).map(([t, o]) => (
                    <div key={t}>
                      <dt className="text-sm font-semibold text-gray-900 dark:text-white">{t}</dt>
                      <dd className="text-sm text-gray-600 dark:text-gray-400">{o}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </section>

        <section className="container-wide pb-14 md:pb-20">
          <ZaZlotowke pozycje={DO_KALKULATORA} />
          <div className="mt-8 lg:mt-12">
            <KatalogProduktow />
          </div>

        </section>
        <CTA
          naglowek="Potrzebujesz czegoś szytego pod Twój proces?"
          opis={
            <>
              Zaczynamy od diagnozy,{" "}
              <Link href="/jak-pracuje" className="text-accent hover:underline">
                tak pracujemy
              </Link>
              .
            </>
          }
        />
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Cennik Fluxlab",
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
