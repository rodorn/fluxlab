"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { OFERTA } from "@/lib/sprzedaz";
import { zl } from "@/lib/wycena";
import { readUtm } from "@/lib/zrodlo";
import { zglosZdarzenie } from "@/lib/zdarzenie";

const pole =
  "w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-base text-gray-900 placeholder-gray-500 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 aria-[invalid=true]:border-red-600 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400";

/** Zamówienie abonamentu z okresem bez opłat: cena z lib/sprzedaz.ts,
 *  zgłoszenie idzie przez /api/contact do kolektora (FluxCRM) i maila. */
export default function ZamowienieProba({
  id,
  dniGratis = 10,
  waznoscDni,
  pole: poleDane,
  pole2: poleDane2,
}: {
  id: string;
  dniGratis?: number;
  waznoscDni?: number;
  pole?: string;
  pole2?: string;
}) {
  const o = { ...OFERTA[id], ...(poleDane && { pole: poleDane }), ...(poleDane2 && { pole2: poleDane2 }) };
  const [wazneDo, setWazneDo] = useState<string | null>(null);
  useEffect(() => {
    if (!waznoscDni) return;
    const d = new Date(Date.now() + waznoscDni * 864e5);
    setWazneDo(d.toLocaleDateString("pl-PL", { day: "numeric", month: "numeric", year: "numeric" }));
  }, [waznoscDni]);
  const router = useRouter();
  const [wysylka, setWysylka] = useState(false);
  const [blad, setBlad] = useState<string | null>(null);
  const [zlyEmail, setZlyEmail] = useState(false);
  const cena = `${zl(o.netto)}${o.miesiecznie ? "/mies." : ""}`;

  async function wyslij(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const wartosc = (n: string) =>
      (
        (f.elements.namedItem(n) as HTMLInputElement | null)?.value ?? ""
      ).trim();
    const email = f.elements.namedItem("email") as HTMLInputElement;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      setZlyEmail(true);
      email.focus();
      setBlad("Wpisz adres e-mail, na który wyślemy kod kalkulatora.");
      return;
    }
    const telefon = wartosc("phone");
    const opis = [
      `Zamówienie: ${o.nazwa}, ${cena} netto, pierwsze ${dniGratis} dni bez opłat.`,
      wazneDo && `Cena z oferty ważnej do ${wazneDo}.`,
      o.pole && `${o.pole}: ${wartosc("dane") || "-"}`,
      o.pole2 && `${o.pole2}: ${wartosc("dane2") || "-"}`,
      `Strona: ${location.pathname}`,
    ]
      .filter(Boolean)
      .join("\n");
    const dane = {
      imie: wartosc("imie"),
      email: email.value.trim(),
      company: wartosc("company"),
      problemType: `Zamówienie: ${o.nazwa} (${dniGratis} dni gratis)`,
      problemScale: "zamowienie",
      message: opis,
      contactPref: telefon ? "phone" : "email",
      phone: telefon,
      termin: "",
      website: wartosc("website"),
      skad: "",
      powod: "",
      ...readUtm(),
    };
    setWysylka(true);
    setBlad(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dane),
      });
      if (res.ok) {
        if (!dane.website) zglosZdarzenie(`zamowienie_proba_${id}`);
        router.push(
          `/dziekuje?${new URLSearchParams({ type: dane.problemType, scale: dane.problemScale })}`,
        );
        return;
      }
      const odp = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      setBlad(
        odp?.error ?? "Nie udało się wysłać. Napisz na pawel@fluxlab.pl.",
      );
    } catch {
      setBlad(
        "Problem z połączeniem. Spróbuj ponownie albo napisz na pawel@fluxlab.pl.",
      );
    }
    setWysylka(false);
  }

  return (
    <form
      id="zamow"
      data-pasek={`Zamów, ${dniGratis} dni gratis`}
      noValidate
      onSubmit={wyslij}
      onInput={() => {
        setZlyEmail(false);
        setBlad(null);
      }}
      className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-xl shadow-accent/10 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-accent-solid sm:p-6 dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {o.nazwa}
        </h2>
        <p className="text-gray-900 dark:text-white">
          <span className="text-2xl font-bold">{cena}</span>{" "}
          <span className="text-sm text-gray-600 dark:text-gray-400">
            netto
          </span>
        </p>
      </div>
      <ul className="mt-3 space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
        <li>
          <strong className="font-semibold text-gray-900 dark:text-white">
            Pierwsze {dniGratis} dni gratis.
          </strong>{" "}
          Bez karty i bez umowy.
        </li>
        <li>
          Kod do wklejenia na stronę z Twoimi cenami i kontaktem w 1 dzień
          roboczy.
        </li>
        <li>
          Po {dniGratis} dniach proforma na tę kwotę. Nie płacisz, kalkulator się
          wyłącza. Rezygnacja w dowolnym dniu.
        </li>
        {waznoscDni && (
          <li>
            Oferta ważna {waznoscDni} dni{wazneDo && `, do ${wazneDo}`}.
          </li>
        )}
      </ul>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <label htmlFor="zamow-website">Nie wypełniaj tego pola</label>
        <input
          id="zamow-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>
      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        <label className="sr-only" htmlFor="zamow-imie">
          Imię
        </label>
        <input
          id="zamow-imie"
          name="imie"
          autoComplete="given-name"
          placeholder="Imię"
          className={pole}
        />
        <label className="sr-only" htmlFor="zamow-email">
          E-mail (wymagany)
        </label>
        <input
          id="zamow-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="E-mail *"
          aria-invalid={zlyEmail || undefined}
          className={pole}
        />
        <label className="sr-only" htmlFor="zamow-firma">
          Firma
        </label>
        <input
          id="zamow-firma"
          name="company"
          autoComplete="organization"
          placeholder="Firma"
          className={pole}
        />
        <label className="sr-only" htmlFor="zamow-tel">
          Telefon
        </label>
        <input
          id="zamow-tel"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Telefon (opcjonalnie)"
          className={pole}
        />
        {o.pole && (
          <>
            <label
              className="-mb-1 mt-1 text-sm text-gray-700 sm:col-span-2 dark:text-gray-300"
              htmlFor="zamow-dane"
            >
              {o.pole}
            </label>
            <input
              id="zamow-dane"
              name="dane"
              className={`${pole} sm:col-span-2`}
            />
          </>
        )}
        {o.pole2 && (
          <>
            <label
              className="-mb-1 mt-1 text-sm text-gray-700 sm:col-span-2 dark:text-gray-300"
              htmlFor="zamow-dane2"
            >
              {o.pole2}
            </label>
            <input
              id="zamow-dane2"
              name="dane2"
              className={`${pole} sm:col-span-2`}
            />
          </>
        )}
      </div>
      <button
        type="submit"
        disabled={wysylka}
        className="btn-primary btn-lg mt-4 w-full disabled:opacity-60"
      >
        {wysylka ? "Wysyłanie..." : `Zamawiam, ${dniGratis} dni gratis`}
      </button>
      {blad && (
        <p
          role="alert"
          className="mt-2 text-center text-sm text-red-700 dark:text-red-400"
        >
          {blad}
        </p>
      )}
      <p className="mt-2 text-center text-xs text-gray-600 dark:text-gray-400">
        Wolisz rozmowę? Zadzwoń:{" "}
        <a
          href="tel:+48665466565"
          className="font-semibold text-accent underline underline-offset-2"
        >
          665 466 565
        </a>
        .{" "}
        <Link href="/regulamin" className="underline hover:text-accent">
          Regulamin
        </Link>
        ,{" "}
        <Link
          href="/polityka-prywatnosci"
          className="underline hover:text-accent"
        >
          dane
        </Link>
        .
      </p>
    </form>
  );
}
