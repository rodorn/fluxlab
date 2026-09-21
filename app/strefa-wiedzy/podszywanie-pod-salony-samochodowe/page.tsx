import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import WykresSlupkowy from "@/components/WykresSlupkowy";
import SprawdzPoBadaniu from "@/components/SprawdzPoBadaniu";

export const metadata: Metadata = {
  title: "Pod 84 procent salonów można się podszyć mailowo. Badanie | Fluxlab",
  description:
    "Sprawdziliśmy zabezpieczenia poczty 386 domen dealerskich. Tylko 16 procent ma komplet SPF, DKIM i DMARC w trybie, który cokolwiek blokuje. Pełna metoda, liczby i zastrzeżenia.",
  alternates: {
    canonical: "/strefa-wiedzy/podszywanie-pod-salony-samochodowe",
  },
  openGraph: {
    title:
      "Pod 84 procent salonów można się podszyć mailowo. Badanie | Fluxlab",
    description:
      "386 domen dealerskich, publiczne rekordy DNS. Tylko 16 procent ma komplet zabezpieczeń poczty, który faktycznie blokuje podszywanie.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, badanie zabezpieczeń poczty firmowej",
      },
    ],
  },
};

const faqItems = [
  {
    question: "Czy sprawdzanie cudzych rekordów DNS jest legalne?",
    answer:
      "Tak. Rekordy SPF, DKIM i DMARC są publiczną częścią systemu nazw domen, tym samym, z którego korzysta każdy serwer pocztowy na świecie, żeby w ogóle dostarczyć wiadomość. Odpytanie ich nie wymaga zgody i nie dotyka niczyjej skrzynki. Nie wysłaliśmy ani jednej wiadomości testowej i nie próbowaliśmy się nigdzie zalogować.",
  },
  {
    question: "Co właściwie znaczy, że można się pod kogoś podszyć?",
    answer:
      "Że ktoś obcy może wysłać wiadomość, w której w polu nadawcy widnieje adres w domenie tej firmy, a serwer odbiorcy nie ma jak stwierdzić, że to nieprawda. Przy dobrze ustawionym DMARC taka wiadomość ląduje w spamie albo w ogóle nie dochodzi. Bez niego dochodzi normalnie.",
  },
  {
    question: "Dlaczego liczycie od 317, a nie od 386?",
    answer:
      "Bo 69 domen z listy nie ma wpisu kierującego pocztę, czyli nie obsługuje żadnej skrzynki. Liczenie ich jako niezabezpieczonych zawyżałoby wynik, a to nie byłby uczciwy obraz.",
  },
  {
    question: "Mam DMARC, więc jestem bezpieczny?",
    answer:
      "Niekoniecznie. Sam rekord nie wystarczy, liczy się jego tryb. Ustawienie p=none oznacza wyłącznie obserwację: właściciel domeny dostaje raporty, ale podszyta wiadomość i tak dociera do odbiorcy. W naszej próbce w takim trybie działa co piąta domena.",
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
            { label: "Podszywanie pod salony" },
          ]}
        />

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Pod 84 procent salonów samochodowych można się podszyć mailowo
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Wzięliśmy 386 domen polskich dealerów i serwisów, odpytaliśmy ich
          publiczne rekordy DNS i sprawdziliśmy jedną rzecz: czy ktoś obcy może
          wysłać wiadomość, która wygląda jak wysłana przez nich. Odpowiedź jest
          niewygodna, a najbardziej niewygodna jej część dotyczy firm, które są
          przekonane, że mają to załatwione.
        </p>

        <div className="mt-10">
          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Trzy zabezpieczenia, z których liczy się dopiero komplet
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Poczta firmowa ma trzy warstwy ochrony przed podszywaniem. SPF mówi,
            które serwery mogą wysyłać w imieniu domeny. DKIM podpisuje
            wiadomości kluczem, którego obcy nie ma. DMARC dopiero spina jedno z
            drugim i mówi serwerowi odbiorcy, co zrobić, gdy coś się nie zgadza.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Kluczowe jest to ostatnie. Sam SPF bez DMARC jest jak zamek w
            drzwiach, których nikt nie zamyka: informacja istnieje, ale nikt jej
            nie egzekwuje.
          </p>
        </div>

        <WykresSlupkowy
          tytul="Czego brakuje na 317 domenach z działającą pocztą"
          podtytul="Z 386 domen z listy 69 nie obsługuje żadnej skrzynki, więc liczymy od 317."
          slupki={[
            {
              etykieta: "Brak podpisu DKIM",
              wartosc: 168,
              opis: "53 procent. Wiadomości nie są podpisywane kluczem domeny.",
              wyroznij: true,
            },
            {
              etykieta: "Brak DMARC w ogóle",
              wartosc: 140,
              opis: "44 procent. Serwer odbiorcy nie wie, co zrobić z podszywką.",
              wyroznij: true,
            },
            {
              etykieta: "DMARC tylko obserwuje",
              wartosc: 68,
              opis: "21 procent. Rekord jest, ale w trybie, który niczego nie blokuje.",
              wyroznij: true,
            },
            {
              etykieta: "Brak SPF",
              wartosc: 18,
              opis: "6 procent. Tu akurat jest nieźle.",
            },
          ]}
          zrodlo="Pomiar Fluxlab, wrzesień 2026. Publiczne rekordy DNS, bez wysyłania wiadomości i bez logowania."
        />

        <div>
          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Komplet ma szesnaście procent
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Policzyliśmy, ile domen ma jednocześnie SPF, podpis DKIM oraz DMARC
            w trybie, który faktycznie coś robi, czyli kwarantannę albo
            odrzucanie. Wyszło 51 domen na 317, czyli szesnaście procent.
            Pozostałe osiemdziesiąt cztery procent jest podatne w takim czy
            innym stopniu.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Najciekawsza jest ta środkowa grupa: sześćdziesiąt osiem domen ma
            DMARC ustawiony na samą obserwację. Ktoś to kiedyś wdrożył, zapewne
            świadomie, jako pierwszy krok przed zaostrzeniem polityki. Drugi
            krok nie nastąpił. Z perspektywy właściciela wygląda to jak zrobione
            zadanie, a z perspektywy odbiorcy podszytej wiadomości nie zmienia
            nic.
          </p>

          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Różnice między markami są duże
          </h2>
        </div>

        <WykresSlupkowy
          tytul="Ile procent domen danej marki ma ochronę, która blokuje"
          podtytul="Tylko marki z co najmniej dwudziestoma domenami w próbce."
          jednostka="%"
          slupki={[
            { etykieta: "Toyota (59 domen)", wartosc: 51 },
            { etykieta: "Renault (20 domen)", wartosc: 50 },
            { etykieta: "Skoda (73 domeny)", wartosc: 32 },
            { etykieta: "Hyundai (23 domeny)", wartosc: 30 },
            { etykieta: "Citroen (27 domen)", wartosc: 26, wyroznij: true },
            { etykieta: "Opel (53 domeny)", wartosc: 25, wyroznij: true },
            { etykieta: "Volkswagen (20 domen)", wartosc: 25, wyroznij: true },
          ]}
          zrodlo="Pomiar Fluxlab, wrzesień 2026. Odsetek domen z DMARC w trybie kwarantanny albo odrzucania."
        />

        <div>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Dwukrotna różnica między najlepszą a najsłabszą marką przy tej samej
            wielkości próbki sugeruje, że decyduje nie budżet pojedynczego
            salonu, tylko to, czy importer albo dostawca strony narzucił jakiś
            standard. Tego jednak nie zmierzyliśmy i nie będziemy udawać, że
            wiemy.
          </p>

          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Dlaczego to nie jest teoretyczne
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Salon samochodowy to wyjątkowo wdzięczny cel. Klient spodziewa się
            maila z fakturą proforma albo z numerem konta do wpłaty zaliczki, a
            kwoty idą w dziesiątki tysięcy złotych. Wiadomość wysłana z adresu w
            domenie salonu, z poprawną stopką i numerem oferty, nie wzbudza
            podejrzeń, bo formalnie pochodzi od salonu.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Drugi skutek jest cichszy i dotyka firmy codziennie: filtry Gmaila i
            Outlooka od 2024 roku traktują brak tych rekordów jako sygnał
            ostrzegawczy. Własne oferty i faktury zaczynają lądować w spamie u
            klientów, a nikt tego nie zgłasza, bo klient po prostu nie
            odpowiada.
          </p>

          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Czego nie sprawdziliśmy
          </h2>
          <ul className="mb-4 ml-5 list-disc space-y-2 text-gray-600 dark:text-gray-400">
            <li className="leading-relaxed">
              Nie wysłaliśmy ani jednej wiadomości testowej. Ocena opiera się
              wyłącznie na tym, co domena sama ogłasza w publicznych rekordach.
            </li>
            <li className="leading-relaxed">
              DKIM sprawdzamy przez najczęstsze nazwy selektorów. Domena może
              mieć podpis pod nazwą, której nie odgadliśmy, więc odsetek braków
              DKIM jest zawyżony o nieznaną wielkość.
            </li>
            <li className="leading-relaxed">
              Nie badaliśmy, czy firmy faktycznie padły ofiarą podszycia.
              Mierzymy podatność, a nie skutek.
            </li>
            <li className="leading-relaxed">
              Brak odpowiedzi serwera DNS przy pojedynczym zapytaniu to nie to
              samo co brak rekordu. Każdy przypadek braku sprawdzaliśmy
              powtórnie.
            </li>
          </ul>
        </div>

        <SprawdzPoBadaniu
          naglowek="Uruchom to sprawdzenie na dowolnej domenie"
          opis="To ten sam odczyt rekordów SPF, DKIM i DMARC, którym zmierzyliśmy 386 domen. Kliknij przykład, żeby zobaczyć, co zwraca."
          endpoint="/api/audyt"
          pozycje={[
            { wartosc: "fluxlab.pl" },
            { wartosc: "allegro.pl" },
            { wartosc: "x-kom.pl" },
          ]}
          narzedzie={{
            href: "/audyt-poczty",
            etykieta: "Sprawdź pocztę swojej firmy",
          }}
          kontakt="Chcesz, żeby brakujące rekordy ktoś ustawił?"
        />

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <Link
            href="/strefa-wiedzy/co-jest-nie-tak-ze-stronami-dealerow"
            className="text-accent hover:underline"
          >
            Zobacz też badanie stron tych samych firm
          </Link>
          .
        </p>

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

        {/* Artykul: pozwala wyszukiwarce rozpoznac to jako material z data
            i autorem, a nie zwykla podstrone. Dwa nasze badania go nie mialy,
            mimo ze dziewietnascie starszych tekstow tak. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline:
                "Pod 84 procent salonów samochodowych można się podszyć mailowo",
              description:
                "Badanie zabezpieczeń poczty na 386 domenach dealerskich. Komplet SPF, DKIM i DMARC w trybie, który cokolwiek blokuje, ma tylko szesnaście procent.",
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
