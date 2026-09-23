import type { Metadata } from "next";
import Link from "next/link";

import AudytPocztyKlient from "./AudytPocztyKlient";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NazwaNarzedzia from "@/components/NazwaNarzedzia";

export const metadata: Metadata = {
  title: "Audyt poczty firmowej, ochrona przed podszyciem | Fluxlab",
  description:
    "Sprawdzamy SPF, DKIM i DMARC Twojej domeny i mówimy, czy ktoś obcy może wysłać wiadomość wyglądającą na Waszą. Wynik od ręki, bez rejestracji.",
  alternates: { canonical: "/audyt-poczty" },
  openGraph: {
    title: "Audyt poczty firmowej, ochrona przed podszyciem | Fluxlab",
    description:
      "SPF, DKIM i DMARC sprawdzone w kilka sekund. Pod 84 procent zbadanych przez nas salonów samochodowych dało się podszyć mailowo.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, audyt zabezpieczeń poczty firmowej",
      },
    ],
  },
};

const faq = [
  {
    q: "Dlaczego nasze maile trafiają do spamu, skoro wysyłka się udaje?",
    a: "Serwer nadawcy potwierdza tylko, że wiadomość wyszła. O tym, czy trafi do skrzynki odbiorczej, decyduje serwer odbiorcy, a pierwsze, co sprawdza, to trzy rekordy w DNS Waszej domeny: SPF, DKIM i DMARC. Gdy któregoś brakuje albo jest błędny, Gmail i Outlook traktują wiadomość jak podejrzaną i odkładają ją do spamu albo odrzucają bez żadnego powiadomienia. Dopiero przy poprawnych rekordach ma sens szukać przyczyny w reputacji adresu IP albo w treści.",
  },
  {
    q: "Czy SPF, DKIM i DMARC są obowiązkowe?",
    a: "Żaden przepis tego nie nakazuje, ale wymagają tego najwięksi odbiorcy poczty. Od lutego 2024 Gmail i Yahoo wymagają od każdego nadawcy co najmniej SPF albo DKIM, a od wysyłających ponad 5000 wiadomości dziennie wszystkich trzech rekordów, z DMARC co najmniej w trybie p=none. Microsoft stosuje to samo wymaganie dla dużych nadawców do skrzynek Outlook.com od 5 maja 2025. Mała firma bez DMARC nie jest więc automatycznie blokowana, ale jej maile mają gorszy start niż maile firm, które go mają.",
  },
  {
    q: "Jak sprawdzić, czy ktoś może podszyć się pod naszą domenę?",
    a: "Wystarczy odczytać publiczne rekordy DNS. Jeżeli domena nie ma DMARC albo ma go w trybie p=none, serwer odbiorcy nie dostaje od Was polecenia, żeby odrzucić wiadomość, która nie przeszła SPF i DKIM. Wtedy obcy nadawca może wysłać maila z Waszym adresem w polu Od i często dotrze on do skrzynki. Narzędzie wyżej robi to sprawdzenie w kilka sekund. W naszym badaniu 317 domen salonów samochodowych z działającą pocztą komplet SPF, DKIM i DMARC w trybie, który blokuje podszywanie, miało tylko 16 procent.",
  },
  {
    q: "Jaki rekord DMARC ustawić na początek?",
    a: "Na start rekord TXT pod nazwą _dmarc.twojadomena.pl o treści v=DMARC1; p=none; rua=mailto:dmarc@twojadomena.pl. Tryb p=none niczego nie blokuje, tylko zbiera raporty o tym, kto wysyła pocztę w imieniu domeny. Po kilku tygodniach, gdy w raportach widać wyłącznie Wasze własne serwery (skrzynka, system do faktur, narzędzie do mailingu), przechodzi się na p=quarantine, a potem na p=reject. Przejście od razu na p=reject bez raportów potrafi zablokować własne faktury wysyłane z zewnętrznego systemu.",
  },
  {
    q: "Mamy dwa rekordy SPF. Co z tym zrobić?",
    a: "Połączyć je w jeden. Standard SPF (RFC 7208) każe przy dwóch rekordach zwrócić błąd, więc w praktyce nie działa żaden z nich. To częsty skutek dodania narzędzia do mailingu albo systemu do faktur, którego instrukcja kazała dopisać nowy rekord zamiast rozszerzyć istniejący. Wszystkie wpisy include trafiają do jednego rekordu zaczynającego się od v=spf1. Trzeba przy tym pilnować limitu 10 zapytań DNS, bo po jego przekroczeniu SPF również przestaje działać.",
  },
  {
    q: "Mamy DKIM, a audyt go nie widzi. Dlaczego?",
    a: "DKIM nie ma jednego stałego adresu. Klucz leży pod nazwą selektor._domainkey.twojadomena.pl, a selektor wybiera dostawca poczty. Sprawdzamy najczęstsze selektory (między innymi default, google, selector1 i selector2 z Microsoft 365, k1 i mail). Jeżeli Wasz dostawca używa innego, audyt pokaże brak, choć podpis działa. Żeby to rozstrzygnąć, wystarczy otworzyć nagłówki dowolnego maila wysłanego z firmowej skrzynki i poszukać wpisu dkim=pass.",
  },
];

export default function Page() {
  return (
    <>
      <Header />
      <AudytPocztyKlient nazwa={<NazwaNarzedzia href="/audyt-poczty" />}>
        <section style={{ marginTop: "3rem" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700 }}>
            Najczęstsze pytania o maile w spamie i podszywanie
          </h2>
          <dl style={{ marginTop: "1rem" }}>
            {faq.map((f) => (
              <div
                key={f.q}
                style={{ borderBottom: "1px solid #eee", padding: "1rem 0" }}
              >
                <dt style={{ fontWeight: 600 }}>{f.q}</dt>
                <dd
                  className="text-gray-600 dark:text-gray-300"
                  style={{ margin: "0.5rem 0 0", lineHeight: 1.7 }}
                >
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
          <p
            className="text-gray-600 dark:text-gray-300"
            style={{ marginTop: "1.5rem", lineHeight: 1.7 }}
          >
            Więcej o przyczynach, po kolei:{" "}
            <Link
              href="/strefa-wiedzy/maile-trafiaja-do-spamu"
              className="underline"
            >
              dlaczego firmowe maile trafiają do spamu
            </Link>
            . Badanie, z którego pochodzi liczba 84 procent:{" "}
            <Link
              href="/strefa-wiedzy/podszywanie-pod-salony-samochodowe"
              className="underline"
            >
              podszywanie pod salony samochodowe
            </Link>
            .
          </p>
        </section>
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
      </AudytPocztyKlient>
      <Footer />
    </>
  );
}
