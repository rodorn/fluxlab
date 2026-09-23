"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { zglosZdarzenie } from "@/lib/zdarzenie";

/**
 * Pole audytu tuż pod hasłem na stronie głównej.
 *
 * Stały wcześniej w tym miejscu trzy kafelki z własnymi badaniami, a pierwszy
 * z nich mówił, jaki odsetek salonów samochodowych da się podszyć mailowo.
 * Liczba jest prawdziwa i sam ją zmierzyłem, ale jako pierwsza treść po
 * nagłówku odpowiadała na pytanie, którego nikt nie zadał. Ktoś, kto prowadzi
 * biuro rachunkowe albo sklep, dowiadywał się z niej najpierw, że zajmuję się
 * salonami samochodowymi. Badania zeszły niżej, na miejsce dowodu, a tu jest
 * jedyna rzecz, która dotyczy każdego, kto tu trafił: jego własna strona.
 */
export default function PoleAudytu() {
  const router = useRouter();
  const [domena, setDomena] = useState("");

  function wyslij(e: React.FormEvent) {
    e.preventDefault();
    const czysta = domena.trim();
    if (!czysta) return;
    zglosZdarzenie("audyt_ze_strony_glownej");
    router.push(`/audyt-strony?domena=${encodeURIComponent(czysta)}`);
  }

  return (
    <div className="mt-5 max-w-2xl">
      <form onSubmit={wyslij} className="flex flex-col gap-2.5 sm:flex-row">
        <label htmlFor="domena-glowna" className="sr-only">
          Adres Twojej strony
        </label>
        <input
          id="domena-glowna"
          type="text"
          inputMode="url"
          value={domena}
          onChange={(e) => setDomena(e.target.value)}
          placeholder="twojafirma.pl"
          className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-accent dark:border-white/15 dark:bg-white/[0.04] dark:text-white"
        />
        <button type="submit" className="btn-primary justify-center px-5 py-2.5 text-sm">
          Zrób darmowy audyt
        </button>
      </form>
      <p className="mt-2 text-xs text-gray-500 dark:text-white/50">
        Zmierzę szybkość na komputerze i na telefonie, certyfikat, widoczność w
        wyszukiwarce i u asystentów AI oraz zabezpieczenia poczty. Raport na
        ekranie w kilkadziesiąt sekund, bez rejestracji i bez podawania adresu
        e-mail.
      </p>
    </div>
  );
}
