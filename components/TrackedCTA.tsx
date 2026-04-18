"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { event as gaEvent } from "@/lib/gtag";

interface Props {
  href: string;
  location: string;
  label?: string;
  className?: string;
  children: ReactNode;
}

export default function TrackedCTA({
  href,
  location,
  label,
  className,
  children,
}: Props) {
  const handleClick = () => {
    gaEvent("cta_click", {
      location,
      label: label ?? (typeof children === "string" ? children : ""),
      href,
    });
  };

  const isInternal = href.startsWith("/") && !href.startsWith("//");
  if (isInternal) {
    return (
      <Link href={href} onClick={handleClick} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
