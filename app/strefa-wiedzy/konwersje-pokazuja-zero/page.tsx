import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import SprawdzPoBadaniu from "@/components/SprawdzPoBadaniu";

export const metadata: Metadata = {
  title: "Licznik konwersji pokazuje zero, a zgłoszenia są | Fluxlab",
  description:
    "Cztery przyczyny, przez które analityka nie widzi zgłoszeń, które faktycznie docierają, i sposób na rozstrzygnięcie, która z nich zachodzi u Was.",
  alternates: { canonical: "/strefa-wiedzy/konwersje-pokazuja-zero" },
  openGraph: {
    title: "Licznik konwersji pokazuje zero, a zgłoszenia są | Fluxlab",
    description:
      "Najczęściej to nie brak zainteresowania, tylko błąd pomiaru. Cztery przyczyny i sposób na rozstrzygnięcie, która to.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, mierzenie konwersji na stronie",
      },
    ],
  },
};

const faqItems = [
  {
    question: "Czy zliczanie kliknięcia w przycisk jest zawsze błędem?",
    answer:
      "Nie, jeśli to miara zainteresowania. Błędem jest wysyłanie tej liczby do systemu reklamowego jako konwersji, bo wtedy płacisz za kliknięcia, a nie za zgłoszenia.",
  },
  {
    question: "Czy nasze własne wejścia mają aż takie znaczenie?",
    answer:
      "Przy dużym ruchu nie. Przy kilkudziesięciu odwiedzinach dziennie własne testy potrafią przesunąć wynik o kilkanaście procent.",
  },
];

export default function Page() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-28 md:pt-32">
        <Breadcrumbs href="/strefa-wiedzy/konwersje-pokazuja-zero"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Konwersje pokazują zero" },
          ]}
        />

        <span className="section-label mt-6 block">Strefa wiedzy</span>
        <h1 className="h1-artykulu mt-4">
          Licznik konwersji pokazuje zero, a zgłoszenia przychodzą
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Zero w panelu rzadko znaczy, że strona nie działa. Zwykle zgłoszenia
          docierają, tylko nikt ich nie liczy. Przyczyna to najczęściej jedna z
          czterech.
        </p>

        <div className="mt-10">
          <h2 className="h2-sekcji mt-12 mb-5">
            Pierwsza: formularz nie przeładowuje strony
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Stary sposób liczy odsłony strony z podziękowaniem. Nowsze
            formularze wysyłają się w tle, adres się nie zmienia, więc licznik
            stoi na zerze, a zgłoszenia przychodzą na skrzynkę.
          </p>

          <h2 className="h2-sekcji mt-12 mb-5">
            Druga: konwersja podpięta pod kliknięcie
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Liczy się wtedy każda próba, także nieudana albo podwójna. Wynik
            jest zawyżony, a system reklamowy uczy się przyciągać ludzi, którzy
            klikają, a nie tych, którzy wysyłają zgłoszenie.
          </p>

          <h2 className="h2-sekcji mt-12 mb-5">
            Trzecia: to samo zdarzenie liczone dwa razy
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Konwersję ustawia agencja w systemie reklamowym, a ktoś inny dokłada
            ją w analityce, która też przekazuje dane do reklam. Jedno
            zgłoszenie staje się dwiema konwersjami.
          </p>

          <h2 className="h2-sekcji mt-12 mb-5">
            Czwarta: liczysz samego siebie
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Przy kilkudziesięciu odwiedzinach dziennie własne testy to istotna
            część wyniku. Wykluczenie własnych wejść to jedno ustawienie.
          </p>

          <h2 className="h2-sekcji mt-12 mb-5">
            Jak rozstrzygnąć, która to przyczyna
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Wyślij zgłoszenie testowe i sprawdź, czy zmienił się adres w pasku.
            Potem porównaj konwersje z mailami za wczoraj: dwa razy więcej to
            podwójne liczenie, dużo więcej bez pokrycia to liczenie kliknięć.
            Na koniec sprawdź wykluczenie własnych wejść.
          </p>

          <h2 className="h2-sekcji mt-12 mb-5">
            Strona z płatnością
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Zapisuj zgłoszenie przed przejściem do zapłaty, a nie po. Inaczej
            osoba, która odpadła przy płatności, znika bez śladu. Więcej przy{" "}
            <Link
              href="/landing-z-platnoscia"
              className="text-accent hover:underline"
            >
              stronach sprzedażowych z płatnością
            </Link>
            .
          </p>
        </div>

        <SprawdzPoBadaniu
          naglowek="Nie masz pewności, która z czterech przyczyn zachodzi u Ciebie?"
          opis="Tu potrzebne jest zajrzenie do ustawień pomiaru na konkretnej stronie. Napisz, co pokazuje licznik, a co przychodzi na skrzynkę."
          narzedzie={{
            href: "/landing-z-platnoscia",
            etykieta: "Zobacz, jak zapisujemy zgłoszenie przed płatnością",
          }}
          kontakt="Wolisz, żeby ktoś przeszedł te cztery punkty za Ciebie?"
        />

        <section className="mt-12">
          <h2 className="h2-sekcji">
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
              headline:
                "Licznik konwersji pokazuje zero, a zgłoszenia przychodzą",
              description:
                "Cztery przyczyny, przez które analityka nie widzi zgłoszeń docierających na skrzynkę, i sposób na rozstrzygnięcie, która z nich zachodzi.",
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
      <CTA />
      <Footer />
    </>
  );
}
