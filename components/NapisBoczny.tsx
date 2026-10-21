/** Pionowy napis z nazwą sekcji przy lewej krawędzi, tylko od 1280 px.
 *  Rodzic musi mieć position: relative. Napis przykleja się pod nagłówkiem. */
export default function NapisBoczny({ tekst }: { tekst: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[calc(50%-50vw+1.5rem)] hidden xl:block">
      <span className="napis-boczny sticky top-32">{tekst}</span>
    </div>
  );
}
