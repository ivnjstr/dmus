// Pill buttons from the design's CTA set. Shared by links and <button>s.
// Pressing gives a slight shrink (touch included); hover effects only apply with a pointer.
const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-full border leading-none font-semibold transition duration-200 ease-out active:duration-100 motion-safe:active:scale-97 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange";

const variants = {
  primary: "border-transparent bg-brand-orange text-brand-ink hover:opacity-90 motion-safe:hover:-translate-y-px",
  outline: "border-cream/55 text-cream hover:border-cream/80 hover:bg-cream/5",
};

const sizes = {
  md: "h-12 px-6.5 text-[0.9rem]", // header "Let's Talk"
  lg: "h-14.5 px-8.5 text-[0.9rem]", // hero CTAs
  block: "h-12 w-full gap-2.5 text-[0.85rem]", // popup "Send Inquiry"
};

export function buttonClasses(
  variant: keyof typeof variants,
  size: keyof typeof sizes = "lg",
) {
  return `${base} ${variants[variant]} ${sizes[size]}`;
}
