"use client";

import { useState, type FormEvent } from "react";
import { event as gaEvent } from "@/lib/gtag";
import { zglosZdarzenie } from "@/lib/zdarzenie";
import { readUtm } from "@/lib/zrodlo";

const pole =
  "w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3.5 py-2.5 text-base text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors";
const etykieta =
  "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

export default function FormularzPolecenia() {
  const [stan, setStan] = useState<"" | "wysyla" | "wyslane">("");
  const [blad, setBlad] = useState("");

  async function wyslij(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    setStan("wysyla");
    setBlad("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: v("email"),
          company: v("biuro"),
          problemType: "polecenie_crm_posrednik",
          problemScale: "nie-wiemy",
          contactPref: "email",
          message: [
            `Polecający: ${v("imie") || "-"} (${v("email")})`,
            `Polecone biuro: ${v("biuro") || "-"}`,
            `Kontakt do poleconej osoby: ${v("kontakt")}`,
            v("info") && `Od polecającego: ${v("info")}`,
            "Polecający potwierdził, że ta osoba zgodziła się na kontakt.",
          ]
            .filter(Boolean)
            .join("\n"),
          website: v("website"),
          skad: "formularz polecenia",
          ...readUtm(),
        }),
      });
      if (!res.ok) {
        const p = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(p?.error ?? "");
      }
      if (!v("website")) {
        gaEvent("generate_lead", { form_id: "polecenie_crm_posrednik" });
        zglosZdarzenie("lead_polecenie");
      }
      setStan("wyslane");
    } catch (err) {
      setStan("");
      setBlad(
        (err instanceof Error && err.message) ||
          "Nie udało się wysłać. Napisz na pawel@fluxlab.pl.",
      );
    }
  }

  if (stan === "wyslane") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-accent/30 bg-accent/5 p-6 text-gray-800 dark:text-gray-200"
      >
        Dziękujemy. Odezwiemy się do poleconej osoby, a Tobie wyślemy
        potwierdzenie na podany adres.
      </div>
    );
  }

  return (
    <form onSubmit={wyslij} className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="pol-imie" className={etykieta}>
          Twoje imię
        </label>
        <input
          id="pol-imie"
          name="imie"
          autoComplete="given-name"
          className={pole}
        />
      </div>
      <div>
        <label htmlFor="pol-email" className={etykieta}>
          Twój e-mail
        </label>
        <input
          id="pol-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={pole}
        />
      </div>
      <div>
        <label htmlFor="pol-biuro" className={etykieta}>
          Kogo polecasz
        </label>
        <input
          id="pol-biuro"
          name="biuro"
          placeholder="imię albo nazwa biura"
          className={pole}
        />
      </div>
      <div>
        <label htmlFor="pol-kontakt" className={etykieta}>
          Telefon lub e-mail do tej osoby
        </label>
        <input id="pol-kontakt" name="kontakt" required className={pole} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="pol-info" className={etykieta}>
          Co warto wiedzieć (opcjonalnie)
        </label>
        <textarea id="pol-info" name="info" rows={2} className={pole} />
      </div>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <label className="sm:col-span-2 flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
        <input
          type="checkbox"
          required
          className="mt-1 h-4 w-4 accent-[rgb(var(--accent-solid))]"
        />
        Ta osoba wie, że się odezwiemy, i zgodziła się na kontakt.
      </label>
      {blad && (
        <p role="alert" className="sm:col-span-2 text-sm text-red-600">
          {blad}
        </p>
      )}
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={stan === "wysyla"}
          className="btn-primary"
        >
          {stan === "wysyla" ? "Wysyłanie…" : "Zgłoś polecenie"}
        </button>
      </div>
    </form>
  );
}
