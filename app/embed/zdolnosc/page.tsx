import type { Metadata } from "next";

import KalkulatorZdolnosci from "@/components/KalkulatorZdolnosci";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = { title: "Kalkulator zdolności kredytowej", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const liczba = (s: string | undefined, d: number) => {
  const n = Number((s ?? "").replace(",", "."));
  return Number.isFinite(n) && n >= 0 && n <= 40 && s ? n : d;
};

export default async function Page({ searchParams }: { searchParams: Promise<{ k?: string }> }) {
  const { k } = await searchParams;
  if (!k) return <KalkulatorZdolnosci nazwa="Przykładowe biuro kredytowe" kontakt="biuro@example.pl" oproc={7.5} demo />;
  let c: { metadata?: Record<string, string> } | null = null;
  if (/^cus_[A-Za-z0-9]+$/.test(k)) c = await stripe(`customers/${k}`).catch(() => null);
  const m = c?.metadata;
  if (!m || m.fl_produkt !== "zdolnosc" || m.fl_aktywna !== "1")
    return <p style={{ fontFamily: "Arial", padding: 16, color: "#4b5563" }}>Kalkulator jest wyłączony.</p>;
  return <KalkulatorZdolnosci nazwa={m.nazwa || "nasze biuro"} kontakt={m.kontakt} oproc={liczba(m.oproc, 7.5)} />;
}
