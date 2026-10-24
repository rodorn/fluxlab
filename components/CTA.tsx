"use client";

import { usePathname } from "next/navigation";
import TrackedCTA from "@/components/TrackedCTA";
import LandingForm from "@/components/LandingForm";

interface CTAProps {
  naglowek?: string;
  opis?: React.ReactNode;
  etykieta?: string;
  href?: string;
}

/**
 * Jeden końcowy blok CTA dla całej strony. Na /kontakt zamiast bloku
 * renderuje pełny formularz diagnozy (tę stronę wywołuje `<CTA />` bez propsów).
 */
export default function CTA({
  naglowek = "Nie wiesz, od czego zacząć?",
  opis = "Bezpłatna diagnoza procesu, bez zobowiązań.",
  etykieta = "Bezpłatna diagnoza",
  href = "/kontakt",
}: CTAProps = {}) {
  const pathname = usePathname();
  if (pathname === "/kontakt") return <CTAFormularz />;
  return (
    <section className="py-4 lg:py-7" aria-label="Kontakt">
      <div className="container-wide">
        <div className="cta-koncowe">
          <h2 className="h2-sekcji">{naglowek}</h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300">{opis}</p>
          <TrackedCTA
            href={href}
            location="cta_koncowe"
            className="btn-primary mt-6"
          >
            {etykieta}
          </TrackedCTA>
        </div>
      </div>
    </section>
  );
}

function CTAFormularz() {
  return (
    <section id="kontakt" className="scroll-mt-16 py-4 lg:py-7">
      <div className="container-wide">
        <LandingForm
          formId="kontakt"
          h1
          heading="Napisz, czego potrzebujesz"
          intro="Odpiszemy z ceną i terminem, tego samego dnia."
        />
      </div>
    </section>
  );
}
