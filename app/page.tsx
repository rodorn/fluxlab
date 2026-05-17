import Link from "next/link";
import Image from "next/image";

const PILLARS = [
  {
    href: "/strony-www",
    img: "/abstract/web.webp",
    num: "01",
    title: "Strony WWW",
    desc: "Nowa strona albo poprawki w obecnej — szybko, mobilnie, z naciskiem na konwersję.",
  },
  {
    href: "/automatyzacja-leadow-crm",
    img: "/abstract/automation.webp",
    num: "02",
    title: "Automatyzacja",
    desc: "Narzędzia no-code automatyzują proste elementy pracy niskim kosztem. API łączy większość narzędzi i pozwala na zaawansowane reguły interakcji między nimi. AI przetwarza kod, tekst, obraz i dźwięk — ogromne możliwości przyspieszania pracy.",
  },
  {
    href: "/scraping-danych",
    img: "/abstract/data.webp",
    num: "03",
    title: "Dane",
    desc: "Wyszukiwanie, pozyskiwanie, analiza i raportowanie danych.",
  },
];

export default function Home() {
  return (
    <main className="relative flex flex-col bg-gray-950 text-white min-h-screen lg:h-screen overflow-hidden">
      {/* Górny pasek */}
      <header className="relative z-20 flex items-center justify-between px-6 lg:px-10 py-5">
        <Link href="/" className="text-xl font-bold tracking-tight">
          flux<span className="text-accent">lab</span>
        </Link>
        <span className="hidden sm:block text-xs uppercase tracking-[0.2em] text-white/40">
          Strony · Automatyzacja · Dane
        </span>
      </header>

      {/* Hasło */}
      <div className="relative z-20 px-6 lg:px-10 pb-6 lg:pb-8">
        <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight text-white/90">
          Z czym mogę pomóc?
        </h1>
      </div>

      {/* 3 kolumny wyboru */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-3">
        {PILLARS.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="group relative flex flex-col justify-end overflow-hidden min-h-[34vh] lg:min-h-0 border-t lg:border-t-0 lg:border-l border-white/10 first:border-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
          >
            {/* Abstrakcyjne tło */}
            <Image
              src={p.img}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover opacity-55 transition-all duration-700 ease-out group-hover:opacity-85 group-hover:scale-105"
            />
            {/* Przyciemnienie dla czytelności */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/55 to-gray-950/10 transition-opacity duration-500 group-hover:from-gray-950/95" />

            {/* Treść */}
            <div className="relative p-7 lg:p-10 transition-transform duration-500 ease-out group-hover:-translate-y-1">
              <span className="text-sm font-mono text-white/40">{p.num}</span>
              <h2 className="mt-1.5 text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight">
                {p.title}
              </h2>
              <p className="mt-2.5 text-sm lg:text-base text-white/65 leading-relaxed max-w-sm">
                {p.desc}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-accent font-semibold transition-all duration-300 group-hover:gap-3.5">
                Wejdź
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Dolny pasek */}
      <footer className="relative z-20 flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 px-6 py-3.5 text-xs text-white/40 border-t border-white/10">
        <Link
          href="/jak-pracuje"
          className="hover:text-white/70 transition-colors"
        >
          Jak pracuję
        </Link>
        <Link
          href="/strefa-wiedzy"
          className="hover:text-white/70 transition-colors"
        >
          Strefa wiedzy
        </Link>
        <Link href="/pilotaz" className="hover:text-white/70 transition-colors">
          Program case study
        </Link>
        <a
          href="mailto:iwanekpawel55@gmail.com"
          className="hover:text-white/70 transition-colors"
        >
          iwanekpawel55@gmail.com
        </a>
      </footer>
    </main>
  );
}
