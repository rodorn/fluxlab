"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { event as gaEvent } from "@/lib/gtag";
import useMagnetic from "@/lib/use-magnetic";

interface Props {
  href: string;
  location: string;
  label?: string;
  /** Optional named event – wysyłany OBOK zbiorczego `cta_click`. */
  eventName?: string;
  className?: string;
  /** Wymuś / wyłącz magnetic (domyślnie: auto-on gdy btn-primary w className). */
  magnetic?: boolean;
  children: ReactNode;
}

export default function TrackedCTA({
  href,
  location,
  label,
  eventName,
  className,
  magnetic,
  children,
}: Props) {
  const autoMagnetic = (className ?? "").includes("btn-primary");
  const useMag = magnetic ?? autoMagnetic;
  const linkRef = useMagnetic<HTMLAnchorElement>({ strength: 5 });

  const handleClick = () => {
    const params = {
      location,
      label: label ?? (typeof children === "string" ? children : ""),
      href,
    };
    gaEvent("cta_click", params);
    if (eventName) {
      gaEvent(eventName, params);
    }
  };

  const finalClassName = useMag
    ? `magnetic ${className ?? ""}`.trim()
    : className;
  const refToUse = useMag ? linkRef : undefined;

  const isInternal = href.startsWith("/") && !href.startsWith("//");
  if (isInternal) {
    return (
      <Link
        ref={refToUse}
        href={href}
        onClick={handleClick}
        className={finalClassName}
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      ref={refToUse}
      href={href}
      onClick={handleClick}
      className={finalClassName}
    >
      {children}
    </a>
  );
}
