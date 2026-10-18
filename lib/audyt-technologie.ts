/**
 * Wykrywanie technologii strony z pobranego HTML i nagłówków odpowiedzi.
 * Tylko to, co widać z zewnątrz: nazwy plików, parametry ?ver=, meta
 * generator, nagłówki. Gdy wersji nie widać, mówimy to wprost.
 */

import { ocenWersje, type Status } from "./wersjeBibliotek";

export type Technologia = {
  id: string;
  nazwa: string;
  kategoria: "cms" | "biblioteka" | "framework" | "serwer" | "analityka" | "usluga";
  wersja: string | null;
  status: Status;
  /** Jedno zdanie z oceny wersji, puste dla aktualnych i nieocenianych. */
  powod: string;
  bezpieczenstwo: boolean;
  najnowsza?: string;
};

const WER = String.raw`(\d+\.\d+(?:\.\d+)?)`;

function pierwszy(re: RegExp, tekst: string): string | null {
  return tekst.match(re)?.[1] ?? null;
}

export function wykryjTechnologie(
  html: string,
  naglowki: Headers | Record<string, string>,
): Technologia[] {
  const h = (n: string): string =>
    (naglowki instanceof Headers ? naglowki.get(n) : naglowki[n]) ?? "";
  const wynik: Technologia[] = [];
  const dodaj = (
    id: string,
    nazwa: string,
    kategoria: Technologia["kategoria"],
    wersja: string | null,
  ) => {
    if (wynik.some((t) => t.id === id)) return;
    const o = ocenWersje(id, wersja);
    wynik.push({
      id,
      nazwa,
      kategoria,
      wersja,
      status: o.status,
      powod: o.status === "aktualna" ? "" : o.powod,
      bezpieczenstwo: o.bezpieczenstwo,
      najnowsza: o.najnowsza,
    });
  };

  const metaGen = [...html.matchAll(/<meta\b[^>]*>/gi)]
    .map((m) => m[0])
    .filter((t) => /name=["']generator["']/i.test(t))
    .map((t) => t.match(/content=["']([^"']*)["']/i)?.[1] ?? "");
  const adresy = [...html.matchAll(/\b(?:src|href|data-src)=["']([^"']+)["']/gi)].map(
    (m) => m[1],
  );
  const plik = (a: string) => a.split("?")[0].split("/").pop()?.toLowerCase() ?? "";
  const verQ = (a: string) => a.match(new RegExp(`[?&]ver=${WER}`))?.[1] ?? null;
  const verSciezka = (a: string, nazwa: string) =>
    a.match(new RegExp(`${nazwa}(?:@|/)v?${WER}`, "i"))?.[1] ?? null;
  const znajdz = (
    fPlik: RegExp,
    nazwaSciezki: string,
  ): { wersja: string | null } | null => {
    const dop = adresy.filter((a) => fPlik.test(plik(a)));
    if (!dop.length) return null;
    for (const a of dop) {
      const w = plik(a).match(fPlik)?.[1] ?? verSciezka(a, nazwaSciezki) ?? verQ(a);
      if (w) return { wersja: w };
    }
    return { wersja: null };
  };
  // Wersja wtyczki z jej własnych plików, bez dołączonych bibliotek (lib, vendor),
  // które noszą numer cudzej wersji.
  const wtyczkaVer = (nazwa: string): string | null =>
    adresy
      .filter((a) => a.includes(`/plugins/${nazwa}/`) && !/\/(?:lib|vendor|libs)\//.test(a))
      .map(verQ)
      .find(Boolean) ?? null;
  const gen = (re: RegExp) => metaGen.map((g) => g.match(re)).find(Boolean) ?? null;

  // CMS i platformy
  const wp = /\/wp-content\/|\/wp-includes\//i.test(html) || gen(/wordpress/i);
  if (wp) {
    const w =
      gen(new RegExp(`wordpress\\s+${WER}`, "i"))?.[1] ??
      adresy
        .filter((x) => /\/wp-includes\//i.test(x))
        .map(verQ)
        .find(Boolean) ??
      null;
    dodaj("wordpress", "WordPress", "cms", w);
    if (/\/plugins\/woocommerce\/|woocommerce-/i.test(html))
      dodaj(
        "woocommerce",
        "WooCommerce",
        "cms",
        wtyczkaVer("woocommerce"),
      );
    if (/\/plugins\/elementor\/|elementor-/i.test(html))
      dodaj(
        "elementor",
        "Elementor",
        "cms",
        wtyczkaVer("elementor"),
      );
    if (/\/themes\/Divi\/|et_pb_|et-boc/i.test(html))
      dodaj(
        "divi",
        "Divi",
        "cms",
        pierwszy(new RegExp(`/themes/Divi/[^"'\\s>]*?ver=${WER}`, "i"), html),
      );
  }
  if (gen(/joomla/i) || /\/media\/jui\/|\/media\/system\/js\//i.test(html))
    dodaj("joomla", "Joomla", "cms", gen(new RegExp(`joomla!?\\s*${WER}`, "i"))?.[1] ?? null);
  if (gen(/drupal/i) || /drupal-settings-json|\/sites\/default\/files\//i.test(html) || /drupal/i.test(h("x-generator")))
    dodaj(
      "drupal",
      "Drupal",
      "cms",
      gen(/drupal\s+(\d+)/i)?.[1] ?? h("x-generator").match(/drupal\s+(\d+)/i)?.[1] ?? null,
    );
  if (/wixstatic\.com|static\.parastorage\.com/i.test(html) || gen(/wix\.com/i) || h("x-wix-request-id"))
    dodaj("wix", "Wix", "cms", null);
  if (/cdn\.shopify\.com|Shopify\.theme/i.test(html) || h("x-shopid") || h("x-shopify-stage"))
    dodaj("shopify", "Shopify", "cms", null);
  if (gen(/webflow/i) || /data-wf-page=|website-files\.com/i.test(html))
    dodaj("webflow", "Webflow", "cms", null);
  if (gen(/prestashop/i) || /\/modules\/ps_|prestashop\s*=|var prestashop/i.test(html))
    dodaj("prestashop", "PrestaShop", "cms", gen(new RegExp(`prestashop\\s+${WER}`, "i"))?.[1] ?? null);

  // Biblioteki front-endu
  const jq = znajdz(new RegExp(`^jquery(?:[-.]v?${WER})?(?:\\.slim)?(?:\\.min)?\\.js$`), "jquery");
  if (jq) dodaj("jquery", "jQuery", "biblioteka", jq.wersja);
  const jqui = znajdz(new RegExp(`^jquery[-.]ui(?:[-.]v?${WER})?(?:\\.min)?\\.js$`), "jqueryui|jquery-ui");
  if (jqui) dodaj("jquery-ui", "jQuery UI", "biblioteka", jqui.wersja);
  const bs = znajdz(
    new RegExp(`^bootstrap(?:[-.]v?${WER})?(?:\\.bundle)?(?:\\.min)?\\.(?:js|css)$`),
    "bootstrap",
  );
  if (bs) dodaj("bootstrap", "Bootstrap", "biblioteka", bs.wersja);

  const faAdr = adresy.find((a) => /font-?awesome|fontawesome/i.test(a));
  if (faAdr || /\bfa-(?:solid|brands|regular)\b/.test(html)) {
    const w =
      faAdr?.match(new RegExp(`(?:font-?awesome|fontawesome[\\w-]*)[/@-]v?${WER}`, "i"))?.[1] ??
      faAdr?.match(new RegExp(`releases/v${WER}`, "i"))?.[1] ??
      (faAdr ? verQ(faAdr) : null);
    dodaj("font-awesome", "Font Awesome", "biblioteka", w);
  }

  // Frameworki
  const next = /next\.js/i.test(h("x-powered-by")) || /__NEXT_DATA__|\/_next\//.test(html);
  if (next) dodaj("next", "Next.js", "framework", null);
  if (/__NUXT__|__NUXT_DATA__|\/_nuxt\//.test(html)) dodaj("nuxt", "Nuxt", "framework", null);
  const gatsby = gen(new RegExp(`gatsby\\s+${WER}`, "i"));
  if (gatsby || /___gatsby/.test(html))
    dodaj("gatsby", "Gatsby", "framework", gatsby?.[1] ?? null);
  const ng = html.match(new RegExp(`ng-version=["']${WER}`, "i"));
  if (ng) dodaj("angular", "Angular", "framework", ng[1]);
  else if (/\sng-app[\s=>]|angular(?:\.min)?\.js|angularjs/i.test(html))
    dodaj("angularjs", "AngularJS", "framework", "1");
  const vue = znajdz(
    new RegExp(`^vue(?:[-.]v?${WER})?(?:\\.(?:global|runtime|esm-browser))*(?:\\.prod)?(?:\\.min)?\\.js$`),
    "vue",
  );
  if (vue) dodaj("vue", "Vue", "framework", vue.wersja);
  else if (/\sdata-v-[0-9a-f]{6,8}[\s=>]|id=["']__nuxt["']/i.test(html))
    dodaj("vue", "Vue", "framework", null);
  const react = znajdz(
    new RegExp(`^react(?:-dom)?(?:[-.]v?${WER})?(?:\\.production|\\.development)?(?:\\.min)?\\.js$`),
    "react(?:-dom)?",
  );
  if (react || /data-reactroot|__reactContainer|_reactRootContainer/.test(html) || next)
    dodaj("react", "React", "framework", react?.wersja ?? null);

  // Serwer i język
  const php = h("x-powered-by").match(new RegExp(`PHP/${WER}`, "i"));
  if (php) dodaj("php", "PHP", "serwer", php[1]);
  else if (/php/i.test(h("x-powered-by"))) dodaj("php", "PHP", "serwer", null);
  const serwer = h("server");
  const nginx = serwer.match(new RegExp(`nginx(?:/${WER})?`, "i"));
  if (nginx) dodaj("nginx", "nginx", "serwer", nginx[1] ?? null);
  const apache = serwer.match(new RegExp(`apache(?:/${WER})?`, "i"));
  if (apache) dodaj("apache", "Apache", "serwer", apache[1] ?? null);

  // Analityka i usługi
  if (/googletagmanager\.com\/gtm\.js|GTM-[A-Z0-9]{4,}/.test(html))
    dodaj("gtm", "Google Tag Manager", "analityka", null);
  if (/gtag\/js\?id=G-|["']G-[A-Z0-9]{6,}["']/.test(html))
    dodaj("ga4", "Google Analytics 4", "analityka", null);
  if (/google-analytics\.com\/(?:analytics|ga)\.js|["']UA-\d{4,10}-\d{1,4}["']/.test(html))
    dodaj("universal-analytics", "Universal Analytics", "analityka", null);
  if (/cloudflare/i.test(serwer) || h("cf-ray")) dodaj("cloudflare", "Cloudflare", "usluga", null);

  // Gdy GA4 jest obok UA, UA nie jest problemem samym w sobie, ale zostaje na liście.
  return wynik;
}

/** Technologie, które powinny wejść do oceny jako problem do naprawy. */
export function przestarzale(t: Technologia[]): Technologia[] {
  return t.filter((x) => x.status === "przestarzala");
}
