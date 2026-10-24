/** Znak „fl”: ligatura, w której poprzeczka f przechodzi w pień l.
 *  Jedna grubość kreski (110), wspólna linia bazowa (790) i wspólna
 *  wysokość wzniosów (290), więc obie litery trzymają ten sam rytm. */
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
        strokeWidth="110"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M400 790 V420 A130 130 0 0 1 530 290 H550" />
        <path d="M330 540 H750" />
        <path d="M750 290 V790" />
      </g>
    </svg>
  );
}
