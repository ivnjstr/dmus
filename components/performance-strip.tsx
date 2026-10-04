"use client";

import { useCallback, useLayoutEffect, useRef, type PointerEvent } from "react";
import { PlayIcon } from "@/components/icons";

export type Creative = { aspect: string; video: boolean };

// The set is rendered three times. Scrolling always stays around the middle
// copy: when it drifts half a set away, it jumps back by exactly one set width.
// The cards there are identical, so the jump can't be seen and the strip loops.
const COPIES = 3;

export function PerformanceStrip({ creatives }: { creatives: Creative[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const setWidth = useRef(0);
  const drag = useRef<{ pointerId: number; startX: number; startScroll: number } | null>(null);

  const wrap = useCallback(() => {
    const scroller = scrollerRef.current;
    const width = setWidth.current;
    if (!scroller || !width) return;
    const left = scroller.scrollLeft;
    if (left >= width * 0.5 && left <= width * 1.5) return;
    const next = ((((left - width * 0.5) % width) + width) % width) + width * 0.5;
    scroller.scrollLeft = next;
    if (drag.current) drag.current.startScroll += next - left;
  }, []);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    const list = listRef.current;
    if (!scroller || !list) return;
    const measure = () => {
      const first = list.children[0].getBoundingClientRect();
      const firstOfNextCopy = list.children[creatives.length].getBoundingClientRect();
      const isFirstMeasure = setWidth.current === 0;
      setWidth.current = firstOfNextCopy.left - first.left;
      // Start on the middle copy — it looks exactly like the first, so nothing visibly moves.
      if (isFirstMeasure) scroller.scrollLeft = setWidth.current;
      wrap();
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [creatives.length, wrap]);

  // Mouse drag on desktop. Touch, pen, trackpad and keys use the browser's own scrolling.
  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { pointerId: event.pointerId, startX: event.clientX, startScroll: event.currentTarget.scrollLeft };
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;
    event.currentTarget.scrollLeft = current.startScroll - (event.clientX - current.startX);
    wrap();
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    if (drag.current?.pointerId === event.pointerId) drag.current = null;
  }

  // The strip rises in as one piece (data-reveal); its cards never move on their own, so the
  // loop's measurements are unaffected.
  return (
    <div
      ref={scrollerRef}
      data-reveal="media"
      tabIndex={0}
      role="region"
      aria-label="Creative examples"
      onScroll={wrap}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onDragStart={(event) => event.preventDefault()}
      className="mt-10 cursor-grab overflow-x-auto overscroll-x-contain select-none [scrollbar-width:none] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-orange active:cursor-grabbing md:mt-12 [&::-webkit-scrollbar]:hidden"
    >
      <ul ref={listRef} className="flex h-75 w-max gap-3 md:h-[403px] md:gap-5">
        {Array.from({ length: COPIES }, (_, copy) =>
          creatives.map((creative, index) => (
            // Placeholder — put the <Image fill className="object-cover" ... /> or video poster inside.
            <li
              key={`${copy}-${index}`}
              aria-hidden={copy === 1 ? undefined : true}
              className="group/creative image-placeholder relative h-full shrink-0 overflow-hidden rounded"
              style={{ aspectRatio: creative.aspect }}
            >
              {creative.video && (
                // Hover: the play button grows slightly and darkens.
                <span className="absolute bottom-4.5 left-4.5 flex size-8.5 items-center justify-center rounded-full bg-brand-ink/55 text-white transition duration-300 ease-glide group-hover/creative:bg-brand-ink/70 motion-safe:group-hover/creative:scale-108">
                  <PlayIcon className="ml-0.5 h-2 w-1.75" />
                </span>
              )}
            </li>
          )),
        )}
      </ul>
    </div>
  );
}
