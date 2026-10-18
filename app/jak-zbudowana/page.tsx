import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CzasLadowania from "@/components/CzasLadowania";
import sitemap from "@/app/sitemap";
import { businessTools, otherTools } from "@/lib/narzedzia";

export const metadata: Metadata = {
  title: "Jak zbudowana jest ta strona | Fluxlab",
  description:
    "Next.js na Vercelu, własne narzędzia z AI i licznik wizyt bez ciasteczek. Krótko, z liczbami z repozytorium.",
  alternates: { canonical: "/jak-zbudowana" },
  openGraph: {
    title: "Jak zbudowana jest ta strona | Fluxlab",
    description: "Next.js, Vercel, własne narzędzia z AI, licznik bez ciasteczek.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab" }],
  },
};

export default function JakZbudowana() {
  const liczby = [
    { v: sitemap().length, o: "stron w mapie witryny" },
    { v: businessTools.length + otherTools.length, o: "darmowych narzędzi" },
  ];
  const wiersze = [
    ["Szkielet", "Next.js (App Router), React, Tailwind. Strony generują się z góry, więc wczytują się od razu."],
    ["Hosting", "Vercel. Każda zmiana ze zweryfikowanego repozytorium wchodzi na produkcję sama."],
    ["Narzędzia", "Własne sprawdzarki i kalkulatory. Część używa modeli AI po stronie serwera, z limitem zapytań."],
    ["Statystyki", "Własny licznik wizyt, bez ciasteczek. Losowy numer sesji ginie z zamknięciem karty."],
  ];
  return (
    <>
      <Header />
      <main className="pt-28 pb-20">
        <div className="container-wide max-w-3xl">
          <p className="section-label mb-3">Za kulisami</p>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Jak zbudowana jest ta strona
          </h1>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {liczby.map((l) => (
              <div
                key={l.o}
                className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60 p-5 text-center"
              >
                <p className="text-4xl font-bold tabular-nums text-accent">{l.v}</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{l.o}</p>
              </div>
            ))}
          </div>
          <dl className="mt-8 divide-y divide-gray-100 dark:divide-gray-800">
            {wiersze.map(([k, t]) => (
              <div key={k} className="py-4 sm:grid sm:grid-cols-[8rem_1fr] sm:gap-4">
                <dt className="font-semibold text-gray-900 dark:text-white">{k}</dt>
                <dd className="mt-1 sm:mt-0 text-gray-600 dark:text-gray-400">{t}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 rounded-xl bg-gray-50 dark:bg-gray-900/60 px-4 py-3 text-center text-sm text-gray-700 dark:text-gray-300">
            <CzasLadowania />
          </p>
          <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
            Zobacz też{" "}
            <a href="/zmiany" className="underline underline-offset-2 hover:text-accent">
              dziennik zmian
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
