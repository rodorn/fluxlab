"use client";

import { useMemo } from "react";
import RezerwacjaOnline from "@/components/RezerwacjaOnline";
import { dniZeSlotami } from "@/lib/leady/rezerwacje";

export default function PodgladRezerwacji() {
  const dni = useMemo(() => dniZeSlotami({ dni: [1, 2, 3, 4, 5], od: 9 * 60, do: 15 * 60, krok: 60 }).slice(0, 7), []);
  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Wybierz termin tak, jak zrobią to Twoi klienci</h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Kliknij dzień i godzinę. To podgląd na przykładowych terminach, nic nie wysyłamy ani nie zapisujemy. W abonamencie ustawiasz własne dni, godziny i długość wizyty.
      </p>
      <div className="mt-5 rounded-xl bg-white p-4">
        <RezerwacjaOnline firma="Studio Dachy Kowalski" dni={dni} demo />
      </div>
    </div>
  );
}
