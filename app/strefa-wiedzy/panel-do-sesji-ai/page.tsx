import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Kilkanaście sesji AI naraz: jak nad tym zapanować | Fluxlab",
  description:
    "Praca z asystentem AI w kilkunastu oknach terminala kończy się chaosem. Narzędzie, które zbiera je w jedno miejsce: stan rozmowy, koszty, limity.",
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
      "Dla osób, które prowadzą kilka rozmów z asystentem AI równolegle. Przy jednej rozmowie dziennie terminal wystarczy.",
  },
  {
    question: "Czy to zastępuje asystenta AI?",
    answer:
      "Nie, to warstwa nad nim. W środku działa ten sam program, a panel dokłada stany, koszty, limity i powiadomienia.",
  },
  {
    question: "Co z bezpieczeństwem danych?",
    answer:
      "Wszystko działa lokalnie. Transkrypty i notatki nie opuszczają komputera, a klucze są w zaszyfrowanym pliku.",
  },
  {
    question: "Ile to kosztuje?",
    answer:
      "Nic. Kod jest otwarty na licencji MIT. Płacisz tylko za asystenta AI.",
  },
];

export default function PanelDoSesjiAiArticle() {
  return (
    <>
      <Header />
      <main
        className="container-wide"
        style={{ maxWidth: 800, margin: "0 auto", padding: "6.5rem 1.5rem 4rem" }}
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

        <p style={{ color: "var(--article-muted)", lineHeight: 1.7, fontSize: "1.05rem" }}>
          Po miesiącu pracy z asystentem AI okien terminala jest kilkanaście
          i nie wiadomo, która rozmowa czeka na decyzję. Opisujemy narzędzie,
          które zbudowaliśmy, żeby to uporządkować.
        </p>

        <div
          style={{
            margin: "2rem 0",
            padding: "1.25rem 1.5rem",
            background: "var(--article-box)", border: "1px solid var(--article-box-border)",
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
            <div style={{ color: "var(--article-muted)", fontSize: "0.9rem" }}>
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
        <p style={{ color: "var(--article-text)", lineHeight: 1.7 }}>
          W tle działały dwadzieścia dwa procesy, ponad pięć gigabajtów pamięci, część
          sprzed trzech tygodni. Żadne okno nie pokazywało, która rozmowa czeka na
          odpowiedź.
        </p>
        <h2
          style={{ fontSize: "1.4rem", fontWeight: 700, marginTop: "2.5rem" }}
        >
          Co okazało się najważniejsze
        </h2>
        <h3 style={{ fontWeight: 700, marginTop: "1.5rem" }}>
          1. Stan każdej rozmowy
        </h3>
        <p style={{ color: "var(--article-text)", lineHeight: 1.7 }}>
          Lista sesji: pracuje, czeka na decyzję albo gotowa. Do tego, co robi i od
          jak dawna.
        </p>
        <h3 style={{ fontWeight: 700, marginTop: "1.5rem" }}>
          2. Pytania, które blokują pracę
        </h3>
        <p style={{ color: "var(--article-text)", lineHeight: 1.7 }}>
          Jedenaście sesji stało na pytaniu, którego nikt nie zobaczył. Narzędzie
          odpowiada samo, a gdy decyzja wymaga człowieka, wysyła powiadomienie na
          telefon.
        </p>
        <h3 style={{ fontWeight: 700, marginTop: "1.5rem" }}>
          3. Koszty i limity na wierzchu
        </h3>
        <p style={{ color: "var(--article-text)", lineHeight: 1.7 }}>
          Koszt każdej rozmowy i ile zostało limitu. Przy okazji wyszło, że naiwne
          sumowanie zawyżało zużycie ponad dwukrotnie.
        </p>
        <h3 style={{ fontWeight: 700, marginTop: "1.5rem" }}>
          4. Zadania w tym samym miejscu
        </h3>
        <p style={{ color: "var(--article-text)", lineHeight: 1.7 }}>
          Zadanie przeciąga się na godzinę w kalendarzu albo wysyła prosto do sesji
          jako polecenie.
        </p>
        <h2
          style={{ fontSize: "1.4rem", fontWeight: 700, marginTop: "2.5rem" }}
        >
          Co z tego wynika dla firm
        </h2>
        <p style={{ color: "var(--article-text)", lineHeight: 1.7 }}>
          Dziesięć automatyzacji bez jednego miejsca, w którym widać ich stan, koszt i
          błędy, to ten sam bałagan co dwadzieścia dwa okna terminala. Warstwa
          nadzoru jest częścią wdrożenia.
        </p>

        <div
          style={{
            margin: "2.5rem 0 1rem",
            padding: "1.25rem 1.5rem",
            background: "var(--article-box)", border: "1px solid var(--article-box-border)",
            borderRadius: 12,
          }}
        >
          <strong style={{ fontSize: "1.05rem" }}>
            Masz automatyzacje, ale nie wiesz, co dokładnie robią?
          </strong>
          <div
            style={{
              color: "var(--article-muted)",
              fontSize: "0.95rem",
              margin: "0.5rem 0 1rem",
            }}
          >
            Pokażemy, gdzie tracisz czas i co warto połączyć w jedno miejsce.
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
            <p style={{ color: "var(--article-text)", lineHeight: 1.7 }}>{item.answer}</p>
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
