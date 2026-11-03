"use client";

import { useEffect } from "react";
import { event as gaEvent } from "@/lib/gtag";
import { zglosZdarzenie } from "@/lib/zdarzenie";

export default function PomiarFormularzy() {
  useEffect(() => {
    const zaczete = new WeakSet<HTMLFormElement>();
    const naFokus = (e: FocusEvent) => {
      const pole = e.target as HTMLElement | null;
      if (!pole?.matches?.("input, textarea, select")) return;
      const form = pole.closest("form");
      if (!form || form.dataset.pomiar === "wlasny" || zaczete.has(form)) return;
      zaczete.add(form);
      const id =
        form.id || form.getAttribute("aria-label") || `formularz${location.pathname}`;
      gaEvent("form_start", { form_id: id });
      zglosZdarzenie("form_start");
    };
    document.addEventListener("focusin", naFokus);
    return () => document.removeEventListener("focusin", naFokus);
  }, []);
  return null;
}
