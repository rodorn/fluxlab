import Link from "next/link";
import Image from "next/image";

const PILLARS = [
  {
    href: "/strony-www",
    img: "/abstract/web.webp",
    num: "01",
    title: "Strony WWW",
    desc: "Zbuduję Ci nową stronę internetową albo poprawię tę, którą już masz. Ma dobrze wyglądać na telefonie i zamieniać odwiedzających w klientów.",
  },
  {
    href: "/automatyzacja-leadow-crm",
    img: "/abstract/automation.webp",
    num: "02",
    title: "Automatyzacja",
    desc: "Przejmę nudne, powtarzalne czynności — przepisywanie danych, wysyłanie maili, pilnowanie terminów. Komputer robi je sam, Ty zyskujesz czas.",
  },
  {
    href: "/scraping-danych",
    img: "/abstract/data.webp",
    num: "03",
    title: "Dane",
    desc: "Zbiorę informacje rozproszone po stronach, mailach i plikach. Uporządkuję je i zamienię w czytelne zestawienia — bez ręcznego klikania.",
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
            {/* Abstrakcyjne tło — mocny zoom + rozjaśnienie na hover */}
            <Image
              src={p.img}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover opacity-50 saturate-[0.85] transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-110 group-hover:saturate-125"
            />
            {/* Przyciemnienie dla czytelności */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/55 to-gray-950/10 transition-all duration-500 group-hover:from-gray-950/90 group-hover:via-gray-950/35" />
            {/* Akcentowa poświata od dołu — pojawia się na hover */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-accent/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            {/* Ramka akcentowa na hover */}
            <div
              aria-hidden="true"
              className="absolute inset-0 ring-0 ring-inset ring-accent transition-all duration-300 group-hover:ring-[3px]"
            />

            {/* Treść — unosi się na hover */}
            <div className="relative p-7 lg:p-10 transition-transform duration-500 ease-out group-hover:-translate-y-2">
              <span className="text-sm font-mono text-white/40 transition-colors duration-300 group-hover:text-accent">
                {p.num}
              </span>
              <h2 className="mt-1.5 text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight">
                {p.title}
              </h2>
              <p className="mt-2.5 text-sm lg:text-base text-white/65 leading-relaxed max-w-sm">
                {p.desc}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 rounded-lg px-3 py-1.5 -ml-3 text-accent font-semibold transition-all duration-300 group-hover:gap-3.5 group-hover:bg-accent group-hover:text-white">
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
        <Link href="/kontakt" className="hover:text-white/70 transition-colors">
          Kontakt
        </Link>
      </footer>
    </main>
  );
}
