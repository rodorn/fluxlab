"use client";

import { useState } from "react";

type Props = { nazwa: string; k?: string; demo?: boolean };

export default function NewsletterForm({ nazwa, k, demo }: Props) {
  const [email, setEmail] = useState("");
  const [firma, setFirma] = useState("");
  const [stan, setStan] = useState<"" | "trwa" | "ok" | "blad">("");
  const [blad, setBlad] = useState("");

  async function wyslij(e: React.FormEvent) {
    e.preventDefault();
    if (demo || !k) return setStan("ok");
    setStan("trwa");
    const r = await fetch("/api/newsletter-zapis", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ k, email, firma }) }).catch(() => null);
    if (r?.ok) return setStan("ok");
    setBlad(((await r?.json().catch(() => null)) as { error?: string } | null)?.error ?? "Coś poszło nie tak. Spróbuj ponownie.");
    setStan("blad");
  }

  return (
    <div className="nl">
      <style>{CSS}</style>
      <h1>Newsletter: {nazwa}</h1>
      {stan === "ok" ? (
        <p className="ok" aria-live="polite">
          {demo ? "To wersja demonstracyjna, nic nie wysyłamy." : "Sprawdź skrzynkę i kliknij link potwierdzający zapis."}
        </p>
      ) : (
        <form onSubmit={wyslij}>
          <label>
            Twój adres e-mail
            <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <input className="pulapka" tabIndex={-1} autoComplete="off" aria-hidden="true" value={firma} onChange={(e) => setFirma(e.target.value)} name="firma" />
          <button type="submit" disabled={stan === "trwa"}>
            Zapisz mnie
          </button>
          {stan === "blad" && <p className="blad">{blad}</p>}
          <p className="uwaga">
            Dostaniesz maila z potwierdzeniem, a potem wiadomość przy każdym nowym wpisie. W każdej jest link do wypisu. Wysyłkę obsługuje Fluxlab.{demo ? " Wersja demonstracyjna." : ""}
          </p>
        </form>
      )}
    </div>
  );
}

const CSS = `
.nl{max-width:480px;margin:0 auto;padding:16px;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#111827}
.nl h1{font-size:18px;margin:0 0 12px}
.nl label{display:block;font-size:14px;margin:0 0 12px}
.nl input[type=email]{display:block;width:100%;box-sizing:border-box;margin-top:6px;padding:11px;font-size:16px;border:1px solid #d1d5db;border-radius:10px}
.nl .pulapka{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}
.nl button{display:block;width:100%;background:#0b57d0;color:#fff;border:0;padding:13px;border-radius:10px;font-size:16px;font-weight:600;cursor:pointer}
.nl button:disabled{opacity:.6}
.nl .ok{font-size:15px;line-height:1.5;background:#f3f4f6;border-radius:12px;padding:14px}
.nl .blad{font-size:14px;color:#b91c1c;margin:10px 0 0}
.nl .uwaga{font-size:11px;line-height:1.45;color:#6b7280;margin:12px 0 0}
`;
