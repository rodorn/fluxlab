"use client";

import { useSyncExternalStore } from "react";

export type PozycjaKoszyka = {
  id: string;
  nazwa: string;
  cena: string;
  href: string;
  rodzaj: "abonament" | "dodatek" | "usluga";
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

export function przelacz(p: PozycjaKoszyka) {
  const lista = czytaj();
  zapisz(lista.some((x) => x.id === p.id) ? lista.filter((x) => x.id !== p.id) : [...lista, p]);
}

export function usun(id: string) {
  zapisz(czytaj().filter((x) => x.id !== id));
}

export function wyczysc() {
  zapisz([]);
}
