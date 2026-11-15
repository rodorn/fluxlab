"use client";

import { useEffect, useState } from "react";

type Stan = {
  nazwa: string;
  aktywna: boolean;
  kanal: boolean;
  zgloszen: number;
};

export default function UstawieniaFormularza() {
  const [token, setToken] = useState("");
  const [stan, setStan] = useState<Stan | null>(null);
  const [blad, setBlad] = useState("");
  const [webhook, setWebhook] = useState("");
  const [trwaZapis, setTrwaZapis] = useState(false);
  const [info, setInfo] = useState("");

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("t") ?? "";
    setToken(t);
    if (!t) {
      setBlad("Brakuje kodu formularza. Użyj linku z maila.");
      return;
    }
    fetch(`/api/formularz/${encodeURIComponent(t)}/ustawienia`)
      .then(async (r) =>
        r.ok
          ? setStan(await r.json())
          : setBlad("Nie znamy tego formularza. Użyj linku z maila."),
      )
      .catch(() =>
        setBlad("Nie udało się wczytać ustawień, spróbuj za chwilę."),
      );
  }, []);

  async function zapisz(adres: string) {
    setTrwaZapis(true);
    setInfo("");
    setBlad("");
    try {
      const r = await fetch(
        `/api/formularz/${encodeURIComponent(token)}/ustawienia`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ webhook: adres }),
        },
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok) {
        setBlad(d.error ?? "Nie udało się zapisać.");
        return;
      }
      setStan((s) => (s ? { ...s, kanal: Boolean(d.kanal) } : s));
      setInfo(
        d.kanal
          ? "Zapisane. Wiadomość testowa poszła na kanał."
          : "Kanał odłączony. Zgłoszenia trafiają tylko do arkusza.",
      );
      setWebhook("");
    } finally {
      setTrwaZapis(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h1 className="h1-strony mb-2">Ustawienia formularza</h1>
      {stan && (
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          „{stan.nazwa}”, zgłoszeń do tej pory: {stan.zgloszen}. Kanał Teams lub
          Slack: {stan.kanal ? "podłączony" : "niepodłączony"}.
        </p>
      )}
      {blad && (
        <p
          role="alert"
          className="mb-4 text-sm font-medium text-red-600 dark:text-red-400"
        >
          {blad}
        </p>
      )}
      {info && (
        <p
          role="status"
          className="mb-4 text-sm font-medium text-green-700 dark:text-green-400"
        >
          {info}
        </p>
      )}
      {stan && stan.aktywna && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            zapisz(webhook.trim());
          }}
          className="space-y-4"
        >
          <label
            className="block text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="webhook"
          >
            Adres webhooka Slacka lub Teams
          </label>
          <input
            id="webhook"
            type="url"
            value={webhook}
            onChange={(e) => setWebhook(e.target.value)}
            placeholder="https://hooks.slack.com/services/..."
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            autoComplete="off"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Po zapisaniu wyślemy na kanał wiadomość testową. Adres zostaje u nas
            i służy tylko do wysyłania zgłoszeń z tego formularza.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={trwaZapis || !webhook.trim()}
              className="btn-primary disabled:opacity-50"
            >
              {trwaZapis ? "Sprawdzanie..." : "Zapisz i wyślij test"}
            </button>
            {stan.kanal && (
              <button
                type="button"
                disabled={trwaZapis}
                onClick={() => zapisz("")}
                className="btn-secondary"
              >
                Odłącz kanał
              </button>
            )}
          </div>
        </form>
      )}
      {stan && !stan.aktywna && (
        <p className="text-gray-600 dark:text-gray-300">
          Ten formularz jest wyłączony, bo subskrypcja została anulowana.
        </p>
      )}
    </div>
  );
}
