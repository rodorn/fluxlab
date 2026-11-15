"use client";

import { useState } from "react";

export default function PodgladOdpowiedziLeada() {
  const [firma, setFirma] = useState("Studio Dachy Kowalski");
  const [oferta, setOferta] = useState("Wycena dachu w 24 godziny, bezpłatny pomiar na miejscu.\nMontaż zaczynamy zwykle w ciągu dwóch tygodni od akceptacji.");
  const [kalendarz, setKalendarz] = useState("https://kalendarz.example.pl/rozmowa");

  const pole = "rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent";
  const nazwa = firma.trim() || "Nasza firma";

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Zobacz, co dostanie klient w minutę po zgłoszeniu</h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Wpisz nazwę firmy, ofertę i link do kalendarza. Obok powstaje mail, który wyślemy osobie zostawiającej zgłoszenie. Nic nie zapisujemy.
      </p>
      <div className="mt-5 grid gap-3">
        <input className={pole} value={firma} maxLength={120} onChange={(e) => setFirma(e.target.value)} placeholder="Nazwa firmy" aria-label="Nazwa firmy" />
        <textarea className={pole} rows={4} value={oferta} maxLength={2000} onChange={(e) => setOferta(e.target.value)} placeholder="Krótka oferta" aria-label="Treść oferty" />
        <input className={pole} type="url" value={kalendarz} maxLength={300} onChange={(e) => setKalendarz(e.target.value)} placeholder="Link do kalendarza, https://..." aria-label="Link do kalendarza" />
      </div>
      <div className="mt-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/40 p-5 text-sm text-gray-900 dark:text-white">
        <p className="text-xs font-bold uppercase tracking-wider text-accent">Temat: Dziękujemy za zgłoszenie: {nazwa}</p>
        <p className="mt-3">Dzień dobry Anno,</p>
        <p className="mt-3">dziękujemy za zgłoszenie do firmy {nazwa}. Odezwiemy się najszybciej, jak to możliwe.</p>
        {oferta
          .split("\n")
          .filter((a) => a.trim())
          .map((a, i) => (
            <p key={i} className="mt-3">
              {a}
            </p>
          ))}
        {kalendarz.startsWith("https://") && (
          <p className="mt-3">
            <span className="inline-block rounded-md bg-gray-900 dark:bg-white px-5 py-3 text-white dark:text-gray-900">Umów rozmowę w kalendarzu</span>
          </p>
        )}
      </div>
    </div>
  );
}
