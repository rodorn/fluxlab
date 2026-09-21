import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Dane z naszych badań do pobrania | Fluxlab",
  description:
    "Surowe zestawienia z badania 386 domen dealerskich w formacie CSV, do pobrania bez rejestracji i do cytowania z podaniem źródła. Metoda, zakres i zastrzeżenia opisane wprost.",
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
      "Ile z 386 domen oddało stronę główną i z jakiego powodu nie zrobiła tego reszta: brak wpisu w rejestrze nazw, brak odpowiedzi, certyfikat, odmowa dostępu.",
  },
  {
    plik: "/dane/widocznosc-ai-braki.csv",
    nazwa: "Braki techniczne",
    opis:
      "Ile stron nie ma danych uporządkowanych, opisu w metadanych, pliku robots.txt, pliku llms.txt, oraz ile jest pustych po odrzuceniu skryptów.",
  },
  {
    plik: "/dane/widocznosc-ai-tresc.csv",
    nazwa: "Ilość treści w dokumencie",
    opis:
      "Rozkład liczby znaków tekstu widocznych bez uruchamiania skryptów, w pięciu przedziałach.",
  },
  {
    plik: "/dane/widocznosc-ai-polaczenie.csv",
    nazwa: "Stan połączenia",
    opis:
      "Ile stron ma poprawny certyfikat, ile wstało dopiero po pominięciu jego weryfikacji, a ile odpowiada wyłącznie bez szyfrowania.",
  },
];

export default function DaneZBadan() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-28 md:pt-32">
        <Breadcrumbs items={[{ label: "Dane z badań" }]} />

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Dane z naszych badań, do pobrania
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Publikujemy zestawienia, na których stoją nasze badania, żeby dało się
          je sprawdzić, przeliczyć i zacytować bez pytania nas o zgodę. Pliki są
          w formacie CSV, bez rejestracji i bez zapisywania na listę.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Widoczność stron dla asystentów AI, wrzesień 2026
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
            Próbka: 386 domen polskich dealerów i serwisów samochodowych. Dla
            każdej pobraliśmy stronę główną, plik robots.txt i plik llms.txt,
            czyli trzy zapytania, mniej niż jedno wejście człowieka. Pomiar
            opisuje{" "}
            <Link
              href="/strefa-wiedzy/czy-ai-widzi-strony-dealerow"
              className="text-accent hover:underline"
            >
              osobne badanie
            </Link>
            , razem z metodą i zastrzeżeniami.
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Czego w tych plikach nie ma i dlaczego
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
            Nie ma nazw domen ani żadnych danych pozwalających wskazać
            konkretną firmę. Publikujemy wyłącznie zestawienia zbiorcze.
            Rozpoznanie w takim pomiarze polega na wypisaniu słabych punktów
            cudzych serwisów, a lista firm z ich lukami to nie jest materiał do
            publikacji, nawet gdy każdą z tych rzeczy da się sprawdzić z
            zewnątrz w kilka sekund.
          </p>
          <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
            Jeżeli prowadzisz badanie i potrzebujesz danych na poziomie
            pojedynczych domen, napisz, na co dokładnie, a ustalimy zakres.
            Właścicielowi domeny przekazujemy jego własny wynik bez pytania o
            cokolwiek, od ręki, przez{" "}
            <Link href="/widocznosc-w-ai" className="text-accent hover:underline">
              darmowe narzędzie
            </Link>
            .
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Warunki użycia
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
            Możesz używać tych zestawień w artykułach, prezentacjach i
            opracowaniach, także komercyjnych, pod jednym warunkiem: podaj
            źródło jako Fluxlab wraz z odnośnikiem do tej strony albo do
            badania. Nie musisz nas o to pytać ani informować.
          </p>
          <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
            O jedno prosimy wprost: nie podawaj tych liczb jako stanu
            aktualnego po wielu miesiącach. Pomiar pochodzi z września 2026 i
            opisuje jedną branżę. Przy kolejnych pomiarach będziemy dokładać
            pliki z datą, zamiast nadpisywać istniejące.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
