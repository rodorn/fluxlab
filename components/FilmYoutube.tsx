"use client";

import { useState } from "react";

/** Film z YouTube jako okładka z przyciskiem: odtwarzacz ładuje się dopiero
 *  po kliknięciu, więc na telefonie nie ma pustego pola przed załadowaniem. */
export default function FilmYoutube({
  id,
  tytul,
  okladka,
}: {
  id: string;
  tytul: string;
  okladka: string;
}) {
  const [gra, setGra] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-200 bg-gray-900 dark:border-white/10">
      {gra ? (
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={tytul}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setGra(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Odtwórz film: ${tytul}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={okladka}
            alt=""
            width={960}
            height={540}
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-solid text-white shadow-lg transition-transform group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              className="ml-1 h-7 w-7"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
