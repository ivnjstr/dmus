import { SectionHeading } from "@/components/section-heading";
import { WORK_CATEGORIES } from "./categories";
import { WorkGallery } from "./work-gallery";

export function SampleWorks() {
  return (
    <section id="work" className="border-b border-cream/15">
      <div className="page-container pt-20 pb-16 md:pt-28 md:pb-17">
        <SectionHeading eyebrow="Portfolio" title="Sample Works" />
        <p data-reveal className="mt-4 max-w-md text-base leading-[1.55] text-cream/85">
          Eight categories of client work — explore the reels and photography from each.
        </p>
        <WorkGallery categories={WORK_CATEGORIES} />
      </div>
    </section>
  );
}
