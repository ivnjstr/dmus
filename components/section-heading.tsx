// Eyebrow + title used at the top of content sections. Both rise in as they scroll into view.
export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p data-reveal className="text-xs leading-none font-semibold tracking-[0.2em] text-brand-orange uppercase">
        {eyebrow}
      </p>
      <h2 data-reveal className="mt-7 font-display text-[2rem] leading-[1.2] md:text-[2.45rem]">{title}</h2>
    </div>
  );
}
