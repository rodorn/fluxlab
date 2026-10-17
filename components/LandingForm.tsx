"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { event as gaEvent } from "@/lib/gtag";
import { zglosZdarzenie } from "@/lib/zdarzenie";
import { readUtm, type UtmFields } from "@/lib/zrodlo";

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed";


type Kontakt = "email" | "phone" | "meet";

const FORMY: { id: Kontakt; nazwa: string; opis: string }[] = [
  { id: "email", nazwa: "Mailem", opis: "odpiszemy z ceną" },
  { id: "phone", nazwa: "Telefon", opis: "oddzwonimy" },
  { id: "meet", nazwa: "Google Meet", opis: "30 minut online" },
];

const GODZINY = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

// Najbliższe dni robocze od jutra, do wyboru terminu spotkania.
function dniRobocze(ile: number) {
  const dni: Date[] = [];
  const d = new Date();
  while (dni.length < ile) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) dni.push(new Date(d));
  }
  return dni;
}

function iso(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

interface Props {
  /** Identyfikator formularza w GA, np. "diagnosis_lp_leadow". */
  formId: string;
  heading: string;
  intro: string;
  submitLabel?: string;
  /** Mikrotekst pod przyciskiem. */
  microCopy?: string;
}

export default function LandingForm({
  formId,
  heading,
  intro,
  submitLabel = "Wyślij",
  microCopy = "Odpowiedź zwykle tego samego dnia.",
}: Props) {
  const router = useRouter();
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
  const formStartedRef = useRef(false);
  const [kontakt, setKontakt] = useState<Kontakt>("email");
  const [dni, setDni] = useState<Date[]>([]);
  const [dzien, setDzien] = useState("");
  const [godzina, setGodzina] = useState("");

  useEffect(() => {
    const d = dniRobocze(6);
    setDni(d);
    setDzien(iso(d[0]));
  }, []);

  useEffect(() => {
    setUtm(readUtm());
  }, []);

  function handleFormStart() {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    gaEvent("form_start", { form_id: formId });
  }

  // Wpisany sam NIP zamieniamy na nazwę z wykazu VAT, żeby nikt nie musiał
  // przepisywać pełnej nazwy spółki.
  async function uzupelnijZNip(e: React.FocusEvent<HTMLInputElement>) {
    const pole = e.currentTarget;
    const nip = pole.value.replace(/[\s-]/g, "");
    if (!/^\d{10}$/.test(nip)) return;
    try {
      const res = await fetch("/api/sprawdz-nip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nip }),
      });
      const d = (await res.json()) as { name?: string };
      if (d.name && pole.value.replace(/[\s-]/g, "") === nip)
        pole.value = `${d.name} (NIP ${nip})`;
    } catch {}
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (kontakt === "meet" && !godzina) {
      setErrorMsg("Wybierz godzinę spotkania.");
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    const form = e.currentTarget;
    const data = {
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      // Temat zgłoszenia to nazwa strony, z której przyszło.
      problemType: document.title.split("|")[0].trim() || formId,
      problemScale: "nie-wiemy",
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
      contactPref: kontakt,
      phone:
        kontakt === "phone"
          ? (form.elements.namedItem("phone") as HTMLInputElement).value
          : "",
      termin:
        kontakt === "meet"
          ? `${dzien} ${godzina.padStart(5, "0")}`
          : "",
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
        // Serwer udaje sukces, gdy bot wypelni ukryte pole, i nie wysyla maila.
        // Takie wejscie nie moze trafic do konwersji.
        const bot = data.website.trim().length > 0;
        if (!bot) gaEvent("generate_lead", {
          form_id: formId,
          lead_type: data.problemType,
        });
        // Zapytanie od klienta to jedyna konwersja, ktora sie liczy, a do tej
        // pory nie byla mierzona nigdzie poza Google Analytics, ktorego nie
        // mamy podlaczonego. Zgloszenie ma keepalive, wiec przezyje
        // przekierowanie na strone z podziekowaniem.
        if (!bot) zglosZdarzenie("lead_landing");
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

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {heading}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-base lg:text-lg leading-relaxed">
          {intro}
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        onFocus={handleFormStart}
        className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 lg:p-8 shadow-sm text-left space-y-5"
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
              E-mail <span className="text-accent">*</span>
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
              <span className="text-gray-600 dark:text-gray-400 font-normal text-xs">
                (opcjonalnie)
              </span>
            </label>
            <input
              id="company"
              name="company"
              type="text"
              placeholder="Nazwa firmy albo NIP"
              onBlur={uzupelnijZNip}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
          >
            Czego potrzebujesz? <span className="text-accent">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            required
            placeholder="Jedno, dwa zdania wystarczą."
            className={`${inputClass} resize-none`}
          />
        </div>

        <fieldset>
          <legend className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Jak mamy się odezwać?
          </legend>
          <div className="grid grid-cols-3 gap-2">
            {FORMY.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={kontakt === f.id}
                onClick={() => {
                  setKontakt(f.id);
                  setErrorMsg(null);
                }}
                className={`rounded-lg border px-2 py-2.5 text-center transition-colors ${
                  kontakt === f.id
                    ? "border-accent bg-accent/10"
                    : "border-gray-200 hover:border-accent/50 dark:border-gray-700"
                }`}
              >
                <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                  {f.nazwa}
                </span>
                <span className="block text-xs text-gray-500 dark:text-gray-400">
                  {f.opis}
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        {kontakt === "phone" && (
          <div className="scena-wjazd">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Numer telefonu <span className="text-accent">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="np. 600 100 200"
              pattern="[+0-9 ()-]{9,20}"
              className={inputClass}
            />
          </div>
        )}

        {kontakt === "meet" && (
          <div className="scena-wjazd space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Dzień
              </p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {dni.map((d) => (
                  <button
                    key={iso(d)}
                    type="button"
                    aria-pressed={dzien === iso(d)}
                    onClick={() => setDzien(iso(d))}
                    className={`rounded-lg border px-2 py-2 text-center text-xs transition-colors ${
                      dzien === iso(d)
                        ? "border-accent bg-accent/10"
                        : "border-gray-200 hover:border-accent/50 dark:border-gray-700"
                    }`}
                  >
                    <span className="block font-semibold capitalize text-gray-900 dark:text-white">
                      {d.toLocaleDateString("pl-PL", { weekday: "short" })}
                    </span>
                    <span className="block text-gray-500 dark:text-gray-400">
                      {d.toLocaleDateString("pl-PL", { day: "numeric", month: "short" })}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Godzina
              </p>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                {GODZINY.map((g) => (
                  <button
                    key={g}
                    type="button"
                    aria-pressed={godzina === g}
                    onClick={() => {
                      setGodzina(g);
                      setErrorMsg(null);
                    }}
                    className={`rounded-lg border py-2 text-center text-sm tabular-nums transition-colors ${
                      godzina === g
                        ? "border-accent bg-accent-solid text-white"
                        : "border-gray-200 text-gray-900 hover:border-accent/50 dark:border-gray-700 dark:text-white"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Potwierdzimy termin zaproszeniem z linkiem do Meet.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3.5 text-base disabled:opacity-60"
        >
          {loading ? "Wysyłanie..." : submitLabel}
        </button>

        {errorMsg && (
          <p role="alert" className="text-center text-sm text-red-700 dark:text-red-400">{errorMsg}</p>
        )}

        <p className="text-center text-xs text-gray-600 dark:text-gray-400">
          {microCopy}
        </p>
      </form>
    </div>
  );
}
