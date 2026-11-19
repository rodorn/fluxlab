"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { event as gaEvent } from "@/lib/gtag";
import { zglosZdarzenie } from "@/lib/zdarzenie";
import { readUtm, type UtmFields } from "@/lib/zrodlo";

const inputClass =
  "w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3.5 py-2.5 text-base text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors aria-[invalid=true]:border-red-600";

const etykietaClass =
  "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

const PODPOWIEDZI = [
  "Nowa strona",
  "Sklep internetowy",
  "Automatyzacja",
  "Połączenie z CRM",
  "Raporty",
  "Nie wiem, doradźcie",
];

const ZAPEWNIENIA = [
  "Bez zobowiązań",
  "Cena i termin w odpowiedzi",
  "Odpisujemy w 1 dzień roboczy",
];

const SZKIC_KLUCZ = "fluxlab_szkic";
const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Props {
  /** Identyfikator formularza w GA, np. "diagnosis_lp_leadow". */
  formId: string;
  heading: string;
  intro: string;
  submitLabel?: string;
  /** Mikrotekst pod przyciskiem. */
  microCopy?: string;
  /** Nagłówek jako h1, gdy formularz jest główną treścią strony. */
  h1?: boolean;
  /** Dodatkowe, nieobowiązkowe pole tekstowe, wysyłane jako „skala”. */
  pole?: { etykieta: string; placeholder: string };
}

/** Jeden krok, dwa pola obowiązkowe: telefon albo e-mail i czego klient
 *  potrzebuje. Resztę pytań zadaje handlowiec w rozmowie. */
