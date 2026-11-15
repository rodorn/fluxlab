import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Połącz konto Google | Fluxlab",
  description: "Ostatni krok uruchomienia usługi: zgoda na dostęp do konta Google.",
  alternates: { canonical: "/polacz-google" },
  robots: { index: false, follow: false },
};

const BLEDY: Record<string, string> = {
  odmowa: "Zgoda nie została udzielona, więc usługa nie ruszy. Możesz spróbować ponownie.",
  zakresy: "Przy zgodzie trzeba zaznaczyć wszystkie pola na liście uprawnień. Spróbuj ponownie.",
  "1": "Nie udało się połączyć konta. Spróbuj ponownie, a jeśli się powtórzy, odpisz na mail od nas.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ sesja?: string; blad?: string }>;
}) {
  const { sesja, blad } = await searchParams;
  const poprawna = sesja && /^cs_(live|test)_[A-Za-z0-9]{20,}$/.test(sesja);
  return (
    <>
      <Header />
      <main className="px-4 pb-20 pt-32">
        <div className="mx-auto max-w-xl">
          <h1 className="h1-strony">Połącz konto Google</h1>
          {blad && <p className="mt-4 rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-950 dark:text-red-200">{BLEDY[blad] ?? BLEDY["1"]}</p>}
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Płatność przyjęta. Żeby usługa ruszyła, zaloguj się na konto Google, na którym ma pracować, i zaznacz wszystkie uprawnienia z listy.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-600 dark:text-gray-300">
            <li>Poczta jest tylko czytana: nic nie usuwamy, nie wysyłamy ani nie zmieniamy.</li>
            <li>Dysk: widzimy wyłącznie foldery i pliki, które sami utworzymy.</li>
            <li>Dostęp odwołasz w dowolnej chwili w ustawieniach konta Google.</li>
          </ul>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Google pokaże ostrzeżenie „Aplikacja nie jest zweryfikowana”. Kliknij „Zaawansowane”, a potem „Przejdź do fluxlab.pl”.
          </p>
          {poprawna ? (
            <a href={`/api/google/start?sesja=${sesja}`} className="btn-primary mt-8 inline-block">
              Połącz konto Google
            </a>
          ) : (
            <p className="mt-8 text-gray-600 dark:text-gray-300">Wejdź na tę stronę z linku po płatności.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
