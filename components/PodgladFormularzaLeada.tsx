"use client";

import { useState } from "react";

export default function PodgladFormularzaLeada() {
  const [imie, setImie] = useState("Anna Nowak");
  const [email, setEmail] = useState("anna@example.pl");
  const [telefon, setTelefon] = useState("600 100 200");
  const [wiadomosc, setWiadomosc] = useState("Dzień dobry, proszę o wycenę montażu dachu na domu 120 m².");

  const pole = "rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent";
  const wiersze: [string, string][] = [
    ["Imię", imie],
    ["E-mail", email],
    ["Telefon", telefon],
    ["Wiadomość", wiadomosc],
  ];

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Wypełnij formularz i zobacz mail, który dostaniesz</h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Tak wygląda formularz na Twojej stronie. Obok powstaje mail ze zgłoszeniem. To podgląd, nic nie wysyłamy ani nie zapisujemy.
      </p>
      <div className="mt-5 grid gap-3">
        <input className={pole} value={imie} maxLength={120} onChange={(e) => setImie(e.target.value)} placeholder="Imię" aria-label="Imię" />
        <input className={pole} value={email} maxLength={120} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" aria-label="E-mail" />
        <input className={pole} value={telefon} maxLength={40} onChange={(e) => setTelefon(e.target.value)} placeholder="Telefon" aria-label="Telefon" />
        <textarea className={pole} rows={3} value={wiadomosc} maxLength={1000} onChange={(e) => setWiadomosc(e.target.value)} placeholder="W czym możemy pomóc?" aria-label="Wiadomość" />
      </div>
      <div className="mt-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/40 p-5 text-sm text-gray-900 dark:text-white">
        <p className="text-xs font-bold uppercase tracking-wider text-accent">Temat: Nowy lead: {imie.trim() || "bez imienia"}</p>
        <dl className="mt-3 grid gap-y-2">
          {wiersze
            .filter(([, v]) => v.trim())
            .map(([k, v]) => (
              <div key={k} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                <dt className="w-24 shrink-0 text-gray-500 dark:text-gray-400">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
        </dl>
        <p className="mt-4 text-accent">Wszystkie zgłoszenia i ustawienia</p>
      </div>
    </div>
  );
}
