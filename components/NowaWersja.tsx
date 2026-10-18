"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Karta otwarta przed wdrożeniem trzyma stary kod, bo nawigacja w Next.js
 *  nie przeładowuje strony. Co 5 minut i po powrocie do karty pytamy
 *  /api/wersja; gdy wyszło nowe wdrożenie, przeładowujemy przy najbliższej
 *  zmianie strony albo od razu, jeśli karta była w tle. */

let pierwsza: string | null = null;
let nowa = false;

async function sprawdz(): Promise<boolean> {
  try {
    const r = await fetch("/api/wersja", { cache: "no-store" });
    const { wersja } = (await r.json()) as { wersja: string };
    if (pierwsza === null) pierwsza = wersja;
    else if (wersja !== pierwsza) nowa = true;
  } catch {}
  return nowa;
}

export default function NowaWersja() {
  const sciezka = usePathname();

  useEffect(() => {
    sprawdz();
    const t = window.setInterval(sprawdz, 5 * 60_000);
    const widocznosc = async () => {
      if (document.visibilityState === "visible" && (await sprawdz())) location.reload();
    };
    document.addEventListener("visibilitychange", widocznosc);
    return () => {
      window.clearInterval(t);
      document.removeEventListener("visibilitychange", widocznosc);
    };
  }, []);

  useEffect(() => {
    if (nowa) location.reload();
  }, [sciezka]);

  return null;
}
