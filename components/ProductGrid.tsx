import Link from "next/link";
import {
  CATEGORY_INTRO,
  CATEGORY_LABEL,
  productsByCategory,
  type Product,
  type ProductCategory,
} from "@/lib/products";

function Card({ p }: { p: Product }) {
  return (
    <div
      className={`flex flex-col rounded-2xl border p-6 transition-colors ${
        p.featured
          ? "border-accent/60 bg-white/80 dark:bg-gray-900/60"
          : "border-gray-200/80 dark:border-gray-800/80 bg-white/60 dark:bg-gray-900/40 hover:border-accent/50"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-accent">
        {p.tagline}
      </p>
      <h3 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
        {p.name}
      </h3>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{p.desc}</p>
      <ul className="mt-4 space-y-2">
        {p.bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
          >
            <svg
              className="mt-0.5 flex-shrink-0 text-accent"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2.5 7l3 3 6-6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="leading-snug">{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
        <span className="text-lg font-bold text-gray-900 dark:text-white">
          {p.price}
        </span>
      </div>
      <Link
        href={p.href}
        className="btn-primary mt-4 w-full justify-center text-center text-sm"
      >
        {p.cta}
      </Link>
    </div>
  );
}

export default function ProductGrid({
  category,
  showHeading = false,
  headingLevel = "h2",
}: {
  category: ProductCategory;
  showHeading?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const items = productsByCategory(category);
  const Heading = headingLevel;

  return (
    <div>
      {showHeading && (
        <div className="max-w-3xl">
          <Heading className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {CATEGORY_LABEL[category]}
          </Heading>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            {CATEGORY_INTRO[category]}
          </p>
        </div>
      )}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <Card key={p.name} p={p} />
        ))}
      </div>
    </div>
  );
}
