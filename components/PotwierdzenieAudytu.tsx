"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AnimacjaWyslania from "@/components/AnimacjaWyslania";
import { zglosZdarzenie } from "@/lib/zdarzenie";

/** Po powrocie ze Stripe prosi serwer o sprawdzenie płatności i start audytu. */
export default function PotwierdzenieAudytu({ sesja }: { sesja: string }) {
  const [stan, setStan] = useState<"" | "ok" | "blad">("");
  const [email, setEmail] = useState("");
  const [blad, setBlad] = useState("");

  useEffect(() => {
    fetch("/api/audyt-calosc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sesja }),
    })
      .then(async (odp) => {
        const dane = await odp.json().catch(() => ({}));
        if (!odp.ok) throw new Error(dane.error);
        setEmail(dane.email ?? "");
        setStan("ok");
        if (!dane.juz) zglosZdarzenie("audyt_calosci_oplacony");
      })
      .catch((e: Error) => {
        setBlad(
          e.message ||
            "Nie udało się potwierdzić płatności. Napisz na pawel@fluxlab.pl, a wyślemy raport ręcznie.",
        );
        setStan("blad");
      });
  }, [sesja]);

  if (stan === "blad")
    return (
      <>
        <h1 className="h1-strony mb-4">Nie widzimy płatności</h1>
        <p className="text-gray-600 dark:text-gray-300">{blad}</p>
        <Link
          href="/audyt-strony#audyt-calosci"
          className="btn-secondary mt-8 inline-block"
        >
          Wróć do audytu
        </Link>
      </>
    );

  return (
    <>
      <div className="flex justify-center">
        <AnimacjaWyslania />
      </div>
      <h1 className="h1-strony mb-4">Dziękujemy, płatność przyjęta</h1>
      <p className="text-gray-600 dark:text-gray-300" aria-live="polite">
        {stan === "ok"
          ? `Badamy wszystkie podstrony. Raport przyjdzie na ${email} w ciągu kilku minut. Jeżeli nie dotrze, zajrzyj do spamu.`
          : "Potwierdzamy płatność..."}
      </p>
      <Link href="/audyt-strony" className="btn-secondary mt-8 inline-block">
        Wróć na stronę
      </Link>
    </>
  );
}
