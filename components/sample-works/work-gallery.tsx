"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { workMeta, type WorkCategory } from "./categories";
import { WorkModal } from "./work-modal";

export function WorkGallery({ categories }: { categories: WorkCategory[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<{ category: WorkCategory; session: number } | null>(null);

  // Open once the chosen category has rendered into the popup.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (selected && dialog && !dialog.open) dialog.showModal();
  }, [selected]);

  return (
    <>
      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 md:mt-15.5 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-3">
        {categories.map((category) => (
          // Cards rise in row by row. Hovering (or focusing) "View Reels & Photos" slowly zooms the
          // cover and nudges the arrow — only that link opens the popup, so only it triggers this.
          <article key={category.title} data-reveal className="group/card">
            <div className="relative aspect-276/371 overflow-hidden rounded">
              {/* Cover placeholder — replace this layer with <Image fill className="object-cover" ... />
                  (keeping the transition/scale classes) when supplied. */}
              <div className="image-placeholder absolute inset-0 transition-[scale] duration-700 ease-glide motion-safe:can-hover:group-has-[button:hover]/card:scale-104 motion-safe:group-has-[button:focus-visible]/card:scale-104" />
            </div>
            <h3 className="mt-4 font-display text-base leading-[1.4] lg:text-[18.5px]">
              {category.title}
            </h3>
            <p className="mt-1 text-xs leading-normal text-brand-orange">{workMeta(category)}</p>
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => setSelected((prev) => ({ category, session: (prev?.session ?? 0) + 1 }))}
              className="group/link mt-1.5 inline-flex items-center gap-2.5 text-[0.8rem] leading-normal font-semibold text-cream/70 transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
            >
              View Reels &amp; Photos
              <ArrowRightIcon className="h-2 w-2.5 transition-transform duration-300 ease-glide motion-safe:group-hover/link:translate-x-0.75 motion-safe:group-focus-visible/link:translate-x-0.75" />
            </button>
          </article>
        ))}
      </div>

      <WorkModal ref={dialogRef} category={selected?.category ?? null} session={selected?.session ?? 0} />
    </>
  );
}
