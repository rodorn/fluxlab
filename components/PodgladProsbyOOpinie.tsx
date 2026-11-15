"use client";

import { useState } from "react";

export default function PodgladProsbyOOpinie() {
  const [firma, setFirma] = useState("Studio Dachy Kowalski");
  const [imie, setImie] = useState("Anna");

  const pole = "rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent";
  const f = firma.trim() || "Twoja firma";
  const i = imie.trim().split(" ")[0];

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Zobacz mail, który dostanie Twój klient</h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Wpisz nazwę firmy i imię klienta. Obok powstaje mail z prośbą o opinię. To podgląd, nic nie wysyłamy ani nie zapisujemy.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <input className={pole} value={firma} maxLength={120} onChange={(e) => setFirma(e.target.value)} placeholder="Nazwa firmy" aria-label="Nazwa firmy" />
        <input className={pole} value={imie} maxLength={120} onChange={(e) => setImie(e.target.value)} placeholder="Imię klienta" aria-label="Imię klienta" />
      </div>
      <div className="mt-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/40 p-5 text-sm text-gray-900 dark:text-white">
        <p className="text-xs font-bold uppercase tracking-wider text-accent">Temat: Jak oceniasz współpracę z firmą {f}?</p>
        <p className="mt-3">Dzień dobry{i ? ` ${i}` : ""},</p>
        <p className="mt-2">dziękujemy za współpracę z firmą {f}. Jeśli masz minutę, zostaw nam opinię w Google. To dla nas bardzo ważne.</p>
        <p className="mt-3"><span className="inline-block rounded-md bg-gray-900 dark:bg-white px-4 py-2.5 text-white dark:text-gray-900">Wystaw opinię w Google</span></p>
        <p className="mt-3">{f}</p>
      </div>
    </div>
  );
}
