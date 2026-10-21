import RevealOnScroll from "./RevealOnScroll";

const ETAPY = [
  { nazwa: "Szkic", opis: "Układ strony na kartce: co jest na górze, co pod spodem.", styl: "szkic" },
  { nazwa: "Makieta", opis: "Ten sam układ z prawdziwymi tekstami, bez kolorów.", styl: "makieta" },
  { nazwa: "Gotowa strona", opis: "Kolory, zdjęcia i formularz podpięty do CRM.", styl: "gotowa" },
] as const;

function Miniatura({ styl }: { styl: (typeof ETAPY)[number]["styl"] }) {
  const baza = "rounded-md";
  const blok =
    styl === "szkic"
      ? `${baza} border border-dashed border-gray-400 dark:border-gray-500`
      : styl === "makieta"
        ? `${baza} bg-gray-200 dark:bg-gray-700`
        : `${baza} bg-accent-solid`;
  const tekst =
    styl === "szkic"
      ? "border-t border-dashed border-gray-400 dark:border-gray-500"
      : styl === "makieta"
        ? "bg-gray-300 dark:bg-gray-600"
        : "bg-gray-300 dark:bg-gray-600";
  return (
    <div
      aria-hidden="true"
      className="mx-auto flex h-40 w-full max-w-[14rem] flex-col gap-2 rounded-xl border border-gray-200 bg-white p-3 dark:border-white/10 dark:bg-gray-900"
    >
      <div className={`h-3 w-1/3 ${styl === "gotowa" ? "rounded-md bg-accent" : blok}`} />
      <div className={`h-12 ${blok} ${styl === "gotowa" ? "bg-gradient-to-br from-accent-solid to-indigo-800" : ""}`} />
      <div className="mt-1 grid grow grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`${styl === "szkic" ? blok : "rounded-md " + tekst}`} />
        ))}
      </div>
    </div>
  );
}

export default function TasmaEtapow() {
  return (
    <section aria-label="Etapy projektu strony" className="container-wide py-12">
      <RevealOnScroll>
        <h2 className="h2-sekcji mb-10 text-center">Od szkicu do gotowej strony</h2>
        <ol className="grid items-start gap-8 md:grid-cols-3">
          {ETAPY.map((e, i) => (
            <li key={e.nazwa} className="relative text-center">
              <Miniatura styl={e.styl} />
              <p className="mt-4 text-lg font-semibold">
                <span className="tabular-nums text-accent">{i + 1}</span> {e.nazwa}
              </p>
              <p className="mx-auto mt-1 max-w-[16rem] text-sm text-gray-600 dark:text-gray-400">
                {e.opis}
              </p>
              {i < ETAPY.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-5 top-16 hidden text-2xl text-accent md:block"
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </RevealOnScroll>
    </section>
  );
}
