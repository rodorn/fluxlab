"use client";

import { useState } from "react";

import { zglosZdarzenie } from "@/lib/zdarzenie";

/**
 * Zamówienie płatnego audytu całej strony. Stoi pod wynikiem darmowego audytu
 * (z adresem już wpisanym) i pod formularzem na dole strony.
 */
export default function ZamowAudytCalosci({
  domena = "",
  miejsce,
}: {
  domena?: string;
  miejsce: "wynik" | "dol";
}) {
  const [adres, setAdres] = useState(domena);
  const [email, setEmail] = useState("");
  const [nip, setNip] = useState("");
  const [stan, setStan] = useState<"" | "wysylamy" | "ok" | "blad">("");
  const [blad, setBlad] = useState("");
  const id = `audyt-calosci-${miejsce}`;

  async function zamow(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStan("wysylamy");
    setBlad("");
    const pulapka =
      (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)
        ?.value ?? "";
    try {
      const odp = await fetch("/api/audyt-calosc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adres, email, nip, website: pulapka }),
      });
      const dane = await odp.json().catch(() => ({}));
      if (!odp.ok) {
        setBlad(
          dane.error ?? "Nie udało się przyjąć zamówienia. Spróbuj za chwilę.",
        );
        setStan("blad");
        return;
      }
      zglosZdarzenie(`audyt_calosci_zamowienie_${miejsce}`);
      setStan("ok");
    } catch {
      setBlad("Nie udało się połączyć. Spróbuj za chwilę.");
      setStan("blad");
    }
  }

  const pole =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-accent dark:border-gray-700 dark:bg-gray-950 dark:text-white";

  return (
    <div
      id={miejsce === "dol" ? "audyt-calosci" : undefined}
      className="scroll-mt-24 rounded-2xl border border-accent/40 bg-accent/5 p-6 text-left"
    >
      {stan === "ok" ? (
        <div>
          <p className="text-base font-bold text-emerald-700 dark:text-emerald-400">
            Przyjęliśmy zamówienie
          </p>
          <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">
            Raport przyjdzie na {email} w ciągu kilku minut. Dane do przelewu są
            na końcu wiadomości. Jeżeli nie dotrze, zajrzyj do spamu.
          </p>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Audyt całej strony: wszystkie podstrony, 10 zł netto
          </h3>
          <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">
            Raport mailem, płacisz przelewem po otrzymaniu. Sprawdzamy każdą
            podstronę (do 200): błędy, przekierowania, tytuły, opisy, nagłówki,
            obrazy bez opisu i martwe linki.
          </p>
          <form onSubmit={zamow} className="mt-4 space-y-3">
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-9999px",
                width: 1,
                height: 1,
                overflow: "hidden",
              }}
            >
              <label htmlFor={`${id}-website`}>Nie wypełniaj tego pola</label>
              <input
                id={`${id}-website`}
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                defaultValue=""
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                required
                value={adres}
                onChange={(e) => setAdres(e.target.value)}
                placeholder="twojafirma.pl"
                aria-label="Adres strony do audytu"
                className={pole}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="twoj@adres.pl"
                aria-label="Adres e-mail do wysyłki raportu"
                className={pole}
              />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                inputMode="numeric"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                placeholder="NIP do faktury (opcjonalnie)"
                aria-label="NIP do faktury, opcjonalnie"
                className={`${pole} sm:flex-1`}
              />
              <button
                type="submit"
                disabled={stan === "wysylamy"}
                className="btn-primary justify-center px-6 text-sm disabled:opacity-50"
              >
                {stan === "wysylamy" ? "Przyjmujemy..." : "Zamawiam"}
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Do zapłaty 12,30 zł brutto (10 zł netto plus 23% VAT), dopiero po
              otrzymaniu raportu. Gdy strona nie odpowie, nic nie płacisz.
            </p>
            {stan === "blad" && (
              <p className="text-sm text-red-700 dark:text-red-400">{blad}</p>
            )}
          </form>
        </>
      )}
    </div>
  );
}
