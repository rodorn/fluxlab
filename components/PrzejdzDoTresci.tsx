"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PrzejdzDoTresci() {
  const sciezka = usePathname();
  useEffect(() => {
    const main = document.querySelector("main");
    if (main && !main.id) main.id = "tresc";
  }, [sciezka]);
  return (
    <a
      href="#tresc"
      onClick={(e) => {
        const main = document.querySelector("main");
        if (!main) return;
        e.preventDefault();
        main.tabIndex = -1;
        main.focus();
        main.scrollIntoView();
      }}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-gray-900 focus:shadow-lg"
    >
      Przejdź do treści
    </a>
  );
}
