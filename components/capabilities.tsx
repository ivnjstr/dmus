import { SectionHeading } from "@/components/section-heading";

const CAPABILITIES = [
  "Branding",
  "Social Media",
  "Content & Reels",
  "Creative Campaigns",
  "Website / Digital",
];

export function Capabilities() {
  return (
    <section id="services" className="border-b border-cream/15">
      <div className="page-container py-20 md:pt-28 md:pb-27">
        <SectionHeading eyebrow="Capabilities" title="What We Do" />

        <div className="mt-12 grid gap-10 md:mt-19 md:grid-cols-[7fr_5fr] md:gap-13.5">
          <ol className="border-t border-cream/12">
            {CAPABILITIES.map((name, index) => (
              // Rows rise in one after another; on hover the name slides slightly and its rule brightens.
              <li
                key={name}
                data-reveal
                className="group/row flex items-baseline border-b border-cream/12 py-6 transition-colors duration-300 hover:border-cream/25 md:py-7 lg:py-8.5"
              >
                <span className="w-12 shrink-0 font-display text-base text-brand-orange italic lg:w-18.5">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-2xl leading-tight font-medium transition-transform duration-300 ease-glide motion-safe:group-hover/row:translate-x-1.5 md:text-[1.625rem] lg:text-[32.5px] lg:leading-10">
                  {name}
                </span>
              </li>
            ))}
          </ol>

          {/* Image placeholder. To add the final image, put
              <Image src="..." alt="..." fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
              inside this box and remove the placeholder background. */}
          <div
            data-reveal="media"
            className="relative aspect-467/544 overflow-hidden rounded bg-linear-160 from-[#bbbbb4] to-[#a9a9a3] md:aspect-auto"
          />
        </div>
      </div>
    </section>
  );
}
