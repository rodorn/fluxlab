"use client";

import { useSyncExternalStore } from "react";

export type PozycjaKoszyka = {
  id: string;
  nazwa: string;
  cena: string;
  href: string;
  rodzaj: "abonament" | "dodatek" | "usluga";
  /** Klucz z `OFERTA`: pozycja ze stałą ceną, płatna online. */
  oferta?: string;
  /** Id przycisku, z którego wybrano wariant. */
  grupa?: string;
};

const KLUCZ = "fl-koszyk";
const ZDARZENIE = "fl-koszyk";
const PUSTY: PozycjaKoszyka[] = [];
let pamiec: PozycjaKoszyka[] | null = null;

function czytaj(): PozycjaKoszyka[] {
  if (pamiec) return pamiec;
  try {
    const v = JSON.parse(localStorage.getItem(KLUCZ) || "[]");
    pamiec = Array.isArray(v) ? v : PUSTY;
  } catch {
    pamiec = PUSTY;
  }
  return pamiec;
}

function zapisz(lista: PozycjaKoszyka[]) {
  pamiec = lista;
  try {
    localStorage.setItem(KLUCZ, JSON.stringify(lista));
  } catch {}
  window.dispatchEvent(new Event(ZDARZENIE));
}

function subskrybuj(cb: () => void) {
  const zInnejKarty = (e: StorageEvent) => {
    if (e.key === KLUCZ) {
      pamiec = null;
      cb();
    }
  };
  window.addEventListener(ZDARZENIE, cb);
  window.addEventListener("storage", zInnejKarty);
  return () => {
    window.removeEventListener(ZDARZENIE, cb);
    window.removeEventListener("storage", zInnejKarty);
  };
}

export function useKoszyk() {
  return useSyncExternalStore(subskrybuj, czytaj, () => PUSTY);
}

const nazwa = (s: string) => s.toLocaleLowerCase("pl").replace(/\s+/g, " ").trim();

export function wKoszyku(lista: PozycjaKoszyka[], p: PozycjaKoszyka) {
  return lista.some((x) => pasuje(x, p));
}

const pasuje = (x: PozycjaKoszyka, p: PozycjaKoszyka) =>
  x.id === p.id || x.grupa === p.id || nazwa(x.nazwa) === nazwa(p.nazwa) || (!!p.oferta && x.oferta === p.oferta);

export function przelacz(p: PozycjaKoszyka) {
  const lista = czytaj();
  zapisz(wKoszyku(lista, p) ? lista.filter((x) => !pasuje(x, p)) : [...lista, p]);
}

export function dodaj(p: PozycjaKoszyka) {
  const lista = czytaj();
  if (!wKoszyku(lista, p)) zapisz([...lista, p]);
}

export function usunOplacone() {
  zapisz(czytaj().filter((x) => !x.oferta));
}

export function usun(id: string) {
  zapisz(czytaj().filter((x) => x.id !== id));
}

export function wyczysc() {
  zapisz([]);
}
