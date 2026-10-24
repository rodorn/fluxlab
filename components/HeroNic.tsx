/** Rysunek w hero: jedna linia przechodzi przez formularz, kartę w CRM i raport.
 *  Kończy się kotwicą, od której Nic prowadzi linię dalej przez stronę. */
const NIC =
  "M0 210C40 210 60 166 110 166H210C300 166 340 84 436 84A16 16 0 1 1 436 116A16 16 0 1 1 436 84C500 84 530 40 610 40C690 40 700 196 750 196L778 186L806 191L834 160L862 140L890 96C910 68 950 120 950 280";

const PODPISY = [
  ["16.67%", "zapytanie"],
  ["50%", "karta w CRM"],
  ["85.42%", "raport"],
];

export default function HeroNic() {
  return (
    <figure className="mx-auto mt-14 w-full max-w-4xl lg:mt-20">
      <div className="relative">
        <svg
          viewBox="0 0 960 280"
          className="hero-nic block h-auto w-full overflow-visible"
          role="img"
          aria-label="Zapytanie z formularza trafia do CRM jako karta leada i do raportu"
        >
          <g
            className="hero-nic__tusz"
            fill="none"
            strokeLinecap="round"
          >
            <rect x="90" y="50" width="140" height="180" rx="10" />
            <path className="hero-nic__mocny" d="M110 78H170" />
            <path d="M110 104H140M110 124H210M110 146H150" />
            <rect x="110" y="190" width="56" height="20" rx="6" />

            <rect x="400" y="60" width="160" height="160" rx="12" />
            <path className="hero-nic__mocny" d="M462 96H530" />
            <path d="M462 110H510M416 136H544M416 156H520M416 174H500" />
            <rect x="416" y="190" width="48" height="16" rx="8" />

            <path d="M750 70V210H890" />
            <path
              className="hero-nic__siatka"
              d="M750 175H890M750 140H890M750 105H890"
            />
          </g>
          <path
            className="hero-nic__linia"
            d={NIC}
            pathLength={1}
            fill="none"
          />
          <circle className="hero-nic__kropka" r="4">
            <animateMotion
              dur="6s"
              begin="2.8s"
              repeatCount="indefinite"
              path={NIC}
            />
          </circle>
        </svg>
        {PODPISY.map(([x, tekst]) => (
          <span
            key={tekst}
            aria-hidden="true"
            className="hero-nic__podpis absolute top-full -translate-x-1/2 pt-2"
            style={{ left: x }}
          >
            {tekst}
          </span>
        ))}
        <span
          data-nic
          aria-hidden="true"
          className="absolute bottom-0 left-[98.96%] h-0 w-0"
        />
      </div>
      <figcaption className="mt-12 text-xs tracking-wide text-gray-500 dark:text-gray-400">
        Jedno zapytanie: od formularza przez CRM do raportu, bez przepisywania.
      </figcaption>
    </figure>
  );
}