export default function LandingForm({
  formId,
  heading,
  intro,
  submitLabel = "Wyślij",
  microCopy,
  h1 = false,
  pole,
}: Props) {
  const Naglowek = h1 ? "h1" : "h2";
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const formStartedRef = useRef(false);
  const szkicTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [utm, setUtm] = useState<UtmFields>(() => ({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
    landing_page: "",
    referrer: "",
  }));

  useEffect(() => {
    setUtm(readUtm());
  }, []);

  // Szkic zostaje w przeglądarce, więc powrót do strony nie kasuje wpisanego.
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(SZKIC_KLUCZ) ?? "null") as {
        kontakt?: string;
        message?: string;
      } | null;
      const f = formRef.current;
      if (!s || !f) return;
      const k = f.elements.namedItem("kontakt") as HTMLInputElement | null;
      const m = f.elements.namedItem("message") as HTMLTextAreaElement | null;
      if (k && !k.value && s.kontakt) k.value = s.kontakt;
      if (m && !m.value && s.message) m.value = s.message;
    } catch {}
  }, []);

  function zapiszSzkic() {
    if (szkicTimer.current) clearTimeout(szkicTimer.current);
    szkicTimer.current = setTimeout(() => {
      const f = formRef.current;
      if (!f) return;
      try {
        localStorage.setItem(
          SZKIC_KLUCZ,
          JSON.stringify({
            kontakt: (f.elements.namedItem("kontakt") as HTMLInputElement)
              .value,
            message: (f.elements.namedItem("message") as HTMLTextAreaElement)
              .value,
          }),
        );
      } catch {}
    }, 400);
  }

  function handleFormStart() {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    gaEvent("form_start", { form_id: formId });
    zglosZdarzenie("form_start");
  }

  function zle(el: HTMLElement | null, tekst: string) {
    el?.setAttribute("aria-invalid", "true");
    el?.focus();
    setErrorMsg(tekst);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const polaKontakt = form.elements.namedItem("kontakt") as HTMLInputElement;
    const polaOpis = form.elements.namedItem("message") as HTMLTextAreaElement;
    const kontakt = polaKontakt.value.trim();
    const message = polaOpis.value.trim();
    const maEmail = kontakt.includes("@");
    if (!maEmail && kontakt.replace(/\D/g, "").length < 9) {
      zle(polaKontakt, "Wpisz telefon albo e-mail, na który odpiszemy.");
      return;
    }
    if (maEmail && !EMAIL_RX.test(kontakt)) {
      zle(polaKontakt, "Sprawdź adres e-mail, wygląda na niepełny.");
      return;
    }
    if (!message) {
      zle(polaOpis, "Napisz jednym zdaniem, czego potrzebujesz.");
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    const data = {
      imie: "",
      email: maEmail ? kontakt : "",
      company: "",
      // Temat zgłoszenia to nazwa strony, z której przyszło.
      problemType: document.title.split("|")[0].trim() || formId,
      problemScale: pole
        ? (form.elements.namedItem("skala") as HTMLInputElement).value.trim() ||
          "nie-wiemy"
        : "nie-wiemy",
      message,
      contactPref: maEmail ? "email" : "phone",
      phone: maEmail ? "" : kontakt,
      termin: "",
      website:
        (form.elements.namedItem("website") as HTMLInputElement | null)
          ?.value ?? "",
      skad: "",
      powod: "",
      ...utm,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        // Serwer udaje sukces, gdy bot wypełni ukryte pole, i nie wysyła maila.
        // Takie wejście nie może trafić do konwersji.
        // generate_lead i konwersję Ads wysyła components/PomiarAds.tsx.
        const bot = data.website.trim().length > 0;
        if (!bot) zglosZdarzenie("lead_landing");
        if (szkicTimer.current) clearTimeout(szkicTimer.current);
        try {
          localStorage.removeItem(SZKIC_KLUCZ);
        } catch {}
        const params = new URLSearchParams({
          type: data.problemType,
          scale: data.problemScale,
        });
        router.push(`/dziekuje?${params.toString()}`);
        return;
      }
      const payload = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      setLoading(false);
      setErrorMsg(
        payload?.error ??
          "Coś poszło nie tak. Spróbuj ponownie lub napisz bezpośrednio na pawel@fluxlab.pl.",
      );
    } catch {
      setLoading(false);
      setErrorMsg(
        "Problem z połączeniem. Spróbuj ponownie lub napisz na pawel@fluxlab.pl.",
      );
    }
  }

  function wstaw(tekst: string) {
    const m = formRef.current?.elements.namedItem(
      "message",
    ) as HTMLTextAreaElement | null;
    if (!m) return;
    m.value = m.value.trim()
      ? `${m.value.trim()}, ${tekst.toLowerCase()}`
      : tekst;
    m.removeAttribute("aria-invalid");
    setErrorMsg(null);
    zapiszSzkic();
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 text-center">
        <Naglowek className={`${h1 ? "h1-strony" : "h2-sekcji"} mb-4`}>
          {heading}
        </Naglowek>
        <p className="text-gray-600 dark:text-gray-400 text-base lg:text-lg leading-relaxed">
          {intro}
        </p>
      </div>

      <form
        ref={formRef}
        data-pomiar="wlasny"
        noValidate
        onSubmit={handleSubmit}
        onInput={(e) => {
          (e.target as HTMLElement).removeAttribute("aria-invalid");
          zapiszSzkic();
        }}
        onFocus={handleFormStart}
        className="relative overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 lg:p-10 shadow-xl shadow-accent/10 text-left space-y-5 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-accent-solid"
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
          <label htmlFor="website">Nie wypełniaj tego pola</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>

        <div>
          <label htmlFor={`${formId}-kontakt`} className={etykietaClass}>
            Telefon albo e-mail <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${formId}-kontakt`}
            name="kontakt"
            type="text"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={120}
            placeholder="np. 600 100 200 albo jan@firma.pl"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-message`} className={etykietaClass}>
            Czego potrzebujesz? <span aria-hidden="true">*</span>
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={3}
            required
            maxLength={1000}
            placeholder="Jedno zdanie, np. „strona dla firmy budowlanej”"
            className={inputClass}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {PODPOWIEDZI.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => wstaw(p)}
                className="rounded-full border border-gray-300 px-3 py-1 text-sm text-gray-700 transition-colors hover:border-accent hover:text-accent dark:border-gray-600 dark:text-gray-300"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {pole && (
          <div>
            <label htmlFor={`${formId}-skala`} className={etykietaClass}>
              {pole.etykieta}{" "}
              <span className="text-gray-500">(opcjonalnie)</span>
            </label>
            <input
              id={`${formId}-skala`}
              name="skala"
              type="text"
              maxLength={80}
              placeholder={pole.placeholder}
              className={inputClass}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-60"
        >
          {loading ? "Wysyłanie..." : submitLabel}
        </button>

        {errorMsg && (
          <p
            role="alert"
            className="text-center text-sm text-red-700 dark:text-red-400"
          >
            {errorMsg}
          </p>
        )}

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          {microCopy ?? "Odpowiadamy w 1 dzień roboczy z ceną."}
        </p>
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-gray-200 pt-5 text-xs text-gray-600 dark:border-gray-700 dark:text-gray-400">
          {ZAPEWNIENIA.map((z) => (
            <li key={z} className="flex items-center gap-1.5">
              <svg
                className="h-3.5 w-3.5 text-accent"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              {z}
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}
