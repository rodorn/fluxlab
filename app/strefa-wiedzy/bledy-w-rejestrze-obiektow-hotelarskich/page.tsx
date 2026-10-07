import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import WykresSlupkowy from "@/components/WykresSlupkowy";
import SprawdzPoBadaniu from "@/components/SprawdzPoBadaniu";

export const metadata: Metadata = {
  title: "Rejestr hoteli gubi Kraków i Warszawę. Nasz pomiar | Fluxlab",
  description:
    "W Centralnym Wykazie Obiektów Hotelarskich 504 wpisy mają województwo zapisane jako liczba 1, a przy pobieraniu znika co piąty obiekt. Metoda i liczby.",
  alternates: {
    canonical: "/strefa-wiedzy/bledy-w-rejestrze-obiektow-hotelarskich",
  },
  openGraph: {
    title: "Rejestr hoteli gubi Kraków i Warszawę. Nasz pomiar | Fluxlab",
    description:
      "Dwa błędy w rządowym rejestrze obiektów hotelarskich, opisane liczbami i możliwe do powtórzenia przez każdego.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, badanie rejestru obiektów hotelarskich",
      },
    ],
  },
};

const faqItems = [
  {
    question: "Czy to znaczy, że dane w rejestrze są nieprawdziwe?",
    answer:
      "Nie. Same wpisy są poprawne. Błędy dotyczą tego, jak rejestr wydaje dane: pola województwa przy pięciu miastach i stronicowania.",
  },
  {
    question: "Jak to sprawdzić samodzielnie?",
    answer:
      "Pobierz rejestr przez publiczny interfejs i policz rekordy z województwem zapisanym jako liczba oraz unikalne identyfikatory. Porównaj je z liczbą, którą deklaruje rejestr.",
  },
  {
    question: "Dlaczego liczba zgubionych rekordów jest za każdym razem inna?",
    answer:
      "Bo dane nie są sortowane. Przy pobieraniu strona po stronie część rekordów przychodzi dwa razy, a część wcale.",
  },
  {
    question: "Kogo to realnie dotyka?",
    answer:
      "Każdego, kto buduje na tych danych porównywarki, analizy rynku albo zestawienia. Przy filtrze po województwie pięć największych miast daje zero.",
  },
];

