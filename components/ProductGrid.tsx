import ProductCard from "@/components/ProductCard";
import {
  CATEGORY_INTRO,
  CATEGORY_LABEL,
  GROUP_INTRO,
  GROUP_LABEL,
  GROUP_ORDER,
  productsByCategory,
  type ProductCategory,
} from "@/lib/products";

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

  const grupy = GROUP_ORDER.map(
    (g) => [g, items.filter((p) => p.grupa === g)] as const,
  ).filter(([, pozycje]) => pozycje.length > 0);

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
      {/* Wewnatrz filaru dzielimy jeszcze na grupy. Trzydziesci kilka kafli
          jednym ciagiem to sciana, w ktorej wdrozenie n8n stoi obok
          sprawdzenia auta i nie widac, ze to zupelnie inny rodzaj pracy. */}
      {grupy.map(([grupa, pozycje]) => (
        <section key={grupa} className="mt-10">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {GROUP_LABEL[grupa]}
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {GROUP_INTRO[grupa]}
          </p>
          <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pozycje.map((p) => (
              <ProductCard key={p.name} p={p} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
