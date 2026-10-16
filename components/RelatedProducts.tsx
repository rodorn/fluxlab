import Link from "next/link";
import { PRODUCTS } from "@/lib/products";

export default function RelatedProducts({ slug }: { slug: string }) {
  const current = PRODUCTS.find((x) => x.href === `/${slug}`);
  if (!current) return null;

  // Poprzednio brane byly zawsze trzy pierwsze pozycje listy, przez co
  // pietnascie z dwudziestu osmiu produktow nie bylo linkowanych znikad, a trzy
  // zbieraly wiekszosc odnosnikow. Teraz pierwsze miejsce zajmuje produkt z tej
  // samej kategorii, wybierany rotacyjnie, a dwa kolejne pochodza z obrotu po
  // calej liscie. Kazdy produkt jest dzieki temu linkowany co najmniej dwa razy.
  const pozycja = PRODUCTS.findIndex((x) => x.href === current.href);
  const related: typeof PRODUCTS = [];

  const tejSamejKategorii = PRODUCTS.filter(
    (x) => x.category === current.category && x.href !== current.href,
  );
  if (tejSamejKategorii.length > 0) {
    const wKategorii = PRODUCTS.filter(
      (x) => x.category === current.category,
    ).findIndex((x) => x.href === current.href);
    related.push(tejSamejKategorii[wKategorii % tejSamejKategorii.length]);
  }

  for (let i = 1; related.length < 3 && i <= PRODUCTS.length; i++) {
    const kandydat = PRODUCTS[(pozycja + i) % PRODUCTS.length];
    if (
      kandydat.href !== current.href &&
      !related.some((r) => r.href === kandydat.href)
    ) {
      related.push(kandydat);
    }
  }

  if (related.length === 0) return null;

  return (
    <div className="mt-16 border-t border-gray-200/80 dark:border-gray-800/80 pt-10">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        To nie to, czego szukasz?
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Inne gotowce ze stałą ceną, które rozwiązują jeden konkretny problem.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {related.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="group rounded-xl border border-gray-200/80 dark:border-gray-800/80 bg-white/60 dark:bg-gray-900/40 p-5 transition-colors hover:border-accent/50"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              {r.tagline}
            </p>
            <h3 className="mt-1.5 text-base font-bold text-gray-900 dark:text-white">
              {r.name}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {r.bullets[0]}
            </p>
            <span className="mt-3 inline-block text-sm font-semibold text-accent">
              {r.price}
              <span className="ml-2 opacity-0 transition-opacity group-hover:opacity-100">
                &rarr;
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
