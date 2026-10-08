export default function Znak({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 1080 1080" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="znak-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6366f1" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect width="1080" height="1080" rx="240" fill="url(#znak-g)" />
      <g
        fill="none"
        stroke="#fff"
        strokeWidth="100"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M380 800 V410 Q380 290 500 290 H590" />
        <path d="M270 540 H500" />
        <path d="M760 290 V800" />
      </g>
      <g fill="#fff">
        <circle cx="590" cy="540" r="36" opacity="0.95" />
        <circle cx="660" cy="540" r="26" opacity="0.7" />
        <circle cx="702" cy="540" r="14" opacity="0.45" />
      </g>
    </svg>
  );
}
