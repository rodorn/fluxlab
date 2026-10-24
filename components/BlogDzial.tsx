import Link from "next/link";
import OkladkaArtykulu from "@/components/OkladkaArtykulu";
import type { Category } from "@/lib/categories";

const dwie = (n: number) => String(n).padStart(2, "0");

function okladka(href: string, bez?: true) {
  return bez ? undefined : `/okladki/${href.split("/").pop()}.webp`;
}

export default function BlogDzial({
  category,
  numer,
}: {
  category: Category;
  numer: number;
}) {
  const [lead, ...reszta] = category.articles;
  return (
    <section
      id={category.slug}
      aria-labelledby={`dzial-${category.slug}`}
      className="scroll-mt-24 border-t border-gray-900 dark:border-gray-100 pt-5 pb-14 lg:pb-20"
    >
      <header className="grid gap-3 lg:grid-cols-12 lg:gap-8 mb-8 lg:mb-10">
        <p
          aria-hidden="true"
          className="lg:col-span-2 text-5xl lg:text-6xl font-light leading-none tabular-nums text-gray-300 dark:text-gray-600"
        >
          {dwie(numer)}
        </p>
        <div className="lg:col-span-10">
          <h2
            id={`dzial-${category.slug}`}
            className="text-2xl lg:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            {category.name}
          </h2>
          <p className="mt-2 max-w-2xl !text-left text-sm text-gray-600 dark:text-gray-400">
            {category.description}
          </p>
          {category.wstep?.map((akapit) => (
            <p
              key={akapit}
              className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400 leading-relaxed"
            >
              {akapit}
            </p>
          ))}
        </div>
      </header>

      {lead && (
        <Link
          href={lead.href}
          className="group grid gap-5 lg:grid-cols-12 lg:gap-8 pb-8 mb-2 border-b border-gray-200 dark:border-gray-700"
        >
          <div className="lg:col-span-5 lg:col-start-3 overflow-hidden rounded-sm lg:order-2">
            <OkladkaArtykulu
              tytul={lead.title}
              src={okladka(lead.href, lead.bezOkladki)}
            />
          </div>
          <div className="lg:col-span-5 lg:order-1 lg:col-start-8 lg:row-start-1 flex flex-col justify-center">
            <p className="text-xs tabular-nums tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-3">
              {dwie(numer)}.01
            </p>
            <h3 className="text-2xl lg:text-3xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-white group-hover:text-accent transition-colors">
              {lead.title}
            </h3>
            <p className="mt-3 !text-left text-gray-600 dark:text-gray-400 leading-relaxed">
              {lead.description}
            </p>
          </div>
        </Link>
      )}

      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-10 lg:col-start-3">
          {reszta.length > 0 && (
            <ol className="grid md:grid-cols-2 md:gap-x-10 list-none p-0 m-0">
              {reszta.map((a, i) => (
                <li
                  key={a.href}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <Link
                    href={a.href}
                    className="group grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 py-4"
                  >
                    <span className="text-sm tabular-nums text-gray-400 dark:text-gray-500 pt-0.5">
                      {dwie(i + 2)}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-base font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors [overflow-wrap:anywhere]">
                        {a.title}
                      </span>
                      <span className="block mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {a.description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          )}

          <Link
            href={`/strefa-wiedzy/kategoria/${category.slug}`}
            className="mt-6 inline-block text-sm font-semibold text-accent hover:underline"
          >
            Wszystkie w tej kategorii →
          </Link>
        </div>
      </div>
    </section>
  );
}
