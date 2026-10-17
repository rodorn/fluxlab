"use client";

import Link from "next/link";

export default function KartaPoswiata({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  function ruch(e: React.MouseEvent<HTMLAnchorElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <Link
      href={href}
      onMouseMove={ruch}
      className={`karta-poswiata ${className ?? ""}`}
    >
      {children}
    </Link>
  );
}
