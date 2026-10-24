"use client";

import WyborTerminu from "@/components/WyborTerminu";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { event as gaEvent } from "@/lib/gtag";
import { zglosZdarzenie } from "@/lib/zdarzenie";
import { readUtm, type UtmFields } from "@/lib/zrodlo";

const inputClass =
  "w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3.5 py-2.5 text-base text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors aria-[invalid=true]:border-red-600 disabled:opacity-50 disabled:cursor-not-allowed";

const etykietaClass =
  "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

const przyciskWsteczClass =
  "text-sm text-gray-600 dark:text-gray-400 underline underline-offset-4 hover:text-accent transition-colors";

const podpisClass = "btn-primary";

const SZKIC_KLUCZ = "fluxlab_szkic";

type Kontakt = "email" | "phone" | "meet";

const FORMY: { id: Kontakt; nazwa: string; opis: string }[] = [
  { id: "meet", nazwa: "Spotkanie", opis: "Meet, 30 min" },
  { id: "phone", nazwa: "Telefon", opis: "oddzwonimy" },
  { id: "email", nazwa: "Mail", opis: "z ceną" },
];



const KROKI = ["Jak się odezwać", "Czego potrzebujesz", "Gdzie odpisać"];

const PODPOWIEDZI = [
  "Nowa strona",
  "Sklep internetowy",
  "Automatyzacja",
  "Połączenie z CRM",
  "Raporty",
];

const ZAPEWNIENIA = ["Bez zobowiązań", "Cena i termin w odpowiedzi", "Odpisujemy tego samego dnia"];

function IkonaFormy({ id }: { id: Kontakt }) {
  return (
    <svg className="mx-auto mb-2 h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {id === "email" && (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </>
      )}
      {id === "phone" && (
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
      )}
      {id === "meet" && (
        <>
          <rect x="3" y="6" width="13" height="12" rx="2" />
          <path d="m16 10 5-3v10l-5-3" />
        </>
      )}
    </svg>
  );
}

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
}

