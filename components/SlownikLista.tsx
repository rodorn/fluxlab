"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SLOWNIK } from "@/lib/slownik";

const posortowane = [...SLOWNIK].sort((a, b) =>
  a.haslo.localeCompare(b.haslo, "pl"),
);

const bezOgonkow = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ł/g, "l");

export default function SlownikLista() {
  const [szukaj, setSzukaj] = useState("");
  const widoczne = useMemo(() => {
    const q = bezOgonkow(szukaj.trim());
    if (!q) return posortowane;
    return posortowane.filter((h) =>
      bezOgonkow(`${h.haslo} ${h.opis}`).includes(q),
    );
  }, [szukaj]);

  return (
    <div>
      <label htmlFor="slownik-szukaj" className="sr-only">
        Szukaj pojęcia
      </label>
      <input
        id="slownik-szukaj"
        type="search"
        value={szukaj}
        onChange={(e) => setSzukaj(e.target.value)}
        placeholder="Wpisz pojęcie, np. KSeF, webhook, DMARC"
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 dark:border-white/10 dark:bg-gray-900 dark:text-white"
      />
      <p
        aria-live="polite"
        className="mt-2 text-sm text-gray-500 dark:text-gray-400"
      >
        {widoczne.length === posortowane.length
          ? `${posortowane.length} pojęć`
          : `Pasuje ${widoczne.length} z ${posortowane.length}`}
      </p>

      <dl className="mt-6 divide-y divide-gray-200 dark:divide-white/10">
        {widoczne.map((h) => (
          <div key={h.slug} id={h.slug} className="scroll-mt-24 py-5">
            <dt className="text-lg font-semibold text-gray-900 dark:text-white">
              {h.haslo}
            </dt>
            <dd className="mt-1 text-gray-600 dark:text-gray-300">
              {h.opis}
              {h.link && (
                <>
                  {" "}
                  <Link
                    href={h.link.href}
                    className="font-semibold text-accent hover:underline"
                  >
                    {h.link.tekst} →
                  </Link>
                </>
              )}
            </dd>
          </div>
        ))}
      </dl>
      {widoczne.length === 0 && (
        <p className="py-6 text-gray-600 dark:text-gray-300">
          Nie mamy jeszcze tego pojęcia.{" "}
          <Link href="/kontakt" className="text-accent hover:underline">
            Napiszcie, o co chodzi
          </Link>
          , odpowiemy i dopiszemy je tutaj.
        </p>
      )}
    </div>
  );
}
