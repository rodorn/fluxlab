"use client";

import { useState } from "react";

const POLE =
  "mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-white";

export default function FormularzNagrania() {
  const [stan, setStan] = useState<"" | "trwa" | "ok" | "blad">("");
  const [komunikat, setKomunikat] = useState("");

  async function wyslij(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    setStan("trwa");
    try {
      const r = await fetch("/api/nagranie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: d.get("email"),
          produkt: d.get("produkt"),
          link: d.get("link"),
        }),
      });
      const j = await r.json();
      setKomunikat(j.komunikat ?? j.error ?? "Nie udało się wysłać.");
      setStan(r.ok ? "ok" : "blad");
    } catch {
      setKomunikat("Nie udało się wysłać. Spróbuj za chwilę.");
      setStan("blad");
    }
  }

  return (
    <form onSubmit={wyslij} className="mt-8 space-y-5">
      <label className="block text-sm font-semibold text-gray-900 dark:text-white">
        Adres e-mail z płatności
        <input name="email" type="email" required autoComplete="email" className={POLE} />
      </label>
      <label className="block text-sm font-semibold text-gray-900 dark:text-white">
        Usługa
        <select name="produkt" required className={POLE} defaultValue="transkrypcja-nagran">
          <option value="transkrypcja-nagran">Transkrypcja nagrań ze streszczeniem</option>
          <option value="protokol-spotkania">Protokół ze spotkania z listą zadań</option>
        </select>
      </label>
      <label className="block text-sm font-semibold text-gray-900 dark:text-white">
        Link do pliku z nagraniem
        <input
          name="link"
          type="url"
          required
          placeholder="https://www.dropbox.com/..."
          className={POLE}
        />
        <span className="mt-1 block text-xs font-normal text-gray-600 dark:text-gray-300">
          Plik mp3, m4a, wav, ogg, flac, webm lub mp4, do 25 MB, udostępniony każdemu, kto ma link
          (Dropbox, Dysk Google albo inny bezpośredni link).
        </span>
      </label>
      <button
        type="submit"
        disabled={stan === "trwa"}
        className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white disabled:opacity-60"
      >
        {stan === "trwa" ? "Wysyłanie…" : "Wyślij nagranie"}
      </button>
      {stan && stan !== "trwa" && (
        <p
          role="status"
          className={stan === "ok" ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}
        >
          {komunikat}
        </p>
      )}
    </form>
  );
}
