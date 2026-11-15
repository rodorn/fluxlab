"use client";

import { useState } from "react";
import Link from "next/link";

import { zglosZdarzenie } from "@/lib/zdarzenie";

export default function RceZapis() {
  const [email, setEmail] = useState("");
  const [stan, setStan] = useState<"edycja" | "wysyla" | "nowy" | "juz">("edycja");
  const [blad, setBlad] = useState("");

  async function wyslij(e: React.FormEvent) {
    e.preventDefault();
    setBlad("");
    setStan("wysyla");
    try {
      const r = await fetch("/api/rce-zapis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const j = await r.json();
      if (!r.ok) {
        setBlad(j.error ?? "Nie udało się zapisać. Spróbuj ponownie.");
        setStan("edycja");
        return;
      }
      zglosZdarzenie("zapis_rce");
      setStan(j.stan === "juz" ? "juz" : "nowy");
    } catch {
      setBlad("Brak połączenia. Spróbuj ponownie.");
      setStan("edycja");
    }
  }

  if (stan === "nowy" || stan === "juz") {
    return (
      <div className="mt-8 rounded-2xl border border-accent/30 bg-accent/[0.04] p-6" role="status">
        <p className="text-base font-bold text-gray-900 dark:text-white">
          {stan === "nowy" ? `Pierwszy mail poszedł na ${email}.` : "Ten adres już dostaje codzienny mail."}
        </p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {stan === "nowy"
            ? "Kolejne przychodzą codziennie po 15:00, gdy operator opublikuje ceny na następną dobę. Jeśli nie widzisz maila za kilka minut, zajrzyj do spamu."
            : "Wypisać się można jednym kliknięciem w każdej wiadomości."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={wyslij}
      className="mt-8 rounded-2xl border border-gray-200/80 bg-white/70 p-6 dark:border-gray-800/80 dark:bg-gray-900/50"
    >
      <p className="text-base font-bold text-gray-900 dark:text-white">Te ceny codziennie na maila</p>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Po 15:00 dostajesz ceny na następną dobę: najlepsze 4 i 2 godziny na zużycie, godziny do ominięcia i tabelę
        godzina po godzinie. Za darmo, wypis jednym kliknięciem.
      </p>
      <label className="mt-4 block">
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">E-mail</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          placeholder="ty@domena.pl"
          className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-accent dark:border-gray-700 dark:bg-gray-900"
        />
      </label>
      {blad && (
        <p role="alert" className="mt-3 text-sm text-red-700 dark:text-red-400">
          {blad}
        </p>
      )}
      <button type="submit" disabled={stan === "wysyla"} className="btn-primary mt-4 disabled:opacity-60">
        {stan === "wysyla" ? "Zapisywanie…" : "Wyślij mi ceny"}
      </button>
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        Zapisując się, zgadzasz się na codzienny mail z cenami energii od FluxLab. Adres służy tylko do tej wysyłki.{" "}
        <Link href="/polityka-prywatnosci" className="text-accent underline underline-offset-2">
          Polityka prywatności
        </Link>
      </p>
    </form>
  );
}
