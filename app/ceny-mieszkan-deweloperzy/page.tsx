import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import NazwaNarzedzia from "@/components/NazwaNarzedzia";
import { ceny, dataPl } from "@/lib/ceny-dewelopery";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Ceny mieszkań od deweloperów, mediana za m² | Fluxlab",
  description:
    "Mediany cen ofertowych mieszkań z jawnych danych deweloperów, miasto po mieście, z liczbą ofert, deweloperów i datą danych. Nie ceny transakcyjne.",
  alternates: { canonical: "/ceny-mieszkan-deweloperzy" },
  openGraph: {
    title: "Ceny mieszkań od deweloperów, mediana za m² | Fluxlab",
    description:
      "Ceny ofertowe z jawnych danych deweloperów (art. 19b ustawy deweloperskiej), liczone co dobę.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, ceny mieszkań od deweloperów",
      },
    ],
  },
};

const zl = (n: number) => `${n.toLocaleString("pl-PL")} zł`;

export default async function Page() {
  const { miasta, meta } = await ceny();
  const jest = miasta.length > 0 && meta !== null;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-28 md:pt-32">
        <Breadcrumbs
          href="/ceny-mieszkan-deweloperzy"
          items={[{ label: "Ceny mieszkań od deweloperów" }]}
        />

        <p className="section-label mt-6 mb-3">Narzędzie</p>
        <h1 className="h1-strony">Ceny mieszkań od deweloperów</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Mediana ceny za metr kwadratowy w mieście, liczona z jawnych danych
          deweloperów. To ceny ofertowe, nie ceny transakcyjne.
        </p>

        <div className="mt-8 -mb-5">
          <NazwaNarzedzia href="/ceny-mieszkan-deweloperzy" dane />
        </div>

        {!jest && (
          <p className="mt-8 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60 p-5 text-sm text-gray-700 dark:text-gray-300">
            Dane są w przygotowaniu. Pierwsze zestawienie pojawi się po
            najbliższym dobowym pobraniu.
          </p>
        )}

        {jest && meta && (
          <>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { e: "miast w zestawieniu", w: String(miasta.length) },
                {
                  e: "deweloperów z ofertami",
                  w: meta.dewelopery.toLocaleString("pl-PL"),
                },
                {
                  e: "ofert w pobranych zbiorach",
                  w: meta.oferty.toLocaleString("pl-PL"),
                },
                { e: "dane z", w: `${dataPl(meta.od)} do ${dataPl(meta.do)}` },
              ].map((x) => (
                <div
                  key={x.e}
                  className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-4"
                >
                  <p className="text-xl font-bold tabular-nums text-gray-900 dark:text-white">
                    {x.w}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                    {x.e}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50">
              <table className="w-full text-left text-sm">
                <thead className="text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="px-4 py-2 font-medium">Miasto</th>
                    <th className="px-4 py-2 font-medium">Mediana za m²</th>
                    <th className="px-4 py-2 font-medium">Ofert</th>
                    <th className="px-4 py-2 font-medium">Deweloperów</th>
                  </tr>
                </thead>
                <tbody className="text-gray-900 dark:text-gray-100">
                  {miasta.map((m) => (
                    <tr
                      key={m.miasto}
                      className="border-t border-gray-200/70 dark:border-gray-800/70"
                    >
                      <td className="px-4 py-2">{m.miasto}</td>
                      <td className="px-4 py-2 font-semibold tabular-nums">
                        {zl(m.mediana_m2)}
                      </td>
                      <td className="px-4 py-2 tabular-nums">
                        {m.oferty.toLocaleString("pl-PL")}
                      </td>
                      <td className="px-4 py-2 tabular-nums">{m.dewelopery}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-600 dark:text-gray-400">
              Dane z {dataPl(meta.od)} do {dataPl(meta.do)}, zestawienie
              odświeżone {dataPl(meta.dzien)}. Pokazujemy miasta, w których mamy
              co najmniej 30 ofert od co najmniej 5 deweloperów.
            </p>
          </>
        )}

        <div className="mt-12">
          <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
            Skąd te liczby i czego nie pokazują
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Deweloperzy mają obowiązek codziennie publikować ceny mieszkań na
            swoich stronach i w portalu dane.gov.pl (art. 19b ustawy
            deweloperskiej). Pobieramy te pliki, ujednolicamy kolumny i liczymy
            medianę ceny za metr kwadratowy mieszkań w każdym mieście. Bierzemy
            tylko pliki z ostatnich 30 dni.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            To ceny ofertowe, czyli to, czego chce deweloper, a nie to, za ile
            mieszkanie się sprzedało. Część deweloperów publikuje pliki w
            formatach, których jeszcze nie czytamy (m.in. XML i stare XLS), więc
            liczba deweloperów w zestawieniu jest mniejsza niż wszystkich,
            którzy publikują dane. Mediana dla całego miasta ukrywa różnice
            między dzielnicami; podziału na dzielnice na razie nie ma.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6">
          <p className="text-base font-bold text-gray-900 dark:text-white">
            Zobacz też
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/narzedzia" className="text-accent hover:underline">
                Wszystkie darmowe narzędzia
              </Link>
            </li>
          </ul>
        </div>
      </main>
      <CTA naglowek="Sprawdź, czy dane z rynku mogą same trafiać do Twojej firmy" />
      <Footer />
    </>
  );
}
