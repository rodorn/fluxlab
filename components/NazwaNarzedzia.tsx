import { businessTools, NARZEDZIE_WSPOLNE, otherTools } from "@/lib/narzedzia";

/** Nazwa narzędzia nad jego blokiem, ta sama co na kafelku w /narzedzia.
 *  Nagłówek strony jest haczykiem, więc bez tej etykiety wchodzący z kafelka
 *  nie znajdował na stronie nazwy, w którą kliknął. */
export default function NazwaNarzedzia({ href }: { href: string }) {
  const cel = NARZEDZIE_WSPOLNE[href] ?? href;
  const narzedzie = [...businessTools, ...otherTools].find((n) => n.href.split("#")[0] === cel);
  if (!narzedzie) throw new Error(`Brak narzędzia ${href} w lib/narzedzia.ts`);
  return (
    <p className="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
      Darmowe narzędzie: <span className="text-gray-900 dark:text-white">{narzedzie.title}</span>
    </p>
  );
}