export default function Page() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-28 md:pt-32">
        <Breadcrumbs
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Błędy w rejestrze hoteli" },
          ]}
        />

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Rządowy rejestr hoteli gubi Kraków i Warszawę
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Pobraliśmy w całości Centralny Wykaz Obiektów Hotelarskich. Same
          wpisy są w porządku, ale sposób wydawania danych ma dwa błędy, każdy
          przekłamuje wynik o kilkanaście procent.
        </p>

        <div className="mt-10">
          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Pięćset cztery obiekty leżą w województwie o nazwie „1"
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            W 504 wpisach na 3374 pole województwa zawiera „1" zamiast
            nazwy. Wszystkie pochodzą z pięciu miast.
          </p>
        </div>

        <WykresSlupkowy
          tytul="Obiekty z województwem zapisanym jako „1”"
          podtytul="Wszystkie 504 wpisy pochodzą z pięciu miast. Reszta rejestru ma nazwy województw poprawnie."
          slupki={[
            { etykieta: "Kraków", wartosc: 207, wyroznij: true },
            { etykieta: "Warszawa", wartosc: 122, wyroznij: true },
            { etykieta: "Wrocław", wartosc: 76, wyroznij: true },
            { etykieta: "Poznań", wartosc: 58, wyroznij: true },
            { etykieta: "Łódź", wartosc: 39, wyroznij: true },
            { etykieta: "bez podanego miasta", wartosc: 2 },
          ]}
          zrodlo="Pomiar Fluxlab, wrzesień 2026, na pełnym pobraniu Centralnego Wykazu Obiektów Hotelarskich."
        />

        <div>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Kto filtruje rejestr po województwie, przy tych miastach dostanie
            pustkę. Małopolska bez Krakowa to 377 obiektów zamiast 584.
          </p>

          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Przy pobieraniu znika nawet co piąty obiekt
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Rejestr deklaruje 3374 rekordy i tyle wierszy przychodzi. Część z
            nich to jednak duplikaty, a tyle samo innych obiektów nie przychodzi
            wcale. Pobraliśmy rejestr cztery razy.
          </p>
        </div>

        <WykresSlupkowy
          tytul="Ile obiektów przepadło w kolejnych pobraniach"
          podtytul="Za każdym razem przychodzi 3374 wiersze, a rejestr deklaruje 3374 rekordy. Różnica to duplikaty."
          slupki={[
            {
              etykieta: "strona po 200, z odstępem",
              wartosc: 158,
              wyroznij: true,
            },
            {
              etykieta: "strona po 200, bez odstępu",
              wartosc: 188,
              wyroznij: true,
            },
            {
              etykieta: "strona po 500, z odstępem",
              wartosc: 707,
              wyroznij: true,
            },
            { etykieta: "pobranie bez straty", wartosc: 0 },
          ]}
          jednostka=" utraconych"
          zrodlo="Pomiar Fluxlab, wrzesień 2026. Każde pobranie liczone przez porównanie unikalnych identyfikatorów z deklarowaną liczbą rekordów."
        />

        <div>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Przyczyna: dane nie są sortowane, więc kolejność zmienia się między
            stronami. Nic tego nie sygnalizuje, licznik i liczba wierszy się
            zgadzają.
          </p>

          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Co z tym zrobić, jeśli korzystasz z tych danych
          </h2>
          <ul className="mb-4 ml-5 list-disc space-y-2 text-gray-600 dark:text-gray-400">
            <li className="leading-relaxed">
              Po pobraniu porównaj liczbę unikalnych identyfikatorów z deklarowaną. Przy rozjeździe pobierz ponownie.
            </li>
            <li className="leading-relaxed">
              Pobieraj mniejsze strony: po 200 rekordów traciły około 5%, po 500 ponad 20%.
            </li>
            <li className="leading-relaxed">
              Przed filtrem po województwie popraw pięć miast i przytnij spacje w nazwach.
            </li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6">
          <p className="text-base font-bold text-gray-900 dark:text-white">
            Inne nasze badania
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                href="/strefa-wiedzy/co-jest-nie-tak-ze-stronami-dealerow"
                className="text-accent hover:underline"
              >
                Sprawdziliśmy 386 stron dealerów samochodowych
              </Link>
            </li>
            <li>
              <Link
                href="/strefa-wiedzy/podszywanie-pod-salony-samochodowe"
                className="text-accent hover:underline"
              >
                Pod 84 procent salonów można się podszyć mailowo
              </Link>
            </li>
            <li>
              <Link
                href="/ile-spolek-znika-z-krs"
                className="text-accent hover:underline"
              >
                Ile spółek dziennie trafia do wykreślenia z KRS
              </Link>
            </li>
          </ul>
        </div>

        <SprawdzPoBadaniu
          naglowek="Zobacz, co publiczny rejestr mówi o konkretnej spółce"
          opis="Sprawdzamy w Monitorze Sądowym i Gospodarczym od 2013 roku, czy wobec podmiotu toczy się postępowanie o rozwiązanie bez likwidacji."
          endpoint="/api/sprawdz-spolke"
          pole="zapytanie"
          pozycje={[{ wartosc: "CD PROJEKT" }, { wartosc: "ALLEGRO" }]}
          wstep="Nie masz pod ręką nazwy? Uruchom na gotowym przykładzie:"
          narzedzie={{
            href: "/ile-spolek-znika-z-krs",
            etykieta: "Sprawdź swojego kontrahenta",
          }}
          kontakt="Chcesz mieć takie sprawdzenie na całej swojej bazie kontrahentów?"
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Pytania
          </h2>
          <dl className="mt-5 space-y-5">
            {faqItems.map((f) => (
              <div key={f.question}>
                <dt className="font-semibold text-gray-900 dark:text-white">
                  {f.question}
                </dt>
                <dd className="mt-1 text-gray-600 dark:text-gray-300">
                  {f.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Rządowy rejestr hoteli gubi Kraków i Warszawę",
              description:
                "W Centralnym Wykazie Obiektów Hotelarskich 504 wpisy mają województwo zapisane jako liczba, a przy pobieraniu znika nawet co piąty obiekt mimo poprawnego licznika.",
              datePublished: "2026-09-20",
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
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            }),
          }}
        />
      </main>
      <Footer />
    </>
  );
}
