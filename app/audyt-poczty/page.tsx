import type { Metadata } from "next";
import Link from "next/link";

import AudytPocztyKlient from "./AudytPocztyKlient";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
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
    a: "O tym, czy mail trafi do skrzynki, decyduje serwer odbiorcy. Najpierw sprawdza rekordy SPF, DKIM i DMARC Waszej domeny. Gdy któregoś brakuje albo jest błędny, Gmail i Outlook odkładają wiadomość do spamu albo ją odrzucają.",
  },
  {
    q: "Czy SPF, DKIM i DMARC są obowiązkowe?",
    a: "Żaden przepis tego nie nakazuje, ale wymagają tego Gmail, Yahoo i Microsoft. Duzi nadawcy muszą mieć wszystkie trzy rekordy, a maile małej firmy bez DMARC mają gorszy start.",
  },
  {
    q: "Jaki rekord DMARC ustawić na początek?",
    a: "Rekord TXT pod nazwą _dmarc.twojadomena.pl o treści v=DMARC1; p=none; rua=mailto:dmarc@twojadomena.pl. Zbiera raporty i niczego nie blokuje. Po kilku tygodniach przechodzi się na p=quarantine, a potem na p=reject.",
  },
  {
    q: "Mamy dwa rekordy SPF. Co z tym zrobić?",
    a: "Połączyć je w jeden zaczynający się od v=spf1. Przy dwóch rekordach nie działa żaden z nich. Trzeba też pilnować limitu 10 zapytań DNS.",
  },
];

export default function Page() {
  return (
    <>
      <Header />
      <AudytPocztyKlient
        nazwa={<NazwaNarzedzia href="/audyt-poczty" />}
        breadcrumbs={
          <Breadcrumbs href="/audyt-poczty" kolumna="srodek" items={[{ label: "Audyt poczty firmowej" }]} />
        }
      >
        <section className="mt-12">
          <h2 className="h2-sekcji">
            Najczęstsze pytania o maile w spamie i podszywanie
          </h2>
          <dl className="mt-4">
            {faq.map((f) => (
              <div
                key={f.q}
                className="border-b border-gray-200 py-4 dark:border-gray-700"
              >
                <dt className="font-semibold text-gray-900 dark:text-white">{f.q}</dt>
                <dd className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 leading-relaxed text-gray-600 dark:text-gray-300">
            Więcej:{" "}
            <Link
              href="/strefa-wiedzy/maile-trafiaja-do-spamu"
              className="text-accent hover:underline"
            >
              dlaczego firmowe maile trafiają do spamu
            </Link>
            ,{" "}
            <Link href="/mail-firmowy" className="text-accent hover:underline">
              ile kosztuje mail firmowy we własnej domenie
            </Link>{" "}
            i{" "}
            <Link href="/wlasnosc-domeny" className="text-accent hover:underline">
              kto jest właścicielem domeny
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
      <CTA />
      <Footer />
    </>
  );
}
