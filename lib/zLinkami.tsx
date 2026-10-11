import Link from "next/link";
import type { ReactNode } from "react";

export type LinkWTekscie = { fraza: string; href: string };

// Zamienia frazy w gotowym zdaniu na linki, bez dopisywania słów. Tekst
// zostaje zwykłym napisem w danych, więc JSON-LD i kopiowanie go nie zmieniają.
export function zLinkami(tekst: string, linki?: LinkWTekscie[]): ReactNode {
  if (!linki?.length) return tekst;
  let czesci: ReactNode[] = [tekst];
  for (const { fraza, href } of linki) {
    czesci = czesci.flatMap((c): ReactNode[] => {
      if (typeof c !== "string" || !c.includes(fraza)) return [c];
      const [przed, ...reszta] = c.split(fraza);
      return [
        przed,
        <Link key={href} href={href} className="text-accent hover:underline">
          {fraza}
        </Link>,
        reszta.join(fraza),
      ];
    });
  }
  return <>{czesci}</>;
}
