import { SectionHeading } from "@/components/section-heading";

export function Identity() {
  return (
    <section className="border-b border-cream/15">
      <div className="page-container py-20 md:py-28">
        <SectionHeading eyebrow="Identity" title="Branding" />
        <p data-reveal className="mt-4 max-w-md text-base leading-[1.55] text-cream/85">
          Visual identities designed to make brands instantly recognisable.
        </p>

        {/* Image placeholders (rise in: the tall one first, then the right column top to bottom).
            To add the real artwork, put
            <Image src="..." alt="..." fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            inside each box and remove its `image-placeholder` class. */}
        <div className="mt-12 grid gap-4 md:mt-15.5 md:grid-cols-[597fr_553fr] md:gap-6.5">
          <div data-reveal="media" className="image-placeholder relative aspect-597/1078 overflow-hidden rounded" />
          <div className="grid gap-4 md:grid-rows-[328fr_433fr_265fr] md:gap-6.5">
            <div data-reveal="media" className="image-placeholder relative aspect-553/328 overflow-hidden rounded md:aspect-auto" />
            <div data-reveal="media" className="image-placeholder relative aspect-553/433 overflow-hidden rounded md:aspect-auto" />
            {/* The design gives this one rounder corners than the others. */}
            <div data-reveal="media" className="image-placeholder relative aspect-553/265 overflow-hidden rounded-lg md:aspect-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
