import Link from "next/link";
import type { ReactNode } from "react";
import { SLOWNIK } from "@/lib/slownik";

/** Pojęcie ze słowniczka w treści artykułu: link do /slownik z objaśnieniem
 *  przy najechaniu albo fokusie. Czysty HTML i CSS, bez skryptu i bez ruszania DOM. */
export default function HasloSlownika({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const h = SLOWNIK.find((x) => x.slug === slug);
  if (!h) throw new Error(`Brak hasła w słowniku: ${slug}`);
  const id = `haslo-sl-${slug}`;
  return (
    <span className="haslo-sl">
      <Link
        href={`/slownik#${slug}`}
        aria-describedby={id}
        className="haslo-sl__link text-accent"
      >
        {children}
      </Link>
      <span role="tooltip" id={id} className="haslo-sl__opis">
        <strong>{h.haslo}.</strong> {h.opis}
      </span>
    </span>
  );
}
