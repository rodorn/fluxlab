"use client";

import { useState } from "react";

type Agent = { imie: string; rejon: string; slowa: string[] };

const AGENCI: Agent[] = [
  {
    imie: "Agent 1",
    rejon: "Mokotów, Służewiec, Ursynów",
    slowa: ["mokot", "służew", "sluzew", "ursyn"],
  },
  {
    imie: "Agent 2",
    rejon: "Ursus, Włochy, Pruszków",
    slowa: ["ursus", "włoch", "wloch", "pruszk"],
  },
  {
    imie: "Agent 3",
    rejon: "Wola, Ochota, Bemowo",
    slowa: ["wola", "ochot", "bemow"],
  },
];

const ETAPY = [
  "Nowe zgłoszenie",
  "Spotkanie umówione",
  "Właściciel się namyśla",
  "Umowa pośrednictwa",
] as const;

type Zgloszenie = {
  id: number;
  imie: string;
  telefon: string;
  typ: string;
  lokalizacja: string;
  pow: string;
  cena: string;
  agent: Agent;
  powod: string;
  etap: number;
  godzina: string;
};

const PRZYKLADY: Zgloszenie[] = [
  {
    id: 1,
    imie: "Marta K.",
    telefon: "600 *** ***",
    typ: "Mieszkanie",
    lokalizacja: "Ursus",
    pow: "48",
    cena: "620 000",
    agent: AGENCI[1],
    powod: "rejon",
    etap: 1,
    godzina: "wczoraj 16:40",
  },
  {
    id: 2,
    imie: "Jan P.",
    telefon: "501 *** ***",
    typ: "Dom",
    lokalizacja: "Pruszków",
    pow: "140",
    cena: "1 290 000",
    agent: AGENCI[1],
    powod: "rejon",
    etap: 2,
    godzina: "12.11 10:05",
  },
];

function przydziel(
  lok: string,
  licznik: number,
): { agent: Agent; powod: string } {
  const l = lok.toLowerCase();
  const trafiony = AGENCI.find((a) => a.slowa.some((s) => l.includes(s)));
  if (trafiony) return { agent: trafiony, powod: "rejon" };
  return { agent: AGENCI[licznik % AGENCI.length], powod: "kolejka" };
}

