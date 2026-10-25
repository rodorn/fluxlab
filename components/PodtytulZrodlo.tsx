"use client";

import { useEffect, useState } from "react";

const DOMYSLNY = "Strona, formularze i automatyzacje, które oszczędzają czas. Cena z góry, gotowe w 2\u2060–\u20603\u00a0tygodnie.";

const WARIANTY: Record<string, string> = {
  linkedin: "Lead B2B trafia od razu do handlowca, bez przepisywania. Cena z góry, gotowe w 2\u2060–\u20603\u00a0tygodnie.",
  google: "Strona, z której zapytania trafiają prosto na Twoją skrzynkę. Cena z góry, gotowe w 2\u2060–\u20603\u00a0tygodnie.",
};

function zrodlo(): string | null {
  const p = new URLSearchParams(window.location.search);
  const s = `${p.get("utm_source") ?? ""} ${p.get("utm_campaign") ?? ""}`.toLowerCase();
  if (s.includes("linkedin")) return "linkedin";
  if (s.includes("facebook") || /\b(fb|meta|instagram)\b/.test(s)) return "facebook";
  if (s.includes("google")) return "google";
  if (s.trim()) return null;
  let host = "";
  try {
    host = new URL(document.referrer).hostname.toLowerCase();
  } catch {
    return null;
  }
  if (host.includes("linkedin.") || host === "lnkd.in") return "linkedin";
  if (host.includes("facebook.") || host.includes("fb.com") || host.includes("instagram.")) return "facebook";
  if (/(^|\.)google\./.test(host)) return "google";
  return null;
}

export default function PodtytulZrodlo() {
  const [tekst, setTekst] = useState(DOMYSLNY);

  useEffect(() => {
    try {
      const z = zrodlo();
      if (z && WARIANTY[z]) setTekst(WARIANTY[z]);
    } catch {}
  }, []);

  return (
    <p className="animate-fade-up-1 mx-auto mt-7 max-w-xl text-lg text-gray-600 sm:text-xl lg:max-w-none lg:whitespace-nowrap dark:text-white/65">
      {tekst}
    </p>
  );
}
