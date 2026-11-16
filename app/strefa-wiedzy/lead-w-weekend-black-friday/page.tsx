import type { Metadata } from "next";
import Link from "next/link";
import HasloSlownika from "@/components/HasloSlownika";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";

const OPIS =
  "Black Friday 2026 wypada 27.11, a leady przyjdą też w sobotę. Kto ma je odebrać, ile kosztuje dyżur handlowca w domu i co może zrobić automat.";

const TYTUL = "Lead w sobotę po Black Friday: kto odpowie | Fluxlab";

export const metadata: Metadata = {
  title: "Lead w sobotę po Black Friday: kto odpowie | Fluxlab",
  description:
    "Black Friday 2026 wypada 27.11, a leady przyjdą też w sobotę. Kto ma je odebrać, ile kosztuje dyżur handlowca w domu i co może zrobić automat.",
  openGraph: {
    title: TYTUL,
    description: OPIS,
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, KSeF i automatyzacja dla firm",
      },
    ],
  },
  alternates: {
    canonical: "/strefa-wiedzy/lead-w-weekend-black-friday",
  },
};

const faq: { q: string; a: string }[] = [
  {
    q: "Czy za dyżur pod telefonem w domu trzeba płacić?",
    a: "Nie, jeśli w tym czasie nie było pracy. Odebrane zgłoszenia to już czas pracy.",
  },
  {
    q: "Ile odpoczynku musi mieć handlowiec po weekendzie z dyżurem?",
    a: "Co najmniej 11 godzin w każdej dobie i 35 godzin w tygodniu.",
  },
];

export default function LeadWWeekendBlackFriday() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href="/strefa-wiedzy/lead-w-weekend-black-friday"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Lead w weekend po Black Friday" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">
              Kto odpowiada na leada w sobotę po Black Friday
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Black Friday wypada w piątek 27 listopada, więc zgłoszenia z
              kampanii spłyną też w weekend. Kto je odbiera, ustal przed sobotą.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">
                Dyżur w domu nie jest czasem pracy
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Pracodawca może zobowiązać handlowca do gotowości do pracy poza
                jego godzinami, to dyżur. Dyżur w domu bez pracy nie jest czasem
                pracy i nie daje czasu wolnego ani wynagrodzenia, ale odebrana
                rozmowa z klientem już tak.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Odpoczynek zostaje</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Dyżur nie może zabrać 11 godzin odpoczynku na dobę ani 35 godzin
                w tygodniu. Za przepracowaną wolną sobotę należy się inny dzień
                wolny do końca okresu rozliczeniowego.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">
                Niech dyżurnego budzą tylko ważne leady
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Automat odpowiada klientowi od razu i ustawia zadanie na
                poniedziałek,{" "}
                <Link
                  href="/czas-reakcji-na-leada"
                  className="text-accent hover:underline"
                >
                  jak opisujemy
                </Link>{" "}
                przy czasie reakcji na leada. Dyżurny dostaje powiadomienie
                tylko o zgłoszeniu powyżej progu, na przykład wartości
                zamówienia.{" "}
                <Link
                  href="/koszt-recznej-obslugi-leadow"
                  className="text-accent hover:underline"
                >
                  Reszta czeka
                </Link>{" "}
                w <HasloSlownika slug="crm">CRM</HasloSlownika> z terminem.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Pytania</h2>
              <div className="space-y-4">
                {faq.map((f) => (
                  <details
                    key={f.q}
                    className="group rounded-2xl border border-gray-200 dark:border-gray-700"
                  >
                    <summary className="cursor-pointer p-6 text-gray-900 dark:text-white font-medium">
                      {f.q}
                    </summary>
                    <p className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <div className="max-w-3xl mx-auto mt-16">
            <PrevNextArticle currentHref="/strefa-wiedzy/lead-w-weekend-black-friday" />
          </div>
        </div>
        <CTA naglowek="Chcesz, żeby leady z weekendu same trafiały do właściwej osoby?" />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Kto odpowiada na leada w sobotę po Black Friday",
              description: OPIS,
              datePublished: "2026-11-16",
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
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]),
        }}
      />
    </>
  );
}
