"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { event as gaEvent } from "@/lib/gtag";
import { zglosZdarzenie } from "@/lib/zdarzenie";
import { readUtm } from "@/lib/zrodlo";

/** Kontakt w dwóch polach na górze strony: adres i jedno zdanie. */
export default function SzybkiKontakt({
  formId,
  temat,
  podpowiedz = "Czego potrzebujecie?",
}: {
  formId: string;
  temat: string;
  podpowiedz?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [blad, setBlad] = useState<string | null>(null);

  async function wyslij(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setBlad(null);
    const f = e.currentTarget;
    const pole = (n: string) =>
      (f.elements.namedItem(n) as HTMLInputElement | null)?.value ?? "";
    const dane = {
      email: pole("email"),
      company: "",
      problemType: temat,
      problemScale: "nie-wiemy",
      message: pole("message"),
      contactPref: "email",
      website: pole("website"),
      ...readUtm(),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dane),
      });
      if (res.ok) {
        if (!dane.website.trim()) {
          gaEvent("generate_lead", { form_id: `${formId}_szybki` });
          zglosZdarzenie("lead_szybki");
        }
        router.push(`/dziekuje?type=${encodeURIComponent(temat)}`);
        return;
      }
      const p = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      setBlad(
        p?.error ?? "Nie udało się wysłać. Napiszcie na pawel@fluxlab.pl.",
      );
    } catch {
      setBlad("Problem z połączeniem. Napiszcie na pawel@fluxlab.pl.");
    }
    setLoading(false);
  }

  const pole =
    "w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent";

  return (
    <form onSubmit={wyslij} className="mt-8 max-w-2xl">
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${formId}-www`}>Nie wypełniaj tego pola</label>
        <input
          id={`${formId}-www`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <label className="sr-only" htmlFor={`${formId}-email`}>
          E-mail
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          required
          placeholder="Wasz e-mail"
          className={pole}
        />
        <label className="sr-only" htmlFor={`${formId}-msg`}>
          Czego potrzebujecie
        </label>
        <input
          id={`${formId}-msg`}
          name="message"
          placeholder={podpowiedz}
          className={pole}
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-primary justify-center whitespace-nowrap"
        >
          {loading ? "Wysyłamy…" : "Wyślijcie"}
        </button>
      </div>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Odpisujemy mailem zwykle tego samego dnia, z ceną i terminem.
      </p>
      {blad && <p className="mt-2 text-sm text-red-600">{blad}</p>}
    </form>
  );
}