export default function LandingForm({
  formId,
  heading,
  intro,
  submitLabel = "Wyślij",
  microCopy,
  h1 = false,
}: Props) {
  const Naglowek = h1 ? "h1" : "h2";
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
  const [kontakt, setKontakt] = useState<Kontakt>("meet");
  const [termin, setTermin] = useState("");
  const [krok, setKrok] = useState(0);
  // Kalendarz pobiera wolne terminy z API, więc montujemy go dopiero przy
  // formularzu, a nie przy każdym wejściu na stronę.
  const [blisko, setBlisko] = useState(false);

  useEffect(() => {
    setUtm(readUtm());
  }, []);

  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([w]) => {
        if (w.isIntersecting) {
          setBlisko(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
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
      // Rozszerzenie musi zgadzać się z formatem: Firefox nagrywa OGG, Safari
      // MP4, Chrome WebM. OGG pod nazwą .webm OpenAI odrzucało.
      const rozszerzenie = blob.type.includes("ogg")
        ? "ogg"
        : blob.type.includes("mp4")
          ? "mp4"
          : "webm";
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

  /** Pierwsze niepoprawne pole w danym kroku. */
  function niepoprawne(k: number) {
    const el = formRef.current?.querySelector(`[data-krok="${k}"]`);
    if (!el) return null;
    const pola = Array.from(el.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea"));
    return pola.find((p) => !p.checkValidity()) ?? null;
  }

  function komunikat(pole: HTMLInputElement | HTMLTextAreaElement) {
    if (pole.name === "message") return "Napisz choć jedno zdanie albo wybierz temat.";
    if (pole.name === "phone") return pole.validity.valueMissing ? "Podaj numer telefonu." : "Sprawdź numer telefonu.";
    if (pole.name === "email") return pole.validity.valueMissing ? "Podaj adres e-mail." : "Sprawdź adres e-mail.";
    return "Uzupełnij to pole.";
  }

  // Własny komunikat po polsku zamiast dymka przeglądarki.
  function pokazBlad(k: number, pole: HTMLInputElement | HTMLTextAreaElement) {
    setKrok(k);
    setErrorMsg(komunikat(pole));
    pole.setAttribute("aria-invalid", "true");
    window.setTimeout(() => pole.focus(), 0);
  }

  function przejdz(k: number) {
    setKrok(k);
    const form = formRef.current;
    if (form && form.getBoundingClientRect().top < 0) {
      form.scrollIntoView({ block: "start" });
    }
  }

  function dalej() {
    const zle = niepoprawne(krok);
    if (zle) {
      pokazBlad(krok, zle);
      return;
    }
    if (krok === 0 && kontakt === "meet" && !termin) {
      setErrorMsg("Wybierz dzień i godzinę spotkania.");
      return;
    }
    setErrorMsg(null);
    przejdz(Math.min(2, krok + 1));
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
      setKrok(0);
      setErrorMsg("Wybierz dzień i godzinę spotkania.");
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
        <Naglowek className={`${h1 ? "h1-strony" : "h2-sekcji"} mb-4`}>
          {heading}
        </Naglowek>
        <p className="text-gray-600 dark:text-gray-400 text-base lg:text-lg leading-relaxed">
          {intro}
        </p>

      </div>

      <form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        onInput={(e) => {
          (e.target as HTMLElement).removeAttribute("aria-invalid");
          zapiszSzkic(e);
        }}
        onFocus={handleFormStart}
        className="relative overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 lg:p-10 shadow-xl shadow-accent/10 text-left space-y-6 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-accent-solid"
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

        <div className="!mt-0">
          <ol aria-label="Postęp formularza" className="grid grid-cols-3 gap-2">
            {KROKI.map((n, i) => (
              <li key={n} aria-current={krok === i ? "step" : undefined}>
                <span className="sr-only">{n}</span>
                <span
                  aria-hidden="true"
                  className={`block h-1 rounded-full transition-colors duration-500 ${
                    i <= krok ? "bg-accent-solid" : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
              </li>
            ))}
          </ol>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            Krok {krok + 1} z 3: {KROKI[krok].toLowerCase()}
          </p>
        </div>

        <div data-krok="1" hidden={krok !== 1} className="space-y-5">
        <div>
          <label
            htmlFor="message"
            className="block text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            Z czym możemy pomóc?
          </label>
          <div className="mt-3 mb-4 flex flex-wrap gap-2">
            {PODPOWIEDZI.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  const pole = formRef.current?.querySelector<HTMLTextAreaElement>("#message");
                  if (!pole) return;
                  pole.value = pole.value.trim() ? `${pole.value.trim()}, ${p.toLowerCase()}` : `${p}: `;
                  pole.focus();
                  pole.dispatchEvent(new Event("input", { bubbles: true }));
                }}
                className="rounded-full border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:border-accent hover:bg-accent/5 hover:text-accent dark:border-gray-600 dark:text-gray-300"
              >
                {p}
              </button>
            ))}
          </div>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            placeholder="Albo opisz własnymi słowami. Jedno, dwa zdania wystarczą."
            className={`${inputClass} block resize-y leading-relaxed`}
          />
          {nagrywanieDostepne && (
            <button
              type="button"
              onClick={przelaczNagrywanie}
              disabled={przepisuje}
              aria-pressed={nagrywa}
              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:border-accent hover:text-accent disabled:opacity-60 dark:border-gray-600 dark:text-gray-300"
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
                  <svg className="h-4 w-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

        <div data-krok="2" hidden={krok !== 2} className="space-y-5">
        <p className="block text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Gdzie odpisać?</p>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="email"
              className={etykietaClass}
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
              className={etykietaClass}
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

        <div data-krok="0" hidden={krok !== 0} className="space-y-5">
        <fieldset>
          <legend className="block text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
            Jak mamy się odezwać?
          </legend>
          <div className="grid grid-cols-3 gap-3">
            {FORMY.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={kontakt === f.id}
                onClick={() => {
                  setKontakt(f.id);
                  setErrorMsg(null);
                }}
                className={`flex flex-col items-center justify-start rounded-xl border px-2 py-4 text-center transition-all ${
                  kontakt === f.id
                    ? "border-accent bg-accent/5 text-accent ring-1 ring-accent"
                    : "border-gray-300 text-gray-500 hover:-translate-y-0.5 hover:border-accent hover:text-accent dark:border-gray-600 dark:text-gray-400"
                }`}
              >
                <IkonaFormy id={f.id} />
                <span className="block text-base text-gray-900 dark:text-white">
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
              className={etykietaClass}
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

        {kontakt === "meet" && blisko && (
          <WyborTerminu
            onZmiana={(t) => {
              setTermin(t);
              if (t) setErrorMsg(null);
            }}
          />
        )}

        </div>

        {krok < 2 ? (
          <div className="flex items-center justify-between gap-4 pt-2">
            {krok > 0 ? (
              <button type="button" onClick={() => przejdz(krok - 1)} className={przyciskWsteczClass}>
                Wstecz
              </button>
            ) : (
              <span />
            )}
            {/* Osobne klucze dla „Dalej” i „Wyślij”: bez nich React podmienia
                tylko typ tego samego przycisku i kliknięcie „Dalej” w drugim
                kroku kończyło się już na przycisku wysyłki, czyli formularz
                wysyłał się, zanim klient wybrał sposób kontaktu. */}
            <button key="dalej" type="button" onClick={dalej} className={`${podpisClass} group`}>
              Dalej
              <span aria-hidden="true" className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4 pt-2">
            <button key="wstecz-2" type="button" onClick={() => setKrok(1)} className={przyciskWsteczClass}>
              Wstecz
            </button>
            <button
              key="wyslij"
              type="submit"
              disabled={loading}
              className={`${podpisClass} disabled:opacity-60`}
            >
              {loading ? "Wysyłanie..." : submitLabel}
            </button>
          </div>
        )}

        {errorMsg && (
          <p role="alert" className="text-center text-sm text-red-700 dark:text-red-400">{errorMsg}</p>
        )}

        {microCopy && (
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">{microCopy}</p>
        )}
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-gray-200 pt-5 text-xs text-gray-600 dark:border-gray-700 dark:text-gray-400">
          {ZAPEWNIENIA.map((z) => (
            <li key={z} className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
