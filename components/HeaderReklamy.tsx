import ZnakFl from "./ZnakFl";

/** Nagłówek strony z reklamy: logo bez linku, telefon i WhatsApp, żadnych
 *  linków wyprowadzających ze strony. */
export default function HeaderReklamy() {
  return (
    <header className="naglowek-szklo fixed top-0 left-0 right-0 z-50 border-b border-gray-200/60 dark:border-white/10">
      <div className="flex h-16 items-center justify-between px-5 lg:px-8">
        <span className="flex shrink-0 items-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          <ZnakFl className="znak-ikona h-7 w-7" />
          <span translate="no">
            flux<span className="text-accent">lab</span>
          </span>
        </span>
        <div className="flex items-center gap-3 text-sm">
          <a
            href="https://wa.me/48665466565?text=Dzie%C5%84%20dobry%2C%20chc%C4%99%20wycen%C4%99%20integracji%20systemu%20z%20KSeF."
            data-cta="whatsapp_naglowek"
            className="font-semibold text-gray-800 underline underline-offset-2 dark:text-gray-200"
          >
            WhatsApp
          </a>
          <a
            href="tel:+48665466565"
            data-cta="telefon_naglowek"
            className="btn-primary px-3 py-2 text-sm"
          >
            665 466 565
          </a>
        </div>
      </div>
    </header>
  );
}
