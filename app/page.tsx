import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

const PILLARS = [
  {
    href: "/strony-www",
    img: "/abstract/web.webp",
    num: "01",
    title: "Strony WWW",
    desc: "Stworzę nową stronę internetową dopasowaną do potrzeb firmy. Posiadasz już swoją stronę? Ulepszę witrynę tak, aby korzystanie z niej było bardziej intuicyjne dla klientów!",
    cta: "Sprawdź, jak usprawnimy Twoją stronę",
    // Akcent: fiolet
    ring: "group-hover:ring-violet-400/80 focus-visible:ring-violet-400",
    glow: "from-violet-500/35",
    numColor: "group-hover:text-violet-300",
    btn: "text-violet-300 group-hover:bg-violet-500 group-hover:text-white",
  },
  {
    href: "/automatyzacja-leadow-crm",
    img: "/abstract/automation.webp",
    num: "02",
    title: "Automatyzacja",
    desc: "Czy masz wrażenie, że to, co robisz jest powtarzalne? Przepisujesz te same dane? Wysyłanie tych samych maili, sprawdzanie kalendarza, przydzielanie zadań zespołowi?",
    cta: "Sprawdź, jak zyskać więcej czasu",
    // Akcent: indigo
    ring: "group-hover:ring-accent/80 focus-visible:ring-accent",
    glow: "from-accent/35",
    numColor: "group-hover:text-accent",
    btn: "text-accent group-hover:bg-accent group-hover:text-white",
  },
  {
    href: "/scraping-danych",
    img: "/abstract/data.webp",
    num: "03",
    title: "Dane",
    desc: "Zbieranie danych ze stron internetowych, maili i innych plików wymaga czasu. Sprawię, że dane będą przejrzyste i czytelne, a gotowe raporty oszczędzą Ci godziny pracy.",
    cta: "Sprawdź, jak",
    // Akcent: zieleń
    ring: "group-hover:ring-emerald-400/80 focus-visible:ring-emerald-400",
    glow: "from-emerald-500/35",
    numColor: "group-hover:text-emerald-300",
    btn: "text-emerald-300 group-hover:bg-emerald-500 group-hover:text-white",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-white min-h-screen lg:h-screen overflow-hidden pt-16">
        {/* Hasło */}
        <div className="relative z-20 px-6 lg:px-10 pt-7 pb-6 lg:pb-8 col-enter-1">
          <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white/90">
            Z czym mogę pomóc?
          </h1>
        </div>

        {/* 3 kolumny wyboru — zaokrąglone karty z odstępem */}
        <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 px-4 lg:px-5 pb-4 lg:pb-5">
          {PILLARS.map((p, idx) => (
            <Link
              key={p.href}
              href={p.href}
              className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl min-h-[34vh] lg:min-h-0 ring-1 ring-gray-200 dark:ring-white/10 transition-all duration-300 focus:outline-none ${p.ring} hover:ring-2 ${
                ["col-enter-1", "col-enter-2", "col-enter-3"][idx]
              }`}
            >
              {/* Abstrakcyjne tło — ken-burns (zoom + pan) na hover */}
              <Image
                src={p.img}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="ken-burns-img object-cover opacity-55 saturate-[0.85] group-hover:opacity-100 group-hover:saturate-150"
              />
              {/* Przyciemnienie dla czytelności */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/55 to-gray-950/10 transition-all duration-500 group-hover:from-gray-950/90 group-hover:via-gray-950/35" />
              {/* Akcentowa poświata od dołu — kolor filaru, na hover */}
              <div
                aria-hidden="true"
                className={`absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t ${p.glow} to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />

              {/* Treść — unosi się na hover */}
              <div className="relative p-7 lg:p-9 transition-transform duration-500 ease-out group-hover:-translate-y-2">
                <span
                  className={`text-sm font-mono text-white/40 transition-colors duration-300 ${p.numColor}`}
                >
                  {p.num}
                </span>
                <h2 className="mt-1.5 text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight">
                  {p.title}
                </h2>
                <p className="mt-2.5 text-sm lg:text-base text-white/65 leading-relaxed max-w-sm">
                  {p.desc}
                </p>
                <span
                  className={`mt-5 inline-flex items-center gap-2 rounded-lg px-3 py-1.5 -ml-3 text-sm font-semibold transition-all duration-300 group-hover:gap-3.5 ${p.btn}`}
                >
                  {p.cta}
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Dolny pasek */}
        <footer className="relative z-20 flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 px-6 py-3.5 text-xs text-gray-500 dark:text-white/40 border-t border-gray-200 dark:border-white/10">
          <Link
            href="/jak-pracuje"
            className="hover:text-gray-900 dark:hover:text-white/70 transition-colors"
          >
            Jak pracuję
          </Link>
          <Link
            href="/strefa-wiedzy"
            className="hover:text-gray-900 dark:hover:text-white/70 transition-colors"
          >
            Strefa wiedzy
          </Link>
          <Link
            href="/pilotaz"
            className="hover:text-gray-900 dark:hover:text-white/70 transition-colors"
          >
            Program case study
          </Link>
          <Link
            href="/kontakt"
            className="hover:text-gray-900 dark:hover:text-white/70 transition-colors"
          >
            Kontakt
          </Link>
        </footer>
      </main>
    </>
  );
}
