"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { readUtm } from "@/lib/zrodlo";
import { zglosZdarzenie } from "@/lib/zdarzenie";

/** Pierwszy ekran na telefonie: jedno pole na numer, „Oddzwońcie do mnie”
 *  i WhatsApp. Na komputerze ukryte, tam hero ma pełny formularz. */
export default function OddzwonTelefon({ formId }: { formId: string }) {
  const router = useRouter();
  const [wysylka, setWysylka] = useState(false);
  const [blad, setBlad] = useState<string | null>(null);

  async function wyslij(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const pole = f.elements.namedItem("kontakt") as HTMLInputElement;
    const numer = pole.value.trim();
    if (numer.replace(/\D/g, "").length < 9) {
      pole.setAttribute("aria-invalid", "true");
      pole.focus();
      setBlad("Wpisz numer telefonu, 9 cyfr.");
      return;
    }
    const dane = {
      imie: "",
      email: "",
      company: "",
      problemType: document.title.split("|")[0].trim() || formId,
      problemScale: "nie-wiemy",
      message: "Prośba o oddzwonienie: klient zostawił sam numer.",
      contactPref: "phone",
      phone: numer,
      termin: "",
      website: (f.elements.namedItem("website") as HTMLInputElement).value,
      krotki: true,
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
        if (!dane.website) zglosZdarzenie("lead_oddzwon");
        router.push(
          `/dziekuje?${new URLSearchParams({ type: dane.problemType, scale: dane.problemScale })}`,
        );
        return;
      }
      const odp = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      setBlad(odp?.error ?? "Nie udało się wysłać. Zadzwoń: 665 466 565.");
    } catch {
      setBlad("Problem z połączeniem. Zadzwoń: 665 466 565.");
    }
    setWysylka(false);
  }

  return (
    <form
      id={`oddzwon-${formId}`}
      data-kontaktowy=""
      noValidate
      onSubmit={wyslij}
      onInput={(e) => {
        (e.target as HTMLElement).removeAttribute("aria-invalid");
        setBlad(null);
      }}
      className="relative mx-auto mb-6 w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 text-left shadow-lg shadow-accent/10 md:hidden dark:border-gray-700 dark:bg-gray-800"
    >
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
        <label htmlFor={`oddzwon-website-${formId}`}>
          Nie wypełniaj tego pola
        </label>
        <input
          id={`oddzwon-website-${formId}`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          readOnly
          onFocus={(e) => (e.currentTarget.readOnly = false)}
          defaultValue=""
        />
      </div>
      <label className="sr-only" htmlFor={`oddzwon-tel-${formId}`}>
        Twój numer telefonu (wymagane)
      </label>
      <input
        id={`oddzwon-tel-${formId}`}
        name="kontakt"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        required
        placeholder="Twój numer telefonu"
        aria-invalid={blad ? "true" : undefined}
        className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-base text-gray-900 placeholder-gray-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 aria-[invalid=true]:border-red-600 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400"
      />
      {blad && (
        <p role="alert" className="mt-1 text-sm text-red-700 dark:text-red-400">
          {blad}
        </p>
      )}
      <div className="mt-2 grid grid-cols-[1fr_auto] gap-2">
        <button
          type="submit"
          disabled={wysylka}
          className="btn-primary w-full whitespace-nowrap px-3 disabled:opacity-60"
        >
          {wysylka ? "Wysyłanie..." : "Oddzwońcie do mnie"}
        </button>
        <a
          href="https://wa.me/48665466565"
          target="_blank"
          rel="noopener"
          data-cta="whatsapp_hero"
          className="btn-secondary px-4"
        >
          WhatsApp
        </a>
      </div>
      <p className="mt-1.5 text-center text-sm text-gray-700 dark:text-gray-300">
        Oddzwaniamy w 2 godziny, 11–24.{" "}
        <Link
          href="/polityka-prywatnosci"
          className="underline hover:text-accent"
        >
          Dane
        </Link>
      </p>
    </form>
  );
}
