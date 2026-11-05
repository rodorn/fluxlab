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
  opis = "Opisujesz proces w krótkim formularzu. Tego samego dnia odpisujemy, co da się zautomatyzować, za ile i w jakim terminie. Bez zobowiązań.",
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
          intro="Odpiszemy z ceną i terminem, w 1 dzień roboczy."
        />
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-gray-600 dark:text-gray-400">
          Wolisz zadzwonić? Wojtek odbiera w godzinach pracy:{" "}
          <a href="tel:+48665466565" className="font-semibold text-accent hover:underline">
            665 466 565
          </a>
        </p>
      </div>
    </section>
  );
}
