import daty from "@/lib/daty-stron.json";

const MIESIACE = [
  "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
  "lipca", "sierpnia", "września", "października", "listopada", "grudnia",
];

/** Autor i data ostatniej zmiany strony, z historii gita (lib/daty-stron.json). */
export default function PodpisAutora({ href }: { href: string }) {
  const iso = (daty as Record<string, string>)[href];
  if (!iso) return null;
  const d = new Date(iso);
  const data = `${d.getDate()} ${MIESIACE[d.getMonth()]} ${d.getFullYear()}`;
  return (
    <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
      Autor: Paweł Iwanek, Fluxlab. Zaktualizowano{" "}
      <time dateTime={iso}>{data}</time>.
    </p>
  );
}
