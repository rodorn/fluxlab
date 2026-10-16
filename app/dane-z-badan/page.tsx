import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Dane z naszych badań do pobrania | Fluxlab",
  description:
    "Surowe zestawienia z badania 386 domen dealerskich w formacie CSV, do pobrania bez rejestracji i do cytowania z podaniem źródła. Metoda opisana wprost.",
  alternates: { canonical: "/dane-z-badan" },
  openGraph: {
    title: "Dane z naszych badań do pobrania | Fluxlab",
    description:
      "Zestawienia w CSV z badania 386 domen dealerskich. Bez rejestracji, do cytowania z podaniem źródła.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, dane z badań do pobrania",
      },
    ],
  },
};

const PLIKI = [
  {
    plik: "/dane/widocznosc-ai-dostepnosc.csv",
    nazwa: "Dostępność domen",
    opis:
      "Ile z 386 domen oddało stronę główną i dlaczego reszta nie.",
  },
  {
    plik: "/dane/widocznosc-ai-braki.csv",
    nazwa: "Braki techniczne",
    opis:
      "Brak danych uporządkowanych, opisu, robots.txt, llms.txt i puste strony bez skryptów.",
  },
  {
    plik: "/dane/widocznosc-ai-tresc.csv",
    nazwa: "Ilość treści w dokumencie",
    opis:
      "Liczba znaków tekstu widocznych bez skryptów, w pięciu przedziałach.",
  },
  {
    plik: "/dane/widocznosc-ai-polaczenie.csv",
    nazwa: "Stan połączenia",
    opis:
      "Poprawny certyfikat, błędny certyfikat albo brak szyfrowania.",
  },
];

export default function DaneZBadan() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-28 md:pt-32">
        <Breadcrumbs href="/dane-z-badan" items={[{ label: "Dane z badań" }]} />

        <p className="section-label mt-6">Badanie</p>
        <h1 className="h1-strony mt-3">
          Dane z naszych badań, do pobrania
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Zestawienia z naszych badań w CSV, do sprawdzenia i cytowania. Bez
          rejestracji.
        </p>

        <section className="mt-10">
          <h2 className="h2-sekcji">
            Widoczność stron dla asystentów AI, wrzesień 2026
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
            Próbka: 386 domen polskich dealerów i serwisów samochodowych. Metodę
            opisuje{" "}
            <Link
              href="/strefa-wiedzy/czy-ai-widzi-strony-dealerow"
              className="text-accent hover:underline"
            >
              osobne badanie
            </Link>
            .
          </p>

          <ul className="mt-6 space-y-3">
            {PLIKI.map((p) => (
              <li
                key={p.plik}
                className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/40 p-5"
              >
                <a
                  href={p.plik}
                  download
                  className="text-base font-bold text-accent hover:underline"
                >
                  {p.nazwa}
                </a>
                <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">
                  {p.opis}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="h2-sekcji">
            Bez nazw firm
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
            Publikujemy tylko zestawienia zbiorcze, bez nazw domen. Swój wynik
            sprawdzisz od ręki przez{" "}
            <Link href="/widocznosc-w-ai" className="text-accent hover:underline">
              darmowe narzędzie
            </Link>
            .
          </p>
        </section>

        <section className="mt-12">
          <h2 className="h2-sekcji">
            Warunki użycia
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
            Możesz ich używać, także komercyjnie, podając źródło: Fluxlab z
            odnośnikiem do tej strony. Pomiar jest z września 2026, więc nie
            podawaj go jako stanu bieżącego.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
