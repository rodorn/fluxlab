import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Mail firmowy we własnej domenie: koszt i test spamu",
  description:
    "Ile kosztuje mail firmowy w Google Workspace, Microsoft 365 i Zoho, które trzy wpisy w DNS decydują o spamie i jak sprawdzić swoją domenę w 10 sekund.",
  alternates: { canonical: "/mail-firmowy" },
  openGraph: {
    title:
      "Mail firmowy we własnej domenie: koszt, konfiguracja i test, czy nie wpada do spamu",
    description:
      "Ceny skrzynek w domenie, SPF, DKIM i DMARC jednym zdaniem każde oraz darmowy test domeny bez rejestracji.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, mail firmowy we własnej domenie",
      },
    ],
  },
};

const faqItems = [
  {
    question: "Czy da się mieć mail firmowy za darmo?",
    answer:
      "Zoho Mail ma darmowy plan do 5 osób, ale bez IMAP, więc tylko w przeglądarce i aplikacji Zoho. Domenę i tak trzeba opłacić.",
  },
  {
    question: "Czy adres w Gmailu wystarczy do firmy?",
    answer:
      "Działa, ale nie da się go zabezpieczyć rekordami SPF, DKIM i DMARC, bo domena nie należy do Was.",
  },
  {
    question: "Dlaczego nasze maile trafiają do spamu?",
    answer:
      "Najczęściej brakuje DKIM albo DMARC. Gmail od 2024, a Outlook od 2025 roku odrzucają albo odkładają taką pocztę.",
  },
];

const tekst = { color: "var(--article-text)", lineHeight: 1.7 };
const h2 = { fontSize: "1.4rem", fontWeight: 700, marginTop: "2.5rem" };

export default function MailFirmowy() {
  return (
    <>
      <Header />
      <main
        className="container-wide"
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "6.5rem 1.5rem 4rem",
        }}
      >
        <Breadcrumbs
          items={[{ label: "Mail firmowy", href: "/mail-firmowy" }]}
        />

        <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: "1rem 0" }}>
          Mail firmowy we własnej domenie: koszt, konfiguracja i test, czy nie
          wpada do spamu
        </h1>
        <p style={{ ...tekst, fontSize: "1.05rem" }}>
          Adres w stylu biuro@wasza-firma.pl wymaga domeny i skrzynki u dostawcy
          poczty. O tym, czy maile dochodzą, decydują trzy wpisy w DNS domeny.
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
              Czy Wasza poczta wpada do spamu?
            </strong>
            <div style={{ color: "var(--article-muted)", fontSize: "0.9rem" }}>
              Test SPF, DKIM i DMARC w 10 sekund, bez rejestracji.
            </div>
          </div>
          <Link
            href="/audyt-poczty"
            className="btn-primary"
            style={{ padding: "0.7rem 1.5rem", whiteSpace: "nowrap" }}
          >
            Sprawdź domenę
          </Link>
        </div>

        <h2 style={h2}>Ile kosztuje skrzynka</h2>
        <p style={tekst}>
          Google Workspace Business Starter kosztuje 31,50 zł, Microsoft 365
          Business Basic 6,07 €, a Zoho Mail Lite 0,90 € netto miesięcznie za
          osobę przy umowie rocznej (cenniki z 8.10.2026).
        </p>

        <h2 style={h2}>Co ustawić, żeby maile dochodziły</h2>
        <p style={tekst}>
          SPF to lista serwerów, które mogą wysyłać pocztę z Waszej domeny. DKIM
          podpisuje każdą wiadomość. DMARC mówi serwerom odbiorców, co zrobić z
          mailem, który nie przeszedł tych dwóch sprawdzeń, i chroni przed{" "}
          <Link
            href="/strefa-wiedzy/podszywanie-sie-pod-firmowy-email"
            style={{ textDecoration: "underline" }}
          >
            podszywaniem się pod Wasz adres
          </Link>
          .
        </p>

        <h2 style={h2}>Jak sprawdzić własną domenę</h2>
        <p style={tekst}>
          Wpiszcie domenę w{" "}
          <Link href="/audyt-poczty" style={{ textDecoration: "underline" }}>
            darmowym audycie poczty
          </Link>
          , a po 10 sekundach zobaczycie, którego wpisu brakuje i co dokładnie
          dopisać w DNS.
        </p>

        <h2 style={h2}>Najczęstsze pytania</h2>
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }}
      />
    </>
  );
}
