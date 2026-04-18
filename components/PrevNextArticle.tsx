import Link from "next/link";
import { categories, type Article } from "@/lib/categories";

interface PrevNextArticleProps {
  currentHref: string;
}

export default function PrevNextArticle({ currentHref }: PrevNextArticleProps) {
  const flat: Article[] = categories.flatMap((c) => c.articles);
  const idx = flat.findIndex((a) => a.href === currentHref);

  if (idx === -1) return null;

  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx < flat.length - 1 ? flat[idx + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Nawigacja między artykułami"
      className="grid md:grid-cols-2 gap-4"
    >
      {prev ? (
        <Link
          href={prev.href}
          className="group block rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:border-accent/60 dark:hover:border-accent/60 transition-colors"
        >
          <span className="section-label block mb-2">&larr; Poprzedni</span>
          <span className="block text-base font-semibold text-gray-900 dark:text-white group-hover:text-accent">
            {prev.title}
          </span>
          <span className="block mt-1 text-sm text-gray-600 dark:text-gray-400">
            {prev.description}
          </span>
        </Link>
      ) : (
        <div className="hidden md:block" aria-hidden="true" />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group block rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:border-accent/60 dark:hover:border-accent/60 transition-colors md:text-right"
        >
          <span className="section-label block mb-2">Następny &rarr;</span>
          <span className="block text-base font-semibold text-gray-900 dark:text-white group-hover:text-accent">
            {next.title}
          </span>
          <span className="block mt-1 text-sm text-gray-600 dark:text-gray-400">
            {next.description}
          </span>
        </Link>
      ) : (
        <div className="hidden md:block" aria-hidden="true" />
      )}
    </nav>
  );
}
