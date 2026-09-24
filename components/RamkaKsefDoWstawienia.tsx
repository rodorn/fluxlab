"use client";

/**
 * Ramka o KSeF 2027 do wklejenia na strone biura rachunkowego albo firmy,
 * ktora pisze do klientow w zakladce "Aktualnosci". Czysty HTML ze stylami w
 * atrybutach, bez skryptu i bez iframe, zeby wkleil sie tak samo w WordPressie,
 * Joomli i edytorach kreatorow stron. Kazde wklejenie to staly link do listy,
 * czyli dokladnie to, czego strona nie ma: odnosnik z zewnatrz.
 */

import { useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";

export const RAMKA_HTML = `<div style="border:1px solid #d1d5db;border-radius:12px;padding:20px;max-width:640px;font-family:inherit;line-height:1.5">
<p style="margin:0 0 8px;font-size:1.15em;font-weight:bold">KSeF od 1 stycznia 2027: co się zmienia</p>
<p style="margin:0 0 8px">Tego dnia kończą się przepisy przejściowe Krajowego Systemu e-Faktur:</p>
<ul style="margin:0 0 12px;padding-left:20px;list-style:disc">
<li>każda faktura dla firmy musi przejść przez KSeF, także te do 10 tys. zł miesięcznie, które dziś można wystawiać poza systemem,</li>
<li>faktury z kasy rejestrującej, w tym paragony z NIP do 450 zł, też muszą przechodzić przez KSeF,</li>
<li>przelew za fakturę z KSeF między czynnymi podatnikami VAT ma zawierać jej numer KSeF,</li>
<li>faktura kosztowa jest otrzymana w dniu nadania jej numeru w KSeF, nawet jeśli nikt jej stamtąd nie pobrał.</li>
</ul>
<p style="margin:0"><a href="https://fluxlab.pl/ksef-2027">Lista kontrolna KSeF na 2027: sześć pytań i wykaz braków dla księgowej</a>, bezpłatnie i bez rejestracji. Źródło: Fluxlab.</p>
</div>`;

export default function RamkaKsefDoWstawienia() {
  const [skopiowano, setSkopiowano] = useState(false);

  async function kopiuj() {
    try {
      await navigator.clipboard.writeText(RAMKA_HTML);
      setSkopiowano(true);
      zglosZdarzenie("uruchomiono_ramka_ksef_2027");
    } catch {
      setSkopiowano(false);
    }
  }

  return (
    <div
      id="na-strone"
      className="scroll-mt-24 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-gray-50/60 dark:bg-gray-900/40 p-6 md:p-8"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Na stronę biura: ramka do wklejenia
      </h2>
      <p className="mt-3 text-gray-600 dark:text-gray-300">
        Jeżeli prowadzicie na stronie zakładkę z aktualnościami dla klientów,
        możecie wkleić tam poniższą ramkę. To zwykły HTML bez skryptów: w
        WordPressie wklejcie go w blok „Własny HTML”, w innych edytorach w tryb
        kodu. Wygląda tak:
      </p>
      <div
        className="mt-5 rounded-xl bg-white dark:bg-gray-950 p-4 text-gray-800 dark:text-gray-200 [&_a]:text-accent [&_a]:underline"
        dangerouslySetInnerHTML={{ __html: RAMKA_HTML }}
      />
      <pre className="mt-5 max-h-56 overflow-auto whitespace-pre-wrap break-all rounded-xl border border-gray-200/80 dark:border-gray-800/80 bg-white dark:bg-gray-950 p-4 text-xs leading-relaxed text-gray-700 dark:text-gray-300">
        {RAMKA_HTML}
      </pre>
      <button
        type="button"
        onClick={kopiuj}
        className="btn-primary mt-4 justify-center px-6 text-sm"
      >
        {skopiowano
          ? "Skopiowane, wklejcie w edytor strony"
          : "Skopiuj kod ramki"}
      </button>
    </div>
  );
}
