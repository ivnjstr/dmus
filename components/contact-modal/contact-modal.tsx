"use client";

import { useId, type Ref } from "react";
import { buttonClasses } from "@/components/button-styles";

const SERVICES = [
  "Branding",
  "Social Media",
  "Content & Reels",
  "Creative Campaigns",
  "Website / Digital",
];

const labelClasses =
  "mb-2.25 block text-[0.72rem] leading-normal font-semibold tracking-[0.03em] text-cream/65 uppercase";

// 16px on small screens stops iOS from zooming into the field on focus.
const fieldClasses =
  "w-full rounded-md border border-cream/20 bg-cream/4 px-4 text-base text-cream outline-none transition-colors placeholder:text-cream/40 focus:border-brand-orange/70 sm:text-[0.85rem]";

export function ContactModal({ ref }: { ref: Ref<HTMLDialogElement> }) {
  const id = useId();

  return (
    <dialog
      ref={ref}
      aria-labelledby={`${id}-title`}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-137 overflow-y-auto overscroll-contain rounded-lg border border-cream/20 bg-brand-green p-6 text-cream shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop:bg-black/60 sm:px-12 sm:pt-12.5 sm:pb-11.5"
    >
      {/* The panel itself animates in/out (globals.css); hovering the close button turns the X. */}
      <button
        type="button"
        aria-label="Close"
        onClick={(event) => event.currentTarget.closest("dialog")?.close()}
        className="group absolute top-4 right-4 flex size-10 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-cream/50 focus-visible:outline-2 focus-visible:outline-brand-orange sm:top-6 sm:right-6"
      >
        <svg
          viewBox="0 0 10 10"
          className="size-2.25 transition-transform duration-300 ease-glide motion-safe:group-hover:rotate-90"
          aria-hidden="true"
        >
          <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      {/* Eyebrow, title and intro follow the panel in; the form is ready at once. */}
      <p className="text-[0.7rem] leading-none font-semibold tracking-[0.13em] text-brand-orange uppercase [--delay:60ms] motion-safe:animate-content-in">
        Get in touch
      </p>
      <h2
        id={`${id}-title`}
        className="mt-6 font-display text-2xl leading-[1.2] [--delay:100ms] motion-safe:animate-content-in sm:mt-4.5 sm:text-[1.75rem]"
      >
        Tell us about your brand.
      </h2>
      <p className="mt-2.5 max-w-102 text-[13px] leading-[23px] text-cream/80 [--delay:140ms] motion-safe:animate-content-in">
        Fill this out and we&apos;ll get back to you within 1–2 business days to set up a call.
      </p>

      {/* Submission isn't connected to anything yet. */}
      <form className="mt-8.5" onSubmit={(event) => event.preventDefault()}>
        <div className="grid gap-x-3.5 gap-y-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-name`} className={labelClasses}>Full name</label>
            <input id={`${id}-name`} name="name" type="text" autoComplete="name" placeholder="Juan Dela Cruz" className={`${fieldClasses} h-13`} />
          </div>
          <div>
            <label htmlFor={`${id}-email`} className={labelClasses}>Email address</label>
            <input id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder="you@brand.com" className={`${fieldClasses} h-13`} />
          </div>
          <div>
            <label htmlFor={`${id}-phone`} className={labelClasses}>Phone number</label>
            <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" placeholder="+63 900 000 0000" className={`${fieldClasses} h-13`} />
          </div>
          <div>
            <label htmlFor={`${id}-company`} className={labelClasses}>Brand / Company</label>
            <input id={`${id}-company`} name="company" type="text" autoComplete="organization" placeholder="Your brand name" className={`${fieldClasses} h-13`} />
          </div>
        </div>

        <fieldset className="mt-5 min-w-0">
          <legend className={labelClasses}>What do you need help with?</legend>
          <div className="flex flex-wrap gap-1.5">
            {SERVICES.map((service) => (
              <label
                key={service}
                className="cursor-pointer rounded-full border border-cream/15 px-4.5 py-2.25 text-[11px] leading-normal text-cream/85 transition duration-200 hover:border-cream/40 active:duration-100 motion-safe:active:scale-97 has-checked:border-brand-orange has-checked:text-brand-orange has-focus-visible:outline-2 has-focus-visible:outline-brand-orange"
              >
                <input type="checkbox" name="services" value={service} className="sr-only" />
                {service}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-5">
          <label htmlFor={`${id}-message`} className={labelClasses}>Tell us about your project</label>
          <textarea
            id={`${id}-message`}
            name="message"
            placeholder="A little about your brand, goals, and timeline..."
            className={`${fieldClasses} block h-25 resize-none py-3.5`}
          />
        </div>

        <button type="submit" className={`${buttonClasses("primary", "block")} group mt-3.5`}>
          Send Inquiry
          <svg
            viewBox="0 0 12 10"
            className="h-2 w-2.5 transition-transform duration-300 ease-glide motion-safe:group-hover:translate-x-0.75"
            aria-hidden="true"
          >
            <path d="M1 5h10M7 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="mt-4 text-center text-[0.7rem] leading-normal text-cream/55">
          No spam, ever. We&apos;ll only use this to get back to you about your project.
        </p>
      </form>
    </dialog>
  );
}
