import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Kilkanaście sesji AI naraz: jak nad tym zapanować | Fluxlab",
  description:
    "Praca z asystentem AI w kilkunastu oknach terminala kończy się chaosem. Opis narzędzia, które zbiera je w jedno miejsce: stan każdej rozmowy, koszty, limity. Kod otwarty.",
  openGraph: {
    title: "Kilkanaście sesji AI naraz: jak nad tym zapanować | Fluxlab",
    description:
      "Dwadzieścia dwa zapomniane procesy i 5 GB pamięci. Historia narzędzia, które porządkuje pracę z asystentem AI. Kod dostępny publicznie.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, panel do zarządzania sesjami AI",
      },
    ],
  },
  alternates: {
    canonical: "/strefa-wiedzy/panel-do-sesji-ai",
  },
};

const faqItems = [
  {
    question: "Dla kogo jest takie narzędzie?",
    answer:
      "Dla osób, które używają asystenta AI do pracy nad kilkoma rzeczami równolegle: programistów, osób zajmujących się automatyzacją, analityków. Jeśli prowadzisz jedną rozmowę dziennie, terminal wystarczy. Problem zaczyna się przy piątej równoległej sesji, gdy przestajesz wiedzieć, która czeka na Twoją decyzję.",
  },
  {
    question: "Czy to zastępuje asystenta AI?",
    answer:
      "Nie, to warstwa nad nim. W środku działa dokładnie ten sam program co w terminalu, z pełnym zestawem komend. Panel dokłada to, czego brakuje przy wielu rozmowach naraz: listę stanów, koszty, limity, powiadomienia i historię.",
  },
  {
    question: "Co z bezpieczeństwem danych?",
    answer:
      "Wszystko działa lokalnie, na Twoim komputerze. Transkrypty, zadania i notatki nie opuszczają maszyny. Wyjątkiem są powiadomienia na telefon, domyślnie wyłączone, które wysyłają wyłącznie nazwę sesji. Klucze i tokeny leżą w zaszyfrowanym pliku.",
  },
  {
    question: "Ile to kosztuje?",
    answer:
      "Nic. Kod jest otwarty na licencji MIT, można go pobrać, uruchomić i zmienić pod siebie. Płacisz wyłącznie za samego asystenta AI, tak jak dotąd.",
  },
];

