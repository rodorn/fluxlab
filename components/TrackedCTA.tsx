"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { event as gaEvent } from "@/lib/gtag";
import { useSound } from "@/components/SoundProvider";

interface Props {
  href: string;
  location: string;
  label?: string;
  /** Optional named event – wysyłany OBOK zbiorczego `cta_click`. */
  eventName?: string;
  className?: string;
  children: ReactNode;
}

export default function TrackedCTA({
  href,
  location,
  label,
  eventName,
  className,
  children,
}: Props) {
  const { play } = useSound();
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
    play("click");
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
