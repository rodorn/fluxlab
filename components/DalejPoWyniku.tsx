"use client";

import { zglosZdarzenie } from "@/lib/zdarzenie";

// Zdanie pod wynikiem narzedzia. Uruchomienia byly, ale zadne nie prowadzilo
// dalej, a kampania w adresie pokazuje w liczniku, z ktorego narzedzia ktos przyszedl.
export default function DalejPoWyniku({ kampania }: { kampania: string }) {
  return (
    <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
      Chcecie, żebyśmy to naprawili?{" "}
      <a
        href={`/kontakt?utm_source=narzedzie&utm_campaign=${kampania}`}
        onClick={() => zglosZdarzenie("klik_po_wyniku")}
        className="font-semibold text-accent underline underline-offset-2"
      >
        Napiszcie, odpowiadamy mailem
      </a>
      .
    </p>
  );
}
