"use client";

import { useEffect, useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";

interface Wynik {
  kod: string;
  adres: string;
  url: string;
  nazwa: string;
  svg: string;
  email: string;
}

const KOMUNIKATY: Record<string, { tekst: string; dobry: boolean }> = {
  wlaczony: { tekst: "Adres potwierdzony. Kod przekierowuje i liczy skany.", dobry: true },
  wylaczony: { tekst: "Kod jest wyłączony. Skan nie przekierowuje już nigdzie.", dobry: true },
  niepotwierdzony: {
    tekst: "Ten kod czeka na potwierdzenie adresu e-mail. Właściciel dostał link w wiadomości z kodem.",
    dobry: false,
  },
  "wylaczony-kod": { tekst: "Ten kod QR został wyłączony przez właściciela.", dobry: false },
  brak: { tekst: "Nie znamy takiego kodu. Sprawdź, czy kod nie został uszkodzony przy druku.", dobry: false },
  chwilowo: { tekst: "Usługa kodów QR chwilowo nie odpowiada. Spróbuj za kilka minut.", dobry: false },
  blad: { tekst: "Ten link jest nieaktualny albo został już użyty.", dobry: false },
};

const POLE =
  "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent";

export default function KodyQr() {
  const [url, setUrl] = useState("");
  const [nazwa, setNazwa] = useState("");
  const [email, setEmail] = useState("");
  const [stan, setStan] = useState<"idle" | "wysylamy" | "gotowe" | "blad">("idle");
  const [blad, setBlad] = useState("");
  const [wynik, setWynik] = useState<Wynik | null>(null);
  const [info, setInfo] = useState<{ tekst: string; dobry: boolean } | null>(null);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const s = p.get("stan");
    if (s && KOMUNIKATY[s]) {
      const k = p.get("kod");
      const m = KOMUNIKATY[s];
      setInfo(k && (s === "wlaczony" || s === "wylaczony") ? { ...m, tekst: `${m.tekst} Kod: ${k}.` } : m);
    }
  }, []);

  async function utworz(e: React.FormEvent) {
    e.preventDefault();
    zglosZdarzenie("uruchomiono_qr");
    setStan("wysylamy");
    setBlad("");
    try {
      const res = await fetch("/api/kody-qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, nazwa, email }),
      });
      const d = await res.json();
      if (!res.ok) {
        setBlad(d?.error || "Nie udało się utworzyć kodu.");
        setStan("blad");
        return;
      }
      setWynik(d);
      setStan("gotowe");
    } catch {
      setBlad("Brak połączenia. Spróbuj ponownie za chwilę.");
      setStan("blad");
    }
  }

  function pobierz() {
    if (!wynik) return;
    const b = new Blob([wynik.svg], { type: "image/svg+xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(b);
    a.download = `kod-qr-${wynik.kod}.svg`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6 md:p-8">
      {info && (
        <p
          role="status"
          className={`mb-5 rounded-lg border px-4 py-3 text-sm ${
            info.dobry
              ? "border-emerald-500/60 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400"
              : "border-amber-500/60 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400"
          }`}
        >
          {info.tekst}
        </p>
      )}
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Zrób kod QR z licznikiem skanów</h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Podaj stronę, na którą ma prowadzić kod, i swój e-mail. Kod i obraz do druku przyjdą na maila, a pierwszego dnia
        każdego miesiąca dostaniesz liczbę skanów. Bez konta i bez płatności.
      </p>

      {stan !== "gotowe" && (
        <form onSubmit={utworz} className="mt-5 grid gap-4">
          <div>
            <label htmlFor="qr-url" className="block text-sm font-medium text-gray-900 dark:text-white">
              Dokąd ma prowadzić kod
            </label>
            <input
              id="qr-url"
              type="text"
              inputMode="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="twojafirma.pl/oferta"
              className={`mt-1.5 ${POLE}`}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="qr-nazwa" className="block text-sm font-medium text-gray-900 dark:text-white">
                Nazwa kodu <span className="font-normal text-gray-500 dark:text-gray-400">(opcjonalnie)</span>
              </label>
              <input
                id="qr-nazwa"
                type="text"
                maxLength={60}
                value={nazwa}
                onChange={(e) => setNazwa(e.target.value)}
                placeholder="Ulotka, osiedle Bemowo"
                className={`mt-1.5 ${POLE}`}
              />
            </div>
            <div>
              <label htmlFor="qr-email" className="block text-sm font-medium text-gray-900 dark:text-white">
                Twój e-mail
              </label>
              <input
                id="qr-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="twoj@email.pl"
                className={`mt-1.5 ${POLE}`}
              />
            </div>
          </div>
          <div>
            <button type="submit" disabled={stan === "wysylamy"} className="btn-primary disabled:opacity-50">
              {stan === "wysylamy" ? "Tworzymy kod..." : "Utwórz kod QR"}
            </button>
          </div>
          {stan === "blad" && <p className="text-sm text-red-700 dark:text-red-400">{blad}</p>}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Do 5 aktywnych kodów na jeden adres. Na ten adres wyślemy kod i comiesięczny licznik skanów, nic poza tym.
          </p>
        </form>
      )}

      {stan === "gotowe" && wynik && (
        <div className="mt-6 grid gap-6 sm:grid-cols-[220px_1fr] sm:items-start">
          <div
            className="mx-auto w-full max-w-[220px] rounded-xl border border-gray-200 dark:border-gray-700 bg-white p-2"
            aria-label={`Kod QR: ${wynik.nazwa}`}
            role="img"
            dangerouslySetInnerHTML={{ __html: wynik.svg.replace("<svg", '<svg style="width:100%;height:auto;display:block"') }}
          />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Kod gotowy</p>
            <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">{wynik.nazwa}</p>
            <p className="mt-1 break-all text-sm text-gray-600 dark:text-gray-400">
              {wynik.adres.replace("https://", "")} → {wynik.url}
            </p>
            <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
              Wysłaliśmy kod na {wynik.email}, razem z obrazem do druku. <b>Kliknij w mailu „Potwierdź adres”</b>, bo
              dopóki tego nie zrobisz, kod nie przekierowuje. Jeśli maila nie widać, zajrzyj do spamu.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" onClick={pobierz} className="btn-primary">
                Pobierz SVG
              </button>
              <button
                type="button"
                onClick={() => {
                  setStan("idle");
                  setWynik(null);
                  setUrl("");
                  setNazwa("");
                }}
                className="rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-white"
              >
                Kolejny kod
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
