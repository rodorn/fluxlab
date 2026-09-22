import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";
import TrackedCTA from "@/components/TrackedCTA";
import NipCheck from "@/components/NipCheck";

export const metadata: Metadata = {
  title: "Sprawdź kontrahenta przed przelewem, od 9 zł | Fluxlab",
  description:
    "Zanim wyślesz zaliczkę, sprawdź firmę. Werdykt z wykazu VAT, KRS i danych domeny, w tym test, czy numer konta figuruje w wykazie. Od 9 zł.",
  alternates: { canonical: "/sprawdz-kontrahenta" },
  openGraph: {
    title:
      "Sprawdź kontrahenta przed przelewem, raport ryzyka od 9 zł | Fluxlab",
    description:
      "Werdykt o firmie z wykazu VAT, KRS i danych domeny. Sprawdzam też, czy konto do przelewu należy do tej firmy.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, sprawdzony kontrahent",
      },
    ],
  },
};

const checks = [
  {
    title: "Czy konto należy do tej firmy",
    desc: "Najważniejszy test. Porównuję numer, na który masz zapłacić, z rachunkami zgłoszonymi do wykazu VAT. Podmieniony numer konta w mailu to najczęstszy sposób przejęcia płatności.",
  },
  {
    title: "Status VAT i dane rejestrowe",
    desc: "Czy podmiot w ogóle istnieje w wykazie Ministerstwa Finansów, czy jest czynnym podatnikiem i od kiedy działa.",
  },
  {
    title: "KRS bez upiększeń",
    desc: "Wykreślenie, likwidacja, upadłość, restrukturyzacja oraz ujawnione zaległości i wierzyciele. To dane z odpisu, nie z wizytówki firmy.",
  },
  {
    title: "Wiek domeny",
    desc: "Domena założona dwa tygodnie temu przy prośbie o dużą przedpłatę to klasyczny element sklepu widma.",
  },
];

const pricing = [
  {
    name: "Szybki check",
    price: "9 zł",
    desc: "Jedno pytanie: czy coś tu nie gra, zanim wyślesz przelew.",
    features: [
      "status VAT i istnienie podmiotu",
      "weryfikacja numeru konta w wykazie",
      "werdykt zielony, żółty albo czerwony",
      "odpowiedź w 24h na maila",
    ],
    featured: false,
  },
  {
    name: "Pełny raport",
    price: "29 zł",
    desc: "Komplet do decyzji o umowie albo większej zaliczce.",
    features: [
      "wszystko ze szybkiego checku",
      "odpis KRS: likwidacja, zaległości, wykreślenie",
      "wiek domeny i dane rejestrowe",
      "raport PDF z uzasadnieniem każdej flagi",
    ],
    featured: true,
  },
];

const faq = [
  {
    q: "Czym to się różni od darmowego sprawdzenia na Białej Liście?",
    a: "Biała Lista odpowiada na jedno pytanie i nic nie mówi o reszcie. Ja składam wykaz VAT, odpis KRS i dane domeny w jeden werdykt, a przy każdej fladze piszę, co ona realnie oznacza dla Twoich pieniędzy. Sam sprawdzisz to w kilku miejscach, tu masz odpowiedź w jednym.",
  },
  {
    q: "Dlaczego numer konta jest taki ważny?",
    a: "Płatność powyżej 15 tysięcy złotych na rachunek spoza wykazu oznacza brak kosztu uzyskania przychodu i odpowiedzialność solidarną za VAT sprzedawcy. Niezależnie od podatków, podmieniony numer w mailu to najczęstszy sposób, w jaki znikają przelewy.",
  },
  {
    q: "Czy zielony werdykt gwarantuje, że firma jest uczciwa?",
    a: "Nie i tak to opisuję w raporcie. Brak sygnałów ostrzegawczych znaczy tyle, że w danych publicznych nie ma nic niepokojącego. To analiza ryzyka, nie gwarancja wypłacalności ani porada prawna.",
  },
  {
    q: "Jak szybko dostanę raport?",
    a: "Zwykle tego samego dnia, najpóźniej w ciągu 24 godzin. Jeśli sprawa jest pilna, bo masz zapłacić dziś, napisz to w zgłoszeniu.",
  },
];

