"use client";

import { useState } from "react";
import RelatedProducts from "@/components/RelatedProducts";
import Przyklady from "@/components/Przyklady";
import { zglosZdarzenie } from "@/lib/zdarzenie";

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

export default function AudytPocztyKlient({
  nazwa,
  children,
}: {
  nazwa: React.ReactNode;
  children: React.ReactNode;
}) {
  const [domena, setDomena] = useState("");
  const [laduje, setLaduje] = useState(false);
  const [blad, setBlad] = useState<string | null>(null);
  const [wynik, setWynik] = useState<Wynik | null>(null);
  const [leadEmail, setLeadEmail] = useState("");
  const [leadStan, setLeadStan] = useState<"idle" | "laduje" | "ok" | "blad">(
    "idle",
  );

  async function zamowRaport(e: React.FormEvent) {
    e.preventDefault();
    if (!wynik) return;
    setLeadStan("laduje");
    const podsumowanie = [
      `Audyt poczty z narzędzia na stronie.`,
      `Domena: ${wynik.domena} (ocena ${wynik.punkty}/100)`,
      `Problemy: ${wynik.problemy.map((p) => p.tytul).join("; ")}`,
      `SPF: ${wynik.spf || "brak"} | DMARC: ${wynik.dmarc || "brak"}`,
    ].join("\n");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: leadEmail,
          company: wynik.domena,
          problemType: "Audyt bezpieczeństwa poczty",
          problemScale: `${wynik.punkty}/100`,
          contactPref: "email",
          message: podsumowanie,
        }),
      });
      setLeadStan(r.ok ? "ok" : "blad");
    } catch {
      setLeadStan("blad");
    }
  }

  async function sprawdz(e: React.FormEvent) {
    e.preventDefault();
    await uruchom(domena);
  }

  // Jedno wejscie dla formularza i dla przyciskow z przykladami, zeby
  // wynik powstawal tak samo niezaleznie od tego, skad przyszedl adres.
  async function uruchom(cel: string) {
    if (!cel.trim()) return;
    setDomena(cel);
    zglosZdarzenie("uruchomiono_skan");
    setBlad(null);
    setWynik(null);
    setLaduje(true);
    try {
      const r = await fetch("/api/audyt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domena: cel }),
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
    wynik && wynik.punkty >= 90
      ? "#16a34a"
      : wynik && wynik.punkty >= 60
        ? "#d97706"
        : "#dc2626";

  return (
    <main
      className="container-wide"
      style={{ maxWidth: 720, margin: "0 auto", padding: "7rem 1.5rem 4rem" }}
    >
      <span className="section-label">Bezpieczeństwo poczty</span>
      <h1
        style={{ fontSize: "2rem", fontWeight: 700, margin: "0.5rem 0 1rem" }}
      >
        Sprawdź, czy ktoś może podszyć się pod Waszą firmową pocztę
      </h1>
      <p className="text-gray-600 dark:text-gray-300" style={{ lineHeight: 1.6, marginBottom: "2rem" }}>
        Wpisz domenę firmy. W kilka sekund sprawdzimy publiczne rekordy SPF,
        DKIM i DMARC i pokażemy, czy Wasze maile z ofertami i fakturami
        docierają do klientów oraz czy ktoś obcy może wysyłać wiadomości w
        Waszym imieniu. Sprawdzamy tylko jawne dane DNS, nie logujemy się
        nigdzie i nie wysyłamy żadnych wiadomości.
      </p>

      {nazwa}
      <Przyklady
        pozycje={[
          { wartosc: "fluxlab.pl" },
          { wartosc: "allegro.pl" },
          { wartosc: "x-kom.pl" },
        ]}
        onWybor={uruchom}
        zablokowane={laduje}
        wstep="Nie masz pod ręką swojej domeny? Zobacz na gotowym przykładzie:"
      />

      <form
        onSubmit={sprawdz}
        style={{ display: "flex", gap: 8, marginBottom: "2rem" }}
      >
        <input
          value={domena}
          onChange={(e) => setDomena(e.target.value)}
          placeholder="np. twojafirma.pl"
          style={{
            flex: 1,
            minWidth: 0,
            padding: "0.75rem 1rem",
            border: "1px solid #ccc",
            borderRadius: 8,
            fontSize: "1rem",
          }}
        />
        <button
          className="btn-primary"
          disabled={laduje || !domena.trim()}
          style={{ padding: "0.75rem 1.5rem" }}
        >
          {laduje ? "Sprawdzamy..." : "Sprawdź"}
        </button>
      </form>

      {blad && <p style={{ color: "var(--stan-zle)" }}>{blad}</p>}

      {wynik && (
        <div
          style={{
            border: "1px solid #e5e5e5",
            borderRadius: 12,
            padding: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <strong style={{ fontSize: "1.1rem" }}>{wynik.domena}</strong>
            <span style={{ fontSize: "1.5rem", fontWeight: 700, color: kolor }}>
              {wynik.punkty}/100
            </span>
          </div>
          <p
            style={{ color: "var(--article-muted)", fontSize: "0.9rem", marginBottom: "1rem" }}
          >
            Dostawca poczty: {wynik.dostawca}
          </p>

          {wynik.problemy.length === 0 ? (
            <p style={{ color: "var(--stan-dobrze)" }}>
              Konfiguracja jest poprawna. Nie ma nic do poprawy.
            </p>
          ) : (
            <>
              <p style={{ fontWeight: 600, marginBottom: "0.75rem" }}>
                Znaleźliśmy {wynik.problemy.length}{" "}
                {wynik.problemy.length === 1 ? "problem" : "problemy"}:
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "grid",
                  gap: "0.75rem",
                }}
              >
                {wynik.problemy.map((p, i) => (
                  <li
                    key={i}
                    style={{
                      borderLeft: `3px solid ${kolor}`,
                      paddingLeft: "0.75rem",
                    }}
                  >
                    <strong>{p.tytul}</strong>
                    <div style={{ color: "var(--article-muted)", fontSize: "0.9rem" }}>
                      {p.opis}
                    </div>
                  </li>
                ))}
              </ul>
              <div
                style={{
                  marginTop: "1.5rem",
                  padding: "1rem",
                  background: "var(--article-box)",
                  borderRadius: 8,
                }}
              >
                <p style={{ margin: "0 0 0.75rem", fontWeight: 600 }}>
                  Chcecie, żebyśmy to uporządkowali?
                </p>
                <p
                  style={{
                    margin: "0 0 1rem",
                    color: "var(--article-muted)",
                    fontSize: "0.9rem",
                  }}
                >
                  Pełny raport z audytu (co dokładnie jest źle i gotowe rekordy
                  do wklejenia) to 19 zł. Ekspresowa naprawa, czyli ustawienie
                  SPF, DKIM i DMARC w trybie, który realnie blokuje podszywanie,
                  to 299 zł. Zostaw adres, a wyślemy raport dla{" "}
                  <strong>{wynik.domena}</strong> i wycenę naprawy. Bez
                  zobowiązań.
                </p>
                {leadStan === "ok" ? (
                  <p style={{ color: "var(--stan-dobrze)", fontWeight: 600, margin: 0 }}>
                    Dziękujemy. Raport dla {wynik.domena} przygotujemy i odpiszemy na{" "}
                    {leadEmail}.
                  </p>
                ) : (
                  <form
                    onSubmit={zamowRaport}
                    style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
                  >
                    <input
                      type="email"
                      required
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      placeholder="Twój adres e-mail"
                      style={{
                        flex: "1 1 220px",
                        padding: "0.6rem 0.9rem",
                        border: "1px solid #ccc",
                        borderRadius: 8,
                      }}
                    />
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={leadStan === "laduje"}
                      style={{ padding: "0.6rem 1.25rem" }}
                    >
                      {leadStan === "laduje"
                        ? "Wysyłamy..."
                        : "Wyślij mi raport i wycenę"}
                    </button>
                    {leadStan === "blad" && (
                      <span
                        style={{
                          color: "var(--stan-zle)",
                          flexBasis: "100%",
                          fontSize: "0.85rem",
                        }}
                      >
                        Nie udało się wysłać. Spróbuj ponownie za chwilę.
                      </span>
                    )}
                  </form>
                )}
              </div>
            </>
          )}

          <details style={{ marginTop: "1.25rem" }}>
            <summary
              style={{ cursor: "pointer", color: "var(--article-muted)", fontSize: "0.85rem" }}
            >
              Pokaż surowe rekordy DNS
            </summary>
            <pre
              style={{
                fontSize: "0.75rem",
                overflowX: "auto",
                background: "var(--article-box)",
                padding: "0.75rem",
                borderRadius: 6,
                marginTop: "0.5rem",
              }}
            >
              {`MX:    ${wynik.mx.join(", ") || "brak"}
SPF:   ${wynik.spf || "brak"}
DMARC: ${wynik.dmarc || "brak"}
DKIM:  ${wynik.dkim ? "wykryto" : "nie wykryto"}`}
            </pre>
          </details>
        </div>
      )}
      {children}
      <div className="container-wide">
        <RelatedProducts slug="audyt-poczty" />
      </div>
    </main>
  );
}
