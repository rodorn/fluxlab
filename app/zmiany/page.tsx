import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import zmiany from "@/lib/zmiany.json";

export const metadata: Metadata = {
  title: "Zmiany na stronie, ostatnie 40 wpisów | Fluxlab",
  description:
    "Publiczny dziennik zmian strony fluxlab.pl: co dodaliśmy i poprawiliśmy w ostatnim czasie.",
  alternates: { canonical: "/zmiany" },
  openGraph: {
    title: "Zmiany na stronie | Fluxlab",
    description: "Co dodaliśmy i poprawiliśmy na fluxlab.pl w ostatnim czasie.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab" }],
  },
};

const data = (iso: string) =>
  new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Warsaw",
  }).format(new Date(iso));

export default function Zmiany() {
  return (
    <>
      <Header />
      <main className="pt-28 pb-20">
        <div className="container-wide max-w-3xl">
          <p className="section-label mb-3">Dziennik zmian</p>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Co zmieniło się na stronie
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Ostatnie {zmiany.length} zmian widocznych dla odwiedzających. Lista powstaje
            z historii naszego repozytorium przy każdym wdrożeniu.
          </p>
          <ol className="mt-10 space-y-5 border-l border-gray-200 dark:border-gray-800 pl-6">
            {zmiany.map((z, i) => (
              <li key={i} className="relative">
                <span
                  className="absolute -left-[29px] top-2 h-2 w-2 rounded-full bg-accent-solid"
                  aria-hidden="true"
                />
                <time
                  dateTime={z.data}
                  className="text-xs font-medium tabular-nums text-gray-500 dark:text-gray-400"
                >
                  {data(z.data)}
                </time>
                <p className="mt-0.5 text-gray-800 dark:text-gray-200">{z.opis}</p>
              </li>
            ))}
          </ol>
        </div>
      </main>
      <Footer />
    </>
  );
}