function teraz() {
  const d = new Date();
  return `dziś ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

const pole =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-900 focus:outline-none";

export default function DemoK3n() {
  const [form, setForm] = useState({
    imie: "Anna Nowak",
    email: "anna.nowak@example.com",
    telefon: "600 100 200",
    typ: "Mieszkanie",
    lokalizacja: "Mokotów, ul. Wołoska",
    pow: "54",
    cena: "890 000",
    opis: "2 pokoje, balkon, chcę sprzedać do wiosny.",
  });
  const [lista, setLista] = useState<Zgloszenie[]>(PRZYKLADY);
  const [nowe, setNowe] = useState<Zgloszenie | null>(null);
  const [dni, setDni] = useState(0);

  function wyslij(e: React.FormEvent) {
    e.preventDefault();
    const { agent, powod } = przydziel(form.lokalizacja, lista.length);
    const z: Zgloszenie = {
      id: Date.now(),
      imie: form.imie,
      telefon: form.telefon,
      typ: form.typ,
      lokalizacja: form.lokalizacja,
      pow: form.pow,
      cena: form.cena,
      agent,
      powod,
      etap: 0,
      godzina: teraz(),
    };
    setNowe(z);
    setDni(0);
    setLista((l) => [z, ...l]);
    setTimeout(
      () =>
        document
          .getElementById("crm")
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      50,
    );
  }

  function przesun(id: number, etap: number) {
    setLista((l) => l.map((z) => (z.id === id ? { ...z, etap } : z)));
    if (nowe?.id === id) setNowe({ ...nowe, etap });
  }

  const set =
    (k: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setForm({ ...form, [k]: e.target.value });

  const namysl = nowe?.etap === 2;
  const plan = nowe
    ? namysl
      ? [
          {
            dzien: 3,
            tekst: `Przypomnienie dla ${nowe.agent.imie}: zadzwonić do właściciela, czy podjął decyzję.`,
          },
          {
            dzien: 14,
            tekst:
              "Drugie przypomnienie: wysłać właścicielowi krótkie podsumowanie, jak sprzedają się podobne mieszkania w okolicy.",
          },
          {
            dzien: 45,
            tekst:
              "Trzecie przypomnienie: zapytać, czy temat sprzedaży jest nadal aktualny.",
          },
        ]
      : [
          {
            dzien: 0,
            tekst: `${nowe.agent.imie} dostaje powiadomienie z danymi mieszkania i numerem telefonu właściciela.`,
          },
          {
            dzien: 0,
            tekst:
              "Właściciel dostaje mail: zgłoszenie przyjęte, oddzwoni do Pana/Pani konkretny agent.",
          },
          {
            dzien: 1,
            tekst:
              "Jeśli nikt nie oddzwonił do końca dnia roboczego, przypomnienie trafia do agenta i do kierownika biura.",
          },
        ]
    : [];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 text-gray-900 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Strona k3n.pl / Sprzedaj z nami
        </p>
        <h3 className="mt-1 text-lg font-semibold">Zgłoś ofertę</h3>
        <p className="mt-1 text-sm text-gray-600">
          Te same pola co w formularzu na Państwa stronie. Dane są przykładowe,
          można je zmienić.
        </p>
        <form onSubmit={wyslij} className="mt-4 grid gap-3">
          <input
            className={pole}
            value={form.imie}
            onChange={set("imie")}
            placeholder="Imię i nazwisko"
            required
            aria-label="Imię i nazwisko"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              className={pole}
              value={form.email}
              onChange={set("email")}
              placeholder="Adres email"
              required
              aria-label="Adres email"
            />
            <input
              className={pole}
              value={form.telefon}
              onChange={set("telefon")}
              placeholder="Telefon"
              required
              aria-label="Telefon"
            />
          </div>
          <select
            className={pole}
            value={form.typ}
            onChange={set("typ")}
            aria-label="Typ"
          >
            {["Mieszkanie", "Apartamentowiec", "Dom", "Działka"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <input
            className={pole}
            value={form.lokalizacja}
            onChange={set("lokalizacja")}
            placeholder="Lokalizacja"
            required
            aria-label="Lokalizacja"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              className={pole}
              value={form.pow}
              onChange={set("pow")}
              placeholder="Powierzchnia (m²)"
              required
              aria-label="Powierzchnia"
            />
            <input
              className={pole}
              value={form.cena}
              onChange={set("cena")}
              placeholder="Cena [PLN]"
              required
              aria-label="Cena"
            />
          </div>
          <textarea
            className={pole}
            rows={2}
            value={form.opis}
            onChange={set("opis")}
            placeholder="Opis lub uwagi"
            aria-label="Opis lub uwagi"
          />
          <p className="text-xs text-gray-500">
            Wpisz w lokalizacji np. „Ursus” albo „Wola”, a zgłoszenie trafi do
            innego agenta.
          </p>
          <button
            type="submit"
            className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-black cursor-pointer"
          >
            Wyślij zgłoszenie
          </button>
        </form>
      </div>

      <div
        id="crm"
        className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-gray-900 shadow-sm scroll-mt-24"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          FluxCRM / widok biura
        </p>
        {!nowe ? (
          <div className="mt-3 rounded-xl border border-dashed border-gray-300 p-6 text-sm text-gray-600">
            Wyślij zgłoszenie z formularza „Zgłoś ofertę”. Tutaj zobaczysz, do kogo
            trafiło i co system zaplanował.
          </div>
        ) : (
          <div className="mt-3 rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-base font-semibold">
                {nowe.typ}, {nowe.lokalizacja}
              </h3>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                {ETAPY[nowe.etap]}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              {nowe.pow} m², {nowe.cena} zł · {nowe.imie}, {nowe.telefon} ·{" "}
              {nowe.godzina}
            </p>
            <p className="mt-3 text-sm">
              Przydzielone: <strong>{nowe.agent.imie}</strong>{" "}
              <span className="text-gray-600">
                (
                {nowe.powod === "rejon"
                  ? `obsługuje rejon ${nowe.agent.rejon}`
                  : "lokalizacja spoza rejonów, przydział po kolei"}
                )
              </span>
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {ETAPY.map((e, i) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => przesun(nowe.id, i)}
                  className={`rounded-lg border px-2.5 py-1 text-xs cursor-pointer ${i === nowe.etap ? "border-gray-900 bg-gray-900 text-white" : "border-gray-300 bg-white text-gray-700 hover:border-gray-500"}`}
                >
                  {e}
                </button>
              ))}
            </div>
            <h4 className="mt-4 text-sm font-semibold">
              {namysl
                ? "Plan powrotów do właściciela, który się namyśla"
                : "Co system robi sam"}
            </h4>
            <ul className="mt-2 space-y-2">
              {plan.map((p) => {
                const minelo = dni >= p.dzien;
                return (
                  <li
                    key={p.tekst}
                    className={`flex gap-3 rounded-lg p-2 text-sm ${minelo && namysl ? "bg-amber-50" : ""}`}
                  >
                    <span className="w-16 shrink-0 text-xs font-semibold text-gray-500">
                      {p.dzien === 0 ? "od razu" : `dzień ${p.dzien}`}
                    </span>
                    <span>{p.tekst}</span>
                  </li>
                );
              })}
            </ul>
            {namysl ? (
              <div className="mt-3 flex items-center gap-3 text-sm">
                <button
                  type="button"
                  onClick={() =>
                    setDni((d) => (d < 3 ? 3 : d < 14 ? 14 : d < 45 ? 45 : 0))
                  }
                  className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium hover:border-gray-500 cursor-pointer"
                >
                  {dni >= 45
                    ? "Wróć do dnia 0"
                    : "Przewiń czas do następnego przypomnienia"}
                </button>
                <span className="text-gray-600">dzień {dni}</span>
              </div>
            ) : (
              <p className="mt-3 text-xs text-gray-500">
                Kliknij „Właściciel się namyśla”, żeby zobaczyć plan powrotów.
              </p>
            )}
          </div>
        )}

        <h4 className="mt-5 text-sm font-semibold">Wszystkie zgłoszenia</h4>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {ETAPY.map((e, i) => (
            <div
              key={e}
              className="rounded-lg border border-gray-200 bg-white p-2"
            >
              <p className="text-xs font-semibold text-gray-500">{e}</p>
              {lista
                .filter((z) => z.etap === i)
                .map((z) => (
                  <p
                    key={z.id}
                    className="mt-1.5 rounded bg-gray-50 px-2 py-1 text-xs"
                  >
                    {z.typ}, {z.lokalizacja}
                    <br />
                    <span className="text-gray-500">{z.agent.imie}</span>
                  </p>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
