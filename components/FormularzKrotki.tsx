"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { readUtm } from "@/lib/zrodlo";
import { zglosZdarzenie } from "@/lib/zdarzenie";

const pole =
  "w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-base text-gray-900 placeholder-gray-500 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 aria-[invalid=true]:border-red-600 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400";

/** Krótki formularz w hero dla wejść z reklamy (html[data-reklama]):
 *  dwa pola: telefon albo e-mail i jedno zdanie potrzeby. Temat
 *  zgłoszenia to nazwa strony, jak w components/LandingForm.tsx. */
export default function FormularzKrotki({
  formId,
}: {
  formId: string;
}) {
  const router = useRouter();
  const [wysylka, setWysylka] = useState(false);
  const [blad, setBlad] = useState<string | null>(null);

  async function wyslij(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const wartosc = (n: string) =>
      (
        (f.elements.namedItem(n) as HTMLInputElement | null)?.value ?? ""
      ).trim();
    const polaKontakt = f.elements.namedItem("kontakt") as HTMLInputElement;
    const polaOpis = f.elements.namedItem("message") as HTMLInputElement;
    const kontakt = polaKontakt.value.trim();
    const maEmail = kontakt.includes("@");
    if (!maEmail && kontakt.replace(/\D/g, "").length < 9) {
      polaKontakt.setAttribute("aria-invalid", "true");
      polaKontakt.focus();
      setBlad("Wpisz telefon albo e-mail, na który odpiszemy.");
      return;
    }
    if (maEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(kontakt)) {
      polaKontakt.setAttribute("aria-invalid", "true");
      polaKontakt.focus();
      setBlad("Sprawdź adres e-mail, wygląda na niepełny.");
      return;
    }
    if (!polaOpis.value.trim()) {
      polaOpis.setAttribute("aria-invalid", "true");
      polaOpis.focus();
      setBlad("Napisz jednym zdaniem, czego potrzebujesz.");
      return;
    }
    const dane = {
      imie: "",
      email: maEmail ? kontakt : "",
      company: "",
      problemType: document.title.split("|")[0].trim() || formId,
      problemScale: "nie-wiemy",
      message: wartosc("message"),
      contactPref: maEmail ? "email" : "phone",
      phone: maEmail ? "" : kontakt,
      termin: "",
      website: wartosc("website"),
      skad: "",
      powod: "",
      ...readUtm(),
    };
    setWysylka(true);
    setBlad(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dane),
      });
      if (res.ok) {
        if (!dane.website) zglosZdarzenie("lead_krotki");
        router.push(
          `/dziekuje?${new URLSearchParams({ type: dane.problemType, scale: dane.problemScale })}`,
        );
        return;
      }
      const odp = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      setBlad(
        odp?.error ?? "Nie udało się wysłać. Napisz na pawel@fluxlab.pl.",
      );
    } catch {
      setBlad(
        "Problem z połączeniem. Spróbuj ponownie albo napisz na pawel@fluxlab.pl.",
      );
    }
    setWysylka(false);
  }

  return (
    <form
      id={`krotki-${formId}`}
      data-tylko-reklama=""
      noValidate
      onSubmit={wyslij}
      onInput={(e) => (e.target as HTMLElement).removeAttribute("aria-invalid")}
      className="relative mx-auto mt-6 w-full max-w-xl overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-xl shadow-accent/10 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-accent-solid sm:p-5 dark:border-gray-700 dark:bg-gray-800"
    >
      <p className="text-base font-semibold text-gray-900 dark:text-white">
        Zostaw kontakt, odpiszemy z ceną i terminem w 1 dzień roboczy
      </p>
      <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
        Wolisz rozmowę? Zadzwoń:{" "}
        <a
          href="tel:+48665466565"
          className="font-semibold text-accent underline underline-offset-2"
        >
          665 466 565
        </a>
      </p>
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
        <label htmlFor={`krotki-website-${formId}`}>
          Nie wypełniaj tego pola
        </label>
        <input
          id={`krotki-website-${formId}`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>
      <div className="mt-3 grid gap-2.5">
        <label className="sr-only" htmlFor={`krotki-kontakt-${formId}`}>
          Telefon albo e-mail (wymagane)
        </label>
        <input
          id={`krotki-kontakt-${formId}`}
          name="kontakt"
          type="text"
          inputMode="email"
          required
          autoComplete="email"
          placeholder="Telefon albo e-mail *"
          className={pole}
        />
        <label className="sr-only" htmlFor={`krotki-msg-${formId}`}>
          Czego potrzebujesz (wymagane)
        </label>
        <input
          id={`krotki-msg-${formId}`}
          name="message"
          required
          maxLength={500}
          placeholder="Czego potrzebujesz? Jedno zdanie *"
          className={pole}
        />
      </div>
      <button
        type="submit"
        disabled={wysylka}
        className="btn-primary btn-lg mt-3 w-full disabled:opacity-60"
      >
        {wysylka ? "Wysyłanie..." : "Wyślij, bezpłatna wycena"}
      </button>
      {blad && (
        <p
          role="alert"
          className="mt-2 text-center text-sm text-red-700 dark:text-red-400"
        >
          {blad}
        </p>
      )}
      <p className="mt-2 text-center text-sm font-medium text-gray-800 dark:text-gray-200">
        Odpowiadamy w ciągu 2 godzin, w godz. 11–24.
      </p>
      <p className="mt-1 text-center text-xs text-gray-600 dark:text-gray-400">
        Bez newslettera.{" "}
        <Link
          href="/polityka-prywatnosci"
          className="underline hover:text-accent"
        >
          Jak przetwarzamy dane
        </Link>
      </p>
    </form>
  );
}
