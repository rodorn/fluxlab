"use client";

import { useEffect, useRef, useState } from "react";
import { event as gaEvent } from "@/lib/gtag";

interface AutomationStep {
  title: string;
  detail: string;
}

interface DiagnosisResult {
  viable: boolean;
  pillar: "web" | "crm" | "scraping" | "mixed";
  processName: string;
  diagnosis: string;
  automationSteps: AutomationStep[];
  timeSavedHours: number;
  timeSavedNote: string;
  estimatedCost: string;
  costNote: string;
  firstStep: string;
  honestNote: string;
}

const MAX_LEN = 600;
const MIN_LEN = 10;

const PILLAR_LABELS: Record<DiagnosisResult["pillar"], string> = {
  web: "Strony WWW",
  crm: "Automatyzacja CRM",
  scraping: "Scraping danych",
  mixed: "Kilka obszarów",
};

// label trafia na pigulke, text do pola. Wczesniej etykiete wycinal split po
// myslniku, wiec skrocenie zalezalo od znaku interpunkcyjnego w zdaniu.
const EXAMPLES = [
  {
    label: "Przepisywanie faktur",
    text: "Ręcznie przepisuję faktury z maili do programu księgowego, kilkadziesiąt miesięcznie.",
  },
  {
    label: "Leady giną w mailach",
    text: "Leady giną w mailach, nikt nie wie kto się którym zajął ani co dalej.",
  },
  {
    label: "Raport składany ręcznie",
    text: "Raport sprzedaży składam ręcznie w piątki z kilku Exceli i CRM-u.",
  },
  {
    label: "Ceny konkurencji",
    text: "Codziennie sprawdzam ceny konkurencji na ich stronach i wpisuję do arkusza.",
  },
];

const LOADING_PHASES = [
  "Analizuję proces...",
  "Mapuję go na automatyzację...",
  "Liczę szacowaną oszczędność...",
  "Składam rekomendację...",
];

