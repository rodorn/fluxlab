const TECH_LIST = [
  "Pipedrive",
  "HubSpot",
  "Salesforce",
  "n8n",
  "Make",
  "Zapier",
  "Google Sheets",
  "Slack",
  "Gmail",
  "Outlook",
  "Meta Ads",
  "Google Ads",
  "LinkedIn",
  "Webhook",
  "REST API",
  "Airtable",
  "Notion",
  "Asana",
  "ClickUp",
  "Mailchimp",
];

export default function Marquee() {
  // Duplikujemy listę dwukrotnie żeby uzyskać seamless loop
  const items = [...TECH_LIST, ...TECH_LIST];

  return (
    <section
      className="relative py-8 lg:py-10 border-y border-gray-200/60 dark:border-gray-800/60 bg-gray-50/50 dark:bg-gray-900/30 overflow-hidden"
      aria-label="Technologie i platformy z którymi pracuję"
    >
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 dark:from-gray-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 dark:from-gray-950 to-transparent z-10 pointer-events-none" />

      <div className="marquee-wrapper flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee gap-12 pr-12">
          {items.map((tech, idx) => (
            <span
              key={`${tech}-${idx}`}
              className="text-base lg:text-lg font-semibold text-gray-400 dark:text-gray-600 whitespace-nowrap tracking-tight flex items-center gap-3"
            >
              {tech}
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-accent/40"
                aria-hidden="true"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
