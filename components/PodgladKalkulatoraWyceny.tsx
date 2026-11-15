"use client";

import KalkulatorWyceny from "@/components/KalkulatorWyceny";

const POZYCJE = [
  { nazwa: "Przegląd dachu", cena: 350 },
  { nazwa: "Naprawa rynien", cena: 900 },
  { nazwa: "Wymiana obróbek blacharskich", cena: 1800 },
  { nazwa: "Malowanie dachu", cena: 4200 },
];

export default function PodgladKalkulatoraWyceny() {
  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Wypróbuj kalkulator, który zobaczą Twoi klienci</h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Zaznacz usługi i zobacz sumę. To podgląd na przykładowych pozycjach, nic nie wysyłamy ani nie zapisujemy. W abonamencie wpisujesz własne usługi i ceny.
      </p>
      <div className="mt-5 rounded-xl bg-white p-4">
        <KalkulatorWyceny firma="Studio Dachy Kowalski" pozycje={POZYCJE} demo />
      </div>
    </div>
  );
}
