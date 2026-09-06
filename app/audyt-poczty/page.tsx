"use client";

import { useState } from "react";

type Problem = { tytul: string; opis: string; waga: number };
type Wynik = {
  domena: string;
  mx: string[];
  dostawca: string;
  spf: string | null;
  dmarc: string | null;
  dkim: boolean;
  punkty: number;
  problemy: Problem[];
};

export default function AudytPoczty() {
  const [domena, setDomena] = useState("");
  const [laduje, setLaduje] = useState(false);
  const [blad, setBlad] = useState<string | null>(null);
  const [wynik, setWynik] = useState<Wynik | null>(null);

  async function sprawdz(e: React.FormEvent) {
    e.preventDefault();
    setBlad(null);
    setWynik(null);
    setLaduje(true);
    try {
      const r = await fetch("/api/audyt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domena }),
      });
      const d = await r.json();
      if (!r.ok) setBlad(d.error || "Coś poszło nie tak.");
      else setWynik(d);
    } catch {
      setBlad("Nie udało się połączyć. Spróbuj ponownie.");
    } finally {
      setLaduje(false);
    }
  }

  const kolor =
    wynik && wynik.punkty >= 90 ? "#16a34a" : wynik && wynik.punkty >= 60 ? "#d97706" : "#dc2626";

  return (
    <main className="container-wide" style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 1.5rem" }}>
      <span className="section-label">Bezpieczeństwo poczty</span>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: "0.5rem 0 1rem" }}>
        Sprawdź, czy ktoś może podszyć się pod Waszą firmową pocztę
      </h1>
      <p style={{ color: "#555", lineHeight: 1.6, marginBottom: "2rem" }}>
        Wpisz domenę firmy. W kilka sekund sprawdzimy publiczne rekordy SPF, DKIM i DMARC
        i pokażemy, czy Wasze maile z ofertami i fakturami docierają do klientów oraz czy
        ktoś obcy może wysyłać wiadomości w Waszym imieniu. Sprawdzamy tylko jawne dane DNS,
        nie logujemy się nigdzie i nie wysyłamy żadnych wiadomości.
      </p>

      <form onSubmit={sprawdz} style={{ display: "flex", gap: 8, marginBottom: "2rem" }}>
        <input
          value={domena}
          onChange={(e) => setDomena(e.target.value)}
          placeholder="np. twojafirma.pl"
          style={{ flex: 1, padding: "0.75rem 1rem", border: "1px solid #ccc", borderRadius: 8, fontSize: "1rem" }}
        />
        <button className="btn-primary" disabled={laduje || !domena.trim()} style={{ padding: "0.75rem 1.5rem" }}>
          {laduje ? "Sprawdzam..." : "Sprawdź"}
        </button>
      </form>

      {blad && <p style={{ color: "#dc2626" }}>{blad}</p>}

      {wynik && (
        <div style={{ border: "1px solid #e5e5e5", borderRadius: 12, padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "1rem" }}>
            <strong style={{ fontSize: "1.1rem" }}>{wynik.domena}</strong>
            <span style={{ fontSize: "1.5rem", fontWeight: 700, color: kolor }}>{wynik.punkty}/100</span>
          </div>
          <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "1rem" }}>
            Dostawca poczty: {wynik.dostawca}
          </p>

          {wynik.problemy.length === 0 ? (
            <p style={{ color: "#16a34a" }}>Konfiguracja jest poprawna. Nie ma nic do poprawy.</p>
          ) : (
            <>
              <p style={{ fontWeight: 600, marginBottom: "0.75rem" }}>
                Znaleźliśmy {wynik.problemy.length} {wynik.problemy.length === 1 ? "problem" : "problemy"}:
              </p>
              <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "0.75rem" }}>
                {wynik.problemy.map((p, i) => (
                  <li key={i} style={{ borderLeft: `3px solid ${kolor}`, paddingLeft: "0.75rem" }}>
                    <strong>{p.tytul}</strong>
                    <div style={{ color: "#555", fontSize: "0.9rem" }}>{p.opis}</div>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "1.5rem", padding: "1rem", background: "#f6f6f8", borderRadius: 8 }}>
                <p style={{ margin: "0 0 0.75rem", fontWeight: 600 }}>
                  Chcesz, żebym to uporządkował?
                </p>
                <p style={{ margin: "0 0 1rem", color: "#555", fontSize: "0.9rem" }}>
                  Wdrożenie SPF, DKIM i DMARC do poziomu, który realnie blokuje podszywanie,
                  z dwutygodniową obserwacją raportów. Napisz, a przygotuję wycenę.
                </p>
                <a href="/#kontakt" className="btn-primary" style={{ display: "inline-block", padding: "0.6rem 1.25rem" }}>
                  Chcę wycenę
                </a>
              </div>
            </>
          )}

          <details style={{ marginTop: "1.25rem" }}>
            <summary style={{ cursor: "pointer", color: "#666", fontSize: "0.85rem" }}>
              Pokaż surowe rekordy DNS
            </summary>
            <pre style={{ fontSize: "0.75rem", overflowX: "auto", background: "#fafafa", padding: "0.75rem", borderRadius: 6, marginTop: "0.5rem" }}>
{`MX:    ${wynik.mx.join(", ") || "brak"}
SPF:   ${wynik.spf || "brak"}
DMARC: ${wynik.dmarc || "brak"}
DKIM:  ${wynik.dkim ? "wykryto" : "nie wykryto"}`}
            </pre>
          </details>
        </div>
      )}
    </main>
  );
}
