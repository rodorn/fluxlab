"use client";

import { useEffect } from "react";
import { zagraj } from "@/lib/dzwiek";

// Tik przy elementach sterujących (nie przy zwykłych linkach, bo te zmieniają
// stronę), akord przy wyniku narzędzia, zapisie i skopiowaniu.
const STERUJACE =
  'button, summary, [role="tab"], [role="switch"], input[type="checkbox"], input[type="radio"]';
const WYNIK = /^(wynik_|audyt_wynik|zapis_email|skopiowano_)/;

export default function Dzwieki() {
  useEffect(() => {
    const klik = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.(STERUJACE);
      if (
        !el ||
        el.closest("[data-bez-dzwieku]") ||
        (el as HTMLButtonElement).disabled
      )
        return;
      zagraj("tik");
    };
    const zdarzenie = (e: Event) => {
      if (WYNIK.test((e as CustomEvent<string>).detail)) zagraj("wynik");
    };
    document.addEventListener("click", klik, { capture: true, passive: true });
    window.addEventListener("fl:zdarzenie", zdarzenie);
    return () => {
      document.removeEventListener("click", klik, { capture: true });
      window.removeEventListener("fl:zdarzenie", zdarzenie);
    };
  }, []);
  return null;
}