export default function LiveDiagnosis() {
  const [email, setEmail] = useState("");
  const [leadStan, setLeadStan] = useState<"idle" | "wysylam" | "ok" | "blad">(
    "idle",
  );
  const [leadBlad, setLeadBlad] = useState("");

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState(0);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loading) return;
    setPhase(0);
    const id = setInterval(() => {
      setPhase((p) => (p + 1) % LOADING_PHASES.length);
    }, 1800);
    return () => clearInterval(id);
  }, [loading]);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const tooShort = input.trim().length < MIN_LEN;

  async function handleSubmit() {
    if (tooShort || loading) return;
    setLoading(true);
    setErrorMsg(null);
    setResult(null);
    gaEvent("ai_diagnosis_used", {});

    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: input.trim() }),
      });

      if (res.status === 429) {
        setErrorMsg("Za dużo zapytań, odczekaj chwilę i spróbuj ponownie.");
        return;
      }

      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setErrorMsg(
          payload?.error ??
            "Nie udało się wygenerować diagnozy. Spróbuj ponownie za moment.",
        );
        return;
      }

      const data = (await res.json()) as DiagnosisResult;
      setResult(data);
      gaEvent("ai_diagnosis_result", { pillar: data.pillar });
    } catch {
      setErrorMsg(
        "Problem z połączeniem. Spróbuj ponownie lub napisz na kontakt@fluxlab.pl.",
      );
    } finally {
      setLoading(false);
    }
  }

  // Lead przechwytywany tam, gdzie zainteresowanie jest najwieksze: pod gotowa
  // analiza, a nie na dole strony. Kontekst leci razem z adresem, zeby
  // odpowiedziec konkretnie zamiast pytac od zera.
  async function zamowDiagnoze(e: React.FormEvent) {
    e.preventDefault();
    if (!result) return;
    setLeadStan("wysylam");
    setLeadBlad("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          company: result.processName,
          problemType: PILLAR_LABELS[result.pillar],
          problemScale: result.timeSavedHours
            ? `Szacunek z narzedzia: ${result.timeSavedHours} h miesiecznie`
            : "Szacunek z narzedzia: brak",
          message: [
            `Opis od klienta: ${input}`,
            `Proces nazwany przez narzedzie: ${result.processName}`,
            `Diagnoza: ${result.diagnosis}`,
            `Kroki: ${result.automationSteps
              .map((k) => k.title)
              .join("; ")}`,
            `Wstepna wycena: ${result.estimatedCost}`,
            result.honestNote ? `Zastrzezenie: ${result.honestNote}` : "",
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => null);
        setLeadBlad(d?.error || "Nie udało się wysłać zgłoszenia.");
        setLeadStan("blad");
        return;
      }
      setLeadStan("ok");
    } catch {
      setLeadBlad("Brak połączenia. Spróbuj ponownie za chwilę.");
      setLeadStan("blad");
    }
  }

  return (
    <section
      id="generator"
      aria-labelledby="generator-heading"
      className="scroll-mt-16 py-16 lg:py-24 relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="blob blob-accent"
        style={{ top: "-6rem", right: "-8rem" }}
      />
      <div
        aria-hidden="true"
        className="blob blob-accent"
        style={{ bottom: "-10rem", left: "-10rem" }}
      />

      <div className="container-wide relative">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <p className="section-label mb-3">Generator AI</p>
          <h2 id="generator-heading" className="display-lg mb-4">
            Zobacz swoją automatyzację, teraz
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Opisz proces, który zjada Ci czas. Działający na żywo model AI w
            kilka sekund nazwie go, rozpisze na konkretne kroki i ostrożnie
            oszacuje, ile godzin miesięcznie da się odzyskać.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 sm:p-8 shadow-sm">
            <label
              htmlFor="diagnosis-input"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Opisz proces w 1–2 zdaniach
            </label>
            <textarea
              id="diagnosis-input"
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, MAX_LEN))}
              rows={4}
              maxLength={MAX_LEN}
              disabled={loading}
              placeholder="Np. leady z formularza przepisujemy ręcznie do Excela, potem handlowiec dzwoni i robi notatki w zeszycie."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus:border-accent transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <div className="mt-1.5 text-right text-xs text-gray-400 dark:text-gray-500">
              {input.length} / {MAX_LEN}
            </div>

            <div className="mt-3">
              <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-2">
                Albo zacznij od przykładu:
              </p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex.label}
                    type="button"
                    disabled={loading}
                    onClick={() => setInput(ex.text)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:border-accent/50 hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {ex.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={tooShort || loading}
              className="btn-primary w-full mt-5 py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Analizuję..." : "Pokaż mi automatyzację"}
            </button>

            {errorMsg && (
              <p
                role="alert"
                aria-live="polite"
                className="mt-4 text-center text-sm text-red-500"
              >
                {errorMsg}
              </p>
            )}
          </div>

          {loading && (
            <div
              aria-live="polite"
              className="mt-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-8 text-center shadow-sm"
            >
              <div className="flex justify-center gap-1.5 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                <span
                  className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                />
                <span
                  className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200 animate-pulse">
                {LOADING_PHASES[phase]}
              </p>
            </div>
          )}

          {result && (
            <div
              ref={resultRef}
              aria-live="polite"
              className="mt-6 animate-fade-up"
            >
              <div className="card-lift bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 sm:p-8 shadow-sm">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
                  {PILLAR_LABELS[result.pillar]}
                </span>

                <h3 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                  {result.processName}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {result.diagnosis}
                </p>

                <div className="mt-6 space-y-3">
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Jak to zautomatyzować
                  </p>
                  <ol className="space-y-3">
                    {result.automationSteps.map((step, i) => (
                      <li
                        key={i}
                        className="flex gap-3.5 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4"
                      >
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent text-white text-sm font-semibold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {step.title}
                          </p>
                          <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-300">
                            {step.detail}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  {/* Oszczędność czasu */}
                  <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5">
                      Szacowana oszczędność
                    </p>
                    {result.timeSavedHours > 0 ? (
                      <>
                        <p className="stat-number text-gradient-flow">
                          ~{result.timeSavedHours}h / mies.
                        </p>
                        <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                          {result.timeSavedNote}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {result.timeSavedNote}
                      </p>
                    )}
                  </div>

                  {/* Wstępna wycena */}
                  <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5">
                      Wstępna wycena wdrożenia
                    </p>
                    <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {result.estimatedCost}
                    </p>
                    <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                      {result.costNote}
                    </p>
                  </div>
                </div>

                {/* Promocja, program case study */}
                <a
                  href="/pilotaz"
                  className="mt-4 block rounded-xl border border-accent/30 bg-gradient-to-br from-accent/10 via-violet-500/10 to-accent/10 p-5 transition-colors hover:border-accent/50"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center px-2.5 py-1 rounded-lg bg-accent text-white text-sm font-bold">
                      −50%
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        Program case study, zostały 3 miejsca
                      </p>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        Zgadzasz się, żebym opisał efekt wdrożenia jako
                        publiczne case study, płacisz{" "}
                        <strong>połowę ceny</strong>. Wycena powyżej spada wtedy
                        o 50%.
                      </p>
                      <span className="mt-1.5 inline-flex items-center gap-1 text-sm font-medium text-accent">
                        Zobacz zasady programu
                        <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </div>
                </a>

                <div className="mt-4 rounded-xl border border-accent/20 bg-accent/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                    Pierwszy krok
                  </p>
                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">
                    {result.firstStep}
                  </p>
                </div>

                {result.honestNote.trim() !== "" && (
                  <div className="mt-4 rounded-xl border border-amber-300 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                      Szczera uwaga
                    </p>
                    <p className="mt-1 text-sm text-amber-800 dark:text-amber-200">
                      {result.honestNote}
                    </p>
                  </div>
                )}

                {leadStan === "ok" ? (
                  <p className="mt-6 rounded-xl border border-emerald-500/50 bg-emerald-50 dark:bg-emerald-950/30 p-4 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                    Mam zgłoszenie razem z tą analizą. Odpiszę na {email},
                    zwykle tego samego dnia.
                  </p>
                ) : (
                  <form onSubmit={zamowDiagnoze} className="mt-6">
                    <label
                      htmlFor="diagnoza-email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Podaj maila, odeślę pełną diagnozę tego procesu
                    </label>
                    <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                      <input
                        id="diagnoza-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="twoj@email.pl"
                        className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent"
                      />
                      <button
                        type="submit"
                        disabled={leadStan === "wysylam"}
                        className="btn-primary justify-center px-6 py-3.5 text-base disabled:opacity-50"
                      >
                        {leadStan === "wysylam"
                          ? "Wysyłam..."
                          : "Zamów bezpłatną diagnozę"}
                      </button>
                    </div>
                    {leadStan === "blad" && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                        {leadBlad}
                      </p>
                    )}
                  </form>
                )}

                <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
                  To wstępna, automatyczna analiza. Wysyłam ją razem z Twoim
                  zgłoszeniem, więc nie musisz opisywać wszystkiego od nowa.
                  Pełną diagnozę procesu robię osobiście i jest bezpłatna.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
