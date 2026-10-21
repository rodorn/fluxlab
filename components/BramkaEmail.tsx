"use client";

import { useState } from "react";
import Link from "next/link";

import { zglosZdarzenie } from "@/lib/zdarzenie";

type Narzedzie = "numer-ksef" | "kalkulator-podatkowy" | "audyt-strony";

const GRUPY: Record<Narzedzie, { nazwa: string; url: string }> = {
  "numer-ksef": { nazwa: "grupy o KSeF dla JDG", url: "https://www.facebook.com/groups/1520408590114723/" },
  "kalkulator-podatkowy": { nazwa: "grupy o KSeF i podatkach JDG", url: "https://www.facebook.com/groups/1520408590114723/" },
  "audyt-strony": { nazwa: "grupy o stronach dla małych firm", url: "https://www.facebook.com/groups/2196867334594283/" },
};

/** Pod wynikiem narzędzia: pełny wynik na maila (pole nieobowiązkowe),
 *  pytanie kwalifikujące i jeden następny krok. Wynik skrócony jest już
 *  na ekranie, więc niczego tu nie blokujemy. */
export default function BramkaEmail({
  narzedzie,
  tytul,
  linie,
}: {
  narzedzie: Narzedzie;
  tytul: string;
  linie: string[];
}) {
  const [email, setEmail] = useState("");
  const [pytanie, setPytanie] = useState("");
  const [zgoda, setZgoda] = useState(false);
  const [stan, setStan] = useState<"edycja" | "wysyla" | "gotowe">("edycja");
  const [blad, setBlad] = useState("");
  const [wyslanyNa, setWyslanyNa] = useState("");

  async function wyslij(e: React.FormEvent) {
    e.preventDefault();
    setBlad("");
    if (!email.trim() && !pytanie.trim()) {
      setBlad("Wpisz e-mail albo odpowiedz na pytanie.");
      return;
    }
    if (email.trim() && !zgoda) {
      setBlad("Zaznacz zgodę, żebyśmy mogli wysłać wynik.");
      return;
    }
    setStan("wysyla");
    try {
      const r = await fetch("/api/bramka", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ narzedzie, email: email.trim(), pytanie: pytanie.trim(), zgoda, tytul, linie }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || "Nie udało się wysłać, spróbuj za chwilę.");
      if (email.trim()) zglosZdarzenie("zapis_email");
      if (pytanie.trim()) zglosZdarzenie("odpowiedz_kwalifikujaca");
      setWyslanyNa(email.trim());
      setStan("gotowe");
    } catch (err) {
      setBlad((err as Error).message);
      setStan("edycja");
    }
  }

  const grupa = GRUPY[narzedzie];
  const nastepnyKrok = (
    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
      <Link
        href={`/kontakt?utm_source=bramka&utm_campaign=${narzedzie}`}
        onClick={() => zglosZdarzenie("klik_umow_15")}
        className="btn-primary"
      >
        Umów 15 minut
      </Link>
      <a
        href={grupa.url}
        target="_blank"
        rel="noopener"
        onClick={() => zglosZdarzenie("klik_grupa")}
        className="btn-secondary"
      >
        Dołącz do {grupa.nazwa}
      </a>
    </div>
  );

  if (stan === "gotowe") {
    return (
      <div className="mt-6 rounded-2xl border border-accent/30 bg-accent/[0.04] p-5" role="status">
        <p className="font-semibold text-gray-900 dark:text-white">
          {wyslanyNa ? `Pełny wynik poszedł na ${wyslanyNa}.` : "Dzięki, mamy Twoją odpowiedź."}
        </p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {wyslanyNa
            ? "Jeśli nie widzisz maila za kilka minut, zajrzyj do spamu."
            : "Jeśli chcesz odpowiedzi od nas, umów krótką rozmowę albo zapytaj w grupie."}
        </p>
        {nastepnyKrok}
      </div>
    );
  }

  return (
    <form onSubmit={wyslij} className="mt-6 rounded-2xl border border-gray-200 bg-gray-50/70 p-5 dark:border-white/10 dark:bg-white/[0.03]">
      <p className="font-semibold text-gray-900 dark:text-white">Pełny wynik na maila</p>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Nieobowiązkowe. Wynik zostaje też tutaj na ekranie.
      </p>
      <div className="mt-4 grid gap-3">
        <label className="block">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">E-mail</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="ty@firma.pl"
            className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-accent dark:border-gray-700 dark:bg-gray-900"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Czym zajmuje się Twoja firma i co teraz najbardziej Cię męczy?
          </span>
          <textarea
            value={pytanie}
            onChange={(e) => setPytanie(e.target.value)}
            rows={2}
            placeholder="Na przykład: biuro rachunkowe, ręczne przepisywanie faktur"
            className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-accent dark:border-gray-700 dark:bg-gray-900"
          />
        </label>
        {email.trim() && (
          <label className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={zgoda}
              onChange={(e) => setZgoda(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[rgb(var(--accent-solid))]"
            />
            <span>
              Zgadzam się na wysłanie pełnego wyniku i trzech maili z poradami. Wypis jednym kliknięciem w każdej wiadomości.{" "}
              <Link href="/polityka-prywatnosci#bramka" className="text-accent underline underline-offset-2">
                Szczegóły
              </Link>
            </span>
          </label>
        )}
      </div>
      {blad && (
        <p role="alert" className="mt-3 text-sm text-red-700 dark:text-red-400">
          {blad}
        </p>
      )}
      <button type="submit" disabled={stan === "wysyla"} className="btn-primary mt-4 disabled:opacity-60">
        {stan === "wysyla" ? "Wysyłamy…" : email.trim() ? "Wyślij pełny wynik" : "Wyślij odpowiedź"}
      </button>
    </form>
  );
}
