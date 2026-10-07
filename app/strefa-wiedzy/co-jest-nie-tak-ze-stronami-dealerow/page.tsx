import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import WykresSlupkowy from "@/components/WykresSlupkowy";
import SprawdzPoBadaniu from "@/components/SprawdzPoBadaniu";

export const metadata: Metadata = {
  title: "Sprawdziliśmy 386 stron dealerów, wyniki | Fluxlab",
  description:
    "Ile stron dealerskich nie pozwala ustalić sprzedawcy, ile nie ma mapy strony i ile domen jest na obce firmy. Pomiar na 386 domenach, z metodą.",
  alternates: {
    canonical: "/strefa-wiedzy/co-jest-nie-tak-ze-stronami-dealerow",
  },
  openGraph: {
    title: "Sprawdziliśmy 386 stron dealerów, wyniki | Fluxlab",
    description:
      "Pomiar na 386 domenach: dane rejestrowe, mapy strony i właściciele domen. Z metodą i liczbami.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, badanie stron dealerów samochodowych",
      },
    ],
  },
};

const faqItems = [
  {
    question: "Skąd wzięliście listę 386 domen?",
    answer:
      "To publiczna lista stron autoryzowanych dealerów i serwisów w Polsce. Zawiera tylko adresy firmowych stron, bez danych osobowych.",
  },
  {
    question: "Czy badanie nie obciążyło tych serwerów?",
    answer:
      "Nie. Każda strona dostała kilka zwykłych zapytań rozłożonych w czasie. Korzystaliśmy tylko z treści publicznych i rejestrów państwowych.",
  },
  {
    question: "Znaleźliście coś u nas, co dalej?",
    answer:
      "Sprawdź swój adres darmowym narzędziem, bez rejestracji. Płatna jest dopiero naprawa.",
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
            { label: "Badanie stron dealerów" },
          ]}
        />

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Sprawdziliśmy 386 stron dealerów samochodowych
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Wzięliśmy listę stron polskich dealerów i serwisów i zmierzyliśmy
          trzy rzeczy: czy klient ustali, komu płaci, czy wyszukiwarka dostaje
          listę podstron i kto jest właścicielem domeny.
        </p>

        <div className="mt-10">
          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Czterech na pięciu nie da się zidentyfikować przed przelewem
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Przed przelewem powyżej 15 000 zł księgowość sprawdza sprzedawcę w
            wykazie podatników VAT. Potrzebny jest do tego NIP, a ten powinien
            być na stronie.
          </p>
        </div>

        <WykresSlupkowy
          tytul="Czy ze strony da się ustalić sprzedawcę"
          podtytul="303 domeny, które odpowiedziały. Pozostałe 83 z listy nie mają już nawet wpisu w systemie nazw domen."
          slupki={[
            {
              etykieta: "Brak numeru NIP gdziekolwiek na stronie",
              wartosc: 194,
              opis: "Sprawdzane były też regulamin, polityka prywatności i podstrona kontaktu.",
              wyroznij: true,
            },
            {
              etykieta: "Jest tylko NIP importera, nie sprzedawcy",
              wartosc: 40,
              opis: "Numer jednej spółki figuruje w ten sposób na 48 różnych domenach.",
              wyroznij: true,
            },
            {
              etykieta: "Sprzedawca zidentyfikowany poprawnie",
              wartosc: 67,
            },
          ]}
          zrodlo="Pomiar Fluxlab, wrzesień 2026. Dane rejestrowe z publicznego wykazu podatników VAT Ministerstwa Finansów."
        />

        <div>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Czterdzieści stron podaje NIP importera marki, nie spółki, która
            wystawi fakturę. To gorsze niż brak numeru, bo wygląda na komplet
            danych.{" "}
            <Link
              href="/dane-sprzedawcy"
              className="text-accent hover:underline"
            >
              Sprawdź swoją stronę tym samym narzędziem
            </Link>
            .
          </p>

          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Dwie trzecie stron nie daje wyszukiwarce listy podstron
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Mapa strony to plik z listą adresów dla wyszukiwarki. Przy katalogu
            z setkami ofert decyduje o tym, ile z nich trafi do wyników.
          </p>
        </div>

        <WykresSlupkowy
          tytul="Stan mapy strony"
          podtytul="26 domen, które udało się ocenić w próbce czterdziestu. Reszta nie odpowiedziała."
          slupki={[
            {
              etykieta: "Nie mają mapy strony w ogóle",
              wartosc: 16,
              wyroznij: true,
            },
            {
              etykieta: "Mają mapę, ale wszystkie sprawdzone adresy są martwe",
              wartosc: 2,
              opis: "Wyszukiwarka dostaje listę stron, z których żadna nie działa.",
              wyroznij: true,
            },
            { etykieta: "Bez zastrzeżeń", wartosc: 8 },
          ]}
          zrodlo="Pomiar Fluxlab, wrzesień 2026. Sprawdzana była próbka adresów z każdej mapy, a nie całe serwisy, żeby nie obciążać cudzych serwerów."
        />

        <div>
          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Dziesięć firm nie jest właścicielem własnego adresu
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Abonent w rejestrze domen decyduje o domenie, stronie i poczcie. W
            dziesięciu przypadkach była nim agencja albo firma informatyczna,
            która kiedyś robiła stronę. Zwykle to pozostałość po starym
            wdrożeniu, nie zła wola.{" "}
            <Link
              href="/audyt-poczty"
              className="text-accent hover:underline"
            >
              Sprawdź, kto jest abonentem Twojej domeny
            </Link>
            .
          </p>

          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Ograniczenia pomiaru
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Nie uruchamialiśmy przeglądarki i nie czytaliśmy PDF-ów, więc część
            braków mogła zostać zaliczona niesłusznie. 83 domeny nie
            odpowiedziały i nie liczymy ich ani na plus, ani na minus.
          </p>

          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Wniosek
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Żaden z tych problemów nie unieruchamia strony, ale wszystkie są
            niewidoczne z fotela właściciela. Dlatego każdy sprawdzisz darmowym
            narzędziem od ręki.
          </p>
        </div>

        <SprawdzPoBadaniu
          naglowek="Zobacz pierwsze z tych sprawdzeń na żywo"
          opis="Szukamy NIP-u na stronie wybranej domeny i zestawiamy go z wykazem podatników VAT, tak jak przy 386 domenach z badania."
          endpoint="/api/sprawdz-sprzedawce"
          pozycje={[
            { wartosc: "fluxlab.pl" },
            { wartosc: "x-kom.pl" },
            { wartosc: "empik.com" },
          ]}
          narzedzie={{
            href: "/dane-sprzedawcy",
            etykieta: "Sprawdź swoją stronę",
          }}
          kontakt="Chcesz, żeby ktoś uzupełnił te dane na Twojej stronie?"
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
              headline: "Sprawdziliśmy 386 stron dealerów samochodowych",
              description:
                "Ile stron nie pozwala ustalić sprzedawcy, ile nie ma mapy strony i ile domen jest zapisanych na obce firmy. Pomiar na 386 domenach, z metodą i zastrzeżeniami.",
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
