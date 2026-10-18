/** H1 w HTML od razu; słowa wjeżdżają kolejno wyłącznie przez CSS (opacity/transform). */
export default function NaglowekSklada({ tekst }: { tekst: string }) {
  const slowa = tekst.split(" ");
  return (
    <h1 className="text-balance text-5xl font-bold leading-[0.95] tracking-tighter sm:text-7xl lg:text-8xl">
      {slowa.map((s, i) => (
        <span key={i}>
          <span
            className="h1-sklada"
            style={{ animationDelay: `${Math.round((i * 400) / Math.max(slowa.length - 1, 1))}ms` }}
          >
            {s}
          </span>
          {i < slowa.length - 1 ? " " : ""}
        </span>
      ))}
    </h1>
  );
}
