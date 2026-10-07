import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import WykresSlupkowy from "@/components/WykresSlupkowy";
import SprawdzPoBadaniu from "@/components/SprawdzPoBadaniu";

export const metadata: Metadata = {
  title: "Czy asystenci AI widzą strony dealerów | Fluxlab",
  description:
    "Sprawdziliśmy 386 domen dealerskich: czy roboty zbierające treść dla asystentów AI mają co przeczytać. Blokuje je 0,8 procent. Pełna metoda i liczby.",
  alternates: {
    canonical: "/strefa-wiedzy/czy-ai-widzi-strony-dealerow",
  },
  openGraph: {
    title:
      "Czy asystenci AI widzą strony dealerów? Badanie 386 domen | Fluxlab",
    description:
      "Nie blokady są problemem. Problemem jest to, że u ponad połowy nie ma czego zacytować.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, badanie widoczności stron dla asystentów AI",
      },
    ],
  },
};

const faqItems = [
  {
    question: "Czy takie sprawdzenie jest legalne?",
    answer:
      "Tak. Pobraliśmy stronę główną, robots.txt i llms.txt, czyli to samo, co pobiera każda przeglądarka. Trzy zapytania na domenę, bez logowania i bez obchodzenia zabezpieczeń.",
  },
  {
    question: "Czy blokowanie robotów AI to błąd?",
    answer:
      "Nie zawsze. Wydawca żyjący z treści ma powód, żeby blokować. Dealer zwykle nie ma, a blokada odcina go od kanału, w którym ktoś pyta o serwis albo auto.",
  },
  {
    question: "Czy strona bez danych uporządkowanych nie pojawi się w odpowiedzi asystenta?",
    answer:
      "Może się pojawić, ale maszyna musi zgadywać, czym jest firma. Najczęściej myli się co do zakresu usług i lokalizacji.",
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
            { label: "Czy AI widzi strony dealerów" },
          ]}
        />

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Czy asystenci AI widzą strony dealerów samochodowych
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Sprawdziliśmy 386 domen polskich dealerów i serwisów. Blokady robotów
          AI prawie nie istnieją. Problem jest bardziej banalny: na stronach nie
          ma czego zacytować.
        </p>

        <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          Co sprawdzaliśmy
        </h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          Blokady dla siedmiu robotów AI, ilość tekstu bez uruchamiania
          skryptów, dane uporządkowane i opis w metadanych. Większość robotów
          nie uruchamia skryptów, więc strona doklejana w przeglądarce jest dla
          nich pustą kartką.
        </p>

        <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          131 domen nie oddało strony w ogóle
        </h2>

        <WykresSlupkowy
          tytul="Dlaczego 131 domen nie oddało strony"
          podtytul="Z 386 domen z listy. Każda próbowana była pod adresem z www i bez, a przy błędzie certyfikatu także z jego pominięciem i bez szyfrowania."
          slupki={[
            {
              etykieta: "Brak wpisu w rejestrze nazw",
              wartosc: 53,
              opis: "Domena nie wskazuje żadnego serwera. Zwykle nieodnowiona albo porzucona.",
              wyroznij: true,
            },
            {
              etykieta: "Serwer nie odpowiedział",
              wartosc: 37,
              opis: "Przekroczony czas oczekiwania, mimo dwudziestu pięciu sekund na próbę.",
            },
            {
              etykieta: "Certyfikat nie do naprawienia",
              wartosc: 18,
              opis: "Strona nie odpowiedziała nawet po pominięciu weryfikacji certyfikatu.",
            },
            {
              etykieta: "Odmowa dostępu",
              wartosc: 14,
              opis: "Serwer odrzucił zapytanie kodem 403, zwykle ochrona przed ruchem automatycznym.",
            },
            {
              etykieta: "Pozostałe błędy",
              wartosc: 9,
              opis: "Błędy serwera i przypadki jednostkowe.",
            },
          ]}
          zrodlo="Pomiar Fluxlab, wrzesień 2026. Trzy zapytania na domenę, bez logowania i bez obchodzenia zabezpieczeń."
        />

        <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          Blokady robotów AI praktycznie nie istnieją
        </h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          Z 255 działających stron zakaz dla robotów AI mają <strong>dwie</strong>,
          czyli 0,8 procent. Kolejne 90 działa tylko z błędnym certyfikatem albo
          bez szyfrowania, więc przeglądarka straszy ostrzeżeniem.
        </p>

        <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          Prawdziwy problem: nie ma czego zacytować
        </h2>

        <WykresSlupkowy
          tytul="Czego brakuje na 255 działających stronach"
          podtytul="Odsetek stron, u których dany element nie występuje."
          jednostka="%"
          slupki={[
            {
              etykieta: "Brak danych uporządkowanych",
              wartosc: 54,
              opis: "137 stron. Maszyna musi zgadnąć z układu strony, czym jest firma.",
              wyroznij: true,
            },
            {
              etykieta: "Brak opisu w metadanych",
              wartosc: 58,
              opis: "147 stron. Brakuje zdania, które najczęściej trafia do podsumowania.",
              wyroznij: true,
            },
            {
              etykieta: "Brak pliku robots.txt",
              wartosc: 30,
              opis: "77 stron. Brak nie blokuje niczego, ale nie ma też żadnych wskazówek.",
            },
            {
              etykieta: "Pusta bez skryptów",
              wartosc: 16,
              opis: "41 stron ma poniżej 600 znaków tekstu w samym dokumencie.",
              wyroznij: true,
            },
            {
              etykieta: "Zakaz dla robotów AI",
              wartosc: 1,
              opis: "2 strony. To o tym mówi się najwięcej, a występuje najrzadziej.",
            },
          ]}
          zrodlo="Pomiar Fluxlab, wrzesień 2026. Próbka 255 domen, które oddały stronę główną."
        />

        <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          Pusty dokument zdarza się dwadzieścia razy częściej niż blokada.
          Wszystkie cztery warunki spełnia 63 strony na 255, czyli niecałe 25
          procent. Co piąta domena ma plik llms.txt, ale część wygenerowała go
          sama wtyczka.
        </p>
        <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          Kolejność napraw: najpierw treść w samym dokumencie, potem dane
          uporządkowane i opis w metadanych, blokady na końcu. Nie mierzyliśmy,
          czy asystenci faktycznie polecają te firmy, tylko warunki, na które
          właściciel strony ma wpływ.
        </p>
        <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          Te same domeny opisujemy też w{" "}
          <Link
            href="/strefa-wiedzy/podszywanie-pod-salony-samochodowe"
            className="text-accent hover:underline"
          >
            badaniu zabezpieczeń poczty
          </Link>
          .
        </p>

        <SprawdzPoBadaniu
          naglowek="Sprawdź to na żywo, jednym kliknięciem"
          opis="Pobieramy domenę tak jak asystent AI i sprawdzamy te same cztery punkty co w badaniu."
          endpoint="/api/sprawdz-ai"
          pozycje={[
            { wartosc: "fluxlab.pl" },
            { wartosc: "rp.pl" },
            { wartosc: "wyborcza.pl" },
          ]}
          narzedzie={{
            href: "/widocznosc-w-ai",
            etykieta: "Sprawdź swoją domenę",
          }}
          kontakt="Chcesz, żeby ktoś poprawił to, co wyszło na czerwono?"
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
              headline: "Czy asystenci AI widzą strony dealerów samochodowych",
              description:
                "Badanie 386 domen dealerskich. Roboty AI blokuje 0,8 procent stron, ale 54 procent nie ma danych uporządkowanych, a 16 procent jest pustych bez uruchomienia skryptów.",
              datePublished: "2026-09-21",
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
