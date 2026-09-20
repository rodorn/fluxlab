import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import WykresSlupkowy from "@/components/WykresSlupkowy";
import { wykreslenia } from "@/lib/wykreslenia";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Ile spółek dziennie znika z KRS bez likwidacji | Fluxlab",
  description:
    "Licznik liczony codziennie z Monitora Sądowego i Gospodarczego: ile podmiotów sąd skierował do rozwiązania bez przeprowadzania likwidacji. Dane z ostatnich dni roboczych.",
  alternates: { canonical: "/ile-spolek-znika-z-krs" },
  openGraph: {
    title: "Ile spółek dziennie znika z KRS bez likwidacji | Fluxlab",
    description:
      "Codziennie aktualizowany licznik obwieszczeń o rozwiązaniu spółek bez likwidacji, liczony wprost z Monitora Sądowego i Gospodarczego.",
    locale: "pl_PL",
    type: "website",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, licznik wykreśleń z KRS" },
    ],
  },
};

export default async function Page() {
  const d = await wykreslenia();
  const dni = (d?.dni || []).filter((x) => x.ile !== null && x.ile > 0);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-28 md:pt-32">
        <Breadcrumbs items={[{ label: "Ile spółek znika z KRS" }]} />

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Ile spółek dziennie trafia do wykreślenia z KRS
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Sąd rejestrowy wszczyna z urzędu postępowanie o rozwiązanie podmiotu
          bez przeprowadzania likwidacji i ogłasza to w Monitorze Sądowym i
          Gospodarczym. Poniższe liczby wyliczamy wprost z tych obwieszczeń,
          codziennie. Monitor ukazuje się tylko w dni robocze.
        </p>

        {d && dni.length > 0 ? (
          <>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-5">
                <p className="text-4xl font-bold tabular-nums text-gray-900 dark:text-white">
                  {d.srednia}
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  średnio dziennie w ostatnich {dni.length} dniach roboczych
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-5">
                <p className="text-4xl font-bold tabular-nums text-gray-900 dark:text-white">
                  {d.rocznie?.toLocaleString("pl-PL")}
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  tyle wyszłoby w skali roku, przy 250 dniach roboczych
                </p>
              </div>
            </div>

            <WykresSlupkowy
              tytul="Obwieszczenia o rozwiązaniu bez likwidacji, dzień po dniu"
              podtytul="Liczone z wydań Monitora Sądowego i Gospodarczego. Dni bez wydania pominięte."
              slupki={dni.map((x) => ({
                etykieta: x.data,
                wartosc: x.ile as number,
              }))}
              zrodlo="Wyszukiwarka Monitora Sądowego i Gospodarczego, Ministerstwo Sprawiedliwości. Licznik odświeżany co godzinę."
            />
          </>
        ) : (
          <p className="mt-8 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60 p-5 text-sm text-gray-700 dark:text-gray-300">
            Nie udało się w tej chwili pobrać danych z Monitora. Liczby wracają
            automatycznie przy kolejnym odświeżeniu, zwykle w ciągu godziny.
          </p>
        )}

        <div className="mt-10">
          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Dlaczego to ma znaczenie dla wierzyciela
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Od dnia obwieszczenia biegną trzy miesiące na zgłoszenie
            okoliczności przemawiających przeciwko wykreśleniu. Po tym terminie
            podmiot znika z rejestru, a jego majątek przechodzi na Skarb
            Państwa. Wierzyciel nie dostaje żadnego zawiadomienia, bo
            obwieszczenie w Monitorze jest z punktu widzenia prawa
            wystarczającym powiadomieniem wszystkich.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Przy tej skali, kilkadziesiąt podmiotów każdego dnia roboczego,
            przeglądanie Monitora ręcznie nie ma sensu. Dlatego zrobiliśmy z
            tego narzędzie.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6">
          <p className="text-base font-bold text-gray-900 dark:text-white">
            Sprawdź konkretną spółkę
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Wpisujesz nazwę albo numer KRS, dostajesz historię ogłoszeń i
            informację, czy trwa postępowanie o rozwiązanie razem z datą, do
            której można zgłosić sprzeciw. Za darmo, bez rejestracji.
          </p>
          <Link
            href="/czujka-rejestrowa"
            className="btn-primary mt-4 inline-flex px-5 py-2.5 text-sm"
          >
            Sprawdź kontrahenta
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
