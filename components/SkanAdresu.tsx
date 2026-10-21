/** Podczas badania: adres w oknie przeglądarki i linia skanu przesuwająca się po
 *  schemacie strony. Kropki odpowiadają etapom z listy obok. */
export default function SkanAdresu({
  domena,
  etap,
  liczbaEtapow,
}: {
  domena: string;
  etap: number;
  liczbaEtapow: number;
}) {
  const blok = "rounded bg-gray-200 dark:bg-white/10";
  return (
    <div
      aria-hidden="true"
      className="mx-auto mt-5 max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900"
    >
      <div className="flex items-center gap-1.5 border-b border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-950">
        <span className="h-2 w-2 rounded-full bg-gray-300 dark:bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-gray-300 dark:bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-gray-300 dark:bg-white/20" />
        <span className="ml-2 min-w-0 flex-1 truncate rounded bg-white px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-900 dark:text-gray-300">
          {domena.replace(/^https?:\/\//, "")}
        </span>
      </div>
      <div className="relative space-y-2.5 overflow-hidden p-4">
        <span className={`block h-3 w-1/3 ${blok}`} />
        <div className="grid grid-cols-[1.4fr_1fr] gap-3">
          <div className="space-y-2">
            <span className={`block h-3 w-4/5 ${blok}`} />
            <span className={`block h-2 w-full ${blok}`} />
            <span className={`block h-2 w-2/3 ${blok}`} />
          </div>
          <span className={`h-14 ${blok}`} />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <span className={`h-8 ${blok}`} />
          <span className={`h-8 ${blok}`} />
          <span className={`h-8 ${blok}`} />
        </div>
        <span aria-hidden="true" className="skan-linia" />
      </div>
      <div className="flex justify-center gap-1.5 border-t border-gray-200 py-2 dark:border-gray-700">
        {Array.from({ length: liczbaEtapow }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
              i < etap
                ? "bg-emerald-500"
                : i === etap
                  ? "bg-accent-solid"
                  : "bg-gray-300 dark:bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
