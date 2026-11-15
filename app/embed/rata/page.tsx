import type { Metadata } from "next";

import KalkulatorRaty from "@/components/KalkulatorRaty";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = { title: "Kalkulator raty", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const liczba = (s: string | undefined, d: number) => {
  const n = Number((s ?? "").replace(",", "."));
  return Number.isFinite(n) && n >= 0 && n <= 40 && s ? n : d;
};

export default async function Page({ searchParams }: { searchParams: Promise<{ k?: string }> }) {
  const { k } = await searchParams;
  if (!k)
    return <KalkulatorRaty nazwa="Przykładowy komis" kontakt="biuro@example.pl" oprocKredyt={9.9} oprocLeasing={7.5} demo />;
  let c: { metadata?: Record<string, string> } | null = null;
  if (/^cus_[A-Za-z0-9]+$/.test(k)) c = await stripe(`customers/${k}`).catch(() => null);
  const m = c?.metadata;
  if (!m || m.fl_produkt !== "rata-komis" || m.fl_aktywna !== "1")
    return <p style={{ fontFamily: "Arial", padding: 16, color: "#4b5563" }}>Kalkulator jest wyłączony.</p>;
  return (
    <KalkulatorRaty
      nazwa={m.nazwa || "naszego komisu"}
      kontakt={m.kontakt}
      oprocKredyt={liczba(m.oproc, 9.9)}
      oprocLeasing={liczba(m.oproc_leasing, liczba(m.oproc, 7.5))}
    />
  );
}
