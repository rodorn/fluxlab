"use client";

/**
 * Gotowa wiadomosc, ktora biuro rachunkowe wysyla swoim klientom przed
 * 1 stycznia 2027. Biuro ma kilkudziesieciu klientow, wiec jedno skopiowanie
 * tego tekstu to kilkadziesiat osob z adresem listy. Tekst stoi w HTML, przycisk
 * tylko go kopiuje.
 */

import { useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";

export const WIADOMOSC = [
  "Dzień dobry,",
  "",
  "1 stycznia 2027 kończą się przepisy przejściowe KSeF. Od tego dnia:",
  "- każda faktura dla firmy musi przejść przez KSeF, także te do 10 tys. zł miesięcznie, które dziś można jeszcze wystawiać poza systemem,",
  "- faktury z kasy rejestrującej, w tym paragony z NIP do 450 zł, też muszą przechodzić przez KSeF,",
  "- przelew za fakturę z KSeF między czynnymi podatnikami VAT ma zawierać jej numer KSeF,",
  "- faktura kosztowa jest otrzymana w dniu nadania jej numeru w KSeF, nawet jeśli nikt jej stamtąd nie pobrał.",
  "",
  "Prosimy o przejście sześciu pytań z tej listy, zajmuje to kilka minut: https://fluxlab.pl/ksef-2027",
  "Na końcu powstaje wykaz tego, co zostało do zrobienia. Prosimy go skopiować i odesłać nam w odpowiedzi na tę wiadomość, wtedy ustalimy, co trzeba zmienić przed styczniem.",
  "",
  "Pozdrawiamy",
].join("\n");

export default function WiadomoscKsefDlaKlientow() {
  const [skopiowano, setSkopiowano] = useState(false);

  async function kopiuj() {
    try {
      await navigator.clipboard.writeText(WIADOMOSC);
      setSkopiowano(true);
      zglosZdarzenie("uruchomiono_wiadomosc_ksef_2027");
    } catch {
      setSkopiowano(false);
    }
  }

  return (
    <div
      id="dla-biur"
      className="scroll-mt-24 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-gray-50/60 dark:bg-gray-900/40 p-6 md:p-8"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Dla biur rachunkowych: wiadomość do klientów
      </h2>
      <p className="mt-3 text-gray-600 dark:text-gray-300">
        Część klientów dowie się o końcu przepisów przejściowych dopiero z
        pierwszej odrzuconej faktury w styczniu. Poniżej jest gotowy tekst do
        wysłania im mailem. Klient przechodzi listę sam, a do biura wraca z
        konkretnym wykazem braków zamiast pytania „co z tym KSeF”. Tekst można
        dowolnie zmieniać, podpisać swoją nazwą i wysłać bez podawania nam
        czegokolwiek.
      </p>
      <pre className="mt-5 whitespace-pre-wrap break-words rounded-xl border border-gray-200/80 dark:border-gray-800/80 bg-white dark:bg-gray-950 p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200 font-sans">
        {WIADOMOSC}
      </pre>
      <button
        type="button"
        onClick={kopiuj}
        className="btn-primary mt-4 justify-center px-6 text-sm"
      >
        {skopiowano ? "Skopiowane, wklejcie w maila" : "Skopiuj wiadomość"}
      </button>
    </div>
  );
}
