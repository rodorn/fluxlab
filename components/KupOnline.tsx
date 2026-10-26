"use client";

import { useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";
import { OFERTA } from "@/lib/sprzedaz";
import { zl } from "@/lib/wycena";

export default function KupOnline({ id, className = "btn-primary" }: { id: string; className?: string }) {
  const o = OFERTA[id];
  const [kupuje, setKupuje] = useState(false);
  const [blad, setBlad] = useState("");

  async function kup() {
    zglosZdarzenie(`kup_${id}`);
    setKupuje(true);
    setBlad("");
    try {
      const r = await fetch("/api/zakup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const d = await r.json();
      if (!d.url) throw new Error(d.error);
      window.location.href = d.url;
    } catch (e) {
      setBlad((e as Error).message || "Płatność chwilowo niedostępna. Napisz do nas.");
      setKupuje(false);
    }
  }

  return (
    <span className="flex flex-col">
      <button type="button" onClick={kup} disabled={kupuje} className={`${className} disabled:opacity-60`}>
        {kupuje ? "Przechodzimy do płatności…" : `Kup online za ${zl(o.netto)}${o.miesiecznie ? "/mies." : ""} netto`}
      </button>
      {blad && (
        <span role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">
          {blad}
        </span>
      )}
    </span>
  );
}
