import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { doba } from "@/lib/ceny-energii";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Ceny energii na jutro, godzina po godzinie | Fluxlab",
  description:
    "Rynkowa cena energii na kolejną dobę: najtańsze i najdroższe cztery godziny, okna z ceną ujemną i średnia doby. Wprost z danych operatora.",
  alternates: { canonical: "/ceny-energii-jutro" },
  openGraph: {
    title: "Ceny energii na jutro, godzina po godzinie | Fluxlab",
    description:
      "Najtańsze i najdroższe okno czterogodzinne oraz godziny z ceną ujemną, liczone z danych operatora systemu przesyłowego.",
    locale: "pl_PL",
    type: "website",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, ceny energii na jutro" },
    ],
  },
};

function zl(n: number | null) {
  return n === null ? "brak" : `${n.toLocaleString("pl-PL")} zł`;
}

export default async function Page() {
  const d = await doba(1);
  const jest = d.kwadranse.length > 0;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-28 md:pt-32">
        <Breadcrumbs items={[{ label: "Ceny energii na jutro" }]} />

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Ceny energii na jutro
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Rynkowa cena energii na dobę {d.data}, w rozbiciu na kwadranse. Pokazujemy
          najtańsze i najdroższe cztery godziny oraz okna, w których cena schodzi
          poniżej zera. Dane pochodzą wprost od operatora systemu przesyłowego i
          odświeżają się co pół godziny.
        </p>

        {!jest ? (
          <p className="mt-8 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60 p-5 text-sm text-gray-700 dark:text-gray-300">
            Ceny na jutro nie są jeszcze opublikowane. Pojawiają się zwykle po
            południu dnia poprzedniego, więc zajrzyj po czternastej.
          </p>
        ) : (
          <>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { e: "średnia doby", w: zl(d.srednia) },
                { e: "najtaniej", w: zl(d.min) },
                { e: "najdrożej", w: zl(d.max) },
                { e: "kwadranse poniżej zera", w: String(d.ujemnych) },
              ].map((x) => (
                <div
                  key={x.e}
                  className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-4"
                >
                  <p className="text-xl font-bold tabular-nums text-gray-900 dark:text-white">
                    {x.w}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{x.e}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {d.najtansze4h && (
                <div className="rounded-2xl border border-emerald-500/60 bg-emerald-50 dark:bg-emerald-950/30 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Najtańsze cztery godziny
                  </p>
                  <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900 dark:text-white">
                    {d.najtansze4h.od} do {d.najtansze4h.do}
                  </p>
                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                    średnio {zl(d.najtansze4h.srednia)} za megawatogodzinę
                  </p>
                </div>
              )}
              {d.najdrozsze4h && (
                <div className="rounded-2xl border border-red-500/60 bg-red-50 dark:bg-red-950/30 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-400">
                    Najdroższe cztery godziny
                  </p>
                  <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900 dark:text-white">
                    {d.najdrozsze4h.od} do {d.najdrozsze4h.do}
                  </p>
                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                    średnio {zl(d.najdrozsze4h.srednia)} za megawatogodzinę
                  </p>
                </div>
              )}
            </div>

            {d.oknaUjemne.length > 0 && (
              <div className="mt-6 rounded-2xl border border-amber-500/60 bg-amber-50 dark:bg-amber-950/30 p-5">
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  Jutro cena schodzi poniżej zera
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  {d.oknaUjemne.map((o) => (
                    <li key={o.od} className="tabular-nums">
                      od {o.od} do {o.do}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                  W tych godzinach energii jest w systemie więcej, niż potrzeba.
                </p>
              </div>
            )}

            <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50">
              <table className="w-full text-left text-sm">
                <thead className="text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="px-4 py-2 font-medium">Godzina</th>
                    <th className="px-4 py-2 font-medium">Cena za MWh</th>
                  </tr>
                </thead>
                <tbody>
                  {d.kwadranse
                    .filter((_, i) => i % 4 === 0)
                    .map((k) => (
                      <tr
                        key={k.czas}
                        className={`border-t border-gray-100 dark:border-gray-800 ${
                          k.cena < 0 ? "bg-amber-50/70 dark:bg-amber-950/30" : ""
                        }`}
                      >
                        <td className="px-4 py-1.5 tabular-nums text-gray-700 dark:text-gray-300">
                          {k.czas}
                        </td>
                        <td className="px-4 py-1.5 tabular-nums font-medium text-gray-900 dark:text-white">
                          {k.cena.toLocaleString("pl-PL")} zł
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <div className="mt-10">
          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Co to za cena i czego nie mówi
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            To jest cena rynku bilansującego publikowana przez operatora systemu
            przesyłowego, a nie cena z Twojej faktury. Rachunek gospodarstwa
            domowego zwykle opiera się na taryfie, a nie na cenie godzinowej, więc
            traktuj te liczby jako obraz tego, co dzieje się w systemie, a nie jako
            to, ile zapłacisz.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Ma to natomiast bezpośrednie znaczenie dla każdego, kto rozlicza się
            według cen godzinowych albo może przesunąć zużycie: ładowanie auta,
            pompa ciepła, chłodnia, ogrzewanie wody. Różnica między najtańszymi a
            najdroższymi czterema godzinami bywa kilkusetprocentowa.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6">
          <p className="text-base font-bold text-gray-900 dark:text-white">
            Zobacz też
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/ile-spolek-znika-z-krs" className="text-accent hover:underline">
                Ile spółek dziennie trafia do wykreślenia z KRS
              </Link>
            </li>
            <li>
              <Link href="/narzedzia" className="text-accent hover:underline">
                Wszystkie darmowe narzędzia
              </Link>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
