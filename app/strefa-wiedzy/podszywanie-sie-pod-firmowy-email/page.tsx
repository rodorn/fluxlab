import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title:
    "Czy ktoś może podszyć się pod firmowy e-mail? (SPF, DKIM, DMARC) | Fluxlab",
  description:
    "Jak sprawdzić, czy ktoś może wysłać maila w imieniu Twojej firmy i czy Twoje wiadomości docierają do klientów. SPF, DKIM i DMARC wytłumaczone prosto, plus darmowy audyt domeny.",
  openGraph: {
    title:
      "Czy ktoś może podszyć się pod firmowy e-mail? (SPF, DKIM, DMARC) | Fluxlab",
    description:
      "Jak sprawdzić, czy ktoś może wysłać maila w imieniu Twojej firmy i czy Twoje wiadomości docierają do klientów. Darmowy audyt domeny w kilka sekund.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab — bezpieczeństwo poczty firmowej",
      },
    ],
  },
  alternates: {
    canonical: "/strefa-wiedzy/podszywanie-sie-pod-firmowy-email",
  },
};

const faqItems = [
  {
    question: "Skąd mam wiedzieć, czy ktoś może podszyć się pod moją domenę?",
    answer:
      "Zależy to od trzech rekordów DNS: SPF, DKIM i DMARC. Jeśli domena nie ma DMARC albo ma go w trybie p=none, praktycznie każdy może wysłać wiadomość wyglądającą jak od Ciebie. Najszybciej sprawdzisz to darmowym audytem: wpisujesz domenę i w kilka sekund masz wynik.",
  },
  {
    question: "Dlaczego moje maile z ofertami trafiają do spamu?",
    answer:
      "Najczęstsza przyczyna to brak lub błędna konfiguracja SPF, DKIM i DMARC. Od 2024 roku Gmail i Outlook wymagają tych rekordów od firm wysyłających więcej wiadomości. Bez nich część poczty jest cicho odrzucana lub ląduje w spamie, a Ty tego nie widzisz, bo z Twojej strony mail wychodzi poprawnie.",
  },
  {
    question: "Czy naprawa czegoś nie zepsuje?",
    answer:
      "Nie, jeśli robi się to etapami. Najpierw DMARC w trybie obserwacji, który tylko zbiera raporty i niczego nie blokuje. Po dwóch tygodniach, gdy wiadomo, kto legalnie wysyła pocztę w imieniu domeny, zaostrza się politykę. Odwrotna kolejność potrafi zablokować własne faktury, dlatego kolejność ma znaczenie.",
  },
  {
    question: "Ile trwa i kosztuje uporządkowanie tego?",
    answer:
      "Sama diagnoza jest darmowa. Podstawowa naprawa SPF i DKIM to kwestia godzin, pełne wdrożenie DMARC do poziomu, który realnie blokuje podszywanie, to zwykle dwa tygodnie, bo trzeba zebrać dane z raportów przed zaostrzeniem polityki.",
  },
];

export default function PodszywanieEmailArticle() {
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
              label: "Podszywanie się pod firmowy e-mail",
              href: "/strefa-wiedzy/podszywanie-sie-pod-firmowy-email",
            },
          ]}
        />

        <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: "1rem 0" }}>
          Czy ktoś może podszyć się pod Twój firmowy e-mail?
        </h1>
        <p style={{ color: "var(--article-muted)", lineHeight: 1.7, fontSize: "1.05rem" }}>
          To jeden z najczęstszych i najmniej widocznych problemów małych firm.
          Jeśli Twoja domena nie jest poprawnie skonfigurowana, dowolna osoba
          może wysłać wiadomość wyglądającą jak od Ciebie, a część Twoich
          własnych maili z ofertami i fakturami może po cichu nie docierać do
          klientów. Poniżej wyjaśniamy prosto, od czego to zależy i jak to
          sprawdzić w kilka sekund.
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
          Bezpieczeństwo poczty firmowej opiera się na trzech publicznych
          wpisach w DNS Twojej domeny. Każdy odpowiada za co innego, a razem
          decydują, czy ktoś może się pod Ciebie podszyć i czy Twoje maile
          docierają.
        </p>

        <h3 style={{ fontWeight: 700, marginTop: "1.5rem" }}>
          SPF — kto ma prawo wysyłać w Twoim imieniu
        </h3>
        <p style={{ color: "var(--article-text)", lineHeight: 1.7 }}>
          SPF to lista serwerów uprawnionych do wysyłania poczty z Twojej
          domeny. Bez niego dowolny serwer na świecie może podać się za Twój, a
          odbiorca nie ma jak tego wykryć.
        </p>

        <h3 style={{ fontWeight: 700, marginTop: "1.5rem" }}>
          DKIM — podpis, którego nie da się podrobić
        </h3>
        <p style={{ color: "var(--article-text)", lineHeight: 1.7 }}>
          DKIM to kryptograficzny podpis dokładany do każdej wiadomości.
          Odbiorca sprawdza, czy list naprawdę wyszedł od Ciebie i czy nie
          został po drodze zmieniony.
        </p>

        <h3 style={{ fontWeight: 700, marginTop: "1.5rem" }}>
          DMARC — reguła, co zrobić z podejrzaną pocztą
        </h3>
        <p style={{ color: "var(--article-text)", lineHeight: 1.7 }}>
          DMARC spina SPF i DKIM i mówi serwerom odbiorców, co zrobić z
          wiadomością, która nie przechodzi weryfikacji: przepuścić, oznaczyć
          jako spam czy odrzucić. Od 2024 roku Gmail i Outlook wymagają tego
          rekordu od firm wysyłających więcej poczty. Jego brak albo tryb p=none
          oznacza, że nikt nie blokuje podszywania pod Twoją domenę.
        </p>

        <h2
          style={{ fontSize: "1.4rem", fontWeight: 700, marginTop: "2.5rem" }}
        >
          Dlaczego to realny problem, a nie teoria
        </h2>
        <p style={{ color: "var(--article-text)", lineHeight: 1.7 }}>
          Oszustwo na fałszywą fakturę zaczyna się zwykle od maila, który
          wygląda jak od zaufanego kontrahenta. Jeśli Twoja domena nie jest
          zabezpieczona, przestępca może wysłać do Twoich klientów wiadomość z
          Twojego adresu i zmienionym numerem konta. Drugi, cichszy koszt to
          utracone maile: bez DMARC część Twoich ofert po prostu nie dociera, a
          Ty widzisz tylko, że wiadomość wyszła.
        </p>

        <div
          style={{
            margin: "2.5rem 0",
            padding: "1.5rem",
            border: "1px solid #e5e5e5",
            borderRadius: 12,
          }}
        >
          <strong style={{ fontSize: "1.1rem" }}>Nie zgaduj, sprawdź</strong>
          <p
            style={{ color: "var(--article-muted)", lineHeight: 1.6, margin: "0.5rem 0 1rem" }}
          >
            Wpisz domenę firmy, a w kilka sekund pokażemy stan SPF, DKIM i DMARC
            oraz co konkretnie wymaga poprawy. Wszystko z publicznego DNS, bez
            logowania i bez wysyłania czegokolwiek.
          </p>
          <Link
            href="/audyt-poczty"
            className="btn-primary"
            style={{ padding: "0.7rem 1.5rem" }}
          >
            Sprawdź bezpieczeństwo poczty
          </Link>
        </div>

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
                style={{ color: "var(--article-muted)", lineHeight: 1.7, marginTop: "0.5rem" }}
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
