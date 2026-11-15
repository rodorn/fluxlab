"use client";

import { useEffect, useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";

type Firma = { nip: string; nazwa: string; status: string; rachunki: number };
type Odp = { ok: boolean; error?: string; firmy?: Firma[]; ograniczone?: boolean; wyslano?: boolean; email?: string; zmieniona?: boolean; nipy?: string[]; odrzucone?: string[] };

const POLE =
  "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent focus:ring-2 focus:ring-accent/30";

const STATUS: Record<string, string> = { Czynny: "Czynny podatnik VAT", Zwolniony: "Zwolniony z VAT", Niezarejestrowany: "Niezarejestrowany", brak: "Brak w wykazie" };

function Lista({ firmy }: { firmy: Firma[] }) {
  return (
    <ul className="mt-3 divide-y divide-gray-200 dark:divide-gray-700 border-t border-gray-200 dark:border-gray-700">
      {firmy.map((x) => (
        <li key={x.nip} className="py-3">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <span className="text-sm font-medium text-gray-900 dark:text-white">{x.nazwa || "firma spoza wykazu"}</span>
            <span className={`text-sm font-semibold ${x.status === "Czynny" ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"}`}>{STATUS[x.status] ?? x.status}</span>
          </div>
          <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-300">
            NIP {x.nip} · rachunków w wykazie: {x.rachunki}
          </p>
        </li>
      ))}
    </ul>
  );
}

async function wyslij(url: string, f: FormData): Promise<Odp> {
  const r = await fetch(url, { method: "POST", body: f });
  const o: Odp = await r.json();
  if (!r.ok || !o.ok) throw new Error(o.error || "Nie udało się sprawdzić firm.");
  return o;
}

/** Podgląd na żywo: do trzech NIP-ów sprawdzanych w wykazie MF, bez płatności i bez zapisu. */
export function PodgladMonitoringu() {
  const [tekst, setTekst] = useState("");
  const [stan, setStan] = useState<"cisza" | "laduje" | "ok" | "blad">("cisza");
  const [d, setD] = useState<Odp | null>(null);
  const [blad, setBlad] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStan("laduje");
    setBlad("");
    zglosZdarzenie("monitoring_kontrahentow_podglad");
    try {
      const f = new FormData();
      f.set("tekst", tekst);
      setD(await wyslij("/api/monitoring-kontrahentow?podglad=1", f));
      setStan("ok");
    } catch (er) {
      setBlad((er as Error).message);
      setStan("blad");
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 sm:p-7 shadow-sm">
      <form onSubmit={submit}>
        <label htmlFor="mk-tekst" className="block text-sm font-medium text-gray-900 dark:text-white">
          Wklej NIP-y swoich kontrahentów
        </label>
        <textarea id="mk-tekst" required rows={4} value={tekst} onChange={(e) => setTekst(e.target.value)} placeholder="Jeden NIP w wierszu albo po przecinku" className={`${POLE} mt-2 font-mono`} />
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="submit" disabled={stan === "laduje"} className="btn-primary disabled:opacity-50">
            {stan === "laduje" ? "Sprawdzamy..." : "Sprawdź firmy"}
          </button>
          <button type="button" onClick={() => setTekst("5250007738\n5260250995\n7740001454")} className="text-sm font-medium text-accent underline underline-offset-2">
            Wstaw przykład
          </button>
        </div>
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Podgląd sprawdza pierwsze 3 firmy. Nic nie zapisujemy.</p>
        {stan === "blad" && (
          <p role="alert" className="mt-3 text-sm text-red-700 dark:text-red-400">
            {blad}
          </p>
        )}
      </form>
      {stan === "ok" && d?.firmy && (
        <div role="status" className="mt-5">
          <Lista firmy={d.firmy} />
          {d.ograniczone && <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">W Twojej liście jest więcej firm. Subskrypcja pilnuje do 50 i pisze, gdy coś się zmieni.</p>}
        </div>
      )}
    </div>
  );
}

/** Panel po płatności: lista pilnowanych firm. Zapis od razu robi pierwsze sprawdzenie i wysyła mail. */
export function PanelMonitoringu({ sesja }: { sesja: string }) {
  const [tekst, setTekst] = useState("");
  const [stan, setStan] = useState<"wczytuje" | "cisza" | "laduje" | "ok" | "blad">("wczytuje");
  const [d, setD] = useState<Odp | null>(null);
  const [blad, setBlad] = useState("");

  useEffect(() => {
    fetch(`/api/monitoring-kontrahentow?sesja=${encodeURIComponent(sesja)}`)
      .then((r) => r.json())
      .then((o: Odp) => {
        if (o.ok && o.nipy?.length) setTekst(o.nipy.join("\n"));
        if (!o.ok) setBlad(o.error ?? "");
        setStan(o.ok ? "cisza" : "blad");
      })
      .catch(() => setStan("cisza"));
  }, [sesja]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStan("laduje");
    setBlad("");
    try {
      const f = new FormData();
      f.set("sesja", sesja);
      f.set("tekst", tekst);
      setD(await wyslij("/api/monitoring-kontrahentow", f));
      setStan("ok");
    } catch (er) {
      setBlad((er as Error).message);
      setStan("blad");
    }
  }

  return (
    <form onSubmit={submit}>
      <label htmlFor="pm-tekst" className="block text-sm font-medium text-gray-900 dark:text-white">
        NIP-y firm do pilnowania (do 50)
      </label>
      <textarea id="pm-tekst" rows={8} value={tekst} onChange={(e) => setTekst(e.target.value)} placeholder="Jeden NIP w wierszu, po przecinku albo kolumna wklejona z Excela" className={`${POLE} mt-2 font-mono`} />
      <button type="submit" disabled={stan === "laduje" || stan === "wczytuje" || !tekst.trim()} className="btn-primary mt-4 disabled:opacity-50">
        {stan === "laduje" ? "Sprawdzamy w wykazie MF..." : "Zapisz listę i włącz monitoring"}
      </button>
      {stan === "blad" && blad && (
        <p role="alert" className="mt-3 text-sm text-red-700 dark:text-red-400">
          {blad}
        </p>
      )}
      {stan === "ok" && d?.firmy && (
        <div role="status" className="mt-5">
          <p className="text-base font-semibold text-gray-900 dark:text-white">Monitoring włączony dla {d.firmy.length} firm.</p>
          <Lista firmy={d.firmy} />
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            {d.wyslano ? `Pierwszy wynik wysłaliśmy na ${d.email}.` : "Nie udało się wysłać maila z wynikiem, wynik widzisz powyżej."} Od jutra sprawdzamy codziennie i piszemy tylko, gdy coś się zmieni.
            {d.odrzucone?.length ? ` Pominęliśmy wpisy, które nie są NIP-em: ${d.odrzucone.join(", ")}.` : ""}
          </p>
        </div>
      )}
    </form>
  );
}
