import { PerformanceStrip, type Creative } from "@/components/performance-strip";
import { SectionHeading } from "@/components/section-heading";

// Placeholder creatives repeating the design's pattern of formats (5:8, 9:16, 4:3)
// with a play button on every other card. 12 cards so the pattern continues
// seamlessly across the loop. Add each real image/video (src, alt, poster) here when supplied.
const FORMATS = ["5 / 8", "9 / 16", "4 / 3"];
const CREATIVES: Creative[] = Array.from({ length: 12 }, (_, index) => ({
  aspect: FORMATS[index % FORMATS.length],
  video: index % 2 === 0,
}));

export function Performance() {
  return (
    <section className="border-b border-cream/15">
      <div className="py-20 md:py-28">
        {/* In the design this heading sits on a wider (1260px) column than the other sections. */}
        <div className="mx-auto w-full max-w-335 px-5 sm:px-10">
          <SectionHeading eyebrow="Performance" title="Creative that gets attention." />
        </div>

        {/* Full-bleed strip that loops endlessly (drag, swipe, trackpad, Shift+wheel or arrow keys). */}
        <PerformanceStrip creatives={CREATIVES} />
      </div>
    </section>
  );
}
