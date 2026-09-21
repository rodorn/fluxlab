import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Licznik konwersji pokazuje zero, a zgłoszenia przychodzą | Fluxlab",
  description:
    "Cztery przyczyny, przez które analityka nie widzi zgłoszeń, które faktycznie docierają: formularz bez przeładowania strony, konwersja z kliknięcia, podwójne zliczanie i własny ruch. Jak rozstrzygnąć, która to.",
  alternates: { canonical: "/strefa-wiedzy/konwersje-pokazuja-zero" },
  openGraph: {
    title: "Licznik konwersji pokazuje zero, a zgłoszenia przychodzą | Fluxlab",
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
    question: "Jak w minutę sprawdzić, czy formularz przeładowuje stronę?",
    answer:
      "Wyślij zgłoszenie testowe i spójrz na adres w pasku przeglądarki. Jeżeli po wysłaniu zmienił się na stronę z podziękowaniem, przeładowanie następuje i zliczanie odsłony zadziała. Jeżeli adres został ten sam, a komunikat pojawił się w miejscu formularza, to formularz wysyła się w tle i liczenie odsłony nigdy niczego nie policzy.",
  },
  {
    question: "Czy zliczanie kliknięcia w przycisk jest zawsze błędem?",
    answer:
      "Nie, o ile świadomie wybieramy je jako miarę zainteresowania, a nie zgłoszeń. Problem zaczyna się wtedy, gdy ta sama liczba trafia do systemu reklamowego jako konwersja i decyduje o budżecie. Wtedy płacisz za kliknięcia w przycisk, a nie za zgłoszenia, i nigdy się o tym nie dowiesz.",
  },
  {
    question: "Skąd mam wiedzieć, czy konwersja liczy się dwa razy?",
    answer:
      "Porównaj liczbę zgłoszeń w swojej skrzynce z liczbą konwersji w panelu za ten sam dzień. Jeżeli wyszło dokładnie dwa razy więcej niż maili, prawie na pewno to samo zdarzenie jest zliczane osobno przez analitykę i osobno przez system reklamowy, a oba wysyłają dane do jednego miejsca.",
  },
  {
    question: "Czy moje własne wejścia mają aż takie znaczenie?",
    answer:
      "Przy dużym ruchu nie. Przy stronie, którą odwiedza kilkadziesiąt osób dziennie, kilka własnych testów i sprawdzeń potrafi przesunąć wynik o kilkanaście procent, a po wdrożeniu zmian sprawdza się je zwykle kilkanaście razy w ciągu jednego dnia.",
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
            { label: "Konwersje pokazują zero" },
          ]}
        />

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Licznik konwersji pokazuje zero, a zgłoszenia przychodzą
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          To jedna z tych sytuacji, w których łatwo wyciągnąć najgorszy możliwy
          wniosek: że strona nie działa i że reklama nie ma sensu. Najczęściej
          jest inaczej. Zgłoszenia docierają, tylko nikt ich nie liczy, a
          przyczyna jest zwykle jedna z czterech.
        </p>

        <div className="mt-10">
          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Pierwsza: formularz nie przeładowuje strony
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Najstarszy sposób liczenia zgłoszeń polega na zliczaniu odsłon
            strony z podziękowaniem. Działa, dopóki wysłanie formularza
            faktycznie przenosi odwiedzającego pod nowy adres. Nowsze formularze
            wysyłają się w tle i pokazują komunikat w miejscu, w którym przed
            chwilą był formularz. Adres się nie zmienia, odsłony nie ma, licznik
            zostaje na zerze.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Skutek jest podstępny, bo nic się nie psuje widocznie. Zgłoszenia
            przychodzą na skrzynkę, właściciel widzi w panelu zero i po kilku
            tygodniach wyłącza reklamę, która akurat działała.
          </p>

          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Druga: konwersja podpięta pod kliknięcie
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            To poprawka na pierwszy problem, robiona w pośpiechu: skoro nie ma
            strony z podziękowaniem, policzmy naciśnięcie przycisku. Liczby
            natychmiast przestają być zerem, więc wygląda to na rozwiązanie.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Tyle że wtedy liczy się każda próba, także ta nieudana. Ktoś nie
            zaznaczył zgody, ktoś wpisał adres z literówką, ktoś nacisnął dwa
            razy, bo nic się nie stało. Wynik jest zawyżony, a przy kampanii
            płatnej system reklamowy uczy się przyciągać ludzi, którzy naciskają
            przycisk, a nie tych, którzy wysyłają zgłoszenie. Błąd kosztuje tym
            więcej, im dłużej działa.
          </p>

          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Trzecia: to samo zdarzenie liczone dwa razy
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Typowy układ jest taki, że konwersję ustawia agencja w systemie
            reklamowym, a potem ktoś inny dokłada ją w analityce, przy czym
            analityka też przekazuje dane do reklam. Jedno zgłoszenie zamienia
            się w dwie konwersje. Rozpoznaje się to w minutę: wystarczy
            porównać liczbę konwersji z liczbą wiadomości w skrzynce za ten sam
            dzień.
          </p>

          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Czwarta: liczysz samego siebie
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Po każdej zmianie na stronie sprawdza się ją kilkanaście razy, a po
            wdrożeniu formularza wysyła się kilka zgłoszeń testowych. Przy
            stronie odwiedzanej przez kilkadziesiąt osób dziennie to nie jest
            szum, tylko istotna część wyniku. Wykluczenie własnych wejść to
            jedno ustawienie, a robi się je zwykle dopiero wtedy, gdy ktoś
            zauważy dziwną liczbę.
          </p>

          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Jak rozstrzygnąć, która to przyczyna
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Kolejność jest prosta i zajmuje kwadrans. Wyślij jedno zgłoszenie
            testowe i sprawdź, czy adres w pasku przeglądarki się zmienił. To
            rozstrzyga między pierwszą przyczyną a resztą. Potem porównaj liczbę
            konwersji z liczbą wiadomości w skrzynce za wczoraj: równo dwa razy
            więcej oznacza podwójne zliczanie, znacznie więcej bez pokrycia w
            skrzynce oznacza liczenie kliknięć. Na koniec sprawdź, czy Twoje
            własne wejścia są wykluczone.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Dopiero gdy wszystkie cztery są w porządku, a konwersji dalej nie
            ma, wniosek o braku zainteresowania jest uprawniony. Wcześniej to
            nie jest wniosek, tylko domysł oparty na zepsutym pomiarze.
          </p>

          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Jedna rzecz, o której warto pomyśleć od razu
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Jeżeli na stronie jest płatność, zapisuj zgłoszenie zanim
            odwiedzający przejdzie do zapłaty, a nie po. Osoba, która wypełniła
            formularz i odpadła przy płatności, jest najbliższa zakupowi ze
            wszystkich, które tego dnia weszły, a przy zapisie po płatności
            znika bez śladu. Opisaliśmy to szerzej przy{" "}
            <Link href="/landing-z-platnoscia" className="text-accent hover:underline">
              stronach sprzedażowych z płatnością
            </Link>
            .
          </p>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pytania</h2>
          <dl className="mt-5 space-y-5">
            {faqItems.map((f) => (
              <div key={f.question}>
                <dt className="font-semibold text-gray-900 dark:text-white">
                  {f.question}
                </dt>
                <dd className="mt-1 text-gray-600 dark:text-gray-300">{f.answer}</dd>
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
              headline: "Licznik konwersji pokazuje zero, a zgłoszenia przychodzą",
              description:
                "Cztery przyczyny, przez które analityka nie widzi zgłoszeń docierających na skrzynkę, i sposób na rozstrzygnięcie, która z nich zachodzi.",
              datePublished: "2026-09-21",
              author: { "@type": "Organization", name: "Fluxlab", url: "https://fluxlab.pl" },
              publisher: { "@type": "Organization", name: "Fluxlab", url: "https://fluxlab.pl" },
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
