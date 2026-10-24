/** Znak „fl”: dwie osobne litery z wyraźnym odstępem, krótka poprzeczka f
 *  nie dochodzi do l. Jedna grubość kreski (120), wspólna linia bazowa (800)
 *  i wspólna wysokość wzniosów (310). */
export default function ZnakFl({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 1080 1080" className={className} aria-hidden="true">
      <rect width="1080" height="1080" rx="240" fill="#4f46e5" />
      <g
        fill="none"
        stroke="#fff"
        strokeWidth="120"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M390 800 V440 A130 130 0 0 1 520 310 H540" />
        <path d="M270 560 H490" />
        <path d="M750 310 V800" />
      </g>
    </svg>
  );
}
