"use client";

import { usePathname } from "next/navigation";
import SwiatloFraktal from "./SwiatloFraktal";

export default function TloPodstrony() {
  const sciezka = usePathname();
  if (!sciezka || sciezka === "/") return null;
  let hz = 0;
  for (const ch of sciezka) hz = (hz * 31 + ch.charCodeAt(0)) % 1000;
  return (
    <div aria-hidden="true" className="tlo-podstrony">
      <SwiatloFraktal key={sciezka} odcien="podstrona" ziarno={hz / 1000} />
    </div>
  );
}
