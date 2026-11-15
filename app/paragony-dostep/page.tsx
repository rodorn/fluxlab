import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  adresKonta,
  linkArkusza,
  oplaconaSesja,
  wyslijMail,
  zalozKonto,
} from "@/lib/paragony";
import { esc } from "@/lib/dokumenty-mail";

export const metadata: Metadata = {
  title: "Adres do paragonów | Fluxlab",
  description: "Twój adres, na który wysyłasz zdjęcia paragonów.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/paragony-dostep" },
};
export const dynamic = "force-dynamic";

const KARTA =
  "mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:p-12";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ sesja?: string }>;
}) {
  const { sesja = "" } = await searchParams;
  const s = await oplaconaSesja(sesja);
  let wynik: Awaited<ReturnType<typeof zalozKonto>> | null = null;
  if (s) {
    try {
      wynik = await zalozKonto(s);
      if (wynik.nowe && wynik.konto.email) {
        const adres = adresKonta(wynik.token);
        await wyslijMail(
          wynik.konto.email,
          "Twój adres do paragonów",
          "Twój adres do paragonów",
          `<p style="margin:0 0 12px">Zdjęcia paragonów wysyłaj na adres:</p><p style="margin:0 0 12px"><b>${esc(adres)}</b></p><p style="margin:0">Arkusz z pozycjami: <a href="${linkArkusza(wynik.konto.arkusz)}">otwórz arkusz</a>. Adres i link są tajne, nie udostępniaj ich.</p>`,
        );
      }
    } catch {
      wynik = null;
    }
  }
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-wide">
          <div className={KARTA}>
            {!s || !wynik ? (
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Ta strona działa tylko z linku po opłaceniu zamówienia. Jeśli go
                nie masz, odpisz na mail od nas.
              </p>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Twój adres do paragonów
                </h1>
                <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                  Wyślij na ten adres zdjęcie paragonu jako załącznik maila.
                  Pozycja pojawi się w arkuszu, a na Twój adres przyjdzie
                  potwierdzenie.
                </p>
                <p className="mt-5 break-all rounded-lg bg-gray-50 px-4 py-3 font-mono text-sm text-gray-900 dark:bg-gray-900 dark:text-white">
                  {adresKonta(wynik.token)}
                </p>
                <ul className="mt-5 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
                  <li>Formaty: JPEG, PNG, WebP, GIF albo PDF, do 12 MB.</li>
                  <li>
                    W jednym mailu może być do 8 zdjęć, każde to osobna pozycja.
                  </li>
                  <li>Limit: 300 zdjęć w miesiącu.</li>
                  <li>
                    Zdjęcie z iPhone'a w formacie HEIC wyślij w rozmiarze
                    „Rzeczywisty” albo „Duży”, wtedy telefon zmieni je na JPEG.
                  </li>
                </ul>
                <a
                  href={linkArkusza(wynik.konto.arkusz)}
                  className="btn-primary mt-6 inline-block"
                >
                  Otwórz arkusz
                </a>
                <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                  Zapisz tę stronę w zakładkach albo skorzystaj z maila, który
                  właśnie wysłaliśmy. Adres i arkusz są tajne.
                </p>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
