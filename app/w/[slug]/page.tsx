import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dane } from "@/lib/fl-dane";

export const dynamic = "force-dynamic";

type Miejsce = {
  nazwa: string;
  rodzaj: string;
  opis: string;
  adres: string;
  telefon: string;
  www: string;
  godziny: string[];
  ocena: number | null;
  liczba: number;
  opinie: { autor: string; ocena: number; tekst: string; kiedy: string }[];
  lat: number | null;
  lng: number | null;
  mapa: string;
  dziala: boolean;
  wygasa: string;
};

async function wczytaj(slug: string) {
  if (!/^[a-z0-9-]{3,80}$/.test(slug)) return null;
  const d = await dane("wizytowka").pobierz<Miejsce>("strony", slug);
  return d?.dane ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = await wczytaj(slug);
  return {
    title: m ? `${m.nazwa}${m.rodzaj ? `, ${m.rodzaj}` : ""}` : "Strona firmy",
    description: m ? `${m.nazwa}: adres, godziny otwarcia, telefon i opinie.` : undefined,
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = await wczytaj(slug);
  if (!m) notFound();

  if (m.wygasa && new Date(m.wygasa).getTime() < Date.now()) {
    return (
      <main style={{ maxWidth: 560, margin: "0 auto", padding: "72px 20px", fontFamily: "system-ui, sans-serif" }}>
        <h1 style={{ fontSize: 24, marginBottom: 12 }}>Ta strona wygasła</h1>
        <p style={{ color: "#555", lineHeight: 1.6 }}>
          Okres działania strony minął. Właściciel może ją przedłużyć na fluxlab.pl/strona-wizytowka.
        </p>
      </main>
    );
  }

  const gwiazdki = (n: number) => "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n));
  const mapaSrc =
    m.lat != null && m.lng != null
      ? `https://maps.google.com/maps?q=${m.lat},${m.lng}&z=16&output=embed`
      : null;

  return (
    <main style={{ maxWidth: 760, margin: "0 auto", padding: "40px 20px 64px", fontFamily: "system-ui, sans-serif", color: "#1a1a1a", lineHeight: 1.6 }}>
      {m.rodzaj && <p style={{ fontSize: 13, letterSpacing: 1, textTransform: "uppercase", color: "#666", margin: 0 }}>{m.rodzaj}</p>}
      <h1 style={{ fontSize: 34, margin: "6px 0 10px" }}>{m.nazwa}</h1>
      {m.ocena != null && (
        <p style={{ margin: "0 0 16px", fontSize: 16 }}>
          <span style={{ color: "#e6a100", letterSpacing: 2 }} aria-hidden>{gwiazdki(m.ocena)}</span>{" "}
          <strong>{String(m.ocena).replace(".", ",")}</strong> <span style={{ color: "#666" }}>({m.liczba} opinii w Google)</span>
        </p>
      )}
      {!m.dziala && <p style={{ background: "#fff3cd", padding: "8px 12px", borderRadius: 8 }}>Według Google firma jest obecnie zamknięta.</p>}
      {m.opis && <p style={{ fontSize: 18 }}>{m.opis}</p>}

      <section style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", margin: "28px 0" }}>
        <div>
          <h2 style={{ fontSize: 17, margin: "0 0 8px" }}>Kontakt</h2>
          {m.adres && <p style={{ margin: "0 0 6px" }}>{m.adres}</p>}
          {m.telefon && <p style={{ margin: "0 0 6px" }}><a href={`tel:${m.telefon.replace(/[^\d+]/g, "")}`}>{m.telefon}</a></p>}
          {m.www && <p style={{ margin: "0 0 6px" }}><a href={m.www} rel="noopener nofollow">{m.www.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</a></p>}
          {m.mapa && <p style={{ margin: 0 }}><a href={m.mapa} rel="noopener">Wyznacz trasę w Mapach Google</a></p>}
        </div>
        {m.godziny?.length > 0 && (
          <div>
            <h2 style={{ fontSize: 17, margin: "0 0 8px" }}>Godziny otwarcia</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {m.godziny.map((g) => <li key={g}>{g}</li>)}
            </ul>
          </div>
        )}
      </section>

      {mapaSrc && (
        <iframe
          title={`Mapa: ${m.nazwa}`}
          src={mapaSrc}
          loading="lazy"
          style={{ width: "100%", height: 320, border: 0, borderRadius: 12 }}
        />
      )}

      {m.opinie?.length > 0 && (
        <section style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: 22 }}>Opinie klientów</h2>
          {m.opinie.map((o, i) => (
            <figure key={i} style={{ margin: "0 0 16px", padding: "14px 16px", background: "#f6f6f6", borderRadius: 12 }}>
              <div style={{ color: "#e6a100", letterSpacing: 2 }} aria-hidden>{gwiazdki(o.ocena)}</div>
              <blockquote style={{ margin: "6px 0" }}>{o.tekst}</blockquote>
              <figcaption style={{ fontSize: 13, color: "#666" }}>{o.autor}{o.kiedy ? `, ${o.kiedy}` : ""}, opinia z Google</figcaption>
            </figure>
          ))}
        </section>
      )}

      <footer style={{ marginTop: 40, paddingTop: 16, borderTop: "1px solid #ddd", fontSize: 12, color: "#777" }}>
        Strona wygenerowana z publicznych danych wizytówki Google przez Fluxlab. Dane i opinie pochodzą z Google.
        Zobacz <a href="https://fluxlab.pl/strona-wizytowka">fluxlab.pl/strona-wizytowka</a>.
      </footer>
    </main>
  );
}
