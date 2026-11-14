"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const PIKSEL = "2310289413195039";

type Fbq = ((...a: unknown[]) => void) & {
  callMethod?: (...a: unknown[]) => void;
  queue: unknown[];
  loaded: boolean;
  version: string;
  push: unknown;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

function zgodaMeta(): boolean {
  try {
    return (
      localStorage.getItem("fluxlab_zgoda") === "tak" &&
      localStorage.getItem("fluxlab_zgoda_meta") === "tak"
    );
  } catch {
    return false;
  }
}

/** Piksel Meta tylko po „Akceptuj” w banerze z wersji obejmującej Meta
 *  (fluxlab_zgoda_meta, od 14.11.2026). Bez zgody skrypt Meta się nie ładuje.
 *  Ładuje się po pierwszym malowaniu, żeby nie spowalniać strony. */
export default function PikselMeta() {
  const sciezka = usePathname();
  const [wlaczony, setWlaczony] = useState(false);

  useEffect(() => {
    const sprawdz = () => {
      if (!zgodaMeta() || window.fbq) return;
      const f = function (...a: unknown[]) {
        if (f.callMethod) f.callMethod(...a);
        else f.queue.push(a);
      } as Fbq;
      f.push = f;
      f.loaded = true;
      f.version = "2.0";
      f.queue = [];
      window.fbq = f;
      window._fbq = f;
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.append(s);
      f("init", PIKSEL);
      setWlaczony(true);
    };
    const zegar = setTimeout(sprawdz, 2500);
    window.addEventListener("fluxlab-zgoda", sprawdz);
    return () => {
      clearTimeout(zegar);
      window.removeEventListener("fluxlab-zgoda", sprawdz);
    };
  }, []);

  useEffect(() => {
    if (wlaczony) window.fbq?.("track", "PageView");
  }, [wlaczony, sciezka]);

  return null;
}
