type IconProps = { className?: string };

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 10 10" className={className} aria-hidden="true">
      <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 12 10" className={className} aria-hidden="true">
      <path d="M1 5h10M7 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronIcon({ direction, className }: IconProps & { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 6 10" className={className} aria-hidden="true">
      <path
        d={direction === "left" ? "M5 1L1 5l4 4" : "M1 1l4 4-4 4"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlayIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 10 12" className={className} aria-hidden="true">
      <path d="M0 0l10 6-10 6z" fill="currentColor" />
    </svg>
  );
}
