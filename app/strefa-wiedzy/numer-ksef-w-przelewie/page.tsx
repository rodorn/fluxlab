import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";

const ADRES = "/strefa-wiedzy/numer-ksef-w-przelewie";

const OPIS =
  "Od 1 stycznia 2027 płacąc innemu czynnemu podatnikowi VAT za fakturę z KSeF, podajesz w tytule przelewu jej numer KSeF, także w MPP. Co zmienić w płatnościach.";

export const metadata: Metadata = {
  title: "Numer KSeF w tytule przelewu od 2027 | Fluxlab",
  description:
    "Od 1 stycznia 2027 płacąc innemu czynnemu podatnikowi VAT za fakturę z KSeF, podajesz w tytule przelewu jej numer KSeF, także w MPP. Co zmienić w płatnościach.",
  openGraph: {
    title: "Numer KSeF w tytule przelewu od 1 stycznia 2027",
    description: OPIS,
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, KSeF i automatyzacja dla firm",
      },
    ],
  },
  alternates: { canonical: ADRES },
};

const faq = [
  {
    q: "Od kiedy trzeba podawać numer KSeF w przelewie?",
    a: "Art. 108g ustawy o VAT stosuje się do płatności dokonanych od 1 stycznia 2027. Liczy się dzień płatności, a nie dzień wystawienia faktury, więc obowiązek obejmie też faktury z 2026 opłacane w styczniu.",
  },
  {
    q: "Czy numer KSeF trzeba podać przy płatności w MPP?",
    a: "Tak. Od 1 stycznia 2027 komunikat przelewu w mechanizmie podzielonej płatności zawiera numer KSeF faktury. Przy kilku fakturach zamiast okresu podajesz zbiorczy identyfikator.",
  },
  {
    q: "Co wpisać, gdy jednym przelewem płacę kilka faktur?",
    a: "Zbiorczy identyfikator płatności z KSeF. Nadaje się go co najmniej dwóm fakturom jednego sprzedawcy, a wygenerować może go wystawca albo odbiorca faktur.",
  },
  {
    q: "Czy obowiązek dotyczy płatności dla osoby prywatnej?",
    a: "Nie. Przepis obejmuje płatności czynnego podatnika VAT na rzecz innego czynnego podatnika VAT za faktury ustrukturyzowane albo wystawione offline i przesłane do KSeF.",
  },
];

const link = "text-accent hover:underline";
const akapit = "text-gray-600 dark:text-gray-400 leading-relaxed";

export default function NumerKsefWPrzelewieArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href={ADRES}
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Numer KSeF w przelewie" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">
              Numer KSeF w tytule przelewu od 1 stycznia 2027: co zmienić w
              płatnościach firmy
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Od nowego roku przelew za fakturę z KSeF niesie w tytule jej numer
              KSeF albo zbiorczy identyfikator. Firma, która płaci z paczek
              przelewów albo przepisuje dane z PDF ręcznie, musi to przygotować
              przed pierwszą płatnością w styczniu.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">Co mówi przepis</h2>
              <p className={akapit}>
                Art. 108g ustawy o VAT stosuje się do płatności dokonanych od 1
                stycznia 2027. Nabywca, który jest czynnym podatnikiem VAT i
                płaci innemu czynnemu podatnikowi za fakturę ustrukturyzowaną
                albo za fakturę wystawioną offline, podaje w tytule numer KSeF
                tej faktury. Dotyczy to przelewu i każdego innego instrumentu
                płatniczego, w którym da się wpisać tytuł. Przy poleceniu
                zapłaty obowiązek ma wystawca faktury, a gdy za nabywcę płaci
                ktoś inny, ten podmiot trzeci.
              </p>
            </section>

            <section>
              <h2 className="mb-4 h2-sekcji">Jedna faktura czy kilka</h2>
              <p className={akapit}>
                Za jedną fakturę wpisujesz jej numer KSeF. Za kilka faktur
                jednego sprzedawcy wpisujesz zbiorczy identyfikator: numer
                nadawany zestawowi co najmniej dwóch faktur. Generuje go
                wystawca albo odbiorca w Aplikacji Podatnika KSeF lub w
                programie księgowym połączonym z API KSeF, po podaniu listy
                numerów. Ma 35 znaków, na przykład
                9999999999-IZ202602-FFFFFFFFFFFF-FF.
              </p>
            </section>

            <section>
              <h2 className="mb-4 h2-sekcji">Podzielona płatność</h2>
              <p className={akapit}>
                Obowiązek obejmuje także MPP. Od 1 stycznia 2027 komunikat
                przelewu w podzielonej płatności zawiera numer KSeF faktury, a
                przy płatności za kilka faktur zbiorczy identyfikator zastępuje
                okres, który wpisuje się dziś.
              </p>
            </section>

            <section>
              <h2 className="mb-4 h2-sekcji">Kiedy numeru nie podajesz</h2>
              <p className={akapit}>
                Gdy faktura wystawiona offline nie trafiła do KSeF z powodu
                ogłoszonej awarii systemu. Obowiązek nie obejmuje też płatności
                dla konsumenta ani dla kontrahenta, który nie jest czynnym
                podatnikiem VAT.
              </p>
            </section>

            <section>
              <h2 className="mb-4 h2-sekcji">Co zmienić w systemie firmy</h2>
              <ol className="list-decimal pl-6 space-y-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                <li>
                  Pole numeru KSeF przy fakturze kosztowej w programie księgowym
                  albo w CRM. Numer przychodzi razem z fakturą pobraną z KSeF,
                  więc najpewniej zapisywać go automatycznie, a nie przepisywać.
                </li>
                <li>
                  Eksport paczek przelewów do banku z numerem KSeF albo
                  zbiorczym identyfikatorem w tytule. Sprawdź na próbnej paczce,
                  czy program i bank przenoszą numer w całości.
                </li>
                <li>
                  Kontrola przed wysyłką. Literówka w numerze przepisanym z PDF
                  to przelew z błędnym tytułem. Numer sprawdzisz w kilka sekund{" "}
                  <Link href="/numer-ksef" className={link}>
                    naszym narzędziem do numeru KSeF
                  </Link>
                  : NIP sprzedawcy, datę i sumę kontrolną.
                </li>
                <li>
                  Kto robi przelewy ręcznie. Jeśli płatności zleca ktoś
                  przepisujący dane z faktur, to miejsce do zautomatyzowania w
                  pierwszej kolejności. Możemy{" "}
                  <Link href="/ksef-integracja" className={link}>
                    spiąć KSeF z Twoim systemem
                  </Link>{" "}
                  tak, żeby numer przechodził od faktury do przelewu bez
                  kopiowania.
                </li>
              </ol>
              <p className={`${akapit} mt-4`}>
                Pozostałe zmiany na koniec przepisów przejściowych zbiera{" "}
                <Link href="/ksef-2027" className={link}>
                  lista kontrolna KSeF na 1 stycznia 2027
                </Link>
                . Podstawa: opis numeru KSeF i zbiorczego identyfikatora oraz
                pytania i odpowiedzi na{" "}
                <a
                  href="https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/numer-ksef-i-zbiorczy-identyfikator/"
                  className={link}
                  rel="noopener"
                >
                  ksef.podatki.gov.pl
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-4 h2-sekcji">Pytania</h2>
              <div className="space-y-4">
                {faq.map((f) => (
                  <details
                    key={f.q}
                    className="group rounded-2xl border border-gray-200 dark:border-gray-700"
                  >
                    <summary className="cursor-pointer p-6 text-gray-900 dark:text-white font-medium">
                      {f.q}
                    </summary>
                    <p className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <div className="max-w-3xl mx-auto mt-16">
            <PrevNextArticle currentHref={ADRES} />
          </div>
        </div>
        <CTA naglowek="Chcesz, żeby numer KSeF sam trafiał do przelewu?" />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline:
                "Numer KSeF w tytule przelewu od 1 stycznia 2027: co zmienić w płatnościach firmy",
              description: OPIS,
              datePublished: "2026-11-02",
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
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]),
        }}
      />
    </>
  );
}
