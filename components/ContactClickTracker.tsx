"use client";

import { useEffect } from "react";
import { event as gaEvent } from "@/lib/gtag";

/**
 * Globalny tracker kliknięć w `mailto:` i `tel:` linki.
 * Dołącza jeden capture listener na dokument — bez zmieniania
 * istniejących <a> w komponentach.
 */
export default function ContactClickTracker() {
  useEffect(() => {
    if (typeof document === "undefined") return;

    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";

      if (href.startsWith("mailto:")) {
        gaEvent("email_click", {
          href,
          location: window.location.pathname,
        });
      } else if (href.startsWith("tel:")) {
        gaEvent("phone_click", {
          href,
          location: window.location.pathname,
        });
      }
    }

    document.addEventListener("click", handleClick, { capture: true });
    return () =>
      document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}
