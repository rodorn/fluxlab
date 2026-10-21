"use client";

import dynamic from "next/dynamic";

// Strona 404 trafia do ładunku każdej podstrony (jako rezerwowa). Osobny, mały
// punkt wejścia sprawia, że jej Header, Footer i reszta nie są pobierane na
// zwykłych stronach, tylko gdy faktycznie pokazuje się 404.
const Strona404Calosc = dynamic(() => import("@/components/Strona404Calosc"));

export default function Pelna404() {
  return <Strona404Calosc />;
}
