import type { Metadata } from "next";

import LandingFormularz from "@/components/LandingFormularz";
import { aktywnaStrona } from "@/lib/landing";
import { KOLORY } from "@/lib/landing-kolory";

export const dynamic = "force-dynamic";

type P = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const s = await aktywnaStrona(slug);
  return {
    title: s ? `${s.naglowek} | ${s.nazwa}`.slice(0, 70) : "Strona wyłączona",
    description: s ? s.opis.slice(0, 155) : undefined,
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: P) {
  const { slug } = await params;
  const s = await aktywnaStrona(slug);
  const ramka = { fontFamily: "-apple-system,Segoe UI,Roboto,Arial,sans-serif", color: "#111827", maxWidth: 560, margin: "0 auto", padding: "24px 16px" } as const;
  if (!s)
    return (
      <main style={ramka}>
        <p style={{ color: "#4b5563" }}>Strona jest wyłączona.</p>
      </main>
    );
  const barwa = KOLORY[s.kolor] ?? KOLORY.niebieski;
  return (
    <main style={ramka}>
      <p style={{ margin: "0 0 8px", fontSize: 14, color: barwa, fontWeight: 600 }}>{s.nazwa}</p>
      <h1 style={{ margin: "0 0 12px", fontSize: 28, lineHeight: 1.2 }}>{s.naglowek}</h1>
      <p style={{ margin: "0 0 16px", fontSize: 16, lineHeight: 1.55, whiteSpace: "pre-line" }}>{s.opis}</p>
      {s.punkty.length > 0 && (
        <ul style={{ margin: "0 0 20px", paddingLeft: 20, fontSize: 16, lineHeight: 1.6 }}>
          {s.punkty.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}
      {s.telefon && (
        <p style={{ margin: "0 0 20px", fontSize: 16 }}>
          Zadzwoń: <a href={`tel:${s.telefon.replace(/[^\d+]/g, "")}`} style={{ color: barwa, fontWeight: 600 }}>{s.telefon}</a>
        </p>
      )}
      <div style={{ background: "#f9fafb", borderRadius: 16, padding: 16 }}>
        <LandingFormularz slug={s.slug} nazwa={s.nazwa} przycisk={s.przycisk} kolor={s.kolor} />
      </div>
      <p style={{ marginTop: 16, fontSize: 11, lineHeight: 1.45, color: "#6b7280" }}>
        Dane z formularza trafiają do {s.nazwa} i są przechowywane przez Fluxlab do 30 dni. Strona działa na platformie Fluxlab.
      </p>
    </main>
  );
}
