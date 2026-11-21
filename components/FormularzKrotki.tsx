"use client";

import { useEffect, useRef, useState } from "react";
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
  zawsze = false,
  naglowek = "Zostaw kontakt, odpiszemy z ceną i terminem w 1 dzień roboczy",
  opisPlaceholder = "Czego potrzebujesz? Jedno zdanie *",
  opisEtykieta = "Czego potrzebujesz (wymagane)",
  przycisk = "Wyślij, bezpłatna wycena",
  nip = false,
  samNumer = false,
}: {
  formId: string;
  /** Strona z reklamy bez zależności od html[data-reklama]: formularz widać zawsze. */
  zawsze?: boolean;
  naglowek?: string;
  opisPlaceholder?: string;
  opisEtykieta?: string;
  przycisk?: string;
  /** Opcjonalne pole NIP z podpowiedzią nazwy firmy z białej listy VAT MF. */
  nip?: boolean;
  /** Link „zostaw sam numer”: ukrywa opis potrzeby. */
  samNumer?: boolean;
}) {
  const router = useRouter();
  const [wysylka, setWysylka] = useState(false);
  const [blad, setBlad] = useState<string | null>(null);
  const [bladKontakt, setBladKontakt] = useState<string | null>(null);
  const [bladOpis, setBladOpis] = useState<string | null>(null);
  const [firma, setFirma] = useState<string>("");
  const [tylkoNumer, setTylkoNumer] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const wyslano = useRef(false);

  // Wyjście z poprawnym kontaktem bez wysłania: liczymy porzucenie (sam fakt
  // i rodzaj kontaktu, bez numeru ani adresu, których nikt nie wysłał).
  useEffect(() => {
    let zgloszone = false;
    const naUkrycie = () => {
      if (document.visibilityState !== "hidden" || zgloszone || wyslano.current)
        return;
      const k = (
        (formRef.current?.elements.namedItem("kontakt") as HTMLInputElement | null)
          ?.value ?? ""
      ).trim();
      const mail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(k);
      const tel = !k.includes("@") && k.replace(/\D/g, "").length >= 9;
      if (!mail && !tel) return;
      zgloszone = true;
      zglosZdarzenie(mail ? "form_porzucony_mail" : "form_porzucony_tel");
    };
    document.addEventListener("visibilitychange", naUkrycie);
    return () => document.removeEventListener("visibilitychange", naUkrycie);
  }, []);

  async function sprawdzNip(v: string) {
    const cyfry = v.replace(/\D/g, "");
    if (cyfry.length !== 10) {
      setFirma("");
      return;
    }
    try {
      const r = await fetch(`/api/nip?nip=${cyfry}`);
      const j = (await r.json()) as { nazwa?: string | null };
      setFirma(j.nazwa ?? "");
    } catch {
      setFirma("");
    }
  }

  async function wyslij(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const wartosc = (n: string) =>
      (
        (f.elements.namedItem(n) as HTMLInputElement | null)?.value ?? ""
      ).trim();
    const polaKontakt = f.elements.namedItem("kontakt") as HTMLInputElement;
    const polaOpis = f.elements.namedItem("message") as HTMLInputElement;
    setBladKontakt(null);
    setBladOpis(null);
    const kontakt = polaKontakt.value.trim();
    const maEmail = kontakt.includes("@");
    if (!maEmail && kontakt.replace(/\D/g, "").length < 9) {
      polaKontakt.setAttribute("aria-invalid", "true");
      polaKontakt.focus();
      setBladKontakt("Wpisz telefon albo e-mail, na który odpiszemy.");
      return;
    }
    if (maEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(kontakt)) {
      polaKontakt.setAttribute("aria-invalid", "true");
      polaKontakt.focus();
      setBladKontakt("Sprawdź adres e-mail, wygląda na niepełny.");
      return;
    }
    if (!tylkoNumer && !polaOpis.value.trim()) {
      polaOpis.setAttribute("aria-invalid", "true");
      polaOpis.focus();
      setBladOpis("Napisz jednym zdaniem, czego potrzebujesz.");
      return;
    }
    const dane = {
      imie: "",
      email: maEmail ? kontakt : "",
      company: firma || (nip ? wartosc("nip") : ""),
      problemType: document.title.split("|")[0].trim() || formId,
      problemScale: "nie-wiemy",
      message: tylkoNumer
        ? "Prośba o oddzwonienie: klient zostawił sam numer."
        : wartosc("message"),
      contactPref: maEmail ? "email" : "phone",
      phone: maEmail ? "" : kontakt,
      termin: "",
      website: wartosc("website"),
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
        wyslano.current = true;
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
      ref={formRef}
      id={`krotki-${formId}`}
      {...(zawsze ? {} : { "data-tylko-reklama": "" })}
      noValidate
      onSubmit={wyslij}
      onInput={(e) => {
        const t = e.target as HTMLElement;
        t.removeAttribute("aria-invalid");
        if ((t as HTMLInputElement).name === "kontakt") setBladKontakt(null);
        if ((t as HTMLInputElement).name === "message") setBladOpis(null);
      }}
      className="relative mx-auto mt-6 w-full max-w-xl overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-xl shadow-accent/10 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-accent-solid sm:p-5 dark:border-gray-700 dark:bg-gray-800"
    >
      <p className="text-base font-semibold text-gray-900 dark:text-white">
        {naglowek}
      </p>
      <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
        Wolisz rozmowę? Zadzwoń:{" "}
        <a
          href="tel:+48665466565"
          data-cta="telefon_formularz"
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
        {bladKontakt && (
          <p role="alert" className="-mt-1 text-sm text-red-700 dark:text-red-400">
            {bladKontakt}
          </p>
        )}
        {!tylkoNumer && (
          <>
            <label className="sr-only" htmlFor={`krotki-msg-${formId}`}>
              {opisEtykieta}
            </label>
            <input
              id={`krotki-msg-${formId}`}
              name="message"
              required
              maxLength={500}
              placeholder={opisPlaceholder}
              className={pole}
            />
            {bladOpis && (
              <p role="alert" className="-mt-1 text-sm text-red-700 dark:text-red-400">
                {bladOpis}
              </p>
            )}
          </>
        )}
        {nip && (
          <>
            <label className="sr-only" htmlFor={`krotki-nip-${formId}`}>
              NIP firmy (opcjonalnie)
            </label>
            <input
              id={`krotki-nip-${formId}`}
              name="nip"
              inputMode="numeric"
              maxLength={13}
              autoComplete="off"
              placeholder="NIP firmy (opcjonalnie)"
              onChange={(e) => sprawdzNip(e.target.value)}
              className={pole}
            />
            {firma && (
              <p className="-mt-1 text-sm text-gray-700 dark:text-gray-300">
                Firma: <strong>{firma}</strong>
              </p>
            )}
          </>
        )}
      </div>
      {samNumer && (
        <button
          type="button"
          onClick={() => setTylkoNumer((v) => !v)}
          className="mt-2 text-sm text-accent underline underline-offset-2"
        >
          {tylkoNumer
            ? "Wolę opisać potrzebę"
            : "Zostaw sam numer, oddzwonimy"}
        </button>
      )}
      <button
        type="submit"
        disabled={wysylka}
        className="btn-primary btn-lg mt-3 w-full disabled:opacity-60"
      >
        {wysylka ? "Wysyłanie..." : przycisk}
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
        Oddzwonimy w ciągu 2 godzin, w godz. 11–24.
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
