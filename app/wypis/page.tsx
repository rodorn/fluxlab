import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Wypis z maili | Fluxlab",
  description: "Potwierdzenie wypisu z wiadomości od Fluxlab.",
  alternates: { canonical: "/wypis" },
  robots: { index: false, follow: false },
};

export default async function WypisPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; blad?: string }>;
}) {
  const { ok } = await searchParams;
  return (
    <>
      <Header />
      <main className="container-wide flex min-h-[60vh] flex-col items-center justify-center pt-28 pb-20 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {ok ? "Wypisane" : "Nie udało się wypisać"}
        </h1>
        <p className="mt-4 max-w-md text-gray-600 dark:text-gray-400">
          {ok
            ? "Nie wyślemy już do Ciebie żadnej wiadomości. Zgoda została wycofana."
            : "Link jest niepełny albo wygasł. Odpisz „wypisz mnie” na dowolną wiadomość od nas albo napisz na pawel@fluxlab.pl, a wypiszemy Cię ręcznie."}
        </p>
        <Link href="/" className="btn-secondary mt-8">
          Wróć na stronę główną
        </Link>
      </main>
      <Footer />
    </>
  );
}
