"use client";

import { useEffect } from "react";

export default function TytulKarty() {
  useEffect(() => {
    let zapamietany: string | null = null;
    const onChange = () => {
      if (document.hidden) {
        zapamietany = document.title;
        document.title = "Wróć, mamy dla Ciebie cenę | Fluxlab";
      } else if (zapamietany !== null) {
        document.title = zapamietany;
        zapamietany = null;
      }
    };
    document.addEventListener("visibilitychange", onChange);

    const w = window as unknown as { __fluxlabKonsola?: boolean };
    if (!w.__fluxlabKonsola) {
      w.__fluxlabKonsola = true;
      console.log(
        "%cZaglądasz pod maskę? Ta strona to Next.js na Vercelu. Szukasz partnera do projektu: pawel@fluxlab.pl",
        "color:#4f46e5;font-weight:bold;font-size:13px",
      );
    }
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);
  return null;
}
