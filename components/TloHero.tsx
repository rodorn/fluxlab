/** Dekoracyjne tło hero: siatka punktów. Światło pod kursorem daje TloKursora. */
export default function TloHero() {
  return (
    <div
      aria-hidden="true"
      className="tlo-hero pointer-events-none absolute inset-x-0 top-0 z-0 h-[90vh] overflow-hidden"
    >
      <div className="tlo-hero__warstwa">
        <div className="tlo-hero__siatka" />
      </div>
    </div>
  );
}
