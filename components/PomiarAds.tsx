"use client";

import { useEffect } from "react";
import { konwersjaAds } from "@/lib/gtag";

/** Konwersja Google Ads po udanym zgłoszeniu: każda odpowiedź ok z /api/contact.
 *  Zgłoszenia, w których bot wypełnił ukryte pole "website", nie liczą się. */
export default function PomiarAds() {
  useEffect(() => {
    const oryginal = window.fetch;
    window.fetch = async (...args: Parameters<typeof fetch>) => {
      const res = await oryginal.apply(window, args);
      try {
        const [we, init] = args;
        const url = typeof we === "string" ? we : we instanceof URL ? we.href : we.url;
        if (res.ok && init?.method === "POST" && new URL(url, location.href).pathname === "/api/contact") {
          const body = typeof init.body === "string" ? JSON.parse(init.body) : {};
          const bot = typeof body.website === "string" && body.website.trim().length > 0;
          if (!bot) konwersjaAds("formularz");
        }
      } catch {}
      return res;
    };
    return () => {
      window.fetch = oryginal;
    };
  }, []);
  return null;
}
