"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

type Kropka = { id: number; x: number; y: number; wygasa: number };

const CZAS_S = 20;

export default function GraZlapLeada() {
  const [stan, setStan] = useState<"start" | "gra" | "koniec">("start");
  const [kropki, setKropki] = useState<Kropka[]>([]);
  const [zlapane, setZlapane] = useState(0);
  const [wszystkie, setWszystkie] = useState(0);
  const [pozostalo, setPozostalo] = useState(CZAS_S);
  const idRef = useRef(0);
  const zlapRef = useRef(0);
  const wszRef = useRef(0);

  const start = () => {
    idRef.current = 0;
    zlapRef.current = 0;
    wszRef.current = 0;
    setZlapane(0);
    setWszystkie(0);
    setKropki([]);
    setPozostalo(CZAS_S);
    setStan("gra");
  };

  useEffect(() => {
    if (stan !== "gra") return;
    const koniec = Date.now() + CZAS_S * 1000;
    const tik = setInterval(() => {
      const ms = koniec - Date.now();
      setPozostalo(Math.max(0, Math.ceil(ms / 1000)));
      setKropki((k) => k.filter((x) => x.wygasa > Date.now()));
      if (ms <= 0) {
        setKropki([]);
        setZlapane(zlapRef.current);
        setWszystkie(wszRef.current);
        setStan("koniec");
      }
    }, 150);
    let stop = false;
    const nastepny = () => {
      if (stop) return;
      if (Date.now() < koniec - 1500) {
        wszRef.current += 1;
        const id = ++idRef.current;
        const zyje = 1500 + Math.random() * 1000;
        setKropki((k) => [
          ...k,
          { id, x: 6 + Math.random() * 84, y: 8 + Math.random() * 76, wygasa: Date.now() + zyje },
        ]);
      }
      setTimeout(nastepny, 450 + Math.random() * 450);
    };
    const t0 = setTimeout(nastepny, 200);
    return () => {
      stop = true;
      clearInterval(tik);
      clearTimeout(t0);
    };
  }, [stan]);

  const zlap = useCallback((id: number) => {
    setKropki((k) => k.filter((x) => x.id !== id));
    zlapRef.current += 1;
    setZlapane(zlapRef.current);
  }, []);

  return (
    <section className="max-w-xl mx-auto text-left" aria-labelledby="gra-h">
      <h2 id="gra-h" className="text-lg font-bold text-gray-900 dark:text-white mb-1">Złap leada</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        Przez {CZAS_S} sekund leady same uciekają do konkurencji. Kliknij, zanim zniknął.
      </p>
      <div className="relative h-64 rounded-2xl ring-1 ring-gray-200 dark:ring-white/10 bg-gray-50 dark:bg-gray-800/40 overflow-hidden">
        {stan === "gra" && (
          <>
            <span className="absolute top-2 left-3 text-xs font-semibold tabular-nums text-gray-700 dark:text-gray-300">
              Czas: {pozostalo} s
            </span>
            <span className="absolute top-2 right-3 text-xs font-semibold tabular-nums text-gray-700 dark:text-gray-300">
              Złapane: {zlapane}
            </span>
            {kropki.map((k) => (
              <button
                key={k.id}
                type="button"
                onClick={() => zlap(k.id)}
                aria-label="Złap leada"
                style={{ left: `${k.x}%`, top: `${k.y}%` }}
                className="absolute w-11 h-11 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-solid text-white flex items-center justify-center shadow-md active:scale-90 transition-transform"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                  <path d="M3 6h18v12H3z M3 6l9 7 9-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                </svg>
              </button>
            ))}
          </>
        )}
        {stan === "start" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button type="button" onClick={start} className="btn-primary">Start</button>
          </div>
        )}
        {stan === "koniec" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white" role="status">
              Złapałeś {zlapane} z {wszystkie}. Z CRM złapiesz wszystkie.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/wlasny-crm" className="btn-primary">Zobacz własny CRM</Link>
              <button type="button" onClick={start} className="btn-secondary">Jeszcze raz</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
