import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Darmowe szablony do pobrania | Fluxlab",
  description:
    "Trzy krótkie pliki bez rejestracji: brief strony internetowej, checklista przed startem strony i checklista KSeF dla małej firmy.",
  alternates: { canonical: "/szablony" },
};

const SZABLONY = [
  {
    plik: "/szablony/brief-strony-internetowej.md",
    tytul: "Brief strony internetowej",
    opis: "15 pytań, które zadajemy przed wyceną strony. Odpowiedz hasłami i odeślij.",
  },
  {
    plik: "/szablony/checklista-przed-startem-strony.md",
    tytul: "Checklista przed startem strony",
    opis: "Treść, formularze, technika i to, co sprawdzić tydzień po starcie.",
  },
  {
    plik: "/szablony/checklista-ksef-dla-malej-firmy.md",
    tytul: "Checklista KSeF dla małej firmy",
    opis: "Dostęp, program do faktur, kontrahenci i awarie. Z podziałem na ciebie i księgową.",
  },
];

export default function Szablony() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs href="/szablony" kolumna="srodek" items={[{ label: "Szablony" }]} />
        <section className="pt-12 lg:pt-20 pb-20">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <p className="section-label mb-4">Szablony</p>
              <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Trzy pliki do pobrania, bez rejestracji
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Zwykłe pliki tekstowe, które otworzysz w każdym edytorze.
              </p>
            </div>
            <div className="max-w-5xl mx-auto sierota-md-3 grid md:grid-cols-3 gap-6">
              {SZABLONY.map((s) => (
                <a
                  key={s.plik}
                  href={s.plik}
                  download
                  className="group flex flex-col rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60 p-6 hover:border-accent/40 transition-colors"
                >
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors mb-2">
                    {s.tytul}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1 mb-5">
                    {s.opis}
                  </p>
                  <span className="text-sm font-medium text-accent">Pobierz plik .md</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