export default function SprawdzKontrahentaPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs items={[{ label: "Sprawdź kontrahenta" }]} />

        <section className="container-wide pt-6 pb-14">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              Sprawdzony kontrahent
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Sprawdź firmę, zanim wyślesz przelew
            </h1>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">
              Podajesz NIP, a jeśli masz, też numer konta i adres strony.
              Dostajesz jeden werdykt złożony z wykazu VAT, odpisu KRS i danych
              rejestrowych domeny, z wyjaśnieniem, co każdy sygnał oznacza dla
              Twoich pieniędzy.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <TrackedCTA
                href="#zamow"
                location="kontrahent_hero"
                className="btn-primary"
              >
                Sprawdź firmę od 9 zł
              </TrackedCTA>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Odpowiedź zwykle tego samego dnia
              </span>
            </div>
          </div>

          <div className="mt-12">
            <NipCheck />
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {checks.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/60 dark:bg-gray-900/40 p-6"
              >
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {c.title}
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Cennik
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 max-w-3xl">
              {pricing.map((t) => (
                <div
                  key={t.name}
                  className={`flex flex-col rounded-2xl border p-6 ${
                    t.featured
                      ? "border-accent/60 bg-white/80 dark:bg-gray-900/60"
                      : "border-gray-200/80 dark:border-gray-800/80 bg-white/60 dark:bg-gray-900/40"
                  }`}
                >
                  {t.featured && (
                    <span className="self-start rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                      Najczęściej wybierany
                    </span>
                  )}
                  <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {t.name}
                  </h3>
                  <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
                    {t.price}
                  </p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {t.desc}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {t.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <svg
                          className="mt-0.5 flex-shrink-0 text-accent"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M2.5 7l3 3 6-6"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#zamow"
                    className="btn-primary mt-6 w-full justify-center text-center text-sm"
                  >
                    Zamów {t.name.toLowerCase()}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Najczęstsze pytania
            </h2>
            <div className="mt-6 space-y-4">
              {faq.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/60 dark:bg-gray-900/40"
                >
                  <summary className="cursor-pointer p-5 text-sm font-semibold text-gray-900 dark:text-white select-none list-none [&::-webkit-details-marker]:hidden">
                    {item.q}
                  </summary>
                  <div className="px-5 pb-5 text-sm text-gray-600 dark:text-gray-400">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>

          <div id="zamow" className="mt-16 scroll-mt-20">
            <LandingForm
              formId="order_sprawdz_kontrahenta"
              heading="Zamów sprawdzenie kontrahenta"
              intro="W polu opisu podaj NIP firmy, a jeśli masz, także numer konta do przelewu i adres jej strony. Napisz, czy chcesz szybki check (9 zł) czy pełny raport (29 zł). Odsyłam PDF na maila."
              submitLabel="Wyślij firmę do sprawdzenia"
              microCopy="Odpowiedź zwykle tego samego dnia. Płatność ustalamy mailowo. Raport to analiza danych publicznych, nie porada prawna."
            />
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Sprawdzony kontrahent, raport ryzyka przed transakcją",
            description:
              "Weryfikacja firmy przed przelewem: wykaz VAT, odpis KRS, wiek domeny oraz sprawdzenie, czy numer konta figuruje w wykazie tej firmy. Szybki check 9 zł, pełny raport 29 zł.",
            provider: { "@id": "https://fluxlab.pl/#organization" },
            areaServed: { "@type": "Country", name: "Polska" },
            serviceType: "Weryfikacja kontrahenta",
            url: "https://fluxlab.pl/sprawdz-kontrahenta",
            offers: [
              {
                "@type": "Offer",
                name: "Szybki check",
                price: "9",
                priceCurrency: "PLN",
              },
              {
                "@type": "Offer",
                name: "Pełny raport",
                price: "29",
                priceCurrency: "PLN",
              },
            ],
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
