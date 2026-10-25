import Link from "next/link";
import { ABONAMENTY } from "@/lib/abonamenty";

export default function Abonamenty() {
  return (
    <section className="container-wide pb-12" aria-labelledby="w-abonamencie">
      <h2 id="w-abonamencie" className="h2-sekcji mb-2 text-center">
        W abonamencie
      </h2>
      <p className="mb-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Jedno wdrożenie, potem stała opłata co miesiąc. Dodatki doliczamy do abonamentu.
      </p>
      <ul className="grid gap-4 lg:grid-cols-3">
        {ABONAMENTY.map((a) => (
          <li
            key={a.href}
            className="flex flex-col rounded-2xl border border-gray-200 p-6 dark:border-white/10"
          >
            <Link href={a.href} className="group">
              <span className="text-lg font-bold text-gray-900 group-hover:text-accent dark:text-white">
                {a.nazwa}
              </span>
              <span className="mt-2 block text-2xl font-bold text-accent">
                {a.miesiecznie}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {a.wdrozenie}
              </span>
            </Link>
            <ul className="mt-4 space-y-1 text-sm text-gray-700 dark:text-gray-300">
              {a.wCenie.map((w) => (
                <li key={w} className="flex gap-2">
                  <span aria-hidden className="text-accent">
                    ✓
                  </span>
                  {w}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Dodatki co miesiąc
            </p>
            <ul className="mt-2 flex-1 divide-y divide-gray-100 text-sm dark:divide-white/5">
              {a.dodatki.map((d) => (
                <li key={d.nazwa}>
                  <Link
                    href={d.href}
                    className="flex items-baseline justify-between gap-3 py-2 text-gray-700 hover:text-accent dark:text-gray-300"
                  >
                    <span>{d.nazwa}</span>
                    <span className="shrink-0 font-semibold">{d.cena}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={a.href}
              className="btn-primary mt-5 justify-center"
            >
              Szczegóły i wycena
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
