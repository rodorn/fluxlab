import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import WykresSlupkowy from "@/components/WykresSlupkowy";
import { wykreslenia } from "@/lib/wykreslenia";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Ile spółek dziennie znika z KRS bez likwidacji | Fluxlab",
  description:
    "Licznik liczony codziennie z Monitora Sądowego i Gospodarczego: ile podmiotów sąd skierował do rozwiązania bez likwidacji. Z ostatnich dni roboczych.",
  alternates: { canonical: "/ile-spolek-znika-z-krs" },
  openGraph: {
    title: "Ile spółek dziennie znika z KRS bez likwidacji | Fluxlab",
    description:
      "Codziennie aktualizowany licznik obwieszczeń o rozwiązaniu spółek bez likwidacji, liczony wprost z Monitora Sądowego i Gospodarczego.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, licznik wykreśleń z KRS",
      },
    ],
  },
};

const faq = [
  {
    q: "Co to jest rozwiązanie podmiotu bez przeprowadzenia postępowania likwidacyjnego?",
    a: "Sąd rejestrowy z urzędu wykreśla spółkę, która latami nie składa sprawozdań i nie ma majątku ani przedstawiciela. Wszczęcie ogłasza w Monitorze Sądowym i Gospodarczym.",
  },
  {
    q: "Ile czasu jest na sprzeciw wobec wykreślenia?",
    a: "Trzy miesiące od ogłoszenia. Potem podmiot znika z rejestru, a ujawniony później majątek przechodzi na Skarb Państwa.",
  },
  {
    q: "Czy wierzyciel dostaje osobne zawiadomienie o wykreśleniu dłużnika?",
    a: "Nie. Obwieszczenie w Monitorze z mocy prawa zastępuje powiadomienie, więc wierzyciel zwykle dowiaduje się dopiero przy egzekucji.",
  },
  {
    q: "Skąd pochodzą liczby w tym liczniku?",
    a: "Z wyszukiwarki Monitora Sądowego i Gospodarczego Ministerstwa Sprawiedliwości. Licznik odświeża się co godzinę, Monitor wychodzi tylko w dni robocze.",
  },
];

export default async function Page() {
  const d = await wykreslenia();
  const dni = (d?.dni || []).filter((x) => x.ile !== null && x.ile > 0);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-28 md:pt-32">
        <Breadcrumbs href="/ile-spolek-znika-z-krs" items={[{ label: "Ile spółek znika z KRS" }]} />

        <p className="section-label mt-6 mb-3">Badanie</p>
        <h1 className="h1-strony">
          Ile spółek dziennie trafia do wykreślenia z KRS
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Liczymy codziennie obwieszczenia z Monitora Sądowego i Gospodarczego
          o rozwiązaniu podmiotu bez likwidacji.
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

        <div className="mt-12 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6">
          <p className="text-base font-bold text-gray-900 dark:text-white">
            Sprawdź konkretną spółkę
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Wierzyciel ma trzy miesiące na sprzeciw i nie dostaje zawiadomienia.
            Wpisz nazwę albo KRS, a pokażemy, czy trwa postępowanie i do kiedy
            można zgłosić sprzeciw. Za darmo.
          </p>
          <Link
            href="/czujka-rejestrowa"
            className="btn-primary mt-4 inline-flex px-5 py-2.5 text-sm"
          >
            Sprawdź kontrahenta
          </Link>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Przed przelewem zaliczki:{" "}
            <Link
              href="/sprawdz-kontrahenta"
              className="text-accent hover:underline"
            >
              sprawdzenie kontrahenta
            </Link>
            .
          </p>
        </div>

        <div className="mt-16 max-w-3xl">
          <h2 className="h2-sekcji">
            Najczęstsze pytania
          </h2>
          <div className="mt-6 space-y-4">
            {faq.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/60 dark:bg-gray-900/40"
              >
                <summary className="cursor-pointer p-5 text-sm font-semibold text-gray-900 dark:text-white select-none list-none [&::-webkit-details-marker]:hidden">
                  {item.q}
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-600 dark:text-gray-400">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </main>
      <CTA />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
      <Footer />
    </>
  );
}
