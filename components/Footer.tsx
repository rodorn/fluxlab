export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 py-10">
      <div className="container-wide flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
            flux<span className="text-accent">lab</span>
          </span>
          <span className="text-gray-300 dark:text-gray-700 text-sm">·</span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            Automatyzacja procesów biznesowych
          </span>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500">
          © {new Date().getFullYear()} Fluxlab. Wszelkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  );
}
