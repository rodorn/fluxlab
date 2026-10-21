"use client";

import WyborTerminu from "@/components/WyborTerminu";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { event as gaEvent } from "@/lib/gtag";
import { zglosZdarzenie } from "@/lib/zdarzenie";
import { readUtm, type UtmFields } from "@/lib/zrodlo";

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed";


const SZKIC_KLUCZ = "fluxlab_szkic";

type Kontakt = "email" | "phone" | "meet";

const FORMY: { id: Kontakt; nazwa: string; opis: string }[] = [
  { id: "email", nazwa: "Mailem", opis: "odpiszemy z ceną" },
  { id: "phone", nazwa: "Telefon", opis: "oddzwonimy" },
  { id: "meet", nazwa: "Google Meet", opis: "30 minut online" },
];



const KROKI = ["Czego potrzebujesz", "Gdzie odpisać", "Jak się odezwać"];

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
  microCopy = "Odpowiedź tego samego dnia.",
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
  const [termin, setTermin] = useState("");
  const [krok, setKrok] = useState(0);

  useEffect(() => {
    setUtm(readUtm());
  }, []);

  // Brief głosowy: nagranie do 60 s przepisywane na tekst i dopisywane do wiadomości.
  const [nagrywanieDostepne, setNagrywanieDostepne] = useState(false);
  const [nagrywa, setNagrywa] = useState(false);
  const [przepisuje, setPrzepisuje] = useState(false);
  const [sekundy, setSekundy] = useState(0);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const strumienRef = useRef<MediaStream | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setNagrywanieDostepne(
      typeof MediaRecorder !== "undefined" &&
        !!navigator.mediaDevices?.getUserMedia,
    );
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
      if (recorderRef.current && recorderRef.current.state !== "inactive") {
        recorderRef.current.onstop = null;
        recorderRef.current.stop();
      }
      strumienRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  function zatrzymajNagrywanie() {
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop();
    }
  }

  async function przepisz(blob: Blob) {
    setPrzepisuje(true);
    try {
      const fd = new FormData();
      const rozszerzenie = blob.type.includes("mp4") ? "mp4" : "webm";
      fd.append("audio", blob, `brief.${rozszerzenie}`);
      const res = await fetch("/api/transkrypcja", { method: "POST", body: fd });
      const d = (await res.json().catch(() => null)) as {
        tekst?: string;
        error?: string;
      } | null;
      if (!res.ok || !d?.tekst) {
        setErrorMsg(d?.error ?? "Nie udało się przepisać nagrania. Wpisz wiadomość ręcznie.");
        return;
      }
      const pole = formRef.current?.elements.namedItem("message") as
        | HTMLTextAreaElement
        | null;
      if (pole) {
        pole.value = pole.value.trim() ? `${pole.value.trim()} ${d.tekst}` : d.tekst;
        pole.dispatchEvent(new Event("input", { bubbles: true }));
      }
    } catch {
      setErrorMsg("Problem z połączeniem. Wpisz wiadomość ręcznie.");
    } finally {
      setPrzepisuje(false);
    }
  }

  async function przelaczNagrywanie() {
    if (nagrywa) {
      zatrzymajNagrywanie();
      return;
    }
    setErrorMsg(null);
    try {
      const strumien = await navigator.mediaDevices.getUserMedia({ audio: true });
      strumienRef.current = strumien;
      const rec = new MediaRecorder(strumien);
      const kawalki: Blob[] = [];
      rec.ondataavailable = (ev) => {
        if (ev.data.size) kawalki.push(ev.data);
      };
      rec.onstop = () => {
        if (tickRef.current) clearInterval(tickRef.current);
        strumien.getTracks().forEach((t) => t.stop());
        setNagrywa(false);
        const blob = new Blob(kawalki, { type: rec.mimeType || "audio/webm" });
        if (blob.size > 0) void przepisz(blob);
      };
      recorderRef.current = rec;
      rec.start();
      setSekundy(0);
      setNagrywa(true);
      const start = Date.now();
      tickRef.current = setInterval(() => {
        const s = Math.floor((Date.now() - start) / 1000);
        setSekundy(Math.min(s, 60));
        if (s >= 60) zatrzymajNagrywanie();
      }, 250);
    } catch {
      setErrorMsg("Brak dostępu do mikrofonu. Wpisz wiadomość ręcznie.");
    }
  }

  // Szkic: email, firma i treść wiadomości zostają w przeglądarce do wysyłki.
  const formRef = useRef<HTMLFormElement>(null);
  const szkicTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [szkicOdtworzony, setSzkicOdtworzony] = useState(false);

  useEffect(() => {
    try {
      const opis = new URLSearchParams(window.location.search).get("opis");
      const pole = formRef.current?.elements.namedItem("message") as
        | HTMLTextAreaElement
        | null;
      if (opis && pole && !pole.value) {
        pole.value = opis.slice(0, 1000);
        pole.dispatchEvent(new Event("input", { bubbles: true }));
      }
    } catch {}
  }, []);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    try {
      const raw = localStorage.getItem(SZKIC_KLUCZ);
      if (!raw) return;
      const szkic = JSON.parse(raw) as Record<string, string>;
      let odtworzono = false;
      for (const nazwa of ["email", "company", "message"]) {
        const pole = form.elements.namedItem(nazwa) as
          | HTMLInputElement
          | HTMLTextAreaElement
          | null;
        if (pole && !pole.value && typeof szkic[nazwa] === "string" && szkic[nazwa]) {
          pole.value = szkic[nazwa];
          odtworzono = true;
        }
      }
      if (odtworzono) setSzkicOdtworzony(true);
    } catch {}
    return () => {
      if (szkicTimer.current) clearTimeout(szkicTimer.current);
    };
  }, []);

  function zapiszSzkic(e: React.FormEvent<HTMLFormElement>) {
    if ((e.target as HTMLElement).id === "message") setSzkicOdtworzony(false);
    const form = e.currentTarget;
    if (szkicTimer.current) clearTimeout(szkicTimer.current);
    szkicTimer.current = setTimeout(() => {
      try {
        const wartosc = (nazwa: string) =>
          (form.elements.namedItem(nazwa) as HTMLInputElement | null)?.value ?? "";
        localStorage.setItem(
          SZKIC_KLUCZ,
          JSON.stringify({
            email: wartosc("email"),
            company: wartosc("company"),
            message: wartosc("message"),
          }),
        );
      } catch {}
    }, 400);
  }

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

  /** Pierwsze niepoprawne pole w danym kroku (walidacja przeglądarki jak dotąd). */
  function niepoprawne(k: number) {
    const el = formRef.current?.querySelector(`[data-krok="${k}"]`);
    if (!el) return null;
    const pola = Array.from(el.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea"));
    return pola.find((p) => !p.checkValidity()) ?? null;
  }

  function pokazBlad(k: number, pole: HTMLInputElement | HTMLTextAreaElement) {
    setKrok(k);
    window.setTimeout(() => pole.reportValidity(), 0);
  }

  function dalej() {
    const zle = niepoprawne(krok);
    if (zle) {
      zle.reportValidity();
      return;
    }
    setErrorMsg(null);
    setKrok(Math.min(2, krok + 1));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (krok < 2) {
      dalej();
      return;
    }
    for (const k of [0, 1, 2]) {
      const zle = niepoprawne(k);
      if (zle) {
        pokazBlad(k, zle);
        return;
      }
    }
    if (kontakt === "meet" && !termin) {
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
          ? termin
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

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 text-center">
        <h2 className="h2-sekcji mb-4">
          {heading}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-base lg:text-lg leading-relaxed">
          {intro}
        </p>

      </div>

      <form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        onInput={zapiszSzkic}
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

        <ol aria-label="Postęp formularza" className="flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          {KROKI.map((n, i) => (
            <li key={n} className="flex items-center gap-2" aria-current={krok === i ? "step" : undefined}>
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-semibold transition-colors ${
                  i < krok
                    ? "border-accent bg-accent-solid text-white"
                    : i === krok
                      ? "border-accent text-accent"
                      : "border-gray-300 dark:border-gray-600"
                }`}
              >
                {i < krok ? "✓" : i + 1}
              </span>
              <span className={i === krok ? "font-semibold text-gray-900 dark:text-white" : "hidden sm:inline"}>{n}</span>
              {i < KROKI.length - 1 && <span aria-hidden="true" className="h-px w-5 bg-gray-300 dark:bg-gray-600" />}
            </li>
          ))}
        </ol>

        <div data-krok="0" hidden={krok !== 0} className="space-y-5">
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
          {nagrywanieDostepne && (
            <button
              type="button"
              onClick={przelaczNagrywanie}
              disabled={przepisuje}
              aria-pressed={nagrywa}
              className="mt-2 inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:border-accent/50 disabled:opacity-60 dark:border-gray-700 dark:text-gray-300"
            >
              {nagrywa ? (
                <>
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-600" aria-hidden="true" />
                  <span className="tabular-nums">
                    0:{String(sekundy).padStart(2, "0")} / 1:00
                  </span>
                  <span>Zatrzymaj</span>
                </>
              ) : przepisuje ? (
                "Przepisujemy nagranie..."
              ) : (
                <>
                  <svg className="h-4 w-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="9" y="2" width="6" height="12" rx="3" />
                    <path d="M5 11a7 7 0 0 0 14 0M12 18v4" />
                  </svg>
                  Nagraj zamiast pisać
                </>
              )}
            </button>
          )}
          {szkicOdtworzony && (
            <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
              Zapisaliśmy Twój szkic
            </p>
          )}
        </div>

        </div>

        <div data-krok="1" hidden={krok !== 1} className="space-y-5">
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

        </div>

        <div data-krok="2" hidden={krok !== 2} className="space-y-5">
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
                <span className="block text-xs text-gray-600 dark:text-gray-300">
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
          <WyborTerminu
            onZmiana={(t) => {
              setTermin(t);
              if (t) setErrorMsg(null);
            }}
          />
        )}

        </div>

        {krok < 2 ? (
          <div className="flex gap-3">
            {krok > 0 && (
              <button type="button" onClick={() => setKrok(krok - 1)} className="btn-secondary">
                Wstecz
              </button>
            )}
            <button type="button" onClick={dalej} className="btn-primary btn-lg flex-1">
              Dalej
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <button type="button" onClick={() => setKrok(1)} className="btn-secondary">
              Wstecz
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary btn-lg flex-1 disabled:opacity-60"
            >
              {loading ? "Wysyłanie..." : submitLabel}
            </button>
          </div>
        )}

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
