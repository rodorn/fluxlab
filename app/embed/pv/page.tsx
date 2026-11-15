import type { Metadata } from "next";

import KalkulatorPv from "@/components/KalkulatorPv";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = { title: "Kalkulator fotowoltaiki", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const cena = (s: string | undefined, d: number) => {
  const n = Number((s ?? "").replace(",", "."));
  return Number.isFinite(n) && n >= 500 && n <= 20000 ? n : d;
};

export default async function Page({ searchParams }: { searchParams: Promise<{ k?: string }> }) {
  const { k } = await searchParams;
  if (!k) return <KalkulatorPv nazwa="Przykładowy instalator" kontakt="biuro@example.pl" cenaKwp={4500} cenaKwh={2000} demo />;
  let c: { metadata?: Record<string, string> } | null = null;
  if (/^cus_[A-Za-z0-9]+$/.test(k)) c = await stripe(`customers/${k}`).catch(() => null);
  const m = c?.metadata;
  if (!m || m.fl_produkt !== "pv" || m.fl_aktywna !== "1")
    return <p style={{ fontFamily: "Arial", padding: 16, color: "#4b5563" }}>Kalkulator jest wyłączony.</p>;
  return <KalkulatorPv nazwa={m.nazwa || "nasza firma"} kontakt={m.kontakt} cenaKwp={cena(m.cena_kwp, 4500)} cenaKwh={cena(m.cena_kwh, 2000)} />;
}
