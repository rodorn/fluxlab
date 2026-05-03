"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { event as gaEvent } from "@/lib/gtag";

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors";

const PROBLEM_TYPES = [
  { value: "", label: "Wybierz obszar..." },
  { value: "leady", label: "Obsługa leadów" },
  { value: "crm", label: "CRM (Pipedrive / HubSpot / Salesforce)" },
  { value: "raportowanie", label: "Raportowanie" },
  { value: "integracje", label: "Integracje API" },
  { value: "przepisywanie", label: "Ręczne przepisywanie danych" },
  { value: "diagnoza", label: "Nie wiem, chcę diagnozy" },
];

const PROBLEM_SCALES = [
  { value: "", label: "Wybierz skalę..." },
  { value: "do-30", label: "Do 30 leadów miesięcznie" },
  { value: "30-100", label: "30–100 leadów miesięcznie" },
  { value: "100-plus", label: "100+ leadów miesięcznie" },
  {
    value: "nie-leady",
    label: "Nie chodzi o leady, tylko o ręczną pracę",
  },
  { value: "nie-wiem", label: "Nie wiem" },
];

const CONTACT_PREFS = [
  { value: "email", label: "E-mail" },
  { value: "phone", label: "Telefon" },
  { value: "meet", label: "Google Meet" },
];

interface UtmFields {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  landing_page: string;
  referrer: string;
}

function readUtm(): UtmFields {
  if (typeof window === "undefined") {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_term: "",
      utm_content: "",
      landing_page: "",
      referrer: "",
    };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
    utm_term: params.get("utm_term") ?? "",
    utm_content: params.get("utm_content") ?? "",
    landing_page: window.location.pathname,
    referrer: document.referrer ?? "",
  };
}

interface Props {
  /** Identyfikator formularza w GA, np. "diagnosis_lp_leadow". */
  formId: string;
  heading: string;
  intro: string;
  submitLabel: string;
  /** Mikrotekst pod przyciskiem. */
  microCopy?: string;
}

export default function LandingForm({
  formId,
  heading,
  intro,
  submitLabel,
  microCopy = "Odpowiedź w 24h. Bez spamu, bez newslettera, bez „szybkiej rozmowy” wciskanej na siłę.",
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [contactPref, setContactPref] = useState("email");
  const [utm, setUtm] = useState<UtmFields>(() => ({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
    landing_page: "",
    referrer: "",
  }));
  const formStartedRef = useRef(false);

  useEffect(() => {
    setUtm(readUtm());
  }, []);

  function handleFormStart() {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    gaEvent("form_start", { form_id: formId });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    const form = e.currentTarget;
    const data = {
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      problemType: (form.elements.namedItem("problemType") as HTMLSelectElement)
        .value,
      problemScale: (
        form.elements.namedItem("problemScale") as HTMLSelectElement
      ).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
      contactPref,
      website:
        (form.elements.namedItem("website") as HTMLInputElement | null)
          ?.value ?? "",
      ...utm,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        gaEvent("generate_lead", {
          form_id: formId,
          lead_type: data.problemType,
          lead_scale: data.problemScale,
          contact_pref: contactPref,
        });
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
          "Coś poszło nie tak. Spróbuj ponownie lub napisz bezpośrednio na iwanekpawel55@gmail.com.",
      );
    } catch {
      setLoading(false);
      setErrorMsg(
        "Problem z połączeniem. Spróbuj ponownie lub napisz na iwanekpawel55@gmail.com.",
      );
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {heading}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
          {intro}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        onFocus={handleFormStart}
        className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-8 shadow-sm text-left space-y-5"
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

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            >
              E-mail służbowy <span className="text-accent">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="np. pawel@firma.pl"
              className={inputClass}
            />
          </div>
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Firma{" "}
              <span className="text-gray-400 font-normal text-xs">
                (opcjonalnie)
              </span>
            </label>
            <input
              id="company"
              name="company"
              type="text"
              placeholder="Nazwa firmy"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="problemType"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Co chcesz usprawnić? <span className="text-accent">*</span>
            </label>
            <select
              id="problemType"
              name="problemType"
              required
              defaultValue=""
              className={inputClass}
            >
              {PROBLEM_TYPES.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.value === ""}
                >
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="problemScale"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Skala problemu <span className="text-accent">*</span>
            </label>
            <select
              id="problemScale"
              name="problemScale"
              required
              defaultValue=""
              className={inputClass}
            >
              {PROBLEM_SCALES.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.value === ""}
                >
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
          >
            Opisz problem w 2–3 zdaniach{" "}
            <span className="text-gray-400 font-normal text-xs">
              (opcjonalnie)
            </span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Np. leady wpadają z formularza i maila, handlowcy ręcznie przepisują dane do CRM, a raport robimy w Google Sheets."
            className={`${inputClass} resize-none`}
          />
        </div>

        <div>
          <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Preferowany kontakt{" "}
            <span className="text-gray-400 font-normal text-xs">
              (opcjonalnie)
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            {CONTACT_PREFS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setContactPref(opt.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  contactPref === opt.value
                    ? "bg-accent text-white border-accent"
                    : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-accent/50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3.5 text-base disabled:opacity-60"
        >
          {loading ? "Wysyłanie..." : submitLabel}
        </button>

        {errorMsg && (
          <p className="text-center text-sm text-red-500">{errorMsg}</p>
        )}

        <p className="text-center text-xs text-gray-400 dark:text-gray-500">
          {microCopy}
        </p>
      </form>
    </div>
  );
}
