import Link from "next/link";

const serviceLinks = [
  { href: "/automatyzacja-procesow-biznesowych", label: "Automatyzacja procesów" },
  { href: "/automatyzacja-crm", label: "Automatyzacja CRM" },
  { href: "/automatyzacja-pipedrive", label: "Pipedrive", indent: true },
  { href: "/automatyzacja-salesforce", label: "Salesforce", indent: true },
  { href: "/integracje-api", label: "Integracje API" },
  { href: "/automatyzacja-raportowania", label: "Automatyzacja raportowania" },
  { href: "/automatyzacja-leadow", label: "Automatyzacja leadów" },
  { href: "/automatyzacja-ai", label: "Automatyzacja z AI" },
  { href: "/n8n", label: "n8n" },
  { href: "/zapier-make", label: "Zapier vs Make" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 py-10">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <span className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
              flux<span className="text-accent">lab</span>
            </span>
            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500 max-w-xs">
              Automatyzacja procesów biznesowych dla firm B2B
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
              Usługi
            </p>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`hover:text-accent transition-colors ${
                      "indent" in link && link.indent
                        ? "text-xs text-gray-500 dark:text-gray-500 pl-3"
                        : "text-sm text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {"indent" in link && link.indent ? `└ ${link.label}` : link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
              Firma
            </p>
            <ul className="space-y-2">
              <li><a href="/#o-nas" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent transition-colors">O nas</a></li>
              <li><a href="/#proces" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent transition-colors">Jak działamy</a></li>
              <li><a href="/#cennik" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent transition-colors">Cennik</a></li>
              <li><a href="/#kontakt" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent transition-colors">Kontakt</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} Fluxlab. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}
