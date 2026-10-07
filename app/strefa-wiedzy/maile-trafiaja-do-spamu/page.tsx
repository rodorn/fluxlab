import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SprawdzPoBadaniu from "@/components/SprawdzPoBadaniu";

export const metadata: Metadata = {
  title: "Dlaczego firmowe maile trafiają do spamu | Fluxlab",
  description:
    "Twoje oferty i faktury trafiają do spamu klientów? Najczęstsze przyczyny (SPF, DKIM, DMARC, reputacja) i konkretne kroki naprawy. Plus darmowy audyt domeny.",
  openGraph: {
    title:
      "Dlaczego firmowe maile trafiają do spamu i jak to naprawić | Fluxlab",
    description:
      "Najczęstsze przyczyny lądowania firmowych maili w spamie i konkretne kroki naprawy. Darmowy audyt domeny w kilka sekund.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, dostarczalność poczty firmowej",
      },
    ],
  },
  alternates: {
    canonical: "/strefa-wiedzy/maile-trafiaja-do-spamu",
  },
};

const faqItems = [
  {
    question: "Jak sprawdzić, czy problem jest po naszej stronie?",
    answer:
      "Uruchom audyt rekordów SPF, DKIM i DMARC. Jeśli któregoś brakuje albo DMARC ma p=none, masz konkretną przyczynę do naprawy.",
  },
  {
    question: "Czy wysyłka przez narzędzie do mailingu coś zmienia?",
    answer:
      "Tak. Jego serwery muszą być dopisane do SPF Twojej domeny, inaczej te maile będą odrzucane.",
  },
  {
    question: "Ile trwa poprawa dostarczalności?",
    answer:
      "SPF i DKIM działają po propagacji DNS, zwykle w kilka godzin. DMARC wdraża się etapami przez około dwa tygodnie.",
  },
];

export default function MaileSpamArticle() {
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
              label: "Maile trafiają do spamu",
              href: "/strefa-wiedzy/maile-trafiaja-do-spamu",
            },
          ]}
        />

        <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: "1rem 0" }}>
          Dlaczego firmowe maile trafiają do spamu i jak to naprawić
        </h1>
        <p
          style={{
            color: "var(--article-muted)",
            lineHeight: 1.7,
            fontSize: "1.05rem",
          }}
        >
          Oferta wysłana, a klient znajduje ją w spamie albo wcale. Zwykle
          przyczyna jest konkretna i naprawialna: konfiguracja poczty w DNS.
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
              Sprawdź, gdzie leży problem
            </strong>
            <div style={{ color: "var(--article-muted)", fontSize: "0.9rem" }}>
              Darmowy audyt SPF, DKIM i DMARC Twojej domeny. Wynik od razu, bez
              rejestracji.
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
          Najczęstsze przyczyny, po kolei
        </h2>

        <h3 style={{ fontWeight: 700, marginTop: "1.5rem" }}>1. Brak DMARC</h3>
        <p style={{ color: "var(--article-text)", lineHeight: 1.7 }}>
          Przyczyna numer jeden. Od 2024 roku Gmail i Outlook wymagają DMARC,
          a bez niego część wiadomości cicho trafia do spamu.
        </p>

        <h3 style={{ fontWeight: 700, marginTop: "1.5rem" }}>
          2. Brakujący lub błędny SPF
        </h3>
        <p style={{ color: "var(--article-text)", lineHeight: 1.7 }}>
          Serwer spoza SPF wygląda podejrzanie. Częste błędy: nowe narzędzie
          do mailingu niedopisane do SPF albo dwa rekordy SPF naraz.
        </p>

        <h3 style={{ fontWeight: 700, marginTop: "1.5rem" }}>
          3. Brak podpisu DKIM
        </h3>
        <p style={{ color: "var(--article-text)", lineHeight: 1.7 }}>
          Bez DKIM nie ma dowodu, że wiadomość wyszła od Ciebie i nie została
          zmieniona. Filtry ufają jej mniej.
        </p>

        <h3 style={{ fontWeight: 700, marginTop: "1.5rem" }}>
          4. Reputacja i treść
        </h3>
        <p style={{ color: "var(--article-text)", lineHeight: 1.7 }}>
          Szkodzi też zła reputacja IP, nagły wzrost wysyłki albo spamowa
          treść. To naprawia się dopiero po SPF, DKIM i DMARC.
        </p>

        <SprawdzPoBadaniu
          naglowek="Zobacz to sprawdzenie na żywo"
          opis="Odpytujemy DNS wybranej domeny o SPF, DKIM i DMARC i pokazujemy, czego brakuje."
          endpoint="/api/audyt"
          pozycje={[
            { wartosc: "fluxlab.pl" },
            { wartosc: "allegro.pl" },
            { wartosc: "x-kom.pl" },
          ]}
          narzedzie={{
            href: "/audyt-poczty",
            etykieta: "Sprawdź swoją domenę",
          }}
          kontakt="Chcesz, żeby te rekordy ktoś ustawił za Ciebie?"
        />

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

        <p
          style={{
            color: "var(--article-muted)",
            marginTop: "2rem",
            fontSize: "0.95rem",
          }}
        >
          Zobacz też:{" "}
          <Link
            href="/strefa-wiedzy/podszywanie-sie-pod-firmowy-email"
            style={{ color: "var(--article-link)" }}
          >
            Czy ktoś może podszyć się pod Twój firmowy e-mail?
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
