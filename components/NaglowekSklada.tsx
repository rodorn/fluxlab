import SlowoZrodlo from "@/components/SlowoZrodlo";

/** H1 w HTML od razu; słowa wjeżdżają kolejno wyłącznie przez CSS (opacity/transform). */
export default function NaglowekSklada({
  tekst,
  wyroznione = [],
}: {
  tekst: string;
  /** Słowa pisane drugim krojem, kursywą. Słowo {zrodlo} zależy od źródła wejścia. */
  wyroznione?: string[];
}) {
  const slowa = tekst.split(" ");
  return (
    <h1 className="h1-waga text-balance text-5xl font-bold leading-[0.95] tracking-tighter sm:text-7xl lg:text-8xl">
      {slowa.map((s, i) => (
        <span key={i}>
          <span
            className={`h1-sklada${wyroznione.includes(s) ? " slowo-szeryf" : ""}`}
            style={{ animationDelay: `${Math.round((i * 400) / Math.max(slowa.length - 1, 1))}ms` }}
          >
            {s.endsWith("{zrodlo}") ? (
              <>
                {s.slice(0, -8)}
                <SlowoZrodlo />
              </>
            ) : (
              s
            )}
          </span>
          {i < slowa.length - 1 ? " " : ""}
        </span>
      ))}
    </h1>
  );
}
