"use client";

import Link from "next/link";
import { useKoszyk } from "@/lib/koszyk";

export default function LicznikKoszyka() {
  const n = useKoszyk().length;
  if (!n) return null;
  return (
    <Link
      href="/koszyk"
      aria-label={`Koszyk, pozycji: ${n}`}
      className="relative grid h-10 w-10 place-items-center rounded-lg text-gray-700 transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:text-gray-200"
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path
          d="M2.5 3.5h2.2l2.1 10.2a1.5 1.5 0 0 0 1.5 1.2h7.6a1.5 1.5 0 0 0 1.4-1.1l1.7-6.3H6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="18.3" r="1.3" fill="currentColor" />
        <circle cx="16" cy="18.3" r="1.3" fill="currentColor" />
      </svg>
      <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold leading-none text-white tabular-nums">
        {n}
      </span>
    </Link>
  );
}
