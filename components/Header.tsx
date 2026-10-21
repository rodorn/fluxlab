import HeaderKlient from "./HeaderKlient";
import { MENU, OPIS_MENU } from "@/lib/menu";

/** Dane menu (nazwy stron, kategorie, opisy) czyta serwer i przekazuje gotowe.
 *  Dzięki temu cały sitemap z lib/sekcje.ts i lib/categories.ts nie jedzie
 *  do przeglądarki jako JavaScript na każdej podstronie. */
export default function Header() {
  return <HeaderKlient menu={MENU} opisy={OPIS_MENU} />;
}
