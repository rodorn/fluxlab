import type { Metadata } from "next";

import NewsletterForm from "@/components/NewsletterForm";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = { title: "Zapis na newsletter", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: { searchParams: Promise<{ k?: string }> }) {
  const { k } = await searchParams;
  if (!k) return <NewsletterForm nazwa="Przykładowy blog" demo />;
  let c: { metadata?: Record<string, string> } | null = null;
  if (/^cus_[A-Za-z0-9]+$/.test(k)) c = await stripe(`customers/${k}`).catch(() => null);
  const m = c?.metadata;
  if (!m || m.fl_produkt !== "newsletter" || m.fl_aktywna !== "1")
    return <p style={{ fontFamily: "Arial", padding: 16, color: "#4b5563" }}>Formularz jest wyłączony.</p>;
  return <NewsletterForm nazwa={m.nazwa || "Newsletter"} k={k} />;
}
