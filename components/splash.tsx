"use client";

import { useState } from "react";
import { Logo } from "@/components/logo";

// Set once the splash has gone, so it never comes back until the page is reloaded.
let played = false;

// Initial-load splash: the DMUS wordmark rises in, a rule draws underneath with an accent dot,
// then the tagline; after a short hold the whole panel lifts away like a curtain, revealing the
// page that is already rendered underneath. All timing is CSS (globals.css), so it starts with
// the first paint; this component only takes the splash out of the page once it has finished.
export function Splash() {
  const [visible, setVisible] = useState(!played);
  if (!visible) return null;

  return (
    <div
      data-splash
      aria-hidden="true"
      onAnimationEnd={(event) => {
        // Only the panel's own exit, not the logo/rule/dot/tagline entrances inside it.
        if (event.target !== event.currentTarget) return;
        played = true;
        setVisible(false);
      }}
      // Same green as the page, so the soft shadow under its bottom edge (off-screen until it moves)
      // is what lets the lift read as a curtain.
      className="paper-green fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-green px-5 text-center shadow-[0_24px_60px_rgba(0,0,0,0.45)] motion-safe:animate-splash-lift motion-reduce:animate-splash-fade"
    >
      {/* The existing logo (inert: its link can't be focused or clicked here). */}
      <div inert className="[--delay:100ms] motion-safe:animate-splash-logo">
        <Logo className="h-12 md:h-16" sizes="(min-width: 48rem) 200px, 150px" quality={90} />
      </div>

      <div className="relative mt-7 h-px w-28 md:mt-8 md:w-40">
        <span className="absolute inset-0 origin-left bg-cream/25 [--delay:650ms] motion-safe:animate-splash-rule" />
        {/* Accent dot at the end of the rule. */}
        <span className="absolute top-1/2 -right-0.75 size-1.5 -translate-y-1/2 rounded-full bg-brand-orange [--delay:1100ms] motion-safe:animate-splash-dot" />
      </div>

      <p className="mt-6 text-[0.7rem] leading-normal font-semibold tracking-[0.3em] text-cream/75 uppercase [--delay:1200ms] motion-safe:animate-splash-text md:text-xs">
        Digital Marketing Services
      </p>
    </div>
  );
}
