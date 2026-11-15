import type { Metadata } from "next";

import LandingFormularz from "@/components/LandingFormularz";

export const metadata: Metadata = { title: "Formularz landingu", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: 16, fontFamily: "-apple-system,Segoe UI,Roboto,Arial,sans-serif", color: "#111827" }}>
      <LandingFormularz slug="demo" nazwa="Przykładowa Firma" przycisk="Wyślij zapytanie" kolor="niebieski" demo />
    </div>
  );
}
