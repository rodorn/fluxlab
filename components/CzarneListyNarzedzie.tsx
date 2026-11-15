"use client";

import { useState } from "react";

type Pozycja = {
  lista: string;
  nazwa: string;
  cel: string;
  status: "czysto" | "lista" | "brak";
  link: string;
};
type Odpowiedz = {
  domena: string;
  sprawdzono: number;
  na_liscie: number;
  bez_odpowiedzi: number;
  adresy: string[];
  uwagi: string[];
  wyniki?: Pozycja[];
  error?: string;
  stan?: string;
};

function zbiorczo(w: Pozycja[]) {
  const po = new Map<
    string,
    { nazwa: string; link: string; status: Pozycja["status"]; cele: string[] }
  >();
  for (const x of w) {
    const z = po.get(x.lista) ?? {
      nazwa: x.nazwa,
      link: x.link,
      status: "czysto" as Pozycja["status"],
      cele: [],
    };
    if (x.status === "lista") {
      z.status = "lista";
      z.cele.push(x.cel);
    } else if (x.status === "brak" && z.status === "czysto") z.status = "brak";
    po.set(x.lista, z);
  }
  return [...po.values()];
}

const KOLOR = {
  czysto: "text-emerald-700 dark:text-emerald-400",
  lista: "text-red-700 dark:text-red-400",
  brak: "text-gray-500 dark:text-gray-400",
};
const ETYKIETA = {
  czysto: "czysto",
  lista: "na liście",
  brak: "brak odpowiedzi",
};
const POLE =
  "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent";

export default function CzarneListyNarzedzie() {
  const [domena, setDomena] = useState("");
  const [serwer, setSerwer] = useState("");
  const [serwerPole, setSerwerPole] = useState(false);
  const [email, setEmail] = useState("");
  const [stan, setStan] = useState<"" | "spr" | "zap" | "zapisano" | "juz">(
    "",
  );
  const [blad, setBlad] = useState("");
  const [wynik, setWynik] = useState<Odpowiedz | null>(null);

  async function wywolaj(sciezka: string, dane: Record<string, string>) {
    const res = await fetch(sciezka, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dane),
    });
    const j = (await res.json().catch(() => ({}))) as Odpowiedz;
    if (!res.ok)
      throw new Error(j.error || "Chwilowa awaria. Spróbuj za kilka minut.");
    return j;
  }

  async function sprawdz(e: React.FormEvent) {
    e.preventDefault();
    setStan("spr");
    setBlad("");
    setWynik(null);
    try {
      setWynik(await wywolaj("/api/czarne-listy/sprawdz", { domena, serwer }));
    } catch (x) {
      setBlad((x as Error).message);
    }
    setStan("");
  }

  async function zapisz(e: React.FormEvent) {
    e.preventDefault();
    setStan("zap");
    setBlad("");
    try {
      const j = await wywolaj("/api/czarne-listy", { email, domena, serwer });
      setStan(j.stan === "juz" ? "juz" : "zapisano");
    } catch (x) {
      setBlad((x as Error).message);
      setStan("");
    }
  }

  const listy = wynik?.wyniki ? zbiorczo(wynik.wyniki) : [];

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 shadow-sm">
      <form onSubmit={sprawdz}>
        <label
          htmlFor="cl-domena"
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          Domena firmowej poczty
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <input
            id="cl-domena"
            type="text"
            inputMode="url"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            required
            value={domena}
            onChange={(e) => setDomena(e.target.value)}
            placeholder="firma.pl"
            className={`${POLE} flex-1`}
          />
          <button
            type="submit"
            disabled={stan === "spr"}
            className="btn-primary disabled:opacity-50"
          >
            {stan === "spr" ? "Sprawdzamy…" : "Sprawdź teraz"}
          </button>
        </div>
        {serwerPole ? (
          <div className="mt-3">
            <label
              htmlFor="cl-serwer"
              className="block text-sm text-gray-700 dark:text-gray-300"
            >
              Serwer wysyłkowy: nazwa albo adres IP
            </label>
            <input
              id="cl-serwer"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              value={serwer}
              onChange={(e) => setSerwer(e.target.value)}
              placeholder="mail.firma.pl albo 203.0.113.10"
              className={`${POLE} mt-1`}
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setSerwerPole(true)}
            className="mt-3 text-sm text-gray-600 dark:text-gray-400 underline underline-offset-2"
          >
            Poczta idzie z własnego serwera? Podaj jego adres
          </button>
        )}
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Bez podania serwera sprawdzamy serwery poczty z rekordów MX domeny.
        </p>
      </form>

      {blad && (
        <p role="alert" className="mt-4 text-sm text-red-700 dark:text-red-400">
          {blad}
        </p>
      )}

      {wynik && (
        <div
          className="mt-5 border-t border-gray-200/70 dark:border-gray-700/70 pt-4"
          aria-live="polite"
        >
          <p
            className={`text-base font-semibold ${
              wynik.na_liscie ? KOLOR.lista : KOLOR.czysto
            }`}
          >
            {wynik.na_liscie
              ? `${wynik.domena}: poczta jest na ${wynik.na_liscie} ${wynik.na_liscie === 1 ? "liście" : "listach"} spamowych`
              : `${wynik.domena}: nie ma wpisu na żadnej z ${wynik.sprawdzono} sprawdzonych list`}
          </p>
          {wynik.uwagi.map((u) => (
            <p
              key={u}
              className="mt-2 text-sm text-gray-600 dark:text-gray-400"
            >
              {u}
            </p>
          ))}
          {wynik.adresy.length > 0 && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Sprawdzone adresy IP: {wynik.adresy.join(", ")}
            </p>
          )}
          <ul className="mt-3 divide-y divide-gray-200/70 dark:divide-gray-700/70 text-sm">
            {listy.map((l) => (
              <li
                key={l.nazwa}
                className="flex items-start justify-between gap-3 py-2"
              >
                <span>
                  <a
                    href={l.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 dark:text-white underline-offset-2 hover:underline"
                  >
                    {l.nazwa}
                  </a>
                  {l.cele.length > 0 && (
                    <span className="block text-xs text-red-700 dark:text-red-400">
                      {l.cele.join(", ")}
                    </span>
                  )}
                </span>
                <span className={`shrink-0 font-semibold ${KOLOR[l.status]}`}>
                  {ETYKIETA[l.status]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-5 border-t border-gray-200/70 dark:border-gray-700/70 pt-4">
        {stan === "juz" ? (
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            Ta domena jest już pilnowana dla adresu {email}. Nic więcej nie trzeba robić.
          </p>
        ) : stan === "zapisano" ? (
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            Gotowe. Pierwszy wynik wysłaliśmy na {email}. Od teraz sprawdzamy
            codziennie i piszemy tylko wtedy, gdy coś się zmieni.
          </p>
        ) : (
          <form onSubmit={zapisz}>
            <label
              htmlFor="cl-email"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Chcesz alert, gdy domena trafi na listę?
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                id="cl-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="twoj@adres.pl"
                className={`${POLE} flex-1`}
              />
              <button
                type="submit"
                disabled={stan === "zap" || !domena.trim()}
                className="btn-primary disabled:opacity-50"
              >
                {stan === "zap" ? "Zapisujemy…" : "Pilnuj za darmo"}
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Sprawdzamy codziennie. Do 3 domen na adres, wypisanie jednym
              kliknięciem z maila.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
