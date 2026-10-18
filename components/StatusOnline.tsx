"use client";

import { useEffect, useState } from "react";

function czyOnline(): boolean {
  const h = Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      hourCycle: "h23",
      timeZone: "Europe/Warsaw",
    }).format(new Date()),
  );
  return h >= 9 && h < 23;
}

function godzina(): string {
  return new Intl.DateTimeFormat("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "Europe/Warsaw",
  }).format(new Date());
}

export default function StatusOnline() {
  const [online, setOnline] = useState<boolean | null>(null);
  const [czas, setCzas] = useState("");

  useEffect(() => {
    const odswiez = () => {
      setOnline(czyOnline());
      setCzas(godzina());
    };
    odswiez();
    const id = setInterval(odswiez, 30_000);
    return () => clearInterval(id);
  }, []);

  if (online === null) return null;

  return (
    <p className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-gray-600 dark:text-gray-400">
      <span className="relative flex h-2 w-2" aria-hidden="true">
        {online && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${online ? "bg-green-500" : "bg-gray-400"}`}
        />
      </span>
      <span>{online ? "Jesteśmy online, odpisujemy na bieżąco" : "Odpiszemy od 9:00"}</span>
      <span aria-hidden="true" className="hidden sm:inline">·</span>
      <span className="w-full sm:w-auto">Warszawa, {czas}</span>
    </p>
  );
}
