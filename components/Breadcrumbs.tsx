import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const fullItems = [{ label: "Strona główna", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: fullItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `https://fluxlab.pl${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="container-wide pt-20 pb-0">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
          {fullItems.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === fullItems.length - 1;
            const isMiddle = !isFirst && !isLast;
            const showEllipsis = isLast && fullItems.length > 2;
            return (
              <li
                key={index}
                className={`items-center gap-1.5 ${isMiddle ? "hidden sm:flex" : "flex"}`}
              >
                {index > 0 && (
                  <>
                    {showEllipsis && (
                      <span className="text-gray-300 dark:text-gray-600 sm:hidden">
                        …
                      </span>
                    )}
                    <span
                      className={`text-gray-300 dark:text-gray-600 ${showEllipsis ? "hidden sm:inline" : ""}`}
                    >
                      /
                    </span>
                  </>
                )}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-900 dark:text-white font-medium">
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
