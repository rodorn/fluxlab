import type { Metadata } from "next";
import Link from "next/link";
import HasloSlownika from "@/components/HasloSlownika";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";
import { dataZmiany } from "@/lib/data-zmiany";

const OPIS =
  "Firma zamknięta od 24.12 do 6.01? Autoodpowiedź z datą powrotu, jedna osoba na pilne sprawy i lista zapytań do oddzwonienia 7 stycznia.";

const TYTUL = "Przerwa świąteczna w firmie bez zgubionych zapytań | Fluxlab";

export const metadata: Metadata = {
  title: "Przerwa świąteczna w firmie bez zgubionych zapytań | Fluxlab",
  description:
    "Firma zamknięta od 24.12 do 6.01? Autoodpowiedź z datą powrotu, jedna osoba na pilne sprawy i lista zapytań do oddzwonienia 7 stycznia.",
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
    canonical: "/strefa-wiedzy/przerwa-swiateczna-w-firmie",
  },
};

const faq: { q: string; a: string }[] = [
  {
    q: "Czy Wigilia 2026 jest dniem wolnym od pracy?",
    a: "Tak. Od 2025 roku 24 grudnia jest ustawowo wolny (Dz.U. 2024 poz. 1965), w 2026 wypada w czwartek.",
  },
  {
    q: "Co napisać w autoodpowiedzi na przerwę świąteczną?",
    a: "Datę powrotu, na przykład 7 stycznia, kontakt do pilnych spraw i informację, że wiadomość nie zginie.",
  },
  {
    q: "Czy dyżurny musi odpisywać na wszystkie maile?",
    a: "Nie. Odbiera tylko sprawy z ustalonego progu, resztą zespół zajmie się 7 stycznia.",
  },
];

export default function PrzerwaSwiatecznaWFirmie() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href="/strefa-wiedzy/przerwa-swiateczna-w-firmie"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Przerwa świąteczna w firmie" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">
              Przerwa świąteczna w firmie bez zgubionych zapytań
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              W 2026 Wigilia wypada w czwartek, a Trzech Króli w środę 6
              stycznia. Firma zamknięta na ten czas wraca 7 stycznia z dwoma
              tygodniami zapytań do nadrobienia.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">Autoodpowiedź z datą, nie „po świętach”</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Klient, który pisze 27 grudnia, chce wiedzieć, kiedy dostanie
                odpowiedź. Podaj konkretny dzień powrotu i jeden kontakt do
                spraw pilnych. Ta sama treść ma iść z maila i z formularza na
                stronie.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Jedna osoba na pilne sprawy</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Ustal z góry, co jest pilne: awaria u klienta z umową albo
                zamówienie powyżej progu. Tylko takie zgłoszenie wysyła
                powiadomienie dyżurnemu, reszta czeka.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Lista do oddzwonienia na 7 stycznia</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Automat zbiera zapytania z maila, formularza i telefonu w jedną
                listę i rano 7 stycznia rozdziela je na handlowców. Jak działają{" "}
                <Link
                  href="/automatyzacja-follow-up"
                  className="text-accent hover:underline"
                >
                  przypomnienia o kontakcie
                </Link>
                , opisujemy osobno. Najpierw najstarsze, bo{" "}
                <Link
                  href="/czas-reakcji-na-leada"
                  className="text-accent hover:underline"
                >
                  czas reakcji
                </Link>{" "}
                każdego <HasloSlownika slug="lead">leada</HasloSlownika> liczy
                się od dnia, w którym napisał.
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
            <PrevNextArticle currentHref="/strefa-wiedzy/przerwa-swiateczna-w-firmie" />
          </div>
        </div>
        <CTA naglowek="Chcesz, żeby zapytania z przerwy same czekały na Ciebie w jednej liście?" />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Przerwa świąteczna w firmie bez zgubionych zapytań",
              description: OPIS,
              datePublished: "2026-11-23",
              dateModified: dataZmiany("/strefa-wiedzy/przerwa-swiateczna-w-firmie", "2026-11-23"),
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
