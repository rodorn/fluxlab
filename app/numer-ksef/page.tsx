import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import NumerKsefCheck from "@/components/NumerKsefCheck";
import NazwaNarzedzia from "@/components/NazwaNarzedzia";

export const metadata: Metadata = {
  title: "Sprawdzenie numeru KSeF za darmo, suma kontrolna | Fluxlab",
  description:
    "Wklejcie numer KSeF albo listę numerów z przelewów i sprawdźcie za darmo, czy nie ma literówki. Liczymy sumę kontrolną, NIP sprzedawcy i datę przyjęcia.",
  alternates: { canonical: "/numer-ksef" },
  openGraph: {
    title: "Sprawdzenie numeru KSeF za darmo, suma kontrolna | Fluxlab",
    description:
      "Darmowe sprawdzenie numeru KSeF przed przelewem. Suma kontrolna, NIP sprzedawcy i data przyjęcia faktury, liczone w przeglądarce.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, sprawdzenie numeru KSeF",
      },
    ],
  },
};

const czesci = [
  {
    q: "10 cyfr: NIP sprzedawcy",
    a: "Numer zaczyna się od NIP-u firmy, która wystawiła fakturę. Sprawdzamy jego sumę kontrolną tak samo, jak przy każdym NIP-ie.",
  },
  {
    q: "8 cyfr: data przyjęcia w KSeF",
    a: "Data w układzie RRRRMMDD, czyli dzień, w którym KSeF przyjął fakturę i nadał jej numer. Od tego dnia faktura kosztowa jest uznana za otrzymaną.",
  },
  {
    q: "12 znaków: część techniczna",
    a: "Cyfry i litery od A do F nadawane przez system. Nie niosą treści, którą dałoby się odczytać.",
  },
  {
    q: "2 znaki: suma kontrolna",
    a: "Wynik CRC-8 z pierwszych 32 znaków numeru razem z myślnikami. Zmiana jednego znaku w numerze prawie zawsze zmienia sumę, więc literówka wychodzi od razu.",
  },
];

const faq = [
  {
    q: "Jak wygląda numer KSeF?",
    a: "Ma 35 znaków w układzie 9999999999-RRRRMMDD-FFFFFFFFFFFF-FF: NIP sprzedawcy, data przyjęcia faktury w KSeF, 12 znaków części technicznej i 2 znaki sumy kontrolnej. Przykład z dokumentacji Ministerstwa Finansów: 5265877635-20250826-0100001AF629-AF.",
  },
  {
    q: "Jak liczy się sumę kontrolną numeru KSeF?",
    a: "To CRC-8 z wielomianem 0x07 i wartością początkową 0x00, liczone z pierwszych 32 znaków numeru razem z myślnikami. Wynik zapisuje się jako dwa znaki szesnastkowe wielkimi literami. Dla 5265877635-20250826-0100001AF629 suma wynosi AF.",
  },
  {
    q: "Czy numer KSeF trzeba podawać w przelewie?",
    a: "Od 1 stycznia 2027 tak, przy zapłacie za fakturę wystawioną w KSeF między czynnymi podatnikami VAT. Przy zapłacie za wiele faktur jednego kontrahenta wystarczy identyfikator zbiorczy wygenerowany w KSeF. Obowiązek nie dotyczy płatności kartą, BLIK-iem ani gotówką.",
  },
  {
    q: "Czy numer KSeF w przelewie MPP obowiązuje już teraz?",
    a: "Nie. W podzielonej płatności numer KSeF zamiast numeru faktury wpisuje się w komunikacie przelewu MPP przy płatnościach od 1 stycznia 2027, tak samo jak w zwykłym przelewie. W sieci krążą wcześniejsze daty, ale Ministerstwo Finansów na ksef.podatki.gov.pl podaje 1 stycznia 2027. Do końca 2026 w komunikacie MPP wpisuje się numer faktury nadany przez sprzedawcę. Numeru KSeF nie trzeba podawać przy fakturze wystawionej w trybie offline, która z powodu ogłoszonej awarii KSeF nie trafiła jeszcze do systemu.",
  },
  {
    q: "Czy poprawny numer oznacza, że faktura istnieje?",
    a: "Nie. Poprawna suma kontrolna mówi tylko, że w numerze nie ma literówki. Istnienie faktury potwierdza KSeF, na przykład w Aplikacji Podatnika KSeF albo w programie do fakturowania.",
  },
  {
    q: "Numer jest z faktury sprzed 2026 roku i wychodzi błąd sumy kontrolnej, to na pewno literówka?",
    a: "Niekoniecznie. Numery nadane w dobrowolnym KSeF przed startem API 2.0 (1 lutego 2026) czasem liczą sumę kontrolną innym wzorem, nigdzie oficjalnie nie opisanym przez Ministerstwo Finansów. CIRFMF potwierdził, że to zamierzona różnica algorytmów, nie błąd. Przy takich numerach sprawdzenie i tak wychwytuje literówki w NIP-ie sprzedawcy i w dacie, a przy samej sumie kontrolnej pewność daje tylko KSeF.",
  },
  {
    q: "Czy wysyłacie gdzieś wklejone numery?",
    a: "Nie. Całe sprawdzenie liczy się w Waszej przeglądarce. Nie ma rejestracji, limitu prób ani pola na dane kontaktowe.",
  },
  {
    q: "Gdzie znaleźć numer KSeF faktury?",
    a: "Nadaje go KSeF w chwili przyjęcia faktury. Widać go w Aplikacji Podatnika KSeF, w programie do fakturowania połączonym z KSeF i w pobranym z systemu pliku faktury. Na wizualizacji faktury przekazanej poza KSeF jest przy kodzie QR.",
  },
];

