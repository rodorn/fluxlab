"use client";

import { useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";

const POLE =
  "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent";
const ETYKIETA = "block text-sm font-medium text-gray-900 dark:text-white";

export default function DostepKsef({ sesja, codziennie = false, kontrola = false, naleznosci = false, przypomnienia = false }: { sesja: string; codziennie?: boolean; kontrola?: boolean; naleznosci?: boolean; przypomnienia?: boolean }) {
  const [nip, setNip] = useState("");
  const [token, setToken] = useState("");
  const [biuro, setBiuro] = useState("");
  const [zgoda, setZgoda] = useState(false);
  const [blad, setBlad] = useState("");
  const [laduje, setLaduje] = useState(false);
  const [gotowe, setGotowe] = useState(false);

  async function wyslij(e: React.FormEvent) {
    e.preventDefault();
    setBlad("");
    setLaduje(true);
    zglosZdarzenie("ksef_dostep_start");
    try {
      const r = await fetch("/api/ksef-dostep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sesja, nip, token, biuro, zgoda }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) setBlad(j?.error ?? "Nie udało się zapisać danych. Spróbuj za chwilę.");
      else {
        setGotowe(true);
        zglosZdarzenie("ksef_dostep_zapisano");
      }
    } catch {
      setBlad("Nie udało się połączyć. Spróbuj za chwilę.");
    } finally {
      setLaduje(false);
    }
  }

  if (!sesja)
    return (
      <p className="text-sm text-gray-700 dark:text-gray-300">
        Ten adres działa tylko z linku po opłaceniu zamówienia. Jeśli go nie masz, odpisz na mail od nas.
      </p>
    );

  if (gotowe)
    return (
      <div aria-live="polite">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dane zapisane</h1>
        <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
          {przypomnienia
            ? "W ciągu godziny przyjdzie mail startowy z fakturami, które już wymagają przypomnienia. Potem każdego ranka, gdy któraś faktura dojdzie do etapu przypomnienia, dostaniesz gotowy tekst do wysłania nabywcy."
            : naleznosci
            ? "W ciągu godziny przyjdzie pierwsze zestawienie należności z faktur sprzedażowych z ostatnich 90 dni. Potem co poniedziałek rano, razem z listą faktur po terminie."
            : kontrola
            ? "W ciągu godziny przyjdzie mail startowy z wynikiem kontroli faktur kosztowych z ostatnich siedmiu dni. Potem każda nowa faktura jest sprawdzana w Białej Liście MF, a mail dostaniesz od razu, gdy rachunek nie będzie się zgadzał ze sprzedawcą."
            : codziennie
            ? "W ciągu godziny przyjdzie mail z fakturami kosztowymi z ostatnich siedmiu dni. Potem rano, w dni, w których w KSeF pojawią się nowe faktury kosztowe, dostaniesz ich komplet."
            : "Pierwsza paczka z fakturami z bieżącego miesiąca przyjdzie na maila w ciągu godziny. Kolejne dochodzą pierwszego dnia każdego miesiąca."}
        </p>
      </div>
    );

  return (
    <form onSubmit={wyslij} className="grid gap-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dane firmy do KSeF</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Token generujesz w Aplikacji Podatnika KSeF: zakładka Tokeny, Generuj token, uprawnienie do przeglądania faktur. Token
        zapisujemy zaszyfrowany, używamy go tylko do pobrania faktur i usuwamy po anulowaniu subskrypcji.
      </p>
      <label className="block">
        <span className={ETYKIETA}>NIP firmy</span>
        <input value={nip} onChange={(e) => setNip(e.target.value)} inputMode="numeric" autoComplete="off" className={`${POLE} mt-1.5`} />
      </label>
      <label className="block">
        <span className={ETYKIETA}>Token KSeF</span>
        <input value={token} onChange={(e) => setToken(e.target.value)} autoComplete="off" spellCheck={false} className={`${POLE} mt-1.5`} />
      </label>
      <label className="block">
        <span className={ETYKIETA}>{codziennie || kontrola || naleznosci || przypomnienia ? "Dodatkowy adres e-mail, na przykład księgowej (opcjonalnie)" : "E-mail biura rachunkowego (opcjonalnie)"}</span>
        <input type="email" value={biuro} onChange={(e) => setBiuro(e.target.value)} autoComplete="off" className={`${POLE} mt-1.5`} />
        <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">{przypomnienia ? "Bez adresu przypomnienia trafiają tylko do Ciebie. Jeśli go podasz, Ty dostajesz kopię." : naleznosci ? "Bez adresu zestawienie trafia tylko do Ciebie. Jeśli go podasz, Ty dostajesz kopię." : kontrola ? "Bez adresu alerty trafiają tylko do Ciebie. Jeśli go podasz, Ty dostajesz kopię." : codziennie ? "Bez adresu faktury trafiają tylko do Ciebie. Jeśli go podasz, Ty dostajesz kopię." : "Bez adresu paczka trafia tylko do Ciebie. Jeśli go podasz, Ty dostajesz kopię."}</span>
      </label>
      <label className="flex cursor-pointer items-start gap-3">
        <input type="checkbox" checked={zgoda} onChange={(e) => setZgoda(e.target.checked)} className="mt-1 h-4 w-4 shrink-0" />
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Fluxlab może pobierać faktury mojej firmy z KSeF tym tokenem i wysyłać je lub wyniki ich kontroli na podane adresy e-mail.
        </span>
      </label>
      {blad && (
        <p role="alert" className="rounded-lg border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/30 px-4 py-3 text-sm text-red-800 dark:text-red-300">
          {blad}
        </p>
      )}
      <button type="submit" disabled={laduje || !zgoda} className="btn-primary disabled:opacity-60">
        {laduje ? "Zapisywanie…" : codziennie ? "Uruchom wysyłkę faktur" : "Uruchom paczkę"}
      </button>
    </form>
  );
}
