/** Szkielety bloków, które ładują się dopiero przy zbliżeniu do ekranu.
 *  Wysokość jak prawdziwy blok, więc strona nie skacze. */
export function SzkieletFormularza() {
  return (
    <div
      role="status"
      aria-busy="true"
      className="mx-auto min-h-[32rem] max-w-3xl rounded-2xl border border-gray-200 p-8 dark:border-white/10"
    >
      <span className="sr-only">Wczytujemy formularz.</span>
      <div aria-hidden="true" className="space-y-5 animate-pulse motion-reduce:animate-none">
        <div className="mx-auto h-7 w-2/3 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="mx-auto h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-12 rounded-lg bg-gray-200 dark:bg-gray-800" />
        <div className="h-12 rounded-lg bg-gray-200 dark:bg-gray-800" />
        <div className="h-32 rounded-lg bg-gray-200 dark:bg-gray-800" />
        <div className="mx-auto h-12 w-48 rounded-lg bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  );
}

export function SzkieletSceny() {
  return (
    <div
      role="status"
      aria-busy="true"
      className="mx-auto min-h-[62rem] max-w-5xl lg:min-h-[52rem] rounded-2xl border border-gray-200 p-6 dark:border-white/10"
    >
      <span className="sr-only">Wczytujemy demo.</span>
      <div aria-hidden="true" className="grid h-full gap-4 animate-pulse motion-reduce:animate-none md:grid-cols-2">
        <div className="h-72 rounded-xl bg-gray-200 dark:bg-gray-800" />
        <div className="h-72 rounded-xl bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  );
}
