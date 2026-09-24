"use client";

import { useEffect, useRef, useState } from "react";
import Przyklady from "@/components/Przyklady";
import { zglosZdarzenie } from "@/lib/zdarzenie";

interface Wynik {
  domena: string;
  klasa: string;
  werdykt: "ZIELONY" | "ZOLTY" | "CZERWONY";
  naglowek: string;
  opis: string;
  stronaNiedostepna: boolean;
  hosting: string | null;
  http: { dziala: boolean; przekierowujeNaHttps: boolean };
  cert: {
    wystawionyNa: string[];
    wystawca: string;
    waznyDo: string | null;
    dniDoKonca: number | null;
  } | null;
}

const ETAPY = [
  "Sprawdzamy, czy domena wskazuje na serwer",
  "Nawiązujemy połączenie szyfrowane",
  "Czytamy certyfikat i sprawdzamy, na kogo jest wystawiony",
  "Sprawdzamy, dokąd prowadzi wejście bez szyfrowania",
];

const MOTYW: Record<
  string,
  { ramka: string; tlo: string; tekst: string; etykieta: string }
> = {
  ZIELONY: {
    ramka: "border-emerald-500/60",
    tlo: "bg-emerald-50 dark:bg-emerald-950/30",
    tekst: "text-emerald-700 dark:text-emerald-400",
    etykieta: "Bez zastrzeżeń",
  },
  ZOLTY: {
    ramka: "border-amber-500/60",
    tlo: "bg-amber-50 dark:bg-amber-950/30",
    tekst: "text-amber-700 dark:text-amber-400",
    etykieta: "Termin goni",
  },
  CZERWONY: {
    ramka: "border-red-500/60",
    tlo: "bg-red-50 dark:bg-red-950/30",
    tekst: "text-red-700 dark:text-red-400",
    etykieta: "Odwiedzający widzi ostrzeżenie",
  },
};

