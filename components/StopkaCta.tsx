"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const BEZ = new Set(["/", "/kontakt", "/dziekuje", "/panel", "/cv"]);

/** Ekran z wezwaniem nad stopką. Na stronie głównej jest formularz, więc tam go nie ma. */
export default function StopkaCta() {
  const sciezka = usePathname();
  if (BEZ.has(sciezka)) return null;
  return (
    <section aria-label="Kontakt" className="mb-10 bg-accent-solid py-16 text-white lg:py-24">
      <div className="container-wide text-center">
        <p className="mx-auto max-w-2xl text-balance text-3xl font-bold leading-tight tracking-tighter lg:text-5xl">
          Napisz, czego potrzebujesz
        </p>
        <p className="mx-auto mt-4 max-w-md text-white/85">
          Odpiszemy z ceną i terminem, tego samego dnia.
        </p>
        <Link
          href="/kontakt"
          className="mt-8 inline-flex items-center justify-center rounded-2xl bg-white px-8 py-3.5 text-base font-semibold tracking-tight text-indigo-700 transition-transform hover:-translate-y-0.5"
        >
          Zamów wycenę
        </Link>
      </div>
    </section>
  );
}