export default function NumerKsefPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs
          items={[
            { label: "Produkty", href: "/produkty" },
            { label: "Sprawdzenie numeru KSeF" },
          ]}
        />
        <section className="container-wide pb-14 md:pb-20 pt-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              Darmowe narzędzie
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Sprawdzenie numeru KSeF przed przelewem
            </h1>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">
              Od 1 stycznia 2027 numer KSeF faktury trafia do tytułu przelewu.
              Jedna literówka i księgowość kontrahenta nie połączy wpłaty z
              fakturą. Wklejcie numery, a sprawdzimy sumę kontrolną, NIP
              sprzedawcy i datę przyjęcia, zanim pójdą do banku.
            </p>
          </div>

          <div className="mt-10">
            <NazwaNarzedzia href="/numer-ksef" />
            <NumerKsefCheck />
          </div>

          <div className="mt-16 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Z czego składa się numer KSeF
            </h2>
            <dl className="mt-6 space-y-5">
              {czesci.map((c) => (
                <div key={c.q}>
                  <dt className="font-semibold text-gray-900 dark:text-white">
                    {c.q}
                  </dt>
                  <dd className="mt-1 text-gray-600 dark:text-gray-300">
                    {c.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-14 max-w-3xl rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-gray-50/60 dark:bg-gray-900/40 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Co jeszcze trzeba domknąć przed 1 stycznia 2027
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Numer w przelewie to jeden z sześciu punktów, które kończą się
              razem z przepisami przejściowymi KSeF. Pozostałe to faktury poza
              systemem, kasa rejestrująca, faktury kosztowe, tryb offline i
              odrzucenia.
            </p>
            <p className="mt-4">
              <Link
                href="/ksef-2027"
                className="font-semibold text-accent hover:underline"
              >
                Przejdźcie listę KSeF na 1 stycznia 2027
              </Link>
            </p>
          </div>

          <div className="mt-14 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Częste pytania
            </h2>
            <dl className="mt-6 space-y-5">
              {faq.map((f) => (
                <div key={f.q}>
                  <dt className="font-semibold text-gray-900 dark:text-white">
                    {f.q}
                  </dt>
                  <dd className="mt-1 text-gray-600 dark:text-gray-300">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Sprawdzenie numeru KSeF",
            url: "https://fluxlab.pl/numer-ksef",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Dowolna przeglądarka",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "PLN",
            },
            provider: { "@type": "Organization", name: "Fluxlab" },
          }),
        }}
      />
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
