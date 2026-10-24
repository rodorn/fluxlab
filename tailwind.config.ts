import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /**
         * Akcent nie moze byc jednym kolorem. Odcien czytelny na bialym tle
         * (co najmniej 4,5:1) jest za ciemny na czarnym i odwrotnie: te dwa
         * warunki nie maja wspolnego rozwiazania. Stad zmienna, ktora
         * przestawia sie razem z motywem, i osobny `solid` na tla pod bialym
         * napisem, ktory musi zostac ciemny w obu motywach.
         */
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          hover: "rgb(var(--accent-hover) / <alpha-value>)",
          solid: "rgb(var(--accent-solid) / <alpha-value>)",
          light: "#eef2ff",
          "dark-light": "#1a1830",
        },
        // Szarosci i biel ze zmiennych (app/globals.css): jasny motyw ma
        // domyslna paletę Tailwinda, ciemny osobną, ciepłą czerń.
        white: "rgb(var(--biel) / <alpha-value>)",
        gray: {
          50: "rgb(var(--gray-50) / <alpha-value>)",
          100: "rgb(var(--gray-100) / <alpha-value>)",
          200: "rgb(var(--gray-200) / <alpha-value>)",
          300: "rgb(var(--gray-300) / <alpha-value>)",
          400: "rgb(var(--gray-400) / <alpha-value>)",
          500: "rgb(var(--gray-500) / <alpha-value>)",
          600: "rgb(var(--gray-600) / <alpha-value>)",
          700: "rgb(var(--gray-700) / <alpha-value>)",
          800: "rgb(var(--gray-800) / <alpha-value>)",
          900: "rgb(var(--gray-900) / <alpha-value>)",
          950: "rgb(var(--gray-950) / <alpha-value>)",
        },
      },
      // 45: cienie warstwowe, miękkie i ostre naraz
      boxShadow: {
        md: "0 1px 2px rgb(0 0 0 / 0.05), 0 4px 8px -2px rgb(0 0 0 / 0.08)",
        lg: "0 1px 2px rgb(0 0 0 / 0.05), 0 4px 8px -2px rgb(0 0 0 / 0.07), 0 12px 24px -6px rgb(0 0 0 / 0.1)",
        xl: "0 1px 2px rgb(0 0 0 / 0.05), 0 6px 12px -3px rgb(0 0 0 / 0.07), 0 16px 32px -8px rgb(0 0 0 / 0.1), 0 32px 64px -16px rgb(0 0 0 / 0.1)",
        "2xl": "0 2px 4px rgb(0 0 0 / 0.05), 0 8px 16px -4px rgb(0 0 0 / 0.08), 0 24px 48px -12px rgb(0 0 0 / 0.14), 0 48px 96px -24px rgb(0 0 0 / 0.14)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        // Krój systemowy zamiast wczytywanego: font-mono stoi przy 22 drobnych
        // etykietach, a wczytywany plik kosztowal 23 KB wymuszonego pobrania
        // na kazdej stronie serwisu, takze tam, gdzie zadnej z nich nie ma.
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "Liberation Mono",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
