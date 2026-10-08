import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Mail firmowy: czy ktoś może się pod niego podszyć | Fluxlab",
  description:
    "Mail firmowy na własnej domenie: co jest potrzebne, ile kosztuje skrzynka w Google i Microsoft oraz jak SPF, DKIM i DMARC chronią przed podszywaniem.",
  openGraph: {
    title: "Mail firmowy: czy ktoś może się pod niego podszyć | Fluxlab",
    description:
      "Mail firmowy bez SPF, DKIM i DMARC da się podrobić, a Wasze wiadomości trafiają do spamu. Darmowy audyt domeny w kilka sekund.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, bezpieczeństwo poczty firmowej",
      },
    ],
  },
  alternates: {
    canonical: "/strefa-wiedzy/podszywanie-sie-pod-firmowy-email",
  },
};

const faqItems = [
  {
    question: "Dlaczego nasze maile z ofertami trafiają do spamu?",
    answer:
      "Najczęściej przez brak lub błędne SPF, DKIM i DMARC. Gmail i Outlook wymagają tych rekordów, a bez nich część poczty ginie po cichu.",
  },
  {
    question: "Czy naprawa czegoś nie zepsuje?",
    answer:
      "Nie, jeśli robi się to etapami. Najpierw DMARC w trybie obserwacji, po dwóch tygodniach zaostrzenie polityki.",
  },
  {
    question: "Ile to trwa?",
    answer:
      "Diagnoza jest darmowa. SPF i DKIM poprawia się w kilka godzin, pełne wdrożenie DMARC trwa zwykle dwa tygodnie.",
  },
];

export default function PodszywanieEmailArticle() {
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
              label: "Podszywanie się pod firmowy e-mail",
              href: "/strefa-wiedzy/podszywanie-sie-pod-firmowy-email",
            },
          ]}
        />

        <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: "1rem 0" }}>
          Czy ktoś może podszyć się pod Twój firmowy e-mail?
        </h1>
        <p
          style={{
            color: "var(--article-muted)",
            lineHeight: 1.7,
            fontSize: "1.05rem",
          }}
        >
          Jeśli domena nie jest poprawnie skonfigurowana, każdy może wysłać
          mail wyglądający jak od Ciebie, a część Twoich ofert i faktur po
          cichu nie dociera do klientów.
        </p>

        <div
          style={{
            margin: "2rem 0",
            padding: "1.25rem 1.5rem",
            background: "var(--article-box)",
            border: "1px solid var(--article-box-border)",
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
              Sprawdź swoją domenę teraz
            </strong>
            <div style={{ color: "var(--article-muted)", fontSize: "0.9rem" }}>
              Darmowy audyt SPF, DKIM i DMARC. Bez rejestracji, wynik od razu.
            </div>
          </div>
          <Link
            href="/audyt-poczty"
            className="btn-primary"
            style={{ padding: "0.7rem 1.5rem", whiteSpace: "nowrap" }}
          >
            Uruchom darmowy audyt
          </Link>
        </div>

        <h2
          style={{ fontSize: "1.4rem", fontWeight: 700, marginTop: "2.5rem" }}
        >
          Trzy rekordy, które decydują o wszystkim
        </h2>
        <p style={{ color: "var(--article-text)", lineHeight: 1.7 }}>
          O tym decydują trzy publiczne wpisy w DNS Twojej domeny.
        </p>

        <h3 style={{ fontWeight: 700, marginTop: "1.5rem" }}>
          SPF, kto ma prawo wysyłać w Twoim imieniu
        </h3>
        <p style={{ color: "var(--article-text)", lineHeight: 1.7 }}>
          Lista serwerów uprawnionych do wysyłania poczty z Twojej domeny.
        </p>

        <h3 style={{ fontWeight: 700, marginTop: "1.5rem" }}>
          DKIM, podpis, którego nie da się podrobić
        </h3>
        <p style={{ color: "var(--article-text)", lineHeight: 1.7 }}>
          Podpis każdej wiadomości. Odbiorca sprawdza, czy list wyszedł od
          Ciebie i nie został zmieniony.
        </p>

        <h3 style={{ fontWeight: 700, marginTop: "1.5rem" }}>
          DMARC, reguła, co zrobić z podejrzaną pocztą
        </h3>
        <p style={{ color: "var(--article-text)", lineHeight: 1.7 }}>
          Mówi serwerom odbiorców, co zrobić z wiadomością, która nie przeszła
          SPF i DKIM. Brak DMARC albo tryb p=none oznacza, że nikt nie blokuje
          podszywania pod Twoją domenę.
        </p>

        <h2
          id="mail-firmowy-na-wlasnej-domenie"
          style={{ fontSize: "1.4rem", fontWeight: 700, marginTop: "2.5rem" }}
        >
          Mail firmowy na własnej domenie: co jest potrzebne i ile kosztuje
        </h2>
        <p style={{ color: "var(--article-text)", lineHeight: 1.7 }}>
          Potrzebna jest własna domena i usługa poczty. Skrzynka w Google
          Workspace Business Starter kosztuje 31,50 zł netto miesięcznie za
          osobę, w Microsoft 365 Business Basic około 30 zł (październik 2026,
          umowa roczna). Ceny trzech dostawców porównaliśmy na stronie{" "}
          <Link href="/mail-firmowy" style={{ textDecoration: "underline" }}>
            mail firmowy
          </Link>
          .
        </p>
        <p style={{ color: "var(--article-text)", lineHeight: 1.7 }}>
          U każdego dostawcy SPF, DKIM i DMARC trzeba ustawić samemu. Czy są
          ustawione, sprawdzicie w{" "}
          <Link href="/audyt-poczty" style={{ textDecoration: "underline" }}>
            darmowym audycie poczty
          </Link>
          .
        </p>

        <h2
          style={{ fontSize: "1.4rem", fontWeight: 700, marginTop: "2.5rem" }}
        >
          Najczęstsze pytania
        </h2>
        <div style={{ marginTop: "1rem" }}>
          {faqItems.map((item, i) => (
            <details
              key={i}
              style={{ borderBottom: "1px solid #eee", padding: "0.85rem 0" }}
            >
              <summary style={{ cursor: "pointer", fontWeight: 600 }}>
                {item.question}
              </summary>
              <p
                style={{
                  color: "var(--article-muted)",
                  lineHeight: 1.7,
                  marginTop: "0.5rem",
                }}
              >
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
