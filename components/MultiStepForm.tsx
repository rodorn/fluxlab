"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { event as gaEvent } from "@/lib/gtag";
import {
  PROBLEM_TYPES,
  getScalesForType,
  type FormOption,
} from "@/lib/form-options";

const CONTACT_PREFS: FormOption[] = [
  { value: "email", label: "E-mail" },
  { value: "phone", label: "Telefon" },
  { value: "meet", label: "Google Meet" },
];

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface UtmFields {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  landing_page: string;
  referrer: string;
}

const EMPTY_UTM: UtmFields = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_term: "",
  utm_content: "",
  landing_page: "",
  referrer: "",
};

function readUtm(): UtmFields {
  if (typeof window === "undefined") return EMPTY_UTM;
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

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-base text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors";

interface Props {
  /** Identyfikator formularza w GA, np. "diagnosis_lp_leadow". */
  formId: string;
  /** Mikrotekst pod przyciskiem wysyłki. */
  microCopy?: string;
}

// Kolejność kroków: 0=typ, 1=skala, 2=opis, 3=kontakt-dane, 4=preferencja
const TOTAL_STEPS = 5;

export default function MultiStepForm({
  formId,
  microCopy = "Odpowiedź w 24h. Bez spamu, bez newslettera, bez „szybkiej rozmowy” wciskanej na siłę.",
}: Props) {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [problemType, setProblemType] = useState("");
  const [problemScale, setProblemScale] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [contactPref, setContactPref] = useState("email");
  const [website, setWebsite] = useState(""); // honeypot
  const [utm, setUtm] = useState<UtmFields>(EMPTY_UTM);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const formStartedRef = useRef(false);

  useEffect(() => {
    setUtm(readUtm());
  }, []);

  function markStarted() {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    gaEvent("form_start", { form_id: formId });
  }

  function goNext() {
    markStarted();
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }

  function goBack() {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
    setErrorMsg(null);
  }

  function pickType(value: string) {
    markStarted();
    setProblemType(value);
    setProblemScale("");
    setDirection(1);
    setStep(1);
  }

  function pickScale(value: string) {
    setProblemScale(value);
    setDirection(1);
    setStep(2);
  }

  const scaleOptions = getScalesForType(problemType).filter((o) => o.value);
  const typeOptions = PROBLEM_TYPES.filter((o) => o.value);

  async function submit() {
    setLoading(true);
    setErrorMsg(null);
    const data = {
      email,
      company,
      problemType,
      problemScale,
      message,
      contactPref,
      website,
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
          lead_type: problemType,
          lead_scale: problemScale,
          contact_pref: contactPref,
        });
        const params = new URLSearchParams({
          type: problemType,
          scale: problemScale,
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

  function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!EMAIL_RX.test(email.trim())) {
      setErrorMsg("Podaj prawidłowy adres e-mail.");
      return;
    }
    goNext();
  }

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 lg:p-8 shadow-sm">
      {/* Honeypot */}
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
        <label htmlFor={`website-${formId}`}>Nie wypełniaj tego pola</label>
        <input
          id={`website-${formId}`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          Krok {step + 1} z {TOTAL_STEPS}
        </span>
        {step > 0 && (
          <button
            type="button"
            onClick={goBack}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-1"
          >
            ← Wstecz
          </button>
        )}
      </div>
      <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden mb-7">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-violet-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step viewport */}
      <div className="overflow-hidden">
        <div
          key={step}
          className={direction === 1 ? "animate-fade-up" : "animate-fade-up"}
        >
          {/* STEP 0 — problemType */}
          {step === 0 && (
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1.5">
                Co chcesz usprawnić?
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                Wybierz obszar — jeśli nie wiesz, kliknij „Nie wiem, chcę
                diagnozy”.
              </p>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {typeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => pickType(opt.value)}
                    className={`text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      problemType === opt.value
                        ? "border-accent bg-accent/5 text-accent dark:bg-accent/10"
                        : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-accent/50"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1 — problemScale */}
          {step === 1 && (
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1.5">
                Jaka skala?
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                Przybliżona — i tak doprecyzujemy w diagnozie.
              </p>
              <div className="grid gap-2.5">
                {scaleOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => pickScale(opt.value)}
                    className={`text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      problemScale === opt.value
                        ? "border-accent bg-accent/5 text-accent dark:bg-accent/10"
                        : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-accent/50"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 — message */}
          {step === 2 && (
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1.5">
                Opisz to w 2–3 zdaniach
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                Opcjonalne, ale pomaga mi przygotować konkretną odpowiedź.
              </p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                autoFocus
                placeholder="Np. leady wpadają z formularza i maila, handlowcy ręcznie przepisują dane do CRM, a raport robimy w Google Sheets."
                className={`${inputClass} resize-none`}
              />
              <div className="flex gap-3 mt-5">
                <button
                  type="button"
                  onClick={goNext}
                  className="btn-primary flex-1"
                >
                  Dalej
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="px-5 py-3.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl"
                >
                  Pomiń
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — email + company */}
          {step === 3 && (
            <form onSubmit={handleContactSubmit}>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1.5">
                Gdzie mam odpisać?
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                Odpowiedź w 24h. Bez zapisywania do newslettera.
              </p>
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor={`email-${formId}`}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    E-mail służbowy <span className="text-accent">*</span>
                  </label>
                  <input
                    id={`email-${formId}`}
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="np. pawel@firma.pl"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`company-${formId}`}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Firma{" "}
                    <span className="text-gray-400 font-normal text-xs">
                      (opcjonalnie)
                    </span>
                  </label>
                  <input
                    id={`company-${formId}`}
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Nazwa firmy"
                    className={inputClass}
                  />
                </div>
              </div>
              {errorMsg && (
                <p
                  role="alert"
                  className="mt-3 text-sm text-red-500 dark:text-red-400"
                >
                  {errorMsg}
                </p>
              )}
              <button type="submit" className="btn-primary w-full mt-5">
                Dalej
              </button>
            </form>
          )}

          {/* STEP 4 — contactPref + submit */}
          {step === 4 && (
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1.5">
                Jak wolisz kontakt?
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                Ostatni krok — potem wysyłamy.
              </p>
              <div
                role="group"
                aria-label="Preferowany kontakt"
                className="flex flex-wrap gap-2.5 mb-6"
              >
                {CONTACT_PREFS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    aria-pressed={contactPref === opt.value}
                    onClick={() => setContactPref(opt.value)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      contactPref === opt.value
                        ? "bg-accent text-white border-accent"
                        : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-accent/50"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Podsumowanie */}
              <div className="rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-700 p-4 mb-5 text-sm">
                <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide mb-2 font-semibold">
                  Twoje zgłoszenie
                </p>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                  <li>
                    <span className="text-gray-400">Obszar:</span>{" "}
                    {PROBLEM_TYPES.find((o) => o.value === problemType)
                      ?.label ?? "—"}
                  </li>
                  <li>
                    <span className="text-gray-400">Skala:</span>{" "}
                    {getScalesForType(problemType).find(
                      (o) => o.value === problemScale,
                    )?.label ?? "—"}
                  </li>
                  <li>
                    <span className="text-gray-400">E-mail:</span>{" "}
                    {email || "—"}
                  </li>
                </ul>
              </div>

              {errorMsg && (
                <p
                  role="alert"
                  className="mb-3 text-sm text-red-500 dark:text-red-400"
                >
                  {errorMsg}
                </p>
              )}

              <button
                type="button"
                onClick={submit}
                disabled={loading}
                className="btn-primary w-full disabled:opacity-60"
              >
                {loading ? "Wysyłanie..." : "Wyślij zgłoszenie"}
              </button>
              <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
                {microCopy}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
