"use client";

import { useEffect, useState } from "react";
import { INNE, SKAD } from "@/lib/skad";

export default function SkadWiesz({
  id,
  onChange,
  etykieta,
  pole,
}: {
  id: string;
  onChange?: (v: string) => void;
  etykieta: string;
  pole: string;
}) {
  const [wybor, setWybor] = useState("");
  const [tekst, setTekst] = useState("");
  const wartosc = wybor === "inne" && tekst.trim() ? `${INNE}${tekst.trim()}` : wybor;

  useEffect(() => {
    onChange?.(wartosc);
  }, [wartosc, onChange]);

  return (
    <div>
      <label htmlFor={id} className={etykieta}>
        Skąd o nas wiesz? <span className="text-gray-600 dark:text-gray-400 font-normal text-xs">(opcjonalnie)</span>
      </label>
      <select id={id} value={wybor} onChange={(e) => setWybor(e.target.value)} className={pole}>
        <option value="">wybierz</option>
        {SKAD.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      {wybor === "inne" && (
        <input
          type="text"
          aria-label="Skąd dokładnie?"
          placeholder="Skąd dokładnie?"
          maxLength={70}
          value={tekst}
          onChange={(e) => setTekst(e.target.value)}
          className={`${pole} mt-2`}
        />
      )}
      <input type="hidden" name="skad" value={wartosc} />
    </div>
  );
}