export default function PanelDoSesjiAiArticle() {
  return (
    <>
      <Header />
      <main
        className="container-wide"
        style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1.5rem 4rem" }}
      >
        <Breadcrumbs
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            {
              label: "Panel do sesji AI",
              href: "/strefa-wiedzy/panel-do-sesji-ai",
            },
          ]}
        />

        <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: "1rem 0" }}>
          Kilkanaście sesji AI naraz: jak nad tym zapanować
        </h1>

        <p style={{ color: "#555", lineHeight: 1.7, fontSize: "1.05rem" }}>
          Praca z asystentem AI zaczyna się od jednego okna terminala. Po
          miesiącu okien jest kilkanaście, każde z inną rozmową, i nagle nie
          wiadomo, która czeka na decyzję, która skończyła robotę, a która stoi
          od tygodnia. Poniżej opis narzędzia, które zbudowaliśmy, żeby ten
          problem rozwiązać u siebie, oraz wnioski, które mogą się przydać także
          wtedy, gdy zbudujesz coś własnego.
        </p>

        <div
          style={{
            margin: "2rem 0",
            padding: "1.25rem 1.5rem",
            background: "#f6f6f8",
            borderRadius: 12,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div>
            <strong style={{ fontSize: "1.05rem" }}>
              Fluxdesk, kod otwarty
            </strong>
            <div style={{ color: "#555", fontSize: "0.9rem" }}>
              Licencja MIT. Działa lokalnie, instalacja jednym poleceniem.
            </div>
          </div>
          <a
            href="https://github.com/rodorn/fluxdesk"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: "0.7rem 1.5rem", whiteSpace: "nowrap" }}
          >
            Zobacz na GitHubie
          </a>
        </div>

        <h2
          style={{ fontSize: "1.4rem", fontWeight: 700, marginTop: "2.5rem" }}
        >
          Punkt wyjścia: dwadzieścia dwa zapomniane procesy
        </h2>
        <p style={{ color: "#444", lineHeight: 1.7 }}>
          Diagnoza zaczęła się od policzenia, ile rozmów faktycznie działa w
          tle. Wynik: dwadzieścia dwa procesy, łącznie ponad pięć gigabajtów
          pamięci, część uruchomiona trzy tygodnie wcześniej i dawno zapomniana.
          Żadne okno nie pokazywało, która z nich czeka na odpowiedź.
        </p>
        <p style={{ color: "#444", lineHeight: 1.7 }}>
          To nie jest problem asystenta, tylko braku warstwy zarządzania. Ten
          sam wzorzec widać w firmach: pojedyncza automatyzacja działa świetnie,
          dopiero przy dziesiątej nikt nie wie, co jest włączone i czy nadal
          robi to, co miało robić.
        </p>

        <h2
          style={{ fontSize: "1.4rem", fontWeight: 700, marginTop: "2.5rem" }}
        >
          Cztery rzeczy, które okazały się najważniejsze
        </h2>

        <h3 style={{ fontWeight: 700, marginTop: "1.5rem" }}>
          1. Stan każdej rozmowy, widoczny od razu
        </h3>
        <p style={{ color: "#444", lineHeight: 1.7 }}>
          Lista wszystkich sesji z jednoznaczną informacją: pracuje, czeka na
          Twoją decyzję, czy jest gotowa. Do tego, co robi w tej chwili i od jak
          dawna. Bez tego przełączanie się między oknami jest zgadywanką.
        </p>

        <h3 style={{ fontWeight: 700, marginTop: "1.5rem" }}>
          2. Pytania, które blokują pracę na godziny
        </h3>
        <p style={{ color: "#444", lineHeight: 1.7 }}>
          Jedenaście sesji stało u nas na pytaniu, którego nikt nie zobaczył, bo
          było w oknie na innym pulpicie. Narzędzie odpowiada na nie samo, a gdy
          decyzja naprawdę wymaga człowieka, wysyła powiadomienie na telefon.
        </p>

        <h3 style={{ fontWeight: 700, marginTop: "1.5rem" }}>
          3. Koszty i limity na wierzchu
        </h3>
        <p style={{ color: "#444", lineHeight: 1.7 }}>
          Ile kosztowała każda rozmowa, ile zostało limitu i kiedy się skończy
          przy obecnym tempie. Przy okazji wyszedł błąd w liczeniu: asystent
          zapisuje tę samą odpowiedź kilka razy, więc naiwne sumowanie zawyżało
          zużycie ponad dwukrotnie.
        </p>

        <h3 style={{ fontWeight: 700, marginTop: "1.5rem" }}>
          4. Zadania i czas w tym samym miejscu
        </h3>
        <p style={{ color: "#444", lineHeight: 1.7 }}>
          Rozmowa z asystentem zwykle wynika z konkretnego zadania i kończy się
          kolejnym. Trzymanie jednego i drugiego osobno oznacza ciągłe
          przepisywanie. Tutaj zadanie przeciąga się na godzinę w kalendarzu
          albo wysyła prosto do sesji jako polecenie.
        </p>

        <h2
          style={{ fontSize: "1.4rem", fontWeight: 700, marginTop: "2.5rem" }}
        >
          Dlaczego kod jest otwarty
        </h2>
        <p style={{ color: "#444", lineHeight: 1.7 }}>
          Z dwóch powodów. Narzędzie steruje całym komputerem i czyta historię
          rozmów, więc powinno dać się sprawdzić, co dokładnie robi. Drugi powód
          jest prostszy: opis usług przekonuje mniej niż działający program,
          którego można użyć bez pytania kogokolwiek o zgodę.
        </p>
        <p style={{ color: "#444", lineHeight: 1.7 }}>
          Kod, instrukcja instalacji i opis architektury są dostępne publicznie:{" "}
          <a
            href="https://github.com/rodorn/fluxdesk"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#6366f1", textDecoration: "underline" }}
          >
            github.com/rodorn/fluxdesk
          </a>
          .
        </p>

        <h2
          style={{ fontSize: "1.4rem", fontWeight: 700, marginTop: "2.5rem" }}
        >
          Co z tego wynika dla firm
        </h2>
        <p style={{ color: "#444", lineHeight: 1.7 }}>
          Wniosek, który przenosi się jeden do jednego na automatyzację
          procesów: narzędzia same z siebie nie robią porządku. Dziesięć
          automatyzacji bez jednego miejsca, w którym widać ich stan, koszt i
          błędy, zamienia się w ten sam bałagan co dwadzieścia dwa okna
          terminala. Warstwa nadzoru jest częścią wdrożenia, nie dodatkiem do
          niego.
        </p>

        <div
          style={{
            margin: "2.5rem 0 1rem",
            padding: "1.25rem 1.5rem",
            background: "#f6f6f8",
            borderRadius: 12,
          }}
        >
          <strong style={{ fontSize: "1.05rem" }}>
            Masz automatyzacje, ale nie wiesz, co dokładnie robią?
          </strong>
          <div
            style={{
              color: "#555",
              fontSize: "0.95rem",
              margin: "0.5rem 0 1rem",
            }}
          >
            Zrobimy przegląd procesów i pokażemy, gdzie tracisz czas oraz co
            warto połączyć w jedno miejsce.
          </div>
          <Link
            href="/kontakt"
            className="btn-primary"
            style={{ padding: "0.7rem 1.5rem", display: "inline-block" }}
          >
            Umów bezpłatną diagnozę
          </Link>
        </div>

        <h2
          style={{ fontSize: "1.4rem", fontWeight: 700, marginTop: "2.5rem" }}
        >
          Najczęstsze pytania
        </h2>
        {faqItems.map((item) => (
          <div key={item.question} style={{ marginTop: "1.5rem" }}>
            <h3 style={{ fontWeight: 700 }}>{item.question}</h3>
            <p style={{ color: "#444", lineHeight: 1.7 }}>{item.answer}</p>
          </div>
        ))}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            }),
          }}
        />
      </main>
      <Footer />
    </>
  );
}
