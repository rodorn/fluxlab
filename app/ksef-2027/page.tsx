import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import { kotwica } from "@/lib/kotwica";
import ListaKsef2027 from "@/components/ListaKsef2027";
import WiadomoscKsefDlaKlientow from "@/components/WiadomoscKsefDlaKlientow";
import RamkaKsefDoWstawienia from "@/components/RamkaKsefDoWstawienia";
import NazwaNarzedzia from "@/components/NazwaNarzedzia";

export const metadata: Metadata = {
  title: "KSeF od 1 stycznia 2027: lista kontrolna dla firm | Fluxlab",
  description:
    "Koniec przepisów przejściowych KSeF 1.01.2027. Siedem pytań: faktury poza KSeF, kasa, numer KSeF w przelewie, koszty, tryb offline, numeracja, odrzucenia.",
  alternates: { canonical: "/ksef-2027" },
  openGraph: {
    title: "KSeF od 1 stycznia 2027: co musicie mieć domknięte",
    description:
      "Darmowa lista kontrolna na koniec przepisów przejściowych KSeF. Na końcu wykaz braków gotowy do wysłania księgowej, bez rejestracji.",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/ksef-2027/opengraph-image"],
  },
};

const faq = [
  {
    q: "Co się zmienia w KSeF 1 stycznia 2027?",
    a: "Kończą się wszystkie przepisy przejściowe. Znika limit 10 tys. zł na faktury poza KSeF, faktury z kas też muszą przez niego przechodzić, a przelew za fakturę z KSeF między czynnymi podatnikami VAT ma zawierać jej numer KSeF.",
  },
  {
    q: "Czy kary za fakturę poza KSeF zaczną obowiązywać w 2027?",
    a: "23 września 2026 Ministerstwo Finansów opublikowało projekt przesunięcia kar na 1 stycznia 2028 (UD477). To wciąż projekt, a nie uchwalone prawo. Sam obowiązek wystawiania faktur w KSeF nie jest przesunięty.",
  },
  {
    q: "Czy tokeny KSeF wygasają z końcem 2026 roku?",
    a: "Ministerstwo zapowiedziało, że tokeny zostaną, ale obowiązujące rozporządzenie nadal wskazuje 31 grudnia 2026 r. Jeśli program łączy się z KSeF tokenem, warto już teraz wygenerować certyfikat KSeF jako zapas.",
  },
  {
    q: "Czy po przejściu na KSeF trzeba zmienić numerację faktur?",
    a: "Nie, numer nadajecie sami jak dotąd. KSeF odrzuca jednak duplikat numeru z ostatnich 10 lat, więc numeracja bez roku w numerze (1, 2, 3) w drugim roku zacznie dawać odrzucenia.",
  },
];

export default function Ksef2027Page() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs href="/ksef-2027"
          items={[
            { label: "Narzędzia", href: "/narzedzia" },
            { label: "KSeF od 1 stycznia 2027" },
          ]}
        />
        <section className="container-wide pb-14 md:pb-20 pt-6">
          <div className="max-w-3xl">
            <p className="section-label mb-3">Narzędzie</p>
            <h1 className="h1-strony">
              KSeF od 1 stycznia 2027: co musicie mieć domknięte
            </h1>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">
              Tego dnia kończą się przepisy przejściowe KSeF. Siedem pytań
              pokazuje, co zostało do zrobienia, a na końcu dostajecie wykaz
              braków dla księgowej. Bez rejestracji.
            </p>
          </div>

          <div className="mt-10 max-w-4xl">
            <NazwaNarzedzia href="/ksef-2027" />
            <ListaKsef2027 formularz="/ksef-integracja#zamow" />
          </div>

          <div className="mt-14 max-w-4xl">
            <WiadomoscKsefDlaKlientow />
          </div>

          <div className="mt-14 max-w-4xl">
            <RamkaKsefDoWstawienia />
          </div>

          <div className="mt-14 max-w-3xl">
            <h2 className="h2-sekcji">
              Częste pytania o KSeF w 2027
            </h2>
            <dl className="mt-6 space-y-5">
              {faq.map((f) => (
                <div key={f.q} id={kotwica(f.q)} className="scroll-mt-20">
                  <dt className="font-semibold text-gray-900 dark:text-white">
                    {f.q}
                  </dt>
                  <dd className="mt-1 text-gray-600 dark:text-gray-300">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-14 max-w-3xl rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-gray-50/60 dark:bg-gray-900/40 p-8">
            <h2 className="h2-sekcji">
              Kiedy faktury powstają poza programem księgowym
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Jeżeli faktury powstają w sklepie albo w CRM i ktoś przenosi je
              ręcznie do KSeF, spinamy te systemy automatycznie.
            </p>
            <p className="mt-4">
              <Link
                href="/ksef-integracja"
                className="font-semibold text-accent hover:underline"
              >
                Integracja z KSeF
              </Link>
            </p>
            <p className="mt-2">
              <Link
                href="/numer-ksef"
                className="font-semibold text-accent hover:underline"
              >
                Sprawdźcie numery KSeF z przelewów
              </Link>
            </p>
          </div>
        </section>
      </main>
      <CTA />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Lista kontrolna KSeF na 1 stycznia 2027",
            url: "https://fluxlab.pl/ksef-2027",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Dowolna przeglądarka",
            inLanguage: "pl",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "PLN",
            },
            provider: { "@type": "Organization", name: "Fluxlab" },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              url: `https://fluxlab.pl/ksef-2027#${kotwica(f.q)}`,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <Footer />
    </>
  );
}
