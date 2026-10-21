"use client";

import { useState } from "react";
import Image from "next/image";

// Rozmyty podgląd 8x5 px w kolorze strony, widoczny, zanim dojdzie AVIF.
const PODGLAD =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDUiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9IiNlZWYyZmYiLz48L3N2Zz4=";

/** Dwa zrzuty jeden na drugim; suwak odsłania nową wersję. */
export default function PrzedPo({
  przed,
  po,
  alt,
  szer,
  wys,
}: {
  przed: string;
  po: string;
  alt: [string, string];
  szer: number;
  wys: number;
}) {
  const [x, ustawX] = useState(50);
  return (
    <div className="przed-po relative select-none">
      <Image src={przed} alt={alt[0]} width={szer} height={wys} quality={90} placeholder="blur" blurDataURL={PODGLAD} sizes="(min-width: 1024px) 1024px, 100vw" className="h-auto w-full" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${x}%)` }}>
        <Image src={po} alt={alt[1]} width={szer} height={wys} quality={90} placeholder="blur" blurDataURL={PODGLAD} sizes="(min-width: 1024px) 1024px, 100vw" className="h-auto w-full" />
      </div>
      <span className="absolute left-3 top-3 rounded-full bg-gray-900/75 px-3 py-1 text-xs font-medium text-white backdrop-blur">
        Przed
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-accent-solid px-3 py-1 text-xs font-medium text-white">
        Po
      </span>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_12px_rgba(0,0,0,0.35)]" style={{ left: `${x}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-accent shadow-lg">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 5l-4 5 4 5M13 5l4 5-4 5" />
          </svg>
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={0.5}
        value={x}
        onChange={(e) => ustawX(+e.target.value)}
        aria-label="Porównaj starą i nową stronę"
        className="absolute inset-0 h-full w-full cursor-ew-resize"
      />
    </div>
  );
}
