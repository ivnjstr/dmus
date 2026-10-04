"use client";

import { useEffect } from "react";

// Section entrances. Elements marked `data-reveal` that start below the fold are hidden
// until they scroll into view, then animate in (styles in globals.css). Nothing is hidden
// unless this runs, so without JavaScript the page is simply shown as it is.
export function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Whatever arrives together animates one after another, in reading order.
        const arriving = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target as HTMLElement)
          .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
        arriving.forEach((element, index) => {
          element.style.setProperty("--reveal-i", String(index));
          element.dataset.revealState = "in";
          observer.unobserve(element);
        });
      },
      // Start once an element is a little way into the viewport.
      { rootMargin: "0px 0px -48px 0px" },
    );

    for (const element of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
      if (element.dataset.revealState === "in") continue;
      // Content already on screen (or above it) when the page loads stays as it is.
      if (element.getBoundingClientRect().top < window.innerHeight) continue;
      element.dataset.revealState = "pending";
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
