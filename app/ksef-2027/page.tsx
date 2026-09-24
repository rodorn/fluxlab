import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ListaKsef2027 from "@/components/ListaKsef2027";
import WiadomoscKsefDlaKlientow from "@/components/WiadomoscKsefDlaKlientow";
import RamkaKsefDoWstawienia from "@/components/RamkaKsefDoWstawienia";
import NazwaNarzedzia from "@/components/NazwaNarzedzia";

export const metadata: Metadata = {
  title: "KSeF od 1 stycznia 2027: lista kontrolna dla firm | Fluxlab",
  description:
    "1 stycznia 2027 kończą się przepisy przejściowe KSeF. Sześć pytań: faktury poza KSeF, kasa, numer KSeF w przelewie, faktury kosztowe, tryb offline, odrzucenia.",
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
    a: "Kończą się naraz wszystkie przepisy przejściowe. Znika limit 10 tys. zł brutto miesięcznie na faktury wystawiane poza KSeF, więc każda faktura dla firmy musi przejść przez system. Faktury z kas rejestrujących, w tym paragony z NIP do 450 zł, też muszą przez niego przechodzić. Przelew za fakturę z KSeF między czynnymi podatnikami VAT ma zawierać jej numer KSeF albo identyfikator zbiorczy.",
  },
  {
    q: "Czy kary za fakturę poza KSeF zaczną obowiązywać w 2027?",
    a: "Kary z art. 106ni ustawy o VAT, do 100% kwoty VAT z faktury wystawionej poza KSeF albo do 18,7% kwoty należności przy fakturze bez VAT, miały ruszyć 1 stycznia 2027. 16 września 2026 Ministerstwo Finansów zapowiedziało przesunięcie ich na 1 stycznia 2028 i rozpoczęło prace nad ustawą. To zapowiedź, a nie uchwalone prawo. Sam obowiązek wystawiania faktur w KSeF nie jest zawieszony ani o jeden dzień.",
  },
  {
    q: "Czy numer KSeF trzeba podawać w każdym przelewie?",
    a: "Od 1 stycznia 2027 obowiązek dotyczy zapłaty za fakturę z KSeF między czynnymi podatnikami VAT. Przy zapłacie za wiele faktur jednego kontrahenta wystarczy jeden identyfikator zbiorczy wygenerowany w KSeF. Nie dotyczy płatności kartą, BLIK-iem ani gotówką.",
  },
  {
    q: "Czy tokeny KSeF wygasają z końcem 2026 roku?",
    a: "Nie. Ministerstwo Finansów zrezygnowało z wygaszenia tokenów. Do wystawiania faktur w trybie offline potrzebny jest jednak certyfikat KSeF typu 2, bo bez niego nie da się wygenerować drugiego kodu QR na fakturze przekazanej klientowi poza systemem. Certyfikat generuje się w Aplikacji Podatnika KSeF i jest ważny 2 lata.",
  },
  {
    q: "Od kiedy faktura kosztowa z KSeF jest uznana za otrzymaną?",
    a: "Od dnia nadania jej numeru w KSeF. Dostawca nie musi wysyłać jej mailem, więc termin płatności biegnie także wtedy, gdy nikt nie pobrał faktury z systemu.",
  },
  {
    q: "Mamy mniej niż 10 tys. zł faktur miesięcznie. Czy musimy coś robić?",
    a: "Tak, ale do końca 2026 roku. Limit 10 tys. zł brutto miesięcznie pozwala wystawiać faktury poza KSeF tylko do 31 grudnia 2026. Przy kilku fakturach miesięcznie wystarczy darmowa Aplikacja Podatnika KSeF od Ministerstwa Finansów albo program do fakturowania z obsługą KSeF.",
  },
];

export default function Ksef2027Page() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs
          items={[
            { label: "Narzędzia", href: "/narzedzia" },
            { label: "KSeF od 1 stycznia 2027" },
          ]}
        />
        <section className="container-wide pb-14 md:pb-20 pt-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              Darmowa lista kontrolna
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              KSeF od 1 stycznia 2027: co musicie mieć domknięte
            </h1>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">
              Tego dnia kończą się naraz wszystkie przepisy przejściowe
              Krajowego Systemu e-Faktur: limit faktur poza KSeF, wyjątek dla
              kas rejestrujących i swoboda przy przelewach. Sześć pytań poniżej
              pokazuje, co jeszcze zostało do zrobienia, a na końcu dostajecie
              wykaz braków gotowy do wysłania księgowej. Bez rejestracji i bez
              podawania jakichkolwiek danych.
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Częste pytania o KSeF w 2027
            </h2>
            <dl className="mt-6 space-y-5">
              {faq.map((f) => (
                <div key={f.q}>
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Kiedy faktury powstają poza programem księgowym
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Punkty o przelewach, fakturach kosztowych i stanie faktur to
              miejsca, gdzie dane przechodzą między programami. Jeżeli faktury
              powstają w sklepie, w systemie zamówień albo w CRM, a ktoś
              przenosi je dziś ręcznie, sprawdźcie, od kiedy obowiązek dotyczy
              Waszej grupy podatników i co da się spiąć z KSeF.
            </p>
            <p className="mt-4">
              <Link
                href="/ksef-integracja"
                className="font-semibold text-accent hover:underline"
              >
                Integracja z KSeF i terminy dla Waszej grupy
              </Link>
            </p>
          </div>
        </section>
      </main>

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
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <Footer />
    </>
  );
}
