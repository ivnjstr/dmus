"use client";

import { useId, useState, type CSSProperties, type Ref } from "react";
import { CloseIcon } from "@/components/icons";
import { workMeta, type WorkCategory } from "./categories";
import { ReelsCarousel } from "./reels-carousel";

type Tab = "reels" | "photos";

const TABS: { id: Tab; label: string }[] = [
  { id: "reels", label: "Reels" },
  { id: "photos", label: "Photos" },
];

// The popup always shows a full 4 × 2 grid of 8 placeholder photos.
// Swap in the category's real photos when they're supplied.
const PHOTO_COUNT = 8;

// Reels & Photos popup for one portfolio category. `session` changes on every
// open, which resets the tab and carousel back to the start.
export function WorkModal({
  ref,
  category,
  session,
}: {
  ref: Ref<HTMLDialogElement>;
  category: WorkCategory | null;
  session: number;
}) {
  const titleId = useId();

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      // The panel animates in/out like the Contact popup (globals.css), a touch slower as it's larger.
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-280 overflow-y-auto overscroll-contain rounded-lg border border-cream/15 bg-brand-green p-6 text-cream shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop:bg-[#091a17]/95 sm:p-8 md:p-12 motion-safe:md:[--motion-dialog-in:360ms]"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={(event) => event.currentTarget.closest("dialog")?.close()}
        className="group absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full border border-cream/25 bg-brand-green text-cream transition-colors hover:border-cream/50 focus-visible:outline-2 focus-visible:outline-brand-orange md:top-7 md:right-7"
      >
        <CloseIcon className="size-2.25 transition-transform duration-300 ease-glide motion-safe:group-hover:rotate-90" />
      </button>

      {category && <WorkModalContent key={session} category={category} titleId={titleId} />}
    </dialog>
  );
}

function WorkModalContent({ category, titleId }: { category: WorkCategory; titleId: string }) {
  const [tab, setTab] = useState<Tab>("reels");
  // Before the first tab switch the reels are part of the opening sequence; after it, views just fade in.
  const [switched, setSwitched] = useState(false);

  return (
    <>
      {/* Title and meta, then the Reels / Photos toggle on its own row; the close button stays alone top-right.
          On open they follow the panel in, one after another. */}
      <div className="flex flex-col items-start gap-5">
        <div className="pr-12">
          <h2
            id={titleId}
            className="font-display text-2xl leading-[1.2] [--delay:60ms] motion-safe:animate-content-in md:text-[32.5px]"
          >
            {category.title}
          </h2>
          <p className="mt-2.5 text-xs leading-normal text-brand-orange [--delay:100ms] motion-safe:animate-content-in">
            {workMeta({ ...category, photoCount: PHOTO_COUNT })}
          </p>
        </div>

        <div className="flex shrink-0 rounded-full border border-cream/15 bg-cream/6 p-1.5 [--delay:140ms] motion-safe:animate-content-in">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-pressed={tab === id}
              onClick={() => {
                setTab(id);
                setSwitched(true);
              }}
              className={`h-10 rounded-full px-6 text-[0.8rem] font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-brand-orange ${
                tab === id ? "bg-brand-orange text-brand-ink" : "text-cream/75 hover:text-cream"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Min height keeps the popup from jumping when switching tabs. On short screens it is
          capped to the space left in the viewport (max height minus border, padding and header:
          2rem + 2px + 96px + 141px), so it never adds empty scrolling.
          Keyed by tab so the incoming view animates in. */}
      <div
        key={tab}
        className={`flow-root md:min-h-[min(--spacing(154.5),100dvh-2rem-239px)] ${
          tab === "photos" ? "" : switched ? "motion-safe:animate-tab-in" : "[--delay:180ms] motion-safe:animate-content-in"
        }`}
      >
        {tab === "reels" ? (
          <ReelsCarousel reels={category.reels} />
        ) : (
          // Uniform square tiles: 2 columns on mobile, 4 × 2 on desktop — every row complete.
          // They fade up one after another, left to right.
          <div className="mt-8 grid grid-cols-2 gap-3 md:mt-8.5 md:grid-cols-4">
            {Array.from({ length: PHOTO_COUNT }, (_, index) => (
              // Photo placeholder — put <Image fill className="object-cover" ... /> inside when supplied.
              <div
                key={index}
                className="image-placeholder relative aspect-square overflow-hidden rounded motion-safe:animate-tab-in"
                style={{ "--delay": `${index * 30}ms` } as CSSProperties}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
