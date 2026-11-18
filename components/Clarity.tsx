"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { CLARITY_ID } from "@/lib/clarity";

type Clarity = ((...a: unknown[]) => void) & { q?: unknown[][] };

declare global {
  interface Window {
    clarity?: Clarity;
  }
}

function zgodaClarity(): boolean {
  try {
    return (
      localStorage.getItem("fluxlab_zgoda") === "tak" &&
      localStorage.getItem("fluxlab_zgoda_clarity") === "tak"
    );
  } catch {
    return false;
  }
}

/** Microsoft Clarity tylko po „Akceptuj” w banerze z wersji obejmującej Clarity
 *  (fluxlab_zgoda_clarity). Bez zgody, bez NEXT_PUBLIC_CLARITY_ID, w panelu
 *  i w osadzeniach skrypt się nie ładuje. */
export default function Clarity() {
  const sciezka = usePathname() || "";
  const wykluczona = /^\/(panel|panel-zwrotow|embed)(\/|$)/.test(sciezka);

  useEffect(() => {
    if (!CLARITY_ID || wykluczona) return;
    const sprawdz = () => {
      if (!zgodaClarity() || window.clarity) return;
      const c: Clarity = (...a: unknown[]) => {
        (c.q = c.q || []).push(a);
      };
      window.clarity = c;
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://www.clarity.ms/tag/" + CLARITY_ID;
      document.head.append(s);
      c("consentv2", { ad_Storage: "denied", analytics_Storage: "granted" });
    };
    const zegar = setTimeout(sprawdz, 2500);
    window.addEventListener("fluxlab-zgoda", sprawdz);
    return () => {
      clearTimeout(zegar);
      window.removeEventListener("fluxlab-zgoda", sprawdz);
    };
  }, [wykluczona]);

  return null;
}
