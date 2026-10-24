import Image from "next/image";

/** Prawdziwy zrzut realizacji FINREAL w ramce przeglądarki, na osi symetrii hero. */
export default function HeroZrzut() {
  return (
    <figure className="animate-fade-up-2 mx-auto mt-14 w-full max-w-4xl lg:mt-16">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-white/10 dark:bg-gray-900">
        <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 py-2.5 dark:border-white/10 dark:bg-white/[0.04]">
          <span aria-hidden="true" className="flex gap-1.5">
            <i className="h-2.5 w-2.5 rounded-full bg-gray-300 dark:bg-white/20" />
            <i className="h-2.5 w-2.5 rounded-full bg-gray-300 dark:bg-white/20" />
            <i className="h-2.5 w-2.5 rounded-full bg-gray-300 dark:bg-white/20" />
          </span>
          <span className="mx-auto min-w-0 truncate rounded-md bg-white px-4 py-1 text-xs tracking-wide text-gray-500 dark:bg-white/[0.06] dark:text-gray-400">
            finreal.pl
          </span>
          <span aria-hidden="true" className="w-[42px]" />
        </div>
        <Image
          src="/photos/realizacja-finreal-2x.webp"
          alt="Strona główna finreal.pl, nasza realizacja"
          width={2880}
          height={1620}
          priority
          sizes="(min-width: 896px) 896px, 100vw"
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="mt-4 text-xs tracking-wide text-gray-500 dark:text-gray-400">
        Realizacja: finreal.pl
      </figcaption>
    </figure>
  );
}
