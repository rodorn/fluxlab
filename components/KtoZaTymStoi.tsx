import Image from "next/image";
import Link from "next/link";

export default function KtoZaTymStoi() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-2xl border border-gray-200 bg-white/60 p-6 text-center dark:border-white/10 dark:bg-white/[0.03] sm:flex-row sm:items-start sm:p-8 sm:text-left">
      <Image
        src="/pawel.webp"
        alt="Paweł Iwanek, założyciel Fluxlab"
        width={120}
        height={152}
        className="h-[152px] w-[120px] shrink-0 rounded-xl object-cover ring-1 ring-gray-200 dark:ring-white/10"
      />
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">
          Kto za tym stoi
        </p>
        <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
          Paweł Iwanek
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Od 2020 roku automatyzuje sprzedaż i obsługę klienta w firmach z
          branży samochodowej i finansowej. Każde zlecenie Fluxlab prowadzi
          osobiście, od rozpoznania do wdrożenia.
        </p>
        <p className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold sm:justify-start">
          <Link href="/o-nas" className="text-accent hover:underline">
            Więcej o nas
          </Link>
          <Link href="/realizacje" className="text-accent hover:underline">
            Wdrożenia i efekty
          </Link>
          <a href="mailto:pawel@fluxlab.pl" className="text-accent hover:underline">
            pawel@fluxlab.pl
          </a>
        </p>
      </div>
    </div>
  );
}
