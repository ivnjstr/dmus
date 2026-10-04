"use client";

import { useState } from "react";
import { ChevronIcon, PlayIcon } from "@/components/icons";

// Slots either side of the active reel; the ±2 ones are cut off by the popup edge. The ±3 ones
// are invisible and off-stage, so reels at the edges fade in and out instead of popping.
const OFFSETS = [-3, -2, -1, 0, 1, 2, 3];

const navButtonClasses =
  "group flex size-11 items-center justify-center rounded-full border border-cream/15 text-cream/85 transition duration-200 hover:border-cream/40 active:duration-100 motion-safe:active:scale-95 focus-visible:outline-2 focus-visible:outline-brand-orange";

export function ReelsCarousel({ reels }: { reels: string[] }) {
  // Unbounded so reels always slide in the direction of travel; wrapped for display.
  const [position, setPosition] = useState(0);
  const count = reels.length;
  const wrap = (n: number) => ((n % count) + count) % count;
  const current = wrap(position);

  return (
    // Hovering the carousel, or keyboard focus inside it, pauses the timer (the progress animation).
    <div className="group/reels">
      {/* Story-style progress: watched reels full, the current one fills over 4s and then the
          next reel starts. The CSS animation is the only timer, and it stops while the popup is closed. */}
      <div aria-hidden="true" className="mx-auto mt-8 flex max-w-160 gap-1.5 md:mt-10.5">
        {reels.map((_, index) => (
          <div key={index} className="h-0.75 flex-1 overflow-hidden rounded-full bg-cream/20">
            {index === current ? (
              // Keyed by position so it restarts from 0% whenever the reel changes.
              <div
                key={position}
                onAnimationEnd={(event) => {
                  if (event.animationName === "reel-progress") setPosition(position + 1);
                }}
                className="h-full animate-reel-progress bg-brand-orange group-hover/reels:[animation-play-state:paused] group-has-focus-visible/reels:[animation-play-state:paused]"
              />
            ) : (
              <div
                className="h-full bg-brand-orange transition-[width] duration-300"
                style={{ width: index < current ? "100%" : "0%" }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="relative -mx-6 mt-10 h-[calc(var(--reel-w)*16/9)] overflow-x-clip [--reel-w:200px] sm:-mx-8 md:-mx-12 md:mt-12 md:[--reel-w:260px]">
        {OFFSETS.map((offset) => {
          const slot = position + offset;
          const active = offset === 0;
          // Side reels are scaled to 0.864: step by that width plus a 0.06 gap (~16px desktop,
          // 12px mobile), and the first step also clears the full-size active reel's extra 0.068.
          const shift = offset * 0.924 + Math.sign(offset) * 0.068;
          // Reels glide to their new slot (instantly with reduced motion).
          return (
            <div
              key={slot}
              className="absolute top-0 left-1/2 w-(--reel-w) transition duration-450 ease-glide motion-reduce:transition-none"
              style={{
                transform: `translateX(calc(-50% + ${shift} * var(--reel-w))) scale(${active ? 1 : 0.864})`,
                opacity: Math.abs(offset) === 3 ? 0 : active ? 1 : 0.4,
              }}
            >
              <ReelCard duration={reels[wrap(slot)]} active={active} />
            </div>
          );
        })}
      </div>

      <div className="mt-8.5 flex justify-center gap-2.75">
        <button type="button" aria-label="Previous reel" onClick={() => setPosition((p) => p - 1)} className={navButtonClasses}>
          <ChevronIcon direction="left" className="h-2.5 w-1.5 transition-transform duration-300 ease-glide motion-safe:group-hover:-translate-x-0.5" />
        </button>
        <button type="button" aria-label="Next reel" onClick={() => setPosition((p) => p + 1)} className={navButtonClasses}>
          <ChevronIcon direction="right" className="h-2.5 w-1.5 transition-transform duration-300 ease-glide motion-safe:group-hover:translate-x-0.5" />
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        Reel {current + 1} of {count}
      </p>
    </div>
  );
}

// Video placeholder. The play button is visual only until real reels are added.
function ReelCard({ duration, active }: { duration: string; active: boolean }) {
  return (
    <div
      className={`image-placeholder relative aspect-9/16 overflow-hidden rounded-md ${active ? "shadow-[0_24px_40px_-12px_rgba(0,0,0,0.6)]" : ""}`}
    >
      <div className="absolute inset-0 bg-linear-to-b from-transparent from-40% to-brand-ink/80" />
      {active && (
        <>
          <span className="absolute top-1/2 left-1/2 flex size-13.5 -translate-1/2 items-center justify-center rounded-full border border-cream/60 bg-brand-green/40 text-white">
            <PlayIcon className="ml-0.5 h-2.5 w-2" />
          </span>
          <div className="absolute inset-x-4.5 bottom-3.5 flex items-center justify-between">
            <span className="rounded-full border border-cream/15 bg-brand-ink/80 px-2 py-1.25 text-[0.7rem] leading-normal font-semibold">
              Reel
            </span>
            <span className="text-xs leading-normal font-medium text-cream/90">{duration}</span>
          </div>
        </>
      )}
    </div>
  );
}
