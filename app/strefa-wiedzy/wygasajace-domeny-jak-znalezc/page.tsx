import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";

const OPIS = "Wygasające domeny .pl to tani sposób na dobry adres, ale nie każda jest warta zachodu. Jak je znaleźć, co sprawdzić w historii i kiedy lepiej wybrać wolną.";

export const metadata: Metadata = {
  title: "Wygasające domeny: jak znaleźć dobrą i nie przepłacić | Fluxlab",
  description: OPIS,
  openGraph: {
    title: "Wygasające domeny: jak znaleźć dobrą i nie przepłacić | Fluxlab",
    description: OPIS,
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, narzędzia i automatyzacja dla firm",
      },
    ],
  },
  alternates: {
    canonical: "/strefa-wiedzy/wygasajace-domeny-jak-znalezc",
  },
};

const faq: { q: string; a: string }[] = [
  { q: "Czy wygasającą domenę można przejąć od razu?", a: "Nie zawsze. Najpierw musi się zwolnić, czyli wrócić do puli, i dopiero wtedy każdy może ją zarejestrować, więc o adres konkuruje się z innymi chętnymi." },
  { q: "Czy domena z historią może zaszkodzić stronie?", a: "Może, jeśli wcześniej był na niej spam albo coś z czarnych list. Dlatego przed rejestracją sprawdza się, co było pod adresem." },
  { q: "Ile kosztuje sprawdzenie takich domen u nas?", a: "Raport o domenach to 29 zł netto jednorazowo, a codzienny monitoring do 20 domen to 9 zł netto miesięcznie, z rezygnacją w dowolnym dniu." },
];

export default function Article() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href="/strefa-wiedzy/wygasajace-domeny-jak-znalezc"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Wygasające domeny" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">
              Wygasające domeny: jak znaleźć dobrą i nie przepłacić
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Domena, której właściciel nie przedłużył, wraca do puli i można ją zarejestrować na swoje konto. Trzeba ją jednak znaleźć na czas i sprawdzić, co było pod tym adresem wcześniej.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">Skąd wiadomo, że domena wygasa</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Rejestr .pl publikuje listę domen zwalnianych, a część adresów trafia na aukcje domen. Każda pozycja ma datę zwolnienia, więc da się ją zaplanować, zamiast sprawdzać adres ręcznie co kilka dni. Wolne domeny pod konkretną frazę znajdziesz też zwykłą wyszukiwarką u rejestratora, ale ona nie pokaże adresów, które dopiero się zwalniają.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Co sprawdzić, zanim zarejestrujesz</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Po pierwsze historię: czy pod adresem była firma z tej samej branży, czy serwis ze spamem, bo taka domena potrafi ciągnąć za sobą złą reputację w wyszukiwarce. Po drugie linki wskazujące na domenę, po trzecie to, czy fraza w nazwie pasuje do tego, co sprzedajesz. Dobra, krótka domena z frazą branży nadal bywa lepsza niż długa nazwa wymyślona od zera.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Wolna domena czy wygasająca</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Wolną domenę rejestrujesz od ręki i od razu jest Twoja. Wygasająca bywa lepsza, bo ma już historię i krótką, znaną nazwę, ale musisz zdążyć przed innymi chętnymi i pogodzić się z tym, że nie zawsze się uda. Dlatego warto mieć listę kilku adresów, a nie jednego.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Kiedy zlecić to nam</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Jeśli nie chcesz sam przeglądać list, zrobi to <Link href="/skaner-domen" className="text-accent hover:underline">skaner domen</Link>: za 29 zł netto dostajesz raport do 48 godzin z wolnymi i wygasającymi adresami pod Twoje frazy albo nazwę firmy, razem z historią i naszą propozycją. Adresy, które Cię interesują, możemy też pilnować codziennie, od 9 zł netto miesięcznie. Domenę i tak rejestrujesz na swoje konto. Jeśli sprawdzasz, kto jest właścicielem już istniejącej domeny, zobacz <Link href="/wlasnosc-domeny" className="text-accent hover:underline">sprawdzenie właściciela domeny</Link>.
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
            <PrevNextArticle currentHref="/strefa-wiedzy/wygasajace-domeny-jak-znalezc" />
          </div>
        </div>
        <CTA
          naglowek="Znajdziemy wolne i wygasające domeny pod Twoją branżę"
          opis="Raport do 48 godzin za 29 zł netto, a wybrane adresy możemy pilnować codziennie za 9 zł netto miesięcznie."
          etykieta="Skaner domen"
          href="/skaner-domen"
        />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Wygasające domeny: jak znaleźć dobrą i nie przepłacić",
              description: OPIS,
              datePublished: "2026-11-19",
              author: { "@type": "Organization", name: "Fluxlab", url: "https://fluxlab.pl" },
              publisher: { "@type": "Organization", name: "Fluxlab", url: "https://fluxlab.pl" },
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
