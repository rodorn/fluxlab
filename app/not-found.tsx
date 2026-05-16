import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Strona nie znaleziona | Fluxlab",
  robots: { index: false, follow: true },
};

const links = [
  {
    title: "Strony WWW",
    desc: "Nowa strona albo poprawki w obecnej",
    href: "/strony-www",
  },
  {
    title: "Automatyzacja CRM i leadów",
    desc: "Lead → CRM → handlowiec → raport",
    href: "/automatyzacja-leadow-crm",
  },
  {
    title: "Scraping danych",
    desc: "Web, PDF, maile, dokumenty",
    href: "/scraping-danych",
  },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative min-h-[75vh] flex items-center overflow-hidden bg-mesh">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="blob blob-accent animate-drift-slow top-[-15%] left-[-10%] w-[500px] h-[500px]" />
          <div className="blob blob-violet animate-drift bottom-[-25%] right-[-10%] w-[420px] h-[420px]" />
        </div>

        <div className="container-wide py-24 lg:py-32">
          <div className="max-w-2xl">
            <p className="display-2xl text-gradient-flow mb-2">404</p>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ta strona zgubiła się gdzieś w procesie.
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-10 max-w-xl">
              Adres nie istnieje albo został przeniesiony. Trochę ironiczne dla
              kogoś, kto zawodowo pilnuje, żeby nic nie ginęło — ale zdarza się.
              Wróć na stronę główną albo wybierz, czego szukasz.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 mb-10">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="card-lift block rounded-2xl p-5 bg-white/70 dark:bg-white/5 backdrop-blur-sm ring-1 ring-gray-200/60 dark:ring-white/10 hover:ring-accent/40 transition-all group"
                >
                  <p className="font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors mb-1">
                    {l.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">
                    {l.desc}
                  </p>
                </Link>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/" className="btn-primary">
                ← Wróć na stronę główną
              </Link>
              <Link href="/#kontakt" className="btn-secondary">
                Zamów bezpłatną diagnozę
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
