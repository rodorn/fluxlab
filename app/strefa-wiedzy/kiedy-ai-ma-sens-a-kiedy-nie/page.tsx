import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";

export const metadata: Metadata = {
  title: "Kiedy AI ma sens w firmie, a kiedy nie | Fluxlab",
  description:
    "Jak ocenić, czy AI ma sens w Twojej firmie. Prosty framework decyzji: wolumen, powtarzalność, jakość danych, koszt błędu i rola człowieka.",
  openGraph: {
    title: "Kiedy AI ma sens w firmie, a kiedy nie | Fluxlab",
    description:
      "Jak ocenić, czy AI ma sens w Twojej firmie. Prosty framework decyzji: wolumen, powtarzalność, jakość danych, koszt błędu i rola człowieka.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, Automatyzacja leadów, CRM i raportowania dla firm B2B",
      },
    ],
  },
  alternates: {
    canonical: "/strefa-wiedzy/kiedy-ai-ma-sens-a-kiedy-nie",
  },
};

export default function KiedyAiMaSensPage() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs kolumna="srodek"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Kiedy AI ma sens, a kiedy nie" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-label">Strefa wiedzy</span>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                Kiedy AI ma sens, a kiedy nie
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Drogo kosztuje zarówno AI wdrożone „bo wszyscy to robią", jak i
                AI odrzucone tam, gdzie szybko odciążyłoby zespół. Wystarczy
                prosty filtr.
              </p>
            </div>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Pięć pytań przed wdrożeniem
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 mb-6 list-disc pl-5">
              <li>Czy proces powtarza się często?</li>
              <li>Czy dane wejściowe są w miarę uporządkowane?</li>
              <li>Czy wynik da się ocenić jako dobry lub zły?</li>
              <li>Czy można dodać kontrolę człowieka?</li>
              <li>Czy oszczędność czasu lub jakości jest realna?</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
              Im więcej odpowiedzi „tak", tym większy sens ma wdrożenie. Proces
              rzadki, chaotyczny albo wymagający stuprocentowej trafności bez
              walidacji to zły kandydat.
            </p>

            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Najpierw proces, potem AI
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              AI nie naprawi słabego procesu. Najpierw ustalamy logikę,
              odpowiedzialność i przepływ danych w ramach{" "}
              <Link
                href="/automatyzacja-procesow-biznesowych"
                className="text-accent hover:underline"
              >
                automatyzacji procesów biznesowych
              </Link>
              , dopiero potem dokładamy warstwę{" "}
              <Link
                href="/automatyzacja-ai"
                className="text-accent hover:underline"
              >
                AI
              </Link>
              .
            </p>

            <div className="mt-10 bg-accent/10 rounded-2xl p-8 lg:p-12 text-center">
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Nie wiesz, czy AI ma sens w Twoim procesie?
              </p>
              <Link href="/automatyzacja-ai" className="btn-primary">
                Zobacz usługę Automatyzacja AI
              </Link>
            </div>

            <div className="mt-16">
              <PrevNextArticle currentHref="/strefa-wiedzy/kiedy-ai-ma-sens-a-kiedy-nie" />
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Kiedy AI ma sens, a kiedy nie",
            description:
              "Jak ocenić, czy AI ma sens w Twojej firmie. Prosty framework decyzji: wolumen, powtarzalność, jakość danych, koszt błędu i rola człowieka.",
            datePublished: "2026-03-30",
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
          }),
        }}
      />
    </>
  );
}