/** Pasek adresu przeglądarki, żeby wynik był widokiem, a nie opisem. */
function PasekAdresu({
  domena,
  zly,
}: {
  domena: string;
  zly: boolean;
}) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-3 shadow-sm">
      <div className="flex items-center gap-2 mb-2.5">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-amber-400" />
        <span className="h-3 w-3 rounded-full bg-emerald-400" />
      </div>
      <div
        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-mono ${
          zly
            ? "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 ring-1 ring-red-400/50"
            : "bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-200"
        }`}
      >
        <span aria-hidden="true" className="text-base leading-none">
          {zly ? "⚠" : "🔒"}
        </span>
        {zly && (
          <span className="text-xs font-sans font-semibold uppercase tracking-wide">
            Niebezpieczna
          </span>
        )}
        <span className={zly ? "line-through decoration-red-500/70" : ""}>
          https://{domena || "twojafirma.pl"}
        </span>
      </div>
      {zly && (
        <div className="mt-3 rounded-lg bg-white dark:bg-gray-950 p-4 text-center">
          <p className="text-3xl" aria-hidden="true">
            🚫
          </p>
          <p className="mt-2 text-sm font-bold text-gray-900 dark:text-white">
            Twoje połączenie nie jest prywatne
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Tak wygląda Twoja strona dla kogoś, kto trafia na nią z wyszukiwarki
          </p>
        </div>
      )}
    </div>
  );
}

export default function HttpsCheck() {
  const [domena, setDomena] = useState("");
  const [stan, setStan] = useState<"idle" | "ladowanie" | "gotowe" | "blad">(
    "idle",
  );
  const [etap, setEtap] = useState(0);
  const [wynik, setWynik] = useState<Wynik | null>(null);
  const [blad, setBlad] = useState("");
  const [email, setEmail] = useState("");
  const [leadStan, setLeadStan] = useState<"idle" | "wysylamy" | "ok" | "blad">(
    "idle",
  );
  const [leadBlad, setLeadBlad] = useState("");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  async function sprawdz(e: React.FormEvent) {
    e.preventDefault();
    await uruchom(domena);
  }

  // Jedno wejscie dla formularza i dla przyciskow z przykladami, zeby
  // wynik powstawal tak samo niezaleznie od tego, skad przyszedl adres.
  async function uruchom(cel: string) {
    if (!cel.trim()) return;
    setDomena(cel);
    zglosZdarzenie("uruchomiono_skan");
    setStan("ladowanie");
    setBlad("");
    setWynik(null);
    setLeadStan("idle");
    setEtap(0);
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(
      () => setEtap((e) => Math.min(e + 1, ETAPY.length - 1)),
      900,
    );
    try {
      const res = await fetch("/api/sprawdz-https", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domena: cel }),
      });
      const data = await res.json();
      if (timer.current) clearInterval(timer.current);
      if (!res.ok) {
        setBlad(data?.error || "Nie udało się sprawdzić tego adresu.");
        setStan("blad");
        return;
      }
      setWynik(data);
      setStan("gotowe");
    } catch {
      if (timer.current) clearInterval(timer.current);
      setBlad("Brak połączenia. Spróbuj ponownie za chwilę.");
      setStan("blad");
    }
  }

  async function zamowNaprawe(e: React.FormEvent) {
    e.preventDefault();
    if (!wynik) return;
    setLeadStan("wysylamy");
    setLeadBlad("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          company: wynik.domena,
          problemType: "Naprawa ostrzeżenia o stronie",
          problemScale: `Werdykt: ${wynik.werdykt}, klasa: ${wynik.klasa}`,
          message: [
            `Sprawdzana domena: ${wynik.domena}`,
            `Rozpoznanie: ${wynik.naglowek}`,
            wynik.stronaNiedostepna
              ? "Strona jest nieosiągalna: http przekierowuje na własne zepsute https."
              : "",
            wynik.hosting ? `Certyfikat współdzielony hostingu: ${wynik.hosting}` : "",
            wynik.cert
              ? `Certyfikat wystawiony na: ${wynik.cert.wystawionyNa.join(", ")}`
              : "",
            wynik.cert?.dniDoKonca !== null && wynik.cert
              ? `Dni do końca ważności: ${wynik.cert.dniDoKonca}`
              : "",
            wynik.cert?.wystawca ? `Wystawca: ${wynik.cert.wystawca}` : "",
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

  const m = wynik ? MOTYW[wynik.werdykt] : null;
  const zly = wynik ? wynik.werdykt === "CZERWONY" : false;

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Sprawdź, co widzi Twój klient
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Wpisz adres swojej strony. W kilka sekund powiemy, czy przeglądarka
        ostrzega przed nią odwiedzających i dlaczego. Bez rejestracji i bez
        żadnych dostępów, sprawdzamy tylko to, co Twój serwer i tak pokazuje
        publicznie.
      </p>
      <Przyklady
        pozycje={[
          { wartosc: "fluxlab.pl" },
          { wartosc: "allegro.pl" },
          { wartosc: "morele.net" },
        ]}
        onWybor={uruchom}
        zablokowane={stan === "ladowanie"}
      />
      <form onSubmit={sprawdz} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          inputMode="url"
          required
          value={domena}
          onChange={(e) => setDomena(e.target.value)}
          placeholder="twojafirma.pl"
          className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={stan === "ladowanie"}
          className="btn-primary justify-center px-6 text-sm disabled:opacity-50"
        >
          {stan === "ladowanie" ? "Sprawdzamy..." : "Sprawdź stronę"}
        </button>
      </form>

      {stan === "ladowanie" && (
        <ol className="mt-5 space-y-2">
          {ETAPY.map((tekst, i) => (
            <li
              key={tekst}
              className={`flex items-center gap-3 text-sm transition-opacity duration-300 ${
                i <= etap
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-600"
              }`}
            >
              <span
                aria-hidden="true"
                className={`h-2 w-2 rounded-full ${
                  i < etap
                    ? "bg-emerald-500"
                    : i === etap
                      ? "bg-accent animate-pulse"
                      : "bg-gray-300 dark:bg-gray-700"
                }`}
              />
              {tekst}
            </li>
          ))}
        </ol>
      )}

      {stan === "blad" && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">{blad}</p>
      )}

      {wynik && m && (
        <div className={`mt-6 rounded-xl border ${m.ramka} ${m.tlo} p-5`}>
          <p className={`text-xs font-bold uppercase tracking-wider ${m.tekst}`}>
            {m.etykieta}
          </p>
          <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
            {wynik.naglowek}
          </p>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            {wynik.opis}
          </p>

          {wynik.stronaNiedostepna && (
            <div className="mt-4 rounded-lg border border-red-400/60 bg-white/70 dark:bg-gray-950/50 p-4">
              <p className="text-sm font-bold text-red-700 dark:text-red-400">
                To jest przypadek najcięższy
              </p>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                Wejście na adres bez szyfrowania jest automatycznie
                przekierowywane na adres szyfrowany, który nie działa. Do Twojej
                strony nie da się dotrzeć inaczej niż przez kliknięcie zgody na
                ryzyko. Treść jest na serwerze i działa, tylko nikt jej nie
                ogląda.
              </p>
            </div>
          )}

          <div className="mt-5">
            <PasekAdresu domena={wynik.domena} zly={zly} />
          </div>

          {wynik.cert && (
            <dl className="mt-5 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
              <div className="flex gap-2">
                <dt className="text-gray-500 dark:text-gray-400">
                  Wystawiony na:
                </dt>
                <dd className="font-medium text-gray-900 dark:text-white break-all">
                  {wynik.cert.wystawionyNa.join(", ") || "brak danych"}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-gray-500 dark:text-gray-400">Wystawca:</dt>
                <dd className="font-medium text-gray-900 dark:text-white">
                  {wynik.cert.wystawca || "brak danych"}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-gray-500 dark:text-gray-400">
                  Ważność kończy się:
                </dt>
                <dd className="font-medium text-gray-900 dark:text-white">
                  {wynik.cert.dniDoKonca === null
                    ? "brak danych"
                    : wynik.cert.dniDoKonca < 0
                      ? `${Math.abs(wynik.cert.dniDoKonca)} dni temu`
                      : `za ${wynik.cert.dniDoKonca} dni`}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-gray-500 dark:text-gray-400">
                  Wejście bez https:
                </dt>
                <dd className="font-medium text-gray-900 dark:text-white">
                  {wynik.http.przekierowujeNaHttps
                    ? "przenosi na adres szyfrowany"
                    : wynik.http.dziala
                      ? "otwiera stronę"
                      : "nie odpowiada"}
                </dd>
              </div>
            </dl>
          )}

          <div className="mt-5 border-t border-gray-200/70 dark:border-gray-700/70 pt-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {wynik.werdykt === "ZIELONY"
                ? "Nie musimy Ci nic naprawiać i nie będziemy tego udawał. Jeśli chcesz, możemy pilnować terminu ważności, żeby nie zaskoczył Cię w najgorszym momencie."
                : "To da się naprawić zwykle w jeden dzień roboczy i bez zmiany hostingu. Zostaw adres, odeślemy konkretny plan naprawy razem z tym rozpoznaniem."}
            </p>

            {leadStan === "ok" ? (
              <p className="mt-4 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Mamy zgłoszenie razem z wynikiem tego sprawdzenia. Odpiszemy na{" "}
                {email}, zwykle tego samego dnia.
              </p>
            ) : (
              <form onSubmit={zamowNaprawe} className="mt-4">
                <label
                  htmlFor="httpscheck-email"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  {wynik.werdykt === "ZIELONY"
                    ? "Podaj maila, jeśli chcesz, żebym pilnował terminu"
                    : "Podaj maila, odeślemy plan naprawy"}
                </label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="httpscheck-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="twoj@email.pl"
                    className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent"
                  />
                  <button
                    type="submit"
                    disabled={leadStan === "wysylamy"}
                    className="btn-primary justify-center px-6 text-sm disabled:opacity-50"
                  >
                    {leadStan === "wysylamy" ? "Wysyłamy..." : "Wyślij zgłoszenie"}
                  </button>
                </div>
                {leadStan === "blad" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {leadBlad}
                  </p>
                )}
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Przesyłamy tylko sprawdzany adres i wynik. Bez zapisu na
                  newsletter.
                </p>
              </form>
            )}
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        Sprawdzamy wyłącznie warstwę szyfrowania na publicznie dostępnym adresie.
        Nie logujemy się nigdzie i nie wykonujemy żadnych testów obciążeniowych.
      </p>
    </div>
  );
}
